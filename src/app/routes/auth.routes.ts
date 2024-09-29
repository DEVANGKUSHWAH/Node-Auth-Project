import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/auth.controller";

import {body} from "express-validator"

import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// router.post("/register", registerUser);
// router.post("/loginuser", loginUser);

router.get("/getalluser",authenticateToken, getAllUsers);


// Register a new user
router.post(
"/register", 
[
body("email").isEmail().withMessage("Invalid email"),
body("password")
.trim()
.isLength({ min: 6 })
.withMessage("Password must be at least 6 characters long"),
],
registerUser
);

// Login a user
router.post(
"/login", 
[
body("email").isEmail().withMessage("Invalid email"),
// body("password")
// .trim()
// .isLength({ min: 6 })
// .withMessage("Password must be at least 6 characters long"),
],
loginUser
);


export default router;

