//class creation for calculateTip
class CalculateTip {
    //constructor will set values of this instance and check whether instance exist or not
    //if exist an instance and arguements are same than it will return that instance
    //otherwise create a new instance and return that;
    constructor(options){
        if(CalculateTip.exist){
            if(CalculateTip.instance.numOfPeople === options.numOfPeople &&
                CalculateTip.instance.billAmt === options.billAmt&&
                CalculateTip.instance.serviceQual===options.serviceQual)
            return CalculateTip.instance;
        }
        //set values
        this.numOfPeople = options.numOfPeople;
        this.serviceQual = options.serviceQual;
        this.billAmt= options.billAmt;
        // set instance of this class to new object
        CalculateTip.instance = this;
        //now an instance of this class exist
        CalculateTip.exist = true;
        //
        CalculateTip.option = options;
        return this;
    }
    //function to validate input data;
    validationFunction(){
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
    // function to calculate total tip per person
    calculateTotal(){
            this.validationFunction();
            var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
            //round to two decimal places
            total = Math.round(total * 100) / 100;
            //next line allows us to always have two digits after decimal point
            return total.toFixed(2);
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";   

//click to call function
document.getElementById("calculate").onclick = function()
{
    //get values from the form using Id
    billAmt = document.getElementById("billamt").value;
    serviceQual = document.getElementById("serviceQual").value;
    numOfPeople = document.getElementById("peopleamt").value;

    //create a new instance of Class CalculateTip
    var calculateTip = new CalculateTip({billAmt,serviceQual,numOfPeople});

    // Create another instance of Class CalculateTip
    var calculateTip1 = new CalculateTip({billAmt:"200",serviceQual,numOfPeople});
    //If arguements of both instance will be same than will print True otherwise false
    console.log(calculateTip===calculateTip1);
    var total = calculateTip.calculateTotal();
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
};