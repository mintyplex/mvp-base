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

interface ProductsFromApi {
  data: _ProductFromApi[];
  message: string;
  status: string;
}

interface ProductFromApi {
  _id: string;
  categories: string[];
  created_at: number;
  description: string;
  discount: number;
  name: string;
  price: number;
  quantity: number;
  tags: string[]?;
  updated_at: number;
  user_id: string;
}
