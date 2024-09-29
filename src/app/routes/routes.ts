import express from 'express'
import register from '../routes/auth.routes';
import sensor from "./sensor.routes"


const router = express.Router();

//user routes
router.use("/user", register);

router.use("/sensor", sensor )

export default router;
