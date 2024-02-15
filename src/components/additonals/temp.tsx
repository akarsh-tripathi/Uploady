'use client'

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { signOut } from "next-auth/react"
import { DropdownMenuShortcut } from "../ui/dropdown-menu"

export default function dropdownitem(){
    return(
        <div>
        <DropdownMenuItem onClick={()=>signOut({
            redirect:true,
            callbackUrl:'/'
        })} >
            
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        </div>
    )
}