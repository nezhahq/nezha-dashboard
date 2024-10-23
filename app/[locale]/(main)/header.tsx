"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import getEnv from "@/lib/env-entry";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { navRouter } from "@/lib/nav-router";
import Link from "next/link";

function Header() {
  const t = useTranslations("Header");
  const customLogo = getEnv("NEXT_PUBLIC_CustomLogo");
  const customTitle = getEnv("NEXT_PUBLIC_CustomTitle");
  const customDescription = getEnv("NEXT_PUBLIC_CustomDescription");

  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="w-full dark:bg-black/40 bg-muted border-b-[1px]">
      <div className="max-w-5xl mx-auto pt-8 px-4 lg:px-0 flex flex-col gap-4">
        <section className="flex items-center justify-between">
          <section
            className="flex items-center text-base font-medium"
          >
            <div className="mr-1 flex flex-row items-center justify-start">
              <Image
                width={40}
                height={40}
                unoptimized
                alt="apple-touch-icon"
                src={customLogo ? customLogo : "/apple-touch-icon.png"}
                className="relative !m-0 border-2 border-transparent h-6 w-6 object-cover object-top !p-0"
              />
            </div>
            Nezha-Dashboard
          </section>
          <section className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </section>
        </section>
        <Overview />
        <TabNav />
      </div>
    </div>
  );
}

// https://github.com/streamich/react-use/blob/master/src/useInterval.ts
const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => { });
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [delay]);
};
function Overview() {
  const t = useTranslations("Overview");
  const [mouted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const timeOption = DateTime.TIME_SIMPLE;
  timeOption.hour12 = true;
  const [timeString, setTimeString] = useState(
    DateTime.now().setLocale("en-US").toLocaleString(timeOption),
  );
  useInterval(() => {
    setTimeString(DateTime.now().setLocale("en-US").toLocaleString(timeOption));
  }, 1000);
  return (
    <section className={"flex flex-col"}>
      <p className="text-sm font-semibold">👋 晚上好, Hamster</p>
      <div className="flex items-center gap-1.5">
        <p className="text-[13px] font-medium opacity-50">
          {t("p_2390-2457_wherethetimeis")}
        </p>
        {mouted ? (
          <p className="opacity-1 text-[13px] font-medium">{timeString}</p>
        ) : (
          <Skeleton className="h-[19px] w-[50px] rounded-[5px] bg-muted-foreground/10 animate-none"></Skeleton>
        )}
      </div>
    </section>
  );
}


function TabNav() {
  const locale = useLocale();
  const tabs = navRouter
  const nowPath = usePathname()
  const [path, setPath] = useState('')

  useEffect(() => {
    const realPath = nowPath.replace(`/${locale}`, '')
    setPath(realPath)
  }, [nowPath])

  return (
    <div className="z-50 flex flex-col items-start w-full overflow-x-scroll scrollbar-hidden">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`/${locale}/${tab.path}`}
            className={cn(
              "relative cursor-pointer rounded-3xl px-2.5 py-[8px] text-sm font-[600] transition-all duration-500",
              path === tab.path
                ? "text-black dark:text-white"
                : "text-stone-400 dark:text-stone-500"
            )}
          >
            <div className="relative z-20 flex items-center gap-1">
              <p className="whitespace-nowrap">{tab.name}</p>
            </div>
            {path === tab.path && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}





export default Header;
