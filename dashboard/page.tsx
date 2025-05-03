"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar'; // Case-sensitive!
 // use exact case

import NavbarWithSidebar from '@/components/NavbarWithSidebar'; // Import the NavbarWithSidebar component
// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// Charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Icons



import {
  FaBars,
  FaBriefcase,
  FaCheckCircle,
  FaFolderOpen,
  FaThumbsUp,
  FaGift,
  FaFileAlt,
  FaEye,
  FaChartBar,
  FaClock,
  FaEnvelope,
  FaReply,
  FaCalendarAlt,
} from "react-icons/fa";

// i18n Country List
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

interface DashboardData {
  jobsApplied: string;
  jobsClosed: string;
  openApplications: string;
  followers: string;
  ups: string;
  emailsSent: string;
  followUpsReceived: string;
  interviewsScheduled: string;
  interviewFollowUps: string;
  offersReceived: string;
  resumesSent: string;
  employerViews: string;
  applicationsBySource?: Record<string, number>;
  lastActivity?: string;
}



 

const yearRanges = [
  { label: "1990–2000", start: 1990, end: 2000 },
  { label: "2000–2010", start: 2000, end: 2010 },
  { label: "2010–2020", start: 2010, end: 2020 },
  { label: "2020–Present", start: 2020, end: new Date().getFullYear() },
];

const countryOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({ code, name })
);

const industries = [
  "Automotive", "Finance", "Technology", "Healthcare", "Education",
  "Retail", "Entertainment", "Insurance", "Athletics", "Manufacturing",
];

const pieColors = ["#000000", "#FFC0CB", "#22c55e"];
const pieLabels = ["Men", "Women", "18 to 24"];

export default function TrendingJobsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "all",
    yearRange: yearRanges[3],
    industry: "all",
  });
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);

  const router = useRouter();

 useEffect(() => {
  if (typeof window === 'undefined') return; // ensure it's only run on client

  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    router.push('/login');
  }
}, [router]);

  


  const dashboardData: DashboardData = {
    jobsApplied: "120",
    jobsClosed: "80",
    openApplications: "40",
    followers: "1,200",
    ups: "300",
    emailsSent: "100",
    followUpsReceived: "50",
    interviewsScheduled: "25",
    interviewFollowUps: "10",
    offersReceived: "7",
    resumesSent: "90",
    employerViews: "600",
    applicationsBySource: {
      LinkedIn: 100,
      Indeed: 50,
      Referral: 20,
    },
    lastActivity: new Date().toISOString(),
  };

  const handleFilterChange = (key: keyof typeof filters, value: string | typeof yearRanges[number]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        { label: "2020", value: 200 },
        { label: "2021", value: 300 },
        { label: "2022", value: 400 },
        { label: "2023", value: 500 },
        { label: "2024", value: 600 }, // Add 2024 data
        { label: "2025", value: 700 }, // Add 2025 data
      ];
      setChartData(
        mockData.filter(
          (item) =>
            parseInt(item.label) >= filters.yearRange.start &&
            parseInt(item.label) <= filters.yearRange.end
        )
      );
    };
    fetchData();
  }, [filters]);

  const renderChart = () => {
    if (!chartData.length) return <p>No data available for the selected filters.</p>;

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                payload={pieLabels.map((label, index) => ({
                  id: label,
                  value: label,
                  type: "square",
                  color: pieColors[index],
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const statCards = [
    { title: "Jobs Applied", value: dashboardData.jobsApplied, icon: FaBriefcase },
    { title: "Jobs Closed", value: dashboardData.jobsClosed, icon: FaCheckCircle },
    { title: "Open Applications", value: dashboardData.openApplications, icon: FaFolderOpen },
    { title: "Emails Sent", value: dashboardData.emailsSent, icon: FaEnvelope },
    { title: "Follow Ups", value: dashboardData.followUpsReceived, icon: FaReply },
    { title: "Interviews Scheduled", value: dashboardData.interviewsScheduled, icon: FaCalendarAlt },
    { title: "Interview Follow Ups", value: dashboardData.interviewFollowUps, icon: FaThumbsUp },
    { title: "Offers Received", value: dashboardData.offersReceived, icon: FaGift },
    { title: "Resumes Sent", value: dashboardData.resumesSent, icon: FaFileAlt },
    { title: "Employer Views", value: dashboardData.employerViews, icon: FaEye },
    {
      title: "Applications by Source",
      value: Object.values(dashboardData.applicationsBySource || {}).reduce((a, b) => a + b, 0),
      icon: FaChartBar,
    },
    {
      title: "Last Activity",
      value: dashboardData.lastActivity
        ? new Date(dashboardData.lastActivity).toLocaleString()
        : "N/A",
      icon: FaClock,
    },
  ];

  return (
    <NavbarWithSidebar>
    {/* Main Container for Dashboard */}
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Navbar at the top */}
      <div className="p-4 flex justify-between items-center shadow-md bg-white z-50 relative">
        <h1 className="text-xl font-bold">JobIndex</h1>
        {/* Sidebar toggle button for mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />


{/* Sidebar Overlay for mobile (clicking it closes sidebar) */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}


      {/* Main Content Section */}
      <main className="bg-background-foreground p-8 space-y-6 pt-20">
        {/* Dashboard Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex space-x-4">
            {/* Settings and Logout Buttons */}
            <Link href="/settings">
              <Button className="bg-primary">Settings</Button>
            </Link>
            <Button className="bg-accent text-accent-foreground">Logout</Button>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <card.icon className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard-Specific Content */}
        <div>
          <p>Welcome to your dashboard!</p>
          {/* Add any other dashboard data or components here */}
        </div>

        {/* Filters Section */}
        <Card className="p-6 space-y-6">
          <CardHeader>
            <CardTitle>Statistical Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Country Filter */}
            <div>
              <label className="text-sm mb-1 block">Country</label>
              <Select
                value={filters.country}
                onValueChange={(val) => handleFilterChange('country', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countryOptions.map(({ code, name }) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Range Filter */}
            <div>
              <label className="text-sm mb-1 block">Year Range</label>
              <Select
                value={filters.yearRange.label}
                onValueChange={(val) => {
                  const selectedRange = yearRanges.find((range) => range.label === val);
                  if (selectedRange) {
                    handleFilterChange('yearRange', selectedRange);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year range" />
                </SelectTrigger>
                <SelectContent>
                  {yearRanges.map((range) => (
                    <SelectItem key={range.label} value={range.label}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="text-sm mb-1 block">Industry</label>
              <Select
                value={filters.industry}
                onValueChange={(val) => handleFilterChange('industry', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
          <Button
            variant={chartType === 'pie' ? 'default' : 'outline'}
            onClick={() => setChartType('pie')}
          >
            Pie
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
          {renderChart()}
        </div>

        {/* Chart Description */}
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              This chart shows the amount of applicants in a given industry per year, in hundreds of thousands of applicants.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  </NavbarWithSidebar>
);
};