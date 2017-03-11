// Chennai untranslated places.
[out:xml][timeout:360];
// gather results
(
  area[name="Chennai"];
  // query for "place" "without name:ml" tags
  node["place"](area)["name:ml"!~"."](area);
);
// print results
out meta;
>;
out meta qt;



[out:json][timeout:360];
// gather results
(
  area[name="Tamil Nadu"];
  // query for "place" "without name:ta" tags
  node["place"](area)["name:ta"!~"."](area);
);
// print results
out meta;
>;
out meta qt;


	//Chennai Highway ways	'[out:json][timeout:3600];(way["highway"="primary"](12.9201721,80.1238331,13.2401721,80.4438331)["name:ta"!~"."](12.9201721,80.1238331,13.2401721,80.4438331););out meta;>;out meta qt;';
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
