document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, ingresa valores válidos para peso y altura.');
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    const interpretacion = interpretarIMC(imc);

    document.getElementById('imcValue').textContent = `IMC: ${imc}`;
    document.getElementById('imcInterpretacion').textContent = `Interpretación: ${interpretacion}`;

    actualizarBarraProgreso(imc);
    agregarAlHistorial(peso, altura, imc, interpretacion);
});

function interpretarIMC(imc) {
    if (imc < 18.5) {
        return 'Bajo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return 'Peso normal';
    } else if (imc >= 25.0 && imc <= 29.9) {
        return 'Sobrepeso';
    } else {
        return 'Obesidad';
    }
}

function actualizarBarraProgreso(imc) {
    const progressBar = document.getElementById('progress');
    const maxIMC = 40; // Valor máximo para la barra de progreso
    const progressWidth = (imc / maxIMC) * 100;
    progressBar.style.width = `${progressWidth}%`;

    if (imc < 18.5) {
        progressBar.style.backgroundColor = '#ffc107'; // Amarillo
    } else if (imc >= 18.5 && imc <= 24.9) {
        progressBar.style.backgroundColor = '#28a745'; // Verde
    } else if (imc >= 25.0 && imc <= 29.9) {
        progressBar.style.backgroundColor = '#fd7e14'; // Naranja
    } else {
        progressBar.style.backgroundColor = '#dc3545'; // Rojo
    }
}

function agregarAlHistorial(peso, altura, imc, interpretacion) {
    const historialTable = document.getElementById('historialTable').getElementsByTagName('tbody')[0];
    const newRow = historialTable.insertRow(0);

    newRow.innerHTML = `
        <td>${peso}</td>
        <td>${altura}</td>
        <td>${imc}</td>
        <td>${interpretacion}</td>
    `;

    newRow.style.backgroundColor = getRandomColor();

    if (historialTable.rows.length > 5) {
        historialTable.deleteRow(5);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}