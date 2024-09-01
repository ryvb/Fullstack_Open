import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './calculateExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/:height/:weight', (req, res) => {
    if (!isNaN(Number(req.params.height)) && !isNaN(Number(req.params.weight))) {
        res.send(calculateBmi(Number(req.params.height), Number(req.params.weight)));
    } else {
        res.send({ error: 'malformatted parameters'});
    }
    
});

app.post('/exercises', async (req, res) => {
    const body = req.body;
    const result = calculateExercises(body.daily_exercises, body.target);
    res.send(result);
    
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})