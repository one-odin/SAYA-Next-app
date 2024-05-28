import connectToDB from "@/configs/db";
import Blog from "@/models/Blog";
import {addPostValidationSchema, editPostValidationSchema} from "@/utils/validationSchema";
const mongoose = require("mongoose");

// @route   GET /api/posts
// @desc    Get all blog posts
// @access  Public
export async function GET() {
  connectToDB();
  const allPosts = await Blog.find({}, "-__v").sort({_id: -1});
  return Response.json(allPosts, {status: 200});
}

// @route   POST /api/posts
// @desc    Create a post
// @access  Public
export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const {title, body, description} = reqBody;

    // Validation
    try {
      await addPostValidationSchema.validate(reqBody);
    } catch (err) {
      return Response.json({message: err.message}, {status: 422});
    }

    const newPost = await Blog.create({
      title,
      description,
      body,
    });

    return Response.json({data: newPost}, {status: 201});
  } catch (error) {
    return Response.json({message: error.message}, {status: 500});
  }
}

// @route   PUT /api/posts
// @desc    Create a post
// @access  Public
export async function PUT(req) {
  try {
    connectToDB();
    const id = await req.nextUrl.searchParams.get("id");
    const reqBody = await req.json();
    const {title, body, description, publish} = await reqBody;

    const publishBoolean = publish === "true" ? true : false;

    // Validation the ObjectId
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (isValidID === false) {
      return Response.json({message: "Data is not valid!"}, {status: 422});
    }

    // Validation
    try {
      await editPostValidationSchema.validate(reqBody);
    } catch (err) {
      return Response.json({message: err.message}, {status: 422});
    }

    await Blog.findByIdAndUpdate(id, {
      $set: {title, body, description, publish: publishBoolean},
    });

    return Response.json({message: "Post updated successfully."}, {status: 201});
  } catch (error) {
    return Response.json({message: error.message}, {status: 500});
  }
}

// @route   DELETE /api/posts
// @desc    Delete a post
// @access  Public
export async function DELETE(req) {
  try {
    connectToDB();
    const id = await req.nextUrl.searchParams.get("id");

    // Validation the ObjectId
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (isValidID === false) {
      return Response.json({message: "Data is not valid!"}, {status: 422});
    }

    await Blog.findByIdAndDelete(id);

    return Response.json({message: "Post deleted successfully."}, {status: 201});
  } catch (error) {
    return Response.json({message: error.message}, {status: 500});
  }
}
