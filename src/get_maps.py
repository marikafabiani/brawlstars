import requests
import pandas as pd
import json 
#api request function for all maps
def get_maps_info():
    url = "https://api.brawlapi.com/v1/maps"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any errors in the response
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error during API call:", e)
        return None

#api request
maps_info = get_maps_info()["list"]
x = maps_info
nomi = []
ids = []
active = []
mod = []
imageUrl = []

# get data from json
for item in x:
    nomi.append(item['name'])
    ids.append(item['id'])
    active.append(item["disabled"])
    mod.append(item["gameMode"]["name"])
    imageUrl.append(item["imageUrl"])
df = pd.DataFrame({
    'name': nomi,
    'id': ids,
    'active': active,
    'mod':mod,
    'imageUrl': imageUrl
})
df["active"] = ~df["active"]
df=df[df.active]
df = df.set_index("name")

xdiz = df.to_dict()
with open("src/data/maps_list.json", "w") as file:
    json.dump(xdiz, file, indent=2)
