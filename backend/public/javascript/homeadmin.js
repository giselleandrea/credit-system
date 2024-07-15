document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    // Obtener todos los créditos
    try {
        const response = await fetch('/credit/credits', {
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
                    <td>${credit.usuario.name}</td>
                    <td>${credit.usuario.email}</td>
                    <td>${credit.usuario.document}</td>
                    <td>${credit.usuario.typeDocument}</td>    
                    <td>${credit.credito.name}</td>
                    <td>${credit.credito.amount}</td>
                    <td>${credit.credito.term}</td>
                    <td>${credit.credito.interestRate}</td>
                    <td>${credit.credito.monthlyIncome}</td>
                    <td>${credit.credito.status}</td>
                    <td>${new Date(credit.credito.created_at).toLocaleDateString()}</td>
                    <td><button class="cancel-btn" data-id="${credit.credito.id}">Cancelar</button></td>
                `;
                creditsTableBody.appendChild(row);
            });

            // Agregar eventos a los botones de cancelar
            document.querySelectorAll('.cancel-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const creditId = event.target.dataset.id;
                    try {
                        const response = await fetch(`/credits/cancel/${creditId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (response.ok) {
                            const result = await response.json();
                            alert('Crédito cancelado exitosamente');
                            // Actualizar el estado en la tabla
                            event.target.closest('tr').querySelector('td:nth-child(7)').textContent = 'cancelled';
                            location.reload();
                        } else {
                            const error = await response.json();
                            alert('Error: ' + error.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error interno del servidor');
                    }
                });
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
