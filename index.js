const express = require('express');
const app = express();
const path = require('path')

const cors = require('cors');
app.use(cors())


app.use(express.static(path.join(__dirname, 'public'),{
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/:date_string", function (req, res) {
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
});
app.get("/api/", (req, res) => {
    let resDate = new Date();
    res.json({ unix: resDate.getTime(), utc: resDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});