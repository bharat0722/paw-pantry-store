export type Product = {
  id: string;
  name: string;
  category: 'Food' | 'Treats' | 'Grooming' | 'Walk';
  pet: 'Dog' | 'Cat';
  price: number;
  rating: number;
  reviews: number;
  icon: string;
  color: string;
  description: string;
  badge?: string;
};

export const products: Product[] = [
  { id: 'dog-dinner', name: 'Everyday Dog Dinner', category: 'Food', pet: 'Dog', price: 899, rating: 4.8, reviews: 126, icon: '🥣', color: '#F2C879', description: 'Balanced chicken, brown rice and garden vegetables for adult dogs.', badge: 'Bestseller' },
  { id: 'cat-crunch', name: 'Indoor Cat Crunch', category: 'Food', pet: 'Cat', price: 749, rating: 4.7, reviews: 93, icon: '🐟', color: '#9DCBC3', description: 'Protein-rich ocean fish recipe made for happy indoor cats.' },
  { id: 'calm-bites', name: 'Calming Bedtime Bites', category: 'Treats', pet: 'Dog', price: 349, rating: 4.6, reviews: 58, icon: '🌙', color: '#BDB4DB', description: 'Soft pumpkin and chamomile bites for quiet evening routines.', badge: 'New' },
  { id: 'salmon-nibbles', name: 'Salmon Mini Nibbles', category: 'Treats', pet: 'Cat', price: 299, rating: 4.9, reviews: 74, icon: '🐾', color: '#F2AAA0', description: 'Tiny freeze-dried salmon rewards with one simple ingredient.' },
  { id: 'gentle-shampoo', name: 'Oat & Aloe Shampoo', category: 'Grooming', pet: 'Dog', price: 449, rating: 4.5, reviews: 41, icon: '🫧', color: '#A9CAE8', description: 'A soap-free wash for fresh coats and sensitive skin.' },
  { id: 'paw-balm', name: 'All-Weather Paw Balm', category: 'Grooming', pet: 'Dog', price: 279, rating: 4.8, reviews: 87, icon: '🌿', color: '#B8D095', description: 'A lick-safe balm that protects dry paws and noses.' },
  { id: 'rope-leash', name: 'Everyday Rope Leash', category: 'Walk', pet: 'Dog', price: 649, rating: 4.7, reviews: 66, icon: '🦮', color: '#EDB885', description: 'A soft-grip 1.5 metre leash with a secure swivel clip.' },
  { id: 'cat-brush', name: 'Cloud Soft Cat Brush', category: 'Grooming', pet: 'Cat', price: 399, rating: 4.6, reviews: 52, icon: '☁️', color: '#D7C3A8', description: 'Rounded pins lift loose fur without tugging delicate skin.' }
];

export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;
