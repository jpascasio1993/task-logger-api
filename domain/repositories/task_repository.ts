import Task from "@/domain/models/task";
import GetTaskParams from "@/data/params/get_task_params";
import { Result } from "@/domain/models/result";
import CreateTaskParams from "@/data/params/create_task_params";
import UpdateTaskParams from "@/data/params/update_task_params";
import { BulkWriteResult, DeleteResult } from "mongodb";
import DeleteTaskParams from "@/data/params/delete_task_params";

export default interface TaskRepository {
    getTasks(params: GetTaskParams): Promise<Result<Task[]>>;
    createTasks(params: CreateTaskParams): Promise<Result<Task[]>>;
    updateTask(params: UpdateTaskParams): Promise<Result<BulkWriteResult>>;
    deleteTask(params: DeleteTaskParams): Promise<Result<DeleteResult>>;
}