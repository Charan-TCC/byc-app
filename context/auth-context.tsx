"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthState } from "@/types/user";
import { getAuthState, login as authLogin, logout as authLogout, updateUser } from "@/lib/auth";

interface AuthContextType extends AuthState {
    login: () => void;
    logout: () => void;
    updateProgress: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check auth state on mount
        const authState = getAuthState();
        setState(authState);
    }, []);

    const login = () => {
        const user = authLogin();
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const logout = () => {
        authLogout();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    const updateProgress = (updates: Partial<User>) => {
        const updatedUser = updateUser(updates);
        setState((prev) => ({
            ...prev,
            user: updatedUser,
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                updateProgress,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
