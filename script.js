(async function productListing() {
	let products = [];
	let url = "https://dummyjson.com/products?limit=194";
	let res = await fetch(url);
	let productData = await res.json();

	products = [...productData.products];

	displayProducts(products);

	ProductPageRedirect();
})();

function displayProducts(productsList) {
	const gridContainer = document.querySelector(".product-grid");

	gridContainer.innerHTML = "";

	productsList.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.classList.add("product-card");

		productCard.setAttribute("data-id", product.id);
		productCard.setAttribute("data-title", product.title);
		productCard.setAttribute("data-price", product.price);
		productCard.setAttribute("data-discount", product.discountPercentage);
		productCard.setAttribute("data-thumbnail", product.thumbnail);

		productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart">Add To Cart</button>
            </div>
        `;

		gridContainer.appendChild(productCard);
	});
}

function ProductPageRedirect() {
	const gridContainer = document.querySelector(".product-grid");

	gridContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("add-to-cart")) {
			const card = e.target.closest(".product-card");

			addToCartHandler(card);
			return;
		}

		const card = e.target.closest(".product-card");

		if (card) {
			const productId = card.getAttribute("data-id");
			window.location.href = `product.html?id=${productId}`;
		}
	});
}

function addToCartHandler(cardElement) {
	const id = Number(cardElement.getAttribute("data-id"));
	const title = cardElement.getAttribute("data-title");
	const price = Number(cardElement.getAttribute("data-price"));
	const discountPercentage = Number(cardElement.getAttribute("data-discount"));
	const thumbnail = cardElement.getAttribute("data-thumbnail");

	let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
	const existingItem = cart.find((item) => item.id === id);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cart.push({ id, title, price, discountPercentage, thumbnail, quantity: 1 });
	}

	localStorage.setItem("shoppingCart", JSON.stringify(cart));
	alert(`Added ${title} to cart`);
}
