const SUPABASE_URL = "https://luphuvtpmbzumcqvccct.supabase.co";
const SUPABASE_KEY = "sb_publishable_N9YTHwZRusI5tPx41BMDTQ_mhV_CPeC";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("order-form");
const confirmation = document.getElementById("confirmation");
const totalAdded = document.getElementById("total-added");

function getOrderItems(){
    const items = []
    document.querySelectorAll(".order-row").forEach((row) => {
        const select = row.querySelector(".item");
        const price = Number(select.selectedOptions[0].dataset.price);
        const quantity = Math.max(0, Number(row.querySelector(".quantity").value));
        if (quantity > 0) items.push({ name: select.value, price, quantity });
    });
    return items;
}

function calculateTotal(items){
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateTotal() {
    const total = calculateTotal(getOrderItems());
    totalAdded.textContent = `Total: $${total.toFixed(2)}`;
}

form.addEventListener("input", updateTotal);

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const items = getOrderItems();
    const total = calculateTotal(items);
    
    if (items.length === 0) {
        confirmation.textContent = "Please add at least one item to your order.";
        return;
    }  

    confirmation.textContent = "Submitting your order...";

    const { error } = await db.from("orders").insert({
        customer_name: name,
        phone: phone,
        items: items,
        total: total,
    });

    if (error) {
        console.error(error);
        confirmation.textContent = "There was an error submitting your order. Please try again.";
        return;
    }

    const summary = items.map((i)=> `${i.quantity} x ${i.name}`).join(", ");
    confirmation.textContent = `Thank you, ${name}! Your order of ${summary} ($${total.toFixed(2)}) will be ready for pickup.`;
    form.reset();
    updateTotal();
    }) 

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



/*  OLD not standard code, upgraded in next lines of code
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
}); */