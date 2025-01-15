
"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";


import { navLinks } from "@/lib/constants";


const TopBar = () => {
  const [dropdownMenu, setDropdownenu] = useState(false);
  const pathName = usePathname();


  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" width={150} height={150} alt="logo"></Image>
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathName===link.url?"text-blue-1":""}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div
        className="relative flex gap-4 text-body-medium items-center"
        onClick={() => setDropdownenu(!dropdownMenu)}
      >
        { dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                <link.icon />
                <p className="">{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <Menu className="md:hidden"></Menu>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
