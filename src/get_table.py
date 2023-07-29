import pandas as pd
import json
x = pd.read_csv("src/brawl_data.csv")
xdiz = x.to_dict()
with open("src/data/brawl_data.json", "w") as file:
    json.dump(xdiz, file, indent=2)
