'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  icon: JSX.Element;
  label: string;
}

export const SidebarItem = ({ href, icon, label }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`${
          pathname === href ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''
        } relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-sky-600 hover:text-white`}
      >
        {icon}
        <span className='group-hover:text-white'>{label}</span>
      </Link>
    </li>
  );
};
