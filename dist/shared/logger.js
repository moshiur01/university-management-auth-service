"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const h = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${date.toDateString()} ${h}: ${min}: ${sec} [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'right meow!' }), timestamp(), myFormat, prettyPrint()),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'success', 'phu-%DATE%-success.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.logger = logger;
const ErrorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'phu-%DATE%-error.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.ErrorLogger = ErrorLogger;
