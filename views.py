from flask import Blueprint, render_template, url_for, redirect, request
import csv

views = Blueprint(__name__, "views")

gas_file = 'gas.csv'
no_gas_file = 'no_gas.csv'
masscap = 'https://www.masscap.org/category/service-areas/'


@views.route('/', methods=['POST', 'GET'])
def home():
	if request.method == 'GET':
		return render_template('index.html')

	elif request.method == 'POST':
		cap1 = request.form['opp1']
		city = request.form['city']

		if cap1 == 'cap with gas':
			gasfile = gas_file
		elif cap1 == 'cap no gas':
			gasfile = no_gas_file	

		with open(gasfile, 'r') as file:
			csv_reader = csv.reader(file)

			def searching(search):
				for row in csv_reader:

					if search in row:
						return True

			if searching(city.lower()) == True:
				return render_template('approved.html')
			else:
				url = masscap + city
				return render_template('not_approved.html', url=url)
				




	