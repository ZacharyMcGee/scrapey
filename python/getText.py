# import libraries
import sys
import urllib.request
from urllib.parse import urljoin
from bs4 import BeautifulSoup

# specify the url
url = sys.argv[1]
tag = sys.argv[2]
selector = sys.argv[3]
name = sys.argv[4]

# query the website and return the html to the variable ‘page’
page = urllib.request.urlopen(url)

# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, 'html.parser')

results = soup.findAll(tag, {selector: name})[0].text.strip();

print(results)
