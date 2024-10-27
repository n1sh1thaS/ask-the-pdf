from flask import Flask
from flask_cors import CORS
from routes import build_chain_bp, get_answer_bp

app = Flask(__name__)
CORS(app, resources={r"/build_chain": {"origins": "http://localhost:5173"}, r"/get_answer": {"origins": "http://localhost:5173"}})

app.register_blueprint(build_chain_bp)
app.register_blueprint(get_answer_bp)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    print('app running')