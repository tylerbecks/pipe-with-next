import moment from "moment";
import DataTable from "react-data-table-component";
import { Subscription } from "../interfaces/subscription";
import Badge from "./Badge";
import { formatCurrency } from "../utils/format";

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
    allowOverflow: true,
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
    sortable: true,
    format: (row: Subscription) => formatCurrency(row.mrr)
  }
];

interface Props {
  data: Array<Subscription>;
  onSelectRows: (rows: Array<Subscription>) => void;
}

const Table: React.FunctionComponent<Props> = ({ data, onSelectRows }) => (
  <DataTable
    onSelectedRowsChange={({ selectedRows }: any) => {
      onSelectRows(selectedRows);
    }}
    selectableRowSelected={(row: Subscription) => row.isSelected}
    noContextMenu
    noHeader
    highlightOnHover
    selectableRowsHighlight
    selectableRows
    columns={COLUMNS}
    data={data}
  />
);

export default Table;
