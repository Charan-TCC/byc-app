"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    CheckCircle,
    Clock,
    Code2,
    FileQuestion,
    Play,
    Video,
    AlertTriangle,
} from "lucide-react";

const phases = [
    {
        id: 1,
        name: "Aptitude Test",
        description: "Logical reasoning, quantitative analysis, and verbal ability",
        duration: "15 mins",
        questions: "20 MCQs",
        icon: Brain,
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        id: 2,
        name: "Coding Labs",
        description: "Hands-on coding challenges in Python, SQL, or JavaScript",
        duration: "15 mins",
        questions: "2 problems",
        icon: Code2,
        color: "text-accent",
        bgColor: "bg-accent/10",
    },
    {
        id: 3,
        name: "Problem Solving",
        description: "Debugging, optimization, and analytical thinking",
        duration: "10 mins",
        questions: "3 scenarios",
        icon: FileQuestion,
        color: "text-secondary",
        bgColor: "bg-secondary/10",
    },
    {
        id: 4,
        name: "Video Interview",
        description: "Record responses to behavioral and situational questions",
        duration: "5 mins",
        questions: "2 prompts",
        icon: Video,
        color: "text-warning",
        bgColor: "bg-warning/10",
    },
];

const guidelines = [
    "Ensure a stable internet connection throughout the assessment",
    "Complete all phases in one sitting — progress is auto-saved",
    "Use a laptop/desktop for the best experience",
    "Keep your webcam and microphone ready for the video phase",
    "Answer honestly — there are no right or wrong personality answers",
];

export default function AssessmentOverviewPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleBack = () => {
        router.push("/dashboard");
    };

    const handleStart = () => {
        router.push("/assessment/aptitude");
    };

    const totalDuration = phases.reduce((acc, phase) => {
        const mins = parseInt(phase.duration);
        return acc + mins;
    }, 0);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>~{totalDuration} mins total</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
                {/* Title Section */}
                <section className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Play className="w-4 h-4" />
                        Diagnostic Assessment
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Your Career Discovery Begins Here
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Complete our 4-phase diagnostic to receive a personalized role recommendation
                        based on your skills, aptitude, and problem-solving abilities.
                    </p>
                </section>

                {/* Phase Cards */}
                <section className="mb-10">
                    <h2 className="text-lg font-semibold mb-4">Assessment Phases</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {phases.map((phase) => (
                            <Card key={phase.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                                <div className={`absolute top-0 left-0 w-1 h-full ${phase.bgColor.replace('/10', '')}`} />
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2 rounded-lg ${phase.bgColor}`}>
                                            <phase.icon className={`w-5 h-5 ${phase.color}`} />
                                        </div>
                                        <span className="text-xs text-muted-foreground">Phase {phase.id}</span>
                                    </div>
                                    <CardTitle className="text-lg mt-2">{phase.name}</CardTitle>
                                    <CardDescription className="text-sm">{phase.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {phase.duration}
                                        </span>
                                        <span>{phase.questions}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Guidelines */}
                <section className="mb-10">
                    <Card className="border-warning/30 bg-warning/5">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-warning" />
                                <CardTitle className="text-lg">Before You Begin</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {guidelines.map((guideline, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm">
                                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span>{guideline}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </main>

            {/* Sticky CTA footer */}
            <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-md py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex items-center justify-center gap-4">
                    <Button size="lg" onClick={handleStart} className="min-w-[200px] h-12 text-base group pulse-glow">
                        Start Assessment
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
