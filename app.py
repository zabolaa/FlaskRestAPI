import os
from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager

from resources.shop import blueprint as ShopBlueprint
from resources.product import blueprint as ProductBlueprint
from resources.user import blueprint as UserBlueprint
from db import db
from blacklist import BLACKLIST
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)

app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "Shop REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui/"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL",  "sqlite:///shop.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-long-random-secret-key-123456789"

db.init_app(app)
jwt = JWTManager(app)
api = Api(app)


@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLACKLIST

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
        return {"message": "The token has been revoked", "error": "token_revoked"}, 401


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
        return {"message": "This token has expired", "error": "token_expired"}, 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {
        "message": f"Token validation failed: {error}",
        "error": "invalid_token"
    }, 401

@jwt.unauthorized_loader
def missing_token_callback(error):
        return {"message": "Request does not contain an access token", "error": "authorization_required"}, 401

@jwt.needs_fresh_token_loader
def fresh_token_callback(jwt_header, jwt_payload):
        return  {"message": "The token is not fresh", "error": "fresh_token_required"}, 401


with app.app_context():
        db.create_all()

api.register_blueprint(ShopBlueprint)
api.register_blueprint(ProductBlueprint)
api.register_blueprint(UserBlueprint)