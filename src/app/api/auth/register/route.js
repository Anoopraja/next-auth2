import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/model/route";
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: "Email usernameand password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hash,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          username: user.username,
          id: user._id,
          email: user.email,
          password: user.password,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}