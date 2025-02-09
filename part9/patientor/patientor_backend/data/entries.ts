import { PatientEntry } from "../src/types";

const data = [ 
    {
        "id": 1,
        "date": "2017-01-01",
        "gender": "male",
        "name": "Bob",
        "occupation": "President",
        "ssn": 158245
    },
    {
        "id": 2,
        "date": "1955-12-05",
        "gender": "female",
        "name": "Paul",
        "occupation": "Plumber",
        "ssn": 968715
    },
    {
        "id": 3,
        "date": "1995-04-06",
        "gender": "other",
        "name": "Melissa",
        "occupation": "Taxi driver",
        "ssn": 542548
    }
];

const patientEntries: PatientEntry [] = data.map(obj => {
    const object = toNewPatient(obj) as PatientEntry;
    object.id = obj.id;
    return object;
})

export default patientEntries;