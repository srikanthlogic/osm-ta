Steps To Translate nodes

1. Open a new spreadsheet in Google Sheets
2. Use Tools -> Script Editor and paste [Overpass to Google Sheets Translator](OverpassToGoogleSheetsTranslator.gs)
3. Run the method *OverpassToGoogleSheets*
4. Go to the sheets browser tab, enter the overpass query in prompt.
5. For large area, comment out wikidata querying as it would result in timeout.
6. Wikidata translation can be populated seperately *PopulateWikidataColumn* on the script project. 
7. Export node id, translation as a csv
8. Use [OSM-CSV-Translation Uploader.py script](OSM_CSV_Translation_Uploader.py) to upload translations afer changing SM credentials. 
