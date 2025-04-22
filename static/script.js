username = prompt("Digite seu nome de usuário:");
localStorage.setItem("username", username);

document.getElementById("usuario-logado").textContent = `Usuário: ${username}`;

document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagem();
  }
});

async function enviarMensagem() {
  const message = document.getElementById("input").value;
  if (!message) return;

  const resposta = await fetch("/mensagem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  console.log(dados);
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  dados.forEach((msg) => {
    const mensagemCriada = document.createElement("div");
    mensagemCriada.classList.add("mensagemCriada");

    const usuario = document.createElement("p");
    usuario.classList.add("usuario");
    usuario.textContent = `${msg.username}`;
    mensagemCriada.appendChild(usuario);

    const horario = document.createElement("p");
    horario.classList.add("horario");
    const data = new Date(msg.created_at); // Transformar a string em um objeto Date
    const horarioFormatado = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`; // Formatar a hora como HH:MM:SS
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
