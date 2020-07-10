
(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "district",
            alias: "District",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "state",
            alias: "State",
            dataType: tableau.dataTypeEnum.string
        },     
                
        {
            id: "place",
            alias: "Place",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "latitude",
            alias: "Latitude",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "longitude",
            alias: "Longitude",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "country",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        }
        
        ];

        var tableSchema = {
            id: "ContainmentZone",
            alias: "Covid India Containment Zones - Streets",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    
    var data;
    var csvobj = $.csv;

   // var csvstring_test = `"Nage Layout, Kaulkhed, Akola, Maharashtra, India",20.673,77.013,"Dahigaon Ne., Maharashtra, India",19.512,75.198,"Mhasrul Gaon, Nashik, Maharashtra, India",20.047,73.808,"Sant Kabir Nagar, Nashik, Maharashtra, India",20.006,73.751,"Lokgram, Kalyan, Maharashtra, India",19.229,73.127,"Loksahakar Nagar, Nashik, Maharashtra, India",20.016,73.799,"Panchavati, Nashik, Maharashtra, India",20.007,73.793,"Mahe, Maharashtra, India",16.64,74.146,"Shivajinagar, Pune, Maharashtra, India",18.531,73.847,"Tathawade, Dattwadi, Maharashtra, India",18.628,73.745,"Ramanand Nagar, Jalgaon, Maharashtra, India",20.997,75.549,"Alni, Osmanabad, Maharashtra, India",18.287,76.008,"Hanuman Wadi, Chalisgaon, Maharashtra, India",20.465,75.007,"Sion East, Dharavi, Mumbai, Maharashtra, India",19.035,72.867,"Shahr, Balapur, Maharashtra, India",20.673,76.773,"Khanji, Warora, Maharashtra, India",20.252,79.011,"Hudcu, Savarkar Nagar, Manmad, Maharashtra, India",20.252,74.427,"Badnera, Maharashtra, India",20.86,77.737,"Vasai East, Vasai, Maharashtra, India",19.393,72.862,"Sai Nagar, Amravati, Maharashtra, India",20.895,77.729,"Shikshak Colony, Chalisgaon, Maharashtra, India",20.475,74.999,"Sneha Nagar, Laxmi Nagar, Sillod, Maharashtra, India",20.301,75.65,"Kurla, Mumbai, Maharashtra, India",19.06,72.89,"Anand Nagar, Nanded, Maharashtra, India",19.175,77.319,"Raviwar Peth, Pune, Maharashtra, India",18.517,73.861,"Harinayan Park, Isbavi, Pandharpur, Maharashtra, India",17.689,75.303,"Ishwar Nagar, Nagpur, Maharashtra, India",21.128,79.126,"Peint, Maharashtra, India",20.265,73.508,"Kurla East, Mumbai, Maharashtra, India",19.062,72.883,"Mominpura, Nagpur, Maharashtra, India",21.156,79.094,"Viman Nagar, Pune, Maharashtra, India",18.567,73.912`;
   var csvstring_test = `400001,400002,400003,400004,400005,400006,400007,400008,400009,400010,400011,400012,400013,400014,400015,400016,400017,400018,400019,400020,400021,400022,400023,400024,400025,400026,400027,400028,400029,400030,400031,400032,400033,400034,400035,400036,400037,400038,400039,400040,400041,400042,400043,400044,400045,400046,400047,400048,400049,400050,400051,400052,400053,400054,400055,400056,400057,400058,400059,400060,400061,400062,400063,400064,400065,400066,400067,400068,400069,400070,400071,400072,400073,400074,400075`;
    
     

    data = csvobj.toArrays(csvstring_test);
    
    var place = "",lat_coord = "",long_coord= "";
    var count = 0;
    myConnector.getData = function(table, doneCallback) {
        var tableData = [];

          $.each(data, function( index, row ) {           
              
              $.each(row, function( index, colData ) {
                
                    pincodevalue = colData;  
                    long_coord = colData; 
                    console.log("lat " + lat_coord + " long " + long_coord);      
                    var areasList;
                    var xhr = new XMLHttpRequest();
                    var url = "https://data.geoiq.io/dataapis/v1.0/covid/pincodecheck";
                    xhr.open("POST", url, false);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onreadystatechange = function () {
                     console.log("ready state " + xhr.readyState + " status " + xhr.status);   
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            var json = JSON.parse(xhr.responseText);
                            console.log(json);
                            areasList =  json["containmentZoneNames"];
                            console.log("areas list " + areasList);
                        }
                    };
                    var obj = new Object();

                    var name = 'key';
                    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                    var results = regex.exec(location.search);
                    obj.key =  results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));    

                    
                    obj.pincode = "" + pincodevalue;
                    // var data = JSON.stringify({"key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJtdXRodWt1bWFyLnNtQGdtYWlsLmNvbSJ9.LL23WWNKm6MoIKFYLMkL4oAzE4gRdxKxlcVA6Db_2d8", "lng": "80.26","lat":"13.07","radius":"5000"});
                    xhr.send(JSON.stringify(obj));
                    
                   
                    if (areasList != null) { 
                        console.log("arealist " + areasList);
                            for (i = 0;i < areasList.length;i++) {
                                var containmentzone = areasList[i];
                              //  var result = place.split(",");
                                district = "Maharashtra";
                                state = "Mumbai";
                                tableData.push({
                                    "country":"India",
                                    "place":containmentzone,
                                    "district" : district,
                                    "latitude": lat_coord,
                                    "longitude":long_coord,
                                    "state": state                                  
                                });                        
                            }
                    } 
                 
                             
              });
          });
         table.appendRows(tableData);   
         doneCallback();
        };
        
    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India Dataset - Containment Streets"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
