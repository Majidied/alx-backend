#!/usr/bin/env python3
""" Internationalization """
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ Config class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

    def __init__(self):
        """ Constructor """
        pass


app = Flask(__name__)
babel = Babel(app)
babel.config = Config()
app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """ Get locale
    Return: Best match language code for user
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """ GET /
    Return: 0-index.html
    """
    return render_template('2-index.html')
