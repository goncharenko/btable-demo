module.exports = function() {
  var client = './src/';
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };
  var nodesModules = 'nodes_modules';
  var config = {
    alljs: [
      client + 'scripts/**/*.js'
    ],
    bower: bower,
    build: './dist/',
    client: client,
    css: [
      client + 'content/styles/**/*.css'
    ],
    html: client + '/**/*.html',
    index: client + 'index.html',
    js: [
      client + 'scripts/**/*.module.js',
      client + 'scripts/**/*.js'
    ],
    jsOrder: [
      'scripts/**/*.module.js',
      'scripts/**/*.js',
    ],
    lib: './lib/'
  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
