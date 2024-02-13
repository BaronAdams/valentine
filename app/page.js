"use client"
import { useEffect, useState } from "react";
import { useFormState } from 'react-dom'
import { create } from "@/lib/actions";
import Link from "next/link";
import localFont from 'next/font/local'
import html2canvas from 'html2canvas'

// Lovers_Quarrel({ weight:"400", subsets:["latin"] });
// Raleway({ subsets: ["latin"] });
// Belleza({weight:"400", subsets:["latin"] });

const lovaQuarrel = localFont({src:'../public/fonts/LoversQuarrel-Regular.ttf'});
const dayDream =  localFont({src:'../public/fonts/daydream FREE.ttf'});
const raleway =  localFont({src:'../public/fonts/Raleway-VariableFont_wght.ttf'});
const brittany = localFont({src:'../public/fonts/BrittanySignature.ttf'});

export default function Home() {
  const [state, dispatch] = useFormState(create,undefined)
  const [file, setFile] = useState();
  const [firstName, setfirstName] = useState();
  const [secondName, setsecondName] = useState();
  const [msg, setMsg] = useState();
  const [loading, setloading] = useState(false);
  const [isSend, setisSend] = useState(false);
  const [finished, setIsfinished] = useState(false);

  const handleChangeFile = (e)=>{
    setFile(e.target?.files[0])
  } 

  const generateImg = (elt)=>{
    let tmp = document.createElement('section')
    tmp.classList.add('w-[860px]','h-[600px]','bg-[#faced6]','relative','top-[-9999px]')

    let firstImg = document.createElement('img')
    firstImg.src = '/images/abstract-heart.png'
    firstImg.alt = 'Garden flowers image'
    firstImg.className ='absolute left-[-10%] top-[-6%]'
    tmp.appendChild(firstImg)

    let secondImg = document.createElement('img')
    secondImg.src = '/images/b31896187af7300a0471cd111b0ab7d0.webp'
    secondImg.alt = 'Watercolor flowers image'
    secondImg.className ='absolute w-full h-full scale-[1.25] '
    tmp.appendChild(secondImg)

    let thirdImg = document.createElement('img')
    thirdImg.src = '/images/arc-flowers.png'
    thirdImg.alt = 'Arc flowers image'
    thirdImg.width = 400
    thirdImg.height = 300
    thirdImg.className ='absolute left-[72%] bottom-0 object-cover h-[300px]'
    tmp.appendChild(thirdImg)

    let fourthImg = document.createElement('img')
    fourthImg.src = '/images/hearts-decor.png'
    fourthImg.alt = 'Heart decor'
    fourthImg.className ='absolute w-[20%] h-[45%] left-[89%] object-cover '
    tmp.appendChild(fourthImg)

    let divContent = document.createElement('div')
    divContent.className='w-full h-full absolute gap-[48px] flex flex-col justify-center items-center'

    let h2 = document.createElement('h2')
    h2.className = `${dayDream.className} text-[50px]`
    h2.textContent = `Happy Valentine Day`
    divContent.appendChild(h2)

    let firstDiv = document.createElement('div')
    firstDiv.className="flex gap-[48px] justify-center items-center w-full"

    let divChild2 = document.createElement('div')
    divChild2.className=`text-justify w-[62%]`

    let p1 = document.createElement('p')
    p1.className = `${dayDream.className} mb-4 text-[44.4px] w-full flex items-center`
    p1.innerText += 'To '
    let span1 = document.createElement('span')
    span1.className = `${lovaQuarrel.className} ml-9 w-[80%] border-b-2 border-black text-[40.6px]`
    span1.innerText = `${elt.valentine_name}`
    p1.appendChild(span1)
    divChild2.append(p1)

  
    let p2 = document.createElement('p')
    p2.className = `${dayDream.className} mb-4 text-[44.4px] w-full flex items-center`
    p2.innerText += 'From '
    let span2 = document.createElement('span')
    span2.className = `${lovaQuarrel.className} ml-9 w-[80%] border-b-2 border-black text-[40.6px]`
    span2.innerText = `${elt.username}`
    p2.appendChild(span2)

    divChild2.append(p2)

    let p3 = document.createElement('p')
    p3.className = `${raleway.className} font-medium w-full text-[20.8px]`
    p3.innerText += elt.message
    divChild2.append(p3)

    let p4 = document.createElement('p')
    p4.className = `${brittany.className} w-full mt-3 text-end text-[23.8px]`
    p4.innerText += elt.username
    divChild2.append(p4)
    firstDiv.appendChild(divChild2)

    divContent.appendChild(firstDiv)
    tmp.appendChild(divContent)

    document.body.appendChild(tmp)
      html2canvas(tmp).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = `${elt.valentine_name}.png`;
        downloadLink.click();
        document.body.removeChild(tmp);
        setIsfinished(true);
      });
  }

  const handleSubmit = ()=>{
    setloading(true)
  }
  
  useEffect(()=>{
    console.log(state)
    if(state?.url || state?.username || state?.file || state?.valentine_name || state?.error){
      setloading(false)
    } 
    if(state?.user?.username) {
      setisSend(true)
      generateImg(state.user)
    }
  },[state])

  return (
    <>
    <nav className="bg-white overflow-hidden fixed w-full z-20 flex flex-wrap items-center justify-center h-[9vh] top-0 start-0 border-b border-gray-200">
      <Link href="/" className="flex h-full w-full justify-center items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.jpg" className="h-full w-full object-cover object-center scale-[0.65] min-[530px]:w-[80%] min-[610px]:w-[70%] min-[730px]:w-[60%] min-[865px]:w-[54%] min-[880px]:w-[50%] min-[1000px]:w-[46%] min-[1050px]:w-[42%] min-[1100px]:w-[40%]  " alt="Valentine's Logo"/>
          {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
      </Link>
    </nav>
    <form onSubmit={handleSubmit} action={dispatch} className="flex flex-col mt-[9vh] pt-3 w-screen min-h-screen gap-5 justify-center items-center">    
      <div className="flex flex-col gap-3 items-center justify-center w-[32%] max-[640px]:w-[60%] max-[960px]:w-[50%] max-[480px]:w-[80%]">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 text-center"><span className="font-semibold">Click to upload your valentine picture</span>or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input onChange={handleChangeFile} id="dropzone-file" name="image" type="file" className="hidden" accept="image/*" required />
          </label>
          {((state && !file) || (state?.file && !file)) && <p className="mt-2 text-sm text-red-600"><span className="font-medium">{state?.file}</span></p>}
      </div>
      {file && <img
        width={30}
        height={30}
        alt={"Valentine's image"}
        src={URL.createObjectURL(file)}
        className="w-[32%] max-[640px]:w-[60%] max-[960px]:w-[50%] max-[480px]:w-[80%] h-[40vh] object-cover object-center"
      /> }
      <div className="w-[32%] max-[640px]:w-[60%] max-[960px]:w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input onChange={(e)=>setfirstName(e.target.value)} type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required placeholder="Tap your first name" />
        {((state && !firstName) || (state?.username && !firstName)) && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state?.username}</span></p>}
      </div>  
      <div className="w-[32%] max-[640px]:w-[60%] max-[960px]:w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="valentine_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your valentine&apos;s name</label>
        <input onChange={(e)=>setsecondName(e.target.value)} type="text" id="valentine_name" name="valentine_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required placeholder="Tap your valentine's name" />
        {((state && !secondName) || (state?.valentine_name && !secondName)) && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state?.valentine_name}</span></p>}
      </div>  
      <div className="w-[32%] max-[640px]:w-[60%] max-[960px]:w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Your message for him/her(optionnal)</label>
        <textarea onChange={(e)=>setMsg(e.target.value)} name="message" minLength={20} maxLength={50} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your wishes here..."></textarea>
      </div>
      <div className="w-[100%] flex flex-col items-center">
        <button type="submit" disabled={loading || isSend} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ${isSend && 'bg-green-600 hover:bg-green-600'}`}>
          {loading ? (<div><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg> Loading...</div>) : isSend ? (<div><svg className="inline w-4 h-4 me-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" fill="white"></path></svg> Done</div>) : 'Send'}
        </button>
        {state?.error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state.error}</span></p>}
      </div>
  </form> 
  {state?.url && !finished && <div className="w-[100%] mt-2 flex justify-center items-center">
  <svg className="inline w-[40px] h-[40px] me-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx={18} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={6} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>
    <span className="inline">Generating image and links</span>
  </div>}
  {state?.url && finished &&  <div className="w-[100%] mt-2 flex flex-col items-center gap-2">
    <a className="block font-medium text-blue-600 underline " href={`${state.url}`}>Tap this link &#128513; </a> 
    <p className="font-bold">Or</p>
    <a className="block font-medium" href={`whatsapp://send?text=${encodeURIComponent(`${firstName} has a gift for ${secondName} \u{1FA77}\u{1F381}\u{1F970} :\n${state.url}\n\n\nTry your own there \u{1F447} :\n${state.baseUrl}`)}`} data-action="share/whatsapp/share">Share to your valentine in WhatsApp <img width={25} height={25} src="/images/whatsapp.png" className="object-cover object-center inline" alt="Whatsapp icon"/></a> </div>}
  </>
  );
}
