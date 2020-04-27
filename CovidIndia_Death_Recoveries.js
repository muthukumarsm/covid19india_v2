(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "agebracket",
            alias: "Age",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "city",
            alias: "City",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "date",
            alias: "Date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "district",
            alias: "District",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "gender",
            alias: "Gender",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "patientstatus",
            alias: "Status",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "state",
            alias: "state",
            dataType: tableau.dataTypeEnum.string
        }
        
        ];

        var tableSchema = {
            id: "CovidDeathRecovery",
            alias: "India Covid Death & Recovery Details",
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

        $.getJSON("https://api.covid19india.org/deaths_recoveries.json", function(resp) {
            var feat = resp.deaths_recoveries,countryVal = "India",
                tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                    tableData.push({
                    
                        "agebracket" : feat[j].agebracket,
                        "city": feat[j].city,
                        "date":feat[j].date,                    
                        "district":feat[j].district,
                        "gender": feat[j].gender,
                        "patientstatus": feat[j].patientstatus,
                        "state": feat[j].state,
                        "country":countryVal
                        
                    });
            } 
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India Dataset - Death & Recovery"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
