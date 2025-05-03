import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongo';

const COLLECTION = 'dashboard';

// GET: Return all dashboards (not recommended in production)
export async function GET() {
  try {
    const db = await connectToDatabase();
    const data = await db.collection(COLLECTION).find().toArray();
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/dashboard error:', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

// POST: Create a new dashboard with default values
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const defaultData = {
      jobsApplied: 0,
      jobsClosed: 0,
      openApplications: 0,
      emailsSent: 0,
      followUpsReceived: 0,
      interviewsScheduled: 0,
      interviewFollowUps: 0,
      offersReceived: 0,
      resumesSent: 0,
      employerViews: 0,
      applicationsBySource: {
        linkedIn: 0,
        indeed: 0,
        other: 0,
      },
      lastActivity: null,
      ...body, // supports passing userId or custom fields
    };

    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).insertOne(defaultData);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error('POST /api/dashboard error:', err);
    return NextResponse.json({ error: 'Failed to create dashboard' }, { status: 500 });
  }
}

// PATCH: Increment a specific field by 1 or more
export async function PATCH(req: NextRequest) {
  try {
    const { _id, field, increment = 1 } = await req.json();

    if (!_id || !field) {
      return NextResponse.json({ error: 'Missing _id or field' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(_id) },
      {
        $inc: { [field]: increment },
        $set: { lastActivity: new Date().toISOString() },
      }
    );

    return NextResponse.json({ updatedCount: result.modifiedCount });
  } catch (err) {
    console.error('PATCH /api/dashboard error:', err);
    return NextResponse.json({ error: 'Failed to update dashboard' }, { status: 500 });
  }
}

// DELETE: Delete a dashboard by _id
export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('DELETE /api/dashboard error:', err);
    return NextResponse.json({ error: 'Failed to delete dashboard' }, { status: 500 });
  }
}
