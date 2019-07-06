class CalculateTip{
    constructor(data){//data is in array form
        // setValues using Iterator on the input data
        const setValues = new Iterator(data);
        this.billAmt= setValues.next().value;
        this.serviceQual = setValues.next().value;
        this.numOfPeople = setValues.next().value;
    }
    // Validation function for input data
    // Check for empty boxes and 0 value
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
    // Calculation over input data
    calculation(){
        this.validation();
        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

// Iterator class to iterate over data
class Iterator{
    constructor(data){
        this.data = data;
        this.index= 0;
    }
    // "next" function will iterate and increment index value
    next(){
        if(this.index < this.data.length){
            return {value: this.data[this.index++]};
        }
        else{
            this.index = 0;
            return {};
        }
    }
}
//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

document.getElementById("calculate").onclick = function() {
    const billAmt = document.getElementById("billamt").value;
    const serviceQual = document.getElementById("serviceQual").value;
    const numOfPeople = document.getElementById("peopleamt").value;
    //Create a new CalculateTip object
    var tip = new CalculateTip([billAmt,serviceQual,numOfPeople]);
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip.calculation();
  };