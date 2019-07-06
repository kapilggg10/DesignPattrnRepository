class CalculateTip{ // target
    constructor(billAmt,serviceQual,numOfPeople){
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }
    validation(){
        if (this.billAmt === "" || this.serviceQual == 0) {
            return false;
        }
        //Check to see if this input is empty or less than or equal to 1
        if (this.numOfPeople === "" || this.numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }
        return true;
    }
    calculation(){
        this.validation();
        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

// Object of class CalculateTip will get proxied by handler.
var handler = { // handler
    get: function(target,name){
        //if the method or property is present in the target class, return that
        if(name in target){
            return target[name];
        }
        else{ // else return target object.
            return target;
        }
    }
}


//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
    //input values
    const billAmt = document.getElementById("billamt").value;
    const serviceQual = document.getElementById("serviceQual").value;
    const numOfPeople = document.getElementById("peopleamt").value;

    //New object of CalculateTip and a new object of Proxy.
    var calculateTip = new CalculateTip(billAmt,serviceQual,numOfPeople);
    var p = new Proxy(calculateTip,handler);
    if(p.validation()){
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = p.calculation();
    }
    else{
        alert("Please enter values!");
    }
  };