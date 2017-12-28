//var langCode ='ta'; -- TODO Make it language independent.

function doGet() {
  return HtmlService.createTemplateFromFile('Index.html')
                    .evaluate();
}

function doSomething() {
  Logger.log('I was called!');
}


function OverpassToGoogleSheets() {
    Logger.clear();
    //Show web popup of map?
    //Suggest using Wikidata | Xlate memory?.
    //Allow verification.
    //Allow download of josm / other upload file.
    //Explore using OSM API to directly upload.
        
    //OverpassQueryBuilder();
    //var query = GetOverpassQueryFromUser()
    //var query = '[out:json][timeout:3600][bbox:12.9201721,80.1238331,13.2401721,80.4438331];(node["place"]["name"~"."]["name:ta"!~"."];);out meta;';
    var query = '[out:json][timeout:3600][bbox:12.9201721,80.1238331,13.2401721,80.4438331];(node["amenity"="hospital"]["name"~"."]["name:ta"!~"."];);out meta;'
    //var query = '[out:json][timeout:3600][bbox:12.9201721,80.1238331,13.2401721,80.4438331];(node["highway"]["name"~"."]["name:ta"!~"."];);out meta;'
    //var query = 'https://overpass-api.de/api/convert?data=%5Bout%3Ajson%5D%5Btimeout%3A360%5D%3B%0A%2F%2F%20gather%20results%0A(%0A%20%20area%5Bname%3D%22Tamil%20Nadu%22%5D%3B%0A%20%20%2F%2F%20query%20for%20%22place%22%20%22without%20name%3Ata%22%20tags%0A%20%20node%5B%22place%22%5D(area)%5B%22name%3Ata%22!~%22.%22%5D(area)%3B%0A)%3B%0A%2F%2F%20print%20results%0Aout%20meta%3B%0A%3E%3B%0Aout%20meta%20qt%3B%0A&target=compact'
    //var query = '[out:json][timeout:3600];(node["railway"="station"](7.8586434,76.2256046,13.5375733,80.682728)["name:ta"!~"."](7.8586434,76.2256046,13.5375733,80.682728););out meta;>;out meta qt;';
    //var query = '[out:json][timeout:3600];(node["railway"="station"](7.8586434,76.2256046,13.5375733,80.682728)["name:ta"!~"."](7.8586434,76.2256046,13.5375733,80.682728););out meta;>;out meta qt;';
    //Chennai Highway nodes - tertiary'[out:json][timeout:3600];(way["highway"="tertiary"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;';
    //Chennai Highway nodes - secondary[out:json][timeout:3600];(way["highway"="secondary"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;
    //Chennai Highway nodes'[out:json][timeout:3600];(node["highway"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;';
    //Tamil Nadu Railway stations'[out:json][timeout:3600];(node["railway"="station"](7.8586434,76.2256046,13.5375733,80.682728)["name:ta"!~"."](7.8586434,76.2256046,13.5375733,80.682728););out meta;>;out meta qt;'
    //Chennai Railway stations'[out:json][timeout:3600];(node["railway"="station"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;'
    //- Chennai Suburbs '[out:json][timeout:3600];(node["place"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;';
    //'[out:json][timeout:3600];(node["place"]({{geocodeBbox:Chennai}})["name:ta"!~"."]({{geocodeBbox:Chennai}}););out meta;>;out meta qt;'
    //var query = '[out:json][timeout:3600];(area[name="Andhra Pradesh"];node["place"](area)["name:te"!~"."](area););out meta;>;out meta qt;'
    //var query = '[out:json][timeout:3600];(node["place"]["name:ta"!~"."](5.916667,79.516667,9.833333,81.866667););out meta;>;out meta qt;';
    //var query = '[out:json][timeout:3600];(node["place"~"town"]["name:ta"!~"."]({{geocodeBbox:India}}););out meta;>;out meta qt;';
    //area[name="Troisdorf"];way(area)[highway][name];out;
    //var query = '[out:json][timeout:3600];([highway]["name:ta"!~"."]({{geocodeBbox:Chennai}}););out meta;>;out meta qt;';
    //var query = '[out:json][timeout:3600];({{geocodeArea:India}}->.searchArea;node["place"~"city"]["name:te"!~"."](area.searchArea););out meta;'
    var jsonresponse = QueryOverpass(query);
    ParseReponsePopulateSheets(jsonresponse);
}

