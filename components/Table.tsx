import DataTable from "react-data-table-component";
import { Subscription } from "../interfaces/subscription";

const COLUMNS = [
  {
    name: "Company Name",
    selector: "company",
    sortable: true
  },
  {
    name: "Status",
    selector: "status",
    sortable: true
  },
  {
    name: "Invoice No.",
    selector: "invoiceID",
    sortable: true
  },
  {
    name: "Synced From",
    selector: "syncedFrom",
    sortable: true
  },
  {
    name: "Start Date",
    selector: "startDate",
    sortable: true
  },
  {
    name: "End Date",
    selector: "endDate",
    sortable: true
  },
  {
    name: "Monthly Revenue",
    selector: "mrr",
    sortable: true
  }
];

interface Props {
  data: Array<Subscription>;
}

const Table: React.FunctionComponent<Props> = ({ data }) => <DataTable columns={COLUMNS} data={data} />;

export default Table;
