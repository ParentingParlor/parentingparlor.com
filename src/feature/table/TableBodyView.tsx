import { TableRow } from "@/components/ui/table";
import { JSX } from "react";

export default function TableBodyView<Row>(props: {
  CellsView: (props: { row: Row, isMobile?: boolean }) => JSX.Element;
  EmptyCellsView?: () => JSX.Element;
  rows: Row[];
  isMobile?: boolean;
}) {
  if (props.rows.length === 0 && props.EmptyCellsView != null) {
    return (
      <TableRow>
        <props.EmptyCellsView />
      </TableRow>
    );
  }
  const rowViews = props.rows.map((row, index) => {
    const cells = <props.CellsView row={row} isMobile={props.isMobile} />;
    const view = <TableRow key={index}>{cells}</TableRow>;
    return view;
  });
  return <>{rowViews}</>;
}