//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";   

// a facade will be returned to deal with this object
// Out moto is to calculate the total tip. user don't care about inner processing
// Returning the tipAmount method to deal with this object and that is facade.
var CalculateTip = (function(){
    //private properties
    var billAmt = 0; 
    var serviceQual = 0;
    var numOfPeople = 0;

    //validation function to validate data;
    //private validation function can't be used by outsiders
    var validationFunction = function(){
        if (billAmt === "" || serviceQual == 0) {
            alert("Please enter values");
            return;
        }
        //Check to see if this input is empty or less than or equal to 1
        if (numOfPeople === "" || numOfPeople <= 1) {
            numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }
    };

    //Private method to calculate the total tip according
    // to the billAmt,service quality and number of people
    var calculationTotal = function(){
        var total = (billAmt * serviceQual) / numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    };
    
    // Set input values for this object
    var setValues = function(options){
        billAmt = options.billAmt;
        numOfPeople = options.numOfPeople;
        serviceQual = options.serviceQual;
    }
    // these methods will be returned by this object so these are public function
    return {
        tipAmount: function(options){
            setValues(options);
            validationFunction();
            return calculationTotal();
        }
    };
  })();

//click to call function
document.getElementById("calculate").onclick = function()
{
    const options = {billAmt : document.getElementById("billamt").value,
        serviceQual: document.getElementById("serviceQual").value,
        numOfPeople: document.getElementById("peopleamt").value
    };
    total = CalculateTip.tipAmount(options);
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
};