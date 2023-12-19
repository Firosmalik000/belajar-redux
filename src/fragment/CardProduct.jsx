import { Link } from 'react-router-dom';
import { addToCart } from '../slice/CartSlice';
import { useDispatch } from 'react-redux';

const CardProduct = ({ item }) => {
  const dispatch = useDispatch();
  if (!item) {
    return <div>No data available</div>;
  }
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  console.log();
  return (
    <section className="card hover:scale-110 transition h-[430px] duration-200 hover:shadow-lg hover:shadow-slate-300 w-[300px] border border-slate-300 relative">
      <Link to={`/${item.id}`}>
        <img src={item.image} alt="" className="h-[200px] mx-auto p-5" />
      </Link>
      <p className="text-center text-xl font-bold">{item.title}</p>
      <p className="text-center">{item.price}</p>
      <div className="mx-auto flex justify-center">
        <button className="w-[150px] py-3  flex items-center justify-center my-3 hover:bg-blue-800 transition duration-300 rounded-[20px]  bg-blue-500 text-white absolute bottom-2 " onClick={() => handleAddToCart(item)}>
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default CardProduct;
