const form = document.getElementById("order-form");
const confirmation = document.getElementById("confirmation");
const totalAdded = document.getElementById("total-added");

/*this is not standard, upgraded in next lines of code
const itemSelect1 = document.getElementById("item1");
const itemSelect2 = document.getElementById("item2");
const quantityInput1 = document.getElementById("quantity1");
const quantityInput2 = document.getElementById("quantity2");

function updateTotal() {
    
    const price1 = Number(itemSelect1.selectedOptions[0].dataset.price);
    const quantity1 = Number(document.getElementById("quantity1").value);
    const price2 = Number(itemSelect2.selectedOptions[0].dataset.price);
    const quantity2 = Number(document.getElementById("quantity2").value);
    const total1 = price1 * quantity1;
    const total2 = price2 * quantity2;
    const total = total1 + total2;

    totalAdded.textContent = `Total: $${total}`;
}
itemSelect1.addEventListener("input", updateTotal);
quantityInput1.addEventListener("input", updateTotal);
itemSelect2.addEventListener("input", updateTotal);
quantityInput2.addEventListener("input", updateTotal); */

function updateTotal() {
    let total = 0;
    document.querySelectorAll(".order-row").forEach((row) => {
        const price = Number(row.querySelector(".item").selectedOptions[0].dataset.price);
        const quantity = Math.max(0, Number(row.querySelector(".quantity").value));
        total += price * quantity;
    });
    totalAdded.textContent = `Total: $${total.toFixed(2)}`;
}
form.addEventListener("input", updateTotal);
updateTotal(); 

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const itemSelect1 = document.getElementById("item1");
    const itemSelect2 = document.getElementById("item2");
    const item1 = itemSelect1.value;
    const price1 = Number(itemSelect1.selectedOptions[0].dataset.price);
    const quantity1 = Number(document.getElementById("quantity1").value);
    const item2 = itemSelect2.value;
    const price2 = Number(itemSelect2.selectedOptions[0].dataset.price);
    const quantity2 = Number(document.getElementById("quantity2").value);
    if (quantity1 < 1){
        confirmation.textContent = "Please enter a quantity of at least 1.";
        return;

    }
    const total1 = price1 * quantity1;
    const total2 = price2 * quantity2;
    const total = total1 + total2;

    confirmation.textContent = `Thank you, ${name}! Your order of ${quantity1} x ${item1} and ${quantity2} x ${item2} ($${total}) will be ready for pickup.`;
    form.reset();
});