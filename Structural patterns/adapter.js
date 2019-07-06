// New calculator is added a function to validate our data
// and it do calculation and validation after setting data;
class NewTipCalculator{
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
        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

//old tip calculator was just calculating tip, by using input data in the constructor//
class oldTipCalculator{
    constructor(billAmt,serviceQual,numOfPeople){
        let total = (billAmt * serviceQual) / numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        this.total = total.toFixed(2);
    }
}

class AdapterTipCalculator{
    // It will be called just like oldTipCalculator but will validate data using newTipCalculator
    constructor(billAmt,serviceQual,numOfPeople){
        const newTipCalc = new NewTipCalculator(billAmt,serviceQual,numOfPeople);
        newTipCalc.validation();
        this.total = newTipCalc.calculation();
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

document.getElementById("calculate").onclick = function() {
    const billAmt = document.getElementById("billamt").value;
    const serviceQual = document.getElementById("serviceQual").value;
    const numOfPeople = document.getElementById("peopleamt").value;

    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    const adapter = new AdapterTipCalculator(billAmt,serviceQual,numOfPeople);
    document.getElementById("tip").innerHTML = adapter.total;
};