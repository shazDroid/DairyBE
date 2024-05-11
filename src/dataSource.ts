import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";
import { Branch } from "./entity/Branch";
import { City } from "./entity/City";
import { State } from "./entity/State";
import { Supervisor } from "./entity/Supervisor";
import { Customer } from "./entity/Customer";
import { Package } from "./entity/Package";
import { Product } from "./entity/Product";
import { ProductItem } from "./entity/ProductItem";

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mess_db",
    synchronize: true,
    logging: false,
    entities: [Admin, Branch, City, State, Supervisor, Customer, Package, Product, ProductItem],
    subscribers: [],
    migrations: [],
})
