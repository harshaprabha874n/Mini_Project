document.getElementById('occasionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const occasionName = document.getElementById('occasion_name').value;
    const occasionDate = document.getElementById('occasion_date').value;

    fetch('add_occasion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ occasion_name: occasionName, occasion_date: occasionDate })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        loadOccasions();
    })
    .catch(error => console.error('Error:', error));
});

function loadOccasions() {
    fetch('get_occasions.php')
        .then(response => response.json())
        .then(data => {
            const occasionList = document.getElementById('occasionList');
            occasionList.innerHTML = '';
            data.forEach(occasion => {
                occasionList.innerHTML += `<p>${occasion.occasion_name} - ${occasion.occasion_date}</p>`;
            });
        });
}

// Load occasions on page load
loadOccasions();
