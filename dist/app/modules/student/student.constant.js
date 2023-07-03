"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSearchableFields = exports.studentFilterableFields = exports.studentConstant = void 0;
const gender = ['male', 'female'];
const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.studentConstant = {
    gender,
    bloodGroup,
};
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
