"use client";
import { cn } from "@/lib/utils";
import React, { use, useState } from "react";
import Dropzone from "react-dropzone";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/auth";
import { useSession } from "next-auth/react";

const dropzone = () => {
  const { data: session } = useSession();
  console.log("Yes this is me-", session);
  const { toast } = useToast();
  const maxSize = 1048576;

  const onDrop = (acceptedFile: File[]) => {
    acceptedFile.forEach((file) => {
      console.log(file);
      const reader = new FileReader();

      reader.onabort = () => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      };
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });

    const uploadFile = async (selectedFile: File) => {
      const { data, error } = await supabase.storage
        .from("UploadedFiles")
        .upload("public/" + selectedFile.name, selectedFile as File);

      if (data) {
        const response = await fetch("api/fileupload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: selectedFile.name,
            url: data.path,
            userId: session?.user.username,
          }),
        });
        if (response.ok) {
          console.log("Updated to Database as well!");
          toast({
            title: "File Uploaded",
            description: "File has been uploaded successfully!",
          });
        } else {
          console.log("ERROR");
          toast({
            variant: "destructive",
            title: "File Uploading Failed",
            description: "Kindly Upload Again",
          });
        }
        console.log(data);
      } else {
        console.log(data);
      }
    };
  };

  return (
    <>
      <Dropzone minSize={0} maxSize={maxSize} maxFiles={10} onDrop={onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
          isDragAccept,
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
          return (
            <section className="m-4">
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-80 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                  isDragActive
                    ? "bg-[#035ffe] text-white animate-pulse"
                    : "bg-slate-100/50 dark:bg-slate=800/80 text-slate-400",
                  isDragAccept
                    ? "bg-green text-white animate-pulse"
                    : "bg-slate-100/50 dark:bg-slate=800/80 text-slate-400"
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry!!"}
                {isFileTooLarge && "File is too large! Should be less than 20MB"}
              </div>
            </section>
          );
        }}
      </Dropzone>
      <div className="flex items-center space-x-2">
        <p>Drag & Drop your file to get uploaded! No need to click anywhere!</p>
      </div>
      {/* <FileSuccess/> */}
    </>
  );
};

export default dropzone;
