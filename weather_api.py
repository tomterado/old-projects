from flask import Flask
from flask import render_template
from flask import request
import requests

app = Flask(__name__)

@app.route('/tempature', methods=['POST'])
def tempature():
	zipcode = request.form['zip']
	return zipcode;
	#return render_template('tempature.html')

@app.route('/')
def index():
	return render_template('index.html')


#api key = c91b2b3f4fa4f487c1eabd4e5469fa09


if __name__ == '__main__':
	app.run(debug=True)
