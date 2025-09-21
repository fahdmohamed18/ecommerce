"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cartContext } from '@/context/CartContext'
import { cashPaymentAction } from '@/PaymentActions/cashPayment'
import { onlinePaymentAction } from '@/PaymentActions/onlinePayment'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'
import { toast } from 'sonner'
import { ca, de } from 'zod/locales'

const Payment = () => {

    const router = useRouter()

    const { cartId  , afterPayment } = useContext(cartContext)
   
    const details = useRef()
    const phone = useRef()
    const city = useRef()

   async function cashPayment(){
        const values = {
        shippingAddress:{
        "details": details.current?.value,
        "phone": phone.current?.value,
        "city": city.current?.value
        }
}
        try {
            const data = await cashPaymentAction(cartId, values)
            console.log(cartId)
            console.log(data)

            toast.success(data.status , {
                position: 'top-center',
                duration: 1000
            })
            afterPayment()
            router.push('/allorders')
        } catch (error) {
            console.log(error)
        }
    }
   async function onlinePayment(){
        const values = {
        shippingAddress:{
        "details": details.current?.value,
        "phone": phone.current?.value,
        "city": city.current?.value
        }
}
        try {
            const data = await onlinePaymentAction(cartId, values)
            console.log(cartId)
            console.log(data)

            if(data.status === "success"){
                window.location.href = data.session.url
            }

            // toast.success(data.status , {
            //     position: 'top-center',
            //     duration: 1000
            // })
            // afterPayment()
            // router.push('/allorders')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full md:w-1/2 mx-auto my-10 px-5 md:px-0'>
        <h1 className='mb-10 text-center text-3xl font-bold'>Payment</h1>
        <div>
            <label htmlFor="details">Details</label>
            <Input ref={details} type="text" id='details' className='mb-5' />

            <label htmlFor="phone">Phone</label>
            <Input ref={phone} type="tel" id='phone' placeholder="Phone Number" className='mb-5' />

            <label htmlFor="city">City</label>
            <Input ref={city} type="text" id='city' placeholder="City" className='mb-5' />

            <Button onClick={cashPayment}>Cash on Delivery</Button>
            <Button onClick={onlinePayment} className='ms-5'>Pay with Card</Button>
        </div>
    </div>
  )
}

export default Payment