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
  data: ProductFromApi[];
  message: string;
  status: string;
}
interface UsersApi {
  data: UsersApi[];
  message: string;
  status: string;
  WalletAddress: any;
}

interface CreatorFromApi {
  data: CreatorFromApi[];
  user: any;
  message: string;
  status: string;
  avatar: string;
  wallet_address: string;
  x_link: string;
  bio: string;
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
