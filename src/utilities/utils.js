export const getAmountsWithCommas = (amount) => {
	console.log(typeof amount);
	if (!amount) return 'BDT 0.00';
	return amount.toLocaleString('en-IN', {
		maximumFractionDigits: 2,
		style: 'currency',
		currency: 'BDT',
	});
};
