from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

socketio = SocketIO(cors_allowed_origins="*")

from .main import main
def create_app(Debug=True):
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "secret"
    app.debug = Debug
    app.register_blueprint(main)
    CORS(app)
    socketio.init_app(app)
    return app
