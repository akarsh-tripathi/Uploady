import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    try{
        const data = await request.json();

        const {filename, url, userId} = (data);
        const newDocumentUploaded = await db.document.create({
            data:{
                filename,
                url,
                userId,
            }
        })
        console.log(newDocumentUploaded);
        return NextResponse.json({message: "Document Feild created"});
    }catch(e){
        return NextResponse.error();
    }
}