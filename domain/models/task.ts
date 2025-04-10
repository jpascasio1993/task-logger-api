import mongoose from "mongoose";

export default interface Task {
    _id: mongoose.Types.ObjectId;
    title: String,
    description: String,
    dateTime: Date,
    completed: Boolean,
  }