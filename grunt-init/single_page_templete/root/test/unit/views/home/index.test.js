describe('Home Index.html', function () {
    var  template;
    beforeEach(module('templates'));

    beforeEach(inject(function($templateCache, $rootScope, $compile) {
        var templateHtml = $templateCache.get('home/index.html');

        $scope = $rootScope.$new();
        $scope.helloWorld = function () {
            $scope.hello = 'Hello World';
        }

        template = $compile(templateHtml)($scope);
        $scope.$digest();
    }));

    it('should show hello world', function () {
        expect(template.text()).toContain('Hello World');
    });
});