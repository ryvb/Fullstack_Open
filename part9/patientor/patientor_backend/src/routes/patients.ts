import express from 'express';

const router = express.Router();

router.post('/', (req, _res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = req.body;
    console.log(newPatient);
});

export default router;
