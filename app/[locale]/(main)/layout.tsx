import Footer from "@/app/[locale]/(main)/footer";
import Header from "@/app/[locale]/(main)/header";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};
export default async function MainLayout({ children }: DashboardProps) {

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-10 md:pt-8">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
