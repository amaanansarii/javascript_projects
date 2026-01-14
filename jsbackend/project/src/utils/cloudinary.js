
import { v2 as cloudinary } from "cloudinary"; //this as cloudinary giving the custom name for this project for v2
import fs from "fs" // use to read and write the file


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


const uploadOnCloudindary = async (localFilePath => {
    try {
        if(!localFilePath) return null;
        
        //upload the file on cloudinary

        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded
    } catch (error) {
        
    }
})

 const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);