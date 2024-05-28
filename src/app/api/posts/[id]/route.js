import connectToDB from "@/configs/db";
import Blog from "@/models/Blog";
const mongoose = require("mongoose");

// @route   GET /api/posts/:id
// @desc    Get one post
// @access  Public
export async function GET(req, {params}) {
  try {
    connectToDB();
    const id = await params.id;

    // Validation the ObjectId
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (isValidID === false) {
      return Response.json({message: "Data is not valid!"}, {status: 422});
    }

    const post = await Blog.findById({_id: id});

    return Response.json(post, {status: 200});
  } catch (error) {
    return Response.json({message: error.message}, {status: 200});
  }
}
