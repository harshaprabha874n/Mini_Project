document.getElementById('reminderForm').addEventListener('submit', function(event) {
    const phone = document.getElementById('phone').value;
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        event.preventDefault();
    }
});
