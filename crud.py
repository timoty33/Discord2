from dotenv import load_dotenv
import os
from supabase import create_client

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Obter URL e chave do Supabase do .env
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

def inserir(usuario_id, message):
    # Inserindo a mensagem no banco de dados associando ao usuario_id
    data = supabase.table("chat1").insert({
        "usuario_id": usuario_id,  # Associando a mensagem ao usuário
        "message": message
    }).execute()
    return data

def pedir():
    # Recuperando todas as mensagens e associando com o usuário
    select = supabase.table("chat1").select("*, usuarios(username)").execute()
    return select
