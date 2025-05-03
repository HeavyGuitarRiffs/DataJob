'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useInsightsData from '@/hooks/useInsightsData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import ProfileButton from '@/components/ProfileButton';

import { Chatbox } from "@/components/Chatbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useGlobalFilters } from '@/context/FiltersContext';
import NavbarWithSidebar from '@/components/NavbarWithSidebar'; // ✅ Sidebar wrapper

countries.registerLocale(enLocale);

type Insight = {
  label: string;
  value: number;
};

type ChartType = 'bar' | 'line' | 'pie';

const countryOptions = Object.entries(countries.getNames('en')).map(
  ([code, name]) => ({ code, name })
);

const industries = [
  'Automotive', 'Finance', 'Technology', 'Healthcare', 'Education',
  'Retail', 'Entertainment', 'Insurance', 'Athletics', 'Manufacturing'
];

const ageGroups = ['18-25', '26-35', '36-50', '51+'];

const yearRanges = [
  { label: '1990–2000', start: 1990, end: 2000 },
  { label: '2000–2010', start: 2000, end: 2010 },
  { label: '2010–2020', start: 2010, end: 2020 },
  { label: '2020–Present', start: 2020, end: new Date().getFullYear() },
];

const pieColors = ['#000000','#ffc0cb','#22c55e']; // black, green, pink

const pieLabels = ['Men', 'Women', 'College'];

export default function InsightsPage() {
  const {
    country: selectedCountry = 'all',
    setCountry: setSelectedCountry,
    industry: selectedIndustry = 'all',
    setIndustry: setSelectedIndustry,
    age: selectedAgeGroup = 'all',
    setAge: setSelectedAgeGroup,
  } = useGlobalFilters();

  const [chartType, setChartType] = useState<ChartType>('bar');
  const [selectedRange, setSelectedRange] = useState(yearRanges[3]);

  const { data: insights = [] as Insight[], error, isLoading } = useInsightsData();

  useEffect(() => {
    console.log('Fetching insights for:', {
      selectedCountry,
      selectedIndustry,
      selectedAgeGroup,
    });
  }, [selectedCountry, selectedIndustry, selectedAgeGroup]);

  const filteredInsights = useMemo(() => {
    return insights
      .filter(({ label }) => {
        const year = parseInt(label);
        return !isNaN(year) && year >= selectedRange.start && year <= selectedRange.end;
      })
      .sort((a, b) => parseInt(a.label) - parseInt(b.label));
  }, [insights, selectedRange]);

  const chartData = useMemo(() => {
    const extended = [...filteredInsights];
    const yearLabels = extended.map(i => i.label);
    if (!yearLabels.includes('2025')) {
      extended.push({ label: '2025', value: 0 });
    }
    return extended.map(({ label, value }) => ({
      name: label,
      applications: value,
      value,
    }));
  }, [filteredInsights]);

  const renderChart = () => {
    if (!chartData.length) return null;

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
                label={{
                  value: 'Thousands',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
                label={{
                  value: 'Thousands',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
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
                  type: 'square',
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

  return (
    <NavbarWithSidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Insights Dashboard</h1>
        <>
      <ProfileButton />
      {/* rest of your dashboard */}
    </>

    <Chatbox />
        <div className="flex gap-8 items-start flex-wrap lg:flex-nowrap">
          <div className="space-y-4 w-full max-w-xs">
            {/* Country Select */}
            <div>
              <span className="text-sm font-medium">Country</span>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countryOptions.map(({ code, name }) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry Select */}
            <div>
              <span className="text-sm font-medium">Industry</span>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age Group Select */}
            <div>
              <span className="text-sm font-medium">Age Group</span>
              <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select an age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Age Groups</SelectItem>
                  {ageGroups.map(age => (
                    <SelectItem key={age} value={age}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <aside className="max-w-sm text-sm leading-relaxed">
            <h3 className="font-semibold mb-2">📊 About this page</h3>
            <p>
              Use the dropdowns to explore industry trends across different regions and age groups. The chart updates dynamically based on your selection.
            </p>
          </aside>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant={chartType === 'bar' ? 'default' : 'outline'} onClick={() => setChartType('bar')}>Bar</Button>
          <Button variant={chartType === 'line' ? 'default' : 'outline'} onClick={() => setChartType('line')}>Line</Button>
          <Button variant={chartType === 'pie' ? 'default' : 'outline'} onClick={() => setChartType('pie')}>Pie</Button>
        </div>

        <div className="flex gap-4 flex-wrap mt-2">
          {yearRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange.label === range.label ? 'default' : 'outline'}
              onClick={() => setSelectedRange(range)}
            >
              {range.label}
            </Button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <strong>Country:</strong> {selectedCountry !== 'all' ? countries.getName(selectedCountry, 'en') : 'All Countries'} &nbsp; | &nbsp;
          <strong>Industry:</strong> {selectedIndustry !== 'all' ? selectedIndustry : 'All Industries'} &nbsp; | &nbsp;
          <strong>Age Group:</strong> {selectedAgeGroup !== 'all' ? selectedAgeGroup : 'All Age Groups'}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
          {isLoading && <p>Loading insights...</p>}
          {error && <p className="text-red-500">Failed to load data: {error.message}</p>}
          {!isLoading && !error && chartData.length > 0 && renderChart()}
          {!isLoading && !error && chartData.length === 0 && (
            <p className="text-gray-500">No insights available.</p>
          )}
        </div>
      </div>
    </NavbarWithSidebar>
  );
}
