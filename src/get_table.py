import pandas as pd
x = pd.read_csv("brawl_data.csv")
x.to_json("brawl_data.json")
