
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
   var csvstring_test = `location 1,19.088481,72.838148,location 2,19.026742,72.865423,location 3,19.101175,72.856967,location 4,19.057933,72.839290,location 5,18.993122,72.822342,location 6,19.024488,72.873587,location 7,19.042511,72.848878,location 8,18.995031,72.854017,location 9,19.007853,72.851142,location 10,19.049872,72.824040,location 11,19.001633,72.842270,location 12,19.028447,72.872667,location 13,19.037178,72.873359,location 14,19.033369,72.864745,location 15,18.999286,72.842048,location 16,19.100792,72.865115,location 17,19.103947,72.858090,location 18,18.987725,72.816287,location 19,19.004422,72.848745,location 20,18.958542,72.826142,location 21,18.911983,72.806409,location 22,18.964891,72.825856,location 23,18.945397,72.793898,location 24,18.954339,72.830478,location 25,18.955361,72.826490,location 26,18.978547,72.827729,location 27,18.961103,72.834953,location 28,19.137412,72.936764,location 29,18.967283,72.837754,location 30,18.974656,72.826277,location 31,19.044047,72.852890,location 32,19.044894,72.854484,location 33,19.142614,72.926949,location 34,18.953781,72.822942,location 35,19.023681,72.842265,location 36,19.140997,72.925900,location 37,19.141000,72.929484,location 38,19.145173,72.924867,location 39,19.037750,72.855392,location 40,19.036847,72.852131,location 41,19.142614,72.926949,location 42,18.974678,72.850149,location 44,18.988148,72.834249,location 45,19.151570,72.925635,location 46,19.137040,72.937914,location 47,18.956856,72.819426,location 48,18.964925,72.811603,location 49,18.976919,72.808281,location 50,18.959617,72.825123,location 51,18.969950,72.813292,location 52,18.963297,72.819920,location 53,18.972714,72.811145,location 54,18.956939,72.825865,location 55,18.963875,72.822520,location 56,18.953456,72.823648,location 57,18.946044,72.792567,location 58,18.971208,72.817878,location 59,18.964781,72.819117,location 60,18.945042,72.793234,location 61,18.955017,72.823917,location 62,18.967347,72.821765,location 63,18.958800,72.818642,location 64,18.962825,72.824901,location 65,18.984511,72.841650,location 66,18.965319,72.828467,location 67,18.965436,72.826363,location 68,18.970376,72.841077,location 69,18.981897,72.832082,location 70,18.976741,72.835125,location 71,18.963443,72.825855,location 72,18.990197,72.843152,location 73,18.981425,72.840260,location 74,18.980422,72.825476,location 75,18.985628,72.832059,location 76,19.041147,72.857917,location 77,18.948603,72.792548,location 78,19.148626,72.926005,location 79,19.046197,72.855562,location 80,19.153251,72.928262,location 81,19.163500,72.931565,location 82,19.047072,72.858212,location 83,19.041975,72.857776,location 84,19.146963,72.924656,location 85,19.099250,72.898170,location 86,18.953453,72.821384`;
    
     

    data = csvobj.toArrays(csvstring_test);
    
    var place = "",lat_coord = "",long_coord= "";
    var count = 0;
    myConnector.getData = function(table, doneCallback) {
        var tableData = [];

          $.each(data, function( index, row ) {           
              
              $.each(row, function( index, colData ) {
                
                if (index %  3 == 0 ) {
                 place = colData;
                } else if (index % 3 == 1)  { 
                 lat_coord= colData;
                } else {  
                    long_coord = colData; 
                    console.log("lat " + lat_coord + " long " + long_coord);      
                    var areasList;
                    var xhr = new XMLHttpRequest();
                    var url = "https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones";
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

                    console.log("key " + obj.key);
                    obj.lat = "" + lat_coord;
                    obj.lng = "" + long_coord;
                    obj.radius = "5000";
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
