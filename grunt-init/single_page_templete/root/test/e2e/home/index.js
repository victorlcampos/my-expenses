'use strict';

describe('hello index view', function() {

  var ptor;
  beforeEach(function () {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('should show hello world', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
    var div = ptor.findElement(by.css('div'));
    expect(div.getText()).toEqual("Hello World");
  });
});