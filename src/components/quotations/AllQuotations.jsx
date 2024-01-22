import React, { useEffect, useState } from 'react';
import { configuration } from '../../configurations/configurations';
import useAxios from '../../hooks/useAxios';
import { instance } from '../../utilities/axiosInstance';
import Styles from './AllQuotations.module.scss';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import useToggler from '../../hooks/useToggler';
import { VscPreview } from 'react-icons/vsc';
import { GrDocument } from 'react-icons/gr';
import { AiOutlinePlus, AiOutlineDatabase } from 'react-icons/ai';
import { currentMonthName, currentYear } from '../../utilities/date';
import { getAmountsWithCommas } from '../../utilities/utils';

export default function AllQuotations() {

	const navigate = useNavigate();
	const [response, error, loading, axiosFetch, message] = useAxios();
	const [
		responseDelete,
		errorDelete,
		loadingDelete,
		axiosFetchDelete,
		messageDelete,
	] = useAxios();
	const [getData, setGetData] = useToggler();
	const [pageNumber, setPageNumber] = useState(1); //pagination page number.
	const [pageLimit, setPageLimit] = useState(20); //pagination item limit.
	const [selectedMonth, setSelectedMonth] = useState("0"); //pagination month number.
	const [selectedYear, setSelectedYear] = useState(currentYear); //pagination year limit.
  const [responseThisMonthsQuotations, errorThisMonthsQuotations, loadingThisMonthsQuotations, axiosFetchThisMonthsQuotations, messageThisMonthsQuotations] = useAxios();
  const [responseThisMonthsInvoices, errorThisMonthsInvoices, loadingThisMonthsInvoices, axiosFetchThisMonthsInvoices, messageThisMonthsInvoices] = useAxios();
	const getQuotations = () => {
		//if request is sent with month and year then we will get specific data from that month and year
		let urlForSpecificTask = '';
		if (selectedMonth !== "0") {
			urlForSpecificTask = `${configuration.getQuotationByMonth}month=${selectedMonth}&year=${selectedYear}&page=${pageNumber}&limit=${pageLimit}`;
		} else {
			urlForSpecificTask = `${configuration.quotations}?page=${pageNumber}&limit=${pageLimit}`;
		}
		axiosFetch({
			axiosInstance: instance,
			method: 'Get',
			url: urlForSpecificTask,
		});
	};
  const getThisMonthsQuotations = () => {
    axiosFetchThisMonthsQuotations({
      axiosInstance: instance,
      method: 'Get',
      url: `${configuration.getThisMonthsTotalQuotationAmount}`,
    });
  }
  const getThisMonthsInvoices = () => {
    axiosFetchThisMonthsInvoices({
      axiosInstance: instance,
      method: 'Get',
      url: `${configuration.getThisMonthsTotalInvoiceAmount}`,
    });
  }

	const deleteQuotation = (quotationId) => {
		if (confirm('Do you want to delete the quotation?')) {
			axiosFetchDelete({
				axiosInstance: instance,
				method: 'delete',
				url: `${configuration.quotations}/${quotationId}`,
			});
			setGetData();
		}
	};

  useEffect(() => {
    getThisMonthsQuotations();
    getThisMonthsInvoices();
  },[])

	useEffect(() => {
		getQuotations();
	}, [getData, pageNumber, pageLimit, selectedMonth, selectedYear]);

	function viewDetailsClickHandler(quotationId) {
		navigate(`/quotation/${quotationId}`);
	}
	function preview(Id) {
		navigate(`/preview/Estimate/quotes/${Id}`);
	}
	function navigateToPage(Id, url) {
		navigate(`/${url}/${Id}`);
	}

	const tableRow = response?.data?.map((quote, i) => (
		<tr key={i}>
			<td>{i + 1}</td>
			<td className={Styles.leftAlign}>{quote?.title}</td>
			<td>{quote?.date?.slice(0, 10)}</td>
			<td>{quote?.client_name}</td>
			<td>{getAmountsWithCommas(quote?.grand_total)}</td>
			<td>
				{quote?.purchaseOrder_id.length != 0 ? (
					<AiOutlineDatabase
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?._id, 'workorder/workorders')
						}
					/>
				) : (
					<AiOutlinePlus
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?._id, 'workorder/addWorkorder')
						}
					/>
				)}
			</td>
			<td>
				{quote?.chalan_id ? (
					<GrDocument
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?.chalan_id, 'chalan')
						}
					/>
				) : (
					<AiOutlinePlus
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?._id, 'chalan/addChalan')
						}
					/>
				)}
			</td>
			<td>
				{quote?.invoice_id ? (
					<GrDocument
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?.invoice_id, 'invoice')
						}
					/>
				) : (
					<AiOutlinePlus
						className={Styles.icon}
						onClick={() =>
							navigateToPage(quote?._id, 'invoice/addInvoice')
						}
					/>
				)}
			</td>
			<td>
				<VscPreview
					className={Styles.icon}
					onClick={() => preview(quote?._id)}
				/>
			</td>
			<td>
				<MdEdit
					className={Styles.icon}
					onClick={() => {
						viewDetailsClickHandler(quote?._id);
					}}
				/>
			</td>
			<td>
				<MdDelete
					className={Styles.deleteIcon}
					onClick={() => {
						deleteQuotation(quote?._id);
					}}
				/>
			</td>
		</tr>
	));
	const selectMonthBasedQuotations = () => {
		return (
			<select
				className={Styles.monthSelect}
				value={selectedMonth}
				onChange={(e) => setSelectedMonth(e.target.value)}
			>
				<option value="0">All Quotations</option>
				<option value="1">January</option>
				<option value="2">February</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
		);
	};
	const selectYearBasedQuotations = () => {
		return (
			<select
				className={Styles.monthSelect}
				value={selectedYear}
				onChange={(e) => setSelectedYear(e.target.value)}
			>
				<option value={currentYear}> {currentYear} </option>
				<option value={currentYear - 1}> {currentYear - 1} </option>
				<option value={currentYear - 2}> {currentYear - 2} </option>
			</select>
		);
	};
	const selectPageLimit = () => {
		return (
			<select
				value={pageLimit}
				onChange={(e) => setPageLimit(e.target.value)}
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
			</select>
		);
	};
	return (
		<div className={Styles.main}>
			<div className={Styles.topSection}>
				<div>
          {loadingThisMonthsQuotations && <p>Loading...</p>}
          {!loadingThisMonthsQuotations && !errorThisMonthsQuotations &&
					  <p>{currentMonthName}, {currentYear} Quotation: <b>{getAmountsWithCommas(responseThisMonthsQuotations?.data?.totalQuotedAmount)}</b></p>
          }
				</div>
				<div>
          {loadingThisMonthsInvoices && <p>Loading...</p>}
          {!loadingThisMonthsInvoices && !errorThisMonthsInvoices &&
					  <p>{currentMonthName}, {currentYear} Invoice: <b>{getAmountsWithCommas(responseThisMonthsInvoices?.data?.totalInvoicedAmount)}</b>  </p>
          }
				</div>
				<div>
					{selectMonthBasedQuotations()}
					{selectYearBasedQuotations()}
				</div>
			</div>
			{!response?.data?.length && !loading && <p>No data found</p>}
			{loading && <p>Loading...</p>}
			{response?.data?.length > 0 && !loading && !error && (
				<div className={Styles.container}>
					<div className={Styles.tableContainer}>
						<table>
							<tbody>
								<tr>
									<th>Ser</th>
									<th>Title</th>
									<th>Date</th>
									<th>Client</th>
									<th>Amount</th>
									<th>Purchase</th>
									<th>Chalan</th>
									<th>Invoice</th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
								{tableRow}
							</tbody>
						</table>
					</div>
					<div className={Styles.btnContainer}>
						<button
							disabled={pageNumber <= 1}
							className={Styles.btn}
							onClick={() => {
								setPageNumber(pageNumber - 1);
							}}
						>
							Previous
						</button>
						<div style={{ display: 'flex', gap: '10px' }}>
							<p className={Styles.currentPg}>
								Page limit: {selectPageLimit()}
							</p>
							<p className={Styles.currentPg}>
								Page: {pageNumber}
							</p>
						</div>
						<button
							disabled={
								!response?.data?.length ||
								response?.data?.length < pageLimit
							}
							className={Styles.btn}
							onClick={() => {
								setPageNumber(pageNumber + 1);
							}}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
