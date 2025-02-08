import csv

search = input('enter ')

with open('no_gas.csv', 'r') as file:
    csv_reader = csv.reader(file)

    def searching(search):
    	for row in csv_reader:
    		if search in row:
    			return True

    			

    if searching(search) == True:
    	print('yay')
    else:
    	print('no')	