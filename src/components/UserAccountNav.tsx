'use client'
import React from 'react'
import { Button } from './ui/button';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const UserAccountNav = () => {
  const router = useRouter()
  return (
    <Button variant={'destructive'}  onClick={() => {
      signOut({redirect:true,
        callbackUrl:`/sign-in`
      });

      router.push('sign-in');
    }}>Sign Out</Button>
  )
}
