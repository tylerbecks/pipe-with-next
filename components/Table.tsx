import moment from "moment";
import DataTable from "react-data-table-component";
import { Subscription } from "../interfaces/subscription";
import Badge from "./Badge";

const COLUMNS = [
  {
    name: "Company Name",
    selector: "company",
    sortable: true
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    format: (row: Subscription) => <Badge content={row.status} />
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
    sortable: true,
    format: (row: Subscription) => moment(row.startDate).format("MMM D, YYYY")
  },
  {
    name: "End Date",
    selector: "endDate",
    sortable: true,
    format: (row: Subscription) => moment(row.endDate).format("MMM D, YYYY")
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
