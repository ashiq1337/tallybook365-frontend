import React from 'react';
import classes from './Table.module.scss';
import { ToWords } from 'to-words';
import { getPercentageToDecimal } from '../../utilities/utils';

export default function Table({
	lists,
	subTotal,
  grandTotal,
	advance = 0,
	vat = 0,
	asf = 0,
}) {
	const toWords = new ToWords();

	let due = 0;
	if (advance) {
		due = grandTotal - advance;
	} else {
		due = grandTotal;
	}

	return (
		<div className={classes.container}>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>Sl</th>
						<th>Items</th>
						<th>Details</th>
						<th>Quantity</th>
						<th>Day</th>
						<th className={classes.itemRight}>Unit Price (BDT)</th>
						<th className={classes.itemRight}>Total (BDT)</th>
					</tr>
				</thead>

				<tbody>
					{lists.map((list, i) => (
						<tr key={i}>
							<td className={classes.itemCentered}>{i + 1} </td>
							<td>{list?.particulars}</td>
							<td>{list?.details}</td>
							<td className={classes.itemCentered}>
								{list?.quantity}
							</td>
							<td className={classes.itemCentered}>
								{list?.day}
							</td>
							<td className={classes.itemRight}>
								{list?.unitPrice}
							</td>
							<td className={classes.itemRight}>
								{list?.totalPrice}
							</td>
						</tr>
					))}

					<tr className={classes.itemRight}>
						<td colSpan={6}>
							<b>Total Production Cost</b>{' '}
						</td>
						<td>
							<b>
								{subTotal}
							</b>
						</td>
					</tr>
					<tr className={classes.itemRight}>
						<td colSpan={6}>Agency Management Fees {asf}%</td>
						<td>
							{getPercentageToDecimal(subTotal, asf)}
						</td>
					</tr>
					<tr className={classes.itemRight}>
						<td colSpan={6}>
							<b>Sub Total</b>
						</td>
						<td>
							<b>
								{subTotal}
							</b>
						</td>
					</tr>
					<tr className={classes.itemRight}>
						<td colSpan={6}>VAT {vat}%</td>
						<td>{getPercentageToDecimal(subTotal, vat)}</td>
					</tr>
					<tr className={classes.itemRight}>
						<td colSpan={6}>
							<b>Grand Total Amount</b>
						</td>
						<td>
							<b>{grandTotal}</b>
						</td>
					</tr>
					{advance ? (
						<tr className={classes.itemRight}>
							<td colSpan={6}>
								<b>Advance Payment</b>
							</td>
							<td>
								<b>
									{advance}
								</b>
							</td>
						</tr>
					) : null}
					{due ? (
						<tr className={classes.itemRight}>
							<td colSpan={6}>Due / Total Payable Amount</td>
							<td>{due}</td>
						</tr>
					) : null}
				</tbody>
			</table>
			<div></div>
			<br />
			<p>
				<b>In word:</b> BDT{' '}
				{toWords.convert(Math.round(due).toFixed(2))} only.
			</p>
		</div>
	);
}
