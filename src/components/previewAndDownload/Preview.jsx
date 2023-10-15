import { useRef } from "react";
import ReactToPrint from "react-to-print";
import ClientDetails from "./ClientDetails";
import Footer from "./Footer";
import Header from "./Header";
import Table from "./Table";
import Terms from "./Terms";
import Styles from "./Preview.module.scss";
import BankInfo from "./BankInfo";
import { VscPreview } from "react-icons/vsc";
import SignedBy from "./SignedBy";

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
    total_advance: 0,
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
    //size: A4;
    margin: 0;
  }

  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    .page-break {
      page-break-before: always;
      margin-top: 1rem;
      display: block;
    }

    body {
      -webkit-print-color-adjust: exact;
      background-color: white !important;
    }
  }

  .printPageHeader{
    position: fixed;
    top: 0;
  }

  .printPageFooter{
    position: fixed;
    height: 22px;
    bottom: 0;
  }

  .printPageMain{
   margin: 0 1cm 0 1cm;
   font-size: 12px;
  }

  .header-space{
    height: 200px;
  }

  .footer-space{
    height: 40px;
    bottom: 0;
  }

  .printTable{
    width: 100%;
  }
`;

  return (
    <div className={Styles.main}>
      <div className={Styles.container}>
        {/* Invoice Preview */}
        <div className={Styles.box}>
          <div ref={componentRef}>
            <div className="printPageHeader">
              <Header />
            </div>
            <table className="printTable">
              <thead>
                <tr>
                  <td>
                    <div className="header-space">&nbsp;</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="printPageMain">
                      <div className={Styles.contentMain}>
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
                          advance={data?.total_advance}
                          valueAddedTax={data?.vat}
                          asf={data?.asf}
                        />
                        <Terms terms={data?.t_and_c} />
                        <BankInfo
                          accountNo={data?.bank_account}
                          nameAndAddress={data?.bank_name_address}
                          swift={data?.swift}
                          routing={data?.routing_no}
                        />
                        <SignedBy />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div className="footer-space">&nbsp;</div>
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="printPageFooter">
              <Footer />
            </div>
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
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
