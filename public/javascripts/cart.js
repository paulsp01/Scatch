


document.addEventListener('DOMContentLoaded', () => {
    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');
    const totalPayableElement = document.getElementById('totalPayable');

    function recalculateTotalPayable() {
        const totalAmount = Array.from(document.querySelectorAll('.counter')).reduce((acc, counterElement) => {
            const index = counterElement.getAttribute('data-index');
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const tA=document.getElementById('tA');
            const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;
            const counter = parseInt(counterElement.textContent) || 1;

            
            const netPrice = price - (price * discount) / 100;
            return acc + netPrice * counter;
        }, 0);
       tA.value=totalAmount+20; 
        totalPayableElement.textContent = `₹ ${(totalAmount + 20).toFixed(2)}`; 
    }


    function updateCartItem(index, newQuantity, newPrice) {
        
        document.getElementById(`quantity-${index}`).value = newQuantity;

       
        document.getElementById(`price-${index}`).value = newPrice.toFixed(2);
    }

    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const counterElement = document.querySelector(`.counter[data-index="${index}"]`);
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const countValueElement = document.getElementById(`countValue-${index}`);
            const quantityInput = document.querySelector(`#quantity-${index}`);
            const priceInput = document.querySelector(`#price-${index}`);
            const discountInput = document.querySelector(`#discount-${index}`);
            const total=document.querySelector(`#total-${index}`);

            let counter = parseInt(counterElement.textContent) || 1;
            counter++;
            counterElement.textContent = counter.toString().padStart(2, '0');
            countValueElement.textContent = counter;
            quantityInput.value = counter;

            const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;
            const netPrice = price - (price * discount) / 100;
           

            const updatedTotal = (netPrice * counter).toFixed(2);
            

            priceInput.value = updatedTotal;
            totalAmountElement.value=updatedTotal;
            
            totalAmountElement.textContent = `₹${updatedTotal}`;

            updateCartItem(index, counter, parseFloat(updatedTotal));

            recalculateTotalPayable();
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const counterElement = document.querySelector(`.counter[data-index="${index}"]`);
            const totalAmountElement = document.getElementById(`totalAmount-${index}`);
            const countValueElement = document.getElementById(`countValue-${index}`);
            const quantityInput = document.querySelector(`#quantity-${index}`);
            const priceInput = document.querySelector(`#price-${index}`);

            let counter = parseInt(counterElement.textContent) || 1;
            if (counter > 1) counter--;
            counterElement.textContent = counter.toString().padStart(2, '0');
            countValueElement.textContent = counter;
            quantityInput.value = counter;

          const price = parseFloat(totalAmountElement.dataset.price) || 0;
            const discount = parseFloat(totalAmountElement.dataset.discount) || 0;
            const netPrice = price - (price * discount) / 100;
            const updatedTotal = (netPrice * counter).toFixed(2);
            

            priceInput.value = updatedTotal;
            totalAmountElement.value=updatedTotal;
            totalAmountElement.textContent = `₹${updatedTotal}`;
            updateCartItem(index, counter, parseFloat(updatedTotal));


            recalculateTotalPayable();
        });
    });






document.getElementById('totalPayable').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('addressModal').classList.remove('hidden');
});

// Close the modal when clicking the "Cancel" button
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('addressModal').classList.add('hidden');
});

document.querySelector('form').addEventListener('submit', function() {
    document.getElementById('addressModal').classList.add('hidden');
});

document.getElementById('placeOrderBtn').addEventListener('click', function() {
    const cartItems = [];
    const totalPrice = document.querySelector('span.totalPrice').textContent;

    document.querySelectorAll('#cartItems li').forEach((item, index) => {
        const product = {
            name: item.querySelector('.product-name').textContent,
            price: parseFloat(item.querySelector('.product-price').textContent),
            quantity: parseInt(item.querySelector('.product-quantity').value),
            totalPrice: parseFloat(item.querySelector('.product-total-price').textContent),
        };
        cartItems.push(product);
    });

    fetch('/order/order-placed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            products: cartItems,
            totalPrice: totalPrice
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order placed successfully:', data);
    })
    .catch(error => {
        console.error('Error placing order:', error);
    });
});
});




