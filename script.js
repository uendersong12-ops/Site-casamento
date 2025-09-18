// Verifica se está no navegador
if (typeof window !== "undefined") {
  // Lista de presentes (completa)
  let presentes = [
    { nome: "Jogo de panelas", valor: "R$ 120,00", reservado: false, reservadoPor: "", imagem: "jogo de panelas.jpg" },
    { nome: "Toalhas de banho", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "toalhas.jpg" },
    { nome: "Faqueiro", valor: "R$ 90,00", reservado: false, reservadoPor: "", imagem: "faqueiro.jpg" },
    { nome: "Jogo de cama", valor: "R$ 110,00", reservado: false, reservadoPor: "", imagem: "lencois.jpg" },
    { nome: "Cafeteira elétrica", valor: "R$ 160,00", reservado: false, reservadoPor: "", imagem: "cafeteira.jpg" },
    { nome: "Micro-ondas", valor: "R$ 500,00", reservado: false, reservadoPor: "", imagem: "microondas.jpg" },
    { nome: "Geladeira", valor: "R$ 5.000,00", reservado: false, reservadoPor: "", imagem: "geladeira.jpg" },
    { nome: "Fogão de Embutir", valor: "R$ 1.000,00", reservado: false, reservadoPor: "", imagem: "fogao.jpg" },
    { nome: "Batedeira", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "batedeira.jpg" },
    { nome: "Panela de pressão 10L", valor: "R$ 200,00", reservado: false, reservadoPor: "", imagem: "pressao10l.jpg" },
    { nome: "Panela de pressão elétrica", valor: "R$ 400,00", reservado: false, reservadoPor: "", imagem: "pressaoeletrica.jpg" },
    { nome: "Frigideira", valor: "R$ 45,00", reservado: false, reservadoPor: "", imagem: "frigideira.jpg" },
    { nome: "Conjunto de talheres de inox", valor: "R$ 72,65", reservado: false, reservadoPor: "", imagem: "talheres.jpg" },
    { nome: "Faqueiro 2x", valor: "R$ 72,65", reservado: false, reservadoPor: "", imagem: "faqueiro2.jpg" },
    { nome: "Utensílios de silicone ou inox", valor: "R$ 100,00", reservado: false, reservadoPor: "", imagem: "utensilios.jpg" },
    { nome: "Tábua de corte", valor: "R$ 30,00", reservado: false, reservadoPor: "", imagem: "tabua.jpg" },
    { nome: "Travessa de vidro", valor: "R$ 35,00", reservado: false, reservadoPor: "", imagem: "travessa.jpg" },
    { nome: "Espremedor de frutas", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "espremedor.jpg" },
    { nome: "Sanduicheira", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "sanduicheira.jpg" },
    { nome: "Conjunto de pratos 2x", valor: "R$ 100,00", reservado: false, reservadoPor: "", imagem: "pratos.jpg" },
    { nome: "Copos 3x", valor: "R$ 30,00", reservado: false, reservadoPor: "", imagem: "copos.jpg" },
    { nome: "Taças 2x", valor: "R$ 50,00", reservado: false, reservadoPor: "", imagem: "tacas.jpg" },
    { nome: "Potes de vidro herméticos", valor: "R$ 89,90", reservado: false, reservadoPor: "", imagem: "poteshermeticos.jpg" },
    { nome: "Potes de vidro", valor: "R$ 50,00", reservado: false, reservadoPor: "", imagem: "potes.jpg" },
    { nome: "Jarra 4x", valor: "R$ 55,90", reservado: false, reservadoPor: "", imagem: "jarra.jpg" },
    { nome: "Forma de bolo", valor: "R$ 27,00", reservado: false, reservadoPor: "", imagem: "formabolo.jpg" },
    { nome: "Forma de pudim", valor: "R$ 27,00", reservado: false, reservadoPor: "", imagem: "formapudim.jpg" },
    { nome: "Escorredor de louças", valor: "R$ 139,00", reservado: false, reservadoPor: "", imagem: "escorredor.jpg" },
    { nome: "Lixeira (cozinha)", valor: "R$ 89,99", reservado: false, reservadoPor: "", imagem: "lixeiracozinha.jpg" },
    { nome: "Lava e Seca", valor: "R$ 3.000,00", reservado: false, reservadoPor: "", imagem: "lavaeseca.jpg" },
    { nome: "Varal de parede", valor: "R$ 75,00", reservado: false, reservadoPor: "", imagem: "varalparede.jpg" },
    { nome: "Varal de chão", valor: "R$ 95,00", reservado: false, reservadoPor: "", imagem: "varalchao.jpg" },
    { nome: "Robô aspirador", valor: "R$ 600,00", reservado: false, reservadoPor: "", imagem: "robo.jpg" },
    { nome: "Aspirador vertical", valor: "R$ 150,00", reservado: false, reservadoPor: "", imagem: "aspirador.jpg" },
    { nome: "Ferro de passar roupa", valor: "R$ 89,90", reservado: false, reservadoPor: "", imagem: "ferro.jpg" },
    { nome: "Sofá retrátil (sem caixa)", valor: "R$ 3.000,00", reservado: false, reservadoPor: "", imagem: "sofa.jpg" },
    { nome: "Mantas e almofadas para o sofá", valor: "R$ 150,00", reservado: false, reservadoPor: "", imagem: "mantas.jpg" },
    { nome: "Painel de TV", valor: "R$ 600,00", reservado: false, reservadoPor: "", imagem: "painel.jpg" },
    { nome: "TV", valor: "—", reservado: false, reservadoPor: "", imagem: "tv.jpg" },
    { nome: "Mesa (4 lugares)", valor: "R$ 700,00", reservado: false, reservadoPor: "", imagem: "mesa.jpg" },
    { nome: "Cama", valor: "R$ 3.000,00", reservado: false, reservadoPor: "", imagem: "cama.jpg" },
    { nome: "Guarda-roupas", valor: "R$ 800,00", reservado: false, reservadoPor: "", imagem: "guarda.jpg" },
    { nome: "Jogo de cama (3x)", valor: "R$ 80,00", reservado: false, reservadoPor: "", imagem: "jogocama.jpg" }
  ];

  // Carrega os dados do localStorage
  function carregarPresentes() {
    const dados = localStorage.getItem("presentes");
    if (dados) {
      try {
        presentes = JSON.parse(dados);
      } catch (e) {
        console.error("Erro ao carregar dados salvos:", e);
      }
    }
  }

  // Salva no localStorage
  function salvarPresentes() {
    localStorage.setItem("presentes", JSON.stringify(presentes));
  }

  // Renderiza a tabela
  function carregarTabela() {
    const tabela = document.getElementById("tabela-presentes");
    if (!tabela) return;

    tabela.innerHTML = "";

    presentes.forEach((item, index) => {
      const tr = document.createElement("tr");

      const tdImagem = document.createElement("td");
      const img = document.createElement("img");
      img.src = "imagens/" + (item.imagem || "placeholder.jpg");
      img.alt = item.nome;
      img.style.width = "80px";
      img.style.height = "60px";
      img.style.objectFit = "cover";
      tdImagem.appendChild(img);

      const tdNome = document.createElement("td");
      tdNome.textContent = item.nome;

      const tdValor = document.createElement("td");
      tdValor.textContent = item.valor;

      const tdStatus = document.createElement("td");
      tdStatus.textContent = item.reservado ? "Reservado ✅" : "Disponível 🎁";

      const tdAcao = document.createElement("td");
      if (!item.reservado) {
        const botao = document.createElement("button");
        botao.textContent = "Reservar";
        botao.className = "btn-reservar";
        botao.onclick = () => reservarPresente(index);
        tdAcao.appendChild(botao);
      } else {
        tdAcao.textContent = "—";
      }

      tr.appendChild(tdImagem);
      tr.appendChild(tdNome);
      tr.appendChild(tdValor);
      tr.appendChild(tdStatus);
      tr.appendChild(tdAcao);

      tabela.appendChild(tr);
    });
  }

  // Reservar presente
  function reservarPresente(index) {
    const nome = prompt("Digite seu nome para reservar este presente:");
    if (!nome || nome.trim() === "") {
      alert("Reserva cancelada. Nome é obrigatório.");
      return;
    }
    presentes[index].reservado = true;
    presentes[index].reservadoPor = nome.trim();
    salvarPresentes();
    carregarTabela();
  }

  // Para ver reservas no console
  function mostrarReservasPrivadas() {
    console.log("Reservas feitas:");
    presentes.forEach(item => {
      if (item.reservado) {
        console.log(`${item.nome} foi reservado por ${item.reservadoPor}`);
      }
    });
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
    carregarTabela();
  });
}


