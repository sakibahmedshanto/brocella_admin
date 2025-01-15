import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Collection } from "@/lib/models/collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 403 });
    }
    await connectDB();

    const { title, description, image } = await req.json();
    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new Response("Collection already exists", { status: 400 });
    }
    if (!title || !image) {
      return new Response("Tittle and image are required", { status: 400 });
    }
    const newCollection = await Collection.create({
      title,
      description,
      image,
    });
    await newCollection.save();
    return new Response("Collection created", { status: 201 });
  } catch (error) {
    console.log("[Collections post]: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const collections = await Collection.find().sort({ createdAt: "desc" });
    return new Response(JSON.stringify(collections), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[Collections get]: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
