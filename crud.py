from dotenv import load_dotenv
import os
from supabase import create_client
import getpass

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

def inserir(usuario_id, message):
    data = supabase.table("chat1").insert({
        "usuario_id": usuario_id,
        "message": message
    }).execute()
    return data

def pedir():
    select = supabase.table("chat1").select("message, created_at, usuarios (username)").order("created_at", desc=False).execute()
    return select

def deletar_tudo():
    senha_digitada = getpass.getpass("Digite a senha para deletar: ")
    if senha_digitada == "Timoteo2011@":
        data = supabase.table("chat1").delete().neq("id", 0).execute()
        print("Deletado com sucesso")
        return data
    else:
        print("Senha incorreta!")
        return
