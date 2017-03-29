from lxml import etree

filename = '/media/data/code/osm-ta/chennai_india.osm'

context = etree.iterparse(filename, events=('end',), tag='node')

with open("output.csv", "w") as f:
			f.write("id\tname\n")

context = etree.iterparse(filename, events=('end',), tag=('node'))

idnamepair = []
for action, elem in context:
	nodeid = elem.xpath('//node[tag[@k=\'name\'] and not(tag[@k=\'name:ta\'])]/@id')
	nodename = elem.xpath('//node[tag[@k=\'name\'] and not(tag[@k=\'name:ta\'])]/tag[@k=\'name\']/@v')
	idnamepair += zip(nodeid,nodename)
	elem.clear()
	if (len(idnamepair) > 500):
		with open("output.csv", "a") as f:
			for idname in set(idnamepair):
				f.write(idname[0]+"\t"+idname[1].encode('utf-8')+"\n")
		idnamepair = []

