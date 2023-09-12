"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, PropsWithChildren } from "react"

const navigations = [
  {
    to: "/",
    label: "User",
  },
  {
    to: "/contacts",
    label: "Contact",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
  },
  {
    to: "/login",
    label: "Login",
  },
  {
    to: "/register",
    label: "Register",
  },
  {
    to: "/auth-only",
    label: "Auth Only",
  },
]

const Navigation: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div>
      <nav className="flex justify-center space-x-2 p-2">
        {navigations.map((navigation, i) => (
          <Link
            key={i}
            href={navigation.to}
            className={`text-gray-900 ${
              pathname === navigation.to ? "bg-green-50" : "bg-white"
            } border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
          >
            {navigation.label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Navigation
