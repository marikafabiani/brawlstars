import pandas as pd
x = pd.read_csv("src/brawl_data.csv")
x.to_json("src/brawl_data.json")
