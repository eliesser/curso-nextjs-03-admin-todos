import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import { CiLogout } from 'react-icons/ci';
import {
  IoBasketOutline,
  IoCalculatorOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';

import { SidebarItem } from './SidebarItem';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const sidebarItems = [
  {
    href: '/dashboard',
    icon: <IoCalculatorOutline size={30} />,
    label: 'Dashboard',
  },
  {
    href: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />,
    label: 'Rest TODOS',
  },
  {
    href: '/dashboard/server-actions',
    icon: <IoListOutline size={30} />,
    label: 'Server Actions',
  },
  {
    href: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline size={30} />,
    label: 'Cookies',
  },
  {
    href: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    label: 'Products',
  },
  {
    href: '/dashboard/profile',
    icon: <IoPersonOutline size={30} />,
    label: 'Profile',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/api/auth/signin');

  const userName = session?.user?.name ?? '';
  const userImage =
    session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg';

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='dashboard/main' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              className='w-32'
              alt='tailus logo'
              width={128}
              height={128}
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={userImage}
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            width={112}
            height={112}
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>{userName}</h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {sidebarItems.map((sidebarItem) => (
            <SidebarItem key={sidebarItem.href} {...sidebarItem} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
          <CiLogout />
          <span className='group-hover:text-gray-700'>Logout</span>
        </button>
      </div>
    </aside>
  );
};
