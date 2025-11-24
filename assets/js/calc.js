document.getElementById('numParedes').addEventListener('change', function() {
  const num = parseInt(this.value);
  const container = document.getElementById('paredesContainer');
  container.innerHTML = '';
  for (let i = 1; i <= num; i++) {
    container.innerHTML += `
      <fieldset>
        <legend>Parede ${i}</legend>
        Altura (m): <input type="number" class="altura" step="0.1" required><br>
        Largura (m): <input type="number" class="largura" step="0.1" required><br>
        Área de portas/janelas (m²): <input type="number" class="abertura" step="0.1" value="0"><br>
      </fieldset>
    `;
  }
});

document.getElementById('formCalc').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const alturas = document.querySelectorAll('.altura');
  const larguras = document.querySelectorAll('.largura');
  const aberturas = document.querySelectorAll('.abertura');

  let areaTotal = 0;

  for (let i = 0; i < alturas.length; i++) {
    const h = parseFloat(alturas[i].value);
    const w = parseFloat(larguras[i].value);
    const abertura = parseFloat(aberturas[i].value);
    const area = h * w - abertura;
    areaTotal += area > 0 ? area : 0;
  }

  const tipo = document.querySelector('input[name="tipoPintura"]:checked').value;
  const patologias = document.querySelectorAll('.patologia:checked');
  const fatorPatologia = patologias.length > 0 ? 1.2 : 1;

  const tinta = (areaTotal / 5) * fatorPatologia;
  const massa = tipo === 'nova' ? (areaTotal / 15) * fatorPatologia : 0;
  const selador = tipo === 'nova' ? (areaTotal / 12) * fatorPatologia : 0;
  const lixa = areaTotal / 8;

  let recomendacoes = "";
  patologias.forEach(p => {
    if (p.value === "infiltracao") recomendacoes += "<li>Use impermeabilizante</li>";
    if (p.value === "mofo") recomendacoes += "<li>Use fungicida antes de pintar</li>";
    if (p.value === "descascando") recomendacoes += "<li>Raspar e aplicar fundo preparador</li>";
  });

  document.getElementById('resultado').innerHTML = `
    <h4>Resumo:</h4>
    <p><strong>Área total:</strong> ${areaTotal.toFixed(2)} m²</p>
    <ul>
      <li><strong>Tinta:</strong> ${Math.ceil(tinta)} litros</li>
      <li><strong>Massa Corrida:</strong> ${Math.ceil(massa)} sacos</li>
      <li><strong>Selador:</strong> ${Math.ceil(selador)} litros</li>
      <li><strong>Lixa:</strong> ${Math.ceil(lixa)} unidades</li>
    </ul>
    ${recomendacoes ? `<p><strong>Recomendações:</strong></p><ul>${recomendacoes}</ul>` : ''}
  `;
});
