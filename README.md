#OSM Tamil Map

# Mapzen
* Creating a Tamil map using OSM and mapzen tangrams - [Mapzen Blog](https://mapzen.com/blog/languages-of-india/)

## Steps
* Localize mapdata and upload to OSM from your favourite editor
* Use [Mapzen Tangram Play](https://mapzen.com/tangram/play/) and change ux_language global property to ta.

# Mapbox
* Creating a Tamil map using OSM and mapbox studio.

## Steps
* Get data of Tamil name tags from OSM using [http://overpass-turbo.eu](http://overpass-turbo.eu)
* Create a mapbox dataset and tileset based on the dataset using mapbox studio
* Create a style with Base mapbox layer and tileset map layer.
* Modify the style rules to use Tamil names.
* Upload to mapbox

## Demo
[https://api.mapbox.com/v4/srikanthlogic.714e671e/page.html?access_token=pk.eyJ1Ijoic3Jpa2FudGhsb2dpYyIsImEiOiJuQ1RYS3pjIn0.7YUMcAQAc4A7T703-yAu2g#4/13.03/80.07](https://api.mapbox.com/v4/srikanthlogic.714e671e/page.html?access_token=pk.eyJ1Ijoic3Jpa2FudGhsb2dpYyIsImEiOiJuQ1RYS3pjIn0.7YUMcAQAc4A7T703-yAu2g#4/13.03/80.07)

<<<<<<< HEAD
##Thanks
@yogiks @planemad @mapbox @mapzen @tallytalwar
=======
## Translation
* While translation can be done using any OSM editor, if you want to upload translations in bulk using CSV, refer [OSM_CSV_Translation_Uploader.py](OSM_CSV_Translation_Uploader.py)
* To get list of nodes to be translated use Overpass. See [OverpasssToGoogleSheets-Readme.md](OverpasssToGoogleSheets-Readme.md)

## Thanks
@yogiks @planemad @mapbox
>>>>>>> 267362565d181029cd1973054b0720d323dd4bd1

##Credits
Noto Sans Tamil fonts, Meera Tamil font.
