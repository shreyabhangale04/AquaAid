// Reveal hidden products on 'View More' click
document.getElementById('viewMoreBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const hiddenProducts = document.querySelectorAll('.hidden');
    
    hiddenProducts.forEach(function(product) {
        product.classList.remove('hidden'); // Show hidden products
    });
    
    this.style.display = 'none'; // Hide the 'View More' button
});
