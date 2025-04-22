from flask import Flask, render_template, request, jsonify
from crud import inserir, pedir

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mensagem', methods=['POST'])
def rota_inserir():
    data = request.json
    username = data.get("username")
    message = data.get("message")

    if not username or not message:
        return jsonify({"erro": "username e message são obrigatórios"}), 400

    resultado = inserir(username, message)  # Insere no banco de dados
    return jsonify({"status": "Mensagem enviada com sucesso", "data": resultado.data}), 201

@app.route('/mensagens', methods=['GET'])
def rota_pedir():
    resultado = pedir()
    return jsonify(resultado.data)
    
