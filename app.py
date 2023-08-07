from flask import Flask, redirect, request, session, url_for, render_template
import spotipy
import spotipy.util as util
import os
from dotenv import load_dotenv

# Load the environment variables from .env
load_dotenv()

# Get the values of the environment variables
SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

import spotipy.util as util

app = Flask(__name__)

# Generate a random and secure SECRET_KEY
app.config['SECRET_KEY'] = os.urandom(64)

@app.route('/')
def home():
    return render_template('card.html')

# app.run(debug=True, host='192.168.1.214')
