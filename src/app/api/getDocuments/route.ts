import { AuthOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  let session = await getServerSession(AuthOptions);
  console.log(session);
 let files = await prisma.document.findMany({
        where: {
            userId: session?.user.username,
        },
    });
  console.log(files);
  return NextResponse.json(files);
}