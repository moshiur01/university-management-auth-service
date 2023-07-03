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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const mongoose_1 = __importDefault(require("mongoose"));
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
//get all students with conditions or without conditions
const getAllStudents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //search term for the filtering
    const { searchTerm } = filters, filersData = __rest(filters, ["searchTerm"]);
    //combine all the regex search related field in a an empty array
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: student_constant_1.studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    //exact filtering
    if (Object.keys(filersData).length) {
        andConditions.push({
            $and: Object.entries(filersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //pagination term
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    //sort condition
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //cheek either the condition is empty or not
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield student_model_1.Student.find(whereConditions)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//get a single student
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
//update student data
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const { name, guardian, localGuardian } = payload, studentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const updatedStudentData = Object.assign({}, studentData);
    /* const name ={
      firstName: 'Moshiur',
      middleName:'Rahman',
      lastName: 'Akash => All'
    }
  */
    // dynamically handling
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`; // `name.firstName`
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`; // `guardian.fisrtguardian`
            updatedStudentData[guardianKey] =
                guardian[key]; // updatedStudentData['guardian.motherContactNo']=guardian[motherContactNo]
            // updatedStudentData --> object create --> guardian : { motherContactNo: 0177}
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}`; // `localGuardian.firstName`
            updatedStudentData[localGuardianKey] =
                localGuardian[key];
        });
    }
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
});
//delete student
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the faculty is exist
    const isExist = yield student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete faculty first
        const faculty = yield student_model_1.Student.findOneAndDelete({ id }, { session });
        if (!faculty) {
            throw new ApiError_1.default(404, 'Failed to delete Faculty');
        }
        //delete user
        yield user_model_1.User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return faculty;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
