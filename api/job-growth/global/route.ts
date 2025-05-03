import { NextRequest, NextResponse } from 'next/server';

type JobGrowthData = {
  country: string;
  month: string;
  growth: number | null;
};

type WorldBankApiResponse = [
  unknown,
  {
    country: { id: string };
    date: string;
    value: number | null;
  }[]
];

const REGION_COUNTRIES: Record<string, string[]> = {
  LATAM: ['ARG', 'BRA', 'CHL', 'COL', 'PER', 'MEX'],
  ASIA: ['CHN', 'IND', 'JPN', 'KOR', 'IDN', 'THA'],
  EUROPE: ['DEU', 'FRA', 'GBR', 'ESP', 'ITA', 'NLD'],
  AFRICA: ['NGA', 'ZAF', 'EGY', 'KEN', 'GHA', 'ETH'],
  USA: ['USA'],
  WLD: ['WLD'],
};

const CACHE: Record<string, { data: JobGrowthData[]; timestamp: number }> = {};
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const fetchCountryData = async (countryCode: string): Promise<JobGrowthData[]> => {
  const cacheKey = `country-${countryCode}`;
  const now = Date.now();

  // Check cache
  if (CACHE[cacheKey] && now - CACHE[cacheKey].timestamp < CACHE_TTL) {
    return CACHE[cacheKey].data;
  }

  try {
    const res = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json`
    );

    // Check if the response is OK
    if (!res.ok) {
      console.error(`Failed to fetch data for ${countryCode}: ${res.statusText}`);
      return [];
    }

    const data: WorldBankApiResponse = await res.json();

    // Check if the data is valid
    if (!data[1]) {
      console.warn(`No data found for ${countryCode}`);
      return [];
    }

    // Format the data
    const formatted: JobGrowthData[] = data[1].slice(-12).map((item) => ({
      country: countryCode,
      month: item.date,
      growth: item.value,
    }));

    // Cache the data
    CACHE[cacheKey] = { data: formatted, timestamp: now };
    return formatted;
  } catch (error) {
    console.error(`Error fetching data for ${countryCode}:`, error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const country = url.searchParams.get('country');
  const region = url.searchParams.get('region');

  let results: JobGrowthData[] = [];

  try {
    if (country) {
      // Fetch data for a specific country
      results = await fetchCountryData(country.toUpperCase());
    } else if (region) {
      // Fetch data for a region
      const countries = REGION_COUNTRIES[region.toUpperCase()];
      if (!countries) {
        return NextResponse.json({ error: 'Invalid region' }, { status: 400 });
      }

      // Fetch data for all countries in the region
      const promises = countries.map((code) => fetchCountryData(code));
      const allData = await Promise.all(promises);

      results = allData.flat().sort((a, b) => b.month.localeCompare(a.month));
    } else {
      // Default to World data
      results = await fetchCountryData('WLD');
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error handling job growth request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}