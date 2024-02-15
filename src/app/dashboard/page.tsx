'use client';
import { Metadata } from "next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";

import { Separator } from "../../components/ui/separator";
import Dropzone from "@/components/additonals/dropzone";
import { UserNav } from "@/components/additonals/UserAccountNav";
import FileListMap from "@/components/additonals/fileList";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Uploady Dashboard to Upload Files",
// };


export default async function Home() {
  
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Uploady</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <UserNav />
            {/* <Button onClick={()=>signOut} variant='destructive'> SignOut</Button> */}
            <div className="hidden space-x-2 md:flex"></div>
          </div>
        </div>
        <Separator />
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_400px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Files
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    View All your files here! .
                  </HoverCardContent>
                </HoverCard>
                <div>
               <FileListMap/>
                </div> 
                
              </div>
            </div>
            <div className="md:order-1">
              <div className="flex h-full flex-col space-y-4">
                <div className="place-content-center">
                  <div>
                    <Dropzone />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
