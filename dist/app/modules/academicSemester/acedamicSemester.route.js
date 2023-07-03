"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const acedamicSemester_validation_1 = require("./acedamicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post('/create-semester', (0, validateRequest_1.default)(acedamicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.academicSemesterController.createSemester);
router.get('/:id', academicSemester_controller_1.academicSemesterController.getSingleSemester);
router.get('/', academicSemester_controller_1.academicSemesterController.getAllSemester);
//update
router.patch('/:id', (0, validateRequest_1.default)(acedamicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.academicSemesterController.updateSemester);
//delete
router.delete('/:id', academicSemester_controller_1.academicSemesterController.deleteSemester);
exports.AcademicSemesterRoutes = router;
