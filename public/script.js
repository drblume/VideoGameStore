function updateCart() {
    const prices = [12.99, 19.99, 59.99];
    const quantities = [
        document.getElementById('quantity1').value,
        document.getElementById('quantity2').value,
        document.getElementById('quantity3').value
    ];
    let subtotal = 0;
    for (let i = 0; i < prices.length; i++) {
        const total = prices[i] * quantities[i];
        document.getElementById(`total${i + 1}`).innerText = `Total: $${total.toFixed(2)}`;
        subtotal += total;
    }
    const tax = subtotal * 0.0675;
    const deliveryFee = 5.00;
    const serviceFee = 2.00;
    const total = subtotal + tax + deliveryFee + serviceFee;

    document.getElementById('subtotal').innerText = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `Tax (6.75%): $${tax.toFixed(2)}`;
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}