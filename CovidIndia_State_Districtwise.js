(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "state",
            alias: "State",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "district",
            alias: "District",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "confirmed",
            alias: "Confirmed",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "active",
            alias: "active",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deceased",
            alias: "deceased",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "recovered",
            alias: "recovered",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deltaconfirmed",
            alias: "DeltaConfirmed",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deltadeceased",
            alias: "deltadeceased",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deltarecovered",
            alias: "deltarecovered",
            dataType: tableau.dataTypeEnum.int
        },        
        ];

        var tableSchema = {
            id: "CovidStateDistrictwise",
            alias: "India Covid District State Details",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     /*   $.ajaxSetup({
         headers : {
            'x-rapidapi-host' : 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key' : 'd18cdeb3a2mshab6824adf713c9ep130fb2jsncca2d444588d'
          } 
        }); */

        $.getJSON("https://api.covid19india.org/v2/state_district_wise.json", function(resp) {
            var feat = resp,countryVal = "India",state="",
                tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                    var districtdata = feat[j].districtData;
                    statevalue = feat[j].state;
                    for (var k=0,len1 = districtdata.length; k<len1; k++) {
                    tableData.push({    
                        "state": statevalue,                
                        "district" : districtdata[k].district,
                        "confirmed": districtdata[k].confirmed,
                        "active":districtdata[k].active,
                        "deceased":districtdata[k].deceased,
                        "recovered": districtdata[k].recovered,
                        "deltaconfirmed":districtdata[k].delta.confirmed,
                        "deltadeceased":districtdata[k].delta.deceased,
                        "deltarecovered": districtdata[k].delta.recovered
                    });
                }
            } 
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India State District wise"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
