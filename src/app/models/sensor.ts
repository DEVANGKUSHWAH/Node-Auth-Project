import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  description: { type: String, required: true },
  geometry: {
    type: Array<Number>,
    required: true,
  },
  location: { type: String, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  _sensorId: { type: String, required: true },
  _sensorType: { type: String, required: true },
});

export const Sensor = mongoose.model("Sensor", sensorSchema);

const measurementSchema = new mongoose.Schema({
  _sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
  time: { type: Date, required: true },
  measurement: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, //expires: "1d",
});

export const Measurement = mongoose.model("Measurement", measurementSchema);

// import mongoose from "mongoose";

// const temperatureSchema = new mongoose.Schema({
//   time: { type: Date, required: true },
//   metadata: {
//     sensorId: { type: String, required: true },
//     sensorType: { type: String, required: true },
//   },
//   measurements: { type: Number, required: true },
//   createdAt: { type: Date, expires: "1d", default: Date.now }, // TTL index on the createdAt field, expires after 1 day
// });

// const Temperature = mongoose.model("Temperature", temperatureSchema);

// export default Temperature;
