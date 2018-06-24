/**
 * In this file we set up an AngularJS controller
 */

// Set up an angular module with the name 'app' and assign
// it to a variable, this way we can create multiple controllers
// in a single module 
var app = angular.module('app', []);

app.controller("FormController", function($scope, $http) {

  console.log("Form controller created");

  this.JulianDate = function(id, im, iy) {

    var dy = iy + (im - 2.85) /12;

    var da = Math.floor(367 * dy) - 1.75 * Math.floor(dy) + id;

    var db = Math.floor(da) - 0.75 * Math.floor(dy/100);

    return Math.floor(Math.floor(db) + 1721115);
    
  }

  this.showDays = 7;

  var myDate = new Date();

  var fromJD = this.JulianDate(21,6,2018);
  fromJD = fromJD - this.showDays;

  $http({
    url: "/bu",
    method: "POST",
    data: {"juliandate": fromJD}
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.resdata = response.data;
    }, function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         console.log(response.statusText);
    });


    this.submitForm = function() {

      // do something useful with the form data here
      console.log("Form submitted");

      var myDate = new Date();

      var d = myDate.getUTCDate();
      var m = myDate.getUTCMonth() + 1;
      var y = myDate.getUTCFullYear();

      var fromJD = this.JulianDate(21,6,2018);
      fromJD = fromJD - this.showDays;

      $http({
        url: "/bu",
        method: "POST",
        data: {"juliandate": fromJD}
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.resdata = response.data;
        }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             console.log(response.statusText);
        });

    };

});

app.controller('MailController', function($scope, $http) {

  console.log("Mail controller created");

  $scope.email = {
    userName: '',
    userMail: '',
    userSubject: '',
    userMSG: ''
  };

  this.submitForm = function(emailData) {
      // do something useful with the form data here
      console.log("Form data:" + JSON.stringify(emailData));

      $http({
        url: "/usercontact",
        method: "POST",
        data: emailData
      }).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available
             console.log(response.statusText);
             $scope.email = {
             };
             scope.form.$setPristine();
             scope.form.$setUntouched();
        }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             console.log(response.statusText);
             $scope.email = {
             };
             scope.form.$setPristine();
             scope.form.$setUntouched();
        });
   };

});

