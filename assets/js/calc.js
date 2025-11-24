const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});

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

  // Slide 1 - Resumo
  document.getElementById('slideResumo').innerHTML = `
    <h3>Resumo</h3>
    <ul>
      <li><strong>Área total:</strong> ${areaTotal.toFixed(2)} m²</li>
      <li><strong>Tinta:</strong> ${Math.ceil(tinta)} litros</li>
      <li><strong>Massa Corrida:</strong> ${Math.ceil(massa)} sacos</li>
      <li><strong>Selador:</strong> ${Math.ceil(selador)} litros</li>
      <li><strong>Lixa:</strong> ${Math.ceil(lixa)} unidades</li>
    </ul>
  `;

  // Slide 2 - Recomendações
  let recomendacoes = "";
  patologias.forEach(p => {
    if (p.value === "infiltracao") recomendacoes += "<li>✔️ Recomendamos impermeabilizante</li>";
    if (p.value === "mofo") recomendacoes += "<li>✔️ Usar fungicida antes da pintura</li>";
    if (p.value === "descascando") recomendacoes += "<li>✔️ Raspar e aplicar fundo preparador</li>";
  });

  document.getElementById('slideRecomendacoes').innerHTML = `
    <h3>Recomendações</h3>
    <ul>${recomendacoes || "<li>Sem recomendações extras</li>"}</ul>
  `;

  document.getElementById('formularioSection').style.display = 'none';
  document.getElementById('resultadoSection').style.display = 'block';
  swiper.slideTo(0);
});

function mostrarFormulario() {
  document.getElementById('formularioSection').style.display = 'block';
  document.getElementById('resultadoSection').style.display = 'none';
}
