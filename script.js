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
      alert(`Presente reservado! Restam ${atualizado.assinaturasrestantes}`);

      await carregarPresentes();
    } catch (err) {
      console.error("Erro ao assinar presente:", err);
      alert("Erro ao registrar a reserva.");
    }
  }

  // === tabela de presentes ===
  function carregarTabela() {
    const tbody = document.querySelector("#tabela-presentes");
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
      const reservasUsadas = item.maxassinaturas - item.assinaturasrestantes;
      if (item.assinaturasrestantes > 0) {
        tdStatus.innerHTML = `Disponível (${reservasUsadas}/${item.maxassinaturas})`;
      } else {
        tdStatus.innerHTML = `Esgotado ✅<br><small>(${reservasUsadas}/${item.maxassinaturas})</small>`;
      }

      // ✅ Mostrar nomes dos assinantes
      if (item.assinantes && item.assinantes.length > 0) {
        tdStatus.innerHTML += `<br><small>Assinantes: ${item.assinantes.join(", ")}</small>`;
      }

      const tdAcao = document.createElement("td");
      if (item.assinaturasrestantes > 0) {
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

    // ✅ Inicializar corretamente o Swiper sem resetar
    if (!window.mySwiper) {
      window.mySwiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      });
    } else {
      window.mySwiper.update();
    }
  }

  // === renderização ===
  function renderizarTudo() {
    carregarTabela();
  }

  document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
  });
}

