"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Check,
    CheckCircle2,
    ChevronRight,
    Clock,
    Code2,
    Download,
    FileText,
    Lightbulb,
    Lock,
    Pause,
    Play,
    PlayCircle,
    SkipBack,
    SkipForward,
    Video,
    Volume2,
    VolumeX,
    Zap,
} from "lucide-react";

// Module data
const moduleData = {
    id: 3,
    title: "ETL Pipeline Design",
    description: "Build efficient data extraction and transformation pipelines",
    duration: "7 hours",
    category: "Advanced",
    icon: Zap,

    lessons: [
        {
            id: 1,
            title: "Introduction to ETL",
            duration: "12 min",
            type: "video",
            completed: true,
        },
        {
            id: 2,
            title: "Data Extraction Techniques",
            duration: "18 min",
            type: "video",
            completed: true,
        },
        {
            id: 3,
            title: "Transformation Patterns",
            duration: "22 min",
            type: "video",
            completed: true,
        },
        {
            id: 4,
            title: "Practice: Build a Simple Pipeline",
            duration: "30 min",
            type: "practice",
            completed: true,
        },
        {
            id: 5,
            title: "Loading Strategies",
            duration: "15 min",
            type: "video",
            completed: false,
            current: true,
        },
        {
            id: 6,
            title: "Error Handling & Logging",
            duration: "20 min",
            type: "video",
            completed: false,
        },
        {
            id: 7,
            title: "Performance Optimization",
            duration: "25 min",
            type: "video",
            completed: false,
        },
        {
            id: 8,
            title: "Reading: Best Practices Guide",
            duration: "10 min",
            type: "reading",
            completed: false,
        },
        {
            id: 9,
            title: "Quiz: ETL Fundamentals",
            duration: "15 min",
            type: "quiz",
            completed: false,
        },
        {
            id: 10,
            title: "Final Project: End-to-End Pipeline",
            duration: "45 min",
            type: "project",
            completed: false,
        },
    ],

    currentLesson: {
        id: 5,
        title: "Loading Strategies",
        description: "Learn different approaches to loading data into target systems, including full loads, incremental loads, and upserts.",
        duration: "15 min",
        type: "video",
        videoUrl: "/videos/loading-strategies.mp4",
        transcript: [
            "Welcome to Loading Strategies. In this lesson, we'll explore different ways to load data into your target systems.",
            "First, let's understand the difference between full loads and incremental loads...",
            "A full load replaces all existing data, while an incremental load only adds new or changed records.",
        ],
        keyPoints: [
            "Full Load vs Incremental Load tradeoffs",
            "Implementing upsert patterns",
            "Handling data type mismatches",
            "Transaction management for reliability",
        ],
    },
};

export default function ModuleViewPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeTab, setActiveTab] = useState<"overview" | "transcript" | "resources">("overview");

    const completedLessons = moduleData.lessons.filter(l => l.completed).length;
    const progress = (completedLessons / moduleData.lessons.length) * 100;
    const currentLessonIndex = moduleData.lessons.findIndex(l => l.current);

    const getLessonIcon = (type: string) => {
        switch (type) {
            case "video": return Video;
            case "practice": return Code2;
            case "reading": return FileText;
            case "quiz": return Lightbulb;
            case "project": return Zap;
            default: return BookOpen;
        }
    };

    const handleMarkComplete = () => {
        // In real app, would update backend
        router.push("/training");
    };

    const handleNextLesson = () => {
        if (currentLessonIndex < moduleData.lessons.length - 1) {
            // In real app, would navigate to next lesson
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => router.push("/training")} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Training
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Lesson {currentLessonIndex + 1} of {moduleData.lessons.length}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col lg:flex-row">
                {/* Video/Content area */}
                <div className="lg:flex-1 flex flex-col">
                    {/* Video player */}
                    <div className="relative bg-black aspect-video lg:aspect-auto lg:h-[60vh]">
                        {/* Placeholder video */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors"
                                    onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? (
                                        <Pause className="w-10 h-10 text-white" />
                                    ) : (
                                        <Play className="w-10 h-10 text-white ml-1" />
                                    )}
                                </div>
                                <h3 className="text-white text-lg font-semibold">{moduleData.currentLesson.title}</h3>
                                <p className="text-white/60 text-sm">{moduleData.currentLesson.duration}</p>
                            </div>
                        </div>

                        {/* Video controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="flex items-center gap-4">
                                {/* Progress bar */}
                                <div className="flex-1">
                                    <div className="h-1 bg-white/30 rounded-full cursor-pointer">
                                        <div className="h-full w-1/3 bg-primary rounded-full" />
                                    </div>
                                </div>
                                <span className="text-white text-xs">5:12 / 15:00</span>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                                        <SkipBack className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-10 w-10"
                                        onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                                        <SkipForward className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8"
                                        onClick={() => setIsMuted(!isMuted)}>
                                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson info */}
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-xl font-bold mb-1">{moduleData.currentLesson.title}</h1>
                                <p className="text-muted-foreground text-sm">{moduleData.currentLesson.description}</p>
                            </div>
                            <Button onClick={handleMarkComplete} className="gap-2 shrink-0">
                                <Check className="w-4 h-4" />
                                Mark Complete
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 border-b border-border mb-4">
                            {(["overview", "transcript", "resources"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${activeTab === tab
                                            ? "border-primary text-primary"
                                            : "border-transparent text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        {activeTab === "overview" && (
                            <div>
                                <h3 className="font-semibold mb-3">Key Points</h3>
                                <ul className="space-y-2">
                                    {moduleData.currentLesson.keyPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === "transcript" && (
                            <div className="space-y-4">
                                {moduleData.currentLesson.transcript.map((para, i) => (
                                    <p key={i} className="text-sm text-muted-foreground">{para}</p>
                                ))}
                            </div>
                        )}

                        {activeTab === "resources" && (
                            <div className="space-y-3">
                                <button className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 w-full text-left transition-colors">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Loading Strategies Cheatsheet</p>
                                        <p className="text-xs text-muted-foreground">PDF • 2 pages</p>
                                    </div>
                                    <Download className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 w-full text-left transition-colors">
                                    <Code2 className="w-5 h-5 text-accent" />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Code Examples Repository</p>
                                        <p className="text-xs text-muted-foreground">GitHub Link</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                        )}

                        {/* Next lesson */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">Up next</p>
                                <Button variant="outline" size="sm" onClick={handleNextLesson} className="gap-2">
                                    Error Handling & Logging
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Lesson list */}
                <div className="lg:w-80 border-l border-border bg-card">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-semibold">{moduleData.title}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <Progress value={progress} className="flex-1 h-1.5" />
                            <span className="text-xs text-muted-foreground">{completedLessons}/{moduleData.lessons.length}</span>
                        </div>
                    </div>

                    <div className="divide-y divide-border max-h-[calc(100vh-200px)] overflow-auto">
                        {moduleData.lessons.map((lesson, index) => {
                            const LessonIcon = getLessonIcon(lesson.type);
                            const isCurrent = lesson.current;

                            return (
                                <button
                                    key={lesson.id}
                                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${isCurrent ? "bg-primary/5" : "hover:bg-muted/50"
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${lesson.completed ? "bg-accent text-white" :
                                            isCurrent ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                        }`}>
                                        {lesson.completed ? (
                                            <Check className="w-3 h-3" />
                                        ) : (
                                            <span className="text-xs font-medium">{index + 1}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isCurrent ? "text-primary" : lesson.completed ? "text-muted-foreground" : ""
                                            }`}>
                                            {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                            <LessonIcon className="w-3 h-3" />
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </div>
                                    {isCurrent && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
