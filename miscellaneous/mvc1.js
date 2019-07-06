
// Controller class to control view and model just like mediator
class Controller{
    constructor(model,view){ // model and view to control for this controller.
        this.model = model;
        this.view = view;
    }
    getLatestData(){ // It will get the present data in view from view object
        return this.view.latestData();
    }
    //It will set latest data in the model and then perform calculation accordingly
    // and display data in the view 
    processInputData(){
        this.model.setData(this);
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = this.model.calculation();
    }
}

// This class is created to give the details of required data and notify
// model object about changes using latestData method.
// Actually view is HTML but just to provide updates in js Created a new class
class View{
    constructor(){
        //hide the tip amount on load 
        document.getElementById("totalTip").style.display = "none";
        document.getElementById("each").style.display = "none";
        this.latestData();
    }
    // this will return the data in the UI at present time
    latestData(){
        return {billAmt:document.getElementById("billamt").value,
        numOfPeople : document.getElementById("peopleamt").value,
        serviceQual : document.getElementById("serviceQual").value}
    }
}
// It maintains data and calculation
class Model{
    constructor(){ // Initially we don't know about values in the view
        this.data = {billAmt : undefined,
        numOfPeople : undefined,
        serviceQual : undefined}
    }
    setData(controller){ // get data of view using controller
        this.data = controller.getLatestData();
    }
    getData(){ //getter method
        return this.data;
    }
    calculation(){ //Calculation and validation of data
        if (this.data.billAmt === "" || this.data.serviceQual == 0) {
            alert("Please enter values");
            return;
        }
        //Check to see if this input is empty or less than or equal to 1
        if (this.data.numOfPeople === "" || this.data.numOfPeople <= 1) {
            this.data.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }
        let total = (this.data.billAmt * this.data.serviceQual) / this.data.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    }
}

// new controller
const controller = new Controller(new Model(),new View());
document.getElementById("calculate").onclick = function(){
    controller.processInputData();
}