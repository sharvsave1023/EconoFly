from flask import Flask, render_template, request
from flask_cors import CORS
import requests as rq
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np
import json

load_dotenv()

api_key = os.getenv("API_KEY")
url = 'https://www.carboninterface.com/api/v1/estimates'

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def calculate_emissions():
    data = request.get_json()
    airport_1 = data['airport_1']
    airport_2 = data['airport_2']

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    data = {"type": "flight","passengers": 2,"legs": [{"departure_airport": airport_1, "destination_airport": airport_2}]
}
    response = rq.post(url, headers=headers, json=data)
    result = response.json()

    data = result['data']['attributes']
    df = pd.DataFrame(data = data)
    carbon_emission_flight = "Carbon Emissions (grams): " + str(df['carbon_g'][0])
    json_data = json.dumps(carbon_emission_flight)
    response = app.response_class(
        response=json_data,
        status=200,
        mimetype='application/json'
    )

    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5500, debug=True)