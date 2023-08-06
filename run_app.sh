#!/bin/bash
# Esegui lo script Python per gestire i dati
poetry run python src/get_data.py

#avvia app python per endpoint
poetry run python src/app.py

