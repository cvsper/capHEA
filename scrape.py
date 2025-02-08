from bs4 import BeautifulSoup as bs
import requests

city = input('enter city')

www = 'https://www.masscap.org/category/service-areas/' + city
r = requests.get(www)
soup = bs(r.text, 'html')

number = soup.find('div', class_='et_pb_blurb_description').text

print(soup)