# import libraries
import sys
import urllib.request
from urllib.parse import urljoin
from bs4 import BeautifulSoup

# specify the url
url = sys.argv[1]


# query the website and return the html to the variable ‘page’
page = urllib.request.urlopen(url)

# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, 'html.parser')

for img in soup.find_all('img', src=True):
    src = img.get('src')
    if not src.startswith('http'):
        src = urljoin(url, src)
        img['src'] = src

for a in soup.find_all('a', href=True):
    link = a.get('href')
    if not link.startswith('http'):
        link = urljoin(url, link)
        a['href'] = link

for link in soup.find_all('link', href=True):
    ref = link.get('href')
    if not ref.startswith('http'):
        ref = urljoin(url, ref)
        link['href'] = ref

for script in soup.find_all('script', src=True):
    ref = script.get('src')
    if not ref.startswith('http'):
        ref = urljoin(url, ref)
        script['src'] = ref

new_tag = soup.new_tag('script', src='http://www.zmcgee.com/scrapey/js/iframejs.js')
soup.head.insert(3, new_tag)

iframe_css = soup.new_tag('link')
iframe_css.attrs['rel'] = 'stylesheet';
iframe_css.attrs['href'] = 'http://www.zmcgee.com/scrapey/css/iframe/iframe.css'
soup.head.insert(4, iframe_css)

print(soup)
