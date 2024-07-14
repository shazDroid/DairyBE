import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { appDataSource } from './dataSource';
import { adminRoute } from './route/AdminRoute';
import { handleException } from './utility/ErrorHandler';
import { workerRoute } from './route/Worker';
import { appRoute } from './route/AppRoute';
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(morgan('dev'))

const port = process.env.PORT || 3000;


//app.use(json)
app.use(json())

app.use(handleException)

// admin route 
app.use("/api/m", adminRoute)
app.use("/api/m", workerRoute)
app.use("/api/m", appRoute)


// init database 
appDataSource.initialize()
.then(() => {
  console.log("DataSource -> Connected to database successfully")
}).catch((error) => {
  console.log(`DataSource -> Failed to connect to database ${error}`)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

