//Creation of the functional shopping cart
//Checking if the whole page has loaded before doing any JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//This function will start running once the entre website has finished loading
function ready() {
    let removeCartItemBtn = document.getElementsByClassName("remove-item");

    //Looping through all the remove buttons to remove cart items when a button is clicked on
    for (let i = 0; i < removeCartItemBtn.length; i++) {
        let button = removeCartItemBtn[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName("quantity-amount");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    let addToCartBtn = document.getElementsByClassName("addToCartBtn");
    for (let i = 0; i < addToCartBtn.length; i++) {
        let button = addToCartBtn[i];
        button.addEventListener("click", addToCartClicked);
    }
    couponApply();
}

//when the remove button is clicked
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}
//when the number input is changed
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}
//this will add the items to the cart
function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement;
    let productName = shopItem.getElementsByClassName("product-name")[0].innerText;
    let itemPrice = shopItem.getElementsByClassName("current-price")[0].innerText;
    let imgSrc = shopItem.getElementsByClassName("product-image")[0].src;
    addItemToCart(productName, itemPrice, imgSrc);
}

let cartItemContainer = document.getElementsByClassName("cartItems")[0];
//Function to add the details of the item with the button clicked on will show in the cart table
function addItemToCart(productName, itemPrice, imgSrc) {
    let cartRow = document.createElement("tr");
    cartRow.classList.add("cart-row");
    let cartRowContents = `
    <td class="item-info">
        <img src="${imgSrc}" alt="">
        <p>${productName}</p>
    </td>
    <td>
        <input type="number" class="quantity-amouname="quantity" min="1" value="1">
    </td>
    <td>
        <p class="price-sub">R${itemPrice}</p>
        <button class="remove-item">REMOVE</button>
    </td>`;
    cartRow.innerHTML = cartRowContents;
    alert("You have added " + productName + " to your cart. Which brings your total cart items to " + document.getElementsByClassName("cart-row").length);
    // Have no idea why this isn't working - keeps throwing back that cartItems is undefined!!
    cartItemContainer.append(cartRow);
    updateCartTotal();
}
//for when a coupon code is applied
function couponApply() {
    let code = document.getElementById("discountCode").value;
    let applyCouponBtn = document.getElementById("discountCodeBtn");
    let discountTotalContainer = document.getElementsByClassName("discount-amount")[0];
    let discountTotal = 0;
    let discountCodesTenPercent = ["CHG12", "DHY64", "JGP90"];
    let discountCodesfiftyPercent = ["SPC22", "XYZ45", "ADR21"];
    let subTotal = document.getElementsByClassName("subTotal-amount")[0].innerText;
    subTotal = parseFloat(subTotal.replace("R", ""));
    console.log(subTotal);

    applyCouponBtn.addEventListener('click', function () {
        //checking if it's a valid code
        for (let i = 0; i < discountCodesTenPercent.length; i++) {
            if (code == discountCodesTenPercent[i]) {
                discountTotal = subTotal * 0.1;
                discountTotalContainer.innerHTML = `Discounts:<span>R ${discountTotal}</span>`;
            } else if (code == discountCodesfiftyPercent[i]) {
                discountTotal = subTotal * 0.5;
                discountTotalContainer.innerHTML = `Discounts:<span>R ${discountTotal}</span>`;
            } else {
                discountTotal = 0;
                discountTotalContainer.innerHTML = `Discounts:<span>R ${discountTotal}</span>`;
            }
        }
    });
}
//for whichever delivery method is chosen
function deliveryMethod() {
    let collection = document.getElementById("collection");
    let standard = document.getElementById("standardShipping");
    let express = document.getElementById("expressShipping");
    let deliveryMethodTotal = document.getElementsByClassName("shipping-amount")[0];
    let cash = 0;

    //Checking which method is selected
    if (collection.checked) {
        cash = 0;
        deliveryMethodTotal.innerHTML = `Shipping:<span>R ${cash}</span>`;
    } else if (standard.checked) {
        cash = 100;
        deliveryMethodTotal.innerHTML = `Shipping:<span>R ${cash}</span>`;
    } else if (express.checked) {
        cash = 200;
        deliveryMethodTotal.innerHTML = `Shipping:<span>R ${cash}</span>`;
    }
}
//to update the subtotal of the items
function updateCartTotal() {
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let subTotal = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("price-sub")[0];
        let quantityElement = cartRow.getElementsByClassName("quantity-amount")[0];
        let price = parseFloat(priceElement.innerText.replace("R", ""));
        let quantity = quantityElement.value;
        subTotal += (price * quantity);
    }
    subTotal = Math.round(subTotal * 100) / 100;
    document.getElementsByClassName("subTotal-amount")[0].innerText = "R " + subTotal;
}