'use client';

import { useState } from 'react';
import { usePomodoro } from '@/app/providers/PomodoroProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Chatbox } from "@/components/Chatbox";

export default function SettingsPage() {
  const { taskName, setTaskName, durations, setDurations } = usePomodoro();

  const [motivationalMessages, setMotivationalMessages] = useState<string[]>([
    '⏳ Time check: Stay focused!',
    '🔥 You’re doing great!',
    '🎯 Your next job is close!',
    '💪 Push through, you got this!',
    '☕ Water break? Stretch a little!',
  ]);

  const handleDurationChange = (key: keyof typeof durations, value: number) => {
    setDurations({
      ...durations,
      [key]: value * 60,
    });
  };

  const handleMotivationalMessageChange = (index: number, value: string) => {
    const updatedMessages = [...motivationalMessages];
    updatedMessages[index] = value;
    setMotivationalMessages(updatedMessages);
  };

  const handleAddMessage = () => {
    setMotivationalMessages([...motivationalMessages, '']);
  };

  const handleRemoveMessage = (index: number) => {
    const updatedMessages = motivationalMessages.filter((_, i) => i !== index);
    setMotivationalMessages(updatedMessages);
  };

  const handleSaveChanges = () => {
    setTaskName(taskName);
    setDurations(durations);
    console.log('Motivational messages saved:', motivationalMessages);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-cyan-300 drop-shadow-[0_0_6px_cyan]">
        Pomodoro Settings
      </h1>

      <Chatbox />

      {/* Task Name */}
      <div className="bg-gray-900 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/30 p-5 space-y-3">
        <label className="block font-semibold text-cyan-200">Task Name</label>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-black text-white border-cyan-300 focus:ring-cyan-400"
        />
      </div>

      {/* Work Duration */}
      <div className="bg-gray-900 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/30 p-5 space-y-3">
        <label className="block font-semibold text-cyan-200">Work Duration (min)</label>
        <Input
          type="number"
          min="1"
          value={Math.floor(durations.work / 60)}
          onChange={(e) => handleDurationChange('work', parseInt(e.target.value))}
          className="bg-black text-white border-cyan-300 focus:ring-cyan-400"
        />
      </div>

      {/* Short Break Duration */}
      <div className="bg-gray-900 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/30 p-5 space-y-3">
        <label className="block font-semibold text-cyan-200">Short Break Duration (min)</label>
        <Input
          type="number"
          min="1"
          value={Math.floor(durations.shortBreak / 60)}
          onChange={(e) => handleDurationChange('shortBreak', parseInt(e.target.value))}
          className="bg-black text-white border-cyan-300 focus:ring-cyan-400"
        />
      </div>

      {/* Long Break Duration */}
      <div className="bg-gray-900 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/30 p-5 space-y-3">
        <label className="block font-semibold text-cyan-200">Long Break Duration (min)</label>
        <Input
          type="number"
          min="1"
          value={Math.floor(durations.longBreak / 60)}
          onChange={(e) => handleDurationChange('longBreak', parseInt(e.target.value))}
          className="bg-black text-white border-cyan-300 focus:ring-cyan-400"
        />
      </div>

      {/* Motivational Messages */}
      <div className="bg-gray-900 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/30 p-5 space-y-4">
        <h2 className="text-xl font-semibold text-cyan-300 drop-shadow-[0_0_5px_cyan]">
          Motivational Messages
        </h2>
        {motivationalMessages.map((message, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => handleMotivationalMessageChange(index, e.target.value)}
              className="flex-1 bg-black text-white border-cyan-300 focus:ring-cyan-400"
            />
            <Button
              variant="destructive"
              onClick={() => handleRemoveMessage(index)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddMessage} className="bg-cyan-700 hover:bg-cyan-800 text-white">
          Add Message
        </Button>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <Button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-lg shadow-md shadow-cyan-500/40"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
