'use client'
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import localFont from 'next/font/local'
import { Suspense, useEffect, useState } from 'react'
import Loading from "../components/Loading";
import { getImage } from "@/lib/actions";
// Lovers_Quarrel({ weight:"400", subsets:["latin"] });
// Raleway({ subsets: ["latin"] });
// Belleza({weight:"400", subsets:["latin"] });

const lovaQuarrel = localFont({src:'../../public/fonts/LoversQuarrel-Regular.ttf'});
const raleway =  localFont({src:'../../public/fonts/Raleway-VariableFont_wght.ttf'});
const belleza =  localFont({src:'../../public/fonts/Belleza-Regular.ttf'});
const brittany = localFont({src:'../../public/fonts/BrittanySignature.ttf'});

function Card() {
  const searchParams = useSearchParams()
  const [image, setimage] = useState("")
 
  const username = decodeURIComponent(searchParams.get('u'))
  const valentine_name = decodeURIComponent(searchParams.get('v'))
  const valentine_img = decodeURIComponent(searchParams.get('i'))
  const message = decodeURIComponent(searchParams.get('m'))

  useEffect(() => {
    let loadImage = async()=>{
      let res = await getImage(valentine_img)
      setimage(res)
    }
    
    loadImage()

  }, [])
  

  let finalMessage = message === "default" ? "Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love" : message;

  const router = useRouter()

  if(!username || !valentine_name || !valentine_img || !message) router.push('/')

  return (
      <main className="flex max-[900px]:flex-col w-screen min-h-screen items-center overflow-x-hidden">
        <div className="w-full min-[900px]:w-[55%] h-screen relative overflow-hidden  max-[700px]:h-[70vh] " style={{backgroundImage:`url('${image}')`, backgroundPosition:"center", backgroundSize:"cover"}}>
          {/* <Image width={40} height={40} src={"/images/reginia.jpg"} className="absolute z-1 w-full h-full object-cover" alt="Valentine image" /> */}
          <Image width={40} height={40} src={"/images/13ea8843c050622e2055b313c2392aba.webp"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <Image width={40} height={40} src={"/images/icegif-4148.gif"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <Image width={40} height={40} src={"/images/ca5aee534774d6b4ef69168c1c75a9d1.gif"} className="absolute z-20 w-full h-full object-cover" style={{transform:'scale(0.8)'}} alt="Valentine image" />
          <Image width={40} height={40} src={"/images/b31896187af7300a0471cd111b0ab7d0.webp"} className="absolute z-20 w-full h-full object-cover" alt="Valentine image" />
          <img width={40} height={40} src={"/images/cd21674affb214f521de370a68c6582d.png"} className="absolute z-20 w-full h-full object-cover mt-[180px] min-[900px]:mt-[250px] " alt="Valentine image" />
          <div className="absolute bg-[#00000062] w-full h-full z-10"></div>
          <div className="absolute w-full h-full z-30 flex justify-center items-center">
            <p className={`${lovaQuarrel.className} text-white text-[65px]`}>For you {valentine_name}</p>
          </div>
        </div>
        <div className={`w-full min-[900px]:w-[45%] min-h-[300px] min-[900px]:h-screen bg-[#ec9ca9] flex flex-col items-center min-[900px]:justify-center gap-6 text-[30px] leading-tight pt-4 p-3 overflow-hidden`}>
          <div className={`${belleza.className} text-justify w-[88%] `}>
            <p className={`mb-4 text-[20.4px]`}>Happy <span className={`${brittany.className} text-[25.6px]`}>Valentine</span> my love <img width={46} height={46} className="inline object-cover" src="/images/hearts.png" alt="HEARTS" /></p>
            <p className={`${raleway.className} w-full text-[17.8px]`}>{finalMessage}</p>
            <p className={`${brittany.className} w-full mt-3 text-end text-[17.8px]`}>{username}</p>
          </div> 
          <div className="w-[42%] min-[634px]:w-[35%] h-[170px] min-[700px]:h-[200px] min-[830px]:w-[32%] min-[900px]:w-[50%] min-[1100px]:w-[40%] min-[830px]:h-[230px] relative">
            <div className="w-full h-full absolute z-10 rotate-[-15.6deg] flex justify-center items-center bg-white">
              <img src={`${image}`} className="w-[90%] h-[90%]  object-cover" />
            </div>
            <div className="w-full h-full absolute z-1 blur-sm rotate-[-26.6deg] shadow-2xl bg-[#000000]">
            </div>
          </div>
        </div>
    </main>
  )
}

export default function WrappedCard(){
  return(
    <Suspense fallback={<Loading/>} >
      <Card/>
    </Suspense>
  )
}
