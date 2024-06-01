import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { Worker } from "../entity/Worker"

const superVisorRepo = appDataSource.getRepository(Worker)

