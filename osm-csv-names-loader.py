from osmapi import OsmApi
import json
import configparser
import csv
import codecs

def utf_8_encoder(unicode_csv_data):
	for line in unicode_csv_data:
		yield line.encode('utf-8')

def UpdateNodes():
	global myOSMAPI
	with codecs.open('/media/data/code/osm-ta/csv-example.csv', 'r', 'utf-8') as csvfile:
		myOSMAPI.ChangesetCreate({u"comment": u"Tamil Translation - Chennai Nodes"})
		translation = csv.reader(utf_8_encoder(csvfile),delimiter=',')
		for place in translation:
			nodeJSON = myOSMAPI.NodeGet(place[0])
			if("name:ta" not in nodeJSON["tag"].keys()):
				newnodeJSON = {}
				newnodeJSON["id"] = nodeJSON["id"]
				newnodeJSON["lat"] = nodeJSON["lat"]
				newnodeJSON["lon"] = nodeJSON["lon"]
				newnodeJSON["tag"] = nodeJSON["tag"]
				newnodeJSON["tag"]["name:ta"] = place[1].decode('utf-8')
				myOSMAPI.NodeUpdate(newnodeJSON)
		myOSMAPI.ChangesetClose()

def UpdateWays():
	global myOSMAPI
	with codecs.open('/media/data/code/osm-ta/csv-example.csv', 'r', 'utf-8') as csvfile:
		myOSMAPI.ChangesetCreate({u"comment": u"Tamil Translation - Chennai ways"})
		translation = csv.reader(utf_8_encoder(csvfile),delimiter=',')
		for place in translation:
			wayJSON = myOSMAPI.WayGet(place[0])
			if("name:ta" not in wayJSON["tag"].keys()):
				newwayJSON = {}
				newwayJSON = wayJSON
				newwayJSON["tag"]["name:ta"] = place[1].decode('utf-8')
				myOSMAPI.WayUpdate(newwayJSON)
		myOSMAPI.ChangesetClose()

def main():
	global myOSMAPI
	config = configparser.ConfigParser()
	config.read('config.ini')
	myOSMAPI = OsmApi(username=config.get('OSM','OPENSTREETMAP_USERNAME'), password=config.get('OSM','OPENSTREETMAP_PASSWORD'))
	if (config.get('DEFAULT','UPDATE_TYPE') == 'Node'):
		UpdateNodes()
	if (config.get('DEFAULT','UPDATE_TYPE') == 'Way'):
		UpdateWays()

if __name__ == "__main__":
	main()
