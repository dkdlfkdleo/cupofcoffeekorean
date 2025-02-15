"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;
exports.cleanDir = cleanDir;
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
function _fs() {
  const data = require("fs");
  _fs = function () {
    return data;
  };
  return data;
}
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _util() {
  const data = require("util");
  _util = function () {
    return data;
  };
  return data;
}
function _fastGlob() {
  const data = _interopRequireDefault(require("fast-glob"));
  _fastGlob = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_GROUPS = ['metro', 'watchman'];
const rmAsync = (0, _util().promisify)(_fs().rm);
const rmAsyncOptions = {
  maxRetries: 3,
  recursive: true,
  force: true
};
function isDirectoryPattern(directory) {
  return directory.endsWith('*') || directory.endsWith('?');
}
async function cleanDir(directory) {
  try {
    if (isDirectoryPattern(directory)) {
      const directories = await _fastGlob().default.async(directory, {
        onlyFiles: false
      });
      for (const dir of directories) {
        await rmAsync(dir, rmAsyncOptions);
      }
    } else {
      if (!(0, _fs().existsSync)(directory)) {
        return;
      }
      await rmAsync(directory, rmAsyncOptions);
    }
  } catch (error) {
    _cliTools().logger.error(`An error occurred while cleaning the directory: ${error}`);
  }
}
async function promptForCaches(groups) {
  const {
    caches
  } = await (0, _cliTools().prompt)({
    type: 'multiselect',
    name: 'caches',
    message: 'Select all caches to clean',
    choices: Object.entries(groups).map(([cmd, group]) => ({
      title: `${cmd} ${_chalk().default.dim(`(${group.description})`)}`,
      value: cmd,
      selected: DEFAULT_GROUPS.includes(cmd)
    })),
    min: 1
  });
  return caches;
}
async function clean(_argv, ctx, cleanOptions) {
  const {
    include,
    projectRoot,
    verifyCache
  } = cleanOptions;
  if (!(0, _fs().existsSync)(projectRoot)) {
    throw new Error(`Invalid path provided! ${projectRoot}`);
  }
  const COMMANDS = {
    android: {
      description: 'Android build caches, e.g. Gradle',
      tasks: [{
        label: 'Clean Gradle cache',
        action: async () => {
          var _ctx$project$android, _ctx$project$android2;
          const gradlew = _os().default.platform() === 'win32' ? _path().default.join(((_ctx$project$android = ctx.project.android) === null || _ctx$project$android === void 0 ? void 0 : _ctx$project$android.sourceDir) ?? 'android', 'gradlew.bat') : _path().default.join(((_ctx$project$android2 = ctx.project.android) === null || _ctx$project$android2 === void 0 ? void 0 : _ctx$project$android2.sourceDir) ?? 'android', 'gradlew');
          if ((0, _fs().existsSync)(gradlew)) {
            const script = _path().default.basename(gradlew);
            await (0, _execa().default)(_os().default.platform() === 'win32' ? script : `./${script}`, ['clean'], {
              cwd: _path().default.dirname(gradlew)
            });
          }
        }
      }]
    },
    ...(_os().default.platform() === 'darwin' ? {
      cocoapods: {
        description: 'CocoaPods cache',
        tasks: [{
          label: 'Clean CocoaPods pod cache',
          action: async () => {
            await (0, _execa().default)('pod', ['cache', 'clean', '--all'], {
              cwd: projectRoot
            });
          }
        }, {
          label: 'Remove installed CocoaPods',
          action: () => cleanDir('ios/Pods')
        }, {
          label: 'Remove CocoaPods spec cache',
          action: () => cleanDir('~/.cocoapods')
        }]
      }
    } : undefined),
    metro: {
      description: 'Metro, haste-map caches',
      tasks: [{
        label: 'Clean Metro cache',
        action: () => cleanDir(`${_os().default.tmpdir()}/metro-*`)
      }, {
        label: 'Clean Haste cache',
        action: () => cleanDir(`${_os().default.tmpdir()}/haste-map-*`)
      }, {
        label: 'Clean React Native cache',
        action: () => cleanDir(`${_os().default.tmpdir()}/react-*`)
      }]
    },
    npm: {
      description: '`node_modules` folder in the current package, and optionally verify npm cache',
      tasks: [{
        label: 'Remove node_modules',
        action: () => cleanDir(`${projectRoot}/node_modules`)
      }, ...(verifyCache ? [{
        label: 'Verify npm cache',
        action: async () => {
          await (0, _execa().default)('npm', ['cache', 'verify'], {
            cwd: projectRoot
          });
        }
      }] : [])]
    },
    bun: {
      description: 'Bun cache',
      tasks: [{
        label: 'Clean Bun cache',
        action: async () => {
          await (0, _execa().default)('bun', ['pm', 'cache', 'rm'], {
            cwd: projectRoot
          });
        }
      }]
    },
    watchman: {
      description: 'Stop Watchman and delete its cache',
      tasks: [{
        label: 'Stop Watchman',
        action: async () => {
          await (0, _execa().default)(_os().default.platform() === 'win32' ? 'tskill' : 'killall', ['watchman'], {
            cwd: projectRoot
          });
        }
      }, {
        label: 'Delete Watchman cache',
        action: async () => {
          await (0, _execa().default)('watchman', ['watch-del-all'], {
            cwd: projectRoot
          });
        }
      }]
    },
    yarn: {
      description: 'Yarn cache',
      tasks: [{
        label: 'Clean Yarn cache',
        action: async () => {
          await (0, _execa().default)('yarn', ['cache', 'clean'], {
            cwd: projectRoot
          });
        }
      }]
    }
  };
  const groups = include ? include.split(',') : await promptForCaches(COMMANDS);
  if (!groups || groups.length === 0) {
    return;
  }
  const spinner = (0, _cliTools().getLoader)();
  for (const group of groups) {
    const commands = COMMANDS[group];
    if (!commands) {
      spinner.warn(`Unknown group: ${group}`);
      continue;
    }
    for (const {
      action,
      label
    } of commands.tasks) {
      spinner.start(label);
      await action().then(() => {
        spinner.succeed();
      }).catch(e => {
        spinner.fail(`${label} » ${e}`);
      });
    }
  }
}
var _default = {
  func: clean,
  name: 'clean',
  description: 'Cleans your project by removing React Native related caches and modules.',
  options: [{
    name: '--include <string>',
    description: 'Comma-separated flag of caches to clear e.g. `npm,yarn`. If omitted, an interactive prompt will appear.'
  }, {
    name: '--project-root <string>',
    description: 'Root path to your React Native project. When not specified, defaults to current working directory.',
    default: process.cwd()
  }, {
    name: '--verify-cache',
    description: 'Whether to verify the cache. Currently only applies to npm cache.',
    default: false
  }]
};
exports.default = _default;

//# sourceMappingURL=clean.ts.map