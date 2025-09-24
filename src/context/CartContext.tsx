"use client";

import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserCartAction } from "@/cartAction/getUserCart";
import { addToCartAction } from "@/cartAction/addToCart";
import { removeCartItemAction } from "@/cartAction/removeCartItem";
import { updateCartAction } from "@/cartAction/updateCart";
import { clearCartAction } from "@/cartAction/clearCart";

import { Cart, ProductCart } from "@/types/cart.type";

interface CartContextType {
  numOfCartItems: number;
  totalCartPrice: number;
  isLoading: boolean;
  cartId: string;
  products: ProductCart[];
  addProductToCart: (id: string) => Promise<Cart | undefined>;
  removeCartItem: (id: string) => Promise<Cart | undefined>;
  updateCart: (id: string, count: number) => Promise<Cart | undefined>;
  clearCart: () => Promise<void>;
  afterPayment: () => void;
}

export const cartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  totalCartPrice: 0,
  isLoading: false,
  cartId: "",
  products: [],
  addProductToCart: async () => undefined,
  removeCartItem: async () => undefined,
  updateCart: async () => undefined,
  clearCart: async () => {},
  afterPayment: () => {},
});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  const [products, setProducts] = useState<ProductCart[]>([]);

  async function addProductToCart(id: string): Promise<Cart | undefined> {
    if (!session?.user?.token) {
      console.log("User not authenticated");
      return undefined;
    }

    try {
      const data: any = await addToCartAction(id);
      if (data?.status === 'error') {
        console.error("Add to cart error:", data.message);
        return undefined;
      }
      await getUserCart();
      return data;
    } catch (error) {
      console.error("Add product error:", error);
      return undefined;
    }
  }

  async function removeCartItem(id: string): Promise<Cart | undefined> {
    try {
      const data: Cart = await removeCartItemAction(id);
      setNumOfCartItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.error("Remove item error:", error);
    }
  }

  async function updateCart(id: string, count: number): Promise<Cart | undefined> {
    try {
      const data: Cart = await updateCartAction(id, count);
      setNumOfCartItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.error("Update cart error:", error);
    }
  }

  async function clearCart(): Promise<void> {
    try {
      await clearCartAction();
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      setCartId("");
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  }

  async function getUserCart() {
    if (!session?.user?.token) {
      return;
    }
    
    setIsLoading(true);
    try {
      const data: Cart = await getUserCartAction();
      if (data.status === 'error') {
        // Handle error response
        setNumOfCartItems(0);
        setProducts([]);
        setTotalCartPrice(0);
        setCartId("");
      } else {
        setNumOfCartItems(data.numOfCartItems);
        setProducts(data.data.products);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartId(data.cartId);
      }
    } catch (error) {
      console.error("Get cart error:", error);
      // Reset cart state on error
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      setCartId("");
    } finally {
      setIsLoading(false);
    }
  }

  function afterPayment() {
    setCartId("");
    setNumOfCartItems(0);
    setProducts([]);
    setTotalCartPrice(0);
  }

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.token) {
      getUserCart();
    } else if (status === 'unauthenticated') {
      // Clear cart when user logs out
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      setCartId("");
    }
  }, [status, session]);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        isLoading,
        numOfCartItems,
        products,
        totalCartPrice,
        removeCartItem,
        updateCart,
        clearCart,
        cartId,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
