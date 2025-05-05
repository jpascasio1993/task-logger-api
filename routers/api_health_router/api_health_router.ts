import { Router } from "express";

const router  = Router();

// this is used to check if the server is running
// and also is used by the app to check if the device 
// has internet connection
router.get('/health', (req, res) => {
    res.status(200).json(true);
});

export default router;