import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/utils";

import { NextResponse } from "next/server";
import { z } from "zod";
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, username } = body
    const alreadyEmail = await prisma.user.findFirst({
      where: {

      },
    })
    if (alreadyEmail) {
      return NextResponse.json({ user: null, message: "Email already exist" }, { status: 409 })
    }
    const userName = await prisma.user.findFirst({
      where: {

      },
    })
    if (userName) {
      return NextResponse.json({ user: null, message: "userName already exist" }, { status: 409 })
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await prisma.user.create({
      data: {
        email,
        password:hashedPassword,
        userName: username,
      }
    })
    const { password: newUserPassword, ...rest } = newUser
    return NextResponse.json({ user: rest, message: "User Created Successfully" }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: "Something Wrong" }, { status: 500 })
  }
}