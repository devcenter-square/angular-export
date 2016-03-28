angular
    .module('export.csv', [])
    .directive('export', function() {
        return {
            restrict: 'AE',
            scope: {
                data: '=exportData',
                title: '=exportTitle',
                keys: '=exportKeys',
                headers: '=exportHeaders',
                filename: '=exportFilename'
            },
            link: function(scope, el, attrs) {
                el.bind('click', function() {
                    var data = scope.data;
                    var title = scope.title;
                    var keys = scope.keys;
                    var headers = scope.headers;
                    var filename = scope.filename;

                    if (data && !Array.isArray(data)) throwError("Data must be a valid javascript array");
                    if (keys && !Array.isArray(keys)) throwError("Keys must be a valid javascript array");
                    if (headers && !Array.isArray(headers)) throwError("Headers must be a valid javascript array");

                    // Remove any angular added keys
                    var json_data = angular.toJson(data);
                    data = JSON.parse(json_data);
                    if (!data.length) throwError("No data available to export");

                    // Get keys & headers to be exported
                    if (!keys) {
                        var sample_data = data[0];
                        keys = Object.keys(sample_data);
                    }
                    if (headers && (headers.length != keys.length)) {
                        throwError("Headers must be the same length as the " + (keys ? "keys": "data") + " to export");
                    } else if (!headers) {
                        headers = convertToUppercase(keys);
                    } 

                    data = filterArrayKeys(data, keys);                   


                    //////////////////////////
                    //// Export Functions ////
                    //////////////////////////

                    var csv = '';
                    if (title) {
                        csv += title + '\r\n\n';
                    }
                    csv += headers.join(",") + '\r\n';

                    for (var i = 0; i < data.length; i++) {
                        var row = "";
                        for (var index in data[i]) {
                            row += '"' + data[i][index] + '",';
                        }
                        row.slice(0, row.length - 1);
                        csv += row + '\r\n';
                    }

                    if (csv == '') {
                        throwError("Invalid Data");
                    }

                    if (!filename) filename = "Export " + getDate();
                    filename = filename.replace(/ /g, "_");
                    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
                    var link = document.createElement("a");
                    link.href = uri;
                    link.style = "visibility:hidden";
                    link.download = filename + ".csv";

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);


                    /////////////////////////
                    /// Utility Functions ///
                    /////////////////////////

                    function throwError(message) {                        
                        throw message;
                        return;
                    }

                    function filterArrayKeys(array, keys) {
                        var result = [];
                        if (!array.length || !keys.length) return result;
                        for (var i = 0; i < array.length; i++) {
                            var array_object = array[i];
                            var new_object = {};
                            for (var j = 0; j < keys.length; j++) {
                                var key = keys[j];
                                var value = array_object[key];
                                new_object[key] = value;
                            }
                            result.push(new_object);
                        }
                        return result;
                    };

                    function convertToUppercase(array) {
                        var result = [];
                        for (var i = 0; i < array.length; i++) {
                            var key = array[i];
                            result.push(key.charAt(0).toUpperCase() + key.slice(1));
                        }
                        return result;
                    }

                    function getDate() {
                        var monthNames = [
                            "January", "February", "March",
                            "April", "May", "June", "July",
                            "August", "September", "October",
                            "November", "December"
                        ];

                        var date = new Date();
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();

                        return day + ' ' + monthNames[monthIndex] + ' ' + year;
                    }
                });
            }
        };
    });
