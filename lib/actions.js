'use server'
import { v2 as cloudinary } from 'cloudinary';
import { extname, join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { User } from './mongo/models';
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

export async function create(prevState,formData) {
    let hostname = headers().get('host')
    let protocol = headers().get('x-forwarded-proto') || 'http'

    let file = formData.get('image');
    if(!file || file.size === 0 || file.name === 'undefined') return { file: "Inserez une photo de votre valentin(e)" }
        
    let username = formData.get('username');
    if(!username) return { username: "Veuillez entrer votre prénom" }

    let valentine_name = formData.get('valentine_name');
    if(!valentine_name) return { valentine_name: "Veuillez entrer le prénom de votre valentin(e)" }

    let message = formData.get('message');

    if(!isDev){
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(async function (error, result) {
          if (error) {
            reject(error);
            return { error: "An error has occurred uploading the file! Please try again!" };
          }
          resolve(result);
          try {
            let objectData = message ? {
              username,
              valentine_name,
              valentine_img: result.secure_url, 
              message
            } : {
              username,
              valentine_name,
              valentine_img: result.secure_url
            }
              const newUser = await User.create({
                ...objectData
              })
              return { url: `${protocol}://${hostname}/${newUser._id}`, user: newUser }
          } catch (error) {
            return { error: "An error has occurred! Please try again!" };
          }
        })
        .end(buffer);
      });
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
          } catch (e) {
            if (e.code === "ENOENT") {
              await mkdir(uploadDir, { recursive: true });
            } else {
              console.error(
                "Error while trying to create directory when uploading a file\n",
              );
              return { error: "Une erreur est survenue" };
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
        
            const valentine_img = 'http://localhost:3000/images/' + `${relativeUploadDir}/${filename}`
            try {
              let objectData = message ? {
                username,
                valentine_name,
                valentine_img,
                message
              } : {
                username,
                valentine_name,
                valentine_img
              }

                const newUser = await User.create({
                  ...objectData
                })
                return { url: `${protocol}://${hostname}/${newUser._id}`, user: newUser }
            } catch (e) {
                return { error: "An error has occurred uploading the file! Please try again!" }
            }
          } catch (e) {
            console.error("Error while trying to upload a file\n", e);
            return { error: "Une erreur est survenue en téléversant le fichier." };
          }
    }
  
}

export async function fetchUser(id){
  try {
    const user = await User.findById(id)
    if(user) {
      return user._doc
    }
  } catch (error) {
    throw new Error('Une erreur est survenue')
  }
}
