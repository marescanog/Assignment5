const courses = require("../data/courses.json");
const students = require("../data/students.json");

class Data {
    students;
    courses;
    
    constructor(students, courses){
        this.students = students;
        this.courses = courses;
    }
    
}

var dataCollection = null;

function initialize () {
    return new Promise((res, rej)=>{
        dataCollection = new Data(students, courses);
        if(dataCollection != null){
            res("Operation was a success");
        } else {
            rej("Initialization is NOT a success");
        }
    });
}

function getAllStudents () {
    return new Promise((res2, rej2)=>{
        if(dataCollection?.students == null || dataCollection?.students.length == 0){
            rej2("no results returned");
        } else {
            res2(dataCollection.students);
        }
    });
}

function getTAs () {
    return new Promise((res3, rej3)=>{
        if(dataCollection?.students == null || dataCollection?.students.length == 0){
            rej3("no results returned A");
        } else {
            const filteredArr = dataCollection.students.filter(student => student.TA);
            
            if(filteredArr == null || filteredArr == 0){
                rej3("no results returned B");
            } else {
                res3(filteredArr);
            }
        }
    });
}

function getCourses () {
    return new Promise((res4, rej4)=>{
        if(dataCollection?.courses == null || dataCollection?.courses.length == 0){
            rej4("no results returned");
        } else {
            res4(dataCollection.courses);
        }
    });
}

function getStudentsByCourse (course) {
    return new Promise((res5, rej5)=>{
        if(course == null || course == "" || dataCollection?.students == null || dataCollection?.students.length == 0){
            rej5("no results returned");
        } else {
            const filteredCoursesArr = dataCollection.students.filter(student => student.course == course);
            
            if(filteredCoursesArr == null || filteredCoursesArr == 0){
                rej5("no results returned");
            } else {
                res5(filteredCoursesArr);
            }
        }
    });
}

function getStudentsByNum (num) {
    return new Promise((res6, rej6)=>{
        if(dataCollection?.students == null || dataCollection?.students.length == 0){
            rej6("no results returned");
        } else {
         
            const filteredStudentsArrByNum = dataCollection.students.filter(student => student.studentNum == num);

            if(filteredStudentsArrByNum.length == 0){
                rej6("no results returned");
            } else {
                res6(filteredStudentsArrByNum[0]);
            }
        }
    });
}

function addStudent (studentData) {
    // function must return a promise
    return new Promise((res7, rej7)=>{
        try{
            let studentObj = {
                "studentNum": dataCollection.students?.length + 1,
                "firstName": studentData?.firstName,
                "lastName": studentData?.lastName,
                "email": studentData?.email,
                "addressStreet": studentData?.addressStreet,
                "addressCity": studentData?.addressCity,
                "addressProvince": studentData?.addressProvince,
                "TA": studentData?.TA ? studentData.TA : false, // Default is false when null or undefined
                "status": studentData?.status ? studentData.status : "Full Time", // Default is Full Time when null or undefined
                "course": studentData?.course
            }
            dataCollection.students.push(studentObj);
            res7();
        } catch(err) {
            rej7(err);
        }
    });
}

module.exports = {initialize, getAllStudents, getTAs, getCourses, getStudentsByCourse, getStudentsByNum, addStudent};
