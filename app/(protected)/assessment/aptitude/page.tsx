"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    CheckCircle2,
    Circle,
    Clock,
    Flag,
    XCircle,
} from "lucide-react";

// Mock aptitude questions
const aptitudeQuestions = [
    {
        id: 1,
        question: "A train travels 360 km in 4 hours. What is its average speed?",
        options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
        correctAnswer: 1,
        category: "Quantitative",
    },
    {
        id: 2,
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: 1,
        category: "Technical",
    },
    {
        id: 3,
        question: "Complete the series: 2, 6, 12, 20, ?",
        options: ["28", "30", "32", "36"],
        correctAnswer: 1,
        category: "Logical",
    },
    {
        id: 4,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        category: "Technical",
    },
    {
        id: 5,
        question: "If 20% of a number is 40, what is the number?",
        options: ["180", "200", "220", "250"],
        correctAnswer: 1,
        category: "Quantitative",
    },
    {
        id: 6,
        question: "Which SQL keyword is used to sort results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
        correctAnswer: 1,
        category: "Technical",
    },
    {
        id: 7,
        question: "Find the odd one out: Python, Java, HTML, C++",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: 2,
        category: "Logical",
    },
    {
        id: 8,
        question: "What does ETL stand for in data engineering?",
        options: [
            "Extract, Transform, Load",
            "Export, Transfer, Link",
            "Evaluate, Test, Launch",
            "Enter, Track, Log",
        ],
        correctAnswer: 0,
        category: "Technical",
    },
];

const TOTAL_TIME = 15 * 60; // 15 minutes in seconds

export default function AptitudeTestPage() {
    const router = useRouter();
    const { updateProgress } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [flagged, setFlagged] = useState<Set<number>>(new Set());
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSelectAnswer = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: optionIndex,
        }));
    };

    const handleToggleFlag = () => {
        setFlagged((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(currentQuestion)) {
                newSet.delete(currentQuestion);
            } else {
                newSet.add(currentQuestion);
            }
            return newSet;
        });
    };

    const handleNext = () => {
        if (currentQuestion < aptitudeQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = useCallback(() => {
        setIsSubmitting(true);

        // Calculate score
        let correct = 0;
        aptitudeQuestions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correct++;
            }
        });

        const score = Math.round((correct / aptitudeQuestions.length) * 100);

        // Update progress
        updateProgress({
            assessmentProgress: {
                currentPhase: "coding",
                aptitude: {
                    completed: true,
                    score,
                    completedAt: new Date().toISOString(),
                },
                overallProgress: 25,
            },
        });

        // Navigate to next phase
        setTimeout(() => {
            router.push("/assessment/coding");
        }, 500);
    }, [answers, router, updateProgress]);

    const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100;
    const answeredCount = Object.keys(answers).length;
    const question = aptitudeQuestions[currentQuestion];
    const isLowTime = timeLeft < 60;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header with timer */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Brain className="w-5 h-5" />
                                <span className="font-semibold hidden sm:inline">Aptitude Test</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Phase 1 of 4
                            </div>
                        </div>

                        {/* Timer */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isLowTime ? "bg-destructive/10 text-destructive" : "bg-muted"
                            }`}>
                            <Clock className={`w-4 h-4 ${isLowTime ? "animate-pulse" : ""}`} />
                            <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress bar */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                            Question {currentQuestion + 1} of {aptitudeQuestions.length}
                        </span>
                        <span className="text-muted-foreground">
                            {answeredCount} answered
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            {/* Main content - scrollable */}
            <main className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-4xl">
                    <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
                        {/* Question card */}
                        <Card className="glass border-white/30">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                        {question.category}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleToggleFlag}
                                        className={flagged.has(currentQuestion) ? "text-warning" : "text-muted-foreground"}
                                    >
                                        <Flag className="w-4 h-4 mr-1" />
                                        {flagged.has(currentQuestion) ? "Flagged" : "Flag"}
                                    </Button>
                                </div>
                                <CardTitle className="text-xl mt-4 leading-relaxed">
                                    {question.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectAnswer(index)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 hover-scale ${answers[currentQuestion] === index
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${answers[currentQuestion] === index
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className="font-medium">{option}</span>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Question navigator */}
                        <div className="hidden lg:block">
                            <Card className="sticky top-24">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Questions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-4 gap-2">
                                        {aptitudeQuestions.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentQuestion(index)}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${currentQuestion === index
                                                    ? "bg-primary text-primary-foreground"
                                                    : answers[index] !== undefined
                                                        ? "bg-accent/20 text-accent border border-accent/30"
                                                        : flagged.has(index)
                                                            ? "bg-warning/20 text-warning border border-warning/30"
                                                            : "bg-muted hover:bg-muted/80"
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-accent/20 border border-accent/30" />
                                            <span>Answered</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-warning/20 border border-warning/30" />
                                            <span>Flagged</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Navigation - fixed at bottom */}
            <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-md py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex items-center justify-between gap-4">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="flex gap-3">
                        {currentQuestion === aptitudeQuestions.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="gap-2 min-w-[140px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Submit Test
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="gap-2">
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
