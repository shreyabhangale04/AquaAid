// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to each blog card with staggered delay
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Functionality for expanding blog posts (Show/Hide extra text in blog posts)
    const expandReadMoreBtns = document.querySelectorAll('.expand-read-more-btn');
    
    expandReadMoreBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
    
            // Find the closest .blog-content and then find the .blog-extra-text inside it
            const blogContent = btn.closest('.blog-content');
            const extraText = blogContent.querySelector('.blog-extra-text');
    
            if (extraText.style.display === 'none' || extraText.style.display === '') {
                extraText.style.display = 'block'; // Show extra content
                btn.innerHTML = 'Read Less <i class="fas fa-arrow-up"></i>';
            } else {
                extraText.style.display = 'none'; // Hide extra content
                btn.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
            }
        });
    });
    
    // Functionality for revealing hidden blog posts (toggle visibility of hidden blog cards)
    const viewMoreBtn = document.querySelector('.view-more-btn'); // Corrected selector
    
    viewMoreBtn.addEventListener('click', function () {
        const hiddenCards = document.querySelectorAll('.blog-card.hidden');
        
        if (this.classList.contains('active')) {
            // Hide the hidden cards
            hiddenCards.forEach(card => {
                card.classList.remove('show');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500); // Match with CSS transition duration
            });
            this.classList.remove('active');
            this.innerHTML = 'View More <i class="fas fa-arrow-down"></i>';
        } else {
            // Show the hidden cards
            hiddenCards.forEach(card => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('show');
                }, 50); // Slight delay to trigger CSS transition
            });
            this.classList.add('active');
            this.innerHTML = 'View Less <i class="fas fa-arrow-up"></i>';
        }
    });
});
