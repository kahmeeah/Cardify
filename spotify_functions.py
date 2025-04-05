from dotenv import load_dotenv
import spotipy
import spotipy.util as util
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
import os

scope="user-library-read user-top-read playlist-read-private playlist-read-collaborative"

load_dotenv()

range = 'long_term'


def process_time(timeframe):
    global range
    match timeframe:
        case 'short':
            range = 'short_term'
        case 'medium':
            range = 'medium_term'
        case 'long':
            range = 'long_term'
        case _:
            range = 'long_term'

def get_timeframe():
    match range:
        case 'short_term':
            return "FOUR WEEKS"
        case 'medium_term':
            return "SIX MONTHS"
        case 'long_term':
            return "LIFETIME"
        case _:
            return "LIFETIME"


def get_user_top_tracks(limit, sp): # to-do: fix variable names
    top_tracks = sp.current_user_top_tracks(limit=limit, time_range=range) 
    print(range)

    # get list of track names and artists
    track_list = []
    for current_track in top_tracks['items']:
        track_info = { 
            'id': current_track['id'],
            'name': current_track['name'],
            'artists': [current_artist['name'] for current_artist in current_track['artists']],
            'album_image': current_track['album']['images'][0]['url'],
            'popularity': current_track['popularity']
        }
        track_list.append(track_info)

    return track_list


def get_user_info(sp):
    user_info = sp.current_user()

    display_name = user_info['display_name']
    profile_picture = user_info['images'][1]['url'] if user_info['images'] else None
    
    return display_name, profile_picture

def get_top_artists(limit, sp):
    artist_info = sp.current_user_top_artists(limit=limit, time_range=range)

    top_artists = [] # init list
    for current_artist in artist_info['items']:
        artists_dict = {
            'name': current_artist['name'],
            'genres': current_artist['genres']
        }
        top_artists.append(artists_dict)

    return top_artists

def get_saved_playlists(sp):
    playlist_info = sp.current_user_playlists(limit=50)
    saved_playlists = playlist_info['total']
    return saved_playlists

def get_saved_tracks(sp):
    track_info = sp.current_user_saved_tracks(limit=10, offset=10000)
    saved_tracks = track_info['total']
    return saved_tracks
    
def get_audio_features(track_ids, sp):
    audio_features = sp.audio_features(track_ids)  # track_ids must be a list
    features_list = []
    for current_feature in audio_features:
        if current_feature:
            feature_dict = {
                'valence': current_feature['valence'],
                'energy': current_feature['energy']
            }
            features_list.append(feature_dict)
    return features_list



def get_obscurity_lvl(sp):
    top_tracks = get_user_top_tracks(50, sp)
    popularity_lvl = [track['popularity'] for track in top_tracks]
    avg_popularity = sum(popularity_lvl) / len(popularity_lvl)

    obscurity_lvl = round(100 - avg_popularity, 2)
    return obscurity_lvl


# endregion

def get_top_genres(sp):
    top_artists = get_top_artists(50, sp)
    
    genre_counts = {}

    for artist in top_artists:
        for genre in artist['genres']:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1
    
    sorted_genres = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)
    top_genres = [genre for genre, count in sorted_genres[:3]]

    formatted_genres = ', '.join(top_genres)
    
    return formatted_genres



def gather_data(sp):
    top_track = get_user_top_tracks(1, sp)[0]
    display_name, profile_picture = get_user_info(sp)
    top_artists = get_top_artists(5, sp)
    saved_playlists = get_saved_playlists(sp)
    saved_tracks = get_saved_tracks(sp)
    obscurity_lvl = get_obscurity_lvl(sp)
    top_genres = get_top_genres(sp)
    timeframe_name = get_timeframe()

    return {
        'top_track': top_track,
        'display_name': display_name,
        'profile_picture': profile_picture,
        'top_artists': top_artists,
        'saved_playlists': saved_playlists,
        'saved_tracks': saved_tracks,
        'obscurity_lvl': obscurity_lvl,
        'top_genres': top_genres,
        'timeframe_name': timeframe_name
    }
