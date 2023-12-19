import React, { useEffect, useState } from 'react';
import CardProduct from '../fragment/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, productSelector } from '../slice/ProductSlice';
import {  removeCart, increaseCart, decreaseCart, clearCart } from '../slice/CartSlice';
import { FiTrash2 } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector(productSelector.selectAll);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleRemove = (itemId) => {
    // Memastikan dispatch removeCart tanpa payload
    dispatch(removeCart(itemId));
  };

  const handleIncrease = (itemId) => {
    dispatch(increaseCart(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseCart(itemId));
  };
  const handleClear = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
  const amount = cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);
  return (
    <section className="flex">
      <div className="w-4/6 p-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3  lg:grid-cols-3 gap-y-5 xs:grid-cols-1  mx-auto">
          {product.map((item) => (
            <CardProduct key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="w-2/6 relative">
        <h1 className="fixed text-4xl font-semibold">CART ({amount})</h1>
        <div className="flex flex-col fixed h-[500px] w-[500px] top-20 overflow-y-auto overflow-x-hidden border-b">
          {cartItems.map((item) => (
            <div key={item.id} className="text-center border p-10 relative ">
              <div>{item.title}</div>
              <div>{item.price}</div>
              <div>
                <div className="flex">
                  <button className="w-[50px] border" onClick={() => handleDecrease(item.id)}>
                    -
                  </button>

                  <div className="w-[50px] border">{item.qty}</div>
                  <button className="w-[50px] border" onClick={() => handleIncrease(item.id)}>
                    +
                  </button>
                </div>
                <button className="w-[50px] absolute top-2 right-2" onClick={() => handleRemove(item.id)}>
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-52 flex justify-between w-[500px]">
          <div className=" text-3xl">TOTAL :{total}</div>
          <button onClick={handleClear}>
            <FiTrash2 className="text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
