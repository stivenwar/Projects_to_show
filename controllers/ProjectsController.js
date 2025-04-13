import path from "path";
import {__dirname} from "../config.js";
import * as dns from "dns";
// Almacén temporal
let urlDatabase = [];
let idCounter = 1;

export class ProjectsController{
    static indexProjects(req, res){
        res.sendFile(path.join(__dirname,'views/frondEndAngular', 'index.html'));
    }
    static showProjects(req,res){
        res.sendFile(path.join(__dirname,'views', 'index.html'))
    }
    static timestampFunction(req, res){
        console.log('paso por aqui')
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
    static requestHeaderParseMicroservice(req, res){
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const language = req.headers['accept-language'];
        const software = req.headers['user-agent'];
        res.json({ipaddress:ip, language:language,software:software})
    }


    static PostUrlShortenerMicroservice(req,res){
        const original_url = req.body.url;
        console.log(original_url)
        try {
            const urlObj = new URL(original_url);

            // Verificar dominio con DNS
            dns.lookup(urlObj.hostname, (err) => {
                if (err) {
                    return res.json({ error: 'invalid url' });
                }

                // Guardar y devolver short_url
                let short_url = idCounter++;
                urlDatabase.push({ original_url, short_url });
                res.json({ original_url:original_url, short_url:short_url });
            });

        } catch (err) {
            res.json({ error: 'invalid url' });
        }
    }
    static GetUrlShortenerMicroservice(req,res){
        const short_url = parseInt(req.params.short_url);
        console.log(short_url)


        const found = urlDatabase.find(entry => entry.short_url === short_url);
        console.log(found)
        if (found) {
            res.redirect(found.original_url);
        } else {
            res.status(404).json({ error: 'No short URL found for the given input' });
        }
    }

}