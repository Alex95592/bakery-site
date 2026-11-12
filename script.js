const form = document.getElementById("order-form");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const itemSelect = document.getElementById("item");
    const item = itemSelect.value;
    const price = Number(itemSelect.selectedOptions[0].dataset.price);
    const quantity = Number(document.getElementById("quantity").value);

    if (quantity < 1){
        confirmation.textContent = "Please enter a quantity of at least 1.";
        return;

    }
    const total = price * quantity;
    confirmation.textContent = `Thank you, ${name}! Your order of ${quantity} x ${item} ($${total}) will be ready for pickup.`;
    form.reset();
});