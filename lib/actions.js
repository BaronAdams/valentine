'use server'
import { v2 as cloudinary } from 'cloudinary';
import { extname, join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { headers } from 'next/headers';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const isDev = process.env.NODE_ENV === "development"

const sanitizeFilename = (filename) =>{
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function create(prevState, formData) {
    let hostname = headers().get('host')
    let protocol = headers().get('x-forwarded-proto') || 'http'

    let file = formData.get('image');
    if(!file || file.size === 0 || file.name === 'undefined') return { file: "Insert a photo of your valentine" }
        
    let username = formData.get('username');
    if(!username) return { username: "Please enter your first name" }

    let valentine_name = formData.get('valentine_name');
    if(!valentine_name) return { valentine_name: "Please enter your valentine's first name" }

    let message = formData.get('message') || "Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love";

    if(!isDev){
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(function (error, result) {
          if (error) {
            // reject(error);
            console.log("Error in uploading")
          }
          console.log("File uploaded")
          return resolve(result);
        })
        .end(buffer);
      });

      if(uploadResult?.public_id){
        let params = {
          u:username,
          v:valentine_name,
          i: uploadResult.secure_url.split("upload/")[1], 
          m:message
        }

        let encodedParams = Object.entries(params)
              .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
              .join("&");

        return { 
          url: `${protocol}://${hostname}/card?${encodedParams}`,
          user : {
            username,
            valentine_name,
            valentine_img: uploadResult.secure_url,
            message
          }
        }
      }else{
        return { file: "File upload error! Please try again!" }
      }
    }  
    else{
        let date = new Date()
        let year = date.getFullYear().toString()
        let month = (date.getMonth()+1).toString().padStart(2,'0')
        let day = date.getDate().toString().padStart(2,'0')
    
        const buffer = Buffer.from(await file.arrayBuffer());
        const pathDist = join(process.cwd(), "/public/images");
        const relativeUploadDir = `${day}-${month}-${year}`;
        const uploadDir = join(pathDist, relativeUploadDir)
    
        try {
            await stat(uploadDir);
        }catch (e) {
          if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
          } else {
            console.error(
              "File upload error! Please try again!\n",
            );
            return { error: "An error occured" };
          }
        }
    
        try {
          const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
          const fileExtension = extname(file.name);
          const originalFilename = file.name.replace(/\.[^/.]+$/, "");
          const sanitizedFilename = sanitizeFilename(originalFilename);
          const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
          console.log('filename : ' + filename);
          await writeFile(`${uploadDir}/${filename}`, buffer);
        
          let valentine_img = 'http://localhost:3000/images/' + `${relativeUploadDir}/${filename}`
          let params = {
            u:username,
            v:valentine_name,
            i: valentine_img, 
            m:message
          }
  
          let encodedParams = Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&");

          console.log(`${protocol}://${hostname}/card?${encodedParams}`)

          return { 
            url: `${protocol}://${hostname}/card?${encodedParams}`,
            user : {
              username,
              valentine_name,
              valentine_img,
              message
            }
          }
        } catch (e) {
          console.error("Error while trying to upload a file\n", e);
          return { error: "File upload error! Please try again!." };
        }
    }
  
}


