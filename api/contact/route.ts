import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';

const COLLECTION = 'email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);

    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).insertOne({ name, email, message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_FORM_EMAIL,
      subject: `📩 New Message from ${name}`,
      text: `${name} (${email}) says: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="font-size: 12px; color: #888;">Sent from your website contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent to:', process.env.CONTACT_FORM_EMAIL);
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('❌ Email/DB error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const messages = await db.collection(COLLECTION).find().toArray();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { _id, ...updates } = await req.json();
    const db = await connectToDatabase();
    const result = await db
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(_id) }, { $set: updates });
    return NextResponse.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    console.error('❌ Update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();
    const db = await connectToDatabase();
    const result = await db
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(_id) });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error('❌ Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
