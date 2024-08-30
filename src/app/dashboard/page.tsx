import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { WidgetItem } from '@/components';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/api/auth/signin');

  return (
    <div className='grid gap-6 grid-cols-1'>
      <WidgetItem title='User connected S-Side'>
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.id}</span>
          <span>{session.user?.roles}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
