import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongoDB";
import { Collection } from "@/lib/models/collection";

interface Props {
  params: {
    collectionId: string;
  };
}

export const GET = async (req: NextRequest, context: Props) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { collectionId } = await context.params;
    if (!collectionId) {
      return new Response("Collection ID is required", { status: 400 });
    }

    await connectDB();
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collections GET]: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, context: Props) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { collectionId } = await context.params;
    if (!collectionId) {
      return new Response("Collection ID is required", { status: 400 });
    }

    await connectDB();
    let collection = await Collection.findById(collectionId);
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new Response("Title and image are required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collections POST]: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, context: Props) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { collectionId } = await context.params;
    if (!collectionId) {
      return new Response("Collection ID is required", { status: 400 });
    }

    await connectDB();
    await Collection.findByIdAndDelete(collectionId);
    return new Response("Collection deleted", { status: 200 });
  } catch (error) {
    console.log("[Collections DELETE]: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};