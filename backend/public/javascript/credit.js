document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('creditForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            amount: parseFloat(document.getElementById('amount').value),
            term: parseInt(document.getElementById('term').value),
            monthlyIncome: parseFloat(document.getElementById('monthlyIncome').value),
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/credit/assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Resultado del crédito recibida: ' + JSON.stringify(result.data.status));
                window.location.href = "/home";
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error interno del servidor');
        }
    });

    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/credit/credituser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            const creditsTableBody = document.querySelector('#creditsTable tbody');

            result.data.forEach(credit => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${credit.credito.name}</td>
                    <td>${credit.credito.amount}</td>
                    <td>${credit.credito.term}</td>
                    <td>${credit.credito.interestRate}</td>
                    <td>${credit.credito.monthlyIncome}</td>
                    <td>${credit.credito.status}</td>
                    <td>${new Date(credit.credito.created_at).toLocaleDateString()}</td>
                `;
                creditsTableBody.appendChild(row);
            });
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error interno del servidor');
    }
});

