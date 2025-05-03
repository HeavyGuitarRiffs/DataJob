import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectToDatabase';
import { ObjectId } from 'mongodb';
import type { UpdateFilter, Document } from 'mongodb';

// GET: Retrieve dashboard data for a specific user
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('dashboard');

    const dashboard = await collection.findOne({ userId: new ObjectId(userId) });

    if (!dashboard) {
      const defaultData = {
        userId: new ObjectId(userId),
        jobsApplied: 0,
        jobsClosed: 0,
        openApplications: 0,
        followers: 0,
        ups: 0,
        emailsSent: 0,
        followUpsReceived: 0,
        interviewsScheduled: 0,
        interviewFollowUps: 0,
        offersReceived: 0,
        resumesSent: 0,
        employerViews: 0,
        applicationsBySource: {
          LinkedIn: 0,
          Indeed: 0,
          Referral: 0,
        },
        lastActivity: null,
      };

      await collection.insertOne(defaultData);
      return NextResponse.json(defaultData, { status: 201 });
    }

    return NextResponse.json(dashboard);
  } catch (err) {
    console.error('GET /dashboard/:userId error:', err);
    return NextResponse.json({ message: 'Error fetching dashboard' }, { status: 500 });
  }
}

// PATCH: Update dashboard fields for a specific user
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await req.json();

  try {
    const db = await connectToDatabase();
    const collection = db.collection('dashboard');

    const updateFields: Partial<UpdateFilter<Document>> = {};

    if (body.increment) {
      updateFields.$inc = body.increment;
    }

    updateFields.$set = { lastActivity: new Date().toISOString() };

    const result = await collection.updateOne(
      { userId: new ObjectId(userId) },
      updateFields,
      { upsert: true }
    );

    return NextResponse.json({ updated: true, result });
  } catch (err) {
    console.error('PATCH /dashboard/:userId error:', err);
    return NextResponse.json({ message: 'Error updating dashboard' }, { status: 500 });
  }
}
