'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../ui/avatar"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";


  
  export function UserNav() {
    const {data:session} = useSession();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{getInitials(session?.user.name??'AT')}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user.username}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>signOut({
            redirect:true,
            callbackUrl:'/'
        })} >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  function getInitials(fullName: string): string {
    const [firstName, lastName] = fullName.split(' ');
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : ''; // Handle cases where last name might be missing
    return `${firstInitial}${lastInitial}`;
}