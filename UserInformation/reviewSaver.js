document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        game: document.querySelector('select[name="game-catalog"]').value,
        name: document.getElementById('name').value,
        rating: document.getElementById('rating').value,
        review: document.getElementById('description').value
    };

    fetch('/saveReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Review submitted successfully!');
        document.getElementById('reviewForm').reset(); // Reset the form
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        alert('Failed to submit review. Please try again later.');
    });
});