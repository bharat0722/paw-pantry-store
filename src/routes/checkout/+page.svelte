<script lang="ts">
  import { goto } from '$app/navigation';
  import { cart, cartSubtotal } from '../../lib/cart';
  import { money } from '../../lib/products';
  import { onMount } from 'svelte';

  let step = $state(1);
  let discount = $state(0);
  let code = $state('');
  let promoMessage = $state('');
  let processing = $state(false);
  let form = $state({ email: '', name: '', phone: '', address: '', city: '', state: '', pincode: '', payment: 'cod' });
  let shipping = $derived($cartSubtotal >= 999 ? 0 : 79);
  let total = $derived(Math.max(0, $cartSubtotal - discount + shipping));

  onMount(() => cart.hydrate());
  function applyPromo() { if (code.trim().toUpperCase() === 'WELCOME10') { discount = Math.round($cartSubtotal * .1); promoMessage = '10% discount applied'; } else { discount = 0; promoMessage = 'That code is not valid'; } }
  function next(e: SubmitEvent) { e.preventDefault(); step = 2; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  async function placeOrder() { processing = true; const orderTotal = total; await new Promise((r) => setTimeout(r, 650)); const order = `PP${Date.now().toString().slice(-6)}`; cart.clear(); await goto(`/success?order=${order}&total=${orderTotal}`); }
</script>

<svelte:head><title>Checkout — Paw Pantry</title></svelte:head>

<section class="checkout shell">
  <a class="back" href="/">← Continue shopping</a>
  <div class="checkout-heading"><div><span class="eyebrow">Secure demo checkout</span><h1>{step === 1 ? 'Delivery details' : 'Review your order'}</h1></div><div class="steps"><span class:active={step >= 1}>1 <b>Delivery</b></span><i></i><span class:active={step >= 2}>2 <b>Review</b></span></div></div>
  {#if $cart.length === 0}
    <div class="empty cart-empty"><span>🛒</span><h2>Your cart is empty</h2><p>Add a few essentials before checking out.</p><a class="button primary" href="/#shop">Browse products</a></div>
  {:else}
    <div class="checkout-grid">
      <div class="checkout-main">
        {#if step === 1}
          <form class="delivery-form" onsubmit={next}>
            <div class="form-section"><h2>Contact</h2><label class="wide">Email address<input required type="email" bind:value={form.email} autocomplete="email" /></label><label>Full name<input required bind:value={form.name} autocomplete="name" /></label><label>Phone number<input required inputmode="numeric" minlength="10" maxlength="10" bind:value={form.phone} autocomplete="tel" /></label></div>
            <div class="form-section"><h2>Delivery address</h2><label class="wide">Street address<textarea required bind:value={form.address} autocomplete="street-address"></textarea></label><label>City<input required bind:value={form.city} autocomplete="address-level2" /></label><label>State<input required bind:value={form.state} autocomplete="address-level1" /></label><label>PIN code<input required inputmode="numeric" minlength="6" maxlength="6" bind:value={form.pincode} autocomplete="postal-code" /></label></div>
            <button class="button primary wide-button" type="submit">Continue to review</button>
          </form>
        {:else}
          <div class="review"><section><div class="review-title"><h2>Delivery to</h2><button onclick={() => step = 1}>Edit</button></div><p><strong>{form.name}</strong><br />{form.address}<br />{form.city}, {form.state} {form.pincode}<br />{form.phone} · {form.email}</p></section><section><h2>Payment</h2><label class="payment-option"><input type="radio" bind:group={form.payment} value="cod" /><span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span></label><label class="payment-option disabled"><input disabled type="radio" /><span><strong>Online payment</strong><small>Connect a payment gateway to enable</small></span></label></section><button class="button primary wide-button" disabled={processing} onclick={placeOrder}>{processing ? 'Placing order…' : `Place order · ${money(total)}`}</button><p class="demo-note">This is a demo checkout. No payment will be collected.</p></div>
        {/if}
      </div>
      <aside class="order-summary"><h2>Your order</h2>{#each $cart as item}<div class="summary-line"><div class="summary-art" style={`--card-color:${item.color}`}><span>{item.icon}</span><b>{item.quantity}</b></div><div><strong>{item.name}</strong><small>{money(item.price)} each</small><div class="quantity"><button onclick={() => cart.setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onclick={() => cart.setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button><button class="remove" onclick={() => cart.remove(item.id)}>Remove</button></div></div><b>{money(item.price * item.quantity)}</b></div>{/each}
        <div class="promo"><input bind:value={code} placeholder="Promo code" aria-label="Promo code" /><button onclick={applyPromo}>Apply</button></div>{#if promoMessage}<small class:success={discount > 0} class="promo-message">{promoMessage}</small>{/if}
        <dl><div><dt>Subtotal</dt><dd>{money($cartSubtotal)}</dd></div>{#if discount}<div class="success"><dt>Discount</dt><dd>−{money(discount)}</dd></div>{/if}<div><dt>Delivery</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div><div class="total"><dt>Total</dt><dd>{money(total)}</dd></div></dl>
      </aside>
    </div>
  {/if}
</section>
