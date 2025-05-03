'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import NavbarWithSidebar from '@/components/NavbarWithSidebar';

type BlogPost = {
  id: string;
  title: string;
  image: string;
  category: string;
  content: string;
  date: string;
};

export default function ReportsPage() {
  const [postsByCategory, setPostsByCategory] = useState<Record<string, BlogPost[]>>({});

  useEffect(() => {
    const saved = localStorage.getItem('blogPosts');
    if (saved) {
      const allPosts: BlogPost[] = JSON.parse(saved);
      const grouped = allPosts.reduce((acc, post) => {
        if (!acc[post.category]) {
          acc[post.category] = [];
        }
        acc[post.category].push(post);
        return acc;
      }, {} as Record<string, BlogPost[]>);
      setPostsByCategory(grouped);
    }
  }, []);

  return (
    <NavbarWithSidebar>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">Reports by Category</h1>
        {Object.entries(postsByCategory).map(([category, posts]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold text-pink-600">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/reports/${post.id}`} passHref>
                  <Card className="p-4 space-y-2 cursor-pointer hover:bg-gray-50 transition">
                    <h3 className="font-semibold text-lg text-blue-600 hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    {post.image && (
                      <div className="relative w-full h-32">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </div>
                    )}
                    {/* Content is removed here */}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </NavbarWithSidebar>
  );
}
