import express from 'express';
import calculateBmi from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.get('/bmi/:height/:weight', (req, res) => {
    if (!isNaN(Number(req.params.height)) && !isNaN(Number(req.params.weight))) {
        res.send(calculateBmi(Number(req.params.height), Number(req.params.weight)));
    } else {
        res.send({ error: 'malformatted parameters'});
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})