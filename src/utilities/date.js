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
export const monthNameByNumber = (monthNumber) => month[monthNumber];
export const currentYear = new Date().getFullYear();

export const formatDate = (inputDate) => {
  // Parse the input date string into a Date object
  const dateObject = new Date(inputDate);

  // Get day, month, and year components
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = dateObject.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
