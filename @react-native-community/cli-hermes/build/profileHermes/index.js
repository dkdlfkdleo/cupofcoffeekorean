"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _downloadProfile = require("./downloadProfile");
async function profileHermes([dstPath], ctx, options) {
  try {
    _cliTools().logger.info('Downloading a Hermes Sampling Profiler from your Android device...');
    if (!options.filename) {
      _cliTools().logger.info('No filename is provided, pulling latest file');
    }
    await (0, _downloadProfile.downloadProfile)(ctx, dstPath, options.filename, options.sourcemapPath, options.raw, options.generateSourcemap, options.port, options.appId, options.appIdSuffix, options.host);
  } catch (err) {
    throw err;
  }
}
var _default = {
  name: 'profile-hermes [destinationDir]',
  description: 'Pull and convert a Hermes tracing profile to Chrome tracing profile, then store it in the directory <destinationDir> of the local machine',
  func: profileHermes,
  options: [{
    name: '--filename <string>',
    description: 'File name of the profile to be downloaded, eg. sampling-profiler-trace8593107139682635366.cpuprofile'
  }, {
    name: '--raw',
    description: 'Pulls the original Hermes tracing profile without any transformation'
  }, {
    name: '--sourcemap-path <string>',
    description: 'The local path to your source map file, eg. /tmp/sourcemap.json'
  }, {
    name: '--generate-sourcemap',
    description: 'Generates the JS bundle and source map'
  }, {
    name: '--port <number>',
    default: `${process.env.RCT_METRO_PORT || 8081}`
  }, {
    name: '--appId <string>',
    description: 'Specify an applicationId to launch after build. If not specified, `package` from AndroidManifest.xml will be used.'
  }, {
    name: '--appIdSuffix <string>',
    description: 'Specify an applicationIdSuffix to launch after build.'
  }, {
    name: '--host <string>',
    description: 'The host of the packager.',
    default: 'localhost'
  }],
  examples: [{
    desc: 'Download the Hermes Sampling Profiler to the directory <destinationDir> on the local machine',
    cmd: 'profile-hermes /tmp'
  }]
};
exports.default = _default;

//# sourceMappingURL=index.ts.map