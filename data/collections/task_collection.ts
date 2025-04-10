import Task from '@/domain/models/task';
import { Schema, model } from 'mongoose';
const TaskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const TaskCollection = model<Task>('Task', TaskSchema);

export default TaskCollection;
