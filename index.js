import express from 'express'
const app = express();
import path from 'path'
import {__dirname} from "./config.js"
import bodyParser from 'body-parser';
import dns from 'dns';
import { URL } from 'url';

import cors from 'cors'
import {routesProjects} from "./routes/routesProjects.js";
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.set('views',[__dirname, 'views'])

app.use(express.static(path.join(__dirname, 'public'),{
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}))


app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
app.use('/',routesProjects)
// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});