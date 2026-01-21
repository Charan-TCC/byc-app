"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Clock,
    Code2,
    Database,
    FileText,
    GraduationCap,
    Lock,
    Play,
    PlayCircle,
    Settings,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Video,
    Zap,
} from "lucide-react";

// Training path data for Data Engineer role
const trainingPath = {
    role: "Data Engineer",
    totalModules: 6,
    completedModules: 2,
    totalHours: 42,
    completedHours: 14,
    overallProgress: 33,
    estimatedCompletion: "4 weeks",

    modules: [
        {
            id: 1,
            title: "SQL Fundamentals",
            description: "Master database queries, joins, and data manipulation",
            duration: "6 hours",
            lessons: 8,
            completedLessons: 8,
            status: "completed",
            icon: Database,
            category: "Core Skills",
        },
        {
            id: 2,
            title: "Python for Data Engineering",
            description: "Learn Python basics, pandas, and data processing",
            duration: "8 hours",
            lessons: 12,
            completedLessons: 12,
            status: "completed",
            icon: Code2,
            category: "Core Skills",
        },
        {
            id: 3,
            title: "ETL Pipeline Design",
            description: "Build efficient data extraction and transformation pipelines",
            duration: "7 hours",
            lessons: 10,
            completedLessons: 4,
            status: "in-progress",
            icon: Zap,
            category: "Advanced",
        },
        {
            id: 4,
            title: "Cloud Data Platforms",
            description: "AWS, GCP, and Azure data services overview",
            duration: "8 hours",
            lessons: 10,
            completedLessons: 0,
            status: "locked",
            icon: Target,
            category: "Advanced",
        },
        {
            id: 5,
            title: "Data Quality & Testing",
            description: "Implement data validation and quality frameworks",
            duration: "6 hours",
            lessons: 8,
            completedLessons: 0,
            status: "locked",
            icon: CheckCircle2,
            category: "Professional",
        },
        {
            id: 6,
            title: "Interview Preparation",
            description: "Technical interviews, system design, and soft skills",
            duration: "7 hours",
            lessons: 10,
            completedLessons: 0,
            status: "locked",
            icon: Trophy,
            category: "Career Ready",
        },
    ],
};

const achievements = [
    { id: 1, name: "Fast Learner", description: "Complete 2 modules in 1 week", earned: true },
    { id: 2, name: "SQL Master", description: "Score 90%+ on SQL quiz", earned: true },
    { id: 3, name: "Consistent", description: "Login 7 days in a row", earned: false },
];

export default function TrainingDashboardPage() {
    const router = useRouter();
    const { user } = useAuth();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-accent bg-accent/10 border-accent/30";
            case "in-progress": return "text-primary bg-primary/10 border-primary/30";
            default: return "text-muted-foreground bg-muted border-muted";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "completed": return "Completed";
            case "in-progress": return "In Progress";
            default: return "Locked";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Dashboard
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => router.push("/settings")}>
                                <Settings className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
                {/* Training header */}
                <section className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-1">
                                <GraduationCap className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wide">Training Path</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold">{trainingPath.role}</h1>
                            <p className="text-muted-foreground">
                                Personalized learning journey based on your assessment
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-gradient">{trainingPath.overallProgress}%</div>
                            <p className="text-xs text-muted-foreground">Overall Progress</p>
                        </div>
                    </div>

                    {/* Progress overview */}
                    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                        <CardContent className="py-4">
                            <div className="grid gap-4 sm:grid-cols-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{trainingPath.completedModules}/{trainingPath.totalModules}</p>
                                        <p className="text-xs text-muted-foreground">Modules</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{trainingPath.completedHours}h</p>
                                        <p className="text-xs text-muted-foreground">Completed</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-warning/10">
                                        <Target className="w-5 h-5 text-warning" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{trainingPath.totalHours - trainingPath.completedHours}h</p>
                                        <p className="text-xs text-muted-foreground">Remaining</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{trainingPath.estimatedCompletion}</p>
                                        <p className="text-xs text-muted-foreground">Est. Time</p>
                                    </div>
                                </div>
                            </div>
                            <Progress value={trainingPath.overallProgress} className="h-2 mt-4" />
                        </CardContent>
                    </Card>
                </section>

                {/* Continue learning */}
                {trainingPath.modules.find(m => m.status === "in-progress") && (
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary" />
                            Continue Learning
                        </h2>
                        {(() => {
                            const currentModule = trainingPath.modules.find(m => m.status === "in-progress")!;
                            const progress = (currentModule.completedLessons / currentModule.lessons) * 100;
                            return (
                                <Card className="card-hover border-primary/30 cursor-pointer" onClick={() => router.push(`/training/module/${currentModule.id}`)}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                                                <currentModule.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                                        {currentModule.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">{currentModule.duration}</span>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-1">{currentModule.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-3">{currentModule.description}</p>
                                                <div className="flex items-center gap-4">
                                                    <Progress value={progress} className="flex-1 h-2" />
                                                    <span className="text-sm font-medium">{currentModule.completedLessons}/{currentModule.lessons} lessons</span>
                                                </div>
                                            </div>
                                            <Button className="gap-2 shrink-0">
                                                Continue
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })()}
                    </section>
                )}

                {/* All modules */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">All Modules</h2>
                    <div className="grid gap-4">
                        {trainingPath.modules.map((module, index) => {
                            const progress = (module.completedLessons / module.lessons) * 100;
                            const isLocked = module.status === "locked";

                            return (
                                <Card
                                    key={module.id}
                                    className={`transition-all ${isLocked ? "opacity-60" : "card-hover cursor-pointer"
                                        }`}
                                    onClick={() => !isLocked && router.push(`/training/module/${module.id}`)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                                                {index + 1}
                                            </div>
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${module.status === "completed" ? "bg-accent/10" :
                                                    module.status === "in-progress" ? "bg-primary/10" : "bg-muted"
                                                }`}>
                                                {isLocked ? (
                                                    <Lock className="w-5 h-5 text-muted-foreground" />
                                                ) : (
                                                    <module.icon className={`w-5 h-5 ${module.status === "completed" ? "text-accent" : "text-primary"
                                                        }`} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold truncate">{module.title}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(module.status)}`}>
                                                        {getStatusLabel(module.status)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {module.duration}
                                                    </span>
                                                    <span>{module.lessons} lessons</span>
                                                </div>
                                            </div>
                                            {!isLocked && (
                                                <div className="flex items-center gap-3">
                                                    {module.status === "completed" ? (
                                                        <CheckCircle2 className="w-6 h-6 text-accent" />
                                                    ) : (
                                                        <>
                                                            <div className="w-20">
                                                                <Progress value={progress} className="h-1.5" />
                                                            </div>
                                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Achievements */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-warning" />
                        Achievements
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {achievements.map((achievement) => (
                            <Card key={achievement.id} className={achievement.earned ? "" : "opacity-50"}>
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? "bg-warning/10" : "bg-muted"
                                        }`}>
                                        <Star className={`w-5 h-5 ${achievement.earned ? "text-warning fill-warning" : "text-muted-foreground"}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{achievement.name}</p>
                                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
