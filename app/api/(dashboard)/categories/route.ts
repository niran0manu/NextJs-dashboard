import connect from "@/lib/db";
import User from "@/lib/dbSchemaModels/user";
import Category from "@/lib/dbSchemaModels/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      console.log("URL:", request.url);
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          {
            status: 400,
          }
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
  
      const categories = await Category.find({ user: new Types.ObjectId(userId) });
      return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error: any) {
      return new NextResponse("Error in fetching categories: " + error.message, {
        status: 500,
      });
    }
  };

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newCategory = new Category(body);
    await newCategory.save();
    return new NextResponse(
      JSON.stringify({ message: "Category is created", category: newCategory }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating category" + error.message, {
      status: 500,
    });
  }
};