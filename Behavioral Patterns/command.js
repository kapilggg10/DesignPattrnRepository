class CalculateTip{
    constructor(){
        this.total = 0;
    }
    setter(arguements){
        [this.billAmt,this.serviceQual,this.numOfPeople] = arguements;
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
    }
    calculation(){
        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        this.total = total.toFixed(2);
    }
}

class Invoker{
    constructor(object,arguements){
        this.commandQueue = [];
        this.object = object;
        this.arguements = arguements;
    }
    add(command){
        this.commandQueue.push(command);
        return this;
    }
    invoke(){
        this.commandQueue.forEach(command => this.object[command](this.arguements));
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
    invoker.add("setter").add("validation").add("calculation");
    invoker.invoke();

    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip.total;
};