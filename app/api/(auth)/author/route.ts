import connect from "@/lib/db";
import Author from "@/lib/dbSchemaModels/author";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

export const GET = async () => {
  try {
    await connect();
    const authors = await Author.find();
    return new NextResponse(JSON.stringify(authors), { status: 200 });
   
  } catch (error: any) {
    return new NextResponse("Error in fetching authors: " + error.message, {
      status: 500,
    });
  }
};


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await connect();
    const newAuthor = new Author(body);
    await newAuthor.save();

    return new NextResponse(
      JSON.stringify({ message: "Author is created", author: newAuthor }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating author" + error.message, {
      status: 500,
    });
  }
};
