//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";   

//module creation
var CalculateTip = (function(){
    //private properties
    var billAmt = 0; 
    var serviceQual = 0;
    var numOfPeople = 0;
    var total = 0;

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
        validationFunction();
        total = (billAmt * serviceQual) / numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    };

    // setter to set values.
    // these methods will be returned by this object so these are public function
    return {
        setBill : function(data){
            billAmt = data;
        },
        setServiceQual : function(data){
            serviceQual = data;
        },
        setNumOfPeople : function(data){
            numOfPeople = data;
        },
        calculateTotal : function(){
            return calculationTotal();
        }
        };
  })();

//click to call function
document.getElementById("calculate").onclick = function()
{
    CalculateTip.setBill(document.getElementById("billamt").value);
    CalculateTip.setServiceQual(document.getElementById("serviceQual").value);
    CalculateTip.setNumOfPeople(document.getElementById("peopleamt").value);
    
    //display total amount of tip on window
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = CalculateTip.calculateTotal();
};