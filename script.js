
function totalIncomeCalc () {
    const wagesSalariesTips = Number(document.getElementById('form-1040-line-1').value);
    const taxExemptInterest = Number(document.getElementById('form-1040-line-2b').value);
    const ordinaryDividends = Number(document.getElementById("form-1040-line-3b").value);
    const iraDistributionsTaxableAmount = Number(document.getElementById("form-1040-line-4b").value);
    const pensionsAnnuitiesTaxableAmount = Number(document.getElementById("form-1040-line-5b").value);
    const socSecBenTaxableAmount = Number(document.getElementById("form-1040-line-6b").value);
    const capitalGains = Number(document.getElementById("form-1040-line-7").value);
    const otherIncome = Number(document.getElementById("form-1040-line-8").value);
    document.getElementById("form-1040-line-9").value = wagesSalariesTips + taxExemptInterest + ordinaryDividends + iraDistributionsTaxableAmount + pensionsAnnuitiesTaxableAmount + socSecBenTaxableAmount + capitalGains + otherIncome;
    const totalIncome = Number(document.getElementById("form-1040-line-9").value);
    return totalIncome;
}

function adjustedGrossIncomeCalc (){
    const adjustmentsToIncome = Number(document.getElementById("form-1040-line-10").value);
    document.getElementById("form-1040-line-11").value = totalIncomeCalc() - adjustmentsToIncome;
    const adjustedGrossIncome = Number(document.getElementById("form-1040-line-11").value);
    return adjustedGrossIncome;
}

function standardItemizedDeductionCalc () {
    const deduction = Number(document.getElementById("form-1040-line-12a").value);
    const charitableContributions = Number(document.getElementById("form-1040-line-12b").value);
    document.getElementById("form-1040-line-12c").value = deduction + charitableContributions;
    const standardItemizedDeduction = Number(document.getElementById("form-1040-line-12c").value);
    return standardItemizedDeduction;
}

function qualifiedBusinessIncomeCalc ()  {
    const qualifiedBusinessIncomeDeduction = Number(document.getElementById("form-1040-line-13").value);
    document.getElementById("form-1040-line-14").value = standardItemizedDeductionCalc() + qualifiedBusinessIncomeDeduction;
    const qualifiedBusinessIncome = Number(document.getElementById("form-1040-line-14").value);
    return qualifiedBusinessIncome;
}


function taxableIncomeCalc ()  {
  var taxableIncome;
  var taxableIncome1;
   taxableIncome1 = adjustedGrossIncomeCalc() - qualifiedBusinessIncomeCalc();
   document.getElementById("form-1040-line-15").value = taxableIncome1 < 0 ? 0 : taxableIncome1;
   taxableIncome = Number(document.getElementById("form-1040-line-15").value);
    return taxableIncome;
    }
 
function taxCalc () {
    const taxCalc = Number(document.getElementById("form-1040-line-16").value);
    const schedule2Line3 = Number(document.getElementById("form-1040-line-17").value);
    document.getElementById("form-1040-line-18").value = taxCalc + schedule2Line3;
    const tax =  Number(document.getElementById("form-1040-line-18").value);
    return tax;
}

function taxCalc1 () {
    const nonRefundableCredits = Number(document.getElementById("form-1040-line-19").value);
    const schedule3Line8 = Number(document.getElementById("form-1040-line-20").value);
    document.getElementById("form-1040-line-21").value = nonRefundableCredits + schedule3Line8;
    const tax1 = Number(document.getElementById("form-1040-line-21").value);
    return tax1;
}

function taxCalc22 ()  {
    var taxCalc2;
    var tax22;
     taxCalc2 = taxCalc() - taxCalc1();
     document.getElementById("form-1040-line-22").value = taxCalc2 < 0 ? 0 : taxCalc2;
     tax22 = Number(document.getElementById("form-1040-line-22").value);
      return tax22;
      }

function totalTaxCalc () {
    const schedule2Line21 = Number(document.getElementById("form-1040-line-23").value);
    document.getElementById("form-1040-line-24").value = taxCalc22 () + schedule2Line21;
    const totalTax = Number(document.getElementById("form-1040-line-24").value);
    return totalTax;
}

function federalIncomeTaxWithheldCalc () {
    const FormW2 = Number(document.getElementById("form-1040-line-25a").value);
    const Form1099 = Number(document.getElementById("form-1040-line-25b").value);
    const OtherForms = Number(document.getElementById("form-1040-line-25c").value);
    document.getElementById("form-1040-line-25d").value = FormW2 + Form1099 + OtherForms;
    const federalIncomeTaxWithheld = Number(document.getElementById("form-1040-line-25d").value);
    return federalIncomeTaxWithheld;
}

function totalOtherPaymentsAndRefundableCreditsCalc () {
    const earnedIncomeCredit = Number(document.getElementById("form-1040-line-27a").value);
    const refundableChildTaxCreditsOrAdditionalChildTaxCredit = Number(document.getElementById("form-1040-line-28").value);
    const  americanOpportunityCredit = Number(document.getElementById("form-1040-line-29").value);
    const recoveryRebateCredit = Number(document.getElementById("form-1040-line-30").value);
    const schedule3Line15 = Number(document.getElementById("form-1040-line-31").value);
    document.getElementById("form-1040-line-32").value = earnedIncomeCredit + refundableChildTaxCreditsOrAdditionalChildTaxCredit + americanOpportunityCredit + recoveryRebateCredit + schedule3Line15;
    const totalOtherPaymentsAndRefundableCredits = Number(document.getElementById("form-1040-line-32").value);
    return totalOtherPaymentsAndRefundableCredits; 
}

function totalPaymentsCalc() {
    const estimatedTaxPayment = Number(document.getElementById("form-1040-line-26").value);
    document.getElementById("form-1040-line-33"). value = federalIncomeTaxWithheldCalc () + estimatedTaxPayment + totalOtherPaymentsAndRefundableCreditsCalc ();
    const totalPayments = Number(document.getElementById("form-1040-line-33").value);
    return totalPayments;
}

function refundOrOwe () {
    const estimatedTaxPenalty = Number(document.getElementById("form-1040-line-38").value);
    if (totalPaymentsCalc () > totalTaxCalc()) {
        document.getElementById("form-1040-line-34").value = totalPaymentsCalc() - totalTaxCalc ();
        const refund = Number(document.getElementById("form-1040-line-34").value);
        document.getElementById("form-1040-line-37").value = 0;
        return 'Your refund is ' + refund;
    }
    else {
        document.getElementById("form-1040-line-37").value = totalTaxCalc () - totalPaymentsCalc () + estimatedTaxPenalty;
        const owe = Number(document.getElementById("form-1040-line-37").value);
        document.getElementById("form-1040-line-34").value = 0;
        return 'You owe ' +owe;
    }
}