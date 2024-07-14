"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dataSource_1 = require("./dataSource");
const AdminRoute_1 = require("./route/AdminRoute");
const ErrorHandler_1 = require("./utility/ErrorHandler");
const Worker_1 = require("./route/Worker");
const AppRoute_1 = require("./route/AppRoute");
const morgan = require('morgan');
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//app.use(json)
app.use((0, body_parser_1.json)());
app.use(ErrorHandler_1.handleException);
// admin route 
app.use("/api", AdminRoute_1.adminRoute);
app.use("/api", Worker_1.workerRoute);
app.use("/api/m", AppRoute_1.appRoute);
app.use(morgan('dev'));
// init database 
dataSource_1.appDataSource.initialize()
    .then(() => {
    console.log("DataSource -> Connected to database successfully");
}).catch((error) => {
    console.log(`DataSource -> Failed to connect to database ${error}`);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
