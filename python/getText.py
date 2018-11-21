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
  results = soup.findAll(tag, {selector: name})[0].text
  print(results)
elif index == indexAll:
  all = soup.findAll(tag, {selector: name})
  i = len(all)
  for x in range(0, i - 1):
    print(all[x].text)
elif index == indexCustom:
  indexFrom = int(sys.argv[6])
  indexTo = int(sys.argv[7])
  all = soup.findAll(tag, {selector: name})
  for x in range(indexFrom, indexTo):
    print(all[x].text)
else:
  results = "error"