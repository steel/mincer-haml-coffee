'use strict';

var prop = require('mincer/lib/mincer/common').prop;

// 3rd-party
var _ = require('lodash');
var CoffeeScript; // initialized later
var HamlCoffee;   // initialized later


module.exports = function addHamlCoffeeEngine(Mincer, hamlc){
  // Class constructor
  var HamlCoffeeEngine = Mincer.HamlCoffeeEngine = function HamlCoffeeEngine() {
    Mincer.Template.apply(this, arguments);
    CoffeeScript  = CoffeeScript || Mincer.Template.libs['coffee-script'] || require('coffee-script');
    require("coffee-script/register");
    HamlCoffee    = HamlCoffee || Mincer.Template.libs['haml-coffee/src/haml-coffee'] || require('haml-coffee/src/haml-coffee');
  };


  require('util').inherits(HamlCoffeeEngine, Mincer.Template);


  // Internal (private) options storage
  var options = {};


  /**
   *  HamlCoffeeEngine.configure(opts) -> Void
   *  - opts (Object):
   *
   *  Allows to set Haml Coffee Template compilation opts.
   *  See Haml Coffee Template compilation opts for details.
   *
   *  Default: `{}`.
   *
   *
   *  ##### Example
   *
   *      HamlCoffeeEngine.configure({basename: true});
   **/
  HamlCoffeeEngine.configure = function (opts) {
    options = _.clone(opts);
  };


  // Render data
  HamlCoffeeEngine.prototype.evaluate = function (context, locals) {
    var compiler, source, evil = 'eval';

    compiler = new HamlCoffee(_.clone(options));
    compiler.parse(this.data);

    source = compiler.precompile().replace(/^(.*)$/mg, '  $1');
    source = '(context) -> ( -> \n' + source + '\n).call(context)';

    if (this.nextProcessor && 'JstEngine' === this.nextProcessor.name) {
      return CoffeeScript.compile(source, { bare: true });
    }

    return CoffeeScript[evil](source)(locals);
  };

  Mincer.registerEngine(".hamlc", Mincer.HamlCoffeeEngine);

  prop(Mincer.HamlCoffeeEngine, "defaultMimeType", "application/javascript");
};