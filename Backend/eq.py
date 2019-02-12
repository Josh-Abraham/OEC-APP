# Writing Requeststo React
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from datetime import datetime
from datetime import timedelta
from twilio.rest import Client
#Reading Requests from teh internet
import requests
from bs4 import BeautifulSoup

#USE: set FLASK_APP=flaskBE.py in CMD to create the environment var
# To see changes without ropening use: set FLASK_DEBUG=1
#Then do flask run
#using http://http:127.0.0.1:5000/

app = Flask(__name__)
CORS(app)

patients = []
arrivalTimes = []
maxWaitTime = 3;

#Basic Mounting Set
@app.route("/")
@app.route("/mount")     #Allows two routes to lead to same function
def home():
    return jsonify(webTitle='eQ')


# WEB PARSING
@app.route("/save", methods=['GET', 'POST'])     #GET REQUEST, now we can do saving
def save():
    formData = request.get_json() # recieve json of disease data
    print(formData);
    type = formData['type'] # get data contained in 'type' in json
    output = -1
    if (type == "Pregnancy"):
         output = preg_prio(formData);

    formData['priority'] = output;
    add(formData);
    messageUsers();

    return jsonify(patients);

def preg_prio(formData):
    waterBroken = formData['waterBroken']
    priorityLevel = 22
    if (waterBroken):
        priorityLevel -= 6

    frequency = formData['frequency']
    if (frequency == "5-30"):
        priorityLevel -= 2
    elif (frequency == "3-5"):
        priorityLevel -=4
    elif (frequency == "30-2"):
        priorityLevel -= 6

    duration = formData['duration']
    if (duration == "30-45"):
        priorityLevel -= 2
    elif (duration == "45-60"):
        priorityLevel -= 4
    elif (duration == "60-90"):
        priorityLevel -= 6

    if(formData['fever']):
        priorityLevel -= 1
    if(formData['nausea']):
        priorityLevel -= 1
    if(formData['discharge']):
        priorityLevel -= 1

    return priorityLevel

def getPriority(p):
	return p['priority'];

# Sets the priority value of a paitent
def setPriority(p, value):
	p['priority'] = value
	return;

# Sets the arrival time of a paitent
def setArrivalTime(p):
	p['arrivalTime'] = datetime.now()
	return;

# Gets the wait time of a paitent
def getWaitTime(p):
	hours  = math.floor(((datetime.now() - p['arrivalTime']).seconds) / 3600)
	return hours;

# Sorts a given list or paitents
def sort(list):
	n = len(list)
	for i in range(n):
		for j in range(0, n-i-1):
			if getPriority(list[j]) > getPriority(list[j+1]):
				list[j], list[j+1] = list[j+1], list[j]
	patients = list;

# Adds a paitent to the list
def add(p):
	setArrivalTime(p)
	patients.append(p)
	arrivalTimes.append(p)
	sort(patients);

# Removes a paitent from the list
def remove(p):
	patients.remove(p)
	arrivalTimes.remove(p)
	if getWaitTime(arrivalTimes[0]) >= maxWaitTime:
		pat = arrivalTimes[0]
		patients.remove(pat)
		setPriority(pat, 1)
		patients.insert(0, pat)
	return patients;

#  Writes the lists to the files
def writeToFiles():
	np.array(patients).tofile("patients.bin")
	np.array(arrivalTimes).tofile("arrivalTimes.bin")

# Sets the lists from the files
def getFromFiles():
	patients = np.fromfile("patients.bin",  dtype=np.int64)
	arrivalTimes = np.fromfile("arrivalTimes.bin",  dtype=np.int64)

def messageUsers():
    n = len(patients)
    for i in range(n):
        print(patients[i]['fullName']);
        client = Client("AC6e8370a90383e3af8bea340bc095d246", "30fe8f03ef04cb72f49dcae593d12161")
        client.messages.create(to=patients[i]['number'],
        						from_="+12898018067",
        						body="Welcome to Hamilton General Hospital " + str(patients[i]['fullName']) + ". You are " + str(i + 1) +" in line.")

if __name__ == '__main__':
    app.run(debug=True)
