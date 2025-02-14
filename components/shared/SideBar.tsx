"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const SideBar = () => {

  const  pathname =usePathname();
  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href="/" className='sidebar-logo'>
            <Image src="/assets/images/logo-text.svg" alt='logo' width={180} height={20}/>
        </Link>
        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {navLinks.map((link)=>{
                const IsActive= link.route === pathname 
                return (
                  <li key={link.route} className={`sidebar-nav_element group ${
                    IsActive?'bg-purple-gradient text-white': 'text-gray-700'
                  }`}>
                    <Link className='sidebar-link' href={link.route}>
                      
                      {link.label}
                    </Link>
                  </li>
                ) 
              })}
              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton showName/>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href={`/sign-in`}>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default SideBar
