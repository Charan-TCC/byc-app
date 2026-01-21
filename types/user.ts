// User types for BYC app

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    assessmentProgress: AssessmentProgress;
    createdAt: string;
}

export interface AssessmentProgress {
    currentPhase: 'not-started' | 'aptitude' | 'coding' | 'problem-solving' | 'video' | 'completed';
    aptitude?: PhaseResult;
    coding?: PhaseResult;
    problemSolving?: PhaseResult;
    video?: PhaseResult;
    overallProgress: number; // 0-100
}

export interface PhaseResult {
    completed: boolean;
    score?: number;
    completedAt?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
