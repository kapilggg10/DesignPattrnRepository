//prototype of CalculateTip
var CalculateTipProto = {
    // function to initialize values
    init: function(billAmt,serviceQual,numOfPeople){
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    },

    // function to validate input values
    validation : function(){
        //validate input
        if (this.billAmt === "" || this.serviceQual == 0) {
            alert("Please enter values");
            return;
        }
        // validation for number of people
        //Check to see if this input less than or equal to 1
        if (this.numOfPeople <= 1) {
            numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } 
        else {
            document.getElementById("each").style.display = "block";
        }
    },

    // function to calculate total tip
    tipCalculation : function(){
        this.validation();
        var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    },

    // function to display total tip according to input values
    tipDisplay : function(){
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = this.tipCalculation();
    }
}
  
//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function()
{
    //get values of HTML elements
    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    //Create a object from prototype of CalculateTip 
    // without using Object.create()
    function CalculateTip(){
        function F() {};
        F.prototype = CalculateTipProto;
        var f = new F();
        f.init(billAmt,serviceQual,numOfPeople);
        return f;
    };
    var tipCalculator1 = CalculateTip();
    tipCalculator1.tipDisplay();

    //using Object.create() method
    var tipCalculator = Object.create(CalculateTipProto);
    tipCalculator.init(billAmt,serviceQual,numOfPeople);
    //tipCalculator.tipDisplay();
};