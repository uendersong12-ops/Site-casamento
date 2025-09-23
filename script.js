if (typeof window !== "undefined") {
  const API_URL = "https://site-casamento-backend.onrender.com";
  const IMG_PREFIX = "imagens/";

  let presentes = [];

  // === Carregar presentes do backend ===
  async function carregarPresentes() {
    try {
      const res = await fetch(`${API_URL}/presentes`);
      presentes = await res.json();
      renderizarTudo();
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
      alert("Não foi possível carregar a lista de presentes.");
    }
  }

  // === Assinar presente no backend ===
  async function reservarPresente(index) {
    const item = presentes[index];
    const nome = prompt("Digite seu nome para reservar este presente:");
    if (!nome || !nome.trim()) {
      alert("Reserva cancelada. Nome é obrigatório.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/assinar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, nome })
      });

      if (!res.ok) {
        const erro = await res.text();
        alert("Erro: " + erro);
        return;
      }

      const atualizado = await res.json();
      alert(`Presente reservado! Restam ${atualizado.assinaturasRestantes}`);

      await carregarPresentes();
    } catch (err) {
      console.error("Erro ao assinar presente:", err);
      alert("Erro ao registrar a reserva.");
    }
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
      right.style.flexDirection = "column";
      right.style.alignItems = "flex-end";
      right.style.gap = "6px";

      const reservasUsadas = item.maxAssinaturas - item.assinaturasRestantes;
      const status = document.createElement("div");

      if (item.assinaturasRestantes > 0) {
        status.textContent = `Disponível (${reservasUsadas}/${item.maxAssinaturas})`;
      } else {
        status.textContent = `Esgotado (${reservasUsadas}/${item.maxAssinaturas})`;
      }

      right.appendChild(status);

      if (item.assinaturas && item.assinaturas.length > 0) {
        const assinantes = document.createElement("div");
        assinantes.textContent = "Assinantes: " + item.assinaturas.join(", ");
        assinantes.style.fontSize = "0.85rem";
        assinantes.style.color = "#555";
        right.appendChild(assinantes);
      }

      if (item.assinaturasRestantes > 0) {
        const btn = document.createElement("button");
        btn.textContent = "Reservar";
        btn.onclick = () => reservarPresente(index);
        btn.style.padding = "8px 12px";
        btn.style.background = "#d2691e";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "6px";
        right.appendChild(btn);
      }

      li.appendChild(left);
      li.appendChild(right);
      ul.appendChild(li);
    });
  }

  // === tabela de presentes ===
  function carregarTabela() {
    const tbody = document.querySelector("#tabela-presentes tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    presentes.forEach((item, index) => {
      const tr = document.createElement("tr");

      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.src = IMG_PREFIX + (item.imagem || "placeholder.jpg");
      img.alt = item.nome;
      img.style.width = "72px";
      img.style.height = "54px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "6px";
      tdImg.appendChild(img);

      const tdNome = document.createElement("td");
      tdNome.textContent = item.nome;

      const tdValor = document.createElement("td");
      tdValor.textContent = item.valor;

      const tdStatus = document.createElement("td");
      const reservasUsadas = item.maxAssinaturas - item.assinaturasRestantes;

      tdStatus.innerHTML = item.assinaturasRestantes > 0
        ? `Disponível (${reservasUsadas}/${item.maxAssinaturas})`
        : `Esgotado (${reservasUsadas}/${item.maxAssinaturas})`;

      if (item.assinaturas && item.assinaturas.length > 0) {
        const assinantes = document.createElement("div");
        assinantes.textContent = "Assinantes: " + item.assinaturas.join(", ");
        assinantes.style.fontSize = "0.85rem";
        assinantes.style.color = "#555";
        tdStatus.appendChild(document.createElement("br"));
        tdStatus.appendChild(assinantes);
      }

      const tdAcao = document.createElement("td");
      if (item.assinaturasRestantes > 0) {
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

  // === renderização ===
  function renderizarTudo() {
    carregarTabela();
    carregarListaUL();
    carregarCarrossel();
  }

  document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
  });

  // Debug opcional
  window.presenteData = () => presentes;
}
