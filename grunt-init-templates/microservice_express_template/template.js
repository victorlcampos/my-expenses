'use strict';

exports.description = 'BETA: Scaffold a minimal express microservice.';
exports.notes = '';
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _node app.js_.';
exports.warnOn = '*';

exports.template = function(grunt, init, done) {
  init.process({}, [
    init.prompt('name')
  ], function(err, props) {
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });
};
