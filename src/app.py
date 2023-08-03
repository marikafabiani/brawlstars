#esposizione api

import json
import pandas as pd
import requests
from flask import Flask, jsonify, request
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


@app.route('/api/add_row', methods=['POST'])
def add_row():
    with open("src/data/brawl_data.json") as file:
        brawl_data = json.load(file)
        df = pd.DataFrame(brawl_data).T
    try:
        # Leggi il nuovo record JSON in input dalla richiesta POST
        new_row = request.get_json()
        # Converte il nuovo record in DataFrame
        new_row_df = pd.DataFrame(new_row, index=[0])
        # Aggiungi il nuovo record al DataFrame esistente
        new_df = pd.concat([df, new_row_df]).reset_index(drop=True).drop_duplicates()
        # Salva il DataFrame aggiornato in brawl_data.json
        new_df.T.to_json("src/data/brawl_data.json", indent=2)

        return jsonify({"message": "Nuova riga aggiunta con successo.", "data": new_df.T.to_dict()}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

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