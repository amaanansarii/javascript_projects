
import { v2 as cloudinary } from "cloudinary"; //this as cloudinary giving the custom name for this project for v2
import fs from "fs" // use to read and write the file


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


const uploadOnCloudindary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        
        //upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(response,"---response from cloudinary---")
        // file has been uploadedo
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operatoin got failed.
        return null
    }
}

export { uploadOnCloudindary }