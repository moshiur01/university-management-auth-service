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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const academicDepartment_constrains_1 = require("./academicDepartment.constrains");
const academicDepartment_model_1 = require("./academicDepartment.model");
const createDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield academicDepartment_model_1.AcademicDepartment.create(payload)).populate('academicFaculty');
    return result;
});
//get all departments
const getAllDepartments = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //destructure pagination options
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    //combine search criteria =>   //combine all the regex search related field in a an empty array => andConditions = []
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicDepartment_constrains_1.academicDepartmentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $paginationOptions: 'i',
                },
            })),
        });
    }
    //exact filtering
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //sort condition
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //cheek either the condition is empty or not => if empty then return the whole document
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicDepartment_model_1.AcademicDepartment.find(whereConditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //count the total documents
    const total = yield academicDepartment_model_1.AcademicDepartment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//get a single department
const getSingleDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
});
//update department
const updateDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('academicFaculty');
    return result;
});
//delete department
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findByIdAndDelete(id);
    return result;
});
exports.AcademicDepartmentService = {
    createDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
