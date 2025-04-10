import GetTaskParams from '@/data/params/get_task_params';
import { Router, Request, Response, NextFunction } from 'express';
import Context from '@/data/context';
import CreateTaskParams from '@/data/params/create_task_params';
import UpdateTaskParams from '@/data/params/update_task_params';
import DeleteTaskParams from '@/data/params/delete_task_params';
const router = Router();

router.get('/tasks', async (req: Request<GetTaskParams, any, any, any>, res: Response, next: NextFunction) => {
    const context: typeof Context = res.locals.context;
    const response = await context.getTasks.execute(req.body);
    if (response.type === 'success') {
        res.status(200).json(response);
        next();
        return;
    }
    res.status(500).json(response);
    next();
});

router.post('/tasks', async (req: Request<CreateTaskParams, any, any, any>, res: Response, next: NextFunction) => {
    const context: typeof Context = res.locals.context;
    const response = await context.createTasks.execute(req.body);
    if (response.type === 'success') {
        res.status(200).json(response);
        next();
        return;
    }
    res.status(500).json(response);
    next();
});

router.put('/tasks', async (req: Request<UpdateTaskParams, any, any, any>, res: Response, next: NextFunction) => {
    const context: typeof Context = res.locals.context;
    const response = await context.updateTask.execute(req.body);
    if (response.type === 'success') {
        res.status(200).json(response);
        next();
        return;
    }
    res.status(500).json(response);
    next();
});

router.delete('/tasks', async (req: Request<DeleteTaskParams, any, any, any>, res: Response, next: NextFunction) => {
    const context: typeof Context = res.locals.context;
    const response = await context.deleteTask.execute(req.body);
    if (response.type === 'success') {
        res.status(200).json(response);
        next();
        return;
    }
    res.status(500).json(response);
    next();
});
export default router;
