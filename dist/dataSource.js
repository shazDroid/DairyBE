"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Admin_1 = require("./entity/Admin");
const Branch_1 = require("./entity/Branch");
const City_1 = require("./entity/City");
const State_1 = require("./entity/State");
const Worker_1 = require("./entity/Worker");
const Customer_1 = require("./entity/Customer");
const Product_1 = require("./entity/Product");
exports.appDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "dairy_db",
    synchronize: true,
    logging: false,
    entities: [Admin_1.Admin, Branch_1.Branch, City_1.City, State_1.State, Worker_1.Worker, Customer_1.Customer, Product_1.Product],
    subscribers: [],
    migrations: [],
});
