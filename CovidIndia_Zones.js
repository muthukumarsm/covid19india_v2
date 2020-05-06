(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "district",
            alias: "District",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "districtcode",
            alias: "District Code",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "state",
            alias: "State",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "statecode",
            alias: "State Code",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "zone",
            alias: "Zone",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "lastupdated",
            alias: "Last Updated",
            dataType: tableau.dataTypeEnum.date
        }
        ];

        var tableSchema = {
            id: "ContainmentDistricts",
            alias: "Covid India Containment Districts",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     
        $.getJSON("https://api.covid19india.org/zones.json", function(resp) {
            var feat = resp.zones,tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                

               
                    tableData.push({
                    
                        "district" : feat[j].district,
                        "districtcode": feat[j].districtcode,
                        "state":feat[j].state,
                        "statecode":feat[j].statecode,
                        "zone": feat[j].zone,
                        "lastupdated": feat[j].lastupdated
                                                
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
            tableau.connectionName = "Covid 19 India Dataset - Containment District"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
