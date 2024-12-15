import express from 'express';
import readExcelFile from '../excel/excel.js';

const statementRouter = express.Router();

statementRouter.post('/', async (req, res) => {
    try {
        const [totalCount, insertedCount] = await readExcelFile(req.files.file.data, req.user);
        res.status(200).send(`${insertedCount} of ${totalCount} statements has been inserted`);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default statementRouter;