function ParseReponsePopulateSheets(jsonresponse) {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    if (doc.getSheetByName('OverpassOutput') != null)
      doc.deleteSheet(doc.getSheetByName('OverpassOutput'));
    var sheet = doc.insertSheet('OverpassOutput');    
    var OSMdataAll = JSON.parse(jsonresponse.getContentText());    
    
    var data = OSMdataAll.elements;
    var OSMdata = [];
    var count = 0;    
    var OSMNodedata = [];
    sheet.getRange(2,1,1,7).setValues([[["Node ID"],["Name"],["Lat"],["Lon"],["Type"],["Google Translate"],["Wikidata Translate"]]]);
    sheet.getRange(2,1,1,7).setFontFamily("Arial Bold");
    for(element in OSMdataAll.elements) {
      OSMdata = [];
      OSMNodedata['id'] = "=HYPERLINK(CONCATENATE(\"www.openstreetmap.org/node/\"," + data[element]['id'] + ")," + data[element]['id'] + ")"
      OSMNodedata['name'] = data[element]['tags']['name'];
      OSMNodedata['lat'] = data[element]['lat'];
      OSMNodedata['lon'] = data[element]['lon'];
      OSMNodedata['place'] = data[element]['tags']['place'];      
      OSMNodedata['googx'] = "=GOOGLETRANSLATE(\"" + OSMNodedata['name'] + "\",\"en\",\"ta\")";
      //OSMNodedata['wikix'] = QueryWikidata(OSMNodedata['name']);
      OSMNodedata['wikix'] = "=INDEX(WIKITRANSLATE(CONCATENATE(\"en:" + OSMNodedata['name'] + "\"),\"ta\",true),1,1)"
      //TODO Add xliterate option
      
      OSMdata.push([OSMNodedata['id'],OSMNodedata['name'],OSMNodedata['lat'],OSMNodedata['lon'],OSMNodedata['place'],OSMNodedata['googx'],OSMNodedata['wikix']]);
      count++;
      
      sheet.getRange(2+count,1,1,7).setValues(OSMdata);
      
    }
    
}

function OverpassQueryBuilder() {
    //Generate Overpass Queries using common query template and defined inputs?
    /*
    * City / Area
    * Target Language
    * Untranslated / Review / All
    * Node / Relation / Ways / POIs
    * Filter
    */
}

function GetOverpassQueryFromUser() {
    var ui = SpreadsheetApp.getUi();  
    var response = ui.prompt('Overpass Query', 'Input OverpassQuery with json output', ui.ButtonSet.OK_CANCEL);
    
    if (response.getSelectedButton() == ui.Button.OK) {
      query = response.getResponseText();
      Logger.log(query);
  }
  return query;

}

function QueryOverpass(query) {
    //Logger.clear();
    var url = 'http://overpass.osm.rambler.ru/cgi//interpreter';
    var options = {
        'method': 'post',
        'payload': query
        //'muteHttpExceptions': false
    };
    var jsonresponse = UrlFetchApp.fetch(url, options);
    Logger.log(jsonresponse);
    Logger.log('End of QueryOverpass');
    return jsonresponse;
}

function PopulateWikidataColumn() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var places = doc.getActiveSheet().getRange(1693,2,600,1);
    Logger.clear();
    var wikidataplaces = [];
    for (place in places.getValues()) {
        wikidataplaces.push([QueryWikidata(places.getValues()[place])]);
    }
    doc.getActiveSheet().getRange(1693,7,wikidataplaces.length,1).setValues(wikidataplaces);
}

/*function QueryWikidata(query) {

    var HEADERS = { headers: {'X-User-Agent': 'OSM Translation using Google Spreadsheets'} };
    var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=' + query + '&languages=ta&props=labels&format=json';

    var jsonresponse = UrlFetchApp.fetch(url, HEADERS);
    var data = JSON.parse(jsonresponse.getContentText());
    for (entity in data.entities) {
      if(data.entities[entity].hasOwnProperty('labels')) {
        if (data.entities[entity].labels.hasOwnProperty('ta')) {
          return data.entities[entity].labels.ta.value;
        }
      }
    }
    return "";
}*/
