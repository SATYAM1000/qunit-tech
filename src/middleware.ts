/** @format */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublicPath =
		path === "/login" ||
		path === "/signup" ||
		path === "/verify-email" 
	const token = await getToken({ req: request });
	console.log("your token in middleware is ", token);
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
}

export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/verify-email",
		"/job",
		"/freelancing",
		"/learning",
		"/categories",
	],
};
