'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavbarWithSidebar from '@/components/NavbarWithSidebar';
import Image from 'next/image';

type BlogPost = {
  id: string;
  title: string;
  image: string;
  category: string;
  content: string;
  date: string;
};

export default function BlogPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('blogPosts');
    if (saved) {
      const allPosts: BlogPost[] = JSON.parse(saved);
      const found = allPosts.find(p => p.id === id);
      if (found) setPost(found);
    }
  }, [id]);

  if (!post) {
    return <NavbarWithSidebar><p className="p-6">Loading or post not found...</p></NavbarWithSidebar>;
  }

  return (
    <NavbarWithSidebar>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          Category: {post.category} • Posted on {new Date(post.date).toLocaleDateString()}
        </p>
        {post.image && (
          <div className="relative w-full h-64">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="prose prose-sm max-w-none">
          <p>{post.content}</p>
        </div>
      </div>
    </NavbarWithSidebar>
  );
}
