import mongoose from "mongoose";

export default interface TaskDTO {
    _id?: mongoose.Types.ObjectId,
    title: string;
    description: string;
    dateTime?: String;
    completed?: boolean;
}