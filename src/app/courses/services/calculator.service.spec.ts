import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service";

describe('CalculatorService', ()=>{

    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(()=>{
        console.log('Calling beforeEach')

        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"])

        calculator = new CalculatorService(loggerSpy);

    })

    it('should add two numbers', ()=>{
        console.log('add test')

        const result = calculator.add(2,2)

        expect(result).toBe(4, "unexpected addition result")

        expect(loggerSpy.log).toHaveBeenCalledTimes(1)
    })

    it('should subtract two numbers', ()=>{
        console.log('subtract test')

        const result = calculator.subtract(2,2)

        expect(result).toBe(0, "unexpected subtraction result")

        expect(loggerSpy.log).toHaveBeenCalledTimes(1)
    })
})