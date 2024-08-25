/* eslint-disable react/jsx-key */
'use client'

import { motion } from "framer-motion"
//@ts-ignore
import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import MaxWidthWrapper from './MaxWidthWrapper'
import Footer from './Footer'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import CollectionsIcon from '@mui/icons-material/Collections';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SendIcon from '@mui/icons-material/Send';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function MapGrid2(): React.JSX.Element {
    const parallaxRef: any = useRef();

    function scrollToTop() {
        if (typeof parallaxRef.current !== 'undefined') {
            parallaxRef.current.scrollTo(0);
        }
    }

    return (
        <div className='h-[100%] relative'>
            <>
                <Parallax ref={parallaxRef} pages={9} className='relative pt-[5px] lg:pt-[65px] lg:mt-[0px] left-0 flex'>
                    <ParallaxLayer factor={1} style={{ width: '100%', position: 'relative' }} offset={0} speed={1}>
                        <MaxWidthWrapper>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                                variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 200 }
                                }}
                            >
                                <div className='relative h-[58vh] xl:h-[80vh] z-[1] bg-secondary border rounded-xl relative w-[100%] mx-0 my-0'>
                                    <img src="/img/bg-shapes.png" className='z-[5] absolute top-0 left-0 h-[80vh] w-full' style={{ objectFit: "cover" }} />
                                    <img src="/img/camera-girl.png" className='z-[5] absolute bottom-0 md:right-[230px] lg:right-32 h-[75vh] w-auto' style={{ objectFit: "cover" }} />
                                    <div className='absolute left-[200px] top-[150px] w-[40%] h-auto flex flex-col items-left'>
                                        <h1 className='text-white text-5xl'>Earn Easy Money In A Zap</h1>
                                        <h1 className='text-primary text-5xl'>Collecting Visual Data</h1>
                                        <div className='mt-11 w-[150px] z-[10] cursor-pointer'>
                                            <Link
                                                href='/sign-up'
                                                className={buttonVariants({
                                                    variant: 'default',
                                                })}>
                                                Join the Team
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </MaxWidthWrapper>
                    </ParallaxLayer>
                    <ParallaxLayer style={{ width: '100%', left: "0%", position: 'relative' }} speed={1.5} sticky={{ start: 1, end: 4.50 }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 1.75, delay: 0.2, type: 'spring' }}
                            variants={{
                                visible: { opacity: 1, x: 0 },
                                hidden: { opacity: 0, x: -200 }
                            }}
                        >
                            <MaxWidthWrapper>
                                <div className='h-[58vh] xl:h-[80vh] relative w-[50%] mx-0 my-0'>
                                    <div className='overflow-hidden absolute z-[10] bg-[#68b6b7] left-[20px] rounded-xl w-[312px] h-auto'>
                                        <img alt="" src="/img/home-pic-1.png" width={312} height={365} />
                                    </div>
                                    <div className='overflow-hidden absolute z-[10] bg-[#5b6aa7] left-[350px] top-[30px] rounded-xl w-[220px] h-auto'>
                                        <img alt="" src="/img/home-pic-2.png" width={220} height={217} />
                                    </div>
                                    <div className='overflow-hidden absolute z-[10] bg-[#3e5462] left-[220px]  top-[250px] rounded-xl w-[290px] h-auto'>
                                        <img alt="" src="/img/home-pic-3.png" width={290} height={290} />
                                    </div>
                                    <div className='overflow-hidden absolute z-[5] left-0  bottom-0 rounded-xl w-[300px] h-auto'>
                                        <img alt="" src="/img/home-pic-4.png" width={300} height={250} />
                                    </div>
                                    <div className='overflow-hidden flex flex-col items-center justify-center bg-secondary absolute z-[5] left-[40px]  bottom-[25px] rounded-xl w-[130px] h-[150px]'>
                                        <h1 className='text-white text-3xl'>500 +</h1>
                                        <p className='text-white text-left font-mono text-sm'>Available <br /> Tasks</p>
                                    </div>
                                </div>
                            </MaxWidthWrapper>
                        </motion.div>

                    </ParallaxLayer>
                    <ParallaxLayer factor={6} style={{ width: '100%', height: "auto" }} offset={1} speed={0.5}>
                        <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 1.75, delay: 0.2, type: 'spring' }}
                            variants={{
                                visible: { y: 0 },
                                hidden: { y: 400 }
                            }}>
                            <MaxWidthWrapper>
                                <div className='relative h-[58vh] xl:h-[70vh] md:mt-[300px] lg:mt-[300px] flex flex-col pl-[20px] left-[50%] lg:gap-[100px] xl:gap-[100px] relative w-[50%] mx-0 my-0'>
                                    <div className='text-6xl text-left mb-[40px]'>
                                        Online Remote Tasks With A Focus In Computer Vision
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <CollectionsIcon fontSize="large" />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            Image Collection
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            Help researchers with solving image collection tasks, which involve the gathering of a specific digital images of a certain context and following a well-defined set of requisites.
                                            Once your task is complete, a group of specialists will revise your images and if conditions are met, you will get your cash reward on your account.
                                        </p>
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <WallpaperIcon fontSize='large' />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            Image Annotation
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            Assist in the production of AI training Sets by providing the necessary code annotations for Object Identification and Pattern Recognition. Such image annotations include labels, Natural Language Descriptions,
                                            Bounding boxes and poligon masks; all of which are used in the development of AI Computer Vision Technologies.
                                        </p>
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <PsychologyIcon fontSize='large' />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            Human-Based Data Verification
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            Partake in data verification tasks using your computer or cellphone. This task usually involved browsing the internet, newspapers, books, magazines, etc;
                                            in order to find data verify its veracity and authenticity.
                                        </p>
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <AdsClickIcon fontSize='large' />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            SEO Consulting
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            We also provide <b>Search Engine Optimization Consulting (SEO)</b> for websites owners who want to gain more internet traffic, but cannot affor to pay for leads in google of facebook.
                                            Visual Worker will design a SEO Marketing Strategy that fits your budget and expectations and we will provide your site with 100% organic traffic
                                            in no time
                                        </p>
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <PermMediaIcon fontSize='large' />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            Training Set Development
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            If your project has an specific need of image based data, Visual Trainer will provide the necessary assitance in the confection of
                                            well-tested, error-proof training data sets, including all necessary code annotations and following the format of other commercial and non-commercial data sets
                                        </p>
                                    </div>
                                    <div className='shadow-xl border rounded-xl flex flex-col items-left px-6 pt-6 pb-14 w-[600px] h-auto gap-[20px]'>
                                        <div className='rounded-full text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                            <AppShortcutIcon fontSize='large' />
                                        </div>
                                        <h1 className='text-[#37335a] text-4xl'>
                                            Computer Vision System Development
                                        </h1>
                                        <p className='text-sm font-mono'>
                                            Our team of Web / Mobile Software  Engineers will provide you with the necessary technical assistance for your AI Computer Vision Applications.
                                            We include solutions with the most important Computer Vision Algorithms for the tasks of Object Identification, Pattern Recognition, Automated Censorship and Human/Document Identification.
                                        </p>
                                    </div>
                                    <div className=' text-center flex flex-col items-center mt-[100px]'>
                                        <p className='text-4xl text-secondary mb-[20px]' >Let&apos;s start of a data revolution</p>
                                        <p className='text-4xl' >Are You Interested?</p>
                                        <div className='w-[200px] mt-[70px]'>
                                            <Link
                                                href='/sign-up'
                                                className={buttonVariants({
                                                    variant: 'default',
                                                })}>
                                                Join the Team Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </MaxWidthWrapper>
                        </motion.div>
                    </ParallaxLayer>
                    <ParallaxLayer className='w-full bg-gradient-to-b from-white via-primary to-secondary flex flex-col items-center relative h-[100vh]' offset={6.25} factor={3} speed={0.15}>
                        <MaxWidthWrapper className='flex flex-col items-center'>
                            <div className='flex flex-row mt-[-350px] justify-center items-center w-[100%]'>
                                <div className='flex flex-row gap-[20px]'>
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.15, delay: 0.2, ease: 'easeOut' }}
                                        variants={{
                                            visible: { opacity: 1, x: 0 },
                                            hidden: { opacity: 0, x: -200 }
                                        }}
                                        className='text-[#5b6aa7] text-[80px]'>
                                        WE
                                    </motion.div>
                                    <motion.div initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.15, delay: 0.2, ease: 'easeOut' }}
                                        variants={{
                                            visible: { opacity: 1, x: 0 },
                                            hidden: { opacity: 0, x: 200 }
                                        }} className='text-secondary text-[80px]'>
                                        VALUE
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: 0.2, ease: 'easeOut' }}
                                variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 200 }
                                }}
                                className='w-auto leading-[260px] h-auto px-[20px] bg-black flex flex-col overflow-visible justify-center items-center text-center'>
                                <p className="bg-gradient-to-r from-secondary via-primary to-secondary/80 w-full inline-block text-transparent bg-clip-text font-extrabold text-[220px] text-center font-mono">PICTURES</p>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.15, delay: 0.2, ease: 'easeOut' }}
                                variants={{
                                    visible: { opacity: 1, scale: 1 },
                                    hidden: { opacity: 0, scale: 0.1 }
                                }} className='relative w-full h-[70px] mt-[70px] mb-[100px] px-[20px] text-black  text-[29px] flex flex-col justify-center items-center text-center'>
                                <p>Be part of our multi-national team effort</p>
                                <p>Help us biuld up a better knowledge base in computer vision</p>

                            </motion.div>
                            <div className='z-[99] gap-[10px] text-white mt-[250px] p-6 w-full md:h-[70vh] lg:h-auto flex flex-col items-left bg-secondary shadow-lg rounded-md'>
                                <div className='flex flex-col items-left gap-[10px]'>
                                    <p className='text-sm font-bold font-mono'>{"# Instructions"}</p>
                                    <h1 className='text-4xl font-bold '>How Can You Start?</h1>

                                </div>
                                <div className='w-full h-auto flex flex-col mb-[40px] items-center'>
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                        variants={{
                                            visible: { opacity: 1, x: 0 },
                                            hidden: { opacity: 0, x: 200 }
                                        }} className='grid grid-cols-4 gap-[15px] mt-[30px]'>

                                        <div className='rounded-xl border border-white relative w-[250px] h-[250px] flex flex-col items-center pt-7 px-6 pb-6 gap-[10px] text-center'>
                                            <div className='rounded-full border border-white text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                                <VpnKeyIcon fontSize='large' />
                                            </div>
                                            <h1 className='text-white text-xl'>
                                                Register
                                            </h1>
                                            <p className='text-sm font-mono'>
                                                Submit your CV and personal information and apply for an account
                                            </p>
                                            <h1 className='text-white absolute top-0 left-0 px-2 py-2 text-sm'>
                                                Step #1
                                            </h1>
                                        </div>
                                        <div className='rounded-xl border border-white relative w-[250px] h-[250px] flex flex-col items-center pt-7 px-6 pb-6 gap-[10px] text-center'>
                                            <div className='rounded-full border border-white text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                                <ListAltIcon fontSize='large' />
                                            </div>
                                            <h1 className='text-white text-xl'>
                                                Pick A Task
                                            </h1>
                                            <p className='text-sm font-mono'>
                                                Once approved, select the tasks available according to your profile
                                            </p>
                                            <h1 className='text-white absolute top-0 left-0 px-2 py-2 text-sm'>
                                                Step #2
                                            </h1>
                                        </div>
                                        <div className='rounded-xl border border-white relative w-[250px] h-[250px] flex flex-col items-center pt-7 px-6 pb-6 gap-[10px] text-center'>
                                            <div className='rounded-full border border-white text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                                <SendIcon fontSize='large' />
                                            </div>
                                            <h1 className='text-white text-xl'>
                                                Submit Answers
                                            </h1>
                                            <p className='text-sm font-mono'>
                                                Our team of specialists will check if your data is consistent with the task prerequisites.
                                            </p>
                                            <h1 className='text-white absolute top-0 left-0 px-2 py-2 text-sm'>
                                                Step #3
                                            </h1>
                                        </div>
                                        <div className='rounded-xl border border-white relative w-[250px] h-[250px] flex flex-col items-center pt-7 px-6 pb-6 gap-[10px] text-center'>
                                            <div className='rounded-full border border-white text-white w-[80px] h-[80px] flex flex-col justify-center items-center bg-secondary'>
                                                <AttachMoneyIcon fontSize='large' />
                                            </div>
                                            <h1 className='text-white text-xl'>
                                                Earn a Reward
                                            </h1>
                                            <p className='text-sm font-mono'>
                                                If your data submission was successfull, you will earn a monetary reward. That&apos;s it!
                                            </p>
                                            <h1 className='text-white absolute top-0 left-0 px-2 py-2 text-sm'>
                                                Step #4
                                            </h1>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className='z-[99] gap-[10px]  mt-[250px] p-6 w-full md:h-[70vh] lg:h-auto flex flex-col items-center bg-white shadow-lg rounded-md'>
                                <h1 className='text-[40px] w-full text-center font-bold text-secondary'>Our Partners</h1>
                                <div className='w-full flex flex-row gap-[30px] mb-[50px] px-11 mt-[30px]'>
                                    <div className='flex flex-col items-left gap-[35px]'>
                                        <p className='text-[20px] text-sm font-mono'>With the support of:</p>
                                        <div className='flex flex-row gap-[15px]'>
                                            <img alt="" src="/img/leiden-logo.png" width={250} height={70} />
                                            <img alt="" src="/img/sek-logo.png" width={250} height={70} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-left gap-[35px]'>
                                        <p className='text-[20px] text-sm font-mono'>Powered by:</p>
                                        <div className='flex flex-row gap-[15px] pt-2'>
                                            <img alt="" src="/img/yolo-logo.png" width={250} height={70} />
                                            <img alt="" src="/img/tf-logo.png" width={310} height={70} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MaxWidthWrapper>
                        <div className='absolute left-[0px] bottom-[0px] bottom-[20px] w-full'>
                            <Footer relative />
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </>
        </div>

    )
}

export default MapGrid2
