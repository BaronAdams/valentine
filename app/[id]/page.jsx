'use client'
import { Belleza, Lovers_Quarrel, Raleway } from "next/font/google";
import { fetchUser } from "@/lib/actions";
import Image from "next/image";
import {  useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import localFont from 'next/font/local'

// const isDev = process.env.NODE_ENV === "development"
// Lovers_Quarrel({ weight:"400", subsets:["latin"] });
// Raleway({ subsets: ["latin"] });
// Belleza({weight:"400", subsets:["latin"] });

const lovaQuarrel = Lovers_Quarrel({ weight:"400", subsets:["latin"] });
const raleway =  Raleway({ subsets: ["latin"] });
const belleza =  Belleza({weight:"400", subsets:["latin"] });
const brittany = localFont({src:'../../public/fonts/BrittanySignature.ttf'});

export default function SomeUser() {
  const params = useParams()
  const [user, setuser] = useState()
  const [loading, setloading] = useState(false)
  const router = useRouter()

  const container = useRef();

  useEffect(() => {
    (async ()=>{
      setloading(true)
      try{
        const data = await fetchUser(params.id)
        setuser(data)
      }catch{
        router.push('/')
      }finally{
        setloading(false)
      }
    })() 
  }, [])
  
  if(loading) return(<div className="w-[100vw] h-[100vh] flex justify-center items-center"> 
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
   </div>) 

  if(user?.username) return (
      <main ref={container} className="flex flex-col w-screen min-h-screen items-center overflow-x-hidden">
        <div className="w-[25%] h-[55vh] relative overflow-hidden max-[900px]:h-[65vh] max-[900px]:w-[50%] max-[700px]:w-[75%] max-[700px]:h-[70vh]  max-[400px]:w-full" style={{backgroundImage:`url(${user?.valentine_img})`, backgroundPosition:"center", backgroundSize:"cover"}}>
          {/* <Image width={40} height={40} src={"/images/reginia.jpg"} className="absolute z-1 w-full h-full object-cover" alt="Valentine image" /> */}
          <Image width={40} height={40} src={"/images/13ea8843c050622e2055b313c2392aba.webp"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <Image width={40} height={40} src={"/images/icegif-4148.gif"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <Image width={40} height={40} src={"/images/ca5aee534774d6b4ef69168c1c75a9d1.gif"} className="absolute z-20 w-full h-full object-cover" style={{transform:'scale(0.8)'}} alt="Valentine image" />
          <Image width={40} height={40} src={"/images/b31896187af7300a0471cd111b0ab7d0.webp"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <img width={40} height={40} src={"/images/cd21674affb214f521de370a68c6582d.png"} className="absolute z-20 w-full h-full object-cover mt-[180px] " alt="Valentine image" />
          <div className="absolute bg-[#00000062] w-full h-full z-10"></div>
          <div className="absolute w-full h-full z-30 flex justify-center items-center">
            <p className={`${lovaQuarrel.className} text-white text-[65px]`}>For you {user?.valentine_name}</p>
          </div>
        </div>
        <div className={`w-full min-h-[300px] bg-[#ec9ca9] flex flex-col items-center gap-6 text-[30px] leading-tight pt-4 p-3 overflow-hidden`}>
          <div className={`${belleza.className} text-justify w-[88%] `}>
            <p className={`mb-4 text-[20.4px]`}>Happy <span className={`${brittany.className} text-[25.6px]`}>Valentine</span> my love <img width={46} height={46} className="inline object-cover" src="/images/hearts.png" alt="HEARTS" /></p>
            <p className={`${raleway.className} w-full text-[17.8px]`}>{user.message}</p>
            <p className={`${brittany.className} w-full mt-3 text-end text-[17.8px]`}>{user.username}</p>
          </div> 
          <div className="w-[42%] h-[170px] relative">
            <div className="w-full h-full absolute z-10 rotate-[-15.6deg] flex justify-center items-center bg-white">
              <img src={user.valentine_img} className="w-[90%] h-[90%] object-cover" alt="Valentine image" />
            </div>
            <div className="w-full h-full absolute z-1 blur-sm rotate-[-26.6deg] shadow-2xl bg-[#000000]">
            </div>
          </div>
        </div>
    </main>
    )
}
