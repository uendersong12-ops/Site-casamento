// script.js — lista completa + renderização em tabela/ul + carrossel
if (typeof window !== "undefined") {
  // === Lista completa de presentes ===
  let presentes = [
    { nome: "Jogo de panelas", valor: "R$ 120,00", imagem: "jogo de panelas.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Toalhas de banho", valor: "R$ 80,00", imagem: "toalhas.jpg", maxAssinaturas: 3, assinaturas: [] },
    { nome: "Faqueiro", valor: "R$ 90,00", imagem: "faqueiro.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Jogo de cama", valor: "R$ 110,00", imagem: "lencois.jpg", maxAssinaturas: 3, assinaturas: [] },
    { nome: "Cafeteira elétrica", valor: "R$ 160,00", imagem: "cafeteira.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Micro-ondas", valor: "R$ 500,00", imagem: "microondas.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Geladeira", valor: "R$ 5.000,00", imagem: "geladeira.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Fogão de Embutir", valor: "R$ 1.000,00", imagem: "fogao.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Batedeira", valor: "R$ 80,00", imagem: "batedeira.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Panela de pressão 10L", valor: "R$ 200,00", imagem: "pressao10l.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Panela de pressão elétrica", valor: "R$ 400,00", imagem: "pressaoeletrica.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Frigideira", valor: "R$ 45,00", imagem: "frigideira.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Conjunto de talheres de inox", valor: "R$ 72,65", imagem: "talheres.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Faqueiro", valor: "R$ 72,65", imagem: "faqueiro2.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Utensílios de silicone ou inox", valor: "R$ 100,00", imagem: "utensilios.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Tábua de corte", valor: "R$ 30,00", imagem: "tabua.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Travessa de vidro", valor: "R$ 35,00", imagem: "travessa.jpg", maxAssinaturas: 3, assinaturas: [] },
    { nome: "Espremedor de frutas", valor: "R$ 80,00", imagem: "espremedor.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Sanduicheira", valor: "R$ 80,00", imagem: "sanduicheira.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Conjunto de pratos", valor: "R$ 100,00", imagem: "pratos.jpg", maxAssinaturas: 3, assinaturas: [] },
    { nome: "Copos", valor: "R$ 30,00", imagem: "copos.jpg", maxAssinaturas: 3, assinaturas: [] },
    { nome: "Taças", valor: "R$ 50,00", imagem: "tacas.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Potes de vidro herméticos", valor: "R$ 89,90", imagem: "poteshermeticos.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Potes de vidro", valor: "R$ 50,00", imagem: "potes.jpg", maxAssinaturas: 2, assinaturas: [] },
    { nome: "Jarra", valor: "R$ 55,90", imagem: "jarra.jpg", maxAssinaturas: 4, assinaturas: [] },
    { nome: "Forma de bolo", valor: "R$ 27,00", imagem: "formabolo.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Forma de pudim", valor: "R$ 27,00", imagem: "formapudim.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Escorredor de louças", valor: "R$ 139,00", imagem: "escorredor.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Lixeira (cozinha)", valor: "R$ 89,99", imagem: "lixeiracozinha.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Lava e Seca", valor: "R$ 3.000,00", imagem: "lavaeseca.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Varal de parede", valor: "R$ 75,00", imagem: "varalparede.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Varal de chão", valor: "R$ 95,00", imagem: "varalchao.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Robô aspirador", valor: "R$ 600,00", imagem: "robo.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Aspirador vertical", valor: "R$ 150,00", imagem: "aspirador.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Ferro de passar roupa", valor: "R$ 89,90", imagem: "ferro.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Sofá retrátil (sem caixa)", valor: "R$ 3.000,00", imagem: "sofa.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Mantas e almofadas para o sofá", valor: "R$ 150,00", imagem: "mantas.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Painel de TV", valor: "R$ 600,00", imagem: "painel.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "TV", valor: "—", imagem: "tv.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Mesa (4 lugares)", valor: "R$ 700,00", imagem: "mesa.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Cama", valor: "R$ 3.000,00", imagem: "cama.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Guarda-roupas", valor: "R$ 800,00", imagem: "guarda.jpg", maxAssinaturas: 1, assinaturas: [] },
    { nome: "Jogo de cama (3x)", valor: "R$ 80,00", imagem: "jogocama.jpg", maxAssinaturas: 3, assinaturas: [] }
  ];

  const IMG_PREFIX = "imagens/";

  // === persistência ===
  function carregarPresentes() {
    const dados = localStorage.getItem("presentes");
    if (!dados) return;

    try {
      const parsed = JSON.parse(dados);
      if (!Array.isArray(parsed)) return;

      presentes = parsed.map(orig => ({
        nome: orig.nome || "",
        valor: orig.valor || "—",
        imagem: orig.imagem || "placeholder.jpg",
        maxAssinaturas: (typeof orig.maxAssinaturas === "number") ? orig.maxAssinaturas : 1,
        assinaturas: Array.isArray(orig.assinaturas) ? orig.assinaturas.slice() : []
      }));

      salvarPresentes();
    } catch (err) {
      console.error("Erro ao parsear localStorage:", err);
    }
  }

  function salvarPresentes() {
    localStorage.setItem("presentes", JSON.stringify(presentes));
  }

  // === lista em UL ===
  function carregarListaUL() {
    const ul = document.getElementById("lista-presentes");
    if (!ul) return;
    ul.innerHTML = "";

    presentes.forEach((item, index) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.justifyContent = "space-between";
      li.style.padding = "10px 0";
      li.style.borderBottom = "1px solid #eee";

      const left = document.createElement("div");
      left.style.display = "flex";
      left.style.alignItems = "center";
      left.style.gap = "12px";

      const img = document.createElement("img");
      img.src = IMG_PREFIX + (item.imagem || "placeholder.jpg");
      img.alt = item.nome;
      img.style.width = "72px";
      img.style.height = "54px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "6px";

      const info = document.createElement("div");
      info.innerHTML = `<strong>${item.nome}</strong><div style="font-size:0.95rem;color:#666">${item.valor}</div>`;

      left.appendChild(img);
      left.appendChild(info);

      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "12px";

      const status = document.createElement("div");
      status.textContent = `${item.assinaturas.length}/${item.maxAssinaturas} reservas`;
      if (item.assinaturas.length > 0) {
        status.textContent += ` — (${item.assinaturas.join(", ")})`;
      }

      if (item.assinaturas.length < item.maxAssinaturas) {
        const btn = document.createElement("button");
        btn.textContent = "Reservar";
        btn.onclick = () => reservarPresente(index);
        btn.style.padding = "8px 12px";
        btn.style.background = "#d2691e";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "6px";
        right.appendChild(status);
        right.appendChild(btn);
      } else {
        right.appendChild(status);
      }

      li.appendChild(left);
      li.appendChild(right);
      ul.appendChild(li);
    });
  }

  // === tabela de presentes ===
  // === tabela de presentes ===
function carregarTabela() {
  const tbody = document.querySelector("#tabela-presentes tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  presentes.forEach((item, index) => {
    const tr = document.createElement("tr");

    // coluna imagem
    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = IMG_PREFIX + (item.imagem || "placeholder.jpg");
    img.alt = item.nome;
    img.style.width = "72px";
    img.style.height = "54px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "6px";
    tdImg.appendChild(img);

    // coluna nome
    const tdNome = document.createElement("td");
    tdNome.textContent = item.nome;

    // coluna valor
    const tdValor = document.createElement("td");
    tdValor.textContent = item.valor;

    // coluna status (corrigido)
    const tdStatus = document.createElement("td");
    const atuais = item.assinaturas.length; // conta corretamente quantas reservas existem
    tdStatus.textContent = `Disponível (${atuais}/${item.maxAssinaturas})`;

    if (item.assinaturas.length > 0) {
      const lista = document.createElement("div");
      lista.style.fontSize = "0.85rem";
      lista.style.color = "#555";
      lista.textContent = "Reservado por: " + item.assinaturas.join(", ");
      tdStatus.appendChild(document.createElement("br"));
      tdStatus.appendChild(lista);
    }

    // coluna ação
    const tdAcao = document.createElement("td");
    if (item.assinaturas.length < item.maxAssinaturas) {
      const btn = document.createElement("button");
      btn.textContent = "Reservar";
      btn.className = "btn-reservar";
      btn.onclick = () => reservarPresente(index);
      tdAcao.appendChild(btn);
    } else {
      tdAcao.textContent = "—";
    }

    tr.appendChild(tdImg);
    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcao);

    tbody.appendChild(tr);
  });
}
  // === carrossel ===
  function carregarCarrossel() {
    const wrapper = document.querySelector(".swiper-wrapper");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    presentes.forEach(item => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const img = document.createElement("img");
      img.src = IMG_PREFIX + (item.imagem || "placeholder.jpg");
      img.alt = item.nome;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      slide.appendChild(img);
      wrapper.appendChild(slide);
    });

    if (window.Swiper) {
      if (window.mySwiper) {
        try { window.mySwiper.update(); } catch (e) { console.warn(e); }
      } else {
        window.mySwiper = new Swiper(".mySwiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
      }
    }
  }

  // === ações ===
  function reservarPresente(index) {
    const nome = prompt("Digite seu nome para reservar este presente:");
    if (!nome || !nome.trim()) {
      alert("Reserva cancelada. Nome é obrigatório.");
      return;
    }

    const item = presentes[index];
    if (item.assinaturas.length < item.maxAssinaturas) {
      item.assinaturas.push(nome.trim());
      salvarPresentes();
      renderizarTudo();
    } else {
      alert("Este presente já atingiu o limite de reservas.");
    }
  }

  function mostrarReservasPrivadas() {
    console.log("Reservas privadas:");
    presentes.forEach(p => {
      if (p.assinaturas && p.assinaturas.length > 0) {
        console.log(`${p.nome} — ${p.assinaturas.join(", ")}`);
      }
    });
  }

  function renderizarTudo() {
    carregarTabela();
    carregarListaUL();
    carregarCarrossel();
  }

  document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
    renderizarTudo();
  });

  window.mostrarReservasPrivadas = mostrarReservasPrivadas;
  window.presenteData = () => presentes;
}


