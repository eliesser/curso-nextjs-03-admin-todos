'use client';

import Image from 'next/image';

import { IoAddCircleOutline, IoRemove } from 'react-icons/io5';

import type { Product } from '@/products/data/products';
import { addProductToCart, removeSingleItemFromCart } from '../actions/actions';

import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(product.id);
    router.refresh();
  };

  const onRemoveItem = () => {
    removeSingleItemFromCart(product.id);
    router.refresh();
  };

  return (
    <div className='flex justify-between items-center shadow rounded-lg w-full bg-gray-800 border-gray-100 p-2 gap-2'>
      {/* Product Image */}
      <div className=''>
        <Image
          width={200}
          height={200}
          className='rounded'
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className='w-full flex flex-col'>
        <a href='#'>
          <h3 className='font-semibold text-xl tracking-tight text-white'>
            {product.name} - <small className='text-sm'>${product.price.toFixed(2)}</small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className='flex flex-col items-start justify-between'>
          <span className=' text-white'>Cantidad: {quantity}</span>
          <span className='font-bold text-white'>
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className='flex items-center justify-center gap-2'>
        <button
          onClick={onAddToCart}
          className='text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className='text-2xl text-white mx-10'>{quantity}</span>
        <button
          onClick={onRemoveItem}
          className='text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800'
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  );
};
