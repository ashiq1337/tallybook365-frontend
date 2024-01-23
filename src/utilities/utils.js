export const getAmountsWithCommas = (amount) => {
	if (!amount) return 'BDT 0.00';
	return amount.toLocaleString('en-IN', {
		maximumFractionDigits: 2,
		style: 'currency',
		currency: 'BDT',
	});
};

export const calculateGrandTotal = (subtotal, asfPercentage, vatPercentage) => {
	let grandTotal = 0;
	if (!subtotal && !asfPercentage && !vatPercentage) return ;
	if (subtotal){
		if (asfPercentage) {
			if (vatPercentage) {
				grandTotal = Math.round(subtotal + (subtotal * asfPercentage) / 100 + (subtotal * vatPercentage) / 100).toFixed(2);
			} else {
				grandTotal = Math.round(subtotal + (subtotal * asfPercentage) / 100).toFixed(2);
			}
		} else {
			if (vatPercentage) {
				grandTotal = Math.round(subtotal + (subtotal * vatPercentage) / 100).toFixed(2);
			} else {
				grandTotal = subtotal.toFixed(2);
			}
		}
	} else {
		return grandTotal;
	}

	return parseInt(grandTotal);
};
