// Load stored text
document.getElementById('userTextField').value = localStorage.getItem('userText') || '';
document.getElementById('displayText').textContent = localStorage.getItem('userText') || '';

// Update text field and store in localStorage
document.getElementById('userTextField').addEventListener('input', function () {
    const userText = this.value;
    document.getElementById('displayText').textContent = userText;
    localStorage.setItem('userText', userText);
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // This line prevents the form from refreshing the page

    // Clear previous errors
    document.getElementById('errorNama').textContent = '';
    document.getElementById('errorEmail').textContent = '';
    document.getElementById('errorPesan').textContent = '';
    document.getElementById('successMessage').textContent = '';
    
    // Get form values
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    // Validate form
    let hasError = false;
    if (!nama) {
        document.getElementById('errorNama').textContent = 'Nama harus diisi';
        hasError = true;
    }
    if (!email) {
        document.getElementById('errorEmail').textContent = 'Email harus diisi';
        hasError = true;
    }
    if (!pesan) {
        document.getElementById('errorPesan').textContent = 'Pesan harus diisi';
        hasError = true;
    }

    if (hasError) return;

    // Show loading icon
    document.getElementById('submitText').style.display = 'none';
    document.getElementById('loadingIcon').style.display = 'inline-block';

    // Send POST request
    try {
        const response = await fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, email, pesan })
        });

        if (response.ok) {
            document.getElementById('successMessage').textContent = 'Terkirim';
        } else {
            document.getElementById('successMessage').textContent = 'Gagal mengirim data';
        }
    } catch (error) {
        document.getElementById('successMessage').textContent = 'Error: Tidak dapat terhubung ke server';
    } finally {
        // Hide loading icon and show submit button
        document.getElementById('submitText').style.display = 'inline';
        document.getElementById('loadingIcon').style.display = 'none';
    }
});