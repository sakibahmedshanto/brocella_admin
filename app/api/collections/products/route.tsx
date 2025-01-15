import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import Product  from "@/lib/models/Product"
export const POST = async (req: NextRequest) => {
try {
    const {userId} = await auth()
    if(!userId){
        console.log("Unauthorized in products_post");
        return new NextResponse("Unauthorized", { status: 401 });
    }   

    await connectDB();

    const { title, description, media, category, collection, tags, sizes, colors, price, expense } = await req.json();

    if (!title || !media || !category || !collection || !tags || !sizes || !colors || !price || !expense) {
        return new NextResponse("Missing Fields", { status: 400 });
    }

    const newProduct = await Product.create({
        title,
        description,
        media,
        category,
        collection,
        tags,
        sizes,
        colors,
        price,
        expense,
        userId
    });
    
    await newProduct.save();
    return new NextResponse(newProduct, { status: 200 });
} catch (error) {
    console.log("Products_Post_Error", error);
    return new NextResponse("internal server error", { status: 500 });
}

}