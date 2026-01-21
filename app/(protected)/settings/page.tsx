"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import {
    ArrowLeft,
    Bell,
    Camera,
    Check,
    ChevronRight,
    Eye,
    EyeOff,
    Globe,
    Key,
    Laptop,
    LogOut,
    Mail,
    Moon,
    Palette,
    Save,
    Shield,
    Smartphone,
    Sun,
    Trash2,
    User,
    Zap,
} from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form state
    const [profile, setProfile] = useState({
        fullName: user?.name || "",
        email: "student@example.com",
        phone: "+91 98765 43210",
        bio: "Aspiring data engineer passionate about building scalable data solutions.",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
        marketing: false,
        assessmentReminders: true,
        resultAlerts: true,
    });

    const [preferences, setPreferences] = useState({
        theme: "system",
        language: "en",
        reducedMotion: false,
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Dashboard
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <span className="font-semibold">Settings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {showSuccess && (
                                <div className="flex items-center gap-2 text-accent text-sm">
                                    <Check className="w-4 h-4" />
                                    Saved
                                </div>
                            )}
                            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="w-4 h-4" />
                            <span className="hidden sm:inline">Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="gap-2">
                            <Palette className="w-4 h-4" />
                            <span className="hidden sm:inline">Preferences</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2">
                            <Shield className="w-4 h-4" />
                            <span className="hidden sm:inline">Security</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        {/* Avatar */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Photo</CardTitle>
                                <CardDescription>This will be displayed on your profile</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                                    {profile.fullName.charAt(0) || "U"}
                                </div>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Camera className="w-4 h-4" />
                                        Change Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Personal info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={profile.fullName}
                                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <textarea
                                        id="bio"
                                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Channels</CardTitle>
                                <CardDescription>Choose how you want to receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { key: "email", label: "Email Notifications", icon: Mail, description: "Receive updates via email" },
                                    { key: "push", label: "Push Notifications", icon: Smartphone, description: "Browser push notifications" },
                                    { key: "sms", label: "SMS Alerts", icon: Zap, description: "Critical alerts via SMS" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-muted">
                                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.label}</p>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Types</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { key: "assessmentReminders", label: "Assessment Reminders", description: "Get reminded before assessments" },
                                    { key: "resultAlerts", label: "Result Alerts", description: "Notify when results are ready" },
                                    { key: "marketing", label: "Marketing & Updates", description: "News about new features and offers" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Switch
                                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        { value: "light", label: "Light", icon: Sun },
                                        { value: "dark", label: "Dark", icon: Moon },
                                        { value: "system", label: "System", icon: Laptop },
                                    ].map((theme) => (
                                        <button
                                            key={theme.value}
                                            onClick={() => setPreferences({ ...preferences, theme: theme.value })}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${preferences.theme === theme.value
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <theme.icon className={`w-6 h-6 mx-auto mb-2 ${preferences.theme === theme.value ? "text-primary" : "text-muted-foreground"
                                                }`} />
                                            <span className="font-medium">{theme.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Accessibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Reduced Motion</p>
                                        <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
                                    </div>
                                    <Switch
                                        checked={preferences.reducedMotion}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, reducedMotion: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" placeholder="••••••••" />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>New Password</Label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Confirm New Password</Label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <Key className="w-4 h-4" />
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive/30">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                                    <div>
                                        <p className="font-medium">Delete Account</p>
                                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                                    </div>
                                    <Button variant="destructive" size="sm" className="gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </Button>
                                </div>
                                <Separator />
                                <Button variant="outline" onClick={handleLogout} className="gap-2 w-full">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
