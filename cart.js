document.addEventListener("DOMContentLoaded", () => {
	renderCart();
	initQuantityControls();
});

function renderCart() {
	const listContainer = document.getElementById("cart-items-list");
	let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

	if (cart.length === 0) {
		listContainer.innerHTML = `
            <div class="empty-cart-msg">
                <h2>Your cart is empty</h2>
                <p>Add some products from the shop to view your receipt breakdown.</p>
                <a href="index.html" class="view-btn back-shop-btn">Browse Shop</a>
            </div>
        `;
		calculateBillTotals(0, 0);
		return;
	}

	listContainer.innerHTML = "";
	let calculatedSubtotal = 0;
	let calculatedDiscountSavings = 0;

	cart.forEach((item) => {
		const rowCost = item.price * item.quantity;
		const rowDiscount = rowCost * (item.discountPercentage / 100);

		calculatedSubtotal += rowCost;
		calculatedDiscountSavings += rowDiscount;

		const cartItemRow = document.createElement("div");
		cartItemRow.classList.add("cart-item-row");

		cartItemRow.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-img">
            
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-meta">Price: $${item.price.toFixed(2)}</p>
                
                <div class="quantity-controller">
                    <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
            
            <div class="cart-item-pricing">
                <span class="cart-item-total-price">$${rowCost.toFixed(2)}</span>
            </div>
        `;

		listContainer.appendChild(cartItemRow);
	});

	calculateBillTotals(calculatedSubtotal, calculatedDiscountSavings);
}

function calculateBillTotals(subtotal, totalDiscount) {
	const finalBillAmount = subtotal - totalDiscount;

	document.getElementById("subtotal-val").innerText = `$${subtotal.toFixed(2)}`;
	document.getElementById("discount-val").innerText =
		`-$${totalDiscount.toFixed(2)}`;
	document.getElementById("total-val").innerText =
		`$${finalBillAmount.toFixed(2)}`;
}

function initQuantityControls() {
	const listContainer = document.getElementById("cart-items-list");

	listContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("qty-btn")) {
			const productId = Number(e.target.getAttribute("data-id"));
			const action = e.target.getAttribute("data-action");

			handleQuantityChange(productId, action);
		}
	});
}

function handleQuantityChange(id, action) {
	let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
	const itemIndex = cart.findIndex((item) => item.id === id);

	if (itemIndex > -1) {
		if (action === "increase") {
			cart[itemIndex].quantity += 1;
		} else if (action === "decrease") {
			cart[itemIndex].quantity -= 1;

			if (cart[itemIndex].quantity <= 0) {
				cart.splice(itemIndex, 1);
			}
		}
		localStorage.setItem("shoppingCart", JSON.stringify(cart));
		renderCart();
	}
}
