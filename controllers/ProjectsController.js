import path from "path";
import {__dirname} from "../config.js";


export class ProjectsController{
    static indexProjects(req, res){
        res.sendFile(path.join(__dirname,'views/frondEndAngular', 'index.html'));
    }
    static showProjects(req,res){
        res.sendFile(path.join(__dirname,'views', 'index.html'))
    }
    static timestampFunction(req, res){
        const rexd = new RegExp("^\\d{4}-([1-9]|1[0-2])-([1-9]|[12]\\d|3[01])$");
        const rexu = new RegExp("^\\d{13}$");

        const dateString = req.params.date_string;
        if (rexu.test(dateString)){
            const dateParse = parseInt(dateString);
            res.json({ unix: dateParse, utc: new Date(dateParse).toUTCString() });
        }else {
            let utc = '';
            let unix = '';

            let date = new Date(dateString);
            if (date.toString()=== "Invalid Date") {
                res.json({error:"Invalid Date"});
            }else {
                res.json({ unix: date.valueOf(), utc: date.toUTCString() });
            }
        }
    }
    static timestampEmpty(req,res){
        let resDate = new Date();
        res.json({ unix: resDate.getTime(), utc: resDate.toUTCString() });
    }

}