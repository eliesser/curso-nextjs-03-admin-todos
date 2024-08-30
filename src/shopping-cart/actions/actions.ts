// 'use client';

import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): { [id: string]: number } => {
  if (!hasCookie('cart')) return {};

  const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}');

  return cookieCart;
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) cookieCart[id] += 1;
  else cookieCart[id] = 1;

  setCookie('cart', JSON.stringify(cookieCart));
};
