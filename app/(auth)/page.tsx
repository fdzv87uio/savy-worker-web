'use client'

import React, { useEffect, useState } from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';
import SignUpForFree from '@/components/SignUpForFree';
import Image from 'next/image';
import PopularCategories from '@/components/PopularCategories';
import UserReviews from '@/components/UserReviews';
import { getCookie } from 'cookies-next';
import UserBanner from '@/components/UserBanner';
import ScheduledEvents from '@/components/ScheduledEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { findUserByEmail } from '@/utils/authUtils';
import { useAuthTokenStore } from '@/stores/authTokenStore';
import MapGrid2 from '@/components/MapGrid2';


const Home = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState()
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { authToken, setAuthToken } = useAuthTokenStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
    const token = getCookie('curcle-auth-token')
    const userEmail = getCookie('curcle-user-email')
    if (authToken) {
      if (token && userEmail) {
        // Si existe token, traer la info del usuario con email
        getUserInfo(userEmail, token);
      } else {
        setIsUser(false);
        setLoading(false)
      }
    } else {
      if (token && userEmail) {
        setAuthToken(token);
        getUserInfo(userEmail, token);
      } else {
        setIsUser(false);
        setLoading(false);
      }
    }

  }, [isUser, setIsUser, authToken, loading])

  // Get User info
  async function getUserInfo(email: string, token: string) {
    const res: any = await findUserByEmail(email, token);
    if (res && res.status === "success") {
      setUserInfo(res.data);
      setName(res.data.name);
      setLastname(res.data.lastname);
      setEmail(res.data.email);
      setIsUser(true);
      setLoading(false);
    } else {
      setIsUser(false);
      setLoading(false);
    }

  }

  return (
    <div className='relative w-full h-[100vh]'>
      <MapGrid2 />
    </div>
  )
}

export default Home