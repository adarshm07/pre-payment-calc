// Loan Amount
$('#m_range_amount').on('change',function () {
  var newVal = $(this).val().replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  $("#m_input_amount").val(newVal);
  });
  $('#m_input_amount').on('change', function(){
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

  //  Lumpsum Amount
$('#m_range_lumpsum_amount').on('input',function () {
  var newVal = $(this).val();
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

// <----------- Finding EMI -------------->

// function findEMI() {
    var principal = parseInt(document.getElementById("m_range_amount").value);
    var interest = parseInt(document.getElementById("m_range_interest").value);
    var interestAmount = parseFloat(interest/100/12);
    var tenure = parseInt(document.getElementById("m_range_tenure").value);
    var lumpsumMonth = parseInt(document.getElementById("m_range_lumpsum_month").value);
    var lumpsumAmount = parseInt(document.getElementById("m_range_lumpsum_amount").value);

    // EMI Calculation

    var EMIAmount = principal * interestAmount * (Math.pow(1 + interestAmount,tenure)) / ((Math.pow(1 + interestAmount,tenure))- 1);
    var monthlyEMIAmount = EMIAmount.toFixed(0);

    // var totalLoanAmount__ = +tenure * +EMIAmount;
    // var totalAmount__ = totalLoanAmount__.toFixed(0);

    // var totalInterest__ = +totalAmount__ - +principal;

  // Looping (Ende Muthappa, ingalu kaatholi!!!!!!)
// }
function lumpsumOneTime() {  
  var closingBalance = principal;
  var openingBalance = closingBalance;
  var EMI_OLD = parseInt(monthlyEMIAmount);
  var interestPaid;
  var InterestRate = interestAmount;
  var n = 1;
  // var lumpsumAmount = 0;

  for(n = 1; n <= lumpsumMonth; n++){
    openingBalance = closingBalance;
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD + interestPaid;
    lumpsumAmount = lumpsumAmount + interestPaid;
  }

    openingBalance = closingBalance;
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD - lumpsumAmount + interestPaid;
    lumpsumAmount = lumpsumAmount + interestPaid;
    n++;

  while( closingBalance >= 0){
    openingBalance = closingBalance; 
    interestPaid = openingBalance * InterestRate;
    closingBalance = openingBalance - EMI_OLD + interestPaid;
    lumpsumAmount = lumpsumAmount + interestPaid;
    n++
  }
    // var EMIAmountNew = principal * interestAmount * (Math.pow(1 + interestAmount,tenure)) / ((Math.pow(1 + interestAmount,tenure))- 1);

  var tenureReduced = tenure - n;
  var interestSaved = ((EMI_OLD * tenure) - principal) - lumpsumAmount;
  console.log(tenureReduced);
}

function updateInstallment() {
  var tenure = document.getElementById("m_range_tenure").value;

  document.getElementById('m_range_lumpsum_month').setAttribute("min","1");
  document.getElementById('m_range_lumpsum_month').setAttribute("max", tenure);
}

// Hide / Show onclick of Button

function changeonClick() {
  var prepaymentOptions = document.querySelector('.checkbox-button__input:checked').value;
  if(prepaymentOptions == "1") {
    document.getElementsByClassName('lumpsum-onetime')[0].style.display = "block";
    document.getElementsByClassName('lumpsum-monthly')[0].style.display = "none";
    console.log("1")
  } else {
    document.getElementsByClassName('lumpsum-onetime')[0].style.display = "none";
    document.getElementsByClassName('lumpsum-monthly')[0].style.display = "block";
    console.log("2")
  }
}
