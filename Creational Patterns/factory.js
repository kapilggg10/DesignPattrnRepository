// Factory class will create validation object and  calculation object
// depanding on the arguement objectType
class Factory{
    constructor(objectType){
        switch(objectType){
            case "validate" : return new Validation();
            break;
            case "calculate" : return new Calculation();
            break;
        }
    }
}

// A separate class to validate data input
class Validation{
    // To validate input values
    doit(billAmt,serviceQual,numOfPeople){
        if (billAmt === "" || serviceQual == 0) {
            return false;
          }
          //Check to see if this input is empty or less than or equal to 1
          if (numOfPeople === "" || numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
          }
          else {
            document.getElementById("each").style.display = "block";
          }
          return true;
    }
}

// A separate class for calculation over input data
class Calculation{
    // It will calculate total tip for each person
    doit(billAmt,serviceQual,numOfPeople){
        var total = (billAmt * serviceQual) / numOfPeople;
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
    // get input Values by ID
    billAmt = document.getElementById("billamt").value;
    serviceQual=  document.getElementById("serviceQual").value;
    numOfPeople= document.getElementById("peopleamt").value;

    //create validate and calculate object using Factory
    const authorization = new Factory("validate");
    const calculate = new Factory("calculate");
    if(authorization.doit(billAmt,serviceQual,numOfPeople)){
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = calculate.doit(billAmt,serviceQual,numOfPeople);
    }
    else{
        alert("Enter valid values");
        return;
    }
}