"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Dropzone from "react-dropzone";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";

const dropzone = () => {
  const handleUpload = async (acceptedFiles: File) => {};
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
            <ToastAction altText="Goto schedule to undo">
              Undo
            </ToastAction>
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
                  userId: "string",
                }),
            });
            if(response.ok){
                console.log("Updated to Database as well!")
            }else{
                console.log("ERROR")
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
          isDragAccept
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
          return (
            <section className="m-4">
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
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
                {isFileTooLarge && (
                  <div>
                    toast( title: "Scheduled: Catch up ", description: "Friday,
                    February 10, 2023 at 5:57 PM", action: (
                    <ToastAction altText="Goto schedule to undo">
                      Undo
                    </ToastAction>
                    ), )
                  </div>
                )}
              </div>
            </section>
          );
        }}
      </Dropzone>
      <div className="flex items-center space-x-2">
        <p>
            Drag & Drop your file to get uploaded! No need to click anywhere! 
        </p>
      </div>
      {/* <div className="flex items-center space-x-2">
                  <Button onClick={}>Upload</Button>
                  <Button variant="secondary">Share</Button>
        </div> */}
    </>
  );
};

export default dropzone;
