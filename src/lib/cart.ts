import { writable, derived } from 'svelte/store';
import type { Product } from './products';

export type CartLine = Product & { quantity: number };

function createCart() {
  const { subscribe, set, update } = writable<CartLine[]>([]);
  let hydrated = false;

  const persist = (items: CartLine[]) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('paw-pantry-cart', JSON.stringify(items));
    return items;
  };

  return {
    subscribe,
    hydrate() {
      if (hydrated || typeof localStorage === 'undefined') return;
      hydrated = true;
      try { set(JSON.parse(localStorage.getItem('paw-pantry-cart') || '[]')); } catch { set([]); }
    },
    add(product: Product, quantity = 1) {
      update((items) => persist(items.some((i) => i.id === product.id)
        ? items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...items, { ...product, quantity }]));
    },
    setQuantity(id: string, quantity: number) {
      update((items) => persist(quantity < 1 ? items.filter((i) => i.id !== id) : items.map((i) => i.id === id ? { ...i, quantity } : i)));
    },
    remove(id: string) { update((items) => persist(items.filter((i) => i.id !== id))); },
    clear() { set(persist([])); }
  };
}

export const cart = createCart();
export const cartCount = derived(cart, ($cart) => $cart.reduce((sum, item) => sum + item.quantity, 0));
export const cartSubtotal = derived(cart, ($cart) => $cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
