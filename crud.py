from dotenv import load_dotenv
import os
from supabase import create_client
import getpass

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Obter URL e chave do Supabase do .env
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

def inserir(username, message):
    data = supabase.table("chat1").insert({
        "username": str(username),
        "message": str(message)
    }).execute()
    return data

def pedir():
    select = supabase.table("chat1").select("*, usuarios(usuario)").execute()
    return select

def deletar_tudo():
    senha_digitada = getpass.getpass("Digite a senha para deletar: ")
    
    # Comparar a senha digitada com a senha original
    if senha_digitada == "Timoteo2011@":
        data = supabase.table("chat1").delete().neq("id", 0).execute()
        print("Deletado com sucesso")
        return data
    else:
        print("Senha incorreta!")
        return
    