import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailProduct, productSelector } from '../slice/ProductSlice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../slice/CartSlice';

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => productSelector.selectById(state, id));

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, [dispatch, id]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <div className="w-5/6 min-h-screen flex items-center p-10 mx-auto gap-x-10">
      <div className="w-1/2">
        <img src={productDetail.image} alt="" className="" />
      </div>
      <span className="w-1/2 relative">
        <h1 className="text-4xl">{productDetail.title}</h1>
        <h1>{productDetail.price}</h1>
        <h1>{productDetail.description}</h1>
        <p>({productDetail.rating.rate})</p>
      </span>
      <button onClick={() => handleAddToCart(productDetail)} className="w-[300px] px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 transition duration-200">
        Add To Cart
      </button>
    </div>
  );
};

export default DetailProduct;
