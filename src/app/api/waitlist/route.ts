import { connectDB, Waitlist } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await connectDB();

    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ message: "Already registered" }, { status: 200 });
    }

    await Waitlist.create({ email });
    const count = await Waitlist.countDocuments();

    return NextResponse.json({ message: "Registered", count }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ message: "Already registered" }, { status: 200 });
    }
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const count = await Waitlist.countDocuments();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
