"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cartContext } from '@/context/CartContext'
import { cashPaymentAction } from '@/PaymentActions/cashPayment'
import { onlinePaymentAction } from '@/PaymentActions/onlinePayment'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'
import { toast } from 'sonner'

const Payment = () => {
  const router = useRouter()
  const { cartId, afterPayment } = useContext(cartContext)

  const details = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value || "",
        phone: phone.current?.value || "",
        city: city.current?.value || "",
      },
    }

    try {
      const data = await cashPaymentAction(cartId, values)
      toast.success(data.status, {
        position: 'top-center',
        duration: 1000,
      })
      afterPayment()
      router.push('/allorders')
    } catch (error) {
      console.error(error)
      toast.error("Cash payment failed", {
        position: 'top-center',
        duration: 2000,
      })
    }
  }

  async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value || "",
        phone: phone.current?.value || "",
        city: city.current?.value || "",
      },
    }

    try {
      const data = await onlinePaymentAction(cartId, values)

      if (data.status === "success" && data.session?.url) {
        window.location.href = data.session.url
      } else {
        toast.error("Online payment failed", {
          position: 'top-center',
          duration: 2000,
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Online payment error", {
        position: 'top-center',
        duration: 2000,
      })
    }
  }

  return (
    <div className="w-full md:w-1/2 mx-auto my-10 px-5 md:px-0">
      <h1 className="mb-10 text-center text-3xl font-bold">Payment</h1>
      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" className="mb-5" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="tel" id="phone" placeholder="Phone Number" className="mb-5" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" placeholder="City" className="mb-5" />

        <div className="flex gap-4">
          <Button onClick={cashPayment}>Cash on Delivery</Button>
          <Button onClick={onlinePayment}>Pay with Card</Button>
        </div>
      </div>
    </div>
  )
}

export default Payment
