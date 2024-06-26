import connect from "@/lib/db";
import Author from "@/lib/dbSchemaModels/author";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";



export const GET = async (request: NextRequest, context: { params: any }) => {
  const authorId = context.params.author;
  try {
    await connect();
    const author = await Author.findById(authorId);
    if (!author) {
      return new NextResponse(JSON.stringify({ message: "Author not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ author }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching an author" + error.message, {
      status: 500,
    });
  }
};



export const PATCH = async (request: NextRequest, context: { params: any }) => {
  const authorId = context.params.author;
  try {
    const body = await request.json();
    await connect();
    const author = await Author.findByIdAndUpdate(authorId, body, { new: true });
    if (!author) {
      return new NextResponse(JSON.stringify({ message: "Author not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ author }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in updating author" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest, context: { params: any }) => {
  const authorId = context.params.author;
  try {
    await connect();
    const author = await Author.findByIdAndDelete(authorId);
    if (!author) {
      return new NextResponse(JSON.stringify({ message: "Author not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ message: "Author is deleted" }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in deleting author" + error.message, {
      status: 500,
    });
  }
};
