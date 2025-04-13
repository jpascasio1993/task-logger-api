import { Result, ResultSuccess, ResultError } from '@/domain/models/result';
import Task from '@/domain/models/task';
import { Model } from 'mongoose';
import { BulkWriteResult, DeleteResult } from 'mongodb';
import TaskRepository from '@/domain/repositories/task_repository';
import GetTaskParams from '@/data/params/get_task_params';
import { isBoolean, isNil, omit, omitBy, pick, reduce} from 'lodash'
import CreateTaskParams from '@/data/params/create_task_params';
import UpdateTaskParams from '@/data/params/update_task_params';
import DeleteTaskParams from '@/data/params/delete_task_params';

export default class TaskRepositoryImpl implements TaskRepository {
  private readonly taskCollection: Model<Task>;

  constructor(taskCollection: Model<Task>) {
    this.taskCollection = taskCollection;
  }

  async deleteTask(params: DeleteTaskParams): Promise<Result<DeleteResult>> {
     const session = await this.taskCollection.startSession();

    try {
      session.startTransaction();
      const tasks = await this.taskCollection.deleteMany({_id: {$in: params.ids}}, {session});
      await session.commitTransaction();
      return ResultSuccess(tasks);
    } catch(e) {
      await session.abortTransaction();
      return ResultError(e);
    } finally {
      await session.endSession();
    }
  }

  async updateTask(params: UpdateTaskParams): Promise<Result<BulkWriteResult>> {
    const session = await this.taskCollection.startSession();

    try {
      session.startTransaction();
      const cleanTasksParams = params.tasks.map((task) => omitBy(task, isNil));
      const formatParams = cleanTasksParams.map((task) => {
        return {
          updateOne: {
            filter: { _id: task._id },
            update: {
              $set: omit(task, '_id')
            }
          }
        };
      });
   
      const tasks = await this.taskCollection.bulkWrite(formatParams, { session });
      await session.commitTransaction();
      return ResultSuccess(tasks);
    } catch(e) {
      await session.abortTransaction();
      return ResultError(e);
    } finally {
      await session.endSession();
    }
  }

  async createTasks(params: CreateTaskParams): Promise<Result<Task[]>> {
    const session = await this.taskCollection.startSession();

    try {
      session.startTransaction();
      const cleanTasksParams = params.tasks.map((task) => omitBy(task, isNil));
      const tasks = await this.taskCollection.create(cleanTasksParams, { session });
      await session.commitTransaction();
      return ResultSuccess(tasks);
    } catch(e) {
      await session.abortTransaction();
      return ResultError(e);
    } finally {
      await session.endSession();
    }
  }

  async getTasks(params: GetTaskParams): Promise<Result<Array<Task>>> {
    try {
      const cleanTaskParams = omitBy(params, isNil);
      const formatParams = reduce(cleanTaskParams, (acc: any, curr: any, key: any) => {
        acc[key] = isBoolean(curr)  || key === '_id'? curr : { $regex: curr, $options: 'i' };
        return acc;
      }, {});
      console.log(formatParams);
      const tasks = await this.taskCollection.find(formatParams);
      return ResultSuccess(tasks);
    } catch (e) {
      console.error(e);
      return ResultError(e);
    }
  }
}
