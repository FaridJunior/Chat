from flask import Blueprint
main = Blueprint("main", __name__)

usersList = []

from .routes import *
from .events import *