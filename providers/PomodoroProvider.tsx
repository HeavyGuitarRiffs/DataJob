'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { toast } from 'sonner';
import { usePomodoroSettings } from '@/hooks/usePomodoroSettings';

type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroContextType {
  taskName: string;
  setTaskName: (name: string) => void;
  durations: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  setDurations: (durations: {
    work: number;
    shortBreak: number;
    longBreak: number;
  }) => void;
  phase: PomodoroPhase;
  secondsLeft: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | null>(null);

const MOTIVATION_TOASTS = [
  '⏳ Time check: Stay focused!',
  '🔥 You’re doing great!',
  '🎯 Your next job is close!',
  '💪 Push through, you got this!',
  '☕ Water break? Stretch a little!',
];

const TOAST_INTERVAL_MINUTES = 5;

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const { settings, updateSetting } = usePomodoroSettings();
  const [taskName, setTaskName] = useState<string>(settings.taskName);
  const [durations, setDurations] = useState({
    work: settings.workDuration * 60,
    shortBreak: settings.shortBreak * 60,
    longBreak: settings.longBreak * 60,
  });

  const [phase, setPhase] = useState<PomodoroPhase>('work');
  const [secondsLeft, setSecondsLeft] = useState<number>(600); // 10 min work to start
  const [isRunning, setIsRunning] = useState(false);

  const phaseIndexRef = useRef(0);
  const motivationIndexRef = useRef(0);
  const toastIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showMotivationalToast = useCallback(() => {
    const message = MOTIVATION_TOASTS[motivationIndexRef.current];
    toast(message);
    motivationIndexRef.current =
      (motivationIndexRef.current + 1) % MOTIVATION_TOASTS.length;
  }, []);

  const startMotivationalToasts = useCallback(() => {
    if (!toastIntervalRef.current) {
      toastIntervalRef.current = setInterval(() => {
        showMotivationalToast();
      }, TOAST_INTERVAL_MINUTES * 60 * 1000);
    }
  }, [showMotivationalToast]);

  const clearMotivationalToasts = useCallback(() => {
    if (toastIntervalRef.current) {
      clearInterval(toastIntervalRef.current);
      toastIntervalRef.current = null;
    }
  }, []);

  const nextPhase = useCallback(() => {
    const cycle = [
      { phase: 'work', duration: durations.work },
      { phase: 'shortBreak', duration: durations.shortBreak },
      { phase: 'work', duration: durations.work },
      { phase: 'shortBreak', duration: durations.shortBreak },
      { phase: 'work', duration: durations.work },
      { phase: 'longBreak', duration: durations.longBreak },
    ];

    const nextIndex = (phaseIndexRef.current + 1) % cycle.length;
    const next = cycle[nextIndex];
    phaseIndexRef.current = nextIndex;

    setPhase(next.phase as PomodoroPhase);
    setSecondsLeft(next.duration);

    if (next.phase === 'work') {
      toast('🔔 Back to work!');
    } else if (next.phase === 'shortBreak') {
      toast('☕ Short break time!');
    } else {
      toast('🧘 Long break time!');
    }

    setIsRunning(true); // auto-continue
  }, [durations]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startMotivationalToasts();
      toast('🍅 Pomodoro started! Focus time ⏳');
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearMotivationalToasts();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    phaseIndexRef.current = 0;
    setPhase('work');
    setSecondsLeft(600); // Reset to 10 minutes work
    clearMotivationalToasts();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const updateTaskName = (name: string) => {
    setTaskName(name);
    updateSetting('taskName', name);
  };

  const updateDurations = (newDurations: {
    work: number;
    shortBreak: number;
    longBreak: number;
  }) => {
    setDurations({
      work: newDurations.work * 60,
      shortBreak: newDurations.shortBreak * 60,
      longBreak: newDurations.longBreak * 60,
    });
    updateSetting('workDuration', newDurations.work);
    updateSetting('shortBreak', newDurations.shortBreak);
    updateSetting('longBreak', newDurations.longBreak);
  };
// Countdown timer
useEffect(() => {
  if (!isRunning) return;

  timerRef.current = setInterval(() => {
    setSecondsLeft((prev) => Math.max(prev - 1, 0));
  }, 1000);

  return () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
  };
}, [isRunning]);

// When countdown hits 0, transition to next phase
useEffect(() => {
  if (secondsLeft === 0 && isRunning) {
    setIsRunning(false);
    clearInterval(timerRef.current!);
    timerRef.current = null;

    // Slight delay to prevent multiple rapid calls
    setTimeout(() => {
      nextPhase();
    }, 100);
  }
}, [secondsLeft, isRunning, nextPhase]);

  return (
    <PomodoroContext.Provider
      value={{
        taskName,
        setTaskName: updateTaskName,
        durations,
        setDurations: updateDurations,
        phase,
        secondsLeft,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};
