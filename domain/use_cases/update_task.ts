import UseCase from "@/domain/use_cases/use_case";
import TaskRepository from "@/domain/repositories/task_repository";
import { ResponseError, ResponseSuccess, Response } from "@/data/response/response";
import UpdateTaskParams from "@/data/params/update_task_params";
import { BulkWriteResult } from "mongodb";

export default class UpdateTask implements UseCase<UpdateTaskParams, BulkWriteResult> {
    private readonly taskRepository: TaskRepository;
    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(params: UpdateTaskParams): Promise<Response<BulkWriteResult>> {
        const res = await this.taskRepository.updateTask(params);
        if (!res.isSuccess) {
            return ResponseError({ title: 'Update Tasks', message: 'Failed to update tasks', error: res.error! });
        }
        return ResponseSuccess({
            title: 'Update Tasks',
            message: 'Tasks updated successfully',
            data: res.data!
        });
    }
}