/**
 * Copyright © 2022 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getNodejsExtensions: ()=>getNodejsExtensions,
    withExtendedResolver: ()=>withExtendedResolver,
    shouldAliasAssetRegistryForWeb: ()=>shouldAliasAssetRegistryForWeb,
    shouldAliasModule: ()=>shouldAliasModule,
    withMetroMultiPlatformAsync: ()=>withMetroMultiPlatformAsync
});
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
function _metroResolver() {
    const data = /*#__PURE__*/ _interopRequireWildcard(require("metro-resolver"));
    _metroResolver = function() {
        return data;
    };
    return data;
}
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _createExpoMetroResolver = require("./createExpoMetroResolver");
const _externals = require("./externals");
const _metroErrors = require("./metroErrors");
const _metroVirtualModules = require("./metroVirtualModules");
const _withMetroResolvers = require("./withMetroResolvers");
const _log = require("../../../log");
const _fileNotifier = require("../../../utils/FileNotifier");
const _env = require("../../../utils/env");
const _exit = require("../../../utils/exit");
const _interactive = require("../../../utils/interactive");
const _loadTsConfigPaths = require("../../../utils/tsconfig/loadTsConfigPaths");
const _resolveWithTsConfigPaths = require("../../../utils/tsconfig/resolveWithTsConfigPaths");
const _metroOptions = require("../middleware/metroOptions");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const debug = require("debug")("expo:start:server:metro:multi-platform");
function withWebPolyfills(config, { getMetroBundler  }) {
    const originalGetPolyfills = config.serializer.getPolyfills ? config.serializer.getPolyfills.bind(config.serializer) : ()=>[];
    const getPolyfills = (ctx)=>{
        const virtualEnvVarId = `\0polyfill:environment-variables`;
        (0, _metroVirtualModules.getMetroBundlerWithVirtualModules)(getMetroBundler()).setVirtualModule(virtualEnvVarId, (()=>{
            return `//`;
        })());
        const virtualModuleId = `\0polyfill:external-require`;
        (0, _metroVirtualModules.getMetroBundlerWithVirtualModules)(getMetroBundler()).setVirtualModule(virtualModuleId, (()=>{
            if (ctx.platform === "web") {
                return `global.$$require_external = typeof window === "undefined" ? require : () => null;`;
            } else {
                // Wrap in try/catch to support Android.
                return 'try { global.$$require_external = typeof expo === "undefined" ? eval("require") : (moduleId) => { throw new Error(`Node.js standard library module ${moduleId} is not available in this JavaScript environment`);} } catch { global.$$require_external = (moduleId) => { throw new Error(`Node.js standard library module ${moduleId} is not available in this JavaScript environment`);} }';
            }
        })());
        if (ctx.platform === "web") {
            return [
                virtualModuleId,
                virtualEnvVarId,
                // Ensure that the error-guard polyfill is included in the web polyfills to
                // make metro-runtime work correctly.
                // TODO: This module is pretty big for a function that simply re-throws an error that doesn't need to be caught.
                require.resolve("@react-native/js-polyfills/error-guard"), 
            ];
        }
        // Generally uses `rn-get-polyfills`
        const polyfills = originalGetPolyfills(ctx);
        return [
            ...polyfills,
            virtualModuleId,
            virtualEnvVarId
        ];
    };
    return {
        ...config,
        serializer: {
            ...config.serializer,
            getPolyfills
        }
    };
}
function normalizeSlashes(p) {
    return p.replace(/\\/g, "/");
}
function getNodejsExtensions(srcExts) {
    const mjsExts = srcExts.filter((ext)=>/mjs$/.test(ext));
    const nodejsSourceExtensions = srcExts.filter((ext)=>!/mjs$/.test(ext));
    // find index of last `*.js` extension
    const jsIndex = nodejsSourceExtensions.reduce((index, ext, i)=>{
        return /jsx?$/.test(ext) ? i : index;
    }, -1);
    // insert `*.mjs` extensions after `*.js` extensions
    nodejsSourceExtensions.splice(jsIndex + 1, 0, ...mjsExts);
    return nodejsSourceExtensions;
}
function withExtendedResolver(config, { tsconfig , isTsconfigPathsEnabled , isFastResolverEnabled , isExporting , isReactCanaryEnabled , getMetroBundler  }) {
    var ref, ref1, ref2, ref3;
    if (isFastResolverEnabled) {
        _log.Log.warn(`Experimental bundling features are enabled.`);
    }
    if (isReactCanaryEnabled) {
        _log.Log.warn(`Experimental React Canary version is enabled.`);
    }
    // Get the `transformer.assetRegistryPath`
    // this needs to be unified since you can't dynamically
    // swap out the transformer based on platform.
    const assetRegistryPath = _fs().default.realpathSync(_path().default.resolve((0, _resolveFrom().default)(config.projectRoot, "@react-native/assets-registry/registry.js")));
    const defaultResolver = _metroResolver().resolve;
    var ref4;
    const resolver = isFastResolverEnabled ? (0, _createExpoMetroResolver.createFastResolver)({
        preserveSymlinks: (ref4 = (ref = config.resolver) == null ? void 0 : ref.unstable_enableSymlinks) != null ? ref4 : true,
        blockList: Array.isArray((ref1 = config.resolver) == null ? void 0 : ref1.blockList) ? (ref2 = config.resolver) == null ? void 0 : ref2.blockList : [
            (ref3 = config.resolver) == null ? void 0 : ref3.blockList
        ]
    }) : defaultResolver;
    const aliases = {
        web: {
            "react-native": "react-native-web",
            "react-native/index": "react-native-web"
        }
    };
    const universalAliases = [];
    // This package is currently always installed as it is included in the `expo` package.
    if (_resolveFrom().default.silent(config.projectRoot, "@expo/vector-icons")) {
        debug("Enabling alias: react-native-vector-icons -> @expo/vector-icons");
        universalAliases.push([
            /^react-native-vector-icons(\/.*)?/,
            "@expo/vector-icons$1"
        ]);
    }
    const preferredMainFields = {
        // Defaults from Expo Webpack. Most packages using `react-native` don't support web
        // in the `react-native` field, so we should prefer the `browser` field.
        // https://github.com/expo/router/issues/37
        web: [
            "browser",
            "module",
            "main"
        ]
    };
    var _paths, _baseUrl;
    let tsConfigResolve = isTsconfigPathsEnabled && ((tsconfig == null ? void 0 : tsconfig.paths) || (tsconfig == null ? void 0 : tsconfig.baseUrl) != null) ? _resolveWithTsConfigPaths.resolveWithTsConfigPaths.bind(_resolveWithTsConfigPaths.resolveWithTsConfigPaths, {
        paths: (_paths = tsconfig.paths) != null ? _paths : {},
        baseUrl: (_baseUrl = tsconfig.baseUrl) != null ? _baseUrl : config.projectRoot,
        hasBaseUrl: !!tsconfig.baseUrl
    }) : null;
    // TODO: Move this to be a transform key for invalidation.
    if (!isExporting && (0, _interactive.isInteractive)()) {
        if (isTsconfigPathsEnabled) {
            // TODO: We should track all the files that used imports and invalidate them
            // currently the user will need to save all the files that use imports to
            // use the new aliases.
            const configWatcher = new _fileNotifier.FileNotifier(config.projectRoot, [
                "./tsconfig.json",
                "./jsconfig.json", 
            ]);
            configWatcher.startObserving(()=>{
                debug("Reloading tsconfig.json");
                (0, _loadTsConfigPaths.loadTsConfigPathsAsync)(config.projectRoot).then((tsConfigPaths)=>{
                    if ((tsConfigPaths == null ? void 0 : tsConfigPaths.paths) && !!Object.keys(tsConfigPaths.paths).length) {
                        debug("Enabling tsconfig.json paths support");
                        var _paths, _baseUrl;
                        tsConfigResolve = _resolveWithTsConfigPaths.resolveWithTsConfigPaths.bind(_resolveWithTsConfigPaths.resolveWithTsConfigPaths, {
                            paths: (_paths = tsConfigPaths.paths) != null ? _paths : {},
                            baseUrl: (_baseUrl = tsConfigPaths.baseUrl) != null ? _baseUrl : config.projectRoot,
                            hasBaseUrl: !!tsConfigPaths.baseUrl
                        });
                    } else {
                        debug("Disabling tsconfig.json paths support");
                        tsConfigResolve = null;
                    }
                });
            });
            // TODO: This probably prevents the process from exiting.
            (0, _exit.installExitHooks)(()=>{
                configWatcher.stopObserving();
            });
        } else {
            debug("Skipping tsconfig.json paths support");
        }
    }
    let nodejsSourceExtensions = null;
    function getStrictResolver({ resolveRequest , ...context }, platform) {
        return function doResolve(moduleName) {
            return resolver(context, moduleName, platform);
        };
    }
    function getOptionalResolver(context, platform) {
        const doResolve = getStrictResolver(context, platform);
        return function optionalResolve(moduleName) {
            try {
                return doResolve(moduleName);
            } catch (error) {
                // If the error is directly related to a resolver not being able to resolve a module, then
                // we can ignore the error and try the next resolver. Otherwise, we should throw the error.
                const isResolutionError = (0, _metroErrors.isFailedToResolveNameError)(error) || (0, _metroErrors.isFailedToResolvePathError)(error);
                if (!isResolutionError) {
                    throw error;
                }
            }
            return null;
        };
    }
    const metroConfigWithCustomResolver = (0, _withMetroResolvers.withMetroResolvers)(config, [
        // Mock out production react imports in development.
        (context, moduleName, platform)=>{
            // This resolution is dev-only to prevent bundling the production React packages in development.
            // @ts-expect-error: dev is not on type.
            if (!context.dev) return null;
            if (// Match react-native renderers.
            (platform !== "web" && context.originModulePath.match(/[\\/]node_modules[\\/]react-native[\\/]/) && moduleName.match(/([\\/]ReactFabric|ReactNativeRenderer)-prod/)) || // Match react production imports.
            (moduleName.match(/\.production(\.min)?\.js$/) && // Match if the import originated from a react package.
            context.originModulePath.match(/[\\/]node_modules[\\/](react[-\\/]|scheduler[\\/])/))) {
                debug(`Skipping production module: ${moduleName}`);
                // /Users/path/to/expo/node_modules/react/index.js ./cjs/react.production.min.js
                // /Users/path/to/expo/node_modules/react/jsx-dev-runtime.js ./cjs/react-jsx-dev-runtime.production.min.js
                // /Users/path/to/expo/node_modules/react-is/index.js ./cjs/react-is.production.min.js
                // /Users/path/to/expo/node_modules/react-refresh/runtime.js ./cjs/react-refresh-runtime.production.min.js
                // /Users/path/to/expo/node_modules/react-native/node_modules/scheduler/index.native.js ./cjs/scheduler.native.production.min.js
                // /Users/path/to/expo/node_modules/react-native/node_modules/react-is/index.js ./cjs/react-is.production.min.js
                return {
                    type: "empty"
                };
            }
            return null;
        },
        // tsconfig paths
        (context, moduleName, platform)=>{
            var ref;
            return (ref = tsConfigResolve == null ? void 0 : tsConfigResolve({
                originModulePath: context.originModulePath,
                moduleName
            }, getOptionalResolver(context, platform))) != null ? ref : null;
        },
        // Node.js externals support
        (context, moduleName, platform)=>{
            var ref, ref1;
            const isServer = ((ref = context.customResolverOptions) == null ? void 0 : ref.environment) === "node" || ((ref1 = context.customResolverOptions) == null ? void 0 : ref1.environment) === "react-server";
            if (platform !== "web" && !isServer) {
                // This is a web/server-only feature, we may extend the shimming to native platforms in the future.
                return null;
            }
            const moduleId = (0, _externals.isNodeExternal)(moduleName);
            if (!moduleId) {
                return null;
            }
            if (// In browser runtimes, we want to either resolve a local node module by the same name, or shim the module to
            // prevent crashing when Node.js built-ins are imported.
            !isServer) {
                // Perform optional resolve first. If the module doesn't exist (no module in the node_modules)
                // then we can mock the file to use an empty module.
                const result = getOptionalResolver(context, platform)(moduleName);
                return result != null ? result : {
                    // In this case, mock the file to use an empty module.
                    type: "empty"
                };
            }
            const contents = `module.exports=$$require_external('node:${moduleId}');`;
            debug(`Virtualizing Node.js "${moduleId}"`);
            const virtualModuleId = `\0node:${moduleId}`;
            (0, _metroVirtualModules.getMetroBundlerWithVirtualModules)(getMetroBundler()).setVirtualModule(virtualModuleId, contents);
            return {
                type: "sourceFile",
                filePath: virtualModuleId
            };
        },
        // Basic moduleId aliases
        (context, moduleName, platform)=>{
            // Conditionally remap `react-native` to `react-native-web` on web in
            // a way that doesn't require Babel to resolve the alias.
            if (platform && platform in aliases && aliases[platform][moduleName]) {
                const redirectedModuleName = aliases[platform][moduleName];
                return getStrictResolver(context, platform)(redirectedModuleName);
            }
            for (const [matcher, alias] of universalAliases){
                const match = moduleName.match(matcher);
                if (match) {
                    var ref;
                    const aliasedModule = alias.replace(/\$(\d+)/g, (_, index)=>(ref = match[parseInt(index, 10)]) != null ? ref : "");
                    const doResolve = getStrictResolver(context, platform);
                    debug(`Alias "${moduleName}" to "${aliasedModule}"`);
                    return doResolve(aliasedModule);
                }
            }
            return null;
        },
        // TODO: Reduce these as much as possible in the future.
        // Complex post-resolution rewrites.
        (context, moduleName, platform)=>{
            const doResolve = getStrictResolver(context, platform);
            const result = doResolve(moduleName);
            if (result.type !== "sourceFile") {
                return result;
            }
            if (platform === "web") {
                // Replace the web resolver with the original one.
                // This is basically an alias for web-only.
                // TODO: Drop this in favor of the standalone asset registry module.
                if (shouldAliasAssetRegistryForWeb(platform, result)) {
                    // @ts-expect-error: `readonly` for some reason.
                    result.filePath = assetRegistryPath;
                }
                if (platform === "web" && result.filePath.includes("node_modules")) {
                    // Replace with static shims
                    const normalName = normalizeSlashes(result.filePath)// Drop everything up until the `node_modules` folder.
                    .replace(/.*node_modules\//, "");
                    const shimFile = (0, _externals.shouldCreateVirtualShim)(normalName);
                    if (shimFile) {
                        const virtualId = `\0shim:${normalName}`;
                        const bundler = (0, _metroVirtualModules.getMetroBundlerWithVirtualModules)(getMetroBundler());
                        if (!bundler.hasVirtualModule(virtualId)) {
                            bundler.setVirtualModule(virtualId, _fs().default.readFileSync(shimFile, "utf8"));
                        }
                        debug(`Redirecting module "${result.filePath}" to shim`);
                        return {
                            ...result,
                            filePath: virtualId
                        };
                    }
                }
            } else {
                // When server components are enabled, redirect React Native's renderer to the canary build
                // this will enable the use hook and other requisite features from React 19.
                if (isReactCanaryEnabled && result.filePath.includes("node_modules")) {
                    const normalName1 = normalizeSlashes(result.filePath)// Drop everything up until the `node_modules` folder.
                    .replace(/.*node_modules\//, "");
                    const canaryFile = (0, _externals.shouldCreateVirtualCanary)(normalName1);
                    if (canaryFile) {
                        debug(`Redirecting React Native module "${result.filePath}" to canary build`);
                        return {
                            ...result,
                            filePath: canaryFile
                        };
                    }
                }
            }
            return result;
        }, 
    ]);
    // Ensure we mutate the resolution context to include the custom resolver options for server and web.
    const metroConfigWithCustomContext = (0, _withMetroResolvers.withMetroMutatedResolverContext)(metroConfigWithCustomResolver, (immutableContext, moduleName, platform)=>{
        var ref;
        const context = {
            ...immutableContext,
            preferNativePlatform: platform !== "web"
        };
        if ((0, _metroOptions.isServerEnvironment)((ref = context.customResolverOptions) == null ? void 0 : ref.environment)) {
            var ref1;
            // Adjust nodejs source extensions to sort mjs after js, including platform variants.
            if (nodejsSourceExtensions === null) {
                nodejsSourceExtensions = getNodejsExtensions(context.sourceExts);
            }
            context.sourceExts = nodejsSourceExtensions;
            context.unstable_enablePackageExports = true;
            context.unstable_conditionsByPlatform = {};
            // Node.js runtimes should only be importing main at the moment.
            // This is a temporary fix until we can support the package.json exports.
            context.mainFields = [
                "main",
                "module"
            ];
            // Enable react-server import conditions.
            if (((ref1 = context.customResolverOptions) == null ? void 0 : ref1.environment) === "react-server") {
                context.unstable_conditionNames = [
                    "node",
                    "require",
                    "react-server",
                    "workerd"
                ];
            } else {
                context.unstable_conditionNames = [
                    "node",
                    "require"
                ];
            }
        } else {
            // Non-server changes
            if (!_env.env.EXPO_METRO_NO_MAIN_FIELD_OVERRIDE && platform && platform in preferredMainFields) {
                context.mainFields = preferredMainFields[platform];
            }
        }
        return context;
    });
    return (0, _withMetroResolvers.withMetroErrorReportingResolver)(metroConfigWithCustomContext);
}
function shouldAliasAssetRegistryForWeb(platform, result) {
    return platform === "web" && (result == null ? void 0 : result.type) === "sourceFile" && typeof (result == null ? void 0 : result.filePath) === "string" && normalizeSlashes(result.filePath).endsWith("react-native-web/dist/modules/AssetRegistry/index.js");
}
function shouldAliasModule(input, alias) {
    var ref, ref1;
    return input.platform === alias.platform && ((ref = input.result) == null ? void 0 : ref.type) === "sourceFile" && typeof ((ref1 = input.result) == null ? void 0 : ref1.filePath) === "string" && normalizeSlashes(input.result.filePath).endsWith(alias.output);
}
async function withMetroMultiPlatformAsync(projectRoot, { config , exp , platformBundlers , isTsconfigPathsEnabled , webOutput , isFastResolverEnabled , isExporting , isReactCanaryEnabled , getMetroBundler  }) {
    if (!config.projectRoot) {
        // @ts-expect-error: read-only types
        config.projectRoot = projectRoot;
    }
    var _EXPO_PUBLIC_PROJECT_ROOT;
    // Required for @expo/metro-runtime to format paths in the web LogBox.
    process.env.EXPO_PUBLIC_PROJECT_ROOT = (_EXPO_PUBLIC_PROJECT_ROOT = process.env.EXPO_PUBLIC_PROJECT_ROOT) != null ? _EXPO_PUBLIC_PROJECT_ROOT : projectRoot;
    if ([
        "static",
        "server"
    ].includes(webOutput != null ? webOutput : "")) {
        // Enable static rendering in runtime space.
        process.env.EXPO_PUBLIC_USE_STATIC = "1";
    }
    // This is used for running Expo CLI in development against projects outside the monorepo.
    if (!isDirectoryIn(__dirname, projectRoot)) {
        if (!config.watchFolders) {
            // @ts-expect-error: watchFolders is readonly
            config.watchFolders = [];
        }
        // @ts-expect-error: watchFolders is readonly
        config.watchFolders.push(_path().default.join(require.resolve("metro-runtime/package.json"), "../.."));
        if (isReactCanaryEnabled) {
            // @ts-expect-error: watchFolders is readonly
            config.watchFolders.push(_path().default.join(require.resolve("@expo/cli/package.json"), ".."));
        }
    }
    // @ts-expect-error
    config.transformer._expoRouterWebRendering = webOutput;
    // @ts-expect-error: Invalidate the cache when the location of expo-router changes on-disk.
    config.transformer._expoRouterPath = _resolveFrom().default.silent(projectRoot, "expo-router");
    let tsconfig = null;
    if (isTsconfigPathsEnabled) {
        tsconfig = await (0, _loadTsConfigPaths.loadTsConfigPathsAsync)(projectRoot);
    }
    let expoConfigPlatforms = Object.entries(platformBundlers).filter(([platform, bundler])=>{
        var ref;
        return bundler === "metro" && ((ref = exp.platforms) == null ? void 0 : ref.includes(platform));
    }).map(([platform])=>platform);
    if (Array.isArray(config.resolver.platforms)) {
        expoConfigPlatforms = [
            ...new Set(expoConfigPlatforms.concat(config.resolver.platforms))
        ];
    }
    // @ts-expect-error: typed as `readonly`.
    config.resolver.platforms = expoConfigPlatforms;
    config = withWebPolyfills(config, {
        getMetroBundler
    });
    return withExtendedResolver(config, {
        tsconfig,
        isExporting,
        isTsconfigPathsEnabled,
        isFastResolverEnabled,
        isReactCanaryEnabled,
        getMetroBundler
    });
}
function isDirectoryIn(targetPath, rootPath) {
    return targetPath.startsWith(rootPath) && targetPath.length >= rootPath.length;
}

//# sourceMappingURL=withMetroMultiPlatform.js.map