"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Don't show header on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return <Header />;
}
