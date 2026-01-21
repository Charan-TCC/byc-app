"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    Code2,
    Play,
    RotateCcw,
    Terminal,
    XCircle,
} from "lucide-react";

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
    loading: () => (
        <div className="h-full flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading editor...
            </div>
        </div>
    ),
});

// Coding problems
const codingProblems = [
    {
        id: 1,
        title: "Find Duplicate Numbers",
        description: `Given a list of numbers, return all numbers that appear more than once.

**Example:**
\`\`\`
Input: [1, 2, 3, 2, 4, 3, 5]
Output: [2, 3]
\`\`\`

**Constraints:**
- List length: 1 to 1000
- Numbers are positive integers`,
        starterCode: `def find_duplicates(numbers):
    # Your code here
    pass

# Test your solution
print(find_duplicates([1, 2, 3, 2, 4, 3, 5]))`,
        testCases: [
            { input: "[1, 2, 3, 2, 4, 3, 5]", expected: "[2, 3]", hidden: false },
            { input: "[1, 1, 1, 1]", expected: "[1]", hidden: false },
            { input: "[1, 2, 3, 4, 5]", expected: "[]", hidden: true },
        ],
        language: "python",
    },
    {
        id: 2,
        title: "SQL Query: Top Customers",
        description: `Write a SQL query to find the top 3 customers by total order amount.

**Table: orders**
| Column | Type |
|--------|------|
| customer_id | INT |
| order_amount | DECIMAL |
| order_date | DATE |

**Expected Output:**
- customer_id
- total_amount (sum of all orders)
- Sorted by total_amount descending
- Limit to top 3`,
        starterCode: `-- Write your SQL query here
SELECT 
    customer_id,
    -- Add your aggregation here
FROM orders
-- Complete the query`,
        testCases: [
            { input: "Sample data", expected: "Query returns 3 rows", hidden: false },
            { input: "Aggregation check", expected: "Uses SUM function", hidden: false },
            { input: "Order check", expected: "DESC ordering", hidden: true },
        ],
        language: "sql",
    },
];

const TOTAL_TIME = 15 * 60; // 15 minutes

export default function CodingLabPage() {
    const router = useRouter();
    const { updateProgress } = useAuth();
    const [currentProblem, setCurrentProblem] = useState(0);
    const [code, setCode] = useState<Record<number, string>>({
        0: codingProblems[0].starterCode,
        1: codingProblems[1].starterCode,
    });
    const [testResults, setTestResults] = useState<Record<number, boolean[]>>({});
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    // Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmitAll();
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

    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode((prev) => ({
                ...prev,
                [currentProblem]: value,
            }));
        }
    };

    const handleRunTests = () => {
        setIsRunning(true);

        // Simulate test execution
        setTimeout(() => {
            const problem = codingProblems[currentProblem];
            const results = problem.testCases.map((_, index) => {
                // Mock: first two tests pass, hidden test has 50% chance
                if (index < 2) return true;
                return Math.random() > 0.5;
            });

            setTestResults((prev) => ({
                ...prev,
                [currentProblem]: results,
            }));
            setIsRunning(false);
        }, 1500);
    };

    const handleReset = () => {
        setCode((prev) => ({
            ...prev,
            [currentProblem]: codingProblems[currentProblem].starterCode,
        }));
        setTestResults((prev) => ({
            ...prev,
            [currentProblem]: [],
        }));
    };

    const handleSubmitAll = useCallback(() => {
        setIsSubmitting(true);

        // Calculate score based on solved problems
        const solvedCount = Object.values(testResults).filter((results) =>
            results.every((r) => r === true)
        ).length;
        const score = Math.round((solvedCount / codingProblems.length) * 100);

        // Update progress
        updateProgress({
            assessmentProgress: {
                currentPhase: "video",
                coding: {
                    completed: true,
                    score: Math.max(score, 60), // Minimum 60% for demo
                    completedAt: new Date().toISOString(),
                },
                overallProgress: 50,
            },
        });

        setTimeout(() => {
            router.push("/assessment/video");
        }, 500);
    }, [testResults, router, updateProgress]);

    const problem = codingProblems[currentProblem];
    const currentResults = testResults[currentProblem] || [];
    const isLowTime = timeLeft < 60;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-accent">
                                <Code2 className="w-5 h-5" />
                                <span className="font-semibold hidden sm:inline">Coding Labs</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Phase 2 of 4
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Problem tabs */}
                            <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
                                {codingProblems.map((p, index) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setCurrentProblem(index)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentProblem === index
                                                ? "bg-card text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        Problem {index + 1}
                                    </button>
                                ))}
                            </div>

                            {/* Timer */}
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isLowTime ? "bg-destructive/10 text-destructive" : "bg-muted"
                                }`}>
                                <Clock className={`w-4 h-4 ${isLowTime ? "animate-pulse" : ""}`} />
                                <span className="font-mono font-semibold text-sm">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content - split view */}
            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Problem description */}
                <div className="lg:w-2/5 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase">
                                {problem.language}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {currentProblem + 1} of {codingProblems.length}
                            </span>
                        </div>

                        <h2 className="text-xl font-bold mb-4">{problem.title}</h2>

                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {problem.description}
                            </div>
                        </div>

                        <Separator className="my-6" />

                        {/* Test cases */}
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                Test Cases
                            </h3>
                            <div className="space-y-2">
                                {problem.testCases.map((tc, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                        <div className="text-sm">
                                            {tc.hidden ? (
                                                <span className="text-muted-foreground italic">Hidden test case</span>
                                            ) : (
                                                <>
                                                    <span className="text-muted-foreground">Input: </span>
                                                    <code className="text-xs bg-muted px-1 rounded">{tc.input}</code>
                                                </>
                                            )}
                                        </div>
                                        {currentResults[index] !== undefined && (
                                            currentResults[index] ? (
                                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-destructive" />
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code editor */}
                <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
                    {/* Editor */}
                    <div className="flex-1 bg-[#1e1e1e]">
                        <MonacoEditor
                            height="100%"
                            language={problem.language}
                            value={code[currentProblem]}
                            onChange={handleCodeChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Action bar */}
                    <div className="border-t border-border bg-card p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRunTests}
                                disabled={isRunning}
                                className="gap-2"
                            >
                                {isRunning ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Run Tests
                                    </>
                                )}
                            </Button>
                        </div>

                        <Button
                            onClick={handleSubmitAll}
                            disabled={isSubmitting}
                            className="gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit All
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
