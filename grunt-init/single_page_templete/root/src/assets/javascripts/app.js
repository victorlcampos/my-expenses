var {%= name %}App  = angular.module('{%= name %}App', [
  '{%= name %}Routes',
  '{%= name %}Controllers',
  '{%= name %}Services'
]);

var {%= name %}Routes      = angular.module('{%= name %}Routes'     , ['ngRoute'   ]);
var {%= name %}Controllers = angular.module('{%= name %}Controllers', []);
var {%= name %}Services    = angular.module('{%= name %}Services'   , ['ngResource']);

window.viewsPath        = "../../";
window.apiRemoteUrl     = "<%= apiRemoteUrl %>/";