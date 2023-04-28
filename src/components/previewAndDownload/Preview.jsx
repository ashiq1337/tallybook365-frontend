import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import ClientDetails from "./ClientDetails";
import Footer from "./Footer";
import Header from "./Header";
import Table from "./Table";
import Terms from "./Terms";
import Styles from "./Preview.module.scss";
import BankInfo from "./BankInfo";
import { VscPreview } from "react-icons/vsc";

export default function Preview({
  data = {
    bank_account: "",
    bank_name_address: "",
    client_address: "",
    client_id: "",
    client_name: "",
    date: "",
    job_no: "",
    brand: "",
    job_type: "",
    swift: "",
    t_and_c: "",
    title: "",
    advance: 0,
    jobType: "",
    productionCost: "",
    grand_total: "",
    items: [
      {
        day: "",
        particulars: "",
        quantity: "",
        totalPrice: "",
        unitPrice: "",
      },
    ],
  },
  title = "",
}) {
  const componentRef = useRef();

  const pageStyle = `
  @page {
    size: 210mm 297mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  return (
    <div className={Styles.main}>
      <div className={Styles.container}>
        {/* Invoice Preview */}
        <div className={Styles.box}>
          <div ref={componentRef}>
            <Header />
            <ClientDetails
              docType={title}
              title={data?.title}
              company={data?.client_name}
              address={data?.client_address}
              invoiceDate={data?.date?.slice(0, 10)}
              jobNumber={data?.job_no}
              brand={data?.brand}
              jobType={data?.job_type}
            />

            <Table
              productionCost={data?.grand_total}
              lists={data.items}
              advance={data?.advance}
              valueAddedTax={data?.vat}
              asf={data?.asf}
            />
            <Terms />
            <BankInfo
              accountNo={data?.bank_account}
              nameAndAddress={data?.bank_name_address}
              swift={data?.swift}
              routing={data?.routing_no}
            />
            <Footer />
          </div>
        </div>

        {/* print button */}
        <ReactToPrint
          trigger={() => (
            <div className={Styles.printBtn}>
              <VscPreview className={Styles.icon} /> Print the document
            </div>
          )}
          content={() => componentRef.current}
          documentTitle="new document"
          pageStyle={pageStyle}
        />
      </div>
      <br /><br /><br /><br />
    </div>
  );
}
