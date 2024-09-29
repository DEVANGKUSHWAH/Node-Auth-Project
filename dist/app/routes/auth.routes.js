"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// router.post("/register", registerUser);
// router.post("/loginuser", loginUser);
router.get("/getalluser", authMiddleware_1.authenticateToken, auth_controller_1.getAllUsers);
// Register a new user
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
], auth_controller_1.registerUser);
// Login a user
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    // body("password")
    // .trim()
    // .isLength({ min: 6 })
    // .withMessage("Password must be at least 6 characters long"),
], auth_controller_1.loginUser);
exports.default = router;
