"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    Award,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle2,
    ChevronRight,
    Clock,
    Code2,
    Download,
    ExternalLink,
    Lightbulb,
    MessageSquare,
    Share2,
    Star,
    Target,
    ThumbsUp,
    TrendingUp,
    Video,
    XCircle,
    Zap,
} from "lucide-react";

// Mock detailed report data
const reportData = {
    generatedAt: "January 20, 2026",
    overallScore: 82,
    recommendedRole: "Data Engineer",
    matchScore: 92,

    phases: {
        aptitude: {
            score: 85,
            timeSpent: "12:34",
            correct: 7,
            total: 8,
            breakdown: [
                { category: "Quantitative", score: 90, correct: 3, total: 3 },
                { category: "Logical", score: 75, correct: 2, total: 3 },
                { category: "Technical", score: 100, correct: 2, total: 2 },
            ],
        },
        coding: {
            score: 72,
            timeSpent: "18:45",
            problemsSolved: 2,
            totalProblems: 2,
            breakdown: [
                { problem: "Find Duplicates", language: "Python", passed: 3, total: 3, time: "8:20" },
                { problem: "Top Customers", language: "SQL", passed: 2, total: 3, time: "10:25" },
            ],
        },
        video: {
            responses: 2,
            totalQuestions: 2,
            feedback: [
                { question: "Technical Problem", strengths: ["Clear explanation", "Structured approach"], improvements: ["More specific examples"] },
                { question: "Career Motivation", strengths: ["Genuine enthusiasm", "Good research"], improvements: ["Connect to specific skills"] },
            ],
        },
    },

    skills: [
        { name: "Problem Solving", score: 92, level: "Advanced" },
        { name: "SQL Proficiency", score: 88, level: "Advanced" },
        { name: "Python Basics", score: 72, level: "Intermediate" },
        { name: "Communication", score: 78, level: "Intermediate" },
        { name: "Logical Reasoning", score: 85, level: "Advanced" },
    ],

    recommendations: [
        "Focus on advanced Python concepts like decorators and generators",
        "Practice more complex SQL window functions",
        "Work on providing specific examples in behavioral responses",
    ],
};

export default function DetailedReportPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => router.push("/results")} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                <span className="font-semibold">Detailed Report</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export PDF</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
                {/* Report header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">Assessment Report</h1>
                            <p className="text-muted-foreground">
                                Generated on {reportData.generatedAt} for {user?.name || "Student"}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">{reportData.overallScore}%</div>
                                <p className="text-xs text-muted-foreground">Overall Score</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
                        <TabsTrigger value="coding">Coding</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Score summary */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Brain className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Aptitude</p>
                                            <p className="text-2xl font-bold">{reportData.phases.aptitude.score}%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-accent/10">
                                            <Code2 className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Coding</p>
                                            <p className="text-2xl font-bold">{reportData.phases.coding.score}%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-warning/10">
                                            <Video className="w-5 h-5 text-warning" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Video</p>
                                            <p className="text-2xl font-bold">{reportData.phases.video.responses}/{reportData.phases.video.totalQuestions}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recommended role */}
                        <Card className="glass border-white/30">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-primary" />
                                        Recommended Role
                                    </CardTitle>
                                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                                        {reportData.matchScore}% Match
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-xl font-bold mb-2">{reportData.recommendedRole}</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Based on your assessment performance, you show strong aptitude for data engineering roles
                                    with excellent problem-solving and technical skills.
                                </p>
                                <Button className="gap-2">
                                    View Training Path
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Key recommendations */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-warning" />
                                    Key Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {reportData.recommendations.map((rec, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                                                {index + 1}
                                            </div>
                                            <span className="text-sm">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Aptitude Tab */}
                    <TabsContent value="aptitude" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Aptitude Test Results</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        Time: {reportData.phases.aptitude.timeSpent}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Overall */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                    <div>
                                        <p className="font-medium">Overall Score</p>
                                        <p className="text-sm text-muted-foreground">
                                            {reportData.phases.aptitude.correct} of {reportData.phases.aptitude.total} correct
                                        </p>
                                    </div>
                                    <div className="text-3xl font-bold text-primary">{reportData.phases.aptitude.score}%</div>
                                </div>

                                {/* Category breakdown */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">Category Breakdown</h4>
                                    {reportData.phases.aptitude.breakdown.map((cat) => (
                                        <div key={cat.category} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>{cat.category}</span>
                                                <span className="font-medium">{cat.correct}/{cat.total} ({cat.score}%)</span>
                                            </div>
                                            <Progress value={cat.score} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Coding Tab */}
                    <TabsContent value="coding" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Coding Lab Results</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        Time: {reportData.phases.coding.timeSpent}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {reportData.phases.coding.breakdown.map((problem, index) => (
                                    <div key={index} className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{problem.problem}</span>
                                                <span className="px-2 py-0.5 rounded bg-muted text-xs font-medium uppercase">
                                                    {problem.language}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">{problem.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: problem.total }).map((_, i) => (
                                                <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i < problem.passed ? "bg-accent/20" : "bg-destructive/20"
                                                    }`}>
                                                    {i < problem.passed ? (
                                                        <CheckCircle2 className="w-4 h-4 text-accent" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-destructive" />
                                                    )}
                                                </div>
                                            ))}
                                            <span className="text-sm text-muted-foreground ml-2">
                                                {problem.passed}/{problem.total} tests passed
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="skills" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills Assessment</CardTitle>
                                <CardDescription>Your proficiency across key competencies</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {reportData.skills.map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${skill.level === "Advanced"
                                                        ? "bg-accent/10 text-accent"
                                                        : "bg-primary/10 text-primary"
                                                    }`}>
                                                    {skill.level}
                                                </span>
                                            </div>
                                            <span className="font-semibold">{skill.score}%</span>
                                        </div>
                                        <Progress value={skill.score} className="h-3" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
