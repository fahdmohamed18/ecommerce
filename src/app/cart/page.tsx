"use client";
import { cartContext } from "@/context/CartContext";
import React, { useContext } from "react";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/types/cart.type";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

const Cart = () => {
  const {
    isLoading,
    products,
    totalCartPrice,
    removeCartItem,
    updateCart,
    clearCart,
  } = useContext(cartContext);

  async function removeItem(id: string) {
    const data = await removeCartItem(id);
    if (data?.status === "success") {
      toast.success("Item removed from cart", {
        position: "top-center",
        duration: 1000,
      });
    } else {
      toast.error("Failed to remove from cart", {
        position: "top-center",
        duration: 1000,
      });
    }
  }

  async function updateCartItem(id: string, count: number) {
    const data = await updateCart(id, count);
    if (data?.status === "success") {
      toast.success("Item updated in cart", {
        position: "top-center",
        duration: 1000,
      });
    } else {
      toast.error("Failed to update cart", {
        position: "top-center",
        duration: 1000,
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="text-red-600 text-3xl font-bold">No items in cart</i>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5 ">
        <h1 className="text-2xl font-bold">Shop Cart</h1>
        <p className="my-3 text-green-500 font-mono">
          Total Price : {totalCartPrice} EGP
        </p>
        <Button className="mb-10" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button className="mb-10 ms-5">
          <Link href={"/payment"}>Payment</Link>
        </Button>

        <div className="allProducts">
          {products.map((product: ProductCart, idx: number) => (
            <div
              className="flex items-center justify-between py-3 border-b-[1px] border-green-700/35"
              key={idx}
            >
              <div className="flex items-center gap-5">
                <div>
                  <Image
                    width={200}
                    height={200}
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                </div>

                <div>
                  <h2>{product.product.title}</h2>
                  <p className="my-3 text-green-600 ">
                    Price : {product.price} EGP
                  </p>
                  <Button onClick={() => removeItem(product.product._id)}>
                    Remove
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    updateCartItem(product.product._id, product.count + 1)
                  }
                >
                  +
                </Button>
                <p>{product.count}</p>
                <Button
                  onClick={() =>
                    updateCartItem(product.product._id, product.count - 1)
                  }
                >
                  -
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
