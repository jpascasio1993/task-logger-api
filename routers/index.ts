import { Router } from 'express';
import taskRouter from '@/routers/task_router/task_router';
import apiHealthRouter from '@/routers/api_health_router/api_health_router';
const router = Router();

router.use('/task_logger', taskRouter);
router.use('/api', apiHealthRouter);

export default router;
