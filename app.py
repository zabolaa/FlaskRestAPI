from flask import Flask, request
from flask_smorest import Api
import uuid
from db import shops, products
from resources.shop import blueprint as ShopBlueprint



app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "Shop REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui/"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"


@app.route("/product", methods=["POST"])
def create_product():
    new_product = request.json
    if new_product["shop_id"] not in shops:
        return {"message":"Shop not found"}, 404
    product_id = uuid.uuid4().hex
    product = {**new_product, "id": product_id}
    products[product_id] = product

    return product

@app.route("/product")
def get_products():
    return {"products": list(products.values())}

@app.route("/product/<product_id>")
def get_product(product_id):
    try:
        return products[product_id]
    except KeyError:
        return {"message":"Product not found"}, 404

@app.route("/product/<product_id>")
def update_product(product_id):
    product_data = request.json
    if "price" not in product_data or "name" not in product_data:
        return {"message":"Please ensure 'price' an 'name' are included in the request"}, 404
    try:
        product = products[product_id]
        product |= product_data
        return product
    except KeyError:
        return {"message":"Product not found"}, 404


@app.route("/product/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    try:
        del products[product_id]
        return {"message":"Product deleted"}
    except KeyError:
        return {"message":"Product not found"}, 404

api = Api(app)
api.register_blueprint(ShopBlueprint)
