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
exports.FacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const faculty_constrain_1 = require("./faculty.constrain");
const pagination_1 = require("../../../constants/pagination");
const sentResponse_1 = __importDefault(require("../../../shared/sentResponse"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_service_1 = require("./faculty.service");
const getAllFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, faculty_constrain_1.facultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationfields);
    const result = yield faculty_service_1.FacultyService.getAllFaculties(filters, paginationOptions);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculties Retrieved Successfully',
        data: result.data,
        meta: result.meta,
    });
}));
//get single faculty
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.getSingleFaculty(id);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty retrieved Successfully',
        data: result,
    });
}));
//update
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield faculty_service_1.FacultyService.updateFaculty(id, updatedData);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty Data Updated successfully!',
        data: result,
    });
}));
//delete
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.deleteFaculty(id);
    (0, sentResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'faculty deleted successfully !',
        data: result,
    });
}));
exports.FacultyController = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
