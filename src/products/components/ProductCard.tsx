'use client';

import Image from 'next/image';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import { addProductToCart, removeProductToCart } from '@/shopping-cart/actions/actions';
import { Star } from '../../components/ui/Star';

export interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({ id, name, price, rating, image }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  };

  const onRemoveToCart = () => {
    removeProductToCart(id);
    router.refresh();
  };

  return (
    <div className='shadow rounded-lg max-w-sm bg-gray-800 border-gray-100'>
      <div className='p-2'>
        <Image width={500} height={500} className='rounded' src={image} alt='product image' />
      </div>

      <div className='px-5 pb-5'>
        <a href='#'>
          <h3 className=' font-semibold text-xl tracking-tight text-white'>{name}</h3>
        </a>
        <div className='flex items-center mt-2.5 mb-5'>
          <Star stars={rating} />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-1xl font-bold  text-white'>${price?.toFixed(2)}</span>

          <div className='flex'>
            <button
              className='text-white mr-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
              onClick={onAddToCart}
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button
              className='text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800'
              onClick={onRemoveToCart}
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
