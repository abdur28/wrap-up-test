import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
    try {
        const { urls } = await req.json();  
        const publicIds = urls.map((url: string) => url.split("/").pop()?.split(".")[0]);
        // console.log(publicIds)
        let response
        cloudinary.v2.api.delete_resources(publicIds, function(error: any, success: any) {
            if(error) {
                // console.log(error)
                response = error.deleted
            } else {
                // console.log(success)
                response = success.deleted
            }
        });
        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false });
    }   
}