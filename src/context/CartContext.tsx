"use client";

import React, { createContext, useEffect, useState } from "react";
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
  addProductToCart: (id: string) => Promise<any>;
  removeCartItem: (id: string) => Promise<any>;
  updateCart: (id: string, count: number) => Promise<any>;
  clearCart: () => Promise<any>;
  afterPayment: () => void;
}


export const cartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  totalCartPrice: 0,
  isLoading: false,
  cartId: "",
  products: [],
  addProductToCart: async () => {},
  removeCartItem: async () => {},
  updateCart: async () => {},
  clearCart: async () => {},
  afterPayment: () => {},
});


const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  const [products, setProducts] = useState<ProductCart[]>([]);

  async function addProductToCart(id: string) {
    try {
      const data = await addToCartAction(id);
      await getUserCart();
      return data;
    } catch (error) {
      console.error("Add product error:", error);
    }
  }


  async function removeCartItem(id: string) {
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


  async function updateCart(id: string, count: number) {
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

  async function clearCart() {
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
    setIsLoading(true);
    try {
      const data: Cart = await getUserCartAction();
      setNumOfCartItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartId(data.cartId);
    } catch (error) {
      console.error("Get cart error:", error);
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
    getUserCart();
  }, []);

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
