interface IMCValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): IMCValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

type Message = string

const calculateBmi = (heightCm: number, weightKg: number, details: string): Message => {
    
    const height = heightCm / 100;
    
    const imc: number | string | undefined  = weightKg / (height * height);
  
    if (imc === Infinity) {
      return `${details}  The height never would be 0.`;
    } else if (imc < 18.5) {
        return `${details} Your IMC is ${imc.toFixed(2)}. Low weight.`;
    } else if (imc >= 18.5 && imc < 24.9) {
        return `${details} Your IMC is ${imc.toFixed(2)}. Normal (healty weight).`;
    } else if (imc >= 25 && imc < 29.9) {
        return `${details} Your IMC is ${imc.toFixed(2)}. Overweight.`;
    } else if (imc >= 29.9) {
        return `${details} Your IMC is ${imc.toFixed(2)}. Obesity.`;
    } else if ( Number.isNaN(imc)) {
      return `${details} Your have to specify the height and/or weight.`;
    } 
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight, `Given ${height}cms and ${weight}kgs, the result is:`));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

