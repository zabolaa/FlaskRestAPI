from unittest import skip

from flask import Flask, request

app = Flask(__name__)

shops = [{"name": "reserved", "products": [{"name": "T-shirt", "price": 35}]}]

@app.route("/shops")
def get_shops():
    return shops

@app.route("/shops", methods=["POST"])
def create_shop():
    shop =request.json

    shops.append(shop)

    return shop, 201

@app.route("/shops/<shop_name>/products", methods=["POST"])
def create_product(shop_name):
    products = request.json

    for shop in shops:
        if shop["name"] == shop_name:
            shop["products"].append(products)
            return products, 201

        return {"message":"Shop not found"}, 404

@app.route("/shops/<shop_name>")
def get_shops_by_name(shop_name):
    for shop in shops:
        if shop["name"] == shop_name:
            return shop, 200
    return {"message":"Shop not found"}, 404

@app.route("/shops/<name>/products/<product_name>", methods=["DELETE"])
def delete_product(name, product_name):
    for shop in shops:
        if shop["name"] == name:
            for product in shop["products"]:
                if product["name"] == product_name:
                    shop["products"].remove(product)
                    return {"message": "Product deleted"}, 200

            return {"message": "Product not found"}, 404

    return {"message": "Shop not found"}, 404

app.run()
