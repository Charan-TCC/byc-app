"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    GraduationCap,
    HelpCircle,
    Lightbulb,
    MessageSquare,
    RefreshCw,
    Target,
    TrendingUp,
    XCircle,
} from "lucide-react";

const assessmentFeedback = {
    overallScore: 58,
    threshold: 70,
    areas: [
        { name: "Aptitude", score: 65, status: "needs-work" },
        { name: "Coding", score: 48, status: "below" },
        { name: "Communication", score: 72, status: "good" },
    ],
    recommendations: [
        {
            title: "Strengthen Programming Fundamentals",
            description: "Focus on data structures, algorithms, and Python basics",
            icon: BookOpen,
            priority: "high",
        },
        {
            title: "Practice SQL Queries",
            description: "Daily SQL exercises on platforms like LeetCode or HackerRank",
            icon: Target,
            priority: "high",
        },
        {
            title: "Build Mini Projects",
            description: "Create 2-3 small data pipeline projects to demonstrate skills",
            icon: Lightbulb,
            priority: "medium",
        },
    ],
    retakeInfo: {
        waitPeriod: "2 weeks",
        nextDate: "February 3, 2026",
        attemptsRemaining: 2,
    },
};

export default function EarlyExitPage() {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-muted/50 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-muted/30 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-muted-foreground" />
                            <span className="font-semibold">Assessment Feedback</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                            Dashboard
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">

                {/* Status banner */}
                <div className="mb-8 p-4 rounded-xl bg-warning/10 border border-warning/30 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-1">More Preparation Needed</h2>
                        <p className="text-sm text-muted-foreground">
                            Your assessment score of <span className="font-semibold">{assessmentFeedback.overallScore}%</span> is below our {assessmentFeedback.threshold}% threshold.
                            Don&apos;t worry — this is an opportunity to strengthen your skills!
                        </p>
                    </div>
                </div>

                {/* Score breakdown */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg">Score Breakdown</CardTitle>
                        <CardDescription>See how you performed in each area</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {assessmentFeedback.areas.map((area) => (
                            <div key={area.name} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{area.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-semibold ${area.status === "good" ? "text-accent" :
                                                area.status === "needs-work" ? "text-warning" : "text-destructive"
                                            }`}>
                                            {area.score}%
                                        </span>
                                        {area.status === "good" ? (
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                        ) : area.status === "needs-work" ? (
                                            <AlertTriangle className="w-4 h-4 text-warning" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-destructive" />
                                        )}
                                    </div>
                                </div>
                                <Progress
                                    value={area.score}
                                    className={`h-2 ${area.status === "good" ? "[&>div]:bg-accent" :
                                            area.status === "needs-work" ? "[&>div]:bg-warning" : "[&>div]:bg-destructive"
                                        }`}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-primary" />
                            Improvement Roadmap
                        </CardTitle>
                        <CardDescription>Focus on these areas before your next attempt</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {assessmentFeedback.recommendations.map((rec, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-4 p-4 rounded-xl border ${rec.priority === "high" ? "border-destructive/30 bg-destructive/5" : "border-border"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${rec.priority === "high" ? "bg-destructive/10" : "bg-muted"
                                    }`}>
                                    <rec.icon className={`w-5 h-5 ${rec.priority === "high" ? "text-destructive" : "text-muted-foreground"
                                        }`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium">{rec.title}</h4>
                                        {rec.priority === "high" && (
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">
                                                Priority
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Retake info */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-accent" />
                            Retake Assessment
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                                <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Wait Period</p>
                                <p className="font-semibold">{assessmentFeedback.retakeInfo.waitPeriod}</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                                <Calendar className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Next Available</p>
                                <p className="font-semibold">{assessmentFeedback.retakeInfo.nextDate}</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                                <RefreshCw className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Attempts Left</p>
                                <p className="font-semibold">{assessmentFeedback.retakeInfo.attemptsRemaining}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={() => router.push("/dashboard")} className="gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Start Learning Path
                    </Button>
                    <Button onClick={() => router.push("/support")} className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Talk to Mentor
                    </Button>
                </div>
            </main>
        </div>
    );
}
