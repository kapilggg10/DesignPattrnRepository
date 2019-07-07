//basic Tip calculator class
class CalculateTip{
    constructor(billAmt,serviceQual,numOfPeople){
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }
    validation(){
        if (this.billAmt === "" || this.serviceQual == 0) {
            alert("Please enter values");
            return;
        }
        //Check to see if this input is empty or less than or equal to 1
        if (this.numOfPeople === "" || this.numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }
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

// Decorators will be used at run time to wrap around our object
// Rupees wrapper will convert tip into rupees and display Rs. symbol with
// tip in Rupees
function rupeesWrapper(tip){
    const total = tip.calculation();
    document.getElementById("totalTip").style.display = "block";
    // It will show that tip in Rupees
    document.getElementById("tip").innerHTML = total * 70;
    document.getElementById("currency").innerHTML = '&#8377';
}

//// Euro wrapper will convert tip into Euro and display Euro symbol with
// tip in Euro
function euroWrapper(tip){
    const total = tip.calculation();
    document.getElementById("totalTip").style.display = "block";
    // It will show that tip in Euro
    document.getElementById("tip").innerHTML = total* 0.89;
    document.getElementById("currency").innerHTML = '\u20AC';
}

//default wrapper or display method added on run time
function dollarWrapper(tip){
    const total = tip.calculation();
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}
//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

document.getElementById("calculate").onclick = function() {
    const billAmt = document.getElementById("billamt").value;
    const serviceQual = document.getElementById("serviceQual").value;
    const numOfPeople = document.getElementById("peopleamt").value;
    let tipTotal = new CalculateTip(billAmt,serviceQual,numOfPeople);
    //Display the tip
    rupeesWrapper(tipTotal);
  };