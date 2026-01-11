"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";


export function NavGate(){
    const pathname = usePathname();

    if (pathname === "/welcome") return null;

    return <TopNav />;
}