import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";
import { Branch } from "./entity/Branch";
import { City } from "./entity/City";
import { State } from "./entity/State";
import { Worker } from "./entity/Worker";
import { Customer } from "./entity/Customer";
import { Product } from "./entity/Product";


export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "dairy_db",
    synchronize: true,
    logging: false,
    entities: [Admin, Branch, City, State, Worker, Customer, Product],
    subscribers: [],
    migrations: [],
})
