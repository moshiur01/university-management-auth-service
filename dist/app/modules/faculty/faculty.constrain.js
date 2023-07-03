"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyConstant = exports.facultySearchableFields = exports.facultyFilterableFields = void 0;
const designation = [
    'Lecturer',
    'Senior Lecturer',
    'Associate Professor',
    'Assistant Professor',
    'Professor',
];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
    'emergencyContactNo',
];
exports.facultyConstant = {
    designation,
};
