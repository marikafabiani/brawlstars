import requests
import pandas as pd

#api request function for all brawlers
def get_brawlers_info():
    url = "https://api.brawlapi.com/v1/brawlers"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any errors in the response
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error during API call:", e)
        return None

#api request
brawlers_info = get_brawlers_info()
x = brawlers_info["list"]
nomi = []
ids = []
gadget = []
star_powers = []
item = x[0]
# get data from json
for item in x:
    nomi.append(item['name'])
    ids.append(item['id'])
    gadgets = ', '.join([gadget['name'] for gadget in item['gadgets']])
    gadget.append(gadgets)
    star_powers.append(', '.join([star_power['name'] for star_power in item['starPowers']]))
df = pd.DataFrame({
    'name': nomi,
    'id': ids,
    'gadget': gadget,
    'starPowers': star_powers
})
df = df.set_index("name")
df.to_json("src/brawlers_list.json")
df.to_parquet("src/brawlers_list.parquet.gzip", compression="gzip")


#api request function for single brawler by id
def get_brawler(id):
    url = "https://api.brawlapi.com/v1/brawlers" + "/" + id
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any errors in the response
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error during API call:", e)
        return None


#write tables for gadgets and star powers
df = df.reset_index()
starpowers=[]
gadgets=[]
names_g = []
names_sp = []
for i in range(len(df)):
    nome = df.name[i]
    id = str(df.id[i])
    temp = get_brawler(id)
    starpowers.append(temp["starPowers"])
    for j in range(len(temp["starPowers"])):
        names_sp.append(nome)
    for j in range(len(temp["gadgets"])):
        names_g.append(nome)
    gadgets.append(temp["gadgets"])
starpowers_list = [item for sublist in starpowers for item in sublist]
starpowers_df = pd.DataFrame(starpowers_list)
starpowers_df["brawler"] = names_sp
gadgets_list = [item for sublist in gadgets for item in sublist]
gadgets_df = pd.DataFrame(gadgets_list)
gadgets_df["brawler"] = names_g
starpowers_df.to_json("src/starpowers_list.json")
gadgets_df.to_json("src/gadgets_list.json")