function gerarTabela() {
    const quantidade = parseInt(document.getElementById('quantidadeParedes').value) || 0;
    const formulario = document.getElementById('formulario');
    formulario.innerHTML = ''; // Limpa a tabela anterior

    if (quantidade > 0) {
        let tabelaHTML = `
            <p>O trabalho será:</p>
            <input type="radio" id="nova" name="tipoPintura" value="nova" checked>
            <label for="nova">Pintura Nova</label>
            <input type="radio" id="repintura" name="tipoPintura" value="repintura">
            <label for="repintura">Repintura (com selador)</label>

            <p>Preparação da parede:</p>
            <input type="checkbox" id="massaCorrida">
            <label for="massaCorrida">Reparo com massa corrida ou gesso</label><br>
            <input type="checkbox" id="lixarParede">
            <label for="lixarParede">Lixar a parede</label><br>
            <input type="checkbox" id="limparParede">
            <label for="limparParede">Limpar a parede antes de pintar</label>

            <p>Quantas demãos de tinta serão aplicadas?</p>
            <input type="number" id="demaos" min="1" max="3" value="2">

            <table>
                <tr>
                    <th>Parede</th>
                    <th>Largura (m)</th>
                    <th>Altura (m)</th>
                </tr>
        `;

        for (let i = 1; i <= quantidade; i++) {
            tabelaHTML += `
                <tr>
                    <td>${i}</td>
                    <td><input type="number" id="largura${i}" step="0.1"></td>
                    <td><input type="number" id="altura${i}" step="0.1"></td>
                </tr>
            `;
        }

        tabelaHTML += `
            </table>
            <button onclick="calcularMateriais(${quantidade})">Calcular Materiais</button>
        `;

        formulario.innerHTML = tabelaHTML;
    }
}

function calcularMateriais(quantidade) {
    let areaTotal = 0;

    for (let i = 1; i <= quantidade; i++) {
        let largura = parseFloat(document.getElementById(`largura${i}`).value) || 0;
        let altura = parseFloat(document.getElementById(`altura${i}`).value) || 0;
        areaTotal += largura * altura;
    }

    const tipoPintura = document.querySelector('input[name="tipoPintura"]:checked').value;
    const demãos = parseInt(document.getElementById("demaos").value) || 2;
    const massaCorrida = document.getElementById("massaCorrida").checked;
    const lixarParede = document.getElementById("lixarParede").checked;
    const limparParede = document.getElementById("limparParede").checked;

    const coberturaTinta = 5; // 1 litro cobre 5m²
    let litrosTinta = (areaTotal / coberturaTinta) * demãos;

    // Ajuste para repintura (30% menos tinta)
    let litrosSelador = 0;
    if (tipoPintura === "repintura") {
        litrosTinta *= 0.7;
        litrosSelador = areaTotal / 10; // 1 litro de selador cobre 10m²
    }

    // Se precisar de massa corrida, aumenta 15% o consumo de tinta e adiciona massa corrida
    let baldesMassa = 0;
    if (massaCorrida) {
        litrosTinta *= 1.15;
        baldesMassa = Math.ceil(areaTotal / 20); // 1 balde de 25kg cobre 20m²
    }

    // Cálculo de baldes de tinta (18L cada)
    const baldesTinta = Math.ceil(litrosTinta / 18);
    const baldesSelador = Math.ceil(litrosSelador / 18);

    let mensagem = `
        <h3>📌 Relatório de Materiais</h3>
        <b>Área Total:</b> ${areaTotal.toFixed(2)} m²<br>
        <b>Demãos:</b> ${demãos}<br>
        <b>Tinta Necessária:</b> ${litrosTinta.toFixed(2)} L (${baldesTinta} baldes de 18L)<br>
    `;

    if (tipoPintura === "repintura") {
        mensagem += `<b>Selador Necessário:</b> ${litrosSelador.toFixed(2)} L (${baldesSelador} baldes de 18L)<br>`;
    }

    if (massaCorrida) {
        mensagem += `<b>Massa Corrida:</b> ${baldesMassa} baldes de 25kg<br>`;
    }

    mensagem += `<h3>✔️ Etapas da Pintura</h3>`;

    if (massaCorrida) mensagem += "✅ Aplicar massa corrida/gesso antes de pintar.<br>";
    if (lixarParede) mensagem += "✅ Lixar a parede para melhor aderência.<br>";
    if (limparParede) mensagem += "✅ Limpar a parede antes de pintar.<br>";

    mensagem += "✅ Aplicar a tinta conforme o cálculo acima.<br>";

    document.getElementById("resultado").innerHTML = mensagem;
}
