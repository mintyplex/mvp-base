"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useToast } from "../ui/use-toast";
import { createPriceWithDiscount } from "~/lib/utils/utils";

interface Product {
  id: string; // Assumed type; adjust as necessary (could be number)
  Name: string;
  ID: string;
  CoverImage: any;
  UserId: string;
  Discount: number;
  Price: number;
  quantity?: number;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantityAdded: number | string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalPrice: any;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  updatePrice: (itemId: string, newPrice: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    // Initialize state from local storage at the start
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  const { toast } = useToast();

  const handleAddSuccess = () => {
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const addToCart = useCallback(
    (product: Product, quantityAdded: number | string) => {
      setCartItems((currentItems) => {
        const updatedItems = currentItems.find((item) => item.ID === product.ID)
          ? currentItems.map((item) =>
              item.ID === product.ID
                ? {
                    ...item,
                    quantity:
                      Number(quantityAdded) +
                      Number(item?.quantity && item?.quantity),
                  }
                : item
            )
          : [...currentItems, { ...product, quantity: Number(quantityAdded) }];

        // Correctly update local storage after modifying the cart items
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
        handleAddSuccess();
        return updatedItems;
      });
    },
    [setCartItems]
  );

  const calculateTotal = (items: Product[]) => {
    return items.reduce(
      (acc, item) =>
        acc +
        Number(createPriceWithDiscount(item.Price, item.Discount)) *
          Number(item.quantity),
      0
    );
  };

  useEffect(() => {
    setTotalPrice(calculateTotal(cartItems));
  }, [cartItems]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.ID === itemId ? { ...item, quantity: newQuantity } : item
      );
      setTotalPrice(calculateTotal(updatedItems));
      return updatedItems;
    });
  };

  const updatePrice = (itemId: string, newPrice: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.ID === itemId ? { ...item, Price: newPrice } : item
      );
      setTotalPrice(calculateTotal(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((currentItems) => {
        const updatedItems = currentItems.filter(
          (item) => item.ID !== productId
        );

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
        setTotalPrice(calculateTotal(updatedItems));
        return updatedItems;
      });
    },
    [setCartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setTotalPrice(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, [setCartItems]);

  // console.log(cartItems);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    updateQuantity,
    updatePrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
