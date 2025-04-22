from dotenv import load_dotenv
import os
from supabase import create_client

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Obter URL e chave do Supabase do .env
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)
usuarios = supabase.table("usuarios")  # Nome da tabela de usuários no Supabase

def cadastrar(username, senha):
    # Inserindo usuário no banco de dados
    data = usuarios.insert({"username": username, "senha": senha}).execute()
    return data

def login(username, senha):
    # Realizando consulta de login, verificando username e senha
    select = usuarios.select("*").eq("username", username).eq("senha", senha).execute()
    return select  # Retorna os dados do usuário, incluindo o id
