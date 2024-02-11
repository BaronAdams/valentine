"use client"
import { useEffect, useState } from "react";
import { useFormState } from 'react-dom'
import { create, deleteImage } from "@/lib/actions";
import Link from "next/link";
import localFont from 'next/font/local'
import html2canvas from 'html2canvas'

// Lovers_Quarrel({ weight:"400", subsets:["latin"] });
// Raleway({ subsets: ["latin"] });
// Belleza({weight:"400", subsets:["latin"] });

const lovaQuarrel = localFont({src:'../public/fonts/LoversQuarrel-Regular.ttf'});
const raleway =  localFont({src:'../public/fonts/Raleway-VariableFont_wght.ttf'});
const belleza =  localFont({src:'../public/fonts/Belleza-Regular.ttf'});
const brittany = localFont({src:'../public/fonts/BrittanySignature.ttf'});

export default function Home() {
  const [state, dispatch] = useFormState(create,undefined)
  const [file, setFile] = useState();
  const [firstName, setfirstName] = useState();
  const [secondName, setsecondName] = useState();
  const [loading, setloading] = useState(false);

  const handleChangeFile = (e)=>{
    setFile(e.target?.files[0])
  } 

  const generateImg = (elt)=>{
    let tmp = document.createElement('section')
    tmp.classList.add('w-[860px]','h-[600px]','bg-[#ec9ca9]','relative','top-[-9999px]')

    let firstImg = document.createElement('img')
    firstImg.src = '/images/garden-flowers-png-0.png'
    firstImg.alt = 'Garden flowers image'
    firstImg.className ='absolute left-[-5%] top-[-5%]'
    tmp.appendChild(firstImg)

    let secondImg = document.createElement('img')
    secondImg.src = '/images/watercolor-flowers-png-image.png'
    secondImg.alt = 'Watercolor flowers image'
    secondImg.className ='absolute left-[74%] top-[-15%] rotate-[180deg]'
    tmp.appendChild(secondImg)

    let thirdImg = document.createElement('img')
    thirdImg.src = '/images/arc-flowers.png'
    thirdImg.alt = 'Arc flowers image'
    thirdImg.width = 300
    thirdImg.height = 200
    thirdImg.className ='absolute left-[72%] bottom-0 object-cover'
    tmp.appendChild(thirdImg)

    let divContent = document.createElement('div')
    divContent.className='w-full h-full absolute gap-[48px] flex flex-col justify-center items-center'

    let h2 = document.createElement('h2')
    h2.className = `${lovaQuarrel.className} text-[50px]`
    h2.textContent = `For you ${elt.valentine_name}`
    divContent.appendChild(h2)

    let firstDiv = document.createElement('div')
    firstDiv.className="flex gap-[48px] justify-center items-center w-full"

    let divChild1 = document.createElement('div')
    divChild1.className="w-[22.5%] h-[230px] relative"

    let divChild11 = document.createElement('div')
    divChild11.className="w-full h-full absolute z-10 rotate-[-15.6deg] flex justify-center items-center bg-white"
    
    let divChild111 = document.createElement('div')
    divChild111.className=`w-[90%] h-[90%] relative`
    let img1divChild12 = document.createElement('img')
    img1divChild12.src = `${elt.valentine_img}`
    img1divChild12.alt = 'Valentine img'
    img1divChild12.className="absolute w-full h-full object-center object-cover"
    divChild111.appendChild(img1divChild12)

    let img2divChild12 = document.createElement('img')
    img2divChild12.src = '/images/ca5aee534774d6b4ef69168c1c75a9d1.gif'
    img2divChild12.alt = 'Butterfliers gif'
    img2divChild12.className="absolute w-full h-full object-cover"
    img2divChild12.style.transform = 'scale(0.85)'
    divChild111.appendChild(img2divChild12)

    divChild11.appendChild(divChild111)

    divChild1.appendChild(divChild11)


    let divChild12 = document.createElement('div')
    divChild12.className="w-full h-full absolute z-1 blur-sm rotate-[-26.6deg] shadow-2xl bg-[#000000]"
    divChild1.appendChild(divChild12)
    firstDiv.appendChild(divChild1)

    let divChild2 = document.createElement('div')
    divChild2.className=`${belleza.className} text-justify w-[46.4%]`
    let p1 = document.createElement('p')
    p1.className = `mb-4 text-[24.4px] w-full`
    p1.innerText += 'Happy '
    let span = document.createElement('span')
    span.className = `${brittany.className} text-[25.6px]`
    span.innerText = 'Valentine'
    p1.appendChild(span)
    p1.innerText += ' day'
    
    let imgP = document.createElement('img')
    imgP.width = 46
    imgP.height = 46
    imgP.src = '/images/hearts.png'
    imgP.alt = 'Hearts image'
    imgP.className="inline object-cover"
    p1.appendChild(imgP)
    divChild2.append(p1)

    let p2 = document.createElement('p')
    p2.className = `${raleway.className} w-full text-[20.8px]`
    p2.innerText += elt.message
    divChild2.append(p2)

    let p3 = document.createElement('p')
    p3.className = `${brittany.className} w-full mt-3 text-end text-[23.8px]`
    p3.innerText += elt.username
    divChild2.append(p3)
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
        deleteImage(elt.valentine_img);
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
    if(state?.user?.username) generateImg(state.user)
  },[state])

  return (
    <>
    <nav className="bg-white overflow-hidden dark:bg-gray-900 fixed w-full z-20 flex flex-wrap items-center justify-center h-[9vh] top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <Link href="/" className="flex h-full w-full items-center space-x-3 rtl:space-x-reverse">
          <img width={40} height={40} src="/logo.jpg" className="h-full w-full object-cover object-center" style={{transform:'scale(0.65)'}} alt="Valentine's Logo"/>
          {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
      </Link>
    </nav>
    <form onSubmit={handleSubmit} action={dispatch} className="flex flex-col mt-[9vh] pt-3 w-screen min-h-screen gap-5 justify-center items-center">    
      <div className="flex flex-col gap-3 items-center justify-center w-[80%]">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Click to upload your valentine picture</span>or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input onChange={handleChangeFile} id="dropzone-file" name="image" type="file" className="hidden" accept="image/*" required />
          </label>
          {((state && !file) || (state?.file && !file)) && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state?.file}</span></p>}
      </div>
      {file && <img
        width={30}
        height={30}
        alt={"Valentine's image"}
        src={URL.createObjectURL(file)}
        className="w-[80%] h-[40vh] object-cover object-center"
      /> }
      <div className="w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input onChange={(e)=>setfirstName(e.target.value)} type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Tap your first name" />
        {((state && !firstName) || (state?.username && !firstName)) && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state?.username}</span></p>}
      </div>  
      <div className="w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="valentine_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your valentine&apos;s name</label>
        <input onChange={(e)=>setsecondName(e.target.value)} type="text" id="valentine_name" name="valentine_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Tap your valentine's name" />
        {((state && !secondName) || (state?.valentine_name && !secondName)) && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state?.valentine_name}</span></p>}
      </div>  
      <div className="w-[50%] max-[480px]:w-[80%]">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message for him/her(optionnal)</label>
        <textarea name="message" minLength={20} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your wishes here..."></textarea>
      </div>
      <div className="w-[100%] flex flex-col items-center">
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loading ? (<div><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg> Loading...</div>) : 'Send'}
        </button>
        {state?.error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{state.error}</span></p>}
      </div>
  </form> 
  {state?.url &&  <div className="w-[100%] mt-2 flex flex-col items-center gap-2">
    <a className="block font-medium text-blue-600 underline " href={`${state.url}`}>Tap this link &#128513; </a> 
    <p className="font-bold">Or</p>
    <a className="block font-medium" href={`whatsapp://send?text=For ${secondName} from ${firstName} &#x1F601;:%0A${state.url}%0A%0A%0ATry your own here &#x1F447; :%0A${state.url.split('/')[0]}`} data-action="share/whatsapp/share">Share to your valentine in WhatsApp <img width={25} height={25} src="/images/whatsapp.png" className="object-cover object-center inline" alt="Whatsapp icon"/></a> </div>}
  </>
  );
}
