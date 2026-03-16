from flask import Flask, request

app = Flask(__name__)

shops = [{"name": "Reserved", "products": [{"name": "T-shirt", "price": 35}]}]

@app.route("/shops")
def get_shops():
    return shops

@app.route("/shops", methods=["POST"])
def create_shop():
    shop =request.json

    shops.append(shop)

    return shop, 201

app.run()
