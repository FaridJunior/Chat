from Backend import create_app, socketio


app = create_app(Debug=True)


if __name__ == "__main__":
    socketio.run(app)
