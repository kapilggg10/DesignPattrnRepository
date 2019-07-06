class Mediator{
    doit(objectType,...parameters){
        switch(objectType){
            case "validate" : var auth = new Validation();
            return auth.doit(...parameters);
            break;
            case "calculate" : var total = new Calculation();
            return total.doit(...parameters);
            break;
        }
    }
}

// A separate class to validate data input
class Validation{
    // To validate input values
    doit(billAmt,serviceQual,numOfPeople){
        if (billAmt === "" || serviceQual == 0) {
            // alert("Please enter values");
            return false;
          }
          //Check to see if this input is empty or less than or equal to 1
          if (numOfPeople === "" || numOfPeople <= 1) {
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

// A separate class for calculation over input data
class Calculation{
    // It will calculate total tip for each person
    doit(billAmt,serviceQual,numOfPeople){
        var mediator= new Mediator();
        if(mediator.doit("validate",billAmt,serviceQual,numOfPeople) === false){
            alert("enter valid data");
            return;
        }
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
    const mediator = new Mediator();
    var total = mediator.doit("calculate",billAmt,serviceQual,numOfPeople);
    
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}