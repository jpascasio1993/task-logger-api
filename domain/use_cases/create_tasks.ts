import CreateTaskParams from "@/data/params/create_task_params";
import UseCase from "@/domain/use_cases/use_case";
import TaskRepository from "@/domain/repositories/task_repository";
import Task from "@/domain/models/task";
import { ResponseError, ResponseSuccess, Response } from "@/data/response/response";

export default class CreateTasks implements UseCase<CreateTaskParams, Task[]> {
    private readonly taskRepository: TaskRepository;
    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(params: CreateTaskParams): Promise<Response<Task[]>> {
        const res = await this.taskRepository.createTasks(params);
        if (!res.isSuccess) {
            return ResponseError({ title: 'Create Tasks', message: 'Failed to create tasks', error: res.error! });
        }
        return ResponseSuccess({
            title: 'Create Tasks',
            message: 'Tasks created successfully',
            data: res.data!
        });
    }
}