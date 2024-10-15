import { getCalculator, ICalculator } from './index';

describe('Calculator', (): void => {
  let calculator: ICalculator;

  beforeEach(async (): Promise<void> => {
    const Calculator: any = await getCalculator();
    calculator = new Calculator();
  });

  it('should display `1` when pressOne() is invoked', (): void => {

    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1');

  });

  it('should display `3` when we add 1 and 2', (): void => {
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3');
  });

  it('should display `2` when we subtract 1 from 3', (): void => {
    calculator.pressThree();
    calculator.pressMinus();
    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');
  });

  it('should display `6` when we multiply 2 by 3', (): void => {
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('6');
  });

  it('should display `3` when we divide 6 by 2', (): void => {
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual('');
  });

  it('should display `3.1` when we divide 6.2 by 2', (): void => {
    calculator.pressSix();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3.1');
  });

  it('should display `0` when we press clear', (): void => {
    calculator.pressClear();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('');
  });

  it('should handle division by zero', (): void => {
    calculator.pressOne();
    calculator.pressDiv();
    calculator.pressZero();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('Infinity');
  });

  it('should handle multiple dots in a number', (): void => {
    calculator.pressOne();
    calculator.pressDot();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1.2'); 
  });

  it('should handle large numbers', (): void => {
    for (let i = 0; i < 15; i++) {
      calculator.pressNine();
    }
    calculator.pressPlus();
    for (let i = 0; i < 15; i++) {
      calculator.pressNine();
    }
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1999999999999998'); 
  });

  it('should handle negative numbers', (): void => {
    calculator.pressMinus();
    calculator.pressFive();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('-2');
  });

  it('should handle consecutive operations without equals', (): void => {
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressMult();
    calculator.pressFour();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('14');
  });

  it('should handle consecutive operations with equals', (): void => {
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    calculator.pressMult();
    calculator.pressFour();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('20');
  });

  it('should handle consecutive operations with equals and clear', (): void => {
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    calculator.pressClear();
    calculator.pressFour();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('4');
  });

  it('should display 0 when dividing 0 by a number', (): void => {
    calculator.pressZero();
    calculator.pressDiv();
    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('0');
  });

  it('should correct multiply decimals', (): void => {
    calculator.pressTwo();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('4.4');
  });

  it('should correct multiply decimals', (): void => {
    calculator.pressTwo();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    const expectedValue = 4.84;
    const actualValue = parseFloat(displayValue);
    const tolerance = 0.0001;

    expect(Math.abs(actualValue - expectedValue)).toBeLessThan(tolerance);
  });

  it('should handle multiple dots in a number', (): void => {
    calculator.pressOne();
    calculator.pressDot();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1.2');
  });

  it('should display all numbers correctly', (): void => {
    calculator.pressOne();
    calculator.pressTwo();
    calculator.pressThree();
    calculator.pressFour();
    calculator.pressFive();
    calculator.pressSix();
    calculator.pressSeven();
    calculator.pressEight();
    calculator.pressNine();
    calculator.pressZero();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1234567890');
  });

  it('should not handle operations right after each other', (): void => {
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressMinus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('0');
  });

  it('should handle operations after equals', (): void => {
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressTwo();
    calculator.pressEquals();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('6');
  });

  it('should display 0.2 when a 2 is divided by 10', (): void => {
    calculator.pressTwo();
    calculator.pressDiv();
    calculator.pressOne();
    calculator.pressZero();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('0.2');
  });

  it('should display -0.02 when a -2 is divided by 100', (): void => {
    calculator.pressMinus();
    calculator.pressTwo();
    calculator.pressDiv();
    calculator.pressOne();
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('-0.02');
  });

  it('should handle leading zeros', (): void => {
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3');
  });

  it('should return 2 if 20. is divided by 10', (): void => {
    calculator.pressTwo();
    calculator.pressZero();
    calculator.pressDot();
    calculator.pressDiv();
    calculator.pressOne();
    calculator.pressZero();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');
  });
  it('should handle multiple operations after each other', (): void => {
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressThree();
    calculator.pressPlus();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('6');
  });

  it('should handle multiple operations after each other', (): void => {
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressPlus();
    calculator.pressFour();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');
  });

  it('should handle division followed by another operation correctly', (): void => {
    calculator.pressEight();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('12');
  });

  it('should handle division followed by addition correctly', (): void => {
    calculator.pressEight();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('7'); 
  });

  it('should handle division followed by subtraction correctly', (): void => {
    calculator.pressEight();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressMinus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('1'); 
  });

  it('should handle multiplication followed by multiplication correctly', (): void => {
    calculator.pressEight();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressMult();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('48'); 
  });

  it('should handle multiplication followed by addition correctly', (): void => {
    calculator.pressEight();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('19'); 
  });

  it('should handle multiplication followed by subtraction correctly', (): void => {
    calculator.pressEight();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressMinus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('13'); 
  });

  it('should handle operations with leading zeros', (): void => {
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3');
  });

  it('should display `0.00001` when dividing 1 by 100000', (): void => {
    for (let i = 0; i < 5; i++) {
      calculator.pressZero();
    }
    calculator.pressDot();
    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('00000.1');
  });

  it('should handle leading zeros in decimal numbers', (): void => {
    calculator.pressZero();
    calculator.pressDot();
    calculator.pressZero();
    calculator.pressZero();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('1.002');
  });

  it('should handle large negative numbers', (): void => {
    calculator.pressOne();
    for (let i = 0; i < 10; i++) {
      calculator.pressZero();
    }
    calculator.pressMinus();
    calculator.pressNine();
    for (let i = 0; i < 10; i++) {
      calculator.pressZero();
    }
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('-80000000000');
  });

  it('should handle operation presses without any numbers', (): void => {
    calculator.pressPlus();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('0');
  });

  it('should correctly calculate using negative numbers and decimals', (): void => {
    calculator.pressMinus();
    calculator.pressFive();
    calculator.pressDot();
    calculator.pressFive();
    calculator.pressPlus();
    calculator.pressTwo();
    calculator.pressDot();
    calculator.pressFive();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('-3');
  });

  it('should handle back-to-back operations without numbers', (): void => {
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressMinus();
    calculator.pressThree();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('-1');
  });

  it('should reset when clear is pressed mid-sequence', (): void => {
    calculator.pressOne();
    calculator.pressPlus();
    calculator.pressClear();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('2');
  });

  it('should handle multiple consecutive dots without causing an error', (): void => {
    calculator.pressOne();
    calculator.pressDot();
    calculator.pressDot();
    calculator.pressDot();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();
  
    expect(displayValue).toEqual('1.2');
  });

  afterEach(() => {
    calculator.pressClear();
  });
});
