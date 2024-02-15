import { NextResponse } from "next/server";


const protectedRoutes=['/dashboard','/upload','/files','/settings'];
const AlreadyAuthenticatedRoutes=['/'];

export default function middleware(req:any) {
    let cookie = req.cookies.get('next-auth.session-token');
    console.log("middleware_cookie: ",cookie);

    if(!cookie && protectedRoutes.includes(req.nextUrl.pathname)){
        const absoluteUrl = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    if(cookie && AlreadyAuthenticatedRoutes.includes(req.nextUrl.pathname)){
        const absoluteUrl = new URL('/dashboard', req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }
}