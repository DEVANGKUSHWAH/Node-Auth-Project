import { Sensor, Measurement } from "../models/sensor";
import { Request, Response } from "express";

export const createSensorData = async (req: Request, res: Response) => {
  try {
    const {
      description,
      geometry,
      location,
      name,
      unit,
      _sensorId,
      _sensorType,
    } = req.body;
    const sensor = new Sensor({
      description,
      geometry,
      location,
      name,
      unit,
      _sensorId,
      _sensorType,
    });
    await sensor.save();
    res.status(201).json({ message: "Sensor data created successfully" });
  } catch (error) {
    console.error("Failed to create sensor data", error);
    res.status(500).json({ error: "Failed to create sensor data" });
  }
};


export const createMeasurementData = async (req: Request, res: Response) => {
  try {
    const { _sensorId, time, measurement } = req.body;
    const createMeasurement = new Measurement({
      _sensorId,
      time,
      measurement,
    });
    await createMeasurement.save();
    res.status(201).json({ message: "Measurement data created successfully" });
  } catch (error) {
    console.error("Failed to create measurement data", error);
    res.status(500).json({ error: "Failed to create measurement data" });
  }
};

export const getAllSensor = async (req: Request, res: Response) => {
  try {
    const sensorData = await Sensor.find();
    res.status(200).json(sensorData);
  } catch (error) {
    console.error("Error while fetching sensor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMeasurementsBySensorId = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.params.sensorId);
    
    const _sensorId = req.params.sensorId;
    console.log("getsensorid", _sensorId);
    const measurements = await Measurement.find({ _sensorId });
    res.status(200).json(measurements);
  } catch (error) {
    console.error("Error while fetching measurements by sensor ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSensorAndMeasurementData = async (
  req: Request,
  res: Response
) => {
  try {
    const measurementData = await Measurement.find().populate("_sensorId");
    res.status(200).json(measurementData);
  } catch (error) {
    console.error("Error while fetching measurement data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getSensorDataByLocation = async (req: Request, res: Response) => {
  try {
    const location = req.query.location; // Get the "location" from the query parameters

    // Find the sensor data based on the provided location
    const sensorData = await Sensor.findOne({ location });

    if (!sensorData) {
      return res
        .status(404)
        .json({ message: "Sensor data not found for the provided location." });
    }

    // Find all measurements associated with the sensor based on the _sensorId
    const measurements = await Measurement.find({ _sensorId: sensorData._id });

    // Combine the sensor data and measurements into a single object to return
    const sensorDataWithMeasurements = {
      sensor: sensorData,
      measurements: measurements,
    };

    res.status(200).json(sensorDataWithMeasurements);
  } catch (error) {
    console.error("Error while fetching sensor data by location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// import { Request, Response } from "express";
// import Temperature from "../models/temperature";

// export const createTemperature = async (req: Request, res: Response) => {
//   try {
//     const { time, metadata, measurements } = req.body;

//     const temperature = new Temperature({
//       time,
//       metadata,
//       measurements,
//     });

//     await temperature.save();

//     res.status(201).json({ message: "Temperature data created successfully" });
//   } catch (error) {
//     console.error("Failed to create temperature data", error);
//     res.status(500).json({ error: "Failed to create temperature data" });
//   }
// };

// export const getTemperature = async (req: Request, res: Response) => {
//   try {
//     // Fetch all users from the database
//     const sensorData = await Temperature.find();

//     // Return the array of users
//     res.status(200).json(sensorData);
//   } catch (error) {
//     console.error("Error while fetching sensoreData:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
