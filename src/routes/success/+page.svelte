<script lang="ts">
  import { page } from '$app/state';
  import { money } from '../../lib/products';
  const order = $derived(page.url.searchParams.get('order') || 'PP000000');
  const total = $derived(Number(page.url.searchParams.get('total')) || 0);
</script>

<svelte:head><title>Order confirmed — Paw Pantry</title></svelte:head>
<section class="success-page shell"><div class="success-card"><span class="success-icon">✓</span><span class="eyebrow">Order confirmed</span><h1>Your pet’s parcel is being prepared.</h1><p>Thanks for your order. A confirmation would normally be sent by email, and you can expect delivery in 3–5 business days.</p><div class="order-ticket"><div><small>Order number</small><strong>{order}</strong></div><div><small>Order total</small><strong>{money(total)}</strong></div><div><small>Payment</small><strong>Cash on delivery</strong></div></div><a class="button primary" href="/#shop">Continue shopping</a><small class="demo-note">Demo only — no order was transmitted or charged.</small></div></section>
