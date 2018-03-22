from flask import Flask
from flask_ask import Ask, statement, question, session
import json
import requests
import time
import unidecode

#taking in flask
#variables involved
#improt JSON - talk to web
#import requests - send HTTP requests
#time - space out 
#unidecode - ASCII stuff

app = Flask(__name__)
ask = Ask(app, "/reddit_reader")
'''
def get_headlines():
        user_pass_dict = {'user': 'tom8mot',
                          'passwd': 'FFPR4mSFKyA5',
                          'api_type': 'json'}
        sess = requests.Session()
        sess.headers.update({'User-Agent': 'I am testing Alexa: Tom'})
        sess.post('https://www.reddit.com/api/login', data = user_pass_dict)
        time.sleep(1)
        url = 'https://redit.com/r/worldnews/.json?limit=10'
        html = sess.get(url)
        data = json.loads(html.content.decode('utf-8'))
        titles = [unidecode.unidecode(listing['data']['title']) for listing in data['data']['children']]
        titles = '...'.join([i for i in titles])
        return titles
'''
def get_headlines():
        user_pass_dict = {'user': 'tom8mot',
                          'passd': 'FFPR4mSFKyA5',
                          'api_type': 'json'}
        sess = requests.Session()
        sess.headers.update({'User-Agent': 'I am testing Alexa:TOM'})
        sess.post('https://www.reddit.com/api/login', data = user_pass_dict)
        time.sleep(1)
        url = 'https://reddit.com/r/worldnews/.json?limit=10'
        html = sess.get(url)
        data = json.loads(html.content.decode('utf-8'))
        titles = (unidecode.unidecode(listing['data']['title']) for listing in data['data']['children'])
        titles = '...'.join([i for i in titles])
        return titles 


#titles = get_headlines()
#print titles

#Decoractor/ wraps a function and it adds a buit of code/fluff 
@app.route('/')
def homepage():
	return 'Hi There, how are you doing?'

@ask.launch
def start_skill():
        weclome_message = 'Hello there, would like you the news?'
        return question(welcome_message)

@ask.intent("YesIntent")
def share_headline():
        headlines = get_headlines()
        headline_msg = 'The current world news headlines are []'.format(headlines)
        return statement(headline_msg)

@ask.intent("NoIntent")
def no_intent():
        bye_text = 'I am not sure why you asked me to run then, but okay ... bye'
        return statement(bye_text)

if __name__ == '__main__':
	app.run(debug=True)
