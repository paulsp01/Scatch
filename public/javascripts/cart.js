document.addEventListener('DOMContentLoaded', () => {
    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');
    const totalPayableElement = document.getElementById('totalPayable');


    function recalculateTotalPayable() {
        const totalAmount = Array.from(document.querySelectorAll('.counter')).reduce((acc, counterElement) => {
            const index = counterElement.getAttribute('data-index');
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;
            const counter = parseInt(counterElement.textContent) || 1;

            // Calculate the net price for this item
            const netPrice = price - (price * discount) / 100;
            return acc + netPrice * counter;
        }, 0);
        totalPayableElement.textContent = `₹ ${(totalAmount + 20).toFixed(2)}`;
        }

    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const counterElement = document.querySelector(`.counter[data-index="${index}"]`);
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const countValueElement = document.getElementById(`countValue-${index}`);

            // Parse existing counter value
            let counter = parseInt(counterElement.textContent) || 1;
            counter++; // Increment counter
            counterElement.textContent = counter.toString().padStart(2, '0');
            countValueElement.textContent = counter;

            // Parse price and discount from data attributes
            const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;

            // Calculate net price and update total amount
            const netPrice = price - (price * discount) / 100;
            totalAmountElement.textContent = `₹ ${(netPrice * counter).toFixed(2)}`;

            recalculateTotalPayable();
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const counterElement = document.querySelector(`.counter[data-index="${index}"]`);
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const countValueElement = document.getElementById(`countValue-${index}`);

            // Parse existing counter value
            let counter = parseInt(counterElement.textContent) || 1;
            if (counter > 1) counter--; // Decrement counter
            counterElement.textContent = counter.toString().padStart(2, '0');
            countValueElement.textContent = counter;

            // Parse price and discount from data attributes
            const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;

            // Calculate net price and update total amount
            const netPrice = price - (price * discount) / 100;
            totalAmountElement.textContent = `₹${(netPrice * counter).toFixed(2)}`;

            recalculateTotalPayable();
        });
    });
});