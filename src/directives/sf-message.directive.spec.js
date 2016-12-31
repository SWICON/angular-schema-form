chai.should();

describe('directive',function() {
  beforeEach(module('schemaForm'));
  beforeEach(
    module(function($sceProvider){
      $sceProvider.enabled(false);
    })
  );

  it('should watch description for changes', function(done) {

    var exampleSchema = {
      "type": "object",
      "properties": {
        "name": {
          "title": "Name",
          "type": "string"
        }
      }
    };

    inject(function($compile,$rootScope) {
      var scope = $rootScope.$new();
      scope.person = {};

      scope.schema = exampleSchema;

      scope.form = [{
        key: 'name',
        description: 'foobar'
      }];

      var tmpl = angular.element('<form sf-schema="schema" sf-form="form" sf-model="person"></form>');

      $compile(tmpl)(scope);
      $rootScope.$apply();
      tmpl.children().find('div.help-block').text().should.equal('foobar');

      setTimeout(function() {
        scope.form[0].description = 'changed';
        scope.$apply();
        tmpl.children().find('div.help-block').text().should.equal('changed');
        done();
      },0);

    });
  });
});
