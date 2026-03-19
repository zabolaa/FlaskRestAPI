from flask import request
import uuid
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import shops

blueprint = Blueprint("shops", __name__, description="Operations on Shops")

@blueprint.route("/shop/<shop_id>")
class Shop(MethodView):
    def get(self, shop_id):
        try:
            return shops[shop_id]
        except KeyError:
            abort(404, message="Shop not found")


    def delete(self, shop_id):
        try:
            del shops[shop_id]
            return {"message": "Shop deleted"}
        except KeyError:
            abort(404, message="Shop not found")

@blueprint.route("/shop")
class ShopList(MethodView):
    def get(self):
        return {"shops": list(shops.values())}
    def post(self):
        shop_data = request.json
        if "name" in shop_data:
            abort(400, message="Please make sure 'name' is a valid shop name")

        for shop in shops.values():
            if shop_data["name"] == shop["name"]:
                abort(400, message="Shop name already exists")
        shop_id = uuid.uuid4().hex
        shop = {**shop_data, "id": shop_id}
        shops[shop_id] = shop
        return shop
