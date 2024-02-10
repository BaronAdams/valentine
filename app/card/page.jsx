import React from 'react'
import { Belleza, Lovers_Quarrel, Raleway } from "next/font/google";
import localFont from 'next/font/local'

// Lovers_Quarrel({ weight:"400", subsets:["latin"] });
// Raleway({ subsets: ["latin"] });
// Belleza({weight:"400", subsets:["latin"] });

const lovaQuarrel =  localFont({src:'../../public/fonts/LoversQuarrel-Regular.ttf'});
const raleway =  localFont({src:'../../public/fonts/Raleway-VariableFont_wght.ttf'});
const belleza =  localFont({src:'../../public/fonts/Belleza-Regular.ttf'});
const brittany = localFont({src:'../../public/fonts/BrittanySignature.ttf'});

const Card = () => {
  return (
    <section className='w-[1080px] h-[700px] bg-[#ec9ca9] relative overflow-hidden'>
        <img className='absolute left-[-5%] top-[-5%] ' src="/images/garden-flowers-png-0.png" alt="some image" />
        <img className='absolute left-[74%] top-[-15%] rotate-[180deg] ' src="/images/watercolor-flowers-png-image.png" alt="some image" />
        <div className='w-full h-full absolute gap-[48px] flex flex-col justify-center items-center '>
            <h2 className={`${lovaQuarrel.className} text-[60px] `} >For you Reginia</h2>
            <div className="flex gap-[48px] justify-center items-center w-full">
                <div className="w-[24.5%] h-[350px] relative">
                    <div className="w-full h-full absolute z-10 rotate-[-15.6deg] flex justify-center items-center bg-white">
                        <div className="w-[90%] h-[90%] bg-[url('/images/reginia.jpg')] bg-cover bg-center">
                            <img src={'/images/ca5aee534774d6b4ef69168c1c75a9d1.gif'} className="w-full h-full object-cover scale-85 " style={{transform:'scale(0.85)'}} alt="Valentine image" />
                        </div>
                    </div>
                    <div className="w-full h-full absolute z-1 blur-sm rotate-[-26.6deg] shadow-2xl bg-[#000000]"></div>
                </div>
                <div className={`${belleza.className} text-justify w-[42%]`}>
                    <p className={`mb-4 text-[24.4px] w-full`}>Happy <span className={`${brittany.className} text-[25.6px]`}>Valentine</span> my love <img width={46} height={46} className="inline object-cover" src="/images/hearts.png" alt="HEARTS" /></p>
                    <p className={`${raleway.className} w-full text-[20.8px]`}>Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love</p>
                    <p className={`${brittany.className} w-full mt-3 text-end text-[23.8px]`}>Adam's</p>
                </div> 
            </div>
        </div>
        <img width={300} height={200} className='absolute left-[72%] bottom-0 object-cover' src="/images/arc-flowers.png" alt="some image" />
    </section>
  )
}

export default Card