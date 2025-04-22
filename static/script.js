username = prompt("Digite seu nome de usuário:");
localStorage.setItem("username", username);

document.getElementById("usuario-logado").textContent = `Usuário: ${username}`;

async function enviarMensagem() {
  const message = document.getElementById("input").value;

  if (!message) return; // Não envia mensagem vazia

  const resposta = await fetch("/mensagem", {
    method: "POST", // Corrigido de "PHOST" para "POST"
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, message }), // Corrigido para JSON.stringify
  });

  document
    .getElementById("input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        enviarMensagem();
      }
    });

  if (resposta.ok) {
    document.getElementById("input").value = ""; // Limpa o campo de entrada após o envio
    buscarMensagens(); // Atualiza as mensagens após enviar
  } else {
    console.error("Erro ao enviar mensagem:", resposta);
  }
}

async function buscarMensagens() {
  const resposta = await fetch("/mensagens");
  const dados = await resposta.json();
  const chat = document.getElementById("chat");
  chat.innerHTML = ""; // Limpa antes de mostrar as novas mensagens

  dados.forEach((msg) => {
    const p = document.createElement("p");
    p.textContent = `${msg.username}: ${msg.message}`;
    chat.appendChild(p);
  });
}

setInterval(buscarMensagens, 3000); // Atualiza a cada 3 segundos
buscarMensagens();
