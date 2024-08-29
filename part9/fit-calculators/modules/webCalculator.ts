/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const isNotArrayOfNumbers = ( objVar: any ): boolean => {

    let countNaN: number = 0;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    objVar.map((v: any) => isNaN(v) ? countNaN++ : countNaN );

    return countNaN > 0 ? true : false;
    
};

const getTotalHours = (hoursPerDay: number[] ): number => {

    const initialValue: number = 0;
  
    return hoursPerDay.reduce(
      (accumulator: number, currentValue: number): number => accumulator + currentValue,
      initialValue,
    );
  
};

const getTrainingDays = (hoursPerDay: number[] ): number[] => {
return hoursPerDay.filter((item: number) => item > 0);
};

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
      };

    return result; 
};

export { isNotArrayOfNumbers, calculateExercises };