import express from "express";
import {
  createMeasurementData,
  createSensorData,
  getAllSensor,
  getMeasurementsBySensorId,
  getSensorAndMeasurementData,
  getSensorDataByLocation,
} from "../controllers/sensor.controller";

const router = express.Router();

router.post("/createSensorData", createSensorData);

router.post("/createMeasurementData", createMeasurementData);

router.get("/getSensorAndMeasurementData", getSensorAndMeasurementData);

router.get("/getAllSensor", getAllSensor);

router.get("/getMeasurementsBySensorId/:sensorId", getMeasurementsBySensorId);

router.get("/getSensorDataByLocation", getSensorDataByLocation);


export default router;