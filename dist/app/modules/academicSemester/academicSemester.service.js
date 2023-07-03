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
exports.AcademicSemesterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
//create a semester
const createSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Semester Code with title Validation
    if (academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semester code');
    }
    else {
        const result = yield academicSemester_model_1.AcademicSemester.create(payload);
        return result;
    }
});
//get all semester with conditions or without conditions
const getAllSemesters = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //search term for the filtering
    const { searchTerm } = filters, filersData = __rest(filters, ["searchTerm"]);
    //combine all the regex search related field in a an empty array
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicSemester_constant_1.academicSemesterSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // const andCondition = [
    //   {
    //     $or: [
    //       {
    //         title: { $regex: searchTerm, $options: 'i' },
    //       },
    //       {
    //         code: { $regex: searchTerm, $options: 'i' },
    //       },
    //       {
    //         year: { $regex: searchTerm, $options: 'i' },
    //       },
    //     ],
    //   },
    // ];
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
    const result = yield academicSemester_model_1.AcademicSemester.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemester_model_1.AcademicSemester.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//get a single semester
const getSingleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findById(id);
    return result;
});
//update semester
const updateSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Semester Code with title Validation
    if (payload.title &&
        payload.code &&
        academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semester code');
    }
    const result = yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
//update semester
const deleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndDelete({ _id: id });
    return result;
});
exports.AcademicSemesterService = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
