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

export const removeProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  delete cookieCart[id];

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};
