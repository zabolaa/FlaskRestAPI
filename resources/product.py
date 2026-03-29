from flask import request
import uuid
from sqlalchemy.exc import SQLAlchemyError
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import db
from schemas import ProductSchema, ProductUpdateSchema
from models import ProductModel


blueprint = Blueprint("products", __name__, description="Operations on products")

@blueprint.route("/product/<product_id>")
class Product(MethodView):
    @blueprint.response(200, ProductSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        return product

    @blueprint.arguments(ProductUpdateSchema)
    @blueprint.response(200, ProductSchema)
    def put(self, product_data, product_id):
        product = ProductModel.query.get_or_404(product_id)
        if product:
            product.price = product_data["price"]
            product.name = product_data["name"]
        else:
            product = ProductModel(id=product_id, **product_data)
        try:
            db.session.add(product)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="Error while updating the product")
        return product


    def delete(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()

        return {"message": "Product deleted successfully"}


@blueprint.route("/product")
class ProductList(MethodView):
    @blueprint.response(200, ProductSchema(many=True))

    def get(self):
        return ProductModel.query.all()


    @blueprint.arguments(ProductSchema)
    @blueprint.response(201, ProductSchema)
    def post(self, new_product):
        product = ProductModel(**new_product)


        try:
            db.session.add(product)
            db.session.commit()
        except  SQLAlchemyError:
            abort(500, message="An error occured while inserting the product")
        return product
