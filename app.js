import { menuArray } from "./menu.js";

let feedHtml = ``;
const orderArray = [];
const cart = document.getElementById("cart");
const modal = document.getElementById("modal");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  }
  if (e.target.id === "order-button") {
    handleOrderClick(e.target.id);
  }
  if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
});

// =================== Render Menu  ============================= //

function getFeedHtml() {
  menuArray.forEach(function (item) {
    feedHtml += `
        <div class="menu-card">
        <div class="menu-head">
            <img src="${item.image}" class="image">
            <div class="menu-detail">
                <p class="item-name">${item.name}</p> 
                <p class="description">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
        </div>
        <button id="add-button" class="add-button" data-add="${item.id}">+</button>
        </div>
      <hr/>  
      `;
  });
  return feedHtml;
}

document.getElementById("menu").innerHTML = getFeedHtml();

// =================== Render Orders  ============================= //

function handleAddClick(menuId) {
  const objClicked = menuArray.filter(function (menuItem) {
    return menuItem.id === Number(menuId);
  })[0];
  addOrderItem(objClicked);
}

function addOrderItem(orderItem) {
  orderArray.push(orderItem);
  renderOrder();
}

function renderOrder() {
  let orderHtml = `<div class="cart-head">
          <h3>Your Order</h3>
        </div>
  `;

  let totalPrice = 0;

  orderArray.forEach(function (order) {
    totalPrice += order.price;
    orderHtml += `
     <div class="cart-body">
     <p class="item-name">${order.name} <button data-remove="${order.id}" class="remove-btn">remove</button></p>
         <p class="price">$${order.price}</p>
      </div>`;
  });

  orderHtml += `
    <hr class="black"/>
    <div class="total-price">
    <div class="total">Total Price:
    </div>
    <div>${totalPrice}</div>
    </div>
    <button id="order-button" class="order-button">Complete Order</button>`;
  cart.innerHTML = orderHtml;
}

// =================== Remove Orders  ============================= //

function handleRemoveClick(itemId) {
  const itemIndex = orderArray.findIndex((item) => item.id === Number(itemId));
  if (itemIndex > -1) {
    orderArray.splice(itemIndex, 1);
  }
  renderOrder();
}

// =================== Checkout  ============================= //

function handleOrderClick() {
  modal.classList.remove("hidden");
}

const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.classList.add("hidden");
  cart.classList.add("hidden");
  message.classList.remove("hidden");
  let greetingName = document.getElementById("user-name");
  if (greetingName) {
    message.innerHTML = `Thanks, ${greetingName.value}! Your order is on its way!`;
  } else {
    console.error("Please Enter Your Name");
  }
});
