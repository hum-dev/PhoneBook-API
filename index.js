import express from 'express';
//sta

import config from './src/db/config.js';
import { userRoutes } from './src/Routes/userRoutes.js';


const app = express();
//add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
userRoutes(app);


app.get('/', (req, res) => {
    res.send('welcome to my api');
});


app.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});
