'use server'
import { v2 as cloudinary } from 'cloudinary';
import { extname, join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { headers } from 'next/headers';
import fs from 'fs'

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

    let message = formData.get('message') || "default";
    console.log(file)
    if(!isDev){
      let mime = file.type
      let encoding = 'base64'
      let arrayBuffer = await file.arrayBuffer();
      let base64Data = Buffer.from(arrayBuffer).toString('base64');
      let uri = 'data:' + mime + ';' + encoding + ',' + base64Data

      let uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(uri)
          .then((result) => {
            console.log("File uploaded")
            return resolve(result);
          })
          .catch((error) => {
            console.log("Error in uploading");
            return reject(error) ;
          })
      });

      if(uploadResult?.public_id){
        let params = {
          u:username,
          v:valentine_name,
          i:uploadResult.public_id, 
          m:message
        }

        let encodedParams = Object.entries(params)
              .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
              .join("&");
         
        let finalMessage = message !== "default" ? message : "Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love" 

        return { 
          url: `${protocol}://${hostname}/card?${encodedParams}`,
          baseUrl: `${protocol}://${hostname}`,
          user : {
            username,
            valentine_name,
            valentine_img: uploadResult.secure_url,
            message: finalMessage
          }
        }
      }else{
        return { file: "Error while uploading the file, Please try again !" }
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

          let finalMessage = message !== "default" ? message : "Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love" 

          return { 
            url: `${protocol}://${hostname}/card?${encodedParams}`,
            baseUrl: `${protocol}://${hostname}`,
            user : {
              username,
              valentine_name,
              valentine_img,
              message: finalMessage
            }
          }
        } catch (e) {
          console.error("Error while trying to upload a file\n", e);
          return { error: "File upload error! Please try again!." };
        }
    }
  
}

export async function putImagetoServer(file){
  const buffer = Buffer.from(await file.arrayBuffer());
  const pathDist = join(process.cwd(), "/public/images");

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    console.log('filename : ' + filename);
    await writeFile(`${pathDist}/${filename}`, buffer);
    return '/images/'+filename;
  } catch (error) {
    return ;
  }
    
}

export async function deleteImage(path){
  join(process.cwd(), `/public${path}`)
  fs.unlink(join(process.cwd(), `/public${path}`), (err) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la suppression du fichier :', err);
      return;
    }
    console.log('Le fichier a été supprimé avec succès.');
  });
}

export async function getImage(id){
  let url = cloudinary.url(id)
  if(url) return url
}

