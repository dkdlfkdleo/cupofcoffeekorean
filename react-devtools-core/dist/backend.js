(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactDevToolsBackend"] = factory();
	else
		root["ReactDevToolsBackend"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-debug-tools.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ErrorStackParser = __webpack_require__(206),
    React = __webpack_require__(189),
    assign = Object.assign,
    ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
    hasOwnProperty = Object.prototype.hasOwnProperty,
    hookLog = [],
    primitiveStackCache = null;

function getPrimitiveStackCache() {
  if (null === primitiveStackCache) {
    var cache = new Map();

    try {
      Dispatcher.useContext({
        _currentValue: null
      });
      Dispatcher.useState(null);
      Dispatcher.useReducer(function (s) {
        return s;
      }, null);
      Dispatcher.useRef(null);
      "function" === typeof Dispatcher.useCacheRefresh && Dispatcher.useCacheRefresh();
      Dispatcher.useLayoutEffect(function () {});
      Dispatcher.useInsertionEffect(function () {});
      Dispatcher.useEffect(function () {});
      Dispatcher.useImperativeHandle(void 0, function () {
        return null;
      });
      Dispatcher.useDebugValue(null);
      Dispatcher.useCallback(function () {});
      Dispatcher.useTransition();
      Dispatcher.useSyncExternalStore(function () {
        return function () {};
      }, function () {
        return null;
      }, function () {
        return null;
      });
      Dispatcher.useDeferredValue(null);
      Dispatcher.useMemo(function () {
        return null;
      });
      "function" === typeof Dispatcher.useMemoCache && Dispatcher.useMemoCache(0);
      "function" === typeof Dispatcher.useOptimistic && Dispatcher.useOptimistic(null, function (s) {
        return s;
      });
      "function" === typeof Dispatcher.useFormState && Dispatcher.useFormState(function (s) {
        return s;
      }, null);
      "function" === typeof Dispatcher.useActionState && Dispatcher.useActionState(function (s) {
        return s;
      }, null);

      if ("function" === typeof Dispatcher.use) {
        Dispatcher.use({
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: null
        });
        Dispatcher.use({
          then: function then() {},
          status: "fulfilled",
          value: null
        });

        try {
          Dispatcher.use({
            then: function then() {}
          });
        } catch (x) {}
      }

      Dispatcher.useId();
      "function" === typeof Dispatcher.useHostTransitionStatus && Dispatcher.useHostTransitionStatus();
    } finally {
      var readHookLog = hookLog;
      hookLog = [];
    }

    for (var i = 0; i < readHookLog.length; i++) {
      var hook = readHookLog[i];
      cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
    }

    primitiveStackCache = cache;
  }

  return primitiveStackCache;
}

var currentFiber = null,
    currentHook = null,
    currentContextDependency = null;

function nextHook() {
  var hook = currentHook;
  null !== hook && (currentHook = hook.next);
  return hook;
}

function readContext(context) {
  if (null === currentFiber) return context._currentValue;
  if (null === currentContextDependency) throw Error("Context reads do not line up with context dependencies. This is a bug in React Debug Tools.");
  hasOwnProperty.call(currentContextDependency, "memoizedValue") ? (context = currentContextDependency.memoizedValue, currentContextDependency = currentContextDependency.next) : context = context._currentValue;
  return context;
}

var SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"),
    Dispatcher = {
  use: function use(usable) {
    if (null !== usable && "object" === _typeof(usable)) {
      if ("function" === typeof usable.then) {
        switch (usable.status) {
          case "fulfilled":
            var fulfilledValue = usable.value;
            hookLog.push({
              displayName: null,
              primitive: "Promise",
              stackError: Error(),
              value: fulfilledValue,
              debugInfo: void 0 === usable._debugInfo ? null : usable._debugInfo,
              dispatcherHookName: "Use"
            });
            return fulfilledValue;

          case "rejected":
            throw usable.reason;
        }

        hookLog.push({
          displayName: null,
          primitive: "Unresolved",
          stackError: Error(),
          value: usable,
          debugInfo: void 0 === usable._debugInfo ? null : usable._debugInfo,
          dispatcherHookName: "Use"
        });
        throw SuspenseException;
      }

      if (usable.$$typeof === REACT_CONTEXT_TYPE) return fulfilledValue = readContext(usable), hookLog.push({
        displayName: usable.displayName || "Context",
        primitive: "Context (use)",
        stackError: Error(),
        value: fulfilledValue,
        debugInfo: null,
        dispatcherHookName: "Use"
      }), fulfilledValue;
    }

    throw Error("An unsupported type was passed to use(): " + String(usable));
  },
  readContext: readContext,
  useCacheRefresh: function useCacheRefresh() {
    var hook = nextHook();
    hookLog.push({
      displayName: null,
      primitive: "CacheRefresh",
      stackError: Error(),
      value: null !== hook ? hook.memoizedState : function () {},
      debugInfo: null,
      dispatcherHookName: "CacheRefresh"
    });
    return function () {};
  },
  useCallback: function useCallback(callback) {
    var hook = nextHook();
    hookLog.push({
      displayName: null,
      primitive: "Callback",
      stackError: Error(),
      value: null !== hook ? hook.memoizedState[0] : callback,
      debugInfo: null,
      dispatcherHookName: "Callback"
    });
    return callback;
  },
  useContext: function useContext(context) {
    var value = readContext(context);
    hookLog.push({
      displayName: context.displayName || null,
      primitive: "Context",
      stackError: Error(),
      value: value,
      debugInfo: null,
      dispatcherHookName: "Context"
    });
    return value;
  },
  useEffect: function useEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "Effect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "Effect"
    });
  },
  useImperativeHandle: function useImperativeHandle(ref) {
    nextHook();
    var instance = void 0;
    null !== ref && "object" === _typeof(ref) && (instance = ref.current);
    hookLog.push({
      displayName: null,
      primitive: "ImperativeHandle",
      stackError: Error(),
      value: instance,
      debugInfo: null,
      dispatcherHookName: "ImperativeHandle"
    });
  },
  useDebugValue: function useDebugValue(value, formatterFn) {
    hookLog.push({
      displayName: null,
      primitive: "DebugValue",
      stackError: Error(),
      value: "function" === typeof formatterFn ? formatterFn(value) : value,
      debugInfo: null,
      dispatcherHookName: "DebugValue"
    });
  },
  useLayoutEffect: function useLayoutEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "LayoutEffect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "LayoutEffect"
    });
  },
  useInsertionEffect: function useInsertionEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "InsertionEffect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "InsertionEffect"
    });
  },
  useMemo: function useMemo(nextCreate) {
    var hook = nextHook();
    nextCreate = null !== hook ? hook.memoizedState[0] : nextCreate();
    hookLog.push({
      displayName: null,
      primitive: "Memo",
      stackError: Error(),
      value: nextCreate,
      debugInfo: null,
      dispatcherHookName: "Memo"
    });
    return nextCreate;
  },
  useMemoCache: function useMemoCache(size) {
    var fiber = currentFiber;
    if (null == fiber) return [];
    var $jscomp$optchain$tmp1808946329$0;
    fiber = null == ($jscomp$optchain$tmp1808946329$0 = fiber.updateQueue) ? void 0 : $jscomp$optchain$tmp1808946329$0.memoCache;
    if (null == fiber) return [];
    $jscomp$optchain$tmp1808946329$0 = fiber.data[fiber.index];

    if (void 0 === $jscomp$optchain$tmp1808946329$0) {
      $jscomp$optchain$tmp1808946329$0 = fiber.data[fiber.index] = Array(size);

      for (var i = 0; i < size; i++) {
        $jscomp$optchain$tmp1808946329$0[i] = REACT_MEMO_CACHE_SENTINEL;
      }
    }

    fiber.index++;
    return $jscomp$optchain$tmp1808946329$0;
  },
  useOptimistic: function useOptimistic(passthrough) {
    var hook = nextHook();
    passthrough = null !== hook ? hook.memoizedState : passthrough;
    hookLog.push({
      displayName: null,
      primitive: "Optimistic",
      stackError: Error(),
      value: passthrough,
      debugInfo: null,
      dispatcherHookName: "Optimistic"
    });
    return [passthrough, function () {}];
  },
  useReducer: function useReducer(reducer, initialArg, init) {
    reducer = nextHook();
    initialArg = null !== reducer ? reducer.memoizedState : void 0 !== init ? init(initialArg) : initialArg;
    hookLog.push({
      displayName: null,
      primitive: "Reducer",
      stackError: Error(),
      value: initialArg,
      debugInfo: null,
      dispatcherHookName: "Reducer"
    });
    return [initialArg, function () {}];
  },
  useRef: function useRef(initialValue) {
    var hook = nextHook();
    initialValue = null !== hook ? hook.memoizedState : {
      current: initialValue
    };
    hookLog.push({
      displayName: null,
      primitive: "Ref",
      stackError: Error(),
      value: initialValue.current,
      debugInfo: null,
      dispatcherHookName: "Ref"
    });
    return initialValue;
  },
  useState: function useState(initialState) {
    var hook = nextHook();
    initialState = null !== hook ? hook.memoizedState : "function" === typeof initialState ? initialState() : initialState;
    hookLog.push({
      displayName: null,
      primitive: "State",
      stackError: Error(),
      value: initialState,
      debugInfo: null,
      dispatcherHookName: "State"
    });
    return [initialState, function () {}];
  },
  useTransition: function useTransition() {
    var stateHook = nextHook();
    nextHook();
    stateHook = null !== stateHook ? stateHook.memoizedState : !1;
    hookLog.push({
      displayName: null,
      primitive: "Transition",
      stackError: Error(),
      value: stateHook,
      debugInfo: null,
      dispatcherHookName: "Transition"
    });
    return [stateHook, function () {}];
  },
  useSyncExternalStore: function useSyncExternalStore(subscribe, getSnapshot) {
    nextHook();
    nextHook();
    subscribe = getSnapshot();
    hookLog.push({
      displayName: null,
      primitive: "SyncExternalStore",
      stackError: Error(),
      value: subscribe,
      debugInfo: null,
      dispatcherHookName: "SyncExternalStore"
    });
    return subscribe;
  },
  useDeferredValue: function useDeferredValue(value) {
    var hook = nextHook();
    value = null !== hook ? hook.memoizedState : value;
    hookLog.push({
      displayName: null,
      primitive: "DeferredValue",
      stackError: Error(),
      value: value,
      debugInfo: null,
      dispatcherHookName: "DeferredValue"
    });
    return value;
  },
  useId: function useId() {
    var hook = nextHook();
    hook = null !== hook ? hook.memoizedState : "";
    hookLog.push({
      displayName: null,
      primitive: "Id",
      stackError: Error(),
      value: hook,
      debugInfo: null,
      dispatcherHookName: "Id"
    });
    return hook;
  },
  useFormState: function useFormState(action, initialState) {
    var hook = nextHook();
    nextHook();
    nextHook();
    action = Error();
    var debugInfo = null,
        error = null;
    if (null !== hook) {
      if (initialState = hook.memoizedState, "object" === _typeof(initialState) && null !== initialState && "function" === typeof initialState.then) switch (initialState.status) {
        case "fulfilled":
          var value = initialState.value;
          debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo;
          break;

        case "rejected":
          error = initialState.reason;
          break;

        default:
          error = SuspenseException, debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo, value = initialState;
      } else value = initialState;
    } else value = initialState;
    hookLog.push({
      displayName: null,
      primitive: "FormState",
      stackError: action,
      value: value,
      debugInfo: debugInfo,
      dispatcherHookName: "FormState"
    });
    if (null !== error) throw error;
    return [value, function () {}, !1];
  },
  useActionState: function useActionState(action, initialState) {
    var hook = nextHook();
    nextHook();
    nextHook();
    action = Error();
    var debugInfo = null,
        error = null;
    if (null !== hook) {
      if (initialState = hook.memoizedState, "object" === _typeof(initialState) && null !== initialState && "function" === typeof initialState.then) switch (initialState.status) {
        case "fulfilled":
          var value = initialState.value;
          debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo;
          break;

        case "rejected":
          error = initialState.reason;
          break;

        default:
          error = SuspenseException, debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo, value = initialState;
      } else value = initialState;
    } else value = initialState;
    hookLog.push({
      displayName: null,
      primitive: "ActionState",
      stackError: action,
      value: value,
      debugInfo: debugInfo,
      dispatcherHookName: "ActionState"
    });
    if (null !== error) throw error;
    return [value, function () {}, !1];
  },
  useHostTransitionStatus: function useHostTransitionStatus() {
    var status = readContext({
      _currentValue: null
    });
    hookLog.push({
      displayName: null,
      primitive: "HostTransitionStatus",
      stackError: Error(),
      value: status,
      debugInfo: null,
      dispatcherHookName: "HostTransitionStatus"
    });
    return status;
  }
},
    DispatcherProxyHandler = {
  get: function get(target, prop) {
    if (target.hasOwnProperty(prop)) return target[prop];
    target = Error("Missing method in Dispatcher: " + prop);
    target.name = "ReactDebugToolsUnsupportedHookError";
    throw target;
  }
},
    DispatcherProxy = "undefined" === typeof Proxy ? Dispatcher : new Proxy(Dispatcher, DispatcherProxyHandler),
    mostLikelyAncestorIndex = 0;

function findSharedIndex(hookStack, rootStack, rootIndex) {
  var source = rootStack[rootIndex].source,
      i = 0;

  a: for (; i < hookStack.length; i++) {
    if (hookStack[i].source === source) {
      for (var a = rootIndex + 1, b = i + 1; a < rootStack.length && b < hookStack.length; a++, b++) {
        if (hookStack[b].source !== rootStack[a].source) continue a;
      }

      return i;
    }
  }

  return -1;
}

function isReactWrapper(functionName, wrapperName) {
  functionName = parseHookName(functionName);
  return "HostTransitionStatus" === wrapperName ? functionName === wrapperName || "FormStatus" === functionName : functionName === wrapperName;
}

function parseHookName(functionName) {
  if (!functionName) return "";
  var startIndex = functionName.lastIndexOf("[as ");
  if (-1 !== startIndex) return parseHookName(functionName.slice(startIndex + 4, -1));
  startIndex = functionName.lastIndexOf(".");
  startIndex = -1 === startIndex ? 0 : startIndex + 1;

  if ("use" === functionName.slice(startIndex, startIndex + 3)) {
    if (3 === functionName.length - startIndex) return "Use";
    startIndex += 3;
  }

  return functionName.slice(startIndex);
}

function buildTree(rootStack$jscomp$0, readHookLog) {
  for (var rootChildren = [], prevStack = null, levelChildren = rootChildren, nativeHookID = 0, stackOfChildren = [], i = 0; i < readHookLog.length; i++) {
    var hook = readHookLog[i];
    var rootStack = rootStack$jscomp$0;
    var JSCompiler_inline_result = ErrorStackParser.parse(hook.stackError);

    b: {
      var hookStack = JSCompiler_inline_result,
          rootIndex = findSharedIndex(hookStack, rootStack, mostLikelyAncestorIndex);
      if (-1 !== rootIndex) rootStack = rootIndex;else {
        for (var i$jscomp$0 = 0; i$jscomp$0 < rootStack.length && 5 > i$jscomp$0; i$jscomp$0++) {
          if (rootIndex = findSharedIndex(hookStack, rootStack, i$jscomp$0), -1 !== rootIndex) {
            mostLikelyAncestorIndex = i$jscomp$0;
            rootStack = rootIndex;
            break b;
          }
        }

        rootStack = -1;
      }
    }

    b: {
      hookStack = JSCompiler_inline_result;
      rootIndex = getPrimitiveStackCache().get(hook.primitive);
      if (void 0 !== rootIndex) for (i$jscomp$0 = 0; i$jscomp$0 < rootIndex.length && i$jscomp$0 < hookStack.length; i$jscomp$0++) {
        if (rootIndex[i$jscomp$0].source !== hookStack[i$jscomp$0].source) {
          i$jscomp$0 < hookStack.length - 1 && isReactWrapper(hookStack[i$jscomp$0].functionName, hook.dispatcherHookName) && i$jscomp$0++;
          i$jscomp$0 < hookStack.length - 1 && isReactWrapper(hookStack[i$jscomp$0].functionName, hook.dispatcherHookName) && i$jscomp$0++;
          hookStack = i$jscomp$0;
          break b;
        }
      }
      hookStack = -1;
    }

    JSCompiler_inline_result = -1 === rootStack || -1 === hookStack || 2 > rootStack - hookStack ? -1 === hookStack ? [null, null] : [JSCompiler_inline_result[hookStack - 1], null] : [JSCompiler_inline_result[hookStack - 1], JSCompiler_inline_result.slice(hookStack, rootStack - 1)];
    hookStack = JSCompiler_inline_result[0];
    JSCompiler_inline_result = JSCompiler_inline_result[1];
    rootStack = hook.displayName;
    null === rootStack && null !== hookStack && (rootStack = parseHookName(hookStack.functionName) || parseHookName(hook.dispatcherHookName));

    if (null !== JSCompiler_inline_result) {
      hookStack = 0;

      if (null !== prevStack) {
        for (; hookStack < JSCompiler_inline_result.length && hookStack < prevStack.length && JSCompiler_inline_result[JSCompiler_inline_result.length - hookStack - 1].source === prevStack[prevStack.length - hookStack - 1].source;) {
          hookStack++;
        }

        for (prevStack = prevStack.length - 1; prevStack > hookStack; prevStack--) {
          levelChildren = stackOfChildren.pop();
        }
      }

      for (prevStack = JSCompiler_inline_result.length - hookStack - 1; 1 <= prevStack; prevStack--) {
        hookStack = [], rootIndex = JSCompiler_inline_result[prevStack], rootIndex = {
          id: null,
          isStateEditable: !1,
          name: parseHookName(JSCompiler_inline_result[prevStack - 1].functionName),
          value: void 0,
          subHooks: hookStack,
          debugInfo: null,
          hookSource: {
            lineNumber: rootIndex.lineNumber,
            columnNumber: rootIndex.columnNumber,
            functionName: rootIndex.functionName,
            fileName: rootIndex.fileName
          }
        }, levelChildren.push(rootIndex), stackOfChildren.push(levelChildren), levelChildren = hookStack;
      }

      prevStack = JSCompiler_inline_result;
    }

    hookStack = hook.primitive;
    rootIndex = hook.debugInfo;
    hook = {
      id: "Context" === hookStack || "Context (use)" === hookStack || "DebugValue" === hookStack || "Promise" === hookStack || "Unresolved" === hookStack || "HostTransitionStatus" === hookStack ? null : nativeHookID++,
      isStateEditable: "Reducer" === hookStack || "State" === hookStack,
      name: rootStack || hookStack,
      value: hook.value,
      subHooks: [],
      debugInfo: rootIndex,
      hookSource: null
    };
    rootStack = {
      lineNumber: null,
      functionName: null,
      fileName: null,
      columnNumber: null
    };
    JSCompiler_inline_result && 1 <= JSCompiler_inline_result.length && (JSCompiler_inline_result = JSCompiler_inline_result[0], rootStack.lineNumber = JSCompiler_inline_result.lineNumber, rootStack.functionName = JSCompiler_inline_result.functionName, rootStack.fileName = JSCompiler_inline_result.fileName, rootStack.columnNumber = JSCompiler_inline_result.columnNumber);
    hook.hookSource = rootStack;
    levelChildren.push(hook);
  }

  processDebugValues(rootChildren, null);
  return rootChildren;
}

function processDebugValues(hooksTree, parentHooksNode) {
  for (var debugValueHooksNodes = [], i = 0; i < hooksTree.length; i++) {
    var hooksNode = hooksTree[i];
    "DebugValue" === hooksNode.name && 0 === hooksNode.subHooks.length ? (hooksTree.splice(i, 1), i--, debugValueHooksNodes.push(hooksNode)) : processDebugValues(hooksNode.subHooks, hooksNode);
  }

  null !== parentHooksNode && (1 === debugValueHooksNodes.length ? parentHooksNode.value = debugValueHooksNodes[0].value : 1 < debugValueHooksNodes.length && (parentHooksNode.value = debugValueHooksNodes.map(function (_ref) {
    return _ref.value;
  })));
}

function handleRenderFunctionError(error) {
  if (error !== SuspenseException) {
    if (error instanceof Error && "ReactDebugToolsUnsupportedHookError" === error.name) throw error;
    var wrapperError = Error("Error rendering inspected component", {
      cause: error
    });
    wrapperError.name = "ReactDebugToolsRenderError";
    wrapperError.cause = error;
    throw wrapperError;
  }
}

function inspectHooks(renderFunction, props, currentDispatcher) {
  null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
  var previousDispatcher = currentDispatcher.H;
  currentDispatcher.H = DispatcherProxy;

  try {
    var ancestorStackError = Error();
    renderFunction(props);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    renderFunction = hookLog, hookLog = [], currentDispatcher.H = previousDispatcher;
  }

  currentDispatcher = ErrorStackParser.parse(ancestorStackError);
  return buildTree(currentDispatcher, renderFunction);
}

function restoreContexts(contextMap) {
  contextMap.forEach(function (value, context) {
    return context._currentValue = value;
  });
}

__webpack_unused_export__ = inspectHooks;

exports.inspectHooksOfFiber = function (fiber, currentDispatcher) {
  null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
  if (0 !== fiber.tag && 15 !== fiber.tag && 11 !== fiber.tag) throw Error("Unknown Fiber. Needs to be a function component to inspect hooks.");
  getPrimitiveStackCache();
  currentHook = fiber.memoizedState;
  currentFiber = fiber;

  if (hasOwnProperty.call(currentFiber, "dependencies")) {
    var dependencies = currentFiber.dependencies;
    currentContextDependency = null !== dependencies ? dependencies.firstContext : null;
  } else if (hasOwnProperty.call(currentFiber, "dependencies_old")) dependencies = currentFiber.dependencies_old, currentContextDependency = null !== dependencies ? dependencies.firstContext : null;else if (hasOwnProperty.call(currentFiber, "dependencies_new")) dependencies = currentFiber.dependencies_new, currentContextDependency = null !== dependencies ? dependencies.firstContext : null;else if (hasOwnProperty.call(currentFiber, "contextDependencies")) dependencies = currentFiber.contextDependencies, currentContextDependency = null !== dependencies ? dependencies.first : null;else throw Error("Unsupported React version. This is a bug in React Debug Tools.");

  dependencies = fiber.type;
  var props = fiber.memoizedProps;

  if (dependencies !== fiber.elementType && dependencies && dependencies.defaultProps) {
    props = assign({}, props);
    var defaultProps = dependencies.defaultProps;

    for (propName in defaultProps) {
      void 0 === props[propName] && (props[propName] = defaultProps[propName]);
    }
  }

  var propName = new Map();

  try {
    if (null !== currentContextDependency && !hasOwnProperty.call(currentContextDependency, "memoizedValue")) for (defaultProps = fiber; defaultProps;) {
      if (10 === defaultProps.tag) {
        var context = defaultProps.type;
        void 0 !== context._context && (context = context._context);
        propName.has(context) || (propName.set(context, context._currentValue), context._currentValue = defaultProps.memoizedProps.value);
      }

      defaultProps = defaultProps.return;
    }

    if (11 === fiber.tag) {
      var renderFunction = dependencies.render;
      context = props;
      var ref = fiber.ref;
      fiber = currentDispatcher;
      var previousDispatcher = fiber.H;
      fiber.H = DispatcherProxy;

      try {
        var ancestorStackError = Error();
        renderFunction(context, ref);
      } catch (error) {
        handleRenderFunctionError(error);
      } finally {
        var readHookLog = hookLog;
        hookLog = [];
        fiber.H = previousDispatcher;
      }

      var rootStack = ErrorStackParser.parse(ancestorStackError);
      return buildTree(rootStack, readHookLog);
    }

    return inspectHooks(dependencies, props, currentDispatcher);
  } finally {
    currentContextDependency = currentHook = currentFiber = null, restoreContexts(propName);
  }
};

/***/ }),

/***/ 987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(786);
} else {}

/***/ }),

/***/ 890:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
    REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
    REACT_PROFILER_TYPE = Symbol.for("react.profiler");
Symbol.for("react.provider");
var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
    REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
    REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
    REACT_MEMO_TYPE = Symbol.for("react.memo"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
    REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");

function typeOf(object) {
  if ("object" === _typeof(object) && null !== object) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (object = object.type, object) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return object;

          default:
            switch (object = object && object.$$typeof, object) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
                return object;

              case REACT_CONSUMER_TYPE:
                return object;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}

exports.AI = REACT_CONSUMER_TYPE;
exports.HQ = REACT_CONTEXT_TYPE;
__webpack_unused_export__ = REACT_ELEMENT_TYPE;
exports.A4 = REACT_FORWARD_REF_TYPE;
exports.HY = REACT_FRAGMENT_TYPE;
exports.oM = REACT_LAZY_TYPE;
exports._Y = REACT_MEMO_TYPE;
exports.h_ = REACT_PORTAL_TYPE;
exports.Q1 = REACT_PROFILER_TYPE;
exports.nF = REACT_STRICT_MODE_TYPE;
exports.n4 = REACT_SUSPENSE_TYPE;
__webpack_unused_export__ = REACT_SUSPENSE_LIST_TYPE;

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_CONSUMER_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
};

exports.kK = function (object) {
  return "object" === _typeof(object) && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_LAZY_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_MEMO_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
};

__webpack_unused_export__ = function (object) {
  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
};

__webpack_unused_export__ = function (type) {
  return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === _typeof(type) && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId) ? !0 : !1;
};

exports.kM = typeOf;

/***/ }),

/***/ 126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(169);
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
    REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
    REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
    REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
    REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
    REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
    REACT_MEMO_TYPE = Symbol.for("react.memo"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"),
    REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
    REACT_POSTPONE_TYPE = Symbol.for("react.postpone"),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator;

function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== _typeof(maybeIterable)) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}

var ReactNoopUpdateQueue = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    assign = Object.assign,
    emptyObject = {};

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function (partialState, callback) {
  if ("object" !== _typeof(partialState) && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var isArrayImpl = Array.isArray,
    ReactSharedInternals = {
  H: null,
  A: null,
  T: null,
  S: null
},
    hasOwnProperty = Object.prototype.hasOwnProperty;

function ReactElement(type, key, _ref, self, source, owner, props) {
  _ref = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== _ref ? _ref : null,
    props: props
  };
}

function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, null, void 0, void 0, void 0, oldElement.props);
}

function isValidElement(object) {
  return "object" === _typeof(object) && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
}

function escape(key) {
  var escaperLookup = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + key.replace(/[=:]/g, function (match) {
    return escaperLookup[match];
  });
}

var userProvidedKeyEscapeRegex = /\/+/g;

function getElementKey(element, index) {
  return "object" === _typeof(element) && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
}

function noop$1() {}

function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;

    case "rejected":
      throw thenable.reason;

    default:
      switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
        "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
      }, function (error) {
        "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
      })), thenable.status) {
        case "fulfilled":
          return thenable.value;

        case "rejected":
          throw thenable.reason;
      }

  }

  throw thenable;
}

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = _typeof(children);

  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;else switch (type) {
    case "bigint":
    case "string":
    case "number":
      invokeCallback = !0;
      break;

    case "object":
      switch (children.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          invokeCallback = !0;
          break;

        case REACT_LAZY_TYPE:
          return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
      }

  }
  if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
    return c;
  })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) {
    nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
  } else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) {
    nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
  } else if ("object" === type) {
    if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
    array = String(children);
    throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
  }
  return invokeCallback;
}

function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
      count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}

function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(function (moduleObject) {
      if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
    }, function (error) {
      if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
    });
    -1 === payload._status && (payload._status = 0, payload._result = ctor);
  }

  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}

function useOptimistic(passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
}

var reportGlobalError = "function" === typeof reportError ? reportError : function (error) {
  if ("object" === (typeof window === "undefined" ? "undefined" : _typeof(window)) && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: "object" === _typeof(error) && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error: error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === (typeof process === "undefined" ? "undefined" : _typeof(process)) && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }

  console.error(error);
};

function noop() {}

exports.Children = {
  map: mapChildren,
  forEach: function forEach(children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments);
    }, forEachContext);
  },
  count: function count(children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function toArray(children) {
    return mapChildren(children, function (child) {
      return child;
    }) || [];
  },
  only: function only(children) {
    if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
    return children;
  }
};
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;

exports.act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};

exports.cache = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};

exports.captureOwnerStack = function () {
  return null;
};

exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
  var props = assign({}, element.props),
      key = element.key,
      owner = void 0;
  if (null != config) for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config) {
    !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
  }
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }
  return ReactElement(element.type, key, null, void 0, void 0, owner, props);
};

exports.createContext = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};

exports.createElement = function (type, config, children) {
  var propName,
      props = {},
      key = null;
  if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) {
    hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
  }
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }
  if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) {
    void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  }
  return ReactElement(type, key, null, void 0, void 0, null, props);
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.experimental_useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};

exports.experimental_useOptimistic = function (passthrough, reducer) {
  return useOptimistic(passthrough, reducer);
};

exports.forwardRef = function (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
};

exports.isValidElement = isValidElement;

exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  };
};

exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};

exports.startTransition = function (scope) {
  var prevTransition = ReactSharedInternals.T,
      transition = {};
  ReactSharedInternals.T = transition;

  try {
    var returnValue = scope(),
        onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(transition, returnValue);
    "object" === _typeof(returnValue) && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    ReactSharedInternals.T = prevTransition;
  }
};

exports.unstable_Activity = REACT_OFFSCREEN_TYPE;
exports.unstable_DebugTracingMode = REACT_DEBUG_TRACING_MODE_TYPE;
exports.unstable_SuspenseList = REACT_SUSPENSE_LIST_TYPE;

exports.unstable_getCacheForType = function (resourceType) {
  var dispatcher = ReactSharedInternals.A;
  return dispatcher ? dispatcher.getCacheForType(resourceType) : resourceType();
};

exports.unstable_postpone = function (reason) {
  reason = Error(reason);
  reason.$$typeof = REACT_POSTPONE_TYPE;
  throw reason;
};

exports.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};

exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};

exports.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};

exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};

exports.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};

exports.useDebugValue = function () {};

exports.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};

exports.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};

exports.useId = function () {
  return ReactSharedInternals.H.useId();
};

exports.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};

exports.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};

exports.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};

exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};

exports.useOptimistic = useOptimistic;

exports.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};

exports.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};

exports.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};

exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
  return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

exports.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};

exports.version = "19.0.0-experimental-c82bcbeb2b-20241009";

/***/ }),

/***/ 189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(126);
} else {}

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  'use strict'; // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(430)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function ErrorStackParser(StackFrame) {
  'use strict';

  var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
  var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
  var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
  return {
    /**
     * Given an Error object, extract the most information from it.
     *
     * @param {Error} error object
     * @return {Array} of StackFrames
     */
    parse: function ErrorStackParser$$parse(error) {
      if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
        return this.parseOpera(error);
      } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
        return this.parseV8OrIE(error);
      } else if (error.stack) {
        return this.parseFFOrSafari(error);
      } else {
        throw new Error('Cannot parse given Error object');
      }
    },
    // Separate line and column numbers from a string of the form: (URI:Line:Column)
    extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
      // Fail-fast but return locations like "(native)"
      if (urlLike.indexOf(':') === -1) {
        return [urlLike];
      }

      var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
      var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
      return [parts[1], parts[2] || undefined, parts[3] || undefined];
    },
    parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(CHROME_IE_STACK_REGEXP);
      }, this);
      return filtered.map(function (line) {
        if (line.indexOf('(eval ') > -1) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
        }

        var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '('); // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
        // case it has spaces in it, as the string is split on \s+ later on

        var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/); // remove the parenthesized location from the line, if it was matched

        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
        var tokens = sanitizedLine.split(/\s+/).slice(1); // if a location was matched, pass it to extractLocation() otherwise pop the last token

        var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
        var functionName = tokens.join(' ') || undefined;
        var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
        return new StackFrame({
          functionName: functionName,
          fileName: fileName,
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    },
    parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !line.match(SAFARI_NATIVE_CODE_REGEXP);
      }, this);
      return filtered.map(function (line) {
        // Throw away eval information until we implement stacktrace.js/stackframe#8
        if (line.indexOf(' > eval') > -1) {
          line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
        }

        if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
          // Safari eval frames only have function names and nothing else
          return new StackFrame({
            functionName: line
          });
        } else {
          var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
          var matches = line.match(functionNameRegex);
          var functionName = matches && matches[1] ? matches[1] : undefined;
          var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
          return new StackFrame({
            functionName: functionName,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }
      }, this);
    },
    parseOpera: function ErrorStackParser$$parseOpera(e) {
      if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
        return this.parseOpera9(e);
      } else if (!e.stack) {
        return this.parseOpera10(e);
      } else {
        return this.parseOpera11(e);
      }
    },
    parseOpera9: function ErrorStackParser$$parseOpera9(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
      var lines = e.message.split('\n');
      var result = [];

      for (var i = 2, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    parseOpera10: function ErrorStackParser$$parseOpera10(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
      var lines = e.stacktrace.split('\n');
      var result = [];

      for (var i = 0, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            functionName: match[3] || undefined,
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    // Opera 10.65+ Error.stack very similar to FF/Safari
    parseOpera11: function ErrorStackParser$$parseOpera11(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
      }, this);
      return filtered.map(function (line) {
        var tokens = line.split('@');
        var locationParts = this.extractLocation(tokens.pop());
        var functionCall = tokens.shift() || '';
        var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') || undefined;
        var argsRaw;

        if (functionCall.match(/\(([^)]*)\)/)) {
          argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
        }

        var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
        return new StackFrame({
          functionName: functionName,
          args: args,
          fileName: locationParts[0],
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    }
  };
});

/***/ }),

/***/ 172:
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Used for built-in method references. */

var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */

var now = function now() {
  return root.Date.now();
};
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */


function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */


function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = _typeof(value);

  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */


function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = throttle;

/***/ }),

/***/ 730:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(169);


module.exports = LRUCache; // This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.

var Map = __webpack_require__(307);

var util = __webpack_require__(82); // A linked list to keep track of recently-used-ness


var Yallist = __webpack_require__(695); // use symbols if possible, otherwise just _props


var hasSymbol = typeof Symbol === 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1';
var makeSymbol;

if (hasSymbol) {
  makeSymbol = function makeSymbol(key) {
    return Symbol(key);
  };
} else {
  makeSymbol = function makeSymbol(key) {
    return '_' + key;
  };
}

var MAX = makeSymbol('max');
var LENGTH = makeSymbol('length');
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator');
var ALLOW_STALE = makeSymbol('allowStale');
var MAX_AGE = makeSymbol('maxAge');
var DISPOSE = makeSymbol('dispose');
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet');
var LRU_LIST = makeSymbol('lruList');
var CACHE = makeSymbol('cache');

function naiveLength() {
  return 1;
} // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


function LRUCache(options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options);
  }

  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (!options) {
    options = {};
  }

  var max = this[MAX] = options.max; // Kind of weird to have a default max of Infinity, but oh well.

  if (!max || !(typeof max === 'number') || max <= 0) {
    this[MAX] = Infinity;
  }

  var lc = options.length || naiveLength;

  if (typeof lc !== 'function') {
    lc = naiveLength;
  }

  this[LENGTH_CALCULATOR] = lc;
  this[ALLOW_STALE] = options.stale || false;
  this[MAX_AGE] = options.maxAge || 0;
  this[DISPOSE] = options.dispose;
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
  this.reset();
} // resize the cache when the max changes.


Object.defineProperty(LRUCache.prototype, 'max', {
  set: function set(mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity;
    }

    this[MAX] = mL;
    trim(this);
  },
  get: function get() {
    return this[MAX];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function set(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  },
  get: function get() {
    return this[ALLOW_STALE];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function set(mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0;
    }

    this[MAX_AGE] = mA;
    trim(this);
  },
  get: function get() {
    return this[MAX_AGE];
  },
  enumerable: true
}); // resize the cache when the lengthCalculator changes.

Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function set(lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength;
    }

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      }, this);
    }

    trim(this);
  },
  get: function get() {
    return this[LENGTH_CALCULATOR];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'length', {
  get: function get() {
    return this[LENGTH];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function get() {
    return this[LRU_LIST].length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);

    if (!self[ALLOW_STALE]) {
      hit = undefined;
    }
  }

  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key;
  }, this);
};

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value;
  }, this);
};

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value);
    }, this);
  }

  this[CACHE] = new Map(); // hash of items by key

  this[LRU_LIST] = new Yallist(); // list of items in order of use recency

  this[LENGTH] = 0; // length of items in the list
};

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }
  }, this).toArray().filter(function (h) {
    return h;
  });
};

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST];
};
/* istanbul ignore next */


LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {';
  var extras = false;
  var as = this[ALLOW_STALE];

  if (as) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = this[MAX];

  if (max && max !== Infinity) {
    if (extras) {
      str += ',';
    }

    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = this[MAX_AGE];

  if (maxAge) {
    if (extras) {
      str += ',';
    }

    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = this[LENGTH_CALCULATOR];

  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ',';
    }

    str += '\n  length: ' + util.inspect(this[LENGTH], opts);
    extras = true;
  }

  var didFirst = false;
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  ';
    } else {
      if (extras) {
        str += ',\n';
      }

      didFirst = true;
      str += '\n  ';
    }

    var key = util.inspect(item.key).split('\n').join('\n  ');
    var val = {
      value: item.value
    };

    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge;
    }

    if (lc !== naiveLength) {
      val.length = item.length;
    }

    if (isStale(this, item)) {
      val.stale = true;
    }

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  if (didFirst || extras) {
    str += '\n';
  }

  str += '}';
  return str;
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE];
  var now = maxAge ? Date.now() : 0;
  var len = this[LENGTH_CALCULATOR](value, key);

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key));
      return false;
    }

    var node = this[CACHE].get(key);
    var item = node.value; // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking

    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value);
      }
    }

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this[LENGTH] += len - item.length;
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value);
    }

    return false;
  }

  this[LENGTH] += hit.length;
  this[LRU_LIST].unshift(hit);
  this[CACHE].set(key, this[LRU_LIST].head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false;
  var hit = this[CACHE].get(key).value;

  if (isStale(this, hit)) {
    return false;
  }

  return true;
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key));
};

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset();
  var now = Date.now(); // A previous serialized cache has the most recent items first

  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;

    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now; // dont add already expired items

      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  this[CACHE].forEach(function (value, key) {
    get(self, key, false);
  });
};

function get(self, key, doUse) {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) hit = undefined;
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node);
      }
    }

    if (hit) hit = hit.value;
  }

  return hit;
}

function isStale(self, hit) {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) {
    return false;
  }

  var stale = false;
  var diff = Date.now() - hit.now;

  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = self[MAX_AGE] && diff > self[MAX_AGE];
  }

  return stale;
}

function trim(self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
}

function del(self, node) {
  if (node) {
    var hit = node.value;

    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value);
    }

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
} // classy, since V8 prefers predictable objects.


function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}

/***/ }),

/***/ 169:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ 307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);
if (process.env.npm_package_name === 'pseudomap' && process.env.npm_lifecycle_script === 'test') process.env.TEST_PSEUDOMAP = 'true';

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map;
} else {
  module.exports = __webpack_require__(761);
}

/***/ }),

/***/ 761:
/***/ ((module) => {

var hasOwnProperty = Object.prototype.hasOwnProperty;
module.exports = PseudoMap;

function PseudoMap(set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'");
  this.clear();

  if (set) {
    if (set instanceof PseudoMap || typeof Map === 'function' && set instanceof Map) set.forEach(function (value, key) {
      this.set(key, value);
    }, this);else if (Array.isArray(set)) set.forEach(function (kv) {
      this.set(kv[0], kv[1]);
    }, this);else throw new TypeError('invalid argument');
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size') fn.call(thisp, this._data[k].value, this._data[k].key);
  }, this);
};

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k);
};

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k);
  return res && res.value;
};

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v);
};

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k);

  if (res) {
    delete this._data[res._index];
    this._data.size--;
  }
};

PseudoMap.prototype.clear = function () {
  var data = Object.create(null);
  data.size = 0;
  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  });
};

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function get() {
    return this._data.size;
  },
  set: function set(n) {},
  enumerable: true,
  configurable: true
});

PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version');
}; // Either identical, or both NaN


function same(a, b) {
  return a === b || a !== a && b !== b;
}

function Entry(k, v, i) {
  this.key = k;
  this.value = v;
  this._index = i;
}

function find(data, k) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) return data[key];
  }
}

function set(data, k, v) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v;
      return;
    }
  }

  data.size++;
  data[key] = new Entry(k, v, key);
}

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  'use strict'; // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  'use strict';

  function _isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  function _getter(p) {
    return function () {
      return this[p];
    };
  }

  var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
  var numericProps = ['columnNumber', 'lineNumber'];
  var stringProps = ['fileName', 'functionName', 'source'];
  var arrayProps = ['args'];
  var props = booleanProps.concat(numericProps, stringProps, arrayProps);

  function StackFrame(obj) {
    if (!obj) return;

    for (var i = 0; i < props.length; i++) {
      if (obj[props[i]] !== undefined) {
        this['set' + _capitalize(props[i])](obj[props[i]]);
      }
    }
  }

  StackFrame.prototype = {
    getArgs: function getArgs() {
      return this.args;
    },
    setArgs: function setArgs(v) {
      if (Object.prototype.toString.call(v) !== '[object Array]') {
        throw new TypeError('Args must be an Array');
      }

      this.args = v;
    },
    getEvalOrigin: function getEvalOrigin() {
      return this.evalOrigin;
    },
    setEvalOrigin: function setEvalOrigin(v) {
      if (v instanceof StackFrame) {
        this.evalOrigin = v;
      } else if (v instanceof Object) {
        this.evalOrigin = new StackFrame(v);
      } else {
        throw new TypeError('Eval Origin must be an Object or StackFrame');
      }
    },
    toString: function toString() {
      var fileName = this.getFileName() || '';
      var lineNumber = this.getLineNumber() || '';
      var columnNumber = this.getColumnNumber() || '';
      var functionName = this.getFunctionName() || '';

      if (this.getIsEval()) {
        if (fileName) {
          return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
        }

        return '[eval]:' + lineNumber + ':' + columnNumber;
      }

      if (functionName) {
        return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
      }

      return fileName + ':' + lineNumber + ':' + columnNumber;
    }
  };

  StackFrame.fromString = function StackFrame$$fromString(str) {
    var argsStartIndex = str.indexOf('(');
    var argsEndIndex = str.lastIndexOf(')');
    var functionName = str.substring(0, argsStartIndex);
    var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
    var locationString = str.substring(argsEndIndex + 1);

    if (locationString.indexOf('@') === 0) {
      var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
      var fileName = parts[1];
      var lineNumber = parts[2];
      var columnNumber = parts[3];
    }

    return new StackFrame({
      functionName: functionName,
      args: args || undefined,
      fileName: fileName,
      lineNumber: lineNumber || undefined,
      columnNumber: columnNumber || undefined
    });
  };

  for (var i = 0; i < booleanProps.length; i++) {
    StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);

    StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
      return function (v) {
        this[p] = Boolean(v);
      };
    }(booleanProps[i]);
  }

  for (var j = 0; j < numericProps.length; j++) {
    StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);

    StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
      return function (v) {
        if (!_isNumber(v)) {
          throw new TypeError(p + ' must be a Number');
        }

        this[p] = Number(v);
      };
    }(numericProps[j]);
  }

  for (var k = 0; k < stringProps.length; k++) {
    StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);

    StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
      return function (v) {
        this[p] = String(v);
      };
    }(stringProps[k]);
  }

  return StackFrame;
});

/***/ }),

/***/ 718:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),

/***/ 715:
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function isBuffer(arg) {
  return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

/***/ }),

/***/ 82:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return _typeof(arg) === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = __webpack_require__(715);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = __webpack_require__(718);

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ 695:
/***/ ((module) => {

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;

  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "connectToDevTools": () => (/* binding */ connectToDevTools),
  "connectWithCustomMessagingProtocol": () => (/* binding */ connectWithCustomMessagingProtocol)
});

;// CONCATENATED MODULE: ../react-devtools-shared/src/events.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    _defineProperty(this, "listenersMap", new Map());
  }

  _createClass(EventEmitter, [{
    key: "addListener",
    value: function addListener(event, listener) {
      var listeners = this.listenersMap.get(event);

      if (listeners === undefined) {
        this.listenersMap.set(event, [listener]);
      } else {
        var index = listeners.indexOf(listener);

        if (index < 0) {
          listeners.push(listener);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var listeners = this.listenersMap.get(event);

      if (listeners !== undefined) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (listeners.length === 1) {
          // No need to clone or try/catch
          var listener = listeners[0];
          listener.apply(null, args);
        } else {
          var didThrow = false;
          var caughtError = null;
          var clonedListeners = Array.from(listeners);

          for (var i = 0; i < clonedListeners.length; i++) {
            var _listener = clonedListeners[i];

            try {
              _listener.apply(null, args);
            } catch (error) {
              if (caughtError === null) {
                didThrow = true;
                caughtError = error;
              }
            }
          }

          if (didThrow) {
            throw caughtError;
          }
        }
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this.listenersMap.clear();
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      var listeners = this.listenersMap.get(event);

      if (listeners !== undefined) {
        var index = listeners.indexOf(listener);

        if (index >= 0) {
          listeners.splice(index, 1);
        }
      }
    }
  }]);

  return EventEmitter;
}();


// EXTERNAL MODULE: ../../node_modules/lodash.throttle/index.js
var lodash_throttle = __webpack_require__(172);
var lodash_throttle_default = /*#__PURE__*/__webpack_require__.n(lodash_throttle);
;// CONCATENATED MODULE: ../react-devtools-shared/src/constants.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var CHROME_WEBSTORE_EXTENSION_ID = 'fmkadmapgofadopljbjfkapdkoienihi';
var INTERNAL_EXTENSION_ID = 'dnjnjgbfilfphmojnmhliehogmojhclc';
var LOCAL_EXTENSION_ID = 'ikiahnapldjmdmpkmfhjdjilojjhgcbf'; // Flip this flag to true to enable verbose console debug logging.

var __DEBUG__ = false; // Flip this flag to true to enable performance.mark() and performance.measure() timings.

var __PERFORMANCE_PROFILE__ = false;
var TREE_OPERATION_ADD = 1;
var TREE_OPERATION_REMOVE = 2;
var TREE_OPERATION_REORDER_CHILDREN = 3;
var TREE_OPERATION_UPDATE_TREE_BASE_DURATION = 4;
var TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS = 5;
var TREE_OPERATION_REMOVE_ROOT = 6;
var TREE_OPERATION_SET_SUBTREE_MODE = 7;
var PROFILING_FLAG_BASIC_SUPPORT = 1;
var PROFILING_FLAG_TIMELINE_SUPPORT = 2;
var LOCAL_STORAGE_DEFAULT_TAB_KEY = 'React::DevTools::defaultTab';
var constants_LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY = 'React::DevTools::componentFilters';
var SESSION_STORAGE_LAST_SELECTION_KEY = 'React::DevTools::lastSelection';
var constants_LOCAL_STORAGE_OPEN_IN_EDITOR_URL = 'React::DevTools::openInEditorUrl';
var LOCAL_STORAGE_OPEN_IN_EDITOR_URL_PRESET = 'React::DevTools::openInEditorUrlPreset';
var LOCAL_STORAGE_PARSE_HOOK_NAMES_KEY = 'React::DevTools::parseHookNames';
var SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY = 'React::DevTools::recordChangeDescriptions';
var SESSION_STORAGE_RELOAD_AND_PROFILE_KEY = 'React::DevTools::reloadAndProfile';
var constants_LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS = 'React::DevTools::breakOnConsoleErrors';
var LOCAL_STORAGE_BROWSER_THEME = 'React::DevTools::theme';
var constants_LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY = 'React::DevTools::appendComponentStack';
var constants_LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY = 'React::DevTools::showInlineWarningsAndErrors';
var LOCAL_STORAGE_TRACE_UPDATES_ENABLED_KEY = 'React::DevTools::traceUpdatesEnabled';
var constants_LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE = 'React::DevTools::hideConsoleLogsInStrictMode';
var LOCAL_STORAGE_SUPPORTS_PROFILING_KEY = 'React::DevTools::supportsProfiling';
var PROFILER_EXPORT_VERSION = 5;
var FIREFOX_CONSOLE_DIMMING_COLOR = 'color: rgba(124, 124, 124, 0.75)';
var ANSI_STYLE_DIMMING_TEMPLATE = '\x1b[2;38;2;124;124;124m%s\x1b[0m';
var ANSI_STYLE_DIMMING_TEMPLATE_WITH_COMPONENT_STACK = '\x1b[2;38;2;124;124;124m%s %o\x1b[0m';
;// CONCATENATED MODULE: ../react-devtools-shared/src/storage.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function storage_localStorageGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}
function localStorageRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
}
function storage_localStorageSetItem(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {}
}
function sessionStorageGetItem(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}
function sessionStorageRemoveItem(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {}
}
function sessionStorageSetItem(key, value) {
  try {
    return sessionStorage.setItem(key, value);
  } catch (error) {}
}
;// CONCATENATED MODULE: ../../node_modules/memoize-one/esm/index.js
var simpleIsEqual = function simpleIsEqual(a, b) {
  return a === b;
};

/* harmony default export */ function esm(resultFn) {
  var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleIsEqual;
  var lastThis = void 0;
  var lastArgs = [];
  var lastResult = void 0;
  var calledOnce = false;

  var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
    return isEqual(newArg, lastArgs[index]);
  };

  var result = function result() {
    for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }

    if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
      return lastResult;
    }

    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    lastResult = resultFn.apply(this, newArgs);
    return lastResult;
  };

  return result;
}
;// CONCATENATED MODULE: ../../node_modules/compare-versions/lib/esm/index.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
var compareVersions = function compareVersions(v1, v2) {
  // validate input and split into segments
  var n1 = validateAndParse(v1);
  var n2 = validateAndParse(v2); // pop off the patch

  var p1 = n1.pop();
  var p2 = n2.pop(); // validate numbers

  var r = compareSegments(n1, n2);
  if (r !== 0) return r; // validate pre-release

  if (p1 && p2) {
    return compareSegments(p1.split('.'), p2.split('.'));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }

  return 0;
};
/**
 * Validate [semver](https://semver.org/) version strings.
 *
 * @param version Version number to validate
 * @returns `true` if the version number is a valid semver version number, `false` otherwise.
 *
 * @example
 * ```
 * validate('1.0.0-rc.1'); // return true
 * validate('1.0-rc.1'); // return false
 * validate('foo'); // return false
 * ```
 */

var validate = function validate(version) {
  return typeof version === 'string' && /^[v\d]/.test(version) && semver.test(version);
};
/**
 * Compare [semver](https://semver.org/) version strings using the specified operator.
 *
 * @param v1 First version to compare
 * @param v2 Second version to compare
 * @param operator Allowed arithmetic operator to use
 * @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
 *
 * @example
 * ```
 * compare('10.1.8', '10.0.4', '>'); // return true
 * compare('10.0.1', '10.0.1', '='); // return true
 * compare('10.1.1', '10.2.2', '<'); // return true
 * compare('10.1.1', '10.2.2', '<='); // return true
 * compare('10.1.1', '10.2.2', '>='); // return false
 * ```
 */

var compare = function compare(v1, v2, operator) {
  // validate input operator
  assertValidOperator(operator); // since result of compareVersions can only be -1 or 0 or 1
  // a simple map can be used to replace switch

  var res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
/**
 * Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
 *
 * @param version Version number to match
 * @param range Range pattern for version
 * @returns `true` if the version number is within the range, `false` otherwise.
 *
 * @example
 * ```
 * satisfies('1.1.0', '^1.0.0'); // return true
 * satisfies('1.1.0', '~1.0.0'); // return false
 * ```
 */

var satisfies = function satisfies(version, range) {
  // if no range operator then "="
  var m = range.match(/^([<>=~^]+)/);
  var op = m ? m[1] : '='; // if gt/lt/eq then operator compare

  if (op !== '^' && op !== '~') return compare(version, range, op); // else range of either "~" or "^" is assumed

  var _validateAndParse = validateAndParse(version),
      _validateAndParse2 = _slicedToArray(_validateAndParse, 5),
      v1 = _validateAndParse2[0],
      v2 = _validateAndParse2[1],
      v3 = _validateAndParse2[2],
      vp = _validateAndParse2[4];

  var _validateAndParse3 = validateAndParse(range),
      _validateAndParse4 = _slicedToArray(_validateAndParse3, 5),
      r1 = _validateAndParse4[0],
      r2 = _validateAndParse4[1],
      r3 = _validateAndParse4[2],
      rp = _validateAndParse4[4];

  var v = [v1, v2, v3];
  var r = [r1, r2 !== null && r2 !== void 0 ? r2 : 'x', r3 !== null && r3 !== void 0 ? r3 : 'x']; // validate pre-release

  if (rp) {
    if (!vp) return false;
    if (compareSegments(v, r) !== 0) return false;
    if (compareSegments(vp.split('.'), rp.split('.')) === -1) return false;
  } // first non-zero number


  var nonZero = r.findIndex(function (v) {
    return v !== '0';
  }) + 1; // pointer to where segments can be >=

  var i = op === '~' ? 2 : nonZero > 1 ? nonZero : 1; // before pointer must be equal

  if (compareSegments(v.slice(0, i), r.slice(0, i)) !== 0) return false; // after pointer must be >=

  if (compareSegments(v.slice(i), r.slice(i)) === -1) return false;
  return true;
};
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

var validateAndParse = function validateAndParse(version) {
  if (typeof version !== 'string') {
    throw new TypeError('Invalid argument expected string');
  }

  var match = version.match(semver);

  if (!match) {
    throw new Error("Invalid argument not valid semver ('".concat(version, "' received)"));
  }

  match.shift();
  return match;
};

var isWildcard = function isWildcard(s) {
  return s === '*' || s === 'x' || s === 'X';
};

var tryParse = function tryParse(v) {
  var n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};

var forceType = function forceType(a, b) {
  return _typeof(a) !== _typeof(b) ? [String(a), String(b)] : [a, b];
};

var compareStrings = function compareStrings(a, b) {
  if (isWildcard(a) || isWildcard(b)) return 0;

  var _forceType = forceType(tryParse(a), tryParse(b)),
      _forceType2 = _slicedToArray(_forceType, 2),
      ap = _forceType2[0],
      bp = _forceType2[1];

  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};

var compareSegments = function compareSegments(a, b) {
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    var r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }

  return 0;
};

var operatorResMap = {
  '>': [1],
  '>=': [0, 1],
  '=': [0],
  '<=': [-1, 0],
  '<': [-1]
};
var allowedOperators = Object.keys(operatorResMap);

var assertValidOperator = function assertValidOperator(op) {
  if (typeof op !== 'string') {
    throw new TypeError("Invalid operator type, expected string but got ".concat(_typeof(op)));
  }

  if (allowedOperators.indexOf(op) === -1) {
    throw new Error("Invalid operator, expected one of ".concat(allowedOperators.join('|')));
  }
};
// EXTERNAL MODULE: ../../node_modules/lru-cache/index.js
var lru_cache = __webpack_require__(730);
var lru_cache_default = /*#__PURE__*/__webpack_require__.n(lru_cache);
// EXTERNAL MODULE: ../../build/oss-experimental/react-is/cjs/react-is.production.js
var react_is_production = __webpack_require__(890);
;// CONCATENATED MODULE: ../shared/ReactFeatureFlags.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// -----------------------------------------------------------------------------
// Land or remove (zero effort)
//
// Flags that can likely be deleted or landed without consequences
// -----------------------------------------------------------------------------
var enableComponentStackLocations = true; // -----------------------------------------------------------------------------
// Killswitch
//
// Flags that exist solely to turn off a change in case it causes a regression
// when it rolls out to prod. We should remove these as soon as possible.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Land or remove (moderate effort)
//
// Flags that can be probably deleted or landed, but might require extra effort
// like migrating internal callers or performance testing.
// -----------------------------------------------------------------------------
// TODO: Finish rolling out in www

var favorSafetyOverHydrationPerf = true;
var enableAsyncActions = true; // Need to remove didTimeout argument from Scheduler before landing

var disableSchedulerTimeoutInWorkLoop = false; // This will break some internal tests at Meta so we need to gate this until
// those can be fixed.

var enableDeferRootSchedulingToMicrotask = true; // TODO: Land at Meta before removing.

var disableDefaultPropsExceptForClasses = true; // -----------------------------------------------------------------------------
// Slated for removal in the future (significant effort)
//
// These are experiments that didn't work out, and never shipped, but we can't
// delete from the codebase until we migrate internal callers.
// -----------------------------------------------------------------------------
// Add a callback property to suspense to notify which promises are currently
// in the update queue. This allows reporting and tracing of what is causing
// the user to see a loading state.
//
// Also allows hydration callbacks to fire when a dehydrated boundary gets
// hydrated or deleted.
//
// This will eventually be replaced by the Transition Tracing proposal.

var enableSuspenseCallback = false; // Experimental Scope support.

var enableScopeAPI = false; // Experimental Create Event Handle API.

var enableCreateEventHandleAPI = false; // Support legacy Primer support on internal FB www

var enableLegacyFBSupport = false; // -----------------------------------------------------------------------------
// Ongoing experiments
//
// These are features that we're either actively exploring or are reasonably
// likely to include in an upcoming release.
// -----------------------------------------------------------------------------

var enableCache = true;
var enableLegacyCache = (/* unused pure expression or super */ null && (true));
var enableBinaryFlight = true;
var enableFlightReadableStream = true;
var enableAsyncIterableChildren = (/* unused pure expression or super */ null && (true));
var enableTaint = (/* unused pure expression or super */ null && (true));
var enablePostpone = (/* unused pure expression or super */ null && (true));
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLazyContextPropagation = false; // FB-only usage. The new API has different semantics.

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber

var enableSuspenseAvoidThisFallback = false; // Enables unstable_avoidThisFallback feature in Fizz

var enableSuspenseAvoidThisFallbackFizz = false;
var enableCPUSuspense = (/* unused pure expression or super */ null && (true)); // Enables useMemoCache hook, intended as a compilation target for
// auto-memoization.

var enableUseMemoCacheHook = true; // Test this at Meta before enabling.

var enableNoCloningMemoCache = false;
var enableUseEffectEventHook = (/* unused pure expression or super */ null && (true)); // Test in www before enabling in open source.
// Enables DOM-server to stream its instruction set as data-attributes
// (handled with an MutationObserver) instead of inline-scripts

var enableFizzExternalRuntime = (/* unused pure expression or super */ null && (true));
var alwaysThrottleRetries = true;
var passChildrenWhenCloningPersistedNodes = false;
var enableServerComponentLogs = (/* unused pure expression or super */ null && (true));
var enableAddPropertiesFastPath = false;
var enableOwnerStacks = (/* unused pure expression or super */ null && (true));
var enableShallowPropDiffing = false;
/**
 * Enables an expiration time for retry lanes to avoid starvation.
 */

var enableRetryLaneExpiration = false;
var retryLaneExpirationMs = 5000;
var syncLaneExpirationMs = 250;
var transitionLaneExpirationMs = 5000; // -----------------------------------------------------------------------------
// Ready for next major.
//
// Alias __NEXT_MAJOR__ to __EXPERIMENTAL__ for easier skimming.
// -----------------------------------------------------------------------------
// TODO: Anything that's set to `true` in this section should either be cleaned
// up (if it's on everywhere, including Meta and RN builds) or moved to a
// different section of this file.
// const __NEXT_MAJOR__ = __EXPERIMENTAL__;
// Renames the internal symbol for elements since they have changed signature/constructor

var renameElementSymbol = true; // Removes legacy style context

var disableLegacyContext = true; // Not ready to break experimental yet.
// Modern <StrictMode /> behaviour aligns more with what components
// components will encounter in production, especially when used With <Offscreen />.
// TODO: clean up legacy <StrictMode /> once tests pass WWW.

var useModernStrictMode = true; // Not ready to break experimental yet.
// Remove IE and MsApp specific workarounds for innerHTML

var disableIEWorkarounds = true; // Filter certain DOM attributes (e.g. src, href) if their values are empty
// strings. This prevents e.g. <img src=""> from making an unnecessary HTTP
// request for certain browsers.

var enableFilterEmptyStringAttributesDOM = true; // Disabled caching behavior of `react/cache` in client runtimes.

var disableClientCache = true;
/**
 * Enables a new error detection for infinite render loops from updates caused
 * by setState or similar outside of the component owning the state.
 */

var enableInfiniteRenderLoopDetection = true; // Subtle breaking changes to JSX runtime to make it faster, like passing `ref`
// as a normal prop instead of stripping it from the props object.
// Passes `ref` as a normal prop instead of stripping it from the props object
// during element creation.

var enableRefAsProp = true;
var disableStringRefs = true;
var enableFastJSX = true; // Warn on any usage of ReactTestRenderer

var enableReactTestRendererWarning = true; // Disables legacy mode
// This allows us to land breaking changes to remove legacy mode APIs in experimental builds
// before removing them in stable in the next Major

var disableLegacyMode = true; // Make <Context> equivalent to <Context.Provider> instead of <Context.Consumer>

var enableRenderableContext = true; // Enables the `initialValue` option for `useDeferredValue`

var enableUseDeferredValueInitialArg = true; // -----------------------------------------------------------------------------
// Chopping Block
//
// Planned feature deprecations and breaking changes. Sorted roughly in order of
// when we plan to enable them.
// -----------------------------------------------------------------------------
// Enables time slicing for updates that aren't wrapped in startTransition.

var forceConcurrentByDefaultForTesting = false; // Adds an opt-in to time slicing for updates that aren't wrapped in startTransition.

var allowConcurrentByDefault = false; // -----------------------------------------------------------------------------
// React DOM Chopping Block
//
// Similar to main Chopping Block but only flags related to React DOM. These are
// grouped because we will likely batch all of them into a single major release.
// -----------------------------------------------------------------------------
// Disable support for comment nodes as React DOM containers. Already disabled
// in open source, but www codebase still relies on it. Need to remove.

var disableCommentsAsDOMContainers = true;
var enableTrustedTypesIntegration = false; // Prevent the value and checked attributes from syncing with their related
// DOM properties

var disableInputAttributeSyncing = false; // Disables children for <textarea> elements

var disableTextareaChildren = false; // -----------------------------------------------------------------------------
// Debugging and DevTools
// -----------------------------------------------------------------------------
// Adds user timing marks for e.g. state updates, suspense, and work loop stuff,
// for an experimental timeline tool.

var enableSchedulingProfiler = (/* unused pure expression or super */ null && (false)); // Helps identify side effects in render-phase lifecycle hooks and setState
// reducers by double invoking them in StrictLegacyMode.

var debugRenderPhaseSideEffectsForStrictMode = (/* unused pure expression or super */ null && (false)); // Gather advanced timing metrics for Profiler subtrees.

var enableProfilerTimer = (/* unused pure expression or super */ null && (false)); // Record durations for commit and passive effects phases.

var enableProfilerCommitHooks = (/* unused pure expression or super */ null && (false)); // Phase param passed to onRender callback differentiates between an "update" and a "cascading-update".

var enableProfilerNestedUpdatePhase = (/* unused pure expression or super */ null && (false)); // Adds verbose console logging for e.g. state updates, suspense, and work loop
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false;
var enableAsyncDebugInfo = (/* unused pure expression or super */ null && (true)); // Track which Fiber(s) schedule render work.

var enableUpdaterTracking = (/* unused pure expression or super */ null && (false)); // Internal only.

var enableGetInspectorDataForInstanceInProduction = false;
var consoleManagedByDevToolsDuringStrictMode = true;
var enableDO_NOT_USE_disableStrictPassiveEffect = false;
;// CONCATENATED MODULE: ../shared/ReactSymbols.js
function ReactSymbols_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ReactSymbols_typeof = function _typeof(obj) { return typeof obj; }; } else { ReactSymbols_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ReactSymbols_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
 // ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.

var REACT_LEGACY_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_ELEMENT_TYPE = renameElementSymbol ? Symbol.for('react.transitional.element') : REACT_LEGACY_ELEMENT_TYPE;
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider'); // TODO: Delete with enableRenderableContext

var REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_SCOPE_TYPE = Symbol.for('react.scope');
var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
var REACT_TRACING_MARKER_TYPE = Symbol.for('react.tracing_marker');
var REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
var REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || ReactSymbols_typeof(maybeIterable) !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}
var ASYNC_ITERATOR = Symbol.asyncIterator;
;// CONCATENATED MODULE: ../react-devtools-shared/src/frontend/types.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * WARNING:
 * This file contains types that are designed for React DevTools UI and how it interacts with the backend.
 * They might be used in different versions of DevTools backends.
 * Be mindful of backwards compatibility when making changes.
 */
// WARNING
// The values below are referenced by ComponentFilters (which are saved via localStorage).
// Do not change them or it will break previously saved user customizations.
// If new element types are added, use new numbers rather than re-ordering existing ones.
//
// Changing these types is also a backwards breaking change for the standalone shell,
// since the frontend and backend must share the same values-
// and the backend is embedded in certain environments (like React Native).
var types_ElementTypeClass = 1;
var ElementTypeContext = 2;
var types_ElementTypeFunction = 5;
var types_ElementTypeForwardRef = 6;
var ElementTypeHostComponent = 7;
var types_ElementTypeMemo = 8;
var ElementTypeOtherOrUnknown = 9;
var ElementTypeProfiler = 10;
var ElementTypeRoot = 11;
var ElementTypeSuspense = 12;
var ElementTypeSuspenseList = 13;
var ElementTypeTracingMarker = 14; // Different types of elements displayed in the Elements tree.
// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.

// WARNING
// The values below are referenced by ComponentFilters (which are saved via localStorage).
// Do not change them or it will break previously saved user customizations.
// If new filter types are added, use new numbers rather than re-ordering existing ones.
var ComponentFilterElementType = 1;
var ComponentFilterDisplayName = 2;
var ComponentFilterLocation = 3;
var ComponentFilterHOC = 4;
var StrictMode = 1; // Each element on the frontend corresponds to a Fiber on the backend.
// Some of its information (e.g. id, type, displayName) come from the backend.
// Other bits (e.g. weight and depth) are computed on the frontend for windowing and display purposes.
// Elements are updated on a push basis– meaning the backend pushes updates to the frontend when needed.
;// CONCATENATED MODULE: ../react-devtools-shared/src/isArray.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var isArray = Array.isArray;
/* harmony default export */ const src_isArray = (isArray);
;// CONCATENATED MODULE: ../react-devtools-shared/src/utils.js
/* provided dependency */ var process = __webpack_require__(169);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function utils_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { utils_typeof = function _typeof(obj) { return typeof obj; }; } else { utils_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return utils_typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */










// $FlowFixMe[method-unbinding]
var utils_hasOwnProperty = Object.prototype.hasOwnProperty;
var cachedDisplayNames = new WeakMap(); // On large trees, encoding takes significant time.
// Try to reuse the already encoded strings.

var encodedStringCache = new (lru_cache_default())({
  max: 1000
});
function alphaSortKeys(a, b) {
  if (a.toString() > b.toString()) {
    return 1;
  } else if (b.toString() > a.toString()) {
    return -1;
  } else {
    return 0;
  }
}
function getAllEnumerableKeys(obj) {
  var keys = new Set();
  var current = obj;

  var _loop = function _loop() {
    var currentKeys = [].concat(_toConsumableArray(Object.keys(current)), _toConsumableArray(Object.getOwnPropertySymbols(current)));
    var descriptors = Object.getOwnPropertyDescriptors(current);
    currentKeys.forEach(function (key) {
      // $FlowFixMe[incompatible-type]: key can be a Symbol https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
      if (descriptors[key].enumerable) {
        keys.add(key);
      }
    });
    current = Object.getPrototypeOf(current);
  };

  while (current != null) {
    _loop();
  }

  return keys;
} // Mirror https://github.com/facebook/react/blob/7c21bf72ace77094fd1910cc350a548287ef8350/packages/shared/getComponentName.js#L27-L37

function getWrappedDisplayName(outerType, innerType, wrapperName, fallbackName) {
  var displayName = outerType === null || outerType === void 0 ? void 0 : outerType.displayName;
  return displayName || "".concat(wrapperName, "(").concat(getDisplayName(innerType, fallbackName), ")");
}
function getDisplayName(type) {
  var fallbackName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Anonymous';
  var nameFromCache = cachedDisplayNames.get(type);

  if (nameFromCache != null) {
    return nameFromCache;
  }

  var displayName = fallbackName; // The displayName property is not guaranteed to be a string.
  // It's only safe to use for our purposes if it's a string.
  // github.com/facebook/react-devtools/issues/803

  if (typeof type.displayName === 'string') {
    displayName = type.displayName;
  } else if (typeof type.name === 'string' && type.name !== '') {
    displayName = type.name;
  }

  cachedDisplayNames.set(type, displayName);
  return displayName;
}
var uidCounter = 0;
function getUID() {
  return ++uidCounter;
}
function utfDecodeStringWithRanges(array, left, right) {
  var string = '';

  for (var i = left; i <= right; i++) {
    string += String.fromCodePoint(array[i]);
  }

  return string;
}

function surrogatePairToCodePoint(charCode1, charCode2) {
  return ((charCode1 & 0x3ff) << 10) + (charCode2 & 0x3ff) + 0x10000;
} // Credit for this encoding approach goes to Tim Down:
// https://stackoverflow.com/questions/4877326/how-can-i-tell-if-a-string-contains-multibyte-characters-in-javascript


function utfEncodeString(string) {
  var cached = encodedStringCache.get(string);

  if (cached !== undefined) {
    return cached;
  }

  var encoded = [];
  var i = 0;
  var charCode;

  while (i < string.length) {
    charCode = string.charCodeAt(i); // Handle multibyte unicode characters (like emoji).

    if ((charCode & 0xf800) === 0xd800) {
      encoded.push(surrogatePairToCodePoint(charCode, string.charCodeAt(++i)));
    } else {
      encoded.push(charCode);
    }

    ++i;
  }

  encodedStringCache.set(string, encoded);
  return encoded;
}
function printOperationsArray(operations) {
  // The first two values are always rendererID and rootID
  var rendererID = operations[0];
  var rootID = operations[1];
  var logs = ["operations for renderer:".concat(rendererID, " and root:").concat(rootID)];
  var i = 2; // Reassemble the string table.

  var stringTable = [null // ID = 0 corresponds to the null string.
  ];
  var stringTableSize = operations[i++];
  var stringTableEnd = i + stringTableSize;

  while (i < stringTableEnd) {
    var nextLength = operations[i++];
    var nextString = utfDecodeStringWithRanges(operations, i, i + nextLength - 1);
    stringTable.push(nextString);
    i += nextLength;
  }

  while (i < operations.length) {
    var operation = operations[i];

    switch (operation) {
      case TREE_OPERATION_ADD:
        {
          var _id = operations[i + 1];
          var type = operations[i + 2];
          i += 3;

          if (type === ElementTypeRoot) {
            logs.push("Add new root node ".concat(_id));
            i++; // isStrictModeCompliant

            i++; // supportsProfiling

            i++; // supportsStrictMode

            i++; // hasOwnerMetadata
          } else {
            var parentID = operations[i];
            i++;
            i++; // ownerID

            var displayNameStringID = operations[i];
            var displayName = stringTable[displayNameStringID];
            i++;
            i++; // key

            logs.push("Add node ".concat(_id, " (").concat(displayName || 'null', ") as child of ").concat(parentID));
          }

          break;
        }

      case TREE_OPERATION_REMOVE:
        {
          var removeLength = operations[i + 1];
          i += 2;

          for (var removeIndex = 0; removeIndex < removeLength; removeIndex++) {
            var _id2 = operations[i];
            i += 1;
            logs.push("Remove node ".concat(_id2));
          }

          break;
        }

      case TREE_OPERATION_REMOVE_ROOT:
        {
          i += 1;
          logs.push("Remove root ".concat(rootID));
          break;
        }

      case TREE_OPERATION_SET_SUBTREE_MODE:
        {
          var _id3 = operations[i + 1];
          var mode = operations[i + 1];
          i += 3;
          logs.push("Mode ".concat(mode, " set for subtree with root ").concat(_id3));
          break;
        }

      case TREE_OPERATION_REORDER_CHILDREN:
        {
          var _id4 = operations[i + 1];
          var numChildren = operations[i + 2];
          i += 3;
          var children = operations.slice(i, i + numChildren);
          i += numChildren;
          logs.push("Re-order node ".concat(_id4, " children ").concat(children.join(',')));
          break;
        }

      case TREE_OPERATION_UPDATE_TREE_BASE_DURATION:
        // Base duration updates are only sent while profiling is in progress.
        // We can ignore them at this point.
        // The profiler UI uses them lazily in order to generate the tree.
        i += 3;
        break;

      case TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS:
        var id = operations[i + 1];
        var numErrors = operations[i + 2];
        var numWarnings = operations[i + 3];
        i += 4;
        logs.push("Node ".concat(id, " has ").concat(numErrors, " errors and ").concat(numWarnings, " warnings"));
        break;

      default:
        throw Error("Unsupported Bridge operation \"".concat(operation, "\""));
    }
  }

  console.log(logs.join('\n  '));
}
function getDefaultComponentFilters() {
  return [{
    type: ComponentFilterElementType,
    value: ElementTypeHostComponent,
    isEnabled: true
  }];
}
function getSavedComponentFilters() {
  try {
    var raw = localStorageGetItem(LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY);

    if (raw != null) {
      var parsedFilters = JSON.parse(raw);
      return filterOutLocationComponentFilters(parsedFilters);
    }
  } catch (error) {}

  return getDefaultComponentFilters();
}
function setSavedComponentFilters(componentFilters) {
  localStorageSetItem(LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY, JSON.stringify(filterOutLocationComponentFilters(componentFilters)));
} // Following __debugSource removal from Fiber, the new approach for finding the source location
// of a component, represented by the Fiber, is based on lazily generating and parsing component stack frames
// To find the original location, React DevTools will perform symbolication, source maps are required for that.
// In order to start filtering Fibers, we need to find location for all of them, which can't be done lazily.
// Eager symbolication can become quite expensive for large applications.

function filterOutLocationComponentFilters(componentFilters) {
  // This is just an additional check to preserve the previous state
  // Filters can be stored on the backend side or in user land (in a window object)
  if (!Array.isArray(componentFilters)) {
    return componentFilters;
  }

  return componentFilters.filter(function (f) {
    return f.type !== ComponentFilterLocation;
  });
}

function parseBool(s) {
  if (s === 'true') {
    return true;
  }

  if (s === 'false') {
    return false;
  }
}

function castBool(v) {
  if (v === true || v === false) {
    return v;
  }
}
function castBrowserTheme(v) {
  if (v === 'light' || v === 'dark' || v === 'auto') {
    return v;
  }
}
function getAppendComponentStack() {
  var _parseBool;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY);
  return (_parseBool = parseBool(raw)) !== null && _parseBool !== void 0 ? _parseBool : true;
}
function getBreakOnConsoleErrors() {
  var _parseBool2;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS);
  return (_parseBool2 = parseBool(raw)) !== null && _parseBool2 !== void 0 ? _parseBool2 : false;
}
function getHideConsoleLogsInStrictMode() {
  var _parseBool3;

  var raw = localStorageGetItem(LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE);
  return (_parseBool3 = parseBool(raw)) !== null && _parseBool3 !== void 0 ? _parseBool3 : false;
}
function getShowInlineWarningsAndErrors() {
  var _parseBool4;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY);
  return (_parseBool4 = parseBool(raw)) !== null && _parseBool4 !== void 0 ? _parseBool4 : true;
}
function getDefaultOpenInEditorURL() {
  return typeof process.env.EDITOR_URL === 'string' ? process.env.EDITOR_URL : '';
}
function getOpenInEditorURL() {
  try {
    var raw = localStorageGetItem(LOCAL_STORAGE_OPEN_IN_EDITOR_URL);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultOpenInEditorURL();
}
function parseElementDisplayNameFromBackend(displayName, type) {
  if (displayName === null) {
    return {
      formattedDisplayName: null,
      hocDisplayNames: null,
      compiledWithForget: false
    };
  }

  if (displayName.startsWith('Forget(')) {
    var displayNameWithoutForgetWrapper = displayName.slice(7, displayName.length - 1);

    var _parseElementDisplayN = parseElementDisplayNameFromBackend(displayNameWithoutForgetWrapper, type),
        formattedDisplayName = _parseElementDisplayN.formattedDisplayName,
        _hocDisplayNames = _parseElementDisplayN.hocDisplayNames;

    return {
      formattedDisplayName: formattedDisplayName,
      hocDisplayNames: _hocDisplayNames,
      compiledWithForget: true
    };
  }

  var hocDisplayNames = null;

  switch (type) {
    case ElementTypeClass:
    case ElementTypeForwardRef:
    case ElementTypeFunction:
    case ElementTypeMemo:
      if (displayName.indexOf('(') >= 0) {
        var matches = displayName.match(/[^()]+/g);

        if (matches != null) {
          displayName = matches.pop();
          hocDisplayNames = matches;
        }
      }

      break;

    default:
      break;
  }

  return {
    formattedDisplayName: displayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: false
  };
} // Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349

function shallowDiffers(prev, next) {
  for (var attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }

  for (var _attribute in next) {
    if (prev[_attribute] !== next[_attribute]) {
      return true;
    }
  }

  return false;
}
function utils_getInObject(object, path) {
  return path.reduce(function (reduced, attr) {
    if (reduced) {
      if (utils_hasOwnProperty.call(reduced, attr)) {
        return reduced[attr];
      }

      if (typeof reduced[Symbol.iterator] === 'function') {
        // Convert iterable to array and return array[index]
        //
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        return Array.from(reduced)[attr];
      }
    }

    return null;
  }, object);
}
function deletePathInObject(object, path) {
  var length = path.length;
  var last = path[length - 1];

  if (object != null) {
    var parent = utils_getInObject(object, path.slice(0, length - 1));

    if (parent) {
      if (src_isArray(parent)) {
        parent.splice(last, 1);
      } else {
        delete parent[last];
      }
    }
  }
}
function renamePathInObject(object, oldPath, newPath) {
  var length = oldPath.length;

  if (object != null) {
    var parent = utils_getInObject(object, oldPath.slice(0, length - 1));

    if (parent) {
      var lastOld = oldPath[length - 1];
      var lastNew = newPath[length - 1];
      parent[lastNew] = parent[lastOld];

      if (src_isArray(parent)) {
        parent.splice(lastOld, 1);
      } else {
        delete parent[lastOld];
      }
    }
  }
}
function utils_setInObject(object, path, value) {
  var length = path.length;
  var last = path[length - 1];

  if (object != null) {
    var parent = utils_getInObject(object, path.slice(0, length - 1));

    if (parent) {
      parent[last] = value;
    }
  }
}

/**
 * Get a enhanced/artificial type string based on the object instance
 */
function getDataType(data) {
  if (data === null) {
    return 'null';
  } else if (data === undefined) {
    return 'undefined';
  }

  if ((0,react_is_production/* isElement */.kK)(data)) {
    return 'react_element';
  }

  if (typeof HTMLElement !== 'undefined' && data instanceof HTMLElement) {
    return 'html_element';
  }

  var type = utils_typeof(data);

  switch (type) {
    case 'bigint':
      return 'bigint';

    case 'boolean':
      return 'boolean';

    case 'function':
      return 'function';

    case 'number':
      if (Number.isNaN(data)) {
        return 'nan';
      } else if (!Number.isFinite(data)) {
        return 'infinity';
      } else {
        return 'number';
      }

    case 'object':
      if (src_isArray(data)) {
        return 'array';
      } else if (ArrayBuffer.isView(data)) {
        return utils_hasOwnProperty.call(data.constructor, 'BYTES_PER_ELEMENT') ? 'typed_array' : 'data_view';
      } else if (data.constructor && data.constructor.name === 'ArrayBuffer') {
        // HACK This ArrayBuffer check is gross; is there a better way?
        // We could try to create a new DataView with the value.
        // If it doesn't error, we know it's an ArrayBuffer,
        // but this seems kind of awkward and expensive.
        return 'array_buffer';
      } else if (typeof data[Symbol.iterator] === 'function') {
        var iterator = data[Symbol.iterator]();

        if (!iterator) {// Proxies might break assumptoins about iterators.
          // See github.com/facebook/react/issues/21654
        } else {
          return iterator === data ? 'opaque_iterator' : 'iterator';
        }
      } else if (data.constructor && data.constructor.name === 'RegExp') {
        return 'regexp';
      } else {
        // $FlowFixMe[method-unbinding]
        var toStringValue = Object.prototype.toString.call(data);

        if (toStringValue === '[object Date]') {
          return 'date';
        } else if (toStringValue === '[object HTMLAllCollection]') {
          return 'html_all_collection';
        }
      }

      if (!isPlainObject(data)) {
        return 'class_instance';
      }

      return 'object';

    case 'string':
      return 'string';

    case 'symbol':
      return 'symbol';

    case 'undefined':
      if ( // $FlowFixMe[method-unbinding]
      Object.prototype.toString.call(data) === '[object HTMLAllCollection]') {
        return 'html_all_collection';
      }

      return 'undefined';

    default:
      return 'unknown';
  }
} // Fork of packages/react-is/src/ReactIs.js:30, but with legacy element type
// Which has been changed in https://github.com/facebook/react/pull/28813

function typeOfWithLegacyElementSymbol(object) {
  if (utils_typeof(object) === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_LEGACY_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
                return $$typeofType;

              case REACT_CONSUMER_TYPE:
                if (enableRenderableContext) {
                  return $$typeofType;
                }

              // Fall through

              case REACT_PROVIDER_TYPE:
                if (!enableRenderableContext) {
                  return $$typeofType;
                }

              // Fall through

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

function getDisplayNameForReactElement(element) {
  var elementType = (0,react_is_production/* typeOf */.kM)(element) || typeOfWithLegacyElementSymbol(element);

  switch (elementType) {
    case react_is_production/* ContextConsumer */.AI:
      return 'ContextConsumer';

    case react_is_production/* ContextProvider */.HQ:
      return 'ContextProvider';

    case react_is_production/* ForwardRef */.A4:
      return 'ForwardRef';

    case react_is_production/* Fragment */.HY:
      return 'Fragment';

    case react_is_production/* Lazy */.oM:
      return 'Lazy';

    case react_is_production/* Memo */._Y:
      return 'Memo';

    case react_is_production/* Portal */.h_:
      return 'Portal';

    case react_is_production/* Profiler */.Q1:
      return 'Profiler';

    case react_is_production/* StrictMode */.nF:
      return 'StrictMode';

    case react_is_production/* Suspense */.n4:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_TRACING_MARKER_TYPE:
      return 'TracingMarker';

    default:
      var type = element.type;

      if (typeof type === 'string') {
        return type;
      } else if (typeof type === 'function') {
        return getDisplayName(type, 'Anonymous');
      } else if (type != null) {
        return 'NotImplementedInDevtools';
      } else {
        return 'Element';
      }

  }
}
var MAX_PREVIEW_STRING_LENGTH = 50;

function truncateForDisplay(string) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_PREVIEW_STRING_LENGTH;

  if (string.length > length) {
    return string.slice(0, length) + '…';
  } else {
    return string;
  }
} // Attempts to mimic Chrome's inline preview for values.
// For example, the following value...
//   {
//      foo: 123,
//      bar: "abc",
//      baz: [true, false],
//      qux: { ab: 1, cd: 2 }
//   };
//
// Would show a preview of...
//   {foo: 123, bar: "abc", baz: Array(2), qux: {…}}
//
// And the following value...
//   [
//     123,
//     "abc",
//     [true, false],
//     { foo: 123, bar: "abc" }
//   ];
//
// Would show a preview of...
//   [123, "abc", Array(2), {…}]


function formatDataForPreview(data, showFormattedValue) {
  if (data != null && utils_hasOwnProperty.call(data, meta.type)) {
    return showFormattedValue ? data[meta.preview_long] : data[meta.preview_short];
  }

  var type = getDataType(data);

  switch (type) {
    case 'html_element':
      return "<".concat(truncateForDisplay(data.tagName.toLowerCase()), " />");

    case 'function':
      return truncateForDisplay("\u0192 ".concat(typeof data.name === 'function' ? '' : data.name, "() {}"));

    case 'string':
      return "\"".concat(data, "\"");

    case 'bigint':
      return truncateForDisplay(data.toString() + 'n');

    case 'regexp':
      return truncateForDisplay(data.toString());

    case 'symbol':
      return truncateForDisplay(data.toString());

    case 'react_element':
      return "<".concat(truncateForDisplay(getDisplayNameForReactElement(data) || 'Unknown'), " />");

    case 'array_buffer':
      return "ArrayBuffer(".concat(data.byteLength, ")");

    case 'data_view':
      return "DataView(".concat(data.buffer.byteLength, ")");

    case 'array':
      if (showFormattedValue) {
        var formatted = '';

        for (var i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += formatDataForPreview(data[i], false);

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "[".concat(truncateForDisplay(formatted), "]");
      } else {
        var length = utils_hasOwnProperty.call(data, meta.size) ? data[meta.size] : data.length;
        return "Array(".concat(length, ")");
      }

    case 'typed_array':
      var shortName = "".concat(data.constructor.name, "(").concat(data.length, ")");

      if (showFormattedValue) {
        var _formatted = '';

        for (var _i = 0; _i < data.length; _i++) {
          if (_i > 0) {
            _formatted += ', ';
          }

          _formatted += data[_i];

          if (_formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "".concat(shortName, " [").concat(truncateForDisplay(_formatted), "]");
      } else {
        return shortName;
      }

    case 'iterator':
      var name = data.constructor.name;

      if (showFormattedValue) {
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        var array = Array.from(data);
        var _formatted2 = '';

        for (var _i2 = 0; _i2 < array.length; _i2++) {
          var entryOrEntries = array[_i2];

          if (_i2 > 0) {
            _formatted2 += ', ';
          } // TRICKY
          // Browsers display Maps and Sets differently.
          // To mimic their behavior, detect if we've been given an entries tuple.
          //   Map(2) {"abc" => 123, "def" => 123}
          //   Set(2) {"abc", 123}


          if (src_isArray(entryOrEntries)) {
            var key = formatDataForPreview(entryOrEntries[0], true);
            var value = formatDataForPreview(entryOrEntries[1], false);
            _formatted2 += "".concat(key, " => ").concat(value);
          } else {
            _formatted2 += formatDataForPreview(entryOrEntries, false);
          }

          if (_formatted2.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "".concat(name, "(").concat(data.size, ") {").concat(truncateForDisplay(_formatted2), "}");
      } else {
        return "".concat(name, "(").concat(data.size, ")");
      }

    case 'opaque_iterator':
      {
        return data[Symbol.toStringTag];
      }

    case 'date':
      return data.toString();

    case 'class_instance':
      return data.constructor.name;

    case 'object':
      if (showFormattedValue) {
        var keys = Array.from(getAllEnumerableKeys(data)).sort(alphaSortKeys);
        var _formatted3 = '';

        for (var _i3 = 0; _i3 < keys.length; _i3++) {
          var _key = keys[_i3];

          if (_i3 > 0) {
            _formatted3 += ', ';
          }

          _formatted3 += "".concat(_key.toString(), ": ").concat(formatDataForPreview(data[_key], false));

          if (_formatted3.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "{".concat(truncateForDisplay(_formatted3), "}");
      } else {
        return '{…}';
      }

    case 'boolean':
    case 'number':
    case 'infinity':
    case 'nan':
    case 'null':
    case 'undefined':
      return data;

    default:
      try {
        return truncateForDisplay(String(data));
      } catch (error) {
        return 'unserializable';
      }

  }
} // Basically checking that the object only has Object in its prototype chain

var isPlainObject = function isPlainObject(object) {
  var objectPrototype = Object.getPrototypeOf(object);
  if (!objectPrototype) return true;
  var objectParentPrototype = Object.getPrototypeOf(objectPrototype);
  return !objectParentPrototype;
};
function backendToFrontendSerializedElementMapper(element) {
  var _parseElementDisplayN2 = parseElementDisplayNameFromBackend(element.displayName, element.type),
      formattedDisplayName = _parseElementDisplayN2.formattedDisplayName,
      hocDisplayNames = _parseElementDisplayN2.hocDisplayNames,
      compiledWithForget = _parseElementDisplayN2.compiledWithForget;

  return _objectSpread(_objectSpread({}, element), {}, {
    displayName: formattedDisplayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: compiledWithForget
  });
} // This is a hacky one to just support this exact case.

function normalizeUrl(url) {
  return url.replace('/./', '/');
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/hydration.js
function hydration_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hydration_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hydration_ownKeys(Object(source), true).forEach(function (key) { hydration_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hydration_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hydration_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var meta = {
  inspectable: Symbol('inspectable'),
  inspected: Symbol('inspected'),
  name: Symbol('name'),
  preview_long: Symbol('preview_long'),
  preview_short: Symbol('preview_short'),
  readonly: Symbol('readonly'),
  size: Symbol('size'),
  type: Symbol('type'),
  unserializable: Symbol('unserializable')
};
// This threshold determines the depth at which the bridge "dehydrates" nested data.
// Dehydration means that we don't serialize the data for e.g. postMessage or stringify,
// unless the frontend explicitly requests it (e.g. a user clicks to expand a props object).
//
// Reducing this threshold will improve the speed of initial component inspection,
// but may decrease the responsiveness of expanding objects/arrays to inspect further.
var LEVEL_THRESHOLD = 2;
/**
 * Generate the dehydrated metadata for complex object instances
 */

function createDehydrated(type, inspectable, data, cleaned, path) {
  cleaned.push(path);
  var dehydrated = {
    inspectable: inspectable,
    type: type,
    preview_long: formatDataForPreview(data, true),
    preview_short: formatDataForPreview(data, false),
    name: typeof data.constructor !== 'function' || typeof data.constructor.name !== 'string' || data.constructor.name === 'Object' ? '' : data.constructor.name
  };

  if (type === 'array' || type === 'typed_array') {
    dehydrated.size = data.length;
  } else if (type === 'object') {
    dehydrated.size = Object.keys(data).length;
  }

  if (type === 'iterator' || type === 'typed_array') {
    dehydrated.readonly = true;
  }

  return dehydrated;
}
/**
 * Strip out complex data (instances, functions, and data nested > LEVEL_THRESHOLD levels deep).
 * The paths of the stripped out objects are appended to the `cleaned` list.
 * On the other side of the barrier, the cleaned list is used to "re-hydrate" the cleaned representation into
 * an object with symbols as attributes, so that a sanitized object can be distinguished from a normal object.
 *
 * Input: {"some": {"attr": fn()}, "other": AnInstance}
 * Output: {
 *   "some": {
 *     "attr": {"name": the fn.name, type: "function"}
 *   },
 *   "other": {
 *     "name": "AnInstance",
 *     "type": "object",
 *   },
 * }
 * and cleaned = [["some", "attr"], ["other"]]
 */


function dehydrate(data, cleaned, unserializable, path, isPathAllowed) {
  var level = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var type = getDataType(data);
  var isPathAllowedCheck;

  switch (type) {
    case 'html_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.tagName,
        type: type
      };

    case 'function':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: typeof data.name === 'function' || !data.name ? 'function' : data.name,
        type: type
      };

    case 'string':
      isPathAllowedCheck = isPathAllowed(path);

      if (isPathAllowedCheck) {
        return data;
      } else {
        return data.length <= 500 ? data : data.slice(0, 500) + '...';
      }

    case 'bigint':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'symbol':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };
    // React Elements aren't very inspector-friendly,
    // and often contain private fields or circular references.

    case 'react_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: getDisplayNameForReactElement(data) || 'Unknown',
        type: type
      };
    // ArrayBuffers error if you try to inspect them.

    case 'array_buffer':
    case 'data_view':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: type === 'data_view' ? 'DataView' : 'ArrayBuffer',
        size: data.byteLength,
        type: type
      };

    case 'array':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      return data.map(function (item, i) {
        return dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
      });

    case 'html_all_collection':
    case 'typed_array':
    case 'iterator':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        var unserializableValue = {
          unserializable: true,
          type: type,
          readonly: true,
          size: type === 'typed_array' ? data.length : undefined,
          preview_short: formatDataForPreview(data, false),
          preview_long: formatDataForPreview(data, true),
          name: typeof data.constructor !== 'function' || typeof data.constructor.name !== 'string' || data.constructor.name === 'Object' ? '' : data.constructor.name
        }; // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.

        Array.from(data).forEach(function (item, i) {
          return unserializableValue[i] = dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
        });
        unserializable.push(path);
        return unserializableValue;
      }

    case 'opaque_iterator':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data[Symbol.toStringTag],
        type: type
      };

    case 'date':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'regexp':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'object':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        var object = {};
        getAllEnumerableKeys(data).forEach(function (key) {
          var name = key.toString();
          object[name] = dehydrate(data[key], cleaned, unserializable, path.concat([name]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
        });
        return object;
      }

    case 'class_instance':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      var value = {
        unserializable: true,
        type: type,
        readonly: true,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: typeof data.constructor !== 'function' || typeof data.constructor.name !== 'string' ? '' : data.constructor.name
      };
      getAllEnumerableKeys(data).forEach(function (key) {
        var keyAsString = key.toString();
        value[keyAsString] = dehydrate(data[key], cleaned, unserializable, path.concat([keyAsString]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
      });
      unserializable.push(path);
      return value;

    case 'infinity':
    case 'nan':
    case 'undefined':
      // Some values are lossy when sent through a WebSocket.
      // We dehydrate+rehydrate them to preserve their type.
      cleaned.push(path);
      return {
        type: type
      };

    default:
      return data;
  }
}
function fillInPath(object, data, path, value) {
  var target = getInObject(object, path);

  if (target != null) {
    if (!target[meta.unserializable]) {
      delete target[meta.inspectable];
      delete target[meta.inspected];
      delete target[meta.name];
      delete target[meta.preview_long];
      delete target[meta.preview_short];
      delete target[meta.readonly];
      delete target[meta.size];
      delete target[meta.type];
    }
  }

  if (value !== null && data.unserializable.length > 0) {
    var unserializablePath = data.unserializable[0];
    var isMatch = unserializablePath.length === path.length;

    for (var i = 0; i < path.length; i++) {
      if (path[i] !== unserializablePath[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      upgradeUnserializable(value, value);
    }
  }

  setInObject(object, path, value);
}
function hydrate(object, cleaned, unserializable) {
  cleaned.forEach(function (path) {
    var length = path.length;
    var last = path[length - 1];
    var parent = getInObject(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    var value = parent[last];

    if (!value) {
      return;
    } else if (value.type === 'infinity') {
      parent[last] = Infinity;
    } else if (value.type === 'nan') {
      parent[last] = NaN;
    } else if (value.type === 'undefined') {
      parent[last] = undefined;
    } else {
      // Replace the string keys with Symbols so they're non-enumerable.
      var replaced = {};
      replaced[meta.inspectable] = !!value.inspectable;
      replaced[meta.inspected] = false;
      replaced[meta.name] = value.name;
      replaced[meta.preview_long] = value.preview_long;
      replaced[meta.preview_short] = value.preview_short;
      replaced[meta.size] = value.size;
      replaced[meta.readonly] = !!value.readonly;
      replaced[meta.type] = value.type;
      parent[last] = replaced;
    }
  });
  unserializable.forEach(function (path) {
    var length = path.length;
    var last = path[length - 1];
    var parent = getInObject(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    var node = parent[last];

    var replacement = hydration_objectSpread({}, node);

    upgradeUnserializable(replacement, node);
    parent[last] = replacement;
  });
  return object;
}

function upgradeUnserializable(destination, source) {
  var _Object$definePropert;

  Object.defineProperties(destination, (_Object$definePropert = {}, hydration_defineProperty(_Object$definePropert, meta.inspected, {
    configurable: true,
    enumerable: false,
    value: !!source.inspected
  }), hydration_defineProperty(_Object$definePropert, meta.name, {
    configurable: true,
    enumerable: false,
    value: source.name
  }), hydration_defineProperty(_Object$definePropert, meta.preview_long, {
    configurable: true,
    enumerable: false,
    value: source.preview_long
  }), hydration_defineProperty(_Object$definePropert, meta.preview_short, {
    configurable: true,
    enumerable: false,
    value: source.preview_short
  }), hydration_defineProperty(_Object$definePropert, meta.size, {
    configurable: true,
    enumerable: false,
    value: source.size
  }), hydration_defineProperty(_Object$definePropert, meta.readonly, {
    configurable: true,
    enumerable: false,
    value: !!source.readonly
  }), hydration_defineProperty(_Object$definePropert, meta.type, {
    configurable: true,
    enumerable: false,
    value: source.type
  }), hydration_defineProperty(_Object$definePropert, meta.unserializable, {
    configurable: true,
    enumerable: false,
    value: !!source.unserializable
  }), _Object$definePropert));
  delete destination.inspected;
  delete destination.name;
  delete destination.preview_long;
  delete destination.preview_short;
  delete destination.size;
  delete destination.readonly;
  delete destination.type;
  delete destination.unserializable;
}
;// CONCATENATED MODULE: ../shared/isArray.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var isArrayImpl = Array.isArray;

function isArray_isArray(a) {
  return isArrayImpl(a);
}

/* harmony default export */ const shared_isArray = (isArray_isArray);
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/utils.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = backend_utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || backend_utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function utils_toConsumableArray(arr) { return utils_arrayWithoutHoles(arr) || utils_iterableToArray(arr) || backend_utils_unsupportedIterableToArray(arr) || utils_nonIterableSpread(); }

function utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function backend_utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return backend_utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return backend_utils_arrayLikeToArray(o, minLen); }

function utils_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function utils_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return backend_utils_arrayLikeToArray(arr); }

function backend_utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function backend_utils_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { backend_utils_typeof = function _typeof(obj) { return typeof obj; }; } else { backend_utils_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return backend_utils_typeof(obj); }

function utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { utils_ownKeys(Object(source), true).forEach(function (key) { backend_utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function backend_utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// TODO: update this to the first React version that has a corresponding DevTools backend
var FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER = '999.9.9';
function hasAssignedBackend(version) {
  if (version == null || version === '') {
    return false;
  }

  return gte(version, FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER);
}
function cleanForBridge(data, isPathAllowed) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (data !== null) {
    var cleanedPaths = [];
    var unserializablePaths = [];
    var cleanedData = dehydrate(data, cleanedPaths, unserializablePaths, path, isPathAllowed);
    return {
      data: cleanedData,
      cleaned: cleanedPaths,
      unserializable: unserializablePaths
    };
  } else {
    return null;
  }
}
function copyWithDelete(obj, path) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var key = path[index];
  var updated = shared_isArray(obj) ? obj.slice() : utils_objectSpread({}, obj);

  if (index + 1 === path.length) {
    if (shared_isArray(updated)) {
      updated.splice(key, 1);
    } else {
      delete updated[key];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[key] = copyWithDelete(obj[key], path, index + 1);
  }

  return updated;
} // This function expects paths to be the same except for the final value.
// e.g. ['path', 'to', 'foo'] and ['path', 'to', 'bar']

function copyWithRename(obj, oldPath, newPath) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var oldKey = oldPath[index];
  var updated = shared_isArray(obj) ? obj.slice() : utils_objectSpread({}, obj);

  if (index + 1 === oldPath.length) {
    var newKey = newPath[index]; // $FlowFixMe[incompatible-use] number or string is fine here

    updated[newKey] = updated[oldKey];

    if (shared_isArray(updated)) {
      updated.splice(oldKey, 1);
    } else {
      delete updated[oldKey];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[oldKey] = copyWithRename(obj[oldKey], oldPath, newPath, index + 1);
  }

  return updated;
}
function copyWithSet(obj, path, value) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (index >= path.length) {
    return value;
  }

  var key = path[index];
  var updated = shared_isArray(obj) ? obj.slice() : utils_objectSpread({}, obj); // $FlowFixMe[incompatible-use] number or string is fine here

  updated[key] = copyWithSet(obj[key], path, value, index + 1);
  return updated;
}
function getEffectDurations(root) {
  // Profiling durations are only available for certain builds.
  // If available, they'll be stored on the HostRoot.
  var effectDuration = null;
  var passiveEffectDuration = null;
  var hostRoot = root.current;

  if (hostRoot != null) {
    var stateNode = hostRoot.stateNode;

    if (stateNode != null) {
      effectDuration = stateNode.effectDuration != null ? stateNode.effectDuration : null;
      passiveEffectDuration = stateNode.passiveEffectDuration != null ? stateNode.passiveEffectDuration : null;
    }
  }

  return {
    effectDuration: effectDuration,
    passiveEffectDuration: passiveEffectDuration
  };
}
function serializeToString(data) {
  if (data === undefined) {
    return 'undefined';
  }

  if (typeof data === 'function') {
    return data.toString();
  }

  var cache = new Set(); // Use a custom replacer function to protect against circular references.

  return JSON.stringify(data, function (key, value) {
    if (backend_utils_typeof(value) === 'object' && value !== null) {
      if (cache.has(value)) {
        return;
      }

      cache.add(value);
    }

    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    }

    return value;
  }, 2);
} // NOTE: KEEP IN SYNC with src/hook.js
// Formats an array of args with a style for console methods, using
// the following algorithm:
//     1. The first param is a string that contains %c
//          - Bail out and return the args without modifying the styles.
//            We don't want to affect styles that the developer deliberately set.
//     2. The first param is a string that doesn't contain %c but contains
//        string formatting
//          - [`%c${args[0]}`, style, ...args.slice(1)]
//          - Note: we assume that the string formatting that the developer uses
//            is correct.
//     3. The first param is a string that doesn't contain string formatting
//        OR is not a string
//          - Create a formatting string where:
//                 boolean, string, symbol -> %s
//                 number -> %f OR %i depending on if it's an int or float
//                 default -> %o

function formatWithStyles(inputArgs, style) {
  if (inputArgs === undefined || inputArgs === null || inputArgs.length === 0 || // Matches any of %c but not %%c
  typeof inputArgs[0] === 'string' && inputArgs[0].match(/([^%]|^)(%c)/g) || style === undefined) {
    return inputArgs;
  } // Matches any of %(o|O|d|i|s|f), but not %%(o|O|d|i|s|f)


  var REGEXP = /([^%]|^)((%%)*)(%([oOdisf]))/g;

  if (typeof inputArgs[0] === 'string' && inputArgs[0].match(REGEXP)) {
    return ["%c".concat(inputArgs[0]), style].concat(utils_toConsumableArray(inputArgs.slice(1)));
  } else {
    var firstArg = inputArgs.reduce(function (formatStr, elem, i) {
      if (i > 0) {
        formatStr += ' ';
      }

      switch (backend_utils_typeof(elem)) {
        case 'string':
        case 'boolean':
        case 'symbol':
          return formatStr += '%s';

        case 'number':
          var formatting = Number.isInteger(elem) ? '%i' : '%f';
          return formatStr += formatting;

        default:
          return formatStr += '%o';
      }
    }, '%c');
    return [firstArg, style].concat(utils_toConsumableArray(inputArgs));
  }
} // NOTE: KEEP IN SYNC with src/hook.js
// Skips CSS and object arguments, inlines other in the first argument as a template string

function formatConsoleArguments(maybeMessage) {
  for (var _len = arguments.length, inputArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    inputArgs[_key - 1] = arguments[_key];
  }

  if (inputArgs.length === 0 || typeof maybeMessage !== 'string') {
    return [maybeMessage].concat(inputArgs);
  }

  var args = inputArgs.slice();
  var template = '';
  var argumentsPointer = 0;

  for (var i = 0; i < maybeMessage.length; ++i) {
    var currentChar = maybeMessage[i];

    if (currentChar !== '%') {
      template += currentChar;
      continue;
    }

    var nextChar = maybeMessage[i + 1];
    ++i; // Only keep CSS and objects, inline other arguments

    switch (nextChar) {
      case 'c':
      case 'O':
      case 'o':
        {
          ++argumentsPointer;
          template += "%".concat(nextChar);
          break;
        }

      case 'd':
      case 'i':
        {
          var _args$splice = args.splice(argumentsPointer, 1),
              _args$splice2 = utils_slicedToArray(_args$splice, 1),
              arg = _args$splice2[0];

          template += parseInt(arg, 10).toString();
          break;
        }

      case 'f':
        {
          var _args$splice3 = args.splice(argumentsPointer, 1),
              _args$splice4 = utils_slicedToArray(_args$splice3, 1),
              _arg = _args$splice4[0];

          template += parseFloat(_arg).toString();
          break;
        }

      case 's':
        {
          var _args$splice5 = args.splice(argumentsPointer, 1),
              _args$splice6 = utils_slicedToArray(_args$splice5, 1),
              _arg2 = _args$splice6[0];

          template += _arg2.toString();
          break;
        }

      default:
        template += "%".concat(nextChar);
    }
  }

  return [template].concat(utils_toConsumableArray(args));
} // based on https://github.com/tmpfs/format-util/blob/0e62d430efb0a1c51448709abd3e2406c14d8401/format.js#L1
// based on https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
// Implements s, d, i and f placeholders

function formatConsoleArgumentsToSingleString(maybeMessage) {
  for (var _len2 = arguments.length, inputArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    inputArgs[_key2 - 1] = arguments[_key2];
  }

  var args = inputArgs.slice();
  var formatted = String(maybeMessage); // If the first argument is a string, check for substitutions.

  if (typeof maybeMessage === 'string') {
    if (args.length) {
      var REGEXP = /(%?)(%([jds]))/g;
      formatted = formatted.replace(REGEXP, function (match, escaped, ptn, flag) {
        var arg = args.shift();

        switch (flag) {
          case 's':
            arg += '';
            break;

          case 'd':
          case 'i':
            arg = parseInt(arg, 10).toString();
            break;

          case 'f':
            arg = parseFloat(arg).toString();
            break;
        }

        if (!escaped) {
          return arg;
        }

        args.unshift(arg);
        return match;
      });
    }
  } // Arguments that remain after formatting.


  if (args.length) {
    for (var i = 0; i < args.length; i++) {
      formatted += ' ' + String(args[i]);
    }
  } // Update escaped %% values.


  formatted = formatted.replace(/%{2,2}/g, '%');
  return String(formatted);
}
function isSynchronousXHRSupported() {
  return !!(window.document && window.document.featurePolicy && window.document.featurePolicy.allowsFeature('sync-xhr'));
}
function gt() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return compareVersions(a, b) === 1;
}
function gte() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return compareVersions(a, b) > -1;
}
var isReactNativeEnvironment = function isReactNativeEnvironment() {
  // We've been relying on this for such a long time
  // We should probably define the client for DevTools on the backend side and share it with the frontend
  return window.document == null;
};

function extractLocation(url) {
  if (url.indexOf(':') === -1) {
    return null;
  } // remove any parentheses from start and end


  var withoutParentheses = url.replace(/^\(+/, '').replace(/\)+$/, '');
  var locationParts = /(at )?(.+?)(?::(\d+))?(?::(\d+))?$/.exec(withoutParentheses);

  if (locationParts == null) {
    return null;
  }

  var _locationParts = utils_slicedToArray(locationParts, 5),
      sourceURL = _locationParts[2],
      line = _locationParts[3],
      column = _locationParts[4];

  return {
    sourceURL: sourceURL,
    line: line,
    column: column
  };
}

var CHROME_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;

function parseSourceFromChromeStack(stack) {
  var frames = stack.split('\n'); // eslint-disable-next-line no-for-of-loops/no-for-of-loops

  var _iterator = _createForOfIteratorHelper(frames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var frame = _step.value;
      var sanitizedFrame = frame.trim();
      var locationInParenthesesMatch = sanitizedFrame.match(/ (\(.+\)$)/);
      var possibleLocation = locationInParenthesesMatch ? locationInParenthesesMatch[1] : sanitizedFrame;
      var location = extractLocation(possibleLocation); // Continue the search until at least sourceURL is found

      if (location == null) {
        continue;
      }

      var sourceURL = location.sourceURL,
          _location$line = location.line,
          line = _location$line === void 0 ? '1' : _location$line,
          _location$column = location.column,
          column = _location$column === void 0 ? '1' : _location$column;
      return {
        sourceURL: sourceURL,
        line: parseInt(line, 10),
        column: parseInt(column, 10)
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
}

function parseSourceFromFirefoxStack(stack) {
  var frames = stack.split('\n'); // eslint-disable-next-line no-for-of-loops/no-for-of-loops

  var _iterator2 = _createForOfIteratorHelper(frames),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var frame = _step2.value;
      var sanitizedFrame = frame.trim();
      var frameWithoutFunctionName = sanitizedFrame.replace(/((.*".+"[^@]*)?[^@]*)(?:@)/, '');
      var location = extractLocation(frameWithoutFunctionName); // Continue the search until at least sourceURL is found

      if (location == null) {
        continue;
      }

      var sourceURL = location.sourceURL,
          _location$line2 = location.line,
          line = _location$line2 === void 0 ? '1' : _location$line2,
          _location$column2 = location.column,
          column = _location$column2 === void 0 ? '1' : _location$column2;
      return {
        sourceURL: sourceURL,
        line: parseInt(line, 10),
        column: parseInt(column, 10)
      };
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return null;
}

function parseSourceFromComponentStack(componentStack) {
  if (componentStack.match(CHROME_STACK_REGEXP)) {
    return parseSourceFromChromeStack(componentStack);
  }

  return parseSourceFromFirefoxStack(componentStack);
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/utils.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// Get the window object for the document that a node belongs to,
// or return null if it cannot be found (node not attached to DOM,
// etc).
function getOwnerWindow(node) {
  if (!node.ownerDocument) {
    return null;
  }

  return node.ownerDocument.defaultView;
} // Get the iframe containing a node, or return null if it cannot
// be found (node not within iframe, etc).

function getOwnerIframe(node) {
  var nodeWindow = getOwnerWindow(node);

  if (nodeWindow) {
    return nodeWindow.frameElement;
  }

  return null;
} // Get a bounding client rect for a node, with an
// offset added to compensate for its border.

function getBoundingClientRectWithBorderOffset(node) {
  var dimensions = getElementDimensions(node);
  return mergeRectOffsets([node.getBoundingClientRect(), {
    top: dimensions.borderTop,
    left: dimensions.borderLeft,
    bottom: dimensions.borderBottom,
    right: dimensions.borderRight,
    // This width and height won't get used by mergeRectOffsets (since this
    // is not the first rect in the array), but we set them so that this
    // object type checks as a ClientRect.
    width: 0,
    height: 0
  }]);
} // Add together the top, left, bottom, and right properties of
// each ClientRect, but keep the width and height of the first one.

function mergeRectOffsets(rects) {
  return rects.reduce(function (previousRect, rect) {
    if (previousRect == null) {
      return rect;
    }

    return {
      top: previousRect.top + rect.top,
      left: previousRect.left + rect.left,
      width: previousRect.width,
      height: previousRect.height,
      bottom: previousRect.bottom + rect.bottom,
      right: previousRect.right + rect.right
    };
  });
} // Calculate a boundingClientRect for a node relative to boundaryWindow,
// taking into account any offsets caused by intermediate iframes.

function getNestedBoundingClientRect(node, boundaryWindow) {
  var ownerIframe = getOwnerIframe(node);

  if (ownerIframe && ownerIframe !== boundaryWindow) {
    var rects = [node.getBoundingClientRect()];
    var currentIframe = ownerIframe;
    var onlyOneMore = false;

    while (currentIframe) {
      var rect = getBoundingClientRectWithBorderOffset(currentIframe);
      rects.push(rect);
      currentIframe = getOwnerIframe(currentIframe);

      if (onlyOneMore) {
        break;
      } // We don't want to calculate iframe offsets upwards beyond
      // the iframe containing the boundaryWindow, but we
      // need to calculate the offset relative to the boundaryWindow.


      if (currentIframe && getOwnerWindow(currentIframe) === boundaryWindow) {
        onlyOneMore = true;
      }
    }

    return mergeRectOffsets(rects);
  } else {
    return node.getBoundingClientRect();
  }
}
function getElementDimensions(domElement) {
  var calculatedStyle = window.getComputedStyle(domElement);
  return {
    borderLeft: parseInt(calculatedStyle.borderLeftWidth, 10),
    borderRight: parseInt(calculatedStyle.borderRightWidth, 10),
    borderTop: parseInt(calculatedStyle.borderTopWidth, 10),
    borderBottom: parseInt(calculatedStyle.borderBottomWidth, 10),
    marginLeft: parseInt(calculatedStyle.marginLeft, 10),
    marginRight: parseInt(calculatedStyle.marginRight, 10),
    marginTop: parseInt(calculatedStyle.marginTop, 10),
    marginBottom: parseInt(calculatedStyle.marginBottom, 10),
    paddingLeft: parseInt(calculatedStyle.paddingLeft, 10),
    paddingRight: parseInt(calculatedStyle.paddingRight, 10),
    paddingTop: parseInt(calculatedStyle.paddingTop, 10),
    paddingBottom: parseInt(calculatedStyle.paddingBottom, 10)
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/Highlighter/Overlay.js
function Overlay_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Overlay_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Overlay_createClass(Constructor, protoProps, staticProps) { if (protoProps) Overlay_defineProperties(Constructor.prototype, protoProps); if (staticProps) Overlay_defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var Overlay_assign = Object.assign; // Note that the Overlay components are not affected by the active Theme,
// because they highlight elements in the main Chrome window (outside of devtools).
// The colors below were chosen to roughly match those used by Chrome devtools.

var OverlayRect = /*#__PURE__*/function () {
  function OverlayRect(doc, container) {
    Overlay_classCallCheck(this, OverlayRect);

    this.node = doc.createElement('div');
    this.border = doc.createElement('div');
    this.padding = doc.createElement('div');
    this.content = doc.createElement('div');
    this.border.style.borderColor = overlayStyles.border;
    this.padding.style.borderColor = overlayStyles.padding;
    this.content.style.backgroundColor = overlayStyles.background;
    Overlay_assign(this.node.style, {
      borderColor: overlayStyles.margin,
      pointerEvents: 'none',
      position: 'fixed'
    });
    this.node.style.zIndex = '10000000';
    this.node.appendChild(this.border);
    this.border.appendChild(this.padding);
    this.padding.appendChild(this.content);
    container.appendChild(this.node);
  }

  Overlay_createClass(OverlayRect, [{
    key: "remove",
    value: function remove() {
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    }
  }, {
    key: "update",
    value: function update(box, dims) {
      boxWrap(dims, 'margin', this.node);
      boxWrap(dims, 'border', this.border);
      boxWrap(dims, 'padding', this.padding);
      Overlay_assign(this.content.style, {
        height: box.height - dims.borderTop - dims.borderBottom - dims.paddingTop - dims.paddingBottom + 'px',
        width: box.width - dims.borderLeft - dims.borderRight - dims.paddingLeft - dims.paddingRight + 'px'
      });
      Overlay_assign(this.node.style, {
        top: box.top - dims.marginTop + 'px',
        left: box.left - dims.marginLeft + 'px'
      });
    }
  }]);

  return OverlayRect;
}();

var OverlayTip = /*#__PURE__*/function () {
  function OverlayTip(doc, container) {
    Overlay_classCallCheck(this, OverlayTip);

    this.tip = doc.createElement('div');
    Overlay_assign(this.tip.style, {
      display: 'flex',
      flexFlow: 'row nowrap',
      backgroundColor: '#333740',
      borderRadius: '2px',
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
      fontWeight: 'bold',
      padding: '3px 5px',
      pointerEvents: 'none',
      position: 'fixed',
      fontSize: '12px',
      whiteSpace: 'nowrap'
    });
    this.nameSpan = doc.createElement('span');
    this.tip.appendChild(this.nameSpan);
    Overlay_assign(this.nameSpan.style, {
      color: '#ee78e6',
      borderRight: '1px solid #aaaaaa',
      paddingRight: '0.5rem',
      marginRight: '0.5rem'
    });
    this.dimSpan = doc.createElement('span');
    this.tip.appendChild(this.dimSpan);
    Overlay_assign(this.dimSpan.style, {
      color: '#d7d7d7'
    });
    this.tip.style.zIndex = '10000000';
    container.appendChild(this.tip);
  }

  Overlay_createClass(OverlayTip, [{
    key: "remove",
    value: function remove() {
      if (this.tip.parentNode) {
        this.tip.parentNode.removeChild(this.tip);
      }
    }
  }, {
    key: "updateText",
    value: function updateText(name, width, height) {
      this.nameSpan.textContent = name;
      this.dimSpan.textContent = Math.round(width) + 'px × ' + Math.round(height) + 'px';
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(dims, bounds) {
      var tipRect = this.tip.getBoundingClientRect();
      var tipPos = findTipPos(dims, bounds, {
        width: tipRect.width,
        height: tipRect.height
      });
      Overlay_assign(this.tip.style, tipPos.style);
    }
  }]);

  return OverlayTip;
}();

var Overlay = /*#__PURE__*/function () {
  function Overlay(agent) {
    Overlay_classCallCheck(this, Overlay);

    // Find the root window, because overlays are positioned relative to it.
    var currentWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
    this.window = currentWindow; // When opened in shells/dev, the tooltip should be bound by the app iframe, not by the topmost window.

    var tipBoundsWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
    this.tipBoundsWindow = tipBoundsWindow;
    var doc = currentWindow.document;
    this.container = doc.createElement('div');
    this.container.style.zIndex = '10000000';
    this.tip = new OverlayTip(doc, this.container);
    this.rects = [];
    this.agent = agent;
    doc.body.appendChild(this.container);
  }

  Overlay_createClass(Overlay, [{
    key: "remove",
    value: function remove() {
      this.tip.remove();
      this.rects.forEach(function (rect) {
        rect.remove();
      });
      this.rects.length = 0;

      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }, {
    key: "inspect",
    value: function inspect(nodes, name) {
      var _this = this;

      // We can't get the size of text nodes or comment nodes. React as of v15
      // heavily uses comment nodes to delimit text.
      var elements = nodes.filter(function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
      });

      while (this.rects.length > elements.length) {
        var rect = this.rects.pop();
        rect.remove();
      }

      if (elements.length === 0) {
        return;
      }

      while (this.rects.length < elements.length) {
        this.rects.push(new OverlayRect(this.window.document, this.container));
      }

      var outerBox = {
        top: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
        bottom: Number.NEGATIVE_INFINITY,
        left: Number.POSITIVE_INFINITY
      };
      elements.forEach(function (element, index) {
        var box = getNestedBoundingClientRect(element, _this.window);
        var dims = getElementDimensions(element);
        outerBox.top = Math.min(outerBox.top, box.top - dims.marginTop);
        outerBox.right = Math.max(outerBox.right, box.left + box.width + dims.marginRight);
        outerBox.bottom = Math.max(outerBox.bottom, box.top + box.height + dims.marginBottom);
        outerBox.left = Math.min(outerBox.left, box.left - dims.marginLeft);
        var rect = _this.rects[index];
        rect.update(box, dims);
      });

      if (!name) {
        name = elements[0].nodeName.toLowerCase();
        var node = elements[0];
        var rendererInterface = this.agent.getBestMatchingRendererInterface(node);

        if (rendererInterface) {
          var id = rendererInterface.getFiberIDForNative(node, true);

          if (id) {
            var ownerName = rendererInterface.getDisplayNameForFiberID(id, true);

            if (ownerName) {
              name += ' (in ' + ownerName + ')';
            }
          }
        }
      }

      this.tip.updateText(name, outerBox.right - outerBox.left, outerBox.bottom - outerBox.top);
      var tipBounds = getNestedBoundingClientRect(this.tipBoundsWindow.document.documentElement, this.window);
      this.tip.updatePosition({
        top: outerBox.top,
        left: outerBox.left,
        height: outerBox.bottom - outerBox.top,
        width: outerBox.right - outerBox.left
      }, {
        top: tipBounds.top + this.tipBoundsWindow.scrollY,
        left: tipBounds.left + this.tipBoundsWindow.scrollX,
        height: this.tipBoundsWindow.innerHeight,
        width: this.tipBoundsWindow.innerWidth
      });
    }
  }]);

  return Overlay;
}();



function findTipPos(dims, bounds, tipSize) {
  var tipHeight = Math.max(tipSize.height, 20);
  var tipWidth = Math.max(tipSize.width, 60);
  var margin = 5;
  var top;

  if (dims.top + dims.height + tipHeight <= bounds.top + bounds.height) {
    if (dims.top + dims.height < bounds.top + 0) {
      top = bounds.top + margin;
    } else {
      top = dims.top + dims.height + margin;
    }
  } else if (dims.top - tipHeight <= bounds.top + bounds.height) {
    if (dims.top - tipHeight - margin < bounds.top + margin) {
      top = bounds.top + margin;
    } else {
      top = dims.top - tipHeight - margin;
    }
  } else {
    top = bounds.top + bounds.height - tipHeight - margin;
  }

  var left = dims.left + margin;

  if (dims.left < bounds.left) {
    left = bounds.left + margin;
  }

  if (dims.left + tipWidth > bounds.left + bounds.width) {
    left = bounds.left + bounds.width - tipWidth - margin;
  }

  top += 'px';
  left += 'px';
  return {
    style: {
      top: top,
      left: left
    }
  };
}

function boxWrap(dims, what, node) {
  Overlay_assign(node.style, {
    borderTopWidth: dims[what + 'Top'] + 'px',
    borderLeftWidth: dims[what + 'Left'] + 'px',
    borderRightWidth: dims[what + 'Right'] + 'px',
    borderBottomWidth: dims[what + 'Bottom'] + 'px',
    borderStyle: 'solid'
  });
}

var overlayStyles = {
  background: 'rgba(120, 170, 210, 0.7)',
  padding: 'rgba(77, 200, 0, 0.3)',
  margin: 'rgba(255, 155, 0, 0.3)',
  border: 'rgba(255, 200, 50, 0.3)'
};
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/Highlighter/Highlighter.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


var SHOW_DURATION = 2000;
var timeoutID = null;
var overlay = null;

function hideOverlayNative(agent) {
  agent.emit('hideNativeHighlight');
}

function hideOverlayWeb() {
  timeoutID = null;

  if (overlay !== null) {
    overlay.remove();
    overlay = null;
  }
}

function hideOverlay(agent) {
  return isReactNativeEnvironment() ? hideOverlayNative(agent) : hideOverlayWeb();
}

function showOverlayNative(elements, agent) {
  agent.emit('showNativeHighlight', elements);
}

function showOverlayWeb(elements, componentName, agent, hideAfterTimeout) {
  if (timeoutID !== null) {
    clearTimeout(timeoutID);
  }

  if (overlay === null) {
    overlay = new Overlay(agent);
  }

  overlay.inspect(elements, componentName);

  if (hideAfterTimeout) {
    timeoutID = setTimeout(function () {
      return hideOverlay(agent);
    }, SHOW_DURATION);
  }
}

function showOverlay(elements, componentName, agent, hideAfterTimeout) {
  return isReactNativeEnvironment() ? showOverlayNative(elements, agent) : showOverlayWeb(elements, componentName, agent, hideAfterTimeout);
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/Highlighter/index.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




// This plug-in provides in-page highlighting of the selected element.
// It is used by the browser extension and the standalone DevTools shell (when connected to a browser).
// It is not currently the mechanism used to highlight React Native views.
// That is done by the React Native Inspector component.
var iframesListeningTo = new Set();
function setupHighlighter(bridge, agent) {
  bridge.addListener('clearNativeElementHighlight', clearNativeElementHighlight);
  bridge.addListener('highlightNativeElement', highlightNativeElement);
  bridge.addListener('shutdown', stopInspectingNative);
  bridge.addListener('startInspectingNative', startInspectingNative);
  bridge.addListener('stopInspectingNative', stopInspectingNative);

  function startInspectingNative() {
    registerListenersOnWindow(window);
  }

  function registerListenersOnWindow(window) {
    // This plug-in may run in non-DOM environments (e.g. React Native).
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('click', onClick, true);
      window.addEventListener('mousedown', onMouseEvent, true);
      window.addEventListener('mouseover', onMouseEvent, true);
      window.addEventListener('mouseup', onMouseEvent, true);
      window.addEventListener('pointerdown', onPointerDown, true);
      window.addEventListener('pointermove', onPointerMove, true);
      window.addEventListener('pointerup', onPointerUp, true);
    } else {
      agent.emit('startInspectingNative');
    }
  }

  function stopInspectingNative() {
    hideOverlay(agent);
    removeListenersOnWindow(window);
    iframesListeningTo.forEach(function (frame) {
      try {
        removeListenersOnWindow(frame.contentWindow);
      } catch (error) {// This can error when the iframe is on a cross-origin.
      }
    });
    iframesListeningTo = new Set();
  }

  function removeListenersOnWindow(window) {
    // This plug-in may run in non-DOM environments (e.g. React Native).
    if (window && typeof window.removeEventListener === 'function') {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('mousedown', onMouseEvent, true);
      window.removeEventListener('mouseover', onMouseEvent, true);
      window.removeEventListener('mouseup', onMouseEvent, true);
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('pointermove', onPointerMove, true);
      window.removeEventListener('pointerup', onPointerUp, true);
    } else {
      agent.emit('stopInspectingNative');
    }
  }

  function clearNativeElementHighlight() {
    hideOverlay(agent);
  }

  function highlightNativeElement(_ref) {
    var displayName = _ref.displayName,
        hideAfterTimeout = _ref.hideAfterTimeout,
        id = _ref.id,
        openNativeElementsPanel = _ref.openNativeElementsPanel,
        rendererID = _ref.rendererID,
        scrollIntoView = _ref.scrollIntoView;
    var renderer = agent.rendererInterfaces[rendererID];

    if (renderer == null) {
      console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      hideOverlay(agent);
      return;
    } // In some cases fiber may already be unmounted


    if (!renderer.hasFiberWithId(id)) {
      hideOverlay(agent);
      return;
    }

    var nodes = renderer.findNativeNodesForFiberID(id);

    if (nodes != null && nodes[0] != null) {
      var node = nodes[0]; // $FlowFixMe[method-unbinding]

      if (scrollIntoView && typeof node.scrollIntoView === 'function') {
        // If the node isn't visible show it before highlighting it.
        // We may want to reconsider this; it might be a little disruptive.
        node.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }

      showOverlay(nodes, displayName, agent, hideAfterTimeout);

      if (openNativeElementsPanel) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 = node;
        bridge.send('syncSelectionToNativeElementsPanel');
      }
    } else {
      hideOverlay(agent);
    }
  }

  function onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    stopInspectingNative();
    bridge.send('stopInspectingNative', true);
  }

  function onMouseEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onPointerDown(event) {
    event.preventDefault();
    event.stopPropagation();
    selectFiberForNode(getEventTarget(event));
  }

  var lastHoveredNode = null;

  function onPointerMove(event) {
    event.preventDefault();
    event.stopPropagation();
    var target = getEventTarget(event);
    if (lastHoveredNode === target) return;
    lastHoveredNode = target;

    if (target.tagName === 'IFRAME') {
      var iframe = target;

      try {
        if (!iframesListeningTo.has(iframe)) {
          var _window = iframe.contentWindow;
          registerListenersOnWindow(_window);
          iframesListeningTo.add(iframe);
        }
      } catch (error) {// This can error when the iframe is on a cross-origin.
      }
    } // Don't pass the name explicitly.
    // It will be inferred from DOM tag and Fiber owner.


    showOverlay([target], null, agent, false);
    selectFiberForNode(target);
  }

  function onPointerUp(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  var selectFiberForNode = lodash_throttle_default()(esm(function (node) {
    var id = agent.getIDForNode(node);

    if (id !== null) {
      bridge.send('selectFiber', id);
    }
  }), 200, // Don't change the selection in the very first 200ms
  // because those are usually unintentional as you lift the cursor.
  {
    leading: false
  });

  function getEventTarget(event) {
    if (event.composed) {
      return event.composedPath()[0];
    }

    return event.target;
  }
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/TraceUpdates/canvas.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var OUTLINE_COLOR = '#f0f0f0'; // Note these colors are in sync with DevTools Profiler chart colors.

var COLORS = ['#37afa9', '#63b19e', '#80b393', '#97b488', '#abb67d', '#beb771', '#cfb965', '#dfba57', '#efbb49', '#febc38'];
var canvas = null;

function drawNative(nodeToData, agent) {
  var nodesToDraw = [];
  iterateNodes(nodeToData, function (_, color, node) {
    nodesToDraw.push({
      node: node,
      color: color
    });
  });
  agent.emit('drawTraceUpdates', nodesToDraw);
}

function drawWeb(nodeToData) {
  if (canvas === null) {
    initialize();
  }

  var canvasFlow = canvas;
  canvasFlow.width = window.innerWidth;
  canvasFlow.height = window.innerHeight;
  var context = canvasFlow.getContext('2d');
  context.clearRect(0, 0, canvasFlow.width, canvasFlow.height);
  iterateNodes(nodeToData, function (rect, color) {
    if (rect !== null) {
      drawBorder(context, rect, color);
    }
  });
}

function draw(nodeToData, agent) {
  return isReactNativeEnvironment() ? drawNative(nodeToData, agent) : drawWeb(nodeToData);
}

function iterateNodes(nodeToData, execute) {
  nodeToData.forEach(function (_ref, node) {
    var count = _ref.count,
        rect = _ref.rect;
    var colorIndex = Math.min(COLORS.length - 1, count - 1);
    var color = COLORS[colorIndex];
    execute(rect, color, node);
  });
}

function drawBorder(context, rect, color) {
  var height = rect.height,
      left = rect.left,
      top = rect.top,
      width = rect.width; // outline

  context.lineWidth = 1;
  context.strokeStyle = OUTLINE_COLOR;
  context.strokeRect(left - 1, top - 1, width + 2, height + 2); // inset

  context.lineWidth = 1;
  context.strokeStyle = OUTLINE_COLOR;
  context.strokeRect(left + 1, top + 1, width - 1, height - 1);
  context.strokeStyle = color;
  context.setLineDash([0]); // border

  context.lineWidth = 1;
  context.strokeRect(left, top, width - 1, height - 1);
  context.setLineDash([0]);
}

function destroyNative(agent) {
  agent.emit('disableTraceUpdates');
}

function destroyWeb() {
  if (canvas !== null) {
    if (canvas.parentNode != null) {
      canvas.parentNode.removeChild(canvas);
    }

    canvas = null;
  }
}

function destroy(agent) {
  return isReactNativeEnvironment() ? destroyNative(agent) : destroyWeb();
}

function initialize() {
  canvas = window.document.createElement('canvas');
  canvas.style.cssText = "\n    xx-background-color: red;\n    xx-opacity: 0.5;\n    bottom: 0;\n    left: 0;\n    pointer-events: none;\n    position: fixed;\n    right: 0;\n    top: 0;\n    z-index: 1000000000;\n  ";
  var root = window.document.documentElement;
  root.insertBefore(canvas, root.firstChild);
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/views/TraceUpdates/index.js
function TraceUpdates_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TraceUpdates_typeof = function _typeof(obj) { return typeof obj; }; } else { TraceUpdates_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TraceUpdates_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// How long the rect should be shown for?
var DISPLAY_DURATION = 250; // What's the longest we are willing to show the overlay for?
// This can be important if we're getting a flurry of events (e.g. scroll update).

var MAX_DISPLAY_DURATION = 3000; // How long should a rect be considered valid for?

var REMEASUREMENT_AFTER_DURATION = 250; // Some environments (e.g. React Native / Hermes) don't support the performance API yet.

var getCurrentTime = // $FlowFixMe[method-unbinding]
(typeof performance === "undefined" ? "undefined" : TraceUpdates_typeof(performance)) === 'object' && typeof performance.now === 'function' ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
var nodeToData = new Map();
var agent = null;
var drawAnimationFrameID = null;
var isEnabled = false;
var redrawTimeoutID = null;
function TraceUpdates_initialize(injectedAgent) {
  agent = injectedAgent;
  agent.addListener('traceUpdates', traceUpdates);
}
function toggleEnabled(value) {
  isEnabled = value;

  if (!isEnabled) {
    nodeToData.clear();

    if (drawAnimationFrameID !== null) {
      cancelAnimationFrame(drawAnimationFrameID);
      drawAnimationFrameID = null;
    }

    if (redrawTimeoutID !== null) {
      clearTimeout(redrawTimeoutID);
      redrawTimeoutID = null;
    }

    destroy(agent);
  }
}

function traceUpdates(nodes) {
  if (!isEnabled) {
    return;
  }

  nodes.forEach(function (node) {
    var data = nodeToData.get(node);
    var now = getCurrentTime();
    var lastMeasuredAt = data != null ? data.lastMeasuredAt : 0;
    var rect = data != null ? data.rect : null;

    if (rect === null || lastMeasuredAt + REMEASUREMENT_AFTER_DURATION < now) {
      lastMeasuredAt = now;
      rect = measureNode(node);
    }

    nodeToData.set(node, {
      count: data != null ? data.count + 1 : 1,
      expirationTime: data != null ? Math.min(now + MAX_DISPLAY_DURATION, data.expirationTime + DISPLAY_DURATION) : now + DISPLAY_DURATION,
      lastMeasuredAt: lastMeasuredAt,
      rect: rect
    });
  });

  if (redrawTimeoutID !== null) {
    clearTimeout(redrawTimeoutID);
    redrawTimeoutID = null;
  }

  if (drawAnimationFrameID === null) {
    drawAnimationFrameID = requestAnimationFrame(prepareToDraw);
  }
}

function prepareToDraw() {
  drawAnimationFrameID = null;
  redrawTimeoutID = null;
  var now = getCurrentTime();
  var earliestExpiration = Number.MAX_VALUE; // Remove any items that have already expired.

  nodeToData.forEach(function (data, node) {
    if (data.expirationTime < now) {
      nodeToData.delete(node);
    } else {
      earliestExpiration = Math.min(earliestExpiration, data.expirationTime);
    }
  });
  draw(nodeToData, agent);

  if (earliestExpiration !== Number.MAX_VALUE) {
    redrawTimeoutID = setTimeout(prepareToDraw, earliestExpiration - now);
  }
}

function measureNode(node) {
  if (!node || typeof node.getBoundingClientRect !== 'function') {
    return null;
  }

  var currentWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
  return getNestedBoundingClientRect(node, currentWindow);
}
// EXTERNAL MODULE: ../../build/oss-experimental/react-debug-tools/index.js
var react_debug_tools = __webpack_require__(987);
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/ReactSymbols.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This list should be kept updated to reflect additions to 'shared/ReactSymbols'.
// DevTools can't import symbols from 'shared/ReactSymbols' directly for two reasons:
// 1. DevTools requires symbols which may have been deleted in more recent versions (e.g. concurrent mode)
// 2. DevTools must support both Symbol and numeric forms of each symbol;
//    Since e.g. standalone DevTools runs in a separate process, it can't rely on its own ES capabilities.
var CONCURRENT_MODE_NUMBER = 0xeacf;
var CONCURRENT_MODE_SYMBOL_STRING = 'Symbol(react.concurrent_mode)';
var CONTEXT_NUMBER = 0xeace;
var CONTEXT_SYMBOL_STRING = 'Symbol(react.context)';
var SERVER_CONTEXT_SYMBOL_STRING = 'Symbol(react.server_context)';
var DEPRECATED_ASYNC_MODE_SYMBOL_STRING = 'Symbol(react.async_mode)';
var ELEMENT_SYMBOL_STRING = 'Symbol(react.transitional.element)';
var LEGACY_ELEMENT_NUMBER = 0xeac7;
var LEGACY_ELEMENT_SYMBOL_STRING = 'Symbol(react.element)';
var DEBUG_TRACING_MODE_NUMBER = 0xeae1;
var DEBUG_TRACING_MODE_SYMBOL_STRING = 'Symbol(react.debug_trace_mode)';
var FORWARD_REF_NUMBER = 0xead0;
var FORWARD_REF_SYMBOL_STRING = 'Symbol(react.forward_ref)';
var FRAGMENT_NUMBER = 0xeacb;
var FRAGMENT_SYMBOL_STRING = 'Symbol(react.fragment)';
var LAZY_NUMBER = 0xead4;
var LAZY_SYMBOL_STRING = 'Symbol(react.lazy)';
var MEMO_NUMBER = 0xead3;
var MEMO_SYMBOL_STRING = 'Symbol(react.memo)';
var PORTAL_NUMBER = 0xeaca;
var PORTAL_SYMBOL_STRING = 'Symbol(react.portal)';
var PROFILER_NUMBER = 0xead2;
var PROFILER_SYMBOL_STRING = 'Symbol(react.profiler)';
var PROVIDER_NUMBER = 0xeacd;
var PROVIDER_SYMBOL_STRING = 'Symbol(react.provider)';
var CONSUMER_SYMBOL_STRING = 'Symbol(react.consumer)';
var SCOPE_NUMBER = 0xead7;
var SCOPE_SYMBOL_STRING = 'Symbol(react.scope)';
var STRICT_MODE_NUMBER = 0xeacc;
var STRICT_MODE_SYMBOL_STRING = 'Symbol(react.strict_mode)';
var SUSPENSE_NUMBER = 0xead1;
var SUSPENSE_SYMBOL_STRING = 'Symbol(react.suspense)';
var SUSPENSE_LIST_NUMBER = 0xead8;
var SUSPENSE_LIST_SYMBOL_STRING = 'Symbol(react.suspense_list)';
var SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED_SYMBOL_STRING = 'Symbol(react.server_context.defaultValue)';
var ReactSymbols_REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
;// CONCATENATED MODULE: ../react-devtools-shared/src/config/DevToolsFeatureFlags.core-oss.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/************************************************************************
 * This file is forked between different DevTools implementations.
 * It should never be imported directly!
 * It should always be imported from "react-devtools-feature-flags".
 ************************************************************************/
var enableLogger = false;
var enableStyleXFeatures = false;
var isInternalFacebookBuild = false;
/************************************************************************
 * Do not edit the code below.
 * It ensures this fork exports the same types as the default flags file.
 ************************************************************************/

// Flow magic to verify the exports of this file match the original version.
null;
;// CONCATENATED MODULE: ../shared/objectIs.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = // $FlowFixMe[method-unbinding]
typeof Object.is === 'function' ? Object.is : is;
/* harmony default export */ const shared_objectIs = (objectIs);
;// CONCATENATED MODULE: ../shared/hasOwnProperty.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// $FlowFixMe[method-unbinding]
var hasOwnProperty_hasOwnProperty = Object.prototype.hasOwnProperty;
/* harmony default export */ const shared_hasOwnProperty = (hasOwnProperty_hasOwnProperty);
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/StyleX/utils.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var cachedStyleNameToValueMap = new Map();
function getStyleXData(data) {
  var sources = new Set();
  var resolvedStyles = {};
  crawlData(data, sources, resolvedStyles);
  return {
    sources: Array.from(sources).sort(),
    resolvedStyles: resolvedStyles
  };
}
function crawlData(data, sources, resolvedStyles) {
  if (data == null) {
    return;
  }

  if (src_isArray(data)) {
    data.forEach(function (entry) {
      if (entry == null) {
        return;
      }

      if (src_isArray(entry)) {
        crawlData(entry, sources, resolvedStyles);
      } else {
        crawlObjectProperties(entry, sources, resolvedStyles);
      }
    });
  } else {
    crawlObjectProperties(data, sources, resolvedStyles);
  }

  resolvedStyles = Object.fromEntries(Object.entries(resolvedStyles).sort());
}

function crawlObjectProperties(entry, sources, resolvedStyles) {
  var keys = Object.keys(entry);
  keys.forEach(function (key) {
    var value = entry[key];

    if (typeof value === 'string') {
      if (key === value) {
        // Special case; this key is the name of the style's source/file/module.
        sources.add(key);
      } else {
        var propertyValue = getPropertyValueForStyleName(value);

        if (propertyValue != null) {
          resolvedStyles[key] = propertyValue;
        }
      }
    } else {
      var nestedStyle = {};
      resolvedStyles[key] = nestedStyle;
      crawlData([value], sources, nestedStyle);
    }
  });
}

function getPropertyValueForStyleName(styleName) {
  if (cachedStyleNameToValueMap.has(styleName)) {
    return cachedStyleNameToValueMap.get(styleName);
  }

  for (var styleSheetIndex = 0; styleSheetIndex < document.styleSheets.length; styleSheetIndex++) {
    var styleSheet = document.styleSheets[styleSheetIndex];
    var rules = null; // this might throw if CORS rules are enforced https://www.w3.org/TR/cssom-1/#the-cssstylesheet-interface

    try {
      rules = styleSheet.cssRules;
    } catch (_e) {
      continue;
    }

    for (var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
      if (!(rules[ruleIndex] instanceof CSSStyleRule)) {
        continue;
      }

      var rule = rules[ruleIndex];
      var cssText = rule.cssText,
          selectorText = rule.selectorText,
          style = rule.style;

      if (selectorText != null) {
        if (selectorText.startsWith(".".concat(styleName))) {
          var match = cssText.match(/{ *([a-z\-]+):/);

          if (match !== null) {
            var property = match[1];
            var value = style.getPropertyValue(property);
            cachedStyleNameToValueMap.set(styleName, value);
            return value;
          } else {
            return null;
          }
        }
      }
    }
  }

  return null;
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/devtools/constants.js
var CHANGE_LOG_URL = 'https://github.com/facebook/react/blob/main/packages/react-devtools/CHANGELOG.md';
var UNSUPPORTED_VERSION_URL = 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html#how-do-i-get-the-old-version-back';
var REACT_DEVTOOLS_WORKPLACE_URL = 'https://fburl.com/react-devtools-workplace-group';
var THEME_STYLES = {
  light: {
    '--color-attribute-name': '#ef6632',
    '--color-attribute-name-not-editable': '#23272f',
    '--color-attribute-name-inverted': 'rgba(255, 255, 255, 0.7)',
    '--color-attribute-value': '#1a1aa6',
    '--color-attribute-value-inverted': '#ffffff',
    '--color-attribute-editable-value': '#1a1aa6',
    '--color-background': '#ffffff',
    '--color-background-hover': 'rgba(0, 136, 250, 0.1)',
    '--color-background-inactive': '#e5e5e5',
    '--color-background-invalid': '#fff0f0',
    '--color-background-selected': '#0088fa',
    '--color-button-background': '#ffffff',
    '--color-button-background-focus': '#ededed',
    '--color-button': '#5f6673',
    '--color-button-disabled': '#cfd1d5',
    '--color-button-active': '#0088fa',
    '--color-button-focus': '#23272f',
    '--color-button-hover': '#23272f',
    '--color-border': '#eeeeee',
    '--color-commit-did-not-render-fill': '#cfd1d5',
    '--color-commit-did-not-render-fill-text': '#000000',
    '--color-commit-did-not-render-pattern': '#cfd1d5',
    '--color-commit-did-not-render-pattern-text': '#333333',
    '--color-commit-gradient-0': '#37afa9',
    '--color-commit-gradient-1': '#63b19e',
    '--color-commit-gradient-2': '#80b393',
    '--color-commit-gradient-3': '#97b488',
    '--color-commit-gradient-4': '#abb67d',
    '--color-commit-gradient-5': '#beb771',
    '--color-commit-gradient-6': '#cfb965',
    '--color-commit-gradient-7': '#dfba57',
    '--color-commit-gradient-8': '#efbb49',
    '--color-commit-gradient-9': '#febc38',
    '--color-commit-gradient-text': '#000000',
    '--color-component-name': '#6a51b2',
    '--color-component-name-inverted': '#ffffff',
    '--color-component-badge-background': '#e6e6e6',
    '--color-component-badge-background-inverted': 'rgba(255, 255, 255, 0.25)',
    '--color-component-badge-count': '#777d88',
    '--color-component-badge-count-inverted': 'rgba(255, 255, 255, 0.7)',
    '--color-console-error-badge-text': '#ffffff',
    '--color-console-error-background': '#fff0f0',
    '--color-console-error-border': '#ffd6d6',
    '--color-console-error-icon': '#eb3941',
    '--color-console-error-text': '#fe2e31',
    '--color-console-warning-badge-text': '#000000',
    '--color-console-warning-background': '#fffbe5',
    '--color-console-warning-border': '#fff5c1',
    '--color-console-warning-icon': '#f4bd00',
    '--color-console-warning-text': '#64460c',
    '--color-context-background': 'rgba(0,0,0,.9)',
    '--color-context-background-hover': 'rgba(255, 255, 255, 0.1)',
    '--color-context-background-selected': '#178fb9',
    '--color-context-border': '#3d424a',
    '--color-context-text': '#ffffff',
    '--color-context-text-selected': '#ffffff',
    '--color-dim': '#777d88',
    '--color-dimmer': '#cfd1d5',
    '--color-dimmest': '#eff0f1',
    '--color-error-background': 'hsl(0, 100%, 97%)',
    '--color-error-border': 'hsl(0, 100%, 92%)',
    '--color-error-text': '#ff0000',
    '--color-expand-collapse-toggle': '#777d88',
    '--color-forget-badge-background': '#2683e2',
    '--color-forget-badge-background-inverted': '#1a6bbc',
    '--color-forget-text': '#fff',
    '--color-link': '#0000ff',
    '--color-modal-background': 'rgba(255, 255, 255, 0.75)',
    '--color-bridge-version-npm-background': '#eff0f1',
    '--color-bridge-version-npm-text': '#000000',
    '--color-bridge-version-number': '#0088fa',
    '--color-primitive-hook-badge-background': '#e5e5e5',
    '--color-primitive-hook-badge-text': '#5f6673',
    '--color-record-active': '#fc3a4b',
    '--color-record-hover': '#3578e5',
    '--color-record-inactive': '#0088fa',
    '--color-resize-bar': '#eeeeee',
    '--color-resize-bar-active': '#dcdcdc',
    '--color-resize-bar-border': '#d1d1d1',
    '--color-resize-bar-dot': '#333333',
    '--color-timeline-internal-module': '#d1d1d1',
    '--color-timeline-internal-module-hover': '#c9c9c9',
    '--color-timeline-internal-module-text': '#444',
    '--color-timeline-native-event': '#ccc',
    '--color-timeline-native-event-hover': '#aaa',
    '--color-timeline-network-primary': '#fcf3dc',
    '--color-timeline-network-primary-hover': '#f0e7d1',
    '--color-timeline-network-secondary': '#efc457',
    '--color-timeline-network-secondary-hover': '#e3ba52',
    '--color-timeline-priority-background': '#f6f6f6',
    '--color-timeline-priority-border': '#eeeeee',
    '--color-timeline-user-timing': '#c9cacd',
    '--color-timeline-user-timing-hover': '#93959a',
    '--color-timeline-react-idle': '#d3e5f6',
    '--color-timeline-react-idle-hover': '#c3d9ef',
    '--color-timeline-react-render': '#9fc3f3',
    '--color-timeline-react-render-hover': '#83afe9',
    '--color-timeline-react-render-text': '#11365e',
    '--color-timeline-react-commit': '#c88ff0',
    '--color-timeline-react-commit-hover': '#b281d6',
    '--color-timeline-react-commit-text': '#3e2c4a',
    '--color-timeline-react-layout-effects': '#b281d6',
    '--color-timeline-react-layout-effects-hover': '#9d71bd',
    '--color-timeline-react-layout-effects-text': '#3e2c4a',
    '--color-timeline-react-passive-effects': '#b281d6',
    '--color-timeline-react-passive-effects-hover': '#9d71bd',
    '--color-timeline-react-passive-effects-text': '#3e2c4a',
    '--color-timeline-react-schedule': '#9fc3f3',
    '--color-timeline-react-schedule-hover': '#2683E2',
    '--color-timeline-react-suspense-rejected': '#f1cc14',
    '--color-timeline-react-suspense-rejected-hover': '#ffdf37',
    '--color-timeline-react-suspense-resolved': '#a6e59f',
    '--color-timeline-react-suspense-resolved-hover': '#89d281',
    '--color-timeline-react-suspense-unresolved': '#c9cacd',
    '--color-timeline-react-suspense-unresolved-hover': '#93959a',
    '--color-timeline-thrown-error': '#ee1638',
    '--color-timeline-thrown-error-hover': '#da1030',
    '--color-timeline-text-color': '#000000',
    '--color-timeline-text-dim-color': '#ccc',
    '--color-timeline-react-work-border': '#eeeeee',
    '--color-search-match': 'yellow',
    '--color-search-match-current': '#f7923b',
    '--color-selected-tree-highlight-active': 'rgba(0, 136, 250, 0.1)',
    '--color-selected-tree-highlight-inactive': 'rgba(0, 0, 0, 0.05)',
    '--color-scroll-caret': 'rgba(150, 150, 150, 0.5)',
    '--color-tab-selected-border': '#0088fa',
    '--color-text': '#000000',
    '--color-text-invalid': '#ff0000',
    '--color-text-selected': '#ffffff',
    '--color-toggle-background-invalid': '#fc3a4b',
    '--color-toggle-background-on': '#0088fa',
    '--color-toggle-background-off': '#cfd1d5',
    '--color-toggle-text': '#ffffff',
    '--color-warning-background': '#fb3655',
    '--color-warning-background-hover': '#f82042',
    '--color-warning-text-color': '#ffffff',
    '--color-warning-text-color-inverted': '#fd4d69',
    // The styles below should be kept in sync with 'root.css'
    // They are repeated there because they're used by e.g. tooltips or context menus
    // which get rendered outside of the DOM subtree (where normal theme/styles are written).
    '--color-scroll-thumb': '#c2c2c2',
    '--color-scroll-track': '#fafafa',
    '--color-tooltip-background': 'rgba(0, 0, 0, 0.9)',
    '--color-tooltip-text': '#ffffff'
  },
  dark: {
    '--color-attribute-name': '#9d87d2',
    '--color-attribute-name-not-editable': '#ededed',
    '--color-attribute-name-inverted': '#282828',
    '--color-attribute-value': '#cedae0',
    '--color-attribute-value-inverted': '#ffffff',
    '--color-attribute-editable-value': 'yellow',
    '--color-background': '#282c34',
    '--color-background-hover': 'rgba(255, 255, 255, 0.1)',
    '--color-background-inactive': '#3d424a',
    '--color-background-invalid': '#5c0000',
    '--color-background-selected': '#178fb9',
    '--color-button-background': '#282c34',
    '--color-button-background-focus': '#3d424a',
    '--color-button': '#afb3b9',
    '--color-button-active': '#61dafb',
    '--color-button-disabled': '#4f5766',
    '--color-button-focus': '#a2e9fc',
    '--color-button-hover': '#ededed',
    '--color-border': '#3d424a',
    '--color-commit-did-not-render-fill': '#777d88',
    '--color-commit-did-not-render-fill-text': '#000000',
    '--color-commit-did-not-render-pattern': '#666c77',
    '--color-commit-did-not-render-pattern-text': '#ffffff',
    '--color-commit-gradient-0': '#37afa9',
    '--color-commit-gradient-1': '#63b19e',
    '--color-commit-gradient-2': '#80b393',
    '--color-commit-gradient-3': '#97b488',
    '--color-commit-gradient-4': '#abb67d',
    '--color-commit-gradient-5': '#beb771',
    '--color-commit-gradient-6': '#cfb965',
    '--color-commit-gradient-7': '#dfba57',
    '--color-commit-gradient-8': '#efbb49',
    '--color-commit-gradient-9': '#febc38',
    '--color-commit-gradient-text': '#000000',
    '--color-component-name': '#61dafb',
    '--color-component-name-inverted': '#282828',
    '--color-component-badge-background': '#5e6167',
    '--color-component-badge-background-inverted': '#46494e',
    '--color-component-badge-count': '#8f949d',
    '--color-component-badge-count-inverted': 'rgba(255, 255, 255, 0.85)',
    '--color-console-error-badge-text': '#000000',
    '--color-console-error-background': '#290000',
    '--color-console-error-border': '#5c0000',
    '--color-console-error-icon': '#eb3941',
    '--color-console-error-text': '#fc7f7f',
    '--color-console-warning-badge-text': '#000000',
    '--color-console-warning-background': '#332b00',
    '--color-console-warning-border': '#665500',
    '--color-console-warning-icon': '#f4bd00',
    '--color-console-warning-text': '#f5f2ed',
    '--color-context-background': 'rgba(255,255,255,.95)',
    '--color-context-background-hover': 'rgba(0, 136, 250, 0.1)',
    '--color-context-background-selected': '#0088fa',
    '--color-context-border': '#eeeeee',
    '--color-context-text': '#000000',
    '--color-context-text-selected': '#ffffff',
    '--color-dim': '#8f949d',
    '--color-dimmer': '#777d88',
    '--color-dimmest': '#4f5766',
    '--color-error-background': '#200',
    '--color-error-border': '#900',
    '--color-error-text': '#f55',
    '--color-expand-collapse-toggle': '#8f949d',
    '--color-forget-badge-background': '#2683e2',
    '--color-forget-badge-background-inverted': '#1a6bbc',
    '--color-forget-text': '#fff',
    '--color-link': '#61dafb',
    '--color-modal-background': 'rgba(0, 0, 0, 0.75)',
    '--color-bridge-version-npm-background': 'rgba(0, 0, 0, 0.25)',
    '--color-bridge-version-npm-text': '#ffffff',
    '--color-bridge-version-number': 'yellow',
    '--color-primitive-hook-badge-background': 'rgba(0, 0, 0, 0.25)',
    '--color-primitive-hook-badge-text': 'rgba(255, 255, 255, 0.7)',
    '--color-record-active': '#fc3a4b',
    '--color-record-hover': '#a2e9fc',
    '--color-record-inactive': '#61dafb',
    '--color-resize-bar': '#282c34',
    '--color-resize-bar-active': '#31363f',
    '--color-resize-bar-border': '#3d424a',
    '--color-resize-bar-dot': '#cfd1d5',
    '--color-timeline-internal-module': '#303542',
    '--color-timeline-internal-module-hover': '#363b4a',
    '--color-timeline-internal-module-text': '#7f8899',
    '--color-timeline-native-event': '#b2b2b2',
    '--color-timeline-native-event-hover': '#949494',
    '--color-timeline-network-primary': '#fcf3dc',
    '--color-timeline-network-primary-hover': '#e3dbc5',
    '--color-timeline-network-secondary': '#efc457',
    '--color-timeline-network-secondary-hover': '#d6af4d',
    '--color-timeline-priority-background': '#1d2129',
    '--color-timeline-priority-border': '#282c34',
    '--color-timeline-user-timing': '#c9cacd',
    '--color-timeline-user-timing-hover': '#93959a',
    '--color-timeline-react-idle': '#3d485b',
    '--color-timeline-react-idle-hover': '#465269',
    '--color-timeline-react-render': '#2683E2',
    '--color-timeline-react-render-hover': '#1a76d4',
    '--color-timeline-react-render-text': '#11365e',
    '--color-timeline-react-commit': '#731fad',
    '--color-timeline-react-commit-hover': '#611b94',
    '--color-timeline-react-commit-text': '#e5c1ff',
    '--color-timeline-react-layout-effects': '#611b94',
    '--color-timeline-react-layout-effects-hover': '#51167a',
    '--color-timeline-react-layout-effects-text': '#e5c1ff',
    '--color-timeline-react-passive-effects': '#611b94',
    '--color-timeline-react-passive-effects-hover': '#51167a',
    '--color-timeline-react-passive-effects-text': '#e5c1ff',
    '--color-timeline-react-schedule': '#2683E2',
    '--color-timeline-react-schedule-hover': '#1a76d4',
    '--color-timeline-react-suspense-rejected': '#f1cc14',
    '--color-timeline-react-suspense-rejected-hover': '#e4c00f',
    '--color-timeline-react-suspense-resolved': '#a6e59f',
    '--color-timeline-react-suspense-resolved-hover': '#89d281',
    '--color-timeline-react-suspense-unresolved': '#c9cacd',
    '--color-timeline-react-suspense-unresolved-hover': '#93959a',
    '--color-timeline-thrown-error': '#fb3655',
    '--color-timeline-thrown-error-hover': '#f82042',
    '--color-timeline-text-color': '#282c34',
    '--color-timeline-text-dim-color': '#555b66',
    '--color-timeline-react-work-border': '#3d424a',
    '--color-search-match': 'yellow',
    '--color-search-match-current': '#f7923b',
    '--color-selected-tree-highlight-active': 'rgba(23, 143, 185, 0.15)',
    '--color-selected-tree-highlight-inactive': 'rgba(255, 255, 255, 0.05)',
    '--color-scroll-caret': '#4f5766',
    '--color-shadow': 'rgba(0, 0, 0, 0.5)',
    '--color-tab-selected-border': '#178fb9',
    '--color-text': '#ffffff',
    '--color-text-invalid': '#ff8080',
    '--color-text-selected': '#ffffff',
    '--color-toggle-background-invalid': '#fc3a4b',
    '--color-toggle-background-on': '#178fb9',
    '--color-toggle-background-off': '#777d88',
    '--color-toggle-text': '#ffffff',
    '--color-warning-background': '#ee1638',
    '--color-warning-background-hover': '#da1030',
    '--color-warning-text-color': '#ffffff',
    '--color-warning-text-color-inverted': '#ee1638',
    // The styles below should be kept in sync with 'root.css'
    // They are repeated there because they're used by e.g. tooltips or context menus
    // which get rendered outside of the DOM subtree (where normal theme/styles are written).
    '--color-scroll-thumb': '#afb3b9',
    '--color-scroll-track': '#313640',
    '--color-tooltip-background': 'rgba(255, 255, 255, 0.95)',
    '--color-tooltip-text': '#000000'
  },
  compact: {
    '--font-size-monospace-small': '9px',
    '--font-size-monospace-normal': '11px',
    '--font-size-monospace-large': '15px',
    '--font-size-sans-small': '10px',
    '--font-size-sans-normal': '12px',
    '--font-size-sans-large': '14px',
    '--line-height-data': '18px'
  },
  comfortable: {
    '--font-size-monospace-small': '10px',
    '--font-size-monospace-normal': '13px',
    '--font-size-monospace-large': '17px',
    '--font-size-sans-small': '12px',
    '--font-size-sans-normal': '14px',
    '--font-size-sans-large': '16px',
    '--line-height-data': '22px'
  }
}; // HACK
//
// Sometimes the inline target is rendered before root styles are applied,
// which would result in e.g. NaN itemSize being passed to react-window list.

var COMFORTABLE_LINE_HEIGHT = parseInt(THEME_STYLES.comfortable['--line-height-data'], 10);
var COMPACT_LINE_HEIGHT = parseInt(THEME_STYLES.compact['--line-height-data'], 10);

;// CONCATENATED MODULE: ../react-devtools-timeline/src/constants.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var REACT_TOTAL_NUM_LANES = 31; // Increment this number any time a backwards breaking change is made to the profiler metadata.

var SCHEDULING_PROFILER_VERSION = 1;
var SNAPSHOT_MAX_HEIGHT = 60;
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/DevToolsConsolePatching.js
function DevToolsConsolePatching_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function DevToolsConsolePatching_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { DevToolsConsolePatching_ownKeys(Object(source), true).forEach(function (key) { DevToolsConsolePatching_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { DevToolsConsolePatching_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function DevToolsConsolePatching_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of shared/ConsolePatchingDev.
// The shared console patching code is DEV-only.
// We can't use it since DevTools only ships production builds.
// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  if (disabledDepth === 0) {
    prevLog = console.log;
    prevInfo = console.info;
    prevWarn = console.warn;
    prevError = console.error;
    prevGroup = console.group;
    prevGroupCollapsed = console.groupCollapsed;
    prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

    var props = {
      configurable: true,
      enumerable: true,
      value: disabledLog,
      writable: true
    }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

    Object.defineProperties(console, {
      info: props,
      log: props,
      warn: props,
      error: props,
      group: props,
      groupCollapsed: props,
      groupEnd: props
    });
    /* eslint-enable react-internal/no-production-logging */
  }

  disabledDepth++;
}
function reenableLogs() {
  disabledDepth--;

  if (disabledDepth === 0) {
    var props = {
      configurable: true,
      enumerable: true,
      writable: true
    }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

    Object.defineProperties(console, {
      log: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevLog
      }),
      info: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevInfo
      }),
      warn: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevWarn
      }),
      error: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevError
      }),
      group: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevGroup
      }),
      groupCollapsed: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevGroupCollapsed
      }),
      groupEnd: DevToolsConsolePatching_objectSpread(DevToolsConsolePatching_objectSpread({}, props), {}, {
        value: prevGroupEnd
      })
    });
    /* eslint-enable react-internal/no-production-logging */
  }

  if (disabledDepth < 0) {
    console.error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
  }
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/DevToolsComponentStackFrame.js
function DevToolsComponentStackFrame_slicedToArray(arr, i) { return DevToolsComponentStackFrame_arrayWithHoles(arr) || DevToolsComponentStackFrame_iterableToArrayLimit(arr, i) || DevToolsComponentStackFrame_unsupportedIterableToArray(arr, i) || DevToolsComponentStackFrame_nonIterableRest(); }

function DevToolsComponentStackFrame_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function DevToolsComponentStackFrame_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return DevToolsComponentStackFrame_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DevToolsComponentStackFrame_arrayLikeToArray(o, minLen); }

function DevToolsComponentStackFrame_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function DevToolsComponentStackFrame_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function DevToolsComponentStackFrame_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DevToolsComponentStackFrame_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DevToolsComponentStackFrame_typeof = function _typeof(obj) { return typeof obj; }; } else { DevToolsComponentStackFrame_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DevToolsComponentStackFrame_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of ReactComponentStackFrame.
// This fork enables DevTools to use the same "native" component stack format,
// while still maintaining support for multiple renderer versions
// (which use different values for ReactTypeOfWork).
// The shared console patching code is DEV-only.
// We can't use it since DevTools only ships production builds.

var prefix;
function describeBuiltInComponentFrame(name) {
  if (prefix === undefined) {
    // Extract the VM specific prefix used by each line.
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || '';
    }
  }

  var suffix = '';

  if (true) {
    suffix = ' (<anonymous>)';
  } else {} // We use the prefix to ensure our stacks line up with native stack frames.
  // We use a suffix to ensure it gets parsed natively.


  return '\n' + prefix + name + suffix;
}
function describeDebugInfoFrame(name, env) {
  return describeBuiltInComponentFrame(name + (env ? ' [' + env + ']' : ''));
}
var reentry = false;
var componentFrameCache;

if (false) { var PossiblyWeakMap; }

function describeNativeComponentFrame(fn, construct, currentDispatcherRef) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  if (false) { var frame; }

  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe[incompatible-type] It does accept undefined.

  Error.prepareStackTrace = undefined;
  reentry = true; // Override the dispatcher so effects scheduled by this shallow render are thrown away.
  //
  // Note that unlike the code this was forked from (in ReactComponentStackFrame)
  // DevTools should override the dispatcher even when DevTools is compiled in production mode,
  // because the app itself may be in development mode and log errors/warnings.

  var previousDispatcher = currentDispatcherRef.H;
  currentDispatcherRef.H = null;
  disableLogs(); // NOTE: keep in sync with the implementation in ReactComponentStackFrame

  /**
   * Finding a common stack frame between sample and control errors can be
   * tricky given the different types and levels of stack trace truncation from
   * different JS VMs. So instead we'll attempt to control what that common
   * frame should be through this object method:
   * Having both the sample and control errors be in the function under the
   * `DescribeNativeComponentFrameRoot` property, + setting the `name` and
   * `displayName` properties of the function ensures that a stack
   * frame exists that has the method name `DescribeNativeComponentFrameRoot` in
   * it for both control and sample stacks.
   */

  var RunInRootFrame = {
    DetermineComponentFrameRoot: function DetermineComponentFrameRoot() {
      var control;

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function Fake() {
            throw Error();
          }; // $FlowFixMe[prop-missing]


          Object.defineProperty(Fake.prototype, 'props', {
            set: function set() {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if ((typeof Reflect === "undefined" ? "undefined" : DevToolsComponentStackFrame_typeof(Reflect)) === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            } // $FlowFixMe[prop-missing] found when upgrading Flow


            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          } // TODO(luna): This will currently only throw if the function component
          // tries to access React/ReactDOM/props. We should probably make this throw
          // in simple components too


          var maybePromise = fn(); // If the function component returns a promise, it's likely an async
          // component, which we don't yet support. Attach a noop catch handler to
          // silence the error.
          // TODO: Implement component stacks for async client components?

          if (maybePromise && typeof maybePromise.catch === 'function') {
            maybePromise.catch(function () {});
          }
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          return [sample.stack, control.stack];
        }
      }

      return [null, null];
    }
  }; // $FlowFixMe[prop-missing]

  RunInRootFrame.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
  var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, 'name'); // Before ES6, the `name` property was not configurable.

  if (namePropDescriptor && namePropDescriptor.configurable) {
    // V8 utilizes a function's `name` property when generating a stack trace.
    Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, // Configurable properties can be updated even if its writable descriptor
    // is set to `false`.
    // $FlowFixMe[cannot-write]
    'name', {
      value: 'DetermineComponentFrameRoot'
    });
  }

  try {
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(),
        _RunInRootFrame$Deter2 = DevToolsComponentStackFrame_slicedToArray(_RunInRootFrame$Deter, 2),
        sampleStack = _RunInRootFrame$Deter2[0],
        controlStack = _RunInRootFrame$Deter2[1];

    if (sampleStack && controlStack) {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sampleStack.split('\n');
      var controlLines = controlStack.split('\n');
      var s = 0;
      var c = 0;

      while (s < sampleLines.length && !sampleLines[s].includes('DetermineComponentFrameRoot')) {
        s++;
      }

      while (c < controlLines.length && !controlLines[c].includes('DetermineComponentFrameRoot')) {
        c++;
      } // We couldn't find our intentionally injected common root frame, attempt
      // to find another common root frame by search from the bottom of the
      // control stack...


      if (s === sampleLines.length || c === controlLines.length) {
        s = sampleLines.length - 1;
        c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                if (false) {} // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;
    Error.prepareStackTrace = previousPrepareStackTrace;
    currentDispatcherRef.H = previousDispatcher;
    reenableLogs();
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  if (false) {}

  return syntheticFrame;
}
function describeClassComponentFrame(ctor, currentDispatcherRef) {
  return describeNativeComponentFrame(ctor, true, currentDispatcherRef);
}
function describeFunctionComponentFrame(fn, currentDispatcherRef) {
  return describeNativeComponentFrame(fn, false, currentDispatcherRef);
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/DevToolsFiberComponentStack.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of ReactFiberComponentStack.
// This fork enables DevTools to use the same "native" component stack format,
// while still maintaining support for multiple renderer versions
// (which use different values for ReactTypeOfWork).

function describeFiber(workTagMap, workInProgress, currentDispatcherRef) {
  var HostHoistable = workTagMap.HostHoistable,
      HostSingleton = workTagMap.HostSingleton,
      HostComponent = workTagMap.HostComponent,
      LazyComponent = workTagMap.LazyComponent,
      SuspenseComponent = workTagMap.SuspenseComponent,
      SuspenseListComponent = workTagMap.SuspenseListComponent,
      FunctionComponent = workTagMap.FunctionComponent,
      IndeterminateComponent = workTagMap.IndeterminateComponent,
      SimpleMemoComponent = workTagMap.SimpleMemoComponent,
      ForwardRef = workTagMap.ForwardRef,
      ClassComponent = workTagMap.ClassComponent;

  switch (workInProgress.tag) {
    case HostHoistable:
    case HostSingleton:
    case HostComponent:
      return describeBuiltInComponentFrame(workInProgress.type);

    case LazyComponent:
      return describeBuiltInComponentFrame('Lazy');

    case SuspenseComponent:
      return describeBuiltInComponentFrame('Suspense');

    case SuspenseListComponent:
      return describeBuiltInComponentFrame('SuspenseList');

    case FunctionComponent:
    case IndeterminateComponent:
    case SimpleMemoComponent:
      return describeFunctionComponentFrame(workInProgress.type, currentDispatcherRef);

    case ForwardRef:
      return describeFunctionComponentFrame(workInProgress.type.render, currentDispatcherRef);

    case ClassComponent:
      return describeClassComponentFrame(workInProgress.type, currentDispatcherRef);

    default:
      return '';
  }
}
function getStackByFiberInDevAndProd(workTagMap, workInProgress, currentDispatcherRef) {
  try {
    var info = '';
    var node = workInProgress;

    do {
      info += describeFiber(workTagMap, node, currentDispatcherRef); // Add any Server Component stack frames in reverse order.

      var debugInfo = node._debugInfo;

      if (debugInfo) {
        for (var i = debugInfo.length - 1; i >= 0; i--) {
          var entry = debugInfo[i];

          if (typeof entry.name === 'string') {
            info += describeDebugInfoFrame(entry.name, entry.env);
          }
        }
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      node = node.return;
    } while (node);

    return info;
  } catch (x) {
    return '\nError generating stack: ' + x.message + '\n' + x.stack;
  }
}
function supportsNativeConsoleTasks(fiber) {
  // If this Fiber supports native console.createTask then we are already running
  // inside a native async stack trace if it's active - meaning the DevTools is open.
  // Ideally we'd detect if this task was created while the DevTools was open or not.
  return !!fiber._debugTask;
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/profilingHooks.js
function profilingHooks_slicedToArray(arr, i) { return profilingHooks_arrayWithHoles(arr) || profilingHooks_iterableToArrayLimit(arr, i) || profilingHooks_unsupportedIterableToArray(arr, i) || profilingHooks_nonIterableRest(); }

function profilingHooks_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function profilingHooks_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return profilingHooks_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return profilingHooks_arrayLikeToArray(o, minLen); }

function profilingHooks_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function profilingHooks_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function profilingHooks_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function profilingHooks_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { profilingHooks_typeof = function _typeof(obj) { return typeof obj; }; } else { profilingHooks_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return profilingHooks_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


 // Add padding to the start/stop time of the profile.
// This makes the UI nicer to use.

var TIME_OFFSET = 10;
var performanceTarget = null; // If performance exists and supports the subset of the User Timing API that we require.

var supportsUserTiming = typeof performance !== 'undefined' && // $FlowFixMe[method-unbinding]
typeof performance.mark === 'function' && // $FlowFixMe[method-unbinding]
typeof performance.clearMarks === 'function';
var supportsUserTimingV3 = false;

if (supportsUserTiming) {
  var CHECK_V3_MARK = '__v3';
  var markOptions = {};
  Object.defineProperty(markOptions, 'startTime', {
    get: function get() {
      supportsUserTimingV3 = true;
      return 0;
    },
    set: function set() {}
  });

  try {
    performance.mark(CHECK_V3_MARK, markOptions);
  } catch (error) {// Ignore
  } finally {
    performance.clearMarks(CHECK_V3_MARK);
  }
}

if (supportsUserTimingV3) {
  performanceTarget = performance;
} // Some environments (e.g. React Native / Hermes) don't support the performance API yet.


var profilingHooks_getCurrentTime = // $FlowFixMe[method-unbinding]
(typeof performance === "undefined" ? "undefined" : profilingHooks_typeof(performance)) === 'object' && typeof performance.now === 'function' ? function () {
  return performance.now();
} : function () {
  return Date.now();
}; // Mocking the Performance Object (and User Timing APIs) for testing is fragile.
// This API allows tests to directly override the User Timing APIs.

function setPerformanceMock_ONLY_FOR_TESTING(performanceMock) {
  performanceTarget = performanceMock;
  supportsUserTiming = performanceMock !== null;
  supportsUserTimingV3 = performanceMock !== null;
}
function createProfilingHooks(_ref) {
  var getDisplayNameForFiber = _ref.getDisplayNameForFiber,
      getIsProfiling = _ref.getIsProfiling,
      getLaneLabelMap = _ref.getLaneLabelMap,
      workTagMap = _ref.workTagMap,
      currentDispatcherRef = _ref.currentDispatcherRef,
      reactVersion = _ref.reactVersion;
  var currentBatchUID = 0;
  var currentReactComponentMeasure = null;
  var currentReactMeasuresStack = [];
  var currentTimelineData = null;
  var currentFiberStacks = new Map();
  var isProfiling = false;
  var nextRenderShouldStartNewBatch = false;

  function getRelativeTime() {
    var currentTime = profilingHooks_getCurrentTime();

    if (currentTimelineData) {
      if (currentTimelineData.startTime === 0) {
        currentTimelineData.startTime = currentTime - TIME_OFFSET;
      }

      return currentTime - currentTimelineData.startTime;
    }

    return 0;
  }

  function getInternalModuleRanges() {
    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges === 'function') {
      // Ask the DevTools hook for module ranges that may have been reported by the current renderer(s).
      // Don't do this eagerly like the laneToLabelMap,
      // because some modules might not yet have registered their boundaries when the renderer is injected.
      var ranges = __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges(); // This check would not be required,
      // except that it's possible for things to override __REACT_DEVTOOLS_GLOBAL_HOOK__.


      if (shared_isArray(ranges)) {
        return ranges;
      }
    }

    return null;
  }

  function getTimelineData() {
    return currentTimelineData;
  }

  function laneToLanesArray(lanes) {
    var lanesArray = [];
    var lane = 1;

    for (var index = 0; index < REACT_TOTAL_NUM_LANES; index++) {
      if (lane & lanes) {
        lanesArray.push(lane);
      }

      lane *= 2;
    }

    return lanesArray;
  }

  var laneToLabelMap = typeof getLaneLabelMap === 'function' ? getLaneLabelMap() : null;

  function markMetadata() {
    markAndClear("--react-version-".concat(reactVersion));
    markAndClear("--profiler-version-".concat(SCHEDULING_PROFILER_VERSION));
    var ranges = getInternalModuleRanges();

    if (ranges) {
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];

        if (shared_isArray(range) && range.length === 2) {
          var _ranges$i = profilingHooks_slicedToArray(ranges[i], 2),
              startStackFrame = _ranges$i[0],
              stopStackFrame = _ranges$i[1];

          markAndClear("--react-internal-module-start-".concat(startStackFrame));
          markAndClear("--react-internal-module-stop-".concat(stopStackFrame));
        }
      }
    }

    if (laneToLabelMap != null) {
      var labels = Array.from(laneToLabelMap.values()).join(',');
      markAndClear("--react-lane-labels-".concat(labels));
    }
  }

  function markAndClear(markName) {
    // This method won't be called unless these functions are defined, so we can skip the extra typeof check.
    performanceTarget.mark(markName);
    performanceTarget.clearMarks(markName);
  }

  function recordReactMeasureStarted(type, lanes) {
    // Decide what depth thi work should be rendered at, based on what's on the top of the stack.
    // It's okay to render over top of "idle" work but everything else should be on its own row.
    var depth = 0;

    if (currentReactMeasuresStack.length > 0) {
      var top = currentReactMeasuresStack[currentReactMeasuresStack.length - 1];
      depth = top.type === 'render-idle' ? top.depth : top.depth + 1;
    }

    var lanesArray = laneToLanesArray(lanes);
    var reactMeasure = {
      type: type,
      batchUID: currentBatchUID,
      depth: depth,
      lanes: lanesArray,
      timestamp: getRelativeTime(),
      duration: 0
    };
    currentReactMeasuresStack.push(reactMeasure);

    if (currentTimelineData) {
      var _currentTimelineData = currentTimelineData,
          batchUIDToMeasuresMap = _currentTimelineData.batchUIDToMeasuresMap,
          laneToReactMeasureMap = _currentTimelineData.laneToReactMeasureMap;
      var reactMeasures = batchUIDToMeasuresMap.get(currentBatchUID);

      if (reactMeasures != null) {
        reactMeasures.push(reactMeasure);
      } else {
        batchUIDToMeasuresMap.set(currentBatchUID, [reactMeasure]);
      }

      lanesArray.forEach(function (lane) {
        reactMeasures = laneToReactMeasureMap.get(lane);

        if (reactMeasures) {
          reactMeasures.push(reactMeasure);
        }
      });
    }
  }

  function recordReactMeasureCompleted(type) {
    var currentTime = getRelativeTime();

    if (currentReactMeasuresStack.length === 0) {
      console.error('Unexpected type "%s" completed at %sms while currentReactMeasuresStack is empty.', type, currentTime); // Ignore work "completion" user timing mark that doesn't complete anything

      return;
    }

    var top = currentReactMeasuresStack.pop();

    if (top.type !== type) {
      console.error('Unexpected type "%s" completed at %sms before "%s" completed.', type, currentTime, top.type);
    } // $FlowFixMe[cannot-write] This property should not be writable outside of this function.


    top.duration = currentTime - top.timestamp;

    if (currentTimelineData) {
      currentTimelineData.duration = getRelativeTime() + TIME_OFFSET;
    }
  }

  function markCommitStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('commit', lanes); // TODO (timeline) Re-think this approach to "batching"; I don't think it works for Suspense or pre-rendering.
      // This issue applies to the User Timing data also.

      nextRenderShouldStartNewBatch = true;
    }

    if (supportsUserTimingV3) {
      markAndClear("--commit-start-".concat(lanes)); // Some metadata only needs to be logged once per session,
      // but if profiling information is being recorded via the Performance tab,
      // DevTools has no way of knowing when the recording starts.
      // Because of that, we log thie type of data periodically (once per commit).

      markMetadata();
    }
  }

  function markCommitStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('commit');
      recordReactMeasureCompleted('render-idle');
    }

    if (supportsUserTimingV3) {
      markAndClear('--commit-stop');
    }
  }

  function markComponentRenderStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'render',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-render-start-".concat(componentName));
      }
    }
  }

  function markComponentRenderStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-render-stop');
    }
  }

  function markComponentLayoutEffectMountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'layout-effect-mount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-layout-effect-mount-start-".concat(componentName));
      }
    }
  }

  function markComponentLayoutEffectMountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-layout-effect-mount-stop');
    }
  }

  function markComponentLayoutEffectUnmountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'layout-effect-unmount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-layout-effect-unmount-start-".concat(componentName));
      }
    }
  }

  function markComponentLayoutEffectUnmountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-layout-effect-unmount-stop');
    }
  }

  function markComponentPassiveEffectMountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'passive-effect-mount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-passive-effect-mount-start-".concat(componentName));
      }
    }
  }

  function markComponentPassiveEffectMountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-passive-effect-mount-stop');
    }
  }

  function markComponentPassiveEffectUnmountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'passive-effect-unmount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-passive-effect-unmount-start-".concat(componentName));
      }
    }
  }

  function markComponentPassiveEffectUnmountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-passive-effect-unmount-stop');
    }
  }

  function markComponentErrored(fiber, thrownValue, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      var phase = fiber.alternate === null ? 'mount' : 'update';
      var message = '';

      if (thrownValue !== null && profilingHooks_typeof(thrownValue) === 'object' && typeof thrownValue.message === 'string') {
        message = thrownValue.message;
      } else if (typeof thrownValue === 'string') {
        message = thrownValue;
      }

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.thrownErrors.push({
            componentName: componentName,
            message: message,
            phase: phase,
            timestamp: getRelativeTime(),
            type: 'thrown-error'
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--error-".concat(componentName, "-").concat(phase, "-").concat(message));
      }
    }
  }

  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // $FlowFixMe[incompatible-type]: Flow cannot handle polymorphic WeakMaps

  var wakeableIDs = new PossiblyWeakMap();
  var wakeableID = 0;

  function getWakeableID(wakeable) {
    if (!wakeableIDs.has(wakeable)) {
      wakeableIDs.set(wakeable, wakeableID++);
    }

    return wakeableIDs.get(wakeable);
  }

  function markComponentSuspended(fiber, wakeable, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      var eventType = wakeableIDs.has(wakeable) ? 'resuspend' : 'suspend';
      var id = getWakeableID(wakeable);
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      var phase = fiber.alternate === null ? 'mount' : 'update'; // Following the non-standard fn.displayName convention,
      // frameworks like Relay may also annotate Promises with a displayName,
      // describing what operation/data the thrown Promise is related to.
      // When this is available we should pass it along to the Timeline.

      var displayName = wakeable.displayName || '';
      var suspenseEvent = null;

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        suspenseEvent = {
          componentName: componentName,
          depth: 0,
          duration: 0,
          id: "".concat(id),
          phase: phase,
          promiseName: displayName,
          resolution: 'unresolved',
          timestamp: getRelativeTime(),
          type: 'suspense',
          warning: null
        };

        if (currentTimelineData) {
          currentTimelineData.suspenseEvents.push(suspenseEvent);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--suspense-".concat(eventType, "-").concat(id, "-").concat(componentName, "-").concat(phase, "-").concat(lanes, "-").concat(displayName));
      }

      wakeable.then(function () {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'resolved';
        }

        if (supportsUserTimingV3) {
          markAndClear("--suspense-resolved-".concat(id, "-").concat(componentName));
        }
      }, function () {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'rejected';
        }

        if (supportsUserTimingV3) {
          markAndClear("--suspense-rejected-".concat(id, "-").concat(componentName));
        }
      });
    }
  }

  function markLayoutEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('layout-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--layout-effects-start-".concat(lanes));
    }
  }

  function markLayoutEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('layout-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--layout-effects-stop');
    }
  }

  function markPassiveEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('passive-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--passive-effects-start-".concat(lanes));
    }
  }

  function markPassiveEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('passive-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--passive-effects-stop');
    }
  }

  function markRenderStarted(lanes) {
    if (isProfiling) {
      if (nextRenderShouldStartNewBatch) {
        nextRenderShouldStartNewBatch = false;
        currentBatchUID++;
      } // If this is a new batch of work, wrap an "idle" measure around it.
      // Log it before the "render" measure to preserve the stack ordering.


      if (currentReactMeasuresStack.length === 0 || currentReactMeasuresStack[currentReactMeasuresStack.length - 1].type !== 'render-idle') {
        recordReactMeasureStarted('render-idle', lanes);
      }

      recordReactMeasureStarted('render', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--render-start-".concat(lanes));
    }
  }

  function markRenderYielded() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-yield');
    }
  }

  function markRenderStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-stop');
    }
  }

  function markRenderScheduled(lane) {
    if (isProfiling) {
      if (currentTimelineData) {
        currentTimelineData.schedulingEvents.push({
          lanes: laneToLanesArray(lane),
          timestamp: getRelativeTime(),
          type: 'schedule-render',
          warning: null
        });
      }
    }

    if (supportsUserTimingV3) {
      markAndClear("--schedule-render-".concat(lane));
    }
  }

  function markForceUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.schedulingEvents.push({
            componentName: componentName,
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-force-update',
            warning: null
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--schedule-forced-update-".concat(lane, "-").concat(componentName));
      }
    }
  }

  function getParentFibers(fiber) {
    var parents = [];
    var parent = fiber;

    while (parent !== null) {
      parents.push(parent);
      parent = parent.return;
    }

    return parents;
  }

  function markStateUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          var event = {
            componentName: componentName,
            // Store the parent fibers so we can post process
            // them after we finish profiling
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-state-update',
            warning: null
          };
          currentFiberStacks.set(event, getParentFibers(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

          currentTimelineData.schedulingEvents.push(event);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--schedule-state-update-".concat(lane, "-").concat(componentName));
      }
    }
  }

  function toggleProfilingStatus(value) {
    if (isProfiling !== value) {
      isProfiling = value;

      if (isProfiling) {
        var internalModuleSourceToRanges = new Map();

        if (supportsUserTimingV3) {
          var ranges = getInternalModuleRanges();

          if (ranges) {
            for (var i = 0; i < ranges.length; i++) {
              var range = ranges[i];

              if (shared_isArray(range) && range.length === 2) {
                var _ranges$i2 = profilingHooks_slicedToArray(ranges[i], 2),
                    startStackFrame = _ranges$i2[0],
                    stopStackFrame = _ranges$i2[1];

                markAndClear("--react-internal-module-start-".concat(startStackFrame));
                markAndClear("--react-internal-module-stop-".concat(stopStackFrame));
              }
            }
          }
        }

        var laneToReactMeasureMap = new Map();
        var lane = 1;

        for (var index = 0; index < REACT_TOTAL_NUM_LANES; index++) {
          laneToReactMeasureMap.set(lane, []);
          lane *= 2;
        }

        currentBatchUID = 0;
        currentReactComponentMeasure = null;
        currentReactMeasuresStack = [];
        currentFiberStacks = new Map();
        currentTimelineData = {
          // Session wide metadata; only collected once.
          internalModuleSourceToRanges: internalModuleSourceToRanges,
          laneToLabelMap: laneToLabelMap || new Map(),
          reactVersion: reactVersion,
          // Data logged by React during profiling session.
          componentMeasures: [],
          schedulingEvents: [],
          suspenseEvents: [],
          thrownErrors: [],
          // Data inferred based on what React logs.
          batchUIDToMeasuresMap: new Map(),
          duration: 0,
          laneToReactMeasureMap: laneToReactMeasureMap,
          startTime: 0,
          // Data only available in Chrome profiles.
          flamechart: [],
          nativeEvents: [],
          networkMeasures: [],
          otherUserTimingMarks: [],
          snapshots: [],
          snapshotHeight: 0
        };
        nextRenderShouldStartNewBatch = true;
      } else {
        // Postprocess Profile data
        if (currentTimelineData !== null) {
          currentTimelineData.schedulingEvents.forEach(function (event) {
            if (event.type === 'schedule-state-update') {
              // TODO(luna): We can optimize this by creating a map of
              // fiber to component stack instead of generating the stack
              // for every fiber every time
              var fiberStack = currentFiberStacks.get(event);

              if (fiberStack && currentDispatcherRef != null) {
                event.componentStack = fiberStack.reduce(function (trace, fiber) {
                  return trace + describeFiber(workTagMap, fiber, currentDispatcherRef);
                }, '');
              }
            }
          });
        } // Clear the current fiber stacks so we don't hold onto the fibers
        // in memory after profiling finishes


        currentFiberStacks.clear();
      }
    }
  }

  return {
    getTimelineData: getTimelineData,
    profilingHooks: {
      markCommitStarted: markCommitStarted,
      markCommitStopped: markCommitStopped,
      markComponentRenderStarted: markComponentRenderStarted,
      markComponentRenderStopped: markComponentRenderStopped,
      markComponentPassiveEffectMountStarted: markComponentPassiveEffectMountStarted,
      markComponentPassiveEffectMountStopped: markComponentPassiveEffectMountStopped,
      markComponentPassiveEffectUnmountStarted: markComponentPassiveEffectUnmountStarted,
      markComponentPassiveEffectUnmountStopped: markComponentPassiveEffectUnmountStopped,
      markComponentLayoutEffectMountStarted: markComponentLayoutEffectMountStarted,
      markComponentLayoutEffectMountStopped: markComponentLayoutEffectMountStopped,
      markComponentLayoutEffectUnmountStarted: markComponentLayoutEffectUnmountStarted,
      markComponentLayoutEffectUnmountStopped: markComponentLayoutEffectUnmountStopped,
      markComponentErrored: markComponentErrored,
      markComponentSuspended: markComponentSuspended,
      markLayoutEffectsStarted: markLayoutEffectsStarted,
      markLayoutEffectsStopped: markLayoutEffectsStopped,
      markPassiveEffectsStarted: markPassiveEffectsStarted,
      markPassiveEffectsStopped: markPassiveEffectsStopped,
      markRenderStarted: markRenderStarted,
      markRenderYielded: markRenderYielded,
      markRenderStopped: markRenderStopped,
      markRenderScheduled: markRenderScheduled,
      markForceUpdateScheduled: markForceUpdateScheduled,
      markStateUpdateScheduled: markStateUpdateScheduled
    },
    toggleProfilingStatus: toggleProfilingStatus
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/renderer.js
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function renderer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function renderer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { renderer_ownKeys(Object(source), true).forEach(function (key) { renderer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { renderer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function renderer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderer_slicedToArray(arr, i) { return renderer_arrayWithHoles(arr) || renderer_iterableToArrayLimit(arr, i) || renderer_unsupportedIterableToArray(arr, i) || renderer_nonIterableRest(); }

function renderer_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function renderer_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function renderer_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function renderer_toConsumableArray(arr) { return renderer_arrayWithoutHoles(arr) || renderer_iterableToArray(arr) || renderer_unsupportedIterableToArray(arr) || renderer_nonIterableSpread(); }

function renderer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function renderer_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function renderer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return renderer_arrayLikeToArray(arr); }

function renderer_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = renderer_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function renderer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return renderer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return renderer_arrayLikeToArray(o, minLen); }

function renderer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function renderer_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { renderer_typeof = function _typeof(obj) { return typeof obj; }; } else { renderer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return renderer_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */















function getDispatcherRef(renderer) {
  if (renderer.currentDispatcherRef === undefined) {
    return undefined;
  }

  var injectedRef = renderer.currentDispatcherRef;

  if (typeof injectedRef.H === 'undefined' && typeof injectedRef.current !== 'undefined') {
    // We got a legacy dispatcher injected, let's create a wrapper proxy to translate.
    return {
      get H() {
        return injectedRef.current;
      },

      set H(value) {
        injectedRef.current = value;
      }

    };
  }

  return injectedRef;
}

function getFiberFlags(fiber) {
  // The name of this field changed from "effectTag" to "flags"
  return fiber.flags !== undefined ? fiber.flags : fiber.effectTag;
} // Some environments (e.g. React Native / Hermes) don't support the performance API yet.


var renderer_getCurrentTime = // $FlowFixMe[method-unbinding]
(typeof performance === "undefined" ? "undefined" : renderer_typeof(performance)) === 'object' && typeof performance.now === 'function' ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
function getInternalReactConstants(version) {
  // **********************************************************
  // The section below is copied from files in React repo.
  // Keep it in sync, and add version guards if it changes.
  //
  // Technically these priority levels are invalid for versions before 16.9,
  // but 16.9 is the first version to report priority level to DevTools,
  // so we can avoid checking for earlier versions and support pre-16.9 canary releases in the process.
  var ReactPriorityLevels = {
    ImmediatePriority: 99,
    UserBlockingPriority: 98,
    NormalPriority: 97,
    LowPriority: 96,
    IdlePriority: 95,
    NoPriority: 90
  };

  if (gt(version, '17.0.2')) {
    ReactPriorityLevels = {
      ImmediatePriority: 1,
      UserBlockingPriority: 2,
      NormalPriority: 3,
      LowPriority: 4,
      IdlePriority: 5,
      NoPriority: 0
    };
  }

  var StrictModeBits = 0;

  if (gte(version, '18.0.0-alpha')) {
    // 18+
    StrictModeBits = 24;
  } else if (gte(version, '16.9.0')) {
    // 16.9 - 17
    StrictModeBits = 1;
  } else if (gte(version, '16.3.0')) {
    // 16.3 - 16.8
    StrictModeBits = 2;
  }

  var ReactTypeOfWork = null; // **********************************************************
  // The section below is copied from files in React repo.
  // Keep it in sync, and add version guards if it changes.
  //
  // TODO Update the gt() check below to be gte() whichever the next version number is.
  // Currently the version in Git is 17.0.2 (but that version has not been/may not end up being released).

  if (gt(version, '17.0.1')) {
    ReactTypeOfWork = {
      CacheComponent: 24,
      // Experimental
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: 26,
      // In reality, 18.2+. But doesn't hurt to include it here
      HostSingleton: 27,
      // Same as above
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: 28,
      IndeterminateComponent: 2,
      // removed in 19.0.0
      LazyComponent: 16,
      LegacyHiddenComponent: 23,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: 22,
      // Experimental
      Profiler: 12,
      ScopeComponent: 21,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: 25,
      // Experimental - This is technically in 18 but we don't
      // want to fork again so we're adding it here instead
      YieldComponent: -1,
      // Removed
      Throw: 29
    };
  } else if (gte(version, '17.0.0-alpha')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 2,
      LazyComponent: 16,
      LegacyHiddenComponent: 24,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: 23,
      // Experimental
      Profiler: 12,
      ScopeComponent: 21,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1,
      // Removed
      Throw: -1 // Doesn't exist yet

    };
  } else if (gte(version, '16.6.0-beta.0')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 2,
      LazyComponent: 16,
      LegacyHiddenComponent: -1,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 12,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1,
      // Removed
      Throw: -1 // Doesn't exist yet

    };
  } else if (gte(version, '16.4.3-alpha')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 2,
      ContextConsumer: 11,
      ContextProvider: 12,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: -1,
      // Doesn't exist yet
      ForwardRef: 13,
      Fragment: 9,
      FunctionComponent: 0,
      HostComponent: 7,
      HostPortal: 6,
      HostRoot: 5,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 8,
      IncompleteClassComponent: -1,
      // Doesn't exist yet
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 4,
      LazyComponent: -1,
      // Doesn't exist yet
      LegacyHiddenComponent: -1,
      MemoComponent: -1,
      // Doesn't exist yet
      Mode: 10,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 15,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: -1,
      // Doesn't exist yet
      SuspenseComponent: 16,
      SuspenseListComponent: -1,
      // Doesn't exist yet
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1,
      // Removed
      Throw: -1 // Doesn't exist yet

    };
  } else {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 2,
      ContextConsumer: 12,
      ContextProvider: 13,
      CoroutineComponent: 7,
      CoroutineHandlerPhase: 8,
      DehydratedSuspenseComponent: -1,
      // Doesn't exist yet
      ForwardRef: 14,
      Fragment: 10,
      FunctionComponent: 1,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: -1,
      // Doesn't exist yet
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 0,
      LazyComponent: -1,
      // Doesn't exist yet
      LegacyHiddenComponent: -1,
      MemoComponent: -1,
      // Doesn't exist yet
      Mode: 11,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 15,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: -1,
      // Doesn't exist yet
      SuspenseComponent: 16,
      SuspenseListComponent: -1,
      // Doesn't exist yet
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: 9,
      Throw: -1 // Doesn't exist yet

    };
  } // **********************************************************
  // End of copied code.
  // **********************************************************


  function getTypeSymbol(type) {
    var symbolOrNumber = renderer_typeof(type) === 'object' && type !== null ? type.$$typeof : type;
    return renderer_typeof(symbolOrNumber) === 'symbol' ? // $FlowFixMe[incompatible-return] `toString()` doesn't match the type signature?
    symbolOrNumber.toString() : symbolOrNumber;
  }

  var _ReactTypeOfWork = ReactTypeOfWork,
      CacheComponent = _ReactTypeOfWork.CacheComponent,
      ClassComponent = _ReactTypeOfWork.ClassComponent,
      IncompleteClassComponent = _ReactTypeOfWork.IncompleteClassComponent,
      IncompleteFunctionComponent = _ReactTypeOfWork.IncompleteFunctionComponent,
      FunctionComponent = _ReactTypeOfWork.FunctionComponent,
      IndeterminateComponent = _ReactTypeOfWork.IndeterminateComponent,
      ForwardRef = _ReactTypeOfWork.ForwardRef,
      HostRoot = _ReactTypeOfWork.HostRoot,
      HostHoistable = _ReactTypeOfWork.HostHoistable,
      HostSingleton = _ReactTypeOfWork.HostSingleton,
      HostComponent = _ReactTypeOfWork.HostComponent,
      HostPortal = _ReactTypeOfWork.HostPortal,
      HostText = _ReactTypeOfWork.HostText,
      Fragment = _ReactTypeOfWork.Fragment,
      LazyComponent = _ReactTypeOfWork.LazyComponent,
      LegacyHiddenComponent = _ReactTypeOfWork.LegacyHiddenComponent,
      MemoComponent = _ReactTypeOfWork.MemoComponent,
      OffscreenComponent = _ReactTypeOfWork.OffscreenComponent,
      Profiler = _ReactTypeOfWork.Profiler,
      ScopeComponent = _ReactTypeOfWork.ScopeComponent,
      SimpleMemoComponent = _ReactTypeOfWork.SimpleMemoComponent,
      SuspenseComponent = _ReactTypeOfWork.SuspenseComponent,
      SuspenseListComponent = _ReactTypeOfWork.SuspenseListComponent,
      TracingMarkerComponent = _ReactTypeOfWork.TracingMarkerComponent,
      Throw = _ReactTypeOfWork.Throw;

  function resolveFiberType(type) {
    var typeSymbol = getTypeSymbol(type);

    switch (typeSymbol) {
      case MEMO_NUMBER:
      case MEMO_SYMBOL_STRING:
        // recursively resolving memo type in case of memo(forwardRef(Component))
        return resolveFiberType(type.type);

      case FORWARD_REF_NUMBER:
      case FORWARD_REF_SYMBOL_STRING:
        return type.render;

      default:
        return type;
    }
  } // NOTICE Keep in sync with shouldFilterFiber() and other get*ForFiber methods


  function getDisplayNameForFiber(fiber) {
    var _fiber$updateQueue, _fiber$memoizedState, _fiber$memoizedState$;

    var shouldSkipForgetCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var elementType = fiber.elementType,
        type = fiber.type,
        tag = fiber.tag;
    var resolvedType = type;

    if (renderer_typeof(type) === 'object' && type !== null) {
      resolvedType = resolveFiberType(type);
    }

    var resolvedContext = null;

    if (!shouldSkipForgetCheck && ( // $FlowFixMe[incompatible-type] fiber.updateQueue is mixed
    ((_fiber$updateQueue = fiber.updateQueue) === null || _fiber$updateQueue === void 0 ? void 0 : _fiber$updateQueue.memoCache) != null || ((_fiber$memoizedState = fiber.memoizedState) === null || _fiber$memoizedState === void 0 ? void 0 : (_fiber$memoizedState$ = _fiber$memoizedState.memoizedState) === null || _fiber$memoizedState$ === void 0 ? void 0 : _fiber$memoizedState$[ReactSymbols_REACT_MEMO_CACHE_SENTINEL]))) {
      var displayNameWithoutForgetWrapper = getDisplayNameForFiber(fiber, true);

      if (displayNameWithoutForgetWrapper == null) {
        return null;
      }

      return "Forget(".concat(displayNameWithoutForgetWrapper, ")");
    }

    switch (tag) {
      case CacheComponent:
        return 'Cache';

      case ClassComponent:
      case IncompleteClassComponent:
      case IncompleteFunctionComponent:
      case FunctionComponent:
      case IndeterminateComponent:
        return getDisplayName(resolvedType);

      case ForwardRef:
        return getWrappedDisplayName(elementType, resolvedType, 'ForwardRef', 'Anonymous');

      case HostRoot:
        var fiberRoot = fiber.stateNode;

        if (fiberRoot != null && fiberRoot._debugRootType !== null) {
          return fiberRoot._debugRootType;
        }

        return null;

      case HostComponent:
      case HostSingleton:
      case HostHoistable:
        return type;

      case HostPortal:
      case HostText:
        return null;

      case Fragment:
        return 'Fragment';

      case LazyComponent:
        // This display name will not be user visible.
        // Once a Lazy component loads its inner component, React replaces the tag and type.
        // This display name will only show up in console logs when DevTools DEBUG mode is on.
        return 'Lazy';

      case MemoComponent:
      case SimpleMemoComponent:
        // Display name in React does not use `Memo` as a wrapper but fallback name.
        return getWrappedDisplayName(elementType, resolvedType, 'Memo', 'Anonymous');

      case SuspenseComponent:
        return 'Suspense';

      case LegacyHiddenComponent:
        return 'LegacyHidden';

      case OffscreenComponent:
        return 'Offscreen';

      case ScopeComponent:
        return 'Scope';

      case SuspenseListComponent:
        return 'SuspenseList';

      case Profiler:
        return 'Profiler';

      case TracingMarkerComponent:
        return 'TracingMarker';

      case Throw:
        // This should really never be visible.
        return 'Error';

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case CONCURRENT_MODE_NUMBER:
          case CONCURRENT_MODE_SYMBOL_STRING:
          case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
            return null;

          case PROVIDER_NUMBER:
          case PROVIDER_SYMBOL_STRING:
            // 16.3.0 exposed the context object as "context"
            // PR #12501 changed it to "_context" for 16.3.1+
            // NOTE Keep in sync with inspectElementRaw()
            resolvedContext = fiber.type._context || fiber.type.context;
            return "".concat(resolvedContext.displayName || 'Context', ".Provider");

          case CONTEXT_NUMBER:
          case CONTEXT_SYMBOL_STRING:
          case SERVER_CONTEXT_SYMBOL_STRING:
            if (fiber.type._context === undefined && fiber.type.Provider === fiber.type) {
              // In 19+, Context.Provider === Context, so this is a provider.
              resolvedContext = fiber.type;
              return "".concat(resolvedContext.displayName || 'Context', ".Provider");
            } // 16.3-16.5 read from "type" because the Consumer is the actual context object.
            // 16.6+ should read from "type._context" because Consumer can be different (in DEV).
            // NOTE Keep in sync with inspectElementRaw()


            resolvedContext = fiber.type._context || fiber.type; // NOTE: TraceUpdatesBackendManager depends on the name ending in '.Consumer'
            // If you change the name, figure out a more resilient way to detect it.

            return "".concat(resolvedContext.displayName || 'Context', ".Consumer");

          case CONSUMER_SYMBOL_STRING:
            // 19+
            resolvedContext = fiber.type._context;
            return "".concat(resolvedContext.displayName || 'Context', ".Consumer");

          case STRICT_MODE_NUMBER:
          case STRICT_MODE_SYMBOL_STRING:
            return null;

          case PROFILER_NUMBER:
          case PROFILER_SYMBOL_STRING:
            return "Profiler(".concat(fiber.memoizedProps.id, ")");

          case SCOPE_NUMBER:
          case SCOPE_SYMBOL_STRING:
            return 'Scope';

          default:
            // Unknown element type.
            // This may mean a new element type that has not yet been added to DevTools.
            return null;
        }

    }
  }

  return {
    getDisplayNameForFiber: getDisplayNameForFiber,
    getTypeSymbol: getTypeSymbol,
    ReactPriorityLevels: ReactPriorityLevels,
    ReactTypeOfWork: ReactTypeOfWork,
    StrictModeBits: StrictModeBits
  };
} // Map of one or more Fibers in a pair to their unique id number.
// We track both Fibers to support Fast Refresh,
// which may forcefully replace one of the pair as part of hot reloading.
// In that case it's still important to be able to locate the previous ID during subsequent renders.

var fiberToIDMap = new Map(); // Map of id to one (arbitrary) Fiber in a pair.
// This Map is used to e.g. get the display name for a Fiber or schedule an update,
// operations that should be the same whether the current and work-in-progress Fiber is used.

var idToArbitraryFiberMap = new Map();
var fiberToComponentStackMap = new WeakMap();
function attach(hook, rendererID, renderer, global) {
  // Newer versions of the reconciler package also specific reconciler version.
  // If that version number is present, use it.
  // Third party renderer versions may not match the reconciler version,
  // and the latter is what's important in terms of tags and symbols.
  var version = renderer.reconcilerVersion || renderer.version;

  var _getInternalReactCons = getInternalReactConstants(version),
      getDisplayNameForFiber = _getInternalReactCons.getDisplayNameForFiber,
      getTypeSymbol = _getInternalReactCons.getTypeSymbol,
      ReactPriorityLevels = _getInternalReactCons.ReactPriorityLevels,
      ReactTypeOfWork = _getInternalReactCons.ReactTypeOfWork,
      StrictModeBits = _getInternalReactCons.StrictModeBits;

  var CacheComponent = ReactTypeOfWork.CacheComponent,
      ClassComponent = ReactTypeOfWork.ClassComponent,
      ContextConsumer = ReactTypeOfWork.ContextConsumer,
      DehydratedSuspenseComponent = ReactTypeOfWork.DehydratedSuspenseComponent,
      ForwardRef = ReactTypeOfWork.ForwardRef,
      Fragment = ReactTypeOfWork.Fragment,
      FunctionComponent = ReactTypeOfWork.FunctionComponent,
      HostRoot = ReactTypeOfWork.HostRoot,
      HostHoistable = ReactTypeOfWork.HostHoistable,
      HostSingleton = ReactTypeOfWork.HostSingleton,
      HostPortal = ReactTypeOfWork.HostPortal,
      HostComponent = ReactTypeOfWork.HostComponent,
      HostText = ReactTypeOfWork.HostText,
      IncompleteClassComponent = ReactTypeOfWork.IncompleteClassComponent,
      IncompleteFunctionComponent = ReactTypeOfWork.IncompleteFunctionComponent,
      IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
      LegacyHiddenComponent = ReactTypeOfWork.LegacyHiddenComponent,
      MemoComponent = ReactTypeOfWork.MemoComponent,
      OffscreenComponent = ReactTypeOfWork.OffscreenComponent,
      SimpleMemoComponent = ReactTypeOfWork.SimpleMemoComponent,
      SuspenseComponent = ReactTypeOfWork.SuspenseComponent,
      SuspenseListComponent = ReactTypeOfWork.SuspenseListComponent,
      TracingMarkerComponent = ReactTypeOfWork.TracingMarkerComponent,
      Throw = ReactTypeOfWork.Throw;
  var ImmediatePriority = ReactPriorityLevels.ImmediatePriority,
      UserBlockingPriority = ReactPriorityLevels.UserBlockingPriority,
      NormalPriority = ReactPriorityLevels.NormalPriority,
      LowPriority = ReactPriorityLevels.LowPriority,
      IdlePriority = ReactPriorityLevels.IdlePriority,
      NoPriority = ReactPriorityLevels.NoPriority;
  var getLaneLabelMap = renderer.getLaneLabelMap,
      injectProfilingHooks = renderer.injectProfilingHooks,
      overrideHookState = renderer.overrideHookState,
      overrideHookStateDeletePath = renderer.overrideHookStateDeletePath,
      overrideHookStateRenamePath = renderer.overrideHookStateRenamePath,
      overrideProps = renderer.overrideProps,
      overridePropsDeletePath = renderer.overridePropsDeletePath,
      overridePropsRenamePath = renderer.overridePropsRenamePath,
      scheduleRefresh = renderer.scheduleRefresh,
      setErrorHandler = renderer.setErrorHandler,
      setSuspenseHandler = renderer.setSuspenseHandler,
      scheduleUpdate = renderer.scheduleUpdate;
  var supportsTogglingError = typeof setErrorHandler === 'function' && typeof scheduleUpdate === 'function';
  var supportsTogglingSuspense = typeof setSuspenseHandler === 'function' && typeof scheduleUpdate === 'function';

  if (typeof scheduleRefresh === 'function') {
    // When Fast Refresh updates a component, the frontend may need to purge cached information.
    // For example, ASTs cached for the component (for named hooks) may no longer be valid.
    // Send a signal to the frontend to purge this cached information.
    // The "fastRefreshScheduled" dispatched is global (not Fiber or even Renderer specific).
    // This is less effecient since it means the front-end will need to purge the entire cache,
    // but this is probably an okay trade off in order to reduce coupling between the DevTools and Fast Refresh.
    renderer.scheduleRefresh = function () {
      try {
        hook.emit('fastRefreshScheduled');
      } finally {
        return scheduleRefresh.apply(void 0, arguments);
      }
    };
  }

  var getTimelineData = null;
  var toggleProfilingStatus = null;

  if (typeof injectProfilingHooks === 'function') {
    var response = createProfilingHooks({
      getDisplayNameForFiber: getDisplayNameForFiber,
      getIsProfiling: function getIsProfiling() {
        return isProfiling;
      },
      getLaneLabelMap: getLaneLabelMap,
      currentDispatcherRef: getDispatcherRef(renderer),
      workTagMap: ReactTypeOfWork,
      reactVersion: version
    }); // Pass the Profiling hooks to the reconciler for it to call during render.

    injectProfilingHooks(response.profilingHooks); // Hang onto this toggle so we can notify the external methods of profiling status changes.

    getTimelineData = response.getTimelineData;
    toggleProfilingStatus = response.toggleProfilingStatus;
  } // Tracks Fibers with recently changed number of error/warning messages.
  // These collections store the Fiber rather than the ID,
  // in order to avoid generating an ID for Fibers that never get mounted
  // (due to e.g. Suspense or error boundaries).
  // onErrorOrWarning() adds Fibers and recordPendingErrorsAndWarnings() later clears them.


  var fibersWithChangedErrorOrWarningCounts = new Set();
  var pendingFiberToErrorsMap = new Map();
  var pendingFiberToWarningsMap = new Map(); // Mapping of fiber IDs to error/warning messages and counts.

  var fiberIDToErrorsMap = new Map();
  var fiberIDToWarningsMap = new Map();

  function clearErrorsAndWarnings() {
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    var _iterator = renderer_createForOfIteratorHelper(fiberIDToErrorsMap.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var id = _step.value;

        var _fiber = idToArbitraryFiberMap.get(id);

        if (_fiber != null) {
          fibersWithChangedErrorOrWarningCounts.add(_fiber);
          updateMostRecentlyInspectedElementIfNecessary(id);
        }
      } // eslint-disable-next-line no-for-of-loops/no-for-of-loops

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = renderer_createForOfIteratorHelper(fiberIDToWarningsMap.keys()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _id = _step2.value;

        var _fiber2 = idToArbitraryFiberMap.get(_id);

        if (_fiber2 != null) {
          fibersWithChangedErrorOrWarningCounts.add(_fiber2);
          updateMostRecentlyInspectedElementIfNecessary(_id);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    fiberIDToErrorsMap.clear();
    fiberIDToWarningsMap.clear();
    flushPendingEvents();
  }

  function clearMessageCountHelper(fiberID, pendingFiberToMessageCountMap, fiberIDToMessageCountMap) {
    var fiber = idToArbitraryFiberMap.get(fiberID);

    if (fiber != null) {
      // Throw out any pending changes.
      pendingFiberToErrorsMap.delete(fiber);

      if (fiberIDToMessageCountMap.has(fiberID)) {
        fiberIDToMessageCountMap.delete(fiberID); // If previous flushed counts have changed, schedule an update too.

        fibersWithChangedErrorOrWarningCounts.add(fiber);
        flushPendingEvents();
        updateMostRecentlyInspectedElementIfNecessary(fiberID);
      } else {
        fibersWithChangedErrorOrWarningCounts.delete(fiber);
      }
    }
  }

  function clearErrorsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
  }

  function clearWarningsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
  }

  function updateMostRecentlyInspectedElementIfNecessary(fiberID) {
    if (mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === fiberID) {
      hasElementUpdatedSinceLastInspected = true;
    }
  } // Called when an error or warning is logged during render, commit, or passive (including unmount functions).


  function onErrorOrWarning(fiber, type, args) {
    if (type === 'error') {
      var maybeID = getFiberIDUnsafe(fiber); // if this is an error simulated by us to trigger error boundary, ignore

      if (maybeID != null && forceErrorForFiberIDs.get(maybeID) === true) {
        return;
      }
    } // We can't really use this message as a unique key, since we can't distinguish
    // different objects in this implementation. We have to delegate displaying of the objects
    // to the environment, the browser console, for example, so this is why this should be kept
    // as an array of arguments, instead of the plain string.
    // [Warning: %o, {...}] and [Warning: %o, {...}] will be considered as the same message,
    // even if objects are different


    var message = formatConsoleArgumentsToSingleString.apply(void 0, renderer_toConsumableArray(args));

    if (__DEBUG__) {
      debug('onErrorOrWarning', fiber, null, "".concat(type, ": \"").concat(message, "\""));
    } // Mark this Fiber as needed its warning/error count updated during the next flush.


    fibersWithChangedErrorOrWarningCounts.add(fiber); // Track the warning/error for later.

    var fiberMap = type === 'error' ? pendingFiberToErrorsMap : pendingFiberToWarningsMap;
    var messageMap = fiberMap.get(fiber);

    if (messageMap != null) {
      var count = messageMap.get(message) || 0;
      messageMap.set(message, count + 1);
    } else {
      fiberMap.set(fiber, new Map([[message, 1]]));
    } // Passive effects may trigger errors or warnings too;
    // In this case, we should wait until the rest of the passive effects have run,
    // but we shouldn't wait until the next commit because that might be a long time.
    // This would also cause "tearing" between an inspected Component and the tree view.
    // Then again we don't want to flush too soon because this could be an error during async rendering.
    // Use a debounce technique to ensure that we'll eventually flush.


    flushPendingErrorsAndWarningsAfterDelay();
  } // Patching the console enables DevTools to do a few useful things:
  // * Append component stacks to warnings and error messages
  // * Disable logging during re-renders to inspect hooks (see inspectHooksOfFiber)


  registerRenderer(renderer, onErrorOrWarning); // The renderer interface can't read these preferences directly,
  // because it is stored in localStorage within the context of the extension.
  // It relies on the extension to pass the preference through via the global.

  patchConsoleUsingWindowValues();

  var debug = function debug(name, fiber, parentFiber) {
    var extraString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    if (__DEBUG__) {
      var displayName = fiber.tag + ':' + (getDisplayNameForFiber(fiber) || 'null');
      var maybeID = getFiberIDUnsafe(fiber) || '<no id>';
      var parentDisplayName = parentFiber ? parentFiber.tag + ':' + (getDisplayNameForFiber(parentFiber) || 'null') : '';
      var maybeParentID = parentFiber ? getFiberIDUnsafe(parentFiber) || '<no-id>' : '';
      console.groupCollapsed("[renderer] %c".concat(name, " %c").concat(displayName, " (").concat(maybeID, ") %c").concat(parentFiber ? "".concat(parentDisplayName, " (").concat(maybeParentID, ")") : '', " %c").concat(extraString), 'color: red; font-weight: bold;', 'color: blue;', 'color: purple;', 'color: black;');
      console.log(new Error().stack.split('\n').slice(1).join('\n'));
      console.groupEnd();
    }
  }; // Configurable Components tree filters.


  var hideElementsWithDisplayNames = new Set();
  var hideElementsWithPaths = new Set();
  var hideElementsWithTypes = new Set(); // Highlight updates

  var traceUpdatesEnabled = false;
  var traceUpdatesForNodes = new Set();

  function applyComponentFilters(componentFilters) {
    hideElementsWithTypes.clear();
    hideElementsWithDisplayNames.clear();
    hideElementsWithPaths.clear();
    componentFilters.forEach(function (componentFilter) {
      if (!componentFilter.isEnabled) {
        return;
      }

      switch (componentFilter.type) {
        case ComponentFilterDisplayName:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithDisplayNames.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case ComponentFilterElementType:
          hideElementsWithTypes.add(componentFilter.value);
          break;

        case ComponentFilterLocation:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithPaths.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case ComponentFilterHOC:
          hideElementsWithDisplayNames.add(new RegExp('\\('));
          break;

        default:
          console.warn("Invalid component filter type \"".concat(componentFilter.type, "\""));
          break;
      }
    });
  } // The renderer interface can't read saved component filters directly,
  // because they are stored in localStorage within the context of the extension.
  // Instead it relies on the extension to pass filters through.


  if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ != null) {
    var componentFiltersWithoutLocationBasedOnes = filterOutLocationComponentFilters(window.__REACT_DEVTOOLS_COMPONENT_FILTERS__);
    applyComponentFilters(componentFiltersWithoutLocationBasedOnes);
  } else {
    // Unfortunately this feature is not expected to work for React Native for now.
    // It would be annoying for us to spam YellowBox warnings with unactionable stuff,
    // so for now just skip this message...
    //console.warn('⚛️ DevTools: Could not locate saved component filters');
    // Fallback to assuming the default filters in this case.
    applyComponentFilters(getDefaultComponentFilters());
  } // If necessary, we can revisit optimizing this operation.
  // For example, we could add a new recursive unmount tree operation.
  // The unmount operations are already significantly smaller than mount operations though.
  // This is something to keep in mind for later.


  function updateComponentFilters(componentFilters) {
    if (isProfiling) {
      // Re-mounting a tree while profiling is in progress might break a lot of assumptions.
      // If necessary, we could support this- but it doesn't seem like a necessary use case.
      throw Error('Cannot modify filter preferences while profiling');
    } // Recursively unmount all roots.


    hook.getFiberRoots(rendererID).forEach(function (root) {
      currentRootID = getOrGenerateFiberID(root.current); // The TREE_OPERATION_REMOVE_ROOT operation serves two purposes:
      // 1. It avoids sending unnecessary bridge traffic to clear a root.
      // 2. It preserves Fiber IDs when remounting (below) which in turn ID to error/warning mapping.

      pushOperation(TREE_OPERATION_REMOVE_ROOT);
      flushPendingEvents(root);
      currentRootID = -1;
    });
    applyComponentFilters(componentFilters); // Reset pseudo counters so that new path selections will be persisted.

    rootDisplayNameCounter.clear(); // Recursively re-mount all roots with new filter criteria applied.

    hook.getFiberRoots(rendererID).forEach(function (root) {
      currentRootID = getOrGenerateFiberID(root.current);
      setRootPseudoKey(currentRootID, root.current);
      mountFiberRecursively(root.current, null, false, false);
      flushPendingEvents(root);
      currentRootID = -1;
    }); // Also re-evaluate all error and warning counts given the new filters.

    reevaluateErrorsAndWarnings();
    flushPendingEvents();
  } // NOTICE Keep in sync with get*ForFiber methods


  function shouldFilterFiber(fiber) {
    var tag = fiber.tag,
        type = fiber.type,
        key = fiber.key;

    switch (tag) {
      case DehydratedSuspenseComponent:
        // TODO: ideally we would show dehydrated Suspense immediately.
        // However, it has some special behavior (like disconnecting
        // an alternate and turning into real Suspense) which breaks DevTools.
        // For now, ignore it, and only show it once it gets hydrated.
        // https://github.com/bvaughn/react-devtools-experimental/issues/197
        return true;

      case HostPortal:
      case HostText:
      case LegacyHiddenComponent:
      case OffscreenComponent:
      case Throw:
        return true;

      case HostRoot:
        // It is never valid to filter the root element.
        return false;

      case Fragment:
        return key === null;

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case CONCURRENT_MODE_NUMBER:
          case CONCURRENT_MODE_SYMBOL_STRING:
          case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
          case STRICT_MODE_NUMBER:
          case STRICT_MODE_SYMBOL_STRING:
            return true;

          default:
            break;
        }

    }

    var elementType = getElementTypeForFiber(fiber);

    if (hideElementsWithTypes.has(elementType)) {
      return true;
    }

    if (hideElementsWithDisplayNames.size > 0) {
      var displayName = getDisplayNameForFiber(fiber);

      if (displayName != null) {
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        var _iterator3 = renderer_createForOfIteratorHelper(hideElementsWithDisplayNames),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var displayNameRegExp = _step3.value;

            if (displayNameRegExp.test(displayName)) {
              return true;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
    /* DISABLED: https://github.com/facebook/react/pull/28417
    if (hideElementsWithPaths.size > 0) {
      const source = getSourceForFiber(fiber);
       if (source != null) {
        const {fileName} = source;
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        for (const pathRegExp of hideElementsWithPaths) {
          if (pathRegExp.test(fileName)) {
            return true;
          }
        }
      }
    }
    */


    return false;
  } // NOTICE Keep in sync with shouldFilterFiber() and other get*ForFiber methods


  function getElementTypeForFiber(fiber) {
    var type = fiber.type,
        tag = fiber.tag;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        return types_ElementTypeClass;

      case IncompleteFunctionComponent:
      case FunctionComponent:
      case IndeterminateComponent:
        return types_ElementTypeFunction;

      case ForwardRef:
        return types_ElementTypeForwardRef;

      case HostRoot:
        return ElementTypeRoot;

      case HostComponent:
      case HostHoistable:
      case HostSingleton:
        return ElementTypeHostComponent;

      case HostPortal:
      case HostText:
      case Fragment:
        return ElementTypeOtherOrUnknown;

      case MemoComponent:
      case SimpleMemoComponent:
        return types_ElementTypeMemo;

      case SuspenseComponent:
        return ElementTypeSuspense;

      case SuspenseListComponent:
        return ElementTypeSuspenseList;

      case TracingMarkerComponent:
        return ElementTypeTracingMarker;

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case CONCURRENT_MODE_NUMBER:
          case CONCURRENT_MODE_SYMBOL_STRING:
          case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
            return ElementTypeOtherOrUnknown;

          case PROVIDER_NUMBER:
          case PROVIDER_SYMBOL_STRING:
            return ElementTypeContext;

          case CONTEXT_NUMBER:
          case CONTEXT_SYMBOL_STRING:
            return ElementTypeContext;

          case STRICT_MODE_NUMBER:
          case STRICT_MODE_SYMBOL_STRING:
            return ElementTypeOtherOrUnknown;

          case PROFILER_NUMBER:
          case PROFILER_SYMBOL_STRING:
            return ElementTypeProfiler;

          default:
            return ElementTypeOtherOrUnknown;
        }

    }
  } // When profiling is supported, we store the latest tree base durations for each Fiber.
  // This is so that we can quickly capture a snapshot of those values if profiling starts.
  // If we didn't store these values, we'd have to crawl the tree when profiling started,
  // and use a slow path to find each of the current Fibers.


  var idToTreeBaseDurationMap = new Map(); // When profiling is supported, we store the latest tree base durations for each Fiber.
  // This map enables us to filter these times by root when sending them to the frontend.

  var idToRootMap = new Map(); // When a mount or update is in progress, this value tracks the root that is being operated on.

  var currentRootID = -1; // Returns the unique ID for a Fiber or generates and caches a new one if the Fiber hasn't been seen before.
  // Once this method has been called for a Fiber, untrackFiberID() should always be called later to avoid leaking.

  function getOrGenerateFiberID(fiber) {
    var id = null;

    if (fiberToIDMap.has(fiber)) {
      id = fiberToIDMap.get(fiber);
    } else {
      var _alternate = fiber.alternate;

      if (_alternate !== null && fiberToIDMap.has(_alternate)) {
        id = fiberToIDMap.get(_alternate);
      }
    }

    var didGenerateID = false;

    if (id === null) {
      didGenerateID = true;
      id = getUID();
    } // This refinement is for Flow purposes only.


    var refinedID = id; // Make sure we're tracking this Fiber
    // e.g. if it just mounted or an error was logged during initial render.

    if (!fiberToIDMap.has(fiber)) {
      fiberToIDMap.set(fiber, refinedID);
      idToArbitraryFiberMap.set(refinedID, fiber);
    } // Also make sure we're tracking its alternate,
    // e.g. in case this is the first update after mount.


    var alternate = fiber.alternate;

    if (alternate !== null) {
      if (!fiberToIDMap.has(alternate)) {
        fiberToIDMap.set(alternate, refinedID);
      }
    }

    if (__DEBUG__) {
      if (didGenerateID) {
        debug('getOrGenerateFiberID()', fiber, fiber.return, 'Generated a new UID');
      }
    }

    return refinedID;
  } // Returns an ID if one has already been generated for the Fiber or throws.


  function getFiberIDThrows(fiber) {
    var maybeID = getFiberIDUnsafe(fiber);

    if (maybeID !== null) {
      return maybeID;
    }

    throw Error("Could not find ID for Fiber \"".concat(getDisplayNameForFiber(fiber) || '', "\""));
  } // Returns an ID if one has already been generated for the Fiber or null if one has not been generated.
  // Use this method while e.g. logging to avoid over-retaining Fibers.


  function getFiberIDUnsafe(fiber) {
    if (fiberToIDMap.has(fiber)) {
      return fiberToIDMap.get(fiber);
    } else {
      var alternate = fiber.alternate;

      if (alternate !== null && fiberToIDMap.has(alternate)) {
        return fiberToIDMap.get(alternate);
      }
    }

    return null;
  } // Removes a Fiber (and its alternate) from the Maps used to track their id.
  // This method should always be called when a Fiber is unmounting.


  function untrackFiberID(fiber) {
    if (__DEBUG__) {
      debug('untrackFiberID()', fiber, fiber.return, 'schedule after delay');
    } // Untrack Fibers after a slight delay in order to support a Fast Refresh edge case:
    // 1. Component type is updated and Fast Refresh schedules an update+remount.
    // 2. flushPendingErrorsAndWarningsAfterDelay() runs, sees the old Fiber is no longer mounted
    //    (it's been disconnected by Fast Refresh), and calls untrackFiberID() to clear it from the Map.
    // 3. React flushes pending passive effects before it runs the next render,
    //    which logs an error or warning, which causes a new ID to be generated for this Fiber.
    // 4. DevTools now tries to unmount the old Component with the new ID.
    //
    // The underlying problem here is the premature clearing of the Fiber ID,
    // but DevTools has no way to detect that a given Fiber has been scheduled for Fast Refresh.
    // (The "_debugNeedsRemount" flag won't necessarily be set.)
    //
    // The best we can do is to delay untracking by a small amount,
    // and give React time to process the Fast Refresh delay.


    untrackFibersSet.add(fiber); // React may detach alternate pointers during unmount;
    // Since our untracking code is async, we should explicily track the pending alternate here as well.

    var alternate = fiber.alternate;

    if (alternate !== null) {
      untrackFibersSet.add(alternate);
    }

    if (untrackFibersTimeoutID === null) {
      untrackFibersTimeoutID = setTimeout(untrackFibers, 1000);
    }
  }

  var untrackFibersSet = new Set();
  var untrackFibersTimeoutID = null;

  function untrackFibers() {
    if (untrackFibersTimeoutID !== null) {
      clearTimeout(untrackFibersTimeoutID);
      untrackFibersTimeoutID = null;
    }

    untrackFibersSet.forEach(function (fiber) {
      var fiberID = getFiberIDUnsafe(fiber);

      if (fiberID !== null) {
        idToArbitraryFiberMap.delete(fiberID); // Also clear any errors/warnings associated with this fiber.

        clearErrorsForFiberID(fiberID);
        clearWarningsForFiberID(fiberID);
      }

      fiberToIDMap.delete(fiber);
      fiberToComponentStackMap.delete(fiber);
      var alternate = fiber.alternate;

      if (alternate !== null) {
        fiberToIDMap.delete(alternate);
        fiberToComponentStackMap.delete(alternate);
      }

      if (forceErrorForFiberIDs.has(fiberID)) {
        forceErrorForFiberIDs.delete(fiberID);

        if (forceErrorForFiberIDs.size === 0 && setErrorHandler != null) {
          setErrorHandler(shouldErrorFiberAlwaysNull);
        }
      }
    });
    untrackFibersSet.clear();
  }

  function getChangeDescription(prevFiber, nextFiber) {
    switch (getElementTypeForFiber(nextFiber)) {
      case types_ElementTypeClass:
      case types_ElementTypeFunction:
      case types_ElementTypeMemo:
      case types_ElementTypeForwardRef:
        if (prevFiber === null) {
          return {
            context: null,
            didHooksChange: false,
            isFirstMount: true,
            props: null,
            state: null
          };
        } else {
          var data = {
            context: getContextChangedKeys(nextFiber),
            didHooksChange: false,
            isFirstMount: false,
            props: getChangedKeys(prevFiber.memoizedProps, nextFiber.memoizedProps),
            state: getChangedKeys(prevFiber.memoizedState, nextFiber.memoizedState)
          }; // Only traverse the hooks list once, depending on what info we're returning.

          var indices = getChangedHooksIndices(prevFiber.memoizedState, nextFiber.memoizedState);
          data.hooks = indices;
          data.didHooksChange = indices !== null && indices.length > 0;
          return data;
        }

      default:
        return null;
    }
  }

  function updateContextsForFiber(fiber) {
    switch (getElementTypeForFiber(fiber)) {
      case types_ElementTypeClass:
      case types_ElementTypeForwardRef:
      case types_ElementTypeFunction:
      case types_ElementTypeMemo:
        if (idToContextsMap !== null) {
          var id = getFiberIDThrows(fiber);
          var contexts = getContextsForFiber(fiber);

          if (contexts !== null) {
            // $FlowFixMe[incompatible-use] found when upgrading Flow
            idToContextsMap.set(id, contexts);
          }
        }

        break;

      default:
        break;
    }
  } // Differentiates between a null context value and no context.


  var NO_CONTEXT = {};

  function getContextsForFiber(fiber) {
    var legacyContext = NO_CONTEXT;
    var modernContext = NO_CONTEXT;

    switch (getElementTypeForFiber(fiber)) {
      case types_ElementTypeClass:
        var instance = fiber.stateNode;

        if (instance != null) {
          if (instance.constructor && instance.constructor.contextType != null) {
            modernContext = instance.context;
          } else {
            legacyContext = instance.context;

            if (legacyContext && Object.keys(legacyContext).length === 0) {
              legacyContext = NO_CONTEXT;
            }
          }
        }

        return [legacyContext, modernContext];

      case types_ElementTypeForwardRef:
      case types_ElementTypeFunction:
      case types_ElementTypeMemo:
        var dependencies = fiber.dependencies;

        if (dependencies && dependencies.firstContext) {
          modernContext = dependencies.firstContext;
        }

        return [legacyContext, modernContext];

      default:
        return null;
    }
  } // Record all contexts at the time profiling is started.
  // Fibers only store the current context value,
  // so we need to track them separately in order to determine changed keys.


  function crawlToInitializeContextsMap(fiber) {
    var id = getFiberIDUnsafe(fiber); // Not all Fibers in the subtree have mounted yet.
    // For example, Offscreen (hidden) or Suspense (suspended) subtrees won't yet be tracked.
    // We can safely skip these subtrees.

    if (id !== null) {
      updateContextsForFiber(fiber);
      var current = fiber.child;

      while (current !== null) {
        crawlToInitializeContextsMap(current);
        current = current.sibling;
      }
    }
  }

  function getContextChangedKeys(fiber) {
    if (idToContextsMap !== null) {
      var id = getFiberIDThrows(fiber); // $FlowFixMe[incompatible-use] found when upgrading Flow

      var prevContexts = idToContextsMap.has(id) ? // $FlowFixMe[incompatible-use] found when upgrading Flow
      idToContextsMap.get(id) : null;
      var nextContexts = getContextsForFiber(fiber);

      if (prevContexts == null || nextContexts == null) {
        return null;
      }

      var _prevContexts = renderer_slicedToArray(prevContexts, 2),
          prevLegacyContext = _prevContexts[0],
          prevModernContext = _prevContexts[1];

      var _nextContexts = renderer_slicedToArray(nextContexts, 2),
          nextLegacyContext = _nextContexts[0],
          nextModernContext = _nextContexts[1];

      switch (getElementTypeForFiber(fiber)) {
        case types_ElementTypeClass:
          if (prevContexts && nextContexts) {
            if (nextLegacyContext !== NO_CONTEXT) {
              return getChangedKeys(prevLegacyContext, nextLegacyContext);
            } else if (nextModernContext !== NO_CONTEXT) {
              return prevModernContext !== nextModernContext;
            }
          }

          break;

        case types_ElementTypeForwardRef:
        case types_ElementTypeFunction:
        case types_ElementTypeMemo:
          if (nextModernContext !== NO_CONTEXT) {
            var prevContext = prevModernContext;
            var nextContext = nextModernContext;

            while (prevContext && nextContext) {
              // Note this only works for versions of React that support this key (e.v. 18+)
              // For older versions, there's no good way to read the current context value after render has completed.
              // This is because React maintains a stack of context values during render,
              // but by the time DevTools is called, render has finished and the stack is empty.
              if (!shared_objectIs(prevContext.memoizedValue, nextContext.memoizedValue)) {
                return true;
              }

              prevContext = prevContext.next;
              nextContext = nextContext.next;
            }

            return false;
          }

          break;

        default:
          break;
      }
    }

    return null;
  }

  function isHookThatCanScheduleUpdate(hookObject) {
    var queue = hookObject.queue;

    if (!queue) {
      return false;
    }

    var boundHasOwnProperty = shared_hasOwnProperty.bind(queue); // Detect the shape of useState() / useReducer() / useTransition()
    // using the attributes that are unique to these hooks
    // but also stable (e.g. not tied to current Lanes implementation)
    // We don't check for dispatch property, because useTransition doesn't have it

    if (boundHasOwnProperty('pending')) {
      return true;
    } // Detect useSyncExternalStore()


    return boundHasOwnProperty('value') && boundHasOwnProperty('getSnapshot') && typeof queue.getSnapshot === 'function';
  }

  function didStatefulHookChange(prev, next) {
    var prevMemoizedState = prev.memoizedState;
    var nextMemoizedState = next.memoizedState;

    if (isHookThatCanScheduleUpdate(prev)) {
      return prevMemoizedState !== nextMemoizedState;
    }

    return false;
  }

  function getChangedHooksIndices(prev, next) {
    if (prev == null || next == null) {
      return null;
    }

    var indices = [];
    var index = 0;

    if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
      while (next !== null) {
        if (didStatefulHookChange(prev, next)) {
          indices.push(index);
        }

        next = next.next;
        prev = prev.next;
        index++;
      }
    }

    return indices;
  }

  function getChangedKeys(prev, next) {
    if (prev == null || next == null) {
      return null;
    } // We can't report anything meaningful for hooks changes.


    if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
      return null;
    }

    var keys = new Set([].concat(renderer_toConsumableArray(Object.keys(prev)), renderer_toConsumableArray(Object.keys(next))));
    var changedKeys = []; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

    var _iterator4 = renderer_createForOfIteratorHelper(keys),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var key = _step4.value;

        if (prev[key] !== next[key]) {
          changedKeys.push(key);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return changedKeys;
  }

  function didFiberRender(prevFiber, nextFiber) {
    switch (nextFiber.tag) {
      case ClassComponent:
      case FunctionComponent:
      case ContextConsumer:
      case MemoComponent:
      case SimpleMemoComponent:
      case ForwardRef:
        // For types that execute user code, we check PerformedWork effect.
        // We don't reflect bailouts (either referential or sCU) in DevTools.
        // TODO: This flag is a leaked implementation detail. Once we start
        // releasing DevTools in lockstep with React, we should import a
        // function from the reconciler instead.
        var PerformedWork = 1;
        return (getFiberFlags(nextFiber) & PerformedWork) === PerformedWork;
      // Note: ContextConsumer only gets PerformedWork effect in 16.3.3+
      // so it won't get highlighted with React 16.3.0 to 16.3.2.

      default:
        // For host components and other types, we compare inputs
        // to determine whether something is an update.
        return prevFiber.memoizedProps !== nextFiber.memoizedProps || prevFiber.memoizedState !== nextFiber.memoizedState || prevFiber.ref !== nextFiber.ref;
    }
  }

  var pendingOperations = [];
  var pendingRealUnmountedIDs = [];
  var pendingSimulatedUnmountedIDs = [];
  var pendingOperationsQueue = [];
  var pendingStringTable = new Map();
  var pendingStringTableLength = 0;
  var pendingUnmountedRootID = null;

  function pushOperation(op) {
    if (false) {}

    pendingOperations.push(op);
  }

  function shouldBailoutWithPendingOperations() {
    if (isProfiling) {
      if (currentCommitProfilingMetadata != null && currentCommitProfilingMetadata.durations.length > 0) {
        return false;
      }
    }

    return pendingOperations.length === 0 && pendingRealUnmountedIDs.length === 0 && pendingSimulatedUnmountedIDs.length === 0 && pendingUnmountedRootID === null;
  }

  function flushOrQueueOperations(operations) {
    if (shouldBailoutWithPendingOperations()) {
      return;
    }

    if (pendingOperationsQueue !== null) {
      pendingOperationsQueue.push(operations);
    } else {
      hook.emit('operations', operations);
    }
  }

  var flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;

  function clearPendingErrorsAndWarningsAfterDelay() {
    if (flushPendingErrorsAndWarningsAfterDelayTimeoutID !== null) {
      clearTimeout(flushPendingErrorsAndWarningsAfterDelayTimeoutID);
      flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;
    }
  }

  function flushPendingErrorsAndWarningsAfterDelay() {
    clearPendingErrorsAndWarningsAfterDelay();
    flushPendingErrorsAndWarningsAfterDelayTimeoutID = setTimeout(function () {
      flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;

      if (pendingOperations.length > 0) {
        // On the off chance that something else has pushed pending operations,
        // we should bail on warnings; it's probably not safe to push midway.
        return;
      }

      recordPendingErrorsAndWarnings();

      if (shouldBailoutWithPendingOperations()) {
        // No warnings or errors to flush; we can bail out early here too.
        return;
      } // We can create a smaller operations array than flushPendingEvents()
      // because we only need to flush warning and error counts.
      // Only a few pieces of fixed information are required up front.


      var operations = new Array(3 + pendingOperations.length);
      operations[0] = rendererID;
      operations[1] = currentRootID;
      operations[2] = 0; // String table size

      for (var j = 0; j < pendingOperations.length; j++) {
        operations[3 + j] = pendingOperations[j];
      }

      flushOrQueueOperations(operations);
      pendingOperations.length = 0;
    }, 1000);
  }

  function reevaluateErrorsAndWarnings() {
    fibersWithChangedErrorOrWarningCounts.clear();
    fiberIDToErrorsMap.forEach(function (countMap, fiberID) {
      var fiber = idToArbitraryFiberMap.get(fiberID);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
      }
    });
    fiberIDToWarningsMap.forEach(function (countMap, fiberID) {
      var fiber = idToArbitraryFiberMap.get(fiberID);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
      }
    });
    recordPendingErrorsAndWarnings();
  }

  function mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToMessageCountMap, fiberIDToMessageCountMap) {
    var newCount = 0;
    var messageCountMap = fiberIDToMessageCountMap.get(fiberID);
    var pendingMessageCountMap = pendingFiberToMessageCountMap.get(fiber);

    if (pendingMessageCountMap != null) {
      if (messageCountMap == null) {
        messageCountMap = pendingMessageCountMap;
        fiberIDToMessageCountMap.set(fiberID, pendingMessageCountMap);
      } else {
        // This Flow refinement should not be necessary and yet...
        var refinedMessageCountMap = messageCountMap;
        pendingMessageCountMap.forEach(function (pendingCount, message) {
          var previousCount = refinedMessageCountMap.get(message) || 0;
          refinedMessageCountMap.set(message, previousCount + pendingCount);
        });
      }
    }

    if (!shouldFilterFiber(fiber)) {
      if (messageCountMap != null) {
        messageCountMap.forEach(function (count) {
          newCount += count;
        });
      }
    }

    pendingFiberToMessageCountMap.delete(fiber);
    return newCount;
  }

  function recordPendingErrorsAndWarnings() {
    clearPendingErrorsAndWarningsAfterDelay();
    fibersWithChangedErrorOrWarningCounts.forEach(function (fiber) {
      var fiberID = getFiberIDUnsafe(fiber);

      if (fiberID === null) {// Don't send updates for Fibers that didn't mount due to e.g. Suspense or an error boundary.
      } else {
        var errorCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
        var warningCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
        pushOperation(TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS);
        pushOperation(fiberID);
        pushOperation(errorCount);
        pushOperation(warningCount);
      } // Always clean up so that we don't leak.


      pendingFiberToErrorsMap.delete(fiber);
      pendingFiberToWarningsMap.delete(fiber);
    });
    fibersWithChangedErrorOrWarningCounts.clear();
  }

  function flushPendingEvents(root) {
    // Add any pending errors and warnings to the operations array.
    // We do this just before flushing, so we can ignore errors for no-longer-mounted Fibers.
    recordPendingErrorsAndWarnings();

    if (shouldBailoutWithPendingOperations()) {
      // If we aren't profiling, we can just bail out here.
      // No use sending an empty update over the bridge.
      //
      // The Profiler stores metadata for each commit and reconstructs the app tree per commit using:
      // (1) an initial tree snapshot and
      // (2) the operations array for each commit
      // Because of this, it's important that the operations and metadata arrays align,
      // So it's important not to omit even empty operations while profiling is active.
      return;
    }

    var numUnmountIDs = pendingRealUnmountedIDs.length + pendingSimulatedUnmountedIDs.length + (pendingUnmountedRootID === null ? 0 : 1);
    var operations = new Array( // Identify which renderer this update is coming from.
    2 + // [rendererID, rootFiberID]
    // How big is the string table?
    1 + // [stringTableLength]
    // Then goes the actual string table.
    pendingStringTableLength + ( // All unmounts are batched in a single message.
    // [TREE_OPERATION_REMOVE, removedIDLength, ...ids]
    numUnmountIDs > 0 ? 2 + numUnmountIDs : 0) + // Regular operations
    pendingOperations.length); // Identify which renderer this update is coming from.
    // This enables roots to be mapped to renderers,
    // Which in turn enables fiber props, states, and hooks to be inspected.

    var i = 0;
    operations[i++] = rendererID;
    operations[i++] = currentRootID; // Now fill in the string table.
    // [stringTableLength, str1Length, ...str1, str2Length, ...str2, ...]

    operations[i++] = pendingStringTableLength;
    pendingStringTable.forEach(function (entry, stringKey) {
      var encodedString = entry.encodedString; // Don't use the string length.
      // It won't work for multibyte characters (like emoji).

      var length = encodedString.length;
      operations[i++] = length;

      for (var j = 0; j < length; j++) {
        operations[i + j] = encodedString[j];
      }

      i += length;
    });

    if (numUnmountIDs > 0) {
      // All unmounts except roots are batched in a single message.
      operations[i++] = TREE_OPERATION_REMOVE; // The first number is how many unmounted IDs we're gonna send.

      operations[i++] = numUnmountIDs; // Fill in the real unmounts in the reverse order.
      // They were inserted parents-first by React, but we want children-first.
      // So we traverse our array backwards.

      for (var j = pendingRealUnmountedIDs.length - 1; j >= 0; j--) {
        operations[i++] = pendingRealUnmountedIDs[j];
      } // Fill in the simulated unmounts (hidden Suspense subtrees) in their order.
      // (We want children to go before parents.)
      // They go *after* the real unmounts because we know for sure they won't be
      // children of already pushed "real" IDs. If they were, we wouldn't be able
      // to discover them during the traversal, as they would have been deleted.


      for (var _j = 0; _j < pendingSimulatedUnmountedIDs.length; _j++) {
        operations[i + _j] = pendingSimulatedUnmountedIDs[_j];
      }

      i += pendingSimulatedUnmountedIDs.length; // The root ID should always be unmounted last.

      if (pendingUnmountedRootID !== null) {
        operations[i] = pendingUnmountedRootID;
        i++;
      }
    } // Fill in the rest of the operations.


    for (var _j2 = 0; _j2 < pendingOperations.length; _j2++) {
      operations[i + _j2] = pendingOperations[_j2];
    }

    i += pendingOperations.length; // Let the frontend know about tree operations.

    flushOrQueueOperations(operations); // Reset all of the pending state now that we've told the frontend about it.

    pendingOperations.length = 0;
    pendingRealUnmountedIDs.length = 0;
    pendingSimulatedUnmountedIDs.length = 0;
    pendingUnmountedRootID = null;
    pendingStringTable.clear();
    pendingStringTableLength = 0;
  }

  function getStringID(string) {
    if (string === null) {
      return 0;
    }

    var existingEntry = pendingStringTable.get(string);

    if (existingEntry !== undefined) {
      return existingEntry.id;
    }

    var id = pendingStringTable.size + 1;
    var encodedString = utfEncodeString(string);
    pendingStringTable.set(string, {
      encodedString: encodedString,
      id: id
    }); // The string table total length needs to account both for the string length,
    // and for the array item that contains the length itself.
    //
    // Don't use string length for this table.
    // It won't work for multibyte characters (like emoji).

    pendingStringTableLength += encodedString.length + 1;
    return id;
  }

  function recordMount(fiber, parentFiber) {
    var isRoot = fiber.tag === HostRoot;
    var id = getOrGenerateFiberID(fiber);

    if (__DEBUG__) {
      debug('recordMount()', fiber, parentFiber);
    }

    var hasOwnerMetadata = fiber.hasOwnProperty('_debugOwner');
    var isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration'); // Adding a new field here would require a bridge protocol version bump (a backwads breaking change).
    // Instead let's re-purpose a pre-existing field to carry more information.

    var profilingFlags = 0;

    if (isProfilingSupported) {
      profilingFlags = PROFILING_FLAG_BASIC_SUPPORT;

      if (typeof injectProfilingHooks === 'function') {
        profilingFlags |= PROFILING_FLAG_TIMELINE_SUPPORT;
      }
    }

    if (isRoot) {
      // Set supportsStrictMode to false for production renderer builds
      var isProductionBuildOfRenderer = renderer.bundleType === 0;
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(ElementTypeRoot);
      pushOperation((fiber.mode & StrictModeBits) !== 0 ? 1 : 0);
      pushOperation(profilingFlags);
      pushOperation(!isProductionBuildOfRenderer && StrictModeBits !== 0 ? 1 : 0);
      pushOperation(hasOwnerMetadata ? 1 : 0);

      if (isProfiling) {
        if (displayNamesByRootID !== null) {
          displayNamesByRootID.set(id, getDisplayNameForRoot(fiber));
        }
      }
    } else {
      var key = fiber.key;
      var displayName = getDisplayNameForFiber(fiber);
      var elementType = getElementTypeForFiber(fiber);
      var debugOwner = fiber._debugOwner; // Ideally we should call getFiberIDThrows() for _debugOwner,
      // since owners are almost always higher in the tree (and so have already been processed),
      // but in some (rare) instances reported in open source, a descendant mounts before an owner.
      // Since this is a DEV only field it's probably okay to also just lazily generate and ID here if needed.
      // See https://github.com/facebook/react/issues/21445

      var ownerID;

      if (debugOwner != null) {
        if (typeof debugOwner.tag === 'number') {
          ownerID = getOrGenerateFiberID(debugOwner);
        } else {
          // TODO: Track Server Component Owners.
          ownerID = 0;
        }
      } else {
        ownerID = 0;
      }

      var parentID = parentFiber ? getFiberIDThrows(parentFiber) : 0;
      var displayNameStringID = getStringID(displayName); // This check is a guard to handle a React element that has been modified
      // in such a way as to bypass the default stringification of the "key" property.

      var keyString = key === null ? null : String(key);
      var keyStringID = getStringID(keyString);
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(elementType);
      pushOperation(parentID);
      pushOperation(ownerID);
      pushOperation(displayNameStringID);
      pushOperation(keyStringID); // If this subtree has a new mode, let the frontend know.

      if ((fiber.mode & StrictModeBits) !== 0 && (parentFiber.mode & StrictModeBits) === 0) {
        pushOperation(TREE_OPERATION_SET_SUBTREE_MODE);
        pushOperation(id);
        pushOperation(StrictMode);
      }
    }

    if (isProfilingSupported) {
      idToRootMap.set(id, currentRootID);
      recordProfilingDurations(fiber);
    }
  }

  function recordUnmount(fiber, isSimulated) {
    if (__DEBUG__) {
      debug('recordUnmount()', fiber, null, isSimulated ? 'unmount is simulated' : '');
    }

    if (trackedPathMatchFiber !== null) {
      // We're in the process of trying to restore previous selection.
      // If this fiber matched but is being unmounted, there's no use trying.
      // Reset the state so we don't keep holding onto it.
      if (fiber === trackedPathMatchFiber || fiber === trackedPathMatchFiber.alternate) {
        setTrackedPath(null);
      }
    }

    var unsafeID = getFiberIDUnsafe(fiber);

    if (unsafeID === null) {
      // If we've never seen this Fiber, it might be inside of a legacy render Suspense fragment (so the store is not even aware of it).
      // In that case we can just ignore it or it will cause errors later on.
      // One example of this is a Lazy component that never resolves before being unmounted.
      //
      // This also might indicate a Fast Refresh force-remount scenario.
      //
      // TODO: This is fragile and can obscure actual bugs.
      return;
    } // Flow refinement.


    var id = unsafeID;
    var isRoot = fiber.tag === HostRoot;

    if (isRoot) {
      // Roots must be removed only after all children (pending and simulated) have been removed.
      // So we track it separately.
      pendingUnmountedRootID = id;
    } else if (!shouldFilterFiber(fiber)) {
      // To maintain child-first ordering,
      // we'll push it into one of these queues,
      // and later arrange them in the correct order.
      if (isSimulated) {
        pendingSimulatedUnmountedIDs.push(id);
      } else {
        pendingRealUnmountedIDs.push(id);
      }
    }

    if (!fiber._debugNeedsRemount) {
      untrackFiberID(fiber);
      var isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration');

      if (isProfilingSupported) {
        idToRootMap.delete(id);
        idToTreeBaseDurationMap.delete(id);
      }
    }
  }

  function mountFiberRecursively(firstChild, parentFiber, traverseSiblings, traceNearestHostComponentUpdate) {
    // Iterate over siblings rather than recursing.
    // This reduces the chance of stack overflow for wide trees (e.g. lists with many items).
    var fiber = firstChild;

    while (fiber !== null) {
      // Generate an ID even for filtered Fibers, in case it's needed later (e.g. for Profiling).
      getOrGenerateFiberID(fiber);

      if (__DEBUG__) {
        debug('mountFiberRecursively()', fiber, parentFiber);
      } // If we have the tree selection from previous reload, try to match this Fiber.
      // Also remember whether to do the same for siblings.


      var mightSiblingsBeOnTrackedPath = updateTrackedPathStateBeforeMount(fiber);
      var shouldIncludeInTree = !shouldFilterFiber(fiber);

      if (shouldIncludeInTree) {
        recordMount(fiber, parentFiber);
      }

      if (traceUpdatesEnabled) {
        if (traceNearestHostComponentUpdate) {
          var elementType = getElementTypeForFiber(fiber); // If an ancestor updated, we should mark the nearest host nodes for highlighting.

          if (elementType === ElementTypeHostComponent) {
            traceUpdatesForNodes.add(fiber.stateNode);
            traceNearestHostComponentUpdate = false;
          }
        } // We intentionally do not re-enable the traceNearestHostComponentUpdate flag in this branch,
        // because we don't want to highlight every host node inside of a newly mounted subtree.

      }

      var isSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent;

      if (isSuspense) {
        var isTimedOut = fiber.memoizedState !== null;

        if (isTimedOut) {
          // Special case: if Suspense mounts in a timed-out state,
          // get the fallback child from the inner fragment and mount
          // it as if it was our own child. Updates handle this too.
          var primaryChildFragment = fiber.child;
          var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
          var fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

          if (fallbackChild !== null) {
            mountFiberRecursively(fallbackChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        } else {
          var primaryChild = null;
          var areSuspenseChildrenConditionallyWrapped = OffscreenComponent === -1;

          if (areSuspenseChildrenConditionallyWrapped) {
            primaryChild = fiber.child;
          } else if (fiber.child !== null) {
            primaryChild = fiber.child.child;
          }

          if (primaryChild !== null) {
            mountFiberRecursively(primaryChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        }
      } else {
        if (fiber.child !== null) {
          mountFiberRecursively(fiber.child, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
        }
      } // We're exiting this Fiber now, and entering its siblings.
      // If we have selection to restore, we might need to re-activate tracking.


      updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath);
      fiber = traverseSiblings ? fiber.sibling : null;
    }
  } // We use this to simulate unmounting for Suspense trees
  // when we switch from primary to fallback.


  function unmountFiberChildrenRecursively(fiber) {
    if (__DEBUG__) {
      debug('unmountFiberChildrenRecursively()', fiber);
    } // We might meet a nested Suspense on our way.


    var isTimedOutSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent && fiber.memoizedState !== null;
    var child = fiber.child;

    if (isTimedOutSuspense) {
      // If it's showing fallback tree, let's traverse it instead.
      var primaryChildFragment = fiber.child;
      var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null; // Skip over to the real Fiber child.

      child = fallbackChildFragment ? fallbackChildFragment.child : null;
    }

    while (child !== null) {
      // Record simulated unmounts children-first.
      // We skip nodes without return because those are real unmounts.
      if (child.return !== null) {
        unmountFiberChildrenRecursively(child);
        recordUnmount(child, true);
      }

      child = child.sibling;
    }
  }

  function recordProfilingDurations(fiber) {
    var id = getFiberIDThrows(fiber);
    var actualDuration = fiber.actualDuration,
        treeBaseDuration = fiber.treeBaseDuration;
    idToTreeBaseDurationMap.set(id, treeBaseDuration || 0);

    if (isProfiling) {
      var alternate = fiber.alternate; // It's important to update treeBaseDuration even if the current Fiber did not render,
      // because it's possible that one of its descendants did.

      if (alternate == null || treeBaseDuration !== alternate.treeBaseDuration) {
        // Tree base duration updates are included in the operations typed array.
        // So we have to convert them from milliseconds to microseconds so we can send them as ints.
        var convertedTreeBaseDuration = Math.floor((treeBaseDuration || 0) * 1000);
        pushOperation(TREE_OPERATION_UPDATE_TREE_BASE_DURATION);
        pushOperation(id);
        pushOperation(convertedTreeBaseDuration);
      }

      if (alternate == null || didFiberRender(alternate, fiber)) {
        if (actualDuration != null) {
          // The actual duration reported by React includes time spent working on children.
          // This is useful information, but it's also useful to be able to exclude child durations.
          // The frontend can't compute this, since the immediate children may have been filtered out.
          // So we need to do this on the backend.
          // Note that this calculated self duration is not the same thing as the base duration.
          // The two are calculated differently (tree duration does not accumulate).
          var selfDuration = actualDuration;
          var child = fiber.child;

          while (child !== null) {
            selfDuration -= child.actualDuration || 0;
            child = child.sibling;
          } // If profiling is active, store durations for elements that were rendered during the commit.
          // Note that we should do this for any fiber we performed work on, regardless of its actualDuration value.
          // In some cases actualDuration might be 0 for fibers we worked on (particularly if we're using Date.now)
          // In other cases (e.g. Memo) actualDuration might be greater than 0 even if we "bailed out".


          var metadata = currentCommitProfilingMetadata;
          metadata.durations.push(id, actualDuration, selfDuration);
          metadata.maxActualDuration = Math.max(metadata.maxActualDuration, actualDuration);

          if (recordChangeDescriptions) {
            var changeDescription = getChangeDescription(alternate, fiber);

            if (changeDescription !== null) {
              if (metadata.changeDescriptions !== null) {
                metadata.changeDescriptions.set(id, changeDescription);
              }
            }

            updateContextsForFiber(fiber);
          }
        }
      }
    }
  }

  function recordResetChildren(fiber, childSet) {
    if (__DEBUG__) {
      debug('recordResetChildren()', childSet, fiber);
    } // The frontend only really cares about the displayName, key, and children.
    // The first two don't really change, so we are only concerned with the order of children here.
    // This is trickier than a simple comparison though, since certain types of fibers are filtered.


    var nextChildren = []; // This is a naive implementation that shallowly recourses children.
    // We might want to revisit this if it proves to be too inefficient.

    var child = childSet;

    while (child !== null) {
      findReorderedChildrenRecursively(child, nextChildren);
      child = child.sibling;
    }

    var numChildren = nextChildren.length;

    if (numChildren < 2) {
      // No need to reorder.
      return;
    }

    pushOperation(TREE_OPERATION_REORDER_CHILDREN);
    pushOperation(getFiberIDThrows(fiber));
    pushOperation(numChildren);

    for (var i = 0; i < nextChildren.length; i++) {
      pushOperation(nextChildren[i]);
    }
  }

  function findReorderedChildrenRecursively(fiber, nextChildren) {
    if (!shouldFilterFiber(fiber)) {
      nextChildren.push(getFiberIDThrows(fiber));
    } else {
      var child = fiber.child;
      var isTimedOutSuspense = fiber.tag === SuspenseComponent && fiber.memoizedState !== null;

      if (isTimedOutSuspense) {
        // Special case: if Suspense mounts in a timed-out state,
        // get the fallback child from the inner fragment,
        // and skip over the primary child.
        var primaryChildFragment = fiber.child;
        var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
        var fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

        if (fallbackChild !== null) {
          child = fallbackChild;
        }
      }

      while (child !== null) {
        findReorderedChildrenRecursively(child, nextChildren);
        child = child.sibling;
      }
    }
  } // Returns whether closest unfiltered fiber parent needs to reset its child list.


  function updateFiberRecursively(nextFiber, prevFiber, parentFiber, traceNearestHostComponentUpdate) {
    var id = getOrGenerateFiberID(nextFiber);

    if (__DEBUG__) {
      debug('updateFiberRecursively()', nextFiber, parentFiber);
    }

    if (traceUpdatesEnabled) {
      var elementType = getElementTypeForFiber(nextFiber);

      if (traceNearestHostComponentUpdate) {
        // If an ancestor updated, we should mark the nearest host nodes for highlighting.
        if (elementType === ElementTypeHostComponent) {
          traceUpdatesForNodes.add(nextFiber.stateNode);
          traceNearestHostComponentUpdate = false;
        }
      } else {
        if (elementType === types_ElementTypeFunction || elementType === types_ElementTypeClass || elementType === ElementTypeContext || elementType === types_ElementTypeMemo || elementType === types_ElementTypeForwardRef) {
          // Otherwise if this is a traced ancestor, flag for the nearest host descendant(s).
          traceNearestHostComponentUpdate = didFiberRender(prevFiber, nextFiber);
        }
      }
    }

    if (mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === id && didFiberRender(prevFiber, nextFiber)) {
      // If this Fiber has updated, clear cached inspected data.
      // If it is inspected again, it may need to be re-run to obtain updated hooks values.
      hasElementUpdatedSinceLastInspected = true;
    }

    var shouldIncludeInTree = !shouldFilterFiber(nextFiber);
    var isSuspense = nextFiber.tag === SuspenseComponent;
    var shouldResetChildren = false; // The behavior of timed-out Suspense trees is unique.
    // Rather than unmount the timed out content (and possibly lose important state),
    // React re-parents this content within a hidden Fragment while the fallback is showing.
    // This behavior doesn't need to be observable in the DevTools though.
    // It might even result in a bad user experience for e.g. node selection in the Elements panel.
    // The easiest fix is to strip out the intermediate Fragment fibers,
    // so the Elements panel and Profiler don't need to special case them.
    // Suspense components only have a non-null memoizedState if they're timed-out.

    var prevDidTimeout = isSuspense && prevFiber.memoizedState !== null;
    var nextDidTimeOut = isSuspense && nextFiber.memoizedState !== null; // The logic below is inspired by the code paths in updateSuspenseComponent()
    // inside ReactFiberBeginWork in the React source code.

    if (prevDidTimeout && nextDidTimeOut) {
      // Fallback -> Fallback:
      // 1. Reconcile fallback set.
      var nextFiberChild = nextFiber.child;
      var nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null; // Note: We can't use nextFiber.child.sibling.alternate
      // because the set is special and alternate may not exist.

      var prevFiberChild = prevFiber.child;
      var prevFallbackChildSet = prevFiberChild ? prevFiberChild.sibling : null;

      if (prevFallbackChildSet == null && nextFallbackChildSet != null) {
        mountFiberRecursively(nextFallbackChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
        shouldResetChildren = true;
      }

      if (nextFallbackChildSet != null && prevFallbackChildSet != null && updateFiberRecursively(nextFallbackChildSet, prevFallbackChildSet, nextFiber, traceNearestHostComponentUpdate)) {
        shouldResetChildren = true;
      }
    } else if (prevDidTimeout && !nextDidTimeOut) {
      // Fallback -> Primary:
      // 1. Unmount fallback set
      // Note: don't emulate fallback unmount because React actually did it.
      // 2. Mount primary set
      var nextPrimaryChildSet = nextFiber.child;

      if (nextPrimaryChildSet !== null) {
        mountFiberRecursively(nextPrimaryChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
      }

      shouldResetChildren = true;
    } else if (!prevDidTimeout && nextDidTimeOut) {
      // Primary -> Fallback:
      // 1. Hide primary set
      // This is not a real unmount, so it won't get reported by React.
      // We need to manually walk the previous tree and record unmounts.
      unmountFiberChildrenRecursively(prevFiber); // 2. Mount fallback set

      var _nextFiberChild = nextFiber.child;

      var _nextFallbackChildSet = _nextFiberChild ? _nextFiberChild.sibling : null;

      if (_nextFallbackChildSet != null) {
        mountFiberRecursively(_nextFallbackChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
        shouldResetChildren = true;
      }
    } else {
      // Common case: Primary -> Primary.
      // This is the same code path as for non-Suspense fibers.
      if (nextFiber.child !== prevFiber.child) {
        // If the first child is different, we need to traverse them.
        // Each next child will be either a new child (mount) or an alternate (update).
        var nextChild = nextFiber.child;
        var prevChildAtSameIndex = prevFiber.child;

        while (nextChild) {
          // We already know children will be referentially different because
          // they are either new mounts or alternates of previous children.
          // Schedule updates and mounts depending on whether alternates exist.
          // We don't track deletions here because they are reported separately.
          if (nextChild.alternate) {
            var prevChild = nextChild.alternate;

            if (updateFiberRecursively(nextChild, prevChild, shouldIncludeInTree ? nextFiber : parentFiber, traceNearestHostComponentUpdate)) {
              // If a nested tree child order changed but it can't handle its own
              // child order invalidation (e.g. because it's filtered out like host nodes),
              // propagate the need to reset child order upwards to this Fiber.
              shouldResetChildren = true;
            } // However we also keep track if the order of the children matches
            // the previous order. They are always different referentially, but
            // if the instances line up conceptually we'll want to know that.


            if (prevChild !== prevChildAtSameIndex) {
              shouldResetChildren = true;
            }
          } else {
            mountFiberRecursively(nextChild, shouldIncludeInTree ? nextFiber : parentFiber, false, traceNearestHostComponentUpdate);
            shouldResetChildren = true;
          } // Try the next child.


          nextChild = nextChild.sibling; // Advance the pointer in the previous list so that we can
          // keep comparing if they line up.

          if (!shouldResetChildren && prevChildAtSameIndex !== null) {
            prevChildAtSameIndex = prevChildAtSameIndex.sibling;
          }
        } // If we have no more children, but used to, they don't line up.


        if (prevChildAtSameIndex !== null) {
          shouldResetChildren = true;
        }
      } else {
        if (traceUpdatesEnabled) {
          // If we're tracing updates and we've bailed out before reaching a host node,
          // we should fall back to recursively marking the nearest host descendants for highlight.
          if (traceNearestHostComponentUpdate) {
            var hostFibers = findAllCurrentHostFibers(getFiberIDThrows(nextFiber));
            hostFibers.forEach(function (hostFiber) {
              traceUpdatesForNodes.add(hostFiber.stateNode);
            });
          }
        }
      }
    }

    if (shouldIncludeInTree) {
      var isProfilingSupported = nextFiber.hasOwnProperty('treeBaseDuration');

      if (isProfilingSupported) {
        recordProfilingDurations(nextFiber);
      }
    }

    if (shouldResetChildren) {
      // We need to crawl the subtree for closest non-filtered Fibers
      // so that we can display them in a flat children set.
      if (shouldIncludeInTree) {
        // Normally, search for children from the rendered child.
        var nextChildSet = nextFiber.child;

        if (nextDidTimeOut) {
          // Special case: timed-out Suspense renders the fallback set.
          var _nextFiberChild2 = nextFiber.child;
          nextChildSet = _nextFiberChild2 ? _nextFiberChild2.sibling : null;
        }

        if (nextChildSet != null) {
          recordResetChildren(nextFiber, nextChildSet);
        } // We've handled the child order change for this Fiber.
        // Since it's included, there's no need to invalidate parent child order.


        return false;
      } else {
        // Let the closest unfiltered parent Fiber reset its child order instead.
        return true;
      }
    } else {
      return false;
    }
  }

  function cleanup() {// We don't patch any methods so there is no cleanup.
  }

  function rootSupportsProfiling(root) {
    if (root.memoizedInteractions != null) {
      // v16 builds include this field for the scheduler/tracing API.
      return true;
    } else if (root.current != null && root.current.hasOwnProperty('treeBaseDuration')) {
      // The scheduler/tracing API was removed in v17 though
      // so we need to check a non-root Fiber.
      return true;
    } else {
      return false;
    }
  }

  function flushInitialOperations() {
    var localPendingOperationsQueue = pendingOperationsQueue;
    pendingOperationsQueue = null;

    if (localPendingOperationsQueue !== null && localPendingOperationsQueue.length > 0) {
      // We may have already queued up some operations before the frontend connected
      // If so, let the frontend know about them.
      localPendingOperationsQueue.forEach(function (operations) {
        hook.emit('operations', operations);
      });
    } else {
      // Before the traversals, remember to start tracking
      // our path in case we have selection to restore.
      if (trackedPath !== null) {
        mightBeOnTrackedPath = true;
      } // If we have not been profiling, then we can just walk the tree and build up its current state as-is.


      hook.getFiberRoots(rendererID).forEach(function (root) {
        currentRootID = getOrGenerateFiberID(root.current);
        setRootPseudoKey(currentRootID, root.current); // Handle multi-renderer edge-case where only some v16 renderers support profiling.

        if (isProfiling && rootSupportsProfiling(root)) {
          // If profiling is active, store commit time and duration.
          // The frontend may request this information after profiling has stopped.
          currentCommitProfilingMetadata = {
            changeDescriptions: recordChangeDescriptions ? new Map() : null,
            durations: [],
            commitTime: renderer_getCurrentTime() - profilingStartTime,
            maxActualDuration: 0,
            priorityLevel: null,
            updaters: getUpdatersList(root),
            effectDuration: null,
            passiveEffectDuration: null
          };
        }

        mountFiberRecursively(root.current, null, false, false);
        flushPendingEvents(root);
        currentRootID = -1;
      });
    }
  }

  function getUpdatersList(root) {
    return root.memoizedUpdaters != null ? Array.from(root.memoizedUpdaters).filter(function (fiber) {
      return getFiberIDUnsafe(fiber) !== null;
    }).map(fiberToSerializedElement) : null;
  }

  function handleCommitFiberUnmount(fiber) {
    // If the untrackFiberSet already has the unmounted Fiber, this means we've already
    // recordedUnmount, so we don't need to do it again. If we don't do this, we might
    // end up double-deleting Fibers in some cases (like Legacy Suspense).
    if (!untrackFibersSet.has(fiber)) {
      // This is not recursive.
      // We can't traverse fibers after unmounting so instead
      // we rely on React telling us about each unmount.
      recordUnmount(fiber, false);
    }
  }

  function handlePostCommitFiberRoot(root) {
    if (isProfiling && rootSupportsProfiling(root)) {
      if (currentCommitProfilingMetadata !== null) {
        var _getEffectDurations = getEffectDurations(root),
            effectDuration = _getEffectDurations.effectDuration,
            passiveEffectDuration = _getEffectDurations.passiveEffectDuration; // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentCommitProfilingMetadata.effectDuration = effectDuration; // $FlowFixMe[incompatible-use] found when upgrading Flow

        currentCommitProfilingMetadata.passiveEffectDuration = passiveEffectDuration;
      }
    }
  }

  function handleCommitFiberRoot(root, priorityLevel) {
    var current = root.current;
    var alternate = current.alternate; // Flush any pending Fibers that we are untracking before processing the new commit.
    // If we don't do this, we might end up double-deleting Fibers in some cases (like Legacy Suspense).

    untrackFibers();
    currentRootID = getOrGenerateFiberID(current); // Before the traversals, remember to start tracking
    // our path in case we have selection to restore.

    if (trackedPath !== null) {
      mightBeOnTrackedPath = true;
    }

    if (traceUpdatesEnabled) {
      traceUpdatesForNodes.clear();
    } // Handle multi-renderer edge-case where only some v16 renderers support profiling.


    var isProfilingSupported = rootSupportsProfiling(root);

    if (isProfiling && isProfilingSupported) {
      // If profiling is active, store commit time and duration.
      // The frontend may request this information after profiling has stopped.
      currentCommitProfilingMetadata = {
        changeDescriptions: recordChangeDescriptions ? new Map() : null,
        durations: [],
        commitTime: renderer_getCurrentTime() - profilingStartTime,
        maxActualDuration: 0,
        priorityLevel: priorityLevel == null ? null : formatPriorityLevel(priorityLevel),
        updaters: getUpdatersList(root),
        // Initialize to null; if new enough React version is running,
        // these values will be read during separate handlePostCommitFiberRoot() call.
        effectDuration: null,
        passiveEffectDuration: null
      };
    }

    if (alternate) {
      // TODO: relying on this seems a bit fishy.
      var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && // A dehydrated root is not considered mounted
      alternate.memoizedState.isDehydrated !== true;
      var isMounted = current.memoizedState != null && current.memoizedState.element != null && // A dehydrated root is not considered mounted
      current.memoizedState.isDehydrated !== true;

      if (!wasMounted && isMounted) {
        // Mount a new root.
        setRootPseudoKey(currentRootID, current);
        mountFiberRecursively(current, null, false, false);
      } else if (wasMounted && isMounted) {
        // Update an existing root.
        updateFiberRecursively(current, alternate, null, false);
      } else if (wasMounted && !isMounted) {
        // Unmount an existing root.
        removeRootPseudoKey(currentRootID);
        recordUnmount(current, false);
      }
    } else {
      // Mount a new root.
      setRootPseudoKey(currentRootID, current);
      mountFiberRecursively(current, null, false, false);
    }

    if (isProfiling && isProfilingSupported) {
      if (!shouldBailoutWithPendingOperations()) {
        var commitProfilingMetadata = rootToCommitProfilingMetadataMap.get(currentRootID);

        if (commitProfilingMetadata != null) {
          commitProfilingMetadata.push(currentCommitProfilingMetadata);
        } else {
          rootToCommitProfilingMetadataMap.set(currentRootID, [currentCommitProfilingMetadata]);
        }
      }
    } // We're done here.


    flushPendingEvents(root);

    if (traceUpdatesEnabled) {
      hook.emit('traceUpdates', traceUpdatesForNodes);
    }

    currentRootID = -1;
  }

  function findAllCurrentHostFibers(id) {
    var fibers = [];
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (!fiber) {
      return fibers;
    } // Next we'll drill down this component to find all HostComponent/Text.


    var node = fiber;

    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        fibers.push(node);
      } else if (node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === fiber) {
        return fibers;
      }

      while (!node.sibling) {
        if (!node.return || node.return === fiber) {
          return fibers;
        }

        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    } // Flow needs the return here, but ESLint complains about it.
    // eslint-disable-next-line no-unreachable


    return fibers;
  }

  function findNativeNodesForFiberID(id) {
    try {
      var _fiber3 = findCurrentFiberUsingSlowPathById(id);

      if (_fiber3 === null) {
        return null;
      }

      var hostFibers = findAllCurrentHostFibers(id);
      return hostFibers.map(function (hostFiber) {
        return hostFiber.stateNode;
      }).filter(Boolean);
    } catch (err) {
      // The fiber might have unmounted by now.
      return null;
    }
  }

  function getDisplayNameForFiberID(id) {
    var fiber = idToArbitraryFiberMap.get(id);
    return fiber != null ? getDisplayNameForFiber(fiber) : null;
  }

  function getFiberForNative(hostInstance) {
    return renderer.findFiberByHostInstance(hostInstance);
  }

  function getFiberIDForNative(hostInstance) {
    var findNearestUnfilteredAncestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var fiber = renderer.findFiberByHostInstance(hostInstance);

    if (fiber != null) {
      if (findNearestUnfilteredAncestor) {
        while (fiber !== null && shouldFilterFiber(fiber)) {
          fiber = fiber.return;
        }
      }

      return getFiberIDThrows(fiber);
    }

    return null;
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js


  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber) {
      throw new Error('Unable to find node on an unmounted component.');
    }
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js


  function getNearestMountedFiber(fiber) {
    var node = fiber;
    var nearestMounted = fiber;

    if (!fiber.alternate) {
      // If there is no alternate, this might be a new tree that isn't inserted
      // yet. If it is, then it will have a pending insertion effect on it.
      var nextNode = node;

      do {
        node = nextNode; // TODO: This function, and these flags, are a leaked implementation
        // detail. Once we start releasing DevTools in lockstep with React, we
        // should import a function from the reconciler instead.

        var Placement = 2;
        var Hydrating = 4096;

        if ((node.flags & (Placement | Hydrating)) !== 0) {
          // This is an insertion or in-progress hydration. The nearest possible
          // mounted fiber is the parent but we need to continue to figure out
          // if that one is still mounted.
          nearestMounted = node.return;
        } // $FlowFixMe[incompatible-type] we bail out when we get a null


        nextNode = node.return;
      } while (nextNode);
    } else {
      while (node.return) {
        node = node.return;
      }
    }

    if (node.tag === HostRoot) {
      // TODO: Check if this was a nested HostRoot when used with
      // renderContainerIntoSubtree.
      return nearestMounted;
    } // If we didn't hit the root, that means that we're in an disconnected tree
    // that has been unmounted.


    return null;
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js
  // It would be nice if we updated React to inject this function directly (vs just indirectly via findDOMNode).
  // BEGIN copied code


  function findCurrentFiberUsingSlowPathById(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return null;
    }

    var alternate = fiber.alternate;

    if (!alternate) {
      // If there is no alternate, then we only need to check if it is mounted.
      var nearestMounted = getNearestMountedFiber(fiber);

      if (nearestMounted === null) {
        throw new Error('Unable to find node on an unmounted component.');
      }

      if (nearestMounted !== fiber) {
        return null;
      }

      return fiber;
    } // If we have two possible branches, we'll walk backwards up to the root
    // to see what path the root points to. On the way we may hit one of the
    // special cases and we'll deal with them.


    var a = fiber;
    var b = alternate;

    while (true) {
      var parentA = a.return;

      if (parentA === null) {
        // We're at the root.
        break;
      }

      var parentB = parentA.alternate;

      if (parentB === null) {
        // There is no alternate. This is an unusual case. Currently, it only
        // happens when a Suspense component is hidden. An extra fragment fiber
        // is inserted in between the Suspense fiber and its children. Skip
        // over this extra fragment fiber and proceed to the next parent.
        var nextParent = parentA.return;

        if (nextParent !== null) {
          a = b = nextParent;
          continue;
        } // If there's no parent, we're at the root.


        break;
      } // If both copies of the parent fiber point to the same child, we can
      // assume that the child is current. This happens when we bailout on low
      // priority: the bailed out fiber's child reuses the current child.


      if (parentA.child === parentB.child) {
        var child = parentA.child;

        while (child) {
          if (child === a) {
            // We've determined that A is the current branch.
            assertIsMounted(parentA);
            return fiber;
          }

          if (child === b) {
            // We've determined that B is the current branch.
            assertIsMounted(parentA);
            return alternate;
          }

          child = child.sibling;
        } // We should never have an alternate for any mounting node. So the only
        // way this could possibly happen is if this was unmounted, if at all.


        throw new Error('Unable to find node on an unmounted component.');
      }

      if (a.return !== b.return) {
        // The return pointer of A and the return pointer of B point to different
        // fibers. We assume that return pointers never criss-cross, so A must
        // belong to the child set of A.return, and B must belong to the child
        // set of B.return.
        a = parentA;
        b = parentB;
      } else {
        // The return pointers point to the same fiber. We'll have to use the
        // default, slow path: scan the child sets of each parent alternate to see
        // which child belongs to which set.
        //
        // Search parent A's child set
        var didFindChild = false;
        var _child = parentA.child;

        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          // Search parent B's child set
          _child = parentB.child;

          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }

            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }

            _child = _child.sibling;
          }

          if (!didFindChild) {
            throw new Error('Child was not found in either parent set. This indicates a bug ' + 'in React related to the return pointer. Please file an issue.');
          }
        }
      }

      if (a.alternate !== b) {
        throw new Error("Return fibers should always be each others' alternates. " + 'This error is likely caused by a bug in React. Please file an issue.');
      }
    } // If the root is not a host container, we're in a disconnected tree. I.e.
    // unmounted.


    if (a.tag !== HostRoot) {
      throw new Error('Unable to find node on an unmounted component.');
    }

    if (a.stateNode.current === a) {
      // We've determined that A is the current branch.
      return fiber;
    } // Otherwise B has to be current branch.


    return alternate;
  } // END copied code


  function prepareViewAttributeSource(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      window.$attribute = utils_getInObject(mostRecentlyInspectedElement, path);
    }
  }

  function prepareViewElementSource(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var elementType = fiber.elementType,
        tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IncompleteFunctionComponent:
      case IndeterminateComponent:
      case FunctionComponent:
        global.$type = type;
        break;

      case ForwardRef:
        global.$type = type.render;
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$type = elementType != null && elementType.type != null ? elementType.type : type;
        break;

      default:
        global.$type = null;
        break;
    }
  }

  function fiberToSerializedElement(fiber) {
    return {
      displayName: getDisplayNameForFiber(fiber) || 'Anonymous',
      id: getFiberIDThrows(fiber),
      key: fiber.key,
      type: getElementTypeForFiber(fiber)
    };
  }

  function getOwnersList(id) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber == null) {
      return null;
    }

    var owners = [fiberToSerializedElement(fiber)];
    var owner = fiber._debugOwner;

    while (owner != null) {
      if (typeof owner.tag === 'number') {
        var ownerFiber = owner; // Refined

        owners.unshift(fiberToSerializedElement(ownerFiber));
        owner = ownerFiber._debugOwner;
      } else {
        // TODO: Track Server Component Owners.
        break;
      }
    }

    return owners;
  } // Fast path props lookup for React Native style editor.
  // Could use inspectElementRaw() but that would require shallow rendering hooks components,
  // and could also mess with memoization.


  function getInstanceAndStyle(id) {
    var instance = null;
    var style = null;
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      instance = fiber.stateNode;

      if (fiber.memoizedProps !== null) {
        style = fiber.memoizedProps.style;
      }
    }

    return {
      instance: instance,
      style: style
    };
  }

  function isErrorBoundary(fiber) {
    var tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        var instance = fiber.stateNode;
        return typeof type.getDerivedStateFromError === 'function' || instance !== null && typeof instance.componentDidCatch === 'function';

      default:
        return false;
    }
  }

  function getNearestErrorBoundaryID(fiber) {
    var parent = fiber.return;

    while (parent !== null) {
      if (isErrorBoundary(parent)) {
        return getFiberIDUnsafe(parent);
      }

      parent = parent.return;
    }

    return null;
  }

  function inspectElementRaw(id) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber == null) {
      return null;
    }

    var debugOwner = fiber._debugOwner,
        stateNode = fiber.stateNode,
        key = fiber.key,
        memoizedProps = fiber.memoizedProps,
        memoizedState = fiber.memoizedState,
        dependencies = fiber.dependencies,
        tag = fiber.tag,
        type = fiber.type;
    var elementType = getElementTypeForFiber(fiber);
    var usesHooks = (tag === FunctionComponent || tag === SimpleMemoComponent || tag === ForwardRef) && (!!memoizedState || !!dependencies); // TODO Show custom UI for Cache like we do for Suspense
    // For now, just hide state data entirely since it's not meant to be inspected.

    var showState = !usesHooks && tag !== CacheComponent;
    var typeSymbol = getTypeSymbol(type);
    var canViewSource = false;
    var context = null;

    if (tag === ClassComponent || tag === FunctionComponent || tag === IncompleteClassComponent || tag === IncompleteFunctionComponent || tag === IndeterminateComponent || tag === MemoComponent || tag === ForwardRef || tag === SimpleMemoComponent) {
      canViewSource = true;

      if (stateNode && stateNode.context != null) {
        // Don't show an empty context object for class components that don't use the context API.
        var shouldHideContext = elementType === types_ElementTypeClass && !(type.contextTypes || type.contextType);

        if (!shouldHideContext) {
          context = stateNode.context;
        }
      }
    } else if ( // Detect pre-19 Context Consumers
    (typeSymbol === CONTEXT_NUMBER || typeSymbol === CONTEXT_SYMBOL_STRING) && !( // In 19+, CONTEXT_SYMBOL_STRING means a Provider instead.
    // It will be handled in a different branch below.
    // Eventually, this entire branch can be removed.
    type._context === undefined && type.Provider === type)) {
      // 16.3-16.5 read from "type" because the Consumer is the actual context object.
      // 16.6+ should read from "type._context" because Consumer can be different (in DEV).
      // NOTE Keep in sync with getDisplayNameForFiber()
      var consumerResolvedContext = type._context || type; // Global context value.

      context = consumerResolvedContext._currentValue || null; // Look for overridden value.

      var _current = fiber.return;

      while (_current !== null) {
        var currentType = _current.type;
        var currentTypeSymbol = getTypeSymbol(currentType);

        if (currentTypeSymbol === PROVIDER_NUMBER || currentTypeSymbol === PROVIDER_SYMBOL_STRING) {
          // 16.3.0 exposed the context object as "context"
          // PR #12501 changed it to "_context" for 16.3.1+
          // NOTE Keep in sync with getDisplayNameForFiber()
          var providerResolvedContext = currentType._context || currentType.context;

          if (providerResolvedContext === consumerResolvedContext) {
            context = _current.memoizedProps.value;
            break;
          }
        }

        _current = _current.return;
      }
    } else if ( // Detect 19+ Context Consumers
    typeSymbol === CONSUMER_SYMBOL_STRING) {
      // This branch is 19+ only, where Context.Provider === Context.
      // NOTE Keep in sync with getDisplayNameForFiber()
      var _consumerResolvedContext = type._context; // Global context value.

      context = _consumerResolvedContext._currentValue || null; // Look for overridden value.

      var _current2 = fiber.return;

      while (_current2 !== null) {
        var _currentType = _current2.type;

        var _currentTypeSymbol = getTypeSymbol(_currentType);

        if ( // In 19+, these are Context Providers
        _currentTypeSymbol === CONTEXT_SYMBOL_STRING) {
          var _providerResolvedContext = _currentType;

          if (_providerResolvedContext === _consumerResolvedContext) {
            context = _current2.memoizedProps.value;
            break;
          }
        }

        _current2 = _current2.return;
      }
    }

    var hasLegacyContext = false;

    if (context !== null) {
      hasLegacyContext = !!type.contextTypes; // To simplify hydration and display logic for context, wrap in a value object.
      // Otherwise simple values (e.g. strings, booleans) become harder to handle.

      context = {
        value: context
      };
    }

    var owners = null;
    var owner = debugOwner;

    while (owner != null) {
      if (typeof owner.tag === 'number') {
        var ownerFiber = owner; // Refined

        if (owners === null) {
          owners = [];
        }

        owners.push(fiberToSerializedElement(ownerFiber));
        owner = ownerFiber._debugOwner;
      } else {
        // TODO: Track Server Component Owners.
        break;
      }
    }

    var isTimedOutSuspense = tag === SuspenseComponent && memoizedState !== null;
    var hooks = null;

    if (usesHooks) {
      var originalConsoleMethods = {}; // Temporarily disable all console logging before re-running the hook.

      for (var method in console) {
        try {
          originalConsoleMethods[method] = console[method]; // $FlowFixMe[prop-missing]

          console[method] = function () {};
        } catch (error) {}
      }

      try {
        hooks = (0,react_debug_tools.inspectHooksOfFiber)(fiber, getDispatcherRef(renderer));
      } finally {
        // Restore original console functionality.
        for (var _method in originalConsoleMethods) {
          try {
            // $FlowFixMe[prop-missing]
            console[_method] = originalConsoleMethods[_method];
          } catch (error) {}
        }
      }
    }

    var rootType = null;
    var current = fiber;

    while (current.return !== null) {
      current = current.return;
    }

    var fiberRoot = current.stateNode;

    if (fiberRoot != null && fiberRoot._debugRootType !== null) {
      rootType = fiberRoot._debugRootType;
    }

    var errors = fiberIDToErrorsMap.get(id) || new Map();
    var warnings = fiberIDToWarningsMap.get(id) || new Map();
    var isErrored = false;
    var targetErrorBoundaryID;

    if (isErrorBoundary(fiber)) {
      // if the current inspected element is an error boundary,
      // either that we want to use it to toggle off error state
      // or that we allow to force error state on it if it's within another
      // error boundary
      //
      // TODO: This flag is a leaked implementation detail. Once we start
      // releasing DevTools in lockstep with React, we should import a function
      // from the reconciler instead.
      var DidCapture = 128;
      isErrored = (fiber.flags & DidCapture) !== 0 || forceErrorForFiberIDs.get(id) === true;
      targetErrorBoundaryID = isErrored ? id : getNearestErrorBoundaryID(fiber);
    } else {
      targetErrorBoundaryID = getNearestErrorBoundaryID(fiber);
    }

    var plugins = {
      stylex: null
    };

    if (enableStyleXFeatures) {
      if (memoizedProps != null && memoizedProps.hasOwnProperty('xstyle')) {
        plugins.stylex = getStyleXData(memoizedProps.xstyle);
      }
    }

    var source = null;

    if (canViewSource) {
      source = getSourceForFiber(fiber);
    }

    return {
      id: id,
      // Does the current renderer support editable hooks and function props?
      canEditHooks: typeof overrideHookState === 'function',
      canEditFunctionProps: typeof overrideProps === 'function',
      // Does the current renderer support advanced editing interface?
      canEditHooksAndDeletePaths: typeof overrideHookStateDeletePath === 'function',
      canEditHooksAndRenamePaths: typeof overrideHookStateRenamePath === 'function',
      canEditFunctionPropsDeletePaths: typeof overridePropsDeletePath === 'function',
      canEditFunctionPropsRenamePaths: typeof overridePropsRenamePath === 'function',
      canToggleError: supportsTogglingError && targetErrorBoundaryID != null,
      // Is this error boundary in error state.
      isErrored: isErrored,
      targetErrorBoundaryID: targetErrorBoundaryID,
      canToggleSuspense: supportsTogglingSuspense && ( // If it's showing the real content, we can always flip fallback.
      !isTimedOutSuspense || // If it's showing fallback because we previously forced it to,
      // allow toggling it back to remove the fallback override.
      forceFallbackForSuspenseIDs.has(id)),
      // Can view component source location.
      canViewSource: canViewSource,
      source: source,
      // Does the component have legacy context attached to it.
      hasLegacyContext: hasLegacyContext,
      key: key != null ? key : null,
      displayName: getDisplayNameForFiber(fiber),
      type: elementType,
      // Inspectable properties.
      // TODO Review sanitization approach for the below inspectable values.
      context: context,
      hooks: hooks,
      props: memoizedProps,
      state: showState ? memoizedState : null,
      errors: Array.from(errors.entries()),
      warnings: Array.from(warnings.entries()),
      // List of owners
      owners: owners,
      rootType: rootType,
      rendererPackageName: renderer.rendererPackageName,
      rendererVersion: renderer.version,
      plugins: plugins
    };
  }

  var mostRecentlyInspectedElement = null;
  var hasElementUpdatedSinceLastInspected = false;
  var currentlyInspectedPaths = {};

  function isMostRecentlyInspectedElement(id) {
    return mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === id;
  }

  function isMostRecentlyInspectedElementCurrent(id) {
    return isMostRecentlyInspectedElement(id) && !hasElementUpdatedSinceLastInspected;
  } // Track the intersection of currently inspected paths,
  // so that we can send their data along if the element is re-rendered.


  function mergeInspectedPaths(path) {
    var current = currentlyInspectedPaths;
    path.forEach(function (key) {
      if (!current[key]) {
        current[key] = {};
      }

      current = current[key];
    });
  }

  function createIsPathAllowed(key, secondaryCategory) {
    // This function helps prevent previously-inspected paths from being dehydrated in updates.
    // This is important to avoid a bad user experience where expanded toggles collapse on update.
    return function isPathAllowed(path) {
      switch (secondaryCategory) {
        case 'hooks':
          if (path.length === 1) {
            // Never dehydrate the "hooks" object at the top levels.
            return true;
          }

          if (path[path.length - 2] === 'hookSource' && path[path.length - 1] === 'fileName') {
            // It's important to preserve the full file name (URL) for hook sources
            // in case the user has enabled the named hooks feature.
            // Otherwise the frontend may end up with a partial URL which it can't load.
            return true;
          }

          if (path[path.length - 1] === 'subHooks' || path[path.length - 2] === 'subHooks') {
            // Dehydrating the 'subHooks' property makes the HooksTree UI a lot more complicated,
            // so it's easiest for now if we just don't break on this boundary.
            // We can always dehydrate a level deeper (in the value object).
            return true;
          }

          break;

        default:
          break;
      }

      var current = key === null ? currentlyInspectedPaths : currentlyInspectedPaths[key];

      if (!current) {
        return false;
      }

      for (var i = 0; i < path.length; i++) {
        current = current[path[i]];

        if (!current) {
          return false;
        }
      }

      return true;
    };
  }

  function updateSelectedElement(inspectedElement) {
    var hooks = inspectedElement.hooks,
        id = inspectedElement.id,
        props = inspectedElement.props;
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var elementType = fiber.elementType,
        stateNode = fiber.stateNode,
        tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IndeterminateComponent:
        global.$r = stateNode;
        break;

      case IncompleteFunctionComponent:
      case FunctionComponent:
        global.$r = {
          hooks: hooks,
          props: props,
          type: type
        };
        break;

      case ForwardRef:
        global.$r = {
          hooks: hooks,
          props: props,
          type: type.render
        };
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$r = {
          hooks: hooks,
          props: props,
          type: elementType != null && elementType.type != null ? elementType.type : type
        };
        break;

      default:
        global.$r = null;
        break;
    }
  }

  function storeAsGlobal(id, path, count) {
    if (isMostRecentlyInspectedElement(id)) {
      var value = utils_getInObject(mostRecentlyInspectedElement, path);
      var key = "$reactTemp".concat(count);
      window[key] = value;
      console.log(key);
      console.log(value);
    }
  }

  function getSerializedElementValueByPath(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      var valueToCopy = utils_getInObject(mostRecentlyInspectedElement, path);
      return serializeToString(valueToCopy);
    }
  }

  function inspectElement(requestID, id, path, forceFullData) {
    if (path !== null) {
      mergeInspectedPaths(path);
    }

    if (isMostRecentlyInspectedElement(id) && !forceFullData) {
      if (!hasElementUpdatedSinceLastInspected) {
        if (path !== null) {
          var secondaryCategory = null;

          if (path[0] === 'hooks') {
            secondaryCategory = 'hooks';
          } // If this element has not been updated since it was last inspected,
          // we can just return the subset of data in the newly-inspected path.


          return {
            id: id,
            responseID: requestID,
            type: 'hydrated-path',
            path: path,
            value: cleanForBridge(utils_getInObject(mostRecentlyInspectedElement, path), createIsPathAllowed(null, secondaryCategory), path)
          };
        } else {
          // If this element has not been updated since it was last inspected, we don't need to return it.
          // Instead we can just return the ID to indicate that it has not changed.
          return {
            id: id,
            responseID: requestID,
            type: 'no-change'
          };
        }
      }
    } else {
      currentlyInspectedPaths = {};
    }

    hasElementUpdatedSinceLastInspected = false;

    try {
      mostRecentlyInspectedElement = inspectElementRaw(id);
    } catch (error) {
      // the error name is synced with ReactDebugHooks
      if (error.name === 'ReactDebugToolsRenderError') {
        var message = 'Error rendering inspected element.';
        var stack; // Log error & cause for user to debug

        console.error(message + '\n\n', error);

        if (error.cause != null) {
          var _fiber4 = findCurrentFiberUsingSlowPathById(id);

          var componentName = _fiber4 != null ? getDisplayNameForFiber(_fiber4) : null;
          console.error('React DevTools encountered an error while trying to inspect hooks. ' + 'This is most likely caused by an error in current inspected component' + (componentName != null ? ": \"".concat(componentName, "\".") : '.') + '\nThe error thrown in the component is: \n\n', error.cause);

          if (error.cause instanceof Error) {
            message = error.cause.message || message;
            stack = error.cause.stack;
          }
        }

        return {
          type: 'error',
          errorType: 'user',
          id: id,
          responseID: requestID,
          message: message,
          stack: stack
        };
      } // the error name is synced with ReactDebugHooks


      if (error.name === 'ReactDebugToolsUnsupportedHookError') {
        return {
          type: 'error',
          errorType: 'unknown-hook',
          id: id,
          responseID: requestID,
          message: 'Unsupported hook in the react-debug-tools package: ' + error.message
        };
      } // Log Uncaught Error


      console.error('Error inspecting element.\n\n', error);
      return {
        type: 'error',
        errorType: 'uncaught',
        id: id,
        responseID: requestID,
        message: error.message,
        stack: error.stack
      };
    }

    if (mostRecentlyInspectedElement === null) {
      return {
        id: id,
        responseID: requestID,
        type: 'not-found'
      };
    } // Any time an inspected element has an update,
    // we should update the selected $r value as wel.
    // Do this before dehydration (cleanForBridge).


    updateSelectedElement(mostRecentlyInspectedElement); // Clone before cleaning so that we preserve the full data.
    // This will enable us to send patches without re-inspecting if hydrated paths are requested.
    // (Reducing how often we shallow-render is a better DX for function components that use hooks.)

    var cleanedInspectedElement = renderer_objectSpread({}, mostRecentlyInspectedElement); // $FlowFixMe[prop-missing] found when upgrading Flow


    cleanedInspectedElement.context = cleanForBridge(cleanedInspectedElement.context, createIsPathAllowed('context', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.hooks = cleanForBridge(cleanedInspectedElement.hooks, createIsPathAllowed('hooks', 'hooks')); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.props = cleanForBridge(cleanedInspectedElement.props, createIsPathAllowed('props', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.state = cleanForBridge(cleanedInspectedElement.state, createIsPathAllowed('state', null));
    return {
      id: id,
      responseID: requestID,
      type: 'full-data',
      // $FlowFixMe[prop-missing] found when upgrading Flow
      value: cleanedInspectedElement
    };
  }

  function logElementToConsole(id) {
    var result = isMostRecentlyInspectedElementCurrent(id) ? mostRecentlyInspectedElement : inspectElementRaw(id);

    if (result === null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var supportsGroup = typeof console.groupCollapsed === 'function';

    if (supportsGroup) {
      console.groupCollapsed("[Click to expand] %c<".concat(result.displayName || 'Component', " />"), // --dom-tag-name-color is the CSS variable Chrome styles HTML elements with in the console.
      'color: var(--dom-tag-name-color); font-weight: normal;');
    }

    if (result.props !== null) {
      console.log('Props:', result.props);
    }

    if (result.state !== null) {
      console.log('State:', result.state);
    }

    if (result.hooks !== null) {
      console.log('Hooks:', result.hooks);
    }

    var nativeNodes = findNativeNodesForFiberID(id);

    if (nativeNodes !== null) {
      console.log('Nodes:', nativeNodes);
    }

    if (window.chrome || /firefox/i.test(navigator.userAgent)) {
      console.log('Right-click any value to save it as a global variable for further inspection.');
    }

    if (supportsGroup) {
      console.groupEnd();
    }
  }

  function deletePath(type, id, hookID, path) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          path = path.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (path.length === 0) {// Simple context value (noop)
              } else {
                deletePathInObject(instance.context, path);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookStateDeletePath === 'function') {
            overrideHookStateDeletePath(fiber, hookID, path);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsDeletePath === 'function') {
              overridePropsDeletePath(fiber, path);
            }
          } else {
            fiber.pendingProps = copyWithDelete(instance.props, path);
            instance.forceUpdate();
          }

          break;

        case 'state':
          deletePathInObject(instance.state, path);
          instance.forceUpdate();
          break;
      }
    }
  }

  function renamePath(type, id, hookID, oldPath, newPath) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          oldPath = oldPath.slice(1);
          newPath = newPath.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (oldPath.length === 0) {// Simple context value (noop)
              } else {
                renamePathInObject(instance.context, oldPath, newPath);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookStateRenamePath === 'function') {
            overrideHookStateRenamePath(fiber, hookID, oldPath, newPath);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsRenamePath === 'function') {
              overridePropsRenamePath(fiber, oldPath, newPath);
            }
          } else {
            fiber.pendingProps = copyWithRename(instance.props, oldPath, newPath);
            instance.forceUpdate();
          }

          break;

        case 'state':
          renamePathInObject(instance.state, oldPath, newPath);
          instance.forceUpdate();
          break;
      }
    }
  }

  function overrideValueAtPath(type, id, hookID, path, value) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          path = path.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (path.length === 0) {
                // Simple context value
                instance.context = value;
              } else {
                utils_setInObject(instance.context, path, value);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookState === 'function') {
            overrideHookState(fiber, hookID, path, value);
          }

          break;

        case 'props':
          switch (fiber.tag) {
            case ClassComponent:
              fiber.pendingProps = copyWithSet(instance.props, path, value);
              instance.forceUpdate();
              break;

            default:
              if (typeof overrideProps === 'function') {
                overrideProps(fiber, path, value);
              }

              break;
          }

          break;

        case 'state':
          switch (fiber.tag) {
            case ClassComponent:
              utils_setInObject(instance.state, path, value);
              instance.forceUpdate();
              break;
          }

          break;
      }
    }
  }

  var currentCommitProfilingMetadata = null;
  var displayNamesByRootID = null;
  var idToContextsMap = null;
  var initialTreeBaseDurationsMap = null;
  var initialIDToRootMap = null;
  var isProfiling = false;
  var profilingStartTime = 0;
  var recordChangeDescriptions = false;
  var rootToCommitProfilingMetadataMap = null;

  function getProfilingData() {
    var dataForRoots = [];

    if (rootToCommitProfilingMetadataMap === null) {
      throw Error('getProfilingData() called before any profiling data was recorded');
    }

    rootToCommitProfilingMetadataMap.forEach(function (commitProfilingMetadata, rootID) {
      var commitData = [];
      var initialTreeBaseDurations = [];
      var displayName = displayNamesByRootID !== null && displayNamesByRootID.get(rootID) || 'Unknown';

      if (initialTreeBaseDurationsMap != null) {
        initialTreeBaseDurationsMap.forEach(function (treeBaseDuration, id) {
          if (initialIDToRootMap != null && initialIDToRootMap.get(id) === rootID) {
            // We don't need to convert milliseconds to microseconds in this case,
            // because the profiling summary is JSON serialized.
            initialTreeBaseDurations.push([id, treeBaseDuration]);
          }
        });
      }

      commitProfilingMetadata.forEach(function (commitProfilingData, commitIndex) {
        var changeDescriptions = commitProfilingData.changeDescriptions,
            durations = commitProfilingData.durations,
            effectDuration = commitProfilingData.effectDuration,
            maxActualDuration = commitProfilingData.maxActualDuration,
            passiveEffectDuration = commitProfilingData.passiveEffectDuration,
            priorityLevel = commitProfilingData.priorityLevel,
            commitTime = commitProfilingData.commitTime,
            updaters = commitProfilingData.updaters;
        var fiberActualDurations = [];
        var fiberSelfDurations = [];

        for (var i = 0; i < durations.length; i += 3) {
          var fiberID = durations[i];
          fiberActualDurations.push([fiberID, durations[i + 1]]);
          fiberSelfDurations.push([fiberID, durations[i + 2]]);
        }

        commitData.push({
          changeDescriptions: changeDescriptions !== null ? Array.from(changeDescriptions.entries()) : null,
          duration: maxActualDuration,
          effectDuration: effectDuration,
          fiberActualDurations: fiberActualDurations,
          fiberSelfDurations: fiberSelfDurations,
          passiveEffectDuration: passiveEffectDuration,
          priorityLevel: priorityLevel,
          timestamp: commitTime,
          updaters: updaters
        });
      });
      dataForRoots.push({
        commitData: commitData,
        displayName: displayName,
        initialTreeBaseDurations: initialTreeBaseDurations,
        rootID: rootID
      });
    });
    var timelineData = null;

    if (typeof getTimelineData === 'function') {
      var currentTimelineData = getTimelineData();

      if (currentTimelineData) {
        var batchUIDToMeasuresMap = currentTimelineData.batchUIDToMeasuresMap,
            internalModuleSourceToRanges = currentTimelineData.internalModuleSourceToRanges,
            laneToLabelMap = currentTimelineData.laneToLabelMap,
            laneToReactMeasureMap = currentTimelineData.laneToReactMeasureMap,
            rest = _objectWithoutProperties(currentTimelineData, ["batchUIDToMeasuresMap", "internalModuleSourceToRanges", "laneToLabelMap", "laneToReactMeasureMap"]);

        timelineData = renderer_objectSpread(renderer_objectSpread({}, rest), {}, {
          // Most of the data is safe to parse as-is,
          // but we need to convert the nested Arrays back to Maps.
          // Most of the data is safe to serialize as-is,
          // but we need to convert the Maps to nested Arrays.
          batchUIDToMeasuresKeyValueArray: Array.from(batchUIDToMeasuresMap.entries()),
          internalModuleSourceToRanges: Array.from(internalModuleSourceToRanges.entries()),
          laneToLabelKeyValueArray: Array.from(laneToLabelMap.entries()),
          laneToReactMeasureKeyValueArray: Array.from(laneToReactMeasureMap.entries())
        });
      }
    }

    return {
      dataForRoots: dataForRoots,
      rendererID: rendererID,
      timelineData: timelineData
    };
  }

  function startProfiling(shouldRecordChangeDescriptions) {
    if (isProfiling) {
      return;
    }

    recordChangeDescriptions = shouldRecordChangeDescriptions; // Capture initial values as of the time profiling starts.
    // It's important we snapshot both the durations and the id-to-root map,
    // since either of these may change during the profiling session
    // (e.g. when a fiber is re-rendered or when a fiber gets removed).

    displayNamesByRootID = new Map();
    initialTreeBaseDurationsMap = new Map(idToTreeBaseDurationMap);
    initialIDToRootMap = new Map(idToRootMap);
    idToContextsMap = new Map();
    hook.getFiberRoots(rendererID).forEach(function (root) {
      var rootID = getFiberIDThrows(root.current);
      displayNamesByRootID.set(rootID, getDisplayNameForRoot(root.current));

      if (shouldRecordChangeDescriptions) {
        // Record all contexts at the time profiling is started.
        // Fibers only store the current context value,
        // so we need to track them separately in order to determine changed keys.
        crawlToInitializeContextsMap(root.current);
      }
    });
    isProfiling = true;
    profilingStartTime = renderer_getCurrentTime();
    rootToCommitProfilingMetadataMap = new Map();

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(true);
    }
  }

  function stopProfiling() {
    isProfiling = false;
    recordChangeDescriptions = false;

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(false);
    }
  } // Automatically start profiling so that we don't miss timing info from initial "mount".


  if (sessionStorageGetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY) === 'true') {
    startProfiling(sessionStorageGetItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY) === 'true');
  } // React will switch between these implementations depending on whether
  // we have any manually suspended/errored-out Fibers or not.


  function shouldErrorFiberAlwaysNull() {
    return null;
  } // Map of id and its force error status: true (error), false (toggled off),
  // null (do nothing)


  var forceErrorForFiberIDs = new Map();

  function shouldErrorFiberAccordingToMap(fiber) {
    if (typeof setErrorHandler !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    var id = getFiberIDUnsafe(fiber);

    if (id === null) {
      return null;
    }

    var status = null;

    if (forceErrorForFiberIDs.has(id)) {
      status = forceErrorForFiberIDs.get(id);

      if (status === false) {
        // TRICKY overrideError adds entries to this Map,
        // so ideally it would be the method that clears them too,
        // but that would break the functionality of the feature,
        // since DevTools needs to tell React to act differently than it normally would
        // (don't just re-render the failed boundary, but reset its errored state too).
        // So we can only clear it after telling React to reset the state.
        // Technically this is premature and we should schedule it for later,
        // since the render could always fail without committing the updated error boundary,
        // but since this is a DEV-only feature, the simplicity is worth the trade off.
        forceErrorForFiberIDs.delete(id);

        if (forceErrorForFiberIDs.size === 0) {
          // Last override is gone. Switch React back to fast path.
          setErrorHandler(shouldErrorFiberAlwaysNull);
        }
      }
    }

    return status;
  }

  function overrideError(id, forceError) {
    if (typeof setErrorHandler !== 'function' || typeof scheduleUpdate !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    forceErrorForFiberIDs.set(id, forceError);

    if (forceErrorForFiberIDs.size === 1) {
      // First override is added. Switch React to slower path.
      setErrorHandler(shouldErrorFiberAccordingToMap);
    }

    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber != null) {
      scheduleUpdate(fiber);
    }
  }

  function shouldSuspendFiberAlwaysFalse() {
    return false;
  }

  var forceFallbackForSuspenseIDs = new Set();

  function shouldSuspendFiberAccordingToSet(fiber) {
    var maybeID = getFiberIDUnsafe(fiber);
    return maybeID !== null && forceFallbackForSuspenseIDs.has(maybeID);
  }

  function overrideSuspense(id, forceFallback) {
    if (typeof setSuspenseHandler !== 'function' || typeof scheduleUpdate !== 'function') {
      throw new Error('Expected overrideSuspense() to not get called for earlier React versions.');
    }

    if (forceFallback) {
      forceFallbackForSuspenseIDs.add(id);

      if (forceFallbackForSuspenseIDs.size === 1) {
        // First override is added. Switch React to slower path.
        setSuspenseHandler(shouldSuspendFiberAccordingToSet);
      }
    } else {
      forceFallbackForSuspenseIDs.delete(id);

      if (forceFallbackForSuspenseIDs.size === 0) {
        // Last override is gone. Switch React back to fast path.
        setSuspenseHandler(shouldSuspendFiberAlwaysFalse);
      }
    }

    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber != null) {
      scheduleUpdate(fiber);
    }
  } // Remember if we're trying to restore the selection after reload.
  // In that case, we'll do some extra checks for matching mounts.


  var trackedPath = null;
  var trackedPathMatchFiber = null;
  var trackedPathMatchDepth = -1;
  var mightBeOnTrackedPath = false;

  function setTrackedPath(path) {
    if (path === null) {
      trackedPathMatchFiber = null;
      trackedPathMatchDepth = -1;
      mightBeOnTrackedPath = false;
    }

    trackedPath = path;
  } // We call this before traversing a new mount.
  // It remembers whether this Fiber is the next best match for tracked path.
  // The return value signals whether we should keep matching siblings or not.


  function updateTrackedPathStateBeforeMount(fiber) {
    if (trackedPath === null || !mightBeOnTrackedPath) {
      // Fast path: there's nothing to track so do nothing and ignore siblings.
      return false;
    }

    var returnFiber = fiber.return;
    var returnAlternate = returnFiber !== null ? returnFiber.alternate : null; // By now we know there's some selection to restore, and this is a new Fiber.
    // Is this newly mounted Fiber a direct child of the current best match?
    // (This will also be true for new roots if we haven't matched anything yet.)

    if (trackedPathMatchFiber === returnFiber || trackedPathMatchFiber === returnAlternate && returnAlternate !== null) {
      // Is this the next Fiber we should select? Let's compare the frames.
      var actualFrame = getPathFrame(fiber); // $FlowFixMe[incompatible-use] found when upgrading Flow

      var expectedFrame = trackedPath[trackedPathMatchDepth + 1];

      if (expectedFrame === undefined) {
        throw new Error('Expected to see a frame at the next depth.');
      }

      if (actualFrame.index === expectedFrame.index && actualFrame.key === expectedFrame.key && actualFrame.displayName === expectedFrame.displayName) {
        // We have our next match.
        trackedPathMatchFiber = fiber;
        trackedPathMatchDepth++; // Are we out of frames to match?
        // $FlowFixMe[incompatible-use] found when upgrading Flow

        if (trackedPathMatchDepth === trackedPath.length - 1) {
          // There's nothing that can possibly match afterwards.
          // Don't check the children.
          mightBeOnTrackedPath = false;
        } else {
          // Check the children, as they might reveal the next match.
          mightBeOnTrackedPath = true;
        } // In either case, since we have a match, we don't need
        // to check the siblings. They'll never match.


        return false;
      }
    } // This Fiber's parent is on the path, but this Fiber itself isn't.
    // There's no need to check its children--they won't be on the path either.


    mightBeOnTrackedPath = false; // However, one of its siblings may be on the path so keep searching.

    return true;
  }

  function updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath) {
    // updateTrackedPathStateBeforeMount() told us whether to match siblings.
    // Now that we're entering siblings, let's use that information.
    mightBeOnTrackedPath = mightSiblingsBeOnTrackedPath;
  } // Roots don't have a real persistent identity.
  // A root's "pseudo key" is "childDisplayName:indexWithThatName".
  // For example, "App:0" or, in case of similar roots, "Story:0", "Story:1", etc.
  // We will use this to try to disambiguate roots when restoring selection between reloads.


  var rootPseudoKeys = new Map();
  var rootDisplayNameCounter = new Map();

  function setRootPseudoKey(id, fiber) {
    var name = getDisplayNameForRoot(fiber);
    var counter = rootDisplayNameCounter.get(name) || 0;
    rootDisplayNameCounter.set(name, counter + 1);
    var pseudoKey = "".concat(name, ":").concat(counter);
    rootPseudoKeys.set(id, pseudoKey);
  }

  function removeRootPseudoKey(id) {
    var pseudoKey = rootPseudoKeys.get(id);

    if (pseudoKey === undefined) {
      throw new Error('Expected root pseudo key to be known.');
    }

    var name = pseudoKey.slice(0, pseudoKey.lastIndexOf(':'));
    var counter = rootDisplayNameCounter.get(name);

    if (counter === undefined) {
      throw new Error('Expected counter to be known.');
    }

    if (counter > 1) {
      rootDisplayNameCounter.set(name, counter - 1);
    } else {
      rootDisplayNameCounter.delete(name);
    }

    rootPseudoKeys.delete(id);
  }

  function getDisplayNameForRoot(fiber) {
    var preferredDisplayName = null;
    var fallbackDisplayName = null;
    var child = fiber.child; // Go at most three levels deep into direct children
    // while searching for a child that has a displayName.

    for (var i = 0; i < 3; i++) {
      if (child === null) {
        break;
      }

      var displayName = getDisplayNameForFiber(child);

      if (displayName !== null) {
        // Prefer display names that we get from user-defined components.
        // We want to avoid using e.g. 'Suspense' unless we find nothing else.
        if (typeof child.type === 'function') {
          // There's a few user-defined tags, but we'll prefer the ones
          // that are usually explicitly named (function or class components).
          preferredDisplayName = displayName;
        } else if (fallbackDisplayName === null) {
          fallbackDisplayName = displayName;
        }
      }

      if (preferredDisplayName !== null) {
        break;
      }

      child = child.child;
    }

    return preferredDisplayName || fallbackDisplayName || 'Anonymous';
  }

  function getPathFrame(fiber) {
    var key = fiber.key;
    var displayName = getDisplayNameForFiber(fiber);
    var index = fiber.index;

    switch (fiber.tag) {
      case HostRoot:
        // Roots don't have a real displayName, index, or key.
        // Instead, we'll use the pseudo key (childDisplayName:indexWithThatName).
        var id = getFiberIDThrows(fiber);
        var pseudoKey = rootPseudoKeys.get(id);

        if (pseudoKey === undefined) {
          throw new Error('Expected mounted root to have known pseudo key.');
        }

        displayName = pseudoKey;
        break;

      case HostComponent:
        displayName = fiber.type;
        break;

      default:
        break;
    }

    return {
      displayName: displayName,
      key: key,
      index: index
    };
  } // Produces a serializable representation that does a best effort
  // of identifying a particular Fiber between page reloads.
  // The return path will contain Fibers that are "invisible" to the store
  // because their keys and indexes are important to restoring the selection.


  function getPathForElement(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      return null;
    }

    var keyPath = [];

    while (fiber !== null) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      keyPath.push(getPathFrame(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

      fiber = fiber.return;
    }

    keyPath.reverse();
    return keyPath;
  }

  function getBestMatchForTrackedPath() {
    if (trackedPath === null) {
      // Nothing to match.
      return null;
    }

    if (trackedPathMatchFiber === null) {
      // We didn't find anything.
      return null;
    } // Find the closest Fiber store is aware of.


    var fiber = trackedPathMatchFiber;

    while (fiber !== null && shouldFilterFiber(fiber)) {
      fiber = fiber.return;
    }

    if (fiber === null) {
      return null;
    }

    return {
      id: getFiberIDThrows(fiber),
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      isFullMatch: trackedPathMatchDepth === trackedPath.length - 1
    };
  }

  var formatPriorityLevel = function formatPriorityLevel(priorityLevel) {
    if (priorityLevel == null) {
      return 'Unknown';
    }

    switch (priorityLevel) {
      case ImmediatePriority:
        return 'Immediate';

      case UserBlockingPriority:
        return 'User-Blocking';

      case NormalPriority:
        return 'Normal';

      case LowPriority:
        return 'Low';

      case IdlePriority:
        return 'Idle';

      case NoPriority:
      default:
        return 'Unknown';
    }
  };

  function setTraceUpdatesEnabled(isEnabled) {
    traceUpdatesEnabled = isEnabled;
  }

  function hasFiberWithId(id) {
    return idToArbitraryFiberMap.has(id);
  }

  function getComponentStackForFiber(fiber) {
    var componentStack = fiberToComponentStackMap.get(fiber);

    if (componentStack == null) {
      var dispatcherRef = getDispatcherRef(renderer);

      if (dispatcherRef == null) {
        return null;
      }

      componentStack = getStackByFiberInDevAndProd(ReactTypeOfWork, fiber, dispatcherRef);
      fiberToComponentStackMap.set(fiber, componentStack);
    }

    return componentStack;
  }

  function getSourceForFiber(fiber) {
    var componentStack = getComponentStackForFiber(fiber);

    if (componentStack == null) {
      return null;
    }

    return parseSourceFromComponentStack(componentStack);
  }

  return {
    cleanup: cleanup,
    clearErrorsAndWarnings: clearErrorsAndWarnings,
    clearErrorsForFiberID: clearErrorsForFiberID,
    clearWarningsForFiberID: clearWarningsForFiberID,
    getSerializedElementValueByPath: getSerializedElementValueByPath,
    deletePath: deletePath,
    findNativeNodesForFiberID: findNativeNodesForFiberID,
    flushInitialOperations: flushInitialOperations,
    getBestMatchForTrackedPath: getBestMatchForTrackedPath,
    getComponentStackForFiber: getComponentStackForFiber,
    getSourceForFiber: getSourceForFiber,
    getDisplayNameForFiberID: getDisplayNameForFiberID,
    getFiberForNative: getFiberForNative,
    getFiberIDForNative: getFiberIDForNative,
    getInstanceAndStyle: getInstanceAndStyle,
    getOwnersList: getOwnersList,
    getPathForElement: getPathForElement,
    getProfilingData: getProfilingData,
    handleCommitFiberRoot: handleCommitFiberRoot,
    handleCommitFiberUnmount: handleCommitFiberUnmount,
    handlePostCommitFiberRoot: handlePostCommitFiberRoot,
    hasFiberWithId: hasFiberWithId,
    inspectElement: inspectElement,
    logElementToConsole: logElementToConsole,
    patchConsoleForStrictMode: patchForStrictMode,
    prepareViewAttributeSource: prepareViewAttributeSource,
    prepareViewElementSource: prepareViewElementSource,
    overrideError: overrideError,
    overrideSuspense: overrideSuspense,
    overrideValueAtPath: overrideValueAtPath,
    renamePath: renamePath,
    renderer: renderer,
    setTraceUpdatesEnabled: setTraceUpdatesEnabled,
    setTrackedPath: setTrackedPath,
    startProfiling: startProfiling,
    stopProfiling: stopProfiling,
    storeAsGlobal: storeAsGlobal,
    unpatchConsoleForStrictMode: unpatchForStrictMode,
    updateComponentFilters: updateComponentFilters
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/console.js
function console_toConsumableArray(arr) { return console_arrayWithoutHoles(arr) || console_iterableToArray(arr) || console_unsupportedIterableToArray(arr) || console_nonIterableSpread(); }

function console_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function console_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function console_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return console_arrayLikeToArray(arr); }

function console_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = console_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function console_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return console_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return console_arrayLikeToArray(o, minLen); }

function console_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */





var OVERRIDE_CONSOLE_METHODS = ['error', 'trace', 'warn']; // React's custom built component stack strings match "\s{4}in"
// Chrome's prefix matches "\s{4}at"

var PREFIX_REGEX = /\s{4}(in|at)\s{1}/; // Firefox and Safari have no prefix ("")
// but we can fallback to looking for location info (e.g. "foo.js:12:345")

var ROW_COLUMN_NUMBER_REGEX = /:\d+:\d+(\n|$)/;
function isStringComponentStack(text) {
  return PREFIX_REGEX.test(text) || ROW_COLUMN_NUMBER_REGEX.test(text);
}
var STYLE_DIRECTIVE_REGEX = /^%c/; // This function tells whether or not the arguments for a console
// method has been overridden by the patchForStrictMode function.
// If it has we'll need to do some special formatting of the arguments
// so the console color stays consistent

function isStrictModeOverride(args) {
  if (false) {} else {
    return args.length >= 2 && args[0] === ANSI_STYLE_DIMMING_TEMPLATE;
  }
} // We add a suffix to some frames that older versions of React didn't do.
// To compare if it's equivalent we strip out the suffix to see if they're
// still equivalent. Similarly, we sometimes use [] and sometimes () so we
// strip them to for the comparison.


var frameDiffs = / \(\<anonymous\>\)$|\@unknown\:0\:0$|\(|\)|\[|\]/gm;

function areStackTracesEqual(a, b) {
  return a.replace(frameDiffs, '') === b.replace(frameDiffs, '');
}

function restorePotentiallyModifiedArgs(args) {
  // If the arguments don't have any styles applied, then just copy
  if (!isStrictModeOverride(args)) {
    return args.slice();
  }

  if (false) {} else {
    // Filter out the `\x1b...%s\x1b` template
    return args.slice(1);
  }
}

var injectedRenderers = new Map();
var targetConsole = console;
var targetConsoleMethods = {};

for (var method in console) {
  targetConsoleMethods[method] = console[method];
}

var unpatchFn = null; // Enables e.g. Jest tests to inject a mock console object.

function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
  targetConsole = targetConsoleForTesting;
  targetConsoleMethods = {};

  for (var _method in targetConsole) {
    targetConsoleMethods[_method] = console[_method];
  }
} // v16 renderers should use this method to inject internals necessary to generate a component stack.
// These internals will be used if the console is patched.
// Injecting them separately allows the console to easily be patched or un-patched later (at runtime).

function registerRenderer(renderer, onErrorOrWarning) {
  var currentDispatcherRef = renderer.currentDispatcherRef,
      getCurrentFiber = renderer.getCurrentFiber,
      findFiberByHostInstance = renderer.findFiberByHostInstance,
      version = renderer.version; // Ignore React v15 and older because they don't expose a component stack anyway.

  if (typeof findFiberByHostInstance !== 'function') {
    return;
  } // currentDispatcherRef gets injected for v16.8+ to support hooks inspection.
  // getCurrentFiber gets injected for v16.9+.


  if (currentDispatcherRef != null && typeof getCurrentFiber === 'function') {
    var _getInternalReactCons = getInternalReactConstants(version),
        ReactTypeOfWork = _getInternalReactCons.ReactTypeOfWork;

    injectedRenderers.set(renderer, {
      currentDispatcherRef: currentDispatcherRef,
      getCurrentFiber: getCurrentFiber,
      workTagMap: ReactTypeOfWork,
      onErrorOrWarning: onErrorOrWarning
    });
  }
}
var consoleSettingsRef = {
  appendComponentStack: false,
  breakOnConsoleErrors: false,
  showInlineWarningsAndErrors: false,
  hideConsoleLogsInStrictMode: false,
  browserTheme: 'dark'
}; // Patches console methods to append component stack for the current fiber.
// Call unpatch() to remove the injected behavior.

function patch(_ref) {
  var appendComponentStack = _ref.appendComponentStack,
      breakOnConsoleErrors = _ref.breakOnConsoleErrors,
      showInlineWarningsAndErrors = _ref.showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode = _ref.hideConsoleLogsInStrictMode,
      browserTheme = _ref.browserTheme;
  // Settings may change after we've patched the console.
  // Using a shared ref allows the patch function to read the latest values.
  consoleSettingsRef.appendComponentStack = appendComponentStack;
  consoleSettingsRef.breakOnConsoleErrors = breakOnConsoleErrors;
  consoleSettingsRef.showInlineWarningsAndErrors = showInlineWarningsAndErrors;
  consoleSettingsRef.hideConsoleLogsInStrictMode = hideConsoleLogsInStrictMode;
  consoleSettingsRef.browserTheme = browserTheme;

  if (appendComponentStack || breakOnConsoleErrors || showInlineWarningsAndErrors) {
    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    var originalConsoleMethods = {};

    unpatchFn = function unpatchFn() {
      for (var _method2 in originalConsoleMethods) {
        try {
          targetConsole[_method2] = originalConsoleMethods[_method2];
        } catch (error) {}
      }
    };

    OVERRIDE_CONSOLE_METHODS.forEach(function (method) {
      try {
        var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__ : targetConsole[method]; // $FlowFixMe[missing-local-annot]

        var overrideMethod = function overrideMethod() {
          var alreadyHasComponentStack = false;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (method !== 'log' && consoleSettingsRef.appendComponentStack) {
            var lastArg = args.length > 0 ? args[args.length - 1] : null;
            alreadyHasComponentStack = typeof lastArg === 'string' && isStringComponentStack(lastArg); // The last argument should be a component stack.
          }

          var shouldShowInlineWarningsAndErrors = consoleSettingsRef.showInlineWarningsAndErrors && (method === 'error' || method === 'warn'); // Search for the first renderer that has a current Fiber.
          // We don't handle the edge case of stacks for more than one (e.g. interleaved renderers?)
          // eslint-disable-next-line no-for-of-loops/no-for-of-loops

          var _iterator = console_createForOfIteratorHelper(injectedRenderers.values()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var renderer = _step.value;
              var currentDispatcherRef = getDispatcherRef(renderer);
              var getCurrentFiber = renderer.getCurrentFiber,
                  onErrorOrWarning = renderer.onErrorOrWarning,
                  workTagMap = renderer.workTagMap;
              var current = getCurrentFiber();

              if (current != null) {
                try {
                  if (shouldShowInlineWarningsAndErrors) {
                    // patch() is called by two places: (1) the hook and (2) the renderer backend.
                    // The backend is what implements a message queue, so it's the only one that injects onErrorOrWarning.
                    if (typeof onErrorOrWarning === 'function') {
                      onErrorOrWarning(current, method, // Restore and copy args before we mutate them (e.g. adding the component stack)
                      restorePotentiallyModifiedArgs(args));
                    }
                  }

                  if (consoleSettingsRef.appendComponentStack && !supportsNativeConsoleTasks(current)) {
                    var componentStack = getStackByFiberInDevAndProd(workTagMap, current, currentDispatcherRef);

                    if (componentStack !== '') {
                      // Create a fake Error so that when we print it we get native source maps. Every
                      // browser will print the .stack property of the error and then parse it back for source
                      // mapping. Rather than print the internal slot. So it doesn't matter that the internal
                      // slot doesn't line up.
                      var fakeError = new Error(''); // In Chromium, only the stack property is printed but in Firefox the <name>:<message>
                      // gets printed so to make the colon make sense, we name it so we print Component Stack:
                      // and similarly Safari leave an expandable slot.

                      if (false) {} else {
                        fakeError.name = 'Component Stack';
                      } // In Chromium, the stack property needs to start with ^[\w.]*Error\b to trigger stack
                      // formatting. Otherwise it is left alone. So we prefix it. Otherwise we just override it
                      // to our own stack.


                      fakeError.stack =  true ? 'Error Component Stack:' + componentStack : 0;

                      if (alreadyHasComponentStack) {
                        // Only modify the component stack if it matches what we would've added anyway.
                        // Otherwise we assume it was a non-React stack.
                        if (isStrictModeOverride(args)) {// We do nothing to Strict Mode overrides that already has a stack
                          // because we have already lost some context for how to format it
                          // since we've already merged the stack into the log at this point.
                        } else if (areStackTracesEqual(args[args.length - 1], componentStack)) {
                          var firstArg = args[0];

                          if (args.length > 1 && typeof firstArg === 'string' && firstArg.endsWith('%s')) {
                            args[0] = firstArg.slice(0, firstArg.length - 2); // Strip the %s param
                          }

                          args[args.length - 1] = fakeError;
                        }
                      } else {
                        args.push(fakeError);

                        if (isStrictModeOverride(args)) {
                          if (false) {} else {
                            args[0] = ANSI_STYLE_DIMMING_TEMPLATE_WITH_COMPONENT_STACK;
                          }
                        }
                      }
                    }
                  }
                } catch (error) {
                  // Don't let a DevTools or React internal error interfere with logging.
                  setTimeout(function () {
                    throw error;
                  }, 0);
                } finally {
                  break;
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          if (consoleSettingsRef.breakOnConsoleErrors) {
            // --- Welcome to debugging with React DevTools ---
            // This debugger statement means that you've enabled the "break on warnings" feature.
            // Use the browser's Call Stack panel to step out of this override function-
            // to where the original warning or error was logged.
            // eslint-disable-next-line no-debugger
            debugger;
          }

          originalMethod.apply(void 0, args);
        };

        overrideMethod.__REACT_DEVTOOLS_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } else {
    unpatch();
  }
} // Removed component stack patch from console methods.

function unpatch() {
  if (unpatchFn !== null) {
    unpatchFn();
    unpatchFn = null;
  }
}
var unpatchForStrictModeFn = null; // NOTE: KEEP IN SYNC with src/hook.js:patchConsoleForInitialCommitInStrictMode

function patchForStrictMode() {
  var overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

  if (unpatchForStrictModeFn !== null) {
    // Don't patch twice.
    return;
  }

  var originalConsoleMethods = {};

  unpatchForStrictModeFn = function unpatchForStrictModeFn() {
    for (var _method3 in originalConsoleMethods) {
      try {
        targetConsole[_method3] = originalConsoleMethods[_method3];
      } catch (error) {}
    }
  };

  overrideConsoleMethods.forEach(function (method) {
    try {
      var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method]; // $FlowFixMe[missing-local-annot]

      var overrideMethod = function overrideMethod() {
        if (!consoleSettingsRef.hideConsoleLogsInStrictMode) {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          // Dim the text color of the double logs if we're not hiding them.
          if (false) {} else {
            originalMethod.apply(void 0, [ANSI_STYLE_DIMMING_TEMPLATE].concat(console_toConsumableArray(formatConsoleArguments.apply(void 0, args))));
          }
        }
      };

      overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
      originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
      targetConsole[method] = overrideMethod;
    } catch (error) {}
  });
} // NOTE: KEEP IN SYNC with src/hook.js:unpatchConsoleForInitialCommitInStrictMode

function unpatchForStrictMode() {
  if (unpatchForStrictModeFn !== null) {
    unpatchForStrictModeFn();
    unpatchForStrictModeFn = null;
  }
}
function patchConsoleUsingWindowValues() {
  var _castBool, _castBool2, _castBool3, _castBool4, _castBrowserTheme;

  var appendComponentStack = (_castBool = castBool(window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__)) !== null && _castBool !== void 0 ? _castBool : true;
  var breakOnConsoleErrors = (_castBool2 = castBool(window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__)) !== null && _castBool2 !== void 0 ? _castBool2 : false;
  var showInlineWarningsAndErrors = (_castBool3 = castBool(window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__)) !== null && _castBool3 !== void 0 ? _castBool3 : true;
  var hideConsoleLogsInStrictMode = (_castBool4 = castBool(window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__)) !== null && _castBool4 !== void 0 ? _castBool4 : false;
  var browserTheme = (_castBrowserTheme = castBrowserTheme(window.__REACT_DEVTOOLS_BROWSER_THEME__)) !== null && _castBrowserTheme !== void 0 ? _castBrowserTheme : 'dark';
  patch({
    appendComponentStack: appendComponentStack,
    breakOnConsoleErrors: breakOnConsoleErrors,
    showInlineWarningsAndErrors: showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode: hideConsoleLogsInStrictMode,
    browserTheme: browserTheme
  });
} // After receiving cached console patch settings from React Native, we set them on window.
// When the console is initially patched (in renderer.js and hook.js), these values are read.
// The browser extension (etc.) sets these values on window, but through another method.

function writeConsolePatchSettingsToWindow(settings) {
  window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = settings.appendComponentStack;
  window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = settings.breakOnConsoleErrors;
  window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = settings.showInlineWarningsAndErrors;
  window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ = settings.hideConsoleLogsInStrictMode;
  window.__REACT_DEVTOOLS_BROWSER_THEME__ = settings.browserTheme;
}
function installConsoleFunctionsToWindow() {
  window.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__ = {
    patchConsoleUsingWindowValues: patchConsoleUsingWindowValues,
    registerRendererWithConsole: registerRenderer
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/bridge.js
function bridge_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { bridge_typeof = function _typeof(obj) { return typeof obj; }; } else { bridge_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return bridge_typeof(obj); }

function bridge_toConsumableArray(arr) { return bridge_arrayWithoutHoles(arr) || bridge_iterableToArray(arr) || bridge_unsupportedIterableToArray(arr) || bridge_nonIterableSpread(); }

function bridge_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function bridge_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return bridge_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return bridge_arrayLikeToArray(o, minLen); }

function bridge_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function bridge_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return bridge_arrayLikeToArray(arr); }

function bridge_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function bridge_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function bridge_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function bridge_createClass(Constructor, protoProps, staticProps) { if (protoProps) bridge_defineProperties(Constructor.prototype, protoProps); if (staticProps) bridge_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (bridge_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function bridge_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var BATCH_DURATION = 100; // This message specifies the version of the DevTools protocol currently supported by the backend,
// as well as the earliest NPM version (e.g. "4.13.0") that protocol is supported by on the frontend.
// This enables an older frontend to display an upgrade message to users for a newer, unsupported backend.

// Bump protocol version whenever a backwards breaking change is made
// in the messages sent between BackendBridge and FrontendBridge.
// This mapping is embedded in both frontend and backend builds.
//
// The backend protocol will always be the latest entry in the BRIDGE_PROTOCOL array.
//
// When an older frontend connects to a newer backend,
// the backend can send the minNpmVersion and the frontend can display an NPM upgrade prompt.
//
// When a newer frontend connects with an older protocol version,
// the frontend can use the embedded minNpmVersion/maxNpmVersion values to display a downgrade prompt.
var BRIDGE_PROTOCOL = [// This version technically never existed,
// but a backwards breaking change was added in 4.11,
// so the safest guess to downgrade the frontend would be to version 4.10.
{
  version: 0,
  minNpmVersion: '"<4.11.0"',
  maxNpmVersion: '"<4.11.0"'
}, // Versions 4.11.x – 4.12.x contained the backwards breaking change,
// but we didn't add the "fix" of checking the protocol version until 4.13,
// so we don't recommend downgrading to 4.11 or 4.12.
{
  version: 1,
  minNpmVersion: '4.13.0',
  maxNpmVersion: '4.21.0'
}, // Version 2 adds a StrictMode-enabled and supports-StrictMode bits to add-root operation.
{
  version: 2,
  minNpmVersion: '4.22.0',
  maxNpmVersion: null
}];
var currentBridgeProtocol = BRIDGE_PROTOCOL[BRIDGE_PROTOCOL.length - 1];

var Bridge = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Bridge, _EventEmitter);

  var _super = _createSuper(Bridge);

  function Bridge(wall) {
    var _this;

    bridge_classCallCheck(this, Bridge);

    _this = _super.call(this);

    bridge_defineProperty(_assertThisInitialized(_this), "_isShutdown", false);

    bridge_defineProperty(_assertThisInitialized(_this), "_messageQueue", []);

    bridge_defineProperty(_assertThisInitialized(_this), "_timeoutID", null);

    bridge_defineProperty(_assertThisInitialized(_this), "_wallUnlisten", null);

    bridge_defineProperty(_assertThisInitialized(_this), "_flush", function () {
      // This method is used after the bridge is marked as destroyed in shutdown sequence,
      // so we do not bail out if the bridge marked as destroyed.
      // It is a private method that the bridge ensures is only called at the right times.
      if (_this._timeoutID !== null) {
        clearTimeout(_this._timeoutID);
        _this._timeoutID = null;
      }

      if (_this._messageQueue.length) {
        for (var i = 0; i < _this._messageQueue.length; i += 2) {
          var _this$_wall;

          (_this$_wall = _this._wall).send.apply(_this$_wall, [_this._messageQueue[i]].concat(bridge_toConsumableArray(_this._messageQueue[i + 1])));
        }

        _this._messageQueue.length = 0; // Check again for queued messages in BATCH_DURATION ms. This will keep
        // flushing in a loop as long as messages continue to be added. Once no
        // more are, the timer expires.

        _this._timeoutID = setTimeout(_this._flush, BATCH_DURATION);
      }
    });

    bridge_defineProperty(_assertThisInitialized(_this), "overrideValueAtPath", function (_ref) {
      var id = _ref.id,
          path = _ref.path,
          rendererID = _ref.rendererID,
          type = _ref.type,
          value = _ref.value;

      switch (type) {
        case 'context':
          _this.send('overrideContext', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'hooks':
          _this.send('overrideHookState', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'props':
          _this.send('overrideProps', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'state':
          _this.send('overrideState', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;
      }
    });

    _this._wall = wall;
    _this._wallUnlisten = wall.listen(function (message) {
      if (message && message.event) {
        _assertThisInitialized(_this).emit(message.event, message.payload);
      }
    }) || null; // Temporarily support older standalone front-ends sending commands to newer embedded backends.
    // We do this because React Native embeds the React DevTools backend,
    // but cannot control which version of the frontend users use.

    _this.addListener('overrideValueAtPath', _this.overrideValueAtPath);

    return _this;
  } // Listening directly to the wall isn't advised.
  // It can be used to listen for legacy (v3) messages (since they use a different format).


  bridge_createClass(Bridge, [{
    key: "send",
    value: function send(event) {
      if (this._isShutdown) {
        console.warn("Cannot send message \"".concat(event, "\" through a Bridge that has been shutdown."));
        return;
      } // When we receive a message:
      // - we add it to our queue of messages to be sent
      // - if there hasn't been a message recently, we set a timer for 0 ms in
      //   the future, allowing all messages created in the same tick to be sent
      //   together
      // - if there *has* been a message flushed in the last BATCH_DURATION ms
      //   (or we're waiting for our setTimeout-0 to fire), then _timeoutID will
      //   be set, and we'll simply add to the queue and wait for that


      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      this._messageQueue.push(event, payload);

      if (!this._timeoutID) {
        this._timeoutID = setTimeout(this._flush, 0);
      }
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      if (this._isShutdown) {
        console.warn('Bridge was already shutdown.');
        return;
      } // Queue the shutdown outgoing message for subscribers.


      this.emit('shutdown');
      this.send('shutdown'); // Mark this bridge as destroyed, i.e. disable its public API.

      this._isShutdown = true; // Disable the API inherited from EventEmitter that can add more listeners and send more messages.
      // $FlowFixMe[cannot-write] This property is not writable.

      this.addListener = function () {}; // $FlowFixMe[cannot-write] This property is not writable.


      this.emit = function () {}; // NOTE: There's also EventEmitter API like `on` and `prependListener` that we didn't add to our Flow type of EventEmitter.
      // Unsubscribe this bridge incoming message listeners to be sure, and so they don't have to do that.


      this.removeAllListeners(); // Stop accepting and emitting incoming messages from the wall.

      var wallUnlisten = this._wallUnlisten;

      if (wallUnlisten) {
        wallUnlisten();
      } // Synchronously flush all queued outgoing messages.
      // At this step the subscribers' code may run in this call stack.


      do {
        this._flush();
      } while (this._messageQueue.length); // Make sure once again that there is no dangling timer.


      if (this._timeoutID !== null) {
        clearTimeout(this._timeoutID);
        this._timeoutID = null;
      }
    }
  }, {
    key: "wall",
    get: function get() {
      return this._wall;
    }
  }]);

  return Bridge;
}(EventEmitter);

/* harmony default export */ const src_bridge = (Bridge);
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/agent.js
function agent_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { agent_typeof = function _typeof(obj) { return typeof obj; }; } else { agent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return agent_typeof(obj); }

function agent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function agent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function agent_createClass(Constructor, protoProps, staticProps) { if (protoProps) agent_defineProperties(Constructor.prototype, protoProps); if (staticProps) agent_defineProperties(Constructor, staticProps); return Constructor; }

function agent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) agent_setPrototypeOf(subClass, superClass); }

function agent_setPrototypeOf(o, p) { agent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return agent_setPrototypeOf(o, p); }

function agent_createSuper(Derived) { var hasNativeReflectConstruct = agent_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = agent_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = agent_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return agent_possibleConstructorReturn(this, result); }; }

function agent_possibleConstructorReturn(self, call) { if (call && (agent_typeof(call) === "object" || typeof call === "function")) { return call; } return agent_assertThisInitialized(self); }

function agent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function agent_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function agent_getPrototypeOf(o) { agent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return agent_getPrototypeOf(o); }

function agent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */










var debug = function debug(methodName) {
  if (__DEBUG__) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["%cAgent %c".concat(methodName), 'color: purple; font-weight: bold;', 'font-weight: bold;'].concat(args));
  }
};

var Agent = /*#__PURE__*/function (_EventEmitter) {
  agent_inherits(Agent, _EventEmitter);

  var _super = agent_createSuper(Agent);

  function Agent(bridge) {
    var _this;

    agent_classCallCheck(this, Agent);

    _this = _super.call(this);

    agent_defineProperty(agent_assertThisInitialized(_this), "_isProfiling", false);

    agent_defineProperty(agent_assertThisInitialized(_this), "_recordChangeDescriptions", false);

    agent_defineProperty(agent_assertThisInitialized(_this), "_rendererInterfaces", {});

    agent_defineProperty(agent_assertThisInitialized(_this), "_persistedSelection", null);

    agent_defineProperty(agent_assertThisInitialized(_this), "_persistedSelectionMatch", null);

    agent_defineProperty(agent_assertThisInitialized(_this), "_traceUpdatesEnabled", false);

    agent_defineProperty(agent_assertThisInitialized(_this), "clearErrorsAndWarnings", function (_ref) {
      var rendererID = _ref.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\""));
      } else {
        renderer.clearErrorsAndWarnings();
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "clearErrorsForFiberID", function (_ref2) {
      var id = _ref2.id,
          rendererID = _ref2.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\""));
      } else {
        renderer.clearErrorsForFiberID(id);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "clearWarningsForFiberID", function (_ref3) {
      var id = _ref3.id,
          rendererID = _ref3.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\""));
      } else {
        renderer.clearWarningsForFiberID(id);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "copyElementPath", function (_ref4) {
      var id = _ref4.id,
          path = _ref4.path,
          rendererID = _ref4.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        var value = renderer.getSerializedElementValueByPath(id, path);

        if (value != null) {
          _this._bridge.send('saveToClipboard', value);
        } else {
          console.warn("Unable to obtain serialized value for element \"".concat(id, "\""));
        }
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "deletePath", function (_ref5) {
      var hookID = _ref5.hookID,
          id = _ref5.id,
          path = _ref5.path,
          rendererID = _ref5.rendererID,
          type = _ref5.type;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.deletePath(type, id, hookID, path);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "getBackendVersion", function () {
      var version = "5.3.2-c82bcbeb2b";

      if (version) {
        _this._bridge.send('backendVersion', version);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "getBridgeProtocol", function () {
      _this._bridge.send('bridgeProtocol', currentBridgeProtocol);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "getProfilingData", function (_ref6) {
      var rendererID = _ref6.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\""));
      }

      _this._bridge.send('profilingData', renderer.getProfilingData());
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "getProfilingStatus", function () {
      _this._bridge.send('profilingStatus', _this._isProfiling);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "getOwnersList", function (_ref7) {
      var id = _ref7.id,
          rendererID = _ref7.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        var owners = renderer.getOwnersList(id);

        _this._bridge.send('ownersList', {
          id: id,
          owners: owners
        });
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "inspectElement", function (_ref8) {
      var forceFullData = _ref8.forceFullData,
          id = _ref8.id,
          path = _ref8.path,
          rendererID = _ref8.rendererID,
          requestID = _ref8.requestID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        _this._bridge.send('inspectedElement', renderer.inspectElement(requestID, id, path, forceFullData)); // When user selects an element, stop trying to restore the selection,
        // and instead remember the current selection for the next reload.


        if (_this._persistedSelectionMatch === null || _this._persistedSelectionMatch.id !== id) {
          _this._persistedSelection = null;
          _this._persistedSelectionMatch = null;
          renderer.setTrackedPath(null);

          _this._throttledPersistSelection(rendererID, id);
        } // TODO: If there was a way to change the selected DOM element
        // in native Elements tab without forcing a switch to it, we'd do it here.
        // For now, it doesn't seem like there is a way to do that:
        // https://github.com/bvaughn/react-devtools-experimental/issues/102
        // (Setting $0 doesn't work, and calling inspect() switches the tab.)

      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "logElementToConsole", function (_ref9) {
      var id = _ref9.id,
          rendererID = _ref9.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.logElementToConsole(id);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideError", function (_ref10) {
      var id = _ref10.id,
          rendererID = _ref10.rendererID,
          forceError = _ref10.forceError;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.overrideError(id, forceError);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideSuspense", function (_ref11) {
      var id = _ref11.id,
          rendererID = _ref11.rendererID,
          forceFallback = _ref11.forceFallback;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.overrideSuspense(id, forceFallback);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideValueAtPath", function (_ref12) {
      var hookID = _ref12.hookID,
          id = _ref12.id,
          path = _ref12.path,
          rendererID = _ref12.rendererID,
          type = _ref12.type,
          value = _ref12.value;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.overrideValueAtPath(type, id, hookID, path, value);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideContext", function (_ref13) {
      var id = _ref13.id,
          path = _ref13.path,
          rendererID = _ref13.rendererID,
          wasForwarded = _ref13.wasForwarded,
          value = _ref13.value;

      // Don't forward a message that's already been forwarded by the front-end Bridge.
      // We only need to process the override command once!
      if (!wasForwarded) {
        _this.overrideValueAtPath({
          id: id,
          path: path,
          rendererID: rendererID,
          type: 'context',
          value: value
        });
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideHookState", function (_ref14) {
      var id = _ref14.id,
          hookID = _ref14.hookID,
          path = _ref14.path,
          rendererID = _ref14.rendererID,
          wasForwarded = _ref14.wasForwarded,
          value = _ref14.value;

      // Don't forward a message that's already been forwarded by the front-end Bridge.
      // We only need to process the override command once!
      if (!wasForwarded) {
        _this.overrideValueAtPath({
          id: id,
          path: path,
          rendererID: rendererID,
          type: 'hooks',
          value: value
        });
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideProps", function (_ref15) {
      var id = _ref15.id,
          path = _ref15.path,
          rendererID = _ref15.rendererID,
          wasForwarded = _ref15.wasForwarded,
          value = _ref15.value;

      // Don't forward a message that's already been forwarded by the front-end Bridge.
      // We only need to process the override command once!
      if (!wasForwarded) {
        _this.overrideValueAtPath({
          id: id,
          path: path,
          rendererID: rendererID,
          type: 'props',
          value: value
        });
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "overrideState", function (_ref16) {
      var id = _ref16.id,
          path = _ref16.path,
          rendererID = _ref16.rendererID,
          wasForwarded = _ref16.wasForwarded,
          value = _ref16.value;

      // Don't forward a message that's already been forwarded by the front-end Bridge.
      // We only need to process the override command once!
      if (!wasForwarded) {
        _this.overrideValueAtPath({
          id: id,
          path: path,
          rendererID: rendererID,
          type: 'state',
          value: value
        });
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "reloadAndProfile", function (recordChangeDescriptions) {
      sessionStorageSetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY, 'true');
      sessionStorageSetItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY, recordChangeDescriptions ? 'true' : 'false'); // This code path should only be hit if the shell has explicitly told the Store that it supports profiling.
      // In that case, the shell must also listen for this specific message to know when it needs to reload the app.
      // The agent can't do this in a way that is renderer agnostic.

      _this._bridge.send('reloadAppForProfiling');
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "renamePath", function (_ref17) {
      var hookID = _ref17.hookID,
          id = _ref17.id,
          newPath = _ref17.newPath,
          oldPath = _ref17.oldPath,
          rendererID = _ref17.rendererID,
          type = _ref17.type;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.renamePath(type, id, hookID, oldPath, newPath);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "setTraceUpdatesEnabled", function (traceUpdatesEnabled) {
      _this._traceUpdatesEnabled = traceUpdatesEnabled;
      toggleEnabled(traceUpdatesEnabled);

      for (var rendererID in _this._rendererInterfaces) {
        var renderer = _this._rendererInterfaces[rendererID];
        renderer.setTraceUpdatesEnabled(traceUpdatesEnabled);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "syncSelectionFromNativeElementsPanel", function () {
      var target = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0;

      if (target == null) {
        return;
      }

      _this.selectNode(target);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "shutdown", function () {
      // Clean up the overlay if visible, and associated events.
      _this.emit('shutdown');
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "startProfiling", function (recordChangeDescriptions) {
      _this._recordChangeDescriptions = recordChangeDescriptions;
      _this._isProfiling = true;

      for (var rendererID in _this._rendererInterfaces) {
        var renderer = _this._rendererInterfaces[rendererID];
        renderer.startProfiling(recordChangeDescriptions);
      }

      _this._bridge.send('profilingStatus', _this._isProfiling);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "stopProfiling", function () {
      _this._isProfiling = false;
      _this._recordChangeDescriptions = false;

      for (var rendererID in _this._rendererInterfaces) {
        var renderer = _this._rendererInterfaces[rendererID];
        renderer.stopProfiling();
      }

      _this._bridge.send('profilingStatus', _this._isProfiling);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "stopInspectingNative", function (selected) {
      _this._bridge.send('stopInspectingNative', selected);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "storeAsGlobal", function (_ref18) {
      var count = _ref18.count,
          id = _ref18.id,
          path = _ref18.path,
          rendererID = _ref18.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.storeAsGlobal(id, path, count);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "updateConsolePatchSettings", function (_ref19) {
      var appendComponentStack = _ref19.appendComponentStack,
          breakOnConsoleErrors = _ref19.breakOnConsoleErrors,
          showInlineWarningsAndErrors = _ref19.showInlineWarningsAndErrors,
          hideConsoleLogsInStrictMode = _ref19.hideConsoleLogsInStrictMode,
          browserTheme = _ref19.browserTheme;
      // If the frontend preferences have changed,
      // or in the case of React Native- if the backend is just finding out the preferences-
      // then reinstall the console overrides.
      // It's safe to call `patchConsole` multiple times.
      patch({
        appendComponentStack: appendComponentStack,
        breakOnConsoleErrors: breakOnConsoleErrors,
        showInlineWarningsAndErrors: showInlineWarningsAndErrors,
        hideConsoleLogsInStrictMode: hideConsoleLogsInStrictMode,
        browserTheme: browserTheme
      });
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "updateComponentFilters", function (componentFilters) {
      for (var rendererID in _this._rendererInterfaces) {
        var renderer = _this._rendererInterfaces[rendererID];
        renderer.updateComponentFilters(componentFilters);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "viewAttributeSource", function (_ref20) {
      var id = _ref20.id,
          path = _ref20.path,
          rendererID = _ref20.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.prepareViewAttributeSource(id, path);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "viewElementSource", function (_ref21) {
      var id = _ref21.id,
          rendererID = _ref21.rendererID;
      var renderer = _this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\" for element \"").concat(id, "\""));
      } else {
        renderer.prepareViewElementSource(id);
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "onTraceUpdates", function (nodes) {
      _this.emit('traceUpdates', nodes);
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "onFastRefreshScheduled", function () {
      if (__DEBUG__) {
        debug('onFastRefreshScheduled');
      }

      _this._bridge.send('fastRefreshScheduled');
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "onHookOperations", function (operations) {
      if (__DEBUG__) {
        debug('onHookOperations', "(".concat(operations.length, ") [").concat(operations.join(', '), "]"));
      } // TODO:
      // The chrome.runtime does not currently support transferables; it forces JSON serialization.
      // See bug https://bugs.chromium.org/p/chromium/issues/detail?id=927134
      //
      // Regarding transferables, the postMessage doc states:
      // If the ownership of an object is transferred, it becomes unusable (neutered)
      // in the context it was sent from and becomes available only to the worker it was sent to.
      //
      // Even though Chrome is eventually JSON serializing the array buffer,
      // using the transferable approach also sometimes causes it to throw:
      //   DOMException: Failed to execute 'postMessage' on 'Window': ArrayBuffer at index 0 is already neutered.
      //
      // See bug https://github.com/bvaughn/react-devtools-experimental/issues/25
      //
      // The Store has a fallback in place that parses the message as JSON if the type isn't an array.
      // For now the simplest fix seems to be to not transfer the array.
      // This will negatively impact performance on Firefox so it's unfortunate,
      // but until we're able to fix the Chrome error mentioned above, it seems necessary.
      //
      // this._bridge.send('operations', operations, [operations.buffer]);


      _this._bridge.send('operations', operations);

      if (_this._persistedSelection !== null) {
        var rendererID = operations[0];

        if (_this._persistedSelection.rendererID === rendererID) {
          // Check if we can select a deeper match for the persisted selection.
          var renderer = _this._rendererInterfaces[rendererID];

          if (renderer == null) {
            console.warn("Invalid renderer id \"".concat(rendererID, "\""));
          } else {
            var prevMatch = _this._persistedSelectionMatch;
            var nextMatch = renderer.getBestMatchForTrackedPath();
            _this._persistedSelectionMatch = nextMatch;
            var prevMatchID = prevMatch !== null ? prevMatch.id : null;
            var nextMatchID = nextMatch !== null ? nextMatch.id : null;

            if (prevMatchID !== nextMatchID) {
              if (nextMatchID !== null) {
                // We moved forward, unlocking a deeper node.
                _this._bridge.send('selectFiber', nextMatchID);
              }
            }

            if (nextMatch !== null && nextMatch.isFullMatch) {
              // We've just unlocked the innermost selected node.
              // There's no point tracking it further.
              _this._persistedSelection = null;
              _this._persistedSelectionMatch = null;
              renderer.setTrackedPath(null);
            }
          }
        }
      }
    });

    agent_defineProperty(agent_assertThisInitialized(_this), "_throttledPersistSelection", lodash_throttle_default()(function (rendererID, id) {
      // This is throttled, so both renderer and selected ID
      // might not be available by the time we read them.
      // This is why we need the defensive checks here.
      var renderer = _this._rendererInterfaces[rendererID];
      var path = renderer != null ? renderer.getPathForElement(id) : null;

      if (path !== null) {
        sessionStorageSetItem(SESSION_STORAGE_LAST_SELECTION_KEY, JSON.stringify({
          rendererID: rendererID,
          path: path
        }));
      } else {
        sessionStorageRemoveItem(SESSION_STORAGE_LAST_SELECTION_KEY);
      }
    }, 1000));

    if (sessionStorageGetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY) === 'true') {
      _this._recordChangeDescriptions = sessionStorageGetItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY) === 'true';
      _this._isProfiling = true;
      sessionStorageRemoveItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY);
      sessionStorageRemoveItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY);
    }

    var persistedSelectionString = sessionStorageGetItem(SESSION_STORAGE_LAST_SELECTION_KEY);

    if (persistedSelectionString != null) {
      _this._persistedSelection = JSON.parse(persistedSelectionString);
    }

    _this._bridge = bridge;
    bridge.addListener('clearErrorsAndWarnings', _this.clearErrorsAndWarnings);
    bridge.addListener('clearErrorsForFiberID', _this.clearErrorsForFiberID);
    bridge.addListener('clearWarningsForFiberID', _this.clearWarningsForFiberID);
    bridge.addListener('copyElementPath', _this.copyElementPath);
    bridge.addListener('deletePath', _this.deletePath);
    bridge.addListener('getBackendVersion', _this.getBackendVersion);
    bridge.addListener('getBridgeProtocol', _this.getBridgeProtocol);
    bridge.addListener('getProfilingData', _this.getProfilingData);
    bridge.addListener('getProfilingStatus', _this.getProfilingStatus);
    bridge.addListener('getOwnersList', _this.getOwnersList);
    bridge.addListener('inspectElement', _this.inspectElement);
    bridge.addListener('logElementToConsole', _this.logElementToConsole);
    bridge.addListener('overrideError', _this.overrideError);
    bridge.addListener('overrideSuspense', _this.overrideSuspense);
    bridge.addListener('overrideValueAtPath', _this.overrideValueAtPath);
    bridge.addListener('reloadAndProfile', _this.reloadAndProfile);
    bridge.addListener('renamePath', _this.renamePath);
    bridge.addListener('setTraceUpdatesEnabled', _this.setTraceUpdatesEnabled);
    bridge.addListener('startProfiling', _this.startProfiling);
    bridge.addListener('stopProfiling', _this.stopProfiling);
    bridge.addListener('storeAsGlobal', _this.storeAsGlobal);
    bridge.addListener('syncSelectionFromNativeElementsPanel', _this.syncSelectionFromNativeElementsPanel);
    bridge.addListener('shutdown', _this.shutdown);
    bridge.addListener('updateConsolePatchSettings', _this.updateConsolePatchSettings);
    bridge.addListener('updateComponentFilters', _this.updateComponentFilters);
    bridge.addListener('viewAttributeSource', _this.viewAttributeSource);
    bridge.addListener('viewElementSource', _this.viewElementSource); // Temporarily support older standalone front-ends sending commands to newer embedded backends.
    // We do this because React Native embeds the React DevTools backend,
    // but cannot control which version of the frontend users use.

    bridge.addListener('overrideContext', _this.overrideContext);
    bridge.addListener('overrideHookState', _this.overrideHookState);
    bridge.addListener('overrideProps', _this.overrideProps);
    bridge.addListener('overrideState', _this.overrideState);

    if (_this._isProfiling) {
      bridge.send('profilingStatus', true);
    } // Send the Bridge protocol and backend versions, after initialization, in case the frontend has already requested it.
    // The Store may be instantiated beore the agent.


    var _version = "5.3.2-c82bcbeb2b";

    if (_version) {
      _this._bridge.send('backendVersion', _version);
    }

    _this._bridge.send('bridgeProtocol', currentBridgeProtocol); // Notify the frontend if the backend supports the Storage API (e.g. localStorage).
    // If not, features like reload-and-profile will not work correctly and must be disabled.


    var isBackendStorageAPISupported = false;

    try {
      localStorage.getItem('test');
      isBackendStorageAPISupported = true;
    } catch (error) {}

    bridge.send('isBackendStorageAPISupported', isBackendStorageAPISupported);
    bridge.send('isSynchronousXHRSupported', isSynchronousXHRSupported());
    setupHighlighter(bridge, agent_assertThisInitialized(_this));
    TraceUpdates_initialize(agent_assertThisInitialized(_this));
    return _this;
  }

  agent_createClass(Agent, [{
    key: "getInstanceAndStyle",
    value: function getInstanceAndStyle(_ref22) {
      var id = _ref22.id,
          rendererID = _ref22.rendererID;
      var renderer = this._rendererInterfaces[rendererID];

      if (renderer == null) {
        console.warn("Invalid renderer id \"".concat(rendererID, "\""));
        return null;
      }

      return renderer.getInstanceAndStyle(id);
    }
  }, {
    key: "getBestMatchingRendererInterface",
    value: function getBestMatchingRendererInterface(node) {
      var bestMatch = null;

      for (var rendererID in this._rendererInterfaces) {
        var renderer = this._rendererInterfaces[rendererID];
        var fiber = renderer.getFiberForNative(node);

        if (fiber !== null) {
          // check if fiber.stateNode is matching the original hostInstance
          if (fiber.stateNode === node) {
            return renderer;
          } else if (bestMatch === null) {
            bestMatch = renderer;
          }
        }
      } // if an exact match is not found, return the first valid renderer as fallback


      return bestMatch;
    }
  }, {
    key: "getIDForNode",
    value: function getIDForNode(node) {
      var rendererInterface = this.getBestMatchingRendererInterface(node);

      if (rendererInterface != null) {
        try {
          return rendererInterface.getFiberIDForNative(node, true);
        } catch (error) {// Some old React versions might throw if they can't find a match.
          // If so we should ignore it...
        }
      }

      return null;
    }
  }, {
    key: "selectNode",
    value: function selectNode(target) {
      var id = this.getIDForNode(target);

      if (id !== null) {
        this._bridge.send('selectFiber', id);
      }
    }
  }, {
    key: "setRendererInterface",
    value: function setRendererInterface(rendererID, rendererInterface) {
      this._rendererInterfaces[rendererID] = rendererInterface;

      if (this._isProfiling) {
        rendererInterface.startProfiling(this._recordChangeDescriptions);
      }

      rendererInterface.setTraceUpdatesEnabled(this._traceUpdatesEnabled); // When the renderer is attached, we need to tell it whether
      // we remember the previous selection that we'd like to restore.
      // It'll start tracking mounts for matches to the last selection path.

      var selection = this._persistedSelection;

      if (selection !== null && selection.rendererID === rendererID) {
        rendererInterface.setTrackedPath(selection.path);
      }
    }
  }, {
    key: "onUnsupportedRenderer",
    value: function onUnsupportedRenderer(rendererID) {
      this._bridge.send('unsupportedRendererVersion', rendererID);
    }
  }, {
    key: "rendererInterfaces",
    get: function get() {
      return this._rendererInterfaces;
    }
  }]);

  return Agent;
}(EventEmitter);


;// CONCATENATED MODULE: ../react-devtools-shared/src/hook.js
function hook_slicedToArray(arr, i) { return hook_arrayWithHoles(arr) || hook_iterableToArrayLimit(arr, i) || hook_unsupportedIterableToArray(arr, i) || hook_nonIterableRest(); }

function hook_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function hook_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function hook_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hook_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { hook_typeof = function _typeof(obj) { return typeof obj; }; } else { hook_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return hook_typeof(obj); }

function hook_toConsumableArray(arr) { return hook_arrayWithoutHoles(arr) || hook_iterableToArray(arr) || hook_unsupportedIterableToArray(arr) || hook_nonIterableSpread(); }

function hook_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function hook_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return hook_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return hook_arrayLikeToArray(o, minLen); }

function hook_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function hook_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return hook_arrayLikeToArray(arr); }

function hook_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Install the hook on window, which is an event emitter.
 * Note: this global hook __REACT_DEVTOOLS_GLOBAL_HOOK__ is a de facto public API.
 * It's especially important to avoid creating direct dependency on the DevTools Backend.
 * That's why we still inline the whole event emitter implementation,
 * the string format implementation, and part of the console implementation here.
 *
 * 
 */

function installHook(target) {
  if (target.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
    return null;
  }

  var targetConsole = console;
  var targetConsoleMethods = {};

  for (var method in console) {
    targetConsoleMethods[method] = console[method];
  }

  function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
    targetConsole = targetConsoleForTesting;
    targetConsoleMethods = {};

    for (var _method in targetConsole) {
      targetConsoleMethods[_method] = console[_method];
    }
  }

  function detectReactBuildType(renderer) {
    try {
      if (typeof renderer.version === 'string') {
        // React DOM Fiber (16+)
        if (renderer.bundleType > 0) {
          // This is not a production build.
          // We are currently only using 0 (PROD) and 1 (DEV)
          // but might add 2 (PROFILE) in the future.
          return 'development';
        } // React 16 uses flat bundles. If we report the bundle as production
        // version, it means we also minified and envified it ourselves.


        return 'production'; // Note: There is still a risk that the CommonJS entry point has not
        // been envified or uglified. In this case the user would have *both*
        // development and production bundle, but only the prod one would run.
        // This would be really bad. We have a separate check for this because
        // it happens *outside* of the renderer injection. See `checkDCE` below.
      } // $FlowFixMe[method-unbinding]


      var _toString = Function.prototype.toString;

      if (renderer.Mount && renderer.Mount._renderNewRootComponent) {
        // React DOM Stack
        var renderRootCode = _toString.call(renderer.Mount._renderNewRootComponent); // Filter out bad results (if that is even possible):


        if (renderRootCode.indexOf('function') !== 0) {
          // Hope for the best if we're not sure.
          return 'production';
        } // Check for React DOM Stack < 15.1.0 in development.
        // If it contains "storedMeasure" call, it's wrapped in ReactPerf (DEV only).
        // This would be true even if it's minified, as method name still matches.


        if (renderRootCode.indexOf('storedMeasure') !== -1) {
          return 'development';
        } // For other versions (and configurations) it's not so easy.
        // Let's quickly exclude proper production builds.
        // If it contains a warning message, it's either a DEV build,
        // or an PROD build without proper dead code elimination.


        if (renderRootCode.indexOf('should be a pure function') !== -1) {
          // Now how do we tell a DEV build from a bad PROD build?
          // If we see NODE_ENV, we're going to assume this is a dev build
          // because most likely it is referring to an empty shim.
          if (renderRootCode.indexOf('NODE_ENV') !== -1) {
            return 'development';
          } // If we see "development", we're dealing with an envified DEV build
          // (such as the official React DEV UMD).


          if (renderRootCode.indexOf('development') !== -1) {
            return 'development';
          } // I've seen process.env.NODE_ENV !== 'production' being smartly
          // replaced by `true` in DEV by Webpack. I don't know how that
          // works but we can safely guard against it because `true` was
          // never used in the function source since it was written.


          if (renderRootCode.indexOf('true') !== -1) {
            return 'development';
          } // By now either it is a production build that has not been minified,
          // or (worse) this is a minified development build using non-standard
          // environment (e.g. "staging"). We're going to look at whether
          // the function argument name is mangled:


          if ( // 0.13 to 15
          renderRootCode.indexOf('nextElement') !== -1 || // 0.12
          renderRootCode.indexOf('nextComponent') !== -1) {
            // We can't be certain whether this is a development build or not,
            // but it is definitely unminified.
            return 'unminified';
          } else {
            // This is likely a minified development build.
            return 'development';
          }
        } // By now we know that it's envified and dead code elimination worked,
        // but what if it's still not minified? (Is this even possible?)
        // Let's check matches for the first argument name.


        if ( // 0.13 to 15
        renderRootCode.indexOf('nextElement') !== -1 || // 0.12
        renderRootCode.indexOf('nextComponent') !== -1) {
          return 'unminified';
        } // Seems like we're using the production version.
        // However, the branch above is Stack-only so this is 15 or earlier.


        return 'outdated';
      }
    } catch (err) {// Weird environments may exist.
      // This code needs a higher fault tolerance
      // because it runs even with closed DevTools.
      // TODO: should we catch errors in all injected code, and not just this part?
    }

    return 'production';
  }

  function checkDCE(fn) {
    // This runs for production versions of React.
    // Needs to be super safe.
    try {
      // $FlowFixMe[method-unbinding]
      var _toString2 = Function.prototype.toString;

      var code = _toString2.call(fn); // This is a string embedded in the passed function under DEV-only
      // condition. However the function executes only in PROD. Therefore,
      // if we see it, dead code elimination did not work.


      if (code.indexOf('^_^') > -1) {
        // Remember to report during next injection.
        hasDetectedBadDCE = true; // Bonus: throw an exception hoping that it gets picked up by a reporting system.
        // Not synchronously so that it doesn't break the calling code.

        setTimeout(function () {
          throw new Error('React is running in production mode, but dead code ' + 'elimination has not been applied. Read how to correctly ' + 'configure React for production: ' + 'https://react.dev/link/perf-use-production-build');
        });
      }
    } catch (err) {}
  } // NOTE: KEEP IN SYNC with src/backend/utils.js


  function formatWithStyles(inputArgs, style) {
    if (inputArgs === undefined || inputArgs === null || inputArgs.length === 0 || // Matches any of %c but not %%c
    typeof inputArgs[0] === 'string' && inputArgs[0].match(/([^%]|^)(%c)/g) || style === undefined) {
      return inputArgs;
    } // Matches any of %(o|O|d|i|s|f), but not %%(o|O|d|i|s|f)


    var REGEXP = /([^%]|^)((%%)*)(%([oOdisf]))/g;

    if (typeof inputArgs[0] === 'string' && inputArgs[0].match(REGEXP)) {
      return ["%c".concat(inputArgs[0]), style].concat(hook_toConsumableArray(inputArgs.slice(1)));
    } else {
      var firstArg = inputArgs.reduce(function (formatStr, elem, i) {
        if (i > 0) {
          formatStr += ' ';
        }

        switch (hook_typeof(elem)) {
          case 'string':
          case 'boolean':
          case 'symbol':
            return formatStr += '%s';

          case 'number':
            var formatting = Number.isInteger(elem) ? '%i' : '%f';
            return formatStr += formatting;

          default:
            return formatStr += '%o';
        }
      }, '%c');
      return [firstArg, style].concat(hook_toConsumableArray(inputArgs));
    }
  } // NOTE: KEEP IN SYNC with src/backend/utils.js


  function formatConsoleArguments(maybeMessage) {
    for (var _len = arguments.length, inputArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      inputArgs[_key - 1] = arguments[_key];
    }

    if (inputArgs.length === 0 || typeof maybeMessage !== 'string') {
      return [maybeMessage].concat(inputArgs);
    }

    var args = inputArgs.slice();
    var template = '';
    var argumentsPointer = 0;

    for (var i = 0; i < maybeMessage.length; ++i) {
      var currentChar = maybeMessage[i];

      if (currentChar !== '%') {
        template += currentChar;
        continue;
      }

      var nextChar = maybeMessage[i + 1];
      ++i; // Only keep CSS and objects, inline other arguments

      switch (nextChar) {
        case 'c':
        case 'O':
        case 'o':
          {
            ++argumentsPointer;
            template += "%".concat(nextChar);
            break;
          }

        case 'd':
        case 'i':
          {
            var _args$splice = args.splice(argumentsPointer, 1),
                _args$splice2 = hook_slicedToArray(_args$splice, 1),
                arg = _args$splice2[0];

            template += parseInt(arg, 10).toString();
            break;
          }

        case 'f':
          {
            var _args$splice3 = args.splice(argumentsPointer, 1),
                _args$splice4 = hook_slicedToArray(_args$splice3, 1),
                _arg = _args$splice4[0];

            template += parseFloat(_arg).toString();
            break;
          }

        case 's':
          {
            var _args$splice5 = args.splice(argumentsPointer, 1),
                _args$splice6 = hook_slicedToArray(_args$splice5, 1),
                _arg2 = _args$splice6[0];

            template += _arg2.toString();
          }
      }
    }

    return [template].concat(hook_toConsumableArray(args));
  }

  var unpatchFn = null; // NOTE: KEEP IN SYNC with src/backend/console.js:patchForStrictMode
  // This function hides or dims console logs during the initial double renderer
  // in Strict Mode. We need this function because during initial render,
  // React and DevTools are connecting and the renderer interface isn't avaiable
  // and we want to be able to have consistent logging behavior for double logs
  // during the initial renderer.

  function patchConsoleForInitialCommitInStrictMode(hideConsoleLogsInStrictMode) {
    var overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    var originalConsoleMethods = {};

    unpatchFn = function unpatchFn() {
      for (var _method2 in originalConsoleMethods) {
        try {
          targetConsole[_method2] = originalConsoleMethods[_method2];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(function (method) {
      try {
        var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method];

        var overrideMethod = function overrideMethod() {
          // Dim the text color of the double logs if we're not hiding them.
          if (!hideConsoleLogsInStrictMode) {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            // Firefox doesn't support ANSI escape sequences
            if (false) {} else {
              originalMethod.apply(void 0, [ANSI_STYLE_DIMMING_TEMPLATE].concat(hook_toConsumableArray(formatConsoleArguments.apply(void 0, args))));
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } // NOTE: KEEP IN SYNC with src/backend/console.js:unpatchForStrictMode


  function unpatchConsoleForInitialCommitInStrictMode() {
    if (unpatchFn !== null) {
      unpatchFn();
      unpatchFn = null;
    }
  }

  var uidCounter = 0;

  function inject(renderer) {
    var id = ++uidCounter;
    renderers.set(id, renderer);
    var reactBuildType = hasDetectedBadDCE ? 'deadcode' : detectReactBuildType(renderer); // Patching the console enables DevTools to do a few useful things:
    // * Append component stacks to warnings and error messages
    // * Disabling or marking logs during a double render in Strict Mode
    // * Disable logging during re-renders to inspect hooks (see inspectHooksOfFiber)
    //
    // Allow patching console early (during injection) to
    // provide developers with components stacks even if they don't run DevTools.

    if (target.hasOwnProperty('__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__')) {
      var _target$__REACT_DEVTO = target.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__,
          registerRendererWithConsole = _target$__REACT_DEVTO.registerRendererWithConsole,
          patchConsoleUsingWindowValues = _target$__REACT_DEVTO.patchConsoleUsingWindowValues;

      if (typeof registerRendererWithConsole === 'function' && typeof patchConsoleUsingWindowValues === 'function') {
        registerRendererWithConsole(renderer);
        patchConsoleUsingWindowValues();
      }
    } // If we have just reloaded to profile, we need to inject the renderer interface before the app loads.
    // Otherwise the renderer won't yet exist and we can skip this step.


    var attach = target.__REACT_DEVTOOLS_ATTACH__;

    if (typeof attach === 'function') {
      var rendererInterface = attach(hook, id, renderer, target);
      hook.rendererInterfaces.set(id, rendererInterface);
    }

    hook.emit('renderer', {
      id: id,
      renderer: renderer,
      reactBuildType: reactBuildType
    });
    return id;
  }

  var hasDetectedBadDCE = false;

  function sub(event, fn) {
    hook.on(event, fn);
    return function () {
      return hook.off(event, fn);
    };
  }

  function on(event, fn) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) {
      return;
    }

    var index = listeners[event].indexOf(fn);

    if (index !== -1) {
      listeners[event].splice(index, 1);
    }

    if (!listeners[event].length) {
      delete listeners[event];
    }
  }

  function emit(event, data) {
    if (listeners[event]) {
      listeners[event].map(function (fn) {
        return fn(data);
      });
    }
  }

  function getFiberRoots(rendererID) {
    var roots = fiberRoots;

    if (!roots[rendererID]) {
      roots[rendererID] = new Set();
    }

    return roots[rendererID];
  }

  function onCommitFiberUnmount(rendererID, fiber) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberUnmount(fiber);
    }
  }

  function onCommitFiberRoot(rendererID, root, priorityLevel) {
    var mountedRoots = hook.getFiberRoots(rendererID);
    var current = root.current;
    var isKnownRoot = mountedRoots.has(root);
    var isUnmounting = current.memoizedState == null || current.memoizedState.element == null; // Keep track of mounted roots so we can hydrate when DevTools connect.

    if (!isKnownRoot && !isUnmounting) {
      mountedRoots.add(root);
    } else if (isKnownRoot && isUnmounting) {
      mountedRoots.delete(root);
    }

    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberRoot(root, priorityLevel);
    }
  }

  function onPostCommitFiberRoot(rendererID, root) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handlePostCommitFiberRoot(root);
    }
  }

  function setStrictMode(rendererID, isStrictMode) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      if (isStrictMode) {
        rendererInterface.patchConsoleForStrictMode();
      } else {
        rendererInterface.unpatchConsoleForStrictMode();
      }
    } else {
      // This should only happen during initial commit in the extension before DevTools
      // finishes its handshake with the injected renderer
      if (isStrictMode) {
        var hideConsoleLogsInStrictMode = window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ === true;
        patchConsoleForInitialCommitInStrictMode(hideConsoleLogsInStrictMode);
      } else {
        unpatchConsoleForInitialCommitInStrictMode();
      }
    }
  }

  var openModuleRangesStack = [];
  var moduleRanges = [];

  function getTopStackFrameString(error) {
    var frames = error.stack.split('\n');
    var frame = frames.length > 1 ? frames[1] : null;
    return frame;
  }

  function getInternalModuleRanges() {
    return moduleRanges;
  }

  function registerInternalModuleStart(error) {
    var startStackFrame = getTopStackFrameString(error);

    if (startStackFrame !== null) {
      openModuleRangesStack.push(startStackFrame);
    }
  }

  function registerInternalModuleStop(error) {
    if (openModuleRangesStack.length > 0) {
      var startStackFrame = openModuleRangesStack.pop();
      var stopStackFrame = getTopStackFrameString(error);

      if (stopStackFrame !== null) {
        moduleRanges.push([startStackFrame, stopStackFrame]);
      }
    }
  } // TODO: More meaningful names for "rendererInterfaces" and "renderers".


  var fiberRoots = {};
  var rendererInterfaces = new Map();
  var listeners = {};
  var renderers = new Map();
  var backends = new Map();
  var hook = {
    rendererInterfaces: rendererInterfaces,
    listeners: listeners,
    backends: backends,
    // Fast Refresh for web relies on this.
    renderers: renderers,
    emit: emit,
    getFiberRoots: getFiberRoots,
    inject: inject,
    on: on,
    off: off,
    sub: sub,
    // This is a legacy flag.
    // React v16 checks the hook for this to ensure DevTools is new enough.
    supportsFiber: true,
    // React calls these methods.
    checkDCE: checkDCE,
    onCommitFiberUnmount: onCommitFiberUnmount,
    onCommitFiberRoot: onCommitFiberRoot,
    onPostCommitFiberRoot: onPostCommitFiberRoot,
    setStrictMode: setStrictMode,
    // Schedule Profiler runtime helpers.
    // These internal React modules to report their own boundaries
    // which in turn enables the profiler to dim or filter internal frames.
    getInternalModuleRanges: getInternalModuleRanges,
    registerInternalModuleStart: registerInternalModuleStart,
    registerInternalModuleStop: registerInternalModuleStop
  };

  if (false) {}

  Object.defineProperty(target, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    // This property needs to be configurable for the test environment,
    // else we won't be able to delete and recreate it between tests.
    configurable: false,
    enumerable: false,
    get: function get() {
      return hook;
    }
  });
  return hook;
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/legacy/utils.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function decorate(object, attr, fn) {
  var old = object[attr]; // $FlowFixMe[missing-this-annot] webpack config needs to be updated to allow `this` type annotations

  object[attr] = function (instance) {
    return fn.call(this, old, arguments);
  };

  return old;
}
function decorateMany(source, fns) {
  var olds = {};

  for (var name in fns) {
    olds[name] = decorate(source, name, fns[name]);
  }

  return olds;
}
function restoreMany(source, olds) {
  for (var name in olds) {
    source[name] = olds[name];
  }
} // $FlowFixMe[missing-this-annot] webpack config needs to be updated to allow `this` type annotations

function forceUpdate(instance) {
  if (typeof instance.forceUpdate === 'function') {
    instance.forceUpdate();
  } else if (instance.updater != null && typeof instance.updater.enqueueForceUpdate === 'function') {
    instance.updater.enqueueForceUpdate(this, function () {}, 'forceUpdate');
  }
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/legacy/renderer.js
function legacy_renderer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function legacy_renderer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { legacy_renderer_ownKeys(Object(source), true).forEach(function (key) { legacy_renderer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { legacy_renderer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function legacy_renderer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function legacy_renderer_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { legacy_renderer_typeof = function _typeof(obj) { return typeof obj; }; } else { legacy_renderer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return legacy_renderer_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */







function getData(internalInstance) {
  var displayName = null;
  var key = null; // != used deliberately here to catch undefined and null

  if (internalInstance._currentElement != null) {
    if (internalInstance._currentElement.key) {
      key = String(internalInstance._currentElement.key);
    }

    var elementType = internalInstance._currentElement.type;

    if (typeof elementType === 'string') {
      displayName = elementType;
    } else if (typeof elementType === 'function') {
      displayName = getDisplayName(elementType);
    }
  }

  return {
    displayName: displayName,
    key: key
  };
}

function getElementType(internalInstance) {
  // != used deliberately here to catch undefined and null
  if (internalInstance._currentElement != null) {
    var elementType = internalInstance._currentElement.type;

    if (typeof elementType === 'function') {
      var publicInstance = internalInstance.getPublicInstance();

      if (publicInstance !== null) {
        return types_ElementTypeClass;
      } else {
        return types_ElementTypeFunction;
      }
    } else if (typeof elementType === 'string') {
      return ElementTypeHostComponent;
    }
  }

  return ElementTypeOtherOrUnknown;
}

function getChildren(internalInstance) {
  var children = []; // If the parent is a native node without rendered children, but with
  // multiple string children, then the `element` that gets passed in here is
  // a plain value -- a string or number.

  if (legacy_renderer_typeof(internalInstance) !== 'object') {// No children
  } else if (internalInstance._currentElement === null || internalInstance._currentElement === false) {// No children
  } else if (internalInstance._renderedComponent) {
    var child = internalInstance._renderedComponent;

    if (getElementType(child) !== ElementTypeOtherOrUnknown) {
      children.push(child);
    }
  } else if (internalInstance._renderedChildren) {
    var renderedChildren = internalInstance._renderedChildren;

    for (var name in renderedChildren) {
      var _child = renderedChildren[name];

      if (getElementType(_child) !== ElementTypeOtherOrUnknown) {
        children.push(_child);
      }
    }
  } // Note: we skip the case where children are just strings or numbers
  // because the new DevTools skips over host text nodes anyway.


  return children;
}

function renderer_attach(hook, rendererID, renderer, global) {
  var idToInternalInstanceMap = new Map();
  var internalInstanceToIDMap = new WeakMap();
  var internalInstanceToRootIDMap = new WeakMap();
  var getInternalIDForNative = null;
  var findNativeNodeForInternalID;

  var getFiberForNative = function getFiberForNative(node) {
    // Not implemented.
    return null;
  };

  if (renderer.ComponentTree) {
    getInternalIDForNative = function getInternalIDForNative(node, findNearestUnfilteredAncestor) {
      var internalInstance = renderer.ComponentTree.getClosestInstanceFromNode(node);
      return internalInstanceToIDMap.get(internalInstance) || null;
    };

    findNativeNodeForInternalID = function findNativeNodeForInternalID(id) {
      var internalInstance = idToInternalInstanceMap.get(id);
      return renderer.ComponentTree.getNodeFromInstance(internalInstance);
    };

    getFiberForNative = function getFiberForNative(node) {
      return renderer.ComponentTree.getClosestInstanceFromNode(node);
    };
  } else if (renderer.Mount.getID && renderer.Mount.getNode) {
    getInternalIDForNative = function getInternalIDForNative(node, findNearestUnfilteredAncestor) {
      // Not implemented.
      return null;
    };

    findNativeNodeForInternalID = function findNativeNodeForInternalID(id) {
      // Not implemented.
      return null;
    };
  }

  function getDisplayNameForFiberID(id) {
    var internalInstance = idToInternalInstanceMap.get(id);
    return internalInstance ? getData(internalInstance).displayName : null;
  }

  function getID(internalInstance) {
    if (legacy_renderer_typeof(internalInstance) !== 'object' || internalInstance === null) {
      throw new Error('Invalid internal instance: ' + internalInstance);
    }

    if (!internalInstanceToIDMap.has(internalInstance)) {
      var _id = getUID();

      internalInstanceToIDMap.set(internalInstance, _id);
      idToInternalInstanceMap.set(_id, internalInstance);
    }

    return internalInstanceToIDMap.get(internalInstance);
  }

  function areEqualArrays(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  } // This is shared mutable state that lets us keep track of where we are.


  var parentIDStack = [];
  var oldReconcilerMethods = null;

  if (renderer.Reconciler) {
    // React 15
    oldReconcilerMethods = decorateMany(renderer.Reconciler, {
      mountComponent: function mountComponent(fn, args) {
        var internalInstance = args[0];
        var hostContainerInfo = args[3];

        if (getElementType(internalInstance) === ElementTypeOtherOrUnknown) {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          return fn.apply(this, args);
        }

        if (hostContainerInfo._topLevelWrapper === undefined) {
          // SSR
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          return fn.apply(this, args);
        }

        var id = getID(internalInstance); // Push the operation.

        var parentID = parentIDStack.length > 0 ? parentIDStack[parentIDStack.length - 1] : 0;
        recordMount(internalInstance, id, parentID);
        parentIDStack.push(id); // Remember the root.

        internalInstanceToRootIDMap.set(internalInstance, getID(hostContainerInfo._topLevelWrapper));

        try {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          var result = fn.apply(this, args);
          parentIDStack.pop();
          return result;
        } catch (err) {
          parentIDStack = [];
          throw err;
        } finally {
          if (parentIDStack.length === 0) {
            var rootID = internalInstanceToRootIDMap.get(internalInstance);

            if (rootID === undefined) {
              throw new Error('Expected to find root ID.');
            }

            flushPendingEvents(rootID);
          }
        }
      },
      performUpdateIfNecessary: function performUpdateIfNecessary(fn, args) {
        var internalInstance = args[0];

        if (getElementType(internalInstance) === ElementTypeOtherOrUnknown) {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          return fn.apply(this, args);
        }

        var id = getID(internalInstance);
        parentIDStack.push(id);
        var prevChildren = getChildren(internalInstance);

        try {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          var result = fn.apply(this, args);
          var nextChildren = getChildren(internalInstance);

          if (!areEqualArrays(prevChildren, nextChildren)) {
            // Push the operation
            recordReorder(internalInstance, id, nextChildren);
          }

          parentIDStack.pop();
          return result;
        } catch (err) {
          parentIDStack = [];
          throw err;
        } finally {
          if (parentIDStack.length === 0) {
            var rootID = internalInstanceToRootIDMap.get(internalInstance);

            if (rootID === undefined) {
              throw new Error('Expected to find root ID.');
            }

            flushPendingEvents(rootID);
          }
        }
      },
      receiveComponent: function receiveComponent(fn, args) {
        var internalInstance = args[0];

        if (getElementType(internalInstance) === ElementTypeOtherOrUnknown) {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          return fn.apply(this, args);
        }

        var id = getID(internalInstance);
        parentIDStack.push(id);
        var prevChildren = getChildren(internalInstance);

        try {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          var result = fn.apply(this, args);
          var nextChildren = getChildren(internalInstance);

          if (!areEqualArrays(prevChildren, nextChildren)) {
            // Push the operation
            recordReorder(internalInstance, id, nextChildren);
          }

          parentIDStack.pop();
          return result;
        } catch (err) {
          parentIDStack = [];
          throw err;
        } finally {
          if (parentIDStack.length === 0) {
            var rootID = internalInstanceToRootIDMap.get(internalInstance);

            if (rootID === undefined) {
              throw new Error('Expected to find root ID.');
            }

            flushPendingEvents(rootID);
          }
        }
      },
      unmountComponent: function unmountComponent(fn, args) {
        var internalInstance = args[0];

        if (getElementType(internalInstance) === ElementTypeOtherOrUnknown) {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          return fn.apply(this, args);
        }

        var id = getID(internalInstance);
        parentIDStack.push(id);

        try {
          // $FlowFixMe[object-this-reference] found when upgrading Flow
          var result = fn.apply(this, args);
          parentIDStack.pop(); // Push the operation.

          recordUnmount(internalInstance, id);
          return result;
        } catch (err) {
          parentIDStack = [];
          throw err;
        } finally {
          if (parentIDStack.length === 0) {
            var rootID = internalInstanceToRootIDMap.get(internalInstance);

            if (rootID === undefined) {
              throw new Error('Expected to find root ID.');
            }

            flushPendingEvents(rootID);
          }
        }
      }
    });
  }

  function cleanup() {
    if (oldReconcilerMethods !== null) {
      if (renderer.Component) {
        restoreMany(renderer.Component.Mixin, oldReconcilerMethods);
      } else {
        restoreMany(renderer.Reconciler, oldReconcilerMethods);
      }
    }

    oldReconcilerMethods = null;
  }

  function recordMount(internalInstance, id, parentID) {
    var isRoot = parentID === 0;

    if (__DEBUG__) {
      console.log('%crecordMount()', 'color: green; font-weight: bold;', id, getData(internalInstance).displayName);
    }

    if (isRoot) {
      // TODO Is this right? For all versions?
      var hasOwnerMetadata = internalInstance._currentElement != null && internalInstance._currentElement._owner != null;
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(ElementTypeRoot);
      pushOperation(0); // StrictMode compliant?

      pushOperation(0); // Profiling flag

      pushOperation(0); // StrictMode supported?

      pushOperation(hasOwnerMetadata ? 1 : 0);
    } else {
      var type = getElementType(internalInstance);

      var _getData = getData(internalInstance),
          displayName = _getData.displayName,
          key = _getData.key;

      var ownerID = internalInstance._currentElement != null && internalInstance._currentElement._owner != null ? getID(internalInstance._currentElement._owner) : 0;
      var displayNameStringID = getStringID(displayName);
      var keyStringID = getStringID(key);
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(type);
      pushOperation(parentID);
      pushOperation(ownerID);
      pushOperation(displayNameStringID);
      pushOperation(keyStringID);
    }
  }

  function recordReorder(internalInstance, id, nextChildren) {
    pushOperation(TREE_OPERATION_REORDER_CHILDREN);
    pushOperation(id);
    var nextChildIDs = nextChildren.map(getID);
    pushOperation(nextChildIDs.length);

    for (var i = 0; i < nextChildIDs.length; i++) {
      pushOperation(nextChildIDs[i]);
    }
  }

  function recordUnmount(internalInstance, id) {
    pendingUnmountedIDs.push(id);
    idToInternalInstanceMap.delete(id);
  }

  function crawlAndRecordInitialMounts(id, parentID, rootID) {
    if (__DEBUG__) {
      console.group('crawlAndRecordInitialMounts() id:', id);
    }

    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      internalInstanceToRootIDMap.set(internalInstance, rootID);
      recordMount(internalInstance, id, parentID);
      getChildren(internalInstance).forEach(function (child) {
        return crawlAndRecordInitialMounts(getID(child), id, rootID);
      });
    }

    if (__DEBUG__) {
      console.groupEnd();
    }
  }

  function flushInitialOperations() {
    // Crawl roots though and register any nodes that mounted before we were injected.
    var roots = renderer.Mount._instancesByReactRootID || renderer.Mount._instancesByContainerID;

    for (var key in roots) {
      var internalInstance = roots[key];

      var _id2 = getID(internalInstance);

      crawlAndRecordInitialMounts(_id2, 0, _id2);
      flushPendingEvents(_id2);
    }
  }

  var pendingOperations = [];
  var pendingStringTable = new Map();
  var pendingUnmountedIDs = [];
  var pendingStringTableLength = 0;
  var pendingUnmountedRootID = null;

  function flushPendingEvents(rootID) {
    if (pendingOperations.length === 0 && pendingUnmountedIDs.length === 0 && pendingUnmountedRootID === null) {
      return;
    }

    var numUnmountIDs = pendingUnmountedIDs.length + (pendingUnmountedRootID === null ? 0 : 1);
    var operations = new Array( // Identify which renderer this update is coming from.
    2 + // [rendererID, rootFiberID]
    // How big is the string table?
    1 + // [stringTableLength]
    // Then goes the actual string table.
    pendingStringTableLength + ( // All unmounts are batched in a single message.
    // [TREE_OPERATION_REMOVE, removedIDLength, ...ids]
    numUnmountIDs > 0 ? 2 + numUnmountIDs : 0) + // Mount operations
    pendingOperations.length); // Identify which renderer this update is coming from.
    // This enables roots to be mapped to renderers,
    // Which in turn enables fiber properations, states, and hooks to be inspected.

    var i = 0;
    operations[i++] = rendererID;
    operations[i++] = rootID; // Now fill in the string table.
    // [stringTableLength, str1Length, ...str1, str2Length, ...str2, ...]

    operations[i++] = pendingStringTableLength;
    pendingStringTable.forEach(function (value, key) {
      operations[i++] = key.length;
      var encodedKey = utfEncodeString(key);

      for (var j = 0; j < encodedKey.length; j++) {
        operations[i + j] = encodedKey[j];
      }

      i += key.length;
    });

    if (numUnmountIDs > 0) {
      // All unmounts except roots are batched in a single message.
      operations[i++] = TREE_OPERATION_REMOVE; // The first number is how many unmounted IDs we're gonna send.

      operations[i++] = numUnmountIDs; // Fill in the unmounts

      for (var j = 0; j < pendingUnmountedIDs.length; j++) {
        operations[i++] = pendingUnmountedIDs[j];
      } // The root ID should always be unmounted last.


      if (pendingUnmountedRootID !== null) {
        operations[i] = pendingUnmountedRootID;
        i++;
      }
    } // Fill in the rest of the operations.


    for (var _j = 0; _j < pendingOperations.length; _j++) {
      operations[i + _j] = pendingOperations[_j];
    }

    i += pendingOperations.length;

    if (__DEBUG__) {
      printOperationsArray(operations);
    } // If we've already connected to the frontend, just pass the operations through.


    hook.emit('operations', operations);
    pendingOperations.length = 0;
    pendingUnmountedIDs = [];
    pendingUnmountedRootID = null;
    pendingStringTable.clear();
    pendingStringTableLength = 0;
  }

  function pushOperation(op) {
    if (false) {}

    pendingOperations.push(op);
  }

  function getStringID(str) {
    if (str === null) {
      return 0;
    }

    var existingID = pendingStringTable.get(str);

    if (existingID !== undefined) {
      return existingID;
    }

    var stringID = pendingStringTable.size + 1;
    pendingStringTable.set(str, stringID); // The string table total length needs to account
    // both for the string length, and for the array item
    // that contains the length itself. Hence + 1.

    pendingStringTableLength += str.length + 1;
    return stringID;
  }

  var currentlyInspectedElementID = null;
  var currentlyInspectedPaths = {}; // Track the intersection of currently inspected paths,
  // so that we can send their data along if the element is re-rendered.

  function mergeInspectedPaths(path) {
    var current = currentlyInspectedPaths;
    path.forEach(function (key) {
      if (!current[key]) {
        current[key] = {};
      }

      current = current[key];
    });
  }

  function createIsPathAllowed(key) {
    // This function helps prevent previously-inspected paths from being dehydrated in updates.
    // This is important to avoid a bad user experience where expanded toggles collapse on update.
    return function isPathAllowed(path) {
      var current = currentlyInspectedPaths[key];

      if (!current) {
        return false;
      }

      for (var i = 0; i < path.length; i++) {
        current = current[path[i]];

        if (!current) {
          return false;
        }
      }

      return true;
    };
  } // Fast path props lookup for React Native style editor.


  function getInstanceAndStyle(id) {
    var instance = null;
    var style = null;
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      instance = internalInstance._instance || null;
      var element = internalInstance._currentElement;

      if (element != null && element.props != null) {
        style = element.props.style || null;
      }
    }

    return {
      instance: instance,
      style: style
    };
  }

  function updateSelectedElement(id) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance == null) {
      console.warn("Could not find instance with id \"".concat(id, "\""));
      return;
    }

    switch (getElementType(internalInstance)) {
      case types_ElementTypeClass:
        global.$r = internalInstance._instance;
        break;

      case types_ElementTypeFunction:
        var element = internalInstance._currentElement;

        if (element == null) {
          console.warn("Could not find element with id \"".concat(id, "\""));
          return;
        }

        global.$r = {
          props: element.props,
          type: element.type
        };
        break;

      default:
        global.$r = null;
        break;
    }
  }

  function storeAsGlobal(id, path, count) {
    var inspectedElement = inspectElementRaw(id);

    if (inspectedElement !== null) {
      var value = utils_getInObject(inspectedElement, path);
      var key = "$reactTemp".concat(count);
      window[key] = value;
      console.log(key);
      console.log(value);
    }
  }

  function getSerializedElementValueByPath(id, path) {
    var inspectedElement = inspectElementRaw(id);

    if (inspectedElement !== null) {
      var valueToCopy = utils_getInObject(inspectedElement, path);
      return serializeToString(valueToCopy);
    }
  }

  function inspectElement(requestID, id, path, forceFullData) {
    if (forceFullData || currentlyInspectedElementID !== id) {
      currentlyInspectedElementID = id;
      currentlyInspectedPaths = {};
    }

    var inspectedElement = inspectElementRaw(id);

    if (inspectedElement === null) {
      return {
        id: id,
        responseID: requestID,
        type: 'not-found'
      };
    }

    if (path !== null) {
      mergeInspectedPaths(path);
    } // Any time an inspected element has an update,
    // we should update the selected $r value as wel.
    // Do this before dehydration (cleanForBridge).


    updateSelectedElement(id);
    inspectedElement.context = cleanForBridge(inspectedElement.context, createIsPathAllowed('context'));
    inspectedElement.props = cleanForBridge(inspectedElement.props, createIsPathAllowed('props'));
    inspectedElement.state = cleanForBridge(inspectedElement.state, createIsPathAllowed('state'));
    return {
      id: id,
      responseID: requestID,
      type: 'full-data',
      value: inspectedElement
    };
  }

  function inspectElementRaw(id) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance == null) {
      return null;
    }

    var _getData2 = getData(internalInstance),
        displayName = _getData2.displayName,
        key = _getData2.key;

    var type = getElementType(internalInstance);
    var context = null;
    var owners = null;
    var props = null;
    var state = null;
    var element = internalInstance._currentElement;

    if (element !== null) {
      props = element.props;
      var owner = element._owner;

      if (owner) {
        owners = [];

        while (owner != null) {
          owners.push({
            displayName: getData(owner).displayName || 'Unknown',
            id: getID(owner),
            key: element.key,
            type: getElementType(owner)
          });

          if (owner._currentElement) {
            owner = owner._currentElement._owner;
          }
        }
      }
    }

    var publicInstance = internalInstance._instance;

    if (publicInstance != null) {
      context = publicInstance.context || null;
      state = publicInstance.state || null;
    } // Not implemented


    var errors = [];
    var warnings = [];
    return {
      id: id,
      // Does the current renderer support editable hooks and function props?
      canEditHooks: false,
      canEditFunctionProps: false,
      // Does the current renderer support advanced editing interface?
      canEditHooksAndDeletePaths: false,
      canEditHooksAndRenamePaths: false,
      canEditFunctionPropsDeletePaths: false,
      canEditFunctionPropsRenamePaths: false,
      // Toggle error boundary did not exist in legacy versions
      canToggleError: false,
      isErrored: false,
      targetErrorBoundaryID: null,
      // Suspense did not exist in legacy versions
      canToggleSuspense: false,
      // Can view component source location.
      canViewSource: type === types_ElementTypeClass || type === types_ElementTypeFunction,
      source: null,
      // Only legacy context exists in legacy versions.
      hasLegacyContext: true,
      displayName: displayName,
      type: type,
      key: key != null ? key : null,
      // Inspectable properties.
      context: context,
      hooks: null,
      props: props,
      state: state,
      errors: errors,
      warnings: warnings,
      // List of owners
      owners: owners,
      rootType: null,
      rendererPackageName: null,
      rendererVersion: null,
      plugins: {
        stylex: null
      }
    };
  }

  function logElementToConsole(id) {
    var result = inspectElementRaw(id);

    if (result === null) {
      console.warn("Could not find element with id \"".concat(id, "\""));
      return;
    }

    var supportsGroup = typeof console.groupCollapsed === 'function';

    if (supportsGroup) {
      console.groupCollapsed("[Click to expand] %c<".concat(result.displayName || 'Component', " />"), // --dom-tag-name-color is the CSS variable Chrome styles HTML elements with in the console.
      'color: var(--dom-tag-name-color); font-weight: normal;');
    }

    if (result.props !== null) {
      console.log('Props:', result.props);
    }

    if (result.state !== null) {
      console.log('State:', result.state);
    }

    if (result.context !== null) {
      console.log('Context:', result.context);
    }

    var nativeNode = findNativeNodeForInternalID(id);

    if (nativeNode !== null) {
      console.log('Node:', nativeNode);
    }

    if (window.chrome || /firefox/i.test(navigator.userAgent)) {
      console.log('Right-click any value to save it as a global variable for further inspection.');
    }

    if (supportsGroup) {
      console.groupEnd();
    }
  }

  function prepareViewAttributeSource(id, path) {
    var inspectedElement = inspectElementRaw(id);

    if (inspectedElement !== null) {
      window.$attribute = utils_getInObject(inspectedElement, path);
    }
  }

  function prepareViewElementSource(id) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance == null) {
      console.warn("Could not find instance with id \"".concat(id, "\""));
      return;
    }

    var element = internalInstance._currentElement;

    if (element == null) {
      console.warn("Could not find element with id \"".concat(id, "\""));
      return;
    }

    global.$type = element.type;
  }

  function deletePath(type, id, hookID, path) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      var publicInstance = internalInstance._instance;

      if (publicInstance != null) {
        switch (type) {
          case 'context':
            deletePathInObject(publicInstance.context, path);
            forceUpdate(publicInstance);
            break;

          case 'hooks':
            throw new Error('Hooks not supported by this renderer');

          case 'props':
            var element = internalInstance._currentElement;
            internalInstance._currentElement = legacy_renderer_objectSpread(legacy_renderer_objectSpread({}, element), {}, {
              props: copyWithDelete(element.props, path)
            });
            forceUpdate(publicInstance);
            break;

          case 'state':
            deletePathInObject(publicInstance.state, path);
            forceUpdate(publicInstance);
            break;
        }
      }
    }
  }

  function renamePath(type, id, hookID, oldPath, newPath) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      var publicInstance = internalInstance._instance;

      if (publicInstance != null) {
        switch (type) {
          case 'context':
            renamePathInObject(publicInstance.context, oldPath, newPath);
            forceUpdate(publicInstance);
            break;

          case 'hooks':
            throw new Error('Hooks not supported by this renderer');

          case 'props':
            var element = internalInstance._currentElement;
            internalInstance._currentElement = legacy_renderer_objectSpread(legacy_renderer_objectSpread({}, element), {}, {
              props: copyWithRename(element.props, oldPath, newPath)
            });
            forceUpdate(publicInstance);
            break;

          case 'state':
            renamePathInObject(publicInstance.state, oldPath, newPath);
            forceUpdate(publicInstance);
            break;
        }
      }
    }
  }

  function overrideValueAtPath(type, id, hookID, path, value) {
    var internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      var publicInstance = internalInstance._instance;

      if (publicInstance != null) {
        switch (type) {
          case 'context':
            utils_setInObject(publicInstance.context, path, value);
            forceUpdate(publicInstance);
            break;

          case 'hooks':
            throw new Error('Hooks not supported by this renderer');

          case 'props':
            var element = internalInstance._currentElement;
            internalInstance._currentElement = legacy_renderer_objectSpread(legacy_renderer_objectSpread({}, element), {}, {
              props: copyWithSet(element.props, path, value)
            });
            forceUpdate(publicInstance);
            break;

          case 'state':
            utils_setInObject(publicInstance.state, path, value);
            forceUpdate(publicInstance);
            break;
        }
      }
    }
  } // v16+ only features


  var getProfilingData = function getProfilingData() {
    throw new Error('getProfilingData not supported by this renderer');
  };

  var handleCommitFiberRoot = function handleCommitFiberRoot() {
    throw new Error('handleCommitFiberRoot not supported by this renderer');
  };

  var handleCommitFiberUnmount = function handleCommitFiberUnmount() {
    throw new Error('handleCommitFiberUnmount not supported by this renderer');
  };

  var handlePostCommitFiberRoot = function handlePostCommitFiberRoot() {
    throw new Error('handlePostCommitFiberRoot not supported by this renderer');
  };

  var overrideError = function overrideError() {
    throw new Error('overrideError not supported by this renderer');
  };

  var overrideSuspense = function overrideSuspense() {
    throw new Error('overrideSuspense not supported by this renderer');
  };

  var startProfiling = function startProfiling() {// Do not throw, since this would break a multi-root scenario where v15 and v16 were both present.
  };

  var stopProfiling = function stopProfiling() {// Do not throw, since this would break a multi-root scenario where v15 and v16 were both present.
  };

  function getBestMatchForTrackedPath() {
    // Not implemented.
    return null;
  }

  function getPathForElement(id) {
    // Not implemented.
    return null;
  }

  function updateComponentFilters(componentFilters) {// Not implemented.
  }

  function setTraceUpdatesEnabled(enabled) {// Not implemented.
  }

  function setTrackedPath(path) {// Not implemented.
  }

  function getOwnersList(id) {
    // Not implemented.
    return null;
  }

  function clearErrorsAndWarnings() {// Not implemented
  }

  function clearErrorsForFiberID(id) {// Not implemented
  }

  function clearWarningsForFiberID(id) {// Not implemented
  }

  function patchConsoleForStrictMode() {}

  function unpatchConsoleForStrictMode() {}

  function hasFiberWithId(id) {
    return idToInternalInstanceMap.has(id);
  }

  return {
    clearErrorsAndWarnings: clearErrorsAndWarnings,
    clearErrorsForFiberID: clearErrorsForFiberID,
    clearWarningsForFiberID: clearWarningsForFiberID,
    cleanup: cleanup,
    getSerializedElementValueByPath: getSerializedElementValueByPath,
    deletePath: deletePath,
    flushInitialOperations: flushInitialOperations,
    getBestMatchForTrackedPath: getBestMatchForTrackedPath,
    getDisplayNameForFiberID: getDisplayNameForFiberID,
    getFiberForNative: getFiberForNative,
    getFiberIDForNative: getInternalIDForNative,
    getInstanceAndStyle: getInstanceAndStyle,
    findNativeNodesForFiberID: function findNativeNodesForFiberID(id) {
      var nativeNode = findNativeNodeForInternalID(id);
      return nativeNode == null ? null : [nativeNode];
    },
    getOwnersList: getOwnersList,
    getPathForElement: getPathForElement,
    getProfilingData: getProfilingData,
    handleCommitFiberRoot: handleCommitFiberRoot,
    handleCommitFiberUnmount: handleCommitFiberUnmount,
    handlePostCommitFiberRoot: handlePostCommitFiberRoot,
    hasFiberWithId: hasFiberWithId,
    inspectElement: inspectElement,
    logElementToConsole: logElementToConsole,
    overrideError: overrideError,
    overrideSuspense: overrideSuspense,
    overrideValueAtPath: overrideValueAtPath,
    renamePath: renamePath,
    patchConsoleForStrictMode: patchConsoleForStrictMode,
    prepareViewAttributeSource: prepareViewAttributeSource,
    prepareViewElementSource: prepareViewElementSource,
    renderer: renderer,
    setTraceUpdatesEnabled: setTraceUpdatesEnabled,
    setTrackedPath: setTrackedPath,
    startProfiling: startProfiling,
    stopProfiling: stopProfiling,
    storeAsGlobal: storeAsGlobal,
    unpatchConsoleForStrictMode: unpatchConsoleForStrictMode,
    updateComponentFilters: updateComponentFilters
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/index.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */





// this is the backend that is compatible with all older React versions
function isMatchingRender(version) {
  return !hasAssignedBackend(version);
}

function initBackend(hook, agent, global) {
  if (hook == null) {
    // DevTools didn't get injected into this page (maybe b'c of the contentType).
    return function () {};
  }

  var subs = [hook.sub('renderer-attached', function (_ref) {
    var id = _ref.id,
        renderer = _ref.renderer,
        rendererInterface = _ref.rendererInterface;
    agent.setRendererInterface(id, rendererInterface); // Now that the Store and the renderer interface are connected,
    // it's time to flush the pending operation codes to the frontend.

    rendererInterface.flushInitialOperations();
  }), hook.sub('unsupported-renderer-version', function (id) {
    agent.onUnsupportedRenderer(id);
  }), hook.sub('fastRefreshScheduled', agent.onFastRefreshScheduled), hook.sub('operations', agent.onHookOperations), hook.sub('traceUpdates', agent.onTraceUpdates) // TODO Add additional subscriptions required for profiling mode
  ];

  var attachRenderer = function attachRenderer(id, renderer) {
    // only attach if the renderer is compatible with the current version of the backend
    if (!isMatchingRender(renderer.reconcilerVersion || renderer.version)) {
      return;
    }

    var rendererInterface = hook.rendererInterfaces.get(id); // Inject any not-yet-injected renderers (if we didn't reload-and-profile)

    if (rendererInterface == null) {
      if (typeof renderer.findFiberByHostInstance === 'function') {
        // react-reconciler v16+
        rendererInterface = attach(hook, id, renderer, global);
      } else if (renderer.ComponentTree) {
        // react-dom v15
        rendererInterface = renderer_attach(hook, id, renderer, global);
      } else {// Older react-dom or other unsupported renderer version
      }

      if (rendererInterface != null) {
        hook.rendererInterfaces.set(id, rendererInterface);
      }
    } // Notify the DevTools frontend about new renderers.
    // This includes any that were attached early (via __REACT_DEVTOOLS_ATTACH__).


    if (rendererInterface != null) {
      hook.emit('renderer-attached', {
        id: id,
        renderer: renderer,
        rendererInterface: rendererInterface
      });
    } else {
      hook.emit('unsupported-renderer-version', id);
    }
  }; // Connect renderers that have already injected themselves.


  hook.renderers.forEach(function (renderer, id) {
    attachRenderer(id, renderer);
  }); // Connect any new renderers that injected themselves.

  subs.push(hook.sub('renderer', function (_ref2) {
    var id = _ref2.id,
        renderer = _ref2.renderer;
    attachRenderer(id, renderer);
  }));
  hook.emit('react-devtools', agent);
  hook.reactDevtoolsAgent = agent;

  var onAgentShutdown = function onAgentShutdown() {
    subs.forEach(function (fn) {
      return fn();
    });
    hook.rendererInterfaces.forEach(function (rendererInterface) {
      rendererInterface.cleanup();
    });
    hook.reactDevtoolsAgent = null;
  };

  agent.addListener('shutdown', onAgentShutdown);
  subs.push(function () {
    agent.removeListener('shutdown', onAgentShutdown);
  });
  return function () {
    subs.forEach(function (fn) {
      return fn();
    });
  };
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/NativeStyleEditor/resolveBoxStyle.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * This mirrors react-native/Libraries/Inspector/resolveBoxStyle.js (but without RTL support).
 *
 * Resolve a style property into it's component parts, e.g.
 *
 * resolveBoxStyle('margin', {margin: 5, marginBottom: 10})
 * -> {top: 5, left: 5, right: 5, bottom: 10}
 */
function resolveBoxStyle(prefix, style) {
  var hasParts = false;
  var result = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };
  var styleForAll = style[prefix];

  if (styleForAll != null) {
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (var _i = 0, _Object$keys = Object.keys(result); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      result[key] = styleForAll;
    }

    hasParts = true;
  }

  var styleForHorizontal = style[prefix + 'Horizontal'];

  if (styleForHorizontal != null) {
    result.left = styleForHorizontal;
    result.right = styleForHorizontal;
    hasParts = true;
  } else {
    var styleForLeft = style[prefix + 'Left'];

    if (styleForLeft != null) {
      result.left = styleForLeft;
      hasParts = true;
    }

    var styleForRight = style[prefix + 'Right'];

    if (styleForRight != null) {
      result.right = styleForRight;
      hasParts = true;
    }

    var styleForEnd = style[prefix + 'End'];

    if (styleForEnd != null) {
      // TODO RTL support
      result.right = styleForEnd;
      hasParts = true;
    }

    var styleForStart = style[prefix + 'Start'];

    if (styleForStart != null) {
      // TODO RTL support
      result.left = styleForStart;
      hasParts = true;
    }
  }

  var styleForVertical = style[prefix + 'Vertical'];

  if (styleForVertical != null) {
    result.bottom = styleForVertical;
    result.top = styleForVertical;
    hasParts = true;
  } else {
    var styleForBottom = style[prefix + 'Bottom'];

    if (styleForBottom != null) {
      result.bottom = styleForBottom;
      hasParts = true;
    }

    var styleForTop = style[prefix + 'Top'];

    if (styleForTop != null) {
      result.top = styleForTop;
      hasParts = true;
    }
  }

  return hasParts ? result : null;
}
;// CONCATENATED MODULE: ../react-devtools-shared/src/backend/NativeStyleEditor/setupNativeStyleEditor.js
function setupNativeStyleEditor_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { setupNativeStyleEditor_typeof = function _typeof(obj) { return typeof obj; }; } else { setupNativeStyleEditor_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return setupNativeStyleEditor_typeof(obj); }

function setupNativeStyleEditor_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



function setupNativeStyleEditor(bridge, agent, resolveNativeStyle, validAttributes) {
  bridge.addListener('NativeStyleEditor_measure', function (_ref) {
    var id = _ref.id,
        rendererID = _ref.rendererID;
    measureStyle(agent, bridge, resolveNativeStyle, id, rendererID);
  });
  bridge.addListener('NativeStyleEditor_renameAttribute', function (_ref2) {
    var id = _ref2.id,
        rendererID = _ref2.rendererID,
        oldName = _ref2.oldName,
        newName = _ref2.newName,
        value = _ref2.value;
    renameStyle(agent, id, rendererID, oldName, newName, value);
    setTimeout(function () {
      return measureStyle(agent, bridge, resolveNativeStyle, id, rendererID);
    });
  });
  bridge.addListener('NativeStyleEditor_setValue', function (_ref3) {
    var id = _ref3.id,
        rendererID = _ref3.rendererID,
        name = _ref3.name,
        value = _ref3.value;
    setStyle(agent, id, rendererID, name, value);
    setTimeout(function () {
      return measureStyle(agent, bridge, resolveNativeStyle, id, rendererID);
    });
  });
  bridge.send('isNativeStyleEditorSupported', {
    isSupported: true,
    validAttributes: validAttributes
  });
}
var EMPTY_BOX_STYLE = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var componentIDToStyleOverrides = new Map();

function measureStyle(agent, bridge, resolveNativeStyle, id, rendererID) {
  var data = agent.getInstanceAndStyle({
    id: id,
    rendererID: rendererID
  });

  if (!data || !data.style) {
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id: id,
      layout: null,
      style: null
    });
    return;
  }

  var instance = data.instance,
      style = data.style;
  var resolvedStyle = resolveNativeStyle(style); // If it's a host component we edited before, amend styles.

  var styleOverrides = componentIDToStyleOverrides.get(id);

  if (styleOverrides != null) {
    resolvedStyle = Object.assign({}, resolvedStyle, styleOverrides);
  }

  if (!instance || typeof instance.measure !== 'function') {
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id: id,
      layout: null,
      style: resolvedStyle || null
    });
    return;
  }

  instance.measure(function (x, y, width, height, left, top) {
    // RN Android sometimes returns undefined here. Don't send measurements in this case.
    // https://github.com/jhen0409/react-native-debugger/issues/84#issuecomment-304611817
    if (typeof x !== 'number') {
      bridge.send('NativeStyleEditor_styleAndLayout', {
        id: id,
        layout: null,
        style: resolvedStyle || null
      });
      return;
    }

    var margin = resolvedStyle != null && resolveBoxStyle('margin', resolvedStyle) || EMPTY_BOX_STYLE;
    var padding = resolvedStyle != null && resolveBoxStyle('padding', resolvedStyle) || EMPTY_BOX_STYLE;
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id: id,
      layout: {
        x: x,
        y: y,
        width: width,
        height: height,
        left: left,
        top: top,
        margin: margin,
        padding: padding
      },
      style: resolvedStyle || null
    });
  });
}

function shallowClone(object) {
  var cloned = {};

  for (var n in object) {
    cloned[n] = object[n];
  }

  return cloned;
}

function renameStyle(agent, id, rendererID, oldName, newName, value) {
  var _ref4;

  var data = agent.getInstanceAndStyle({
    id: id,
    rendererID: rendererID
  });

  if (!data || !data.style) {
    return;
  }

  var instance = data.instance,
      style = data.style;
  var newStyle = newName ? (_ref4 = {}, setupNativeStyleEditor_defineProperty(_ref4, oldName, undefined), setupNativeStyleEditor_defineProperty(_ref4, newName, value), _ref4) : setupNativeStyleEditor_defineProperty({}, oldName, undefined);
  var customStyle; // TODO It would be nice if the renderer interface abstracted this away somehow.

  if (instance !== null && typeof instance.setNativeProps === 'function') {
    // In the case of a host component, we need to use setNativeProps().
    // Remember to "correct" resolved styles when we read them next time.
    var styleOverrides = componentIDToStyleOverrides.get(id);

    if (!styleOverrides) {
      componentIDToStyleOverrides.set(id, newStyle);
    } else {
      Object.assign(styleOverrides, newStyle);
    } // TODO Fabric does not support setNativeProps; chat with Sebastian or Eli


    instance.setNativeProps({
      style: newStyle
    });
  } else if (src_isArray(style)) {
    var lastIndex = style.length - 1;

    if (setupNativeStyleEditor_typeof(style[lastIndex]) === 'object' && !src_isArray(style[lastIndex])) {
      customStyle = shallowClone(style[lastIndex]);
      delete customStyle[oldName];

      if (newName) {
        customStyle[newName] = value;
      } else {
        customStyle[oldName] = undefined;
      }

      agent.overrideValueAtPath({
        type: 'props',
        id: id,
        rendererID: rendererID,
        path: ['style', lastIndex],
        value: customStyle
      });
    } else {
      agent.overrideValueAtPath({
        type: 'props',
        id: id,
        rendererID: rendererID,
        path: ['style'],
        value: style.concat([newStyle])
      });
    }
  } else if (setupNativeStyleEditor_typeof(style) === 'object') {
    customStyle = shallowClone(style);
    delete customStyle[oldName];

    if (newName) {
      customStyle[newName] = value;
    } else {
      customStyle[oldName] = undefined;
    }

    agent.overrideValueAtPath({
      type: 'props',
      id: id,
      rendererID: rendererID,
      path: ['style'],
      value: customStyle
    });
  } else {
    agent.overrideValueAtPath({
      type: 'props',
      id: id,
      rendererID: rendererID,
      path: ['style'],
      value: [style, newStyle]
    });
  }

  agent.emit('hideNativeHighlight');
}

function setStyle(agent, id, rendererID, name, value) {
  var data = agent.getInstanceAndStyle({
    id: id,
    rendererID: rendererID
  });

  if (!data || !data.style) {
    return;
  }

  var instance = data.instance,
      style = data.style;

  var newStyle = setupNativeStyleEditor_defineProperty({}, name, value); // TODO It would be nice if the renderer interface abstracted this away somehow.


  if (instance !== null && typeof instance.setNativeProps === 'function') {
    // In the case of a host component, we need to use setNativeProps().
    // Remember to "correct" resolved styles when we read them next time.
    var styleOverrides = componentIDToStyleOverrides.get(id);

    if (!styleOverrides) {
      componentIDToStyleOverrides.set(id, newStyle);
    } else {
      Object.assign(styleOverrides, newStyle);
    } // TODO Fabric does not support setNativeProps; chat with Sebastian or Eli


    instance.setNativeProps({
      style: newStyle
    });
  } else if (src_isArray(style)) {
    var lastLength = style.length - 1;

    if (setupNativeStyleEditor_typeof(style[lastLength]) === 'object' && !src_isArray(style[lastLength])) {
      agent.overrideValueAtPath({
        type: 'props',
        id: id,
        rendererID: rendererID,
        path: ['style', lastLength, name],
        value: value
      });
    } else {
      agent.overrideValueAtPath({
        type: 'props',
        id: id,
        rendererID: rendererID,
        path: ['style'],
        value: style.concat([newStyle])
      });
    }
  } else {
    agent.overrideValueAtPath({
      type: 'props',
      id: id,
      rendererID: rendererID,
      path: ['style'],
      value: [style, newStyle]
    });
  }

  agent.emit('hideNativeHighlight');
}
;// CONCATENATED MODULE: ./src/cachedSettings.js
/**
 * Copyright (c) Meta Platforms, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

 // Note: all keys should be optional in this type, because users can use newer
// versions of React DevTools with older versions of React Native, and the object
// provided by React Native may not include all of this type's fields.

function initializeUsingCachedSettings(devToolsSettingsManager) {
  initializeConsolePatchSettings(devToolsSettingsManager);
}

function initializeConsolePatchSettings(devToolsSettingsManager) {
  if (devToolsSettingsManager.getConsolePatchSettings == null) {
    return;
  }

  var consolePatchSettingsString = devToolsSettingsManager.getConsolePatchSettings();

  if (consolePatchSettingsString == null) {
    return;
  }

  var parsedConsolePatchSettings = parseConsolePatchSettings(consolePatchSettingsString);

  if (parsedConsolePatchSettings == null) {
    return;
  }

  writeConsolePatchSettingsToWindow(parsedConsolePatchSettings);
}

function parseConsolePatchSettings(consolePatchSettingsString) {
  var _castBool, _castBool2, _castBool3, _castBool4, _castBrowserTheme;

  var parsedValue = JSON.parse(consolePatchSettingsString !== null && consolePatchSettingsString !== void 0 ? consolePatchSettingsString : '{}');
  var appendComponentStack = parsedValue.appendComponentStack,
      breakOnConsoleErrors = parsedValue.breakOnConsoleErrors,
      showInlineWarningsAndErrors = parsedValue.showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode = parsedValue.hideConsoleLogsInStrictMode,
      browserTheme = parsedValue.browserTheme;
  return {
    appendComponentStack: (_castBool = castBool(appendComponentStack)) !== null && _castBool !== void 0 ? _castBool : true,
    breakOnConsoleErrors: (_castBool2 = castBool(breakOnConsoleErrors)) !== null && _castBool2 !== void 0 ? _castBool2 : false,
    showInlineWarningsAndErrors: (_castBool3 = castBool(showInlineWarningsAndErrors)) !== null && _castBool3 !== void 0 ? _castBool3 : true,
    hideConsoleLogsInStrictMode: (_castBool4 = castBool(hideConsoleLogsInStrictMode)) !== null && _castBool4 !== void 0 ? _castBool4 : false,
    browserTheme: (_castBrowserTheme = castBrowserTheme(browserTheme)) !== null && _castBrowserTheme !== void 0 ? _castBrowserTheme : 'dark'
  };
}

function cacheConsolePatchSettings(devToolsSettingsManager, value) {
  if (devToolsSettingsManager.setConsolePatchSettings == null) {
    return;
  }

  devToolsSettingsManager.setConsolePatchSettings(JSON.stringify(value));
}
;// CONCATENATED MODULE: ./src/backend.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */









// Install a global variable to allow patching console early (during injection).
// This provides React Native developers with components stacks even if they don't run DevTools.
installConsoleFunctionsToWindow();
installHook(window);
var hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
var savedComponentFilters = getDefaultComponentFilters();

function backend_debug(methodName) {
  if (__DEBUG__) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["%c[core/backend] %c".concat(methodName), 'color: teal; font-weight: bold;', 'font-weight: bold;'].concat(args));
  }
}

function connectToDevTools(options) {
  if (hook == null) {
    // DevTools didn't get injected into this page (maybe b'c of the contentType).
    return;
  }

  var _ref = options || {},
      _ref$host = _ref.host,
      host = _ref$host === void 0 ? 'localhost' : _ref$host,
      nativeStyleEditorValidAttributes = _ref.nativeStyleEditorValidAttributes,
      _ref$useHttps = _ref.useHttps,
      useHttps = _ref$useHttps === void 0 ? false : _ref$useHttps,
      _ref$port = _ref.port,
      port = _ref$port === void 0 ? 8097 : _ref$port,
      websocket = _ref.websocket,
      _ref$resolveRNStyle = _ref.resolveRNStyle,
      resolveRNStyle = _ref$resolveRNStyle === void 0 ? null : _ref$resolveRNStyle,
      _ref$retryConnectionD = _ref.retryConnectionDelay,
      retryConnectionDelay = _ref$retryConnectionD === void 0 ? 2000 : _ref$retryConnectionD,
      _ref$isAppActive = _ref.isAppActive,
      isAppActive = _ref$isAppActive === void 0 ? function () {
    return true;
  } : _ref$isAppActive,
      devToolsSettingsManager = _ref.devToolsSettingsManager;

  var protocol = useHttps ? 'wss' : 'ws';
  var retryTimeoutID = null;

  function scheduleRetry() {
    if (retryTimeoutID === null) {
      // Two seconds because RN had issues with quick retries.
      retryTimeoutID = setTimeout(function () {
        return connectToDevTools(options);
      }, retryConnectionDelay);
    }
  }

  if (devToolsSettingsManager != null) {
    try {
      initializeUsingCachedSettings(devToolsSettingsManager);
    } catch (e) {
      // If we call a method on devToolsSettingsManager that throws, or if
      // is invalid data read out, don't throw and don't interrupt initialization
      console.error(e);
    }
  }

  if (!isAppActive()) {
    // If the app is in background, maybe retry later.
    // Don't actually attempt to connect until we're in foreground.
    scheduleRetry();
    return;
  }

  var bridge = null;
  var messageListeners = [];
  var uri = protocol + '://' + host + ':' + port; // If existing websocket is passed, use it.
  // This is necessary to support our custom integrations.
  // See D6251744.

  var ws = websocket ? websocket : new window.WebSocket(uri);
  ws.onclose = handleClose;
  ws.onerror = handleFailed;
  ws.onmessage = handleMessage;

  ws.onopen = function () {
    bridge = new src_bridge({
      listen: function listen(fn) {
        messageListeners.push(fn);
        return function () {
          var index = messageListeners.indexOf(fn);

          if (index >= 0) {
            messageListeners.splice(index, 1);
          }
        };
      },
      send: function send(event, payload, transferable) {
        if (ws.readyState === ws.OPEN) {
          if (__DEBUG__) {
            backend_debug('wall.send()', event, payload);
          }

          ws.send(JSON.stringify({
            event: event,
            payload: payload
          }));
        } else {
          if (__DEBUG__) {
            backend_debug('wall.send()', 'Shutting down bridge because of closed WebSocket connection');
          }

          if (bridge !== null) {
            bridge.shutdown();
          }

          scheduleRetry();
        }
      }
    });
    bridge.addListener('updateComponentFilters', function (componentFilters) {
      // Save filter changes in memory, in case DevTools is reloaded.
      // In that case, the renderer will already be using the updated values.
      // We'll lose these in between backend reloads but that can't be helped.
      savedComponentFilters = componentFilters;
    });

    if (devToolsSettingsManager != null && bridge != null) {
      bridge.addListener('updateConsolePatchSettings', function (consolePatchSettings) {
        return cacheConsolePatchSettings(devToolsSettingsManager, consolePatchSettings);
      });
    } // The renderer interface doesn't read saved component filters directly,
    // because they are generally stored in localStorage within the context of the extension.
    // Because of this it relies on the extension to pass filters.
    // In the case of the standalone DevTools being used with a website,
    // saved filters are injected along with the backend script tag so we shouldn't override them here.
    // This injection strategy doesn't work for React Native though.
    // Ideally the backend would save the filters itself, but RN doesn't provide a sync storage solution.
    // So for now we just fall back to using the default filters...


    if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ == null) {
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      bridge.send('overrideComponentFilters', savedComponentFilters);
    } // TODO (npm-packages) Warn if "isBackendStorageAPISupported"
    // $FlowFixMe[incompatible-call] found when upgrading Flow


    var agent = new Agent(bridge);
    agent.addListener('shutdown', function () {
      // If we received 'shutdown' from `agent`, we assume the `bridge` is already shutting down,
      // and that caused the 'shutdown' event on the `agent`, so we don't need to call `bridge.shutdown()` here.
      hook.emit('shutdown');
    });
    initBackend(hook, agent, window); // Setup React Native style editor if the environment supports it.

    if (resolveRNStyle != null || hook.resolveRNStyle != null) {
      setupNativeStyleEditor( // $FlowFixMe[incompatible-call] found when upgrading Flow
      bridge, agent, resolveRNStyle || hook.resolveRNStyle, nativeStyleEditorValidAttributes || hook.nativeStyleEditorValidAttributes || null);
    } else {
      // Otherwise listen to detect if the environment later supports it.
      // For example, Flipper does not eagerly inject these values.
      // Instead it relies on the React Native Inspector to lazily inject them.
      var lazyResolveRNStyle;
      var lazyNativeStyleEditorValidAttributes;

      var initAfterTick = function initAfterTick() {
        if (bridge !== null) {
          setupNativeStyleEditor(bridge, agent, lazyResolveRNStyle, lazyNativeStyleEditorValidAttributes);
        }
      };

      if (!hook.hasOwnProperty('resolveRNStyle')) {
        Object.defineProperty(hook, 'resolveRNStyle', {
          enumerable: false,
          get: function get() {
            return lazyResolveRNStyle;
          },
          set: function set(value) {
            lazyResolveRNStyle = value;
            initAfterTick();
          }
        });
      }

      if (!hook.hasOwnProperty('nativeStyleEditorValidAttributes')) {
        Object.defineProperty(hook, 'nativeStyleEditorValidAttributes', {
          enumerable: false,
          get: function get() {
            return lazyNativeStyleEditorValidAttributes;
          },
          set: function set(value) {
            lazyNativeStyleEditorValidAttributes = value;
            initAfterTick();
          }
        });
      }
    }
  };

  function handleClose() {
    if (__DEBUG__) {
      backend_debug('WebSocket.onclose');
    }

    if (bridge !== null) {
      bridge.emit('shutdown');
    }

    scheduleRetry();
  }

  function handleFailed() {
    if (__DEBUG__) {
      backend_debug('WebSocket.onerror');
    }

    scheduleRetry();
  }

  function handleMessage(event) {
    var data;

    try {
      if (typeof event.data === 'string') {
        data = JSON.parse(event.data);

        if (__DEBUG__) {
          backend_debug('WebSocket.onmessage', data);
        }
      } else {
        throw Error();
      }
    } catch (e) {
      console.error('[React DevTools] Failed to parse JSON: ' + event.data);
      return;
    }

    messageListeners.forEach(function (fn) {
      try {
        fn(data);
      } catch (error) {
        // jsc doesn't play so well with tracebacks that go into eval'd code,
        // so the stack trace here will stop at the `eval()` call. Getting the
        // message that caused the error is the best we can do for now.
        console.log('[React DevTools] Error calling listener', data);
        console.log('error:', error);
        throw error;
      }
    });
  }
}
function connectWithCustomMessagingProtocol(_ref2) {
  var onSubscribe = _ref2.onSubscribe,
      onUnsubscribe = _ref2.onUnsubscribe,
      onMessage = _ref2.onMessage,
      settingsManager = _ref2.settingsManager,
      nativeStyleEditorValidAttributes = _ref2.nativeStyleEditorValidAttributes,
      resolveRNStyle = _ref2.resolveRNStyle;

  if (hook == null) {
    // DevTools didn't get injected into this page (maybe b'c of the contentType).
    return;
  }

  if (settingsManager != null) {
    try {
      initializeUsingCachedSettings(settingsManager);
    } catch (e) {
      // If we call a method on devToolsSettingsManager that throws, or if
      // is invalid data read out, don't throw and don't interrupt initialization
      console.error(e);
    }
  }

  var wall = {
    listen: function listen(fn) {
      onSubscribe(fn);
      return function () {
        onUnsubscribe(fn);
      };
    },
    send: function send(event, payload) {
      onMessage(event, payload);
    }
  };
  var bridge = new src_bridge(wall);
  bridge.addListener('updateComponentFilters', function (componentFilters) {
    // Save filter changes in memory, in case DevTools is reloaded.
    // In that case, the renderer will already be using the updated values.
    // We'll lose these in between backend reloads but that can't be helped.
    savedComponentFilters = componentFilters;
  });

  if (settingsManager != null) {
    bridge.addListener('updateConsolePatchSettings', function (consolePatchSettings) {
      return cacheConsolePatchSettings(settingsManager, consolePatchSettings);
    });
  }

  if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ == null) {
    bridge.send('overrideComponentFilters', savedComponentFilters);
  }

  var agent = new Agent(bridge);
  agent.addListener('shutdown', function () {
    // If we received 'shutdown' from `agent`, we assume the `bridge` is already shutting down,
    // and that caused the 'shutdown' event on the `agent`, so we don't need to call `bridge.shutdown()` here.
    hook.emit('shutdown');
  });
  var unsubscribeBackend = initBackend(hook, agent, window);
  var nativeStyleResolver = resolveRNStyle || hook.resolveRNStyle;

  if (nativeStyleResolver != null) {
    var validAttributes = nativeStyleEditorValidAttributes || hook.nativeStyleEditorValidAttributes || null;
    setupNativeStyleEditor(bridge, agent, nativeStyleResolver, validAttributes);
  }

  return unsubscribeBackend;
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=backend.js.map