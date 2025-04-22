let usuarioLogado = null;

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

async function fazerLogin() {
  const username = prompt("Digite seu usuário:");
  const senha = prompt("Digite sua senha:");

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, senha }),
  });

  const data = await res.json();

  if (data.mensagem) {
    alert("✅ " + data.mensagem);
    usuarioLogado = data.usuario;
    document.getElementById(
      "usuario-logado"
    ).textContent = `Usuário: ${usuarioLogado.username}`;
  } else {
    alert("❌ " + data.erro);
    fazerLogin();
  }
}

async function fazerCadastro() {
  const username = prompt("Escolha um nome de usuário:");
  const senha = prompt("Escolha uma senha:");

  const res = await fetch("/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, senha }),
  });

  const data = await res.json();

  if (data.mensagem) {
    alert("✅ " + data.mensagem);
  } else {
    alert("❌ " + data.erro);
    fazerCadastro();
  }
}

async function enviarMensagem() {
  const message = document.getElementById("input").value;
  if (!message || !usuarioLogado) return;

  const resposta = await fetch("/mensagem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id: usuarioLogado.id, message }),
  });

  if (resposta.ok) {
    document.getElementById("input").value = "";
    buscarMensagens();
  } else {
    alert("Erro ao enviar mensagem");
  }
}

async function buscarMensagens() {
  const resposta = await fetch("/mensagens");
  const dados = await resposta.json();
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  dados.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("mensagemCriada");

    const usuario = document.createElement("p");
    usuario.textContent = msg.usuarios.username;

    const horario = document.createElement("p");
    const data = new Date(msg.created_at);
    horario.textContent = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

    const mensagem = document.createElement("p");
    mensagem.textContent = msg.message;

    div.appendChild(usuario);
    div.appendChild(horario);
    div.appendChild(mensagem);

    chat.appendChild(div);
  });

  chat.scrollTop = chat.scrollHeight;
}

escolherAcao();
setInterval(buscarMensagens, 3000);
buscarMensagens();
