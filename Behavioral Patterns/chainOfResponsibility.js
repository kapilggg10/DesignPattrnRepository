class CalculateTip{
    constructor(){
        this.total = 0;
    }
    setter(arguements){
        [this.billAmt,this.serviceQual,this.numOfPeople] = arguements;
        return true;
    }
    getter(){
        return this.total;
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
        return true;
    }
    calculation(){
        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

class Invoker{
    constructor(object,arguements){
        this.commandQueue = [];
        this.object = object;
        this.arguements = arguements;
        this.result;
    }
    do(command){
        this.result = this.object[command](this.arguements);
        if(this.result)
            return this;
        else
            return;
    }
}

 //Hide the tip amount on load
 document.getElementById("totalTip").style.display = "none";
 document.getElementById("each").style.display = "none";

 //click to call function
 document.getElementById("calculate").onclick = function() {
    // Input values
    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    const tip = new CalculateTip();
    let invoker = new Invoker(tip,[billAmt,serviceQual,numOfPeople]);
    const total = invoker.do("setter").do("validation").do("calculation").result;
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
};