<script lang="ts">
  import { onMount } from 'svelte';
  import { products, money, type Product } from '../lib/products';
  import { cart } from '../lib/cart';

  let query = $state('');
  let category = $state('All');
  let pet = $state('All');
  let sort = $state('featured');
  let selected = $state<Product | null>(null);
  let toast = $state('');

  const categories = ['All', 'Food', 'Treats', 'Grooming', 'Walk'];
  let filtered = $derived(products
    .filter((p) => (category === 'All' || p.category === category) && (pet === 'All' || p.pet === pet) && p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : 0));

  function add(product: Product, quantity = 1) {
    cart.add(product, quantity);
    toast = `${product.name} added to cart`;
    setTimeout(() => toast = '', 2200);
  }

  onMount(() => {
    const registry = (document as Document & { modelContext?: { registerTool: (tool: object, options?: object) => unknown } }).modelContext;
    if (!registry?.registerTool) return;
    const controller = new AbortController();
    const register = (tool: object) => { try { void Promise.resolve(registry.registerTool(tool, { signal: controller.signal })); } catch {} };
    register({ name: 'search_products', description: 'Search and filter the Paw Pantry product catalog.', inputSchema: { type: 'object', properties: { query: { type: 'string' }, pet: { type: 'string', enum: ['All', 'Dog', 'Cat'] }, category: { type: 'string', enum: categories } }, additionalProperties: false }, execute: (input: unknown) => { const value = (input && typeof input === 'object' ? input : {}) as { query?: string; pet?: string; category?: string }; query = value.query || ''; pet = value.pet || 'All'; category = value.category || 'All'; return filtered.map(({ id, name, price, pet, category }) => ({ id, name, price, pet, category })); } });
    register({ name: 'add_product_to_cart', description: 'Add a known catalog product to the shopping cart.', inputSchema: { type: 'object', properties: { product_id: { type: 'string' }, quantity: { type: 'integer', minimum: 1, maximum: 10 } }, required: ['product_id'], additionalProperties: false }, execute: (input: unknown) => { const value = input as { product_id?: string; quantity?: number }; const product = products.find((p) => p.id === value?.product_id); if (!product) throw new Error('Unknown product_id'); const quantity = Math.max(1, Math.min(10, Number(value.quantity) || 1)); add(product, quantity); return { added: product.id, quantity }; } });
    return () => controller.abort();
  });
</script>

{#if toast}<div class="toast" role="status">✓ {toast}</div>{/if}

<section class="hero shell">
  <div class="hero-copy"><span class="eyebrow">Simple care. Happier pets.</span><h1>Everyday essentials for your favourite roommate.</h1><p>Honest food, useful treats and thoughtful care products for dogs and cats—without the confusing shelf.</p><a class="button primary" href="#shop">Shop all essentials</a></div>
  <div class="hero-art" aria-label="Illustration of a dog and cat with pet supplies"><div class="sun"></div><span class="pet dog">🐕</span><span class="pet cat">🐈</span><span class="bowl">🥣</span><div class="ground"></div></div>
</section>

<section class="benefits" id="why"><div class="shell benefit-grid"><div><span>✓</span><strong>Clear ingredients</strong><small>No mystery labels</small></div><div><span>♻</span><strong>Mindful packaging</strong><small>Less waste, more care</small></div><div><span>↺</span><strong>Easy returns</strong><small>7 days, no fuss</small></div><div><span>♡</span><strong>Pet-parent support</strong><small>Helpful humans on chat</small></div></div></section>

<section class="shop shell" id="shop">
  <div class="section-heading"><div><span class="eyebrow">The daily shelf</span><h2>Shop pet essentials</h2></div><p>Practical picks for mealtimes, walks, bath days and all the small moments between.</p></div>
  <div class="toolbar">
    <label class="search"><span>⌕</span><input bind:value={query} placeholder="Search products" aria-label="Search products" /></label>
    <div class="pet-toggle" aria-label="Filter by pet">{#each ['All', 'Dog', 'Cat'] as option}<button class:active={pet === option} onclick={() => pet = option}>{option}</button>{/each}</div>
    <label class="sort"><span class="sr-only">Sort products</span><select bind:value={sort}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></label>
  </div>
  <div class="category-row">{#each categories as option}<button class:active={category === option} onclick={() => category = option}>{option}</button>{/each}</div>
  <p class="result-count">{filtered.length} products</p>
  <div class="product-grid">
    {#each filtered as product}
      <article class="product-card">
        <button class="product-art" style={`--card-color:${product.color}`} onclick={() => selected = product} aria-label={`View ${product.name}`}><span>{product.icon}</span>{#if product.badge}<b>{product.badge}</b>{/if}</button>
        <div class="product-info"><small>{product.pet} · {product.category}</small><button class="title-button" onclick={() => selected = product}><h3>{product.name}</h3></button><div class="rating" aria-label={`${product.rating} out of 5 stars`}>★ {product.rating} <span>({product.reviews})</span></div><div class="product-bottom"><strong>{money(product.price)}</strong><button class="add" onclick={() => add(product)} aria-label={`Add ${product.name} to cart`}>Add</button></div></div>
      </article>
    {:else}<div class="empty"><span>🐾</span><h3>No products found</h3><p>Try another search or clear a filter.</p><button class="button secondary" onclick={() => { query=''; category='All'; pet='All'; }}>Clear filters</button></div>{/each}
  </div>
</section>

<section class="newsletter"><div class="shell newsletter-inner"><div><span class="eyebrow">Join the pack</span><h2>Useful tips, occasional treats.</h2><p>Get pet-care notes and ₹100 off your first order.</p></div><form onsubmit={(e) => { e.preventDefault(); toast = 'Welcome to the pack! Check your inbox.'; }}><label><span class="sr-only">Email address</span><input required type="email" placeholder="you@example.com" /></label><button class="button dark" type="submit">Sign me up</button></form></div></section>

{#if selected}
  <div class="modal-backdrop" role="presentation" onclick={(e) => e.currentTarget === e.target && (selected = null)}>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="product-title"><button class="close" onclick={() => selected = null} aria-label="Close">×</button><div class="modal-art" style={`--card-color:${selected.color}`}><span>{selected.icon}</span></div><div class="modal-copy"><small>{selected.pet} · {selected.category}</small><h2 id="product-title">{selected.name}</h2><div class="rating">★ {selected.rating} <span>({selected.reviews} reviews)</span></div><p>{selected.description}</p><ul><li>Thoughtfully sourced</li><li>Quality checked in small batches</li><li>Ships in 1–2 business days</li></ul><div class="modal-buy"><strong>{money(selected.price)}</strong><button class="button primary" onclick={() => { add(selected!); selected = null; }}>Add to cart</button></div></div></div>
  </div>
{/if}
