const connection = require('../database');

function insertExam(examParams) {
    const data = [examParams.link, examParams.examType, examParams.subjectId];

    try {
        return connection.query('INSERT INTO exams (link, "examType", "subjectId") VALUES ($1, $2, $3)', data);
    } catch (e) {
        return e;
    }
}
async function findExamsBySubject(subject) {
    try {
        return connection.query(`SELECT * FROM subjects
        JOIN exams ON exams."subjectId" = subjects.id
        WHERE subjects.name = $1
        ORDER BY "examType"`, [subject]);
    } catch (e) {
        return e;
    }
}
async function findExamsByProfessor(id) {
    try {
        return await connection.query(`SELECT * FROM professors
        JOIN professor_subject ON professor_subject."professorId" = professors.id
        JOIN subjects ON subjects.id = professor_subject."subjectId"

        JOIN exams AS e ON e."subjectId" = professor_subject."subjectId"

        WHERE professors.id = $1`, [id]);
    } catch (e) {
        return e;
    }
}
module.exports = {
    insertExam,
    findExamsBySubject,
    findExamsByProfessor
}