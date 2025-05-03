'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NavbarWithSidebar from '@/components/NavbarWithSidebar';
import type { TextareaHTMLAttributes } from 'react';
import { Chatbox } from '@/components/Chatbox';

const Textarea = ({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`min-h-[100px] border border-input bg-background rounded-md p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  />
);

type BlogPost = {
  id: string;
  title: string;
  image: string;
  category: string;
  content: string;
  date: string;
};

const defaultPost: BlogPost = {
  id: '',
  title: '',
  image: '',
  category: '',
  content: '',
  date: '',
};

export default function BlogFormPage() {
  const [post, setPost] = useState<BlogPost>(defaultPost);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('blogPosts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = () => {
    const updatedPost: BlogPost = {
      ...post,
      id: editingId || Date.now().toString(),
      date: editingId ? post.date : new Date().toISOString(),
    };

    const updatedPosts = editingId
      ? posts.map((p) => (p.id === editingId ? updatedPost : p))
      : [...posts, updatedPost];

    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setPost(defaultPost);
    setEditingId(null);
  };

  const editPost = (id: string) => {
    const found = posts.find((p) => p.id === id);
    if (found) {
      setPost(found);
      setEditingId(id);
    }
  };

  const deletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
    setPosts(updated);
  };

  return (
    <NavbarWithSidebar>
      <Chatbox />
      <Card className="p-6 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Create Blog Post</h1>
        <Input
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <div className="space-y-2">
          <Input
            placeholder="Image URL"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
          <label className="block text-sm text-muted-foreground">Or upload a photo:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPost((prev) => ({ ...prev, image: reader.result as string }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <Input
          placeholder="Category (e.g. age-salary)"
          name="category"
          value={post.category}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Content"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <Button onClick={savePost}>
          {editingId ? 'Update' : 'Save'} Post
        </Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4">
        {posts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((p) => (
            <Card key={p.id} className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-muted-foreground">
                Category: {p.category}
              </p>
              {isMounted && (
                <p className="text-xs text-muted-foreground">
                  Date: {new Date(p.date).toLocaleDateString()}
                </p>
              )}
              {isMounted && p.image && (
                <div className="relative w-full h-32">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => editPost(p.id)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deletePost(p.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </NavbarWithSidebar>
  );
}
