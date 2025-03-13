"use client";

import TableView from "../table/TableView";
import UserCells from "./UserCells";
import { User } from "./userTypes";


export default function UserTable (props: {
  rows: User[]
}) {
  const columns = ['Email', 'Name', 'Role', 'Actions'];
  
  return (
    <TableView
      CellsView={UserCells}
      columns={columns}
      rows={props.rows}
    />
  );
}