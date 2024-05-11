import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { appDataSource } from './dataSource';
import { adminRoute } from './route/AdminRoute';
import { handleException } from './utility/ErrorHandler';
import { supervisiorRoute } from './route/Supervisior';
import { appRoute } from './route/AppRoute';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


//app.use(json)
app.use(json())

app.use(handleException)

// admin route 
app.use("/api", adminRoute)
app.use("/api", supervisiorRoute)
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

