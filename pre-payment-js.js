window.addEventListener("DOMContentLoaded", () => findEMI());

function addComma() {
  var x = document.getElementById('m_input_amount').value;
  m_input_amount.value = x.replace(/,/g, "").replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  var y = document.getElementById('m_input_lumpsum_amount').value;
  m_input_lumpsum_amount.value = y.replace(/,/g, "").replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  var z = document.getElementById('m_input_lumpsum_amountmonthly').value;
  m_input_lumpsum_amountmonthly.value = z.replace(/,/g, "").replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
}

// Loan Amount
$('#m_range_amount').on('input',function () {
  var newVal = $(this).val().replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  $("#m_input_amount").val(newVal);
  });
  $('#m_input_amount').on('input', function(){
  $('#m_range_amount').val($(this).val().replace(/\D/g,''))
  });

// Interest
$('#m_range_interest').on('input',function () {
  var newVal = $(this).val();
  $("#m_input_interest").val(newVal);
  });
  $('#m_input_interest').on('input', function(){
  $('#m_range_interest').val($(this).val().replace(/\D/g,''))
  });

// Tenure
$('#m_range_tenure').on('input',function () {
  var newVal = $(this).val();
  $("#m_input_tenure").val(newVal);
  });
  $('#m_input_tenure').on('input', function(){
  $('#m_range_tenure').val($(this).val().replace(/\D/g,''))
  });

  // Lumpsum Amount
$('#m_range_lumpsum_amount').on('input',function () {
  var newVal = $(this).val().replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  $("#m_input_lumpsum_amount").val(newVal);
  });
  $('#m_input_lumpsum_amount').on('input', function(){
  $('#m_range_lumpsum_amount').val($(this).val().replace(/\D/g,''))
  });
// Lumpsum Month
  $('#m_range_lumpsum_month').on('input',function () {
    var newVal = $(this).val();
    $("#m_input_lumpsum_month").val(newVal);
    });
    $('#m_input_lumpsum_month').on('input', function(){
    $('#m_range_lumpsum_month').val($(this).val().replace(/\D/g,''))
    });

    // LumpsumMonthly Amount
$('#m_range_lumpsum_amountmonthly').on('input',function () {
  var newVal = $(this).val().replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  $("#m_input_lumpsum_amountmonthly").val(newVal);
  });
  $('#m_input_lumpsum_amountmonthly').on('input', function(){
  $('#m_range_lumpsum_amountmonthly').val($(this).val().replace(/\D/g,''))
  });
// LumpsumMonthly Month
  $('#m_range_lumpsum_monthly').on('input',function () {
    var newVal = $(this).val();
    $("#m_input_lumpsum_monthly").val(newVal);
    });
    $('#m_input_lumpsum_monthly').on('input', function(){
    $('#m_range_lumpsum_monthly').val($(this).val().replace(/\D/g,''))
    });

// <----------- Finding EMI -------------->

