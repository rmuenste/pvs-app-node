/**
 * In this file we set up an AngularJS controller
 */

// Set up an angular module with the name 'app' and assign
// it to a variable, this way we can create multiple controllers
// in a single module 
var app = angular.module('app', []);

app.controller("FormController", function($scope, $http) {

  console.log("Form controller created");

  $http({
    url: "/bu",
    method: "POST",
    data: {"juliandate":"2458271"}
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.resdata = response.data;
    }, function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         console.log(response.statusText);
    });

    this.userAge = 7;


    this.submitForm = function() {

      // do something useful with the form data here
      console.log("Form submitted");
    };

});
