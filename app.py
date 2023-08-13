from flask import Flask, redirect, request, session, url_for, render_template
from requests_oauthlib import OAuth2Session
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
import os
from itsdangerous import URLSafeSerializer

AUTHORIZATION_BASE_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
REFRESH_URL = TOKEN_URL
REDIRECT_URI = os.environ.get("SPOTIPY_REDIRECT_URI")
scope="user-library-read user-top-read playlist-read-private playlist-read-collaborative"

load_dotenv()

sp_oauth = SpotifyOAuth(
    os.environ.get("SPOTIPY_CLIENT_ID"),
    os.environ.get("SPOTIPY_CLIENT_SECRET"),
    os.environ.get("SPOTIPY_REDIRECT_URI"),
    scope=["user-library-read user-top-read playlist-read-private playlist-read-collaborative"],
    show_dialog=True
    # cache_path=".spotipyoauthcache",
)

app = Flask(__name__)

# Generate a random and secure SECRET_KEY
app.secret_key = os.urandom(64)


s = URLSafeSerializer(os.urandom(64))
load_dotenv()

@app.route('/')
def index():
    if 'token' in session:
        return render_template('index.html', logged_in=True)
    return render_template('index.html', logged_in=False)

@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    token = s.dumps({'token': token_info['access_token']})
    session['token'] = token
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))                   

@app.route('/generate')
def generate():
    if 'token' in session:
        access_token = s.loads(session['token'])['token']
        from spotify_functions import gather_data
        template_data = gather_data()
        return render_template('card.html', **template_data)
    return redirect(url_for('login'))

@app.route("/test")
def test():
    from spotify_functions import gather_data
    template_data = gather_data()
    return render_template('testpy.html', **template_data)
    
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/contact')
def contact():
    return render_template('contact.html')
@app.route('/faq')
def faq():
    return render_template('faq.html')
@app.route('/privacy-policy')
def privacy():
    return render_template('privacy.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)  
