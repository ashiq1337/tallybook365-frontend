import Header from "../../components/header/Header";
import AddQuotationForm from "../../components/quotations/AddQuotationForm";
import Styles from "./AddQuotation.module.scss";

export default function AddQuotations() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Create Quotation"}
        link="/quotation/quotations"
        btnName={"All quotations"}
      />
      <AddQuotationForm />
    </div>
  );
}
