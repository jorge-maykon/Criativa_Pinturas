let swiper;
let tipoSelecionado = null;

/* ======================
   Funções utilitárias
   ====================== */

function lerNumero(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const valor = el.value.replace(",", ".");
  const numero = parseFloat(valor);
  return isNaN(numero) ? 0 : numero;
}

function coletarPatologias(selector) {
  const itens = Array.from(document.querySelectorAll(selector));
  return itens
    .filter((el) => el.checked)
    .map((el) => {
      if (el.nextElementSibling && el.nextElementSibling.textContent) {
        return el.nextElementSibling.textContent.trim();
      }
      return el.value;
    });
}

function calcularLitrosTinta(area, tipoPintura) {
  if (!area || area <= 0) {
    area = 0;
  }

  const demãos = tipoPintura === "nova" ? 3 : 2;
  const coberturaPorLitro = 10; // m² por litro (média)

  const litros = (area * demãos) / coberturaPorLitro;
  const litrosArredondado = Math.ceil(litros * 10) / 10;

  let restante = litrosArredondado;
  let latas18 = 0;
  let latas36 = 0;

  if (restante >= 18) {
    latas18 = Math.floor(restante / 18);
    restante -= latas18 * 18;
  }

  if (restante > 0) {
    latas36 = Math.ceil(restante / 3.6);
  }

  let texto = `${litrosArredondado.toFixed(1)} L (aprox.)`;

  if (latas18 || latas36) {
    const partes = [];
    if (latas18) partes.push(`${latas18}x 18 L`);
    if (latas36) partes.push(`${latas36}x 3,6 L`);
    texto += ` — sugerimos ${partes.join(" + ")}`;
  }

  return {
    litros,
    litrosArredondado,
    litrosTotalTexto: texto
  };
}

/* ======================
   Resultado dentro do mesmo card
   ====================== */

function mostrarResultado(tipo, dados) {
  const slideResumo = document.getElementById("slideResumo");
  const slideRecomendacoes = document.getElementById("slideRecomendacoes");
  const wizard = document.getElementById("calcWizard");
  const resultadoBox = document.getElementById("calcResultado");

  if (!slideResumo || !slideRecomendacoes || !wizard || !resultadoBox) return;

  slideResumo.innerHTML = dados.resumoHtml;
  slideRecomendacoes.innerHTML = dados.recomendacoesHtml;

  // esconde formulário, mostra resumo
  wizard.style.display = "none";
  resultadoBox.style.display = "block";

  if (swiper && typeof swiper.update === "function") {
    swiper.update();
  }
  if (swiper && typeof swiper.slideTo === "function") {
    swiper.slideTo(0);
  }
}

/* ======================
   Cálculos por tipo
   ====================== */

