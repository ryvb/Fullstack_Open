interface bmiInputValues {
    value1: number,
    value2: number,
}

interface bmiOutput {
    weight: number,
    height: Number,
    bmi: String
}

const parseBmi = (args: String[]): bmiInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): bmiOutput => {
    const bmi = (weight / ((height/100)**2));
    let bmiText = ""
    if (bmi < 16) {
        bmiText = 'Underweight (Severe thinness)'
    } else if (bmi >= 16 && bmi < 17) {
        bmiText = 'Underweight (moderate thinness)'
    } else if (bmi >= 17 && bmi < 18.5) {
        bmiText = 'Underweight (Mild thinness)'
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiText = 'Normal range'
    } else if (bmi >= 25 && bmi < 30) {
        bmiText = 'Overweight (Pre-obese)'
    } else if (bmi >= 30 && bmi < 35) {
        bmiText = 'Overweight (Pre-obese)'
    } else if (bmi >= 35 && bmi < 40) {
        bmiText = 'Overweight (Pre-obese)'
    }  else {
        bmiText = 'Obese (Class III)'
    }

    return {
        weight: weight,
        height: height,
        bmi: bmiText
    }
}

try {
    const { value1, value2 } = parseBmi(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}

export default calculateBmi