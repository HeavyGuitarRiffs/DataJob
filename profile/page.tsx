"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { Chatbox } from "@/components/Chatbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TextareaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const Textarea = ({ value, onChange, rows = 3 }: TextareaProps) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={rows}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  />
);

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Jane Doe",
    currentJob: "Software Engineer at OpenAI",
    seeking: "Frontend Engineer roles",
    studying: "AI + TypeScript",
    following: "Game Dev, Indie SaaS, Design Trends",
  });

  const [avatarUrl, setAvatarUrl] = useState("/placeholder-avatar.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleSave = () => {
    alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Profile Header Card with Name Field and Avatar Upload */}
      <Card>
        <CardHeader className="flex items-center justify-center flex-col space-y-4">
          <div
            onClick={handleAvatarClick}
            className="cursor-pointer hover:opacity-90 transition"
          >
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt="Avatar" />
              <AvatarFallback>~</AvatarFallback>
            </Avatar>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-full text-center">
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("name", e.target.value)
              }
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </CardHeader>
      </Card>

      
<Chatbox />

      {/* Quick Blurb Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Blurb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Current Job</label>
            <Input
              value={form.currentJob}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("currentJob", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Seeking</label>
            <Input
              value={form.seeking}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("seeking", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Currently Studying / Researching
            </label>
            <Input
              value={form.studying}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("studying", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Currently Following
            </label>
            <Textarea
              value={form.following}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleChange("following", e.target.value)
              }
              rows={3}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
