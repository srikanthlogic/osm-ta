from osmapi import OsmApi
import json
import overpy
import csv
import codecs

def utf_8_encoder(unicode_csv_data):
    for line in unicode_csv_data:
        yield line.encode('utf-8')

myOSMAPI = OsmApi(username="SrikanthLogic", password="*********")

with codecs.open('/media/data/code/osm-ta/csv-example.csv', 'r', 'utf-8') as csvfile:
	myOSMAPI.ChangesetCreate({u"comment": u"Tamil Translation - Indian Cities"})
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
			myOSMAPI.NodeUpdate(nodeJSON)
	myOSMAPI.ChangesetClose()
