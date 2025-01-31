function gerarTabela() {
  const quantidade = parseInt(document.getElementById('quantidadeParedes').value) || 0;
  const formulario = document.getElementById('formulario');
  formulario.innerHTML = ''; // Limpa a tabela anterior

  if (quantidade > 0) {
      let tabelaHTML = `
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
          <button onclick="calcularTinta(${quantidade})">Calcular Tinta</button>
      `;

      formulario.innerHTML = tabelaHTML;
  }
}

function calcularTinta(quantidade) {
  let areaTotal = 0;

  for (let i = 1; i <= quantidade; i++) {
      let largura = parseFloat(document.getElementById(`largura${i}`).value) || 0;
      let altura = parseFloat(document.getElementById(`altura${i}`).value) || 0;
      areaTotal += largura * altura;
  }

  const coberturaTinta = 5; // 1 litro cobre 5m²
  const litrosNecessarios = areaTotal / coberturaTinta;
  const baldes = Math.ceil(litrosNecessarios / 18); // Balde tem 18 litros

  document.getElementById("resultado").innerText = 
      `Área Total: ${areaTotal.toFixed(2)} m² | Tinta Necessária: ${litrosNecessarios.toFixed(2)} L | Baldes de 18L: ${baldes}`;
}
