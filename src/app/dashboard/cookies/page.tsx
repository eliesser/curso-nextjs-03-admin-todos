import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { TabBar } from '@/components';

export const metadata: Metadata = {
  title: 'Cookies Page',
  description: 'Generated by create next app',
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const currentTab = Number(cookieStore.get('tabSelected')?.value ?? '1');

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
      <div className='flex flex-col'>
        <span className='text-3xl'>Tabs</span>
        <TabBar currentTab={currentTab} />
      </div>
    </div>
  );
}
