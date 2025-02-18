(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'prop-types', 'react'], factory) :
  (factory((global.EventStack = {}),global.PropTypes,global.React));
}(this, (function (exports,PropTypes,React) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var exenv = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2015 Jed Watson.
    Based on code that is Copyright 2013-2015, Facebook, Inc.
    All rights reserved.
  */
  /* global define */

  (function () {

  	var canUseDOM = !!(
  		typeof window !== 'undefined' &&
  		window.document &&
  		window.document.createElement
  	);

  	var ExecutionEnvironment = {

  		canUseDOM: canUseDOM,

  		canUseWorkers: typeof Worker !== 'undefined',

  		canUseEventListeners:
  			canUseDOM && !!(window.addEventListener || window.attachEvent),

  		canUseViewport: canUseDOM && !!window.screen

  	};

  	if (module.exports) {
  		module.exports = ExecutionEnvironment;
  	} else {
  		window.ExecutionEnvironment = ExecutionEnvironment;
  	}

  }());
  });
  var exenv_1 = exenv.canUseDOM;

  /**
   * The current implementation was chosen by performance and compatibility reasons, feel free to play
   * with benchmarks and submit PR with faster alternative. Each method contains links to benchmarks.
   */
  var EventSet =
  /*#__PURE__*/
  function () {
    /**
     * @see https://jsperf.com/suir-eventset-constructor
     */
    function EventSet(eventHandlers) {
      _classCallCheck(this, EventSet);

      _defineProperty(this, "handlers", void 0);

      this.handlers = eventHandlers.slice(0);
    }
    /**
     * @see https://jsperf.com/suir-eventset-addhandlers
     */


    _createClass(EventSet, [{
      key: "addHandlers",
      value: function addHandlers(additionalHandlers) {
        var newHandlers = this.handlers.slice(0);
        var length = additionalHandlers.length; // Heads up!
        // Previously we use Set there, it granted uniqueness of handlers, now dispatchEvent() is
        // responsible for this.

        for (var i = 0; i < length; i += 1) {
          newHandlers.push(additionalHandlers[i]);
        }

        return new EventSet(newHandlers);
      }
      /**
       * @see https://jsperf.com/suir-eventset-dispatchsingle
       * @see https://jsperf.com/suir-eventset-dispatchmultiple2
       */

    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event, dispatchAll) {
        var count = this.handlers.length - 1;

        if (!dispatchAll) {
          // Heads up!
          // We don't use .pop() there because it will mutate the array.
          var recentHandler = this.handlers[count];
          recentHandler(event);
          return;
        }

        for (var i = count; i >= 0; i -= 1) {
          if (!this.handlers[i].called) {
            this.handlers[i].called = true;
            this.handlers[i](event);
          }
        }

        for (var _i = count; _i >= 0; _i -= 1) {
          this.handlers[_i].called = false;
        }
      }
    }, {
      key: "hasHandlers",
      value: function hasHandlers() {
        return this.handlers.length > 0;
      }
      /**
       * @see https://jsperf.com/suir-eventset-removehandlers
       */

    }, {
      key: "removeHandlers",
      value: function removeHandlers(removalHandlers) {
        var newHandlers = [];
        var length = this.handlers.length;

        for (var i = 0; i < length; i += 1) {
          var handler = this.handlers[i];

          if (removalHandlers.indexOf(handler) === -1) {
            newHandlers.push(handler);
          }
        }

        return new EventSet(newHandlers);
      }
    }]);

    return EventSet;
  }();

  /**
   * An IE11-compatible function.
   *
   * @see https://jsperf.com/suir-clone-map
   */
  function cloneMap(map) {
    var newMap = new Map();
    map.forEach(function (value, key) {
      newMap.set(key, value);
    });
    return newMap;
  }
  function normalizeHandlers(handlers) {
    return Array.isArray(handlers) ? handlers : [handlers];
  }
  /**
   * Asserts that the passed value is React.RefObject
   *
   * @see https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
   */

  var isRefObject = function isRefObject(ref // eslint-disable-next-line
  ) {
    return ref !== null && _typeof(ref) === 'object' && ref.hasOwnProperty('current');
  };
  /**
   * Normalizes `target` for EventStack, because `target` can be passed as `boolean` or `string`.
   *
   * @see https://jsperf.com/suir-normalize-target
   */

  function normalizeTarget(target) {
    if (target === 'document') return document;
    if (target === 'window') return window;
    if (isRefObject(target)) return target.current || document;
    return target || document;
  }

  var EventPool =
  /*#__PURE__*/
  function () {
    function EventPool(poolName, handlerSets) {
      _classCallCheck(this, EventPool);

      _defineProperty(this, "handlerSets", void 0);

      _defineProperty(this, "poolName", void 0);

      this.handlerSets = handlerSets;
      this.poolName = poolName;
    }

    _createClass(EventPool, [{
      key: "addHandlers",
      value: function addHandlers(eventType, eventHandlers) {
        var handlerSets = cloneMap(this.handlerSets);

        if (handlerSets.has(eventType)) {
          var eventSet = handlerSets.get(eventType);
          handlerSets.set(eventType, eventSet.addHandlers(eventHandlers));
        } else {
          handlerSets.set(eventType, new EventSet(eventHandlers));
        }

        return new EventPool(this.poolName, handlerSets);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(eventType, event) {
        var handlerSet = this.handlerSets.get(eventType);
        var shouldDispatchAll = this.poolName === 'default';

        if (handlerSet) {
          handlerSet.dispatchEvent(event, shouldDispatchAll);
        }
      }
    }, {
      key: "hasHandlers",
      value: function hasHandlers() {
        return this.handlerSets.size > 0;
      }
    }, {
      key: "removeHandlers",
      value: function removeHandlers(eventType, eventHandlers) {
        var handlerSets = cloneMap(this.handlerSets);

        if (!handlerSets.has(eventType)) {
          return new EventPool(this.poolName, handlerSets);
        }

        var currentSet = handlerSets.get(eventType);
        var nextSet = currentSet.removeHandlers(eventHandlers);

        if (nextSet.hasHandlers()) {
          handlerSets.set(eventType, nextSet);
        } else {
          handlerSets.delete(eventType);
        }

        return new EventPool(this.poolName, handlerSets);
      }
    }]);

    return EventPool;
  }();

  _defineProperty(EventPool, "createByType", function (poolName, eventType, eventHandlers) {
    var handlerSets = new Map();
    handlerSets.set(eventType, new EventSet(eventHandlers));
    return new EventPool(poolName, handlerSets);
  });

  var EventTarget =
  /*#__PURE__*/
  function () {
    function EventTarget(target) {
      var _this = this;

      _classCallCheck(this, EventTarget);

      _defineProperty(this, "handlers", new Map());

      _defineProperty(this, "pools", new Map());

      _defineProperty(this, "target", void 0);

      _defineProperty(this, "createEmitter", function (eventType) {
        return function (event) {
          _this.pools.forEach(function (pool) {
            pool.dispatchEvent(eventType, event);
          });
        };
      });

      this.target = target;
    }

    _createClass(EventTarget, [{
      key: "addHandlers",
      value: function addHandlers(poolName, eventType, eventHandlers) {
        if (this.pools.has(poolName)) {
          var eventPool = this.pools.get(poolName);
          this.pools.set(poolName, eventPool.addHandlers(eventType, eventHandlers));
        } else {
          this.pools.set(poolName, EventPool.createByType(poolName, eventType, eventHandlers));
        }

        if (!this.handlers.has(eventType)) {
          this.addTargetHandler(eventType);
        }
      }
    }, {
      key: "hasHandlers",
      value: function hasHandlers() {
        return this.handlers.size > 0;
      }
    }, {
      key: "removeHandlers",
      value: function removeHandlers(poolName, eventType, eventHandlers) {
        if (!this.pools.has(poolName)) {
          return;
        }

        var pool = this.pools.get(poolName);
        var newPool = pool.removeHandlers(eventType, eventHandlers);

        if (newPool.hasHandlers()) {
          this.pools.set(poolName, newPool);
        } else {
          this.pools.delete(poolName);
        }

        if (this.pools.size === 0) {
          this.removeTargetHandler(eventType);
        }
      }
    }, {
      key: "addTargetHandler",
      value: function addTargetHandler(eventType) {
        var handler = this.createEmitter(eventType);
        this.handlers.set(eventType, handler);
        this.target.addEventListener(eventType, handler, true);
      }
    }, {
      key: "removeTargetHandler",
      value: function removeTargetHandler(eventType) {
        if (this.handlers.has(eventType)) {
          this.target.removeEventListener(eventType, this.handlers.get(eventType), true);
          this.handlers.delete(eventType);
        }
      }
    }]);

    return EventTarget;
  }();

  var EventStack =
  /*#__PURE__*/
  function () {
    function EventStack() {
      var _this = this;

      _classCallCheck(this, EventStack);

      _defineProperty(this, "targets", new Map());

      _defineProperty(this, "getTarget", function (target) {
        var autoCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var normalized = normalizeTarget(target);

        if (_this.targets.has(normalized)) {
          return _this.targets.get(normalized);
        }

        if (!autoCreate) return null;
        var eventTarget = new EventTarget(normalized);

        _this.targets.set(normalized, eventTarget);

        return eventTarget;
      });

      _defineProperty(this, "removeTarget", function (target) {
        _this.targets.delete(normalizeTarget(target));
      });
    }

    _createClass(EventStack, [{
      key: "sub",
      value: function sub(eventName, eventHandlers) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (!exenv_1) return;
        var _options$target = options.target,
            target = _options$target === void 0 ? document : _options$target,
            _options$pool = options.pool,
            pool = _options$pool === void 0 ? 'default' : _options$pool;
        var eventTarget = this.getTarget(target);
        eventTarget.addHandlers(pool, eventName, normalizeHandlers(eventHandlers));
      }
    }, {
      key: "unsub",
      value: function unsub(eventName, eventHandlers) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (!exenv_1) return;
        var _options$target2 = options.target,
            target = _options$target2 === void 0 ? document : _options$target2,
            _options$pool2 = options.pool,
            pool = _options$pool2 === void 0 ? 'default' : _options$pool2;
        var eventTarget = this.getTarget(target, false);

        if (eventTarget) {
          eventTarget.removeHandlers(pool, eventName, normalizeHandlers(eventHandlers));
          if (!eventTarget.hasHandlers()) this.removeTarget(target);
        }
      }
    }]);

    return EventStack;
  }();

  var instance = new EventStack();

  /**
   * This component exposes the EventStack API as public and provides a declarative way to manage it.
   */
  var EventStack$1 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(EventStack, _React$PureComponent);

    function EventStack() {
      _classCallCheck(this, EventStack);

      return _possibleConstructorReturn(this, _getPrototypeOf(EventStack).apply(this, arguments));
    }

    _createClass(EventStack, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.subscribe(this.props);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.unsubscribe(prevProps);
        this.subscribe(this.props);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unsubscribe(this.props);
      }
    }, {
      key: "subscribe",
      value: function subscribe(props) {
        var name = props.name,
            on = props.on,
            pool = props.pool,
            target = props.target;
        instance.sub(name, on, {
          pool: pool,
          target: target
        });
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(props) {
        var name = props.name,
            on = props.on,
            pool = props.pool,
            target = props.target;
        instance.unsub(name, on, {
          pool: pool,
          target: target
        });
      }
    }, {
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return EventStack;
  }(React.PureComponent);

  _defineProperty(EventStack$1, "defaultProps", {
    pool: 'default',
    target: 'document'
  });
  EventStack$1.propTypes = {
    /** An event name on which we will subscribe. */
    name: PropTypes.string.isRequired,

    /** An event handler or array of event handlers. */
    on: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]).isRequired,

    /** A name of pool. */
    pool: PropTypes.string,

    /** A DOM element on which we will subscribe. */
    target: PropTypes.oneOfType([PropTypes.oneOf(['document', 'window']), // Heads up!
    // This condition for SSR safety.
    PropTypes.instanceOf(exenv_1 ? HTMLElement : Object), PropTypes.shape({
      current: PropTypes.object
    })])
  };

  exports.instance = instance;
  exports.default = EventStack$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
