"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sentResponse_1 = __importDefault(require("../../../shared/sentResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const student_constant_1 = require("./student.constant");
const student_service_1 = require("./student.service");
// get all with condition
const getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //take the filters
    const filters = (0, pick_1.default)(req.query, student_constant_1.studentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationfields);
    const result = yield student_service_1.StudentService.getAllStudents(filters, paginationOptions);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Students Data retrieved Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//get single student
const getSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.StudentService.getSingleStudent(id);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student Data retrieved Successfully',
        data: result,
    });
}));
//update
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield student_service_1.StudentService.updateStudent(id, updatedData);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student Data Updated successfully!',
        data: result,
    });
}));
//delete
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.StudentService.deleteStudent(id);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student Data Deleted Successfully!',
        data: result,
    });
}));
exports.StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
