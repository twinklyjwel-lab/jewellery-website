// ============================================================
// Live stock from the Twinkly Jewels CRM.
//
// The CRM publishes in-stock pieces at CATALOGUE_URL (Inventory →
// Customer view → Show on my website). Only what the store chose to
// show there is sent: photo, price, name, category, purity, weight,
// tag code. Never buying rates. Turning the switch off in the CRM
// stops the link; paste the new link here if it is turned on again.
// ============================================================

const CATALOGUE_URL =
    'https://twinkly-crm-303805997822.asia-south1.run.app/api/public/catalogue/ksjWPAgYrmb-o4XdwyP_xUP6';

// Enquiries go to the store's WhatsApp.
const WHATSAPP_NUMBER = '919971331117';

const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const escapeHtml = (text) =>
    String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const slug = (text) => String(text || 'other').toLowerCase().replace(/[^a-z0-9]+/g, '-');

const pieceTitle = (item) => {
    if (item.name) return item.name;
    const metal = item.metal === 'gold' ? 'Gold' : 'Silver';
    return item.category ? `${metal} ${item.category}` : `${metal} jewellery`;
};

const enquiryLink = (item) => {
    const ref = item.sku ? ` (${item.sku})` : '';
    const text = `Hi Twinkly Jewels! I'm interested in ${pieceTitle(item)}${ref}. Is it available?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

const cardHtml = (item) => {
    const details = [
        item.purity ? (item.metal === 'gold' ? item.purity : `${item.purity} silver`) : null,
        item.weight ? `${item.weight.toLocaleString('en-IN', { maximumFractionDigits: 2 })} g` : null,
        item.sku ? `Code ${item.sku}` : null,
    ].filter(Boolean);
    const image = item.photo_url
        ? `<img src="${escapeHtml(item.photo_url)}" alt="${escapeHtml(pieceTitle(item))}" loading="lazy">`
        : item.metal === 'gold' ? '✨' : '💍';
    return `
        <div class="product-card product cat-${slug(item.category)}">
            <div class="product-image${item.photo_url ? ' has-photo' : ''}">${image}</div>
            <div class="product-info">
                <h3>${escapeHtml(pieceTitle(item))}</h3>
                ${item.price ? `<p class="product-price">${rupees.format(item.price)}</p>` : ''}
                ${details.length ? `<p class="product-description">${escapeHtml(details.join(' · '))}</p>` : ''}
                <a class="add-to-cart" href="${enquiryLink(item)}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
            </div>
        </div>`;
};

const showCategory = (category) => {
    document.querySelectorAll('#catalogue-grid .product-card').forEach((card) => {
        card.style.display = category === 'all' || card.classList.contains(`cat-${category}`) ? '' : 'none';
    });
    document.querySelectorAll('#catalogue-filters .filter-button').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
};

async function loadCatalogue() {
    const grid = document.getElementById('catalogue-grid');
    const status = document.getElementById('catalogue-status');
    const filters = document.getElementById('catalogue-filters');
    if (!grid) return;
    try {
        const res = await fetch(CATALOGUE_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { items } = await res.json();
        if (!items || items.length === 0) {
            status.textContent = 'New pieces are arriving soon. Message us on WhatsApp to see what is in store today.';
            return;
        }
        grid.innerHTML = items.map(cardHtml).join('');
        const categories = [...new Set(items.map((i) => i.category).filter(Boolean))].sort();
        filters.innerHTML =
            '<button class="filter-button active" data-category="all">All Products</button>' +
            categories
                .map((c) => `<button class="filter-button" data-category="${slug(c)}">${escapeHtml(c)}</button>`)
                .join('');
        filters.querySelectorAll('.filter-button').forEach((btn) =>
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showCategory(btn.dataset.category);
            })
        );
        status.textContent = '';
        status.hidden = true;
    } catch (err) {
        console.error('Catalogue failed to load:', err);
        status.textContent = 'Could not load our pieces just now. Please refresh, or message us on WhatsApp.';
    }
}

document.addEventListener('DOMContentLoaded', loadCatalogue);
