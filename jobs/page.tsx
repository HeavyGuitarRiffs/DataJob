"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import ProfileButton from '@/components/ProfileButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const jobSites = [
  {
    name: "LinkedIn",
    desc: "A popular job search engine for professionals.",
    link: "https://www.linkedin.com/jobs",
  },
  {
    name: "Indeed",
    desc: "Search millions of jobs from thousands of job boards.",
    link: "https://www.indeed.com/",
  },
  {
    name: "AngelList",
    desc: "Startup jobs and remote tech work listings.",
    link: "https://angel.co/jobs",
  },
  {
    name: "Glassdoor",
    desc: "Job listings with salary transparency and reviews.",
    link: "https://www.glassdoor.com/index.htm",
  },
  {
    name: "Jobot",
    desc: "AI + recruiters matching people with tech jobs.",
    link: "https://jobot.com/",
  },
  {
    name: "Catalyte",
    desc: "Reskilling and talent development platform.",
    link: "https://www.catalyte.io/",
  },
  {
    name: "Workable",
    desc: "Hiring software and job board for businesses.",
    link: "https://www.workable.com/",
  },
  {
    name: "Braintrust",
    desc: "Web3-powered freelance job platform.",
    link: "https://www.usebraintrust.com/",
  },
  {
    name: "1 Job Diva",
    desc: "Comprehensive staffing software and job platform.",
    link: "https://www.jobdiva.com/",
  },
  {
    name: "Bizfluence",
    desc: "Professional networking with job discovery.",
    link: "https://www.bizfluenceapp.com/",
  },
  {
    name: "Red Balloon",
    desc: "Free speech job board promoting liberty-minded hiring.",
    link: "https://www.redballoon.work/",
  },
];

export default function AllJobsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Job Lists</h1>

      <ProfileButton />

      {/* Job Boards Table */}
      <Card className="neon">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Job Boards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Site</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobSites.map((site) => (
                <TableRow key={site.name}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell>{site.desc}</TableCell>
                  <TableCell>
                    <a
                      href={site.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-300 transition"
                    >
                      Visit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Market Insights Card */}
      <Card className="neon">
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Content Creation Economy is Booming</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Apply. Keep track. Check your email. Perfect your resume. Add to your skills.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 dark:text-gray-400">Keep track of new goals</p>
        </CardFooter>
      </Card>
    </div>
  );
}
