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
      const searchKeywords = searchParams.get("keywords") as string;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page: any = parseInt(searchParams.get("page") || "1");
    const limit: any = parseInt(searchParams.get("limit") || "10");

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

    const filter : any = {
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    };

    if (searchKeywords) {
      filter.$or = [
        {
          title: { $regex: searchKeywords, $options: "i" },
        },
        {
          description: { $regex: searchKeywords, $options: "i" },
        },
      ];
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }

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