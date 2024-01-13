interface Cell {
  content: string | number | React.ReactNode;
  type?: string; // Add a 'type' property for styling if needed
}

interface Row {
  cells: Cell[];
}

interface ReusableTableProps {
  headers: string[];
  data: Row[];
}
