// Smooth Scroll per le ancore interne
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Caricamento dinamico recensioni da localStorage nella Home
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;

    const savedReviews = JSON.parse(localStorage.getItem('miracle_reviews')) || [];

    // Se ci sono recensioni salvate, le inseriamo in cima alla griglia
    savedReviews.forEach(rev => {
        const card = document.div;
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <p class="review-text">"${rev.text}"</p>
            <div class="review-author-box">
                <div class="author-avatar" style="background-color: #333;"></div>
                <div class="author-info">
                    <strong>${rev.name}</strong>
                    <span>${rev.role}</span>
                </div>
                <div class="review-stars">${rev.stars}</div>
            </div>
        `;
        container.prepend(reviewCard); // Mette le nuove recensioni per prime
    });
});