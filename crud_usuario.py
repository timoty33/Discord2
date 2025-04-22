from dotenv import load_dotenv
import os
from supabase import create_client

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)
usuarios = supabase.table("usuarios")

def cadastrar(username, senha):
    return usuarios.insert({"username": username, "senha": senha}).execute()

def login(username, senha):
    return usuarios.select("id, username").eq("username", username).eq("senha", senha).execute()
