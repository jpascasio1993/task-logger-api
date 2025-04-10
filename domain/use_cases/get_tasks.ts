import TaskRepository from "@/data/repository/task_repository_impl";
import UseCase from "@/domain/use_cases/use_case";
import GetTaskParams from "@/data/params/get_task_params";
import {ResponseSuccess, ResponseError, Response} from "@/data/response/response";
import Task from "@/domain/models/task";

export default class GetTask implements UseCase<GetTaskParams, Task[]> {
    private readonly taskRepository: TaskRepository;
    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(params: GetTaskParams): Promise<Response<Task[]>> {
      const res = await this.taskRepository.getTasks(params);
      if(!res.isSuccess) {
        return ResponseError({title: 'Get Tasks', message: 'Failed to retrieve tasks', error: res.error!});
      }
      return ResponseSuccess({
        title: 'Get Tasks',
        message: 'Tasks fetched successfully',
        data: res.data!
      });
    }
}
    