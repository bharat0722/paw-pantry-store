<script lang="ts">
  import '../styles.css';
  import { onMount } from 'svelte';
  import { cart, cartCount } from '../lib/cart';

  let { children } = $props();
  onMount(() => cart.hydrate());
</script>

<svelte:head>
  <title>Paw Pantry — Everyday care for pets</title>
  <meta name="description" content="Simple, dependable food, treats, grooming and walking essentials for dogs and cats." />
</svelte:head>

<header class="site-header">
  <div class="announcement">Free delivery above ₹999 · Easy 7-day returns</div>
  <nav class="nav shell" aria-label="Main navigation">
    <a class="brand" href="/" aria-label="Paw Pantry home"><span class="brand-mark">P</span><span>Paw Pantry</span></a>
    <div class="nav-links"><a href="/#shop">Shop</a><a href="/#why">Why us</a><a href="/#help">Help</a></div>
    <a class="cart-link" href="/checkout" aria-label={`Cart with ${$cartCount} items`}>Cart <span>{$cartCount}</span></a>
  </nav>
</header>

<main>{@render children()}</main>

<footer id="help">
  <div class="shell footer-grid">
    <div><a class="brand light" href="/"><span class="brand-mark">P</span><span>Paw Pantry</span></a><p>Good pet care, made refreshingly simple.</p></div>
    <div><strong>Need help?</strong><p>hello@pawpantry.example<br />Mon–Sat, 9am–6pm</p></div>
    <div><strong>Store</strong><p>Shipping & returns<br />Ingredient guide<br />Privacy</p></div>
  </div>
  <div class="shell copyright">© 2026 Paw Pantry · Demo storefront — no real payments are processed.</div>
</footer>
