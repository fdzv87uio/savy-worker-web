"use client"

//@ts-ignore
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import MobileNav from './MobileNav'
// import { trpc } from '@/trpc/client'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useRecoilState, useSetRecoilState } from 'recoil'
// import { authState } from '@/lib/atoms/authAtom'
// import { geolocationState } from '@/lib/atoms/geolocationAtom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserAccountNav from './UserAccountNav'
import { authState } from '@/atoms/authAtom'
import { geolocationState } from '@/atoms/geolocationAtom'
import { findUserByEmail } from '@/utils/authUtils'



const Navbar = () => {
  const cAuth = useRecoilState(authState);
  const setCAuth = useSetRecoilState(authState);
  const [cGeo, setCGeo] = useRecoilState(geolocationState);
  const [logoPath, setLogoPath] = useState("/");
  const [user, setUser] = useState<any>(null);
  const [currentCountry, setCurrentCountry] = useState('ecuador')
  const [currentCity, setCurrentCity] = useState('quito')
  const [locationTag, setLocationTag] = useState('');
  const [buttonsLoading, setButtonsLoading] = useState(true);

  async function getData(email: string, token: string) {
    const res: any = await findUserByEmail(email, token);
    console.log(res);
    if (res.status === "success") {
      setUser(res.data);
    }
  }

  useEffect(() => {
    setButtonsLoading(true);
    if (!user) {
      let ct = getCookie('savy-auth-token');
      let email = getCookie('savy-user-email');
      if (!ct && !email) {
        setUser(null);
        setButtonsLoading(false);
      } else {
        if (email && ct) {
          if (!user) {
            getData(email, ct);
            setButtonsLoading(false);
          }
        } else {
          setUser(null);
          setButtonsLoading(false);
        }
      }
    } else {
      setButtonsLoading(false);
    }
  }, [cAuth])


  useEffect(() => {
    setButtonsLoading(true);
    let ct = getCookie('savy-auth-token');
    let email = getCookie('savy-user-email');
    if (!ct && !email) {
      setUser(null);
      setButtonsLoading(false);
    } else {
      if (email && ct) {
        if (!user) {
          getData(email, ct);
          setButtonsLoading(false);
        }
      } else {
        setUser(null);
        setButtonsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (cGeo && cGeo.data && cGeo.data.components) {
      console.log(cGeo);
      const cityStr = cGeo.data.components.city ? cGeo.data.components.city : currentCity;
      const countryStr = cGeo.data.components.country ? cGeo.data.components.country : currentCountry;
      const newCity = cityStr.slice(0, 1).toUpperCase() + cityStr.slice(1, cityStr.length);
      const newCountry = countryStr.slice(0, 1).toUpperCase() + countryStr.slice(1, countryStr.length);
      const newLocationTag = newCity + ', ' + newCountry;
      setLocationTag(newLocationTag);
      console.log('geotag:')
      console.log(newLocationTag);
    }
  }, [cGeo])
  return (
    <>
      <div className='bg-white fixed z-50 top-0 inset-x-0 mb-[5px]'>
        <div className='relative bg-transparent'>
          <MaxWidthWrapper className='bg-transparent'>
            <div className='border-b sm:border-b-0 lg:border-gray-200 items-center'>
              <div className='flex h-auto items-center justify-between lg:justify-center sm:mt-10 lg:mt-5 sm:mb-10 lg:mb-2 pl-2 pr-3'>
                {!buttonsLoading && (
                  <MobileNav cAuth={cAuth} setUser={setUser} setCAuth={setCAuth} user={user} />
                )}
                {/* desktop logo */}
                <div className='ml-4 hidden lg:ml-0 lg:flex'>
                  <Link href={logoPath}>
                    <img alt={"alt"} style={{ width: "340px", height: "auto", position: 'relative' }} src={'/img/horizontal-logo.png'} />
                  </Link>
                </div>
                {/* mobile logo */}
                <div className='ml-4 flex mt-5 mb-5 lg:ml-4 lg:hidden'>
                  <Link href={logoPath}>
                    <img alt={"alt"} src={'/img/horizontal-logo.png'} width={200} height={30} />
                  </Link>
                </div>

                <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                </div>

                <div className='ml-auto hidden lg:flex items-center bg-transparent'>
                  <div className='hidden bg-transparent lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                    {locationTag && (
                      <>
                        <div className='flex flex-row justify-center items-center gap-[10px]'>
                          <LocationOnIcon sx={{ color: '#5e388f' }} />
                          <div className='text'>{locationTag}</div>
                        </div>
                      </>
                    )}

                    {user && !buttonsLoading ? (
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      />
                    ) : null}

                    {user ? !buttonsLoading && (
                      <UserAccountNav setUser={setUser} setCAuth={setCAuth} user={user} />
                    ) : (
                      <Link
                        href='/signUp'
                        className={buttonVariants({
                          variant: 'default',
                        })}>
                        Join the Team
                      </Link>
                    )}



                    {user && !buttonsLoading ? null : (
                      <div className='flex lg:ml-6'>
                        <span
                          className='h-6 w-px bg-gray-200'
                          aria-hidden='true'
                        />
                      </div>
                    )}

                    {user && !buttonsLoading ? null : (
                      <Link
                        href='/signIn'
                        className={buttonVariants({
                          variant: 'login',
                        })}>
                        Login
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper >
        </div >
      </div >
    </>
  )
}

export default Navbar
