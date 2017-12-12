/** UnitTest for navbar.component */


var angular = require('angular');
var uirouter = require('@uirouter/angularjs');
var uibootstrap = require('angular-ui-bootstrap');

var core = require('./../../../app/core');
var auth = require('./../../../app/auth');

describe('menu service', function() {

  var $menuService;

  beforeEach('init app', function(done) {
    angular.module('ita-app', [
      'ui.router',
      'ui.bootstrap',
      core,
      auth
    ]);

    done();
  });

  it('# start menu service', function() {
    var $injector = angular.injector(['ng']);

  });
});