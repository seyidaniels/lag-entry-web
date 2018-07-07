export class Helper {
    private user;
    constructor () {
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    successNotify (jquery, message) {
        jquery.notify({
            icon: 'fas fa-paw',
            message: message
          }, {
            type: 'success'
          });
    }
    calculateWaec() {
       const id = this.user['id'];
       // Get Waec Result
       const waec_result = JSON.parse(localStorage.getItem('waec_' + id));
       // Get Waec Object Values
       const waec  = Object.values(waec_result);
       // Convert to Number
       const result = waec.map(function (x) {
          return Number(x);
        });
        // Get sum of the waec esults
        const sum = result.reduce(( a , b) => a + b, 0);
        return sum.toFixed(2);
      }

      getJamb() {
        return Number(this.user['jambScore']);
      }

}
