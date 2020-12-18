const connection = require('../database');

async function findAllSubjects() {
    try {
        return connection.query('SELECT * FROM subjects ORDER BY period');
    } catch (e) {
        return e;
    }
}

async function findProfessorFromSubject(subjectName) {
    try {
        return connection.query(`SELECT name FROM subjects
        JOIN professor_subject ON professor_subject."subjectId" = subjects.id
        JOIN professors ON professors."subjectId" = professor_subject."subjectId"
        WHERE s.name = $1`, [subjectName]);
    } catch (e) {
        return e;
    }
}

async function findAllProfessors() {
    try {
        return connection.query(`SELECT * FROM professors
        JOIN professors_exams ON professors_exams."professorId" = professors.id
        JOIN exams ON exams.id = professors_exams."examId"`);
    } catch (e) {
        return e;
    }
}

module.exports = { 
    findAllSubjects,
    findProfessorFromSubject,
    findAllProfessors
};