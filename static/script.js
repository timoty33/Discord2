let username = ""; // Variável global para o usuário logado

document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagem();
  }
});

function escolherAcao() {
  const escolha = prompt("Digite:\n1 - Login\n2 - Cadastrar");

  if (escolha === "1") {
    fazerLogin();
  } else if (escolha === "2") {
    fazerCadastro();
  } else {
    alert("Opção inválida");
    escolherAcao();
  }
}

async function enviarMensagem() {
  const message = document.getElementById("input").value;
  if (!message || !username) return;

  const resposta = await fetch("/mensagem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, message }),
  });

  if (resposta.ok) {
    document.getElementById("input").value = "";
    buscarMensagens();
  } else {
    console.error("Erro ao enviar mensagem:", resposta);
  }
}

async function buscarMensagens() {
  const resposta = await fetch("/mensagens");
  const dados = await resposta.json();
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  dados.forEach((msg) => {
    const mensagemCriada = document.createElement("div");
    mensagemCriada.classList.add("mensagemCriada");

    const usuario = document.createElement("p");
    usuario.classList.add("usuario");
    usuario.textContent = `${msg.usuarios.username}`;
    mensagemCriada.appendChild(usuario);

    const horario = document.createElement("p");
    horario.classList.add("horario");
    const data = new Date(msg.created_at);
    const horarioFormatado = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    horario.textContent = `${horarioFormatado}`;
    mensagemCriada.appendChild(horario);

    const mensagem = document.createElement("p");
    mensagem.classList.add("mensagem");
    mensagem.textContent = msg.message;
    mensagemCriada.appendChild(mensagem);

    chat.appendChild(mensagemCriada);
  });

  chat.scrollTop = chat.scrollHeight;
}

setInterval(buscarMensagens, 3000);
buscarMensagens();

function fazerLogin() {
  const userInput = prompt("Digite seu usuário:");
  const senha = prompt("Digite sua senha:");

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: userInput, senha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.mensagem) {
        username = userInput; // Define o usuário global
        alert("✅ " + data.mensagem);
        document.getElementById(
          "usuario-logado"
        ).textContent = `Usuário: ${username}`;
      } else {
        alert("❌ " + data.erro);
        fazerLogin();
      }
    });
}

function fazerCadastro() {
  const novoUser = prompt("Escolha um nome de usuário:");
  const novaSenha = prompt("Escolha uma senha:");

  fetch("/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: novoUser, senha: novaSenha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.mensagem) {
        alert("✅ " + data.mensagem);
        // Você pode perguntar se o usuário quer logar agora
        const querLogar = confirm("Deseja fazer login agora?");
        if (querLogar) {
          fazerLogin();
        }
      } else {
        alert("❌ " + data.erro);
        fazerCadastro();
      }
    });
}
