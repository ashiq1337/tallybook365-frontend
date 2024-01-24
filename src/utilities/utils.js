export const getAmountsWithCommas = (amount) => {
	if (!amount) return '৳ 0.00';
  const formattedAmount = amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BDT',
    currencyDisplay: 'symbol',
  });

  // Manually replace the currency code with the symbol
  return formattedAmount.replace('BDT', '৳');
};

export const calculateGrandTotal = (subtotal, asfPercentage, vatPercentage) => {
	let grandTotal = 0;
	if (!subtotal && !asfPercentage && !vatPercentage) return;

	let sub_total = parseFloat(subtotal);
	let asf = parseFloat(asfPercentage);
	let vat = parseFloat(vatPercentage);

	if (sub_total) {
		if (asf) {
			if (vat) {
				grandTotal = sub_total + (sub_total * asf) / 100 + (sub_total * vat) / 100;
			} else {
				grandTotal = sub_total + (sub_total * asf) / 100;
			}
		} else {
			if (vat) {
				grandTotal = sub_total + (sub_total * vat) / 100;
			} else {
				grandTotal = sub_total;
			}
		}
	} else {
		return grandTotal;
	}
	return grandTotal.toFixed(2);
};

export const getPercentageToDecimal = (value, percentage) => {
	if (!value && !percentage) return;

	let _percentage = parseFloat(percentage);
	let _value = parseFloat(value);
	const decimalValue = parseFloat(((_value * _percentage) / 100).toFixed(2));
	return decimalValue;
};
