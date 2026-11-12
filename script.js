const form = document.getElementById("order-form");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const itemSelect = document.getElementById("item");
    const item1 = itemSelect.value;
    const price = Number(itemSelect.selectedOptions[0].dataset.price);
    const quantity1 = Number(document.getElementById("quantity").value);
    const item2 = itemSelect.value;
    const quantity2 = Number(document.getElementById("quantity2").value);

    if (quantity1 < 1){
        confirmation.textContent = "Please enter a quantity of at least 1.";
        return;

    }
    const total1 = price * quantity1;
    const total2 = price * quantity2;
    const total = total1 + total2;
    confirmation.textContent = `Thank you, ${name}! Your order of ${quantity1} x ${item1} and ${quantity2} x ${item2} ($${total}) will be ready for pickup.`;
    form.reset();
});