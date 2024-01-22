const month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export const currentMonth = new Date().getMonth();
export const currentMonthName = month[currentMonth];
export const currentYear = new Date().getFullYear();
