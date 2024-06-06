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
  sortedData: ProductFromApi[];
  fetchedProducts: ProductFromApi[] | undefined;
  message: string;
  status: string;
}
interface UsersApi {
  data: UsersApi[];
  userProfile: any;
  products: any;
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
interface ProductDetailsApi {
  product: ProductDetailsApi[];
  data: any;
  UserId: string;
  Name: string;
  // status: string;
  // avatar: string;
  // wallet_address: string;
  // x_link: string;
  // bio: string;
}

interface ProductFromApi {
  _id: string;
  categories: string[] | string;
  created_at: number;
  description: string;
  image: any;
  discount: number;
  name: string;
  price: number;
  quantity: number;
  tags: string[]?;
  updated_at: number;
  user_id: string;
}

interface CartContextProps {
  cart: CartProduct[];
  prevCart: CartProduct[];
  addToCart: (product: CartProduct) => void;
}
