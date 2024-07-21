#!/usr/bin/env python3
""" Internationalization """
from flask import Flask, g, render_template, request
from flask_babel import Babel


class Config:
    """ Config class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

    def __init__(self):
        """ Constructor """
        pass


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

app = Flask(__name__, template_folder='templates')
babel = Babel(app)
app.config.from_object(Config)


def get_user():
    """ Get user
    Return: User or None
    """
    try:
        return users.get(int(request.args.get('login_as')))
    except Exception:
        return None


@babel.localeselector
def get_locale() -> str:
    """ Get locale
    Return: Best match language code for user
    """
    local = request.args.get('locale')
    if local and local in app.config['LANGUAGES']:
        print(local)
        return local
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """ GET /
    Return: 0-index.html
    """
    return render_template('5-index.html')


@app.before_request
def before_request():
    """ Before request """
    setattr(g, 'user', get_user())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
