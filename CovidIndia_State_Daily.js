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
            id: "totalcount",
            alias: "TotalCount",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "date",
            alias: "Date",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "status",
            alias: "Status",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "country",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        }         
        ];

        var tableSchema = {
            id: "CovidStatewiseDaily",
            alias: "India Statewise Daily - https://api.covid19india.org/states_daily.json ",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    
    myConnector.getData = function(table, doneCallback) {


        $.getJSON("https://api.covid19india.org/states_daily.json", function(resp) {
                var feat = resp.states_daily,countryVal = "India",
                tableData = [];
                for (var j = 0, len = feat.length; j < len; j++) { 
                    $.each(feat[j], function(key, val){
                        if (key != "tt" && key != "status" && key != "date") {
                            tableData.push({
                                "state":key,
                                "totalcount":val,
                                "country":countryVal,
                                "status": feat[j].status,
                                "date": feat[j].date
                            });    
                        }                                        
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
            tableau.connectionName = "Covid 19 India Dataset"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
