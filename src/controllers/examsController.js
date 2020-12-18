const examSchema = require('../schemas/examSchema');
const { insertExam, 
    findExamsBySubject,
    findExamsByProfessor 
} = require('../repositories/examRepository');

async function sendExam(req, res) {
    const examParams = req.body;

    const { error } = examSchema.validExam.validate(examParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const response = await insertExam(examParams);
    if(response.error) res.send(response).sendStatus(500);

    res.sendStatus(201);
}

async function getExamsBySubject(req, res) {
    const subject = req.params.subjectName;
    
    const response = await findExamsBySubject(subject);
    if(response.error) res.send(response).sendStatus(500);

    res.send(response.rows);
}

async function getExamsByProfessor(req, res) {
     const response = await findExamsByProfessor(req.params.id);
     if(response.error) res.send(response).sendStatus(500);

     res.send(response.rows);
}

module.exports = {
    sendExam,
    getExamsBySubject,
    getExamsByProfessor
};