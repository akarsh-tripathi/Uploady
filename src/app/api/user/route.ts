import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";


// SIGNUP SCHEMA FOR VALIDATION

const signUpFormSchema = z.object({
    name: z.string(),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(5, {message: "Password must be at least 8 characters."}),
})


export async function POST(request: Request){
    try{
        const data = await request.json();

        const {name, username, email,password} = signUpFormSchema.parse(data);
        //const {name, username, email,password} = data;
        
        //CONDITION CHECK : IF USERNAME OR EMAIL ALREADY EXISTS
        const exsistingUserbyUsername = await db.user.findUnique({
            where:{username:username}
        });

        if(exsistingUserbyUsername){
            return NextResponse.json({user:null,message:"User already exists"});
        }
        const exsistingUserbyEmail = await db.user.findUnique({
            where:{email:email}
        });

        if(exsistingUserbyEmail){
            return NextResponse.json({user:null,message:"User already exists"});
        }

        //HASHING OF PASSWORD WITH BCRYPT

        const hashedPassword = await hash(password,10);
        // USER CREATED IF NOT EXIST
        const newUser = await db.user.create({
            data:{
                name,
                username,
                email,
                password:hashedPassword
            }
        })
        console.log(newUser);
        return NextResponse.json({message: "User created"});
    }catch(e){
        return NextResponse.error();
    }
}