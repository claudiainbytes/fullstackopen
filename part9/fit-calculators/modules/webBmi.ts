interface BmiValues {
    weight: number;
    height: number;
    bmi: string;
  }
  
  const calcBmi = (weight: number, height: number): BmiValues => {

    const heightIMC: number = height / 100;
    
    const imc: number | string | undefined  = weight / (heightIMC * heightIMC);

    let message: string = ``;
  
    if (imc === Infinity) {
      message = `The height never would be 0.`;
    } else if (imc < 18.5) {
      message = `Your IMC is ${imc.toFixed(2)}. Low weight.`;
    } else if (imc >= 18.5 && imc < 24.9) {
      message = `Your IMC is ${imc.toFixed(2)}. Normal (healty weight).`;
    } else if (imc >= 25 && imc < 29.9) {
      message = `Your IMC is ${imc.toFixed(2)}. Overweight.`;
    } else if (imc >= 29.9) {
      message = `Your IMC is ${imc.toFixed(2)}. Obesity.`;
    } else if ( Number.isNaN(imc)) {
      message = `Your have to specify the height and/or weight.`;
    } else {
      message = ``
    }

    return {
      weight,
      height,
      bmi: message
    }

  }
  
  export { calcBmi };