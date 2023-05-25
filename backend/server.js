const express = require('express')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser');
const { json } = require('body-parser');


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.get("/", (req, res) => {
    res.json(users)
})


app.get('/blog/fetch', (req, res) => {
    // fetch data 
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "team"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM post", function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    })

})

app.post("/blog/post", (req, res) => {
    // update data 
    let data = req.body
    console.log("added 1 post" + data.type)
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "team"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`insert into post(event, name, msg, type) values('${data.event}', '${data.name}', '${data.msg}', '${data.type}')`, function (err, result, fields) {
            if (err) throw err;
        });

    })
    res.send(data)
})

app.listen(5000, () => {
    console.log("server started on port 5000")
})
