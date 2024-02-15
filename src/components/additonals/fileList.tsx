'use client'
import { useState, useEffect, FC } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useSession } from 'next-auth/react';

interface Document {
  id: number;
  filename: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const FileListMap: FC = () => {
  const [docfiles, setDocFiles] = useState<Document[]>([]); // Provide initial state as an empty array
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        //const url = process.env.NEXT_PUBLIC_LOCAL_URLL+'/api/getDocuments';
        const url = 'http://localhost:3000/api/getDocuments';
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const files = await response.json();
        setDocFiles(files);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocs();
  });
  


  return (
    <div>
      <ul className="space-y-4">
        {docfiles.map((file: Document) => (
          <li key={file.id}>
            <Card className="width:300">
              <CardHeader>
                <CardTitle>{file.filename}</CardTitle>
                <CardDescription>{file.userId}</CardDescription>
              </CardHeader>
              <CardFooter className="text-10">
                <p>{new Date(file.createdAt).toDateString() }</p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileListMap;
