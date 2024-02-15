'use client'
import { prisma } from '@/lib/db';
import React, { FC } from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useSession } from 'next-auth/react';


const FileListMap: ({id,filename,url,userId,createdAt,updatedAt}) => {
      
  return (
    <>
        {/* The Function of Card Format */}
        <ul>
        {Files.map((file) => (
            <li key={file.id}>
            <Card className="width:300">
                <CardHeader>
                <CardTitle>{file.filename}</CardTitle>
                <CardDescription>{file.userId}</CardDescription>
                </CardHeader>
                <CardFooter className="text-10">
                <p>{file.createdAt.toLocaleDateString()}</p>
                </CardFooter>
            </Card>
            <div className="space-y-4">
            </div>
            </li>
        ))}
        </ul>
    </>
  )
}

export default FileListMap