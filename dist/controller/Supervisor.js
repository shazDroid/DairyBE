"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const Worker_1 = require("../entity/Worker");
const superVisorRepo = dataSource_1.appDataSource.getRepository(Worker_1.Supervisor);
