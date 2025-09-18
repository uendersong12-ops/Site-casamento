// Verifica se está no navegador
if (typeof window !== "undefined") {
  // Lista de presentes personalizada
  let presentes = [
    { nome: "Jogo de panelas", valor: "R$ 120,00", reservado: false, reservadoPor: "", imagem: "jogo_de_panelas.jpg" },
    { nome: "Toalhas de banho", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "toalhas.jpg" },
    { nome: "Faqueiro", valor: "R$ 90,00", reservado: false, reservadoPor: "", imagem: "faqueiro.jpg" },
    // ... adicione os outros itens aqui ...
  ];

  // Carrega os dados salvos no localStorage
  function carregarPresentes() {
    const dados = localStorage.getItem("presentes");
    if (dados) {
      presentes = JSON.parse(dados);
    }
  }

  // Salva os dados no localStorage
  function salvarPresentes() {
    localStorage.setItem("presentes", JSON.stringify(presentes));
  }

  // Exibe a lista na tela
  function carregarLista() {
    const lista = document.getElementById("lista-presentes");
    lista.innerHTML = "";

    presentes.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.reservado ? "Reservado ✅" : "Disponível 🎁"}`;

      if (!item.reservado) {
        const botao = document.createElement("button");
        botao.textContent = "Reservar";
        botao.onclick = () => reservarPresente(index);
        li.appendChild(botao);
      }

      lista.appendChild(li);
    });

    carregarCarrossel(); // 🔥 atualiza o carrossel junto
  }

  // Função para reservar com nome privado
  function reservarPresente(index) {
    const nome = prompt("Digite seu nome para reservar este presente:");

    if (!nome || nome.trim() === "") {
      alert("Reserva cancelada. Nome é obrigatório.");
      return;
    }

    presentes[index].reservado = true;
    presentes[index].reservadoPor = nome.trim();
    salvarPresentes();
    carregarLista();
  }

  // Função para você ver quem reservou (no console)
  function mostrarReservasPrivadas() {
    console.log("Reservas feitas:");
    presentes.forEach(item => {
      if (item.reservado) {
        console.log(`${item.nome} foi reservado por ${item.reservadoPor}`);
      }
    });
  }

  // 🔥 Função para carregar imagens no carrossel
  function carregarCarrossel() {
    const wrapper = document.querySelector(".swiper-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    presentes.forEach(item => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const img = document.createElement("img");
      img.src = item.imagem; // caminho da imagem
      img.alt = item.nome;

      slide.appendChild(img);
      wrapper.appendChild(slide);
    });

    // Inicializa ou reinicializa o Swiper
    if (window.mySwiper) {
      window.mySwiper.update();
    } else {
      window.mySwiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }

  // Inicializa
  carregarPresentes();
  carregarLista();
}

