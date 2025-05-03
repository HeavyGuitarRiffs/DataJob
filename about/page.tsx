"use client";
import React from "react";
import ProfileButton from '@/components/ProfileButton';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-2">
          I created this app with the idea of using real time and historical data to help job seekers make informed decisions about their career.
          their careers. Trends and forecasts in data could help signal a market shift, and inspire workers to train for a new hobby, learn a new skill, 
          or even to start a new business.
        </p>
        <p className="text-lg">
          This is a career mall. A job fair. A container, merely a folder with extensions for all the major job sites there.
          A place where you can communicate, measure your performance, and scale your effectiveness.
          Job seeking, is a job itself. By creating a place where efforts can be concentrated, I hope my clients here can learn, receive real time job updates, 
          start that new business or career, and land the next opportunity they are looking for.
        </p>
      </section>

      <ProfileButton />

      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-lg mb-2">
          An aggregate of listings from major job boards, making your search faster and smarter. Evolving job
          markets require adaptive seekers. Here, there is access to real-time job data and insights—an online
          mall of career opportunities.
        </p>
        <p className="text-lg">
          This app is for the curious, the flexible, and the builders. Most job sites give you the job listings, and statistics and data about industry performance are separate.
          I wanted to create an app where they are in the same place. Research your industry of choice, study the data, and decide your next steps.
          Learn where the job market is, and you can help determine what the future of your industry will be.
        </p>
      </section>

      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h2 className="text-xl font-semibold mb-2">The Market Shift</h2>
        <ul className="list-disc list-inside space-y-1 text-lg">
          <li>A Saturated Niche + Technology = Mass Replacement to some but it also == Opportunity to others</li>
          <li>1,000s Of Job Applications + Few Interviews = Time To Build With Like Minds!</li>
          <li>Your Network Is Enough. Grow with others instead of competing with them!</li>
        </ul>
      </section>

      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h2 className="text-2xl font-semibold mb-2">Jobs</h2>
        <p className="text-lg mb-2">
          If you’re still career-focused, a web scraper pulls curated roles based on your skills—roles you can share with your network to increase your chances of landing interviews.
        </p>
        <p className="text-lg">
          This app is about measuring data in industry performance.
        </p>
      </section>

      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h2 className="text-xl font-semibold mb-2">Forecast Market Shifts</h2>
        <p className="text-lg">Content Generation Industry Projected Growth: $280B → $500B by 2028</p>
        <p className="text-lg">Sometimes a market looks like it has reached its peak, but it could also be undergoing a shift.</p>
      </section>

      <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 neon">
        <h2 className="text-2xl font-semibold mb-2">Entrepreneurship</h2>
        <p className="text-lg mb-2">
          The next big job you are looking for... might just be the business *you already are*.
        </p>
        <p className="text-lg mb-2">Build while you ask. Ask while you build.</p>
        <p className="text-lg mb-2">
          Maximize income between contracts and work by launching your own ideas. Your competitors? They become your collaborators.
        </p>
        <p className="text-lg mb-2">
          Form your team. Vote on priorities. Reach consensus. Build with people who believe in your mission.
        </p>
        <p className="text-lg italic text-yellow-700">
          Tech Shift == $t@rtup Prof!ts 💸
        </p>
      </section>
    </div>
  );
}
