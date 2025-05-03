// /app/api/insights/route.ts
// Example import (update the path as needed)
import { getInsights } from '@/lib/getInsights';


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country');
    const industry = searchParams.get('industry');
    const ageGroup = searchParams.get('ageGroup');
  
    // Fetch filtered data from DB, service, or mock
    const data = await getInsights({ country, industry, ageGroup });
  
    return Response.json(data);
  }
  