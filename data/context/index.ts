import TaskRepository from '@/data/repository/task_repository_impl';
import TaskCollection from '@/data/collections/task_collection';
import Task from '@/domain/models/task';
import UseCase from '@/domain/use_cases/use_case';
import GetTaskParams from '@/data/params/get_task_params';
import GetTask from '@/domain/use_cases/get_tasks';
import CreateTaskParams from '@/data/params/create_task_params';
import CreateTasks from '@/domain/use_cases/create_tasks';
import UpdateTaskParams from '@/data/params/update_task_params';
import { BulkWriteResult, DeleteResult } from 'mongodb';
import UpdateTask from '@/domain/use_cases/update_task';
import DeleteTaskParams from '@/data/params/delete_task_params';
import DeleteTasks from '@/domain/use_cases/delete_tasks';

interface Context {
  getTasks: UseCase<GetTaskParams, Task[]>;
  createTasks: UseCase<CreateTaskParams, Task[]>;
  updateTask: UseCase<UpdateTaskParams, BulkWriteResult>;
  deleteTask: UseCase<DeleteTaskParams, DeleteResult>;
}

const context: Context = {
  getTasks: new GetTask(new TaskRepository(TaskCollection)),
  createTasks: new CreateTasks(new TaskRepository(TaskCollection)),
  updateTask: new UpdateTask(new TaskRepository(TaskCollection)),
  deleteTask: new DeleteTasks(new TaskRepository(TaskCollection)),
};

export default context;
