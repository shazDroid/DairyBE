import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { Supervisor } from "../entity/Supervisor"

const superVisorRepo = appDataSource.getRepository(Supervisor)

