// It will set all necessary values
// TipProcess is subject/observable
class TipProcess{
    constructor(data){
        this.data = data;
        this.observerList = [];
    }
    subscribe(observer){
        this.observerList.push(observer);
    }
    unSubscribe(observer){
        this.observerList = this.observerList.filter(obs => observer!==obs);
    }
    // any change will be updated to all observers
    fireChanges(change){
        this.observerList.forEach(observer => observer.update(change));
    }
}

// It is an observer because it's values are depanding upon Values in TipProcess
class Validation{
    constructor(tipProcess){
        this.data = tipProcess.data;
    }
    update(change){
        this.data = change;
    }
    // To validate input values
    doIt(){
        if (this.data.billAmt === "" || this.data.serviceQual == 0) {
            // alert("Please enter values");
            return false;
          }
          //Check to see if this input is empty or less than or equal to 1
          if (this.data.numOfPeople === "" || this.data.numOfPeople <= 1) {
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

// It is an observer because it's values are depanding upon Values in TipProcess
class Calculation{
    constructor(data){
        this.data = data;
    }
    update(change){
        this.data = change;
    }
    // It will calculate total tip for each person
    doIt(){
        var total = (this.data.billAmt * this.data.serviceQual) / this.data.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";
  
// create objects of validation, Calculation and TipProcess
// Initially every value is set to 0;
const tipProcess = new TipProcess({billAmt:0,serviceQual:0,numOfPeople:0});

//Observers are depanding upon Value in subject
const validate = new Validation(tipProcess);
const calculate = new Calculation(tipProcess);

//Subscribe both observer to Subject
tipProcess.subscribe(validate);
tipProcess.subscribe(calculate);

//get values in the form with ID
document.getElementById("calculate").onclick = function() {
    // get input Values by ID
    const data = {billAmt : document.getElementById("billamt").value,
        serviceQual: document.getElementById("serviceQual").value,
        numOfPeople: document.getElementById("peopleamt").value
    };

    // Now change in value of subject
    tipProcess.fireChanges(data);

    //If input values are validated then perform further calculations
    if(validate.doIt()){
        const total = calculate.doIt();
        // get input values by ID and store in data
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = total;
    }
    else{
        alert("enter Valid values");
    }
}
