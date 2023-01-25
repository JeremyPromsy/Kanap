let productLocalStorage = localStorage.getItem("panier");
let objJson = JSON.parse(productLocalStorage);

const cartItems = document.getElementById("cart__items");