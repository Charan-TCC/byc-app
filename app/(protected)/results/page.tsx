"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    Award,
    BookOpen,
    Briefcase,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    Database,
    GraduationCap,
    Rocket,
    Sparkles,
    Star,
    Target,
    Trophy,
    Users,
    Zap,
} from "lucide-react";

// Recommended role based on assessment
const recommendedRole = {
    title: "Data Engineer",
    match: 92,
    description: "You demonstrated strong technical aptitude, excellent problem-solving skills, and clear communication abilities that align perfectly with this role.",
    skills: [
        { name: "SQL & Database Design", score: 88 },
        { name: "Python Programming", score: 85 },
        { name: "Problem Solving", score: 92 },
        { name: "Communication", score: 78 },
    ],
    nextSteps: [
        {
            title: "Complete Training Path",
            description: "8-week intensive program covering essential skills",
            duration: "8 weeks",
            icon: GraduationCap,
        },
        {
            title: "Build Portfolio Projects",
            description: "3 real-world projects to showcase your abilities",
            duration: "4 weeks",
            icon: Briefcase,
        },
        {
            title: "Interview Preparation",
            description: "Mock interviews and company-specific prep",
            duration: "2 weeks",
            icon: Users,
        },
    ],
};

const alternativeRoles = [
    { title: "ETL Developer", match: 85 },
    { title: "Database Developer", match: 78 },
    { title: "Data Quality Analyst", match: 72 },
];

export default function ResultsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Animate in content
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10 animated-gradient" />
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl float" />
                <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: "-3s" }} />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            <span className="font-semibold">Your Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.push("/results/report")}>
                                View Report
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                                Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                {/* Hero section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Role-Ready Verdict
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Congratulations, {user?.name || "there"}! 🎉
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Based on your assessment, you&apos;re a strong candidate for data-focused roles.
                    </p>
                </div>

                {/* Primary role card */}
                <Card className="glass border-white/30 mb-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                    <CardHeader className="pb-2 relative">
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                                Best Match
                            </span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= 4 ? "text-warning fill-warning" : "text-muted"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="relative">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Database className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{recommendedRole.title}</h2>
                                    <p className="text-muted-foreground">Recommended role for you</p>
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-4xl font-bold text-gradient">{recommendedRole.match}%</div>
                                <p className="text-sm text-muted-foreground">Match Score</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6">
                            {recommendedRole.description}
                        </p>

                        {/* Skills breakdown */}
                        <div className="grid gap-3 mb-6">
                            {recommendedRole.skills.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-4">
                                    <span className="text-sm font-medium w-40 shrink-0">{skill.name}</span>
                                    <Progress value={skill.score} className="flex-1 h-2" />
                                    <span className="text-sm font-semibold w-10 text-right">{skill.score}%</span>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full sm:w-auto gap-2" size="lg" onClick={() => router.push("/training")}>
                            Start Training Path
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Alternative roles */}
                <Card className="mb-8">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="w-5 h-5 text-muted-foreground" />
                            Alternative Matches
                        </CardTitle>
                        <CardDescription>Other roles that suit your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            {alternativeRoles.map((role, index) => (
                                <button
                                    key={role.title}
                                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                            <span className="text-sm font-semibold text-muted-foreground">#{index + 2}</span>
                                        </div>
                                        <span className="font-medium">{role.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">{role.match}% match</span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Next steps roadmap */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-primary" />
                            Your Path to Placement
                        </CardTitle>
                        <CardDescription>Complete these steps to become job-ready</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

                            <div className="space-y-6">
                                {recommendedRole.nextSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0 z-10">
                                            <step.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold">{step.title}</h4>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {step.duration}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" className="gap-2 pulse-glow">
                        Begin Your Journey
                        <Sparkles className="w-4 h-4" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
