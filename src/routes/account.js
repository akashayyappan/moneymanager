import express from 'express';

const accountRouter = express.Router();

accountRouter.get('/', (req, res) => {
    res.status(200).send('ok');
});

export default accountRouter;