'use client';

import './styles/globals.css';
import { useEffect } from 'react';
import Image from 'next/image';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import FooterLink from '@/components/FooterLink';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Toaster, toast } from 'sonner';
import { usePomodoro } from '@/app/providers/PomodoroProvider';

// Auto-start Pomodoro + show toast every 5 mins
function AutoPomodoroStarter() {
  const { startTimer, secondsLeft, isRunning } = usePomodoro();

  useEffect(() => {
    if (!isRunning) {
      startTimer();
      toast.success('🍅 Pomodoro started!');
    }
  }, [isRunning, startTimer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning && secondsLeft % (5 * 60) === 0 && secondsLeft !== 0) {
        toast('⏰ Time Check: Stay focused!');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, isRunning]);

  return null;
}

export default function Home() {
  return (
    <div>
      <Toaster position="top-right" richColors />
      <AutoPomodoroStarter />  {/* Ensure this component has the Pomodoro context */}

      {/* Background Animation */}
      <div className="relative min-h-screen">
        {/* 🌈 Put animated background here */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse top-0 left-0" />
          <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-2xl animate-pulse bottom-0 right-0" />
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          <div className="flex flex-col space-y-2 items-center justify-center min-h-screen px-4 sm:px-20 py-10 gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-50 text-center">
            
            {/* Header Navigation */}
            <header className="w-full flex justify-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-popover text-popover-foreground shadow-lg rounded-lg p-2 space-y-2">
                      <NavigationMenuLink href="/jobs" className="block px-4 py-2">All Jobs</NavigationMenuLink>
                      <NavigationMenuLink href="/remote-jobs" className="block px-4 py-2">Remote Jobs</NavigationMenuLink>
                      <NavigationMenuLink href="/about" className="block px-4 py-2">About</NavigationMenuLink>
                      <NavigationMenuLink href="/contact" className="block px-4 py-2">Contact</NavigationMenuLink>
                      <NavigationMenuLink href="/pricing" className="block px-4 py-2">Pricing</NavigationMenuLink>
                      <NavigationMenuLink href="/dashboard" className="block px-4 py-2">Dashboard</NavigationMenuLink>
                      <NavigationMenuLink href="/blog" className="block px-4 py-2">Blog</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </header>

            {/* App Logo and Title */}
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <Image src="/favicon.png" width={48} height={48} alt="App Logo" />
                <h1 className="text-2xl font-bold">DataJob</h1>
              </div>
            </div>

            {/* Main Section */}
            <main className="flex flex-col gap-8 items-center sm:items-start">
              <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
              <ol className="list-inside list-decimal text-sm text-center sm:text-left">
                <li className="mb-2 tracking-tight">
                  Get started by editing <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">app/page.tsx</code>.
                </li>
                <li className="tracking-tight">Real Time Data + Job Library</li>
                <li className="tracking-tight">Coworking Spaces</li>
                <li className="tracking-tight">Smart Job Tracker</li>
              </ol>
            </main>

            {/* Welcome Section */}
            <main className="p-4">
              <h1 className="text-2xl font-bold text-center">Welcome</h1>
            </main>

            {/* Footer */}
            <footer className="flex flex-col items-center justify-center gap-6 mt-8">
              <div className="flex flex-wrap gap-6 justify-center">
                <FooterLink href="https://nextjs.org/learn" icon="/file.svg" label="Learn" />
                <FooterLink href="https://vercel.com/templates" icon="/window.svg" label="Examples" />
                <FooterLink href="https://nextjs.org" icon="/globe.svg" label="Go to nextjs.org →" />
              </div>

              <div className="text-center mt-8">
                <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                <ul className="flex justify-center space-x-6">
                  <li><a href="https://www.facebook.com" target="_blank"><FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" /></a></li>
                  <li><a href="https://www.twitter.com" target="_blank"><FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl" /></a></li>
                  <li><a href="https://www.instagram.com" target="_blank"><FaInstagram className="text-pink-600 hover:text-pink-800 text-2xl" /></a></li>
                  <li><a href="https://www.linkedin.com" target="_blank"><FaLinkedin className="text-blue-700 hover:text-blue-900 text-2xl" /></a></li>
                </ul>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
