from flask import Flask, render_template, request, jsonify
from crud import inserir, pedir
from crud_usuario import cadastrar, login

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
    
@app.route('/login', methods=['POST'])
def rota_login():
    data = request.json
    username = data.get("username")
    senha = data.get("senha")

    if not username or not senha:
        return jsonify({"erro": "username e senha são obrigatórios"}), 400

    resultado = login(username, senha)

    if resultado.data:
        return jsonify({"mensagem": "Login efetuado com sucesso!"})
    else:
        return jsonify({"erro": "Usuário ou senha incorretos!"})
    
@app.route('/cadastrar', methods=['POST'])
def rota_cadastrar():
    data = request.json
    username = data.get("username")
    senha = data.get("senha")

    if not username or not senha:
        return jsonify({"erro": "username e senha são obrigatórios"}), 400

    resultado = cadastrar(username, senha)

    if resultado.status_code == 201:
        return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201
    else:
        return jsonify({"erro": "Erro ao cadastrar usuário"}), 400

