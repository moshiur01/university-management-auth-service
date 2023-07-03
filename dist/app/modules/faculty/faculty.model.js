"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.facultySchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("../user/user.constant");
const faculty_constrain_1 = require("./faculty.constrain");
exports.facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: user_constant_1.userConstant.gender,
    },
    bloodGroup: {
        type: String,
        enum: user_constant_1.userConstant.bloodGroup,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        enum: faculty_constrain_1.facultyConstant.designation,
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Faculty = (0, mongoose_1.model)('Faculty', exports.facultySchema);
