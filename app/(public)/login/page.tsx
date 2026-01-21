"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { ArrowRight, Sparkles, Target, Users, Award } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const handleEnter = () => {
        login();
        router.push("/onboarding");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden animated-gradient">
            {/* Background decorations with float animation */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl float" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
                <div className="absolute top-1/2 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl float" style={{ animationDelay: '-1.5s' }} />
            </div>

            {/* Decorative lines */}
            <div className="absolute inset-0 -z-10 dot-pattern opacity-30" />

            {/* Logo and branding */}
            <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 glow">
                        <span className="text-white font-bold text-xl sm:text-2xl">B</span>
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                        BuildYour<span className="text-gradient">.Careers</span>
                    </span>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto font-medium">
                    Diagnostic Talent Evaluation Platform
                </p>
            </div>

            {/* Main login card with glass effect */}
            <Card className="w-full max-w-md glass border-white/30 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl sm:text-3xl font-bold">
                        Welcome
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                        Discover your role-fit through our comprehensive diagnostic assessment
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    {/* Feature highlights with hover effect */}
                    <div className="grid gap-3">
                        {[
                            { icon: Target, text: "4-phase diagnostic assessment", color: "primary" },
                            { icon: Sparkles, text: "Role-specific training pathways", color: "accent" },
                            { icon: Users, text: "Direct placement with top companies", color: "secondary" },
                            { icon: Award, text: "Industry-veteran mentorship", color: "warning" },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors group icon-bounce"
                            >
                                <div className={`w-9 h-9 rounded-xl bg-${feature.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-4 h-4 text-${feature.color}`} />
                                </div>
                                <span className="font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Enter button with pulse glow */}
                    <Button
                        onClick={handleEnter}
                        className="w-full h-14 text-base font-semibold group pulse-glow rounded-xl"
                        size="lg"
                    >
                        Enter Platform
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* Footer text */}
                    <p className="text-center text-xs text-muted-foreground">
                        By entering, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
                        {" "}and{" "}
                        <span className="underline cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
                    </p>

                    {/* Register link */}
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="text-primary font-medium hover:underline">
                            Create Account
                        </a>
                    </p>
                </CardContent>
            </Card>

            {/* Bottom tagline */}
            <p className="mt-8 text-center text-sm text-muted-foreground max-w-sm font-medium">
                Developed by industry veterans to bridge the gap between education and employment
            </p>

            {/* Floating badge */}
            <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg text-xs font-medium text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                500+ students placed
            </div>
        </main>
    );
}
