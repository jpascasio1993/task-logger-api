import { Router } from 'express';
import taskRouter from './task_router/task_router';

const router = Router();

router.use('/tasks_logger', taskRouter);

export default router;
