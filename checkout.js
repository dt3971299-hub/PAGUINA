// --- checkout-pago.js ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto zoom en el logo si existe
    const logoEmpresa = document.getElementById('logoEmpresa');
    if (logoEmpresa) {
        logoEmpresa.addEventListener('click', () => {
            logoEmpresa.classList.toggle('zoom-activo');
        });
    }

    // 2. Si estamos en la página de pago, inicializamos el método de pago por defecto
    if (document.getElementById('contenedor-dinamico-pago')) {
        cambiarMetodoPago();
    }
});

// Función que dibuja el formulario correspondiente al método de pago seleccionado
function cambiarMetodoPago() {
    const radioSeleccionado = document.querySelector('input[name="metodo-pago"]:checked');
    if (!radioSeleccionado) return;

    const metodoSeleccionado = radioSeleccionado.value;
    const contenedor = document.getElementById('contenedor-dinamico-pago');
    if (!contenedor) return;

    if (metodoSeleccionado === 'yape') {
        contenedor.innerHTML = `
            <fieldset class="form-grupo">
                <legend>2. Datos de Transferencia / Yape / Plin</legend>
                <p style="color: #bbb; font-size: 13px; margin-bottom: 15px;">Realiza el pago al número <strong>999-999-999</strong> a nombre de <strong>David Motos S.A.C.</strong> e ingresa el código de operación.</p>
                
                <div class="campo">
                    <label for="banco-origen">Selecciona tu Billetera o Banco *</label>
                    <select id="banco-origen" name="banco-origen" required>
                        <option value="">Selecciona una opción</option>
                        <option value="Yape">Yape</option>
                        <option value="Plin">Plin</option>
                        <option value="BCP">Banco BCP</option>
                        <option value="Interbank">Interbank</option>
                        <option value="BBVA">BBVA</option>
                    </select>
                </div>

                <div class="campo" style="margin-top: 15px;">
                    <label for="nro-operacion">Número de Operación / Código de Voucher *</label>
                    <input type="text" id="nro-operacion" name="nro-operacion" required placeholder="Ej. 4587213">
                </div>
            </fieldset>
        `;
    } else if (metodoSeleccionado === 'tarjeta') {
        contenedor.innerHTML = `
            <fieldset class="form-grupo">
                <legend>2. Datos de tu Tarjeta</legend>
                
                <div class="campo">
                    <label for="nro-tarjeta">Número de la Tarjeta *</label>
                    <input type="text" id="nro-tarjeta" name="nro-tarjeta" required placeholder="4532 •••• •••• 1234" maxlength="19">
                </div>

                <div class="campo-fila" style="margin-top: 15px;">
                    <div class="campo">
                        <label for="expiracion">Fecha de Expiración (MM/AA) *</label>
                        <input type="text" id="expiracion" name="expiracion" required placeholder="MM/AA" maxlength="5">
                    </div>
                    <div class="campo">
                        <label for="cvv">CVV / Código de Seguridad *</label>
                        <input type="password" id="cvv" name="cvv" required placeholder="123" maxlength="4">
                    </div>
                </div>
            </fieldset>
        `;
    } else if (metodoSeleccionado === 'contraentrega') {
        contenedor.innerHTML = `
            <fieldset class="form-grupo">
                <legend>2. Confirmación de Pago Contraentrega</legend>
                <p style="color: #bbb; font-size: 14px; line-height: 1.5;">No necesitas ingresar datos adicionales. Nuestro equipo se comunicará contigo para confirmar el horario de entrega en tu domicilio y coordinar el cobro físico al recibir tu moto.</p>
            </fieldset>
        `;
    }
}

// Finalizar el proceso de pago y enviar a la página de gracias
function finalizarCompraFinal(event) {
    event.preventDefault();

    const radioPago = document.querySelector('input[name="metodo-pago"]:checked');
    if (!radioPago) return;

    // Guardar el método de pago elegido
    const metodoPago = radioPago.value;
    localStorage.setItem('metodoPagoMotos', metodoPago);

    // Redirigir a la página de agradecimiento / éxito (asegúrate de que el archivo se llame gracias.html o checkout-gracias.html según prefieras)
    window.location.href = 'gracias.html';
}