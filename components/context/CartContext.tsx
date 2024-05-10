"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useToast } from "../ui/use-toast";

interface Product {
  id: string; // Assumed type; adjust as necessary (could be number)
  Name: string;
  ID: string;
  UserId: string;
  Discount: number;
  Price: number;
  quantity?: number; // Optional property for quantity to handle it within the cart
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantityAdded: number | string) => void;
  removeFromCart: (productId: string) => void;
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
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    // Initialize state from local storage at the start
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  const { toast } = useToast();

  const handleAddSuccess = () => {
    toast({
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
          window.localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
        handleAddSuccess();
        return updatedItems;
      });
    },
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "cart",
          JSON.stringify(cartItems.filter((item) => item.id !== productId))
        );
      }
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );

      // console.log("remove");
    },
    [cartItems]
  );

  // console.log(cartItems);

  const value = { cartItems, addToCart, removeFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
