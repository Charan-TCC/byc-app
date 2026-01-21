"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    Camera,
    CheckCircle2,
    Clock,
    Lightbulb,
    Mic,
    MicOff,
    Play,
    RotateCcw,
    StopCircle,
    Video,
    VideoOff,
    Volume2,
} from "lucide-react";

const interviewQuestions = [
    {
        id: 1,
        question: "Tell us about a challenging technical problem you solved. What was your approach?",
        timeLimit: 120,
        tips: [
            "Start with the context and challenge",
            "Explain your thought process",
            "Share the outcome and learnings",
        ],
    },
    {
        id: 2,
        question: "Why are you interested in a career in data engineering? What excites you about this field?",
        timeLimit: 120,
        tips: [
            "Be genuine about your motivation",
            "Connect to your skills and interests",
            "Show enthusiasm for the field",
        ],
    },
];

type RecordingState = "idle" | "countdown" | "recording" | "stopped" | "reviewing";

export default function VideoInterviewPage() {
    const router = useRouter();
    const { updateProgress } = useAuth();
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [recordingState, setRecordingState] = useState<RecordingState>("idle");
    const [countdown, setCountdown] = useState(3);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordings, setRecordings] = useState<Record<number, string>>({});
    const [hasCamera, setHasCamera] = useState(true);
    const [hasMic, setHasMic] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showGuide, setShowGuide] = useState(true);

    const question = interviewQuestions[currentQuestion];
    const timeLimit = question.timeLimit;
    const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100;

    // Initialize camera
    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720 },
                    audio: true,
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Camera access denied:", error);
                setHasCamera(false);
                setHasMic(false);
            }
        };

        initCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // Countdown timer
    useEffect(() => {
        if (recordingState !== "countdown") return;

        if (countdown <= 0) {
            startActualRecording();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [recordingState, countdown]);

    // Recording timer
    useEffect(() => {
        if (recordingState !== "recording") return;

        if (recordingTime >= timeLimit) {
            stopRecording();
            return;
        }

        const timer = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [recordingState, recordingTime, timeLimit]);

    const startCountdown = () => {
        setCountdown(3);
        setRecordingState("countdown");
        setShowGuide(false);
    };

    const startActualRecording = () => {
        if (!streamRef.current) return;

        chunksRef.current = [];
        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setRecordings((prev) => ({
                ...prev,
                [currentQuestion]: url,
            }));
        };

        mediaRecorder.start();
        setRecordingState("recording");
        setRecordingTime(0);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setRecordingState("stopped");
    };

    const handleReRecord = () => {
        if (recordings[currentQuestion]) {
            URL.revokeObjectURL(recordings[currentQuestion]);
        }
        setRecordings((prev) => {
            const newRecordings = { ...prev };
            delete newRecordings[currentQuestion];
            return newRecordings;
        });
        setRecordingState("idle");
        setRecordingTime(0);
        setShowGuide(true);

        if (videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    };

    const handleReviewRecording = () => {
        setRecordingState("reviewing");
        if (videoRef.current && recordings[currentQuestion]) {
            videoRef.current.srcObject = null;
            videoRef.current.src = recordings[currentQuestion];
            videoRef.current.play();
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < interviewQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setRecordingState("idle");
            setRecordingTime(0);
            setShowGuide(true);

            if (videoRef.current && streamRef.current) {
                videoRef.current.srcObject = streamRef.current;
                videoRef.current.src = "";
            }
        }
    };

    const handleSubmit = useCallback(() => {
        setIsSubmitting(true);

        updateProgress({
            assessmentProgress: {
                currentPhase: "completed",
                video: {
                    completed: true,
                    completedAt: new Date().toISOString(),
                },
                overallProgress: 100,
            },
        });

        Object.values(recordings).forEach((url) => {
            URL.revokeObjectURL(url);
        });

        setTimeout(() => {
            router.push("/assessment/complete");
        }, 500);
    }, [recordings, router, updateProgress]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const allQuestionsRecorded = Object.keys(recordings).length === interviewQuestions.length;
    const isLowTime = timeLimit - recordingTime < 30 && recordingState === "recording";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header - compact */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4">
                    <div className="flex h-12 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-warning">
                                <Video className="w-4 h-4" />
                                <span className="font-semibold text-sm">Video Interview</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Phase 4 of 4</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasCamera && <Camera className="w-4 h-4 text-accent" />}
                            {hasMic && <Mic className="w-4 h-4 text-accent" />}
                            <span className="text-sm text-muted-foreground">
                                Q{currentQuestion + 1}/{interviewQuestions.length}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content - fills remaining space */}
            <main className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Left side - Video */}
                <div className="lg:w-3/5 flex flex-col bg-black relative">
                    {/* Video container */}
                    <div className="flex-1 relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted={recordingState !== "reviewing"}
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        {/* Face positioning guide overlay */}
                        {showGuide && recordingState === "idle" && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {/* Oval guide */}
                                <div className="relative">
                                    <div className="w-48 h-64 border-4 border-dashed border-white/60 rounded-[50%] animate-pulse" />
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                                        <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                                            Position your face here
                                        </p>
                                    </div>
                                </div>

                                {/* Corner guides */}
                                <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-white/40 rounded-tl-lg" />
                                <div className="absolute top-8 right-8 w-12 h-12 border-r-4 border-t-4 border-white/40 rounded-tr-lg" />
                                <div className="absolute bottom-8 left-8 w-12 h-12 border-l-4 border-b-4 border-white/40 rounded-bl-lg" />
                                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-white/40 rounded-br-lg" />
                            </div>
                        )}

                        {/* Countdown overlay */}
                        {recordingState === "countdown" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                                <div className="text-center">
                                    <div className="text-8xl font-bold text-white mb-4 animate-pulse">
                                        {countdown}
                                    </div>
                                    <p className="text-white/80">Get ready...</p>
                                </div>
                            </div>
                        )}

                        {/* Recording indicator */}
                        {recordingState === "recording" && (
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive text-white text-sm font-medium">
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    REC
                                </div>
                                <div className={`px-3 py-1.5 rounded-full text-sm font-mono font-semibold ${isLowTime ? "bg-destructive text-white" : "bg-black/50 text-white"
                                    }`}>
                                    {formatTime(recordingTime)} / {formatTime(timeLimit)}
                                </div>
                            </div>
                        )}

                        {/* Audio visualizer bar */}
                        {recordingState === "recording" && (
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-accent rounded-full animate-pulse"
                                        style={{
                                            height: `${Math.random() * 20 + 5}px`,
                                            animationDelay: `${i * 0.05}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Video controls - fixed at bottom */}
                    <div className="bg-card border-t border-border p-3 flex items-center justify-center gap-3">
                        {recordingState === "idle" && (
                            <Button onClick={startCountdown} className="gap-2" disabled={!hasCamera}>
                                <Play className="w-4 h-4" />
                                Start Recording
                            </Button>
                        )}

                        {recordingState === "recording" && (
                            <Button onClick={stopRecording} variant="destructive" className="gap-2">
                                <StopCircle className="w-4 h-4" />
                                Stop
                            </Button>
                        )}

                        {(recordingState === "stopped" || recordingState === "reviewing") && (
                            <>
                                <Button variant="outline" size="sm" onClick={handleReRecord} className="gap-2">
                                    <RotateCcw className="w-4 h-4" />
                                    Re-record
                                </Button>
                                {recordingState === "stopped" && (
                                    <Button variant="outline" size="sm" onClick={handleReviewRecording} className="gap-2">
                                        <Play className="w-4 h-4" />
                                        Review
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Right side - Question & Tips */}
                <div className="lg:w-2/5 flex flex-col bg-card border-l border-border">
                    {/* Question */}
                    <div className="flex-1 p-6 overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                                Question {currentQuestion + 1}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {formatTime(timeLimit)} max
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold leading-relaxed mb-6">
                            {question.question}
                        </h2>

                        {/* Tips */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Lightbulb className="w-4 h-4 text-warning" />
                                Tips for a great response
                            </div>
                            <ul className="space-y-2">
                                {question.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recording status */}
                        <div className="mt-6 p-3 rounded-lg border border-border flex items-center gap-3">
                            {recordings[currentQuestion] ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                    <span className="text-sm font-medium">Response recorded ✓</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Not yet recorded</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Navigation - fixed at bottom */}
                    <div className="border-t border-border p-4 bg-muted/30">
                        <Progress value={progress} className="h-1.5 mb-4" />

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                {Object.keys(recordings).length}/{interviewQuestions.length} recorded
                            </span>

                            {currentQuestion < interviewQuestions.length - 1 ? (
                                <Button
                                    onClick={handleNextQuestion}
                                    disabled={!recordings[currentQuestion]}
                                    size="sm"
                                    className="gap-2"
                                >
                                    Next Question
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!allQuestionsRecorded || isSubmitting}
                                    size="sm"
                                    className="gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Complete
                                            <CheckCircle2 className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
