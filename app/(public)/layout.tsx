import { AuthProvider } from "@/context/auth-context";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthProvider>{children}</AuthProvider>;
}
