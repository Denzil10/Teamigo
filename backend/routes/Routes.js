const express = require('express');
// const exampleController = require('../controllers/Controller');

const router = express.Router();

// router.get("/", (req, res) => {
//     res.json(users)
// })


router.get('/blog/fetch', (req, res) => {
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


router.get('/team/fetch', (req, res) => {
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
        con.query("SELECT * FROM team", function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    })

})



router.get('/invite/fetch', (req, res) => {
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
        con.query("SELECT * FROM invite", function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    })

})

router.post('/blog/post', (req, res) => {
    // update data 
    let data = req.body
    console.log("added 1 post " + data.type)
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

router.post("/team/add", (req, res) => {
    // update data 
    let data = req.body
    console.log("added team for post ")
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "team"
    });
    con.connect(function (err) {
        if (err) throw err;

        if (data.team.length > 0) {
            con.query(`insert into team(members, leader, event) values('${data.team}', '${data.leader}', '${data.event}')`, function (err, result, fields) {
                if (err) throw err;
            });
            con.query(`
            UPDATE post
            JOIN team ON post.name = '${data.leader}' AND post.event = '${data.event}' AND team.leader = '${data.leader}' AND team.event = '${data.event}'
            SET post.team_id = team.id;
`, function (err, result, fields) {
                if (err) throw err;
            });
        }
        else {
            con.query(`insert into post(team_id) NULL;`, function (err, result, fields) {
                if (err) throw err;
            });

        }



    })
    res.send(data)
})



module.exports = router;

// con.query(`
// update post
// set post.team_id = (SELECT id where post.name == team.name and post.event== name.event)
// where post.name == team.name and post.event== name.event;`, function (err, result, fields) {
//     if (err) throw err;
// });