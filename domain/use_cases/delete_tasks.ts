import DeleteTaskParams from "@/data/params/delete_task_params";
import { DeleteResult } from "mongodb";
import UseCase from "@/domain/use_cases/use_case";
import TaskRepository from "@/domain/repositories/task_repository";
import { ResponseSuccess, Response, ResponseError } from "@/data/response/response";

export default class DeleteTasks implements UseCase<DeleteTaskParams, DeleteResult> {

    private readonly taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(params: DeleteTaskParams): Promise<Response<DeleteResult>> {
        const res = await this.taskRepository.deleteTask(params);
        if (!res.isSuccess) {
            return ResponseError({ title: 'Delete Tasks', message: res.error['message'] || 'Failed to delete tasks', error: res.error! });
        }
        return ResponseSuccess({
            title: 'Delete Tasks',
            message: 'Tasks deleted successfully',
            data: res.data!
        });
    }
}