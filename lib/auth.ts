// Auth utilities for localStorage-based mock auth

import { User, AuthState } from "@/types/user";

const AUTH_KEY = "byc_auth";
const USER_KEY = "byc_user";

// Default mock user for MVP
const mockUser: User = {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Data Engineer",
    assessmentProgress: {
        currentPhase: "not-started",
        overallProgress: 0,
    },
    createdAt: new Date().toISOString(),
};

export function getAuthState(): AuthState {
    if (typeof window === "undefined") {
        return { user: null, isAuthenticated: false, isLoading: true };
    }

    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? JSON.parse(userJson) : null;

    return {
        user,
        isAuthenticated,
        isLoading: false,
    };
}

export function login(): User {
    if (typeof window === "undefined") {
        throw new Error("Cannot login on server");
    }

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    return mockUser;
}

export function logout(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
}

export function updateUser(updates: Partial<User>): User {
    if (typeof window === "undefined") {
        throw new Error("Cannot update user on server");
    }

    const userJson = localStorage.getItem(USER_KEY);
    const currentUser = userJson ? JSON.parse(userJson) : mockUser;
    const updatedUser = { ...currentUser, ...updates };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
}

export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
}
