/********************************************************************************
* WEB700 – Assignment 05
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Marvie Maria E Gasataya Student     ID: 133055228     Date: Oct 29, 2023
*
* Online (Cyclic) Link: https://good-teal-coyote.cyclic.app
*
********************************************************************************/


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const exphbs = require("express-handlebars");
var path = require("path");
var collegeData = require("./modules/collegeData.js");
var app = express();

// Configure handlebars
app.engine('.hbs', exphbs.engine({
    extname:'.hbs'
}));
app.set('view engine', '.hbs');

// setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/students", (req, res) => {
    if(req.query.course){
        collegeData.getStudentsByCourse(req.query.course)
        .then((colDataRes)=>{
            res.send(colDataRes);
        })
        .catch((colDataErr)=>{
            res.send({message: colDataErr});
        });
    } else {
        collegeData.getAllStudents()
        .then((colDataRes)=>{
            res.send(colDataRes);
        })
        .catch((colDataErr)=>{
            res.send({message: colDataErr});
        });
    }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
    .then((colDataRes2)=>{
        res.send(colDataRes2);
    })
    .catch((colDataErr2)=>{
        res.send({message: colDataErr2});
    });
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
    .then((colDataRes)=>{
        res.send(colDataRes);
    })
    .catch((colDataErr)=>{
        res.send({message: colDataErr});
    });
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentsByNum(req.params.num)
    .then((colDataRes)=>{
        res.send(colDataRes);
    })
    .catch((colDataErr)=>{
        res.send({message: colDataErr});
    });
});

app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
    .then((colDataRes)=>{
        res.redirect("/students/");
    })
    .catch((colDataErr)=>{
        res.send({message: colDataErr});
    });
});

app.get("/", (req, res) => {
    res.render("home",{layout:"main"});
});

app.get("/about", (req, res) => {
    res.render("about",{layout:"main"});
});

app.get("/htmlDemo", (req, res) => {
    res.render("htmlDemo",{layout:"main"});
});

app.get("/students/add", (req, res) => {
    res.render("addStudent",{layout:"main"});
});

// No matching route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

collegeData.initialize()
.then((result)=>{
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on port: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})

