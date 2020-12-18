require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

const subjectController = require('./controllers/subjectController');
const examsController = require('./controllers/examsController');

app.use(cors());
app.use(express.json());

app.get('/api/subjects', subjectController.getSubjects);
app.get('/api/professors', subjectController.getProfessors);

app.post('/api/exams', examsController.sendExam);
app.get('/api/exams/subject/:subjectName', examsController.getExamsBySubject);
app.get('/api/exams/professor/:id', examsController.getExamsByProfessor);

module.exports = app;