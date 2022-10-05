const express = require("express");
const app = express()
const PORT = 3000;

var users = [
    { "id": 0, "username": "JanNowak", "password": "jn", "time": getCurrentTime() },
    { "id": 1, "username": "a", "password": "a", "time": getCurrentTime() },
]

let currentId = users.length;

function getCurrentTime() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    if (seconds.toString().split("").length == 1) {
        seconds = "0" + seconds;
    }

    if (minutes.toString().split("").length == 1) {
        seconds = "0" + seconds;
    }

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

app.use(express.json());

app.post("/post", function (req, res) {
    res.send(req.body)
    users.push({ "id": currentId, "username": req.body.username, "password": req.body.password, "time": getCurrentTime() })
    currentId++;
})

app.post("/delete", function (req, res) {
    res.send(req.body)
    console.log(users)

    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.body.id) {
            users.splice(i, 1);
        }
    }

    console.log(users)
})

app.get("/users", function (req, res) {
    console.log(users)
    res.send(users)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
