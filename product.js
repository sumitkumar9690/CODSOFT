(async function getProductDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get("id");

	const url = `https://dummyjson.com/products/${productId}`;

	let res = await fetch(url);
	let product = await res.json();

	displaySingleProduct(product);
})();

function displaySingleProduct(product) {
	const container = document.getElementById("product-detail-container");

	container.innerHTML = `
        <div class="detail-card">
            
            <div class="detail-img-wrapper">
                <img src="${product.thumbnail}" alt="${product.title}" class="detail-img">
            </div>
            
            <div class="detail-info">
                <span class="detail-meta">
                    ${product.category} | ${product.brand || "Generic"}
                </span>
                
                <h2 class="detail-title">${product.title}</h2>
                
                <div class="detail-badge-row">
                    <span class="discount-badge">${product.discountPercentage}% OFF</span>
                    <span class="rating-text">Rating:${product.rating} / 5</span>
                </div>

                <hr class="detail-divider">

                <h3 class="detail-price">$${product.price.toFixed(2)}</h3>
                
                <p class="detail-desc">${product.description}</p>
                
                <p class="detail-stock">
                    Availability Status: 
                    <strong>
                        ${product.availabilityStatus} (${product.stock} units left)
                    </strong>
                </p>
                
                <p class="detail-warranty">
                    Warranty: ${product.warrantyInformation} | Shipping: ${product.shippingInformation}
                </p>

                <button id="add-to-cart-btn" class="view-btn detail-btn">
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    `;

	document.getElementById("add-to-cart-btn").addEventListener("click", () => {
		let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
		const existingItem = cart.find((item) => item.id === product.id);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({
				id: product.id,
				title: product.title,
				price: product.price,
				discountPercentage: product.discountPercentage,
				thumbnail: product.thumbnail,
				quantity: 1,
			});
		}
		localStorage.setItem("shoppingCart", JSON.stringify(cart));
		alert(`${product.title} has been added to your cart!`);
	});
}
