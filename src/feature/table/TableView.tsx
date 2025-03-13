import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JSX } from "react";
import TableBodyView from "./TableBodyView";

export default function TableView<Row>(props: {
  CellsView: (props: { row: Row }) => JSX.Element;
  EmptyCellsView?: () => JSX.Element;
  columns: string[];
  rows: Row[];
}) {
  const heads = props.columns.map((column, index) => {
    return <TableHead key={index}>{column}</TableHead>;
  });
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>{heads}</TableRow>
        </TableHeader>
        <TableBody>
          <TableBodyView
            CellsView={props.CellsView}
            EmptyCellsView={props.EmptyCellsView}
            rows={props.rows}
          />
        </TableBody>
      </Table>
    </div>
  );
}
