interface Result {
    periodLength: number;
    trainingDays: number;
    succes: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
}

interface inputValues {
    value1: number[];
    value2: number;
}

const parse = (args: string[]): inputValues => {  
    if (args.length < 12) throw new Error('Not enough arguments');
    if (args.length > 12) throw new Error('Too many arguments');

    const numbers = args.slice(3);
    const result = numbers.map(n => Number(n));

    if (!result.some(isNaN) && !isNaN(Number(args[2]))) {
        return {
            value1: result,
            value2: Number(args[2])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = periodLength - (exerciseHours.filter(x => x === 0).length);
    const average = exerciseHours.reduce((sum, currentValue) => sum + currentValue, 0) / periodLength;
    const success = average > target;

    let rating = 1;
    let ratingDescription = 'Not good at all';
    if (average > (target / 2) && average <= target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else if (average > target) {
        rating = 3
        ratingDescription = 'Very good';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        succes: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { value1, value2 } = parse(process.argv);
    console.log(calculateExercises(value1, value2))
} catch(error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message
    }
    console.log(errorMessage)
} 