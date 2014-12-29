'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('casaNodejsApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/issues')
      .respond({"casa_modules":[{"name":"Payload","features":[{"name":"TRANSITPAYLOAD","completed":false},{"name":"LOCALPAYLOAD","completed":false}]},{"name":"Publisher","features":[{"name":"SENDOUT","completed":false}]},{"name":"Local","features":[{"name":"SENDLOCAL","completed":false}]},{"name":"Receiver","features":[{"name":"RECEIVEIN","completed":true},{"name":"ADJINTRANSLATE","completed":true},{"name":"ADJINSQUASH","completed":true},{"name":"ADJINFILTER","completed":false}]},{"name":"Relay","features":[{"name":"ADJOUTTRANSFORM","completed":false},{"name":"ADJOUTFILTER","completed":false},{"name":"ADJOUTTRANSLATE","completed":false}]}]});

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should request a list of issues', function () {
    $httpBackend.flush();
  });

  it('should split the issues up into 1 row of three and 1 row of two', function () {
    $httpBackend.flush();
    expect(scope.issueRows.length).toBe(2);
    expect(scope.issueRows[0].length).toBe(3);
    expect(scope.issueRows[1].length).toBe(2);
  });

});
