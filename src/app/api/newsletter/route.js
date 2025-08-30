import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("api key");

// In src/app/api/newsletter/route.js
export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        const data = await resend.emails.send({
            from: "newsletter@yourdomain.com", // Must be a verified sender in Resend
            to: "bansalshivam325@gmail.com",
            subject: "New Newsletter Signup",
            html: `<p>New subscriber: <b>${email}</b></p>`
        });
        console.log("Resend response:", data); // <-- Add this line
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Resend error:", error); // <-- Add this line
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}