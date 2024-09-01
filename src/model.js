import mongoose, { model, Schema } from "mongoose";

const blogSchema = new Schema({
  blogTitle: {
    type: String, 
    required: true
  },
  blogBody: {
    type: String, 
    required: true
  },
  blogTags: [{
    type: String, 
    required: false
  }],
}, {timestamps: true})


export const Blog = model("Blog", blogSchema)