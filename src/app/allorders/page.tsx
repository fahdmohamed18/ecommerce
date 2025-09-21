import { getUserOrder } from '@/apis/getUserOrder'
import { CartItem, Order, Orders } from '@/types/order.type'
import Image from 'next/image'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString()
const shortId = (id: string) => `#${id.slice(-6).toUpperCase()}`
const itemsCount = (order: Order) => order.cartItems.reduce((sum, it) => sum + (it.count ?? 1), 0)

const AllOrders = async () => {
  const data: Orders = await getUserOrder()

  if (!data || data.length === 0) {
    return (
      <div className='md:w-[80%] mx-auto w-full my-16 px-5 md:px-0'>
        <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center'>
          <h2 className='text-2xl font-semibold mb-2'>No orders yet</h2>
          <p className='text-slate-600'>You haven't placed any orders. Start exploring products and your orders will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Your Orders</h1>

      <div className='space-y-6'>
        {data.map((order: Order) => (
          <div key={order._id} className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-slate-200'>
              <div>
                <p className='text-sm text-slate-500'>Order</p>
                <p className='font-semibold'>{shortId(order._id)} • {formatDate(order.createdAt)}</p>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge className={order.isPaid ? 'bg-green-600' : 'bg-amber-600'}>{order.isPaid ? 'Paid' : 'Unpaid'}</Badge>
                <Badge className={order.isDelivered ? 'bg-blue-600' : 'bg-slate-500'}>{order.isDelivered ? 'Delivered' : 'Processing'}</Badge>
                <Badge variant='secondary' className='text-slate-700'>{order.paymentMethodType.toUpperCase()}</Badge>
              </div>
            </div>

            {/* Items */}
            <div className='px-4 md:px-6 py-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {order.cartItems.map((item: CartItem) => (
                  <div key={item._id} className='flex gap-3 p-3 rounded-lg border border-slate-200 hover:shadow-sm transition bg-slate-50'>
                    <Link href={`/productDetails/${item.product._id}`} className='shrink-0'>
                      <Image src={item.product.imageCover} alt={item.product.title} width={96} height={96} className='h-24 w-24 object-cover rounded-md' />
                    </Link>
                    <div className='min-w-0'>
                      <Link href={`/productDetails/${item.product._id}`} className='block font-medium text-slate-900 hover:text-green-600 truncate'>
                        {item.product.title}
                      </Link>
                      <p className='text-slate-600 text-sm mt-1'>Qty: {item.count} • Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer summary */}
            <div className='px-4 md:px-6 py-4 bg-slate-50 border-t border-slate-200'>
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
                <div className='text-slate-700'>
                  <p><span className='font-medium'>Items:</span> {itemsCount(order)}</p>
                  <p className='text-sm text-slate-500'>Ship to: {order.shippingAddress?.city} • {order.shippingAddress?.phone}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-slate-600'>Tax: {order.taxPrice ?? 0} EGP • Shipping: {order.shippingPrice ?? 0} EGP</p>
                  <p className='text-lg font-semibold'>Total: {order.totalOrderPrice} EGP</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllOrders