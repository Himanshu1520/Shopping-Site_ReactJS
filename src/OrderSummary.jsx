import React, { useState, useEffect} from 'react'

export const OrderSummary = () => {
  const cartItems= JSON.parse(localStorage.getItem("cart"))
  const [totalAmount,setTotalAmount]=useState(0);


  useEffect(()=>{
    const total=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    setTotalAmount(total)
  },[cartItems])

  return (
    <div className='space-y-4'>
      <div className='m-3'>
        
    <strong className='text-2xl '>Order Summary</strong>
      </div>
<div className="relative overflow-x-auto sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity*Item price
                </th>
                <th scope="col" className="px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>


        {cartItems.map((item,index)=>(
          <tbody key={item.id}>
          <tr className=" border-b dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              {index+1}. {item.name}
              </th>
              <td className="px-6 py-4 ">
                {item.quantity}*{item.price}
              </td>
              <td className="px-6 py-4">

                <strong>
                {item.price*item.quantity}
                </strong>
              
              </td>
          </tr>
          
          
      </tbody>
        ))}

       
        



    </table>

    <div className='flex justify-between mt-3'>
          <strong className='ml-5'>Subtotal</strong>
          <strong className='mr-18'>Rs. {totalAmount}</strong>
        </div>

    <p></p>
</div>

    </div>
  )
}