function calcularResidencial() {
  const numParedesInput = document.getElementById("resNumParedes");
  const quantidade = numParedesInput ? parseInt(numParedesInput.value, 10) || 0 : 0;

  let areaParedes = 0;
  for (let i = 1; i <= quantidade; i++) {
    const largura = lerNumero(`resLargura_${i}`);
    const altura = lerNumero(`resAltura_${i}`);

    if (largura > 0 && altura > 0) {
      areaParedes += largura * altura;
    }
  }

  const areaJanelas = Math.max(0, lerNumero("resAreaJanelas"));
  const areaPortas = Math.max(0, lerNumero("resAreaPortas"));

  let areaUtil = areaParedes - areaJanelas - areaPortas;
  if (areaUtil < 0) areaUtil = 0;

  const tipoPinturaInput = document.querySelector('input[name="resTipoPintura"]:checked');
  const tipoPintura = tipoPinturaInput ? tipoPinturaInput.value : "nova";

  const tinta = calcularLitrosTinta(areaUtil, tipoPintura);
  const patologias = coletarPatologias(".resPatologia");

  const descontada = areaParedes - areaUtil;

  const resumoHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Pintura residencial</h4>
      <p class="mb-1"><strong>Área total das paredes:</strong> ${areaParedes.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Área descontada (janelas/portas):</strong> ${descontada.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Área a pintar:</strong> ${areaUtil.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Estimativa de tinta:</strong> ${tinta.litrosTotalTexto}</p>
      <p class="mb-0"><strong>Configuração:</strong> ${
        tipoPintura === "nova" ? "Pintura nova" : "Repintura"
      } · 2 demãos padrão</p>
    </div>
  `;

  const patologiasTexto = patologias.length ? patologias.join(", ") : "Nenhuma patologia informada";

  const recomendacoesHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Recomendações técnicas</h4>
      <p class="mb-1">Tipo de ambiente: <strong>Residencial</strong></p>
      <p class="mb-1">Patologias identificadas: <strong>${patologiasTexto}</strong></p>
      <p class="mb-1">Sugestão de materiais:</p>
      <ul class="mb-1">
        <li>Tinta acrílica premium para áreas internas.</li>
        <li>Fundo preparador e massa corrida nas áreas com defeitos.</li>
        <li>Lixa, fita crepe e plásticos para proteção de móveis e rodapés.</li>
      </ul>
      <p class="mb-0 small text-muted">
        Os valores são estimados. A Criativa Pinturas confirma o orçamento após visita técnica.
      </p>
    </div>
  `;

  return { resumoHtml, recomendacoesHtml };
}

function calcularComercial() {
  const largura = lerNumero("comLargura");
  const comprimento = lerNumero("comComprimento");
  const altura = lerNumero("comAltura");

  if (!(largura > 0 && comprimento > 0 && altura > 0)) {
    alert("Preencha as medidas de largura, comprimento e altura do ambiente comercial.");
    return null;
  }

  const areaParedes = 2 * (largura + comprimento) * altura;

  const tipoPinturaInput = document.querySelector('input[name="comTipoPintura"]:checked');
  const tipoPintura = tipoPinturaInput ? tipoPinturaInput.value : "nova";

  const tinta = calcularLitrosTinta(areaParedes, tipoPintura);
  const patologias = coletarPatologias(".comPatologia");

  const resumoHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Pintura comercial</h4>
      <p class="mb-1"><strong>Área estimada de paredes:</strong> ${areaParedes.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Estimativa de tinta:</strong> ${tinta.litrosTotalTexto}</p>
      <p class="mb-0"><strong>Configuração:</strong> ${
        tipoPintura === "nova" ? "Pintura nova" : "Repintura"
      } · 2 demãos padrão</p>
    </div>
  `;

  const patologiasTexto = patologias.length ? patologias.join(", ") : "Nenhuma patologia informada";

  const recomendacoesHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Recomendações técnicas</h4>
      <p class="mb-1">Tipo de ambiente: <strong>Comercial</strong></p>
      <p class="mb-1">Patologias identificadas: <strong>${patologiasTexto}</strong></p>
      <p class="mb-1">Sugestão de materiais:</p>
      <ul class="mb-1">
        <li>Tinta acrílica de alto desempenho, própria para tráfego intenso.</li>
        <li>Preparação adequada em áreas com umidade ou manchas.</li>
        <li>Proteção de pisos, mobiliário e vitrines antes da pintura.</li>
      </ul>
      <p class="mb-0 small text-muted">
        Vidros de vitrines não são considerados na metragem de pintura.
      </p>
    </div>
  `;

  return { resumoHtml, recomendacoesHtml };
}

function calcularPredial() {
  const perimetro = lerNumero("predPerimetro");
  const altura = lerNumero("predAltura");
  const areaMuros = Math.max(0, lerNumero("predAreaMuros"));

  if (!(perimetro > 0 && altura > 0)) {
    alert("Informe o perímetro e a altura total do prédio.");
    return null;
  }

  const areaFachada = perimetro * altura;
  const areaTotal = areaFachada + areaMuros;

  const tipoPinturaInput = document.querySelector('input[name="predTipoPintura"]:checked');
  const tipoPintura = tipoPinturaInput ? tipoPinturaInput.value : "nova";

  const tinta = calcularLitrosTinta(areaTotal, tipoPintura);
  const patologias = coletarPatologias(".predPatologia");

  const usaAndaime = document.getElementById("predUsaAndaime")?.checked;
  const usaBalancim = document.getElementById("predUsaBalancim")?.checked;

  const estruturas = [];
  if (usaAndaime) estruturas.push("andaime");
  if (usaBalancim) estruturas.push("balancim/plataforma");

  const estruturasTexto = estruturas.length ? estruturas.join(" e ") : "A definir após vistoria";

  const resumoHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Pintura predial e muros</h4>
      <p class="mb-1"><strong>Área de fachada:</strong> ${areaFachada.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Área adicional de muros:</strong> ${areaMuros.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Área total a pintar:</strong> ${areaTotal.toFixed(1)} m²</p>
      <p class="mb-1"><strong>Estimativa de tinta:</strong> ${tinta.litrosTotalTexto}</p>
      <p class="mb-0"><strong>Estruturas de acesso:</strong> ${estruturasTexto}</p>
    </div>
  `;

  const patologiasTexto = patologias.length ? patologias.join(", ") : "Nenhuma patologia informada";

  const recomendacoesHtml = `
    <div class="testimonial-item">
      <h4 class="mb-2">Recomendações técnicas</h4>
      <p class="mb-1">Tipo de serviço: <strong>Predial / Muros</strong></p>
      <p class="mb-1">Patologias identificadas: <strong>${patologiasTexto}</strong></p>
      <p class="mb-1">Sugestão de materiais e logística:</p>
      <ul class="mb-1">
        <li>Tinta acrílica ou elastomérica para fachadas externas.</li>
        <li>Correção prévia de trincas, infiltrações e desplacamentos.</li>
        <li>Planejamento de segurança: linhas de vida, EPI e estruturas de acesso.</li>
      </ul>
      <p class="mb-0 small text-muted">
        A necessidade de andaimes, balancim ou plataforma é confirmada na visita técnica.
      </p>
    </div>
  `;

  return { resumoHtml, recomendacoesHtml };
}

/* ======================
   Wizard: passos e seleção
   ====================== */

function atualizarCamposParedesResidenciais() {
  const numParedesInput = document.getElementById("resNumParedes");
  const container = document.getElementById("resParedesContainer");

  if (!numParedesInput || !container) return;

  let quantidade = parseInt(numParedesInput.value, 10);
  if (isNaN(quantidade) || quantidade < 1) quantidade = 1;
  if (quantidade > 12) quantidade = 12;

  container.innerHTML = "";

  for (let i = 1; i <= quantidade; i++) {
    const grupo = document.createElement("div");
    grupo.className = "row g-2 align-items-end";
    grupo.innerHTML = `
      <div class="col-12 col-md-6">
        <label class="form-label">Parede ${i} - largura (m)</label>
        <input type="number" step="0.1" min="0" class="form-control" id="resLargura_${i}" />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Parede ${i} - altura (m)</label>
        <input type="number" step="0.1" min="0" class="form-control" id="resAltura_${i}" />
      </div>
    `;
    container.appendChild(grupo);
  }
}

function mostrarPrimeiraPergunta(tipo) {
  const wizard = document.getElementById("calcWizard");
  if (!wizard) return;

  const stepSelector = wizard.querySelector(".calc-step-selector");
  if (stepSelector) {
    stepSelector.style.display = "none";
  }

  const flows = wizard.querySelectorAll(".calc-type-flow");
  flows.forEach((flow) => {
    if (flow.getAttribute("data-tipo") === tipo) {
      flow.style.display = "block";
      const steps = flow.querySelectorAll(".calc-step");
      steps.forEach((s, index) => {
        s.style.display = index === 0 ? "block" : "none";
      });
    } else {
      flow.style.display = "none";
    }
  });
}

function initTipoSelector() {
  const cards = document.querySelectorAll(".calc-type-card");
  const btnContinuar = document.getElementById("btnWizardContinuar");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const tipo = card.getAttribute("data-tipo");
      tipoSelecionado = tipo;

      cards.forEach((c) => c.classList.toggle("active", c === card));

      if (btnContinuar) {
        btnContinuar.disabled = false;
      }
    });
  });

  if (btnContinuar) {
    btnContinuar.addEventListener("click", () => {
      if (!tipoSelecionado) {
        alert("Selecione um tipo de ambiente para continuar.");
        return;
      }
      mostrarPrimeiraPergunta(tipoSelecionado);
    });
  }
}

function initNavegacaoPassos() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-step-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-step-action");
    const form = btn.closest("form");
    if (!form) return;

    const steps = Array.from(form.querySelectorAll(".calc-step"));
    const stepAtual = btn.closest(".calc-step");
    const indexAtual = steps.indexOf(stepAtual);
    if (indexAtual === -1) return;

    if (action === "next" && indexAtual < steps.length - 1) {
      steps[indexAtual].style.display = "none";
      steps[indexAtual + 1].style.display = "block";
    } else if (action === "prev" && indexAtual > 0) {
      steps[indexAtual].style.display = "none";
      steps[indexAtual - 1].style.display = "block";
    } else if (action === "prev" && indexAtual === 0) {
      // voltar da 1ª etapa do fluxo para a seleção de tipo
      const wizard = document.getElementById("calcWizard");
      if (!wizard) return;
      const stepSelector = wizard.querySelector(".calc-step-selector");
      if (stepSelector) stepSelector.style.display = "block";

      const flows = wizard.querySelectorAll(".calc-type-flow");
      flows.forEach((flow) => (flow.style.display = "none"));
    }
  });
}

/* ======================
   Swiper dentro do card
   ====================== */

function initSwiperResultado() {
  const swiperContainer = document.querySelector("#calcResultado .swiper");
  if (!swiperContainer || typeof Swiper === "undefined") return;

  swiper = new Swiper(swiperContainer, {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: "#calcResultado .swiper-pagination",
      clickable: true
    }
  });
}

/* Botão "Novo cálculo" */

function mostrarFormulario() {
  const wizard = document.getElementById("calcWizard");
  const resultadoBox = document.getElementById("calcResultado");
  if (!wizard || !resultadoBox) return;

  // volta pro formulário
  resultadoBox.style.display = "none";
  wizard.style.display = "block";

  // volta para seleção de tipo, limpa seleção
  const stepSelector = wizard.querySelector(".calc-step-selector");
  if (stepSelector) {
    stepSelector.style.display = "block";
  }

  const flows = wizard.querySelectorAll(".calc-type-flow");
  flows.forEach((flow) => {
    flow.style.display = "none";
  });

  const cards = wizard.querySelectorAll(".calc-type-card");
  cards.forEach((card) => card.classList.remove("active"));

  const btnContinuar = document.getElementById("btnWizardContinuar");
  if (btnContinuar) {
    btnContinuar.disabled = true;
  }

  tipoSelecionado = null;
}

window.mostrarFormulario = mostrarFormulario;

/* ======================
   Inicialização geral
   ====================== */

document.addEventListener("DOMContentLoaded", () => {
  initTipoSelector();
  initNavegacaoPassos();
  initSwiperResultado();

  const resNumParedes = document.getElementById("resNumParedes");
  if (resNumParedes) {
    resNumParedes.addEventListener("input", atualizarCamposParedesResidenciais);
    atualizarCamposParedesResidenciais();
  }

  const formResidencial = document.getElementById("formCalcResidencial");
  if (formResidencial) {
    formResidencial.addEventListener("submit", (event) => {
      event.preventDefault();
      const dados = calcularResidencial();
      if (dados) {
        mostrarResultado("residencial", dados);
      }
    });
  }

  const formComercial = document.getElementById("formCalcComercial");
  if (formComercial) {
    formComercial.addEventListener("submit", (event) => {
      event.preventDefault();
      const dados = calcularComercial();
      if (dados) {
        mostrarResultado("comercial", dados);
      }
    });
  }

  const formPredial = document.getElementById("formCalcPredial");
  if (formPredial) {
    formPredial.addEventListener("submit", (event) => {
      event.preventDefault();
      const dados = calcularPredial();
      if (dados) {
        mostrarResultado("predial", dados);
      }
    });
  }
});