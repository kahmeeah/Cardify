from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('card.html')

# app.run(debug=True, host='192.168.1.214')
