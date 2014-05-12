 
'use strict';

var myApp = angular.module('myApp', []); // Taking Angular Application in Javascript Variable

// Below is the code to allow cross domain request from web server through angular.js
myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

/* Controllers */

function UserListCtrl($scope, $http, $templateCache) {

  var method = 'POST';
  var inserturl = 'http://localhost:1339/insertangularmongouser';// URL where the Node.js server is running
  $scope.codeStatus = "";
  $scope.save = function() {
    // Preparing the Json Data from the Angular Model to send in the Server. 
    var formData = {
      'advName' : this.advName,
      'advLink' : this.advLink,
	  'keywords' : this.keywords,
	  'advId' : this.advId
    };

	this.advName = '';
	this.advLink = '';
	this.keywords = '';
	this.advId = '';

	var jdata = 'mydata='+JSON.stringify(formData); // The data is to be string.

	$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: method,
            url: inserturl,
            data:  jdata ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
        success(function(response) {
		console.log("success"); // Getting Success Response in Callback
                $scope.codeStatus = response.data;
		console.log($scope.codeStatus);

        }).
        error(function(response) {
		console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
		console.log($scope.codeStatus);
        });
	$scope.list();// Calling the list function in Angular Controller to show all current data in HTML
        return false;
  };	

  $scope.list = function() {
	  var url = 'http://localhost:1339/getangularusers';// URL where the Node.js server is running	
	  $http.get(url).success(function(data) {
		$scope.users = data;
	  });
          // Accessing the Angular $http Service to get data via REST Communication from Node Server 
  };

  $scope.list();
}