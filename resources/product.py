from flask import request
import uuid
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import products
from schemas import ProductSchema, ProductUpdateSchema


blueprint = Blueprint("products", __name__, description="Operations on products")

@blueprint.route("/product/<product_id>")
class Product(MethodView):
    @blueprint.response(200, ProductSchema)
    def get(self, product_id):
        try:
            return products[product_id]
        except KeyError:
            abort(404, message="Product nod found")

    @blueprint.arguments(ProductUpdateSchema)
    @blueprint.response(200, ProductSchema)
    def put(self, product_data, product_id):
        try:
            product = products[product_id]
            product |= product_data
            return product
        except KeyError:
            abort(404, message="Product nod found")

    def delete(self, product_id):
        try:
            del products[product_id]
            return {"message": "Product deleted"}
        except KeyError:
            abort(404, message="Product nod found")

@blueprint.route("/product")
class ProductList(MethodView):
    @blueprint.response(200, ProductSchema(many=True))

    def get(self):
        return list(products.values())


    @blueprint.arguments(ProductSchema)
    @blueprint.response(201, ProductSchema)
    def post(self, new_product):
        new_product = request.json

        for product in products.values():
            if (new_product["name"] == product["name"]
                and new_product["shop_id"] == product["shop_id"]):
                abort(400, message="Product already exists")

        product_id = uuid.uuid4().hex
        product = {**new_product, "id": product_id}
        products[product_id] = product

        return product
