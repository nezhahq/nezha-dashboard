"use client";

import Footer from "@/app/[locale]/(main)/footer";
import Header from "@/app/[locale]/(main)/header";
import LoginForm from "@/components/login-form";
import { useAuth } from "@/context/AuthContext";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: DashboardProps) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 bg-muted/50 flex-col gap-4">
        <Header />
        {!user && <LoginForm />}
        {user && children}
        <Footer />
      </main>
    </div>
  );
}
