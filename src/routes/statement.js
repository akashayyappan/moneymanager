import express from 'express';
import readExcelFile from '../excel/excel.js';
import Statement from '../db/models/statement.js';
import Response from '../model/response.js';

const statementRouter = express.Router();

statementRouter.post('/', async (req, res) => {
  try {
    const [totalCount, insertedCount] = await readExcelFile(req.files.file.data, req.user);
    res.status(200).send(`${insertedCount} of ${totalCount} statements has been inserted`);
  } catch (err) {
    res.status(500).send(err);
  }
});

statementRouter.get('/', async (req, res) => {
  try {
    const { _id } = req.user;
    const statements = await Statement.find({ createdBy: _id });
    res.status(200).send(Response('Statement retrieved', statements));
  } catch (err) {
    res.status(500).send(err);
  }
})

export default statementRouter;
