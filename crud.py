from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client

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
    select = supabase.table("chat1").select("*").execute()
    return select
