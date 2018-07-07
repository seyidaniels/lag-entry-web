export class Validation {
     validate(value: object) {
       const data = Object.values(value);
       for (let i = 0; i < data.length; i++) {
        if (data[i] === null || data[i] === '') {
            return false;
        }
       }
       return true;
    }
    clearErrors(...values: any[]) {
        for (let i = 0 ; i < values.length; i++) {
            values[i] = undefined;
        }
        // values.forEach( function (e) {
        //     e = undefined;
        //     console.log(e);
        // });
      }
      sum(...numbers: number[]) {
        let aggregateNumber = 0;
        for (let i = 0; i < numbers.length; i++){
            aggregateNumber += numbers[i];
        }
        return aggregateNumber;
    }
}
