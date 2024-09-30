'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
// import { useAuth } from '@/hooks/use-auth'
import { Button, Card, CardContent, CircularProgress, Divider, Tooltip, Typography } from '@mui/material'
import { deleteCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { motion } from "framer-motion"
// import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useRecoilState } from 'recoil'
// import { authState } from '@/lib/atoms/authAtom'
// import UserDeletionModal from '@/components/userDeletionModal'
import Footer from '@/components/Footer'
// import { trpc } from '@/trpc/client'
import FilterIcon from '@mui/icons-material/Filter';
import { findUserByEmail } from '@/utils/authUtils'
import { getAllAvailableTaskByEmail } from '@/utils/taskUtils'
import { getAllAnswersByUserId } from '@/utils/answerUtils'
import SendIcon from '@mui/icons-material/Send';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import GeneralLayout from '@/components/GeneralLayout'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
//@ts-ignore
const ReactImageAnnotate: any = dynamic(() => import("react-image-annotate"), {
    ssr: false,
});

const query = {
    collection: 'tasks',
    where: {
        status: {
            equals: 'open',
        },
    },
    sort: '-createdAt',
    limit: 100,
};


function ControlPanel(): React.JSX.Element {
    // const { signOut } = useAuth()
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [userProductos, setUserProductos] = useState<any>();
    const [userAnswers, setUserAnswers] = useState<any>(null);
    const [userTasks, setUserTasks] = useState<any>(null)
    const [userToken, setUserToken] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploads, setUploads] = useState([]);
    const [created, setCreated] = useState<any[]>([]);
    // const [cAuth, setCAuth] = useRecoilState(authState);
    const [userDeletionOpen, setUserDeletionOpen] = useState(false);
    const FALLBACK_LIMIT = 100


    // const { data: queryResults, isLoading } =
    //     trpc.getInfiniteProducts.useInfiniteQuery(
    //         {
    //             limit: query.limit ?? FALLBACK_LIMIT,
    //             query,
    //         }
    //     )

    // const tasks: any[] | undefined = queryResults?.pages.flatMap(
    //     (page: any) => page.docs
    // )

    // useEffect(() => {
    //     if (tasks && userData && userTasks.length === 0) {
    //         const filteredTasks: any[] = [];
    //         tasks.forEach((x: any) => {
    //             const currentParticipants = x.participants.split(",");
    //             if (currentParticipants.includes(userData.email)) {
    //                 filteredTasks.push(x);
    //             };
    //         })
    //         if (filteredTasks.length > 0) {
    //             setUserTasks(filteredTasks);
    //         }
    //     }
    // }, [tasks])

    async function getData(email: string, token: string) {
        const res: any = await findUserByEmail(email, token);
        if (res.status === 'success') {
            const currentUser = res.data;
            setUserData(currentUser);

            //get all tasks
            const taskList: any = await getAllAvailableTaskByEmail(res.data.email, token);
            console.log("Tasks:");
            console.log(taskList);

            //get all answers
            const answerList: any = await getAllAnswersByUserId(res.data._id, token);
            console.log("Answers:");
            console.log(answerList);

            // update state
            if (answerList.status === "success" && taskList.status === "success") {
                setUserAnswers(answerList.data);
                setUserTasks(taskList.data);
                setLoading(false);
            }
        }
    }
    // const { mutate: getData } =
    //     trpc.getUserById.useMutation({
    //         onSuccess: async ({ items }) => {
    //             const currentUser = items[0];
    //             const answers = currentUser.answers ? currentUser.answers : [];
    //             setUserAnswers(answers);
    //             setUserData(items[0]) hahaha;
    //         },
    //         onError: (err) => {
    //             console.log(err);
    //         },
    //     })
    // const { mutate: deleteAnswer } =
    //     trpc.deleteAnswerById.useMutation({
    //         onSuccess: async ({ result }) => {
    //             toast.success("Answer Deleted");
    //             setUserData(null);
    //         },
    //         onError: (err) => {
    //             console.log(err);
    //         },
    //     });
    function signOut() {
        deleteCookie('savy-auth-token');
        deleteCookie('savy-user-email');
    }


    useEffect(() => {
        const token: any = getCookie('savy-auth-token');
        const email: any = getCookie('savy-user-email');
        console.log("token: ", token);
        if (!token && !email) {
            signOut();
            router.push('/');
        }
        if (!userData && typeof token !== 'undefined' && token) {
            setUserToken(token)
            getData(email, token);

        }
    }, [userData]);

    return (

        <div className='h-[89vh] mt-[20px] overflow-scroll hidden mb-[200px] lg:flex w-full flex-col items-center'>
            <MaxWidthWrapper>
                <div className='w-full h-auto px-[30px] mb-[40px]'>
                    {!loading && (
                        <>
                            <div className='w-full flex flex-row  align-center justify-center'>
                                <h1 className='text-primary text-4xl mb-5 font-bold'>Control Panel</h1>
                            </div>
                            {/* Datos de Perfil*/}
                            <div className='rounded-md shadow-lg border border-primary flex flex-col mt-[10px] rounder-lg bg-primary/10 px-[20px] py-[30px] w-full h-auto'>
                                <div className='flex flex-row justify-between gap-[30px]'>
                                    <div className='flex flex-col w-[50%] items-left'>
                                        <h2 className='text-primary font-bold text-2xl'>Profile Data</h2>
                                        <p className='text-black/50 text-[17px] mt-[5px] font-mono'>Information regarding user profile</p>
                                    </div>
                                    <div className='flex flex-col w-[50%] text-[17px] items-left'>
                                        <div><p><strong className='font-mono text-primary'>User: </strong><span className='font-mono'>{userData.email}</span></p></div>
                                        <div><p><strong className='font-mono text-primary'>Role: </strong> <span className='font-mono'>{userData.roles[0]}</span></p></div>
                                    </div>
                                </div>
                                <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
                                <div className='flex flex-row justify-between gap-[30px]'>
                                    <div className='flex flex-col w-[50%] items-left'>
                                        <h2 className='text-primary font-bold text-2xl'>Account Info</h2>
                                        <p className='text-black/50 font-mono text-[17px] mt-[5px]'>
                                            Information about task answer submission.<br />
                                            To learn how to record Loom videos, click <a className='text-secondary' href='https://www.youtube.com/watch?v=P71kGl0IR1U'>here.</a>
                                        </p>
                                    </div>
                                    <div className='flex flex-col w-[50%] text-[17px] items-left'>
                                        <div><p><strong className='font-mono text-primary'>Credit: </strong><span className='font-mono'>$ {userData.account_balance}.00</span></p></div>
                                        <div><p><strong className='font-mono text-primary'>Tasks: </strong> <span className='font-mono'> {userTasks.length}</span></p></div>
                                        <div><p><strong className='font-mono text-primary'>Answers: </strong> <span className='font-mono'>{userAnswers.length}</span></p></div>
                                        <>
                                            <button
                                                style={{ width: "100%", marginTop: "10px" }}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    router.push('/create-task')
                                                }}
                                                className={buttonVariants({
                                                    variant: 'default',
                                                })}>
                                                <span style={{ fontSize: 20, textAlign: "center", margin: "5px 5px 10px 5px" }}>+</span>
                                                Create New Task
                                            </button>

                                        </>
                                    </div>
                                </div>
                            </div>
                            {/* User Answers */}
                            <div className='w-full h-auto mt-11 mb-9 flex flex-col items-center justify-center'>
                                <h1 className='text-primary text-3xl text-left pl-[26px] w-full mb-6 font-bold'>Submitted Answers</h1>
                                <div className='w-full flex flex-col gap-[10px] lg:gap-7'>
                                    {userAnswers.length === 0 && (
                                        <div className='flex flex-col justify-center items-center gap-[10px]'>
                                            <p className='text-center text-xl font-mono font-bold'>You have not yet submitted any answers.</p>
                                            <div className='flex flex-col mt-[20px] justify-center items-center gap-[10px] border border-[1px] border-secondary bg-secondary/10 w-[400px] py-[30px] px-[20px] rounded-md'>
                                                <p className='text-center text-gray text-md'>You want to have more available answers?</p>
                                                <button onClick={() => { router.push('/improve-your-account') }} className='bg-primary text-white h-[40px] hover:bg-primary/50 shadow-lg rounded-md px-[10px]' >Improve Yout Account</button>
                                            </div>
                                        </div>
                                    )}
                                    {userAnswers?.map((x: any, index: number) => {
                                        const creationDateFormatted = new Date(x.createdAt);

                                        return (
                                            <>
                                                <div key={`anuncio_${index}`} className='w-full  h-auto bg-secondary/10 overflow-hidden rounded-md border border-secondary border-[1px] relative px-[20px] py-[20px] shadow-md'>
                                                    <div className='w-full sm:flex sm:flex-col-1 lg:flex lg:flex-row gap-2 lg:gap-7 justify-between' >
                                                        <div className='w-full sm:flex sm:flex-col-1 lg:flex lg:flex-row gap-2 lg:gap-7'>
                                                            <div className='text-[17px]'>
                                                                <strong className='font-mono text-sm'>No: </strong><br /><span className='font-mono'>{index + 1}</span>
                                                            </div>
                                                            <div className='text-[17px]'>
                                                                <strong className='font-mono text-sm'>Task Title: </strong><br /><span className=' font-mono font-bold'>{x.taskTitle.length > 40 ? x.taskTitle.slice(0, 40) + "..." : x.taskTitle}</span>
                                                            </div>
                                                            <div className='text-[17px]'>
                                                                <strong className='font-mono text-sm'>Last Update: </strong><br /> <span className=' font-mono'>{`${x.updatedAt.split("T")[0]} - ${x.updatedAt.split("T")[1].split(".")[0]}`}</span>
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-row gap-2'>
                                                            <div className='text-[17px] w-[200px]'>
                                                                <div><strong className='font-mono text-sm'>Status: </strong></div>
                                                                <div className='font-mono'>{x.status}</div>
                                                            </div>
                                                            <div className='flex flex-row gap-2 mt-3'>
                                                                {/* <button onClick={() => { router.push(`/task?id=${x.id}`) }} className='bg-primary hover:bg-primary/50 text-black w-[40px] h-[40px] rounded-[50%]'>
                                                                    <Tooltip title="Go to Answer">
                                                                        <VisibilityIcon sx={{ color: 'white', fontSize: "30px" }} />
                                                                    </Tooltip>
                                                                </button> */}
                                                                <button onClick={() => { router.push(`/annotations/${x._id}`) }} className='bg-secondary hover:bg-secondary/50 text-black w-[40px] h-[40px] rounded-[50%]'>
                                                                    <Tooltip title="Submit Annotations">
                                                                        <HighlightAltIcon sx={{ color: 'white', fontSize: "22.5px" }} />
                                                                    </Tooltip>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div >
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* Available tasks */}
                            <div className='w-full h-auto mt-11 mb-9 flex flex-col items-center justify-center'>
                                <h1 className='text-primary text-3xl text-left pl-[26px] w-full mb-6 font-bold'>Available Tasks</h1>
                                <div className='w-full flex flex-col gap-[10px] lg:gap-7'>
                                    {userTasks && userTasks.length === 0 && (
                                        <div className='flex flex-col justify-center items-center gap-[10px]'>
                                            <p className='text-center text-xl font-mono font-bold'>No Tasks Available.</p>
                                        </div>
                                    )}
                                    {userTasks && userTasks.length > 0 && userTasks?.map((x: any, index: number) => {


                                        return (
                                            <>
                                                <div key={`anuncio_${index}`} className='w-full h-auto overflow-hidden rounded-md border border-[#ececec] border-[1px] relative px-[20px] py-[20px] shadow-md'>
                                                    <div className='w-full sm:flex sm:flex-col-1 lg:flex lg:flex-row gap-2 lg:gap-7 justify-between' >
                                                        <div className='w-full sm:flex sm:flex-col-1 lg:grid lg:grid-cols-7 gap-2 lg:gap-7 justify-center'>
                                                            <div className='text-[17px] font-mono col-span-1 flex flex-row gap-4 justify-center'>
                                                                <p className=' mt-3'>No: <br /><span className='font-mono text-secondary font-bolder'>{index + 1}</span></p>
                                                                <img alt="" onClick={() => { router.push(`/task?id=${x.id}`) }} src={x.images[0]} width={90} height={90} className='rounded-lg border cursor-pointer hover:outline hover:outline-[2px] hover:outline-secondary border-white object-fit' />
                                                            </div>
                                                            <div className='text-[17px] font-mono col-span-3  mt-3'>
                                                                Title:<br /><span onClick={() => { router.push(`/task?id=${x.id}`) }} className='cursor-pointer hover:underline font-mono font-lg text-secondary font-bold'>{x.title.length > 40 ? x.title.slice(0, 40) + "..." : x.title}</span>
                                                            </div>
                                                            <div className='text-[17px] font-mono col-span-1  mt-3'>
                                                                Reward:<br /> <span className='font-mono text-[17px] font-lg text-black font-bolder'>USD ${x.reward}.00</span>
                                                            </div>
                                                            <div className='text-[17px] font-mono col-span-1  mt-3'>
                                                                Deadline: <br /> <span className='font-mono text-[17px] font-lg text-black font-bolder'>{x.endDate.split('T')[0]}</span>
                                                            </div>
                                                            <div className='text-[17px] font-mono col-span-1  mt-3'>
                                                                Status: <br /> <span className='font-mono text-[17px] font-lg text-black font-bold'>{x.status}</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row gap-2 mt-3'>
                                                            <button onClick={() => { router.push(`/`) }} className='bg-primary hover:bg-primary/50 text-black w-[40px] h-[40px] rounded-[50%]'>
                                                                <Tooltip title="Go to Task">
                                                                    <VisibilityIcon sx={{ color: 'white', fontSize: "30px" }} />
                                                                </Tooltip>
                                                            </button>
                                                            <button onClick={() => { router.push(`/answers/create-answer/${userData._id}/${x._id}`) }} className='bg-secondary hover:bg-secondary/50 text-black w-[40px] h-[40px] rounded-[50%]'>
                                                                <Tooltip title="Submit Answer">
                                                                    <SendIcon sx={{ color: 'white', fontSize: "22.5px" }} />
                                                                </Tooltip>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div >
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* User Actions*/}
                            {/* <div className='rounded-md shadow-lg border border-[#ececec] border-[1px] flex flex-col mt-[10px] mb-[30px] rounder-lg bg-white px-[20px] py-[20px] w-full h-auto'>
                                <div className='flex flex-row justify-between gap-[30px]'>
                                    <div className='flex flex-col w-[50%] items-left'>
                                        <h2 className='text-secondary font-bold text-xl'>User Actions</h2>
                                        <p className='text-black/50 font-mono font-normal text-[13px] mt-[5px]'>Actions related to hte User Account</p>
                                    </div>
                                    <div className='flex flex-col w-[50%] text-[15px] items-left'>
                                        <button onClick={() => { setUserDeletionOpen(true) }} className='bg-secondary rounded-md hover:bg-secondary/50 px-[20px] h-[40px] text-white'>Eliminate Account</button>
                                    </div>
                                </div>
                            </div> */}
                            <Footer relative />
                        </>
                    )}
                    {loading && (
                        <div className='mt-[40px]' style={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center', position: "relative" }}>
                            <motion.div transition={{ ease: "linear", duration: 1, type: 'spring', repeatType: 'loop', repeat: Infinity }} style={{ rotate: 0 }} animate={{ rotate: 360, speed: 1 }}>
                                <img alt="" src={'/img/marker-pro.jpg'} width={200} height={200} />
                            </motion.div>
                            <p className='text-center text-secondary mt-[35px] text-3xl'>
                                Loading
                            </p>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper >
            {/* {userDeletionOpen && (
                <UserDeletionModal modalOpen={userDeletionOpen} setModalOpen={setUserDeletionOpen} userId={userData.id} />
            )
            } */}
            {/* This code is to pre load RIM and it is hidden */}
            <div className="hidden top-[20px] left-0 w-full pt- h-auto flex flex-col justify-start">
                <ReactImageAnnotate
                    labelImages
                    regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
                    regionTagList={["tag1", "tag2", "tag3"]}
                    images={[
                        {
                            src: "https://dummyimage.com/800x600/ff0000/fff",
                            name: "Image 1",
                            regions: []
                        }
                    ]}
                />
            </div>
        </div >
    )
}

export default ControlPanel
