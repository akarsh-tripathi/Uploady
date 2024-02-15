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
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/getDocuments`);
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
  }, []);

  return (
    <>
      <ul className="space-y-4">
        {docfiles.map((file: Document) => (
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
          </li>
        ))}
      </ul>
    </>
  );
}

export default FileListMap;
