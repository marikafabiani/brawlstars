#esposizione api

import json
from flask import Flask, jsonify
app = Flask(__name__)
with open("src/data/brawl_data.json") as file:
    brawl_data = json.load(file)
with open("src/data/gadgets_list.json") as file:
    gadgets_data = json.load(file)
with open("src/data/starpowers_list.json") as file:
    starpowers_data = json.load(file)
with open("src/data/full_maps_list.json") as file:
    full_maps_data = json.load(file)
with open("src/data/mods_maps_list.json") as file:
    mods_maps_data = json.load(file)

@app.route("/api/brawl_data")
def get_brawl_data():
    return jsonify(brawl_data)

@app.route("/api/gadgets_list")
def get_gadgets_list():
    return jsonify(gadgets_data)

@app.route("/api/starpowers_list")
def get_starpowers_list():
    return jsonify(starpowers_data)

@app.route("/api/full_maps_list")
def get_full_maps_list():
    return jsonify(full_maps_data)

@app.route("/api/mods_maps_list")
def get_mods_maps_list():
    return jsonify(mods_maps_data)

if __name__ == "__main__":
    app.run(debug=True)


# Brawl Data: http://127.0.0.1:5000/api/brawl_data
# Gadgets List: http://127.0.0.1:5000/api/gadgets_list
# Star Powers List: http://127.0.0.1:5000/api/starpowers_list
# Full Maps List: http://127.0.0.1:5000/api/full_maps_list
# Mods Maps List: http://127.0.0.1:5000/api/mods_maps_list