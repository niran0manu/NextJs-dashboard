import connect from "@/lib/db";
import User from "@/lib/dbSchemaModels/user";
import Category from "@/lib/dbSchemaModels/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/dbSchemaModels/blog";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    console.log("URL:", request.url);

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        {
          status: 400,
        }
      );
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found in the database" }),
        {
          status: 400,
        }
      );
    }

    const filter = {
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    };

    // 2do

    const blogs = await Blog.find(filter);
    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      "Error in fetching blog: " + error.message,
      {
        status: 500,
      }
    );
  }
};



export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    console.log("URL:", request.url);   

    const body = await request.json();
    const { title, description } = body;     

    
    if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          { status: 400 }
        );
      }
  
      if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing categoryId" }),
          { status: 400 }
        );
      }
  
      await connect();
  
      const user = await User.findById(userId);
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ message: "User not found in the database" }),
          {
            status: 404,
          }
        );
      }
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return new NextResponse(
          JSON.stringify({ message: "Category not found in the database" }),
          {
            status: 404,
          }
        );
      }


      const newBlog = new Blog({
        title,
        description,
        user: new Types.ObjectId(userId),
        category: new Types.ObjectId(categoryId),
      });
      await newBlog.save();

      return new NextResponse(
        JSON.stringify({ message: "Blog is created", blog: newBlog }),
        { status: 200 }
      );




  } catch (error: any) {
    return new NextResponse("Error in creating blog: " + error.message, {
      status: 500,
    });     
  }
  };