function findEMI() {

    var principal = parseInt(document.getElementById("m_range_amount").value);
    var interest = parseInt(document.getElementById("m_range_interest").value);
    var interestAmount = parseFloat(interest/100/12);
    var tenure = parseInt(document.getElementById("m_range_tenure").value);
    var lumpsumMonth = parseInt(document.getElementById("m_range_lumpsum_month").value);
    var lumpsumAmount = parseInt(document.getElementById("m_range_lumpsum_amount").value);
    var emiStartMonth = parseInt(document.getElementById("m_range_lumpsum_monthly").value);
    var emiIncreasedAmount = parseInt(document.getElementById("m_range_lumpsum_amountmonthly").value);

    // EMI Calculation

    var EMIAmount = principal * interestAmount * (Math.pow(1 + interestAmount,tenure)) / ((Math.pow(1 + interestAmount,tenure))- 1);
    var monthlyEMIAmount = EMIAmount.toFixed(0);
    var EMI_OLD = parseInt(monthlyEMIAmount);

    var totalLoanAmount__ = tenure * EMIAmount;
    var totalAmount__ = totalLoanAmount__.toFixed(0);

    var totalInterest__ = totalAmount__ - principal;

    document.getElementById('totalInterest__').innerHTML = ('' + totalInterest__).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  // Looping

  function lumpsumOneTime() {  
    var closingBalance = principal;
    var interestPaid;
    var InterestRate = interestAmount;
    var n = 1;
    var lumpsumInterestPaid = 0;

  for(n = 1; n < lumpsumMonth; n++){
    openingBalance = closingBalance;
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD + interestPaid;
    lumpsumInterestPaid = lumpsumInterestPaid + interestPaid;
  }

    openingBalance = closingBalance;
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD - lumpsumAmount + interestPaid;
    lumpsumInterestPaid = lumpsumInterestPaid + interestPaid;
    n++;

  while( closingBalance > 0){
    openingBalance = closingBalance; 
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD + interestPaid;
    lumpsumInterestPaid = lumpsumInterestPaid  + interestPaid;
    n++
  }

  var tenureReduced = tenure - (n-1);
  var interestSaved = ((EMI_OLD * tenure) - principal) - lumpsumInterestPaid;

  // Display in Front-end
  if((interestSaved >= 0) || (tenureReduced >= 0)) {
    document.getElementById('interestSaved').innerHTML = interestSaved.toFixed(0).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
    document.getElementById('tenureReduced').innerHTML = tenureReduced;
  } else {
    interestSaved = 0;
    tenureReduced = 0;
    document.getElementById('interestSaved').innerHTML = interestSaved;
    document.getElementById('tenureReduced').innerHTML = tenureReduced;
  }
  }
  lumpsumOneTime();

  function lumpsumMonthly() {
    // Monthly InreaseInEMI
    var emiStartMonth = parseInt(document.getElementById("m_range_lumpsum_monthly").value);
    var emiIncreasedAmount = parseInt(document.getElementById("m_range_lumpsum_amountmonthly").value);
    var closingBalance = principal;
    var interestPaid;
    var InterestRate = interestAmount;
    var lumpsumInterestPaid = 0;

    for(n=1; n<emiStartMonth;n++) {
      openingBalance = closingBalance;
      interestPaid = openingBalance * InterestRate;
      closingBalance = openingBalance - EMI_OLD + interestPaid;
      lumpsumInterestPaid = lumpsumInterestPaid + interestPaid;
    }
    var EMI_NEW = EMIAmount + emiIncreasedAmount;

    while(closingBalance>0) {
      openingBalance = closingBalance;
      interestPaid = openingBalance * InterestRate;
      closingBalance = openingBalance - EMI_NEW + interestPaid;
      lumpsumInterestPaid = lumpsumInterestPaid + interestPaid;
      n++;
    }

    tenureReducedMonthly = tenure - (n-1);
    interestSavedMonthly = ((EMI_OLD * tenure) - principal) - lumpsumInterestPaid;

    // Display in Front-end
    if((interestSavedMonthly >= 0) || (tenureReducedMonthly >0)) {
      document.getElementById('interestSavedMonthly').innerHTML = interestSavedMonthly.toFixed(0).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
      document.getElementById('tenureReducedMonthly').innerHTML = tenureReducedMonthly;
    } else {
      interestSavedMonthly = 0;
      tenureReducedMonthly = 0;
      document.getElementById('interestSavedMonthly').innerHTML = interestSavedMonthly;
      document.getElementById('tenureReducedMonthly').innerHTML = tenureReducedMonthly;
    }
    }
    lumpsumMonthly();

    // Var for Chart

    var prepaymentOptions = document.querySelector('.checkbox-button__input:checked').value;
    
    oneVar = totalInterest__;
  
    if(prepaymentOptions == "1") {
      twoVar = +interestSaved.innerHTML.replace(/\D/g,'');
    } else {
      twoVar = interestSavedMonthly;
    }

  onClickDrawChart();
}

function updateInstallment() {
  var tenure = document.getElementById('m_range_tenure').value;
  document.getElementById('m_range_lumpsum_month').setAttribute("max", tenure);
}

function updateAmount() {
  var maxAmount = document.getElementById('m_range_amount').value;
  document.getElementById('m_range_lumpsum_amount').setAttribute("max", maxAmount);
  document.getElementById('m_range_lumpsum_amountmonthly').setAttribute("max", maxAmount);
}
// Hide / Show onclick of Button

function changeonClick() {
  var prepaymentOptions = document.querySelector('.checkbox-button__input:checked').value;
  if(prepaymentOptions == "1") {
    document.getElementsByClassName('lumpsum-onetime')[0].style.display = "block";
    document.getElementsByClassName('lumpsum-monthly')[0].style.display = "none";
    document.getElementsByClassName('lumpsum-monthly-result')[0].style.display = "none";
    document.getElementsByClassName('lumpsum-one-result')[0].style.display = "block";
  } else {
    document.getElementsByClassName('lumpsum-onetime')[0].style.display = "none";
    document.getElementsByClassName('lumpsum-monthly')[0].style.display = "block";
    document.getElementsByClassName('lumpsum-monthly-result')[0].style.display = "block";
    document.getElementsByClassName('lumpsum-one-result')[0].style.display = "none";

  }
}

function onClickDrawChart() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
   
         var data = google.visualization.arrayToDataTable([
           ['', ''],
           ['', oneVar],
           ['', twoVar],
         ]);

         var options = {
           backgroundColor: 'transparent',
           tooltip: {text: 'value'},
           title: '', 
           legend: 'none',
           width: 500,
           pieSliceText: 'none',
           pieStartAngle: 270,
           slices: {
             0: { color: '#3366cc' },
             1: { color: '#ff7000'},
           }
         };
 
         var chart = new google.visualization.PieChart(document.getElementById('foreclosureChart'));
         chart.draw(data, options);
       }
 }