# Cardify

Cardify is a web application that utilizes the Spotify API to analyze users' listening habits and presents the data in the form of an ID Card.

## Features

- Authenticates user with Spotify via OAuth
- Fetches and analyzes users' top data (e.g. top tracks, artists, genres, etc.)
- Generates a custom visual ID card based on user data
- Fully responsive design

## Live Demo

You can view a live demo of Cardiy [here](https://cardify-166o.onrender.com/).

## Tech Stack

Cardify is built using the following technologies:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, Flask
- **API**: Spotify Web API (via [Spotipy](https://spotipy.readthedocs.io/))
- **Deployment**: Render

## Running the App Locally

### 1. Register for Spotify API Access:

- Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- Create an app and obtain the following:
  - `SPOTIPY_CLIENT_ID`
  - `SPOTIPY_CLIENT_SECRET`
  - `SPOTIPY_REDIRECT_URI`
- Register the following Redirect URI:
  - ```http://localhost:5000/callback```

### 2. Clone the Repository:

```bash
git clone https://github.com/kahmeeah/Cardify.git
cd Cardify
```

### 3. Create and set up a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Create a .env file and add your Spotify credentials:

```bash
SPOTIPY_CLIENT_ID=your_client_id
SPOTIPY_CLIENT_SECRET=your_client_secret
SPOTIPY_REDIRECT_URI=http://localhost:5000/callback
```

### 5. Run the app:

```bash
flask run
```

## License

This project is open source under [the MIT License.](LICENSE.md)
