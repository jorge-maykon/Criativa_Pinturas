function gerarCampos() {
    let quantidadeParedes = parseInt(document.getElementById("quantidadeParedes").value);
    let paredesContainer = document.getElementById("paredesContainer");
    paredesContainer.innerHTML = "";  

    if (isNaN(quantidadeParedes) || quantidadeParedes <= 0) return;

    for (let i = 1; i <= quantidadeParedes; i++) {
        let div = document.createElement("div");
        div.classList.add("form-row");
        div.innerHTML = `
            <div class="form-group">
                <label for="largura${i}">Largura ${i} (m)</label>
                <input type="number" id="largura${i}" placeholder="Ex: 3">
            </div>
            <div class="form-group">
                <label for="altura${i}">Altura ${i} (m)</label>
                <input type="number" id="altura${i}" placeholder="Ex: 2.5">
            </div>
        `;
        paredesContainer.appendChild(div);
    }
}

function calcularMateriais() {
    let quantidadeParedes = parseInt(document.getElementById("quantidadeParedes").value);
    let tipoPintura = document.getElementById("tipoPintura").value;
    let usarSelador = document.getElementById("usarSelador").checked;
    
    if (isNaN(quantidadeParedes) || quantidadeParedes <= 0) {
        alert("Preencha o número de paredes corretamente!");
        return;
    }

    let areaTotal = 0;
    for (let i = 1; i <= quantidadeParedes; i++) {
        let largura = parseFloat(document.getElementById(`largura${i}`).value);
        let altura = parseFloat(document.getElementById(`altura${i}`).value);

        if (isNaN(largura) || isNaN(altura)) {
            alert(`Preencha corretamente os valores da parede ${i}!`);
            return;
        }

        areaTotal += largura * altura;
    }

    let rendimentoTinta = tipoPintura === "nova" ? 5 : 7;  
    let totalTinta = areaTotal / rendimentoTinta;

    let seladorNecessario = usarSelador ? areaTotal / 10 : 0;  

    let tintaRestante = totalTinta;
    let latas18L = Math.floor(tintaRestante / 18);
    tintaRestante -= latas18L * 18;

    let latas36L = Math.ceil(tintaRestante / 3.6); 

    let resultado = `
        🔹 Relátorio
        🔹 Área Total: ${areaTotal.toFixed(2)} m²
        🔹 Litros de Tinta: ${totalTinta.toFixed(2)}L
        🔹 Latas de Tinta Necessárias:
            ${latas18L > 0 ? `🟢 ${latas18L} lata(s) de 18L` : ""}
            ${latas36L > 0 ? `🟡 ${latas36L} lata(s) de 3.6L` : ""}
        ${usarSelador ? `🔹 Selador Necessário: ${seladorNecessario.toFixed(2)}L` : ""}
    `;

    document.getElementById("resultado").innerHTML = resultado.replace(/\n/g, "<br>");
}
