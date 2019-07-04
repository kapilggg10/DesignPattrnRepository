
// to communicate with internal classes
class Communicate{
    //doIt method of tipProcess will be called
    // we have two tipProcess 1. Validation and 2.Calculation
    doProcess(tipProcess){
        return tipProcess.doIt();
    }
}
// It will set all necessary values
class TipProcess{
    constructor(options){
        this.serviceQual = options.serviceQual;
        this.numOfPeople = options.numOfPeople;
        this.billAmt = options.billAmt;
    }
}

// Validation is a TipProcess
//strategy 1.
class Validation extends TipProcess{
    constructor(options){
        super(options);
    }
    doIt(){
        if (this.billAmt === "" || this.serviceQual == 0) {
            // alert("Please enter values");
            return false;
          }
          //Check to see if this input is empty or less than or equal to 1
          if (this.numOfPeople === "" || this.numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
            return true;
          }
          else {
            document.getElementById("each").style.display = "block";
            return true;
          }
    }
}

// Calculation is a TipProcess and will call TipProcess to set all values
//strategy 2
class Calculation extends TipProcess{
    constructor(options){
        super(options);
    }
    doIt(){
        var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}
  

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";
  
//get values in the form with ID
document.getElementById("calculate").onclick = function() {
    // get input values by ID and store in Options
    const options = {billAmt : document.getElementById("billamt").value,
        serviceQual: document.getElementById("serviceQual").value,
        numOfPeople: document.getElementById("peopleamt").value
    };

    var calculateTip = new Communicate(options);
    // now If values are passed by Validation function then do further process
    if(calculateTip.doProcess(new Validation(options))){
        var total = calculateTip.doProcess(new Calculation(options));
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = total;
    }
    else{
        alert("Please enter values");
    }
};
