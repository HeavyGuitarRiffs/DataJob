import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';

const COLLECTION = 'blogs';

export async function GET() {
  const db = await connectToDatabase();
  const data = await db.collection(COLLECTION).find().toArray();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await connectToDatabase();
  const result = await db.collection(COLLECTION).insertOne(body);
  return NextResponse.json({ insertedId: result.insertedId });
}

export async function PATCH(req: NextRequest) {
  const { _id, ...updates } = await req.json();
  const db = await connectToDatabase();
  const result = await db.collection(COLLECTION).updateOne(
    { _id },
    { $set: updates }
  );
  return NextResponse.json({ updatedCount: result.modifiedCount });
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  const db = await connectToDatabase();
  const result = await db.collection(COLLECTION).deleteOne({ _id });
  return NextResponse.json({ deletedCount: result.deletedCount });
}
