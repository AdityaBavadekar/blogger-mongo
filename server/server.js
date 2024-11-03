import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/main.js';
import apiRouter from './routes/api.js';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import MongoStore from 'connect-mongo';

configDotenv();
connectDB();

const app = express();
const PORT = 5080 || process.env.PORT;

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.use(express.static('public'));
app.set('views', '../views');

app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
)
app.use('/', router);
app.use('/api', apiRouter);

app.listen(PORT, ()=>{
    console.log(`Server listening on localhost:${PORT}`);
})
