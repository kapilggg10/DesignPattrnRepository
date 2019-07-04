//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";   

//module creation
var CalculateTip = (function(){
    var billAmt = 0; //document.getElementById("billamt").value;
    var serviceQual = 0; //document.getElementById("serviceQual").value;
    var numOfPeople = 0; //document.getElementById("peopleamt").value;
    var total = 0;
    //validation function to validate data;
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
    var calculationTotal = function(){
        validationFunction();
        var total = (billAmt * serviceQual) / numOfPeople;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        return total.toFixed(2);
    };
    var setterServiceQual = function(data){
        serviceQual = data;
    }
    var setterBillAmt = function(data){
        billAmt = data;
    }
    var setterPeople = function(data){
        numOfPeople = data;
    }
    // setter to set values.
    return {
        setBill : setterBillAmt,
        setServiceQual : setterServiceQual,
        setNumOfPeople : setterPeople,
        calculateTotal : calculationTotal
        };
  })();

//click to call function
document.getElementById("calculate").onclick = function()
{
    CalculateTip.setBill(document.getElementById("billamt").value);
    CalculateTip.setServiceQual(document.getElementById("serviceQual").value);
    CalculateTip.setNumOfPeople(document.getElementById("peopleamt").value);
    
    //display tip on display
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = CalculateTip.calculateTotal();
};