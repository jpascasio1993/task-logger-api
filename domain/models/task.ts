import mongoose from "mongoose";

export default interface Task {
    _id: mongoose.Types.ObjectId;
    title: String,
    description: String,
    dateTime: String,
    completed: Boolean,
  }