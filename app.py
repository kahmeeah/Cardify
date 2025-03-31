from flask import Flask, jsonify, redirect, request, session, url_for, render_template
from requests_oauthlib import OAuth2Session
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
import os
from itsdangerous import URLSafeSerializer
import spotify_functions

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

@app.route('/set_time', methods=['POST'])
def set_time():
    data = request.get_json()
    timeframe = data.get('time', '')
    print(f"Received time value: {timeframe}")
    result = spotify_functions.process_time(timeframe)
    
    spotify_functions.process_time(timeframe)
    session.pop('cached_card_data', None)

    return jsonify({"message": f"Time set to {timeframe}"})

@app.route('/api/card_data')
def api_card_data():
    range_key = spotify_functions.range
    if f'cache_{range_key}' in session:
        return jsonify(session[f'cache_{range_key}'])
    data = spotify_functions.gather_data()
    session[f'cache_{range_key}'] = data
    return jsonify(data)

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
