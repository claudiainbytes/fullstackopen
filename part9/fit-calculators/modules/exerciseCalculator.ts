interface ExerciseCalculatorValues {
    target: number | undefined;
    hoursPerDay: number[] | undefined;
}

interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArgs = (args: string[]): ExerciseCalculatorValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    
    let [,, ...argValues] = args

    let countNaN: number = 0

    let newArgValues = argValues.map((v:string) => { if(isNaN(Number(v))) { countNaN++ } else { countNaN; return Number(v); }} )

    if(countNaN > 0) {
      throw new Error('Provided values were not a number!');
    } else {
      return {
        "target": newArgValues[0],
        "hoursPerDay": newArgValues.slice(1, newArgValues.length )
      }
    }

}

const getTotalHours = (hoursPerDay: number[] ): number => {

  const initialValue: number = 0;

  return hoursPerDay.reduce(
    (accumulator: number, currentValue: number): number => accumulator + currentValue,
    initialValue,
  );

}

const getTrainingDays = (hoursPerDay: number[] ): number[] => {
  return hoursPerDay.filter((item: number) => item > 0);
}

const calculateExercises = (target: number, hoursPerDay: number[] ): Result => {

    const totalHours: number = getTotalHours(hoursPerDay);
    const average: number = (totalHours > 0) ? totalHours/hoursPerDay.length : 0;
    const success: boolean = (target > average) ? false : true;

    const rate: number =  Math.ceil(( average / target ) * 100);

    let rating: number = 0;
    let ratingDescription: string = "";

    if( rate >= 0 && rate < 33 ){
      rating = 1;
      ratingDescription = "you didn't reach the goal";
    } else if( rate >= 33 && rate < 99 ){
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
      rating = 3;
      ratingDescription = "you nailed it!!";
    }

    const result: Result = { 
        periodLength: hoursPerDay.length,
        trainingDays: getTrainingDays(hoursPerDay).length,
        success,
        rating,
        ratingDescription,
        target,
        average
      }

    return result; 
}

try {
    const { target, hoursPerDay } = parseArgs(process.argv);
    console.log(calculateExercises(target, hoursPerDay));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateExercises };
