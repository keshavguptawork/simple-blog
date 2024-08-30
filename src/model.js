import mongoose, { model, Schema } from "mongoose";

const articleSchema = new Schema({
  articleTitle: {
    type: String, 
    required: true
  },
  articleBody: {
    type: String, 
    required: true
  },
  articleTags: [{
    type: String, 
    required: false
  }],
}, {timestamps: true})


export const Article = model("Article", articleSchema)