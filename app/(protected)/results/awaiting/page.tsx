"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
    Brain,
    CheckCircle2,
    Clock,
    Code2,
    Cpu,
    Loader2,
    MessageSquare,
    Sparkles,
    Video,
    Zap,
} from "lucide-react";

const processingSteps = [
    { id: 1, label: "Analyzing aptitude responses", icon: Brain, duration: 3000 },
    { id: 2, label: "Evaluating code submissions", icon: Code2, duration: 4000 },
    { id: 3, label: "Processing video interview", icon: Video, duration: 5000 },
    { id: 4, label: "Generating role recommendations", icon: Sparkles, duration: 3000 },
];

export default function AwaitingResultsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [overallProgress, setOverallProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentStep >= processingSteps.length) {
            setIsComplete(true);
            return;
        }

        const step = processingSteps[currentStep];
        const progressIncrement = 100 / processingSteps.length;
        const tickInterval = step.duration / 20;

        let ticks = 0;
        const interval = setInterval(() => {
            ticks++;
            const stepProgress = (ticks / 20) * progressIncrement;
            setOverallProgress(currentStep * progressIncrement + stepProgress);

            if (ticks >= 20) {
                clearInterval(interval);
                setCurrentStep((prev) => prev + 1);
            }
        }, tickInterval);

        return () => clearInterval(interval);
    }, [currentStep]);

    const handleViewResults = () => {
        router.push("/results");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 -z-10 animated-gradient" />
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl float" />
                <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: "-3s" }} />
            </div>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6 relative">
                            {isComplete ? (
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            ) : (
                                <>
                                    <Cpu className="w-10 h-10 text-white" />
                                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                                </>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            {isComplete ? "Analysis Complete!" : "Analyzing Your Results"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isComplete
                                ? "Your personalized report is ready"
                                : "Our AI is evaluating your performance..."}
                        </p>
                    </div>

                    {/* Progress card */}
                    <Card className="glass border-white/30 mb-8">
                        <CardContent className="pt-6">
                            {/* Overall progress */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Processing</span>
                                    <span className="font-semibold">{Math.round(overallProgress)}%</span>
                                </div>
                                <Progress value={overallProgress} className="h-3" />
                            </div>

                            {/* Steps */}
                            <div className="space-y-3">
                                {processingSteps.map((step, index) => {
                                    const isActive = index === currentStep;
                                    const isCompleted = index < currentStep;

                                    return (
                                        <div
                                            key={step.id}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                                    ? "bg-primary/10 border border-primary/30"
                                                    : isCompleted
                                                        ? "bg-accent/10"
                                                        : "bg-muted/30"
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCompleted
                                                        ? "bg-accent text-accent-foreground"
                                                        : isActive
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : isActive ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <step.icon className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span
                                                className={`text-sm font-medium ${isActive ? "text-foreground" : isCompleted ? "text-accent" : "text-muted-foreground"
                                                    }`}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA */}
                    {isComplete ? (
                        <div className="text-center">
                            <Button size="lg" onClick={handleViewResults} className="gap-2 pulse-glow">
                                View Your Results
                                <Sparkles className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                                <Clock className="w-4 h-4" />
                                Estimated time remaining: {Math.ceil((processingSteps.length - currentStep) * 4)}s
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
