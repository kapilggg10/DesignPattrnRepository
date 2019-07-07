//I copied mvp code here.
// I am not seeing any difference bw these two for a single view in page
class ViewModel{
    constructor(model){ // model and view to control for this controller.
        this.model = model;
    }
    //It will set latest data in the model and then perform calculation accordingly
    // and display data in the view 
    processInputData(data){
        this.model.setData(data);
        return this.model.calculation();
    }
}

// This class is created to give the details of required data and notify
// model object about changes using latestData method.
// Actually view is HTML but just to provide updates in js Created a new class
class View{
    constructor(presenter){
        //hide the tip amount on load 
        document.getElementById("totalTip").style.display = "none";
        document.getElementById("each").style.display = "none";
        this.data= this.latestData();
        this.presenter = presenter;
    }
    // this will return the data in the UI at present time
    latestData(){
        return {billAmt:document.getElementById("billamt").value,
        numOfPeople : document.getElementById("peopleamt").value,
        serviceQual : document.getElementById("serviceQual").value}
    }
    // In mvp user will interact with view and view further connect with presenter
    updateView(){
        const total = this.presenter.processInputData(this.latestData());
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = total;
    }
}
// It maintains data and calculation
class Model{
    constructor(){ // Initially we don't know about values in the view
        this.data = {billAmt : undefined,
        numOfPeople : undefined,
        serviceQual : undefined}
    }
    setData(data){
        this.data = data;
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

let view = new View(new ViewModel(new Model));
document.getElementById("calculate").onclick = function(){
    //here we are interacting with controller and then controller will do its work
    view.updateView();
}