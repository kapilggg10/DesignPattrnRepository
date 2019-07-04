  //Creating a Constructor for CalculateTip
  function CalculateTip(billAmt,serviceQual,numOfPeople){
      //set paramenter for this object
    this.billAmt = billAmt;
    this.serviceQual = serviceQual;
    this.numOfPeople = numOfPeople;
    this.validation();
    this.total = this.totalCalculator();
  }

  // a prototype function for validation of data
  CalculateTip.prototype.validation = function(){
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
  }

  // a prototype function for total Calculation of tip
  CalculateTip.prototype.totalCalculator = function(){
    var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
    //round to two decimal places
    total = Math.round(total * 100) / 100;
    //next line allows us to always have two digits after decimal point
    total = total.toFixed(2);
    return total;
  }

  // display method
  CalculateTip.prototype.display = function(total){
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
  }

  // Script should run after page got loaded
  window.onload = function(){
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

        //Create an new Object for tipCalculator
        var tipCalculator = new CalculateTip(billAmt,serviceQual,numOfPeople);
        tipCalculator.display(tipCalculator.totalCalculator());
        
    };
}
