// RemoteJobsPage.tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import ProfileButton from '@/components/ProfileButton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Chatbox } from "@/components/Chatbox";

import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const remoteSites = [
  {
    name: "Remote OK",
    link: "https://remoteok.com/",
    desc: "A popular remote job board for developers, designers, and marketers.",
  },
  {
    name: "We Work Remotely",
    link: "https://weworkremotely.com/",
    desc: "One of the largest remote work communities with job listings across tech and beyond.",
  },
  {
    name: "Remotive",
    link: "https://remotive.io/",
    desc: "Remote jobs across engineering, marketing, support, and more.",
  },
  {
    name: "Upwork",
    link: "https://www.upwork.com/",
    desc: "Freelance platform for all kinds of gigs and long-term contracts.",
  },
  {
    name: "Fiverr",
    link: "https://www.fiverr.com/",
    desc: "Sell digital services starting at $5 across design, writing, and tech.",
  },
  {
    name: "Freelancer",
    link: "https://www.freelancer.com/",
    desc: "Freelancing platform for professionals in tech, writing, and more.",
  },
  {
    name: "Toptal",
    link: "https://www.toptal.com/",
    desc: "Exclusive freelance network for top-tier developers and designers.",
  },
  {
    name: "Guru",
    link: "https://www.guru.com/",
    desc: "Find freelance work and gigs in programming, writing, and design.",
  },
  {
    name: "PeoplePerHour",
    link: "https://www.peopleperhour.com/",
    desc: "Freelance marketplace connecting clients to talent by the hour or project.",
  },
  {
    name: "SimplyHired",
    link: "https://www.simplyhired.com/",
    desc: "General job search engine with many remote-friendly listings.",
  },
  {
    name: "FlexJobs",
    link: "https://www.flexjobs.com/",
    desc: "Curated remote and flexible jobs with a focus on legitimacy.",
  },
  {
    name: "Remote.co",
    link: "https://remote.co/",
    desc: "Remote job board for roles in support, design, HR, and more.",
  },
  {
    name: "AngelList",
    link: "https://angel.co/",
    desc: "Startup-focused job board often with remote options.",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/",
    desc: "Professional networking with remote job filters and applications.",
  },
  {
    name: "Glassdoor",
    link: "https://www.glassdoor.com/",
    desc: "Company reviews and job listings with remote filters.",
  },
  {
    name: "Indeed",
    link: "https://www.indeed.com/",
    desc: "Massive job board with an option to search for remote roles.",
  },
  {
    name: "ZipRecruiter",
    link: "https://www.ziprecruiter.com/",
    desc: "Job search engine with smart matching for remote jobs.",
  },
  {
    name: "Hubstaff Talent",
    link: "https://talent.hubstaff.com/",
    desc: "Free resource for companies looking to find remote freelancers.",
  },
  {
    name: "Working Nomads",
    link: "https://www.workingnomads.co/jobs",
    desc: "Curated remote jobs for digital nomads and techies.",
  },
  {
    name: "Freelance Writing Jobs",
    link: "https://www.freelancewritinggigs.com/",
    desc: "Jobs board for writers, editors, and content creators.",
  },
  {
    name: "ProBlogger",
    link: "https://problogger.com/jobs/",
    desc: "Great place to find blogging and content marketing gigs.",
  },
  {
    name: "Behance",
    link: "https://www.behance.net/joblist",
    desc: "Creative job listings focused on design and visual arts.",
  },
  {
    name: "99Designs",
    link: "https://99designs.com/",
    desc: "Design contest platform for freelance designers.",
  },
  {
    name: "Dribbble",
    link: "https://dribbble.com/jobs",
    desc: "Design-focused job board with remote UI/UX listings.",
  },
  {
    name: "DesignCrowd",
    link: "https://www.designcrowd.com/",
    desc: "Crowdsourced design work for freelancers and agencies.",
  },
  {
    name: "Simply Law Jobs",
    link: "https://www.simplylawjobs.com/",
    desc: "Legal industry jobs, including some remote legal roles.",
  },
  {
    name: "Remote Jobs Club",
    link: "https://remotejobsclub.com/",
    desc: "Free email newsletter of curated remote jobs.",
  },
  {
    name: "Reddit Job Boards",
    link: "https://www.reddit.com/r/forhire/",
    desc: "Community-based job listings and freelance gigs.",
  },
  {
    name: "Virtual Vocations",
    link: "https://www.virtualvocations.com/",
    desc: "Telecommuting jobs board with daily updates.",
  },
  {
    name: "Crowded",
    link: "https://www.crowded.com/",
    desc: "Aggregated job platform with smart job matching.",
  },
  {
    name: "TaskRabbit",
    link: "https://www.taskrabbit.com/",
    desc: "Gig platform for local tasks and remote assistance.",
  },
  {
    name: "Clickworker",
    link: "https://www.clickworker.com/",
    desc: "Micro-tasking site for remote side gigs.",
  },
  {
    name: "Amazon Mechanical Turk",
    link: "https://www.mturk.com/",
    desc: "Micro-jobs platform for simple, repetitive online tasks.",
  },
  {
    name: "Appen",
    link: "https://appen.com/",
    desc: "AI training jobs like labeling, transcription, and evaluation.",
  },
  {
    name: "Lionbridge",
    link: "https://www.lionbridge.com/",
    desc: "Remote opportunities in translation and AI training.",
  },
  {
    name: "LanguageLine Solutions",
    link: "https://www.languageline.com/",
    desc: "Remote interpreting and translation jobs.",
  },
  {
    name: "Verblio",
    link: "https://www.verblio.com/",
    desc: "Freelance writing gigs for marketing and SEO content.",
  },
  {
    name: "Scribie",
    link: "https://scribie.com/",
    desc: "Remote transcription platform for audio and video.",
  },
  {
    name: "TranscribeMe",
    link: "https://www.transcribeme.com/",
    desc: "Remote work for transcription and data services.",
  },
  {
    name: "Remote.com",
    link: "https://remote.com/",
    desc: "All-in-one platform for hiring and finding remote work globally.",
  },
  {
    name: "Kaggle",
    link: "https://www.kaggle.com/",
    desc: "Competitions and freelance data science challenges.",
  },
  {
    name: "Skyword",
    link: "https://www.skyword.com/",
    desc: "Content marketing jobs for experienced freelancers.",
  },
  {
    name: "WritersDomain",
    link: "https://www.writersdomain.net/",
    desc: "Freelance writing jobs with flexible deadlines.",
  },
  {
    name: "Textbroker",
    link: "https://www.textbroker.com/",
    desc: "Platform for freelance writing and content creation.",
  },
  {
    name: "The Muse",
    link: "https://www.themuse.com/",
    desc: "Job listings with insight into company culture.",
  },
  {
    name: "Jobspresso",
    link: "https://jobspresso.co/",
    desc: "Remote tech jobs with a focus on development and support.",
  },
  {
    name: "Outsourcely",
    link: "https://www.outsourcely.com/",
    desc: "Hire and work with remote professionals directly.",
  },
];

export default function RemoteJobsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">Remote Jobs List</h1>

      <>
      <ProfileButton />
      {/* rest of your dashboard */}
    </>
      <Card>
        <CardHeader>
          <CardTitle>Find Your Next Remote Gig</CardTitle>
          <CardDescription>
            Browse through a curated list of remote job boards and freelance platforms to start or advance your remote career.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Bookmark this page and check back often — we keep this list updated.
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableCaption>A curated list of remote job boards and freelance marketplaces.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remoteSites.map((site) => (
                <TableRow key={site.name}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{site.desc}</TableCell>
                  <TableCell>
                    <a
                      href={site.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
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

      
<Chatbox />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Navigation</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Back to Top</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
