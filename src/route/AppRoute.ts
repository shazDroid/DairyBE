import express from 'express'
import { adminLogin } from '../controller/AppController'

export const appRoute = express.Router()


appRoute
    .post('/admin-login', adminLogin)
    .post('/supervisor-login', )