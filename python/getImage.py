# import libraries
import sys
import urllib.request
from urllib.parse import urljoin
from bs4 import BeautifulSoup

indexFirst = "first"
indexAll = "all"
indexCustom = "custom"

# specify the url
url = sys.argv[1]
tag = sys.argv[2]
selector = sys.argv[3]
name = sys.argv[4]
index = sys.argv[5]

# query the website and return the html to the variable ‘page’
page = urllib.request.urlopen(url)

# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, 'html.parser')

if index == indexFirst:
  results = soup.findAll(tag, {selector: name})
  img = results[0].findAll('img')
  print(img[0]['src'])
elif index == indexAll:
  results = soup.findAll(tag, {selector: name})
  for tag in results:
    images = tag.findAll('img')
    print(images[0]['src'])
elif index == indexCustom:
  results = soup.findAll(tag, {selector: name})
  indexFrom = int(sys.argv[6])
  indexTo = int(sys.argv[7])
  for x in range(indexFrom, indexTo):
      img = results[x].findAll('img')
      print(img[0]['src'])
else:
  results = "error"
