import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = cookies()
        const cookie = cookieStore.get('token')
        const response = NextResponse.json({
            "TokenCookie": cookie,
            "success": true
        });
        return response

    } catch (error) {
        return NextResponse.json({
            "success": false
        })
    }
}