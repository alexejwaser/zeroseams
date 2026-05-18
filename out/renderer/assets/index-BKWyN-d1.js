//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp$1(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp$1(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/react/cjs/react.production.min.js
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
	function A(a) {
		if (null === a || "object" !== typeof a) return null;
		a = z && a[z] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var B = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, C = Object.assign, D = {};
	function E(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	E.prototype.isReactComponent = {};
	E.prototype.setState = function(a, b) {
		if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, a, b, "setState");
	};
	E.prototype.forceUpdate = function(a) {
		this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};
	function F() {}
	F.prototype = E.prototype;
	function G(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	var H = G.prototype = new F();
	H.constructor = G;
	C(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function M(a, b, e) {
		var d, c = {}, k = null, h = null;
		if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
		var g = arguments.length - 2;
		if (1 === g) c.children = e;
		else if (1 < g) {
			for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
			c.children = f;
		}
		if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
		return {
			$$typeof: l,
			type: a,
			key: k,
			ref: h,
			props: c,
			_owner: K.current
		};
	}
	function N(a, b) {
		return {
			$$typeof: l,
			type: a.type,
			key: b,
			ref: a.ref,
			props: a.props,
			_owner: a._owner
		};
	}
	function O(a) {
		return "object" === typeof a && null !== a && a.$$typeof === l;
	}
	function escape(a) {
		var b = {
			"=": "=0",
			":": "=2"
		};
		return "$" + a.replace(/[=:]/g, function(a) {
			return b[a];
		});
	}
	var P = /\/+/g;
	function Q(a, b) {
		return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
	}
	function R(a, b, e, d, c) {
		var k = typeof a;
		if ("undefined" === k || "boolean" === k) a = null;
		var h = !1;
		if (null === a) h = !0;
		else switch (k) {
			case "string":
			case "number":
				h = !0;
				break;
			case "object": switch (a.$$typeof) {
				case l:
				case n: h = !0;
			}
		}
		if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
			return a;
		})) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
		h = 0;
		d = "" === d ? "." : d + ":";
		if (I(a)) for (var g = 0; g < a.length; g++) {
			k = a[g];
			var f = d + Q(k, g);
			h += R(k, b, e, f, c);
		}
		else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
		else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
		return h;
	}
	function S(a, b, e) {
		if (null == a) return a;
		var d = [], c = 0;
		R(a, d, "", "", function(a) {
			return b.call(e, a, c++);
		});
		return d;
	}
	function T(a) {
		if (-1 === a._status) {
			var b = a._result;
			b = b();
			b.then(function(b) {
				if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
			}, function(b) {
				if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
			});
			-1 === a._status && (a._status = 0, a._result = b);
		}
		if (1 === a._status) return a._result.default;
		throw a._result;
	}
	var U = { current: null }, V = { transition: null }, W = {
		ReactCurrentDispatcher: U,
		ReactCurrentBatchConfig: V,
		ReactCurrentOwner: K
	};
	function X() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	exports.Children = {
		map: S,
		forEach: function(a, b, e) {
			S(a, function() {
				b.apply(this, arguments);
			}, e);
		},
		count: function(a) {
			var b = 0;
			S(a, function() {
				b++;
			});
			return b;
		},
		toArray: function(a) {
			return S(a, function(a) {
				return a;
			}) || [];
		},
		only: function(a) {
			if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
			return a;
		}
	};
	exports.Component = E;
	exports.Fragment = p;
	exports.Profiler = r;
	exports.PureComponent = G;
	exports.StrictMode = q;
	exports.Suspense = w;
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
	exports.act = X;
	exports.cloneElement = function(a, b, e) {
		if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
		var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
		if (null != b) {
			void 0 !== b.ref && (k = b.ref, h = K.current);
			void 0 !== b.key && (c = "" + b.key);
			if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
			for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
		}
		var f = arguments.length - 2;
		if (1 === f) d.children = e;
		else if (1 < f) {
			g = Array(f);
			for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
			d.children = g;
		}
		return {
			$$typeof: l,
			type: a.type,
			key: c,
			ref: k,
			props: d,
			_owner: h
		};
	};
	exports.createContext = function(a) {
		a = {
			$$typeof: u,
			_currentValue: a,
			_currentValue2: a,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		};
		a.Provider = {
			$$typeof: t,
			_context: a
		};
		return a.Consumer = a;
	};
	exports.createElement = M;
	exports.createFactory = function(a) {
		var b = M.bind(null, a);
		b.type = a;
		return b;
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(a) {
		return {
			$$typeof: v,
			render: a
		};
	};
	exports.isValidElement = O;
	exports.lazy = function(a) {
		return {
			$$typeof: y,
			_payload: {
				_status: -1,
				_result: a
			},
			_init: T
		};
	};
	exports.memo = function(a, b) {
		return {
			$$typeof: x,
			type: a,
			compare: void 0 === b ? null : b
		};
	};
	exports.startTransition = function(a) {
		var b = V.transition;
		V.transition = {};
		try {
			a();
		} finally {
			V.transition = b;
		}
	};
	exports.unstable_act = X;
	exports.useCallback = function(a, b) {
		return U.current.useCallback(a, b);
	};
	exports.useContext = function(a) {
		return U.current.useContext(a);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(a) {
		return U.current.useDeferredValue(a);
	};
	exports.useEffect = function(a, b) {
		return U.current.useEffect(a, b);
	};
	exports.useId = function() {
		return U.current.useId();
	};
	exports.useImperativeHandle = function(a, b, e) {
		return U.current.useImperativeHandle(a, b, e);
	};
	exports.useInsertionEffect = function(a, b) {
		return U.current.useInsertionEffect(a, b);
	};
	exports.useLayoutEffect = function(a, b) {
		return U.current.useLayoutEffect(a, b);
	};
	exports.useMemo = function(a, b) {
		return U.current.useMemo(a, b);
	};
	exports.useReducer = function(a, b, e) {
		return U.current.useReducer(a, b, e);
	};
	exports.useRef = function(a) {
		return U.current.useRef(a);
	};
	exports.useState = function(a) {
		return U.current.useState(a);
	};
	exports.useSyncExternalStore = function(a, b, e) {
		return U.current.useSyncExternalStore(a, b, e);
	};
	exports.useTransition = function() {
		return U.current.useTransition();
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production_min();
}));
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.min.js
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	function f(a, b) {
		var c = a.length;
		a.push(b);
		a: for (; 0 < c;) {
			var d = c - 1 >>> 1, e = a[d];
			if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
			else break a;
		}
	}
	function h(a) {
		return 0 === a.length ? null : a[0];
	}
	function k(a) {
		if (0 === a.length) return null;
		var b = a[0], c = a.pop();
		if (c !== b) {
			a[0] = c;
			a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
				var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
				if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
				else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
				else break a;
			}
		}
		return b;
	}
	function g(a, b) {
		var c = a.sortIndex - b.sortIndex;
		return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var l = performance;
		exports.unstable_now = function() {
			return l.now();
		};
	} else {
		var p = Date, q = p.now();
		exports.unstable_now = function() {
			return p.now() - q;
		};
	}
	var r = [], t = [], u = 1, v = null, y = 3, z = !1, A = !1, B = !1, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G(a) {
		for (var b = h(t); null !== b;) {
			if (null === b.callback) k(t);
			else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
			else break;
			b = h(t);
		}
	}
	function H(a) {
		B = !1;
		G(a);
		if (!A) if (null !== h(r)) A = !0, I(J);
		else {
			var b = h(t);
			null !== b && K(H, b.startTime - a);
		}
	}
	function J(a, b) {
		A = !1;
		B && (B = !1, E(L), L = -1);
		z = !0;
		var c = y;
		try {
			G(b);
			for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {
				var d = v.callback;
				if ("function" === typeof d) {
					v.callback = null;
					y = v.priorityLevel;
					var e = d(v.expirationTime <= b);
					b = exports.unstable_now();
					"function" === typeof e ? v.callback = e : v === h(r) && k(r);
					G(b);
				} else k(r);
				v = h(r);
			}
			if (null !== v) var w = !0;
			else {
				var m = h(t);
				null !== m && K(H, m.startTime - b);
				w = !1;
			}
			return w;
		} finally {
			v = null, y = c, z = !1;
		}
	}
	var N = !1, O = null, L = -1, P = 5, Q = -1;
	function M() {
		return exports.unstable_now() - Q < P ? !1 : !0;
	}
	function R() {
		if (null !== O) {
			var a = exports.unstable_now();
			Q = a;
			var b = !0;
			try {
				b = O(!0, a);
			} finally {
				b ? S() : (N = !1, O = null);
			}
		} else N = !1;
	}
	var S;
	if ("function" === typeof F) S = function() {
		F(R);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var T = new MessageChannel(), U = T.port2;
		T.port1.onmessage = R;
		S = function() {
			U.postMessage(null);
		};
	} else S = function() {
		D(R, 0);
	};
	function I(a) {
		O = a;
		N || (N = !0, S());
	}
	function K(a, b) {
		L = D(function() {
			a(exports.unstable_now());
		}, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(a) {
		a.callback = null;
	};
	exports.unstable_continueExecution = function() {
		A || z || (A = !0, I(J));
	};
	exports.unstable_forceFrameRate = function(a) {
		0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return y;
	};
	exports.unstable_getFirstCallbackNode = function() {
		return h(r);
	};
	exports.unstable_next = function(a) {
		switch (y) {
			case 1:
			case 2:
			case 3:
				var b = 3;
				break;
			default: b = y;
		}
		var c = y;
		y = b;
		try {
			return a();
		} finally {
			y = c;
		}
	};
	exports.unstable_pauseExecution = function() {};
	exports.unstable_requestPaint = function() {};
	exports.unstable_runWithPriority = function(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: a = 3;
		}
		var c = y;
		y = a;
		try {
			return b();
		} finally {
			y = c;
		}
	};
	exports.unstable_scheduleCallback = function(a, b, c) {
		var d = exports.unstable_now();
		"object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
		switch (a) {
			case 1:
				var e = -1;
				break;
			case 2:
				e = 250;
				break;
			case 5:
				e = 1073741823;
				break;
			case 4:
				e = 1e4;
				break;
			default: e = 5e3;
		}
		e = c + e;
		a = {
			id: u++,
			callback: b,
			priorityLevel: a,
			startTime: c,
			expirationTime: e,
			sortIndex: -1
		};
		c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
		return a;
	};
	exports.unstable_shouldYield = M;
	exports.unstable_wrapCallback = function(a) {
		var b = y;
		return function() {
			var c = y;
			y = b;
			try {
				return a.apply(this, arguments);
			} finally {
				y = c;
			}
		};
	};
}));
//#endregion
//#region node_modules/scheduler/index.js
var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production_min();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.min.js
/**
* @license React
* react-dom.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var aa = require_react(), ca = require_scheduler();
	function p(a) {
		for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
		return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var da = /* @__PURE__ */ new Set(), ea = {};
	function fa(a, b) {
		ha(a, b);
		ha(a + "Capture", b);
	}
	function ha(a, b) {
		ea[a] = b;
		for (a = 0; a < b.length; a++) da.add(b[a]);
	}
	var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
	function oa(a) {
		if (ja.call(ma, a)) return !0;
		if (ja.call(la, a)) return !1;
		if (ka.test(a)) return ma[a] = !0;
		la[a] = !0;
		return !1;
	}
	function pa(a, b, c, d) {
		if (null !== c && 0 === c.type) return !1;
		switch (typeof b) {
			case "function":
			case "symbol": return !0;
			case "boolean":
				if (d) return !1;
				if (null !== c) return !c.acceptsBooleans;
				a = a.toLowerCase().slice(0, 5);
				return "data-" !== a && "aria-" !== a;
			default: return !1;
		}
	}
	function qa(a, b, c, d) {
		if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;
		if (d) return !1;
		if (null !== c) switch (c.type) {
			case 3: return !b;
			case 4: return !1 === b;
			case 5: return isNaN(b);
			case 6: return isNaN(b) || 1 > b;
		}
		return !1;
	}
	function v(a, b, c, d, e, f, g) {
		this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
		this.attributeName = d;
		this.attributeNamespace = e;
		this.mustUseProperty = c;
		this.propertyName = a;
		this.type = b;
		this.sanitizeURL = f;
		this.removeEmptyString = g;
	}
	var z = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
		z[a] = new v(a, 0, !1, a, null, !1, !1);
	});
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(a) {
		var b = a[0];
		z[b] = new v(b, 1, !1, a[1], null, !1, !1);
	});
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(a) {
		z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(a) {
		z[a] = new v(a, 2, !1, a, null, !1, !1);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
		z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(a) {
		z[a] = new v(a, 3, !0, a, null, !1, !1);
	});
	["capture", "download"].forEach(function(a) {
		z[a] = new v(a, 4, !1, a, null, !1, !1);
	});
	[
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(a) {
		z[a] = new v(a, 6, !1, a, null, !1, !1);
	});
	["rowSpan", "start"].forEach(function(a) {
		z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
	});
	var ra = /[\-:]([a-z])/g;
	function sa(a) {
		return a[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, null, !1, !1);
	});
	"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
	});
	[
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
	});
	["tabIndex", "crossOrigin"].forEach(function(a) {
		z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
	});
	z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
	[
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(a) {
		z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
	});
	function ta(a, b, c, d) {
		var e = z.hasOwnProperty(b) ? z[b] : null;
		if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
	}
	var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
	var Ia = Symbol.for("react.offscreen");
	var Ja = Symbol.iterator;
	function Ka(a) {
		if (null === a || "object" !== typeof a) return null;
		a = Ja && a[Ja] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var A = Object.assign, La;
	function Ma(a) {
		if (void 0 === La) try {
			throw Error();
		} catch (c) {
			var b = c.stack.trim().match(/\n( *(at )?)/);
			La = b && b[1] || "";
		}
		return "\n" + La + a;
	}
	var Na = !1;
	function Oa(a, b) {
		if (!a || Na) return "";
		Na = !0;
		var c = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (b) if (b = function() {
				throw Error();
			}, Object.defineProperty(b.prototype, "props", { set: function() {
				throw Error();
			} }), "object" === typeof Reflect && Reflect.construct) {
				try {
					Reflect.construct(b, []);
				} catch (l) {
					var d = l;
				}
				Reflect.construct(a, [], b);
			} else {
				try {
					b.call();
				} catch (l) {
					d = l;
				}
				a.call(b.prototype);
			}
			else {
				try {
					throw Error();
				} catch (l) {
					d = l;
				}
				a();
			}
		} catch (l) {
			if (l && d && "string" === typeof l.stack) {
				for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
				for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
					if (1 !== g || 1 !== h) do
						if (g--, h--, 0 > h || e[g] !== f[h]) {
							var k = "\n" + e[g].replace(" at new ", " at ");
							a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
							return k;
						}
					while (1 <= g && 0 <= h);
					break;
				}
			}
		} finally {
			Na = !1, Error.prepareStackTrace = c;
		}
		return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
	}
	function Pa(a) {
		switch (a.tag) {
			case 5: return Ma(a.type);
			case 16: return Ma("Lazy");
			case 13: return Ma("Suspense");
			case 19: return Ma("SuspenseList");
			case 0:
			case 2:
			case 15: return a = Oa(a.type, !1), a;
			case 11: return a = Oa(a.type.render, !1), a;
			case 1: return a = Oa(a.type, !0), a;
			default: return "";
		}
	}
	function Qa(a) {
		if (null == a) return null;
		if ("function" === typeof a) return a.displayName || a.name || null;
		if ("string" === typeof a) return a;
		switch (a) {
			case ya: return "Fragment";
			case wa: return "Portal";
			case Aa: return "Profiler";
			case za: return "StrictMode";
			case Ea: return "Suspense";
			case Fa: return "SuspenseList";
		}
		if ("object" === typeof a) switch (a.$$typeof) {
			case Ca: return (a.displayName || "Context") + ".Consumer";
			case Ba: return (a._context.displayName || "Context") + ".Provider";
			case Da:
				var b = a.render;
				a = a.displayName;
				a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				return a;
			case Ga: return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
			case Ha:
				b = a._payload;
				a = a._init;
				try {
					return Qa(a(b));
				} catch (c) {}
		}
		return null;
	}
	function Ra(a) {
		var b = a.type;
		switch (a.tag) {
			case 24: return "Cache";
			case 9: return (b.displayName || "Context") + ".Consumer";
			case 10: return (b._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
			case 7: return "Fragment";
			case 5: return b;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return Qa(b);
			case 8: return b === za ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if ("function" === typeof b) return b.displayName || b.name || null;
				if ("string" === typeof b) return b;
		}
		return null;
	}
	function Sa(a) {
		switch (typeof a) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return a;
			case "object": return a;
			default: return "";
		}
	}
	function Ta(a) {
		var b = a.type;
		return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
	}
	function Ua(a) {
		var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
		if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
			var e = c.get, f = c.set;
			Object.defineProperty(a, b, {
				configurable: !0,
				get: function() {
					return e.call(this);
				},
				set: function(a) {
					d = "" + a;
					f.call(this, a);
				}
			});
			Object.defineProperty(a, b, { enumerable: c.enumerable });
			return {
				getValue: function() {
					return d;
				},
				setValue: function(a) {
					d = "" + a;
				},
				stopTracking: function() {
					a._valueTracker = null;
					delete a[b];
				}
			};
		}
	}
	function Va(a) {
		a._valueTracker || (a._valueTracker = Ua(a));
	}
	function Wa(a) {
		if (!a) return !1;
		var b = a._valueTracker;
		if (!b) return !0;
		var c = b.getValue();
		var d = "";
		a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
		a = d;
		return a !== c ? (b.setValue(a), !0) : !1;
	}
	function Xa(a) {
		a = a || ("undefined" !== typeof document ? document : void 0);
		if ("undefined" === typeof a) return null;
		try {
			return a.activeElement || a.body;
		} catch (b) {
			return a.body;
		}
	}
	function Ya(a, b) {
		var c = b.checked;
		return A({}, b, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: null != c ? c : a._wrapperState.initialChecked
		});
	}
	function Za(a, b) {
		var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
		c = Sa(null != b.value ? b.value : c);
		a._wrapperState = {
			initialChecked: d,
			initialValue: c,
			controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
		};
	}
	function ab(a, b) {
		b = b.checked;
		null != b && ta(a, "checked", b, !1);
	}
	function bb(a, b) {
		ab(a, b);
		var c = Sa(b.value), d = b.type;
		if (null != c) if ("number" === d) {
			if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
		} else a.value !== "" + c && (a.value = "" + c);
		else if ("submit" === d || "reset" === d) {
			a.removeAttribute("value");
			return;
		}
		b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
		null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
	}
	function db(a, b, c) {
		if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
			var d = b.type;
			if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
			b = "" + a._wrapperState.initialValue;
			c || b === a.value || (a.value = b);
			a.defaultValue = b;
		}
		c = a.name;
		"" !== c && (a.name = "");
		a.defaultChecked = !!a._wrapperState.initialChecked;
		"" !== c && (a.name = c);
	}
	function cb(a, b, c) {
		if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
	}
	var eb = Array.isArray;
	function fb(a, b, c, d) {
		a = a.options;
		if (b) {
			b = {};
			for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;
			for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
		} else {
			c = "" + Sa(c);
			b = null;
			for (e = 0; e < a.length; e++) {
				if (a[e].value === c) {
					a[e].selected = !0;
					d && (a[e].defaultSelected = !0);
					return;
				}
				null !== b || a[e].disabled || (b = a[e]);
			}
			null !== b && (b.selected = !0);
		}
	}
	function gb(a, b) {
		if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
		return A({}, b, {
			value: void 0,
			defaultValue: void 0,
			children: "" + a._wrapperState.initialValue
		});
	}
	function hb(a, b) {
		var c = b.value;
		if (null == c) {
			c = b.children;
			b = b.defaultValue;
			if (null != c) {
				if (null != b) throw Error(p(92));
				if (eb(c)) {
					if (1 < c.length) throw Error(p(93));
					c = c[0];
				}
				b = c;
			}
			b ??= "";
			c = b;
		}
		a._wrapperState = { initialValue: Sa(c) };
	}
	function ib(a, b) {
		var c = Sa(b.value), d = Sa(b.defaultValue);
		null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
		null != d && (a.defaultValue = "" + d);
	}
	function jb(a) {
		var b = a.textContent;
		b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
	}
	function kb(a) {
		switch (a) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function lb(a, b) {
		return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
	}
	var mb, nb = function(a) {
		return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
			MSApp.execUnsafeLocalFunction(function() {
				return a(b, c, d, e);
			});
		} : a;
	}(function(a, b) {
		if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
		else {
			mb = mb || document.createElement("div");
			mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
			for (b = mb.firstChild; a.firstChild;) a.removeChild(a.firstChild);
			for (; b.firstChild;) a.appendChild(b.firstChild);
		}
	});
	function ob(a, b) {
		if (b) {
			var c = a.firstChild;
			if (c && c === a.lastChild && 3 === c.nodeType) {
				c.nodeValue = b;
				return;
			}
		}
		a.textContent = b;
	}
	var pb = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	}, qb = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(pb).forEach(function(a) {
		qb.forEach(function(b) {
			b = b + a.charAt(0).toUpperCase() + a.substring(1);
			pb[b] = pb[a];
		});
	});
	function rb(a, b, c) {
		return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
	}
	function sb(a, b) {
		a = a.style;
		for (var c in b) if (b.hasOwnProperty(c)) {
			var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
			"float" === c && (c = "cssFloat");
			d ? a.setProperty(c, e) : a[c] = e;
		}
	}
	var tb = A({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function ub(a, b) {
		if (b) {
			if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
			if (null != b.dangerouslySetInnerHTML) {
				if (null != b.children) throw Error(p(60));
				if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
			}
			if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
		}
	}
	function vb(a, b) {
		if (-1 === a.indexOf("-")) return "string" === typeof b.is;
		switch (a) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var wb = null;
	function xb(a) {
		a = a.target || a.srcElement || window;
		a.correspondingUseElement && (a = a.correspondingUseElement);
		return 3 === a.nodeType ? a.parentNode : a;
	}
	var yb = null, zb = null, Ab = null;
	function Bb(a) {
		if (a = Cb(a)) {
			if ("function" !== typeof yb) throw Error(p(280));
			var b = a.stateNode;
			b && (b = Db(b), yb(a.stateNode, a.type, b));
		}
	}
	function Eb(a) {
		zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
	}
	function Fb() {
		if (zb) {
			var a = zb, b = Ab;
			Ab = zb = null;
			Bb(a);
			if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
		}
	}
	function Gb(a, b) {
		return a(b);
	}
	function Hb() {}
	var Ib = !1;
	function Jb(a, b, c) {
		if (Ib) return a(b, c);
		Ib = !0;
		try {
			return Gb(a, b, c);
		} finally {
			if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
		}
	}
	function Kb(a, b) {
		var c = a.stateNode;
		if (null === c) return null;
		var d = Db(c);
		if (null === d) return null;
		c = d[b];
		a: switch (b) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
				a = !d;
				break a;
			default: a = !1;
		}
		if (a) return null;
		if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
		return c;
	}
	var Lb = !1;
	if (ia) try {
		var Mb = {};
		Object.defineProperty(Mb, "passive", { get: function() {
			Lb = !0;
		} });
		window.addEventListener("test", Mb, Mb);
		window.removeEventListener("test", Mb, Mb);
	} catch (a) {
		Lb = !1;
	}
	function Nb(a, b, c, d, e, f, g, h, k) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			b.apply(c, l);
		} catch (m) {
			this.onError(m);
		}
	}
	var Ob = !1, Pb = null, Qb = !1, Rb = null, Sb = { onError: function(a) {
		Ob = !0;
		Pb = a;
	} };
	function Tb(a, b, c, d, e, f, g, h, k) {
		Ob = !1;
		Pb = null;
		Nb.apply(Sb, arguments);
	}
	function Ub(a, b, c, d, e, f, g, h, k) {
		Tb.apply(this, arguments);
		if (Ob) {
			if (Ob) {
				var l = Pb;
				Ob = !1;
				Pb = null;
			} else throw Error(p(198));
			Qb || (Qb = !0, Rb = l);
		}
	}
	function Vb(a) {
		var b = a, c = a;
		if (a.alternate) for (; b.return;) b = b.return;
		else {
			a = b;
			do
				b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
			while (a);
		}
		return 3 === b.tag ? c : null;
	}
	function Wb(a) {
		if (13 === a.tag) {
			var b = a.memoizedState;
			null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
			if (null !== b) return b.dehydrated;
		}
		return null;
	}
	function Xb(a) {
		if (Vb(a) !== a) throw Error(p(188));
	}
	function Yb(a) {
		var b = a.alternate;
		if (!b) {
			b = Vb(a);
			if (null === b) throw Error(p(188));
			return b !== a ? null : a;
		}
		for (var c = a, d = b;;) {
			var e = c.return;
			if (null === e) break;
			var f = e.alternate;
			if (null === f) {
				d = e.return;
				if (null !== d) {
					c = d;
					continue;
				}
				break;
			}
			if (e.child === f.child) {
				for (f = e.child; f;) {
					if (f === c) return Xb(e), a;
					if (f === d) return Xb(e), b;
					f = f.sibling;
				}
				throw Error(p(188));
			}
			if (c.return !== d.return) c = e, d = f;
			else {
				for (var g = !1, h = e.child; h;) {
					if (h === c) {
						g = !0;
						c = e;
						d = f;
						break;
					}
					if (h === d) {
						g = !0;
						d = e;
						c = f;
						break;
					}
					h = h.sibling;
				}
				if (!g) {
					for (h = f.child; h;) {
						if (h === c) {
							g = !0;
							c = f;
							d = e;
							break;
						}
						if (h === d) {
							g = !0;
							d = f;
							c = e;
							break;
						}
						h = h.sibling;
					}
					if (!g) throw Error(p(189));
				}
			}
			if (c.alternate !== d) throw Error(p(190));
		}
		if (3 !== c.tag) throw Error(p(188));
		return c.stateNode.current === c ? a : b;
	}
	function Zb(a) {
		a = Yb(a);
		return null !== a ? $b(a) : null;
	}
	function $b(a) {
		if (5 === a.tag || 6 === a.tag) return a;
		for (a = a.child; null !== a;) {
			var b = $b(a);
			if (null !== b) return b;
			a = a.sibling;
		}
		return null;
	}
	var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
	function mc(a) {
		if (lc && "function" === typeof lc.onCommitFiberRoot) try {
			lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
		} catch (b) {}
	}
	var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
	function nc(a) {
		a >>>= 0;
		return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
	}
	var rc = 64, sc = 4194304;
	function tc(a) {
		switch (a & -a) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return a & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return a & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return a;
		}
	}
	function uc(a, b) {
		var c = a.pendingLanes;
		if (0 === c) return 0;
		var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
		if (0 !== g) {
			var h = g & ~e;
			0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
		} else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
		if (0 === d) return 0;
		if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
		0 !== (d & 4) && (d |= c & 16);
		b = a.entangledLanes;
		if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
		return d;
	}
	function vc(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 4: return b + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return b + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function wc(a, b) {
		for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
			var g = 31 - oc(f), h = 1 << g, k = e[g];
			if (-1 === k) {
				if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
			} else k <= b && (a.expiredLanes |= h);
			f &= ~h;
		}
	}
	function xc(a) {
		a = a.pendingLanes & -1073741825;
		return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
	}
	function yc() {
		var a = rc;
		rc <<= 1;
		0 === (rc & 4194240) && (rc = 64);
		return a;
	}
	function zc(a) {
		for (var b = [], c = 0; 31 > c; c++) b.push(a);
		return b;
	}
	function Ac(a, b, c) {
		a.pendingLanes |= b;
		536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
		a = a.eventTimes;
		b = 31 - oc(b);
		a[b] = c;
	}
	function Bc(a, b) {
		var c = a.pendingLanes & ~b;
		a.pendingLanes = b;
		a.suspendedLanes = 0;
		a.pingedLanes = 0;
		a.expiredLanes &= b;
		a.mutableReadLanes &= b;
		a.entangledLanes &= b;
		b = a.entanglements;
		var d = a.eventTimes;
		for (a = a.expirationTimes; 0 < c;) {
			var e = 31 - oc(c), f = 1 << e;
			b[e] = 0;
			d[e] = -1;
			a[e] = -1;
			c &= ~f;
		}
	}
	function Cc(a, b) {
		var c = a.entangledLanes |= b;
		for (a = a.entanglements; c;) {
			var d = 31 - oc(c), e = 1 << d;
			e & b | a[d] & b && (a[d] |= b);
			c &= ~e;
		}
	}
	var C = 0;
	function Dc(a) {
		a &= -a;
		return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
	}
	var Ec, Fc, Gc, Hc, Ic, Jc = !1, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function Sc(a, b) {
		switch (a) {
			case "focusin":
			case "focusout":
				Lc = null;
				break;
			case "dragenter":
			case "dragleave":
				Mc = null;
				break;
			case "mouseover":
			case "mouseout":
				Nc = null;
				break;
			case "pointerover":
			case "pointerout":
				Oc.delete(b.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Pc.delete(b.pointerId);
		}
	}
	function Tc(a, b, c, d, e, f) {
		if (null === a || a.nativeEvent !== f) return a = {
			blockedOn: b,
			domEventName: c,
			eventSystemFlags: d,
			nativeEvent: f,
			targetContainers: [e]
		}, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
		a.eventSystemFlags |= d;
		b = a.targetContainers;
		null !== e && -1 === b.indexOf(e) && b.push(e);
		return a;
	}
	function Uc(a, b, c, d, e) {
		switch (b) {
			case "focusin": return Lc = Tc(Lc, a, b, c, d, e), !0;
			case "dragenter": return Mc = Tc(Mc, a, b, c, d, e), !0;
			case "mouseover": return Nc = Tc(Nc, a, b, c, d, e), !0;
			case "pointerover":
				var f = e.pointerId;
				Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
				return !0;
			case "gotpointercapture": return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
		}
		return !1;
	}
	function Vc(a) {
		var b = Wc(a.target);
		if (null !== b) {
			var c = Vb(b);
			if (null !== c) {
				if (b = c.tag, 13 === b) {
					if (b = Wb(c), null !== b) {
						a.blockedOn = b;
						Ic(a.priority, function() {
							Gc(c);
						});
						return;
					}
				} else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
					a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
					return;
				}
			}
		}
		a.blockedOn = null;
	}
	function Xc(a) {
		if (null !== a.blockedOn) return !1;
		for (var b = a.targetContainers; 0 < b.length;) {
			var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
			if (null === c) {
				c = a.nativeEvent;
				var d = new c.constructor(c.type, c);
				wb = d;
				c.target.dispatchEvent(d);
				wb = null;
			} else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
			b.shift();
		}
		return !0;
	}
	function Zc(a, b, c) {
		Xc(a) && c.delete(b);
	}
	function $c() {
		Jc = !1;
		null !== Lc && Xc(Lc) && (Lc = null);
		null !== Mc && Xc(Mc) && (Mc = null);
		null !== Nc && Xc(Nc) && (Nc = null);
		Oc.forEach(Zc);
		Pc.forEach(Zc);
	}
	function ad(a, b) {
		a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
	}
	function bd(a) {
		function b(b) {
			return ad(b, a);
		}
		if (0 < Kc.length) {
			ad(Kc[0], a);
			for (var c = 1; c < Kc.length; c++) {
				var d = Kc[c];
				d.blockedOn === a && (d.blockedOn = null);
			}
		}
		null !== Lc && ad(Lc, a);
		null !== Mc && ad(Mc, a);
		null !== Nc && ad(Nc, a);
		Oc.forEach(b);
		Pc.forEach(b);
		for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
		for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);) Vc(c), null === c.blockedOn && Qc.shift();
	}
	var cd = ua.ReactCurrentBatchConfig, dd = !0;
	function ed(a, b, c, d) {
		var e = C, f = cd.transition;
		cd.transition = null;
		try {
			C = 1, fd(a, b, c, d);
		} finally {
			C = e, cd.transition = f;
		}
	}
	function gd(a, b, c, d) {
		var e = C, f = cd.transition;
		cd.transition = null;
		try {
			C = 4, fd(a, b, c, d);
		} finally {
			C = e, cd.transition = f;
		}
	}
	function fd(a, b, c, d) {
		if (dd) {
			var e = Yc(a, b, c, d);
			if (null === e) hd(a, b, d, id, c), Sc(a, d);
			else if (Uc(e, a, b, c, d)) d.stopPropagation();
			else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
				for (; null !== e;) {
					var f = Cb(e);
					null !== f && Ec(f);
					f = Yc(a, b, c, d);
					null === f && hd(a, b, d, id, c);
					if (f === e) break;
					e = f;
				}
				null !== e && d.stopPropagation();
			} else hd(a, b, d, null, c);
		}
	}
	var id = null;
	function Yc(a, b, c, d) {
		id = null;
		a = xb(d);
		a = Wc(a);
		if (null !== a) if (b = Vb(a), null === b) a = null;
		else if (c = b.tag, 13 === c) {
			a = Wb(b);
			if (null !== a) return a;
			a = null;
		} else if (3 === c) {
			if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
			a = null;
		} else b !== a && (a = null);
		id = a;
		return null;
	}
	function jd(a) {
		switch (a) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 4;
			case "message": switch (ec()) {
				case fc: return 1;
				case gc: return 4;
				case hc:
				case ic: return 16;
				case jc: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var kd = null, ld = null, md = null;
	function nd() {
		if (md) return md;
		var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
		for (a = 0; a < c && b[a] === e[a]; a++);
		var g = c - a;
		for (d = 1; d <= g && b[c - d] === e[f - d]; d++);
		return md = e.slice(a, 1 < d ? 1 - d : void 0);
	}
	function od(a) {
		var b = a.keyCode;
		"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
		10 === a && (a = 13);
		return 32 <= a || 13 === a ? a : 0;
	}
	function pd() {
		return !0;
	}
	function qd() {
		return !1;
	}
	function rd(a) {
		function b(b, d, e, f, g) {
			this._reactName = b;
			this._targetInst = e;
			this.type = d;
			this.nativeEvent = f;
			this.target = g;
			this.currentTarget = null;
			for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
			this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
			this.isPropagationStopped = qd;
			return this;
		}
		A(b.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var a = this.nativeEvent;
				a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
			},
			stopPropagation: function() {
				var a = this.nativeEvent;
				a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
			},
			persist: function() {},
			isPersistent: pd
		});
		return b;
	}
	var sd = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(a) {
			return a.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, td = rd(sd), ud = A({}, sd, {
		view: 0,
		detail: 0
	}), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: zd,
		button: 0,
		buttons: 0,
		relatedTarget: function(a) {
			return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
		},
		movementX: function(a) {
			if ("movementX" in a) return a.movementX;
			a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
			return wd;
		},
		movementY: function(a) {
			return "movementY" in a ? a.movementY : xd;
		}
	}), Bd = rd(Ad), Dd = rd(A({}, Ad, { dataTransfer: 0 })), Fd = rd(A({}, ud, { relatedTarget: 0 })), Hd = rd(A({}, sd, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Jd = rd(A({}, sd, { clipboardData: function(a) {
		return "clipboardData" in a ? a.clipboardData : window.clipboardData;
	} })), Ld = rd(A({}, sd, { data: 0 })), Md = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Nd = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Od = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Pd(a) {
		var b = this.nativeEvent;
		return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
	}
	function zd() {
		return Pd;
	}
	var Rd = rd(A({}, ud, {
		key: function(a) {
			if (a.key) {
				var b = Md[a.key] || a.key;
				if ("Unidentified" !== b) return b;
			}
			return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: zd,
		charCode: function(a) {
			return "keypress" === a.type ? od(a) : 0;
		},
		keyCode: function(a) {
			return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
		},
		which: function(a) {
			return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
		}
	})), Td = rd(A({}, Ad, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Vd = rd(A({}, ud, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: zd
	})), Xd = rd(A({}, sd, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Zd = rd(A({}, Ad, {
		deltaX: function(a) {
			return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
		},
		deltaY: function(a) {
			return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), $d = [
		9,
		13,
		27,
		32
	], ae = ia && "CompositionEvent" in window, be = null;
	ia && "documentMode" in document && (be = document.documentMode);
	var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
	function ge(a, b) {
		switch (a) {
			case "keyup": return -1 !== $d.indexOf(b.keyCode);
			case "keydown": return 229 !== b.keyCode;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function he(a) {
		a = a.detail;
		return "object" === typeof a && "data" in a ? a.data : null;
	}
	var ie = !1;
	function je(a, b) {
		switch (a) {
			case "compositionend": return he(b);
			case "keypress":
				if (32 !== b.which) return null;
				fe = !0;
				return ee;
			case "textInput": return a = b.data, a === ee && fe ? null : a;
			default: return null;
		}
	}
	function ke(a, b) {
		if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
		switch (a) {
			case "paste": return null;
			case "keypress":
				if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
					if (b.char && 1 < b.char.length) return b.char;
					if (b.which) return String.fromCharCode(b.which);
				}
				return null;
			case "compositionend": return de && "ko" !== b.locale ? null : b.data;
			default: return null;
		}
	}
	var le = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function me(a) {
		var b = a && a.nodeName && a.nodeName.toLowerCase();
		return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;
	}
	function ne(a, b, c, d) {
		Eb(d);
		b = oe(b, "onChange");
		0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
			event: c,
			listeners: b
		}));
	}
	var pe = null, qe = null;
	function re(a) {
		se(a, 0);
	}
	function te(a) {
		if (Wa(ue(a))) return a;
	}
	function ve(a, b) {
		if ("change" === a) return b;
	}
	var we = !1;
	if (ia) {
		var xe;
		if (ia) {
			var ye = "oninput" in document;
			if (!ye) {
				var ze = document.createElement("div");
				ze.setAttribute("oninput", "return;");
				ye = "function" === typeof ze.oninput;
			}
			xe = ye;
		} else xe = !1;
		we = xe && (!document.documentMode || 9 < document.documentMode);
	}
	function Ae() {
		pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
	}
	function Be(a) {
		if ("value" === a.propertyName && te(qe)) {
			var b = [];
			ne(b, qe, a, xb(a));
			Jb(re, b);
		}
	}
	function Ce(a, b, c) {
		"focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
	}
	function De(a) {
		if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
	}
	function Ee(a, b) {
		if ("click" === a) return te(b);
	}
	function Fe(a, b) {
		if ("input" === a || "change" === a) return te(b);
	}
	function Ge(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var He = "function" === typeof Object.is ? Object.is : Ge;
	function Ie(a, b) {
		if (He(a, b)) return !0;
		if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
		var c = Object.keys(a), d = Object.keys(b);
		if (c.length !== d.length) return !1;
		for (d = 0; d < c.length; d++) {
			var e = c[d];
			if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
		}
		return !0;
	}
	function Je(a) {
		for (; a && a.firstChild;) a = a.firstChild;
		return a;
	}
	function Ke(a, b) {
		var c = Je(a);
		a = 0;
		for (var d; c;) {
			if (3 === c.nodeType) {
				d = a + c.textContent.length;
				if (a <= b && d >= b) return {
					node: c,
					offset: b - a
				};
				a = d;
			}
			a: {
				for (; c;) {
					if (c.nextSibling) {
						c = c.nextSibling;
						break a;
					}
					c = c.parentNode;
				}
				c = void 0;
			}
			c = Je(c);
		}
	}
	function Le(a, b) {
		return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
	}
	function Me() {
		for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {
			try {
				var c = "string" === typeof b.contentWindow.location.href;
			} catch (d) {
				c = !1;
			}
			if (c) a = b.contentWindow;
			else break;
			b = Xa(a.document);
		}
		return b;
	}
	function Ne(a) {
		var b = a && a.nodeName && a.nodeName.toLowerCase();
		return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
	}
	function Oe(a) {
		var b = Me(), c = a.focusedElem, d = a.selectionRange;
		if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
			if (null !== d && Ne(c)) {
				if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
				else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
					a = a.getSelection();
					var e = c.textContent.length, f = Math.min(d.start, e);
					d = void 0 === d.end ? f : Math.min(d.end, e);
					!a.extend && f > d && (e = d, d = f, f = e);
					e = Ke(c, f);
					var g = Ke(c, d);
					e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
				}
			}
			b = [];
			for (a = c; a = a.parentNode;) 1 === a.nodeType && b.push({
				element: a,
				left: a.scrollLeft,
				top: a.scrollTop
			});
			"function" === typeof c.focus && c.focus();
			for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
		}
	}
	var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
	function Ue(a, b, c) {
		var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
		Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = {
			start: d.selectionStart,
			end: d.selectionEnd
		} : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
			anchorNode: d.anchorNode,
			anchorOffset: d.anchorOffset,
			focusNode: d.focusNode,
			focusOffset: d.focusOffset
		}), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
			event: b,
			listeners: d
		}), b.target = Qe)));
	}
	function Ve(a, b) {
		var c = {};
		c[a.toLowerCase()] = b.toLowerCase();
		c["Webkit" + a] = "webkit" + b;
		c["Moz" + a] = "moz" + b;
		return c;
	}
	var We = {
		animationend: Ve("Animation", "AnimationEnd"),
		animationiteration: Ve("Animation", "AnimationIteration"),
		animationstart: Ve("Animation", "AnimationStart"),
		transitionend: Ve("Transition", "TransitionEnd")
	}, Xe = {}, Ye = {};
	ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
	function Ze(a) {
		if (Xe[a]) return Xe[a];
		if (!We[a]) return a;
		var b = We[a], c;
		for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
		return a;
	}
	var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ff(a, b) {
		df.set(a, b);
		fa(b, [a]);
	}
	for (var gf = 0; gf < ef.length; gf++) {
		var hf = ef[gf];
		ff(hf.toLowerCase(), "on" + (hf[0].toUpperCase() + hf.slice(1)));
	}
	ff($e, "onAnimationEnd");
	ff(af, "onAnimationIteration");
	ff(bf, "onAnimationStart");
	ff("dblclick", "onDoubleClick");
	ff("focusin", "onFocus");
	ff("focusout", "onBlur");
	ff(cf, "onTransitionEnd");
	ha("onMouseEnter", ["mouseout", "mouseover"]);
	ha("onMouseLeave", ["mouseout", "mouseover"]);
	ha("onPointerEnter", ["pointerout", "pointerover"]);
	ha("onPointerLeave", ["pointerout", "pointerover"]);
	fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
	fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
	fa("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]);
	fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
	function nf(a, b, c) {
		var d = a.type || "unknown-event";
		a.currentTarget = c;
		Ub(d, b, void 0, a);
		a.currentTarget = null;
	}
	function se(a, b) {
		b = 0 !== (b & 4);
		for (var c = 0; c < a.length; c++) {
			var d = a[c], e = d.event;
			d = d.listeners;
			a: {
				var f = void 0;
				if (b) for (var g = d.length - 1; 0 <= g; g--) {
					var h = d[g], k = h.instance, l = h.currentTarget;
					h = h.listener;
					if (k !== f && e.isPropagationStopped()) break a;
					nf(e, h, l);
					f = k;
				}
				else for (g = 0; g < d.length; g++) {
					h = d[g];
					k = h.instance;
					l = h.currentTarget;
					h = h.listener;
					if (k !== f && e.isPropagationStopped()) break a;
					nf(e, h, l);
					f = k;
				}
			}
		}
		if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
	}
	function D(a, b) {
		var c = b[of];
		void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
		var d = a + "__bubble";
		c.has(d) || (pf(b, a, 2, !1), c.add(d));
	}
	function qf(a, b, c) {
		var d = 0;
		b && (d |= 4);
		pf(c, a, d, b);
	}
	var rf = "_reactListening" + Math.random().toString(36).slice(2);
	function sf(a) {
		if (!a[rf]) {
			a[rf] = !0;
			da.forEach(function(b) {
				"selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
			});
			var b = 9 === a.nodeType ? a : a.ownerDocument;
			null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
		}
	}
	function pf(a, b, c, d) {
		switch (jd(b)) {
			case 1:
				var e = ed;
				break;
			case 4:
				e = gd;
				break;
			default: e = fd;
		}
		c = e.bind(null, b, c, a);
		e = void 0;
		!Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
		d ? void 0 !== e ? a.addEventListener(b, c, {
			capture: !0,
			passive: e
		}) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, !1);
	}
	function hd(a, b, c, d, e) {
		var f = d;
		if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
			if (null === d) return;
			var g = d.tag;
			if (3 === g || 4 === g) {
				var h = d.stateNode.containerInfo;
				if (h === e || 8 === h.nodeType && h.parentNode === e) break;
				if (4 === g) for (g = d.return; null !== g;) {
					var k = g.tag;
					if (3 === k || 4 === k) {
						if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
					}
					g = g.return;
				}
				for (; null !== h;) {
					g = Wc(h);
					if (null === g) return;
					k = g.tag;
					if (5 === k || 6 === k) {
						d = f = g;
						continue a;
					}
					h = h.parentNode;
				}
			}
			d = d.return;
		}
		Jb(function() {
			var d = f, e = xb(c), g = [];
			a: {
				var h = df.get(a);
				if (void 0 !== h) {
					var k = td, n = a;
					switch (a) {
						case "keypress": if (0 === od(c)) break a;
						case "keydown":
						case "keyup":
							k = Rd;
							break;
						case "focusin":
							n = "focus";
							k = Fd;
							break;
						case "focusout":
							n = "blur";
							k = Fd;
							break;
						case "beforeblur":
						case "afterblur":
							k = Fd;
							break;
						case "click": if (2 === c.button) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							k = Bd;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							k = Dd;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							k = Vd;
							break;
						case $e:
						case af:
						case bf:
							k = Hd;
							break;
						case cf:
							k = Xd;
							break;
						case "scroll":
							k = vd;
							break;
						case "wheel":
							k = Zd;
							break;
						case "copy":
						case "cut":
						case "paste":
							k = Jd;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": k = Td;
					}
					var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h ? h + "Capture" : null : h;
					t = [];
					for (var w = d, u; null !== w;) {
						u = w;
						var F = u.stateNode;
						5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
						if (J) break;
						w = w.return;
					}
					0 < t.length && (h = new k(h, n, null, c, e), g.push({
						event: h,
						listeners: t
					}));
				}
			}
			if (0 === (b & 7)) {
				a: {
					h = "mouseover" === a || "pointerover" === a;
					k = "mouseout" === a || "pointerout" === a;
					if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
					if (k || h) {
						h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
						if (k) {
							if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
						} else k = null, n = d;
						if (k !== n) {
							t = Bd;
							F = "onMouseLeave";
							x = "onMouseEnter";
							w = "mouse";
							if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
							J = null == k ? h : ue(k);
							u = null == n ? h : ue(n);
							h = new t(F, w + "leave", k, c, e);
							h.target = J;
							h.relatedTarget = u;
							F = null;
							Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);
							J = F;
							if (k && n) b: {
								t = k;
								x = n;
								w = 0;
								for (u = t; u; u = vf(u)) w++;
								u = 0;
								for (F = x; F; F = vf(F)) u++;
								for (; 0 < w - u;) t = vf(t), w--;
								for (; 0 < u - w;) x = vf(x), u--;
								for (; w--;) {
									if (t === x || null !== x && t === x.alternate) break b;
									t = vf(t);
									x = vf(x);
								}
								t = null;
							}
							else t = null;
							null !== k && wf(g, h, k, t, !1);
							null !== n && null !== J && wf(g, J, n, t, !0);
						}
					}
				}
				a: {
					h = d ? ue(d) : window;
					k = h.nodeName && h.nodeName.toLowerCase();
					if ("select" === k || "input" === k && "file" === h.type) var na = ve;
					else if (me(h)) if (we) na = Fe;
					else {
						na = De;
						var xa = Ce;
					}
					else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);
					if (na && (na = na(a, d))) {
						ne(g, na, c, e);
						break a;
					}
					xa && xa(a, h, d);
					"focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
				}
				xa = d ? ue(d) : window;
				switch (a) {
					case "focusin":
						if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;
						break;
					case "focusout":
						Se = Re = Qe = null;
						break;
					case "mousedown":
						Te = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Te = !1;
						Ue(g, c, e);
						break;
					case "selectionchange": if (Pe) break;
					case "keydown":
					case "keyup": Ue(g, c, e);
				}
				var $a;
				if (ae) b: {
					switch (a) {
						case "compositionstart":
							var ba = "onCompositionStart";
							break b;
						case "compositionend":
							ba = "onCompositionEnd";
							break b;
						case "compositionupdate":
							ba = "onCompositionUpdate";
							break b;
					}
					ba = void 0;
				}
				else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
				ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({
					event: ba,
					listeners: xa
				}), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
				if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
					event: e,
					listeners: d
				}), e.data = $a);
			}
			se(g, b);
		});
	}
	function tf(a, b, c) {
		return {
			instance: a,
			listener: b,
			currentTarget: c
		};
	}
	function oe(a, b) {
		for (var c = b + "Capture", d = []; null !== a;) {
			var e = a, f = e.stateNode;
			5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
			a = a.return;
		}
		return d;
	}
	function vf(a) {
		if (null === a) return null;
		do
			a = a.return;
		while (a && 5 !== a.tag);
		return a ? a : null;
	}
	function wf(a, b, c, d, e) {
		for (var f = b._reactName, g = []; null !== c && c !== d;) {
			var h = c, k = h.alternate, l = h.stateNode;
			if (null !== k && k === d) break;
			5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
			c = c.return;
		}
		0 !== g.length && a.push({
			event: b,
			listeners: g
		});
	}
	var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
	function zf(a) {
		return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
	}
	function Af(a, b, c) {
		b = zf(b);
		if (zf(a) !== b && c) throw Error(p(425));
	}
	function Bf() {}
	var Cf = null, Df = null;
	function Ef(a, b) {
		return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
	}
	var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
		return Hf.resolve(null).then(a).catch(If);
	} : Ff;
	function If(a) {
		setTimeout(function() {
			throw a;
		});
	}
	function Kf(a, b) {
		var c = b, d = 0;
		do {
			var e = c.nextSibling;
			a.removeChild(c);
			if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
				if (0 === d) {
					a.removeChild(e);
					bd(b);
					return;
				}
				d--;
			} else "$" !== c && "$?" !== c && "$!" !== c || d++;
			c = e;
		} while (c);
		bd(b);
	}
	function Lf(a) {
		for (; null != a; a = a.nextSibling) {
			var b = a.nodeType;
			if (1 === b || 3 === b) break;
			if (8 === b) {
				b = a.data;
				if ("$" === b || "$!" === b || "$?" === b) break;
				if ("/$" === b) return null;
			}
		}
		return a;
	}
	function Mf(a) {
		a = a.previousSibling;
		for (var b = 0; a;) {
			if (8 === a.nodeType) {
				var c = a.data;
				if ("$" === c || "$!" === c || "$?" === c) {
					if (0 === b) return a;
					b--;
				} else "/$" === c && b++;
			}
			a = a.previousSibling;
		}
		return null;
	}
	var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
	function Wc(a) {
		var b = a[Of];
		if (b) return b;
		for (var c = a.parentNode; c;) {
			if (b = c[uf] || c[Of]) {
				c = b.alternate;
				if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a;) {
					if (c = a[Of]) return c;
					a = Mf(a);
				}
				return b;
			}
			a = c;
			c = a.parentNode;
		}
		return null;
	}
	function Cb(a) {
		a = a[Of] || a[uf];
		return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
	}
	function ue(a) {
		if (5 === a.tag || 6 === a.tag) return a.stateNode;
		throw Error(p(33));
	}
	function Db(a) {
		return a[Pf] || null;
	}
	var Sf = [], Tf = -1;
	function Uf(a) {
		return { current: a };
	}
	function E(a) {
		0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
	}
	function G(a, b) {
		Tf++;
		Sf[Tf] = a.current;
		a.current = b;
	}
	var Vf = {}, H = Uf(Vf), Wf = Uf(!1), Xf = Vf;
	function Yf(a, b) {
		var c = a.type.contextTypes;
		if (!c) return Vf;
		var d = a.stateNode;
		if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
		var e = {}, f;
		for (f in c) e[f] = b[f];
		d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
		return e;
	}
	function Zf(a) {
		a = a.childContextTypes;
		return null !== a && void 0 !== a;
	}
	function $f() {
		E(Wf);
		E(H);
	}
	function ag(a, b, c) {
		if (H.current !== Vf) throw Error(p(168));
		G(H, b);
		G(Wf, c);
	}
	function bg(a, b, c) {
		var d = a.stateNode;
		b = b.childContextTypes;
		if ("function" !== typeof d.getChildContext) return c;
		d = d.getChildContext();
		for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
		return A({}, c, d);
	}
	function cg(a) {
		a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
		Xf = H.current;
		G(H, a);
		G(Wf, Wf.current);
		return !0;
	}
	function dg(a, b, c) {
		var d = a.stateNode;
		if (!d) throw Error(p(169));
		c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
		G(Wf, c);
	}
	var eg = null, fg = !1, gg = !1;
	function hg(a) {
		null === eg ? eg = [a] : eg.push(a);
	}
	function ig(a) {
		fg = !0;
		hg(a);
	}
	function jg() {
		if (!gg && null !== eg) {
			gg = !0;
			var a = 0, b = C;
			try {
				var c = eg;
				for (C = 1; a < c.length; a++) {
					var d = c[a];
					do
						d = d(!0);
					while (null !== d);
				}
				eg = null;
				fg = !1;
			} catch (e) {
				throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
			} finally {
				C = b, gg = !1;
			}
		}
		return null;
	}
	var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
	function tg(a, b) {
		kg[lg++] = ng;
		kg[lg++] = mg;
		mg = a;
		ng = b;
	}
	function ug(a, b, c) {
		og[pg++] = rg;
		og[pg++] = sg;
		og[pg++] = qg;
		qg = a;
		var d = rg;
		a = sg;
		var e = 32 - oc(d) - 1;
		d &= ~(1 << e);
		c += 1;
		var f = 32 - oc(b) + e;
		if (30 < f) {
			var g = e - e % 5;
			f = (d & (1 << g) - 1).toString(32);
			d >>= g;
			e -= g;
			rg = 1 << 32 - oc(b) + e | c << e | d;
			sg = f + a;
		} else rg = 1 << f | c << e | d, sg = a;
	}
	function vg(a) {
		null !== a.return && (tg(a, 1), ug(a, 1, 0));
	}
	function wg(a) {
		for (; a === mg;) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
		for (; a === qg;) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
	}
	var xg = null, yg = null, I = !1, zg = null;
	function Ag(a, b) {
		var c = Bg(5, null, null, 0);
		c.elementType = "DELETED";
		c.stateNode = b;
		c.return = a;
		b = a.deletions;
		null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
	}
	function Cg(a, b) {
		switch (a.tag) {
			case 5:
				var c = a.type;
				b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
				return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;
			case 6: return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, !0) : !1;
			case 13: return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? {
				id: rg,
				overflow: sg
			} : null, a.memoizedState = {
				dehydrated: b,
				treeContext: c,
				retryLane: 1073741824
			}, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0) : !1;
			default: return !1;
		}
	}
	function Dg(a) {
		return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
	}
	function Eg(a) {
		if (I) {
			var b = yg;
			if (b) {
				var c = b;
				if (!Cg(a, b)) {
					if (Dg(a)) throw Error(p(418));
					b = Lf(c.nextSibling);
					var d = xg;
					b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);
				}
			} else {
				if (Dg(a)) throw Error(p(418));
				a.flags = a.flags & -4097 | 2;
				I = !1;
				xg = a;
			}
		}
	}
	function Fg(a) {
		for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
		xg = a;
	}
	function Gg(a) {
		if (a !== xg) return !1;
		if (!I) return Fg(a), I = !0, !1;
		var b;
		(b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
		if (b && (b = yg)) {
			if (Dg(a)) throw Hg(), Error(p(418));
			for (; b;) Ag(a, b), b = Lf(b.nextSibling);
		}
		Fg(a);
		if (13 === a.tag) {
			a = a.memoizedState;
			a = null !== a ? a.dehydrated : null;
			if (!a) throw Error(p(317));
			a: {
				a = a.nextSibling;
				for (b = 0; a;) {
					if (8 === a.nodeType) {
						var c = a.data;
						if ("/$" === c) {
							if (0 === b) {
								yg = Lf(a.nextSibling);
								break a;
							}
							b--;
						} else "$" !== c && "$!" !== c && "$?" !== c || b++;
					}
					a = a.nextSibling;
				}
				yg = null;
			}
		} else yg = xg ? Lf(a.stateNode.nextSibling) : null;
		return !0;
	}
	function Hg() {
		for (var a = yg; a;) a = Lf(a.nextSibling);
	}
	function Ig() {
		yg = xg = null;
		I = !1;
	}
	function Jg(a) {
		null === zg ? zg = [a] : zg.push(a);
	}
	var Kg = ua.ReactCurrentBatchConfig;
	function Lg(a, b, c) {
		a = c.ref;
		if (null !== a && "function" !== typeof a && "object" !== typeof a) {
			if (c._owner) {
				c = c._owner;
				if (c) {
					if (1 !== c.tag) throw Error(p(309));
					var d = c.stateNode;
				}
				if (!d) throw Error(p(147, a));
				var e = d, f = "" + a;
				if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
				b = function(a) {
					var b = e.refs;
					null === a ? delete b[f] : b[f] = a;
				};
				b._stringRef = f;
				return b;
			}
			if ("string" !== typeof a) throw Error(p(284));
			if (!c._owner) throw Error(p(290, a));
		}
		return a;
	}
	function Mg(a, b) {
		a = Object.prototype.toString.call(b);
		throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
	}
	function Ng(a) {
		var b = a._init;
		return b(a._payload);
	}
	function Og(a) {
		function b(b, c) {
			if (a) {
				var d = b.deletions;
				null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
			}
		}
		function c(c, d) {
			if (!a) return null;
			for (; null !== d;) b(c, d), d = d.sibling;
			return null;
		}
		function d(a, b) {
			for (a = /* @__PURE__ */ new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
			return a;
		}
		function e(a, b) {
			a = Pg(a, b);
			a.index = 0;
			a.sibling = null;
			return a;
		}
		function f(b, c, d) {
			b.index = d;
			if (!a) return b.flags |= 1048576, c;
			d = b.alternate;
			if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
			b.flags |= 2;
			return c;
		}
		function g(b) {
			a && null === b.alternate && (b.flags |= 2);
			return b;
		}
		function h(a, b, c, d) {
			if (null === b || 6 !== b.tag) return b = Qg(c, a.mode, d), b.return = a, b;
			b = e(b, c);
			b.return = a;
			return b;
		}
		function k(a, b, c, d) {
			var f = c.type;
			if (f === ya) return m(a, b, c.props.children, d, c.key);
			if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === Ha && Ng(f) === b.type)) return d = e(b, c.props), d.ref = Lg(a, b, c), d.return = a, d;
			d = Rg(c.type, c.key, c.props, null, a.mode, d);
			d.ref = Lg(a, b, c);
			d.return = a;
			return d;
		}
		function l(a, b, c, d) {
			if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Sg(c, a.mode, d), b.return = a, b;
			b = e(b, c.children || []);
			b.return = a;
			return b;
		}
		function m(a, b, c, d, f) {
			if (null === b || 7 !== b.tag) return b = Tg(c, a.mode, d, f), b.return = a, b;
			b = e(b, c);
			b.return = a;
			return b;
		}
		function q(a, b, c) {
			if ("string" === typeof b && "" !== b || "number" === typeof b) return b = Qg("" + b, a.mode, c), b.return = a, b;
			if ("object" === typeof b && null !== b) {
				switch (b.$$typeof) {
					case va: return c = Rg(b.type, b.key, b.props, null, a.mode, c), c.ref = Lg(a, null, b), c.return = a, c;
					case wa: return b = Sg(b, a.mode, c), b.return = a, b;
					case Ha:
						var d = b._init;
						return q(a, d(b._payload), c);
				}
				if (eb(b) || Ka(b)) return b = Tg(b, a.mode, c, null), b.return = a, b;
				Mg(a, b);
			}
			return null;
		}
		function r(a, b, c, d) {
			var e = null !== b ? b.key : null;
			if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
			if ("object" === typeof c && null !== c) {
				switch (c.$$typeof) {
					case va: return c.key === e ? k(a, b, c, d) : null;
					case wa: return c.key === e ? l(a, b, c, d) : null;
					case Ha: return e = c._init, r(a, b, e(c._payload), d);
				}
				if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
				Mg(a, c);
			}
			return null;
		}
		function y(a, b, c, d, e) {
			if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
			if ("object" === typeof d && null !== d) {
				switch (d.$$typeof) {
					case va: return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
					case wa: return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
					case Ha:
						var f = d._init;
						return y(a, b, c, f(d._payload), e);
				}
				if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
				Mg(b, d);
			}
			return null;
		}
		function n(e, g, h, k) {
			for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {
				u.index > w ? (x = u, u = null) : x = u.sibling;
				var n = r(e, u, h[w], k);
				if (null === n) {
					null === u && (u = x);
					break;
				}
				a && u && null === n.alternate && b(e, u);
				g = f(n, g, w);
				null === m ? l = n : m.sibling = n;
				m = n;
				u = x;
			}
			if (w === h.length) return c(e, u), I && tg(e, w), l;
			if (null === u) {
				for (; w < h.length; w++) u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);
				I && tg(e, w);
				return l;
			}
			for (u = d(e, u); w < h.length; w++) x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
			a && u.forEach(function(a) {
				return b(e, a);
			});
			I && tg(e, w);
			return l;
		}
		function t(e, g, h, k) {
			var l = Ka(h);
			if ("function" !== typeof l) throw Error(p(150));
			h = l.call(h);
			if (null == h) throw Error(p(151));
			for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()) {
				m.index > w ? (x = m, m = null) : x = m.sibling;
				var t = r(e, m, n.value, k);
				if (null === t) {
					null === m && (m = x);
					break;
				}
				a && m && null === t.alternate && b(e, m);
				g = f(t, g, w);
				null === u ? l = t : u.sibling = t;
				u = t;
				m = x;
			}
			if (n.done) return c(e, m), I && tg(e, w), l;
			if (null === m) {
				for (; !n.done; w++, n = h.next()) n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
				I && tg(e, w);
				return l;
			}
			for (m = d(e, m); !n.done; w++, n = h.next()) n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
			a && m.forEach(function(a) {
				return b(e, a);
			});
			I && tg(e, w);
			return l;
		}
		function J(a, d, f, h) {
			"object" === typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
			if ("object" === typeof f && null !== f) {
				switch (f.$$typeof) {
					case va:
						a: {
							for (var k = f.key, l = d; null !== l;) {
								if (l.key === k) {
									k = f.type;
									if (k === ya) {
										if (7 === l.tag) {
											c(a, l.sibling);
											d = e(l, f.props.children);
											d.return = a;
											a = d;
											break a;
										}
									} else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === Ha && Ng(k) === l.type) {
										c(a, l.sibling);
										d = e(l, f.props);
										d.ref = Lg(a, l, f);
										d.return = a;
										a = d;
										break a;
									}
									c(a, l);
									break;
								} else b(a, l);
								l = l.sibling;
							}
							f.type === ya ? (d = Tg(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Rg(f.type, f.key, f.props, null, a.mode, h), h.ref = Lg(a, d, f), h.return = a, a = h);
						}
						return g(a);
					case wa:
						a: {
							for (l = f.key; null !== d;) {
								if (d.key === l) if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
									c(a, d.sibling);
									d = e(d, f.children || []);
									d.return = a;
									a = d;
									break a;
								} else {
									c(a, d);
									break;
								}
								else b(a, d);
								d = d.sibling;
							}
							d = Sg(f, a.mode, h);
							d.return = a;
							a = d;
						}
						return g(a);
					case Ha: return l = f._init, J(a, d, l(f._payload), h);
				}
				if (eb(f)) return n(a, d, f, h);
				if (Ka(f)) return t(a, d, f, h);
				Mg(a, f);
			}
			return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Qg(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
		}
		return J;
	}
	var Ug = Og(!0), Vg = Og(!1), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
	function $g() {
		Zg = Yg = Xg = null;
	}
	function ah(a) {
		var b = Wg.current;
		E(Wg);
		a._currentValue = b;
	}
	function bh(a, b, c) {
		for (; null !== a;) {
			var d = a.alternate;
			(a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
			if (a === c) break;
			a = a.return;
		}
	}
	function ch(a, b) {
		Xg = a;
		Zg = Yg = null;
		a = a.dependencies;
		null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = !0), a.firstContext = null);
	}
	function eh(a) {
		var b = a._currentValue;
		if (Zg !== a) if (a = {
			context: a,
			memoizedValue: b,
			next: null
		}, null === Yg) {
			if (null === Xg) throw Error(p(308));
			Yg = a;
			Xg.dependencies = {
				lanes: 0,
				firstContext: a
			};
		} else Yg = Yg.next = a;
		return b;
	}
	var fh = null;
	function gh(a) {
		null === fh ? fh = [a] : fh.push(a);
	}
	function hh(a, b, c, d) {
		var e = b.interleaved;
		null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
		b.interleaved = c;
		return ih(a, d);
	}
	function ih(a, b) {
		a.lanes |= b;
		var c = a.alternate;
		null !== c && (c.lanes |= b);
		c = a;
		for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
		return 3 === c.tag ? c.stateNode : null;
	}
	var jh = !1;
	function kh(a) {
		a.updateQueue = {
			baseState: a.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function lh(a, b) {
		a = a.updateQueue;
		b.updateQueue === a && (b.updateQueue = {
			baseState: a.baseState,
			firstBaseUpdate: a.firstBaseUpdate,
			lastBaseUpdate: a.lastBaseUpdate,
			shared: a.shared,
			effects: a.effects
		});
	}
	function mh(a, b) {
		return {
			eventTime: a,
			lane: b,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function nh(a, b, c) {
		var d = a.updateQueue;
		if (null === d) return null;
		d = d.shared;
		if (0 !== (K & 2)) {
			var e = d.pending;
			null === e ? b.next = b : (b.next = e.next, e.next = b);
			d.pending = b;
			return ih(a, c);
		}
		e = d.interleaved;
		null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
		d.interleaved = b;
		return ih(a, c);
	}
	function oh(a, b, c) {
		b = b.updateQueue;
		if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
			var d = b.lanes;
			d &= a.pendingLanes;
			c |= d;
			b.lanes = c;
			Cc(a, c);
		}
	}
	function ph(a, b) {
		var c = a.updateQueue, d = a.alternate;
		if (null !== d && (d = d.updateQueue, c === d)) {
			var e = null, f = null;
			c = c.firstBaseUpdate;
			if (null !== c) {
				do {
					var g = {
						eventTime: c.eventTime,
						lane: c.lane,
						tag: c.tag,
						payload: c.payload,
						callback: c.callback,
						next: null
					};
					null === f ? e = f = g : f = f.next = g;
					c = c.next;
				} while (null !== c);
				null === f ? e = f = b : f = f.next = b;
			} else e = f = b;
			c = {
				baseState: d.baseState,
				firstBaseUpdate: e,
				lastBaseUpdate: f,
				shared: d.shared,
				effects: d.effects
			};
			a.updateQueue = c;
			return;
		}
		a = c.lastBaseUpdate;
		null === a ? c.firstBaseUpdate = b : a.next = b;
		c.lastBaseUpdate = b;
	}
	function qh(a, b, c, d) {
		var e = a.updateQueue;
		jh = !1;
		var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
		if (null !== h) {
			e.shared.pending = null;
			var k = h, l = k.next;
			k.next = null;
			null === g ? f = l : g.next = l;
			g = k;
			var m = a.alternate;
			null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
		}
		if (null !== f) {
			var q = e.baseState;
			g = 0;
			m = l = k = null;
			h = f;
			do {
				var r = h.lane, y = h.eventTime;
				if ((d & r) === r) {
					null !== m && (m = m.next = {
						eventTime: y,
						lane: 0,
						tag: h.tag,
						payload: h.payload,
						callback: h.callback,
						next: null
					});
					a: {
						var n = a, t = h;
						r = b;
						y = c;
						switch (t.tag) {
							case 1:
								n = t.payload;
								if ("function" === typeof n) {
									q = n.call(y, q, r);
									break a;
								}
								q = n;
								break a;
							case 3: n.flags = n.flags & -65537 | 128;
							case 0:
								n = t.payload;
								r = "function" === typeof n ? n.call(y, q, r) : n;
								if (null === r || void 0 === r) break a;
								q = A({}, q, r);
								break a;
							case 2: jh = !0;
						}
					}
					null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
				} else y = {
					eventTime: y,
					lane: r,
					tag: h.tag,
					payload: h.payload,
					callback: h.callback,
					next: null
				}, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
				h = h.next;
				if (null === h) if (h = e.shared.pending, null === h) break;
				else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
			} while (1);
			null === m && (k = q);
			e.baseState = k;
			e.firstBaseUpdate = l;
			e.lastBaseUpdate = m;
			b = e.shared.interleaved;
			if (null !== b) {
				e = b;
				do
					g |= e.lane, e = e.next;
				while (e !== b);
			} else null === f && (e.shared.lanes = 0);
			rh |= g;
			a.lanes = g;
			a.memoizedState = q;
		}
	}
	function sh(a, b, c) {
		a = b.effects;
		b.effects = null;
		if (null !== a) for (b = 0; b < a.length; b++) {
			var d = a[b], e = d.callback;
			if (null !== e) {
				d.callback = null;
				d = c;
				if ("function" !== typeof e) throw Error(p(191, e));
				e.call(d);
			}
		}
	}
	var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
	function xh(a) {
		if (a === th) throw Error(p(174));
		return a;
	}
	function yh(a, b) {
		G(wh, b);
		G(vh, a);
		G(uh, th);
		a = b.nodeType;
		switch (a) {
			case 9:
			case 11:
				b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
				break;
			default: a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
		}
		E(uh);
		G(uh, b);
	}
	function zh() {
		E(uh);
		E(vh);
		E(wh);
	}
	function Ah(a) {
		xh(wh.current);
		var b = xh(uh.current);
		var c = lb(b, a.type);
		b !== c && (G(vh, a), G(uh, c));
	}
	function Bh(a) {
		vh.current === a && (E(uh), E(vh));
	}
	var L = Uf(0);
	function Ch(a) {
		for (var b = a; null !== b;) {
			if (13 === b.tag) {
				var c = b.memoizedState;
				if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
			} else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
				if (0 !== (b.flags & 128)) return b;
			} else if (null !== b.child) {
				b.child.return = b;
				b = b.child;
				continue;
			}
			if (b === a) break;
			for (; null === b.sibling;) {
				if (null === b.return || b.return === a) return null;
				b = b.return;
			}
			b.sibling.return = b.return;
			b = b.sibling;
		}
		return null;
	}
	var Dh = [];
	function Eh() {
		for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
		Dh.length = 0;
	}
	var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = !1, Jh = !1, Kh = 0, Lh = 0;
	function P() {
		throw Error(p(321));
	}
	function Mh(a, b) {
		if (null === b) return !1;
		for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;
		return !0;
	}
	function Nh(a, b, c, d, e, f) {
		Hh = f;
		M = b;
		b.memoizedState = null;
		b.updateQueue = null;
		b.lanes = 0;
		Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
		a = c(d, e);
		if (Jh) {
			f = 0;
			do {
				Jh = !1;
				Kh = 0;
				if (25 <= f) throw Error(p(301));
				f += 1;
				O = N = null;
				b.updateQueue = null;
				Fh.current = Qh;
				a = c(d, e);
			} while (Jh);
		}
		Fh.current = Rh;
		b = null !== N && null !== N.next;
		Hh = 0;
		O = N = M = null;
		Ih = !1;
		if (b) throw Error(p(300));
		return a;
	}
	function Sh() {
		var a = 0 !== Kh;
		Kh = 0;
		return a;
	}
	function Th() {
		var a = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		null === O ? M.memoizedState = O = a : O = O.next = a;
		return O;
	}
	function Uh() {
		if (null === N) {
			var a = M.alternate;
			a = null !== a ? a.memoizedState : null;
		} else a = N.next;
		var b = null === O ? M.memoizedState : O.next;
		if (null !== b) O = b, N = a;
		else {
			if (null === a) throw Error(p(310));
			N = a;
			a = {
				memoizedState: N.memoizedState,
				baseState: N.baseState,
				baseQueue: N.baseQueue,
				queue: N.queue,
				next: null
			};
			null === O ? M.memoizedState = O = a : O = O.next = a;
		}
		return O;
	}
	function Vh(a, b) {
		return "function" === typeof b ? b(a) : b;
	}
	function Wh(a) {
		var b = Uh(), c = b.queue;
		if (null === c) throw Error(p(311));
		c.lastRenderedReducer = a;
		var d = N, e = d.baseQueue, f = c.pending;
		if (null !== f) {
			if (null !== e) {
				var g = e.next;
				e.next = f.next;
				f.next = g;
			}
			d.baseQueue = e = f;
			c.pending = null;
		}
		if (null !== e) {
			f = e.next;
			d = d.baseState;
			var h = g = null, k = null, l = f;
			do {
				var m = l.lane;
				if ((Hh & m) === m) null !== k && (k = k.next = {
					lane: 0,
					action: l.action,
					hasEagerState: l.hasEagerState,
					eagerState: l.eagerState,
					next: null
				}), d = l.hasEagerState ? l.eagerState : a(d, l.action);
				else {
					var q = {
						lane: m,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					};
					null === k ? (h = k = q, g = d) : k = k.next = q;
					M.lanes |= m;
					rh |= m;
				}
				l = l.next;
			} while (null !== l && l !== f);
			null === k ? g = d : k.next = h;
			He(d, b.memoizedState) || (dh = !0);
			b.memoizedState = d;
			b.baseState = g;
			b.baseQueue = k;
			c.lastRenderedState = d;
		}
		a = c.interleaved;
		if (null !== a) {
			e = a;
			do
				f = e.lane, M.lanes |= f, rh |= f, e = e.next;
			while (e !== a);
		} else null === e && (c.lanes = 0);
		return [b.memoizedState, c.dispatch];
	}
	function Xh(a) {
		var b = Uh(), c = b.queue;
		if (null === c) throw Error(p(311));
		c.lastRenderedReducer = a;
		var d = c.dispatch, e = c.pending, f = b.memoizedState;
		if (null !== e) {
			c.pending = null;
			var g = e = e.next;
			do
				f = a(f, g.action), g = g.next;
			while (g !== e);
			He(f, b.memoizedState) || (dh = !0);
			b.memoizedState = f;
			null === b.baseQueue && (b.baseState = f);
			c.lastRenderedState = f;
		}
		return [f, d];
	}
	function Yh() {}
	function Zh(a, b) {
		var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
		f && (d.memoizedState = e, dh = !0);
		d = d.queue;
		$h(ai.bind(null, c, d, a), [a]);
		if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
			c.flags |= 2048;
			bi(9, ci.bind(null, c, d, e, b), void 0, null);
			if (null === Q) throw Error(p(349));
			0 !== (Hh & 30) || di(c, b, e);
		}
		return e;
	}
	function di(a, b, c) {
		a.flags |= 16384;
		a = {
			getSnapshot: b,
			value: c
		};
		b = M.updateQueue;
		null === b ? (b = {
			lastEffect: null,
			stores: null
		}, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
	}
	function ci(a, b, c, d) {
		b.value = c;
		b.getSnapshot = d;
		ei(b) && fi(a);
	}
	function ai(a, b, c) {
		return c(function() {
			ei(b) && fi(a);
		});
	}
	function ei(a) {
		var b = a.getSnapshot;
		a = a.value;
		try {
			var c = b();
			return !He(a, c);
		} catch (d) {
			return !0;
		}
	}
	function fi(a) {
		var b = ih(a, 1);
		null !== b && gi(b, a, 1, -1);
	}
	function hi(a) {
		var b = Th();
		"function" === typeof a && (a = a());
		b.memoizedState = b.baseState = a;
		a = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Vh,
			lastRenderedState: a
		};
		b.queue = a;
		a = a.dispatch = ii.bind(null, M, a);
		return [b.memoizedState, a];
	}
	function bi(a, b, c, d) {
		a = {
			tag: a,
			create: b,
			destroy: c,
			deps: d,
			next: null
		};
		b = M.updateQueue;
		null === b ? (b = {
			lastEffect: null,
			stores: null
		}, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
		return a;
	}
	function ji() {
		return Uh().memoizedState;
	}
	function ki(a, b, c, d) {
		var e = Th();
		M.flags |= a;
		e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
	}
	function li(a, b, c, d) {
		var e = Uh();
		d = void 0 === d ? null : d;
		var f = void 0;
		if (null !== N) {
			var g = N.memoizedState;
			f = g.destroy;
			if (null !== d && Mh(d, g.deps)) {
				e.memoizedState = bi(b, c, f, d);
				return;
			}
		}
		M.flags |= a;
		e.memoizedState = bi(1 | b, c, f, d);
	}
	function mi(a, b) {
		return ki(8390656, 8, a, b);
	}
	function $h(a, b) {
		return li(2048, 8, a, b);
	}
	function ni(a, b) {
		return li(4, 2, a, b);
	}
	function oi(a, b) {
		return li(4, 4, a, b);
	}
	function pi(a, b) {
		if ("function" === typeof b) return a = a(), b(a), function() {
			b(null);
		};
		if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
			b.current = null;
		};
	}
	function qi(a, b, c) {
		c = null !== c && void 0 !== c ? c.concat([a]) : null;
		return li(4, 4, pi.bind(null, b, a), c);
	}
	function ri() {}
	function si(a, b) {
		var c = Uh();
		b = void 0 === b ? null : b;
		var d = c.memoizedState;
		if (null !== d && null !== b && Mh(b, d[1])) return d[0];
		c.memoizedState = [a, b];
		return a;
	}
	function ti(a, b) {
		var c = Uh();
		b = void 0 === b ? null : b;
		var d = c.memoizedState;
		if (null !== d && null !== b && Mh(b, d[1])) return d[0];
		a = a();
		c.memoizedState = [a, b];
		return a;
	}
	function ui(a, b, c) {
		if (0 === (Hh & 21)) return a.baseState && (a.baseState = !1, dh = !0), a.memoizedState = c;
		He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = !0);
		return b;
	}
	function vi(a, b) {
		var c = C;
		C = 0 !== c && 4 > c ? c : 4;
		a(!0);
		var d = Gh.transition;
		Gh.transition = {};
		try {
			a(!1), b();
		} finally {
			C = c, Gh.transition = d;
		}
	}
	function wi() {
		return Uh().memoizedState;
	}
	function xi(a, b, c) {
		var d = yi(a);
		c = {
			lane: d,
			action: c,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zi(a)) Ai(b, c);
		else if (c = hh(a, b, c, d), null !== c) {
			var e = R();
			gi(c, a, d, e);
			Bi(c, b, d);
		}
	}
	function ii(a, b, c) {
		var d = yi(a), e = {
			lane: d,
			action: c,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zi(a)) Ai(b, e);
		else {
			var f = a.alternate;
			if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
				var g = b.lastRenderedState, h = f(g, c);
				e.hasEagerState = !0;
				e.eagerState = h;
				if (He(h, g)) {
					var k = b.interleaved;
					null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
					b.interleaved = e;
					return;
				}
			} catch (l) {}
			c = hh(a, b, e, d);
			null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
		}
	}
	function zi(a) {
		var b = a.alternate;
		return a === M || null !== b && b === M;
	}
	function Ai(a, b) {
		Jh = Ih = !0;
		var c = a.pending;
		null === c ? b.next = b : (b.next = c.next, c.next = b);
		a.pending = b;
	}
	function Bi(a, b, c) {
		if (0 !== (c & 4194240)) {
			var d = b.lanes;
			d &= a.pendingLanes;
			c |= d;
			b.lanes = c;
			Cc(a, c);
		}
	}
	var Rh = {
		readContext: eh,
		useCallback: P,
		useContext: P,
		useEffect: P,
		useImperativeHandle: P,
		useInsertionEffect: P,
		useLayoutEffect: P,
		useMemo: P,
		useReducer: P,
		useRef: P,
		useState: P,
		useDebugValue: P,
		useDeferredValue: P,
		useTransition: P,
		useMutableSource: P,
		useSyncExternalStore: P,
		useId: P,
		unstable_isNewReconciler: !1
	}, Oh = {
		readContext: eh,
		useCallback: function(a, b) {
			Th().memoizedState = [a, void 0 === b ? null : b];
			return a;
		},
		useContext: eh,
		useEffect: mi,
		useImperativeHandle: function(a, b, c) {
			c = null !== c && void 0 !== c ? c.concat([a]) : null;
			return ki(4194308, 4, pi.bind(null, b, a), c);
		},
		useLayoutEffect: function(a, b) {
			return ki(4194308, 4, a, b);
		},
		useInsertionEffect: function(a, b) {
			return ki(4, 2, a, b);
		},
		useMemo: function(a, b) {
			var c = Th();
			b = void 0 === b ? null : b;
			a = a();
			c.memoizedState = [a, b];
			return a;
		},
		useReducer: function(a, b, c) {
			var d = Th();
			b = void 0 !== c ? c(b) : b;
			d.memoizedState = d.baseState = b;
			a = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: a,
				lastRenderedState: b
			};
			d.queue = a;
			a = a.dispatch = xi.bind(null, M, a);
			return [d.memoizedState, a];
		},
		useRef: function(a) {
			var b = Th();
			a = { current: a };
			return b.memoizedState = a;
		},
		useState: hi,
		useDebugValue: ri,
		useDeferredValue: function(a) {
			return Th().memoizedState = a;
		},
		useTransition: function() {
			var a = hi(!1), b = a[0];
			a = vi.bind(null, a[1]);
			Th().memoizedState = a;
			return [b, a];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(a, b, c) {
			var d = M, e = Th();
			if (I) {
				if (void 0 === c) throw Error(p(407));
				c = c();
			} else {
				c = b();
				if (null === Q) throw Error(p(349));
				0 !== (Hh & 30) || di(d, b, c);
			}
			e.memoizedState = c;
			var f = {
				value: c,
				getSnapshot: b
			};
			e.queue = f;
			mi(ai.bind(null, d, f, a), [a]);
			d.flags |= 2048;
			bi(9, ci.bind(null, d, f, c, b), void 0, null);
			return c;
		},
		useId: function() {
			var a = Th(), b = Q.identifierPrefix;
			if (I) {
				var c = sg;
				var d = rg;
				c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
				b = ":" + b + "R" + c;
				c = Kh++;
				0 < c && (b += "H" + c.toString(32));
				b += ":";
			} else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
			return a.memoizedState = b;
		},
		unstable_isNewReconciler: !1
	}, Ph = {
		readContext: eh,
		useCallback: si,
		useContext: eh,
		useEffect: $h,
		useImperativeHandle: qi,
		useInsertionEffect: ni,
		useLayoutEffect: oi,
		useMemo: ti,
		useReducer: Wh,
		useRef: ji,
		useState: function() {
			return Wh(Vh);
		},
		useDebugValue: ri,
		useDeferredValue: function(a) {
			return ui(Uh(), N.memoizedState, a);
		},
		useTransition: function() {
			return [Wh(Vh)[0], Uh().memoizedState];
		},
		useMutableSource: Yh,
		useSyncExternalStore: Zh,
		useId: wi,
		unstable_isNewReconciler: !1
	}, Qh = {
		readContext: eh,
		useCallback: si,
		useContext: eh,
		useEffect: $h,
		useImperativeHandle: qi,
		useInsertionEffect: ni,
		useLayoutEffect: oi,
		useMemo: ti,
		useReducer: Xh,
		useRef: ji,
		useState: function() {
			return Xh(Vh);
		},
		useDebugValue: ri,
		useDeferredValue: function(a) {
			var b = Uh();
			return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
		},
		useTransition: function() {
			return [Xh(Vh)[0], Uh().memoizedState];
		},
		useMutableSource: Yh,
		useSyncExternalStore: Zh,
		useId: wi,
		unstable_isNewReconciler: !1
	};
	function Ci(a, b) {
		if (a && a.defaultProps) {
			b = A({}, b);
			a = a.defaultProps;
			for (var c in a) void 0 === b[c] && (b[c] = a[c]);
			return b;
		}
		return b;
	}
	function Di(a, b, c, d) {
		b = a.memoizedState;
		c = c(d, b);
		c = null === c || void 0 === c ? b : A({}, b, c);
		a.memoizedState = c;
		0 === a.lanes && (a.updateQueue.baseState = c);
	}
	var Ei = {
		isMounted: function(a) {
			return (a = a._reactInternals) ? Vb(a) === a : !1;
		},
		enqueueSetState: function(a, b, c) {
			a = a._reactInternals;
			var d = R(), e = yi(a), f = mh(d, e);
			f.payload = b;
			void 0 !== c && null !== c && (f.callback = c);
			b = nh(a, f, e);
			null !== b && (gi(b, a, e, d), oh(b, a, e));
		},
		enqueueReplaceState: function(a, b, c) {
			a = a._reactInternals;
			var d = R(), e = yi(a), f = mh(d, e);
			f.tag = 1;
			f.payload = b;
			void 0 !== c && null !== c && (f.callback = c);
			b = nh(a, f, e);
			null !== b && (gi(b, a, e, d), oh(b, a, e));
		},
		enqueueForceUpdate: function(a, b) {
			a = a._reactInternals;
			var c = R(), d = yi(a), e = mh(c, d);
			e.tag = 2;
			void 0 !== b && null !== b && (e.callback = b);
			b = nh(a, e, d);
			null !== b && (gi(b, a, d, c), oh(b, a, d));
		}
	};
	function Fi(a, b, c, d, e, f, g) {
		a = a.stateNode;
		return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
	}
	function Gi(a, b, c) {
		var d = !1, e = Vf;
		var f = b.contextType;
		"object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
		b = new b(c, f);
		a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
		b.updater = Ei;
		a.stateNode = b;
		b._reactInternals = a;
		d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
		return b;
	}
	function Hi(a, b, c, d) {
		a = b.state;
		"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
		"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
		b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
	}
	function Ii(a, b, c, d) {
		var e = a.stateNode;
		e.props = c;
		e.state = a.memoizedState;
		e.refs = {};
		kh(a);
		var f = b.contextType;
		"object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
		e.state = a.memoizedState;
		f = b.getDerivedStateFromProps;
		"function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
		"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
		"function" === typeof e.componentDidMount && (a.flags |= 4194308);
	}
	function Ji(a, b) {
		try {
			var c = "", d = b;
			do
				c += Pa(d), d = d.return;
			while (d);
			var e = c;
		} catch (f) {
			e = "\nError generating stack: " + f.message + "\n" + f.stack;
		}
		return {
			value: a,
			source: b,
			stack: e,
			digest: null
		};
	}
	function Ki(a, b, c) {
		return {
			value: a,
			source: null,
			stack: null != c ? c : null,
			digest: null != b ? b : null
		};
	}
	function Li(a, b) {
		try {
			console.error(b.value);
		} catch (c) {
			setTimeout(function() {
				throw c;
			});
		}
	}
	var Mi = "function" === typeof WeakMap ? WeakMap : Map;
	function Ni(a, b, c) {
		c = mh(-1, c);
		c.tag = 3;
		c.payload = { element: null };
		var d = b.value;
		c.callback = function() {
			Oi || (Oi = !0, Pi = d);
			Li(a, b);
		};
		return c;
	}
	function Qi(a, b, c) {
		c = mh(-1, c);
		c.tag = 3;
		var d = a.type.getDerivedStateFromError;
		if ("function" === typeof d) {
			var e = b.value;
			c.payload = function() {
				return d(e);
			};
			c.callback = function() {
				Li(a, b);
			};
		}
		var f = a.stateNode;
		null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
			Li(a, b);
			"function" !== typeof d && (null === Ri ? Ri = new Set([this]) : Ri.add(this));
			var c = b.stack;
			this.componentDidCatch(b.value, { componentStack: null !== c ? c : "" });
		});
		return c;
	}
	function Si(a, b, c) {
		var d = a.pingCache;
		if (null === d) {
			d = a.pingCache = new Mi();
			var e = /* @__PURE__ */ new Set();
			d.set(b, e);
		} else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
		e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
	}
	function Ui(a) {
		do {
			var b;
			if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
			if (b) return a;
			a = a.return;
		} while (null !== a);
		return null;
	}
	function Vi(a, b, c, d, e) {
		if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
		a.flags |= 65536;
		a.lanes = e;
		return a;
	}
	var Wi = ua.ReactCurrentOwner, dh = !1;
	function Xi(a, b, c, d) {
		b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
	}
	function Yi(a, b, c, d, e) {
		c = c.render;
		var f = b.ref;
		ch(b, e);
		d = Nh(a, b, c, d, f, e);
		c = Sh();
		if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
		I && c && vg(b);
		b.flags |= 1;
		Xi(a, b, d, e);
		return b.child;
	}
	function $i(a, b, c, d, e) {
		if (null === a) {
			var f = c.type;
			if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
			a = Rg(c.type, null, d, b, b.mode, e);
			a.ref = b.ref;
			a.return = b;
			return b.child = a;
		}
		f = a.child;
		if (0 === (a.lanes & e)) {
			var g = f.memoizedProps;
			c = c.compare;
			c = null !== c ? c : Ie;
			if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
		}
		b.flags |= 1;
		a = Pg(f, d);
		a.ref = b.ref;
		a.return = b;
		return b.child = a;
	}
	function bj(a, b, c, d, e) {
		if (null !== a) {
			var f = a.memoizedProps;
			if (Ie(f, d) && a.ref === b.ref) if (dh = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = !0);
			else return b.lanes = a.lanes, Zi(a, b, e);
		}
		return cj(a, b, c, d, e);
	}
	function dj(a, b, c) {
		var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
		if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = {
			baseLanes: 0,
			cachePool: null,
			transitions: null
		}, G(ej, fj), fj |= c;
		else {
			if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
				baseLanes: a,
				cachePool: null,
				transitions: null
			}, b.updateQueue = null, G(ej, fj), fj |= a, null;
			b.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			};
			d = null !== f ? f.baseLanes : c;
			G(ej, fj);
			fj |= d;
		}
		else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
		Xi(a, b, e, c);
		return b.child;
	}
	function gj(a, b) {
		var c = b.ref;
		if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
	}
	function cj(a, b, c, d, e) {
		var f = Zf(c) ? Xf : H.current;
		f = Yf(b, f);
		ch(b, e);
		c = Nh(a, b, c, d, f, e);
		d = Sh();
		if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
		I && d && vg(b);
		b.flags |= 1;
		Xi(a, b, c, e);
		return b.child;
	}
	function hj(a, b, c, d, e) {
		if (Zf(c)) {
			var f = !0;
			cg(b);
		} else f = !1;
		ch(b, e);
		if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = !0;
		else if (null === a) {
			var g = b.stateNode, h = b.memoizedProps;
			g.props = h;
			var k = g.context, l = c.contextType;
			"object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
			var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
			q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
			jh = !1;
			var r = b.memoizedState;
			g.state = r;
			qh(b, d, g, e);
			k = b.memoizedState;
			h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
		} else {
			g = b.stateNode;
			lh(a, b);
			h = b.memoizedProps;
			l = b.type === b.elementType ? h : Ci(b.type, h);
			g.props = l;
			q = b.pendingProps;
			r = g.context;
			k = c.contextType;
			"object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
			var y = c.getDerivedStateFromProps;
			(m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
			jh = !1;
			r = b.memoizedState;
			g.state = r;
			qh(b, d, g, e);
			var n = b.memoizedState;
			h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
		}
		return jj(a, b, c, d, f, e);
	}
	function jj(a, b, c, d, e, f) {
		gj(a, b);
		var g = 0 !== (b.flags & 128);
		if (!d && !g) return e && dg(b, c, !1), Zi(a, b, f);
		d = b.stateNode;
		Wi.current = b;
		var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
		b.flags |= 1;
		null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
		b.memoizedState = d.state;
		e && dg(b, c, !0);
		return b.child;
	}
	function kj(a) {
		var b = a.stateNode;
		b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
		yh(a, b.containerInfo);
	}
	function lj(a, b, c, d, e) {
		Ig();
		Jg(e);
		b.flags |= 256;
		Xi(a, b, c, d);
		return b.child;
	}
	var mj = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function nj(a) {
		return {
			baseLanes: a,
			cachePool: null,
			transitions: null
		};
	}
	function oj(a, b, c) {
		var d = b.pendingProps, e = L.current, f = !1, g = 0 !== (b.flags & 128), h;
		(h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
		if (h) f = !0, b.flags &= -129;
		else if (null === a || null !== a.memoizedState) e |= 1;
		G(L, e & 1);
		if (null === a) {
			Eg(b);
			a = b.memoizedState;
			if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
			g = d.children;
			a = d.fallback;
			return f ? (d = b.mode, f = b.child, g = {
				mode: "hidden",
				children: g
			}, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
		}
		e = a.memoizedState;
		if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
		if (f) {
			f = d.fallback;
			g = b.mode;
			e = a.child;
			h = e.sibling;
			var k = {
				mode: "hidden",
				children: d.children
			};
			0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
			null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
			f.return = b;
			d.return = b;
			d.sibling = f;
			b.child = d;
			d = f;
			f = b.child;
			g = a.child.memoizedState;
			g = null === g ? nj(c) : {
				baseLanes: g.baseLanes | c,
				cachePool: null,
				transitions: g.transitions
			};
			f.memoizedState = g;
			f.childLanes = a.childLanes & ~c;
			b.memoizedState = mj;
			return d;
		}
		f = a.child;
		a = f.sibling;
		d = Pg(f, {
			mode: "visible",
			children: d.children
		});
		0 === (b.mode & 1) && (d.lanes = c);
		d.return = b;
		d.sibling = null;
		null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
		b.child = d;
		b.memoizedState = null;
		return d;
	}
	function qj(a, b) {
		b = pj({
			mode: "visible",
			children: b
		}, a.mode, 0, null);
		b.return = a;
		return a.child = b;
	}
	function sj(a, b, c, d) {
		null !== d && Jg(d);
		Ug(b, a.child, null, c);
		a = qj(b, b.pendingProps.children);
		a.flags |= 2;
		b.memoizedState = null;
		return a;
	}
	function rj(a, b, c, d, e, f, g) {
		if (c) {
			if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
			if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
			f = d.fallback;
			e = b.mode;
			d = pj({
				mode: "visible",
				children: d.children
			}, e, 0, null);
			f = Tg(f, e, g, null);
			f.flags |= 2;
			d.return = b;
			f.return = b;
			d.sibling = f;
			b.child = d;
			0 !== (b.mode & 1) && Ug(b, a.child, null, g);
			b.child.memoizedState = nj(g);
			b.memoizedState = mj;
			return f;
		}
		if (0 === (b.mode & 1)) return sj(a, b, g, null);
		if ("$!" === e.data) {
			d = e.nextSibling && e.nextSibling.dataset;
			if (d) var h = d.dgst;
			d = h;
			f = Error(p(419));
			d = Ki(f, d, void 0);
			return sj(a, b, g, d);
		}
		h = 0 !== (g & a.childLanes);
		if (dh || h) {
			d = Q;
			if (null !== d) {
				switch (g & -g) {
					case 4:
						e = 2;
						break;
					case 16:
						e = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						e = 32;
						break;
					case 536870912:
						e = 268435456;
						break;
					default: e = 0;
				}
				e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
				0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
			}
			tj();
			d = Ki(Error(p(421)));
			return sj(a, b, g, d);
		}
		if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
		a = f.treeContext;
		yg = Lf(e.nextSibling);
		xg = b;
		I = !0;
		zg = null;
		null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
		b = qj(b, d.children);
		b.flags |= 4096;
		return b;
	}
	function vj(a, b, c) {
		a.lanes |= b;
		var d = a.alternate;
		null !== d && (d.lanes |= b);
		bh(a.return, b, c);
	}
	function wj(a, b, c, d, e) {
		var f = a.memoizedState;
		null === f ? a.memoizedState = {
			isBackwards: b,
			rendering: null,
			renderingStartTime: 0,
			last: d,
			tail: c,
			tailMode: e
		} : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
	}
	function xj(a, b, c) {
		var d = b.pendingProps, e = d.revealOrder, f = d.tail;
		Xi(a, b, d.children, c);
		d = L.current;
		if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
		else {
			if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
				if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
				else if (19 === a.tag) vj(a, c, b);
				else if (null !== a.child) {
					a.child.return = a;
					a = a.child;
					continue;
				}
				if (a === b) break a;
				for (; null === a.sibling;) {
					if (null === a.return || a.return === b) break a;
					a = a.return;
				}
				a.sibling.return = a.return;
				a = a.sibling;
			}
			d &= 1;
		}
		G(L, d);
		if (0 === (b.mode & 1)) b.memoizedState = null;
		else switch (e) {
			case "forwards":
				c = b.child;
				for (e = null; null !== c;) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
				c = e;
				null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
				wj(b, !1, e, c, f);
				break;
			case "backwards":
				c = null;
				e = b.child;
				for (b.child = null; null !== e;) {
					a = e.alternate;
					if (null !== a && null === Ch(a)) {
						b.child = e;
						break;
					}
					a = e.sibling;
					e.sibling = c;
					c = e;
					e = a;
				}
				wj(b, !0, c, null, f);
				break;
			case "together":
				wj(b, !1, null, null, void 0);
				break;
			default: b.memoizedState = null;
		}
		return b.child;
	}
	function ij(a, b) {
		0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
	}
	function Zi(a, b, c) {
		null !== a && (b.dependencies = a.dependencies);
		rh |= b.lanes;
		if (0 === (c & b.childLanes)) return null;
		if (null !== a && b.child !== a.child) throw Error(p(153));
		if (null !== b.child) {
			a = b.child;
			c = Pg(a, a.pendingProps);
			b.child = c;
			for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
			c.sibling = null;
		}
		return b.child;
	}
	function yj(a, b, c) {
		switch (b.tag) {
			case 3:
				kj(b);
				Ig();
				break;
			case 5:
				Ah(b);
				break;
			case 1:
				Zf(b.type) && cg(b);
				break;
			case 4:
				yh(b, b.stateNode.containerInfo);
				break;
			case 10:
				var d = b.type._context, e = b.memoizedProps.value;
				G(Wg, d._currentValue);
				d._currentValue = e;
				break;
			case 13:
				d = b.memoizedState;
				if (null !== d) {
					if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
					if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
					G(L, L.current & 1);
					a = Zi(a, b, c);
					return null !== a ? a.sibling : null;
				}
				G(L, L.current & 1);
				break;
			case 19:
				d = 0 !== (c & b.childLanes);
				if (0 !== (a.flags & 128)) {
					if (d) return xj(a, b, c);
					b.flags |= 128;
				}
				e = b.memoizedState;
				null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
				G(L, L.current);
				if (d) break;
				else return null;
			case 22:
			case 23: return b.lanes = 0, dj(a, b, c);
		}
		return Zi(a, b, c);
	}
	var zj = function(a, b) {
		for (var c = b.child; null !== c;) {
			if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
			else if (4 !== c.tag && null !== c.child) {
				c.child.return = c;
				c = c.child;
				continue;
			}
			if (c === b) break;
			for (; null === c.sibling;) {
				if (null === c.return || c.return === b) return;
				c = c.return;
			}
			c.sibling.return = c.return;
			c = c.sibling;
		}
	}, Bj = function(a, b, c, d) {
		var e = a.memoizedProps;
		if (e !== d) {
			a = b.stateNode;
			xh(uh.current);
			var f = null;
			switch (c) {
				case "input":
					e = Ya(a, e);
					d = Ya(a, d);
					f = [];
					break;
				case "select":
					e = A({}, e, { value: void 0 });
					d = A({}, d, { value: void 0 });
					f = [];
					break;
				case "textarea":
					e = gb(a, e);
					d = gb(a, d);
					f = [];
					break;
				default: "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
			}
			ub(c, d);
			var g;
			c = null;
			for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
				var h = e[l];
				for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
			} else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
			for (l in d) {
				var k = d[l];
				h = null != e ? e[l] : void 0;
				if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
					for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
					for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
				} else c || (f || (f = []), f.push(l, c)), c = k;
				else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
			}
			c && (f = f || []).push("style", c);
			var l = f;
			if (b.updateQueue = l) b.flags |= 4;
		}
	}, Cj = function(a, b, c, d) {
		c !== d && (b.flags |= 4);
	};
	function Dj(a, b) {
		if (!I) switch (a.tailMode) {
			case "hidden":
				b = a.tail;
				for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
				null === c ? a.tail = null : c.sibling = null;
				break;
			case "collapsed":
				c = a.tail;
				for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
				null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
		}
	}
	function S(a) {
		var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
		if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
		else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
		a.subtreeFlags |= d;
		a.childLanes = c;
		return b;
	}
	function Ej(a, b, c) {
		var d = b.pendingProps;
		wg(b);
		switch (b.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return S(b), null;
			case 1: return Zf(b.type) && $f(), S(b), null;
			case 3:
				d = b.stateNode;
				zh();
				E(Wf);
				E(H);
				Eh();
				d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
				if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
				S(b);
				return null;
			case 5:
				Bh(b);
				var e = xh(wh.current);
				c = b.type;
				if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
				else {
					if (!d) {
						if (null === b.stateNode) throw Error(p(166));
						S(b);
						return null;
					}
					a = xh(uh.current);
					if (Gg(b)) {
						d = b.stateNode;
						c = b.type;
						var f = b.memoizedProps;
						d[Of] = b;
						d[Pf] = f;
						a = 0 !== (b.mode & 1);
						switch (c) {
							case "dialog":
								D("cancel", d);
								D("close", d);
								break;
							case "iframe":
							case "object":
							case "embed":
								D("load", d);
								break;
							case "video":
							case "audio":
								for (e = 0; e < lf.length; e++) D(lf[e], d);
								break;
							case "source":
								D("error", d);
								break;
							case "img":
							case "image":
							case "link":
								D("error", d);
								D("load", d);
								break;
							case "details":
								D("toggle", d);
								break;
							case "input":
								Za(d, f);
								D("invalid", d);
								break;
							case "select":
								d._wrapperState = { wasMultiple: !!f.multiple };
								D("invalid", d);
								break;
							case "textarea": hb(d, f), D("invalid", d);
						}
						ub(c, f);
						e = null;
						for (var g in f) if (f.hasOwnProperty(g)) {
							var h = f[g];
							"children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
						}
						switch (c) {
							case "input":
								Va(d);
								db(d, f, !0);
								break;
							case "textarea":
								Va(d);
								jb(d);
								break;
							case "select":
							case "option": break;
							default: "function" === typeof f.onClick && (d.onclick = Bf);
						}
						d = e;
						b.updateQueue = d;
						null !== d && (b.flags |= 4);
					} else {
						g = 9 === e.nodeType ? e : e.ownerDocument;
						"http://www.w3.org/1999/xhtml" === a && (a = kb(c));
						"http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
						a[Of] = b;
						a[Pf] = d;
						zj(a, b, !1, !1);
						b.stateNode = a;
						a: {
							g = vb(c, d);
							switch (c) {
								case "dialog":
									D("cancel", a);
									D("close", a);
									e = d;
									break;
								case "iframe":
								case "object":
								case "embed":
									D("load", a);
									e = d;
									break;
								case "video":
								case "audio":
									for (e = 0; e < lf.length; e++) D(lf[e], a);
									e = d;
									break;
								case "source":
									D("error", a);
									e = d;
									break;
								case "img":
								case "image":
								case "link":
									D("error", a);
									D("load", a);
									e = d;
									break;
								case "details":
									D("toggle", a);
									e = d;
									break;
								case "input":
									Za(a, d);
									e = Ya(a, d);
									D("invalid", a);
									break;
								case "option":
									e = d;
									break;
								case "select":
									a._wrapperState = { wasMultiple: !!d.multiple };
									e = A({}, d, { value: void 0 });
									D("invalid", a);
									break;
								case "textarea":
									hb(a, d);
									e = gb(a, d);
									D("invalid", a);
									break;
								default: e = d;
							}
							ub(c, e);
							h = e;
							for (f in h) if (h.hasOwnProperty(f)) {
								var k = h[f];
								"style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
							}
							switch (c) {
								case "input":
									Va(a);
									db(a, d, !1);
									break;
								case "textarea":
									Va(a);
									jb(a);
									break;
								case "option":
									null != d.value && a.setAttribute("value", "" + Sa(d.value));
									break;
								case "select":
									a.multiple = !!d.multiple;
									f = d.value;
									null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
									break;
								default: "function" === typeof e.onClick && (a.onclick = Bf);
							}
							switch (c) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									d = !!d.autoFocus;
									break a;
								case "img":
									d = !0;
									break a;
								default: d = !1;
							}
						}
						d && (b.flags |= 4);
					}
					null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
				}
				S(b);
				return null;
			case 6:
				if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
				else {
					if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
					c = xh(wh.current);
					xh(uh.current);
					if (Gg(b)) {
						d = b.stateNode;
						c = b.memoizedProps;
						d[Of] = b;
						if (f = d.nodeValue !== c) {
							if (a = xg, null !== a) switch (a.tag) {
								case 3:
									Af(d.nodeValue, c, 0 !== (a.mode & 1));
									break;
								case 5: !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
							}
						}
						f && (b.flags |= 4);
					} else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
				}
				S(b);
				return null;
			case 13:
				E(L);
				d = b.memoizedState;
				if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
					if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = !1;
					else if (f = Gg(b), null !== d && null !== d.dehydrated) {
						if (null === a) {
							if (!f) throw Error(p(318));
							f = b.memoizedState;
							f = null !== f ? f.dehydrated : null;
							if (!f) throw Error(p(317));
							f[Of] = b;
						} else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
						S(b);
						f = !1;
					} else null !== zg && (Fj(zg), zg = null), f = !0;
					if (!f) return b.flags & 65536 ? b : null;
				}
				if (0 !== (b.flags & 128)) return b.lanes = c, b;
				d = null !== d;
				d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
				null !== b.updateQueue && (b.flags |= 4);
				S(b);
				return null;
			case 4: return zh(), null === a && sf(b.stateNode.containerInfo), S(b), null;
			case 10: return ah(b.type._context), S(b), null;
			case 17: return Zf(b.type) && $f(), S(b), null;
			case 19:
				E(L);
				f = b.memoizedState;
				if (null === f) return S(b), null;
				d = 0 !== (b.flags & 128);
				g = f.rendering;
				if (null === g) if (d) Dj(f, !1);
				else {
					if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
						g = Ch(a);
						if (null !== g) {
							b.flags |= 128;
							Dj(f, !1);
							d = g.updateQueue;
							null !== d && (b.updateQueue = d, b.flags |= 4);
							b.subtreeFlags = 0;
							d = c;
							for (c = b.child; null !== c;) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
								lanes: a.lanes,
								firstContext: a.firstContext
							}), c = c.sibling;
							G(L, L.current & 1 | 2);
							return b.child;
						}
						a = a.sibling;
					}
					null !== f.tail && B() > Gj && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
				}
				else {
					if (!d) if (a = Ch(g), null !== a) {
						if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
					} else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
					f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
				}
				if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
				S(b);
				return null;
			case 22:
			case 23: return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(p(156, b.tag));
	}
	function Ij(a, b) {
		wg(b);
		switch (b.tag) {
			case 1: return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
			case 3: return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
			case 5: return Bh(b), null;
			case 13:
				E(L);
				a = b.memoizedState;
				if (null !== a && null !== a.dehydrated) {
					if (null === b.alternate) throw Error(p(340));
					Ig();
				}
				a = b.flags;
				return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
			case 19: return E(L), null;
			case 4: return zh(), null;
			case 10: return ah(b.type._context), null;
			case 22:
			case 23: return Hj(), null;
			case 24: return null;
			default: return null;
		}
	}
	var Jj = !1, U = !1, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
	function Lj(a, b) {
		var c = a.ref;
		if (null !== c) if ("function" === typeof c) try {
			c(null);
		} catch (d) {
			W(a, b, d);
		}
		else c.current = null;
	}
	function Mj(a, b, c) {
		try {
			c();
		} catch (d) {
			W(a, b, d);
		}
	}
	var Nj = !1;
	function Oj(a, b) {
		Cf = dd;
		a = Me();
		if (Ne(a)) {
			if ("selectionStart" in a) var c = {
				start: a.selectionStart,
				end: a.selectionEnd
			};
			else a: {
				c = (c = a.ownerDocument) && c.defaultView || window;
				var d = c.getSelection && c.getSelection();
				if (d && 0 !== d.rangeCount) {
					c = d.anchorNode;
					var e = d.anchorOffset, f = d.focusNode;
					d = d.focusOffset;
					try {
						c.nodeType, f.nodeType;
					} catch (F) {
						c = null;
						break a;
					}
					var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
					b: for (;;) {
						for (var y;;) {
							q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
							q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
							3 === q.nodeType && (g += q.nodeValue.length);
							if (null === (y = q.firstChild)) break;
							r = q;
							q = y;
						}
						for (;;) {
							if (q === a) break b;
							r === c && ++l === e && (h = g);
							r === f && ++m === d && (k = g);
							if (null !== (y = q.nextSibling)) break;
							q = r;
							r = q.parentNode;
						}
						q = y;
					}
					c = -1 === h || -1 === k ? null : {
						start: h,
						end: k
					};
				} else c = null;
			}
			c = c || {
				start: 0,
				end: 0
			};
		} else c = null;
		Df = {
			focusedElem: a,
			selectionRange: c
		};
		dd = !1;
		for (V = b; null !== V;) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
		else for (; null !== V;) {
			b = V;
			try {
				var n = b.alternate;
				if (0 !== (b.flags & 1024)) switch (b.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (null !== n) {
							var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode;
							x.__reactInternalSnapshotBeforeUpdate = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
						}
						break;
					case 3:
						var u = b.stateNode.containerInfo;
						1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(p(163));
				}
			} catch (F) {
				W(b, b.return, F);
			}
			a = b.sibling;
			if (null !== a) {
				a.return = b.return;
				V = a;
				break;
			}
			V = b.return;
		}
		n = Nj;
		Nj = !1;
		return n;
	}
	function Pj(a, b, c) {
		var d = b.updateQueue;
		d = null !== d ? d.lastEffect : null;
		if (null !== d) {
			var e = d = d.next;
			do {
				if ((e.tag & a) === a) {
					var f = e.destroy;
					e.destroy = void 0;
					void 0 !== f && Mj(b, c, f);
				}
				e = e.next;
			} while (e !== d);
		}
	}
	function Qj(a, b) {
		b = b.updateQueue;
		b = null !== b ? b.lastEffect : null;
		if (null !== b) {
			var c = b = b.next;
			do {
				if ((c.tag & a) === a) {
					var d = c.create;
					c.destroy = d();
				}
				c = c.next;
			} while (c !== b);
		}
	}
	function Rj(a) {
		var b = a.ref;
		if (null !== b) {
			var c = a.stateNode;
			switch (a.tag) {
				case 5:
					a = c;
					break;
				default: a = c;
			}
			"function" === typeof b ? b(a) : b.current = a;
		}
	}
	function Sj(a) {
		var b = a.alternate;
		null !== b && (a.alternate = null, Sj(b));
		a.child = null;
		a.deletions = null;
		a.sibling = null;
		5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
		a.stateNode = null;
		a.return = null;
		a.dependencies = null;
		a.memoizedProps = null;
		a.memoizedState = null;
		a.pendingProps = null;
		a.stateNode = null;
		a.updateQueue = null;
	}
	function Tj(a) {
		return 5 === a.tag || 3 === a.tag || 4 === a.tag;
	}
	function Uj(a) {
		a: for (;;) {
			for (; null === a.sibling;) {
				if (null === a.return || Tj(a.return)) return null;
				a = a.return;
			}
			a.sibling.return = a.return;
			for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
				if (a.flags & 2) continue a;
				if (null === a.child || 4 === a.tag) continue a;
				else a.child.return = a, a = a.child;
			}
			if (!(a.flags & 2)) return a.stateNode;
		}
	}
	function Vj(a, b, c) {
		var d = a.tag;
		if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
		else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a;) Vj(a, b, c), a = a.sibling;
	}
	function Wj(a, b, c) {
		var d = a.tag;
		if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
		else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a;) Wj(a, b, c), a = a.sibling;
	}
	var X = null, Xj = !1;
	function Yj(a, b, c) {
		for (c = c.child; null !== c;) Zj(a, b, c), c = c.sibling;
	}
	function Zj(a, b, c) {
		if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
			lc.onCommitFiberUnmount(kc, c);
		} catch (h) {}
		switch (c.tag) {
			case 5: U || Lj(c, b);
			case 6:
				var d = X, e = Xj;
				X = null;
				Yj(a, b, c);
				X = d;
				Xj = e;
				null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
				break;
			case 18:
				null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
				break;
			case 4:
				d = X;
				e = Xj;
				X = c.stateNode.containerInfo;
				Xj = !0;
				Yj(a, b, c);
				X = d;
				Xj = e;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
					e = d = d.next;
					do {
						var f = e, g = f.destroy;
						f = f.tag;
						void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
						e = e.next;
					} while (e !== d);
				}
				Yj(a, b, c);
				break;
			case 1:
				if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
					d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
				} catch (h) {
					W(c, b, h);
				}
				Yj(a, b, c);
				break;
			case 21:
				Yj(a, b, c);
				break;
			case 22:
				c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
				break;
			default: Yj(a, b, c);
		}
	}
	function ak(a) {
		var b = a.updateQueue;
		if (null !== b) {
			a.updateQueue = null;
			var c = a.stateNode;
			null === c && (c = a.stateNode = new Kj());
			b.forEach(function(b) {
				var d = bk.bind(null, a, b);
				c.has(b) || (c.add(b), b.then(d, d));
			});
		}
	}
	function ck(a, b) {
		var c = b.deletions;
		if (null !== c) for (var d = 0; d < c.length; d++) {
			var e = c[d];
			try {
				var f = a, g = b, h = g;
				a: for (; null !== h;) {
					switch (h.tag) {
						case 5:
							X = h.stateNode;
							Xj = !1;
							break a;
						case 3:
							X = h.stateNode.containerInfo;
							Xj = !0;
							break a;
						case 4:
							X = h.stateNode.containerInfo;
							Xj = !0;
							break a;
					}
					h = h.return;
				}
				if (null === X) throw Error(p(160));
				Zj(f, g, e);
				X = null;
				Xj = !1;
				var k = e.alternate;
				null !== k && (k.return = null);
				e.return = null;
			} catch (l) {
				W(e, b, l);
			}
		}
		if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) dk(b, a), b = b.sibling;
	}
	function dk(a, b) {
		var c = a.alternate, d = a.flags;
		switch (a.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ck(b, a);
				ek(a);
				if (d & 4) {
					try {
						Pj(3, a, a.return), Qj(3, a);
					} catch (t) {
						W(a, a.return, t);
					}
					try {
						Pj(5, a, a.return);
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 1:
				ck(b, a);
				ek(a);
				d & 512 && null !== c && Lj(c, c.return);
				break;
			case 5:
				ck(b, a);
				ek(a);
				d & 512 && null !== c && Lj(c, c.return);
				if (a.flags & 32) {
					var e = a.stateNode;
					try {
						ob(e, "");
					} catch (t) {
						W(a, a.return, t);
					}
				}
				if (d & 4 && (e = a.stateNode, null != e)) {
					var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
					a.updateQueue = null;
					if (null !== k) try {
						"input" === h && "radio" === f.type && null != f.name && ab(e, f);
						vb(h, g);
						var l = vb(h, f);
						for (g = 0; g < k.length; g += 2) {
							var m = k[g], q = k[g + 1];
							"style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
						}
						switch (h) {
							case "input":
								bb(e, f);
								break;
							case "textarea":
								ib(e, f);
								break;
							case "select":
								var r = e._wrapperState.wasMultiple;
								e._wrapperState.wasMultiple = !!f.multiple;
								var y = f.value;
								null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
						}
						e[Pf] = f;
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 6:
				ck(b, a);
				ek(a);
				if (d & 4) {
					if (null === a.stateNode) throw Error(p(162));
					e = a.stateNode;
					f = a.memoizedProps;
					try {
						e.nodeValue = f;
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 3:
				ck(b, a);
				ek(a);
				if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
					bd(b.containerInfo);
				} catch (t) {
					W(a, a.return, t);
				}
				break;
			case 4:
				ck(b, a);
				ek(a);
				break;
			case 13:
				ck(b, a);
				ek(a);
				e = a.child;
				e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
				d & 4 && ak(a);
				break;
			case 22:
				m = null !== c && null !== c.memoizedState;
				a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
				ek(a);
				if (d & 8192) {
					l = null !== a.memoizedState;
					if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m;) {
						for (q = V = m; null !== V;) {
							r = V;
							y = r.child;
							switch (r.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									Pj(4, r, r.return);
									break;
								case 1:
									Lj(r, r.return);
									var n = r.stateNode;
									if ("function" === typeof n.componentWillUnmount) {
										d = r;
										c = r.return;
										try {
											b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
										} catch (t) {
											W(d, c, t);
										}
									}
									break;
								case 5:
									Lj(r, r.return);
									break;
								case 22: if (null !== r.memoizedState) {
									gk(q);
									continue;
								}
							}
							null !== y ? (y.return = r, V = y) : gk(q);
						}
						m = m.sibling;
					}
					a: for (m = null, q = a;;) {
						if (5 === q.tag) {
							if (null === m) {
								m = q;
								try {
									e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
								} catch (t) {
									W(a, a.return, t);
								}
							}
						} else if (6 === q.tag) {
							if (null === m) try {
								q.stateNode.nodeValue = l ? "" : q.memoizedProps;
							} catch (t) {
								W(a, a.return, t);
							}
						} else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
							q.child.return = q;
							q = q.child;
							continue;
						}
						if (q === a) break a;
						for (; null === q.sibling;) {
							if (null === q.return || q.return === a) break a;
							m === q && (m = null);
							q = q.return;
						}
						m === q && (m = null);
						q.sibling.return = q.return;
						q = q.sibling;
					}
				}
				break;
			case 19:
				ck(b, a);
				ek(a);
				d & 4 && ak(a);
				break;
			case 21: break;
			default: ck(b, a), ek(a);
		}
	}
	function ek(a) {
		var b = a.flags;
		if (b & 2) {
			try {
				a: {
					for (var c = a.return; null !== c;) {
						if (Tj(c)) {
							var d = c;
							break a;
						}
						c = c.return;
					}
					throw Error(p(160));
				}
				switch (d.tag) {
					case 5:
						var e = d.stateNode;
						d.flags & 32 && (ob(e, ""), d.flags &= -33);
						Wj(a, Uj(a), e);
						break;
					case 3:
					case 4:
						var g = d.stateNode.containerInfo;
						Vj(a, Uj(a), g);
						break;
					default: throw Error(p(161));
				}
			} catch (k) {
				W(a, a.return, k);
			}
			a.flags &= -3;
		}
		b & 4096 && (a.flags &= -4097);
	}
	function hk(a, b, c) {
		V = a;
		ik(a, b, c);
	}
	function ik(a, b, c) {
		for (var d = 0 !== (a.mode & 1); null !== V;) {
			var e = V, f = e.child;
			if (22 === e.tag && d) {
				var g = null !== e.memoizedState || Jj;
				if (!g) {
					var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
					h = Jj;
					var l = U;
					Jj = g;
					if ((U = k) && !l) for (V = e; null !== V;) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
					for (; null !== f;) V = f, ik(f, b, c), f = f.sibling;
					V = e;
					Jj = h;
					U = l;
				}
				kk(a, b, c);
			} else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
		}
	}
	function kk(a) {
		for (; null !== V;) {
			var b = V;
			if (0 !== (b.flags & 8772)) {
				var c = b.alternate;
				try {
					if (0 !== (b.flags & 8772)) switch (b.tag) {
						case 0:
						case 11:
						case 15:
							U || Qj(5, b);
							break;
						case 1:
							var d = b.stateNode;
							if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
							else {
								var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
								d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
							}
							var f = b.updateQueue;
							null !== f && sh(b, f, d);
							break;
						case 3:
							var g = b.updateQueue;
							if (null !== g) {
								c = null;
								if (null !== b.child) switch (b.child.tag) {
									case 5:
										c = b.child.stateNode;
										break;
									case 1: c = b.child.stateNode;
								}
								sh(b, g, c);
							}
							break;
						case 5:
							var h = b.stateNode;
							if (null === c && b.flags & 4) {
								c = h;
								var k = b.memoizedProps;
								switch (b.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										k.autoFocus && c.focus();
										break;
									case "img": k.src && (c.src = k.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (null === b.memoizedState) {
								var l = b.alternate;
								if (null !== l) {
									var m = l.memoizedState;
									if (null !== m) {
										var q = m.dehydrated;
										null !== q && bd(q);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(p(163));
					}
					U || b.flags & 512 && Rj(b);
				} catch (r) {
					W(b, b.return, r);
				}
			}
			if (b === a) {
				V = null;
				break;
			}
			c = b.sibling;
			if (null !== c) {
				c.return = b.return;
				V = c;
				break;
			}
			V = b.return;
		}
	}
	function gk(a) {
		for (; null !== V;) {
			var b = V;
			if (b === a) {
				V = null;
				break;
			}
			var c = b.sibling;
			if (null !== c) {
				c.return = b.return;
				V = c;
				break;
			}
			V = b.return;
		}
	}
	function jk(a) {
		for (; null !== V;) {
			var b = V;
			try {
				switch (b.tag) {
					case 0:
					case 11:
					case 15:
						var c = b.return;
						try {
							Qj(4, b);
						} catch (k) {
							W(b, c, k);
						}
						break;
					case 1:
						var d = b.stateNode;
						if ("function" === typeof d.componentDidMount) {
							var e = b.return;
							try {
								d.componentDidMount();
							} catch (k) {
								W(b, e, k);
							}
						}
						var f = b.return;
						try {
							Rj(b);
						} catch (k) {
							W(b, f, k);
						}
						break;
					case 5:
						var g = b.return;
						try {
							Rj(b);
						} catch (k) {
							W(b, g, k);
						}
				}
			} catch (k) {
				W(b, b.return, k);
			}
			if (b === a) {
				V = null;
				break;
			}
			var h = b.sibling;
			if (null !== h) {
				h.return = b.return;
				V = h;
				break;
			}
			V = b.return;
		}
	}
	var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = !1, Pi = null, Ri = null, vk = !1, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
	function R() {
		return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
	}
	function yi(a) {
		if (0 === (a.mode & 1)) return 1;
		if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
		if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
		a = C;
		if (0 !== a) return a;
		a = window.event;
		a = void 0 === a ? 16 : jd(a.type);
		return a;
	}
	function gi(a, b, c, d) {
		if (50 < yk) throw yk = 0, zk = null, Error(p(185));
		Ac(a, c, d);
		if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
	}
	function Dk(a, b) {
		var c = a.callbackNode;
		wc(a, b);
		var d = uc(a, a === Q ? Z : 0);
		if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
		else if (b = d & -d, a.callbackPriority !== b) {
			null != c && bc(c);
			if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
				0 === (K & 6) && jg();
			}), c = null;
			else {
				switch (Dc(d)) {
					case 1:
						c = fc;
						break;
					case 4:
						c = gc;
						break;
					case 16:
						c = hc;
						break;
					case 536870912:
						c = jc;
						break;
					default: c = hc;
				}
				c = Fk(c, Gk.bind(null, a));
			}
			a.callbackPriority = b;
			a.callbackNode = c;
		}
	}
	function Gk(a, b) {
		Ak = -1;
		Bk = 0;
		if (0 !== (K & 6)) throw Error(p(327));
		var c = a.callbackNode;
		if (Hk() && a.callbackNode !== c) return null;
		var d = uc(a, a === Q ? Z : 0);
		if (0 === d) return null;
		if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
		else {
			b = d;
			var e = K;
			K |= 2;
			var f = Jk();
			if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
			do
				try {
					Lk();
					break;
				} catch (h) {
					Mk(a, h);
				}
			while (1);
			$g();
			mk.current = f;
			K = e;
			null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
		}
		if (0 !== b) {
			2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
			if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
			if (6 === b) Ck(a, d);
			else {
				e = a.current.alternate;
				if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
				a.finishedWork = e;
				a.finishedLanes = d;
				switch (b) {
					case 0:
					case 1: throw Error(p(345));
					case 2:
						Pk(a, tk, uk);
						break;
					case 3:
						Ck(a, d);
						if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
							if (0 !== uc(a, 0)) break;
							e = a.suspendedLanes;
							if ((e & d) !== d) {
								R();
								a.pingedLanes |= a.suspendedLanes & e;
								break;
							}
							a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
							break;
						}
						Pk(a, tk, uk);
						break;
					case 4:
						Ck(a, d);
						if ((d & 4194240) === d) break;
						b = a.eventTimes;
						for (e = -1; 0 < d;) {
							var g = 31 - oc(d);
							f = 1 << g;
							g = b[g];
							g > e && (e = g);
							d &= ~f;
						}
						d = e;
						d = B() - d;
						d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
						if (10 < d) {
							a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
							break;
						}
						Pk(a, tk, uk);
						break;
					case 5:
						Pk(a, tk, uk);
						break;
					default: throw Error(p(329));
				}
			}
		}
		Dk(a, B());
		return a.callbackNode === c ? Gk.bind(null, a) : null;
	}
	function Nk(a, b) {
		var c = sk;
		a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
		a = Ik(a, b);
		2 !== a && (b = tk, tk = c, null !== b && Fj(b));
		return a;
	}
	function Fj(a) {
		null === tk ? tk = a : tk.push.apply(tk, a);
	}
	function Ok(a) {
		for (var b = a;;) {
			if (b.flags & 16384) {
				var c = b.updateQueue;
				if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
					var e = c[d], f = e.getSnapshot;
					e = e.value;
					try {
						if (!He(f(), e)) return !1;
					} catch (g) {
						return !1;
					}
				}
			}
			c = b.child;
			if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
			else {
				if (b === a) break;
				for (; null === b.sibling;) {
					if (null === b.return || b.return === a) return !0;
					b = b.return;
				}
				b.sibling.return = b.return;
				b = b.sibling;
			}
		}
		return !0;
	}
	function Ck(a, b) {
		b &= ~rk;
		b &= ~qk;
		a.suspendedLanes |= b;
		a.pingedLanes &= ~b;
		for (a = a.expirationTimes; 0 < b;) {
			var c = 31 - oc(b), d = 1 << c;
			a[c] = -1;
			b &= ~d;
		}
	}
	function Ek(a) {
		if (0 !== (K & 6)) throw Error(p(327));
		Hk();
		var b = uc(a, 0);
		if (0 === (b & 1)) return Dk(a, B()), null;
		var c = Ik(a, b);
		if (0 !== a.tag && 2 === c) {
			var d = xc(a);
			0 !== d && (b = d, c = Nk(a, d));
		}
		if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
		if (6 === c) throw Error(p(345));
		a.finishedWork = a.current.alternate;
		a.finishedLanes = b;
		Pk(a, tk, uk);
		Dk(a, B());
		return null;
	}
	function Qk(a, b) {
		var c = K;
		K |= 1;
		try {
			return a(b);
		} finally {
			K = c, 0 === K && (Gj = B() + 500, fg && jg());
		}
	}
	function Rk(a) {
		null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
		var b = K;
		K |= 1;
		var c = ok.transition, d = C;
		try {
			if (ok.transition = null, C = 1, a) return a();
		} finally {
			C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
		}
	}
	function Hj() {
		fj = ej.current;
		E(ej);
	}
	function Kk(a, b) {
		a.finishedWork = null;
		a.finishedLanes = 0;
		var c = a.timeoutHandle;
		-1 !== c && (a.timeoutHandle = -1, Gf(c));
		if (null !== Y) for (c = Y.return; null !== c;) {
			var d = c;
			wg(d);
			switch (d.tag) {
				case 1:
					d = d.type.childContextTypes;
					null !== d && void 0 !== d && $f();
					break;
				case 3:
					zh();
					E(Wf);
					E(H);
					Eh();
					break;
				case 5:
					Bh(d);
					break;
				case 4:
					zh();
					break;
				case 13:
					E(L);
					break;
				case 19:
					E(L);
					break;
				case 10:
					ah(d.type._context);
					break;
				case 22:
				case 23: Hj();
			}
			c = c.return;
		}
		Q = a;
		Y = a = Pg(a.current, null);
		Z = fj = b;
		T = 0;
		pk = null;
		rk = qk = rh = 0;
		tk = sk = null;
		if (null !== fh) {
			for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
				c.interleaved = null;
				var e = d.next, f = c.pending;
				if (null !== f) {
					var g = f.next;
					f.next = e;
					d.next = g;
				}
				c.pending = d;
			}
			fh = null;
		}
		return a;
	}
	function Mk(a, b) {
		do {
			var c = Y;
			try {
				$g();
				Fh.current = Rh;
				if (Ih) {
					for (var d = M.memoizedState; null !== d;) {
						var e = d.queue;
						null !== e && (e.pending = null);
						d = d.next;
					}
					Ih = !1;
				}
				Hh = 0;
				O = N = M = null;
				Jh = !1;
				Kh = 0;
				nk.current = null;
				if (null === c || null === c.return) {
					T = 1;
					pk = b;
					Y = null;
					break;
				}
				a: {
					var f = a, g = c.return, h = c, k = b;
					b = Z;
					h.flags |= 32768;
					if (null !== k && "object" === typeof k && "function" === typeof k.then) {
						var l = k, m = h, q = m.tag;
						if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
							var r = m.alternate;
							r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
						}
						var y = Ui(g);
						if (null !== y) {
							y.flags &= -257;
							Vi(y, g, h, f, b);
							y.mode & 1 && Si(f, l, b);
							b = y;
							k = l;
							var n = b.updateQueue;
							if (null === n) {
								var t = /* @__PURE__ */ new Set();
								t.add(k);
								b.updateQueue = t;
							} else n.add(k);
							break a;
						} else {
							if (0 === (b & 1)) {
								Si(f, l, b);
								tj();
								break a;
							}
							k = Error(p(426));
						}
					} else if (I && h.mode & 1) {
						var J = Ui(g);
						if (null !== J) {
							0 === (J.flags & 65536) && (J.flags |= 256);
							Vi(J, g, h, f, b);
							Jg(Ji(k, h));
							break a;
						}
					}
					f = k = Ji(k, h);
					4 !== T && (T = 2);
					null === sk ? sk = [f] : sk.push(f);
					f = g;
					do {
						switch (f.tag) {
							case 3:
								f.flags |= 65536;
								b &= -b;
								f.lanes |= b;
								var x = Ni(f, k, b);
								ph(f, x);
								break a;
							case 1:
								h = k;
								var w = f.type, u = f.stateNode;
								if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
									f.flags |= 65536;
									b &= -b;
									f.lanes |= b;
									var F = Qi(f, h, b);
									ph(f, F);
									break a;
								}
						}
						f = f.return;
					} while (null !== f);
				}
				Sk(c);
			} catch (na) {
				b = na;
				Y === c && null !== c && (Y = c = c.return);
				continue;
			}
			break;
		} while (1);
	}
	function Jk() {
		var a = mk.current;
		mk.current = Rh;
		return null === a ? Rh : a;
	}
	function tj() {
		if (0 === T || 3 === T || 2 === T) T = 4;
		null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
	}
	function Ik(a, b) {
		var c = K;
		K |= 2;
		var d = Jk();
		if (Q !== a || Z !== b) uk = null, Kk(a, b);
		do
			try {
				Tk();
				break;
			} catch (e) {
				Mk(a, e);
			}
		while (1);
		$g();
		K = c;
		mk.current = d;
		if (null !== Y) throw Error(p(261));
		Q = null;
		Z = 0;
		return T;
	}
	function Tk() {
		for (; null !== Y;) Uk(Y);
	}
	function Lk() {
		for (; null !== Y && !cc();) Uk(Y);
	}
	function Uk(a) {
		var b = Vk(a.alternate, a, fj);
		a.memoizedProps = a.pendingProps;
		null === b ? Sk(a) : Y = b;
		nk.current = null;
	}
	function Sk(a) {
		var b = a;
		do {
			var c = b.alternate;
			a = b.return;
			if (0 === (b.flags & 32768)) {
				if (c = Ej(c, b, fj), null !== c) {
					Y = c;
					return;
				}
			} else {
				c = Ij(c, b);
				if (null !== c) {
					c.flags &= 32767;
					Y = c;
					return;
				}
				if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
				else {
					T = 6;
					Y = null;
					return;
				}
			}
			b = b.sibling;
			if (null !== b) {
				Y = b;
				return;
			}
			Y = b = a;
		} while (null !== b);
		0 === T && (T = 5);
	}
	function Pk(a, b, c) {
		var d = C, e = ok.transition;
		try {
			ok.transition = null, C = 1, Wk(a, b, c, d);
		} finally {
			ok.transition = e, C = d;
		}
		return null;
	}
	function Wk(a, b, c, d) {
		do
			Hk();
		while (null !== wk);
		if (0 !== (K & 6)) throw Error(p(327));
		c = a.finishedWork;
		var e = a.finishedLanes;
		if (null === c) return null;
		a.finishedWork = null;
		a.finishedLanes = 0;
		if (c === a.current) throw Error(p(177));
		a.callbackNode = null;
		a.callbackPriority = 0;
		var f = c.lanes | c.childLanes;
		Bc(a, f);
		a === Q && (Y = Q = null, Z = 0);
		0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = !0, Fk(hc, function() {
			Hk();
			return null;
		}));
		f = 0 !== (c.flags & 15990);
		if (0 !== (c.subtreeFlags & 15990) || f) {
			f = ok.transition;
			ok.transition = null;
			var g = C;
			C = 1;
			var h = K;
			K |= 4;
			nk.current = null;
			Oj(a, c);
			dk(c, a);
			Oe(Df);
			dd = !!Cf;
			Df = Cf = null;
			a.current = c;
			hk(c, a, e);
			dc();
			K = h;
			C = g;
			ok.transition = f;
		} else a.current = c;
		vk && (vk = !1, wk = a, xk = e);
		f = a.pendingLanes;
		0 === f && (Ri = null);
		mc(c.stateNode, d);
		Dk(a, B());
		if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
			componentStack: e.stack,
			digest: e.digest
		});
		if (Oi) throw Oi = !1, a = Pi, Pi = null, a;
		0 !== (xk & 1) && 0 !== a.tag && Hk();
		f = a.pendingLanes;
		0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
		jg();
		return null;
	}
	function Hk() {
		if (null !== wk) {
			var a = Dc(xk), b = ok.transition, c = C;
			try {
				ok.transition = null;
				C = 16 > a ? 16 : a;
				if (null === wk) var d = !1;
				else {
					a = wk;
					wk = null;
					xk = 0;
					if (0 !== (K & 6)) throw Error(p(331));
					var e = K;
					K |= 4;
					for (V = a.current; null !== V;) {
						var f = V, g = f.child;
						if (0 !== (V.flags & 16)) {
							var h = f.deletions;
							if (null !== h) {
								for (var k = 0; k < h.length; k++) {
									var l = h[k];
									for (V = l; null !== V;) {
										var m = V;
										switch (m.tag) {
											case 0:
											case 11:
											case 15: Pj(8, m, f);
										}
										var q = m.child;
										if (null !== q) q.return = m, V = q;
										else for (; null !== V;) {
											m = V;
											var r = m.sibling, y = m.return;
											Sj(m);
											if (m === l) {
												V = null;
												break;
											}
											if (null !== r) {
												r.return = y;
												V = r;
												break;
											}
											V = y;
										}
									}
								}
								var n = f.alternate;
								if (null !== n) {
									var t = n.child;
									if (null !== t) {
										n.child = null;
										do {
											var J = t.sibling;
											t.sibling = null;
											t = J;
										} while (null !== t);
									}
								}
								V = f;
							}
						}
						if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
						else b: for (; null !== V;) {
							f = V;
							if (0 !== (f.flags & 2048)) switch (f.tag) {
								case 0:
								case 11:
								case 15: Pj(9, f, f.return);
							}
							var x = f.sibling;
							if (null !== x) {
								x.return = f.return;
								V = x;
								break b;
							}
							V = f.return;
						}
					}
					var w = a.current;
					for (V = w; null !== V;) {
						g = V;
						var u = g.child;
						if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
						else b: for (g = w; null !== V;) {
							h = V;
							if (0 !== (h.flags & 2048)) try {
								switch (h.tag) {
									case 0:
									case 11:
									case 15: Qj(9, h);
								}
							} catch (na) {
								W(h, h.return, na);
							}
							if (h === g) {
								V = null;
								break b;
							}
							var F = h.sibling;
							if (null !== F) {
								F.return = h.return;
								V = F;
								break b;
							}
							V = h.return;
						}
					}
					K = e;
					jg();
					if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
						lc.onPostCommitFiberRoot(kc, a);
					} catch (na) {}
					d = !0;
				}
				return d;
			} finally {
				C = c, ok.transition = b;
			}
		}
		return !1;
	}
	function Xk(a, b, c) {
		b = Ji(c, b);
		b = Ni(a, b, 1);
		a = nh(a, b, 1);
		b = R();
		null !== a && (Ac(a, 1, b), Dk(a, b));
	}
	function W(a, b, c) {
		if (3 === a.tag) Xk(a, a, c);
		else for (; null !== b;) {
			if (3 === b.tag) {
				Xk(b, a, c);
				break;
			} else if (1 === b.tag) {
				var d = b.stateNode;
				if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
					a = Ji(c, a);
					a = Qi(b, a, 1);
					b = nh(b, a, 1);
					a = R();
					null !== b && (Ac(b, 1, a), Dk(b, a));
					break;
				}
			}
			b = b.return;
		}
	}
	function Ti(a, b, c) {
		var d = a.pingCache;
		null !== d && d.delete(b);
		b = R();
		a.pingedLanes |= a.suspendedLanes & c;
		Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
		Dk(a, b);
	}
	function Yk(a, b) {
		0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
		var c = R();
		a = ih(a, b);
		null !== a && (Ac(a, b, c), Dk(a, c));
	}
	function uj(a) {
		var b = a.memoizedState, c = 0;
		null !== b && (c = b.retryLane);
		Yk(a, c);
	}
	function bk(a, b) {
		var c = 0;
		switch (a.tag) {
			case 13:
				var d = a.stateNode;
				var e = a.memoizedState;
				null !== e && (c = e.retryLane);
				break;
			case 19:
				d = a.stateNode;
				break;
			default: throw Error(p(314));
		}
		null !== d && d.delete(b);
		Yk(a, c);
	}
	var Vk = function(a, b, c) {
		if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = !0;
		else {
			if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = !1, yj(a, b, c);
			dh = 0 !== (a.flags & 131072) ? !0 : !1;
		}
		else dh = !1, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
		b.lanes = 0;
		switch (b.tag) {
			case 2:
				var d = b.type;
				ij(a, b);
				a = b.pendingProps;
				var e = Yf(b, H.current);
				ch(b, c);
				e = Nh(null, b, d, a, e, c);
				var f = Sh();
				b.flags |= 1;
				"object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
				return b;
			case 16:
				d = b.elementType;
				a: {
					ij(a, b);
					a = b.pendingProps;
					e = d._init;
					d = e(d._payload);
					b.type = d;
					e = b.tag = Zk(d);
					a = Ci(d, a);
					switch (e) {
						case 0:
							b = cj(null, b, d, a, c);
							break a;
						case 1:
							b = hj(null, b, d, a, c);
							break a;
						case 11:
							b = Yi(null, b, d, a, c);
							break a;
						case 14:
							b = $i(null, b, d, Ci(d.type, a), c);
							break a;
					}
					throw Error(p(306, d, ""));
				}
				return b;
			case 0: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
			case 1: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
			case 3:
				a: {
					kj(b);
					if (null === a) throw Error(p(387));
					d = b.pendingProps;
					f = b.memoizedState;
					e = f.element;
					lh(a, b);
					qh(b, d, null, c);
					var g = b.memoizedState;
					d = g.element;
					if (f.isDehydrated) if (f = {
						element: d,
						isDehydrated: !1,
						cache: g.cache,
						pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
						transitions: g.transitions
					}, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
						e = Ji(Error(p(423)), b);
						b = lj(a, b, d, c, e);
						break a;
					} else if (d !== e) {
						e = Ji(Error(p(424)), b);
						b = lj(a, b, d, c, e);
						break a;
					} else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Vg(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
					else {
						Ig();
						if (d === e) {
							b = Zi(a, b, c);
							break a;
						}
						Xi(a, b, d, c);
					}
					b = b.child;
				}
				return b;
			case 5: return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
			case 6: return null === a && Eg(b), null;
			case 13: return oj(a, b, c);
			case 4: return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
			case 11: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
			case 7: return Xi(a, b, b.pendingProps, c), b.child;
			case 8: return Xi(a, b, b.pendingProps.children, c), b.child;
			case 12: return Xi(a, b, b.pendingProps.children, c), b.child;
			case 10:
				a: {
					d = b.type._context;
					e = b.pendingProps;
					f = b.memoizedProps;
					g = e.value;
					G(Wg, d._currentValue);
					d._currentValue = g;
					if (null !== f) if (He(f.value, g)) {
						if (f.children === e.children && !Wf.current) {
							b = Zi(a, b, c);
							break a;
						}
					} else for (f = b.child, null !== f && (f.return = b); null !== f;) {
						var h = f.dependencies;
						if (null !== h) {
							g = f.child;
							for (var k = h.firstContext; null !== k;) {
								if (k.context === d) {
									if (1 === f.tag) {
										k = mh(-1, c & -c);
										k.tag = 2;
										var l = f.updateQueue;
										if (null !== l) {
											l = l.shared;
											var m = l.pending;
											null === m ? k.next = k : (k.next = m.next, m.next = k);
											l.pending = k;
										}
									}
									f.lanes |= c;
									k = f.alternate;
									null !== k && (k.lanes |= c);
									bh(f.return, c, b);
									h.lanes |= c;
									break;
								}
								k = k.next;
							}
						} else if (10 === f.tag) g = f.type === b.type ? null : f.child;
						else if (18 === f.tag) {
							g = f.return;
							if (null === g) throw Error(p(341));
							g.lanes |= c;
							h = g.alternate;
							null !== h && (h.lanes |= c);
							bh(g, c, b);
							g = f.sibling;
						} else g = f.child;
						if (null !== g) g.return = f;
						else for (g = f; null !== g;) {
							if (g === b) {
								g = null;
								break;
							}
							f = g.sibling;
							if (null !== f) {
								f.return = g.return;
								g = f;
								break;
							}
							g = g.return;
						}
						f = g;
					}
					Xi(a, b, e.children, c);
					b = b.child;
				}
				return b;
			case 9: return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
			case 14: return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
			case 15: return bj(a, b, b.type, b.pendingProps, c);
			case 17: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, !0, a, c);
			case 19: return xj(a, b, c);
			case 22: return dj(a, b, c);
		}
		throw Error(p(156, b.tag));
	};
	function Fk(a, b) {
		return ac(a, b);
	}
	function $k(a, b, c, d) {
		this.tag = a;
		this.key = c;
		this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
		this.index = 0;
		this.ref = null;
		this.pendingProps = b;
		this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
		this.mode = d;
		this.subtreeFlags = this.flags = 0;
		this.deletions = null;
		this.childLanes = this.lanes = 0;
		this.alternate = null;
	}
	function Bg(a, b, c, d) {
		return new $k(a, b, c, d);
	}
	function aj(a) {
		a = a.prototype;
		return !(!a || !a.isReactComponent);
	}
	function Zk(a) {
		if ("function" === typeof a) return aj(a) ? 1 : 0;
		if (void 0 !== a && null !== a) {
			a = a.$$typeof;
			if (a === Da) return 11;
			if (a === Ga) return 14;
		}
		return 2;
	}
	function Pg(a, b) {
		var c = a.alternate;
		null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
		c.flags = a.flags & 14680064;
		c.childLanes = a.childLanes;
		c.lanes = a.lanes;
		c.child = a.child;
		c.memoizedProps = a.memoizedProps;
		c.memoizedState = a.memoizedState;
		c.updateQueue = a.updateQueue;
		b = a.dependencies;
		c.dependencies = null === b ? null : {
			lanes: b.lanes,
			firstContext: b.firstContext
		};
		c.sibling = a.sibling;
		c.index = a.index;
		c.ref = a.ref;
		return c;
	}
	function Rg(a, b, c, d, e, f) {
		var g = 2;
		d = a;
		if ("function" === typeof a) aj(a) && (g = 1);
		else if ("string" === typeof a) g = 5;
		else a: switch (a) {
			case ya: return Tg(c.children, e, f, b);
			case za:
				g = 8;
				e |= 8;
				break;
			case Aa: return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
			case Ea: return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
			case Fa: return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
			case Ia: return pj(c, e, f, b);
			default:
				if ("object" === typeof a && null !== a) switch (a.$$typeof) {
					case Ba:
						g = 10;
						break a;
					case Ca:
						g = 9;
						break a;
					case Da:
						g = 11;
						break a;
					case Ga:
						g = 14;
						break a;
					case Ha:
						g = 16;
						d = null;
						break a;
				}
				throw Error(p(130, null == a ? a : typeof a, ""));
		}
		b = Bg(g, c, b, e);
		b.elementType = a;
		b.type = d;
		b.lanes = f;
		return b;
	}
	function Tg(a, b, c, d) {
		a = Bg(7, a, d, b);
		a.lanes = c;
		return a;
	}
	function pj(a, b, c, d) {
		a = Bg(22, a, d, b);
		a.elementType = Ia;
		a.lanes = c;
		a.stateNode = { isHidden: !1 };
		return a;
	}
	function Qg(a, b, c) {
		a = Bg(6, a, null, b);
		a.lanes = c;
		return a;
	}
	function Sg(a, b, c) {
		b = Bg(4, null !== a.children ? a.children : [], a.key, b);
		b.lanes = c;
		b.stateNode = {
			containerInfo: a.containerInfo,
			pendingChildren: null,
			implementation: a.implementation
		};
		return b;
	}
	function al(a, b, c, d, e) {
		this.tag = b;
		this.containerInfo = a;
		this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
		this.timeoutHandle = -1;
		this.callbackNode = this.pendingContext = this.context = null;
		this.callbackPriority = 0;
		this.eventTimes = zc(0);
		this.expirationTimes = zc(-1);
		this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
		this.entanglements = zc(0);
		this.identifierPrefix = d;
		this.onRecoverableError = e;
		this.mutableSourceEagerHydrationData = null;
	}
	function bl(a, b, c, d, e, f, g, h, k) {
		a = new al(a, b, c, h, k);
		1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
		f = Bg(3, null, null, b);
		a.current = f;
		f.stateNode = a;
		f.memoizedState = {
			element: d,
			isDehydrated: c,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		};
		kh(f);
		return a;
	}
	function cl(a, b, c) {
		var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: wa,
			key: null == d ? null : "" + d,
			children: a,
			containerInfo: b,
			implementation: c
		};
	}
	function dl(a) {
		if (!a) return Vf;
		a = a._reactInternals;
		a: {
			if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
			var b = a;
			do {
				switch (b.tag) {
					case 3:
						b = b.stateNode.context;
						break a;
					case 1: if (Zf(b.type)) {
						b = b.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				b = b.return;
			} while (null !== b);
			throw Error(p(171));
		}
		if (1 === a.tag) {
			var c = a.type;
			if (Zf(c)) return bg(a, c, b);
		}
		return b;
	}
	function el(a, b, c, d, e, f, g, h, k) {
		a = bl(c, d, !0, a, e, f, g, h, k);
		a.context = dl(null);
		c = a.current;
		d = R();
		e = yi(c);
		f = mh(d, e);
		f.callback = void 0 !== b && null !== b ? b : null;
		nh(c, f, e);
		a.current.lanes = e;
		Ac(a, e, d);
		Dk(a, d);
		return a;
	}
	function fl(a, b, c, d) {
		var e = b.current, f = R(), g = yi(e);
		c = dl(c);
		null === b.context ? b.context = c : b.pendingContext = c;
		b = mh(f, g);
		b.payload = { element: a };
		d = void 0 === d ? null : d;
		null !== d && (b.callback = d);
		a = nh(e, b, g);
		null !== a && (gi(a, e, g, f), oh(a, e, g));
		return g;
	}
	function gl(a) {
		a = a.current;
		if (!a.child) return null;
		switch (a.child.tag) {
			case 5: return a.child.stateNode;
			default: return a.child.stateNode;
		}
	}
	function hl(a, b) {
		a = a.memoizedState;
		if (null !== a && null !== a.dehydrated) {
			var c = a.retryLane;
			a.retryLane = 0 !== c && c < b ? c : b;
		}
	}
	function il(a, b) {
		hl(a, b);
		(a = a.alternate) && hl(a, b);
	}
	function jl() {
		return null;
	}
	var kl = "function" === typeof reportError ? reportError : function(a) {
		console.error(a);
	};
	function ll(a) {
		this._internalRoot = a;
	}
	ml.prototype.render = ll.prototype.render = function(a) {
		var b = this._internalRoot;
		if (null === b) throw Error(p(409));
		fl(a, b, null, null);
	};
	ml.prototype.unmount = ll.prototype.unmount = function() {
		var a = this._internalRoot;
		if (null !== a) {
			this._internalRoot = null;
			var b = a.containerInfo;
			Rk(function() {
				fl(null, a, null, null);
			});
			b[uf] = null;
		}
	};
	function ml(a) {
		this._internalRoot = a;
	}
	ml.prototype.unstable_scheduleHydration = function(a) {
		if (a) {
			var b = Hc();
			a = {
				blockedOn: null,
				target: a,
				priority: b
			};
			for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++);
			Qc.splice(c, 0, a);
			0 === c && Vc(a);
		}
	};
	function nl(a) {
		return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
	}
	function ol(a) {
		return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
	}
	function pl() {}
	function ql(a, b, c, d, e) {
		if (e) {
			if ("function" === typeof d) {
				var f = d;
				d = function() {
					var a = gl(g);
					f.call(a);
				};
			}
			var g = el(b, d, a, 0, null, !1, !1, "", pl);
			a._reactRootContainer = g;
			a[uf] = g.current;
			sf(8 === a.nodeType ? a.parentNode : a);
			Rk();
			return g;
		}
		for (; e = a.lastChild;) a.removeChild(e);
		if ("function" === typeof d) {
			var h = d;
			d = function() {
				var a = gl(k);
				h.call(a);
			};
		}
		var k = bl(a, 0, !1, null, null, !1, !1, "", pl);
		a._reactRootContainer = k;
		a[uf] = k.current;
		sf(8 === a.nodeType ? a.parentNode : a);
		Rk(function() {
			fl(b, k, c, d);
		});
		return k;
	}
	function rl(a, b, c, d, e) {
		var f = c._reactRootContainer;
		if (f) {
			var g = f;
			if ("function" === typeof e) {
				var h = e;
				e = function() {
					var a = gl(g);
					h.call(a);
				};
			}
			fl(b, g, a, e);
		} else g = ql(c, b, a, e, d);
		return gl(g);
	}
	Ec = function(a) {
		switch (a.tag) {
			case 3:
				var b = a.stateNode;
				if (b.current.memoizedState.isDehydrated) {
					var c = tc(b.pendingLanes);
					0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
				}
				break;
			case 13: Rk(function() {
				var b = ih(a, 1);
				if (null !== b) gi(b, a, 1, R());
			}), il(a, 1);
		}
	};
	Fc = function(a) {
		if (13 === a.tag) {
			var b = ih(a, 134217728);
			if (null !== b) gi(b, a, 134217728, R());
			il(a, 134217728);
		}
	};
	Gc = function(a) {
		if (13 === a.tag) {
			var b = yi(a), c = ih(a, b);
			if (null !== c) gi(c, a, b, R());
			il(a, b);
		}
	};
	Hc = function() {
		return C;
	};
	Ic = function(a, b) {
		var c = C;
		try {
			return C = a, b();
		} finally {
			C = c;
		}
	};
	yb = function(a, b, c) {
		switch (b) {
			case "input":
				bb(a, c);
				b = c.name;
				if ("radio" === c.type && null != b) {
					for (c = a; c.parentNode;) c = c.parentNode;
					c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + "][type=\"radio\"]");
					for (b = 0; b < c.length; b++) {
						var d = c[b];
						if (d !== a && d.form === a.form) {
							var e = Db(d);
							if (!e) throw Error(p(90));
							Wa(d);
							bb(d, e);
						}
					}
				}
				break;
			case "textarea":
				ib(a, c);
				break;
			case "select": b = c.value, null != b && fb(a, !!c.multiple, b, !1);
		}
	};
	Gb = Qk;
	Hb = Rk;
	var sl = {
		usingClientEntryPoint: !1,
		Events: [
			Cb,
			ue,
			Db,
			Eb,
			Fb,
			Qk
		]
	}, tl = {
		findFiberByHostInstance: Wc,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	};
	var ul = {
		bundleType: tl.bundleType,
		version: tl.version,
		rendererPackageName: tl.rendererPackageName,
		rendererConfig: tl.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: ua.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(a) {
			a = Zb(a);
			return null === a ? null : a.stateNode;
		},
		findFiberByHostInstance: tl.findFiberByHostInstance || jl,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
		var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!vl.isDisabled && vl.supportsFiber) try {
			kc = vl.inject(ul), lc = vl;
		} catch (a) {}
	}
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
	exports.createPortal = function(a, b) {
		var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!nl(b)) throw Error(p(200));
		return cl(a, b, null, c);
	};
	exports.createRoot = function(a, b) {
		if (!nl(a)) throw Error(p(299));
		var c = !1, d = "", e = kl;
		null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
		b = bl(a, 1, !1, null, null, c, !1, d, e);
		a[uf] = b.current;
		sf(8 === a.nodeType ? a.parentNode : a);
		return new ll(b);
	};
	exports.findDOMNode = function(a) {
		if (null == a) return null;
		if (1 === a.nodeType) return a;
		var b = a._reactInternals;
		if (void 0 === b) {
			if ("function" === typeof a.render) throw Error(p(188));
			a = Object.keys(a).join(",");
			throw Error(p(268, a));
		}
		a = Zb(b);
		a = null === a ? null : a.stateNode;
		return a;
	};
	exports.flushSync = function(a) {
		return Rk(a);
	};
	exports.hydrate = function(a, b, c) {
		if (!ol(b)) throw Error(p(200));
		return rl(null, a, b, !0, c);
	};
	exports.hydrateRoot = function(a, b, c) {
		if (!nl(a)) throw Error(p(405));
		var d = null != c && c.hydratedSources || null, e = !1, f = "", g = kl;
		null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
		b = el(b, null, a, 1, null != c ? c : null, e, !1, f, g);
		a[uf] = b.current;
		sf(a);
		if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c, e);
		return new ml(b);
	};
	exports.render = function(a, b, c) {
		if (!ol(b)) throw Error(p(200));
		return rl(null, a, b, !1, c);
	};
	exports.unmountComponentAtNode = function(a) {
		if (!ol(a)) throw Error(p(40));
		return a._reactRootContainer ? (Rk(function() {
			rl(null, null, a, !1, function() {
				a._reactRootContainer = null;
				a[uf] = null;
			});
		}), !0) : !1;
	};
	exports.unstable_batchedUpdates = Qk;
	exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
		if (!ol(c)) throw Error(p(200));
		if (null == a || void 0 === a._reactInternals) throw Error(p(38));
		return rl(a, b, c, !1, d);
	};
	exports.version = "18.3.1-next-f1338f8080-20240426";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production_min();
}));
//#endregion
//#region node_modules/react-dom/client.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var m = require_react_dom();
	exports.createRoot = m.createRoot;
	exports.hydrateRoot = m.hydrateRoot;
}));
//#endregion
//#region node_modules/konva/lib/Global.js
var require_Global = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports._registerNode = exports.Konva = exports.glob = void 0;
	var PI_OVER_180 = Math.PI / 180;
	function detectBrowser() {
		return typeof window !== "undefined" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
	}
	exports.glob = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : {};
	exports.Konva = {
		_global: exports.glob,
		version: "9.3.22",
		isBrowser: detectBrowser(),
		isUnminified: /param/.test(function(param) {}.toString()),
		dblClickWindow: 400,
		getAngle(angle) {
			return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
		},
		enableTrace: false,
		pointerEventsEnabled: true,
		autoDrawEnabled: true,
		hitOnDragEnabled: false,
		capturePointerEventsEnabled: false,
		_mouseListenClick: false,
		_touchListenClick: false,
		_pointerListenClick: false,
		_mouseInDblClickWindow: false,
		_touchInDblClickWindow: false,
		_pointerInDblClickWindow: false,
		_mouseDblClickPointerId: null,
		_touchDblClickPointerId: null,
		_pointerDblClickPointerId: null,
		_fixTextRendering: false,
		pixelRatio: typeof window !== "undefined" && window.devicePixelRatio || 1,
		dragDistance: 3,
		angleDeg: true,
		showWarnings: true,
		dragButtons: [0, 1],
		isDragging() {
			return exports.Konva["DD"].isDragging;
		},
		isTransforming() {
			var _a;
			return (_a = exports.Konva["Transformer"]) === null || _a === void 0 ? void 0 : _a.isTransforming();
		},
		isDragReady() {
			return !!exports.Konva["DD"].node;
		},
		releaseCanvasOnDestroy: true,
		document: exports.glob.document,
		_injectGlobal(Konva) {
			exports.glob.Konva = Konva;
		}
	};
	var _registerNode = (NodeClass) => {
		exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
	};
	exports._registerNode = _registerNode;
	exports.Konva._injectGlobal(exports.Konva);
}));
//#endregion
//#region node_modules/konva/lib/Util.js
var require_Util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Util = exports.Transform = void 0;
	var Global_1 = require_Global();
	exports.Transform = class Transform {
		constructor(m = [
			1,
			0,
			0,
			1,
			0,
			0
		]) {
			this.dirty = false;
			this.m = m && m.slice() || [
				1,
				0,
				0,
				1,
				0,
				0
			];
		}
		reset() {
			this.m[0] = 1;
			this.m[1] = 0;
			this.m[2] = 0;
			this.m[3] = 1;
			this.m[4] = 0;
			this.m[5] = 0;
		}
		copy() {
			return new Transform(this.m);
		}
		copyInto(tr) {
			tr.m[0] = this.m[0];
			tr.m[1] = this.m[1];
			tr.m[2] = this.m[2];
			tr.m[3] = this.m[3];
			tr.m[4] = this.m[4];
			tr.m[5] = this.m[5];
		}
		point(point) {
			const m = this.m;
			return {
				x: m[0] * point.x + m[2] * point.y + m[4],
				y: m[1] * point.x + m[3] * point.y + m[5]
			};
		}
		translate(x, y) {
			this.m[4] += this.m[0] * x + this.m[2] * y;
			this.m[5] += this.m[1] * x + this.m[3] * y;
			return this;
		}
		scale(sx, sy) {
			this.m[0] *= sx;
			this.m[1] *= sx;
			this.m[2] *= sy;
			this.m[3] *= sy;
			return this;
		}
		rotate(rad) {
			const c = Math.cos(rad);
			const s = Math.sin(rad);
			const m11 = this.m[0] * c + this.m[2] * s;
			const m12 = this.m[1] * c + this.m[3] * s;
			const m21 = this.m[0] * -s + this.m[2] * c;
			const m22 = this.m[1] * -s + this.m[3] * c;
			this.m[0] = m11;
			this.m[1] = m12;
			this.m[2] = m21;
			this.m[3] = m22;
			return this;
		}
		getTranslation() {
			return {
				x: this.m[4],
				y: this.m[5]
			};
		}
		skew(sx, sy) {
			const m11 = this.m[0] + this.m[2] * sy;
			const m12 = this.m[1] + this.m[3] * sy;
			const m21 = this.m[2] + this.m[0] * sx;
			const m22 = this.m[3] + this.m[1] * sx;
			this.m[0] = m11;
			this.m[1] = m12;
			this.m[2] = m21;
			this.m[3] = m22;
			return this;
		}
		multiply(matrix) {
			const m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
			const m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
			const m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
			const m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
			const dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
			const dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
			this.m[0] = m11;
			this.m[1] = m12;
			this.m[2] = m21;
			this.m[3] = m22;
			this.m[4] = dx;
			this.m[5] = dy;
			return this;
		}
		invert() {
			const d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
			const m0 = this.m[3] * d;
			const m1 = -this.m[1] * d;
			const m2 = -this.m[2] * d;
			const m3 = this.m[0] * d;
			const m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
			const m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
			this.m[0] = m0;
			this.m[1] = m1;
			this.m[2] = m2;
			this.m[3] = m3;
			this.m[4] = m4;
			this.m[5] = m5;
			return this;
		}
		getMatrix() {
			return this.m;
		}
		decompose() {
			const a = this.m[0];
			const b = this.m[1];
			const c = this.m[2];
			const d = this.m[3];
			const e = this.m[4];
			const f = this.m[5];
			const delta = a * d - b * c;
			const result = {
				x: e,
				y: f,
				rotation: 0,
				scaleX: 0,
				scaleY: 0,
				skewX: 0,
				skewY: 0
			};
			if (a != 0 || b != 0) {
				const r = Math.sqrt(a * a + b * b);
				result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
				result.scaleX = r;
				result.scaleY = delta / r;
				result.skewX = (a * c + b * d) / delta;
				result.skewY = 0;
			} else if (c != 0 || d != 0) {
				const s = Math.sqrt(c * c + d * d);
				result.rotation = Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
				result.scaleX = delta / s;
				result.scaleY = s;
				result.skewX = 0;
				result.skewY = (a * c + b * d) / delta;
			}
			result.rotation = exports.Util._getRotation(result.rotation);
			return result;
		}
	};
	var OBJECT_ARRAY = "[object Array]", OBJECT_NUMBER = "[object Number]", OBJECT_STRING = "[object String]", OBJECT_BOOLEAN = "[object Boolean]", PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = "#", EMPTY_STRING = "", ZERO = "0", KONVA_WARNING = "Konva warning: ", KONVA_ERROR = "Konva error: ", RGB_PAREN = "rgb(", COLORS = {
		aliceblue: [
			240,
			248,
			255
		],
		antiquewhite: [
			250,
			235,
			215
		],
		aqua: [
			0,
			255,
			255
		],
		aquamarine: [
			127,
			255,
			212
		],
		azure: [
			240,
			255,
			255
		],
		beige: [
			245,
			245,
			220
		],
		bisque: [
			255,
			228,
			196
		],
		black: [
			0,
			0,
			0
		],
		blanchedalmond: [
			255,
			235,
			205
		],
		blue: [
			0,
			0,
			255
		],
		blueviolet: [
			138,
			43,
			226
		],
		brown: [
			165,
			42,
			42
		],
		burlywood: [
			222,
			184,
			135
		],
		cadetblue: [
			95,
			158,
			160
		],
		chartreuse: [
			127,
			255,
			0
		],
		chocolate: [
			210,
			105,
			30
		],
		coral: [
			255,
			127,
			80
		],
		cornflowerblue: [
			100,
			149,
			237
		],
		cornsilk: [
			255,
			248,
			220
		],
		crimson: [
			220,
			20,
			60
		],
		cyan: [
			0,
			255,
			255
		],
		darkblue: [
			0,
			0,
			139
		],
		darkcyan: [
			0,
			139,
			139
		],
		darkgoldenrod: [
			184,
			132,
			11
		],
		darkgray: [
			169,
			169,
			169
		],
		darkgreen: [
			0,
			100,
			0
		],
		darkgrey: [
			169,
			169,
			169
		],
		darkkhaki: [
			189,
			183,
			107
		],
		darkmagenta: [
			139,
			0,
			139
		],
		darkolivegreen: [
			85,
			107,
			47
		],
		darkorange: [
			255,
			140,
			0
		],
		darkorchid: [
			153,
			50,
			204
		],
		darkred: [
			139,
			0,
			0
		],
		darksalmon: [
			233,
			150,
			122
		],
		darkseagreen: [
			143,
			188,
			143
		],
		darkslateblue: [
			72,
			61,
			139
		],
		darkslategray: [
			47,
			79,
			79
		],
		darkslategrey: [
			47,
			79,
			79
		],
		darkturquoise: [
			0,
			206,
			209
		],
		darkviolet: [
			148,
			0,
			211
		],
		deeppink: [
			255,
			20,
			147
		],
		deepskyblue: [
			0,
			191,
			255
		],
		dimgray: [
			105,
			105,
			105
		],
		dimgrey: [
			105,
			105,
			105
		],
		dodgerblue: [
			30,
			144,
			255
		],
		firebrick: [
			178,
			34,
			34
		],
		floralwhite: [
			255,
			255,
			240
		],
		forestgreen: [
			34,
			139,
			34
		],
		fuchsia: [
			255,
			0,
			255
		],
		gainsboro: [
			220,
			220,
			220
		],
		ghostwhite: [
			248,
			248,
			255
		],
		gold: [
			255,
			215,
			0
		],
		goldenrod: [
			218,
			165,
			32
		],
		gray: [
			128,
			128,
			128
		],
		green: [
			0,
			128,
			0
		],
		greenyellow: [
			173,
			255,
			47
		],
		grey: [
			128,
			128,
			128
		],
		honeydew: [
			240,
			255,
			240
		],
		hotpink: [
			255,
			105,
			180
		],
		indianred: [
			205,
			92,
			92
		],
		indigo: [
			75,
			0,
			130
		],
		ivory: [
			255,
			255,
			240
		],
		khaki: [
			240,
			230,
			140
		],
		lavender: [
			230,
			230,
			250
		],
		lavenderblush: [
			255,
			240,
			245
		],
		lawngreen: [
			124,
			252,
			0
		],
		lemonchiffon: [
			255,
			250,
			205
		],
		lightblue: [
			173,
			216,
			230
		],
		lightcoral: [
			240,
			128,
			128
		],
		lightcyan: [
			224,
			255,
			255
		],
		lightgoldenrodyellow: [
			250,
			250,
			210
		],
		lightgray: [
			211,
			211,
			211
		],
		lightgreen: [
			144,
			238,
			144
		],
		lightgrey: [
			211,
			211,
			211
		],
		lightpink: [
			255,
			182,
			193
		],
		lightsalmon: [
			255,
			160,
			122
		],
		lightseagreen: [
			32,
			178,
			170
		],
		lightskyblue: [
			135,
			206,
			250
		],
		lightslategray: [
			119,
			136,
			153
		],
		lightslategrey: [
			119,
			136,
			153
		],
		lightsteelblue: [
			176,
			196,
			222
		],
		lightyellow: [
			255,
			255,
			224
		],
		lime: [
			0,
			255,
			0
		],
		limegreen: [
			50,
			205,
			50
		],
		linen: [
			250,
			240,
			230
		],
		magenta: [
			255,
			0,
			255
		],
		maroon: [
			128,
			0,
			0
		],
		mediumaquamarine: [
			102,
			205,
			170
		],
		mediumblue: [
			0,
			0,
			205
		],
		mediumorchid: [
			186,
			85,
			211
		],
		mediumpurple: [
			147,
			112,
			219
		],
		mediumseagreen: [
			60,
			179,
			113
		],
		mediumslateblue: [
			123,
			104,
			238
		],
		mediumspringgreen: [
			0,
			250,
			154
		],
		mediumturquoise: [
			72,
			209,
			204
		],
		mediumvioletred: [
			199,
			21,
			133
		],
		midnightblue: [
			25,
			25,
			112
		],
		mintcream: [
			245,
			255,
			250
		],
		mistyrose: [
			255,
			228,
			225
		],
		moccasin: [
			255,
			228,
			181
		],
		navajowhite: [
			255,
			222,
			173
		],
		navy: [
			0,
			0,
			128
		],
		oldlace: [
			253,
			245,
			230
		],
		olive: [
			128,
			128,
			0
		],
		olivedrab: [
			107,
			142,
			35
		],
		orange: [
			255,
			165,
			0
		],
		orangered: [
			255,
			69,
			0
		],
		orchid: [
			218,
			112,
			214
		],
		palegoldenrod: [
			238,
			232,
			170
		],
		palegreen: [
			152,
			251,
			152
		],
		paleturquoise: [
			175,
			238,
			238
		],
		palevioletred: [
			219,
			112,
			147
		],
		papayawhip: [
			255,
			239,
			213
		],
		peachpuff: [
			255,
			218,
			185
		],
		peru: [
			205,
			133,
			63
		],
		pink: [
			255,
			192,
			203
		],
		plum: [
			221,
			160,
			203
		],
		powderblue: [
			176,
			224,
			230
		],
		purple: [
			128,
			0,
			128
		],
		rebeccapurple: [
			102,
			51,
			153
		],
		red: [
			255,
			0,
			0
		],
		rosybrown: [
			188,
			143,
			143
		],
		royalblue: [
			65,
			105,
			225
		],
		saddlebrown: [
			139,
			69,
			19
		],
		salmon: [
			250,
			128,
			114
		],
		sandybrown: [
			244,
			164,
			96
		],
		seagreen: [
			46,
			139,
			87
		],
		seashell: [
			255,
			245,
			238
		],
		sienna: [
			160,
			82,
			45
		],
		silver: [
			192,
			192,
			192
		],
		skyblue: [
			135,
			206,
			235
		],
		slateblue: [
			106,
			90,
			205
		],
		slategray: [
			119,
			128,
			144
		],
		slategrey: [
			119,
			128,
			144
		],
		snow: [
			255,
			255,
			250
		],
		springgreen: [
			0,
			255,
			127
		],
		steelblue: [
			70,
			130,
			180
		],
		tan: [
			210,
			180,
			140
		],
		teal: [
			0,
			128,
			128
		],
		thistle: [
			216,
			191,
			216
		],
		transparent: [
			255,
			255,
			255,
			0
		],
		tomato: [
			255,
			99,
			71
		],
		turquoise: [
			64,
			224,
			208
		],
		violet: [
			238,
			130,
			238
		],
		wheat: [
			245,
			222,
			179
		],
		white: [
			255,
			255,
			255
		],
		whitesmoke: [
			245,
			245,
			245
		],
		yellow: [
			255,
			255,
			0
		],
		yellowgreen: [
			154,
			205,
			5
		]
	}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
	var animQueue = [];
	var req = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame || function(f) {
		setTimeout(f, 60);
	};
	exports.Util = {
		_isElement(obj) {
			return !!(obj && obj.nodeType == 1);
		},
		_isFunction(obj) {
			return !!(obj && obj.constructor && obj.call && obj.apply);
		},
		_isPlainObject(obj) {
			return !!obj && obj.constructor === Object;
		},
		_isArray(obj) {
			return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
		},
		_isNumber(obj) {
			return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
		},
		_isString(obj) {
			return Object.prototype.toString.call(obj) === OBJECT_STRING;
		},
		_isBoolean(obj) {
			return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
		},
		isObject(val) {
			return val instanceof Object;
		},
		isValidSelector(selector) {
			if (typeof selector !== "string") return false;
			const firstChar = selector[0];
			return firstChar === "#" || firstChar === "." || firstChar === firstChar.toUpperCase();
		},
		_sign(number) {
			if (number === 0) return 1;
			if (number > 0) return 1;
			else return -1;
		},
		requestAnimFrame(callback) {
			animQueue.push(callback);
			if (animQueue.length === 1) req(function() {
				const queue = animQueue;
				animQueue = [];
				queue.forEach(function(cb) {
					cb();
				});
			});
		},
		createCanvasElement() {
			const canvas = document.createElement("canvas");
			try {
				canvas.style = canvas.style || {};
			} catch (e) {}
			return canvas;
		},
		createImageElement() {
			return document.createElement("img");
		},
		_isInDocument(el) {
			while (el = el.parentNode) if (el == document) return true;
			return false;
		},
		_urlToImage(url, callback) {
			const imageObj = exports.Util.createImageElement();
			imageObj.onload = function() {
				callback(imageObj);
			};
			imageObj.src = url;
		},
		_rgbToHex(r, g, b) {
			return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		},
		_hexToRgb(hex) {
			hex = hex.replace(HASH, EMPTY_STRING);
			const bigint = parseInt(hex, 16);
			return {
				r: bigint >> 16 & 255,
				g: bigint >> 8 & 255,
				b: bigint & 255
			};
		},
		getRandomColor() {
			let randColor = (Math.random() * 16777215 << 0).toString(16);
			while (randColor.length < 6) randColor = ZERO + randColor;
			return HASH + randColor;
		},
		getRGB(color) {
			let rgb;
			if (color in COLORS) {
				rgb = COLORS[color];
				return {
					r: rgb[0],
					g: rgb[1],
					b: rgb[2]
				};
			} else if (color[0] === HASH) return this._hexToRgb(color.substring(1));
			else if (color.substr(0, 4) === RGB_PAREN) {
				rgb = RGB_REGEX.exec(color.replace(/ /g, ""));
				return {
					r: parseInt(rgb[1], 10),
					g: parseInt(rgb[2], 10),
					b: parseInt(rgb[3], 10)
				};
			} else return {
				r: 0,
				g: 0,
				b: 0
			};
		},
		colorToRGBA(str) {
			str = str || "black";
			return exports.Util._namedColorToRBA(str) || exports.Util._hex3ColorToRGBA(str) || exports.Util._hex4ColorToRGBA(str) || exports.Util._hex6ColorToRGBA(str) || exports.Util._hex8ColorToRGBA(str) || exports.Util._rgbColorToRGBA(str) || exports.Util._rgbaColorToRGBA(str) || exports.Util._hslColorToRGBA(str);
		},
		_namedColorToRBA(str) {
			const c = COLORS[str.toLowerCase()];
			if (!c) return null;
			return {
				r: c[0],
				g: c[1],
				b: c[2],
				a: 1
			};
		},
		_rgbColorToRGBA(str) {
			if (str.indexOf("rgb(") === 0) {
				str = str.match(/rgb\(([^)]+)\)/)[1];
				const parts = str.split(/ *, */).map(Number);
				return {
					r: parts[0],
					g: parts[1],
					b: parts[2],
					a: 1
				};
			}
		},
		_rgbaColorToRGBA(str) {
			if (str.indexOf("rgba(") === 0) {
				str = str.match(/rgba\(([^)]+)\)/)[1];
				const parts = str.split(/ *, */).map((n, index) => {
					if (n.slice(-1) === "%") return index === 3 ? parseInt(n) / 100 : parseInt(n) / 100 * 255;
					return Number(n);
				});
				return {
					r: parts[0],
					g: parts[1],
					b: parts[2],
					a: parts[3]
				};
			}
		},
		_hex8ColorToRGBA(str) {
			if (str[0] === "#" && str.length === 9) return {
				r: parseInt(str.slice(1, 3), 16),
				g: parseInt(str.slice(3, 5), 16),
				b: parseInt(str.slice(5, 7), 16),
				a: parseInt(str.slice(7, 9), 16) / 255
			};
		},
		_hex6ColorToRGBA(str) {
			if (str[0] === "#" && str.length === 7) return {
				r: parseInt(str.slice(1, 3), 16),
				g: parseInt(str.slice(3, 5), 16),
				b: parseInt(str.slice(5, 7), 16),
				a: 1
			};
		},
		_hex4ColorToRGBA(str) {
			if (str[0] === "#" && str.length === 5) return {
				r: parseInt(str[1] + str[1], 16),
				g: parseInt(str[2] + str[2], 16),
				b: parseInt(str[3] + str[3], 16),
				a: parseInt(str[4] + str[4], 16) / 255
			};
		},
		_hex3ColorToRGBA(str) {
			if (str[0] === "#" && str.length === 4) return {
				r: parseInt(str[1] + str[1], 16),
				g: parseInt(str[2] + str[2], 16),
				b: parseInt(str[3] + str[3], 16),
				a: 1
			};
		},
		_hslColorToRGBA(str) {
			if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
				const [_, ...hsl] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str);
				const h = Number(hsl[0]) / 360;
				const s = Number(hsl[1]) / 100;
				const l = Number(hsl[2]) / 100;
				let t2;
				let t3;
				let val;
				if (s === 0) {
					val = l * 255;
					return {
						r: Math.round(val),
						g: Math.round(val),
						b: Math.round(val),
						a: 1
					};
				}
				if (l < .5) t2 = l * (1 + s);
				else t2 = l + s - l * s;
				const t1 = 2 * l - t2;
				const rgb = [
					0,
					0,
					0
				];
				for (let i = 0; i < 3; i++) {
					t3 = h + 1 / 3 * -(i - 1);
					if (t3 < 0) t3++;
					if (t3 > 1) t3--;
					if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
					else if (2 * t3 < 1) val = t2;
					else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
					else val = t1;
					rgb[i] = val * 255;
				}
				return {
					r: Math.round(rgb[0]),
					g: Math.round(rgb[1]),
					b: Math.round(rgb[2]),
					a: 1
				};
			}
		},
		haveIntersection(r1, r2) {
			return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
		},
		cloneObject(obj) {
			const retObj = {};
			for (const key in obj) if (this._isPlainObject(obj[key])) retObj[key] = this.cloneObject(obj[key]);
			else if (this._isArray(obj[key])) retObj[key] = this.cloneArray(obj[key]);
			else retObj[key] = obj[key];
			return retObj;
		},
		cloneArray(arr) {
			return arr.slice(0);
		},
		degToRad(deg) {
			return deg * PI_OVER_DEG180;
		},
		radToDeg(rad) {
			return rad * DEG180_OVER_PI;
		},
		_degToRad(deg) {
			exports.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead.");
			return exports.Util.degToRad(deg);
		},
		_radToDeg(rad) {
			exports.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead.");
			return exports.Util.radToDeg(rad);
		},
		_getRotation(radians) {
			return Global_1.Konva.angleDeg ? exports.Util.radToDeg(radians) : radians;
		},
		_capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		throw(str) {
			throw new Error(KONVA_ERROR + str);
		},
		error(str) {
			console.error(KONVA_ERROR + str);
		},
		warn(str) {
			if (!Global_1.Konva.showWarnings) return;
			console.warn(KONVA_WARNING + str);
		},
		each(obj, func) {
			for (const key in obj) func(key, obj[key]);
		},
		_inRange(val, left, right) {
			return left <= val && val < right;
		},
		_getProjectionToSegment(x1, y1, x2, y2, x3, y3) {
			let x, y, dist;
			const pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
			if (pd2 == 0) {
				x = x1;
				y = y1;
				dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
			} else {
				const u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
				if (u < 0) {
					x = x1;
					y = y1;
					dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
				} else if (u > 1) {
					x = x2;
					y = y2;
					dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
				} else {
					x = x1 + u * (x2 - x1);
					y = y1 + u * (y2 - y1);
					dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
				}
			}
			return [
				x,
				y,
				dist
			];
		},
		_getProjectionToLine(pt, line, isClosed) {
			const pc = exports.Util.cloneObject(pt);
			let dist = Number.MAX_VALUE;
			line.forEach(function(p1, i) {
				if (!isClosed && i === line.length - 1) return;
				const p2 = line[(i + 1) % line.length];
				const proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
				const px = proj[0], py = proj[1], pdist = proj[2];
				if (pdist < dist) {
					pc.x = px;
					pc.y = py;
					dist = pdist;
				}
			});
			return pc;
		},
		_prepareArrayForTween(startArray, endArray, isClosed) {
			const start = [], end = [];
			if (startArray.length > endArray.length) {
				const temp = endArray;
				endArray = startArray;
				startArray = temp;
			}
			for (let n = 0; n < startArray.length; n += 2) start.push({
				x: startArray[n],
				y: startArray[n + 1]
			});
			for (let n = 0; n < endArray.length; n += 2) end.push({
				x: endArray[n],
				y: endArray[n + 1]
			});
			const newStart = [];
			end.forEach(function(point) {
				const pr = exports.Util._getProjectionToLine(point, start, isClosed);
				newStart.push(pr.x);
				newStart.push(pr.y);
			});
			return newStart;
		},
		_prepareToStringify(obj) {
			let desc;
			obj.visitedByCircularReferenceRemoval = true;
			for (const key in obj) {
				if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == "object")) continue;
				desc = Object.getOwnPropertyDescriptor(obj, key);
				if (obj[key].visitedByCircularReferenceRemoval || exports.Util._isElement(obj[key])) if (desc.configurable) delete obj[key];
				else return null;
				else if (exports.Util._prepareToStringify(obj[key]) === null) if (desc.configurable) delete obj[key];
				else return null;
			}
			delete obj.visitedByCircularReferenceRemoval;
			return obj;
		},
		_assign(target, source) {
			for (const key in source) target[key] = source[key];
			return target;
		},
		_getFirstPointerId(evt) {
			if (!evt.touches) return evt.pointerId || 999;
			else return evt.changedTouches[0].identifier;
		},
		releaseCanvas(...canvases) {
			if (!Global_1.Konva.releaseCanvasOnDestroy) return;
			canvases.forEach((c) => {
				c.width = 0;
				c.height = 0;
			});
		},
		drawRoundedRectPath(context, width, height, cornerRadius) {
			let topLeft = 0;
			let topRight = 0;
			let bottomLeft = 0;
			let bottomRight = 0;
			if (typeof cornerRadius === "number") topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
			else {
				topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
				topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
				bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
				bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
			}
			context.moveTo(topLeft, 0);
			context.lineTo(width - topRight, 0);
			context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
			context.lineTo(width, height - bottomRight);
			context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
			context.lineTo(bottomLeft, height);
			context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
			context.lineTo(0, topLeft);
			context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/Context.js
var require_Context = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HitContext = exports.SceneContext = exports.Context = void 0;
	var Util_1 = require_Util();
	var Global_1 = require_Global();
	function simplifyArray(arr) {
		const retArr = [], len = arr.length, util = Util_1.Util;
		for (let n = 0; n < len; n++) {
			let val = arr[n];
			if (util._isNumber(val)) val = Math.round(val * 1e3) / 1e3;
			else if (!util._isString(val)) val = val + "";
			retArr.push(val);
		}
		return retArr;
	}
	var COMMA = ",", OPEN_PAREN = "(", CLOSE_PAREN = ")", OPEN_PAREN_BRACKET = "([", CLOSE_BRACKET_PAREN = "])", SEMICOLON = ";", DOUBLE_PAREN = "()", EQUALS = "=", CONTEXT_METHODS = [
		"arc",
		"arcTo",
		"beginPath",
		"bezierCurveTo",
		"clearRect",
		"clip",
		"closePath",
		"createLinearGradient",
		"createPattern",
		"createRadialGradient",
		"drawImage",
		"ellipse",
		"fill",
		"fillText",
		"getImageData",
		"createImageData",
		"lineTo",
		"moveTo",
		"putImageData",
		"quadraticCurveTo",
		"rect",
		"roundRect",
		"restore",
		"rotate",
		"save",
		"scale",
		"setLineDash",
		"setTransform",
		"stroke",
		"strokeText",
		"transform",
		"translate"
	];
	var CONTEXT_PROPERTIES = [
		"fillStyle",
		"strokeStyle",
		"shadowColor",
		"shadowBlur",
		"shadowOffsetX",
		"shadowOffsetY",
		"letterSpacing",
		"lineCap",
		"lineDashOffset",
		"lineJoin",
		"lineWidth",
		"miterLimit",
		"direction",
		"font",
		"textAlign",
		"textBaseline",
		"globalAlpha",
		"globalCompositeOperation",
		"imageSmoothingEnabled"
	];
	var traceArrMax = 100;
	var Context = class {
		constructor(canvas) {
			this.canvas = canvas;
			if (Global_1.Konva.enableTrace) {
				this.traceArr = [];
				this._enableTrace();
			}
		}
		fillShape(shape) {
			if (shape.fillEnabled()) this._fill(shape);
		}
		_fill(shape) {}
		strokeShape(shape) {
			if (shape.hasStroke()) this._stroke(shape);
		}
		_stroke(shape) {}
		fillStrokeShape(shape) {
			if (shape.attrs.fillAfterStrokeEnabled) {
				this.strokeShape(shape);
				this.fillShape(shape);
			} else {
				this.fillShape(shape);
				this.strokeShape(shape);
			}
		}
		getTrace(relaxed, rounded) {
			let traceArr = this.traceArr, len = traceArr.length, str = "", n, trace, method, args;
			for (n = 0; n < len; n++) {
				trace = traceArr[n];
				method = trace.method;
				if (method) {
					args = trace.args;
					str += method;
					if (relaxed) str += DOUBLE_PAREN;
					else if (Util_1.Util._isArray(args[0])) str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
					else {
						if (rounded) args = args.map((a) => typeof a === "number" ? Math.floor(a) : a);
						str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
					}
				} else {
					str += trace.property;
					if (!relaxed) str += EQUALS + trace.val;
				}
				str += SEMICOLON;
			}
			return str;
		}
		clearTrace() {
			this.traceArr = [];
		}
		_trace(str) {
			let traceArr = this.traceArr, len;
			traceArr.push(str);
			len = traceArr.length;
			if (len >= traceArrMax) traceArr.shift();
		}
		reset() {
			const pixelRatio = this.getCanvas().getPixelRatio();
			this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
		}
		getCanvas() {
			return this.canvas;
		}
		clear(bounds) {
			const canvas = this.getCanvas();
			if (bounds) this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
			else this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
		}
		_applyLineCap(shape) {
			const lineCap = shape.attrs.lineCap;
			if (lineCap) this.setAttr("lineCap", lineCap);
		}
		_applyOpacity(shape) {
			const absOpacity = shape.getAbsoluteOpacity();
			if (absOpacity !== 1) this.setAttr("globalAlpha", absOpacity);
		}
		_applyLineJoin(shape) {
			const lineJoin = shape.attrs.lineJoin;
			if (lineJoin) this.setAttr("lineJoin", lineJoin);
		}
		setAttr(attr, val) {
			this._context[attr] = val;
		}
		arc(x, y, radius, startAngle, endAngle, counterClockwise) {
			this._context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		}
		arcTo(x1, y1, x2, y2, radius) {
			this._context.arcTo(x1, y1, x2, y2, radius);
		}
		beginPath() {
			this._context.beginPath();
		}
		bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
			this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		}
		clearRect(x, y, width, height) {
			this._context.clearRect(x, y, width, height);
		}
		clip(...args) {
			this._context.clip.apply(this._context, args);
		}
		closePath() {
			this._context.closePath();
		}
		createImageData(width, height) {
			const a = arguments;
			if (a.length === 2) return this._context.createImageData(width, height);
			else if (a.length === 1) return this._context.createImageData(width);
		}
		createLinearGradient(x0, y0, x1, y1) {
			return this._context.createLinearGradient(x0, y0, x1, y1);
		}
		createPattern(image, repetition) {
			return this._context.createPattern(image, repetition);
		}
		createRadialGradient(x0, y0, r0, x1, y1, r1) {
			return this._context.createRadialGradient(x0, y0, r0, x1, y1, r1);
		}
		drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
			const a = arguments, _context = this._context;
			if (a.length === 3) _context.drawImage(image, sx, sy);
			else if (a.length === 5) _context.drawImage(image, sx, sy, sWidth, sHeight);
			else if (a.length === 9) _context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		}
		ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
			this._context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
		}
		isPointInPath(x, y, path, fillRule) {
			if (path) return this._context.isPointInPath(path, x, y, fillRule);
			return this._context.isPointInPath(x, y, fillRule);
		}
		fill(...args) {
			this._context.fill.apply(this._context, args);
		}
		fillRect(x, y, width, height) {
			this._context.fillRect(x, y, width, height);
		}
		strokeRect(x, y, width, height) {
			this._context.strokeRect(x, y, width, height);
		}
		fillText(text, x, y, maxWidth) {
			if (maxWidth) this._context.fillText(text, x, y, maxWidth);
			else this._context.fillText(text, x, y);
		}
		measureText(text) {
			return this._context.measureText(text);
		}
		getImageData(sx, sy, sw, sh) {
			return this._context.getImageData(sx, sy, sw, sh);
		}
		lineTo(x, y) {
			this._context.lineTo(x, y);
		}
		moveTo(x, y) {
			this._context.moveTo(x, y);
		}
		rect(x, y, width, height) {
			this._context.rect(x, y, width, height);
		}
		roundRect(x, y, width, height, radii) {
			this._context.roundRect(x, y, width, height, radii);
		}
		putImageData(imageData, dx, dy) {
			this._context.putImageData(imageData, dx, dy);
		}
		quadraticCurveTo(cpx, cpy, x, y) {
			this._context.quadraticCurveTo(cpx, cpy, x, y);
		}
		restore() {
			this._context.restore();
		}
		rotate(angle) {
			this._context.rotate(angle);
		}
		save() {
			this._context.save();
		}
		scale(x, y) {
			this._context.scale(x, y);
		}
		setLineDash(segments) {
			if (this._context.setLineDash) this._context.setLineDash(segments);
			else if ("mozDash" in this._context) this._context["mozDash"] = segments;
			else if ("webkitLineDash" in this._context) this._context["webkitLineDash"] = segments;
		}
		getLineDash() {
			return this._context.getLineDash();
		}
		setTransform(a, b, c, d, e, f) {
			this._context.setTransform(a, b, c, d, e, f);
		}
		stroke(path2d) {
			if (path2d) this._context.stroke(path2d);
			else this._context.stroke();
		}
		strokeText(text, x, y, maxWidth) {
			this._context.strokeText(text, x, y, maxWidth);
		}
		transform(a, b, c, d, e, f) {
			this._context.transform(a, b, c, d, e, f);
		}
		translate(x, y) {
			this._context.translate(x, y);
		}
		_enableTrace() {
			let that = this, len = CONTEXT_METHODS.length, origSetter = this.setAttr, n, args;
			const func = function(methodName) {
				let origMethod = that[methodName], ret;
				that[methodName] = function() {
					args = simplifyArray(Array.prototype.slice.call(arguments, 0));
					ret = origMethod.apply(that, arguments);
					that._trace({
						method: methodName,
						args
					});
					return ret;
				};
			};
			for (n = 0; n < len; n++) func(CONTEXT_METHODS[n]);
			that.setAttr = function() {
				origSetter.apply(that, arguments);
				const prop = arguments[0];
				let val = arguments[1];
				if (prop === "shadowOffsetX" || prop === "shadowOffsetY" || prop === "shadowBlur") val = val / this.canvas.getPixelRatio();
				that._trace({
					property: prop,
					val
				});
			};
		}
		_applyGlobalCompositeOperation(node) {
			const op = node.attrs.globalCompositeOperation;
			if (!(!op || op === "source-over")) this.setAttr("globalCompositeOperation", op);
		}
	};
	exports.Context = Context;
	CONTEXT_PROPERTIES.forEach(function(prop) {
		Object.defineProperty(Context.prototype, prop, {
			get() {
				return this._context[prop];
			},
			set(val) {
				this._context[prop] = val;
			}
		});
	});
	var SceneContext = class extends Context {
		constructor(canvas, { willReadFrequently = false } = {}) {
			super(canvas);
			this._context = canvas._canvas.getContext("2d", { willReadFrequently });
		}
		_fillColor(shape) {
			const fill = shape.fill();
			this.setAttr("fillStyle", fill);
			shape._fillFunc(this);
		}
		_fillPattern(shape) {
			this.setAttr("fillStyle", shape._getFillPattern());
			shape._fillFunc(this);
		}
		_fillLinearGradient(shape) {
			const grd = shape._getLinearGradient();
			if (grd) {
				this.setAttr("fillStyle", grd);
				shape._fillFunc(this);
			}
		}
		_fillRadialGradient(shape) {
			const grd = shape._getRadialGradient();
			if (grd) {
				this.setAttr("fillStyle", grd);
				shape._fillFunc(this);
			}
		}
		_fill(shape) {
			const hasColor = shape.fill(), fillPriority = shape.getFillPriority();
			if (hasColor && fillPriority === "color") {
				this._fillColor(shape);
				return;
			}
			const hasPattern = shape.getFillPatternImage();
			if (hasPattern && fillPriority === "pattern") {
				this._fillPattern(shape);
				return;
			}
			const hasLinearGradient = shape.getFillLinearGradientColorStops();
			if (hasLinearGradient && fillPriority === "linear-gradient") {
				this._fillLinearGradient(shape);
				return;
			}
			const hasRadialGradient = shape.getFillRadialGradientColorStops();
			if (hasRadialGradient && fillPriority === "radial-gradient") {
				this._fillRadialGradient(shape);
				return;
			}
			if (hasColor) this._fillColor(shape);
			else if (hasPattern) this._fillPattern(shape);
			else if (hasLinearGradient) this._fillLinearGradient(shape);
			else if (hasRadialGradient) this._fillRadialGradient(shape);
		}
		_strokeLinearGradient(shape) {
			const start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
			if (colorStops) {
				for (let n = 0; n < colorStops.length; n += 2) grd.addColorStop(colorStops[n], colorStops[n + 1]);
				this.setAttr("strokeStyle", grd);
			}
		}
		_stroke(shape) {
			const dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
			if (shape.hasStroke()) {
				if (!strokeScaleEnabled) {
					this.save();
					const pixelRatio = this.getCanvas().getPixelRatio();
					this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				}
				this._applyLineCap(shape);
				if (dash && shape.dashEnabled()) {
					this.setLineDash(dash);
					this.setAttr("lineDashOffset", shape.dashOffset());
				}
				this.setAttr("lineWidth", shape.strokeWidth());
				if (!shape.getShadowForStrokeEnabled()) this.setAttr("shadowColor", "rgba(0,0,0,0)");
				if (shape.getStrokeLinearGradientColorStops()) this._strokeLinearGradient(shape);
				else this.setAttr("strokeStyle", shape.stroke());
				shape._strokeFunc(this);
				if (!strokeScaleEnabled) this.restore();
			}
		}
		_applyShadow(shape) {
			var _a, _b, _c;
			const color = (_a = shape.getShadowRGBA()) !== null && _a !== void 0 ? _a : "black", blur = (_b = shape.getShadowBlur()) !== null && _b !== void 0 ? _b : 5, offset = (_c = shape.getShadowOffset()) !== null && _c !== void 0 ? _c : {
				x: 0,
				y: 0
			}, scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
			this.setAttr("shadowColor", color);
			this.setAttr("shadowBlur", blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
			this.setAttr("shadowOffsetX", offset.x * scaleX);
			this.setAttr("shadowOffsetY", offset.y * scaleY);
		}
	};
	exports.SceneContext = SceneContext;
	var HitContext = class extends Context {
		constructor(canvas) {
			super(canvas);
			this._context = canvas._canvas.getContext("2d", { willReadFrequently: true });
		}
		_fill(shape) {
			this.save();
			this.setAttr("fillStyle", shape.colorKey);
			shape._fillFuncHit(this);
			this.restore();
		}
		strokeShape(shape) {
			if (shape.hasHitStroke()) this._stroke(shape);
		}
		_stroke(shape) {
			if (shape.hasHitStroke()) {
				const strokeScaleEnabled = shape.getStrokeScaleEnabled();
				if (!strokeScaleEnabled) {
					this.save();
					const pixelRatio = this.getCanvas().getPixelRatio();
					this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				}
				this._applyLineCap(shape);
				const hitStrokeWidth = shape.hitStrokeWidth();
				const strokeWidth = hitStrokeWidth === "auto" ? shape.strokeWidth() : hitStrokeWidth;
				this.setAttr("lineWidth", strokeWidth);
				this.setAttr("strokeStyle", shape.colorKey);
				shape._strokeFuncHit(this);
				if (!strokeScaleEnabled) this.restore();
			}
		}
	};
	exports.HitContext = HitContext;
}));
//#endregion
//#region node_modules/konva/lib/Canvas.js
var require_Canvas = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HitCanvas = exports.SceneCanvas = exports.Canvas = void 0;
	var Util_1 = require_Util();
	var Context_1 = require_Context();
	var Global_1 = require_Global();
	var _pixelRatio;
	function getDevicePixelRatio() {
		if (_pixelRatio) return _pixelRatio;
		const canvas = Util_1.Util.createCanvasElement();
		const context = canvas.getContext("2d");
		_pixelRatio = (function() {
			return (Global_1.Konva._global.devicePixelRatio || 1) / (context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1);
		})();
		Util_1.Util.releaseCanvas(canvas);
		return _pixelRatio;
	}
	var Canvas = class {
		constructor(config) {
			this.pixelRatio = 1;
			this.width = 0;
			this.height = 0;
			this.isCache = false;
			const pixelRatio = (config || {}).pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
			this.pixelRatio = pixelRatio;
			this._canvas = Util_1.Util.createCanvasElement();
			this._canvas.style.padding = "0";
			this._canvas.style.margin = "0";
			this._canvas.style.border = "0";
			this._canvas.style.background = "transparent";
			this._canvas.style.position = "absolute";
			this._canvas.style.top = "0";
			this._canvas.style.left = "0";
		}
		getContext() {
			return this.context;
		}
		getPixelRatio() {
			return this.pixelRatio;
		}
		setPixelRatio(pixelRatio) {
			const previousRatio = this.pixelRatio;
			this.pixelRatio = pixelRatio;
			this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
		}
		setWidth(width) {
			this.width = this._canvas.width = width * this.pixelRatio;
			this._canvas.style.width = width + "px";
			const pixelRatio = this.pixelRatio;
			this.getContext()._context.scale(pixelRatio, pixelRatio);
		}
		setHeight(height) {
			this.height = this._canvas.height = height * this.pixelRatio;
			this._canvas.style.height = height + "px";
			const pixelRatio = this.pixelRatio;
			this.getContext()._context.scale(pixelRatio, pixelRatio);
		}
		getWidth() {
			return this.width;
		}
		getHeight() {
			return this.height;
		}
		setSize(width, height) {
			this.setWidth(width || 0);
			this.setHeight(height || 0);
		}
		toDataURL(mimeType, quality) {
			try {
				return this._canvas.toDataURL(mimeType, quality);
			} catch (e) {
				try {
					return this._canvas.toDataURL();
				} catch (err) {
					Util_1.Util.error("Unable to get data URL. " + err.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.");
					return "";
				}
			}
		}
	};
	exports.Canvas = Canvas;
	var SceneCanvas = class extends Canvas {
		constructor(config = {
			width: 0,
			height: 0,
			willReadFrequently: false
		}) {
			super(config);
			this.context = new Context_1.SceneContext(this, { willReadFrequently: config.willReadFrequently });
			this.setSize(config.width, config.height);
		}
	};
	exports.SceneCanvas = SceneCanvas;
	var HitCanvas = class extends Canvas {
		constructor(config = {
			width: 0,
			height: 0
		}) {
			super(config);
			this.hitCanvas = true;
			this.context = new Context_1.HitContext(this);
			this.setSize(config.width, config.height);
		}
	};
	exports.HitCanvas = HitCanvas;
}));
//#endregion
//#region node_modules/konva/lib/DragAndDrop.js
var require_DragAndDrop = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DD = void 0;
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	exports.DD = {
		get isDragging() {
			let flag = false;
			exports.DD._dragElements.forEach((elem) => {
				if (elem.dragStatus === "dragging") flag = true;
			});
			return flag;
		},
		justDragged: false,
		get node() {
			let node;
			exports.DD._dragElements.forEach((elem) => {
				node = elem.node;
			});
			return node;
		},
		_dragElements: /* @__PURE__ */ new Map(),
		_drag(evt) {
			const nodesToFireEvents = [];
			exports.DD._dragElements.forEach((elem, key) => {
				const { node } = elem;
				const stage = node.getStage();
				stage.setPointersPositions(evt);
				if (elem.pointerId === void 0) elem.pointerId = Util_1.Util._getFirstPointerId(evt);
				const pos = stage._changedPointerPositions.find((pos) => pos.id === elem.pointerId);
				if (!pos) return;
				if (elem.dragStatus !== "dragging") {
					const dragDistance = node.dragDistance();
					if (Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y)) < dragDistance) return;
					node.startDrag({ evt });
					if (!node.isDragging()) return;
				}
				node._setDragPosition(evt, elem);
				nodesToFireEvents.push(node);
			});
			nodesToFireEvents.forEach((node) => {
				node.fire("dragmove", {
					type: "dragmove",
					target: node,
					evt
				}, true);
			});
		},
		_endDragBefore(evt) {
			const drawNodes = [];
			exports.DD._dragElements.forEach((elem) => {
				const { node } = elem;
				const stage = node.getStage();
				if (evt) stage.setPointersPositions(evt);
				if (!stage._changedPointerPositions.find((pos) => pos.id === elem.pointerId)) return;
				if (elem.dragStatus === "dragging" || elem.dragStatus === "stopped") {
					exports.DD.justDragged = true;
					Global_1.Konva._mouseListenClick = false;
					Global_1.Konva._touchListenClick = false;
					Global_1.Konva._pointerListenClick = false;
					elem.dragStatus = "stopped";
				}
				const drawNode = elem.node.getLayer() || elem.node instanceof Global_1.Konva["Stage"] && elem.node;
				if (drawNode && drawNodes.indexOf(drawNode) === -1) drawNodes.push(drawNode);
			});
			drawNodes.forEach((drawNode) => {
				drawNode.draw();
			});
		},
		_endDragAfter(evt) {
			exports.DD._dragElements.forEach((elem, key) => {
				if (elem.dragStatus === "stopped") elem.node.fire("dragend", {
					type: "dragend",
					target: elem.node,
					evt
				}, true);
				if (elem.dragStatus !== "dragging") exports.DD._dragElements.delete(key);
			});
		}
	};
	if (Global_1.Konva.isBrowser) {
		window.addEventListener("mouseup", exports.DD._endDragBefore, true);
		window.addEventListener("touchend", exports.DD._endDragBefore, true);
		window.addEventListener("touchcancel", exports.DD._endDragBefore, true);
		window.addEventListener("mousemove", exports.DD._drag);
		window.addEventListener("touchmove", exports.DD._drag);
		window.addEventListener("mouseup", exports.DD._endDragAfter, false);
		window.addEventListener("touchend", exports.DD._endDragAfter, false);
		window.addEventListener("touchcancel", exports.DD._endDragAfter, false);
	}
}));
//#endregion
//#region node_modules/konva/lib/Validators.js
var require_Validators = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RGBComponent = RGBComponent;
	exports.alphaComponent = alphaComponent;
	exports.getNumberValidator = getNumberValidator;
	exports.getNumberOrArrayOfNumbersValidator = getNumberOrArrayOfNumbersValidator;
	exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
	exports.getStringValidator = getStringValidator;
	exports.getStringOrGradientValidator = getStringOrGradientValidator;
	exports.getFunctionValidator = getFunctionValidator;
	exports.getNumberArrayValidator = getNumberArrayValidator;
	exports.getBooleanValidator = getBooleanValidator;
	exports.getComponentValidator = getComponentValidator;
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	function _formatValue(val) {
		if (Util_1.Util._isString(val)) return "\"" + val + "\"";
		if (Object.prototype.toString.call(val) === "[object Number]") return val;
		if (Util_1.Util._isBoolean(val)) return val;
		return Object.prototype.toString.call(val);
	}
	function RGBComponent(val) {
		if (val > 255) return 255;
		else if (val < 0) return 0;
		return Math.round(val);
	}
	function alphaComponent(val) {
		if (val > 1) return 1;
		else if (val < 1e-4) return 1e-4;
		return val;
	}
	function getNumberValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (!Util_1.Util._isNumber(val)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a number.");
			return val;
		};
	}
	function getNumberOrArrayOfNumbersValidator(noOfElements) {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			let isNumber = Util_1.Util._isNumber(val);
			let isValidArray = Util_1.Util._isArray(val) && val.length == noOfElements;
			if (!isNumber && !isValidArray) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a number or Array<number>(" + noOfElements + ")");
			return val;
		};
	}
	function getNumberOrAutoValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (!(Util_1.Util._isNumber(val) || val === "auto")) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a number or \"auto\".");
			return val;
		};
	}
	function getStringValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (!Util_1.Util._isString(val)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a string.");
			return val;
		};
	}
	function getStringOrGradientValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			const isString = Util_1.Util._isString(val);
			const isGradient = Object.prototype.toString.call(val) === "[object CanvasGradient]" || val && val["addColorStop"];
			if (!(isString || isGradient)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a string or a native gradient.");
			return val;
		};
	}
	function getFunctionValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (!Util_1.Util._isFunction(val)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a function.");
			return val;
		};
	}
	function getNumberArrayValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			const TypedArray = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
			if (TypedArray && val instanceof TypedArray) return val;
			if (!Util_1.Util._isArray(val)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a array of numbers.");
			else val.forEach(function(item) {
				if (!Util_1.Util._isNumber(item)) Util_1.Util.warn("\"" + attr + "\" attribute has non numeric element " + item + ". Make sure that all elements are numbers.");
			});
			return val;
		};
	}
	function getBooleanValidator() {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (!(val === true || val === false)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be a boolean.");
			return val;
		};
	}
	function getComponentValidator(components) {
		if (Global_1.Konva.isUnminified) return function(val, attr) {
			if (val === void 0 || val === null) return val;
			if (!Util_1.Util.isObject(val)) Util_1.Util.warn(_formatValue(val) + " is a not valid value for \"" + attr + "\" attribute. The value should be an object with properties " + components);
			return val;
		};
	}
}));
//#endregion
//#region node_modules/konva/lib/Factory.js
var require_Factory = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Factory = void 0;
	var Util_1 = require_Util();
	var Validators_1 = require_Validators();
	var GET = "get";
	var SET = "set";
	exports.Factory = {
		addGetterSetter(constructor, attr, def, validator, after) {
			exports.Factory.addGetter(constructor, attr, def);
			exports.Factory.addSetter(constructor, attr, validator, after);
			exports.Factory.addOverloadedGetterSetter(constructor, attr);
		},
		addGetter(constructor, attr, def) {
			const method = GET + Util_1.Util._capitalize(attr);
			constructor.prototype[method] = constructor.prototype[method] || function() {
				const val = this.attrs[attr];
				return val === void 0 ? def : val;
			};
		},
		addSetter(constructor, attr, validator, after) {
			const method = SET + Util_1.Util._capitalize(attr);
			if (!constructor.prototype[method]) exports.Factory.overWriteSetter(constructor, attr, validator, after);
		},
		overWriteSetter(constructor, attr, validator, after) {
			const method = SET + Util_1.Util._capitalize(attr);
			constructor.prototype[method] = function(val) {
				if (validator && val !== void 0 && val !== null) val = validator.call(this, val, attr);
				this._setAttr(attr, val);
				if (after) after.call(this);
				return this;
			};
		},
		addComponentsGetterSetter(constructor, attr, components, validator, after) {
			const len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr);
			constructor.prototype[getter] = function() {
				const ret = {};
				for (let n = 0; n < len; n++) {
					const component = components[n];
					ret[component] = this.getAttr(attr + capitalize(component));
				}
				return ret;
			};
			const basicValidator = (0, Validators_1.getComponentValidator)(components);
			constructor.prototype[setter] = function(val) {
				const oldVal = this.attrs[attr];
				if (validator) val = validator.call(this, val, attr);
				if (basicValidator) basicValidator.call(this, val, attr);
				for (const key in val) {
					if (!val.hasOwnProperty(key)) continue;
					this._setAttr(attr + capitalize(key), val[key]);
				}
				if (!val) components.forEach((component) => {
					this._setAttr(attr + capitalize(component), void 0);
				});
				this._fireChangeEvent(attr, oldVal, val);
				if (after) after.call(this);
				return this;
			};
			exports.Factory.addOverloadedGetterSetter(constructor, attr);
		},
		addOverloadedGetterSetter(constructor, attr) {
			const capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
			constructor.prototype[attr] = function() {
				if (arguments.length) {
					this[setter](arguments[0]);
					return this;
				}
				return this[getter]();
			};
		},
		addDeprecatedGetterSetter(constructor, attr, def, validator) {
			Util_1.Util.error("Adding deprecated " + attr);
			const method = GET + Util_1.Util._capitalize(attr);
			const message = attr + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
			constructor.prototype[method] = function() {
				Util_1.Util.error(message);
				const val = this.attrs[attr];
				return val === void 0 ? def : val;
			};
			exports.Factory.addSetter(constructor, attr, validator, function() {
				Util_1.Util.error(message);
			});
			exports.Factory.addOverloadedGetterSetter(constructor, attr);
		},
		backCompat(constructor, methods) {
			Util_1.Util.each(methods, function(oldMethodName, newMethodName) {
				const method = constructor.prototype[newMethodName];
				const oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
				const oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
				function deprecated() {
					method.apply(this, arguments);
					Util_1.Util.error("\"" + oldMethodName + "\" method is deprecated and will be removed soon. Use \"\"" + newMethodName + "\" instead.");
				}
				constructor.prototype[oldMethodName] = deprecated;
				constructor.prototype[oldGetter] = deprecated;
				constructor.prototype[oldSetter] = deprecated;
			});
		},
		afterSetFilter() {
			this._filterUpToDate = false;
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/Node.js
var require_Node = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Node = void 0;
	var Canvas_1 = require_Canvas();
	var DragAndDrop_1 = require_DragAndDrop();
	var Factory_1 = require_Factory();
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	var Validators_1 = require_Validators(), ABSOLUTE_OPACITY = "absoluteOpacity", ALL_LISTENERS = "allEventListeners", ABSOLUTE_TRANSFORM = "absoluteTransform", ABSOLUTE_SCALE = "absoluteScale", CANVAS = "canvas", CHANGE = "Change", CHILDREN = "children", KONVA = "konva", LISTENING = "listening", MOUSEENTER = "mouseenter", MOUSELEAVE = "mouseleave", POINTERENTER = "pointerenter", POINTERLEAVE = "pointerleave", TOUCHENTER = "touchenter", TOUCHLEAVE = "touchleave", SET = "set", SHAPE = "Shape", SPACE = " ", STAGE = "stage", TRANSFORM = "transform", UPPER_STAGE = "Stage", VISIBLE = "visible", TRANSFORM_CHANGE_STR = [
		"xChange.konva",
		"yChange.konva",
		"scaleXChange.konva",
		"scaleYChange.konva",
		"skewXChange.konva",
		"skewYChange.konva",
		"rotationChange.konva",
		"offsetXChange.konva",
		"offsetYChange.konva",
		"transformsEnabledChange.konva"
	].join(SPACE);
	var idCounter = 1;
	var Node = class Node {
		constructor(config) {
			this._id = idCounter++;
			this.eventListeners = {};
			this.attrs = {};
			this.index = 0;
			this._allEventListeners = null;
			this.parent = null;
			this._cache = /* @__PURE__ */ new Map();
			this._attachedDepsListeners = /* @__PURE__ */ new Map();
			this._lastPos = null;
			this._batchingTransformChange = false;
			this._needClearTransformCache = false;
			this._filterUpToDate = false;
			this._isUnderCache = false;
			this._dragEventId = null;
			this._shouldFireChangeEvents = false;
			this.setAttrs(config);
			this._shouldFireChangeEvents = true;
		}
		hasChildren() {
			return false;
		}
		_clearCache(attr) {
			if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache.get(attr)) this._cache.get(attr).dirty = true;
			else if (attr) this._cache.delete(attr);
			else this._cache.clear();
		}
		_getCache(attr, privateGetter) {
			let cache = this._cache.get(attr);
			if (cache === void 0 || (attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && cache.dirty === true) {
				cache = privateGetter.call(this);
				this._cache.set(attr, cache);
			}
			return cache;
		}
		_calculate(name, deps, getter) {
			if (!this._attachedDepsListeners.get(name)) {
				const depsString = deps.map((dep) => dep + "Change.konva").join(SPACE);
				this.on(depsString, () => {
					this._clearCache(name);
				});
				this._attachedDepsListeners.set(name, true);
			}
			return this._getCache(name, getter);
		}
		_getCanvasCache() {
			return this._cache.get(CANVAS);
		}
		_clearSelfAndDescendantCache(attr) {
			this._clearCache(attr);
			if (attr === ABSOLUTE_TRANSFORM) this.fire("absoluteTransformChange");
		}
		clearCache() {
			if (this._cache.has(CANVAS)) {
				const { scene, filter, hit, buffer } = this._cache.get(CANVAS);
				Util_1.Util.releaseCanvas(scene, filter, hit, buffer);
				this._cache.delete(CANVAS);
			}
			this._clearSelfAndDescendantCache();
			this._requestDraw();
			return this;
		}
		cache(config) {
			const conf = config || {};
			let rect = {};
			if (conf.x === void 0 || conf.y === void 0 || conf.width === void 0 || conf.height === void 0) rect = this.getClientRect({
				skipTransform: true,
				relativeTo: this.getParent() || void 0
			});
			let width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x = conf.x === void 0 ? Math.floor(rect.x) : conf.x, y = conf.y === void 0 ? Math.floor(rect.y) : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false, hitCanvasPixelRatio = conf.hitCanvasPixelRatio || 1;
			if (!width || !height) {
				Util_1.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
				return;
			}
			const extraPaddingX = Math.abs(Math.round(rect.x) - x) > .5 ? 1 : 0;
			const extraPaddingY = Math.abs(Math.round(rect.y) - y) > .5 ? 1 : 0;
			width += offset * 2 + extraPaddingX;
			height += offset * 2 + extraPaddingY;
			x -= offset;
			y -= offset;
			const cachedSceneCanvas = new Canvas_1.SceneCanvas({
				pixelRatio,
				width,
				height
			}), cachedFilterCanvas = new Canvas_1.SceneCanvas({
				pixelRatio,
				width: 0,
				height: 0,
				willReadFrequently: true
			}), cachedHitCanvas = new Canvas_1.HitCanvas({
				pixelRatio: hitCanvasPixelRatio,
				width,
				height
			}), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
			const bufferCanvas = new Canvas_1.SceneCanvas({
				width: cachedSceneCanvas.width / cachedSceneCanvas.pixelRatio + Math.abs(x),
				height: cachedSceneCanvas.height / cachedSceneCanvas.pixelRatio + Math.abs(y),
				pixelRatio: cachedSceneCanvas.pixelRatio
			}), bufferContext = bufferCanvas.getContext();
			cachedHitCanvas.isCache = true;
			cachedSceneCanvas.isCache = true;
			this._cache.delete(CANVAS);
			this._filterUpToDate = false;
			if (conf.imageSmoothingEnabled === false) {
				cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
				cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
			}
			sceneContext.save();
			hitContext.save();
			bufferContext.save();
			sceneContext.translate(-x, -y);
			hitContext.translate(-x, -y);
			bufferContext.translate(-x, -y);
			bufferCanvas.x = x;
			bufferCanvas.y = y;
			this._isUnderCache = true;
			this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
			this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
			this.drawScene(cachedSceneCanvas, this, bufferCanvas);
			this.drawHit(cachedHitCanvas, this);
			this._isUnderCache = false;
			sceneContext.restore();
			hitContext.restore();
			if (drawBorder) {
				sceneContext.save();
				sceneContext.beginPath();
				sceneContext.rect(0, 0, width, height);
				sceneContext.closePath();
				sceneContext.setAttr("strokeStyle", "red");
				sceneContext.setAttr("lineWidth", 5);
				sceneContext.stroke();
				sceneContext.restore();
			}
			this._cache.set(CANVAS, {
				scene: cachedSceneCanvas,
				filter: cachedFilterCanvas,
				hit: cachedHitCanvas,
				buffer: bufferCanvas,
				x,
				y
			});
			this._requestDraw();
			return this;
		}
		isCached() {
			return this._cache.has(CANVAS);
		}
		getClientRect(config) {
			throw new Error("abstract \"getClientRect\" method call");
		}
		_transformedRect(rect, top) {
			const points = [
				{
					x: rect.x,
					y: rect.y
				},
				{
					x: rect.x + rect.width,
					y: rect.y
				},
				{
					x: rect.x + rect.width,
					y: rect.y + rect.height
				},
				{
					x: rect.x,
					y: rect.y + rect.height
				}
			];
			let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
			const trans = this.getAbsoluteTransform(top);
			points.forEach(function(point) {
				const transformed = trans.point(point);
				if (minX === void 0) {
					minX = maxX = transformed.x;
					minY = maxY = transformed.y;
				}
				minX = Math.min(minX, transformed.x);
				minY = Math.min(minY, transformed.y);
				maxX = Math.max(maxX, transformed.x);
				maxY = Math.max(maxY, transformed.y);
			});
			return {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
		}
		_drawCachedSceneCanvas(context) {
			context.save();
			context._applyOpacity(this);
			context._applyGlobalCompositeOperation(this);
			const canvasCache = this._getCanvasCache();
			context.translate(canvasCache.x, canvasCache.y);
			const cacheCanvas = this._getCachedSceneCanvas();
			const ratio = cacheCanvas.pixelRatio;
			context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
			context.restore();
		}
		_drawCachedHitCanvas(context) {
			const canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
			context.save();
			context.translate(canvasCache.x, canvasCache.y);
			context.drawImage(hitCanvas._canvas, 0, 0, hitCanvas.width / hitCanvas.pixelRatio, hitCanvas.height / hitCanvas.pixelRatio);
			context.restore();
		}
		_getCachedSceneCanvas() {
			let filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
			if (filters) {
				if (!this._filterUpToDate) {
					const ratio = sceneCanvas.pixelRatio;
					filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);
					try {
						len = filters.length;
						filterContext.clear();
						filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
						imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
						for (n = 0; n < len; n++) {
							filter = filters[n];
							if (typeof filter !== "function") {
								Util_1.Util.error("Filter should be type of function, but got " + typeof filter + " instead. Please check correct filters");
								continue;
							}
							filter.call(this, imageData);
							filterContext.putImageData(imageData, 0, 0);
						}
					} catch (e) {
						Util_1.Util.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
					}
					this._filterUpToDate = true;
				}
				return filterCanvas;
			}
			return sceneCanvas;
		}
		on(evtStr, handler) {
			if (this._cache) this._cache.delete(ALL_LISTENERS);
			if (arguments.length === 3) return this._delegate.apply(this, arguments);
			const events = evtStr.split(SPACE);
			for (let n = 0; n < events.length; n++) {
				const parts = events[n].split(".");
				const baseEvent = parts[0];
				const name = parts[1] || "";
				if (!this.eventListeners[baseEvent]) this.eventListeners[baseEvent] = [];
				this.eventListeners[baseEvent].push({
					name,
					handler
				});
			}
			return this;
		}
		off(evtStr, callback) {
			let events = (evtStr || "").split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
			this._cache && this._cache.delete(ALL_LISTENERS);
			if (!evtStr) for (t in this.eventListeners) this._off(t);
			for (n = 0; n < len; n++) {
				event = events[n];
				parts = event.split(".");
				baseEvent = parts[0];
				name = parts[1];
				if (baseEvent) {
					if (this.eventListeners[baseEvent]) this._off(baseEvent, name, callback);
				} else for (t in this.eventListeners) this._off(t, name, callback);
			}
			return this;
		}
		dispatchEvent(evt) {
			const e = {
				target: this,
				type: evt.type,
				evt
			};
			this.fire(evt.type, e);
			return this;
		}
		addEventListener(type, handler) {
			this.on(type, function(evt) {
				handler.call(this, evt.evt);
			});
			return this;
		}
		removeEventListener(type) {
			this.off(type);
			return this;
		}
		_delegate(event, selector, handler) {
			const stopNode = this;
			this.on(event, function(evt) {
				const targets = evt.target.findAncestors(selector, true, stopNode);
				for (let i = 0; i < targets.length; i++) {
					evt = Util_1.Util.cloneObject(evt);
					evt.currentTarget = targets[i];
					handler.call(targets[i], evt);
				}
			});
		}
		remove() {
			if (this.isDragging()) this.stopDrag();
			DragAndDrop_1.DD._dragElements.delete(this._id);
			this._remove();
			return this;
		}
		_clearCaches() {
			this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
			this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
			this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
			this._clearSelfAndDescendantCache(STAGE);
			this._clearSelfAndDescendantCache(VISIBLE);
			this._clearSelfAndDescendantCache(LISTENING);
		}
		_remove() {
			this._clearCaches();
			const parent = this.getParent();
			if (parent && parent.children) {
				parent.children.splice(this.index, 1);
				parent._setChildrenIndices();
				this.parent = null;
			}
		}
		destroy() {
			this.remove();
			this.clearCache();
			return this;
		}
		getAttr(attr) {
			const method = "get" + Util_1.Util._capitalize(attr);
			if (Util_1.Util._isFunction(this[method])) return this[method]();
			return this.attrs[attr];
		}
		getAncestors() {
			let parent = this.getParent(), ancestors = [];
			while (parent) {
				ancestors.push(parent);
				parent = parent.getParent();
			}
			return ancestors;
		}
		getAttrs() {
			return this.attrs || {};
		}
		setAttrs(config) {
			this._batchTransformChanges(() => {
				let key, method;
				if (!config) return this;
				for (key in config) {
					if (key === CHILDREN) continue;
					method = SET + Util_1.Util._capitalize(key);
					if (Util_1.Util._isFunction(this[method])) this[method](config[key]);
					else this._setAttr(key, config[key]);
				}
			});
			return this;
		}
		isListening() {
			return this._getCache(LISTENING, this._isListening);
		}
		_isListening(relativeTo) {
			if (!this.listening()) return false;
			const parent = this.getParent();
			if (parent && parent !== relativeTo && this !== relativeTo) return parent._isListening(relativeTo);
			else return true;
		}
		isVisible() {
			return this._getCache(VISIBLE, this._isVisible);
		}
		_isVisible(relativeTo) {
			if (!this.visible()) return false;
			const parent = this.getParent();
			if (parent && parent !== relativeTo && this !== relativeTo) return parent._isVisible(relativeTo);
			else return true;
		}
		shouldDrawHit(top, skipDragCheck = false) {
			if (top) return this._isVisible(top) && this._isListening(top);
			const layer = this.getLayer();
			let layerUnderDrag = false;
			DragAndDrop_1.DD._dragElements.forEach((elem) => {
				if (elem.dragStatus !== "dragging") return;
				else if (elem.node.nodeType === "Stage") layerUnderDrag = true;
				else if (elem.node.getLayer() === layer) layerUnderDrag = true;
			});
			const dragSkip = !skipDragCheck && !Global_1.Konva.hitOnDragEnabled && (layerUnderDrag || Global_1.Konva.isTransforming());
			return this.isListening() && this.isVisible() && !dragSkip;
		}
		show() {
			this.visible(true);
			return this;
		}
		hide() {
			this.visible(false);
			return this;
		}
		getZIndex() {
			return this.index || 0;
		}
		getAbsoluteZIndex() {
			let depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
			function addChildren(children) {
				nodes = [];
				len = children.length;
				for (n = 0; n < len; n++) {
					child = children[n];
					index++;
					if (child.nodeType !== SHAPE) nodes = nodes.concat(child.getChildren().slice());
					if (child._id === that._id) n = len;
				}
				if (nodes.length > 0 && nodes[0].getDepth() <= depth) addChildren(nodes);
			}
			const stage = this.getStage();
			if (that.nodeType !== UPPER_STAGE && stage) addChildren(stage.getChildren());
			return index;
		}
		getDepth() {
			let depth = 0, parent = this.parent;
			while (parent) {
				depth++;
				parent = parent.parent;
			}
			return depth;
		}
		_batchTransformChanges(func) {
			this._batchingTransformChange = true;
			func();
			this._batchingTransformChange = false;
			if (this._needClearTransformCache) {
				this._clearCache(TRANSFORM);
				this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
			}
			this._needClearTransformCache = false;
		}
		setPosition(pos) {
			this._batchTransformChanges(() => {
				this.x(pos.x);
				this.y(pos.y);
			});
			return this;
		}
		getPosition() {
			return {
				x: this.x(),
				y: this.y()
			};
		}
		getRelativePointerPosition() {
			const stage = this.getStage();
			if (!stage) return null;
			const pos = stage.getPointerPosition();
			if (!pos) return null;
			const transform = this.getAbsoluteTransform().copy();
			transform.invert();
			return transform.point(pos);
		}
		getAbsolutePosition(top) {
			let haveCachedParent = false;
			let parent = this.parent;
			while (parent) {
				if (parent.isCached()) {
					haveCachedParent = true;
					break;
				}
				parent = parent.parent;
			}
			if (haveCachedParent && !top) top = true;
			const absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
			absoluteTransform.m = absoluteMatrix.slice();
			absoluteTransform.translate(offset.x, offset.y);
			return absoluteTransform.getTranslation();
		}
		setAbsolutePosition(pos) {
			const { x, y, ...origTrans } = this._clearTransform();
			this.attrs.x = x;
			this.attrs.y = y;
			this._clearCache(TRANSFORM);
			const it = this._getAbsoluteTransform().copy();
			it.invert();
			it.translate(pos.x, pos.y);
			pos = {
				x: this.attrs.x + it.getTranslation().x,
				y: this.attrs.y + it.getTranslation().y
			};
			this._setTransform(origTrans);
			this.setPosition({
				x: pos.x,
				y: pos.y
			});
			this._clearCache(TRANSFORM);
			this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
			return this;
		}
		_setTransform(trans) {
			let key;
			for (key in trans) this.attrs[key] = trans[key];
		}
		_clearTransform() {
			const trans = {
				x: this.x(),
				y: this.y(),
				rotation: this.rotation(),
				scaleX: this.scaleX(),
				scaleY: this.scaleY(),
				offsetX: this.offsetX(),
				offsetY: this.offsetY(),
				skewX: this.skewX(),
				skewY: this.skewY()
			};
			this.attrs.x = 0;
			this.attrs.y = 0;
			this.attrs.rotation = 0;
			this.attrs.scaleX = 1;
			this.attrs.scaleY = 1;
			this.attrs.offsetX = 0;
			this.attrs.offsetY = 0;
			this.attrs.skewX = 0;
			this.attrs.skewY = 0;
			return trans;
		}
		move(change) {
			let changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
			if (changeX !== void 0) x += changeX;
			if (changeY !== void 0) y += changeY;
			this.setPosition({
				x,
				y
			});
			return this;
		}
		_eachAncestorReverse(func, top) {
			let family = [], parent = this.getParent(), len, n;
			if (top && top._id === this._id) return;
			family.unshift(this);
			while (parent && (!top || parent._id !== top._id)) {
				family.unshift(parent);
				parent = parent.parent;
			}
			len = family.length;
			for (n = 0; n < len; n++) func(family[n]);
		}
		rotate(theta) {
			this.rotation(this.rotation() + theta);
			return this;
		}
		moveToTop() {
			if (!this.parent) {
				Util_1.Util.warn("Node has no parent. moveToTop function is ignored.");
				return false;
			}
			const index = this.index;
			if (index < this.parent.getChildren().length - 1) {
				this.parent.children.splice(index, 1);
				this.parent.children.push(this);
				this.parent._setChildrenIndices();
				return true;
			}
			return false;
		}
		moveUp() {
			if (!this.parent) {
				Util_1.Util.warn("Node has no parent. moveUp function is ignored.");
				return false;
			}
			const index = this.index;
			if (index < this.parent.getChildren().length - 1) {
				this.parent.children.splice(index, 1);
				this.parent.children.splice(index + 1, 0, this);
				this.parent._setChildrenIndices();
				return true;
			}
			return false;
		}
		moveDown() {
			if (!this.parent) {
				Util_1.Util.warn("Node has no parent. moveDown function is ignored.");
				return false;
			}
			const index = this.index;
			if (index > 0) {
				this.parent.children.splice(index, 1);
				this.parent.children.splice(index - 1, 0, this);
				this.parent._setChildrenIndices();
				return true;
			}
			return false;
		}
		moveToBottom() {
			if (!this.parent) {
				Util_1.Util.warn("Node has no parent. moveToBottom function is ignored.");
				return false;
			}
			const index = this.index;
			if (index > 0) {
				this.parent.children.splice(index, 1);
				this.parent.children.unshift(this);
				this.parent._setChildrenIndices();
				return true;
			}
			return false;
		}
		setZIndex(zIndex) {
			if (!this.parent) {
				Util_1.Util.warn("Node has no parent. zIndex parameter is ignored.");
				return this;
			}
			if (zIndex < 0 || zIndex >= this.parent.children.length) Util_1.Util.warn("Unexpected value " + zIndex + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
			const index = this.index;
			this.parent.children.splice(index, 1);
			this.parent.children.splice(zIndex, 0, this);
			this.parent._setChildrenIndices();
			return this;
		}
		getAbsoluteOpacity() {
			return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
		}
		_getAbsoluteOpacity() {
			let absOpacity = this.opacity();
			const parent = this.getParent();
			if (parent && !parent._isUnderCache) absOpacity *= parent.getAbsoluteOpacity();
			return absOpacity;
		}
		moveTo(newContainer) {
			if (this.getParent() !== newContainer) {
				this._remove();
				newContainer.add(this);
			}
			return this;
		}
		toObject() {
			let attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
			const obj = {
				attrs: {},
				className: this.getClassName()
			};
			for (key in attrs) {
				val = attrs[key];
				nonPlainObject = Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
				if (nonPlainObject) continue;
				getter = typeof this[key] === "function" && this[key];
				delete attrs[key];
				defaultValue = getter ? getter.call(this) : null;
				attrs[key] = val;
				if (defaultValue !== val) obj.attrs[key] = val;
			}
			return Util_1.Util._prepareToStringify(obj);
		}
		toJSON() {
			return JSON.stringify(this.toObject());
		}
		getParent() {
			return this.parent;
		}
		findAncestors(selector, includeSelf, stopNode) {
			const res = [];
			if (includeSelf && this._isMatch(selector)) res.push(this);
			let ancestor = this.parent;
			while (ancestor) {
				if (ancestor === stopNode) return res;
				if (ancestor._isMatch(selector)) res.push(ancestor);
				ancestor = ancestor.parent;
			}
			return res;
		}
		isAncestorOf(node) {
			return false;
		}
		findAncestor(selector, includeSelf, stopNode) {
			return this.findAncestors(selector, includeSelf, stopNode)[0];
		}
		_isMatch(selector) {
			if (!selector) return false;
			if (typeof selector === "function") return selector(this);
			let selectorArr = selector.replace(/ /g, "").split(","), len = selectorArr.length, n, sel;
			for (n = 0; n < len; n++) {
				sel = selectorArr[n];
				if (!Util_1.Util.isValidSelector(sel)) {
					Util_1.Util.warn("Selector \"" + sel + "\" is invalid. Allowed selectors examples are \"#foo\", \".bar\" or \"Group\".");
					Util_1.Util.warn("If you have a custom shape with such className, please change it to start with upper letter like \"Triangle\".");
					Util_1.Util.warn("Konva is awesome, right?");
				}
				if (sel.charAt(0) === "#") {
					if (this.id() === sel.slice(1)) return true;
				} else if (sel.charAt(0) === ".") {
					if (this.hasName(sel.slice(1))) return true;
				} else if (this.className === sel || this.nodeType === sel) return true;
			}
			return false;
		}
		getLayer() {
			const parent = this.getParent();
			return parent ? parent.getLayer() : null;
		}
		getStage() {
			return this._getCache(STAGE, this._getStage);
		}
		_getStage() {
			const parent = this.getParent();
			if (parent) return parent.getStage();
			else return null;
		}
		fire(eventType, evt = {}, bubble) {
			evt.target = evt.target || this;
			if (bubble) this._fireAndBubble(eventType, evt);
			else this._fire(eventType, evt);
			return this;
		}
		getAbsoluteTransform(top) {
			if (top) return this._getAbsoluteTransform(top);
			else return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
		}
		_getAbsoluteTransform(top) {
			let at;
			if (top) {
				at = new Util_1.Transform();
				this._eachAncestorReverse(function(node) {
					const transformsEnabled = node.transformsEnabled();
					if (transformsEnabled === "all") at.multiply(node.getTransform());
					else if (transformsEnabled === "position") at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
				}, top);
				return at;
			} else {
				at = this._cache.get(ABSOLUTE_TRANSFORM) || new Util_1.Transform();
				if (this.parent) this.parent.getAbsoluteTransform().copyInto(at);
				else at.reset();
				const transformsEnabled = this.transformsEnabled();
				if (transformsEnabled === "all") at.multiply(this.getTransform());
				else if (transformsEnabled === "position") {
					const x = this.attrs.x || 0;
					const y = this.attrs.y || 0;
					const offsetX = this.attrs.offsetX || 0;
					const offsetY = this.attrs.offsetY || 0;
					at.translate(x - offsetX, y - offsetY);
				}
				at.dirty = false;
				return at;
			}
		}
		getAbsoluteScale(top) {
			let parent = this;
			while (parent) {
				if (parent._isUnderCache) top = parent;
				parent = parent.getParent();
			}
			const attrs = this.getAbsoluteTransform(top).decompose();
			return {
				x: attrs.scaleX,
				y: attrs.scaleY
			};
		}
		getAbsoluteRotation() {
			return this.getAbsoluteTransform().decompose().rotation;
		}
		getTransform() {
			return this._getCache(TRANSFORM, this._getTransform);
		}
		_getTransform() {
			var _a, _b;
			const m = this._cache.get(TRANSFORM) || new Util_1.Transform();
			m.reset();
			const x = this.x(), y = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
			if (x !== 0 || y !== 0) m.translate(x, y);
			if (rotation !== 0) m.rotate(rotation);
			if (skewX !== 0 || skewY !== 0) m.skew(skewX, skewY);
			if (scaleX !== 1 || scaleY !== 1) m.scale(scaleX, scaleY);
			if (offsetX !== 0 || offsetY !== 0) m.translate(-1 * offsetX, -1 * offsetY);
			m.dirty = false;
			return m;
		}
		clone(obj) {
			let attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
			for (key in obj) attrs[key] = obj[key];
			const node = new this.constructor(attrs);
			for (key in this.eventListeners) {
				allListeners = this.eventListeners[key];
				len = allListeners.length;
				for (n = 0; n < len; n++) {
					listener = allListeners[n];
					if (listener.name.indexOf(KONVA) < 0) {
						if (!node.eventListeners[key]) node.eventListeners[key] = [];
						node.eventListeners[key].push(listener);
					}
				}
			}
			return node;
		}
		_toKonvaCanvas(config) {
			config = config || {};
			const box = this.getClientRect();
			const stage = this.getStage(), x = config.x !== void 0 ? config.x : Math.floor(box.x), y = config.y !== void 0 ? config.y : Math.floor(box.y), pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
				width: config.width || Math.ceil(box.width) || (stage ? stage.width() : 0),
				height: config.height || Math.ceil(box.height) || (stage ? stage.height() : 0),
				pixelRatio
			}), context = canvas.getContext();
			const bufferCanvas = new Canvas_1.SceneCanvas({
				width: canvas.width / canvas.pixelRatio + Math.abs(x),
				height: canvas.height / canvas.pixelRatio + Math.abs(y),
				pixelRatio: canvas.pixelRatio
			});
			if (config.imageSmoothingEnabled === false) context._context.imageSmoothingEnabled = false;
			context.save();
			if (x || y) context.translate(-1 * x, -1 * y);
			this.drawScene(canvas, void 0, bufferCanvas);
			context.restore();
			return canvas;
		}
		toCanvas(config) {
			return this._toKonvaCanvas(config)._canvas;
		}
		toDataURL(config) {
			config = config || {};
			const mimeType = config.mimeType || null, quality = config.quality || null;
			const url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
			if (config.callback) config.callback(url);
			return url;
		}
		toImage(config) {
			return new Promise((resolve, reject) => {
				try {
					const callback = config === null || config === void 0 ? void 0 : config.callback;
					if (callback) delete config.callback;
					Util_1.Util._urlToImage(this.toDataURL(config), function(img) {
						resolve(img);
						callback === null || callback === void 0 || callback(img);
					});
				} catch (err) {
					reject(err);
				}
			});
		}
		toBlob(config) {
			return new Promise((resolve, reject) => {
				try {
					const callback = config === null || config === void 0 ? void 0 : config.callback;
					if (callback) delete config.callback;
					this.toCanvas(config).toBlob((blob) => {
						resolve(blob);
						callback === null || callback === void 0 || callback(blob);
					}, config === null || config === void 0 ? void 0 : config.mimeType, config === null || config === void 0 ? void 0 : config.quality);
				} catch (err) {
					reject(err);
				}
			});
		}
		setSize(size) {
			this.width(size.width);
			this.height(size.height);
			return this;
		}
		getSize() {
			return {
				width: this.width(),
				height: this.height()
			};
		}
		getClassName() {
			return this.className || this.nodeType;
		}
		getType() {
			return this.nodeType;
		}
		getDragDistance() {
			if (this.attrs.dragDistance !== void 0) return this.attrs.dragDistance;
			else if (this.parent) return this.parent.getDragDistance();
			else return Global_1.Konva.dragDistance;
		}
		_off(type, name, callback) {
			let evtListeners = this.eventListeners[type], i, evtName, handler;
			for (i = 0; i < evtListeners.length; i++) {
				evtName = evtListeners[i].name;
				handler = evtListeners[i].handler;
				if ((evtName !== "konva" || name === "konva") && (!name || evtName === name) && (!callback || callback === handler)) {
					evtListeners.splice(i, 1);
					if (evtListeners.length === 0) {
						delete this.eventListeners[type];
						break;
					}
					i--;
				}
			}
		}
		_fireChangeEvent(attr, oldVal, newVal) {
			this._fire(attr + CHANGE, {
				oldVal,
				newVal
			});
		}
		addName(name) {
			if (!this.hasName(name)) {
				const oldName = this.name();
				const newName = oldName ? oldName + " " + name : name;
				this.name(newName);
			}
			return this;
		}
		hasName(name) {
			if (!name) return false;
			const fullName = this.name();
			if (!fullName) return false;
			return (fullName || "").split(/\s/g).indexOf(name) !== -1;
		}
		removeName(name) {
			const names = (this.name() || "").split(/\s/g);
			const index = names.indexOf(name);
			if (index !== -1) {
				names.splice(index, 1);
				this.name(names.join(" "));
			}
			return this;
		}
		setAttr(attr, val) {
			const func = this[SET + Util_1.Util._capitalize(attr)];
			if (Util_1.Util._isFunction(func)) func.call(this, val);
			else this._setAttr(attr, val);
			return this;
		}
		_requestDraw() {
			if (Global_1.Konva.autoDrawEnabled) {
				const drawNode = this.getLayer() || this.getStage();
				drawNode === null || drawNode === void 0 || drawNode.batchDraw();
			}
		}
		_setAttr(key, val) {
			const oldVal = this.attrs[key];
			if (oldVal === val && !Util_1.Util.isObject(val)) return;
			if (val === void 0 || val === null) delete this.attrs[key];
			else this.attrs[key] = val;
			if (this._shouldFireChangeEvents) this._fireChangeEvent(key, oldVal, val);
			this._requestDraw();
		}
		_setComponentAttr(key, component, val) {
			let oldVal;
			if (val !== void 0) {
				oldVal = this.attrs[key];
				if (!oldVal) this.attrs[key] = this.getAttr(key);
				this.attrs[key][component] = val;
				this._fireChangeEvent(key, oldVal, val);
			}
		}
		_fireAndBubble(eventType, evt, compareShape) {
			if (evt && this.nodeType === SHAPE) evt.target = this;
			const nonBubbling = [
				MOUSEENTER,
				MOUSELEAVE,
				POINTERENTER,
				POINTERLEAVE,
				TOUCHENTER,
				TOUCHLEAVE
			];
			if (!(nonBubbling.indexOf(eventType) !== -1 && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === "Stage" && !compareShape))) {
				this._fire(eventType, evt);
				const stopBubble = nonBubbling.indexOf(eventType) !== -1 && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);
				if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) if (compareShape && compareShape.parent) this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
				else this._fireAndBubble.call(this.parent, eventType, evt);
			}
		}
		_getProtoListeners(eventType) {
			var _a, _b, _c;
			const allListeners = (_a = this._cache.get(ALL_LISTENERS)) !== null && _a !== void 0 ? _a : {};
			let events = allListeners === null || allListeners === void 0 ? void 0 : allListeners[eventType];
			if (events === void 0) {
				events = [];
				let obj = Object.getPrototypeOf(this);
				while (obj) {
					const hierarchyEvents = (_c = (_b = obj.eventListeners) === null || _b === void 0 ? void 0 : _b[eventType]) !== null && _c !== void 0 ? _c : [];
					events.push(...hierarchyEvents);
					obj = Object.getPrototypeOf(obj);
				}
				allListeners[eventType] = events;
				this._cache.set(ALL_LISTENERS, allListeners);
			}
			return events;
		}
		_fire(eventType, evt) {
			evt = evt || {};
			evt.currentTarget = this;
			evt.type = eventType;
			const topListeners = this._getProtoListeners(eventType);
			if (topListeners) for (let i = 0; i < topListeners.length; i++) topListeners[i].handler.call(this, evt);
			const selfListeners = this.eventListeners[eventType];
			if (selfListeners) for (let i = 0; i < selfListeners.length; i++) selfListeners[i].handler.call(this, evt);
		}
		draw() {
			this.drawScene();
			this.drawHit();
			return this;
		}
		_createDragElement(evt) {
			const pointerId = evt ? evt.pointerId : void 0;
			const stage = this.getStage();
			const ap = this.getAbsolutePosition();
			if (!stage) return;
			const pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;
			DragAndDrop_1.DD._dragElements.set(this._id, {
				node: this,
				startPointerPos: pos,
				offset: {
					x: pos.x - ap.x,
					y: pos.y - ap.y
				},
				dragStatus: "ready",
				pointerId
			});
		}
		startDrag(evt, bubbleEvent = true) {
			if (!DragAndDrop_1.DD._dragElements.has(this._id)) this._createDragElement(evt);
			const elem = DragAndDrop_1.DD._dragElements.get(this._id);
			elem.dragStatus = "dragging";
			this.fire("dragstart", {
				type: "dragstart",
				target: this,
				evt: evt && evt.evt
			}, bubbleEvent);
		}
		_setDragPosition(evt, elem) {
			const pos = this.getStage()._getPointerById(elem.pointerId);
			if (!pos) return;
			let newNodePos = {
				x: pos.x - elem.offset.x,
				y: pos.y - elem.offset.y
			};
			const dbf = this.dragBoundFunc();
			if (dbf !== void 0) {
				const bounded = dbf.call(this, newNodePos, evt);
				if (!bounded) Util_1.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
				else newNodePos = bounded;
			}
			if (!this._lastPos || this._lastPos.x !== newNodePos.x || this._lastPos.y !== newNodePos.y) {
				this.setAbsolutePosition(newNodePos);
				this._requestDraw();
			}
			this._lastPos = newNodePos;
		}
		stopDrag(evt) {
			const elem = DragAndDrop_1.DD._dragElements.get(this._id);
			if (elem) elem.dragStatus = "stopped";
			DragAndDrop_1.DD._endDragBefore(evt);
			DragAndDrop_1.DD._endDragAfter(evt);
		}
		setDraggable(draggable) {
			this._setAttr("draggable", draggable);
			this._dragChange();
		}
		isDragging() {
			const elem = DragAndDrop_1.DD._dragElements.get(this._id);
			return elem ? elem.dragStatus === "dragging" : false;
		}
		_listenDrag() {
			this._dragCleanup();
			this.on("mousedown.konva touchstart.konva", function(evt) {
				if (!(!(evt.evt["button"] !== void 0) || Global_1.Konva.dragButtons.indexOf(evt.evt["button"]) >= 0)) return;
				if (this.isDragging()) return;
				let hasDraggingChild = false;
				DragAndDrop_1.DD._dragElements.forEach((elem) => {
					if (this.isAncestorOf(elem.node)) hasDraggingChild = true;
				});
				if (!hasDraggingChild) this._createDragElement(evt);
			});
		}
		_dragChange() {
			if (this.attrs.draggable) this._listenDrag();
			else {
				this._dragCleanup();
				if (!this.getStage()) return;
				const dragElement = DragAndDrop_1.DD._dragElements.get(this._id);
				const isDragging = dragElement && dragElement.dragStatus === "dragging";
				const isReady = dragElement && dragElement.dragStatus === "ready";
				if (isDragging) this.stopDrag();
				else if (isReady) DragAndDrop_1.DD._dragElements.delete(this._id);
			}
		}
		_dragCleanup() {
			this.off("mousedown.konva");
			this.off("touchstart.konva");
		}
		isClientRectOnScreen(margin = {
			x: 0,
			y: 0
		}) {
			const stage = this.getStage();
			if (!stage) return false;
			const screenRect = {
				x: -margin.x,
				y: -margin.y,
				width: stage.width() + 2 * margin.x,
				height: stage.height() + 2 * margin.y
			};
			return Util_1.Util.haveIntersection(screenRect, this.getClientRect());
		}
		static create(data, container) {
			if (Util_1.Util._isString(data)) data = JSON.parse(data);
			return this._createNode(data, container);
		}
		static _createNode(obj, container) {
			let className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
			if (container) obj.attrs.container = container;
			if (!Global_1.Konva[className]) {
				Util_1.Util.warn("Can not find a node with class name \"" + className + "\". Fallback to \"Shape\".");
				className = "Shape";
			}
			const Class = Global_1.Konva[className];
			no = new Class(obj.attrs);
			if (children) {
				len = children.length;
				for (n = 0; n < len; n++) no.add(Node._createNode(children[n]));
			}
			return no;
		}
	};
	exports.Node = Node;
	Node.prototype.nodeType = "Node";
	Node.prototype._attrsAffectingSize = [];
	Node.prototype.eventListeners = {};
	Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function() {
		if (this._batchingTransformChange) {
			this._needClearTransformCache = true;
			return;
		}
		this._clearCache(TRANSFORM);
		this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	});
	Node.prototype.on.call(Node.prototype, "visibleChange.konva", function() {
		this._clearSelfAndDescendantCache(VISIBLE);
	});
	Node.prototype.on.call(Node.prototype, "listeningChange.konva", function() {
		this._clearSelfAndDescendantCache(LISTENING);
	});
	Node.prototype.on.call(Node.prototype, "opacityChange.konva", function() {
		this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	});
	var addGetterSetter = Factory_1.Factory.addGetterSetter;
	addGetterSetter(Node, "zIndex");
	addGetterSetter(Node, "absolutePosition");
	addGetterSetter(Node, "position");
	addGetterSetter(Node, "x", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "y", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "globalCompositeOperation", "source-over", (0, Validators_1.getStringValidator)());
	addGetterSetter(Node, "opacity", 1, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "name", "", (0, Validators_1.getStringValidator)());
	addGetterSetter(Node, "id", "", (0, Validators_1.getStringValidator)());
	addGetterSetter(Node, "rotation", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Node, "scale", ["x", "y"]);
	addGetterSetter(Node, "scaleX", 1, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "scaleY", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Node, "skew", ["x", "y"]);
	addGetterSetter(Node, "skewX", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "skewY", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Node, "offset", ["x", "y"]);
	addGetterSetter(Node, "offsetX", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "offsetY", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "dragDistance", void 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "width", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "height", 0, (0, Validators_1.getNumberValidator)());
	addGetterSetter(Node, "listening", true, (0, Validators_1.getBooleanValidator)());
	addGetterSetter(Node, "preventDefault", true, (0, Validators_1.getBooleanValidator)());
	addGetterSetter(Node, "filters", void 0, function(val) {
		this._filterUpToDate = false;
		return val;
	});
	addGetterSetter(Node, "visible", true, (0, Validators_1.getBooleanValidator)());
	addGetterSetter(Node, "transformsEnabled", "all", (0, Validators_1.getStringValidator)());
	addGetterSetter(Node, "size");
	addGetterSetter(Node, "dragBoundFunc");
	addGetterSetter(Node, "draggable", false, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.backCompat(Node, {
		rotateDeg: "rotate",
		setRotationDeg: "setRotation",
		getRotationDeg: "getRotation"
	});
}));
//#endregion
//#region node_modules/konva/lib/Container.js
var require_Container = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Container = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Container = class extends Node_1.Node {
		constructor() {
			super(...arguments);
			this.children = [];
		}
		getChildren(filterFunc) {
			const children = this.children || [];
			if (filterFunc) return children.filter(filterFunc);
			return children;
		}
		hasChildren() {
			return this.getChildren().length > 0;
		}
		removeChildren() {
			this.getChildren().forEach((child) => {
				child.parent = null;
				child.index = 0;
				child.remove();
			});
			this.children = [];
			this._requestDraw();
			return this;
		}
		destroyChildren() {
			this.getChildren().forEach((child) => {
				child.parent = null;
				child.index = 0;
				child.destroy();
			});
			this.children = [];
			this._requestDraw();
			return this;
		}
		add(...children) {
			if (children.length === 0) return this;
			if (children.length > 1) {
				for (let i = 0; i < children.length; i++) this.add(children[i]);
				return this;
			}
			const child = children[0];
			if (child.getParent()) {
				child.moveTo(this);
				return this;
			}
			this._validateAdd(child);
			child.index = this.getChildren().length;
			child.parent = this;
			child._clearCaches();
			this.getChildren().push(child);
			this._fire("add", { child });
			this._requestDraw();
			return this;
		}
		destroy() {
			if (this.hasChildren()) this.destroyChildren();
			super.destroy();
			return this;
		}
		find(selector) {
			return this._generalFind(selector, false);
		}
		findOne(selector) {
			const result = this._generalFind(selector, true);
			return result.length > 0 ? result[0] : void 0;
		}
		_generalFind(selector, findOne) {
			const retArr = [];
			this._descendants((node) => {
				const valid = node._isMatch(selector);
				if (valid) retArr.push(node);
				if (valid && findOne) return true;
				return false;
			});
			return retArr;
		}
		_descendants(fn) {
			let shouldStop = false;
			const children = this.getChildren();
			for (const child of children) {
				shouldStop = fn(child);
				if (shouldStop) return true;
				if (!child.hasChildren()) continue;
				shouldStop = child._descendants(fn);
				if (shouldStop) return true;
			}
			return false;
		}
		toObject() {
			const obj = Node_1.Node.prototype.toObject.call(this);
			obj.children = [];
			this.getChildren().forEach((child) => {
				obj.children.push(child.toObject());
			});
			return obj;
		}
		isAncestorOf(node) {
			let parent = node.getParent();
			while (parent) {
				if (parent._id === this._id) return true;
				parent = parent.getParent();
			}
			return false;
		}
		clone(obj) {
			const node = Node_1.Node.prototype.clone.call(this, obj);
			this.getChildren().forEach(function(no) {
				node.add(no.clone());
			});
			return node;
		}
		getAllIntersections(pos) {
			const arr = [];
			this.find("Shape").forEach((shape) => {
				if (shape.isVisible() && shape.intersects(pos)) arr.push(shape);
			});
			return arr;
		}
		_clearSelfAndDescendantCache(attr) {
			var _a;
			super._clearSelfAndDescendantCache(attr);
			if (this.isCached()) return;
			(_a = this.children) === null || _a === void 0 || _a.forEach(function(node) {
				node._clearSelfAndDescendantCache(attr);
			});
		}
		_setChildrenIndices() {
			var _a;
			(_a = this.children) === null || _a === void 0 || _a.forEach(function(child, n) {
				child.index = n;
			});
			this._requestDraw();
		}
		drawScene(can, top, bufferCanvas) {
			const layer = this.getLayer(), canvas = can || layer && layer.getCanvas(), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
			const caching = canvas && canvas.isCache;
			if (!this.isVisible() && !caching) return this;
			if (cachedSceneCanvas) {
				context.save();
				const m = this.getAbsoluteTransform(top).getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
				this._drawCachedSceneCanvas(context);
				context.restore();
			} else this._drawChildren("drawScene", canvas, top, bufferCanvas);
			return this;
		}
		drawHit(can, top) {
			if (!this.shouldDrawHit(top)) return this;
			const layer = this.getLayer(), canvas = can || layer && layer.hitCanvas, context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache();
			if (cachedCanvas && cachedCanvas.hit) {
				context.save();
				const m = this.getAbsoluteTransform(top).getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
				this._drawCachedHitCanvas(context);
				context.restore();
			} else this._drawChildren("drawHit", canvas, top);
			return this;
		}
		_drawChildren(drawMethod, canvas, top, bufferCanvas) {
			var _a;
			const context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = typeof clipWidth === "number" && typeof clipHeight === "number" || clipFunc;
			const selfCache = top === this;
			if (hasClip) {
				context.save();
				const transform = this.getAbsoluteTransform(top);
				let m = transform.getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
				context.beginPath();
				let clipArgs;
				if (clipFunc) clipArgs = clipFunc.call(this, context, this);
				else {
					const clipX = this.clipX();
					const clipY = this.clipY();
					context.rect(clipX || 0, clipY || 0, clipWidth, clipHeight);
				}
				context.clip.apply(context, clipArgs);
				m = transform.copy().invert().getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
			}
			const hasComposition = !selfCache && this.globalCompositeOperation() !== "source-over" && drawMethod === "drawScene";
			if (hasComposition) {
				context.save();
				context._applyGlobalCompositeOperation(this);
			}
			(_a = this.children) === null || _a === void 0 || _a.forEach(function(child) {
				child[drawMethod](canvas, top, bufferCanvas);
			});
			if (hasComposition) context.restore();
			if (hasClip) context.restore();
		}
		getClientRect(config = {}) {
			var _a;
			const skipTransform = config.skipTransform;
			const relativeTo = config.relativeTo;
			let minX, minY, maxX, maxY;
			let selfRect = {
				x: Infinity,
				y: Infinity,
				width: 0,
				height: 0
			};
			const that = this;
			(_a = this.children) === null || _a === void 0 || _a.forEach(function(child) {
				if (!child.visible()) return;
				const rect = child.getClientRect({
					relativeTo: that,
					skipShadow: config.skipShadow,
					skipStroke: config.skipStroke
				});
				if (rect.width === 0 && rect.height === 0) return;
				if (minX === void 0) {
					minX = rect.x;
					minY = rect.y;
					maxX = rect.x + rect.width;
					maxY = rect.y + rect.height;
				} else {
					minX = Math.min(minX, rect.x);
					minY = Math.min(minY, rect.y);
					maxX = Math.max(maxX, rect.x + rect.width);
					maxY = Math.max(maxY, rect.y + rect.height);
				}
			});
			const shapes = this.find("Shape");
			let hasVisible = false;
			for (let i = 0; i < shapes.length; i++) if (shapes[i]._isVisible(this)) {
				hasVisible = true;
				break;
			}
			if (hasVisible && minX !== void 0) selfRect = {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
			else selfRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			if (!skipTransform) return this._transformedRect(selfRect, relativeTo);
			return selfRect;
		}
	};
	exports.Container = Container;
	Factory_1.Factory.addComponentsGetterSetter(Container, "clip", [
		"x",
		"y",
		"width",
		"height"
	]);
	Factory_1.Factory.addGetterSetter(Container, "clipX", void 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Container, "clipY", void 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Container, "clipWidth", void 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Container, "clipHeight", void 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Container, "clipFunc");
}));
//#endregion
//#region node_modules/konva/lib/PointerEvents.js
var require_PointerEvents = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getCapturedShape = getCapturedShape;
	exports.createEvent = createEvent;
	exports.hasPointerCapture = hasPointerCapture;
	exports.setPointerCapture = setPointerCapture;
	exports.releaseCapture = releaseCapture;
	var Global_1 = require_Global();
	var Captures = /* @__PURE__ */ new Map();
	var SUPPORT_POINTER_EVENTS = Global_1.Konva._global["PointerEvent"] !== void 0;
	function getCapturedShape(pointerId) {
		return Captures.get(pointerId);
	}
	function createEvent(evt) {
		return {
			evt,
			pointerId: evt.pointerId
		};
	}
	function hasPointerCapture(pointerId, shape) {
		return Captures.get(pointerId) === shape;
	}
	function setPointerCapture(pointerId, shape) {
		releaseCapture(pointerId);
		if (!shape.getStage()) return;
		Captures.set(pointerId, shape);
		if (SUPPORT_POINTER_EVENTS) shape._fire("gotpointercapture", createEvent(new PointerEvent("gotpointercapture")));
	}
	function releaseCapture(pointerId, target) {
		const shape = Captures.get(pointerId);
		if (!shape) return;
		const stage = shape.getStage();
		if (stage && stage.content) {}
		Captures.delete(pointerId);
		if (SUPPORT_POINTER_EVENTS) shape._fire("lostpointercapture", createEvent(new PointerEvent("lostpointercapture")));
	}
}));
//#endregion
//#region node_modules/konva/lib/Stage.js
var require_Stage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Stage = exports.stages = void 0;
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Container_1 = require_Container();
	var Global_1 = require_Global();
	var Canvas_1 = require_Canvas();
	var DragAndDrop_1 = require_DragAndDrop();
	var Global_2 = require_Global();
	var PointerEvents = require_PointerEvents();
	var STAGE = "Stage", STRING = "string", PX = "px", MOUSEOUT = "mouseout", MOUSELEAVE = "mouseleave", MOUSEOVER = "mouseover", MOUSEENTER = "mouseenter", MOUSEMOVE = "mousemove", MOUSEDOWN = "mousedown", MOUSEUP = "mouseup", POINTERMOVE = "pointermove", POINTERDOWN = "pointerdown", POINTERUP = "pointerup", POINTERCANCEL = "pointercancel", LOSTPOINTERCAPTURE = "lostpointercapture", POINTEROUT = "pointerout", POINTERLEAVE = "pointerleave", POINTEROVER = "pointerover", POINTERENTER = "pointerenter", CONTEXTMENU = "contextmenu", TOUCHSTART = "touchstart", TOUCHEND = "touchend", TOUCHMOVE = "touchmove", TOUCHCANCEL = "touchcancel", WHEEL = "wheel", MAX_LAYERS_NUMBER = 5, EVENTS = [
		[MOUSEENTER, "_pointerenter"],
		[MOUSEDOWN, "_pointerdown"],
		[MOUSEMOVE, "_pointermove"],
		[MOUSEUP, "_pointerup"],
		[MOUSELEAVE, "_pointerleave"],
		[TOUCHSTART, "_pointerdown"],
		[TOUCHMOVE, "_pointermove"],
		[TOUCHEND, "_pointerup"],
		[TOUCHCANCEL, "_pointercancel"],
		[MOUSEOVER, "_pointerover"],
		[WHEEL, "_wheel"],
		[CONTEXTMENU, "_contextmenu"],
		[POINTERDOWN, "_pointerdown"],
		[POINTERMOVE, "_pointermove"],
		[POINTERUP, "_pointerup"],
		[POINTERCANCEL, "_pointercancel"],
		[POINTERLEAVE, "_pointerleave"],
		[LOSTPOINTERCAPTURE, "_lostpointercapture"]
	];
	var EVENTS_MAP = {
		mouse: {
			[POINTEROUT]: MOUSEOUT,
			[POINTERLEAVE]: MOUSELEAVE,
			[POINTEROVER]: MOUSEOVER,
			[POINTERENTER]: MOUSEENTER,
			[POINTERMOVE]: MOUSEMOVE,
			[POINTERDOWN]: MOUSEDOWN,
			[POINTERUP]: MOUSEUP,
			[POINTERCANCEL]: "mousecancel",
			pointerclick: "click",
			pointerdblclick: "dblclick"
		},
		touch: {
			[POINTEROUT]: "touchout",
			[POINTERLEAVE]: "touchleave",
			[POINTEROVER]: "touchover",
			[POINTERENTER]: "touchenter",
			[POINTERMOVE]: TOUCHMOVE,
			[POINTERDOWN]: TOUCHSTART,
			[POINTERUP]: TOUCHEND,
			[POINTERCANCEL]: TOUCHCANCEL,
			pointerclick: "tap",
			pointerdblclick: "dbltap"
		},
		pointer: {
			[POINTEROUT]: POINTEROUT,
			[POINTERLEAVE]: POINTERLEAVE,
			[POINTEROVER]: POINTEROVER,
			[POINTERENTER]: POINTERENTER,
			[POINTERMOVE]: POINTERMOVE,
			[POINTERDOWN]: POINTERDOWN,
			[POINTERUP]: POINTERUP,
			[POINTERCANCEL]: POINTERCANCEL,
			pointerclick: "pointerclick",
			pointerdblclick: "pointerdblclick"
		}
	};
	var getEventType = (type) => {
		if (type.indexOf("pointer") >= 0) return "pointer";
		if (type.indexOf("touch") >= 0) return "touch";
		return "mouse";
	};
	var getEventsMap = (eventType) => {
		const type = getEventType(eventType);
		if (type === "pointer") return Global_1.Konva.pointerEventsEnabled && EVENTS_MAP.pointer;
		if (type === "touch") return EVENTS_MAP.touch;
		if (type === "mouse") return EVENTS_MAP.mouse;
	};
	function checkNoClip(attrs = {}) {
		if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) Util_1.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups.");
		return attrs;
	}
	var NO_POINTERS_MESSAGE = `Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);`;
	exports.stages = [];
	var Stage = class extends Container_1.Container {
		constructor(config) {
			super(checkNoClip(config));
			this._pointerPositions = [];
			this._changedPointerPositions = [];
			this._buildDOM();
			this._bindContentEvents();
			exports.stages.push(this);
			this.on("widthChange.konva heightChange.konva", this._resizeDOM);
			this.on("visibleChange.konva", this._checkVisibility);
			this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
				checkNoClip(this.attrs);
			});
			this._checkVisibility();
		}
		_validateAdd(child) {
			const isLayer = child.getType() === "Layer";
			const isFastLayer = child.getType() === "FastLayer";
			if (!(isLayer || isFastLayer)) Util_1.Util.throw("You may only add layers to the stage.");
		}
		_checkVisibility() {
			if (!this.content) return;
			const style = this.visible() ? "" : "none";
			this.content.style.display = style;
		}
		setContainer(container) {
			if (typeof container === STRING) {
				let id;
				if (container.charAt(0) === ".") {
					const className = container.slice(1);
					container = document.getElementsByClassName(className)[0];
				} else {
					if (container.charAt(0) !== "#") id = container;
					else id = container.slice(1);
					container = document.getElementById(id);
				}
				if (!container) throw "Can not find container in document with id " + id;
			}
			this._setAttr("container", container);
			if (this.content) {
				if (this.content.parentElement) this.content.parentElement.removeChild(this.content);
				container.appendChild(this.content);
			}
			return this;
		}
		shouldDrawHit() {
			return true;
		}
		clear() {
			const layers = this.children, len = layers.length;
			for (let n = 0; n < len; n++) layers[n].clear();
			return this;
		}
		clone(obj) {
			if (!obj) obj = {};
			obj.container = typeof document !== "undefined" && document.createElement("div");
			return Container_1.Container.prototype.clone.call(this, obj);
		}
		destroy() {
			super.destroy();
			const content = this.content;
			if (content && Util_1.Util._isInDocument(content)) this.container().removeChild(content);
			const index = exports.stages.indexOf(this);
			if (index > -1) exports.stages.splice(index, 1);
			Util_1.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas);
			return this;
		}
		getPointerPosition() {
			const pos = this._pointerPositions[0] || this._changedPointerPositions[0];
			if (!pos) {
				Util_1.Util.warn(NO_POINTERS_MESSAGE);
				return null;
			}
			return {
				x: pos.x,
				y: pos.y
			};
		}
		_getPointerById(id) {
			return this._pointerPositions.find((p) => p.id === id);
		}
		getPointersPositions() {
			return this._pointerPositions;
		}
		getStage() {
			return this;
		}
		getContent() {
			return this.content;
		}
		_toKonvaCanvas(config) {
			config = config || {};
			config.x = config.x || 0;
			config.y = config.y || 0;
			config.width = config.width || this.width();
			config.height = config.height || this.height();
			const canvas = new Canvas_1.SceneCanvas({
				width: config.width,
				height: config.height,
				pixelRatio: config.pixelRatio || 1
			});
			const _context = canvas.getContext()._context;
			const layers = this.children;
			if (config.x || config.y) _context.translate(-1 * config.x, -1 * config.y);
			layers.forEach(function(layer) {
				if (!layer.isVisible()) return;
				const layerCanvas = layer._toKonvaCanvas(config);
				_context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
			});
			return canvas;
		}
		getIntersection(pos) {
			if (!pos) return null;
			const layers = this.children, end = layers.length - 1;
			for (let n = end; n >= 0; n--) {
				const shape = layers[n].getIntersection(pos);
				if (shape) return shape;
			}
			return null;
		}
		_resizeDOM() {
			const width = this.width();
			const height = this.height();
			if (this.content) {
				this.content.style.width = width + PX;
				this.content.style.height = height + PX;
			}
			this.bufferCanvas.setSize(width, height);
			this.bufferHitCanvas.setSize(width, height);
			this.children.forEach((layer) => {
				layer.setSize({
					width,
					height
				});
				layer.draw();
			});
		}
		add(layer, ...rest) {
			if (arguments.length > 1) {
				for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
				return this;
			}
			super.add(layer);
			const length = this.children.length;
			if (length > MAX_LAYERS_NUMBER) Util_1.Util.warn("The stage has " + length + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.");
			layer.setSize({
				width: this.width(),
				height: this.height()
			});
			layer.draw();
			if (Global_1.Konva.isBrowser) this.content.appendChild(layer.canvas._canvas);
			return this;
		}
		getParent() {
			return null;
		}
		getLayer() {
			return null;
		}
		hasPointerCapture(pointerId) {
			return PointerEvents.hasPointerCapture(pointerId, this);
		}
		setPointerCapture(pointerId) {
			PointerEvents.setPointerCapture(pointerId, this);
		}
		releaseCapture(pointerId) {
			PointerEvents.releaseCapture(pointerId, this);
		}
		getLayers() {
			return this.children;
		}
		_bindContentEvents() {
			if (!Global_1.Konva.isBrowser) return;
			EVENTS.forEach(([event, methodName]) => {
				this.content.addEventListener(event, (evt) => {
					this[methodName](evt);
				}, { passive: false });
			});
		}
		_pointerenter(evt) {
			this.setPointersPositions(evt);
			const events = getEventsMap(evt.type);
			if (events) this._fire(events.pointerenter, {
				evt,
				target: this,
				currentTarget: this
			});
		}
		_pointerover(evt) {
			this.setPointersPositions(evt);
			const events = getEventsMap(evt.type);
			if (events) this._fire(events.pointerover, {
				evt,
				target: this,
				currentTarget: this
			});
		}
		_getTargetShape(evenType) {
			let shape = this[evenType + "targetShape"];
			if (shape && !shape.getStage()) shape = null;
			return shape;
		}
		_pointerleave(evt) {
			const events = getEventsMap(evt.type);
			const eventType = getEventType(evt.type);
			if (!events) return;
			this.setPointersPositions(evt);
			const targetShape = this._getTargetShape(eventType);
			const eventsEnabled = !(Global_1.Konva.isDragging() || Global_1.Konva.isTransforming()) || Global_1.Konva.hitOnDragEnabled;
			if (targetShape && eventsEnabled) {
				targetShape._fireAndBubble(events.pointerout, { evt });
				targetShape._fireAndBubble(events.pointerleave, { evt });
				this._fire(events.pointerleave, {
					evt,
					target: this,
					currentTarget: this
				});
				this[eventType + "targetShape"] = null;
			} else if (eventsEnabled) {
				this._fire(events.pointerleave, {
					evt,
					target: this,
					currentTarget: this
				});
				this._fire(events.pointerout, {
					evt,
					target: this,
					currentTarget: this
				});
			}
			this.pointerPos = null;
			this._pointerPositions = [];
		}
		_pointerdown(evt) {
			const events = getEventsMap(evt.type);
			const eventType = getEventType(evt.type);
			if (!events) return;
			this.setPointersPositions(evt);
			let triggeredOnShape = false;
			this._changedPointerPositions.forEach((pos) => {
				const shape = this.getIntersection(pos);
				DragAndDrop_1.DD.justDragged = false;
				Global_1.Konva["_" + eventType + "ListenClick"] = true;
				if (!shape || !shape.isListening()) {
					this[eventType + "ClickStartShape"] = void 0;
					return;
				}
				if (Global_1.Konva.capturePointerEventsEnabled) shape.setPointerCapture(pos.id);
				this[eventType + "ClickStartShape"] = shape;
				shape._fireAndBubble(events.pointerdown, {
					evt,
					pointerId: pos.id
				});
				triggeredOnShape = true;
				const isTouch = evt.type.indexOf("touch") >= 0;
				if (shape.preventDefault() && evt.cancelable && isTouch) evt.preventDefault();
			});
			if (!triggeredOnShape) this._fire(events.pointerdown, {
				evt,
				target: this,
				currentTarget: this,
				pointerId: this._pointerPositions[0].id
			});
		}
		_pointermove(evt) {
			const events = getEventsMap(evt.type);
			const eventType = getEventType(evt.type);
			if (!events) return;
			if (Global_1.Konva.isDragging() && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) evt.preventDefault();
			this.setPointersPositions(evt);
			if (!(!(Global_1.Konva.isDragging() || Global_1.Konva.isTransforming()) || Global_1.Konva.hitOnDragEnabled)) return;
			const processedShapesIds = {};
			let triggeredOnShape = false;
			const targetShape = this._getTargetShape(eventType);
			this._changedPointerPositions.forEach((pos) => {
				const shape = PointerEvents.getCapturedShape(pos.id) || this.getIntersection(pos);
				const pointerId = pos.id;
				const event = {
					evt,
					pointerId
				};
				const differentTarget = targetShape !== shape;
				if (differentTarget && targetShape) {
					targetShape._fireAndBubble(events.pointerout, { ...event }, shape);
					targetShape._fireAndBubble(events.pointerleave, { ...event }, shape);
				}
				if (shape) {
					if (processedShapesIds[shape._id]) return;
					processedShapesIds[shape._id] = true;
				}
				if (shape && shape.isListening()) {
					triggeredOnShape = true;
					if (differentTarget) {
						shape._fireAndBubble(events.pointerover, { ...event }, targetShape);
						shape._fireAndBubble(events.pointerenter, { ...event }, targetShape);
						this[eventType + "targetShape"] = shape;
					}
					shape._fireAndBubble(events.pointermove, { ...event });
				} else if (targetShape) {
					this._fire(events.pointerover, {
						evt,
						target: this,
						currentTarget: this,
						pointerId
					});
					this[eventType + "targetShape"] = null;
				}
			});
			if (!triggeredOnShape) this._fire(events.pointermove, {
				evt,
				target: this,
				currentTarget: this,
				pointerId: this._changedPointerPositions[0].id
			});
		}
		_pointerup(evt) {
			const events = getEventsMap(evt.type);
			const eventType = getEventType(evt.type);
			if (!events) return;
			this.setPointersPositions(evt);
			const clickStartShape = this[eventType + "ClickStartShape"];
			const clickEndShape = this[eventType + "ClickEndShape"];
			const processedShapesIds = {};
			let triggeredOnShape = false;
			this._changedPointerPositions.forEach((pos) => {
				const shape = PointerEvents.getCapturedShape(pos.id) || this.getIntersection(pos);
				if (shape) {
					shape.releaseCapture(pos.id);
					if (processedShapesIds[shape._id]) return;
					processedShapesIds[shape._id] = true;
				}
				const pointerId = pos.id;
				const event = {
					evt,
					pointerId
				};
				let fireDblClick = false;
				if (Global_1.Konva["_" + eventType + "InDblClickWindow"]) {
					fireDblClick = true;
					clearTimeout(this[eventType + "DblTimeout"]);
				} else if (!DragAndDrop_1.DD.justDragged) {
					Global_1.Konva["_" + eventType + "InDblClickWindow"] = true;
					clearTimeout(this[eventType + "DblTimeout"]);
				}
				this[eventType + "DblTimeout"] = setTimeout(function() {
					Global_1.Konva["_" + eventType + "InDblClickWindow"] = false;
				}, Global_1.Konva.dblClickWindow);
				if (shape && shape.isListening()) {
					triggeredOnShape = true;
					this[eventType + "ClickEndShape"] = shape;
					shape._fireAndBubble(events.pointerup, { ...event });
					if (Global_1.Konva["_" + eventType + "ListenClick"] && clickStartShape && clickStartShape === shape) {
						shape._fireAndBubble(events.pointerclick, { ...event });
						if (fireDblClick && clickEndShape && clickEndShape === shape) shape._fireAndBubble(events.pointerdblclick, { ...event });
					}
				} else {
					this[eventType + "ClickEndShape"] = null;
					if (Global_1.Konva["_" + eventType + "ListenClick"]) this._fire(events.pointerclick, {
						evt,
						target: this,
						currentTarget: this,
						pointerId
					});
					if (fireDblClick) this._fire(events.pointerdblclick, {
						evt,
						target: this,
						currentTarget: this,
						pointerId
					});
				}
			});
			if (!triggeredOnShape) this._fire(events.pointerup, {
				evt,
				target: this,
				currentTarget: this,
				pointerId: this._changedPointerPositions[0].id
			});
			Global_1.Konva["_" + eventType + "ListenClick"] = false;
			if (evt.cancelable && eventType !== "touch" && eventType !== "pointer") evt.preventDefault();
		}
		_contextmenu(evt) {
			this.setPointersPositions(evt);
			const shape = this.getIntersection(this.getPointerPosition());
			if (shape && shape.isListening()) shape._fireAndBubble(CONTEXTMENU, { evt });
			else this._fire(CONTEXTMENU, {
				evt,
				target: this,
				currentTarget: this
			});
		}
		_wheel(evt) {
			this.setPointersPositions(evt);
			const shape = this.getIntersection(this.getPointerPosition());
			if (shape && shape.isListening()) shape._fireAndBubble(WHEEL, { evt });
			else this._fire(WHEEL, {
				evt,
				target: this,
				currentTarget: this
			});
		}
		_pointercancel(evt) {
			this.setPointersPositions(evt);
			const shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
			if (shape) shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
			PointerEvents.releaseCapture(evt.pointerId);
		}
		_lostpointercapture(evt) {
			PointerEvents.releaseCapture(evt.pointerId);
		}
		setPointersPositions(evt) {
			const contentPosition = this._getContentPosition();
			let x = null, y = null;
			evt = evt ? evt : window.event;
			if (evt.touches !== void 0) {
				this._pointerPositions = [];
				this._changedPointerPositions = [];
				Array.prototype.forEach.call(evt.touches, (touch) => {
					this._pointerPositions.push({
						id: touch.identifier,
						x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
						y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
					});
				});
				Array.prototype.forEach.call(evt.changedTouches || evt.touches, (touch) => {
					this._changedPointerPositions.push({
						id: touch.identifier,
						x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
						y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
					});
				});
			} else {
				x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
				y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
				this.pointerPos = {
					x,
					y
				};
				this._pointerPositions = [{
					x,
					y,
					id: Util_1.Util._getFirstPointerId(evt)
				}];
				this._changedPointerPositions = [{
					x,
					y,
					id: Util_1.Util._getFirstPointerId(evt)
				}];
			}
		}
		_setPointerPosition(evt) {
			Util_1.Util.warn("Method _setPointerPosition is deprecated. Use \"stage.setPointersPositions(event)\" instead.");
			this.setPointersPositions(evt);
		}
		_getContentPosition() {
			if (!this.content || !this.content.getBoundingClientRect) return {
				top: 0,
				left: 0,
				scaleX: 1,
				scaleY: 1
			};
			const rect = this.content.getBoundingClientRect();
			return {
				top: rect.top,
				left: rect.left,
				scaleX: rect.width / this.content.clientWidth || 1,
				scaleY: rect.height / this.content.clientHeight || 1
			};
		}
		_buildDOM() {
			this.bufferCanvas = new Canvas_1.SceneCanvas({
				width: this.width(),
				height: this.height()
			});
			this.bufferHitCanvas = new Canvas_1.HitCanvas({
				pixelRatio: 1,
				width: this.width(),
				height: this.height()
			});
			if (!Global_1.Konva.isBrowser) return;
			const container = this.container();
			if (!container) throw "Stage has no container. A container is required.";
			container.innerHTML = "";
			this.content = document.createElement("div");
			this.content.style.position = "relative";
			this.content.style.userSelect = "none";
			this.content.className = "konvajs-content";
			this.content.setAttribute("role", "presentation");
			container.appendChild(this.content);
			this._resizeDOM();
		}
		cache() {
			Util_1.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.");
			return this;
		}
		clearCache() {
			return this;
		}
		batchDraw() {
			this.getChildren().forEach(function(layer) {
				layer.batchDraw();
			});
			return this;
		}
	};
	exports.Stage = Stage;
	Stage.prototype.nodeType = STAGE;
	(0, Global_2._registerNode)(Stage);
	Factory_1.Factory.addGetterSetter(Stage, "container");
	if (Global_1.Konva.isBrowser) document.addEventListener("visibilitychange", () => {
		exports.stages.forEach((stage) => {
			stage.batchDraw();
		});
	});
}));
//#endregion
//#region node_modules/konva/lib/Shape.js
var require_Shape = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Shape = exports.shapes = void 0;
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Global_2 = require_Global();
	var PointerEvents = require_PointerEvents();
	var HAS_SHADOW = "hasShadow";
	var SHADOW_RGBA = "shadowRGBA";
	var patternImage = "patternImage";
	var linearGradient = "linearGradient";
	var radialGradient = "radialGradient";
	var dummyContext;
	function getDummyContext() {
		if (dummyContext) return dummyContext;
		dummyContext = Util_1.Util.createCanvasElement().getContext("2d");
		return dummyContext;
	}
	exports.shapes = {};
	function _fillFunc(context) {
		const fillRule = this.attrs.fillRule;
		if (fillRule) context.fill(fillRule);
		else context.fill();
	}
	function _strokeFunc(context) {
		context.stroke();
	}
	function _fillFuncHit(context) {
		const fillRule = this.attrs.fillRule;
		if (fillRule) context.fill(fillRule);
		else context.fill();
	}
	function _strokeFuncHit(context) {
		context.stroke();
	}
	function _clearHasShadowCache() {
		this._clearCache(HAS_SHADOW);
	}
	function _clearGetShadowRGBACache() {
		this._clearCache(SHADOW_RGBA);
	}
	function _clearFillPatternCache() {
		this._clearCache(patternImage);
	}
	function _clearLinearGradientCache() {
		this._clearCache(linearGradient);
	}
	function _clearRadialGradientCache() {
		this._clearCache(radialGradient);
	}
	var Shape = class extends Node_1.Node {
		constructor(config) {
			super(config);
			let key;
			while (true) {
				key = Util_1.Util.getRandomColor();
				if (key && !(key in exports.shapes)) break;
			}
			this.colorKey = key;
			exports.shapes[key] = this;
		}
		getContext() {
			Util_1.Util.warn("shape.getContext() method is deprecated. Please do not use it.");
			return this.getLayer().getContext();
		}
		getCanvas() {
			Util_1.Util.warn("shape.getCanvas() method is deprecated. Please do not use it.");
			return this.getLayer().getCanvas();
		}
		getSceneFunc() {
			return this.attrs.sceneFunc || this["_sceneFunc"];
		}
		getHitFunc() {
			return this.attrs.hitFunc || this["_hitFunc"];
		}
		hasShadow() {
			return this._getCache(HAS_SHADOW, this._hasShadow);
		}
		_hasShadow() {
			return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
		}
		_getFillPattern() {
			return this._getCache(patternImage, this.__getFillPattern);
		}
		__getFillPattern() {
			if (this.fillPatternImage()) {
				const pattern = getDummyContext().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
				if (pattern && pattern.setTransform) {
					const tr = new Util_1.Transform();
					tr.translate(this.fillPatternX(), this.fillPatternY());
					tr.rotate(Global_1.Konva.getAngle(this.fillPatternRotation()));
					tr.scale(this.fillPatternScaleX(), this.fillPatternScaleY());
					tr.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
					const m = tr.getMatrix();
					const matrix = typeof DOMMatrix === "undefined" ? {
						a: m[0],
						b: m[1],
						c: m[2],
						d: m[3],
						e: m[4],
						f: m[5]
					} : new DOMMatrix(m);
					pattern.setTransform(matrix);
				}
				return pattern;
			}
		}
		_getLinearGradient() {
			return this._getCache(linearGradient, this.__getLinearGradient);
		}
		__getLinearGradient() {
			const colorStops = this.fillLinearGradientColorStops();
			if (colorStops) {
				const ctx = getDummyContext();
				const start = this.fillLinearGradientStartPoint();
				const end = this.fillLinearGradientEndPoint();
				const grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
				for (let n = 0; n < colorStops.length; n += 2) grd.addColorStop(colorStops[n], colorStops[n + 1]);
				return grd;
			}
		}
		_getRadialGradient() {
			return this._getCache(radialGradient, this.__getRadialGradient);
		}
		__getRadialGradient() {
			const colorStops = this.fillRadialGradientColorStops();
			if (colorStops) {
				const ctx = getDummyContext();
				const start = this.fillRadialGradientStartPoint();
				const end = this.fillRadialGradientEndPoint();
				const grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
				for (let n = 0; n < colorStops.length; n += 2) grd.addColorStop(colorStops[n], colorStops[n + 1]);
				return grd;
			}
		}
		getShadowRGBA() {
			return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
		}
		_getShadowRGBA() {
			if (!this.hasShadow()) return;
			const rgba = Util_1.Util.colorToRGBA(this.shadowColor());
			if (rgba) return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a * (this.shadowOpacity() || 1) + ")";
		}
		hasFill() {
			return this._calculate("hasFill", [
				"fillEnabled",
				"fill",
				"fillPatternImage",
				"fillLinearGradientColorStops",
				"fillRadialGradientColorStops"
			], () => {
				return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops());
			});
		}
		hasStroke() {
			return this._calculate("hasStroke", [
				"strokeEnabled",
				"strokeWidth",
				"stroke",
				"strokeLinearGradientColorStops"
			], () => {
				return this.strokeEnabled() && this.strokeWidth() && !!(this.stroke() || this.strokeLinearGradientColorStops());
			});
		}
		hasHitStroke() {
			const width = this.hitStrokeWidth();
			if (width === "auto") return this.hasStroke();
			return this.strokeEnabled() && !!width;
		}
		intersects(point) {
			const stage = this.getStage();
			if (!stage) return false;
			const bufferHitCanvas = stage.bufferHitCanvas;
			bufferHitCanvas.getContext().clear();
			this.drawHit(bufferHitCanvas, void 0, true);
			return bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data[3] > 0;
		}
		destroy() {
			Node_1.Node.prototype.destroy.call(this);
			delete exports.shapes[this.colorKey];
			delete this.colorKey;
			return this;
		}
		_useBufferCanvas(forceFill) {
			var _a;
			if (!((_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true)) return false;
			const hasFill = forceFill || this.hasFill();
			const hasStroke = this.hasStroke();
			const isTransparent = this.getAbsoluteOpacity() !== 1;
			if (hasFill && hasStroke && isTransparent) return true;
			const hasShadow = this.hasShadow();
			const strokeForShadow = this.shadowForStrokeEnabled();
			if (hasFill && hasStroke && hasShadow && strokeForShadow) return true;
			return false;
		}
		setStrokeHitEnabled(val) {
			Util_1.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.");
			if (val) this.hitStrokeWidth("auto");
			else this.hitStrokeWidth(0);
		}
		getStrokeHitEnabled() {
			if (this.hitStrokeWidth() === 0) return false;
			else return true;
		}
		getSelfRect() {
			const size = this.size();
			return {
				x: this._centroid ? -size.width / 2 : 0,
				y: this._centroid ? -size.height / 2 : 0,
				width: size.width,
				height: size.height
			};
		}
		getClientRect(config = {}) {
			let hasCachedParent = false;
			let parent = this.getParent();
			while (parent) {
				if (parent.isCached()) {
					hasCachedParent = true;
					break;
				}
				parent = parent.getParent();
			}
			const skipTransform = config.skipTransform;
			const relativeTo = config.relativeTo || hasCachedParent && this.getStage() || void 0;
			const fillRect = this.getSelfRect();
			const strokeWidth = !config.skipStroke && this.hasStroke() && this.strokeWidth() || 0;
			const fillAndStrokeWidth = fillRect.width + strokeWidth;
			const fillAndStrokeHeight = fillRect.height + strokeWidth;
			const applyShadow = !config.skipShadow && this.hasShadow();
			const shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
			const shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
			const preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
			const preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
			const blurRadius = applyShadow && this.shadowBlur() || 0;
			const rect = {
				width: preWidth + blurRadius * 2,
				height: preHeight + blurRadius * 2,
				x: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
				y: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
			};
			if (!skipTransform) return this._transformedRect(rect, relativeTo);
			return rect;
		}
		drawScene(can, top, bufferCanvas) {
			const layer = this.getLayer();
			const context = (can || layer.getCanvas()).getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow();
			let stage;
			const cachingSelf = top === this;
			if (!this.isVisible() && !cachingSelf) return this;
			if (cachedCanvas) {
				context.save();
				const m = this.getAbsoluteTransform(top).getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
				this._drawCachedSceneCanvas(context);
				context.restore();
				return this;
			}
			if (!drawFunc) return this;
			context.save();
			if (this._useBufferCanvas() && true) {
				stage = this.getStage();
				const bc = bufferCanvas || stage.bufferCanvas;
				const bufferContext = bc.getContext();
				bufferContext.clear();
				bufferContext.save();
				bufferContext._applyLineJoin(this);
				const o = this.getAbsoluteTransform(top).getMatrix();
				bufferContext.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
				drawFunc.call(this, bufferContext, this);
				bufferContext.restore();
				const ratio = bc.pixelRatio;
				if (hasShadow) context._applyShadow(this);
				context._applyOpacity(this);
				context._applyGlobalCompositeOperation(this);
				context.drawImage(bc._canvas, bc.x || 0, bc.y || 0, bc.width / ratio, bc.height / ratio);
			} else {
				context._applyLineJoin(this);
				if (!cachingSelf) {
					const o = this.getAbsoluteTransform(top).getMatrix();
					context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
					context._applyOpacity(this);
					context._applyGlobalCompositeOperation(this);
				}
				if (hasShadow) context._applyShadow(this);
				drawFunc.call(this, context, this);
			}
			context.restore();
			return this;
		}
		drawHit(can, top, skipDragCheck = false) {
			if (!this.shouldDrawHit(top, skipDragCheck)) return this;
			const layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
			if (!this.colorKey) Util_1.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()");
			if (cachedHitCanvas) {
				context.save();
				const m = this.getAbsoluteTransform(top).getMatrix();
				context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
				this._drawCachedHitCanvas(context);
				context.restore();
				return this;
			}
			if (!drawFunc) return this;
			context.save();
			context._applyLineJoin(this);
			if (!(this === top)) {
				const o = this.getAbsoluteTransform(top).getMatrix();
				context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
			}
			drawFunc.call(this, context, this);
			context.restore();
			return this;
		}
		drawHitFromCache(alphaThreshold = 0) {
			const cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight();
			hitContext.clear();
			hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
			try {
				const hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
				const hitData = hitImageData.data;
				const len = hitData.length;
				const rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
				for (let i = 0; i < len; i += 4) if (hitData[i + 3] > alphaThreshold) {
					hitData[i] = rgbColorKey.r;
					hitData[i + 1] = rgbColorKey.g;
					hitData[i + 2] = rgbColorKey.b;
					hitData[i + 3] = 255;
				} else hitData[i + 3] = 0;
				hitContext.putImageData(hitImageData, 0, 0);
			} catch (e) {
				Util_1.Util.error("Unable to draw hit graph from cached scene canvas. " + e.message);
			}
			return this;
		}
		hasPointerCapture(pointerId) {
			return PointerEvents.hasPointerCapture(pointerId, this);
		}
		setPointerCapture(pointerId) {
			PointerEvents.setPointerCapture(pointerId, this);
		}
		releaseCapture(pointerId) {
			PointerEvents.releaseCapture(pointerId, this);
		}
	};
	exports.Shape = Shape;
	Shape.prototype._fillFunc = _fillFunc;
	Shape.prototype._strokeFunc = _strokeFunc;
	Shape.prototype._fillFuncHit = _fillFuncHit;
	Shape.prototype._strokeFuncHit = _strokeFuncHit;
	Shape.prototype._centroid = false;
	Shape.prototype.nodeType = "Shape";
	(0, Global_2._registerNode)(Shape);
	Shape.prototype.eventListeners = {};
	Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearHasShadowCache);
	Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearGetShadowRGBACache);
	Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", _clearFillPatternCache);
	Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", _clearLinearGradientCache);
	Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", _clearRadialGradientCache);
	Factory_1.Factory.addGetterSetter(Shape, "stroke", void 0, (0, Validators_1.getStringOrGradientValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "strokeWidth", 2, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillAfterStrokeEnabled", false);
	Factory_1.Factory.addGetterSetter(Shape, "hitStrokeWidth", "auto", (0, Validators_1.getNumberOrAutoValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "strokeHitEnabled", true, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "perfectDrawEnabled", true, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "shadowForStrokeEnabled", true, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "lineJoin");
	Factory_1.Factory.addGetterSetter(Shape, "lineCap");
	Factory_1.Factory.addGetterSetter(Shape, "sceneFunc");
	Factory_1.Factory.addGetterSetter(Shape, "hitFunc");
	Factory_1.Factory.addGetterSetter(Shape, "dash");
	Factory_1.Factory.addGetterSetter(Shape, "dashOffset", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "shadowColor", void 0, (0, Validators_1.getStringValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "shadowBlur", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "shadowOpacity", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Shape, "shadowOffset", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetX", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetY", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternImage");
	Factory_1.Factory.addGetterSetter(Shape, "fill", void 0, (0, Validators_1.getStringOrGradientValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternX", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternY", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientColorStops");
	Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientColorStops");
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartRadius", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndRadius", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientColorStops");
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternRepeat", "repeat");
	Factory_1.Factory.addGetterSetter(Shape, "fillEnabled", true);
	Factory_1.Factory.addGetterSetter(Shape, "strokeEnabled", true);
	Factory_1.Factory.addGetterSetter(Shape, "shadowEnabled", true);
	Factory_1.Factory.addGetterSetter(Shape, "dashEnabled", true);
	Factory_1.Factory.addGetterSetter(Shape, "strokeScaleEnabled", true);
	Factory_1.Factory.addGetterSetter(Shape, "fillPriority", "color");
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternOffset", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetX", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetY", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternScale", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleX", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleY", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientStartPoint", ["x", "y"]);
	Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientStartPoint", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointY", 0);
	Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointY", 0);
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientEndPoint", ["x", "y"]);
	Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientEndPoint", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointY", 0);
	Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointY", 0);
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientStartPoint", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointY", 0);
	Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientEndPoint", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointX", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointY", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillPatternRotation", 0);
	Factory_1.Factory.addGetterSetter(Shape, "fillRule", void 0, (0, Validators_1.getStringValidator)());
	Factory_1.Factory.backCompat(Shape, {
		dashArray: "dash",
		getDashArray: "getDash",
		setDashArray: "getDash",
		drawFunc: "sceneFunc",
		getDrawFunc: "getSceneFunc",
		setDrawFunc: "setSceneFunc",
		drawHitFunc: "hitFunc",
		getDrawHitFunc: "getHitFunc",
		setDrawHitFunc: "setHitFunc"
	});
}));
//#endregion
//#region node_modules/konva/lib/Layer.js
var require_Layer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Layer = void 0;
	var Util_1 = require_Util();
	var Container_1 = require_Container();
	var Node_1 = require_Node();
	var Factory_1 = require_Factory();
	var Canvas_1 = require_Canvas();
	var Validators_1 = require_Validators();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var HASH = "#", BEFORE_DRAW = "beforeDraw", DRAW = "draw", INTERSECTION_OFFSETS = [
		{
			x: 0,
			y: 0
		},
		{
			x: -1,
			y: -1
		},
		{
			x: 1,
			y: -1
		},
		{
			x: 1,
			y: 1
		},
		{
			x: -1,
			y: 1
		}
	], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
	var Layer = class extends Container_1.Container {
		constructor(config) {
			super(config);
			this.canvas = new Canvas_1.SceneCanvas();
			this.hitCanvas = new Canvas_1.HitCanvas({ pixelRatio: 1 });
			this._waitingForDraw = false;
			this.on("visibleChange.konva", this._checkVisibility);
			this._checkVisibility();
			this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled);
			this._setSmoothEnabled();
		}
		createPNGStream() {
			return this.canvas._canvas.createPNGStream();
		}
		getCanvas() {
			return this.canvas;
		}
		getNativeCanvasElement() {
			return this.canvas._canvas;
		}
		getHitCanvas() {
			return this.hitCanvas;
		}
		getContext() {
			return this.getCanvas().getContext();
		}
		clear(bounds) {
			this.getContext().clear(bounds);
			this.getHitCanvas().getContext().clear(bounds);
			return this;
		}
		setZIndex(index) {
			super.setZIndex(index);
			const stage = this.getStage();
			if (stage && stage.content) {
				stage.content.removeChild(this.getNativeCanvasElement());
				if (index < stage.children.length - 1) stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[index + 1].getCanvas()._canvas);
				else stage.content.appendChild(this.getNativeCanvasElement());
			}
			return this;
		}
		moveToTop() {
			Node_1.Node.prototype.moveToTop.call(this);
			const stage = this.getStage();
			if (stage && stage.content) {
				stage.content.removeChild(this.getNativeCanvasElement());
				stage.content.appendChild(this.getNativeCanvasElement());
			}
			return true;
		}
		moveUp() {
			if (!Node_1.Node.prototype.moveUp.call(this)) return false;
			const stage = this.getStage();
			if (!stage || !stage.content) return false;
			stage.content.removeChild(this.getNativeCanvasElement());
			if (this.index < stage.children.length - 1) stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[this.index + 1].getCanvas()._canvas);
			else stage.content.appendChild(this.getNativeCanvasElement());
			return true;
		}
		moveDown() {
			if (Node_1.Node.prototype.moveDown.call(this)) {
				const stage = this.getStage();
				if (stage) {
					const children = stage.children;
					if (stage.content) {
						stage.content.removeChild(this.getNativeCanvasElement());
						stage.content.insertBefore(this.getNativeCanvasElement(), children[this.index + 1].getCanvas()._canvas);
					}
				}
				return true;
			}
			return false;
		}
		moveToBottom() {
			if (Node_1.Node.prototype.moveToBottom.call(this)) {
				const stage = this.getStage();
				if (stage) {
					const children = stage.children;
					if (stage.content) {
						stage.content.removeChild(this.getNativeCanvasElement());
						stage.content.insertBefore(this.getNativeCanvasElement(), children[1].getCanvas()._canvas);
					}
				}
				return true;
			}
			return false;
		}
		getLayer() {
			return this;
		}
		remove() {
			const _canvas = this.getNativeCanvasElement();
			Node_1.Node.prototype.remove.call(this);
			if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) _canvas.parentNode.removeChild(_canvas);
			return this;
		}
		getStage() {
			return this.parent;
		}
		setSize({ width, height }) {
			this.canvas.setSize(width, height);
			this.hitCanvas.setSize(width, height);
			this._setSmoothEnabled();
			return this;
		}
		_validateAdd(child) {
			const type = child.getType();
			if (type !== "Group" && type !== "Shape") Util_1.Util.throw("You may only add groups and shapes to a layer.");
		}
		_toKonvaCanvas(config) {
			config = config || {};
			config.width = config.width || this.getWidth();
			config.height = config.height || this.getHeight();
			config.x = config.x !== void 0 ? config.x : this.x();
			config.y = config.y !== void 0 ? config.y : this.y();
			return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
		}
		_checkVisibility() {
			if (this.visible()) this.canvas._canvas.style.display = "block";
			else this.canvas._canvas.style.display = "none";
		}
		_setSmoothEnabled() {
			this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
		}
		getWidth() {
			if (this.parent) return this.parent.width();
		}
		setWidth() {
			Util_1.Util.warn("Can not change width of layer. Use \"stage.width(value)\" function instead.");
		}
		getHeight() {
			if (this.parent) return this.parent.height();
		}
		setHeight() {
			Util_1.Util.warn("Can not change height of layer. Use \"stage.height(value)\" function instead.");
		}
		batchDraw() {
			if (!this._waitingForDraw) {
				this._waitingForDraw = true;
				Util_1.Util.requestAnimFrame(() => {
					this.draw();
					this._waitingForDraw = false;
				});
			}
			return this;
		}
		getIntersection(pos) {
			if (!this.isListening() || !this.isVisible()) return null;
			let spiralSearchDistance = 1;
			let continueSearch = false;
			while (true) {
				for (let i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
					const intersectionOffset = INTERSECTION_OFFSETS[i];
					const obj = this._getIntersection({
						x: pos.x + intersectionOffset.x * spiralSearchDistance,
						y: pos.y + intersectionOffset.y * spiralSearchDistance
					});
					const shape = obj.shape;
					if (shape) return shape;
					continueSearch = !!obj.antialiased;
					if (!obj.antialiased) break;
				}
				if (continueSearch) spiralSearchDistance += 1;
				else return null;
			}
		}
		_getIntersection(pos) {
			const ratio = this.hitCanvas.pixelRatio;
			const p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
			const p3 = p[3];
			if (p3 === 255) {
				const colorKey = Util_1.Util._rgbToHex(p[0], p[1], p[2]);
				const shape = Shape_1.shapes[HASH + colorKey];
				if (shape) return { shape };
				return { antialiased: true };
			} else if (p3 > 0) return { antialiased: true };
			return {};
		}
		drawScene(can, top, bufferCanvas) {
			const layer = this.getLayer(), canvas = can || layer && layer.getCanvas();
			this._fire(BEFORE_DRAW, { node: this });
			if (this.clearBeforeDraw()) canvas.getContext().clear();
			Container_1.Container.prototype.drawScene.call(this, canvas, top, bufferCanvas);
			this._fire(DRAW, { node: this });
			return this;
		}
		drawHit(can, top) {
			const layer = this.getLayer(), canvas = can || layer && layer.hitCanvas;
			if (layer && layer.clearBeforeDraw()) layer.getHitCanvas().getContext().clear();
			Container_1.Container.prototype.drawHit.call(this, canvas, top);
			return this;
		}
		enableHitGraph() {
			this.hitGraphEnabled(true);
			return this;
		}
		disableHitGraph() {
			this.hitGraphEnabled(false);
			return this;
		}
		setHitGraphEnabled(val) {
			Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
			this.listening(val);
		}
		getHitGraphEnabled(val) {
			Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
			return this.listening();
		}
		toggleHitCanvas() {
			if (!this.parent || !this.parent["content"]) return;
			const parent = this.parent;
			if (!!this.hitCanvas._canvas.parentNode) parent.content.removeChild(this.hitCanvas._canvas);
			else parent.content.appendChild(this.hitCanvas._canvas);
		}
		destroy() {
			Util_1.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas);
			return super.destroy();
		}
	};
	exports.Layer = Layer;
	Layer.prototype.nodeType = "Layer";
	(0, Global_1._registerNode)(Layer);
	Factory_1.Factory.addGetterSetter(Layer, "imageSmoothingEnabled", true);
	Factory_1.Factory.addGetterSetter(Layer, "clearBeforeDraw", true);
	Factory_1.Factory.addGetterSetter(Layer, "hitGraphEnabled", true, (0, Validators_1.getBooleanValidator)());
}));
//#endregion
//#region node_modules/konva/lib/FastLayer.js
var require_FastLayer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FastLayer = void 0;
	var Util_1 = require_Util();
	var Layer_1 = require_Layer();
	var Global_1 = require_Global();
	var FastLayer = class extends Layer_1.Layer {
		constructor(attrs) {
			super(attrs);
			this.listening(false);
			Util_1.Util.warn("Konva.Fast layer is deprecated. Please use \"new Konva.Layer({ listening: false })\" instead.");
		}
	};
	exports.FastLayer = FastLayer;
	FastLayer.prototype.nodeType = "FastLayer";
	(0, Global_1._registerNode)(FastLayer);
}));
//#endregion
//#region node_modules/konva/lib/Group.js
var require_Group = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Group = void 0;
	var Util_1 = require_Util();
	var Container_1 = require_Container();
	var Global_1 = require_Global();
	var Group = class extends Container_1.Container {
		_validateAdd(child) {
			const type = child.getType();
			if (type !== "Group" && type !== "Shape") Util_1.Util.throw("You may only add groups and shapes to groups.");
		}
	};
	exports.Group = Group;
	Group.prototype.nodeType = "Group";
	(0, Global_1._registerNode)(Group);
}));
//#endregion
//#region node_modules/konva/lib/Animation.js
var require_Animation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Animation = void 0;
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	var now = (function() {
		if (Global_1.glob.performance && Global_1.glob.performance.now) return function() {
			return Global_1.glob.performance.now();
		};
		return function() {
			return (/* @__PURE__ */ new Date()).getTime();
		};
	})();
	var Animation = class Animation {
		constructor(func, layers) {
			this.id = Animation.animIdCounter++;
			this.frame = {
				time: 0,
				timeDiff: 0,
				lastTime: now(),
				frameRate: 0
			};
			this.func = func;
			this.setLayers(layers);
		}
		setLayers(layers) {
			let lays = [];
			if (layers) lays = Array.isArray(layers) ? layers : [layers];
			this.layers = lays;
			return this;
		}
		getLayers() {
			return this.layers;
		}
		addLayer(layer) {
			const layers = this.layers;
			const len = layers.length;
			for (let n = 0; n < len; n++) if (layers[n]._id === layer._id) return false;
			this.layers.push(layer);
			return true;
		}
		isRunning() {
			const animations = Animation.animations;
			const len = animations.length;
			for (let n = 0; n < len; n++) if (animations[n].id === this.id) return true;
			return false;
		}
		start() {
			this.stop();
			this.frame.timeDiff = 0;
			this.frame.lastTime = now();
			Animation._addAnimation(this);
			return this;
		}
		stop() {
			Animation._removeAnimation(this);
			return this;
		}
		_updateFrameObject(time) {
			this.frame.timeDiff = time - this.frame.lastTime;
			this.frame.lastTime = time;
			this.frame.time += this.frame.timeDiff;
			this.frame.frameRate = 1e3 / this.frame.timeDiff;
		}
		static _addAnimation(anim) {
			this.animations.push(anim);
			this._handleAnimation();
		}
		static _removeAnimation(anim) {
			const id = anim.id;
			const animations = this.animations;
			const len = animations.length;
			for (let n = 0; n < len; n++) if (animations[n].id === id) {
				this.animations.splice(n, 1);
				break;
			}
		}
		static _runFrames() {
			const layerHash = {};
			const animations = this.animations;
			for (let n = 0; n < animations.length; n++) {
				const anim = animations[n];
				const layers = anim.layers;
				const func = anim.func;
				anim._updateFrameObject(now());
				const layersLen = layers.length;
				let needRedraw;
				if (func) needRedraw = func.call(anim, anim.frame) !== false;
				else needRedraw = true;
				if (!needRedraw) continue;
				for (let i = 0; i < layersLen; i++) {
					const layer = layers[i];
					if (layer._id !== void 0) layerHash[layer._id] = layer;
				}
			}
			for (const key in layerHash) {
				if (!layerHash.hasOwnProperty(key)) continue;
				layerHash[key].batchDraw();
			}
		}
		static _animationLoop() {
			const Anim = Animation;
			if (Anim.animations.length) {
				Anim._runFrames();
				Util_1.Util.requestAnimFrame(Anim._animationLoop);
			} else Anim.animRunning = false;
		}
		static _handleAnimation() {
			if (!this.animRunning) {
				this.animRunning = true;
				Util_1.Util.requestAnimFrame(this._animationLoop);
			}
		}
	};
	exports.Animation = Animation;
	Animation.animations = [];
	Animation.animIdCounter = 0;
	Animation.animRunning = false;
}));
//#endregion
//#region node_modules/konva/lib/Tween.js
var require_Tween = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Easings = exports.Tween = void 0;
	var Util_1 = require_Util();
	var Animation_1 = require_Animation();
	var Node_1 = require_Node();
	var Global_1 = require_Global();
	var blacklist = {
		node: 1,
		duration: 1,
		easing: 1,
		onFinish: 1,
		yoyo: 1
	}, PAUSED = 1, PLAYING = 2, REVERSING = 3, colorAttrs = [
		"fill",
		"stroke",
		"shadowColor"
	];
	var idCounter = 0;
	var TweenEngine = class {
		constructor(prop, propFunc, func, begin, finish, duration, yoyo) {
			this.prop = prop;
			this.propFunc = propFunc;
			this.begin = begin;
			this._pos = begin;
			this.duration = duration;
			this._change = 0;
			this.prevPos = 0;
			this.yoyo = yoyo;
			this._time = 0;
			this._position = 0;
			this._startTime = 0;
			this._finish = 0;
			this.func = func;
			this._change = finish - this.begin;
			this.pause();
		}
		fire(str) {
			const handler = this[str];
			if (handler) handler();
		}
		setTime(t) {
			if (t > this.duration) if (this.yoyo) {
				this._time = this.duration;
				this.reverse();
			} else this.finish();
			else if (t < 0) if (this.yoyo) {
				this._time = 0;
				this.play();
			} else this.reset();
			else {
				this._time = t;
				this.update();
			}
		}
		getTime() {
			return this._time;
		}
		setPosition(p) {
			this.prevPos = this._pos;
			this.propFunc(p);
			this._pos = p;
		}
		getPosition(t) {
			if (t === void 0) t = this._time;
			return this.func(t, this.begin, this._change, this.duration);
		}
		play() {
			this.state = PLAYING;
			this._startTime = this.getTimer() - this._time;
			this.onEnterFrame();
			this.fire("onPlay");
		}
		reverse() {
			this.state = REVERSING;
			this._time = this.duration - this._time;
			this._startTime = this.getTimer() - this._time;
			this.onEnterFrame();
			this.fire("onReverse");
		}
		seek(t) {
			this.pause();
			this._time = t;
			this.update();
			this.fire("onSeek");
		}
		reset() {
			this.pause();
			this._time = 0;
			this.update();
			this.fire("onReset");
		}
		finish() {
			this.pause();
			this._time = this.duration;
			this.update();
			this.fire("onFinish");
		}
		update() {
			this.setPosition(this.getPosition(this._time));
			this.fire("onUpdate");
		}
		onEnterFrame() {
			const t = this.getTimer() - this._startTime;
			if (this.state === PLAYING) this.setTime(t);
			else if (this.state === REVERSING) this.setTime(this.duration - t);
		}
		pause() {
			this.state = PAUSED;
			this.fire("onPause");
		}
		getTimer() {
			return (/* @__PURE__ */ new Date()).getTime();
		}
	};
	var Tween = class Tween {
		constructor(config) {
			const that = this, node = config.node, nodeId = node._id, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo;
			let duration, key;
			if (typeof config.duration === "undefined") duration = .3;
			else if (config.duration === 0) duration = .001;
			else duration = config.duration;
			this.node = node;
			this._id = idCounter++;
			const layers = node.getLayer() || (node instanceof Global_1.Konva["Stage"] ? node.getLayers() : null);
			if (!layers) Util_1.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first.");
			this.anim = new Animation_1.Animation(function() {
				that.tween.onEnterFrame();
			}, layers);
			this.tween = new TweenEngine(key, function(i) {
				that._tweenFunc(i);
			}, easing, 0, 1, duration * 1e3, yoyo);
			this._addListeners();
			if (!Tween.attrs[nodeId]) Tween.attrs[nodeId] = {};
			if (!Tween.attrs[nodeId][this._id]) Tween.attrs[nodeId][this._id] = {};
			if (!Tween.tweens[nodeId]) Tween.tweens[nodeId] = {};
			for (key in config) if (blacklist[key] === void 0) this._addAttr(key, config[key]);
			this.reset();
			this.onFinish = config.onFinish;
			this.onReset = config.onReset;
			this.onUpdate = config.onUpdate;
		}
		_addAttr(key, end) {
			const node = this.node, nodeId = node._id;
			let diff, len, trueEnd, trueStart, endRGBA;
			const tweenId = Tween.tweens[nodeId][key];
			if (tweenId) delete Tween.attrs[nodeId][tweenId][key];
			let start = node.getAttr(key);
			if (Util_1.Util._isArray(end)) {
				diff = [];
				len = Math.max(end.length, start.length);
				if (key === "points" && end.length !== start.length) if (end.length > start.length) {
					trueStart = start;
					start = Util_1.Util._prepareArrayForTween(start, end, node.closed());
				} else {
					trueEnd = end;
					end = Util_1.Util._prepareArrayForTween(end, start, node.closed());
				}
				if (key.indexOf("fill") === 0) for (let n = 0; n < len; n++) if (n % 2 === 0) diff.push(end[n] - start[n]);
				else {
					const startRGBA = Util_1.Util.colorToRGBA(start[n]);
					endRGBA = Util_1.Util.colorToRGBA(end[n]);
					start[n] = startRGBA;
					diff.push({
						r: endRGBA.r - startRGBA.r,
						g: endRGBA.g - startRGBA.g,
						b: endRGBA.b - startRGBA.b,
						a: endRGBA.a - startRGBA.a
					});
				}
				else for (let n = 0; n < len; n++) diff.push(end[n] - start[n]);
			} else if (colorAttrs.indexOf(key) !== -1) {
				start = Util_1.Util.colorToRGBA(start);
				endRGBA = Util_1.Util.colorToRGBA(end);
				diff = {
					r: endRGBA.r - start.r,
					g: endRGBA.g - start.g,
					b: endRGBA.b - start.b,
					a: endRGBA.a - start.a
				};
			} else diff = end - start;
			Tween.attrs[nodeId][this._id][key] = {
				start,
				diff,
				end,
				trueEnd,
				trueStart
			};
			Tween.tweens[nodeId][key] = this._id;
		}
		_tweenFunc(i) {
			const node = this.node, attrs = Tween.attrs[node._id][this._id];
			let key, attr, start, diff, newVal, n, len, end;
			for (key in attrs) {
				attr = attrs[key];
				start = attr.start;
				diff = attr.diff;
				end = attr.end;
				if (Util_1.Util._isArray(start)) {
					newVal = [];
					len = Math.max(start.length, end.length);
					if (key.indexOf("fill") === 0) for (n = 0; n < len; n++) if (n % 2 === 0) newVal.push((start[n] || 0) + diff[n] * i);
					else newVal.push("rgba(" + Math.round(start[n].r + diff[n].r * i) + "," + Math.round(start[n].g + diff[n].g * i) + "," + Math.round(start[n].b + diff[n].b * i) + "," + (start[n].a + diff[n].a * i) + ")");
					else for (n = 0; n < len; n++) newVal.push((start[n] || 0) + diff[n] * i);
				} else if (colorAttrs.indexOf(key) !== -1) newVal = "rgba(" + Math.round(start.r + diff.r * i) + "," + Math.round(start.g + diff.g * i) + "," + Math.round(start.b + diff.b * i) + "," + (start.a + diff.a * i) + ")";
				else newVal = start + diff * i;
				node.setAttr(key, newVal);
			}
		}
		_addListeners() {
			this.tween.onPlay = () => {
				this.anim.start();
			};
			this.tween.onReverse = () => {
				this.anim.start();
			};
			this.tween.onPause = () => {
				this.anim.stop();
			};
			this.tween.onFinish = () => {
				const node = this.node;
				const attrs = Tween.attrs[node._id][this._id];
				if (attrs.points && attrs.points.trueEnd) node.setAttr("points", attrs.points.trueEnd);
				if (this.onFinish) this.onFinish.call(this);
			};
			this.tween.onReset = () => {
				const node = this.node;
				const attrs = Tween.attrs[node._id][this._id];
				if (attrs.points && attrs.points.trueStart) node.points(attrs.points.trueStart);
				if (this.onReset) this.onReset();
			};
			this.tween.onUpdate = () => {
				if (this.onUpdate) this.onUpdate.call(this);
			};
		}
		play() {
			this.tween.play();
			return this;
		}
		reverse() {
			this.tween.reverse();
			return this;
		}
		reset() {
			this.tween.reset();
			return this;
		}
		seek(t) {
			this.tween.seek(t * 1e3);
			return this;
		}
		pause() {
			this.tween.pause();
			return this;
		}
		finish() {
			this.tween.finish();
			return this;
		}
		destroy() {
			const nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId];
			this.pause();
			if (this.anim) this.anim.stop();
			for (const key in attrs) delete Tween.tweens[nodeId][key];
			delete Tween.attrs[nodeId][thisId];
			if (Tween.tweens[nodeId]) {
				if (Object.keys(Tween.tweens[nodeId]).length === 0) delete Tween.tweens[nodeId];
				if (Object.keys(Tween.attrs[nodeId]).length === 0) delete Tween.attrs[nodeId];
			}
		}
	};
	exports.Tween = Tween;
	Tween.attrs = {};
	Tween.tweens = {};
	Node_1.Node.prototype.to = function(params) {
		const onFinish = params.onFinish;
		params.node = this;
		params.onFinish = function() {
			this.destroy();
			if (onFinish) onFinish();
		};
		new Tween(params).play();
	};
	exports.Easings = {
		BackEaseIn(t, b, c, d) {
			const s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		BackEaseOut(t, b, c, d) {
			const s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		BackEaseInOut(t, b, c, d) {
			let s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
		},
		ElasticEaseIn(t, b, c, d, a, p) {
			let s = 0;
			if (t === 0) return b;
			if ((t /= d) === 1) return b + c;
			if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		ElasticEaseOut(t, b, c, d, a, p) {
			let s = 0;
			if (t === 0) return b;
			if ((t /= d) === 1) return b + c;
			if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		ElasticEaseInOut(t, b, c, d, a, p) {
			let s = 0;
			if (t === 0) return b;
			if ((t /= d / 2) === 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		BounceEaseOut(t, b, c, d) {
			if ((t /= d) < 1 / 2.75) return c * (7.5625 * t * t) + b;
			else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
			else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
			else return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
		},
		BounceEaseIn(t, b, c, d) {
			return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
		},
		BounceEaseInOut(t, b, c, d) {
			if (t < d / 2) return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
			else return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		},
		EaseIn(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		EaseOut(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		EaseInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * (--t * (t - 2) - 1) + b;
		},
		StrongEaseIn(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		StrongEaseOut(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		StrongEaseInOut(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		Linear(t, b, c, d) {
			return c * t / d + b;
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/_CoreInternals.js
var require__CoreInternals = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Konva = void 0;
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	var Node_1 = require_Node();
	var Container_1 = require_Container();
	var Stage_1 = require_Stage();
	var Layer_1 = require_Layer();
	var FastLayer_1 = require_FastLayer();
	var Group_1 = require_Group();
	var DragAndDrop_1 = require_DragAndDrop();
	var Shape_1 = require_Shape();
	var Animation_1 = require_Animation();
	var Tween_1 = require_Tween();
	var Context_1 = require_Context();
	var Canvas_1 = require_Canvas();
	exports.Konva = Util_1.Util._assign(Global_1.Konva, {
		Util: Util_1.Util,
		Transform: Util_1.Transform,
		Node: Node_1.Node,
		Container: Container_1.Container,
		Stage: Stage_1.Stage,
		stages: Stage_1.stages,
		Layer: Layer_1.Layer,
		FastLayer: FastLayer_1.FastLayer,
		Group: Group_1.Group,
		DD: DragAndDrop_1.DD,
		Shape: Shape_1.Shape,
		shapes: Shape_1.shapes,
		Animation: Animation_1.Animation,
		Tween: Tween_1.Tween,
		Easings: Tween_1.Easings,
		Context: Context_1.Context,
		Canvas: Canvas_1.Canvas
	});
	exports.default = exports.Konva;
}));
//#endregion
//#region node_modules/konva/lib/shapes/Arc.js
var require_Arc = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Arc = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var Validators_1 = require_Validators();
	var Global_2 = require_Global();
	var Arc = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const angle = Global_1.Konva.getAngle(this.angle()), clockwise = this.clockwise();
			context.beginPath();
			context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
			context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.outerRadius() * 2;
		}
		getHeight() {
			return this.outerRadius() * 2;
		}
		setWidth(width) {
			this.outerRadius(width / 2);
		}
		setHeight(height) {
			this.outerRadius(height / 2);
		}
		getSelfRect() {
			const innerRadius = this.innerRadius();
			const outerRadius = this.outerRadius();
			const clockwise = this.clockwise();
			const angle = Global_1.Konva.getAngle(clockwise ? 360 - this.angle() : this.angle());
			const boundLeftRatio = Math.cos(Math.min(angle, Math.PI));
			const boundRightRatio = 1;
			const boundTopRatio = Math.sin(Math.min(Math.max(Math.PI, angle), 3 * Math.PI / 2));
			const boundBottomRatio = Math.sin(Math.min(angle, Math.PI / 2));
			const boundLeft = boundLeftRatio * (boundLeftRatio > 0 ? innerRadius : outerRadius);
			const boundRight = boundRightRatio * (boundRightRatio > 0 ? outerRadius : innerRadius);
			const boundTop = boundTopRatio * (boundTopRatio > 0 ? innerRadius : outerRadius);
			const boundBottom = boundBottomRatio * (boundBottomRatio > 0 ? outerRadius : innerRadius);
			return {
				x: boundLeft,
				y: clockwise ? -1 * boundBottom : boundTop,
				width: boundRight - boundLeft,
				height: boundBottom - boundTop
			};
		}
	};
	exports.Arc = Arc;
	Arc.prototype._centroid = true;
	Arc.prototype.className = "Arc";
	Arc.prototype._attrsAffectingSize = [
		"innerRadius",
		"outerRadius",
		"angle",
		"clockwise"
	];
	(0, Global_2._registerNode)(Arc);
	Factory_1.Factory.addGetterSetter(Arc, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Arc, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Arc, "angle", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Arc, "clockwise", false, (0, Validators_1.getBooleanValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Line.js
var require_Line = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Line = void 0;
	var Factory_1 = require_Factory();
	var Global_1 = require_Global();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
		const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = t * d01 / (d01 + d12), fb = t * d12 / (d01 + d12);
		return [
			x1 - fa * (x2 - x0),
			y1 - fa * (y2 - y0),
			x1 + fb * (x2 - x0),
			y1 + fb * (y2 - y0)
		];
	}
	function expandPoints(p, tension) {
		const len = p.length, allPoints = [];
		for (let n = 2; n < len - 2; n += 2) {
			const cp = getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
			if (isNaN(cp[0])) continue;
			allPoints.push(cp[0]);
			allPoints.push(cp[1]);
			allPoints.push(p[n]);
			allPoints.push(p[n + 1]);
			allPoints.push(cp[2]);
			allPoints.push(cp[3]);
		}
		return allPoints;
	}
	var Line = class extends Shape_1.Shape {
		constructor(config) {
			super(config);
			this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
				this._clearCache("tensionPoints");
			});
		}
		_sceneFunc(context) {
			const points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier();
			if (!length) return;
			let n = 0;
			context.beginPath();
			context.moveTo(points[0], points[1]);
			if (tension !== 0 && length > 4) {
				const tp = this.getTensionPoints();
				const len = tp.length;
				n = closed ? 0 : 4;
				if (!closed) context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
				while (n < len - 2) context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
				if (!closed) context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
			} else if (bezier) {
				n = 2;
				while (n < length) context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
			} else for (n = 2; n < length; n += 2) context.lineTo(points[n], points[n + 1]);
			if (closed) {
				context.closePath();
				context.fillStrokeShape(this);
			} else context.strokeShape(this);
		}
		getTensionPoints() {
			return this._getCache("tensionPoints", this._getTensionPoints);
		}
		_getTensionPoints() {
			if (this.closed()) return this._getTensionPointsClosed();
			else return expandPoints(this.points(), this.tension());
		}
		_getTensionPointsClosed() {
			const p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = expandPoints(p, tension);
			return [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([
				lastControlPoints[0],
				lastControlPoints[1],
				p[len - 2],
				p[len - 1],
				lastControlPoints[2],
				lastControlPoints[3],
				firstControlPoints[0],
				firstControlPoints[1],
				p[0],
				p[1]
			]);
		}
		getWidth() {
			return this.getSelfRect().width;
		}
		getHeight() {
			return this.getSelfRect().height;
		}
		getSelfRect() {
			let points = this.points();
			if (points.length < 4) return {
				x: points[0] || 0,
				y: points[1] || 0,
				width: 0,
				height: 0
			};
			if (this.tension() !== 0) points = [
				points[0],
				points[1],
				...this._getTensionPoints(),
				points[points.length - 2],
				points[points.length - 1]
			];
			else points = this.points();
			let minX = points[0];
			let maxX = points[0];
			let minY = points[1];
			let maxY = points[1];
			let x, y;
			for (let i = 0; i < points.length / 2; i++) {
				x = points[i * 2];
				y = points[i * 2 + 1];
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
			}
			return {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
		}
	};
	exports.Line = Line;
	Line.prototype.className = "Line";
	Line.prototype._attrsAffectingSize = [
		"points",
		"bezier",
		"tension"
	];
	(0, Global_1._registerNode)(Line);
	Factory_1.Factory.addGetterSetter(Line, "closed", false);
	Factory_1.Factory.addGetterSetter(Line, "bezier", false);
	Factory_1.Factory.addGetterSetter(Line, "tension", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Line, "points", [], (0, Validators_1.getNumberArrayValidator)());
}));
//#endregion
//#region node_modules/konva/lib/BezierFunctions.js
var require_BezierFunctions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.t2length = exports.getQuadraticArcLength = exports.getCubicArcLength = exports.binomialCoefficients = exports.cValues = exports.tValues = void 0;
	exports.tValues = [
		[],
		[],
		[-.5773502691896257, .5773502691896257],
		[
			0,
			-.7745966692414834,
			.7745966692414834
		],
		[
			-.33998104358485626,
			.33998104358485626,
			-.8611363115940526,
			.8611363115940526
		],
		[
			0,
			-.5384693101056831,
			.5384693101056831,
			-.906179845938664,
			.906179845938664
		],
		[
			.6612093864662645,
			-.6612093864662645,
			-.2386191860831969,
			.2386191860831969,
			-.932469514203152,
			.932469514203152
		],
		[
			0,
			.4058451513773972,
			-.4058451513773972,
			-.7415311855993945,
			.7415311855993945,
			-.9491079123427585,
			.9491079123427585
		],
		[
			-.1834346424956498,
			.1834346424956498,
			-.525532409916329,
			.525532409916329,
			-.7966664774136267,
			.7966664774136267,
			-.9602898564975363,
			.9602898564975363
		],
		[
			0,
			-.8360311073266358,
			.8360311073266358,
			-.9681602395076261,
			.9681602395076261,
			-.3242534234038089,
			.3242534234038089,
			-.6133714327005904,
			.6133714327005904
		],
		[
			-.14887433898163122,
			.14887433898163122,
			-.4333953941292472,
			.4333953941292472,
			-.6794095682990244,
			.6794095682990244,
			-.8650633666889845,
			.8650633666889845,
			-.9739065285171717,
			.9739065285171717
		],
		[
			0,
			-.26954315595234496,
			.26954315595234496,
			-.5190961292068118,
			.5190961292068118,
			-.7301520055740494,
			.7301520055740494,
			-.8870625997680953,
			.8870625997680953,
			-.978228658146057,
			.978228658146057
		],
		[
			-.1252334085114689,
			.1252334085114689,
			-.3678314989981802,
			.3678314989981802,
			-.5873179542866175,
			.5873179542866175,
			-.7699026741943047,
			.7699026741943047,
			-.9041172563704749,
			.9041172563704749,
			-.9815606342467192,
			.9815606342467192
		],
		[
			0,
			-.2304583159551348,
			.2304583159551348,
			-.44849275103644687,
			.44849275103644687,
			-.6423493394403402,
			.6423493394403402,
			-.8015780907333099,
			.8015780907333099,
			-.9175983992229779,
			.9175983992229779,
			-.9841830547185881,
			.9841830547185881
		],
		[
			-.10805494870734367,
			.10805494870734367,
			-.31911236892788974,
			.31911236892788974,
			-.5152486363581541,
			.5152486363581541,
			-.6872929048116855,
			.6872929048116855,
			-.827201315069765,
			.827201315069765,
			-.9284348836635735,
			.9284348836635735,
			-.9862838086968123,
			.9862838086968123
		],
		[
			0,
			-.20119409399743451,
			.20119409399743451,
			-.3941513470775634,
			.3941513470775634,
			-.5709721726085388,
			.5709721726085388,
			-.7244177313601701,
			.7244177313601701,
			-.8482065834104272,
			.8482065834104272,
			-.937273392400706,
			.937273392400706,
			-.9879925180204854,
			.9879925180204854
		],
		[
			-.09501250983763744,
			.09501250983763744,
			-.2816035507792589,
			.2816035507792589,
			-.45801677765722737,
			.45801677765722737,
			-.6178762444026438,
			.6178762444026438,
			-.755404408355003,
			.755404408355003,
			-.8656312023878318,
			.8656312023878318,
			-.9445750230732326,
			.9445750230732326,
			-.9894009349916499,
			.9894009349916499
		],
		[
			0,
			-.17848418149584785,
			.17848418149584785,
			-.3512317634538763,
			.3512317634538763,
			-.5126905370864769,
			.5126905370864769,
			-.6576711592166907,
			.6576711592166907,
			-.7815140038968014,
			.7815140038968014,
			-.8802391537269859,
			.8802391537269859,
			-.9506755217687678,
			.9506755217687678,
			-.9905754753144174,
			.9905754753144174
		],
		[
			-.0847750130417353,
			.0847750130417353,
			-.2518862256915055,
			.2518862256915055,
			-.41175116146284263,
			.41175116146284263,
			-.5597708310739475,
			.5597708310739475,
			-.6916870430603532,
			.6916870430603532,
			-.8037049589725231,
			.8037049589725231,
			-.8926024664975557,
			.8926024664975557,
			-.9558239495713977,
			.9558239495713977,
			-.9915651684209309,
			.9915651684209309
		],
		[
			0,
			-.16035864564022537,
			.16035864564022537,
			-.31656409996362983,
			.31656409996362983,
			-.46457074137596094,
			.46457074137596094,
			-.600545304661681,
			.600545304661681,
			-.7209661773352294,
			.7209661773352294,
			-.8227146565371428,
			.8227146565371428,
			-.9031559036148179,
			.9031559036148179,
			-.96020815213483,
			.96020815213483,
			-.9924068438435844,
			.9924068438435844
		],
		[
			-.07652652113349734,
			.07652652113349734,
			-.22778585114164507,
			.22778585114164507,
			-.37370608871541955,
			.37370608871541955,
			-.5108670019508271,
			.5108670019508271,
			-.636053680726515,
			.636053680726515,
			-.7463319064601508,
			.7463319064601508,
			-.8391169718222188,
			.8391169718222188,
			-.912234428251326,
			.912234428251326,
			-.9639719272779138,
			.9639719272779138,
			-.9931285991850949,
			.9931285991850949
		],
		[
			0,
			-.1455618541608951,
			.1455618541608951,
			-.2880213168024011,
			.2880213168024011,
			-.4243421202074388,
			.4243421202074388,
			-.5516188358872198,
			.5516188358872198,
			-.6671388041974123,
			.6671388041974123,
			-.7684399634756779,
			.7684399634756779,
			-.8533633645833173,
			.8533633645833173,
			-.9200993341504008,
			.9200993341504008,
			-.9672268385663063,
			.9672268385663063,
			-.9937521706203895,
			.9937521706203895
		],
		[
			-.06973927331972223,
			.06973927331972223,
			-.20786042668822127,
			.20786042668822127,
			-.34193582089208424,
			.34193582089208424,
			-.469355837986757,
			.469355837986757,
			-.5876404035069116,
			.5876404035069116,
			-.6944872631866827,
			.6944872631866827,
			-.7878168059792081,
			.7878168059792081,
			-.8658125777203002,
			.8658125777203002,
			-.926956772187174,
			.926956772187174,
			-.9700604978354287,
			.9700604978354287,
			-.9942945854823992,
			.9942945854823992
		],
		[
			0,
			-.1332568242984661,
			.1332568242984661,
			-.26413568097034495,
			.26413568097034495,
			-.3903010380302908,
			.3903010380302908,
			-.5095014778460075,
			.5095014778460075,
			-.6196098757636461,
			.6196098757636461,
			-.7186613631319502,
			.7186613631319502,
			-.8048884016188399,
			.8048884016188399,
			-.8767523582704416,
			.8767523582704416,
			-.9329710868260161,
			.9329710868260161,
			-.9725424712181152,
			.9725424712181152,
			-.9947693349975522,
			.9947693349975522
		],
		[
			-.06405689286260563,
			.06405689286260563,
			-.1911188674736163,
			.1911188674736163,
			-.3150426796961634,
			.3150426796961634,
			-.4337935076260451,
			.4337935076260451,
			-.5454214713888396,
			.5454214713888396,
			-.6480936519369755,
			.6480936519369755,
			-.7401241915785544,
			.7401241915785544,
			-.820001985973903,
			.820001985973903,
			-.8864155270044011,
			.8864155270044011,
			-.9382745520027328,
			.9382745520027328,
			-.9747285559713095,
			.9747285559713095,
			-.9951872199970213,
			.9951872199970213
		]
	];
	exports.cValues = [
		[],
		[],
		[1, 1],
		[
			.8888888888888888,
			.5555555555555556,
			.5555555555555556
		],
		[
			.6521451548625461,
			.6521451548625461,
			.34785484513745385,
			.34785484513745385
		],
		[
			.5688888888888889,
			.47862867049936647,
			.47862867049936647,
			.23692688505618908,
			.23692688505618908
		],
		[
			.3607615730481386,
			.3607615730481386,
			.46791393457269104,
			.46791393457269104,
			.17132449237917036,
			.17132449237917036
		],
		[
			.4179591836734694,
			.3818300505051189,
			.3818300505051189,
			.27970539148927664,
			.27970539148927664,
			.1294849661688697,
			.1294849661688697
		],
		[
			.362683783378362,
			.362683783378362,
			.31370664587788727,
			.31370664587788727,
			.22238103445337448,
			.22238103445337448,
			.10122853629037626,
			.10122853629037626
		],
		[
			.3302393550012598,
			.1806481606948574,
			.1806481606948574,
			.08127438836157441,
			.08127438836157441,
			.31234707704000286,
			.31234707704000286,
			.26061069640293544,
			.26061069640293544
		],
		[
			.29552422471475287,
			.29552422471475287,
			.26926671930999635,
			.26926671930999635,
			.21908636251598204,
			.21908636251598204,
			.1494513491505806,
			.1494513491505806,
			.06667134430868814,
			.06667134430868814
		],
		[
			.2729250867779006,
			.26280454451024665,
			.26280454451024665,
			.23319376459199048,
			.23319376459199048,
			.18629021092773426,
			.18629021092773426,
			.1255803694649046,
			.1255803694649046,
			.05566856711617366,
			.05566856711617366
		],
		[
			.24914704581340277,
			.24914704581340277,
			.2334925365383548,
			.2334925365383548,
			.20316742672306592,
			.20316742672306592,
			.16007832854334622,
			.16007832854334622,
			.10693932599531843,
			.10693932599531843,
			.04717533638651183,
			.04717533638651183
		],
		[
			.2325515532308739,
			.22628318026289723,
			.22628318026289723,
			.2078160475368885,
			.2078160475368885,
			.17814598076194574,
			.17814598076194574,
			.13887351021978725,
			.13887351021978725,
			.09212149983772845,
			.09212149983772845,
			.04048400476531588,
			.04048400476531588
		],
		[
			.2152638534631578,
			.2152638534631578,
			.2051984637212956,
			.2051984637212956,
			.18553839747793782,
			.18553839747793782,
			.15720316715819355,
			.15720316715819355,
			.12151857068790319,
			.12151857068790319,
			.08015808715976021,
			.08015808715976021,
			.03511946033175186,
			.03511946033175186
		],
		[
			.2025782419255613,
			.19843148532711158,
			.19843148532711158,
			.1861610000155622,
			.1861610000155622,
			.16626920581699392,
			.16626920581699392,
			.13957067792615432,
			.13957067792615432,
			.10715922046717194,
			.10715922046717194,
			.07036604748810812,
			.07036604748810812,
			.03075324199611727,
			.03075324199611727
		],
		[
			.1894506104550685,
			.1894506104550685,
			.18260341504492358,
			.18260341504492358,
			.16915651939500254,
			.16915651939500254,
			.14959598881657674,
			.14959598881657674,
			.12462897125553388,
			.12462897125553388,
			.09515851168249279,
			.09515851168249279,
			.062253523938647894,
			.062253523938647894,
			.027152459411754096,
			.027152459411754096
		],
		[
			.17944647035620653,
			.17656270536699264,
			.17656270536699264,
			.16800410215645004,
			.16800410215645004,
			.15404576107681028,
			.15404576107681028,
			.13513636846852548,
			.13513636846852548,
			.11188384719340397,
			.11188384719340397,
			.08503614831717918,
			.08503614831717918,
			.0554595293739872,
			.0554595293739872,
			.02414830286854793,
			.02414830286854793
		],
		[
			.1691423829631436,
			.1691423829631436,
			.16427648374583273,
			.16427648374583273,
			.15468467512626524,
			.15468467512626524,
			.14064291467065065,
			.14064291467065065,
			.12255520671147846,
			.12255520671147846,
			.10094204410628717,
			.10094204410628717,
			.07642573025488905,
			.07642573025488905,
			.0497145488949698,
			.0497145488949698,
			.02161601352648331,
			.02161601352648331
		],
		[
			.1610544498487837,
			.15896884339395434,
			.15896884339395434,
			.15276604206585967,
			.15276604206585967,
			.1426067021736066,
			.1426067021736066,
			.12875396253933621,
			.12875396253933621,
			.11156664554733399,
			.11156664554733399,
			.09149002162245,
			.09149002162245,
			.06904454273764123,
			.06904454273764123,
			.0448142267656996,
			.0448142267656996,
			.019461788229726478,
			.019461788229726478
		],
		[
			.15275338713072584,
			.15275338713072584,
			.14917298647260374,
			.14917298647260374,
			.14209610931838204,
			.14209610931838204,
			.13168863844917664,
			.13168863844917664,
			.11819453196151841,
			.11819453196151841,
			.10193011981724044,
			.10193011981724044,
			.08327674157670475,
			.08327674157670475,
			.06267204833410907,
			.06267204833410907,
			.04060142980038694,
			.04060142980038694,
			.017614007139152118,
			.017614007139152118
		],
		[
			.14608113364969041,
			.14452440398997005,
			.14452440398997005,
			.13988739479107315,
			.13988739479107315,
			.13226893863333747,
			.13226893863333747,
			.12183141605372853,
			.12183141605372853,
			.10879729916714838,
			.10879729916714838,
			.09344442345603386,
			.09344442345603386,
			.0761001136283793,
			.0761001136283793,
			.057134425426857205,
			.057134425426857205,
			.036953789770852494,
			.036953789770852494,
			.016017228257774335,
			.016017228257774335
		],
		[
			.13925187285563198,
			.13925187285563198,
			.13654149834601517,
			.13654149834601517,
			.13117350478706238,
			.13117350478706238,
			.12325237681051242,
			.12325237681051242,
			.11293229608053922,
			.11293229608053922,
			.10041414444288096,
			.10041414444288096,
			.08594160621706773,
			.08594160621706773,
			.06979646842452049,
			.06979646842452049,
			.052293335152683286,
			.052293335152683286,
			.03377490158481415,
			.03377490158481415,
			.0146279952982722,
			.0146279952982722
		],
		[
			.13365457218610619,
			.1324620394046966,
			.1324620394046966,
			.12890572218808216,
			.12890572218808216,
			.12304908430672953,
			.12304908430672953,
			.11499664022241136,
			.11499664022241136,
			.10489209146454141,
			.10489209146454141,
			.09291576606003515,
			.09291576606003515,
			.07928141177671895,
			.07928141177671895,
			.06423242140852585,
			.06423242140852585,
			.04803767173108467,
			.04803767173108467,
			.030988005856979445,
			.030988005856979445,
			.013411859487141771,
			.013411859487141771
		],
		[
			.12793819534675216,
			.12793819534675216,
			.1258374563468283,
			.1258374563468283,
			.12167047292780339,
			.12167047292780339,
			.1155056680537256,
			.1155056680537256,
			.10744427011596563,
			.10744427011596563,
			.09761865210411388,
			.09761865210411388,
			.08619016153195327,
			.08619016153195327,
			.0733464814110803,
			.0733464814110803,
			.05929858491543678,
			.05929858491543678,
			.04427743881741981,
			.04427743881741981,
			.028531388628933663,
			.028531388628933663,
			.0123412297999872,
			.0123412297999872
		]
	];
	exports.binomialCoefficients = [
		[1],
		[1, 1],
		[
			1,
			2,
			1
		],
		[
			1,
			3,
			3,
			1
		]
	];
	var getCubicArcLength = (xs, ys, t) => {
		let sum;
		let correctedT;
		const n = 20;
		const z = t / 2;
		sum = 0;
		for (let i = 0; i < n; i++) {
			correctedT = z * exports.tValues[n][i] + z;
			sum += exports.cValues[n][i] * BFunc(xs, ys, correctedT);
		}
		return z * sum;
	};
	exports.getCubicArcLength = getCubicArcLength;
	var getQuadraticArcLength = (xs, ys, t) => {
		if (t === void 0) t = 1;
		const ax = xs[0] - 2 * xs[1] + xs[2];
		const ay = ys[0] - 2 * ys[1] + ys[2];
		const bx = 2 * xs[1] - 2 * xs[0];
		const by = 2 * ys[1] - 2 * ys[0];
		const A = 4 * (ax * ax + ay * ay);
		const B = 4 * (ax * bx + ay * by);
		const C = bx * bx + by * by;
		if (A === 0) return t * Math.sqrt(Math.pow(xs[2] - xs[0], 2) + Math.pow(ys[2] - ys[0], 2));
		const b = B / (2 * A);
		const c = C / A;
		const u = t + b;
		const k = c - b * b;
		const uuk = u * u + k > 0 ? Math.sqrt(u * u + k) : 0;
		const bbk = b * b + k > 0 ? Math.sqrt(b * b + k) : 0;
		const term = b + Math.sqrt(b * b + k) !== 0 ? k * Math.log(Math.abs((u + uuk) / (b + bbk))) : 0;
		return Math.sqrt(A) / 2 * (u * uuk - b * bbk + term);
	};
	exports.getQuadraticArcLength = getQuadraticArcLength;
	function BFunc(xs, ys, t) {
		const xbase = getDerivative(1, t, xs);
		const ybase = getDerivative(1, t, ys);
		const combined = xbase * xbase + ybase * ybase;
		return Math.sqrt(combined);
	}
	var getDerivative = (derivative, t, vs) => {
		const n = vs.length - 1;
		let _vs;
		let value;
		if (n === 0) return 0;
		if (derivative === 0) {
			value = 0;
			for (let k = 0; k <= n; k++) value += exports.binomialCoefficients[n][k] * Math.pow(1 - t, n - k) * Math.pow(t, k) * vs[k];
			return value;
		} else {
			_vs = new Array(n);
			for (let k = 0; k < n; k++) _vs[k] = n * (vs[k + 1] - vs[k]);
			return getDerivative(derivative - 1, t, _vs);
		}
	};
	var t2length = (length, totalLength, func) => {
		let error = 1;
		let t = length / totalLength;
		let step = (length - func(t)) / totalLength;
		let numIterations = 0;
		while (error > .001) {
			const increasedTLength = func(t + step);
			const increasedTError = Math.abs(length - increasedTLength) / totalLength;
			if (increasedTError < error) {
				error = increasedTError;
				t += step;
			} else {
				const decreasedTLength = func(t - step);
				const decreasedTError = Math.abs(length - decreasedTLength) / totalLength;
				if (decreasedTError < error) {
					error = decreasedTError;
					t -= step;
				} else step /= 2;
			}
			numIterations++;
			if (numIterations > 500) break;
		}
		return t;
	};
	exports.t2length = t2length;
}));
//#endregion
//#region node_modules/konva/lib/shapes/Path.js
var require_Path = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Path = void 0;
	var Factory_1 = require_Factory();
	var Global_1 = require_Global();
	var Shape_1 = require_Shape();
	var BezierFunctions_1 = require_BezierFunctions();
	var Path = class Path extends Shape_1.Shape {
		constructor(config) {
			super(config);
			this.dataArray = [];
			this.pathLength = 0;
			this._readDataAttribute();
			this.on("dataChange.konva", function() {
				this._readDataAttribute();
			});
		}
		_readDataAttribute() {
			this.dataArray = Path.parsePathData(this.data());
			this.pathLength = Path.getPathLength(this.dataArray);
		}
		_sceneFunc(context) {
			const ca = this.dataArray;
			context.beginPath();
			let isClosed = false;
			for (let n = 0; n < ca.length; n++) {
				const c = ca[n].command;
				const p = ca[n].points;
				switch (c) {
					case "L":
						context.lineTo(p[0], p[1]);
						break;
					case "M":
						context.moveTo(p[0], p[1]);
						break;
					case "C":
						context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
						break;
					case "Q":
						context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
						break;
					case "A":
						const cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
						const r = rx > ry ? rx : ry;
						const scaleX = rx > ry ? 1 : rx / ry;
						const scaleY = rx > ry ? ry / rx : 1;
						context.translate(cx, cy);
						context.rotate(psi);
						context.scale(scaleX, scaleY);
						context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
						context.scale(1 / scaleX, 1 / scaleY);
						context.rotate(-psi);
						context.translate(-cx, -cy);
						break;
					case "z":
						isClosed = true;
						context.closePath();
						break;
				}
			}
			if (!isClosed && !this.hasFill()) context.strokeShape(this);
			else context.fillStrokeShape(this);
		}
		getSelfRect() {
			let points = [];
			this.dataArray.forEach(function(data) {
				if (data.command === "A") {
					const start = data.points[4];
					const dTheta = data.points[5];
					const end = data.points[4] + dTheta;
					let inc = Math.PI / 180;
					if (Math.abs(start - end) < inc) inc = Math.abs(start - end);
					if (dTheta < 0) for (let t = start - inc; t > end; t -= inc) {
						const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
						points.push(point.x, point.y);
					}
					else for (let t = start + inc; t < end; t += inc) {
						const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
						points.push(point.x, point.y);
					}
				} else if (data.command === "C") for (let t = 0; t <= 1; t += .01) {
					const point = Path.getPointOnCubicBezier(t, data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
					points.push(point.x, point.y);
				}
				else points = points.concat(data.points);
			});
			let minX = points[0];
			let maxX = points[0];
			let minY = points[1];
			let maxY = points[1];
			let x, y;
			for (let i = 0; i < points.length / 2; i++) {
				x = points[i * 2];
				y = points[i * 2 + 1];
				if (!isNaN(x)) {
					minX = Math.min(minX, x);
					maxX = Math.max(maxX, x);
				}
				if (!isNaN(y)) {
					minY = Math.min(minY, y);
					maxY = Math.max(maxY, y);
				}
			}
			return {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
		}
		getLength() {
			return this.pathLength;
		}
		getPointAtLength(length) {
			return Path.getPointAtLengthOfDataArray(length, this.dataArray);
		}
		static getLineLength(x1, y1, x2, y2) {
			return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		}
		static getPathLength(dataArray) {
			let pathLength = 0;
			for (let i = 0; i < dataArray.length; ++i) pathLength += dataArray[i].pathLength;
			return pathLength;
		}
		static getPointAtLengthOfDataArray(length, dataArray) {
			let points, i = 0, ii = dataArray.length;
			if (!ii) return null;
			while (i < ii && length > dataArray[i].pathLength) {
				length -= dataArray[i].pathLength;
				++i;
			}
			if (i === ii) {
				points = dataArray[i - 1].points.slice(-2);
				return {
					x: points[0],
					y: points[1]
				};
			}
			if (length < .01) if (dataArray[i].command === "M") {
				points = dataArray[i].points.slice(0, 2);
				return {
					x: points[0],
					y: points[1]
				};
			} else return {
				x: dataArray[i].start.x,
				y: dataArray[i].start.y
			};
			const cp = dataArray[i];
			const p = cp.points;
			switch (cp.command) {
				case "L": return Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
				case "C": return Path.getPointOnCubicBezier((0, BezierFunctions_1.t2length)(length, Path.getPathLength(dataArray), (i) => {
					return (0, BezierFunctions_1.getCubicArcLength)([
						cp.start.x,
						p[0],
						p[2],
						p[4]
					], [
						cp.start.y,
						p[1],
						p[3],
						p[5]
					], i);
				}), cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
				case "Q": return Path.getPointOnQuadraticBezier((0, BezierFunctions_1.t2length)(length, Path.getPathLength(dataArray), (i) => {
					return (0, BezierFunctions_1.getQuadraticArcLength)([
						cp.start.x,
						p[0],
						p[2]
					], [
						cp.start.y,
						p[1],
						p[3]
					], i);
				}), cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
				case "A":
					const cx = p[0], cy = p[1], rx = p[2], ry = p[3], dTheta = p[5], psi = p[6];
					let theta = p[4];
					theta += dTheta * length / cp.pathLength;
					return Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
			}
			return null;
		}
		static getPointOnLine(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
			fromX = fromX !== null && fromX !== void 0 ? fromX : P1x;
			fromY = fromY !== null && fromY !== void 0 ? fromY : P1y;
			const len = this.getLineLength(P1x, P1y, P2x, P2y);
			if (len < 1e-10) return {
				x: P1x,
				y: P1y
			};
			if (P2x === P1x) return {
				x: fromX,
				y: fromY + (P2y > P1y ? dist : -dist)
			};
			const m = (P2y - P1y) / (P2x - P1x);
			const run = Math.sqrt(dist * dist / (1 + m * m)) * (P2x < P1x ? -1 : 1);
			const rise = m * run;
			if (Math.abs(fromY - P1y - m * (fromX - P1x)) < 1e-10) return {
				x: fromX + run,
				y: fromY + rise
			};
			const u = ((fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y)) / (len * len);
			const ix = P1x + u * (P2x - P1x);
			const iy = P1y + u * (P2y - P1y);
			const pRise = this.getLineLength(fromX, fromY, ix, iy);
			const pRun = Math.sqrt(dist * dist - pRise * pRise);
			const adjustedRun = Math.sqrt(pRun * pRun / (1 + m * m)) * (P2x < P1x ? -1 : 1);
			const adjustedRise = m * adjustedRun;
			return {
				x: ix + adjustedRun,
				y: iy + adjustedRise
			};
		}
		static getPointOnCubicBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
			function CB1(t) {
				return t * t * t;
			}
			function CB2(t) {
				return 3 * t * t * (1 - t);
			}
			function CB3(t) {
				return 3 * t * (1 - t) * (1 - t);
			}
			function CB4(t) {
				return (1 - t) * (1 - t) * (1 - t);
			}
			return {
				x: P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct),
				y: P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct)
			};
		}
		static getPointOnQuadraticBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
			function QB1(t) {
				return t * t;
			}
			function QB2(t) {
				return 2 * t * (1 - t);
			}
			function QB3(t) {
				return (1 - t) * (1 - t);
			}
			return {
				x: P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct),
				y: P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct)
			};
		}
		static getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
			const cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
			const pt = {
				x: rx * Math.cos(theta),
				y: ry * Math.sin(theta)
			};
			return {
				x: cx + (pt.x * cosPsi - pt.y * sinPsi),
				y: cy + (pt.x * sinPsi + pt.y * cosPsi)
			};
		}
		static parsePathData(data) {
			if (!data) return [];
			let cs = data;
			const cc = [
				"m",
				"M",
				"l",
				"L",
				"v",
				"V",
				"h",
				"H",
				"z",
				"Z",
				"c",
				"C",
				"q",
				"Q",
				"t",
				"T",
				"s",
				"S",
				"a",
				"A"
			];
			cs = cs.replace(/* @__PURE__ */ new RegExp(" ", "g"), ",");
			for (let n = 0; n < cc.length; n++) cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
			const arr = cs.split("|");
			const ca = [];
			const coords = [];
			let cpx = 0;
			let cpy = 0;
			const re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
			let match;
			for (let n = 1; n < arr.length; n++) {
				let str = arr[n];
				let c = str.charAt(0);
				str = str.slice(1);
				coords.length = 0;
				while (match = re.exec(str)) coords.push(match[0]);
				const p = [];
				for (let j = 0, jlen = coords.length; j < jlen; j++) {
					if (coords[j] === "00") {
						p.push(0, 0);
						continue;
					}
					const parsed = parseFloat(coords[j]);
					if (!isNaN(parsed)) p.push(parsed);
					else p.push(0);
				}
				while (p.length > 0) {
					if (isNaN(p[0])) break;
					let cmd = "";
					let points = [];
					const startX = cpx, startY = cpy;
					let prevCmd, ctlPtx, ctlPty;
					let rx, ry, psi, fa, fs, x1, y1;
					switch (c) {
						case "l":
							cpx += p.shift();
							cpy += p.shift();
							cmd = "L";
							points.push(cpx, cpy);
							break;
						case "L":
							cpx = p.shift();
							cpy = p.shift();
							points.push(cpx, cpy);
							break;
						case "m":
							const dx = p.shift();
							const dy = p.shift();
							cpx += dx;
							cpy += dy;
							cmd = "M";
							if (ca.length > 2 && ca[ca.length - 1].command === "z") {
								for (let idx = ca.length - 2; idx >= 0; idx--) if (ca[idx].command === "M") {
									cpx = ca[idx].points[0] + dx;
									cpy = ca[idx].points[1] + dy;
									break;
								}
							}
							points.push(cpx, cpy);
							c = "l";
							break;
						case "M":
							cpx = p.shift();
							cpy = p.shift();
							cmd = "M";
							points.push(cpx, cpy);
							c = "L";
							break;
						case "h":
							cpx += p.shift();
							cmd = "L";
							points.push(cpx, cpy);
							break;
						case "H":
							cpx = p.shift();
							cmd = "L";
							points.push(cpx, cpy);
							break;
						case "v":
							cpy += p.shift();
							cmd = "L";
							points.push(cpx, cpy);
							break;
						case "V":
							cpy = p.shift();
							cmd = "L";
							points.push(cpx, cpy);
							break;
						case "C":
							points.push(p.shift(), p.shift(), p.shift(), p.shift());
							cpx = p.shift();
							cpy = p.shift();
							points.push(cpx, cpy);
							break;
						case "c":
							points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
							cpx += p.shift();
							cpy += p.shift();
							cmd = "C";
							points.push(cpx, cpy);
							break;
						case "S":
							ctlPtx = cpx;
							ctlPty = cpy;
							prevCmd = ca[ca.length - 1];
							if (prevCmd.command === "C") {
								ctlPtx = cpx + (cpx - prevCmd.points[2]);
								ctlPty = cpy + (cpy - prevCmd.points[3]);
							}
							points.push(ctlPtx, ctlPty, p.shift(), p.shift());
							cpx = p.shift();
							cpy = p.shift();
							cmd = "C";
							points.push(cpx, cpy);
							break;
						case "s":
							ctlPtx = cpx;
							ctlPty = cpy;
							prevCmd = ca[ca.length - 1];
							if (prevCmd.command === "C") {
								ctlPtx = cpx + (cpx - prevCmd.points[2]);
								ctlPty = cpy + (cpy - prevCmd.points[3]);
							}
							points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
							cpx += p.shift();
							cpy += p.shift();
							cmd = "C";
							points.push(cpx, cpy);
							break;
						case "Q":
							points.push(p.shift(), p.shift());
							cpx = p.shift();
							cpy = p.shift();
							points.push(cpx, cpy);
							break;
						case "q":
							points.push(cpx + p.shift(), cpy + p.shift());
							cpx += p.shift();
							cpy += p.shift();
							cmd = "Q";
							points.push(cpx, cpy);
							break;
						case "T":
							ctlPtx = cpx;
							ctlPty = cpy;
							prevCmd = ca[ca.length - 1];
							if (prevCmd.command === "Q") {
								ctlPtx = cpx + (cpx - prevCmd.points[0]);
								ctlPty = cpy + (cpy - prevCmd.points[1]);
							}
							cpx = p.shift();
							cpy = p.shift();
							cmd = "Q";
							points.push(ctlPtx, ctlPty, cpx, cpy);
							break;
						case "t":
							ctlPtx = cpx;
							ctlPty = cpy;
							prevCmd = ca[ca.length - 1];
							if (prevCmd.command === "Q") {
								ctlPtx = cpx + (cpx - prevCmd.points[0]);
								ctlPty = cpy + (cpy - prevCmd.points[1]);
							}
							cpx += p.shift();
							cpy += p.shift();
							cmd = "Q";
							points.push(ctlPtx, ctlPty, cpx, cpy);
							break;
						case "A":
							rx = p.shift();
							ry = p.shift();
							psi = p.shift();
							fa = p.shift();
							fs = p.shift();
							x1 = cpx;
							y1 = cpy;
							cpx = p.shift();
							cpy = p.shift();
							cmd = "A";
							points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
							break;
						case "a":
							rx = p.shift();
							ry = p.shift();
							psi = p.shift();
							fa = p.shift();
							fs = p.shift();
							x1 = cpx;
							y1 = cpy;
							cpx += p.shift();
							cpy += p.shift();
							cmd = "A";
							points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
							break;
					}
					ca.push({
						command: cmd || c,
						points,
						start: {
							x: startX,
							y: startY
						},
						pathLength: this.calcLength(startX, startY, cmd || c, points)
					});
				}
				if (c === "z" || c === "Z") ca.push({
					command: "z",
					points: [],
					start: void 0,
					pathLength: 0
				});
			}
			return ca;
		}
		static calcLength(x, y, cmd, points) {
			let len, p1, p2, t;
			const path = Path;
			switch (cmd) {
				case "L": return path.getLineLength(x, y, points[0], points[1]);
				case "C": return (0, BezierFunctions_1.getCubicArcLength)([
					x,
					points[0],
					points[2],
					points[4]
				], [
					y,
					points[1],
					points[3],
					points[5]
				], 1);
				case "Q": return (0, BezierFunctions_1.getQuadraticArcLength)([
					x,
					points[0],
					points[2]
				], [
					y,
					points[1],
					points[3]
				], 1);
				case "A":
					len = 0;
					const start = points[4];
					const dTheta = points[5];
					const end = points[4] + dTheta;
					let inc = Math.PI / 180;
					if (Math.abs(start - end) < inc) inc = Math.abs(start - end);
					p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
					if (dTheta < 0) for (t = start - inc; t > end; t -= inc) {
						p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
						len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
						p1 = p2;
					}
					else for (t = start + inc; t < end; t += inc) {
						p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
						len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
						p1 = p2;
					}
					p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
					len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
					return len;
			}
			return 0;
		}
		static convertEndpointToCenterParameterization(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
			const psi = psiDeg * (Math.PI / 180);
			const xp = Math.cos(psi) * (x1 - x2) / 2 + Math.sin(psi) * (y1 - y2) / 2;
			const yp = -1 * Math.sin(psi) * (x1 - x2) / 2 + Math.cos(psi) * (y1 - y2) / 2;
			const lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
			if (lambda > 1) {
				rx *= Math.sqrt(lambda);
				ry *= Math.sqrt(lambda);
			}
			let f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
			if (fa === fs) f *= -1;
			if (isNaN(f)) f = 0;
			const cxp = f * rx * yp / ry;
			const cyp = f * -ry * xp / rx;
			const cx = (x1 + x2) / 2 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
			const cy = (y1 + y2) / 2 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
			const vMag = function(v) {
				return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
			};
			const vRatio = function(u, v) {
				return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
			};
			const vAngle = function(u, v) {
				return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
			};
			const theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
			const u = [(xp - cxp) / rx, (yp - cyp) / ry];
			const v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
			let dTheta = vAngle(u, v);
			if (vRatio(u, v) <= -1) dTheta = Math.PI;
			if (vRatio(u, v) >= 1) dTheta = 0;
			if (fs === 0 && dTheta > 0) dTheta = dTheta - 2 * Math.PI;
			if (fs === 1 && dTheta < 0) dTheta = dTheta + 2 * Math.PI;
			return [
				cx,
				cy,
				rx,
				ry,
				theta,
				dTheta,
				psi,
				fs
			];
		}
	};
	exports.Path = Path;
	Path.prototype.className = "Path";
	Path.prototype._attrsAffectingSize = ["data"];
	(0, Global_1._registerNode)(Path);
	Factory_1.Factory.addGetterSetter(Path, "data");
}));
//#endregion
//#region node_modules/konva/lib/shapes/Arrow.js
var require_Arrow = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Arrow = void 0;
	var Factory_1 = require_Factory();
	var Line_1 = require_Line();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var Path_1 = require_Path();
	var Arrow = class extends Line_1.Line {
		_sceneFunc(ctx) {
			super._sceneFunc(ctx);
			const PI2 = Math.PI * 2;
			const points = this.points();
			let tp = points;
			const fromTension = this.tension() !== 0 && points.length > 4;
			if (fromTension) tp = this.getTensionPoints();
			const length = this.pointerLength();
			const n = points.length;
			let dx, dy;
			if (fromTension) {
				const lp = [
					tp[tp.length - 4],
					tp[tp.length - 3],
					tp[tp.length - 2],
					tp[tp.length - 1],
					points[n - 2],
					points[n - 1]
				];
				const lastLength = Path_1.Path.calcLength(tp[tp.length - 4], tp[tp.length - 3], "C", lp);
				const previous = Path_1.Path.getPointOnQuadraticBezier(Math.min(1, 1 - length / lastLength), lp[0], lp[1], lp[2], lp[3], lp[4], lp[5]);
				dx = points[n - 2] - previous.x;
				dy = points[n - 1] - previous.y;
			} else {
				dx = points[n - 2] - points[n - 4];
				dy = points[n - 1] - points[n - 3];
			}
			const radians = (Math.atan2(dy, dx) + PI2) % PI2;
			const width = this.pointerWidth();
			if (this.pointerAtEnding()) {
				ctx.save();
				ctx.beginPath();
				ctx.translate(points[n - 2], points[n - 1]);
				ctx.rotate(radians);
				ctx.moveTo(0, 0);
				ctx.lineTo(-length, width / 2);
				ctx.lineTo(-length, -width / 2);
				ctx.closePath();
				ctx.restore();
				this.__fillStroke(ctx);
			}
			if (this.pointerAtBeginning()) {
				ctx.save();
				ctx.beginPath();
				ctx.translate(points[0], points[1]);
				if (fromTension) {
					dx = (tp[0] + tp[2]) / 2 - points[0];
					dy = (tp[1] + tp[3]) / 2 - points[1];
				} else {
					dx = points[2] - points[0];
					dy = points[3] - points[1];
				}
				ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
				ctx.moveTo(0, 0);
				ctx.lineTo(-length, width / 2);
				ctx.lineTo(-length, -width / 2);
				ctx.closePath();
				ctx.restore();
				this.__fillStroke(ctx);
			}
		}
		__fillStroke(ctx) {
			const isDashEnabled = this.dashEnabled();
			if (isDashEnabled) {
				this.attrs.dashEnabled = false;
				ctx.setLineDash([]);
			}
			ctx.fillStrokeShape(this);
			if (isDashEnabled) this.attrs.dashEnabled = true;
		}
		getSelfRect() {
			const lineRect = super.getSelfRect();
			const offset = this.pointerWidth() / 2;
			return {
				x: lineRect.x,
				y: lineRect.y - offset,
				width: lineRect.width,
				height: lineRect.height + offset * 2
			};
		}
	};
	exports.Arrow = Arrow;
	Arrow.prototype.className = "Arrow";
	(0, Global_1._registerNode)(Arrow);
	Factory_1.Factory.addGetterSetter(Arrow, "pointerLength", 10, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Arrow, "pointerWidth", 10, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Arrow, "pointerAtBeginning", false);
	Factory_1.Factory.addGetterSetter(Arrow, "pointerAtEnding", true);
}));
//#endregion
//#region node_modules/konva/lib/shapes/Circle.js
var require_Circle = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Circle = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var Circle = class extends Shape_1.Shape {
		_sceneFunc(context) {
			context.beginPath();
			context.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, false);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.radius() * 2;
		}
		getHeight() {
			return this.radius() * 2;
		}
		setWidth(width) {
			if (this.radius() !== width / 2) this.radius(width / 2);
		}
		setHeight(height) {
			if (this.radius() !== height / 2) this.radius(height / 2);
		}
	};
	exports.Circle = Circle;
	Circle.prototype._centroid = true;
	Circle.prototype.className = "Circle";
	Circle.prototype._attrsAffectingSize = ["radius"];
	(0, Global_1._registerNode)(Circle);
	Factory_1.Factory.addGetterSetter(Circle, "radius", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Ellipse.js
var require_Ellipse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Ellipse = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var Ellipse = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const rx = this.radiusX(), ry = this.radiusY();
			context.beginPath();
			context.save();
			if (rx !== ry) context.scale(1, ry / rx);
			context.arc(0, 0, rx, 0, Math.PI * 2, false);
			context.restore();
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.radiusX() * 2;
		}
		getHeight() {
			return this.radiusY() * 2;
		}
		setWidth(width) {
			this.radiusX(width / 2);
		}
		setHeight(height) {
			this.radiusY(height / 2);
		}
	};
	exports.Ellipse = Ellipse;
	Ellipse.prototype.className = "Ellipse";
	Ellipse.prototype._centroid = true;
	Ellipse.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
	(0, Global_1._registerNode)(Ellipse);
	Factory_1.Factory.addComponentsGetterSetter(Ellipse, "radius", ["x", "y"]);
	Factory_1.Factory.addGetterSetter(Ellipse, "radiusX", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Ellipse, "radiusY", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Image.js
var require_Image = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Image = void 0;
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var Validators_1 = require_Validators();
	var Image = class Image extends Shape_1.Shape {
		constructor(attrs) {
			super(attrs);
			this._loadListener = () => {
				this._requestDraw();
			};
			this.on("imageChange.konva", (props) => {
				this._removeImageLoad(props.oldVal);
				this._setImageLoad();
			});
			this._setImageLoad();
		}
		_setImageLoad() {
			const image = this.image();
			if (image && image.complete) return;
			if (image && image.readyState === 4) return;
			if (image && image["addEventListener"]) image["addEventListener"]("load", this._loadListener);
		}
		_removeImageLoad(image) {
			if (image && image["removeEventListener"]) image["removeEventListener"]("load", this._loadListener);
		}
		destroy() {
			this._removeImageLoad(this.image());
			super.destroy();
			return this;
		}
		_useBufferCanvas() {
			const hasCornerRadius = !!this.cornerRadius();
			const hasShadow = this.hasShadow();
			if (hasCornerRadius && hasShadow) return true;
			return super._useBufferCanvas(true);
		}
		_sceneFunc(context) {
			const width = this.getWidth();
			const height = this.getHeight();
			const cornerRadius = this.cornerRadius();
			const image = this.attrs.image;
			let params;
			if (image) {
				const cropWidth = this.attrs.cropWidth;
				const cropHeight = this.attrs.cropHeight;
				if (cropWidth && cropHeight) params = [
					image,
					this.cropX(),
					this.cropY(),
					cropWidth,
					cropHeight,
					0,
					0,
					width,
					height
				];
				else params = [
					image,
					0,
					0,
					width,
					height
				];
			}
			if (this.hasFill() || this.hasStroke() || cornerRadius) {
				context.beginPath();
				cornerRadius ? Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius) : context.rect(0, 0, width, height);
				context.closePath();
				context.fillStrokeShape(this);
			}
			if (image) {
				if (cornerRadius) context.clip();
				context.drawImage.apply(context, params);
			}
		}
		_hitFunc(context) {
			const width = this.width(), height = this.height(), cornerRadius = this.cornerRadius();
			context.beginPath();
			if (!cornerRadius) context.rect(0, 0, width, height);
			else Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			var _a, _b;
			return (_a = this.attrs.width) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.width;
		}
		getHeight() {
			var _a, _b;
			return (_a = this.attrs.height) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.height;
		}
		static fromURL(url, callback, onError = null) {
			const img = Util_1.Util.createImageElement();
			img.onload = function() {
				callback(new Image({ image: img }));
			};
			img.onerror = onError;
			img.crossOrigin = "Anonymous";
			img.src = url;
		}
	};
	exports.Image = Image;
	Image.prototype.className = "Image";
	(0, Global_1._registerNode)(Image);
	Factory_1.Factory.addGetterSetter(Image, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
	Factory_1.Factory.addGetterSetter(Image, "image");
	Factory_1.Factory.addComponentsGetterSetter(Image, "crop", [
		"x",
		"y",
		"width",
		"height"
	]);
	Factory_1.Factory.addGetterSetter(Image, "cropX", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Image, "cropY", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Image, "cropWidth", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Image, "cropHeight", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Label.js
var require_Label = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Tag = exports.Label = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Group_1 = require_Group();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var ATTR_CHANGE_LIST = [
		"fontFamily",
		"fontSize",
		"fontStyle",
		"padding",
		"lineHeight",
		"text",
		"width",
		"height",
		"pointerDirection",
		"pointerWidth",
		"pointerHeight"
	], CHANGE_KONVA = "Change.konva", NONE = "none", UP = "up", RIGHT = "right", DOWN = "down", LEFT = "left", attrChangeListLen = ATTR_CHANGE_LIST.length;
	var Label = class extends Group_1.Group {
		constructor(config) {
			super(config);
			this.on("add.konva", function(evt) {
				this._addListeners(evt.child);
				this._sync();
			});
		}
		getText() {
			return this.find("Text")[0];
		}
		getTag() {
			return this.find("Tag")[0];
		}
		_addListeners(text) {
			let that = this, n;
			const func = function() {
				that._sync();
			};
			for (n = 0; n < attrChangeListLen; n++) text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
		}
		getWidth() {
			return this.getText().width();
		}
		getHeight() {
			return this.getText().height();
		}
		_sync() {
			let text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
			if (text && tag) {
				width = text.width();
				height = text.height();
				pointerDirection = tag.pointerDirection();
				pointerWidth = tag.pointerWidth();
				pointerHeight = tag.pointerHeight();
				x = 0;
				y = 0;
				switch (pointerDirection) {
					case UP:
						x = width / 2;
						y = -1 * pointerHeight;
						break;
					case RIGHT:
						x = width + pointerWidth;
						y = height / 2;
						break;
					case DOWN:
						x = width / 2;
						y = height + pointerHeight;
						break;
					case LEFT:
						x = -1 * pointerWidth;
						y = height / 2;
						break;
				}
				tag.setAttrs({
					x: -1 * x,
					y: -1 * y,
					width,
					height
				});
				text.setAttrs({
					x: -1 * x,
					y: -1 * y
				});
			}
		}
	};
	exports.Label = Label;
	Label.prototype.className = "Label";
	(0, Global_1._registerNode)(Label);
	var Tag = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = this.cornerRadius();
			let topLeft = 0;
			let topRight = 0;
			let bottomLeft = 0;
			let bottomRight = 0;
			if (typeof cornerRadius === "number") topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
			else {
				topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
				topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
				bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
				bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
			}
			context.beginPath();
			context.moveTo(topLeft, 0);
			if (pointerDirection === UP) {
				context.lineTo((width - pointerWidth) / 2, 0);
				context.lineTo(width / 2, -1 * pointerHeight);
				context.lineTo((width + pointerWidth) / 2, 0);
			}
			context.lineTo(width - topRight, 0);
			context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
			if (pointerDirection === RIGHT) {
				context.lineTo(width, (height - pointerHeight) / 2);
				context.lineTo(width + pointerWidth, height / 2);
				context.lineTo(width, (height + pointerHeight) / 2);
			}
			context.lineTo(width, height - bottomRight);
			context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
			if (pointerDirection === DOWN) {
				context.lineTo((width + pointerWidth) / 2, height);
				context.lineTo(width / 2, height + pointerHeight);
				context.lineTo((width - pointerWidth) / 2, height);
			}
			context.lineTo(bottomLeft, height);
			context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
			if (pointerDirection === LEFT) {
				context.lineTo(0, (height + pointerHeight) / 2);
				context.lineTo(-1 * pointerWidth, height / 2);
				context.lineTo(0, (height - pointerHeight) / 2);
			}
			context.lineTo(0, topLeft);
			context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getSelfRect() {
			let x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
			if (direction === UP) {
				y -= pointerHeight;
				height += pointerHeight;
			} else if (direction === DOWN) height += pointerHeight;
			else if (direction === LEFT) {
				x -= pointerWidth * 1.5;
				width += pointerWidth;
			} else if (direction === RIGHT) width += pointerWidth * 1.5;
			return {
				x,
				y,
				width,
				height
			};
		}
	};
	exports.Tag = Tag;
	Tag.prototype.className = "Tag";
	(0, Global_1._registerNode)(Tag);
	Factory_1.Factory.addGetterSetter(Tag, "pointerDirection", NONE);
	Factory_1.Factory.addGetterSetter(Tag, "pointerWidth", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Tag, "pointerHeight", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Tag, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
}));
//#endregion
//#region node_modules/konva/lib/shapes/Rect.js
var require_Rect = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Rect = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var Util_1 = require_Util();
	var Validators_1 = require_Validators();
	var Rect = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
			context.beginPath();
			if (!cornerRadius) context.rect(0, 0, width, height);
			else Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius);
			context.closePath();
			context.fillStrokeShape(this);
		}
	};
	exports.Rect = Rect;
	Rect.prototype.className = "Rect";
	(0, Global_1._registerNode)(Rect);
	Factory_1.Factory.addGetterSetter(Rect, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
}));
//#endregion
//#region node_modules/konva/lib/shapes/RegularPolygon.js
var require_RegularPolygon = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RegularPolygon = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var RegularPolygon = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const points = this._getPoints();
			context.beginPath();
			context.moveTo(points[0].x, points[0].y);
			for (let n = 1; n < points.length; n++) context.lineTo(points[n].x, points[n].y);
			context.closePath();
			context.fillStrokeShape(this);
		}
		_getPoints() {
			const sides = this.attrs.sides;
			const radius = this.attrs.radius || 0;
			const points = [];
			for (let n = 0; n < sides; n++) points.push({
				x: radius * Math.sin(n * 2 * Math.PI / sides),
				y: -1 * radius * Math.cos(n * 2 * Math.PI / sides)
			});
			return points;
		}
		getSelfRect() {
			const points = this._getPoints();
			let minX = points[0].x;
			let maxX = points[0].y;
			let minY = points[0].x;
			let maxY = points[0].y;
			points.forEach((point) => {
				minX = Math.min(minX, point.x);
				maxX = Math.max(maxX, point.x);
				minY = Math.min(minY, point.y);
				maxY = Math.max(maxY, point.y);
			});
			return {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
		}
		getWidth() {
			return this.radius() * 2;
		}
		getHeight() {
			return this.radius() * 2;
		}
		setWidth(width) {
			this.radius(width / 2);
		}
		setHeight(height) {
			this.radius(height / 2);
		}
	};
	exports.RegularPolygon = RegularPolygon;
	RegularPolygon.prototype.className = "RegularPolygon";
	RegularPolygon.prototype._centroid = true;
	RegularPolygon.prototype._attrsAffectingSize = ["radius"];
	(0, Global_1._registerNode)(RegularPolygon);
	Factory_1.Factory.addGetterSetter(RegularPolygon, "radius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(RegularPolygon, "sides", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Ring.js
var require_Ring = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Ring = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var PIx2 = Math.PI * 2;
	var Ring = class extends Shape_1.Shape {
		_sceneFunc(context) {
			context.beginPath();
			context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
			context.moveTo(this.outerRadius(), 0);
			context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.outerRadius() * 2;
		}
		getHeight() {
			return this.outerRadius() * 2;
		}
		setWidth(width) {
			this.outerRadius(width / 2);
		}
		setHeight(height) {
			this.outerRadius(height / 2);
		}
	};
	exports.Ring = Ring;
	Ring.prototype.className = "Ring";
	Ring.prototype._centroid = true;
	Ring.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
	(0, Global_1._registerNode)(Ring);
	Factory_1.Factory.addGetterSetter(Ring, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Ring, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Sprite.js
var require_Sprite = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sprite = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Animation_1 = require_Animation();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var Sprite = class extends Shape_1.Shape {
		constructor(config) {
			super(config);
			this._updated = true;
			this.anim = new Animation_1.Animation(() => {
				const updated = this._updated;
				this._updated = false;
				return updated;
			});
			this.on("animationChange.konva", function() {
				this.frameIndex(0);
			});
			this.on("frameIndexChange.konva", function() {
				this._updated = true;
			});
			this.on("frameRateChange.konva", function() {
				if (!this.anim.isRunning()) return;
				clearInterval(this.interval);
				this._setInterval();
			});
		}
		_sceneFunc(context) {
			const anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
			if (this.hasFill() || this.hasStroke()) {
				context.beginPath();
				context.rect(0, 0, width, height);
				context.closePath();
				context.fillStrokeShape(this);
			}
			if (image) if (offsets) {
				const offset = offsets[anim], ix2 = index * 2;
				context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
			} else context.drawImage(image, x, y, width, height, 0, 0, width, height);
		}
		_hitFunc(context) {
			const anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
			context.beginPath();
			if (offsets) {
				const offset = offsets[anim];
				const ix2 = index * 2;
				context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
			} else context.rect(0, 0, width, height);
			context.closePath();
			context.fillShape(this);
		}
		_useBufferCanvas() {
			return super._useBufferCanvas(true);
		}
		_setInterval() {
			const that = this;
			this.interval = setInterval(function() {
				that._updateIndex();
			}, 1e3 / this.frameRate());
		}
		start() {
			if (this.isRunning()) return;
			const layer = this.getLayer();
			this.anim.setLayers(layer);
			this._setInterval();
			this.anim.start();
		}
		stop() {
			this.anim.stop();
			clearInterval(this.interval);
		}
		isRunning() {
			return this.anim.isRunning();
		}
		_updateIndex() {
			const index = this.frameIndex(), animation = this.animation();
			if (index < this.animations()[animation].length / 4 - 1) this.frameIndex(index + 1);
			else this.frameIndex(0);
		}
	};
	exports.Sprite = Sprite;
	Sprite.prototype.className = "Sprite";
	(0, Global_1._registerNode)(Sprite);
	Factory_1.Factory.addGetterSetter(Sprite, "animation");
	Factory_1.Factory.addGetterSetter(Sprite, "animations");
	Factory_1.Factory.addGetterSetter(Sprite, "frameOffsets");
	Factory_1.Factory.addGetterSetter(Sprite, "image");
	Factory_1.Factory.addGetterSetter(Sprite, "frameIndex", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Sprite, "frameRate", 17, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.backCompat(Sprite, {
		index: "frameIndex",
		getIndex: "getFrameIndex",
		setIndex: "setFrameIndex"
	});
}));
//#endregion
//#region node_modules/konva/lib/shapes/Star.js
var require_Star = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Star = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var Star = class extends Shape_1.Shape {
		_sceneFunc(context) {
			const innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
			context.beginPath();
			context.moveTo(0, 0 - outerRadius);
			for (let n = 1; n < numPoints * 2; n++) {
				const radius = n % 2 === 0 ? outerRadius : innerRadius;
				const x = radius * Math.sin(n * Math.PI / numPoints);
				const y = -1 * radius * Math.cos(n * Math.PI / numPoints);
				context.lineTo(x, y);
			}
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.outerRadius() * 2;
		}
		getHeight() {
			return this.outerRadius() * 2;
		}
		setWidth(width) {
			this.outerRadius(width / 2);
		}
		setHeight(height) {
			this.outerRadius(height / 2);
		}
	};
	exports.Star = Star;
	Star.prototype.className = "Star";
	Star.prototype._centroid = true;
	Star.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
	(0, Global_1._registerNode)(Star);
	Factory_1.Factory.addGetterSetter(Star, "numPoints", 5, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Star, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Star, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Text.js
var require_Text = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Text = void 0;
	exports.stringToArray = stringToArray;
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var Validators_1 = require_Validators();
	var Global_2 = require_Global();
	function stringToArray(string) {
		return [...string].reduce((acc, char, index, array) => {
			if (/\p{Emoji}/u.test(char)) {
				const nextChar = array[index + 1];
				if (nextChar && /\p{Emoji_Modifier}|\u200D/u.test(nextChar)) {
					acc.push(char + nextChar);
					array[index + 1] = "";
				} else acc.push(char);
			} else if (/\p{Regional_Indicator}{2}/u.test(char + (array[index + 1] || ""))) acc.push(char + array[index + 1]);
			else if (index > 0 && /\p{Mn}|\p{Me}|\p{Mc}/u.test(char)) acc[acc.length - 1] += char;
			else if (char) acc.push(char);
			return acc;
		}, []);
	}
	var AUTO = "auto", CENTER = "center", INHERIT = "inherit", JUSTIFY = "justify", CHANGE_KONVA = "Change.konva", CONTEXT_2D = "2d", DASH = "-", LEFT = "left", TEXT = "text", TEXT_UPPER = "Text", TOP = "top", BOTTOM = "bottom", MIDDLE = "middle", NORMAL = "normal", PX_SPACE = "px ", SPACE = " ", RIGHT = "right", RTL = "rtl", WORD = "word", CHAR = "char", NONE = "none", ELLIPSIS = "…", ATTR_CHANGE_LIST = [
		"direction",
		"fontFamily",
		"fontSize",
		"fontStyle",
		"fontVariant",
		"padding",
		"align",
		"verticalAlign",
		"lineHeight",
		"text",
		"width",
		"height",
		"wrap",
		"ellipsis",
		"letterSpacing"
	], attrChangeListLen = ATTR_CHANGE_LIST.length;
	function normalizeFontFamily(fontFamily) {
		return fontFamily.split(",").map((family) => {
			family = family.trim();
			const hasSpace = family.indexOf(" ") >= 0;
			const hasQuotes = family.indexOf("\"") >= 0 || family.indexOf("'") >= 0;
			if (hasSpace && !hasQuotes) family = `"${family}"`;
			return family;
		}).join(", ");
	}
	var dummyContext;
	function getDummyContext() {
		if (dummyContext) return dummyContext;
		dummyContext = Util_1.Util.createCanvasElement().getContext(CONTEXT_2D);
		return dummyContext;
	}
	function _fillFunc(context) {
		context.fillText(this._partialText, this._partialTextX, this._partialTextY);
	}
	function _strokeFunc(context) {
		context.setAttr("miterLimit", 2);
		context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
	}
	function checkDefaultFill(config) {
		config = config || {};
		if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops && !config.fillPatternImage) config.fill = config.fill || "black";
		return config;
	}
	var Text = class extends Shape_1.Shape {
		constructor(config) {
			super(checkDefaultFill(config));
			this._partialTextX = 0;
			this._partialTextY = 0;
			for (let n = 0; n < attrChangeListLen; n++) this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
			this._setTextData();
		}
		_sceneFunc(context) {
			const textArr = this.textArr, textArrLen = textArr.length;
			if (!this.text()) return;
			let padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, verticalAlign = this.verticalAlign(), direction = this.direction(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf("underline") !== -1, shouldLineThrough = textDecoration.indexOf("line-through") !== -1, n;
			direction = direction === INHERIT ? context.direction : direction;
			let translateY = lineHeightPx / 2;
			let baseline = MIDDLE;
			if (Global_1.Konva._fixTextRendering) {
				const metrics = this.measureSize("M");
				baseline = "alphabetic";
				translateY = (metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2 + lineHeightPx / 2;
			}
			if (direction === RTL) context.setAttr("direction", direction);
			context.setAttr("font", this._getContextFont());
			context.setAttr("textBaseline", baseline);
			context.setAttr("textAlign", LEFT);
			if (verticalAlign === MIDDLE) alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
			else if (verticalAlign === BOTTOM) alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
			context.translate(padding, alignY + padding);
			for (n = 0; n < textArrLen; n++) {
				let lineTranslateX = 0;
				let lineTranslateY = 0;
				const obj = textArr[n], text = obj.text, width = obj.width, lastLine = obj.lastInParagraph;
				context.save();
				if (align === RIGHT) lineTranslateX += totalWidth - width - padding * 2;
				else if (align === CENTER) lineTranslateX += (totalWidth - width - padding * 2) / 2;
				if (shouldUnderline) {
					context.save();
					context.beginPath();
					const yOffset = Global_1.Konva._fixTextRendering ? Math.round(fontSize / 4) : Math.round(fontSize / 2);
					const x = lineTranslateX;
					const y = translateY + lineTranslateY + yOffset;
					context.moveTo(x, y);
					const lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
					context.lineTo(x + Math.round(lineWidth), y);
					context.lineWidth = fontSize / 15;
					context.strokeStyle = this._getLinearGradient() || fill;
					context.stroke();
					context.restore();
				}
				if (shouldLineThrough) {
					context.save();
					context.beginPath();
					const yOffset = Global_1.Konva._fixTextRendering ? -Math.round(fontSize / 4) : 0;
					context.moveTo(lineTranslateX, translateY + lineTranslateY + yOffset);
					const lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
					context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + yOffset);
					context.lineWidth = fontSize / 15;
					context.strokeStyle = this._getLinearGradient() || fill;
					context.stroke();
					context.restore();
				}
				if (direction !== RTL && (letterSpacing !== 0 || align === JUSTIFY)) {
					const spacesNumber = text.split(" ").length - 1;
					const array = stringToArray(text);
					for (let li = 0; li < array.length; li++) {
						const letter = array[li];
						if (letter === " " && !lastLine && align === JUSTIFY) lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
						this._partialTextX = lineTranslateX;
						this._partialTextY = translateY + lineTranslateY;
						this._partialText = letter;
						context.fillStrokeShape(this);
						lineTranslateX += this.measureSize(letter).width + letterSpacing;
					}
				} else {
					if (letterSpacing !== 0) context.setAttr("letterSpacing", `${letterSpacing}px`);
					this._partialTextX = lineTranslateX;
					this._partialTextY = translateY + lineTranslateY;
					this._partialText = text;
					context.fillStrokeShape(this);
				}
				context.restore();
				if (textArrLen > 1) translateY += lineHeightPx;
			}
		}
		_hitFunc(context) {
			const width = this.getWidth(), height = this.getHeight();
			context.beginPath();
			context.rect(0, 0, width, height);
			context.closePath();
			context.fillStrokeShape(this);
		}
		setText(text) {
			const str = Util_1.Util._isString(text) ? text : text === null || text === void 0 ? "" : text + "";
			this._setAttr(TEXT, str);
			return this;
		}
		getWidth() {
			return this.attrs.width === AUTO || this.attrs.width === void 0 ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
		}
		getHeight() {
			return this.attrs.height === AUTO || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
		}
		getTextWidth() {
			return this.textWidth;
		}
		getTextHeight() {
			Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
			return this.textHeight;
		}
		measureSize(text) {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
			let _context = getDummyContext(), fontSize = this.fontSize(), metrics;
			_context.save();
			_context.font = this._getContextFont();
			metrics = _context.measureText(text);
			_context.restore();
			const scaleFactor = fontSize / 100;
			return {
				actualBoundingBoxAscent: (_a = metrics.actualBoundingBoxAscent) !== null && _a !== void 0 ? _a : 71.58203125 * scaleFactor,
				actualBoundingBoxDescent: (_b = metrics.actualBoundingBoxDescent) !== null && _b !== void 0 ? _b : 0,
				actualBoundingBoxLeft: (_c = metrics.actualBoundingBoxLeft) !== null && _c !== void 0 ? _c : -7.421875 * scaleFactor,
				actualBoundingBoxRight: (_d = metrics.actualBoundingBoxRight) !== null && _d !== void 0 ? _d : 75.732421875 * scaleFactor,
				alphabeticBaseline: (_e = metrics.alphabeticBaseline) !== null && _e !== void 0 ? _e : 0,
				emHeightAscent: (_f = metrics.emHeightAscent) !== null && _f !== void 0 ? _f : 100 * scaleFactor,
				emHeightDescent: (_g = metrics.emHeightDescent) !== null && _g !== void 0 ? _g : -20 * scaleFactor,
				fontBoundingBoxAscent: (_h = metrics.fontBoundingBoxAscent) !== null && _h !== void 0 ? _h : 91 * scaleFactor,
				fontBoundingBoxDescent: (_j = metrics.fontBoundingBoxDescent) !== null && _j !== void 0 ? _j : 21 * scaleFactor,
				hangingBaseline: (_k = metrics.hangingBaseline) !== null && _k !== void 0 ? _k : 72.80000305175781 * scaleFactor,
				ideographicBaseline: (_l = metrics.ideographicBaseline) !== null && _l !== void 0 ? _l : -21 * scaleFactor,
				width: metrics.width,
				height: fontSize
			};
		}
		_getContextFont() {
			return this.fontStyle() + SPACE + this.fontVariant() + SPACE + (this.fontSize() + PX_SPACE) + normalizeFontFamily(this.fontFamily());
		}
		_addTextLine(line) {
			if (this.align() === JUSTIFY) line = line.trim();
			const width = this._getTextWidth(line);
			return this.textArr.push({
				text: line,
				width,
				lastInParagraph: false
			});
		}
		_getTextWidth(text) {
			const letterSpacing = this.letterSpacing();
			const length = text.length;
			return getDummyContext().measureText(text).width + letterSpacing * length;
		}
		_setTextData() {
			let lines = this.text().split("\n"), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== void 0, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), wrapAtWord = wrap !== CHAR && wrap !== NONE, shouldAddEllipsis = this.ellipsis();
			this.textArr = [];
			getDummyContext().font = this._getContextFont();
			const additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
			for (let i = 0, max = lines.length; i < max; ++i) {
				let line = lines[i];
				let lineWidth = this._getTextWidth(line);
				if (fixedWidth && lineWidth > maxWidth) while (line.length > 0) {
					let low = 0, high = stringToArray(line).length, match = "", matchWidth = 0;
					while (low < high) {
						const mid = low + high >>> 1, substr = stringToArray(line).slice(0, mid + 1).join(""), substrWidth = this._getTextWidth(substr);
						if ((shouldAddEllipsis && fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx ? substrWidth + additionalWidth : substrWidth) <= maxWidth) {
							low = mid + 1;
							match = substr;
							matchWidth = substrWidth;
						} else high = mid;
					}
					if (match) {
						if (wrapAtWord) {
							const lineArray = stringToArray(line);
							const matchArray = stringToArray(match);
							const nextChar = lineArray[matchArray.length];
							const nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
							let wrapIndex;
							if (nextIsSpaceOrDash && matchWidth <= maxWidth) wrapIndex = matchArray.length;
							else {
								const lastSpaceIndex = matchArray.lastIndexOf(SPACE);
								const lastDashIndex = matchArray.lastIndexOf(DASH);
								wrapIndex = Math.max(lastSpaceIndex, lastDashIndex) + 1;
							}
							if (wrapIndex > 0) {
								low = wrapIndex;
								match = lineArray.slice(0, low).join("");
								matchWidth = this._getTextWidth(match);
							}
						}
						match = match.trimRight();
						this._addTextLine(match);
						textWidth = Math.max(textWidth, matchWidth);
						currentHeightPx += lineHeightPx;
						if (this._shouldHandleEllipsis(currentHeightPx)) {
							this._tryToAddEllipsisToLastLine();
							break;
						}
						line = stringToArray(line).slice(low).join("").trimLeft();
						if (line.length > 0) {
							lineWidth = this._getTextWidth(line);
							if (lineWidth <= maxWidth) {
								this._addTextLine(line);
								currentHeightPx += lineHeightPx;
								textWidth = Math.max(textWidth, lineWidth);
								break;
							}
						}
					} else break;
				}
				else {
					this._addTextLine(line);
					currentHeightPx += lineHeightPx;
					textWidth = Math.max(textWidth, lineWidth);
					if (this._shouldHandleEllipsis(currentHeightPx) && i < max - 1) this._tryToAddEllipsisToLastLine();
				}
				if (this.textArr[this.textArr.length - 1]) this.textArr[this.textArr.length - 1].lastInParagraph = true;
				if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) break;
			}
			this.textHeight = fontSize;
			this.textWidth = textWidth;
		}
		_shouldHandleEllipsis(currentHeightPx) {
			const fontSize = +this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, height = this.attrs.height, fixedHeight = height !== AUTO && height !== void 0, maxHeightPx = height - this.padding() * 2;
			return !(this.wrap() !== NONE) || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx;
		}
		_tryToAddEllipsisToLastLine() {
			const width = this.attrs.width, fixedWidth = width !== AUTO && width !== void 0, maxWidth = width - this.padding() * 2, shouldAddEllipsis = this.ellipsis();
			const lastLine = this.textArr[this.textArr.length - 1];
			if (!lastLine || !shouldAddEllipsis) return;
			if (fixedWidth) {
				if (!(this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth)) lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
			}
			this.textArr.splice(this.textArr.length - 1, 1);
			this._addTextLine(lastLine.text + ELLIPSIS);
		}
		getStrokeScaleEnabled() {
			return true;
		}
		_useBufferCanvas() {
			const hasLine = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1;
			const hasShadow = this.hasShadow();
			if (hasLine && hasShadow) return true;
			return super._useBufferCanvas();
		}
	};
	exports.Text = Text;
	Text.prototype._fillFunc = _fillFunc;
	Text.prototype._strokeFunc = _strokeFunc;
	Text.prototype.className = TEXT_UPPER;
	Text.prototype._attrsAffectingSize = [
		"text",
		"fontSize",
		"padding",
		"wrap",
		"lineHeight",
		"letterSpacing"
	];
	(0, Global_2._registerNode)(Text);
	Factory_1.Factory.overWriteSetter(Text, "width", (0, Validators_1.getNumberOrAutoValidator)());
	Factory_1.Factory.overWriteSetter(Text, "height", (0, Validators_1.getNumberOrAutoValidator)());
	Factory_1.Factory.addGetterSetter(Text, "direction", INHERIT);
	Factory_1.Factory.addGetterSetter(Text, "fontFamily", "Arial");
	Factory_1.Factory.addGetterSetter(Text, "fontSize", 12, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Text, "fontStyle", NORMAL);
	Factory_1.Factory.addGetterSetter(Text, "fontVariant", NORMAL);
	Factory_1.Factory.addGetterSetter(Text, "padding", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Text, "align", LEFT);
	Factory_1.Factory.addGetterSetter(Text, "verticalAlign", TOP);
	Factory_1.Factory.addGetterSetter(Text, "lineHeight", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Text, "wrap", WORD);
	Factory_1.Factory.addGetterSetter(Text, "ellipsis", false, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.addGetterSetter(Text, "letterSpacing", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Text, "text", "", (0, Validators_1.getStringValidator)());
	Factory_1.Factory.addGetterSetter(Text, "textDecoration", "");
}));
//#endregion
//#region node_modules/konva/lib/shapes/TextPath.js
var require_TextPath = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TextPath = void 0;
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Path_1 = require_Path();
	var Text_1 = require_Text();
	var Validators_1 = require_Validators();
	var Global_1 = require_Global();
	var EMPTY_STRING = "", NORMAL = "normal";
	function _fillFunc(context) {
		context.fillText(this.partialText, 0, 0);
	}
	function _strokeFunc(context) {
		context.strokeText(this.partialText, 0, 0);
	}
	var TextPath = class extends Shape_1.Shape {
		constructor(config) {
			super(config);
			this.dummyCanvas = Util_1.Util.createCanvasElement();
			this.dataArray = [];
			this._readDataAttribute();
			this.on("dataChange.konva", function() {
				this._readDataAttribute();
				this._setTextData();
			});
			this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData);
			this._setTextData();
		}
		_getTextPathLength() {
			return Path_1.Path.getPathLength(this.dataArray);
		}
		_getPointAtLength(length) {
			if (!this.attrs.data) return null;
			const totalLength = this.pathLength;
			if (length - 1 > totalLength) return null;
			return Path_1.Path.getPointAtLengthOfDataArray(length, this.dataArray);
		}
		_readDataAttribute() {
			this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
			this.pathLength = this._getTextPathLength();
		}
		_sceneFunc(context) {
			context.setAttr("font", this._getContextFont());
			context.setAttr("textBaseline", this.textBaseline());
			context.setAttr("textAlign", "left");
			context.save();
			const textDecoration = this.textDecoration();
			const fill = this.fill();
			const fontSize = this.fontSize();
			const glyphInfo = this.glyphInfo;
			if (textDecoration === "underline") context.beginPath();
			for (let i = 0; i < glyphInfo.length; i++) {
				context.save();
				const p0 = glyphInfo[i].p0;
				context.translate(p0.x, p0.y);
				context.rotate(glyphInfo[i].rotation);
				this.partialText = glyphInfo[i].text;
				context.fillStrokeShape(this);
				if (textDecoration === "underline") {
					if (i === 0) context.moveTo(0, fontSize / 2 + 1);
					context.lineTo(fontSize, fontSize / 2 + 1);
				}
				context.restore();
			}
			if (textDecoration === "underline") {
				context.strokeStyle = fill;
				context.lineWidth = fontSize / 20;
				context.stroke();
			}
			context.restore();
		}
		_hitFunc(context) {
			context.beginPath();
			const glyphInfo = this.glyphInfo;
			if (glyphInfo.length >= 1) {
				const p0 = glyphInfo[0].p0;
				context.moveTo(p0.x, p0.y);
			}
			for (let i = 0; i < glyphInfo.length; i++) {
				const p1 = glyphInfo[i].p1;
				context.lineTo(p1.x, p1.y);
			}
			context.setAttr("lineWidth", this.fontSize());
			context.setAttr("strokeStyle", this.colorKey);
			context.stroke();
		}
		getTextWidth() {
			return this.textWidth;
		}
		getTextHeight() {
			Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
			return this.textHeight;
		}
		setText(text) {
			return Text_1.Text.prototype.setText.call(this, text);
		}
		_getContextFont() {
			return Text_1.Text.prototype._getContextFont.call(this);
		}
		_getTextSize(text) {
			const _context = this.dummyCanvas.getContext("2d");
			_context.save();
			_context.font = this._getContextFont();
			const metrics = _context.measureText(text);
			_context.restore();
			return {
				width: metrics.width,
				height: parseInt(`${this.fontSize()}`, 10)
			};
		}
		_setTextData() {
			const { width, height } = this._getTextSize(this.attrs.text);
			this.textWidth = width;
			this.textHeight = height;
			this.glyphInfo = [];
			if (!this.attrs.data) return null;
			const letterSpacing = this.letterSpacing();
			const align = this.align();
			const kerningFunc = this.kerningFunc();
			const textWidth = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * letterSpacing, 0);
			let offset = 0;
			if (align === "center") offset = Math.max(0, this.pathLength / 2 - textWidth / 2);
			if (align === "right") offset = Math.max(0, this.pathLength - textWidth);
			const charArr = (0, Text_1.stringToArray)(this.text());
			let offsetToGlyph = offset;
			for (let i = 0; i < charArr.length; i++) {
				const charStartPoint = this._getPointAtLength(offsetToGlyph);
				if (!charStartPoint) return;
				let glyphWidth = this._getTextSize(charArr[i]).width + letterSpacing;
				if (charArr[i] === " " && align === "justify") {
					const numberOfSpaces = this.text().split(" ").length - 1;
					glyphWidth += (this.pathLength - textWidth) / numberOfSpaces;
				}
				const charEndPoint = this._getPointAtLength(offsetToGlyph + glyphWidth);
				if (!charEndPoint) return;
				const width = Path_1.Path.getLineLength(charStartPoint.x, charStartPoint.y, charEndPoint.x, charEndPoint.y);
				let kern = 0;
				if (kerningFunc) try {
					kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
				} catch (e) {
					kern = 0;
				}
				charStartPoint.x += kern;
				charEndPoint.x += kern;
				this.textWidth += kern;
				const midpoint = Path_1.Path.getPointOnLine(kern + width / 2, charStartPoint.x, charStartPoint.y, charEndPoint.x, charEndPoint.y);
				const rotation = Math.atan2(charEndPoint.y - charStartPoint.y, charEndPoint.x - charStartPoint.x);
				this.glyphInfo.push({
					transposeX: midpoint.x,
					transposeY: midpoint.y,
					text: charArr[i],
					rotation,
					p0: charStartPoint,
					p1: charEndPoint
				});
				offsetToGlyph += glyphWidth;
			}
		}
		getSelfRect() {
			if (!this.glyphInfo.length) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			const points = [];
			this.glyphInfo.forEach(function(info) {
				points.push(info.p0.x);
				points.push(info.p0.y);
				points.push(info.p1.x);
				points.push(info.p1.y);
			});
			let minX = points[0] || 0;
			let maxX = points[0] || 0;
			let minY = points[1] || 0;
			let maxY = points[1] || 0;
			let x, y;
			for (let i = 0; i < points.length / 2; i++) {
				x = points[i * 2];
				y = points[i * 2 + 1];
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
			}
			const fontSize = this.fontSize();
			return {
				x: minX - fontSize / 2,
				y: minY - fontSize / 2,
				width: maxX - minX + fontSize,
				height: maxY - minY + fontSize
			};
		}
		destroy() {
			Util_1.Util.releaseCanvas(this.dummyCanvas);
			return super.destroy();
		}
	};
	exports.TextPath = TextPath;
	TextPath.prototype._fillFunc = _fillFunc;
	TextPath.prototype._strokeFunc = _strokeFunc;
	TextPath.prototype._fillFuncHit = _fillFunc;
	TextPath.prototype._strokeFuncHit = _strokeFunc;
	TextPath.prototype.className = "TextPath";
	TextPath.prototype._attrsAffectingSize = [
		"text",
		"fontSize",
		"data"
	];
	(0, Global_1._registerNode)(TextPath);
	Factory_1.Factory.addGetterSetter(TextPath, "data");
	Factory_1.Factory.addGetterSetter(TextPath, "fontFamily", "Arial");
	Factory_1.Factory.addGetterSetter(TextPath, "fontSize", 12, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(TextPath, "fontStyle", NORMAL);
	Factory_1.Factory.addGetterSetter(TextPath, "align", "left");
	Factory_1.Factory.addGetterSetter(TextPath, "letterSpacing", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(TextPath, "textBaseline", "middle");
	Factory_1.Factory.addGetterSetter(TextPath, "fontVariant", NORMAL);
	Factory_1.Factory.addGetterSetter(TextPath, "text", EMPTY_STRING);
	Factory_1.Factory.addGetterSetter(TextPath, "textDecoration", "");
	Factory_1.Factory.addGetterSetter(TextPath, "kerningFunc", void 0);
}));
//#endregion
//#region node_modules/konva/lib/shapes/Transformer.js
var require_Transformer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Transformer = void 0;
	var Util_1 = require_Util();
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Shape_1 = require_Shape();
	var Rect_1 = require_Rect();
	var Group_1 = require_Group();
	var Global_1 = require_Global();
	var Validators_1 = require_Validators();
	var Global_2 = require_Global();
	var EVENTS_NAME = "tr-konva";
	var ATTR_CHANGE_LIST = [
		"resizeEnabledChange",
		"rotateAnchorOffsetChange",
		"rotateEnabledChange",
		"enabledAnchorsChange",
		"anchorSizeChange",
		"borderEnabledChange",
		"borderStrokeChange",
		"borderStrokeWidthChange",
		"borderDashChange",
		"anchorStrokeChange",
		"anchorStrokeWidthChange",
		"anchorFillChange",
		"anchorCornerRadiusChange",
		"ignoreStrokeChange",
		"anchorStyleFuncChange"
	].map((e) => e + `.${EVENTS_NAME}`).join(" ");
	var NODES_RECT = "nodesRect";
	var TRANSFORM_CHANGE_STR = [
		"widthChange",
		"heightChange",
		"scaleXChange",
		"scaleYChange",
		"skewXChange",
		"skewYChange",
		"rotationChange",
		"offsetXChange",
		"offsetYChange",
		"transformsEnabledChange",
		"strokeWidthChange"
	];
	var ANGLES = {
		"top-left": -45,
		"top-center": 0,
		"top-right": 45,
		"middle-right": -90,
		"middle-left": 90,
		"bottom-left": -135,
		"bottom-center": 180,
		"bottom-right": 135
	};
	var TOUCH_DEVICE = "ontouchstart" in Global_1.Konva._global;
	function getCursor(anchorName, rad, rotateCursor) {
		if (anchorName === "rotater") return rotateCursor;
		rad += Util_1.Util.degToRad(ANGLES[anchorName] || 0);
		const angle = (Util_1.Util.radToDeg(rad) % 360 + 360) % 360;
		if (Util_1.Util._inRange(angle, 337.5, 360) || Util_1.Util._inRange(angle, 0, 22.5)) return "ns-resize";
		else if (Util_1.Util._inRange(angle, 22.5, 67.5)) return "nesw-resize";
		else if (Util_1.Util._inRange(angle, 67.5, 112.5)) return "ew-resize";
		else if (Util_1.Util._inRange(angle, 112.5, 157.5)) return "nwse-resize";
		else if (Util_1.Util._inRange(angle, 157.5, 202.5)) return "ns-resize";
		else if (Util_1.Util._inRange(angle, 202.5, 247.5)) return "nesw-resize";
		else if (Util_1.Util._inRange(angle, 247.5, 292.5)) return "ew-resize";
		else if (Util_1.Util._inRange(angle, 292.5, 337.5)) return "nwse-resize";
		else {
			Util_1.Util.error("Transformer has unknown angle for cursor detection: " + angle);
			return "pointer";
		}
	}
	var ANCHORS_NAMES = [
		"top-left",
		"top-center",
		"top-right",
		"middle-right",
		"middle-left",
		"bottom-left",
		"bottom-center",
		"bottom-right"
	];
	var MAX_SAFE_INTEGER = 1e8;
	function getCenter(shape) {
		return {
			x: shape.x + shape.width / 2 * Math.cos(shape.rotation) + shape.height / 2 * Math.sin(-shape.rotation),
			y: shape.y + shape.height / 2 * Math.cos(shape.rotation) + shape.width / 2 * Math.sin(shape.rotation)
		};
	}
	function rotateAroundPoint(shape, angleRad, point) {
		const x = point.x + (shape.x - point.x) * Math.cos(angleRad) - (shape.y - point.y) * Math.sin(angleRad);
		const y = point.y + (shape.x - point.x) * Math.sin(angleRad) + (shape.y - point.y) * Math.cos(angleRad);
		return {
			...shape,
			rotation: shape.rotation + angleRad,
			x,
			y
		};
	}
	function rotateAroundCenter(shape, deltaRad) {
		return rotateAroundPoint(shape, deltaRad, getCenter(shape));
	}
	function getSnap(snaps, newRotationRad, tol) {
		let snapped = newRotationRad;
		for (let i = 0; i < snaps.length; i++) {
			const angle = Global_1.Konva.getAngle(snaps[i]);
			const absDiff = Math.abs(angle - newRotationRad) % (Math.PI * 2);
			if (Math.min(absDiff, Math.PI * 2 - absDiff) < tol) snapped = angle;
		}
		return snapped;
	}
	var activeTransformersCount = 0;
	var Transformer = class extends Group_1.Group {
		constructor(config) {
			super(config);
			this._movingAnchorName = null;
			this._transforming = false;
			this._createElements();
			this._handleMouseMove = this._handleMouseMove.bind(this);
			this._handleMouseUp = this._handleMouseUp.bind(this);
			this.update = this.update.bind(this);
			this.on(ATTR_CHANGE_LIST, this.update);
			if (this.getNode()) this.update();
		}
		attachTo(node) {
			this.setNode(node);
			return this;
		}
		setNode(node) {
			Util_1.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.");
			return this.setNodes([node]);
		}
		getNode() {
			return this._nodes && this._nodes[0];
		}
		_getEventNamespace() {
			return EVENTS_NAME + this._id;
		}
		setNodes(nodes = []) {
			if (this._nodes && this._nodes.length) this.detach();
			const filteredNodes = nodes.filter((node) => {
				if (node.isAncestorOf(this)) {
					Util_1.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach");
					return false;
				}
				return true;
			});
			this._nodes = nodes = filteredNodes;
			if (nodes.length === 1 && this.useSingleNodeRotation()) this.rotation(nodes[0].getAbsoluteRotation());
			else this.rotation(0);
			this._nodes.forEach((node) => {
				const onChange = () => {
					if (this.nodes().length === 1 && this.useSingleNodeRotation()) this.rotation(this.nodes()[0].getAbsoluteRotation());
					this._resetTransformCache();
					if (!this._transforming && !this.isDragging()) this.update();
				};
				if (node._attrsAffectingSize.length) {
					const additionalEvents = node._attrsAffectingSize.map((prop) => prop + "Change." + this._getEventNamespace()).join(" ");
					node.on(additionalEvents, onChange);
				}
				node.on(TRANSFORM_CHANGE_STR.map((e) => e + `.${this._getEventNamespace()}`).join(" "), onChange);
				node.on(`absoluteTransformChange.${this._getEventNamespace()}`, onChange);
				this._proxyDrag(node);
			});
			this._resetTransformCache();
			if (!!this.findOne(".top-left")) this.update();
			return this;
		}
		_proxyDrag(node) {
			let lastPos;
			node.on(`dragstart.${this._getEventNamespace()}`, (e) => {
				lastPos = node.getAbsolutePosition();
				if (!this.isDragging() && node !== this.findOne(".back")) this.startDrag(e, false);
			});
			node.on(`dragmove.${this._getEventNamespace()}`, (e) => {
				if (!lastPos) return;
				const abs = node.getAbsolutePosition();
				const dx = abs.x - lastPos.x;
				const dy = abs.y - lastPos.y;
				this.nodes().forEach((otherNode) => {
					if (otherNode === node) return;
					if (otherNode.isDragging()) return;
					const otherAbs = otherNode.getAbsolutePosition();
					otherNode.setAbsolutePosition({
						x: otherAbs.x + dx,
						y: otherAbs.y + dy
					});
					otherNode.startDrag(e);
				});
				lastPos = null;
			});
		}
		getNodes() {
			return this._nodes || [];
		}
		getActiveAnchor() {
			return this._movingAnchorName;
		}
		detach() {
			if (this._nodes) this._nodes.forEach((node) => {
				node.off("." + this._getEventNamespace());
			});
			this._nodes = [];
			this._resetTransformCache();
		}
		_resetTransformCache() {
			this._clearCache(NODES_RECT);
			this._clearCache("transform");
			this._clearSelfAndDescendantCache("absoluteTransform");
		}
		_getNodeRect() {
			return this._getCache(NODES_RECT, this.__getNodeRect);
		}
		__getNodeShape(node, rot = this.rotation(), relative) {
			const rect = node.getClientRect({
				skipTransform: true,
				skipShadow: true,
				skipStroke: this.ignoreStroke()
			});
			const absScale = node.getAbsoluteScale(relative);
			const absPos = node.getAbsolutePosition(relative);
			const dx = rect.x * absScale.x - node.offsetX() * absScale.x;
			const dy = rect.y * absScale.y - node.offsetY() * absScale.y;
			const rotation = (Global_1.Konva.getAngle(node.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2);
			return rotateAroundPoint({
				x: absPos.x + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
				y: absPos.y + dy * Math.cos(rotation) + dx * Math.sin(rotation),
				width: rect.width * absScale.x,
				height: rect.height * absScale.y,
				rotation
			}, -Global_1.Konva.getAngle(rot), {
				x: 0,
				y: 0
			});
		}
		__getNodeRect() {
			if (!this.getNode()) return {
				x: -MAX_SAFE_INTEGER,
				y: -MAX_SAFE_INTEGER,
				width: 0,
				height: 0,
				rotation: 0
			};
			const totalPoints = [];
			this.nodes().map((node) => {
				const box = node.getClientRect({
					skipTransform: true,
					skipShadow: true,
					skipStroke: this.ignoreStroke()
				});
				const points = [
					{
						x: box.x,
						y: box.y
					},
					{
						x: box.x + box.width,
						y: box.y
					},
					{
						x: box.x + box.width,
						y: box.y + box.height
					},
					{
						x: box.x,
						y: box.y + box.height
					}
				];
				const trans = node.getAbsoluteTransform();
				points.forEach(function(point) {
					const transformed = trans.point(point);
					totalPoints.push(transformed);
				});
			});
			const tr = new Util_1.Transform();
			tr.rotate(-Global_1.Konva.getAngle(this.rotation()));
			let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
			totalPoints.forEach(function(point) {
				const transformed = tr.point(point);
				if (minX === void 0) {
					minX = maxX = transformed.x;
					minY = maxY = transformed.y;
				}
				minX = Math.min(minX, transformed.x);
				minY = Math.min(minY, transformed.y);
				maxX = Math.max(maxX, transformed.x);
				maxY = Math.max(maxY, transformed.y);
			});
			tr.invert();
			const p = tr.point({
				x: minX,
				y: minY
			});
			return {
				x: p.x,
				y: p.y,
				width: maxX - minX,
				height: maxY - minY,
				rotation: Global_1.Konva.getAngle(this.rotation())
			};
		}
		getX() {
			return this._getNodeRect().x;
		}
		getY() {
			return this._getNodeRect().y;
		}
		getWidth() {
			return this._getNodeRect().width;
		}
		getHeight() {
			return this._getNodeRect().height;
		}
		_createElements() {
			this._createBack();
			ANCHORS_NAMES.forEach((name) => {
				this._createAnchor(name);
			});
			this._createAnchor("rotater");
		}
		_createAnchor(name) {
			const anchor = new Rect_1.Rect({
				stroke: "rgb(0, 161, 255)",
				fill: "white",
				strokeWidth: 1,
				name: name + " _anchor",
				dragDistance: 0,
				draggable: true,
				hitStrokeWidth: TOUCH_DEVICE ? 10 : "auto"
			});
			const self = this;
			anchor.on("mousedown touchstart", function(e) {
				self._handleMouseDown(e);
			});
			anchor.on("dragstart", (e) => {
				anchor.stopDrag();
				e.cancelBubble = true;
			});
			anchor.on("dragend", (e) => {
				e.cancelBubble = true;
			});
			anchor.on("mouseenter", () => {
				const cursor = getCursor(name, Global_1.Konva.getAngle(this.rotation()), this.rotateAnchorCursor());
				anchor.getStage().content && (anchor.getStage().content.style.cursor = cursor);
				this._cursorChange = true;
			});
			anchor.on("mouseout", () => {
				anchor.getStage().content && (anchor.getStage().content.style.cursor = "");
				this._cursorChange = false;
			});
			this.add(anchor);
		}
		_createBack() {
			const back = new Shape_1.Shape({
				name: "back",
				width: 0,
				height: 0,
				draggable: true,
				sceneFunc(ctx, shape) {
					const tr = shape.getParent();
					const padding = tr.padding();
					ctx.beginPath();
					ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
					ctx.moveTo(shape.width() / 2, -padding);
					if (tr.rotateEnabled() && tr.rotateLineVisible()) ctx.lineTo(shape.width() / 2, -tr.rotateAnchorOffset() * Util_1.Util._sign(shape.height()) - padding);
					ctx.fillStrokeShape(shape);
				},
				hitFunc: (ctx, shape) => {
					if (!this.shouldOverdrawWholeArea()) return;
					const padding = this.padding();
					ctx.beginPath();
					ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
					ctx.fillStrokeShape(shape);
				}
			});
			this.add(back);
			this._proxyDrag(back);
			back.on("dragstart", (e) => {
				e.cancelBubble = true;
			});
			back.on("dragmove", (e) => {
				e.cancelBubble = true;
			});
			back.on("dragend", (e) => {
				e.cancelBubble = true;
			});
			this.on("dragmove", (e) => {
				this.update();
			});
		}
		_handleMouseDown(e) {
			if (this._transforming) return;
			this._movingAnchorName = e.target.name().split(" ")[0];
			const attrs = this._getNodeRect();
			const width = attrs.width;
			const height = attrs.height;
			const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
			this.sin = Math.abs(height / hypotenuse);
			this.cos = Math.abs(width / hypotenuse);
			if (typeof window !== "undefined") {
				window.addEventListener("mousemove", this._handleMouseMove);
				window.addEventListener("touchmove", this._handleMouseMove);
				window.addEventListener("mouseup", this._handleMouseUp, true);
				window.addEventListener("touchend", this._handleMouseUp, true);
			}
			this._transforming = true;
			const ap = e.target.getAbsolutePosition();
			const pos = e.target.getStage().getPointerPosition();
			this._anchorDragOffset = {
				x: pos.x - ap.x,
				y: pos.y - ap.y
			};
			activeTransformersCount++;
			this._fire("transformstart", {
				evt: e.evt,
				target: this.getNode()
			});
			this._nodes.forEach((target) => {
				target._fire("transformstart", {
					evt: e.evt,
					target
				});
			});
		}
		_handleMouseMove(e) {
			let x, y, newHypotenuse;
			const anchorNode = this.findOne("." + this._movingAnchorName);
			const stage = anchorNode.getStage();
			stage.setPointersPositions(e);
			const pp = stage.getPointerPosition();
			let newNodePos = {
				x: pp.x - this._anchorDragOffset.x,
				y: pp.y - this._anchorDragOffset.y
			};
			const oldAbs = anchorNode.getAbsolutePosition();
			if (this.anchorDragBoundFunc()) newNodePos = this.anchorDragBoundFunc()(oldAbs, newNodePos, e);
			anchorNode.setAbsolutePosition(newNodePos);
			const newAbs = anchorNode.getAbsolutePosition();
			if (oldAbs.x === newAbs.x && oldAbs.y === newAbs.y) return;
			if (this._movingAnchorName === "rotater") {
				const attrs = this._getNodeRect();
				x = anchorNode.x() - attrs.width / 2;
				y = -anchorNode.y() + attrs.height / 2;
				let delta = Math.atan2(-y, x) + Math.PI / 2;
				if (attrs.height < 0) delta -= Math.PI;
				const newRotation = Global_1.Konva.getAngle(this.rotation()) + delta;
				const tol = Global_1.Konva.getAngle(this.rotationSnapTolerance());
				const shape = rotateAroundCenter(attrs, getSnap(this.rotationSnaps(), newRotation, tol) - attrs.rotation);
				this._fitNodesInto(shape, e);
				return;
			}
			const shiftBehavior = this.shiftBehavior();
			let keepProportion;
			if (shiftBehavior === "inverted") keepProportion = this.keepRatio() && !e.shiftKey;
			else if (shiftBehavior === "none") keepProportion = this.keepRatio();
			else keepProportion = this.keepRatio() || e.shiftKey;
			let centeredScaling = this.centeredScaling() || e.altKey;
			if (this._movingAnchorName === "top-left") {
				if (keepProportion) {
					const comparePoint = centeredScaling ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this.findOne(".bottom-right").x(),
						y: this.findOne(".bottom-right").y()
					};
					newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
					const reverseX = this.findOne(".top-left").x() > comparePoint.x ? -1 : 1;
					const reverseY = this.findOne(".top-left").y() > comparePoint.y ? -1 : 1;
					x = newHypotenuse * this.cos * reverseX;
					y = newHypotenuse * this.sin * reverseY;
					this.findOne(".top-left").x(comparePoint.x - x);
					this.findOne(".top-left").y(comparePoint.y - y);
				}
			} else if (this._movingAnchorName === "top-center") this.findOne(".top-left").y(anchorNode.y());
			else if (this._movingAnchorName === "top-right") {
				if (keepProportion) {
					const comparePoint = centeredScaling ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this.findOne(".bottom-left").x(),
						y: this.findOne(".bottom-left").y()
					};
					newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
					const reverseX = this.findOne(".top-right").x() < comparePoint.x ? -1 : 1;
					const reverseY = this.findOne(".top-right").y() > comparePoint.y ? -1 : 1;
					x = newHypotenuse * this.cos * reverseX;
					y = newHypotenuse * this.sin * reverseY;
					this.findOne(".top-right").x(comparePoint.x + x);
					this.findOne(".top-right").y(comparePoint.y - y);
				}
				var pos = anchorNode.position();
				this.findOne(".top-left").y(pos.y);
				this.findOne(".bottom-right").x(pos.x);
			} else if (this._movingAnchorName === "middle-left") this.findOne(".top-left").x(anchorNode.x());
			else if (this._movingAnchorName === "middle-right") this.findOne(".bottom-right").x(anchorNode.x());
			else if (this._movingAnchorName === "bottom-left") {
				if (keepProportion) {
					const comparePoint = centeredScaling ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this.findOne(".top-right").x(),
						y: this.findOne(".top-right").y()
					};
					newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
					const reverseX = comparePoint.x < anchorNode.x() ? -1 : 1;
					const reverseY = anchorNode.y() < comparePoint.y ? -1 : 1;
					x = newHypotenuse * this.cos * reverseX;
					y = newHypotenuse * this.sin * reverseY;
					anchorNode.x(comparePoint.x - x);
					anchorNode.y(comparePoint.y + y);
				}
				pos = anchorNode.position();
				this.findOne(".top-left").x(pos.x);
				this.findOne(".bottom-right").y(pos.y);
			} else if (this._movingAnchorName === "bottom-center") this.findOne(".bottom-right").y(anchorNode.y());
			else if (this._movingAnchorName === "bottom-right") {
				if (keepProportion) {
					const comparePoint = centeredScaling ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this.findOne(".top-left").x(),
						y: this.findOne(".top-left").y()
					};
					newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
					const reverseX = this.findOne(".bottom-right").x() < comparePoint.x ? -1 : 1;
					const reverseY = this.findOne(".bottom-right").y() < comparePoint.y ? -1 : 1;
					x = newHypotenuse * this.cos * reverseX;
					y = newHypotenuse * this.sin * reverseY;
					this.findOne(".bottom-right").x(comparePoint.x + x);
					this.findOne(".bottom-right").y(comparePoint.y + y);
				}
			} else console.error(/* @__PURE__ */ new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
			centeredScaling = this.centeredScaling() || e.altKey;
			if (centeredScaling) {
				const topLeft = this.findOne(".top-left");
				const bottomRight = this.findOne(".bottom-right");
				const topOffsetX = topLeft.x();
				const topOffsetY = topLeft.y();
				const bottomOffsetX = this.getWidth() - bottomRight.x();
				const bottomOffsetY = this.getHeight() - bottomRight.y();
				bottomRight.move({
					x: -topOffsetX,
					y: -topOffsetY
				});
				topLeft.move({
					x: bottomOffsetX,
					y: bottomOffsetY
				});
			}
			const absPos = this.findOne(".top-left").getAbsolutePosition();
			x = absPos.x;
			y = absPos.y;
			const width = this.findOne(".bottom-right").x() - this.findOne(".top-left").x();
			const height = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
			this._fitNodesInto({
				x,
				y,
				width,
				height,
				rotation: Global_1.Konva.getAngle(this.rotation())
			}, e);
		}
		_handleMouseUp(e) {
			this._removeEvents(e);
		}
		getAbsoluteTransform() {
			return this.getTransform();
		}
		_removeEvents(e) {
			var _a;
			if (this._transforming) {
				this._transforming = false;
				if (typeof window !== "undefined") {
					window.removeEventListener("mousemove", this._handleMouseMove);
					window.removeEventListener("touchmove", this._handleMouseMove);
					window.removeEventListener("mouseup", this._handleMouseUp, true);
					window.removeEventListener("touchend", this._handleMouseUp, true);
				}
				const node = this.getNode();
				activeTransformersCount--;
				this._fire("transformend", {
					evt: e,
					target: node
				});
				(_a = this.getLayer()) === null || _a === void 0 || _a.batchDraw();
				if (node) this._nodes.forEach((target) => {
					var _a;
					target._fire("transformend", {
						evt: e,
						target
					});
					(_a = target.getLayer()) === null || _a === void 0 || _a.batchDraw();
				});
				this._movingAnchorName = null;
			}
		}
		_fitNodesInto(newAttrs, evt) {
			const oldAttrs = this._getNodeRect();
			const minSize = 1;
			if (Util_1.Util._inRange(newAttrs.width, -this.padding() * 2 - minSize, minSize)) {
				this.update();
				return;
			}
			if (Util_1.Util._inRange(newAttrs.height, -this.padding() * 2 - minSize, minSize)) {
				this.update();
				return;
			}
			const t = new Util_1.Transform();
			t.rotate(Global_1.Konva.getAngle(this.rotation()));
			if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
				const offset = t.point({
					x: -this.padding() * 2,
					y: 0
				});
				newAttrs.x += offset.x;
				newAttrs.y += offset.y;
				newAttrs.width += this.padding() * 2;
				this._movingAnchorName = this._movingAnchorName.replace("left", "right");
				this._anchorDragOffset.x -= offset.x;
				this._anchorDragOffset.y -= offset.y;
			} else if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
				const offset = t.point({
					x: this.padding() * 2,
					y: 0
				});
				this._movingAnchorName = this._movingAnchorName.replace("right", "left");
				this._anchorDragOffset.x -= offset.x;
				this._anchorDragOffset.y -= offset.y;
				newAttrs.width += this.padding() * 2;
			}
			if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
				const offset = t.point({
					x: 0,
					y: -this.padding() * 2
				});
				newAttrs.x += offset.x;
				newAttrs.y += offset.y;
				this._movingAnchorName = this._movingAnchorName.replace("top", "bottom");
				this._anchorDragOffset.x -= offset.x;
				this._anchorDragOffset.y -= offset.y;
				newAttrs.height += this.padding() * 2;
			} else if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
				const offset = t.point({
					x: 0,
					y: this.padding() * 2
				});
				this._movingAnchorName = this._movingAnchorName.replace("bottom", "top");
				this._anchorDragOffset.x -= offset.x;
				this._anchorDragOffset.y -= offset.y;
				newAttrs.height += this.padding() * 2;
			}
			if (this.boundBoxFunc()) {
				const bounded = this.boundBoxFunc()(oldAttrs, newAttrs);
				if (bounded) newAttrs = bounded;
				else Util_1.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
			}
			const baseSize = 1e7;
			const oldTr = new Util_1.Transform();
			oldTr.translate(oldAttrs.x, oldAttrs.y);
			oldTr.rotate(oldAttrs.rotation);
			oldTr.scale(oldAttrs.width / baseSize, oldAttrs.height / baseSize);
			const newTr = new Util_1.Transform();
			const newScaleX = newAttrs.width / baseSize;
			const newScaleY = newAttrs.height / baseSize;
			if (this.flipEnabled() === false) {
				newTr.translate(newAttrs.x, newAttrs.y);
				newTr.rotate(newAttrs.rotation);
				newTr.translate(newAttrs.width < 0 ? newAttrs.width : 0, newAttrs.height < 0 ? newAttrs.height : 0);
				newTr.scale(Math.abs(newScaleX), Math.abs(newScaleY));
			} else {
				newTr.translate(newAttrs.x, newAttrs.y);
				newTr.rotate(newAttrs.rotation);
				newTr.scale(newScaleX, newScaleY);
			}
			const delta = newTr.multiply(oldTr.invert());
			this._nodes.forEach((node) => {
				var _a;
				const parentTransform = node.getParent().getAbsoluteTransform();
				const localTransform = node.getTransform().copy();
				localTransform.translate(node.offsetX(), node.offsetY());
				const newLocalTransform = new Util_1.Transform();
				newLocalTransform.multiply(parentTransform.copy().invert()).multiply(delta).multiply(parentTransform).multiply(localTransform);
				const attrs = newLocalTransform.decompose();
				node.setAttrs(attrs);
				(_a = node.getLayer()) === null || _a === void 0 || _a.batchDraw();
			});
			this.rotation(Util_1.Util._getRotation(newAttrs.rotation));
			this._nodes.forEach((node) => {
				this._fire("transform", {
					evt,
					target: node
				});
				node._fire("transform", {
					evt,
					target: node
				});
			});
			this._resetTransformCache();
			this.update();
			this.getLayer().batchDraw();
		}
		forceUpdate() {
			this._resetTransformCache();
			this.update();
		}
		_batchChangeChild(selector, attrs) {
			this.findOne(selector).setAttrs(attrs);
		}
		update() {
			var _a;
			const attrs = this._getNodeRect();
			this.rotation(Util_1.Util._getRotation(attrs.rotation));
			const width = attrs.width;
			const height = attrs.height;
			const enabledAnchors = this.enabledAnchors();
			const resizeEnabled = this.resizeEnabled();
			const padding = this.padding();
			const anchorSize = this.anchorSize();
			const anchors = this.find("._anchor");
			anchors.forEach((node) => {
				node.setAttrs({
					width: anchorSize,
					height: anchorSize,
					offsetX: anchorSize / 2,
					offsetY: anchorSize / 2,
					stroke: this.anchorStroke(),
					strokeWidth: this.anchorStrokeWidth(),
					fill: this.anchorFill(),
					cornerRadius: this.anchorCornerRadius()
				});
			});
			this._batchChangeChild(".top-left", {
				x: 0,
				y: 0,
				offsetX: anchorSize / 2 + padding,
				offsetY: anchorSize / 2 + padding,
				visible: resizeEnabled && enabledAnchors.indexOf("top-left") >= 0
			});
			this._batchChangeChild(".top-center", {
				x: width / 2,
				y: 0,
				offsetY: anchorSize / 2 + padding,
				visible: resizeEnabled && enabledAnchors.indexOf("top-center") >= 0
			});
			this._batchChangeChild(".top-right", {
				x: width,
				y: 0,
				offsetX: anchorSize / 2 - padding,
				offsetY: anchorSize / 2 + padding,
				visible: resizeEnabled && enabledAnchors.indexOf("top-right") >= 0
			});
			this._batchChangeChild(".middle-left", {
				x: 0,
				y: height / 2,
				offsetX: anchorSize / 2 + padding,
				visible: resizeEnabled && enabledAnchors.indexOf("middle-left") >= 0
			});
			this._batchChangeChild(".middle-right", {
				x: width,
				y: height / 2,
				offsetX: anchorSize / 2 - padding,
				visible: resizeEnabled && enabledAnchors.indexOf("middle-right") >= 0
			});
			this._batchChangeChild(".bottom-left", {
				x: 0,
				y: height,
				offsetX: anchorSize / 2 + padding,
				offsetY: anchorSize / 2 - padding,
				visible: resizeEnabled && enabledAnchors.indexOf("bottom-left") >= 0
			});
			this._batchChangeChild(".bottom-center", {
				x: width / 2,
				y: height,
				offsetY: anchorSize / 2 - padding,
				visible: resizeEnabled && enabledAnchors.indexOf("bottom-center") >= 0
			});
			this._batchChangeChild(".bottom-right", {
				x: width,
				y: height,
				offsetX: anchorSize / 2 - padding,
				offsetY: anchorSize / 2 - padding,
				visible: resizeEnabled && enabledAnchors.indexOf("bottom-right") >= 0
			});
			this._batchChangeChild(".rotater", {
				x: width / 2,
				y: -this.rotateAnchorOffset() * Util_1.Util._sign(height) - padding,
				visible: this.rotateEnabled()
			});
			this._batchChangeChild(".back", {
				width,
				height,
				visible: this.borderEnabled(),
				stroke: this.borderStroke(),
				strokeWidth: this.borderStrokeWidth(),
				dash: this.borderDash(),
				x: 0,
				y: 0
			});
			const styleFunc = this.anchorStyleFunc();
			if (styleFunc) anchors.forEach((node) => {
				styleFunc(node);
			});
			(_a = this.getLayer()) === null || _a === void 0 || _a.batchDraw();
		}
		isTransforming() {
			return this._transforming;
		}
		stopTransform() {
			if (this._transforming) {
				this._removeEvents();
				const anchorNode = this.findOne("." + this._movingAnchorName);
				if (anchorNode) anchorNode.stopDrag();
			}
		}
		destroy() {
			if (this.getStage() && this._cursorChange) this.getStage().content && (this.getStage().content.style.cursor = "");
			Group_1.Group.prototype.destroy.call(this);
			this.detach();
			this._removeEvents();
			return this;
		}
		toObject() {
			return Node_1.Node.prototype.toObject.call(this);
		}
		clone(obj) {
			return Node_1.Node.prototype.clone.call(this, obj);
		}
		getClientRect() {
			if (this.nodes().length > 0) return super.getClientRect();
			else return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
	};
	exports.Transformer = Transformer;
	Transformer.isTransforming = () => {
		return activeTransformersCount > 0;
	};
	function validateAnchors(val) {
		if (!(val instanceof Array)) Util_1.Util.warn("enabledAnchors value should be an array");
		if (val instanceof Array) val.forEach(function(name) {
			if (ANCHORS_NAMES.indexOf(name) === -1) Util_1.Util.warn("Unknown anchor name: " + name + ". Available names are: " + ANCHORS_NAMES.join(", "));
		});
		return val || [];
	}
	Transformer.prototype.className = "Transformer";
	(0, Global_2._registerNode)(Transformer);
	Factory_1.Factory.addGetterSetter(Transformer, "enabledAnchors", ANCHORS_NAMES, validateAnchors);
	Factory_1.Factory.addGetterSetter(Transformer, "flipEnabled", true, (0, Validators_1.getBooleanValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "resizeEnabled", true);
	Factory_1.Factory.addGetterSetter(Transformer, "anchorSize", 10, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "rotateEnabled", true);
	Factory_1.Factory.addGetterSetter(Transformer, "rotateLineVisible", true);
	Factory_1.Factory.addGetterSetter(Transformer, "rotationSnaps", []);
	Factory_1.Factory.addGetterSetter(Transformer, "rotateAnchorOffset", 50, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "rotateAnchorCursor", "crosshair");
	Factory_1.Factory.addGetterSetter(Transformer, "rotationSnapTolerance", 5, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "borderEnabled", true);
	Factory_1.Factory.addGetterSetter(Transformer, "anchorStroke", "rgb(0, 161, 255)");
	Factory_1.Factory.addGetterSetter(Transformer, "anchorStrokeWidth", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "anchorFill", "white");
	Factory_1.Factory.addGetterSetter(Transformer, "anchorCornerRadius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "borderStroke", "rgb(0, 161, 255)");
	Factory_1.Factory.addGetterSetter(Transformer, "borderStrokeWidth", 1, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "borderDash");
	Factory_1.Factory.addGetterSetter(Transformer, "keepRatio", true);
	Factory_1.Factory.addGetterSetter(Transformer, "shiftBehavior", "default");
	Factory_1.Factory.addGetterSetter(Transformer, "centeredScaling", false);
	Factory_1.Factory.addGetterSetter(Transformer, "ignoreStroke", false);
	Factory_1.Factory.addGetterSetter(Transformer, "padding", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Transformer, "nodes");
	Factory_1.Factory.addGetterSetter(Transformer, "node");
	Factory_1.Factory.addGetterSetter(Transformer, "boundBoxFunc");
	Factory_1.Factory.addGetterSetter(Transformer, "anchorDragBoundFunc");
	Factory_1.Factory.addGetterSetter(Transformer, "anchorStyleFunc");
	Factory_1.Factory.addGetterSetter(Transformer, "shouldOverdrawWholeArea", false);
	Factory_1.Factory.addGetterSetter(Transformer, "useSingleNodeRotation", true);
	Factory_1.Factory.backCompat(Transformer, {
		lineEnabled: "borderEnabled",
		rotateHandlerOffset: "rotateAnchorOffset",
		enabledHandlers: "enabledAnchors"
	});
}));
//#endregion
//#region node_modules/konva/lib/shapes/Wedge.js
var require_Wedge = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Wedge = void 0;
	var Factory_1 = require_Factory();
	var Shape_1 = require_Shape();
	var Global_1 = require_Global();
	var Validators_1 = require_Validators();
	var Global_2 = require_Global();
	var Wedge = class extends Shape_1.Shape {
		_sceneFunc(context) {
			context.beginPath();
			context.arc(0, 0, this.radius(), 0, Global_1.Konva.getAngle(this.angle()), this.clockwise());
			context.lineTo(0, 0);
			context.closePath();
			context.fillStrokeShape(this);
		}
		getWidth() {
			return this.radius() * 2;
		}
		getHeight() {
			return this.radius() * 2;
		}
		setWidth(width) {
			this.radius(width / 2);
		}
		setHeight(height) {
			this.radius(height / 2);
		}
	};
	exports.Wedge = Wedge;
	Wedge.prototype.className = "Wedge";
	Wedge.prototype._centroid = true;
	Wedge.prototype._attrsAffectingSize = ["radius"];
	(0, Global_2._registerNode)(Wedge);
	Factory_1.Factory.addGetterSetter(Wedge, "radius", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Wedge, "angle", 0, (0, Validators_1.getNumberValidator)());
	Factory_1.Factory.addGetterSetter(Wedge, "clockwise", false);
	Factory_1.Factory.backCompat(Wedge, {
		angleDeg: "angle",
		getAngleDeg: "getAngle",
		setAngleDeg: "setAngle"
	});
}));
//#endregion
//#region node_modules/konva/lib/filters/Blur.js
var require_Blur = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Blur = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}
	var mul_table = [
		512,
		512,
		456,
		512,
		328,
		456,
		335,
		512,
		405,
		328,
		271,
		456,
		388,
		335,
		292,
		512,
		454,
		405,
		364,
		328,
		298,
		271,
		496,
		456,
		420,
		388,
		360,
		335,
		312,
		292,
		273,
		512,
		482,
		454,
		428,
		405,
		383,
		364,
		345,
		328,
		312,
		298,
		284,
		271,
		259,
		496,
		475,
		456,
		437,
		420,
		404,
		388,
		374,
		360,
		347,
		335,
		323,
		312,
		302,
		292,
		282,
		273,
		265,
		512,
		497,
		482,
		468,
		454,
		441,
		428,
		417,
		405,
		394,
		383,
		373,
		364,
		354,
		345,
		337,
		328,
		320,
		312,
		305,
		298,
		291,
		284,
		278,
		271,
		265,
		259,
		507,
		496,
		485,
		475,
		465,
		456,
		446,
		437,
		428,
		420,
		412,
		404,
		396,
		388,
		381,
		374,
		367,
		360,
		354,
		347,
		341,
		335,
		329,
		323,
		318,
		312,
		307,
		302,
		297,
		292,
		287,
		282,
		278,
		273,
		269,
		265,
		261,
		512,
		505,
		497,
		489,
		482,
		475,
		468,
		461,
		454,
		447,
		441,
		435,
		428,
		422,
		417,
		411,
		405,
		399,
		394,
		389,
		383,
		378,
		373,
		368,
		364,
		359,
		354,
		350,
		345,
		341,
		337,
		332,
		328,
		324,
		320,
		316,
		312,
		309,
		305,
		301,
		298,
		294,
		291,
		287,
		284,
		281,
		278,
		274,
		271,
		268,
		265,
		262,
		259,
		257,
		507,
		501,
		496,
		491,
		485,
		480,
		475,
		470,
		465,
		460,
		456,
		451,
		446,
		442,
		437,
		433,
		428,
		424,
		420,
		416,
		412,
		408,
		404,
		400,
		396,
		392,
		388,
		385,
		381,
		377,
		374,
		370,
		367,
		363,
		360,
		357,
		354,
		350,
		347,
		344,
		341,
		338,
		335,
		332,
		329,
		326,
		323,
		320,
		318,
		315,
		312,
		310,
		307,
		304,
		302,
		299,
		297,
		294,
		292,
		289,
		287,
		285,
		282,
		280,
		278,
		275,
		273,
		271,
		269,
		267,
		265,
		263,
		261,
		259
	];
	var shg_table = [
		9,
		11,
		12,
		13,
		13,
		14,
		14,
		15,
		15,
		15,
		15,
		16,
		16,
		16,
		16,
		17,
		17,
		17,
		17,
		17,
		17,
		17,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24
	];
	function filterGaussBlurRGBA(imageData, radius) {
		const pixels = imageData.data, width = imageData.width, height = imageData.height;
		let p, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
		const div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2, stackStart = new BlurStack(), mul_sum = mul_table[radius], shg_sum = shg_table[radius];
		let stackEnd = null, stack = stackStart, stackIn = null, stackOut = null;
		for (let i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i === radiusPlus1) stackEnd = stack;
		}
		stack.next = stackStart;
		yw = yi = 0;
		for (let y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;
			stack = stackStart;
			for (let i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}
			for (let i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;
				stack = stack.next;
			}
			stackIn = stackStart;
			stackOut = stackEnd;
			for (let x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa !== 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;
				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];
				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;
				stackIn = stackIn.next;
				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;
				stackOut = stackOut.next;
				yi += 4;
			}
			yw += width;
		}
		for (let x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;
			stack = stackStart;
			for (let i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}
			let yp = width;
			for (let i = 1; i <= radius; i++) {
				yi = yp + x << 2;
				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;
				stack = stack.next;
				if (i < heightMinus1) yp += width;
			}
			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (let y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;
				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];
				stackIn = stackIn.next;
				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;
				stackOut = stackOut.next;
				yi += width;
			}
		}
	}
	exports.Blur = function Blur(imageData) {
		const radius = Math.round(this.blurRadius());
		if (radius > 0) filterGaussBlurRGBA(imageData, radius);
	};
	Factory_1.Factory.addGetterSetter(Node_1.Node, "blurRadius", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Brighten.js
var require_Brighten = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Brighten = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Brighten = function(imageData) {
		const brightness = this.brightness() * 255, data = imageData.data, len = data.length;
		for (let i = 0; i < len; i += 4) {
			data[i] += brightness;
			data[i + 1] += brightness;
			data[i + 2] += brightness;
		}
	};
	exports.Brighten = Brighten;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "brightness", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Contrast.js
var require_Contrast = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Contrast = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Contrast = function(imageData) {
		const adjust = Math.pow((this.contrast() + 100) / 100, 2);
		const data = imageData.data, nPixels = data.length;
		let red = 150, green = 150, blue = 150;
		for (let i = 0; i < nPixels; i += 4) {
			red = data[i];
			green = data[i + 1];
			blue = data[i + 2];
			red /= 255;
			red -= .5;
			red *= adjust;
			red += .5;
			red *= 255;
			green /= 255;
			green -= .5;
			green *= adjust;
			green += .5;
			green *= 255;
			blue /= 255;
			blue -= .5;
			blue *= adjust;
			blue += .5;
			blue *= 255;
			red = red < 0 ? 0 : red > 255 ? 255 : red;
			green = green < 0 ? 0 : green > 255 ? 255 : green;
			blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
			data[i] = red;
			data[i + 1] = green;
			data[i + 2] = blue;
		}
	};
	exports.Contrast = Contrast;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "contrast", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Emboss.js
var require_Emboss = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Emboss = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Util_1 = require_Util();
	var Validators_1 = require_Validators();
	var Emboss = function(imageData) {
		const strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4;
		let dirY = 0, dirX = 0, y = h;
		switch (direction) {
			case "top-left":
				dirY = -1;
				dirX = -1;
				break;
			case "top":
				dirY = -1;
				dirX = 0;
				break;
			case "top-right":
				dirY = -1;
				dirX = 1;
				break;
			case "right":
				dirY = 0;
				dirX = 1;
				break;
			case "bottom-right":
				dirY = 1;
				dirX = 1;
				break;
			case "bottom":
				dirY = 1;
				dirX = 0;
				break;
			case "bottom-left":
				dirY = 1;
				dirX = -1;
				break;
			case "left":
				dirY = 0;
				dirX = -1;
				break;
			default: Util_1.Util.error("Unknown emboss direction: " + direction);
		}
		do {
			const offsetY = (y - 1) * w4;
			let otherY = dirY;
			if (y + otherY < 1) otherY = 0;
			if (y + otherY > h) otherY = 0;
			const offsetYOther = (y - 1 + otherY) * w * 4;
			let x = w;
			do {
				const offset = offsetY + (x - 1) * 4;
				let otherX = dirX;
				if (x + otherX < 1) otherX = 0;
				if (x + otherX > w) otherX = 0;
				const offsetOther = offsetYOther + (x - 1 + otherX) * 4;
				const dR = data[offset] - data[offsetOther];
				const dG = data[offset + 1] - data[offsetOther + 1];
				const dB = data[offset + 2] - data[offsetOther + 2];
				let dif = dR;
				const absDif = dif > 0 ? dif : -dif;
				const absG = dG > 0 ? dG : -dG;
				const absB = dB > 0 ? dB : -dB;
				if (absG > absDif) dif = dG;
				if (absB > absDif) dif = dB;
				dif *= strength;
				if (blend) {
					const r = data[offset] + dif;
					const g = data[offset + 1] + dif;
					const b = data[offset + 2] + dif;
					data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
					data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
					data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
				} else {
					let grey = greyLevel - dif;
					if (grey < 0) grey = 0;
					else if (grey > 255) grey = 255;
					data[offset] = data[offset + 1] = data[offset + 2] = grey;
				}
			} while (--x);
		} while (--y);
	};
	exports.Emboss = Emboss;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "embossStrength", .5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "embossWhiteLevel", .5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "embossDirection", "top-left", void 0, Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "embossBlend", false, void 0, Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Enhance.js
var require_Enhance = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Enhance = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	function remap(fromValue, fromMin, fromMax, toMin, toMax) {
		const fromRange = fromMax - fromMin, toRange = toMax - toMin;
		if (fromRange === 0) return toMin + toRange / 2;
		if (toRange === 0) return toMin;
		let toValue = (fromValue - fromMin) / fromRange;
		toValue = toRange * toValue + toMin;
		return toValue;
	}
	var Enhance = function(imageData) {
		const data = imageData.data, nSubPixels = data.length;
		let rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b;
		const enhanceAmount = this.enhance();
		if (enhanceAmount === 0) return;
		for (let i = 0; i < nSubPixels; i += 4) {
			r = data[i + 0];
			if (r < rMin) rMin = r;
			else if (r > rMax) rMax = r;
			g = data[i + 1];
			if (g < gMin) gMin = g;
			else if (g > gMax) gMax = g;
			b = data[i + 2];
			if (b < bMin) bMin = b;
			else if (b > bMax) bMax = b;
		}
		if (rMax === rMin) {
			rMax = 255;
			rMin = 0;
		}
		if (gMax === gMin) {
			gMax = 255;
			gMin = 0;
		}
		if (bMax === bMin) {
			bMax = 255;
			bMin = 0;
		}
		let rGoalMax, rGoalMin, gGoalMax, gGoalMin, bGoalMax, bGoalMin;
		if (enhanceAmount > 0) {
			rGoalMax = rMax + enhanceAmount * (255 - rMax);
			rGoalMin = rMin - enhanceAmount * (rMin - 0);
			gGoalMax = gMax + enhanceAmount * (255 - gMax);
			gGoalMin = gMin - enhanceAmount * (gMin - 0);
			bGoalMax = bMax + enhanceAmount * (255 - bMax);
			bGoalMin = bMin - enhanceAmount * (bMin - 0);
		} else {
			const rMid = (rMax + rMin) * .5;
			rGoalMax = rMax + enhanceAmount * (rMax - rMid);
			rGoalMin = rMin + enhanceAmount * (rMin - rMid);
			const gMid = (gMax + gMin) * .5;
			gGoalMax = gMax + enhanceAmount * (gMax - gMid);
			gGoalMin = gMin + enhanceAmount * (gMin - gMid);
			const bMid = (bMax + bMin) * .5;
			bGoalMax = bMax + enhanceAmount * (bMax - bMid);
			bGoalMin = bMin + enhanceAmount * (bMin - bMid);
		}
		for (let i = 0; i < nSubPixels; i += 4) {
			data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
			data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
			data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
		}
	};
	exports.Enhance = Enhance;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "enhance", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Grayscale.js
var require_Grayscale = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Grayscale = void 0;
	var Grayscale = function(imageData) {
		const data = imageData.data, len = data.length;
		for (let i = 0; i < len; i += 4) {
			const brightness = .34 * data[i] + .5 * data[i + 1] + .16 * data[i + 2];
			data[i] = brightness;
			data[i + 1] = brightness;
			data[i + 2] = brightness;
		}
	};
	exports.Grayscale = Grayscale;
}));
//#endregion
//#region node_modules/konva/lib/filters/HSL.js
var require_HSL = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HSL = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "luminance", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	var HSL = function(imageData) {
		const data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127;
		const vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
		const rr = .299 * v + .701 * vsu + .167 * vsw, rg = .587 * v - .587 * vsu + .33 * vsw, rb = .114 * v - .114 * vsu - .497 * vsw;
		const gr = .299 * v - .299 * vsu - .328 * vsw, gg = .587 * v + .413 * vsu + .035 * vsw, gb = .114 * v - .114 * vsu + .293 * vsw;
		const br = .299 * v - .3 * vsu + 1.25 * vsw, bg = .587 * v - .586 * vsu - 1.05 * vsw, bb = .114 * v + .886 * vsu - .2 * vsw;
		let r, g, b, a;
		for (let i = 0; i < nPixels; i += 4) {
			r = data[i + 0];
			g = data[i + 1];
			b = data[i + 2];
			a = data[i + 3];
			data[i + 0] = rr * r + rg * g + rb * b + l;
			data[i + 1] = gr * r + gg * g + gb * b + l;
			data[i + 2] = br * r + bg * g + bb * b + l;
			data[i + 3] = a;
		}
	};
	exports.HSL = HSL;
}));
//#endregion
//#region node_modules/konva/lib/filters/HSV.js
var require_HSV = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HSV = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var HSV = function(imageData) {
		const data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360;
		const vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
		const rr = .299 * v + .701 * vsu + .167 * vsw, rg = .587 * v - .587 * vsu + .33 * vsw, rb = .114 * v - .114 * vsu - .497 * vsw;
		const gr = .299 * v - .299 * vsu - .328 * vsw, gg = .587 * v + .413 * vsu + .035 * vsw, gb = .114 * v - .114 * vsu + .293 * vsw;
		const br = .299 * v - .3 * vsu + 1.25 * vsw, bg = .587 * v - .586 * vsu - 1.05 * vsw, bb = .114 * v + .886 * vsu - .2 * vsw;
		for (let i = 0; i < nPixels; i += 4) {
			const r = data[i + 0];
			const g = data[i + 1];
			const b = data[i + 2];
			const a = data[i + 3];
			data[i + 0] = rr * r + rg * g + rb * b;
			data[i + 1] = gr * r + gg * g + gb * b;
			data[i + 2] = br * r + bg * g + bb * b;
			data[i + 3] = a;
		}
	};
	exports.HSV = HSV;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "value", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Invert.js
var require_Invert = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Invert = void 0;
	var Invert = function(imageData) {
		const data = imageData.data, len = data.length;
		for (let i = 0; i < len; i += 4) {
			data[i] = 255 - data[i];
			data[i + 1] = 255 - data[i + 1];
			data[i + 2] = 255 - data[i + 2];
		}
	};
	exports.Invert = Invert;
}));
//#endregion
//#region node_modules/konva/lib/filters/Kaleidoscope.js
var require_Kaleidoscope = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Kaleidoscope = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Util_1 = require_Util();
	var Validators_1 = require_Validators();
	var ToPolar = function(src, dst, opt) {
		const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
		let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
		let x = xSize - xMid;
		let y = ySize - yMid;
		const rad = Math.sqrt(x * x + y * y);
		rMax = rad > rMax ? rad : rMax;
		const rSize = ySize, tSize = xSize;
		const conversion = 360 / tSize * Math.PI / 180;
		for (let theta = 0; theta < tSize; theta += 1) {
			const sin = Math.sin(theta * conversion);
			const cos = Math.cos(theta * conversion);
			for (let radius = 0; radius < rSize; radius += 1) {
				x = Math.floor(xMid + rMax * radius / rSize * cos);
				y = Math.floor(yMid + rMax * radius / rSize * sin);
				let i = (y * xSize + x) * 4;
				const r = srcPixels[i + 0];
				const g = srcPixels[i + 1];
				const b = srcPixels[i + 2];
				const a = srcPixels[i + 3];
				i = (theta + radius * xSize) * 4;
				dstPixels[i + 0] = r;
				dstPixels[i + 1] = g;
				dstPixels[i + 2] = b;
				dstPixels[i + 3] = a;
			}
		}
	};
	var FromPolar = function(src, dst, opt) {
		const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
		let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
		let x = xSize - xMid;
		let y = ySize - yMid;
		const rad = Math.sqrt(x * x + y * y);
		rMax = rad > rMax ? rad : rMax;
		const rSize = ySize, tSize = xSize, phaseShift = opt.polarRotation || 0;
		let x1, y1;
		for (x = 0; x < xSize; x += 1) for (y = 0; y < ySize; y += 1) {
			const dx = x - xMid;
			const dy = y - yMid;
			const radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
			let theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
			theta = theta * tSize / 360;
			x1 = Math.floor(theta);
			y1 = Math.floor(radius);
			let i = (y1 * xSize + x1) * 4;
			const r = srcPixels[i + 0];
			const g = srcPixels[i + 1];
			const b = srcPixels[i + 2];
			const a = srcPixels[i + 3];
			i = (y * xSize + x) * 4;
			dstPixels[i + 0] = r;
			dstPixels[i + 1] = g;
			dstPixels[i + 2] = b;
			dstPixels[i + 3] = a;
		}
	};
	var Kaleidoscope = function(imageData) {
		const xSize = imageData.width, ySize = imageData.height;
		let x, y, xoff, i, r, g, b, a, srcPos, dstPos;
		let power = Math.round(this.kaleidoscopePower());
		const angle = Math.round(this.kaleidoscopeAngle());
		const offset = Math.floor(xSize * (angle % 360) / 360);
		if (power < 1) return;
		const tempCanvas = Util_1.Util.createCanvasElement();
		tempCanvas.width = xSize;
		tempCanvas.height = ySize;
		const scratchData = tempCanvas.getContext("2d").getImageData(0, 0, xSize, ySize);
		Util_1.Util.releaseCanvas(tempCanvas);
		ToPolar(imageData, scratchData, {
			polarCenterX: xSize / 2,
			polarCenterY: ySize / 2
		});
		let minSectionSize = xSize / Math.pow(2, power);
		while (minSectionSize <= 8) {
			minSectionSize = minSectionSize * 2;
			power -= 1;
		}
		minSectionSize = Math.ceil(minSectionSize);
		let sectionSize = minSectionSize;
		let xStart = 0, xEnd = sectionSize, xDelta = 1;
		if (offset + minSectionSize > xSize) {
			xStart = sectionSize;
			xEnd = 0;
			xDelta = -1;
		}
		for (y = 0; y < ySize; y += 1) for (x = xStart; x !== xEnd; x += xDelta) {
			xoff = Math.round(x + offset) % xSize;
			srcPos = (xSize * y + xoff) * 4;
			r = scratchData.data[srcPos + 0];
			g = scratchData.data[srcPos + 1];
			b = scratchData.data[srcPos + 2];
			a = scratchData.data[srcPos + 3];
			dstPos = (xSize * y + x) * 4;
			scratchData.data[dstPos + 0] = r;
			scratchData.data[dstPos + 1] = g;
			scratchData.data[dstPos + 2] = b;
			scratchData.data[dstPos + 3] = a;
		}
		for (y = 0; y < ySize; y += 1) {
			sectionSize = Math.floor(minSectionSize);
			for (i = 0; i < power; i += 1) {
				for (x = 0; x < sectionSize + 1; x += 1) {
					srcPos = (xSize * y + x) * 4;
					r = scratchData.data[srcPos + 0];
					g = scratchData.data[srcPos + 1];
					b = scratchData.data[srcPos + 2];
					a = scratchData.data[srcPos + 3];
					dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
					scratchData.data[dstPos + 0] = r;
					scratchData.data[dstPos + 1] = g;
					scratchData.data[dstPos + 2] = b;
					scratchData.data[dstPos + 3] = a;
				}
				sectionSize *= 2;
			}
		}
		FromPolar(scratchData, imageData, { polarRotation: 0 });
	};
	exports.Kaleidoscope = Kaleidoscope;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopePower", 2, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopeAngle", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Mask.js
var require_Mask = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Mask = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	function pixelAt(idata, x, y) {
		let idx = (y * idata.width + x) * 4;
		const d = [];
		d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
		return d;
	}
	function rgbDistance(p1, p2) {
		return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
	}
	function rgbMean(pTab) {
		const m = [
			0,
			0,
			0
		];
		for (let i = 0; i < pTab.length; i++) {
			m[0] += pTab[i][0];
			m[1] += pTab[i][1];
			m[2] += pTab[i][2];
		}
		m[0] /= pTab.length;
		m[1] /= pTab.length;
		m[2] /= pTab.length;
		return m;
	}
	function backgroundMask(idata, threshold) {
		const rgbv_no = pixelAt(idata, 0, 0);
		const rgbv_ne = pixelAt(idata, idata.width - 1, 0);
		const rgbv_so = pixelAt(idata, 0, idata.height - 1);
		const rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
		const thres = threshold || 10;
		if (rgbDistance(rgbv_no, rgbv_ne) < thres && rgbDistance(rgbv_ne, rgbv_se) < thres && rgbDistance(rgbv_se, rgbv_so) < thres && rgbDistance(rgbv_so, rgbv_no) < thres) {
			const mean = rgbMean([
				rgbv_ne,
				rgbv_no,
				rgbv_se,
				rgbv_so
			]);
			const mask = [];
			for (let i = 0; i < idata.width * idata.height; i++) mask[i] = rgbDistance(mean, [
				idata.data[i * 4],
				idata.data[i * 4 + 1],
				idata.data[i * 4 + 2]
			]) < thres ? 0 : 255;
			return mask;
		}
	}
	function applyMask(idata, mask) {
		for (let i = 0; i < idata.width * idata.height; i++) idata.data[4 * i + 3] = mask[i];
	}
	function erodeMask(mask, sw, sh) {
		const weights = [
			1,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			1
		];
		const side = Math.round(Math.sqrt(weights.length));
		const halfSide = Math.floor(side / 2);
		const maskResult = [];
		for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
			const so = y * sw + x;
			let a = 0;
			for (let cy = 0; cy < side; cy++) for (let cx = 0; cx < side; cx++) {
				const scy = y + cy - halfSide;
				const scx = x + cx - halfSide;
				if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
					const srcOff = scy * sw + scx;
					const wt = weights[cy * side + cx];
					a += mask[srcOff] * wt;
				}
			}
			maskResult[so] = a === 2040 ? 255 : 0;
		}
		return maskResult;
	}
	function dilateMask(mask, sw, sh) {
		const weights = [
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1
		];
		const side = Math.round(Math.sqrt(weights.length));
		const halfSide = Math.floor(side / 2);
		const maskResult = [];
		for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
			const so = y * sw + x;
			let a = 0;
			for (let cy = 0; cy < side; cy++) for (let cx = 0; cx < side; cx++) {
				const scy = y + cy - halfSide;
				const scx = x + cx - halfSide;
				if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
					const srcOff = scy * sw + scx;
					const wt = weights[cy * side + cx];
					a += mask[srcOff] * wt;
				}
			}
			maskResult[so] = a >= 1020 ? 255 : 0;
		}
		return maskResult;
	}
	function smoothEdgeMask(mask, sw, sh) {
		const weights = [
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9
		];
		const side = Math.round(Math.sqrt(weights.length));
		const halfSide = Math.floor(side / 2);
		const maskResult = [];
		for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
			const so = y * sw + x;
			let a = 0;
			for (let cy = 0; cy < side; cy++) for (let cx = 0; cx < side; cx++) {
				const scy = y + cy - halfSide;
				const scx = x + cx - halfSide;
				if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
					const srcOff = scy * sw + scx;
					const wt = weights[cy * side + cx];
					a += mask[srcOff] * wt;
				}
			}
			maskResult[so] = a;
		}
		return maskResult;
	}
	var Mask = function(imageData) {
		let mask = backgroundMask(imageData, this.threshold());
		if (mask) {
			mask = erodeMask(mask, imageData.width, imageData.height);
			mask = dilateMask(mask, imageData.width, imageData.height);
			mask = smoothEdgeMask(mask, imageData.width, imageData.height);
			applyMask(imageData, mask);
		}
		return imageData;
	};
	exports.Mask = Mask;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Noise.js
var require_Noise = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Noise = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Noise = function(imageData) {
		const amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2;
		for (let i = 0; i < nPixels; i += 4) {
			data[i + 0] += half - 2 * half * Math.random();
			data[i + 1] += half - 2 * half * Math.random();
			data[i + 2] += half - 2 * half * Math.random();
		}
	};
	exports.Noise = Noise;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "noise", .2, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Pixelate.js
var require_Pixelate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Pixelate = void 0;
	var Factory_1 = require_Factory();
	var Util_1 = require_Util();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Pixelate = function(imageData) {
		let pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), data = imageData.data;
		if (pixelSize <= 0) {
			Util_1.Util.error("pixelSize value can not be <= 0");
			return;
		}
		for (let xBin = 0; xBin < nBinsX; xBin += 1) for (let yBin = 0; yBin < nBinsY; yBin += 1) {
			let red = 0;
			let green = 0;
			let blue = 0;
			let alpha = 0;
			const xBinStart = xBin * pixelSize;
			const xBinEnd = xBinStart + pixelSize;
			const yBinStart = yBin * pixelSize;
			const yBinEnd = yBinStart + pixelSize;
			let pixelsInBin = 0;
			for (let x = xBinStart; x < xBinEnd; x += 1) {
				if (x >= width) continue;
				for (let y = yBinStart; y < yBinEnd; y += 1) {
					if (y >= height) continue;
					const i = (width * y + x) * 4;
					red += data[i + 0];
					green += data[i + 1];
					blue += data[i + 2];
					alpha += data[i + 3];
					pixelsInBin += 1;
				}
			}
			red = red / pixelsInBin;
			green = green / pixelsInBin;
			blue = blue / pixelsInBin;
			alpha = alpha / pixelsInBin;
			for (let x = xBinStart; x < xBinEnd; x += 1) {
				if (x >= width) continue;
				for (let y = yBinStart; y < yBinEnd; y += 1) {
					if (y >= height) continue;
					const i = (width * y + x) * 4;
					data[i + 0] = red;
					data[i + 1] = green;
					data[i + 2] = blue;
					data[i + 3] = alpha;
				}
			}
		}
	};
	exports.Pixelate = Pixelate;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "pixelSize", 8, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Posterize.js
var require_Posterize = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Posterize = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Posterize = function(imageData) {
		const levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels;
		for (let i = 0; i < len; i += 1) data[i] = Math.floor(data[i] / scale) * scale;
	};
	exports.Posterize = Posterize;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "levels", .5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/RGB.js
var require_RGB = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RGB = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var RGB = function(imageData) {
		const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue();
		for (let i = 0; i < nPixels; i += 4) {
			const brightness = (.34 * data[i] + .5 * data[i + 1] + .16 * data[i + 2]) / 255;
			data[i] = brightness * red;
			data[i + 1] = brightness * green;
			data[i + 2] = brightness * blue;
			data[i + 3] = data[i + 3];
		}
	};
	exports.RGB = RGB;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
		this._filterUpToDate = false;
		if (val > 255) return 255;
		else if (val < 0) return 0;
		else return Math.round(val);
	});
	Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
		this._filterUpToDate = false;
		if (val > 255) return 255;
		else if (val < 0) return 0;
		else return Math.round(val);
	});
	Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/RGBA.js
var require_RGBA = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RGBA = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var RGBA = function(imageData) {
		const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha();
		for (let i = 0; i < nPixels; i += 4) {
			const ia = 1 - alpha;
			data[i] = red * alpha + data[i] * ia;
			data[i + 1] = green * alpha + data[i + 1] * ia;
			data[i + 2] = blue * alpha + data[i + 2] * ia;
		}
	};
	exports.RGBA = RGBA;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
		this._filterUpToDate = false;
		if (val > 255) return 255;
		else if (val < 0) return 0;
		else return Math.round(val);
	});
	Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
		this._filterUpToDate = false;
		if (val > 255) return 255;
		else if (val < 0) return 0;
		else return Math.round(val);
	});
	Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
	Factory_1.Factory.addGetterSetter(Node_1.Node, "alpha", 1, function(val) {
		this._filterUpToDate = false;
		if (val > 1) return 1;
		else if (val < 0) return 0;
		else return val;
	});
}));
//#endregion
//#region node_modules/konva/lib/filters/Sepia.js
var require_Sepia = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sepia = void 0;
	var Sepia = function(imageData) {
		const data = imageData.data, nPixels = data.length;
		for (let i = 0; i < nPixels; i += 4) {
			const r = data[i + 0];
			const g = data[i + 1];
			const b = data[i + 2];
			data[i + 0] = Math.min(255, r * .393 + g * .769 + b * .189);
			data[i + 1] = Math.min(255, r * .349 + g * .686 + b * .168);
			data[i + 2] = Math.min(255, r * .272 + g * .534 + b * .131);
		}
	};
	exports.Sepia = Sepia;
}));
//#endregion
//#region node_modules/konva/lib/filters/Solarize.js
var require_Solarize = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Solarize = void 0;
	var Solarize = function(imageData) {
		const data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4;
		let y = h;
		do {
			const offsetY = (y - 1) * w4;
			let x = w;
			do {
				const offset = offsetY + (x - 1) * 4;
				let r = data[offset];
				let g = data[offset + 1];
				let b = data[offset + 2];
				if (r > 127) r = 255 - r;
				if (g > 127) g = 255 - g;
				if (b > 127) b = 255 - b;
				data[offset] = r;
				data[offset + 1] = g;
				data[offset + 2] = b;
			} while (--x);
		} while (--y);
	};
	exports.Solarize = Solarize;
}));
//#endregion
//#region node_modules/konva/lib/filters/Threshold.js
var require_Threshold = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Threshold = void 0;
	var Factory_1 = require_Factory();
	var Node_1 = require_Node();
	var Validators_1 = require_Validators();
	var Threshold = function(imageData) {
		const level = this.threshold() * 255, data = imageData.data, len = data.length;
		for (let i = 0; i < len; i += 1) data[i] = data[i] < level ? 0 : 255;
	};
	exports.Threshold = Threshold;
	Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", .5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/_FullInternals.js
var require__FullInternals = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Konva = void 0;
	var _CoreInternals_1 = require__CoreInternals();
	var Arc_1 = require_Arc();
	var Arrow_1 = require_Arrow();
	var Circle_1 = require_Circle();
	var Ellipse_1 = require_Ellipse();
	var Image_1 = require_Image();
	var Label_1 = require_Label();
	var Line_1 = require_Line();
	var Path_1 = require_Path();
	var Rect_1 = require_Rect();
	var RegularPolygon_1 = require_RegularPolygon();
	var Ring_1 = require_Ring();
	var Sprite_1 = require_Sprite();
	var Star_1 = require_Star();
	var Text_1 = require_Text();
	var TextPath_1 = require_TextPath();
	var Transformer_1 = require_Transformer();
	var Wedge_1 = require_Wedge();
	var Blur_1 = require_Blur();
	var Brighten_1 = require_Brighten();
	var Contrast_1 = require_Contrast();
	var Emboss_1 = require_Emboss();
	var Enhance_1 = require_Enhance();
	var Grayscale_1 = require_Grayscale();
	var HSL_1 = require_HSL();
	var HSV_1 = require_HSV();
	var Invert_1 = require_Invert();
	var Kaleidoscope_1 = require_Kaleidoscope();
	var Mask_1 = require_Mask();
	var Noise_1 = require_Noise();
	var Pixelate_1 = require_Pixelate();
	var Posterize_1 = require_Posterize();
	var RGB_1 = require_RGB();
	var RGBA_1 = require_RGBA();
	var Sepia_1 = require_Sepia();
	var Solarize_1 = require_Solarize();
	var Threshold_1 = require_Threshold();
	exports.Konva = _CoreInternals_1.Konva.Util._assign(_CoreInternals_1.Konva, {
		Arc: Arc_1.Arc,
		Arrow: Arrow_1.Arrow,
		Circle: Circle_1.Circle,
		Ellipse: Ellipse_1.Ellipse,
		Image: Image_1.Image,
		Label: Label_1.Label,
		Tag: Label_1.Tag,
		Line: Line_1.Line,
		Path: Path_1.Path,
		Rect: Rect_1.Rect,
		RegularPolygon: RegularPolygon_1.RegularPolygon,
		Ring: Ring_1.Ring,
		Sprite: Sprite_1.Sprite,
		Star: Star_1.Star,
		Text: Text_1.Text,
		TextPath: TextPath_1.TextPath,
		Transformer: Transformer_1.Transformer,
		Wedge: Wedge_1.Wedge,
		Filters: {
			Blur: Blur_1.Blur,
			Brighten: Brighten_1.Brighten,
			Contrast: Contrast_1.Contrast,
			Emboss: Emboss_1.Emboss,
			Enhance: Enhance_1.Enhance,
			Grayscale: Grayscale_1.Grayscale,
			HSL: HSL_1.HSL,
			HSV: HSV_1.HSV,
			Invert: Invert_1.Invert,
			Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
			Mask: Mask_1.Mask,
			Noise: Noise_1.Noise,
			Pixelate: Pixelate_1.Pixelate,
			Posterize: Posterize_1.Posterize,
			RGB: RGB_1.RGB,
			RGBA: RGBA_1.RGBA,
			Sepia: Sepia_1.Sepia,
			Solarize: Solarize_1.Solarize,
			Threshold: Threshold_1.Threshold
		}
	});
}));
//#endregion
//#region node_modules/konva/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	module.exports = require__FullInternals().Konva;
}));
//#endregion
//#region node_modules/konva/lib/Core.js
var require_Core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Konva = void 0;
	var _CoreInternals_1 = require__CoreInternals();
	Object.defineProperty(exports, "Konva", {
		enumerable: true,
		get: function() {
			return _CoreInternals_1.Konva;
		}
	});
	module.exports = require__CoreInternals().Konva;
}));
//#endregion
//#region node_modules/react-reconciler/cjs/react-reconciler.production.min.js
var require_react_reconciler_production_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* @license React
	* react-reconciler.production.min.js
	*
	* Copyright (c) Facebook, Inc. and its affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	module.exports = function $$$reconciler($$$hostConfig) {
		var exports$1 = {};
		var aa = require_react(), ba = require_scheduler(), ca = Object.assign;
		function n(a) {
			for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
			return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}
		var da = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ea = Symbol.for("react.element"), fa = Symbol.for("react.portal"), ha = Symbol.for("react.fragment"), ia = Symbol.for("react.strict_mode"), ja = Symbol.for("react.profiler"), ka = Symbol.for("react.provider"), la = Symbol.for("react.context"), ma = Symbol.for("react.forward_ref"), na = Symbol.for("react.suspense"), oa = Symbol.for("react.suspense_list"), pa = Symbol.for("react.memo"), qa = Symbol.for("react.lazy");
		var ra = Symbol.for("react.offscreen");
		var sa = Symbol.iterator;
		function ta(a) {
			if (null === a || "object" !== typeof a) return null;
			a = sa && a[sa] || a["@@iterator"];
			return "function" === typeof a ? a : null;
		}
		function ua(a) {
			if (null == a) return null;
			if ("function" === typeof a) return a.displayName || a.name || null;
			if ("string" === typeof a) return a;
			switch (a) {
				case ha: return "Fragment";
				case fa: return "Portal";
				case ja: return "Profiler";
				case ia: return "StrictMode";
				case na: return "Suspense";
				case oa: return "SuspenseList";
			}
			if ("object" === typeof a) switch (a.$$typeof) {
				case la: return (a.displayName || "Context") + ".Consumer";
				case ka: return (a._context.displayName || "Context") + ".Provider";
				case ma:
					var b = a.render;
					a = a.displayName;
					a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
					return a;
				case pa: return b = a.displayName || null, null !== b ? b : ua(a.type) || "Memo";
				case qa:
					b = a._payload;
					a = a._init;
					try {
						return ua(a(b));
					} catch (c) {}
			}
			return null;
		}
		function va(a) {
			var b = a.type;
			switch (a.tag) {
				case 24: return "Cache";
				case 9: return (b.displayName || "Context") + ".Consumer";
				case 10: return (b._context.displayName || "Context") + ".Provider";
				case 18: return "DehydratedFragment";
				case 11: return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				case 7: return "Fragment";
				case 5: return b;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return ua(b);
				case 8: return b === ia ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 17:
				case 2:
				case 14:
				case 15:
					if ("function" === typeof b) return b.displayName || b.name || null;
					if ("string" === typeof b) return b;
			}
			return null;
		}
		function wa(a) {
			var b = a, c = a;
			if (a.alternate) for (; b.return;) b = b.return;
			else {
				a = b;
				do
					b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
				while (a);
			}
			return 3 === b.tag ? c : null;
		}
		function xa(a) {
			if (wa(a) !== a) throw Error(n(188));
		}
		function za(a) {
			var b = a.alternate;
			if (!b) {
				b = wa(a);
				if (null === b) throw Error(n(188));
				return b !== a ? null : a;
			}
			for (var c = a, d = b;;) {
				var e = c.return;
				if (null === e) break;
				var f = e.alternate;
				if (null === f) {
					d = e.return;
					if (null !== d) {
						c = d;
						continue;
					}
					break;
				}
				if (e.child === f.child) {
					for (f = e.child; f;) {
						if (f === c) return xa(e), a;
						if (f === d) return xa(e), b;
						f = f.sibling;
					}
					throw Error(n(188));
				}
				if (c.return !== d.return) c = e, d = f;
				else {
					for (var g = !1, h = e.child; h;) {
						if (h === c) {
							g = !0;
							c = e;
							d = f;
							break;
						}
						if (h === d) {
							g = !0;
							d = e;
							c = f;
							break;
						}
						h = h.sibling;
					}
					if (!g) {
						for (h = f.child; h;) {
							if (h === c) {
								g = !0;
								c = f;
								d = e;
								break;
							}
							if (h === d) {
								g = !0;
								d = f;
								c = e;
								break;
							}
							h = h.sibling;
						}
						if (!g) throw Error(n(189));
					}
				}
				if (c.alternate !== d) throw Error(n(190));
			}
			if (3 !== c.tag) throw Error(n(188));
			return c.stateNode.current === c ? a : b;
		}
		function Aa(a) {
			a = za(a);
			return null !== a ? Ba(a) : null;
		}
		function Ba(a) {
			if (5 === a.tag || 6 === a.tag) return a;
			for (a = a.child; null !== a;) {
				var b = Ba(a);
				if (null !== b) return b;
				a = a.sibling;
			}
			return null;
		}
		function Ca(a) {
			if (5 === a.tag || 6 === a.tag) return a;
			for (a = a.child; null !== a;) {
				if (4 !== a.tag) {
					var b = Ca(a);
					if (null !== b) return b;
				}
				a = a.sibling;
			}
			return null;
		}
		var Da = Array.isArray, Ea = $$$hostConfig.getPublicInstance, Fa = $$$hostConfig.getRootHostContext, Ga = $$$hostConfig.getChildHostContext, Ha = $$$hostConfig.prepareForCommit, Ia = $$$hostConfig.resetAfterCommit, Ja = $$$hostConfig.createInstance, Ka = $$$hostConfig.appendInitialChild, La = $$$hostConfig.finalizeInitialChildren, Ma = $$$hostConfig.prepareUpdate, Na = $$$hostConfig.shouldSetTextContent, Oa = $$$hostConfig.createTextInstance, Pa = $$$hostConfig.scheduleTimeout, Qa = $$$hostConfig.cancelTimeout, Ra = $$$hostConfig.noTimeout, Sa = $$$hostConfig.isPrimaryRenderer, Ta = $$$hostConfig.supportsMutation, Ua = $$$hostConfig.supportsPersistence, Va = $$$hostConfig.supportsHydration, Wa = $$$hostConfig.getInstanceFromNode, Xa = $$$hostConfig.preparePortalMount, Ya = $$$hostConfig.getCurrentEventPriority, Za = $$$hostConfig.detachDeletedInstance, $a = $$$hostConfig.supportsMicrotasks, ab = $$$hostConfig.scheduleMicrotask, bb = $$$hostConfig.supportsTestSelectors, cb = $$$hostConfig.findFiberRoot, db = $$$hostConfig.getBoundingRect, eb = $$$hostConfig.getTextContent, fb = $$$hostConfig.isHiddenSubtree, gb = $$$hostConfig.matchAccessibilityRole, hb = $$$hostConfig.setFocusIfFocusable, ib = $$$hostConfig.setupIntersectionObserver, jb = $$$hostConfig.appendChild, kb = $$$hostConfig.appendChildToContainer, lb = $$$hostConfig.commitTextUpdate, mb = $$$hostConfig.commitMount, nb = $$$hostConfig.commitUpdate, ob = $$$hostConfig.insertBefore, pb = $$$hostConfig.insertInContainerBefore, qb = $$$hostConfig.removeChild, rb = $$$hostConfig.removeChildFromContainer, sb = $$$hostConfig.resetTextContent, tb = $$$hostConfig.hideInstance, ub = $$$hostConfig.hideTextInstance, vb = $$$hostConfig.unhideInstance, wb = $$$hostConfig.unhideTextInstance, xb = $$$hostConfig.clearContainer, yb = $$$hostConfig.cloneInstance, zb = $$$hostConfig.createContainerChildSet, Ab = $$$hostConfig.appendChildToContainerChildSet, Bb = $$$hostConfig.finalizeContainerChildren, Cb = $$$hostConfig.replaceContainerChildren, Eb = $$$hostConfig.cloneHiddenInstance, Fb = $$$hostConfig.cloneHiddenTextInstance, Gb = $$$hostConfig.canHydrateInstance, Hb = $$$hostConfig.canHydrateTextInstance, Ib = $$$hostConfig.canHydrateSuspenseInstance, Jb = $$$hostConfig.isSuspenseInstancePending, Kb = $$$hostConfig.isSuspenseInstanceFallback, Lb = $$$hostConfig.getSuspenseInstanceFallbackErrorDetails, Mb = $$$hostConfig.registerSuspenseInstanceRetry, Nb = $$$hostConfig.getNextHydratableSibling, Ob = $$$hostConfig.getFirstHydratableChild, Pb = $$$hostConfig.getFirstHydratableChildWithinContainer, Qb = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance, Rb = $$$hostConfig.hydrateInstance, Sb = $$$hostConfig.hydrateTextInstance, Tb = $$$hostConfig.hydrateSuspenseInstance, Ub = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance, Vb = $$$hostConfig.commitHydratedContainer, Wb = $$$hostConfig.commitHydratedSuspenseInstance, Xb = $$$hostConfig.clearSuspenseBoundary, Yb = $$$hostConfig.clearSuspenseBoundaryFromContainer, Zb = $$$hostConfig.shouldDeleteUnhydratedTailInstances, $b = $$$hostConfig.didNotMatchHydratedContainerTextInstance, ac = $$$hostConfig.didNotMatchHydratedTextInstance, bc;
		function cc(a) {
			if (void 0 === bc) try {
				throw Error();
			} catch (c) {
				var b = c.stack.trim().match(/\n( *(at )?)/);
				bc = b && b[1] || "";
			}
			return "\n" + bc + a;
		}
		var dc = !1;
		function ec(a, b) {
			if (!a || dc) return "";
			dc = !0;
			var c = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				if (b) if (b = function() {
					throw Error();
				}, Object.defineProperty(b.prototype, "props", { set: function() {
					throw Error();
				} }), "object" === typeof Reflect && Reflect.construct) {
					try {
						Reflect.construct(b, []);
					} catch (l) {
						var d = l;
					}
					Reflect.construct(a, [], b);
				} else {
					try {
						b.call();
					} catch (l) {
						d = l;
					}
					a.call(b.prototype);
				}
				else {
					try {
						throw Error();
					} catch (l) {
						d = l;
					}
					a();
				}
			} catch (l) {
				if (l && d && "string" === typeof l.stack) {
					for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
					for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
						if (1 !== g || 1 !== h) do
							if (g--, h--, 0 > h || e[g] !== f[h]) {
								var k = "\n" + e[g].replace(" at new ", " at ");
								a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
								return k;
							}
						while (1 <= g && 0 <= h);
						break;
					}
				}
			} finally {
				dc = !1, Error.prepareStackTrace = c;
			}
			return (a = a ? a.displayName || a.name : "") ? cc(a) : "";
		}
		var fc = Object.prototype.hasOwnProperty, gc = [], hc = -1;
		function ic(a) {
			return { current: a };
		}
		function q(a) {
			0 > hc || (a.current = gc[hc], gc[hc] = null, hc--);
		}
		function v(a, b) {
			hc++;
			gc[hc] = a.current;
			a.current = b;
		}
		var jc = {}, x = ic(jc), z = ic(!1), kc = jc;
		function mc(a, b) {
			var c = a.type.contextTypes;
			if (!c) return jc;
			var d = a.stateNode;
			if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
			var e = {}, f;
			for (f in c) e[f] = b[f];
			d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
			return e;
		}
		function A(a) {
			a = a.childContextTypes;
			return null !== a && void 0 !== a;
		}
		function nc() {
			q(z);
			q(x);
		}
		function oc(a, b, c) {
			if (x.current !== jc) throw Error(n(168));
			v(x, b);
			v(z, c);
		}
		function pc(a, b, c) {
			var d = a.stateNode;
			b = b.childContextTypes;
			if ("function" !== typeof d.getChildContext) return c;
			d = d.getChildContext();
			for (var e in d) if (!(e in b)) throw Error(n(108, va(a) || "Unknown", e));
			return ca({}, c, d);
		}
		function qc(a) {
			a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || jc;
			kc = x.current;
			v(x, a);
			v(z, z.current);
			return !0;
		}
		function rc(a, b, c) {
			var d = a.stateNode;
			if (!d) throw Error(n(169));
			c ? (a = pc(a, b, kc), d.__reactInternalMemoizedMergedChildContext = a, q(z), q(x), v(x, a)) : q(z);
			v(z, c);
		}
		var tc = Math.clz32 ? Math.clz32 : sc, uc = Math.log, vc = Math.LN2;
		function sc(a) {
			a >>>= 0;
			return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
		}
		var wc = 64, xc = 4194304;
		function yc(a) {
			switch (a & -a) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return a & 4194240;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864: return a & 130023424;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 1073741824;
				default: return a;
			}
		}
		function zc(a, b) {
			var c = a.pendingLanes;
			if (0 === c) return 0;
			var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
			if (0 !== g) {
				var h = g & ~e;
				0 !== h ? d = yc(h) : (f &= g, 0 !== f && (d = yc(f)));
			} else g = c & ~e, 0 !== g ? d = yc(g) : 0 !== f && (d = yc(f));
			if (0 === d) return 0;
			if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
			0 !== (d & 4) && (d |= c & 16);
			b = a.entangledLanes;
			if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - tc(b), e = 1 << c, d |= a[c], b &= ~e;
			return d;
		}
		function Ac(a, b) {
			switch (a) {
				case 1:
				case 2:
				case 4: return b + 250;
				case 8:
				case 16:
				case 32:
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return b + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864: return -1;
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return -1;
			}
		}
		function Bc(a, b) {
			for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
				var g = 31 - tc(f), h = 1 << g, k = e[g];
				if (-1 === k) {
					if (0 === (h & c) || 0 !== (h & d)) e[g] = Ac(h, b);
				} else k <= b && (a.expiredLanes |= h);
				f &= ~h;
			}
		}
		function Cc(a) {
			a = a.pendingLanes & -1073741825;
			return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
		}
		function Dc() {
			var a = wc;
			wc <<= 1;
			0 === (wc & 4194240) && (wc = 64);
			return a;
		}
		function Ec(a) {
			for (var b = [], c = 0; 31 > c; c++) b.push(a);
			return b;
		}
		function Fc(a, b, c) {
			a.pendingLanes |= b;
			536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
			a = a.eventTimes;
			b = 31 - tc(b);
			a[b] = c;
		}
		function Gc(a, b) {
			var c = a.pendingLanes & ~b;
			a.pendingLanes = b;
			a.suspendedLanes = 0;
			a.pingedLanes = 0;
			a.expiredLanes &= b;
			a.mutableReadLanes &= b;
			a.entangledLanes &= b;
			b = a.entanglements;
			var d = a.eventTimes;
			for (a = a.expirationTimes; 0 < c;) {
				var e = 31 - tc(c), f = 1 << e;
				b[e] = 0;
				d[e] = -1;
				a[e] = -1;
				c &= ~f;
			}
		}
		function Hc(a, b) {
			var c = a.entangledLanes |= b;
			for (a = a.entanglements; c;) {
				var d = 31 - tc(c), e = 1 << d;
				e & b | a[d] & b && (a[d] |= b);
				c &= ~e;
			}
		}
		var C = 0;
		function Ic(a) {
			a &= -a;
			return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
		}
		var Jc = ba.unstable_scheduleCallback, Kc = ba.unstable_cancelCallback, Lc = ba.unstable_shouldYield, Mc = ba.unstable_requestPaint, D = ba.unstable_now, Nc = ba.unstable_ImmediatePriority, Oc = ba.unstable_UserBlockingPriority, Pc = ba.unstable_NormalPriority, Qc = ba.unstable_IdlePriority, Rc = null, Sc = null;
		function Tc(a) {
			if (Sc && "function" === typeof Sc.onCommitFiberRoot) try {
				Sc.onCommitFiberRoot(Rc, a, void 0, 128 === (a.current.flags & 128));
			} catch (b) {}
		}
		function Uc(a, b) {
			return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
		}
		var Vc = "function" === typeof Object.is ? Object.is : Uc, Wc = null, Xc = !1, Yc = !1;
		function Zc(a) {
			null === Wc ? Wc = [a] : Wc.push(a);
		}
		function $c(a) {
			Xc = !0;
			Zc(a);
		}
		function ad() {
			if (!Yc && null !== Wc) {
				Yc = !0;
				var a = 0, b = C;
				try {
					var c = Wc;
					for (C = 1; a < c.length; a++) {
						var d = c[a];
						do
							d = d(!0);
						while (null !== d);
					}
					Wc = null;
					Xc = !1;
				} catch (e) {
					throw null !== Wc && (Wc = Wc.slice(a + 1)), Jc(Nc, ad), e;
				} finally {
					C = b, Yc = !1;
				}
			}
			return null;
		}
		var bd = [], cd = 0, dd = null, ed = 0, fd = [], gd = 0, hd = null, id = 1, jd = "";
		function kd(a, b) {
			bd[cd++] = ed;
			bd[cd++] = dd;
			dd = a;
			ed = b;
		}
		function ld(a, b, c) {
			fd[gd++] = id;
			fd[gd++] = jd;
			fd[gd++] = hd;
			hd = a;
			var d = id;
			a = jd;
			var e = 32 - tc(d) - 1;
			d &= ~(1 << e);
			c += 1;
			var f = 32 - tc(b) + e;
			if (30 < f) {
				var g = e - e % 5;
				f = (d & (1 << g) - 1).toString(32);
				d >>= g;
				e -= g;
				id = 1 << 32 - tc(b) + e | c << e | d;
				jd = f + a;
			} else id = 1 << f | c << e | d, jd = a;
		}
		function md(a) {
			null !== a.return && (kd(a, 1), ld(a, 1, 0));
		}
		function nd(a) {
			for (; a === dd;) dd = bd[--cd], bd[cd] = null, ed = bd[--cd], bd[cd] = null;
			for (; a === hd;) hd = fd[--gd], fd[gd] = null, jd = fd[--gd], fd[gd] = null, id = fd[--gd], fd[gd] = null;
		}
		var od = null, pd = null, F = !1, qd = !1, rd = null;
		function sd(a, b) {
			var c = td(5, null, null, 0);
			c.elementType = "DELETED";
			c.stateNode = b;
			c.return = a;
			b = a.deletions;
			null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
		}
		function ud(a, b) {
			switch (a.tag) {
				case 5: return b = Gb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = Ob(b), !0) : !1;
				case 6: return b = Hb(b, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = null, !0) : !1;
				case 13:
					b = Ib(b);
					if (null !== b) {
						var c = null !== hd ? {
							id,
							overflow: jd
						} : null;
						a.memoizedState = {
							dehydrated: b,
							treeContext: c,
							retryLane: 1073741824
						};
						c = td(18, null, null, 0);
						c.stateNode = b;
						c.return = a;
						a.child = c;
						od = a;
						pd = null;
						return !0;
					}
					return !1;
				default: return !1;
			}
		}
		function vd(a) {
			return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
		}
		function wd(a) {
			if (F) {
				var b = pd;
				if (b) {
					var c = b;
					if (!ud(a, b)) {
						if (vd(a)) throw Error(n(418));
						b = Nb(c);
						var d = od;
						b && ud(a, b) ? sd(d, c) : (a.flags = a.flags & -4097 | 2, F = !1, od = a);
					}
				} else {
					if (vd(a)) throw Error(n(418));
					a.flags = a.flags & -4097 | 2;
					F = !1;
					od = a;
				}
			}
		}
		function xd(a) {
			for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
			od = a;
		}
		function yd(a) {
			if (!Va || a !== od) return !1;
			if (!F) return xd(a), F = !0, !1;
			if (3 !== a.tag && (5 !== a.tag || Zb(a.type) && !Na(a.type, a.memoizedProps))) {
				var b = pd;
				if (b) {
					if (vd(a)) throw zd(), Error(n(418));
					for (; b;) sd(a, b), b = Nb(b);
				}
			}
			xd(a);
			if (13 === a.tag) {
				if (!Va) throw Error(n(316));
				a = a.memoizedState;
				a = null !== a ? a.dehydrated : null;
				if (!a) throw Error(n(317));
				pd = Ub(a);
			} else pd = od ? Nb(a.stateNode) : null;
			return !0;
		}
		function zd() {
			for (var a = pd; a;) a = Nb(a);
		}
		function Ad() {
			Va && (pd = od = null, qd = F = !1);
		}
		function Bd(a) {
			null === rd ? rd = [a] : rd.push(a);
		}
		var Cd = da.ReactCurrentBatchConfig;
		function Dd(a, b) {
			if (Vc(a, b)) return !0;
			if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
			var c = Object.keys(a), d = Object.keys(b);
			if (c.length !== d.length) return !1;
			for (d = 0; d < c.length; d++) {
				var e = c[d];
				if (!fc.call(b, e) || !Vc(a[e], b[e])) return !1;
			}
			return !0;
		}
		function Ed(a) {
			switch (a.tag) {
				case 5: return cc(a.type);
				case 16: return cc("Lazy");
				case 13: return cc("Suspense");
				case 19: return cc("SuspenseList");
				case 0:
				case 2:
				case 15: return a = ec(a.type, !1), a;
				case 11: return a = ec(a.type.render, !1), a;
				case 1: return a = ec(a.type, !0), a;
				default: return "";
			}
		}
		function Fd(a, b, c) {
			a = c.ref;
			if (null !== a && "function" !== typeof a && "object" !== typeof a) {
				if (c._owner) {
					c = c._owner;
					if (c) {
						if (1 !== c.tag) throw Error(n(309));
						var d = c.stateNode;
					}
					if (!d) throw Error(n(147, a));
					var e = d, f = "" + a;
					if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
					b = function(a) {
						var b = e.refs;
						null === a ? delete b[f] : b[f] = a;
					};
					b._stringRef = f;
					return b;
				}
				if ("string" !== typeof a) throw Error(n(284));
				if (!c._owner) throw Error(n(290, a));
			}
			return a;
		}
		function Gd(a, b) {
			a = Object.prototype.toString.call(b);
			throw Error(n(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
		}
		function Hd(a) {
			var b = a._init;
			return b(a._payload);
		}
		function Id(a) {
			function b(b, c) {
				if (a) {
					var d = b.deletions;
					null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
				}
			}
			function c(c, d) {
				if (!a) return null;
				for (; null !== d;) b(c, d), d = d.sibling;
				return null;
			}
			function d(a, b) {
				for (a = /* @__PURE__ */ new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
				return a;
			}
			function e(a, b) {
				a = Jd(a, b);
				a.index = 0;
				a.sibling = null;
				return a;
			}
			function f(b, c, d) {
				b.index = d;
				if (!a) return b.flags |= 1048576, c;
				d = b.alternate;
				if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
				b.flags |= 2;
				return c;
			}
			function g(b) {
				a && null === b.alternate && (b.flags |= 2);
				return b;
			}
			function h(a, b, c, d) {
				if (null === b || 6 !== b.tag) return b = Kd(c, a.mode, d), b.return = a, b;
				b = e(b, c);
				b.return = a;
				return b;
			}
			function k(a, b, c, d) {
				var f = c.type;
				if (f === ha) return m(a, b, c.props.children, d, c.key);
				if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === qa && Hd(f) === b.type)) return d = e(b, c.props), d.ref = Fd(a, b, c), d.return = a, d;
				d = Ld(c.type, c.key, c.props, null, a.mode, d);
				d.ref = Fd(a, b, c);
				d.return = a;
				return d;
			}
			function l(a, b, c, d) {
				if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Md(c, a.mode, d), b.return = a, b;
				b = e(b, c.children || []);
				b.return = a;
				return b;
			}
			function m(a, b, c, d, f) {
				if (null === b || 7 !== b.tag) return b = Nd(c, a.mode, d, f), b.return = a, b;
				b = e(b, c);
				b.return = a;
				return b;
			}
			function r(a, b, c) {
				if ("string" === typeof b && "" !== b || "number" === typeof b) return b = Kd("" + b, a.mode, c), b.return = a, b;
				if ("object" === typeof b && null !== b) {
					switch (b.$$typeof) {
						case ea: return c = Ld(b.type, b.key, b.props, null, a.mode, c), c.ref = Fd(a, null, b), c.return = a, c;
						case fa: return b = Md(b, a.mode, c), b.return = a, b;
						case qa:
							var d = b._init;
							return r(a, d(b._payload), c);
					}
					if (Da(b) || ta(b)) return b = Nd(b, a.mode, c, null), b.return = a, b;
					Gd(a, b);
				}
				return null;
			}
			function p(a, b, c, d) {
				var e = null !== b ? b.key : null;
				if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
				if ("object" === typeof c && null !== c) {
					switch (c.$$typeof) {
						case ea: return c.key === e ? k(a, b, c, d) : null;
						case fa: return c.key === e ? l(a, b, c, d) : null;
						case qa: return e = c._init, p(a, b, e(c._payload), d);
					}
					if (Da(c) || ta(c)) return null !== e ? null : m(a, b, c, d, null);
					Gd(a, c);
				}
				return null;
			}
			function B(a, b, c, d, e) {
				if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
				if ("object" === typeof d && null !== d) {
					switch (d.$$typeof) {
						case ea: return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
						case fa: return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
						case qa:
							var f = d._init;
							return B(a, b, c, f(d._payload), e);
					}
					if (Da(d) || ta(d)) return a = a.get(c) || null, m(b, a, d, e, null);
					Gd(b, d);
				}
				return null;
			}
			function w(e, g, h, k) {
				for (var l = null, m = null, u = g, t = g = 0, E = null; null !== u && t < h.length; t++) {
					u.index > t ? (E = u, u = null) : E = u.sibling;
					var y = p(e, u, h[t], k);
					if (null === y) {
						null === u && (u = E);
						break;
					}
					a && u && null === y.alternate && b(e, u);
					g = f(y, g, t);
					null === m ? l = y : m.sibling = y;
					m = y;
					u = E;
				}
				if (t === h.length) return c(e, u), F && kd(e, t), l;
				if (null === u) {
					for (; t < h.length; t++) u = r(e, h[t], k), null !== u && (g = f(u, g, t), null === m ? l = u : m.sibling = u, m = u);
					F && kd(e, t);
					return l;
				}
				for (u = d(e, u); t < h.length; t++) E = B(u, e, t, h[t], k), null !== E && (a && null !== E.alternate && u.delete(null === E.key ? t : E.key), g = f(E, g, t), null === m ? l = E : m.sibling = E, m = E);
				a && u.forEach(function(a) {
					return b(e, a);
				});
				F && kd(e, t);
				return l;
			}
			function Y(e, g, h, k) {
				var l = ta(h);
				if ("function" !== typeof l) throw Error(n(150));
				h = l.call(h);
				if (null == h) throw Error(n(151));
				for (var u = l = null, m = g, t = g = 0, E = null, y = h.next(); null !== m && !y.done; t++, y = h.next()) {
					m.index > t ? (E = m, m = null) : E = m.sibling;
					var w = p(e, m, y.value, k);
					if (null === w) {
						null === m && (m = E);
						break;
					}
					a && m && null === w.alternate && b(e, m);
					g = f(w, g, t);
					null === u ? l = w : u.sibling = w;
					u = w;
					m = E;
				}
				if (y.done) return c(e, m), F && kd(e, t), l;
				if (null === m) {
					for (; !y.done; t++, y = h.next()) y = r(e, y.value, k), null !== y && (g = f(y, g, t), null === u ? l = y : u.sibling = y, u = y);
					F && kd(e, t);
					return l;
				}
				for (m = d(e, m); !y.done; t++, y = h.next()) y = B(m, e, t, y.value, k), null !== y && (a && null !== y.alternate && m.delete(null === y.key ? t : y.key), g = f(y, g, t), null === u ? l = y : u.sibling = y, u = y);
				a && m.forEach(function(a) {
					return b(e, a);
				});
				F && kd(e, t);
				return l;
			}
			function ya(a, d, f, h) {
				"object" === typeof f && null !== f && f.type === ha && null === f.key && (f = f.props.children);
				if ("object" === typeof f && null !== f) {
					switch (f.$$typeof) {
						case ea:
							a: {
								for (var k = f.key, l = d; null !== l;) {
									if (l.key === k) {
										k = f.type;
										if (k === ha) {
											if (7 === l.tag) {
												c(a, l.sibling);
												d = e(l, f.props.children);
												d.return = a;
												a = d;
												break a;
											}
										} else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === qa && Hd(k) === l.type) {
											c(a, l.sibling);
											d = e(l, f.props);
											d.ref = Fd(a, l, f);
											d.return = a;
											a = d;
											break a;
										}
										c(a, l);
										break;
									} else b(a, l);
									l = l.sibling;
								}
								f.type === ha ? (d = Nd(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Ld(f.type, f.key, f.props, null, a.mode, h), h.ref = Fd(a, d, f), h.return = a, a = h);
							}
							return g(a);
						case fa:
							a: {
								for (l = f.key; null !== d;) {
									if (d.key === l) if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
										c(a, d.sibling);
										d = e(d, f.children || []);
										d.return = a;
										a = d;
										break a;
									} else {
										c(a, d);
										break;
									}
									else b(a, d);
									d = d.sibling;
								}
								d = Md(f, a.mode, h);
								d.return = a;
								a = d;
							}
							return g(a);
						case qa: return l = f._init, ya(a, d, l(f._payload), h);
					}
					if (Da(f)) return w(a, d, f, h);
					if (ta(f)) return Y(a, d, f, h);
					Gd(a, f);
				}
				return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Kd(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
			}
			return ya;
		}
		var Od = Id(!0), Pd = Id(!1), Qd = ic(null), Rd = null, Sd = null, Td = null;
		function Ud() {
			Td = Sd = Rd = null;
		}
		function Vd(a, b, c) {
			Sa ? (v(Qd, b._currentValue), b._currentValue = c) : (v(Qd, b._currentValue2), b._currentValue2 = c);
		}
		function Wd(a) {
			var b = Qd.current;
			q(Qd);
			Sa ? a._currentValue = b : a._currentValue2 = b;
		}
		function Xd(a, b, c) {
			for (; null !== a;) {
				var d = a.alternate;
				(a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
				if (a === c) break;
				a = a.return;
			}
		}
		function Yd(a, b) {
			Rd = a;
			Td = Sd = null;
			a = a.dependencies;
			null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (G = !0), a.firstContext = null);
		}
		function Zd(a) {
			var b = Sa ? a._currentValue : a._currentValue2;
			if (Td !== a) if (a = {
				context: a,
				memoizedValue: b,
				next: null
			}, null === Sd) {
				if (null === Rd) throw Error(n(308));
				Sd = a;
				Rd.dependencies = {
					lanes: 0,
					firstContext: a
				};
			} else Sd = Sd.next = a;
			return b;
		}
		var $d = null;
		function ae(a) {
			null === $d ? $d = [a] : $d.push(a);
		}
		function be(a, b, c, d) {
			var e = b.interleaved;
			null === e ? (c.next = c, ae(b)) : (c.next = e.next, e.next = c);
			b.interleaved = c;
			return ce(a, d);
		}
		function ce(a, b) {
			a.lanes |= b;
			var c = a.alternate;
			null !== c && (c.lanes |= b);
			c = a;
			for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
			return 3 === c.tag ? c.stateNode : null;
		}
		var de = !1;
		function ee(a) {
			a.updateQueue = {
				baseState: a.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					interleaved: null,
					lanes: 0
				},
				effects: null
			};
		}
		function fe(a, b) {
			a = a.updateQueue;
			b.updateQueue === a && (b.updateQueue = {
				baseState: a.baseState,
				firstBaseUpdate: a.firstBaseUpdate,
				lastBaseUpdate: a.lastBaseUpdate,
				shared: a.shared,
				effects: a.effects
			});
		}
		function ge(a, b) {
			return {
				eventTime: a,
				lane: b,
				tag: 0,
				payload: null,
				callback: null,
				next: null
			};
		}
		function he(a, b, c) {
			var d = a.updateQueue;
			if (null === d) return null;
			d = d.shared;
			if (0 !== (H & 2)) {
				var e = d.pending;
				null === e ? b.next = b : (b.next = e.next, e.next = b);
				d.pending = b;
				return ce(a, c);
			}
			e = d.interleaved;
			null === e ? (b.next = b, ae(d)) : (b.next = e.next, e.next = b);
			d.interleaved = b;
			return ce(a, c);
		}
		function ie(a, b, c) {
			b = b.updateQueue;
			if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
				var d = b.lanes;
				d &= a.pendingLanes;
				c |= d;
				b.lanes = c;
				Hc(a, c);
			}
		}
		function je(a, b) {
			var c = a.updateQueue, d = a.alternate;
			if (null !== d && (d = d.updateQueue, c === d)) {
				var e = null, f = null;
				c = c.firstBaseUpdate;
				if (null !== c) {
					do {
						var g = {
							eventTime: c.eventTime,
							lane: c.lane,
							tag: c.tag,
							payload: c.payload,
							callback: c.callback,
							next: null
						};
						null === f ? e = f = g : f = f.next = g;
						c = c.next;
					} while (null !== c);
					null === f ? e = f = b : f = f.next = b;
				} else e = f = b;
				c = {
					baseState: d.baseState,
					firstBaseUpdate: e,
					lastBaseUpdate: f,
					shared: d.shared,
					effects: d.effects
				};
				a.updateQueue = c;
				return;
			}
			a = c.lastBaseUpdate;
			null === a ? c.firstBaseUpdate = b : a.next = b;
			c.lastBaseUpdate = b;
		}
		function ke(a, b, c, d) {
			var e = a.updateQueue;
			de = !1;
			var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
			if (null !== h) {
				e.shared.pending = null;
				var k = h, l = k.next;
				k.next = null;
				null === g ? f = l : g.next = l;
				g = k;
				var m = a.alternate;
				null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
			}
			if (null !== f) {
				var r = e.baseState;
				g = 0;
				m = l = k = null;
				h = f;
				do {
					var p = h.lane, B = h.eventTime;
					if ((d & p) === p) {
						null !== m && (m = m.next = {
							eventTime: B,
							lane: 0,
							tag: h.tag,
							payload: h.payload,
							callback: h.callback,
							next: null
						});
						a: {
							var w = a, Y = h;
							p = b;
							B = c;
							switch (Y.tag) {
								case 1:
									w = Y.payload;
									if ("function" === typeof w) {
										r = w.call(B, r, p);
										break a;
									}
									r = w;
									break a;
								case 3: w.flags = w.flags & -65537 | 128;
								case 0:
									w = Y.payload;
									p = "function" === typeof w ? w.call(B, r, p) : w;
									if (null === p || void 0 === p) break a;
									r = ca({}, r, p);
									break a;
								case 2: de = !0;
							}
						}
						null !== h.callback && 0 !== h.lane && (a.flags |= 64, p = e.effects, null === p ? e.effects = [h] : p.push(h));
					} else B = {
						eventTime: B,
						lane: p,
						tag: h.tag,
						payload: h.payload,
						callback: h.callback,
						next: null
					}, null === m ? (l = m = B, k = r) : m = m.next = B, g |= p;
					h = h.next;
					if (null === h) if (h = e.shared.pending, null === h) break;
					else p = h, h = p.next, p.next = null, e.lastBaseUpdate = p, e.shared.pending = null;
				} while (1);
				null === m && (k = r);
				e.baseState = k;
				e.firstBaseUpdate = l;
				e.lastBaseUpdate = m;
				b = e.shared.interleaved;
				if (null !== b) {
					e = b;
					do
						g |= e.lane, e = e.next;
					while (e !== b);
				} else null === f && (e.shared.lanes = 0);
				le |= g;
				a.lanes = g;
				a.memoizedState = r;
			}
		}
		function me(a, b, c) {
			a = b.effects;
			b.effects = null;
			if (null !== a) for (b = 0; b < a.length; b++) {
				var d = a[b], e = d.callback;
				if (null !== e) {
					d.callback = null;
					d = c;
					if ("function" !== typeof e) throw Error(n(191, e));
					e.call(d);
				}
			}
		}
		var ne = {}, oe = ic(ne), pe = ic(ne), qe = ic(ne);
		function re(a) {
			if (a === ne) throw Error(n(174));
			return a;
		}
		function se(a, b) {
			v(qe, b);
			v(pe, a);
			v(oe, ne);
			a = Fa(b);
			q(oe);
			v(oe, a);
		}
		function te() {
			q(oe);
			q(pe);
			q(qe);
		}
		function ue(a) {
			var b = re(qe.current), c = re(oe.current);
			b = Ga(c, a.type, b);
			c !== b && (v(pe, a), v(oe, b));
		}
		function ve(a) {
			pe.current === a && (q(oe), q(pe));
		}
		var I = ic(0);
		function we(a) {
			for (var b = a; null !== b;) {
				if (13 === b.tag) {
					var c = b.memoizedState;
					if (null !== c && (c = c.dehydrated, null === c || Jb(c) || Kb(c))) return b;
				} else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
					if (0 !== (b.flags & 128)) return b;
				} else if (null !== b.child) {
					b.child.return = b;
					b = b.child;
					continue;
				}
				if (b === a) break;
				for (; null === b.sibling;) {
					if (null === b.return || b.return === a) return null;
					b = b.return;
				}
				b.sibling.return = b.return;
				b = b.sibling;
			}
			return null;
		}
		var xe = [];
		function ye() {
			for (var a = 0; a < xe.length; a++) {
				var b = xe[a];
				Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
			}
			xe.length = 0;
		}
		var ze = da.ReactCurrentDispatcher, Ae = da.ReactCurrentBatchConfig, Be = 0, J = null, K = null, L = null, Ce = !1, De = !1, Ee = 0, Fe = 0;
		function M() {
			throw Error(n(321));
		}
		function Ge(a, b) {
			if (null === b) return !1;
			for (var c = 0; c < b.length && c < a.length; c++) if (!Vc(a[c], b[c])) return !1;
			return !0;
		}
		function He(a, b, c, d, e, f) {
			Be = f;
			J = b;
			b.memoizedState = null;
			b.updateQueue = null;
			b.lanes = 0;
			ze.current = null === a || null === a.memoizedState ? Ie : Je;
			a = c(d, e);
			if (De) {
				f = 0;
				do {
					De = !1;
					Ee = 0;
					if (25 <= f) throw Error(n(301));
					f += 1;
					L = K = null;
					b.updateQueue = null;
					ze.current = Ke;
					a = c(d, e);
				} while (De);
			}
			ze.current = Le;
			b = null !== K && null !== K.next;
			Be = 0;
			L = K = J = null;
			Ce = !1;
			if (b) throw Error(n(300));
			return a;
		}
		function Me() {
			var a = 0 !== Ee;
			Ee = 0;
			return a;
		}
		function Ne() {
			var a = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			null === L ? J.memoizedState = L = a : L = L.next = a;
			return L;
		}
		function Oe() {
			if (null === K) {
				var a = J.alternate;
				a = null !== a ? a.memoizedState : null;
			} else a = K.next;
			var b = null === L ? J.memoizedState : L.next;
			if (null !== b) L = b, K = a;
			else {
				if (null === a) throw Error(n(310));
				K = a;
				a = {
					memoizedState: K.memoizedState,
					baseState: K.baseState,
					baseQueue: K.baseQueue,
					queue: K.queue,
					next: null
				};
				null === L ? J.memoizedState = L = a : L = L.next = a;
			}
			return L;
		}
		function Pe(a, b) {
			return "function" === typeof b ? b(a) : b;
		}
		function Qe(a) {
			var b = Oe(), c = b.queue;
			if (null === c) throw Error(n(311));
			c.lastRenderedReducer = a;
			var d = K, e = d.baseQueue, f = c.pending;
			if (null !== f) {
				if (null !== e) {
					var g = e.next;
					e.next = f.next;
					f.next = g;
				}
				d.baseQueue = e = f;
				c.pending = null;
			}
			if (null !== e) {
				f = e.next;
				d = d.baseState;
				var h = g = null, k = null, l = f;
				do {
					var m = l.lane;
					if ((Be & m) === m) null !== k && (k = k.next = {
						lane: 0,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}), d = l.hasEagerState ? l.eagerState : a(d, l.action);
					else {
						var r = {
							lane: m,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						};
						null === k ? (h = k = r, g = d) : k = k.next = r;
						J.lanes |= m;
						le |= m;
					}
					l = l.next;
				} while (null !== l && l !== f);
				null === k ? g = d : k.next = h;
				Vc(d, b.memoizedState) || (G = !0);
				b.memoizedState = d;
				b.baseState = g;
				b.baseQueue = k;
				c.lastRenderedState = d;
			}
			a = c.interleaved;
			if (null !== a) {
				e = a;
				do
					f = e.lane, J.lanes |= f, le |= f, e = e.next;
				while (e !== a);
			} else null === e && (c.lanes = 0);
			return [b.memoizedState, c.dispatch];
		}
		function Re(a) {
			var b = Oe(), c = b.queue;
			if (null === c) throw Error(n(311));
			c.lastRenderedReducer = a;
			var d = c.dispatch, e = c.pending, f = b.memoizedState;
			if (null !== e) {
				c.pending = null;
				var g = e = e.next;
				do
					f = a(f, g.action), g = g.next;
				while (g !== e);
				Vc(f, b.memoizedState) || (G = !0);
				b.memoizedState = f;
				null === b.baseQueue && (b.baseState = f);
				c.lastRenderedState = f;
			}
			return [f, d];
		}
		function Se() {}
		function Te(a, b) {
			var c = J, d = Oe(), e = b(), f = !Vc(d.memoizedState, e);
			f && (d.memoizedState = e, G = !0);
			d = d.queue;
			Ue(Ve.bind(null, c, d, a), [a]);
			if (d.getSnapshot !== b || f || null !== L && L.memoizedState.tag & 1) {
				c.flags |= 2048;
				We(9, Xe.bind(null, c, d, e, b), void 0, null);
				if (null === N) throw Error(n(349));
				0 !== (Be & 30) || Ye(c, b, e);
			}
			return e;
		}
		function Ye(a, b, c) {
			a.flags |= 16384;
			a = {
				getSnapshot: b,
				value: c
			};
			b = J.updateQueue;
			null === b ? (b = {
				lastEffect: null,
				stores: null
			}, J.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
		}
		function Xe(a, b, c, d) {
			b.value = c;
			b.getSnapshot = d;
			Ze(b) && $e(a);
		}
		function Ve(a, b, c) {
			return c(function() {
				Ze(b) && $e(a);
			});
		}
		function Ze(a) {
			var b = a.getSnapshot;
			a = a.value;
			try {
				var c = b();
				return !Vc(a, c);
			} catch (d) {
				return !0;
			}
		}
		function $e(a) {
			var b = ce(a, 1);
			null !== b && af(b, a, 1, -1);
		}
		function bf(a) {
			var b = Ne();
			"function" === typeof a && (a = a());
			b.memoizedState = b.baseState = a;
			a = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Pe,
				lastRenderedState: a
			};
			b.queue = a;
			a = a.dispatch = cf.bind(null, J, a);
			return [b.memoizedState, a];
		}
		function We(a, b, c, d) {
			a = {
				tag: a,
				create: b,
				destroy: c,
				deps: d,
				next: null
			};
			b = J.updateQueue;
			null === b ? (b = {
				lastEffect: null,
				stores: null
			}, J.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
			return a;
		}
		function df() {
			return Oe().memoizedState;
		}
		function ef(a, b, c, d) {
			var e = Ne();
			J.flags |= a;
			e.memoizedState = We(1 | b, c, void 0, void 0 === d ? null : d);
		}
		function ff(a, b, c, d) {
			var e = Oe();
			d = void 0 === d ? null : d;
			var f = void 0;
			if (null !== K) {
				var g = K.memoizedState;
				f = g.destroy;
				if (null !== d && Ge(d, g.deps)) {
					e.memoizedState = We(b, c, f, d);
					return;
				}
			}
			J.flags |= a;
			e.memoizedState = We(1 | b, c, f, d);
		}
		function gf(a, b) {
			return ef(8390656, 8, a, b);
		}
		function Ue(a, b) {
			return ff(2048, 8, a, b);
		}
		function hf(a, b) {
			return ff(4, 2, a, b);
		}
		function jf(a, b) {
			return ff(4, 4, a, b);
		}
		function kf(a, b) {
			if ("function" === typeof b) return a = a(), b(a), function() {
				b(null);
			};
			if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
				b.current = null;
			};
		}
		function lf(a, b, c) {
			c = null !== c && void 0 !== c ? c.concat([a]) : null;
			return ff(4, 4, kf.bind(null, b, a), c);
		}
		function mf() {}
		function nf(a, b) {
			var c = Oe();
			b = void 0 === b ? null : b;
			var d = c.memoizedState;
			if (null !== d && null !== b && Ge(b, d[1])) return d[0];
			c.memoizedState = [a, b];
			return a;
		}
		function of(a, b) {
			var c = Oe();
			b = void 0 === b ? null : b;
			var d = c.memoizedState;
			if (null !== d && null !== b && Ge(b, d[1])) return d[0];
			a = a();
			c.memoizedState = [a, b];
			return a;
		}
		function pf(a, b, c) {
			if (0 === (Be & 21)) return a.baseState && (a.baseState = !1, G = !0), a.memoizedState = c;
			Vc(c, b) || (c = Dc(), J.lanes |= c, le |= c, a.baseState = !0);
			return b;
		}
		function qf(a, b) {
			var c = C;
			C = 0 !== c && 4 > c ? c : 4;
			a(!0);
			var d = Ae.transition;
			Ae.transition = {};
			try {
				a(!1), b();
			} finally {
				C = c, Ae.transition = d;
			}
		}
		function rf() {
			return Oe().memoizedState;
		}
		function sf(a, b, c) {
			var d = tf(a);
			c = {
				lane: d,
				action: c,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (uf(a)) vf(b, c);
			else if (c = be(a, b, c, d), null !== c) {
				var e = O();
				af(c, a, d, e);
				wf(c, b, d);
			}
		}
		function cf(a, b, c) {
			var d = tf(a), e = {
				lane: d,
				action: c,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (uf(a)) vf(b, e);
			else {
				var f = a.alternate;
				if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
					var g = b.lastRenderedState, h = f(g, c);
					e.hasEagerState = !0;
					e.eagerState = h;
					if (Vc(h, g)) {
						var k = b.interleaved;
						null === k ? (e.next = e, ae(b)) : (e.next = k.next, k.next = e);
						b.interleaved = e;
						return;
					}
				} catch (l) {}
				c = be(a, b, e, d);
				null !== c && (e = O(), af(c, a, d, e), wf(c, b, d));
			}
		}
		function uf(a) {
			var b = a.alternate;
			return a === J || null !== b && b === J;
		}
		function vf(a, b) {
			De = Ce = !0;
			var c = a.pending;
			null === c ? b.next = b : (b.next = c.next, c.next = b);
			a.pending = b;
		}
		function wf(a, b, c) {
			if (0 !== (c & 4194240)) {
				var d = b.lanes;
				d &= a.pendingLanes;
				c |= d;
				b.lanes = c;
				Hc(a, c);
			}
		}
		var Le = {
			readContext: Zd,
			useCallback: M,
			useContext: M,
			useEffect: M,
			useImperativeHandle: M,
			useInsertionEffect: M,
			useLayoutEffect: M,
			useMemo: M,
			useReducer: M,
			useRef: M,
			useState: M,
			useDebugValue: M,
			useDeferredValue: M,
			useTransition: M,
			useMutableSource: M,
			useSyncExternalStore: M,
			useId: M,
			unstable_isNewReconciler: !1
		}, Ie = {
			readContext: Zd,
			useCallback: function(a, b) {
				Ne().memoizedState = [a, void 0 === b ? null : b];
				return a;
			},
			useContext: Zd,
			useEffect: gf,
			useImperativeHandle: function(a, b, c) {
				c = null !== c && void 0 !== c ? c.concat([a]) : null;
				return ef(4194308, 4, kf.bind(null, b, a), c);
			},
			useLayoutEffect: function(a, b) {
				return ef(4194308, 4, a, b);
			},
			useInsertionEffect: function(a, b) {
				return ef(4, 2, a, b);
			},
			useMemo: function(a, b) {
				var c = Ne();
				b = void 0 === b ? null : b;
				a = a();
				c.memoizedState = [a, b];
				return a;
			},
			useReducer: function(a, b, c) {
				var d = Ne();
				b = void 0 !== c ? c(b) : b;
				d.memoizedState = d.baseState = b;
				a = {
					pending: null,
					interleaved: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: a,
					lastRenderedState: b
				};
				d.queue = a;
				a = a.dispatch = sf.bind(null, J, a);
				return [d.memoizedState, a];
			},
			useRef: function(a) {
				var b = Ne();
				a = { current: a };
				return b.memoizedState = a;
			},
			useState: bf,
			useDebugValue: mf,
			useDeferredValue: function(a) {
				return Ne().memoizedState = a;
			},
			useTransition: function() {
				var a = bf(!1), b = a[0];
				a = qf.bind(null, a[1]);
				Ne().memoizedState = a;
				return [b, a];
			},
			useMutableSource: function() {},
			useSyncExternalStore: function(a, b, c) {
				var d = J, e = Ne();
				if (F) {
					if (void 0 === c) throw Error(n(407));
					c = c();
				} else {
					c = b();
					if (null === N) throw Error(n(349));
					0 !== (Be & 30) || Ye(d, b, c);
				}
				e.memoizedState = c;
				var f = {
					value: c,
					getSnapshot: b
				};
				e.queue = f;
				gf(Ve.bind(null, d, f, a), [a]);
				d.flags |= 2048;
				We(9, Xe.bind(null, d, f, c, b), void 0, null);
				return c;
			},
			useId: function() {
				var a = Ne(), b = N.identifierPrefix;
				if (F) {
					var c = jd;
					var d = id;
					c = (d & ~(1 << 32 - tc(d) - 1)).toString(32) + c;
					b = ":" + b + "R" + c;
					c = Ee++;
					0 < c && (b += "H" + c.toString(32));
					b += ":";
				} else c = Fe++, b = ":" + b + "r" + c.toString(32) + ":";
				return a.memoizedState = b;
			},
			unstable_isNewReconciler: !1
		}, Je = {
			readContext: Zd,
			useCallback: nf,
			useContext: Zd,
			useEffect: Ue,
			useImperativeHandle: lf,
			useInsertionEffect: hf,
			useLayoutEffect: jf,
			useMemo: of,
			useReducer: Qe,
			useRef: df,
			useState: function() {
				return Qe(Pe);
			},
			useDebugValue: mf,
			useDeferredValue: function(a) {
				return pf(Oe(), K.memoizedState, a);
			},
			useTransition: function() {
				return [Qe(Pe)[0], Oe().memoizedState];
			},
			useMutableSource: Se,
			useSyncExternalStore: Te,
			useId: rf,
			unstable_isNewReconciler: !1
		}, Ke = {
			readContext: Zd,
			useCallback: nf,
			useContext: Zd,
			useEffect: Ue,
			useImperativeHandle: lf,
			useInsertionEffect: hf,
			useLayoutEffect: jf,
			useMemo: of,
			useReducer: Re,
			useRef: df,
			useState: function() {
				return Re(Pe);
			},
			useDebugValue: mf,
			useDeferredValue: function(a) {
				var b = Oe();
				return null === K ? b.memoizedState = a : pf(b, K.memoizedState, a);
			},
			useTransition: function() {
				return [Re(Pe)[0], Oe().memoizedState];
			},
			useMutableSource: Se,
			useSyncExternalStore: Te,
			useId: rf,
			unstable_isNewReconciler: !1
		};
		function xf(a, b) {
			if (a && a.defaultProps) {
				b = ca({}, b);
				a = a.defaultProps;
				for (var c in a) void 0 === b[c] && (b[c] = a[c]);
				return b;
			}
			return b;
		}
		function yf(a, b, c, d) {
			b = a.memoizedState;
			c = c(d, b);
			c = null === c || void 0 === c ? b : ca({}, b, c);
			a.memoizedState = c;
			0 === a.lanes && (a.updateQueue.baseState = c);
		}
		var zf = {
			isMounted: function(a) {
				return (a = a._reactInternals) ? wa(a) === a : !1;
			},
			enqueueSetState: function(a, b, c) {
				a = a._reactInternals;
				var d = O(), e = tf(a), f = ge(d, e);
				f.payload = b;
				void 0 !== c && null !== c && (f.callback = c);
				b = he(a, f, e);
				null !== b && (af(b, a, e, d), ie(b, a, e));
			},
			enqueueReplaceState: function(a, b, c) {
				a = a._reactInternals;
				var d = O(), e = tf(a), f = ge(d, e);
				f.tag = 1;
				f.payload = b;
				void 0 !== c && null !== c && (f.callback = c);
				b = he(a, f, e);
				null !== b && (af(b, a, e, d), ie(b, a, e));
			},
			enqueueForceUpdate: function(a, b) {
				a = a._reactInternals;
				var c = O(), d = tf(a), e = ge(c, d);
				e.tag = 2;
				void 0 !== b && null !== b && (e.callback = b);
				b = he(a, e, d);
				null !== b && (af(b, a, d, c), ie(b, a, d));
			}
		};
		function Af(a, b, c, d, e, f, g) {
			a = a.stateNode;
			return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Dd(c, d) || !Dd(e, f) : !0;
		}
		function Bf(a, b, c) {
			var d = !1, e = jc;
			var f = b.contextType;
			"object" === typeof f && null !== f ? f = Zd(f) : (e = A(b) ? kc : x.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? mc(a, e) : jc);
			b = new b(c, f);
			a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
			b.updater = zf;
			a.stateNode = b;
			b._reactInternals = a;
			d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
			return b;
		}
		function Cf(a, b, c, d) {
			a = b.state;
			"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
			"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
			b.state !== a && zf.enqueueReplaceState(b, b.state, null);
		}
		function Df(a, b, c, d) {
			var e = a.stateNode;
			e.props = c;
			e.state = a.memoizedState;
			e.refs = {};
			ee(a);
			var f = b.contextType;
			"object" === typeof f && null !== f ? e.context = Zd(f) : (f = A(b) ? kc : x.current, e.context = mc(a, f));
			e.state = a.memoizedState;
			f = b.getDerivedStateFromProps;
			"function" === typeof f && (yf(a, b, f, c), e.state = a.memoizedState);
			"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && zf.enqueueReplaceState(e, e.state, null), ke(a, c, e, d), e.state = a.memoizedState);
			"function" === typeof e.componentDidMount && (a.flags |= 4194308);
		}
		function Ef(a, b) {
			try {
				var c = "", d = b;
				do
					c += Ed(d), d = d.return;
				while (d);
				var e = c;
			} catch (f) {
				e = "\nError generating stack: " + f.message + "\n" + f.stack;
			}
			return {
				value: a,
				source: b,
				stack: e,
				digest: null
			};
		}
		function Ff(a, b, c) {
			return {
				value: a,
				source: null,
				stack: null != c ? c : null,
				digest: null != b ? b : null
			};
		}
		function Gf(a, b) {
			try {
				console.error(b.value);
			} catch (c) {
				setTimeout(function() {
					throw c;
				});
			}
		}
		var Hf = "function" === typeof WeakMap ? WeakMap : Map;
		function If(a, b, c) {
			c = ge(-1, c);
			c.tag = 3;
			c.payload = { element: null };
			var d = b.value;
			c.callback = function() {
				Jf || (Jf = !0, Kf = d);
				Gf(a, b);
			};
			return c;
		}
		function Lf(a, b, c) {
			c = ge(-1, c);
			c.tag = 3;
			var d = a.type.getDerivedStateFromError;
			if ("function" === typeof d) {
				var e = b.value;
				c.payload = function() {
					return d(e);
				};
				c.callback = function() {
					Gf(a, b);
				};
			}
			var f = a.stateNode;
			null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
				Gf(a, b);
				"function" !== typeof d && (null === Mf ? Mf = new Set([this]) : Mf.add(this));
				var c = b.stack;
				this.componentDidCatch(b.value, { componentStack: null !== c ? c : "" });
			});
			return c;
		}
		function Nf(a, b, c) {
			var d = a.pingCache;
			if (null === d) {
				d = a.pingCache = new Hf();
				var e = /* @__PURE__ */ new Set();
				d.set(b, e);
			} else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
			e.has(c) || (e.add(c), a = Of.bind(null, a, b, c), b.then(a, a));
		}
		function Pf(a) {
			do {
				var b;
				if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
				if (b) return a;
				a = a.return;
			} while (null !== a);
			return null;
		}
		function Qf(a, b, c, d, e) {
			if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ge(-1, 1), b.tag = 2, he(c, b, 1))), c.lanes |= 1), a;
			a.flags |= 65536;
			a.lanes = e;
			return a;
		}
		var Rf = da.ReactCurrentOwner, G = !1;
		function P(a, b, c, d) {
			b.child = null === a ? Pd(b, null, c, d) : Od(b, a.child, c, d);
		}
		function Sf(a, b, c, d, e) {
			c = c.render;
			var f = b.ref;
			Yd(b, e);
			d = He(a, b, c, d, f, e);
			c = Me();
			if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Tf(a, b, e);
			F && c && md(b);
			b.flags |= 1;
			P(a, b, d, e);
			return b.child;
		}
		function Uf(a, b, c, d, e) {
			if (null === a) {
				var f = c.type;
				if ("function" === typeof f && !Vf(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, Wf(a, b, f, d, e);
				a = Ld(c.type, null, d, b, b.mode, e);
				a.ref = b.ref;
				a.return = b;
				return b.child = a;
			}
			f = a.child;
			if (0 === (a.lanes & e)) {
				var g = f.memoizedProps;
				c = c.compare;
				c = null !== c ? c : Dd;
				if (c(g, d) && a.ref === b.ref) return Tf(a, b, e);
			}
			b.flags |= 1;
			a = Jd(f, d);
			a.ref = b.ref;
			a.return = b;
			return b.child = a;
		}
		function Wf(a, b, c, d, e) {
			if (null !== a) {
				var f = a.memoizedProps;
				if (Dd(f, d) && a.ref === b.ref) if (G = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (G = !0);
				else return b.lanes = a.lanes, Tf(a, b, e);
			}
			return Xf(a, b, c, d, e);
		}
		function Yf(a, b, c) {
			var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
			if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, v(Zf, $f), $f |= c;
			else {
				if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
					baseLanes: a,
					cachePool: null,
					transitions: null
				}, b.updateQueue = null, v(Zf, $f), $f |= a, null;
				b.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				};
				d = null !== f ? f.baseLanes : c;
				v(Zf, $f);
				$f |= d;
			}
			else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, v(Zf, $f), $f |= d;
			P(a, b, e, c);
			return b.child;
		}
		function ag(a, b) {
			var c = b.ref;
			if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
		}
		function Xf(a, b, c, d, e) {
			var f = A(c) ? kc : x.current;
			f = mc(b, f);
			Yd(b, e);
			c = He(a, b, c, d, f, e);
			d = Me();
			if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Tf(a, b, e);
			F && d && md(b);
			b.flags |= 1;
			P(a, b, c, e);
			return b.child;
		}
		function bg(a, b, c, d, e) {
			if (A(c)) {
				var f = !0;
				qc(b);
			} else f = !1;
			Yd(b, e);
			if (null === b.stateNode) cg(a, b), Bf(b, c, d), Df(b, c, d, e), d = !0;
			else if (null === a) {
				var g = b.stateNode, h = b.memoizedProps;
				g.props = h;
				var k = g.context, l = c.contextType;
				"object" === typeof l && null !== l ? l = Zd(l) : (l = A(c) ? kc : x.current, l = mc(b, l));
				var m = c.getDerivedStateFromProps, r = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
				r || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Cf(b, g, d, l);
				de = !1;
				var p = b.memoizedState;
				g.state = p;
				ke(b, d, g, e);
				k = b.memoizedState;
				h !== d || p !== k || z.current || de ? ("function" === typeof m && (yf(b, c, m, d), k = b.memoizedState), (h = de || Af(b, c, h, d, p, k, l)) ? (r || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
			} else {
				g = b.stateNode;
				fe(a, b);
				h = b.memoizedProps;
				l = b.type === b.elementType ? h : xf(b.type, h);
				g.props = l;
				r = b.pendingProps;
				p = g.context;
				k = c.contextType;
				"object" === typeof k && null !== k ? k = Zd(k) : (k = A(c) ? kc : x.current, k = mc(b, k));
				var B = c.getDerivedStateFromProps;
				(m = "function" === typeof B || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== r || p !== k) && Cf(b, g, d, k);
				de = !1;
				p = b.memoizedState;
				g.state = p;
				ke(b, d, g, e);
				var w = b.memoizedState;
				h !== r || p !== w || z.current || de ? ("function" === typeof B && (yf(b, c, B, d), w = b.memoizedState), (l = de || Af(b, c, l, d, p, w, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), d = !1);
			}
			return dg(a, b, c, d, f, e);
		}
		function dg(a, b, c, d, e, f) {
			ag(a, b);
			var g = 0 !== (b.flags & 128);
			if (!d && !g) return e && rc(b, c, !1), Tf(a, b, f);
			d = b.stateNode;
			Rf.current = b;
			var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
			b.flags |= 1;
			null !== a && g ? (b.child = Od(b, a.child, null, f), b.child = Od(b, null, h, f)) : P(a, b, h, f);
			b.memoizedState = d.state;
			e && rc(b, c, !0);
			return b.child;
		}
		function eg(a) {
			var b = a.stateNode;
			b.pendingContext ? oc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && oc(a, b.context, !1);
			se(a, b.containerInfo);
		}
		function fg(a, b, c, d, e) {
			Ad();
			Bd(e);
			b.flags |= 256;
			P(a, b, c, d);
			return b.child;
		}
		var gg = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0
		};
		function hg(a) {
			return {
				baseLanes: a,
				cachePool: null,
				transitions: null
			};
		}
		function ig(a, b, c) {
			var d = b.pendingProps, e = I.current, f = !1, g = 0 !== (b.flags & 128), h;
			(h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
			if (h) f = !0, b.flags &= -129;
			else if (null === a || null !== a.memoizedState) e |= 1;
			v(I, e & 1);
			if (null === a) {
				wd(b);
				a = b.memoizedState;
				if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : Kb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
				g = d.children;
				a = d.fallback;
				return f ? (d = b.mode, f = b.child, g = {
					mode: "hidden",
					children: g
				}, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = jg(g, d, 0, null), a = Nd(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = hg(c), b.memoizedState = gg, a) : kg(b, g);
			}
			e = a.memoizedState;
			if (null !== e && (h = e.dehydrated, null !== h)) return lg(a, b, g, d, h, e, c);
			if (f) {
				f = d.fallback;
				g = b.mode;
				e = a.child;
				h = e.sibling;
				var k = {
					mode: "hidden",
					children: d.children
				};
				0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Jd(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
				null !== h ? f = Jd(h, f) : (f = Nd(f, g, c, null), f.flags |= 2);
				f.return = b;
				d.return = b;
				d.sibling = f;
				b.child = d;
				d = f;
				f = b.child;
				g = a.child.memoizedState;
				g = null === g ? hg(c) : {
					baseLanes: g.baseLanes | c,
					cachePool: null,
					transitions: g.transitions
				};
				f.memoizedState = g;
				f.childLanes = a.childLanes & ~c;
				b.memoizedState = gg;
				return d;
			}
			f = a.child;
			a = f.sibling;
			d = Jd(f, {
				mode: "visible",
				children: d.children
			});
			0 === (b.mode & 1) && (d.lanes = c);
			d.return = b;
			d.sibling = null;
			null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
			b.child = d;
			b.memoizedState = null;
			return d;
		}
		function kg(a, b) {
			b = jg({
				mode: "visible",
				children: b
			}, a.mode, 0, null);
			b.return = a;
			return a.child = b;
		}
		function mg(a, b, c, d) {
			null !== d && Bd(d);
			Od(b, a.child, null, c);
			a = kg(b, b.pendingProps.children);
			a.flags |= 2;
			b.memoizedState = null;
			return a;
		}
		function lg(a, b, c, d, e, f, g) {
			if (c) {
				if (b.flags & 256) return b.flags &= -257, d = Ff(Error(n(422))), mg(a, b, g, d);
				if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
				f = d.fallback;
				e = b.mode;
				d = jg({
					mode: "visible",
					children: d.children
				}, e, 0, null);
				f = Nd(f, e, g, null);
				f.flags |= 2;
				d.return = b;
				f.return = b;
				d.sibling = f;
				b.child = d;
				0 !== (b.mode & 1) && Od(b, a.child, null, g);
				b.child.memoizedState = hg(g);
				b.memoizedState = gg;
				return f;
			}
			if (0 === (b.mode & 1)) return mg(a, b, g, null);
			if (Kb(e)) return d = Lb(e).digest, f = Error(n(419)), d = Ff(f, d, void 0), mg(a, b, g, d);
			c = 0 !== (g & a.childLanes);
			if (G || c) {
				d = N;
				if (null !== d) {
					switch (g & -g) {
						case 4:
							e = 2;
							break;
						case 16:
							e = 8;
							break;
						case 64:
						case 128:
						case 256:
						case 512:
						case 1024:
						case 2048:
						case 4096:
						case 8192:
						case 16384:
						case 32768:
						case 65536:
						case 131072:
						case 262144:
						case 524288:
						case 1048576:
						case 2097152:
						case 4194304:
						case 8388608:
						case 16777216:
						case 33554432:
						case 67108864:
							e = 32;
							break;
						case 536870912:
							e = 268435456;
							break;
						default: e = 0;
					}
					e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
					0 !== e && e !== f.retryLane && (f.retryLane = e, ce(a, e), af(d, a, e, -1));
				}
				ng();
				d = Ff(Error(n(421)));
				return mg(a, b, g, d);
			}
			if (Jb(e)) return b.flags |= 128, b.child = a.child, b = og.bind(null, a), Mb(e, b), null;
			a = f.treeContext;
			Va && (pd = Qb(e), od = b, F = !0, rd = null, qd = !1, null !== a && (fd[gd++] = id, fd[gd++] = jd, fd[gd++] = hd, id = a.id, jd = a.overflow, hd = b));
			b = kg(b, d.children);
			b.flags |= 4096;
			return b;
		}
		function pg(a, b, c) {
			a.lanes |= b;
			var d = a.alternate;
			null !== d && (d.lanes |= b);
			Xd(a.return, b, c);
		}
		function qg(a, b, c, d, e) {
			var f = a.memoizedState;
			null === f ? a.memoizedState = {
				isBackwards: b,
				rendering: null,
				renderingStartTime: 0,
				last: d,
				tail: c,
				tailMode: e
			} : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
		}
		function rg(a, b, c) {
			var d = b.pendingProps, e = d.revealOrder, f = d.tail;
			P(a, b, d.children, c);
			d = I.current;
			if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
			else {
				if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
					if (13 === a.tag) null !== a.memoizedState && pg(a, c, b);
					else if (19 === a.tag) pg(a, c, b);
					else if (null !== a.child) {
						a.child.return = a;
						a = a.child;
						continue;
					}
					if (a === b) break a;
					for (; null === a.sibling;) {
						if (null === a.return || a.return === b) break a;
						a = a.return;
					}
					a.sibling.return = a.return;
					a = a.sibling;
				}
				d &= 1;
			}
			v(I, d);
			if (0 === (b.mode & 1)) b.memoizedState = null;
			else switch (e) {
				case "forwards":
					c = b.child;
					for (e = null; null !== c;) a = c.alternate, null !== a && null === we(a) && (e = c), c = c.sibling;
					c = e;
					null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
					qg(b, !1, e, c, f);
					break;
				case "backwards":
					c = null;
					e = b.child;
					for (b.child = null; null !== e;) {
						a = e.alternate;
						if (null !== a && null === we(a)) {
							b.child = e;
							break;
						}
						a = e.sibling;
						e.sibling = c;
						c = e;
						e = a;
					}
					qg(b, !0, c, null, f);
					break;
				case "together":
					qg(b, !1, null, null, void 0);
					break;
				default: b.memoizedState = null;
			}
			return b.child;
		}
		function cg(a, b) {
			0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
		}
		function Tf(a, b, c) {
			null !== a && (b.dependencies = a.dependencies);
			le |= b.lanes;
			if (0 === (c & b.childLanes)) return null;
			if (null !== a && b.child !== a.child) throw Error(n(153));
			if (null !== b.child) {
				a = b.child;
				c = Jd(a, a.pendingProps);
				b.child = c;
				for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Jd(a, a.pendingProps), c.return = b;
				c.sibling = null;
			}
			return b.child;
		}
		function sg(a, b, c) {
			switch (b.tag) {
				case 3:
					eg(b);
					Ad();
					break;
				case 5:
					ue(b);
					break;
				case 1:
					A(b.type) && qc(b);
					break;
				case 4:
					se(b, b.stateNode.containerInfo);
					break;
				case 10:
					Vd(b, b.type._context, b.memoizedProps.value);
					break;
				case 13:
					var d = b.memoizedState;
					if (null !== d) {
						if (null !== d.dehydrated) return v(I, I.current & 1), b.flags |= 128, null;
						if (0 !== (c & b.child.childLanes)) return ig(a, b, c);
						v(I, I.current & 1);
						a = Tf(a, b, c);
						return null !== a ? a.sibling : null;
					}
					v(I, I.current & 1);
					break;
				case 19:
					d = 0 !== (c & b.childLanes);
					if (0 !== (a.flags & 128)) {
						if (d) return rg(a, b, c);
						b.flags |= 128;
					}
					var e = b.memoizedState;
					null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
					v(I, I.current);
					if (d) break;
					else return null;
				case 22:
				case 23: return b.lanes = 0, Yf(a, b, c);
			}
			return Tf(a, b, c);
		}
		function tg(a) {
			a.flags |= 4;
		}
		function ug(a, b) {
			if (null !== a && a.child === b.child) return !0;
			if (0 !== (b.flags & 16)) return !1;
			for (a = b.child; null !== a;) {
				if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854)) return !1;
				a = a.sibling;
			}
			return !0;
		}
		var vg, wg, xg, yg;
		if (Ta) vg = function(a, b) {
			for (var c = b.child; null !== c;) {
				if (5 === c.tag || 6 === c.tag) Ka(a, c.stateNode);
				else if (4 !== c.tag && null !== c.child) {
					c.child.return = c;
					c = c.child;
					continue;
				}
				if (c === b) break;
				for (; null === c.sibling;) {
					if (null === c.return || c.return === b) return;
					c = c.return;
				}
				c.sibling.return = c.return;
				c = c.sibling;
			}
		}, wg = function() {}, xg = function(a, b, c, d, e) {
			a = a.memoizedProps;
			if (a !== d) {
				var f = b.stateNode, g = re(oe.current);
				c = Ma(f, c, a, d, e, g);
				(b.updateQueue = c) && tg(b);
			}
		}, yg = function(a, b, c, d) {
			c !== d && tg(b);
		};
		else if (Ua) {
			vg = function(a, b, c, d) {
				for (var e = b.child; null !== e;) {
					if (5 === e.tag) {
						var f = e.stateNode;
						c && d && (f = Eb(f, e.type, e.memoizedProps, e));
						Ka(a, f);
					} else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ka(a, f);
					else if (4 !== e.tag) {
						if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f.return = e), vg(a, e, !0, !0);
						else if (null !== e.child) {
							e.child.return = e;
							e = e.child;
							continue;
						}
					}
					if (e === b) break;
					for (; null === e.sibling;) {
						if (null === e.return || e.return === b) return;
						e = e.return;
					}
					e.sibling.return = e.return;
					e = e.sibling;
				}
			};
			var zg = function(a, b, c, d) {
				for (var e = b.child; null !== e;) {
					if (5 === e.tag) {
						var f = e.stateNode;
						c && d && (f = Eb(f, e.type, e.memoizedProps, e));
						Ab(a, f);
					} else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ab(a, f);
					else if (4 !== e.tag) {
						if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f.return = e), zg(a, e, !0, !0);
						else if (null !== e.child) {
							e.child.return = e;
							e = e.child;
							continue;
						}
					}
					if (e === b) break;
					for (; null === e.sibling;) {
						if (null === e.return || e.return === b) return;
						e = e.return;
					}
					e.sibling.return = e.return;
					e = e.sibling;
				}
			};
			wg = function(a, b) {
				var c = b.stateNode;
				if (!ug(a, b)) {
					a = c.containerInfo;
					var d = zb(a);
					zg(d, b, !1, !1);
					c.pendingChildren = d;
					tg(b);
					Bb(a, d);
				}
			};
			xg = function(a, b, c, d, e) {
				var f = a.stateNode, g = a.memoizedProps;
				if ((a = ug(a, b)) && g === d) b.stateNode = f;
				else {
					var h = b.stateNode, k = re(oe.current), l = null;
					g !== d && (l = Ma(h, c, g, d, e, k));
					a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), La(f, c, d, e, k) && tg(b), b.stateNode = f, a ? tg(b) : vg(f, b, !1, !1));
				}
			};
			yg = function(a, b, c, d) {
				c !== d ? (a = re(qe.current), c = re(oe.current), b.stateNode = Oa(d, a, c, b), tg(b)) : b.stateNode = a.stateNode;
			};
		} else wg = function() {}, xg = function() {}, yg = function() {};
		function Ag(a, b) {
			if (!F) switch (a.tailMode) {
				case "hidden":
					b = a.tail;
					for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
					null === c ? a.tail = null : c.sibling = null;
					break;
				case "collapsed":
					c = a.tail;
					for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
					null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
			}
		}
		function Q(a) {
			var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
			if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
			else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
			a.subtreeFlags |= d;
			a.childLanes = c;
			return b;
		}
		function Bg(a, b, c) {
			var d = b.pendingProps;
			nd(b);
			switch (b.tag) {
				case 2:
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Q(b), null;
				case 1: return A(b.type) && nc(), Q(b), null;
				case 3:
					c = b.stateNode;
					te();
					q(z);
					q(x);
					ye();
					c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null);
					if (null === a || null === a.child) yd(b) ? tg(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== rd && (Cg(rd), rd = null));
					wg(a, b);
					Q(b);
					return null;
				case 5:
					ve(b);
					c = re(qe.current);
					var e = b.type;
					if (null !== a && null != b.stateNode) xg(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
					else {
						if (!d) {
							if (null === b.stateNode) throw Error(n(166));
							Q(b);
							return null;
						}
						a = re(oe.current);
						if (yd(b)) {
							if (!Va) throw Error(n(175));
							a = Rb(b.stateNode, b.type, b.memoizedProps, c, a, b, !qd);
							b.updateQueue = a;
							null !== a && tg(b);
						} else {
							var f = Ja(e, d, c, a, b);
							vg(f, b, !1, !1);
							b.stateNode = f;
							La(f, e, d, c, a) && tg(b);
						}
						null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
					}
					Q(b);
					return null;
				case 6:
					if (a && null != b.stateNode) yg(a, b, a.memoizedProps, d);
					else {
						if ("string" !== typeof d && null === b.stateNode) throw Error(n(166));
						a = re(qe.current);
						c = re(oe.current);
						if (yd(b)) {
							if (!Va) throw Error(n(176));
							a = b.stateNode;
							c = b.memoizedProps;
							if (d = Sb(a, c, b, !qd)) {
								if (e = od, null !== e) switch (e.tag) {
									case 3:
										$b(e.stateNode.containerInfo, a, c, 0 !== (e.mode & 1));
										break;
									case 5: ac(e.type, e.memoizedProps, e.stateNode, a, c, 0 !== (e.mode & 1));
								}
							}
							d && tg(b);
						} else b.stateNode = Oa(d, a, c, b);
					}
					Q(b);
					return null;
				case 13:
					q(I);
					d = b.memoizedState;
					if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
						if (F && null !== pd && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) zd(), Ad(), b.flags |= 98560, e = !1;
						else if (e = yd(b), null !== d && null !== d.dehydrated) {
							if (null === a) {
								if (!e) throw Error(n(318));
								if (!Va) throw Error(n(344));
								e = b.memoizedState;
								e = null !== e ? e.dehydrated : null;
								if (!e) throw Error(n(317));
								Tb(e, b);
							} else Ad(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
							Q(b);
							e = !1;
						} else null !== rd && (Cg(rd), rd = null), e = !0;
						if (!e) return b.flags & 65536 ? b : null;
					}
					if (0 !== (b.flags & 128)) return b.lanes = c, b;
					c = null !== d;
					c !== (null !== a && null !== a.memoizedState) && c && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (I.current & 1) ? 0 === R && (R = 3) : ng()));
					null !== b.updateQueue && (b.flags |= 4);
					Q(b);
					return null;
				case 4: return te(), wg(a, b), null === a && Xa(b.stateNode.containerInfo), Q(b), null;
				case 10: return Wd(b.type._context), Q(b), null;
				case 17: return A(b.type) && nc(), Q(b), null;
				case 19:
					q(I);
					e = b.memoizedState;
					if (null === e) return Q(b), null;
					d = 0 !== (b.flags & 128);
					f = e.rendering;
					if (null === f) if (d) Ag(e, !1);
					else {
						if (0 !== R || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
							f = we(a);
							if (null !== f) {
								b.flags |= 128;
								Ag(e, !1);
								a = f.updateQueue;
								null !== a && (b.updateQueue = a, b.flags |= 4);
								b.subtreeFlags = 0;
								a = c;
								for (c = b.child; null !== c;) d = c, e = a, d.flags &= 14680066, f = d.alternate, null === f ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = f.childLanes, d.lanes = f.lanes, d.child = f.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = f.memoizedProps, d.memoizedState = f.memoizedState, d.updateQueue = f.updateQueue, d.type = f.type, e = f.dependencies, d.dependencies = null === e ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), c = c.sibling;
								v(I, I.current & 1 | 2);
								return b.child;
							}
							a = a.sibling;
						}
						null !== e.tail && D() > Dg && (b.flags |= 128, d = !0, Ag(e, !1), b.lanes = 4194304);
					}
					else {
						if (!d) if (a = we(f), null !== a) {
							if (b.flags |= 128, d = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Ag(e, !0), null === e.tail && "hidden" === e.tailMode && !f.alternate && !F) return Q(b), null;
						} else 2 * D() - e.renderingStartTime > Dg && 1073741824 !== c && (b.flags |= 128, d = !0, Ag(e, !1), b.lanes = 4194304);
						e.isBackwards ? (f.sibling = b.child, b.child = f) : (a = e.last, null !== a ? a.sibling = f : b.child = f, e.last = f);
					}
					if (null !== e.tail) return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = D(), b.sibling = null, a = I.current, v(I, d ? a & 1 | 2 : a & 1), b;
					Q(b);
					return null;
				case 22:
				case 23: return Eg(), c = null !== b.memoizedState, null !== a && null !== a.memoizedState !== c && (b.flags |= 8192), c && 0 !== (b.mode & 1) ? 0 !== ($f & 1073741824) && (Q(b), Ta && b.subtreeFlags & 6 && (b.flags |= 8192)) : Q(b), null;
				case 24: return null;
				case 25: return null;
			}
			throw Error(n(156, b.tag));
		}
		function Fg(a, b) {
			nd(b);
			switch (b.tag) {
				case 1: return A(b.type) && nc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
				case 3: return te(), q(z), q(x), ye(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
				case 5: return ve(b), null;
				case 13:
					q(I);
					a = b.memoizedState;
					if (null !== a && null !== a.dehydrated) {
						if (null === b.alternate) throw Error(n(340));
						Ad();
					}
					a = b.flags;
					return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
				case 19: return q(I), null;
				case 4: return te(), null;
				case 10: return Wd(b.type._context), null;
				case 22:
				case 23: return Eg(), null;
				case 24: return null;
				default: return null;
			}
		}
		var Gg = !1, S = !1, Hg = "function" === typeof WeakSet ? WeakSet : Set, T = null;
		function Ig(a, b) {
			var c = a.ref;
			if (null !== c) if ("function" === typeof c) try {
				c(null);
			} catch (d) {
				U(a, b, d);
			}
			else c.current = null;
		}
		function Jg(a, b, c) {
			try {
				c();
			} catch (d) {
				U(a, b, d);
			}
		}
		var Kg = !1;
		function Lg(a, b) {
			Ha(a.containerInfo);
			for (T = b; null !== T;) if (a = T, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b.return = a, T = b;
			else for (; null !== T;) {
				a = T;
				try {
					var c = a.alternate;
					if (0 !== (a.flags & 1024)) switch (a.tag) {
						case 0:
						case 11:
						case 15: break;
						case 1:
							if (null !== c) {
								var d = c.memoizedProps, e = c.memoizedState, f = a.stateNode;
								f.__reactInternalSnapshotBeforeUpdate = f.getSnapshotBeforeUpdate(a.elementType === a.type ? d : xf(a.type, d), e);
							}
							break;
						case 3:
							Ta && xb(a.stateNode.containerInfo);
							break;
						case 5:
						case 6:
						case 4:
						case 17: break;
						default: throw Error(n(163));
					}
				} catch (h) {
					U(a, a.return, h);
				}
				b = a.sibling;
				if (null !== b) {
					b.return = a.return;
					T = b;
					break;
				}
				T = a.return;
			}
			c = Kg;
			Kg = !1;
			return c;
		}
		function Mg(a, b, c) {
			var d = b.updateQueue;
			d = null !== d ? d.lastEffect : null;
			if (null !== d) {
				var e = d = d.next;
				do {
					if ((e.tag & a) === a) {
						var f = e.destroy;
						e.destroy = void 0;
						void 0 !== f && Jg(b, c, f);
					}
					e = e.next;
				} while (e !== d);
			}
		}
		function Ng(a, b) {
			b = b.updateQueue;
			b = null !== b ? b.lastEffect : null;
			if (null !== b) {
				var c = b = b.next;
				do {
					if ((c.tag & a) === a) {
						var d = c.create;
						c.destroy = d();
					}
					c = c.next;
				} while (c !== b);
			}
		}
		function Og(a) {
			var b = a.ref;
			if (null !== b) {
				var c = a.stateNode;
				switch (a.tag) {
					case 5:
						a = Ea(c);
						break;
					default: a = c;
				}
				"function" === typeof b ? b(a) : b.current = a;
			}
		}
		function Pg(a) {
			var b = a.alternate;
			null !== b && (a.alternate = null, Pg(b));
			a.child = null;
			a.deletions = null;
			a.sibling = null;
			5 === a.tag && (b = a.stateNode, null !== b && Za(b));
			a.stateNode = null;
			a.return = null;
			a.dependencies = null;
			a.memoizedProps = null;
			a.memoizedState = null;
			a.pendingProps = null;
			a.stateNode = null;
			a.updateQueue = null;
		}
		function Qg(a) {
			return 5 === a.tag || 3 === a.tag || 4 === a.tag;
		}
		function Rg(a) {
			a: for (;;) {
				for (; null === a.sibling;) {
					if (null === a.return || Qg(a.return)) return null;
					a = a.return;
				}
				a.sibling.return = a.return;
				for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
					if (a.flags & 2) continue a;
					if (null === a.child || 4 === a.tag) continue a;
					else a.child.return = a, a = a.child;
				}
				if (!(a.flags & 2)) return a.stateNode;
			}
		}
		function Sg(a, b, c) {
			var d = a.tag;
			if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);
			else if (4 !== d && (a = a.child, null !== a)) for (Sg(a, b, c), a = a.sibling; null !== a;) Sg(a, b, c), a = a.sibling;
		}
		function Tg(a, b, c) {
			var d = a.tag;
			if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);
			else if (4 !== d && (a = a.child, null !== a)) for (Tg(a, b, c), a = a.sibling; null !== a;) Tg(a, b, c), a = a.sibling;
		}
		var V = null, Ug = !1;
		function Vg(a, b, c) {
			for (c = c.child; null !== c;) Wg(a, b, c), c = c.sibling;
		}
		function Wg(a, b, c) {
			if (Sc && "function" === typeof Sc.onCommitFiberUnmount) try {
				Sc.onCommitFiberUnmount(Rc, c);
			} catch (h) {}
			switch (c.tag) {
				case 5: S || Ig(c, b);
				case 6:
					if (Ta) {
						var d = V, e = Ug;
						V = null;
						Vg(a, b, c);
						V = d;
						Ug = e;
						null !== V && (Ug ? rb(V, c.stateNode) : qb(V, c.stateNode));
					} else Vg(a, b, c);
					break;
				case 18:
					Ta && null !== V && (Ug ? Yb(V, c.stateNode) : Xb(V, c.stateNode));
					break;
				case 4:
					Ta ? (d = V, e = Ug, V = c.stateNode.containerInfo, Ug = !0, Vg(a, b, c), V = d, Ug = e) : (Ua && (d = c.stateNode.containerInfo, e = zb(d), Cb(d, e)), Vg(a, b, c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					if (!S && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
						e = d = d.next;
						do {
							var f = e, g = f.destroy;
							f = f.tag;
							void 0 !== g && (0 !== (f & 2) ? Jg(c, b, g) : 0 !== (f & 4) && Jg(c, b, g));
							e = e.next;
						} while (e !== d);
					}
					Vg(a, b, c);
					break;
				case 1:
					if (!S && (Ig(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
						d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
					} catch (h) {
						U(c, b, h);
					}
					Vg(a, b, c);
					break;
				case 21:
					Vg(a, b, c);
					break;
				case 22:
					c.mode & 1 ? (S = (d = S) || null !== c.memoizedState, Vg(a, b, c), S = d) : Vg(a, b, c);
					break;
				default: Vg(a, b, c);
			}
		}
		function Xg(a) {
			var b = a.updateQueue;
			if (null !== b) {
				a.updateQueue = null;
				var c = a.stateNode;
				null === c && (c = a.stateNode = new Hg());
				b.forEach(function(b) {
					var d = Yg.bind(null, a, b);
					c.has(b) || (c.add(b), b.then(d, d));
				});
			}
		}
		function Zg(a, b) {
			var c = b.deletions;
			if (null !== c) for (var d = 0; d < c.length; d++) {
				var e = c[d];
				try {
					var f = a, g = b;
					if (Ta) {
						var h = g;
						a: for (; null !== h;) {
							switch (h.tag) {
								case 5:
									V = h.stateNode;
									Ug = !1;
									break a;
								case 3:
									V = h.stateNode.containerInfo;
									Ug = !0;
									break a;
								case 4:
									V = h.stateNode.containerInfo;
									Ug = !0;
									break a;
							}
							h = h.return;
						}
						if (null === V) throw Error(n(160));
						Wg(f, g, e);
						V = null;
						Ug = !1;
					} else Wg(f, g, e);
					var k = e.alternate;
					null !== k && (k.return = null);
					e.return = null;
				} catch (l) {
					U(e, b, l);
				}
			}
			if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) $g(b, a), b = b.sibling;
		}
		function $g(a, b) {
			var c = a.alternate, d = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Zg(b, a);
					ah(a);
					if (d & 4) {
						try {
							Mg(3, a, a.return), Ng(3, a);
						} catch (p) {
							U(a, a.return, p);
						}
						try {
							Mg(5, a, a.return);
						} catch (p) {
							U(a, a.return, p);
						}
					}
					break;
				case 1:
					Zg(b, a);
					ah(a);
					d & 512 && null !== c && Ig(c, c.return);
					break;
				case 5:
					Zg(b, a);
					ah(a);
					d & 512 && null !== c && Ig(c, c.return);
					if (Ta) {
						if (a.flags & 32) {
							var e = a.stateNode;
							try {
								sb(e);
							} catch (p) {
								U(a, a.return, p);
							}
						}
						if (d & 4 && (e = a.stateNode, null != e)) {
							var f = a.memoizedProps;
							c = null !== c ? c.memoizedProps : f;
							d = a.type;
							b = a.updateQueue;
							a.updateQueue = null;
							if (null !== b) try {
								nb(e, b, d, c, f, a);
							} catch (p) {
								U(a, a.return, p);
							}
						}
					}
					break;
				case 6:
					Zg(b, a);
					ah(a);
					if (d & 4 && Ta) {
						if (null === a.stateNode) throw Error(n(162));
						e = a.stateNode;
						f = a.memoizedProps;
						c = null !== c ? c.memoizedProps : f;
						try {
							lb(e, c, f);
						} catch (p) {
							U(a, a.return, p);
						}
					}
					break;
				case 3:
					Zg(b, a);
					ah(a);
					if (d & 4) {
						if (Ta && Va && null !== c && c.memoizedState.isDehydrated) try {
							Vb(b.containerInfo);
						} catch (p) {
							U(a, a.return, p);
						}
						if (Ua) {
							e = b.containerInfo;
							f = b.pendingChildren;
							try {
								Cb(e, f);
							} catch (p) {
								U(a, a.return, p);
							}
						}
					}
					break;
				case 4:
					Zg(b, a);
					ah(a);
					if (d & 4 && Ua) {
						f = a.stateNode;
						e = f.containerInfo;
						f = f.pendingChildren;
						try {
							Cb(e, f);
						} catch (p) {
							U(a, a.return, p);
						}
					}
					break;
				case 13:
					Zg(b, a);
					ah(a);
					e = a.child;
					e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (bh = D()));
					d & 4 && Xg(a);
					break;
				case 22:
					var g = null !== c && null !== c.memoizedState;
					a.mode & 1 ? (S = (c = S) || g, Zg(b, a), S = c) : Zg(b, a);
					ah(a);
					if (d & 8192) {
						c = null !== a.memoizedState;
						if ((a.stateNode.isHidden = c) && !g && 0 !== (a.mode & 1)) for (T = a, d = a.child; null !== d;) {
							for (b = T = d; null !== T;) {
								g = T;
								var h = g.child;
								switch (g.tag) {
									case 0:
									case 11:
									case 14:
									case 15:
										Mg(4, g, g.return);
										break;
									case 1:
										Ig(g, g.return);
										var k = g.stateNode;
										if ("function" === typeof k.componentWillUnmount) {
											var l = g, m = g.return;
											try {
												var r = l;
												k.props = r.memoizedProps;
												k.state = r.memoizedState;
												k.componentWillUnmount();
											} catch (p) {
												U(l, m, p);
											}
										}
										break;
									case 5:
										Ig(g, g.return);
										break;
									case 22: if (null !== g.memoizedState) {
										ch(b);
										continue;
									}
								}
								null !== h ? (h.return = g, T = h) : ch(b);
							}
							d = d.sibling;
						}
						if (Ta) {
							a: if (d = null, Ta) for (b = a;;) {
								if (5 === b.tag) {
									if (null === d) {
										d = b;
										try {
											e = b.stateNode, c ? tb(e) : vb(b.stateNode, b.memoizedProps);
										} catch (p) {
											U(a, a.return, p);
										}
									}
								} else if (6 === b.tag) {
									if (null === d) try {
										f = b.stateNode, c ? ub(f) : wb(f, b.memoizedProps);
									} catch (p) {
										U(a, a.return, p);
									}
								} else if ((22 !== b.tag && 23 !== b.tag || null === b.memoizedState || b === a) && null !== b.child) {
									b.child.return = b;
									b = b.child;
									continue;
								}
								if (b === a) break a;
								for (; null === b.sibling;) {
									if (null === b.return || b.return === a) break a;
									d === b && (d = null);
									b = b.return;
								}
								d === b && (d = null);
								b.sibling.return = b.return;
								b = b.sibling;
							}
						}
					}
					break;
				case 19:
					Zg(b, a);
					ah(a);
					d & 4 && Xg(a);
					break;
				case 21: break;
				default: Zg(b, a), ah(a);
			}
		}
		function ah(a) {
			var b = a.flags;
			if (b & 2) {
				try {
					if (Ta) {
						b: {
							for (var c = a.return; null !== c;) {
								if (Qg(c)) {
									var d = c;
									break b;
								}
								c = c.return;
							}
							throw Error(n(160));
						}
						switch (d.tag) {
							case 5:
								var e = d.stateNode;
								d.flags & 32 && (sb(e), d.flags &= -33);
								Tg(a, Rg(a), e);
								break;
							case 3:
							case 4:
								var g = d.stateNode.containerInfo;
								Sg(a, Rg(a), g);
								break;
							default: throw Error(n(161));
						}
					}
				} catch (k) {
					U(a, a.return, k);
				}
				a.flags &= -3;
			}
			b & 4096 && (a.flags &= -4097);
		}
		function dh(a, b, c) {
			T = a;
			eh(a, b, c);
		}
		function eh(a, b, c) {
			for (var d = 0 !== (a.mode & 1); null !== T;) {
				var e = T, f = e.child;
				if (22 === e.tag && d) {
					var g = null !== e.memoizedState || Gg;
					if (!g) {
						var h = e.alternate, k = null !== h && null !== h.memoizedState || S;
						h = Gg;
						var l = S;
						Gg = g;
						if ((S = k) && !l) for (T = e; null !== T;) g = T, k = g.child, 22 === g.tag && null !== g.memoizedState ? fh(e) : null !== k ? (k.return = g, T = k) : fh(e);
						for (; null !== f;) T = f, eh(f, b, c), f = f.sibling;
						T = e;
						Gg = h;
						S = l;
					}
					gh(a, b, c);
				} else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, T = f) : gh(a, b, c);
			}
		}
		function gh(a) {
			for (; null !== T;) {
				var b = T;
				if (0 !== (b.flags & 8772)) {
					var c = b.alternate;
					try {
						if (0 !== (b.flags & 8772)) switch (b.tag) {
							case 0:
							case 11:
							case 15:
								S || Ng(5, b);
								break;
							case 1:
								var d = b.stateNode;
								if (b.flags & 4 && !S) if (null === c) d.componentDidMount();
								else {
									var e = b.elementType === b.type ? c.memoizedProps : xf(b.type, c.memoizedProps);
									d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
								}
								var f = b.updateQueue;
								null !== f && me(b, f, d);
								break;
							case 3:
								var g = b.updateQueue;
								if (null !== g) {
									c = null;
									if (null !== b.child) switch (b.child.tag) {
										case 5:
											c = Ea(b.child.stateNode);
											break;
										case 1: c = b.child.stateNode;
									}
									me(b, g, c);
								}
								break;
							case 5:
								var h = b.stateNode;
								null === c && b.flags & 4 && mb(h, b.type, b.memoizedProps, b);
								break;
							case 6: break;
							case 4: break;
							case 12: break;
							case 13:
								if (Va && null === b.memoizedState) {
									var k = b.alternate;
									if (null !== k) {
										var l = k.memoizedState;
										if (null !== l) {
											var m = l.dehydrated;
											null !== m && Wb(m);
										}
									}
								}
								break;
							case 19:
							case 17:
							case 21:
							case 22:
							case 23:
							case 25: break;
							default: throw Error(n(163));
						}
						S || b.flags & 512 && Og(b);
					} catch (r) {
						U(b, b.return, r);
					}
				}
				if (b === a) {
					T = null;
					break;
				}
				c = b.sibling;
				if (null !== c) {
					c.return = b.return;
					T = c;
					break;
				}
				T = b.return;
			}
		}
		function ch(a) {
			for (; null !== T;) {
				var b = T;
				if (b === a) {
					T = null;
					break;
				}
				var c = b.sibling;
				if (null !== c) {
					c.return = b.return;
					T = c;
					break;
				}
				T = b.return;
			}
		}
		function fh(a) {
			for (; null !== T;) {
				var b = T;
				try {
					switch (b.tag) {
						case 0:
						case 11:
						case 15:
							var c = b.return;
							try {
								Ng(4, b);
							} catch (k) {
								U(b, c, k);
							}
							break;
						case 1:
							var d = b.stateNode;
							if ("function" === typeof d.componentDidMount) {
								var e = b.return;
								try {
									d.componentDidMount();
								} catch (k) {
									U(b, e, k);
								}
							}
							var f = b.return;
							try {
								Og(b);
							} catch (k) {
								U(b, f, k);
							}
							break;
						case 5:
							var g = b.return;
							try {
								Og(b);
							} catch (k) {
								U(b, g, k);
							}
					}
				} catch (k) {
					U(b, b.return, k);
				}
				if (b === a) {
					T = null;
					break;
				}
				var h = b.sibling;
				if (null !== h) {
					h.return = b.return;
					T = h;
					break;
				}
				T = b.return;
			}
		}
		var hh = 0, ih = 1, jh = 2, kh = 3, lh = 4;
		if ("function" === typeof Symbol && Symbol.for) {
			var mh = Symbol.for;
			hh = mh("selector.component");
			ih = mh("selector.has_pseudo_class");
			jh = mh("selector.role");
			kh = mh("selector.test_id");
			lh = mh("selector.text");
		}
		function nh(a) {
			var b = Wa(a);
			if (null != b) {
				if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(n(364));
				return b;
			}
			a = cb(a);
			if (null === a) throw Error(n(362));
			return a.stateNode.current;
		}
		function oh(a, b) {
			switch (b.$$typeof) {
				case hh:
					if (a.type === b.value) return !0;
					break;
				case ih:
					a: {
						b = b.value;
						a = [a, 0];
						for (var c = 0; c < a.length;) {
							var d = a[c++], e = a[c++], f = b[e];
							if (5 !== d.tag || !fb(d)) {
								for (; null != f && oh(d, f);) e++, f = b[e];
								if (e === b.length) {
									b = !0;
									break a;
								} else for (d = d.child; null !== d;) a.push(d, e), d = d.sibling;
							}
						}
						b = !1;
					}
					return b;
				case jh:
					if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
					break;
				case lh:
					if (5 === a.tag || 6 === a.tag) {
						if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
					}
					break;
				case kh:
					if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
					break;
				default: throw Error(n(365));
			}
			return !1;
		}
		function ph(a) {
			switch (a.$$typeof) {
				case hh: return "<" + (ua(a.value) || "Unknown") + ">";
				case ih: return ":has(" + (ph(a) || "") + ")";
				case jh: return "[role=\"" + a.value + "\"]";
				case lh: return "\"" + a.value + "\"";
				case kh: return "[data-testname=\"" + a.value + "\"]";
				default: throw Error(n(365));
			}
		}
		function qh(a, b) {
			var c = [];
			a = [a, 0];
			for (var d = 0; d < a.length;) {
				var e = a[d++], f = a[d++], g = b[f];
				if (5 !== e.tag || !fb(e)) {
					for (; null != g && oh(e, g);) f++, g = b[f];
					if (f === b.length) c.push(e);
					else for (e = e.child; null !== e;) a.push(e, f), e = e.sibling;
				}
			}
			return c;
		}
		function rh(a, b) {
			if (!bb) throw Error(n(363));
			a = nh(a);
			a = qh(a, b);
			b = [];
			a = Array.from(a);
			for (var c = 0; c < a.length;) {
				var d = a[c++];
				if (5 === d.tag) fb(d) || b.push(d.stateNode);
				else for (d = d.child; null !== d;) a.push(d), d = d.sibling;
			}
			return b;
		}
		var sh = Math.ceil, th = da.ReactCurrentDispatcher, uh = da.ReactCurrentOwner, W = da.ReactCurrentBatchConfig, H = 0, N = null, X = null, Z = 0, $f = 0, Zf = ic(0), R = 0, vh = null, le = 0, wh = 0, xh = 0, yh = null, zh = null, bh = 0, Dg = Infinity, Ah = null;
		function Bh() {
			Dg = D() + 500;
		}
		var Jf = !1, Kf = null, Mf = null, Ch = !1, Dh = null, Eh = 0, Fh = 0, Gh = null, Hh = -1, Ih = 0;
		function O() {
			return 0 !== (H & 6) ? D() : -1 !== Hh ? Hh : Hh = D();
		}
		function tf(a) {
			if (0 === (a.mode & 1)) return 1;
			if (0 !== (H & 2) && 0 !== Z) return Z & -Z;
			if (null !== Cd.transition) return 0 === Ih && (Ih = Dc()), Ih;
			a = C;
			return 0 !== a ? a : Ya();
		}
		function af(a, b, c, d) {
			if (50 < Fh) throw Fh = 0, Gh = null, Error(n(185));
			Fc(a, c, d);
			if (0 === (H & 2) || a !== N) a === N && (0 === (H & 2) && (wh |= c), 4 === R && Jh(a, Z)), Kh(a, d), 1 === c && 0 === H && 0 === (b.mode & 1) && (Bh(), Xc && ad());
		}
		function Kh(a, b) {
			var c = a.callbackNode;
			Bc(a, b);
			var d = zc(a, a === N ? Z : 0);
			if (0 === d) null !== c && Kc(c), a.callbackNode = null, a.callbackPriority = 0;
			else if (b = d & -d, a.callbackPriority !== b) {
				null != c && Kc(c);
				if (1 === b) 0 === a.tag ? $c(Lh.bind(null, a)) : Zc(Lh.bind(null, a)), $a ? ab(function() {
					0 === (H & 6) && ad();
				}) : Jc(Nc, ad), c = null;
				else {
					switch (Ic(d)) {
						case 1:
							c = Nc;
							break;
						case 4:
							c = Oc;
							break;
						case 16:
							c = Pc;
							break;
						case 536870912:
							c = Qc;
							break;
						default: c = Pc;
					}
					c = Mh(c, Nh.bind(null, a));
				}
				a.callbackPriority = b;
				a.callbackNode = c;
			}
		}
		function Nh(a, b) {
			Hh = -1;
			Ih = 0;
			if (0 !== (H & 6)) throw Error(n(327));
			var c = a.callbackNode;
			if (Oh() && a.callbackNode !== c) return null;
			var d = zc(a, a === N ? Z : 0);
			if (0 === d) return null;
			if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ph(a, d);
			else {
				b = d;
				var e = H;
				H |= 2;
				var f = Qh();
				if (N !== a || Z !== b) Ah = null, Bh(), Rh(a, b);
				do
					try {
						Sh();
						break;
					} catch (h) {
						Th(a, h);
					}
				while (1);
				Ud();
				th.current = f;
				H = e;
				null !== X ? b = 0 : (N = null, Z = 0, b = R);
			}
			if (0 !== b) {
				2 === b && (e = Cc(a), 0 !== e && (d = e, b = Uh(a, e)));
				if (1 === b) throw c = vh, Rh(a, 0), Jh(a, d), Kh(a, D()), c;
				if (6 === b) Jh(a, d);
				else {
					e = a.current.alternate;
					if (0 === (d & 30) && !Vh(e) && (b = Ph(a, d), 2 === b && (f = Cc(a), 0 !== f && (d = f, b = Uh(a, f))), 1 === b)) throw c = vh, Rh(a, 0), Jh(a, d), Kh(a, D()), c;
					a.finishedWork = e;
					a.finishedLanes = d;
					switch (b) {
						case 0:
						case 1: throw Error(n(345));
						case 2:
							Wh(a, zh, Ah);
							break;
						case 3:
							Jh(a, d);
							if ((d & 130023424) === d && (b = bh + 500 - D(), 10 < b)) {
								if (0 !== zc(a, 0)) break;
								e = a.suspendedLanes;
								if ((e & d) !== d) {
									O();
									a.pingedLanes |= a.suspendedLanes & e;
									break;
								}
								a.timeoutHandle = Pa(Wh.bind(null, a, zh, Ah), b);
								break;
							}
							Wh(a, zh, Ah);
							break;
						case 4:
							Jh(a, d);
							if ((d & 4194240) === d) break;
							b = a.eventTimes;
							for (e = -1; 0 < d;) {
								var g = 31 - tc(d);
								f = 1 << g;
								g = b[g];
								g > e && (e = g);
								d &= ~f;
							}
							d = e;
							d = D() - d;
							d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * sh(d / 1960)) - d;
							if (10 < d) {
								a.timeoutHandle = Pa(Wh.bind(null, a, zh, Ah), d);
								break;
							}
							Wh(a, zh, Ah);
							break;
						case 5:
							Wh(a, zh, Ah);
							break;
						default: throw Error(n(329));
					}
				}
			}
			Kh(a, D());
			return a.callbackNode === c ? Nh.bind(null, a) : null;
		}
		function Uh(a, b) {
			var c = yh;
			a.current.memoizedState.isDehydrated && (Rh(a, b).flags |= 256);
			a = Ph(a, b);
			2 !== a && (b = zh, zh = c, null !== b && Cg(b));
			return a;
		}
		function Cg(a) {
			null === zh ? zh = a : zh.push.apply(zh, a);
		}
		function Vh(a) {
			for (var b = a;;) {
				if (b.flags & 16384) {
					var c = b.updateQueue;
					if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
						var e = c[d], f = e.getSnapshot;
						e = e.value;
						try {
							if (!Vc(f(), e)) return !1;
						} catch (g) {
							return !1;
						}
					}
				}
				c = b.child;
				if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
				else {
					if (b === a) break;
					for (; null === b.sibling;) {
						if (null === b.return || b.return === a) return !0;
						b = b.return;
					}
					b.sibling.return = b.return;
					b = b.sibling;
				}
			}
			return !0;
		}
		function Jh(a, b) {
			b &= ~xh;
			b &= ~wh;
			a.suspendedLanes |= b;
			a.pingedLanes &= ~b;
			for (a = a.expirationTimes; 0 < b;) {
				var c = 31 - tc(b), d = 1 << c;
				a[c] = -1;
				b &= ~d;
			}
		}
		function Lh(a) {
			if (0 !== (H & 6)) throw Error(n(327));
			Oh();
			var b = zc(a, 0);
			if (0 === (b & 1)) return Kh(a, D()), null;
			var c = Ph(a, b);
			if (0 !== a.tag && 2 === c) {
				var d = Cc(a);
				0 !== d && (b = d, c = Uh(a, d));
			}
			if (1 === c) throw c = vh, Rh(a, 0), Jh(a, b), Kh(a, D()), c;
			if (6 === c) throw Error(n(345));
			a.finishedWork = a.current.alternate;
			a.finishedLanes = b;
			Wh(a, zh, Ah);
			Kh(a, D());
			return null;
		}
		function Xh(a) {
			null !== Dh && 0 === Dh.tag && 0 === (H & 6) && Oh();
			var b = H;
			H |= 1;
			var c = W.transition, d = C;
			try {
				if (W.transition = null, C = 1, a) return a();
			} finally {
				C = d, W.transition = c, H = b, 0 === (H & 6) && ad();
			}
		}
		function Eg() {
			$f = Zf.current;
			q(Zf);
		}
		function Rh(a, b) {
			a.finishedWork = null;
			a.finishedLanes = 0;
			var c = a.timeoutHandle;
			c !== Ra && (a.timeoutHandle = Ra, Qa(c));
			if (null !== X) for (c = X.return; null !== c;) {
				var d = c;
				nd(d);
				switch (d.tag) {
					case 1:
						d = d.type.childContextTypes;
						null !== d && void 0 !== d && nc();
						break;
					case 3:
						te();
						q(z);
						q(x);
						ye();
						break;
					case 5:
						ve(d);
						break;
					case 4:
						te();
						break;
					case 13:
						q(I);
						break;
					case 19:
						q(I);
						break;
					case 10:
						Wd(d.type._context);
						break;
					case 22:
					case 23: Eg();
				}
				c = c.return;
			}
			N = a;
			X = a = Jd(a.current, null);
			Z = $f = b;
			R = 0;
			vh = null;
			xh = wh = le = 0;
			zh = yh = null;
			if (null !== $d) {
				for (b = 0; b < $d.length; b++) if (c = $d[b], d = c.interleaved, null !== d) {
					c.interleaved = null;
					var e = d.next, f = c.pending;
					if (null !== f) {
						var g = f.next;
						f.next = e;
						d.next = g;
					}
					c.pending = d;
				}
				$d = null;
			}
			return a;
		}
		function Th(a, b) {
			do {
				var c = X;
				try {
					Ud();
					ze.current = Le;
					if (Ce) {
						for (var d = J.memoizedState; null !== d;) {
							var e = d.queue;
							null !== e && (e.pending = null);
							d = d.next;
						}
						Ce = !1;
					}
					Be = 0;
					L = K = J = null;
					De = !1;
					Ee = 0;
					uh.current = null;
					if (null === c || null === c.return) {
						R = 1;
						vh = b;
						X = null;
						break;
					}
					a: {
						var f = a, g = c.return, h = c, k = b;
						b = Z;
						h.flags |= 32768;
						if (null !== k && "object" === typeof k && "function" === typeof k.then) {
							var l = k, m = h, r = m.tag;
							if (0 === (m.mode & 1) && (0 === r || 11 === r || 15 === r)) {
								var p = m.alternate;
								p ? (m.updateQueue = p.updateQueue, m.memoizedState = p.memoizedState, m.lanes = p.lanes) : (m.updateQueue = null, m.memoizedState = null);
							}
							var B = Pf(g);
							if (null !== B) {
								B.flags &= -257;
								Qf(B, g, h, f, b);
								B.mode & 1 && Nf(f, l, b);
								b = B;
								k = l;
								var w = b.updateQueue;
								if (null === w) {
									var Y = /* @__PURE__ */ new Set();
									Y.add(k);
									b.updateQueue = Y;
								} else w.add(k);
								break a;
							} else {
								if (0 === (b & 1)) {
									Nf(f, l, b);
									ng();
									break a;
								}
								k = Error(n(426));
							}
						} else if (F && h.mode & 1) {
							var ya = Pf(g);
							if (null !== ya) {
								0 === (ya.flags & 65536) && (ya.flags |= 256);
								Qf(ya, g, h, f, b);
								Bd(Ef(k, h));
								break a;
							}
						}
						f = k = Ef(k, h);
						4 !== R && (R = 2);
						null === yh ? yh = [f] : yh.push(f);
						f = g;
						do {
							switch (f.tag) {
								case 3:
									f.flags |= 65536;
									b &= -b;
									f.lanes |= b;
									var E = If(f, k, b);
									je(f, E);
									break a;
								case 1:
									h = k;
									var u = f.type, t = f.stateNode;
									if (0 === (f.flags & 128) && ("function" === typeof u.getDerivedStateFromError || null !== t && "function" === typeof t.componentDidCatch && (null === Mf || !Mf.has(t)))) {
										f.flags |= 65536;
										b &= -b;
										f.lanes |= b;
										var Db = Lf(f, h, b);
										je(f, Db);
										break a;
									}
							}
							f = f.return;
						} while (null !== f);
					}
					Yh(c);
				} catch (lc) {
					b = lc;
					X === c && null !== c && (X = c = c.return);
					continue;
				}
				break;
			} while (1);
		}
		function Qh() {
			var a = th.current;
			th.current = Le;
			return null === a ? Le : a;
		}
		function ng() {
			if (0 === R || 3 === R || 2 === R) R = 4;
			null === N || 0 === (le & 268435455) && 0 === (wh & 268435455) || Jh(N, Z);
		}
		function Ph(a, b) {
			var c = H;
			H |= 2;
			var d = Qh();
			if (N !== a || Z !== b) Ah = null, Rh(a, b);
			do
				try {
					Zh();
					break;
				} catch (e) {
					Th(a, e);
				}
			while (1);
			Ud();
			H = c;
			th.current = d;
			if (null !== X) throw Error(n(261));
			N = null;
			Z = 0;
			return R;
		}
		function Zh() {
			for (; null !== X;) $h(X);
		}
		function Sh() {
			for (; null !== X && !Lc();) $h(X);
		}
		function $h(a) {
			var b = ai(a.alternate, a, $f);
			a.memoizedProps = a.pendingProps;
			null === b ? Yh(a) : X = b;
			uh.current = null;
		}
		function Yh(a) {
			var b = a;
			do {
				var c = b.alternate;
				a = b.return;
				if (0 === (b.flags & 32768)) {
					if (c = Bg(c, b, $f), null !== c) {
						X = c;
						return;
					}
				} else {
					c = Fg(c, b);
					if (null !== c) {
						c.flags &= 32767;
						X = c;
						return;
					}
					if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
					else {
						R = 6;
						X = null;
						return;
					}
				}
				b = b.sibling;
				if (null !== b) {
					X = b;
					return;
				}
				X = b = a;
			} while (null !== b);
			0 === R && (R = 5);
		}
		function Wh(a, b, c) {
			var d = C, e = W.transition;
			try {
				W.transition = null, C = 1, bi(a, b, c, d);
			} finally {
				W.transition = e, C = d;
			}
			return null;
		}
		function bi(a, b, c, d) {
			do
				Oh();
			while (null !== Dh);
			if (0 !== (H & 6)) throw Error(n(327));
			c = a.finishedWork;
			var e = a.finishedLanes;
			if (null === c) return null;
			a.finishedWork = null;
			a.finishedLanes = 0;
			if (c === a.current) throw Error(n(177));
			a.callbackNode = null;
			a.callbackPriority = 0;
			var f = c.lanes | c.childLanes;
			Gc(a, f);
			a === N && (X = N = null, Z = 0);
			0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || Ch || (Ch = !0, Mh(Pc, function() {
				Oh();
				return null;
			}));
			f = 0 !== (c.flags & 15990);
			if (0 !== (c.subtreeFlags & 15990) || f) {
				f = W.transition;
				W.transition = null;
				var g = C;
				C = 1;
				var h = H;
				H |= 4;
				uh.current = null;
				Lg(a, c);
				$g(c, a);
				Ia(a.containerInfo);
				a.current = c;
				dh(c, a, e);
				Mc();
				H = h;
				C = g;
				W.transition = f;
			} else a.current = c;
			Ch && (Ch = !1, Dh = a, Eh = e);
			f = a.pendingLanes;
			0 === f && (Mf = null);
			Tc(c.stateNode, d);
			Kh(a, D());
			if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
				componentStack: e.stack,
				digest: e.digest
			});
			if (Jf) throw Jf = !1, a = Kf, Kf = null, a;
			0 !== (Eh & 1) && 0 !== a.tag && Oh();
			f = a.pendingLanes;
			0 !== (f & 1) ? a === Gh ? Fh++ : (Fh = 0, Gh = a) : Fh = 0;
			ad();
			return null;
		}
		function Oh() {
			if (null !== Dh) {
				var a = Ic(Eh), b = W.transition, c = C;
				try {
					W.transition = null;
					C = 16 > a ? 16 : a;
					if (null === Dh) var d = !1;
					else {
						a = Dh;
						Dh = null;
						Eh = 0;
						if (0 !== (H & 6)) throw Error(n(331));
						var e = H;
						H |= 4;
						for (T = a.current; null !== T;) {
							var f = T, g = f.child;
							if (0 !== (T.flags & 16)) {
								var h = f.deletions;
								if (null !== h) {
									for (var k = 0; k < h.length; k++) {
										var l = h[k];
										for (T = l; null !== T;) {
											var m = T;
											switch (m.tag) {
												case 0:
												case 11:
												case 15: Mg(8, m, f);
											}
											var r = m.child;
											if (null !== r) r.return = m, T = r;
											else for (; null !== T;) {
												m = T;
												var p = m.sibling, B = m.return;
												Pg(m);
												if (m === l) {
													T = null;
													break;
												}
												if (null !== p) {
													p.return = B;
													T = p;
													break;
												}
												T = B;
											}
										}
									}
									var w = f.alternate;
									if (null !== w) {
										var Y = w.child;
										if (null !== Y) {
											w.child = null;
											do {
												var ya = Y.sibling;
												Y.sibling = null;
												Y = ya;
											} while (null !== Y);
										}
									}
									T = f;
								}
							}
							if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, T = g;
							else b: for (; null !== T;) {
								f = T;
								if (0 !== (f.flags & 2048)) switch (f.tag) {
									case 0:
									case 11:
									case 15: Mg(9, f, f.return);
								}
								var E = f.sibling;
								if (null !== E) {
									E.return = f.return;
									T = E;
									break b;
								}
								T = f.return;
							}
						}
						var u = a.current;
						for (T = u; null !== T;) {
							g = T;
							var t = g.child;
							if (0 !== (g.subtreeFlags & 2064) && null !== t) t.return = g, T = t;
							else b: for (g = u; null !== T;) {
								h = T;
								if (0 !== (h.flags & 2048)) try {
									switch (h.tag) {
										case 0:
										case 11:
										case 15: Ng(9, h);
									}
								} catch (lc) {
									U(h, h.return, lc);
								}
								if (h === g) {
									T = null;
									break b;
								}
								var Db = h.sibling;
								if (null !== Db) {
									Db.return = h.return;
									T = Db;
									break b;
								}
								T = h.return;
							}
						}
						H = e;
						ad();
						if (Sc && "function" === typeof Sc.onPostCommitFiberRoot) try {
							Sc.onPostCommitFiberRoot(Rc, a);
						} catch (lc) {}
						d = !0;
					}
					return d;
				} finally {
					C = c, W.transition = b;
				}
			}
			return !1;
		}
		function ci(a, b, c) {
			b = Ef(c, b);
			b = If(a, b, 1);
			a = he(a, b, 1);
			b = O();
			null !== a && (Fc(a, 1, b), Kh(a, b));
		}
		function U(a, b, c) {
			if (3 === a.tag) ci(a, a, c);
			else for (; null !== b;) {
				if (3 === b.tag) {
					ci(b, a, c);
					break;
				} else if (1 === b.tag) {
					var d = b.stateNode;
					if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Mf || !Mf.has(d))) {
						a = Ef(c, a);
						a = Lf(b, a, 1);
						b = he(b, a, 1);
						a = O();
						null !== b && (Fc(b, 1, a), Kh(b, a));
						break;
					}
				}
				b = b.return;
			}
		}
		function Of(a, b, c) {
			var d = a.pingCache;
			null !== d && d.delete(b);
			b = O();
			a.pingedLanes |= a.suspendedLanes & c;
			N === a && (Z & c) === c && (4 === R || 3 === R && (Z & 130023424) === Z && 500 > D() - bh ? Rh(a, 0) : xh |= c);
			Kh(a, b);
		}
		function di(a, b) {
			0 === b && (0 === (a.mode & 1) ? b = 1 : (b = xc, xc <<= 1, 0 === (xc & 130023424) && (xc = 4194304)));
			var c = O();
			a = ce(a, b);
			null !== a && (Fc(a, b, c), Kh(a, c));
		}
		function og(a) {
			var b = a.memoizedState, c = 0;
			null !== b && (c = b.retryLane);
			di(a, c);
		}
		function Yg(a, b) {
			var c = 0;
			switch (a.tag) {
				case 13:
					var d = a.stateNode;
					var e = a.memoizedState;
					null !== e && (c = e.retryLane);
					break;
				case 19:
					d = a.stateNode;
					break;
				default: throw Error(n(314));
			}
			null !== d && d.delete(b);
			di(a, c);
		}
		var ai = function(a, b, c) {
			if (null !== a) if (a.memoizedProps !== b.pendingProps || z.current) G = !0;
			else {
				if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return G = !1, sg(a, b, c);
				G = 0 !== (a.flags & 131072) ? !0 : !1;
			}
			else G = !1, F && 0 !== (b.flags & 1048576) && ld(b, ed, b.index);
			b.lanes = 0;
			switch (b.tag) {
				case 2:
					var d = b.type;
					cg(a, b);
					a = b.pendingProps;
					var e = mc(b, x.current);
					Yd(b, c);
					e = He(null, b, d, a, e, c);
					var f = Me();
					b.flags |= 1;
					"object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, A(d) ? (f = !0, qc(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ee(b), e.updater = zf, b.stateNode = e, e._reactInternals = b, Df(b, d, a, c), b = dg(null, b, d, !0, f, c)) : (b.tag = 0, F && f && md(b), P(null, b, e, c), b = b.child);
					return b;
				case 16:
					d = b.elementType;
					a: {
						cg(a, b);
						a = b.pendingProps;
						e = d._init;
						d = e(d._payload);
						b.type = d;
						e = b.tag = ei(d);
						a = xf(d, a);
						switch (e) {
							case 0:
								b = Xf(null, b, d, a, c);
								break a;
							case 1:
								b = bg(null, b, d, a, c);
								break a;
							case 11:
								b = Sf(null, b, d, a, c);
								break a;
							case 14:
								b = Uf(null, b, d, xf(d.type, a), c);
								break a;
						}
						throw Error(n(306, d, ""));
					}
					return b;
				case 0: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : xf(d, e), Xf(a, b, d, e, c);
				case 1: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : xf(d, e), bg(a, b, d, e, c);
				case 3:
					a: {
						eg(b);
						if (null === a) throw Error(n(387));
						d = b.pendingProps;
						f = b.memoizedState;
						e = f.element;
						fe(a, b);
						ke(b, d, null, c);
						var g = b.memoizedState;
						d = g.element;
						if (Va && f.isDehydrated) if (f = {
							element: d,
							isDehydrated: !1,
							cache: g.cache,
							pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
							transitions: g.transitions
						}, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
							e = Ef(Error(n(423)), b);
							b = fg(a, b, d, c, e);
							break a;
						} else if (d !== e) {
							e = Ef(Error(n(424)), b);
							b = fg(a, b, d, c, e);
							break a;
						} else for (Va && (pd = Pb(b.stateNode.containerInfo), od = b, F = !0, rd = null, qd = !1), c = Pd(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
						else {
							Ad();
							if (d === e) {
								b = Tf(a, b, c);
								break a;
							}
							P(a, b, d, c);
						}
						b = b.child;
					}
					return b;
				case 5: return ue(b), null === a && wd(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Na(d, e) ? g = null : null !== f && Na(d, f) && (b.flags |= 32), ag(a, b), P(a, b, g, c), b.child;
				case 6: return null === a && wd(b), null;
				case 13: return ig(a, b, c);
				case 4: return se(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Od(b, null, d, c) : P(a, b, d, c), b.child;
				case 11: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : xf(d, e), Sf(a, b, d, e, c);
				case 7: return P(a, b, b.pendingProps, c), b.child;
				case 8: return P(a, b, b.pendingProps.children, c), b.child;
				case 12: return P(a, b, b.pendingProps.children, c), b.child;
				case 10:
					a: {
						d = b.type._context;
						e = b.pendingProps;
						f = b.memoizedProps;
						g = e.value;
						Vd(b, d, g);
						if (null !== f) if (Vc(f.value, g)) {
							if (f.children === e.children && !z.current) {
								b = Tf(a, b, c);
								break a;
							}
						} else for (f = b.child, null !== f && (f.return = b); null !== f;) {
							var h = f.dependencies;
							if (null !== h) {
								g = f.child;
								for (var k = h.firstContext; null !== k;) {
									if (k.context === d) {
										if (1 === f.tag) {
											k = ge(-1, c & -c);
											k.tag = 2;
											var l = f.updateQueue;
											if (null !== l) {
												l = l.shared;
												var m = l.pending;
												null === m ? k.next = k : (k.next = m.next, m.next = k);
												l.pending = k;
											}
										}
										f.lanes |= c;
										k = f.alternate;
										null !== k && (k.lanes |= c);
										Xd(f.return, c, b);
										h.lanes |= c;
										break;
									}
									k = k.next;
								}
							} else if (10 === f.tag) g = f.type === b.type ? null : f.child;
							else if (18 === f.tag) {
								g = f.return;
								if (null === g) throw Error(n(341));
								g.lanes |= c;
								h = g.alternate;
								null !== h && (h.lanes |= c);
								Xd(g, c, b);
								g = f.sibling;
							} else g = f.child;
							if (null !== g) g.return = f;
							else for (g = f; null !== g;) {
								if (g === b) {
									g = null;
									break;
								}
								f = g.sibling;
								if (null !== f) {
									f.return = g.return;
									g = f;
									break;
								}
								g = g.return;
							}
							f = g;
						}
						P(a, b, e.children, c);
						b = b.child;
					}
					return b;
				case 9: return e = b.type, d = b.pendingProps.children, Yd(b, c), e = Zd(e), d = d(e), b.flags |= 1, P(a, b, d, c), b.child;
				case 14: return d = b.type, e = xf(d, b.pendingProps), e = xf(d.type, e), Uf(a, b, d, e, c);
				case 15: return Wf(a, b, b.type, b.pendingProps, c);
				case 17: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : xf(d, e), cg(a, b), b.tag = 1, A(d) ? (a = !0, qc(b)) : a = !1, Yd(b, c), Bf(b, d, e), Df(b, d, e, c), dg(null, b, d, !0, a, c);
				case 19: return rg(a, b, c);
				case 22: return Yf(a, b, c);
			}
			throw Error(n(156, b.tag));
		};
		function Mh(a, b) {
			return Jc(a, b);
		}
		function fi(a, b, c, d) {
			this.tag = a;
			this.key = c;
			this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
			this.index = 0;
			this.ref = null;
			this.pendingProps = b;
			this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
			this.mode = d;
			this.subtreeFlags = this.flags = 0;
			this.deletions = null;
			this.childLanes = this.lanes = 0;
			this.alternate = null;
		}
		function td(a, b, c, d) {
			return new fi(a, b, c, d);
		}
		function Vf(a) {
			a = a.prototype;
			return !(!a || !a.isReactComponent);
		}
		function ei(a) {
			if ("function" === typeof a) return Vf(a) ? 1 : 0;
			if (void 0 !== a && null !== a) {
				a = a.$$typeof;
				if (a === ma) return 11;
				if (a === pa) return 14;
			}
			return 2;
		}
		function Jd(a, b) {
			var c = a.alternate;
			null === c ? (c = td(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
			c.flags = a.flags & 14680064;
			c.childLanes = a.childLanes;
			c.lanes = a.lanes;
			c.child = a.child;
			c.memoizedProps = a.memoizedProps;
			c.memoizedState = a.memoizedState;
			c.updateQueue = a.updateQueue;
			b = a.dependencies;
			c.dependencies = null === b ? null : {
				lanes: b.lanes,
				firstContext: b.firstContext
			};
			c.sibling = a.sibling;
			c.index = a.index;
			c.ref = a.ref;
			return c;
		}
		function Ld(a, b, c, d, e, f) {
			var g = 2;
			d = a;
			if ("function" === typeof a) Vf(a) && (g = 1);
			else if ("string" === typeof a) g = 5;
			else a: switch (a) {
				case ha: return Nd(c.children, e, f, b);
				case ia:
					g = 8;
					e |= 8;
					break;
				case ja: return a = td(12, c, b, e | 2), a.elementType = ja, a.lanes = f, a;
				case na: return a = td(13, c, b, e), a.elementType = na, a.lanes = f, a;
				case oa: return a = td(19, c, b, e), a.elementType = oa, a.lanes = f, a;
				case ra: return jg(c, e, f, b);
				default:
					if ("object" === typeof a && null !== a) switch (a.$$typeof) {
						case ka:
							g = 10;
							break a;
						case la:
							g = 9;
							break a;
						case ma:
							g = 11;
							break a;
						case pa:
							g = 14;
							break a;
						case qa:
							g = 16;
							d = null;
							break a;
					}
					throw Error(n(130, null == a ? a : typeof a, ""));
			}
			b = td(g, c, b, e);
			b.elementType = a;
			b.type = d;
			b.lanes = f;
			return b;
		}
		function Nd(a, b, c, d) {
			a = td(7, a, d, b);
			a.lanes = c;
			return a;
		}
		function jg(a, b, c, d) {
			a = td(22, a, d, b);
			a.elementType = ra;
			a.lanes = c;
			a.stateNode = { isHidden: !1 };
			return a;
		}
		function Kd(a, b, c) {
			a = td(6, a, null, b);
			a.lanes = c;
			return a;
		}
		function Md(a, b, c) {
			b = td(4, null !== a.children ? a.children : [], a.key, b);
			b.lanes = c;
			b.stateNode = {
				containerInfo: a.containerInfo,
				pendingChildren: null,
				implementation: a.implementation
			};
			return b;
		}
		function gi(a, b, c, d, e) {
			this.tag = b;
			this.containerInfo = a;
			this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
			this.timeoutHandle = Ra;
			this.callbackNode = this.pendingContext = this.context = null;
			this.callbackPriority = 0;
			this.eventTimes = Ec(0);
			this.expirationTimes = Ec(-1);
			this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
			this.entanglements = Ec(0);
			this.identifierPrefix = d;
			this.onRecoverableError = e;
			Va && (this.mutableSourceEagerHydrationData = null);
		}
		function hi(a, b, c, d, e, f, g, h, k) {
			a = new gi(a, b, c, h, k);
			1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
			f = td(3, null, null, b);
			a.current = f;
			f.stateNode = a;
			f.memoizedState = {
				element: d,
				isDehydrated: c,
				cache: null,
				transitions: null,
				pendingSuspenseBoundaries: null
			};
			ee(f);
			return a;
		}
		function ii(a) {
			if (!a) return jc;
			a = a._reactInternals;
			a: {
				if (wa(a) !== a || 1 !== a.tag) throw Error(n(170));
				var b = a;
				do {
					switch (b.tag) {
						case 3:
							b = b.stateNode.context;
							break a;
						case 1: if (A(b.type)) {
							b = b.stateNode.__reactInternalMemoizedMergedChildContext;
							break a;
						}
					}
					b = b.return;
				} while (null !== b);
				throw Error(n(171));
			}
			if (1 === a.tag) {
				var c = a.type;
				if (A(c)) return pc(a, c, b);
			}
			return b;
		}
		function ji(a) {
			var b = a._reactInternals;
			if (void 0 === b) {
				if ("function" === typeof a.render) throw Error(n(188));
				a = Object.keys(a).join(",");
				throw Error(n(268, a));
			}
			a = Aa(b);
			return null === a ? null : a.stateNode;
		}
		function ki(a, b) {
			a = a.memoizedState;
			if (null !== a && null !== a.dehydrated) {
				var c = a.retryLane;
				a.retryLane = 0 !== c && c < b ? c : b;
			}
		}
		function li(a, b) {
			ki(a, b);
			(a = a.alternate) && ki(a, b);
		}
		function mi(a) {
			a = Aa(a);
			return null === a ? null : a.stateNode;
		}
		function ni() {
			return null;
		}
		exports$1.attemptContinuousHydration = function(a) {
			if (13 === a.tag) {
				var b = ce(a, 134217728);
				if (null !== b) af(b, a, 134217728, O());
				li(a, 134217728);
			}
		};
		exports$1.attemptDiscreteHydration = function(a) {
			if (13 === a.tag) {
				var b = ce(a, 1);
				if (null !== b) af(b, a, 1, O());
				li(a, 1);
			}
		};
		exports$1.attemptHydrationAtCurrentPriority = function(a) {
			if (13 === a.tag) {
				var b = tf(a), c = ce(a, b);
				if (null !== c) af(c, a, b, O());
				li(a, b);
			}
		};
		exports$1.attemptSynchronousHydration = function(a) {
			switch (a.tag) {
				case 3:
					var b = a.stateNode;
					if (b.current.memoizedState.isDehydrated) {
						var c = yc(b.pendingLanes);
						0 !== c && (Hc(b, c | 1), Kh(b, D()), 0 === (H & 6) && (Bh(), ad()));
					}
					break;
				case 13: Xh(function() {
					var b = ce(a, 1);
					if (null !== b) af(b, a, 1, O());
				}), li(a, 1);
			}
		};
		exports$1.batchedUpdates = function(a, b) {
			var c = H;
			H |= 1;
			try {
				return a(b);
			} finally {
				H = c, 0 === H && (Bh(), Xc && ad());
			}
		};
		exports$1.createComponentSelector = function(a) {
			return {
				$$typeof: hh,
				value: a
			};
		};
		exports$1.createContainer = function(a, b, c, d, e, f, g) {
			return hi(a, b, !1, null, c, d, e, f, g);
		};
		exports$1.createHasPseudoClassSelector = function(a) {
			return {
				$$typeof: ih,
				value: a
			};
		};
		exports$1.createHydrationContainer = function(a, b, c, d, e, f, g, h, k) {
			a = hi(c, d, !0, a, e, f, g, h, k);
			a.context = ii(null);
			c = a.current;
			d = O();
			e = tf(c);
			f = ge(d, e);
			f.callback = void 0 !== b && null !== b ? b : null;
			he(c, f, e);
			a.current.lanes = e;
			Fc(a, e, d);
			Kh(a, d);
			return a;
		};
		exports$1.createPortal = function(a, b, c) {
			var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			return {
				$$typeof: fa,
				key: null == d ? null : "" + d,
				children: a,
				containerInfo: b,
				implementation: c
			};
		};
		exports$1.createRoleSelector = function(a) {
			return {
				$$typeof: jh,
				value: a
			};
		};
		exports$1.createTestNameSelector = function(a) {
			return {
				$$typeof: kh,
				value: a
			};
		};
		exports$1.createTextSelector = function(a) {
			return {
				$$typeof: lh,
				value: a
			};
		};
		exports$1.deferredUpdates = function(a) {
			var b = C, c = W.transition;
			try {
				return W.transition = null, C = 16, a();
			} finally {
				C = b, W.transition = c;
			}
		};
		exports$1.discreteUpdates = function(a, b, c, d, e) {
			var f = C, g = W.transition;
			try {
				return W.transition = null, C = 1, a(b, c, d, e);
			} finally {
				C = f, W.transition = g, 0 === H && Bh();
			}
		};
		exports$1.findAllNodes = rh;
		exports$1.findBoundingRects = function(a, b) {
			if (!bb) throw Error(n(363));
			b = rh(a, b);
			a = [];
			for (var c = 0; c < b.length; c++) a.push(db(b[c]));
			for (b = a.length - 1; 0 < b; b--) {
				c = a[b];
				for (var d = c.x, e = d + c.width, f = c.y, g = f + c.height, h = b - 1; 0 <= h; h--) if (b !== h) {
					var k = a[h], l = k.x, m = l + k.width, r = k.y, p = r + k.height;
					if (d >= l && f >= r && e <= m && g <= p) {
						a.splice(b, 1);
						break;
					} else if (!(d !== l || c.width !== k.width || p < f || r > g)) {
						r > f && (k.height += r - f, k.y = f);
						p < g && (k.height = g - r);
						a.splice(b, 1);
						break;
					} else if (!(f !== r || c.height !== k.height || m < d || l > e)) {
						l > d && (k.width += l - d, k.x = d);
						m < e && (k.width = e - l);
						a.splice(b, 1);
						break;
					}
				}
			}
			return a;
		};
		exports$1.findHostInstance = ji;
		exports$1.findHostInstanceWithNoPortals = function(a) {
			a = za(a);
			a = null !== a ? Ca(a) : null;
			return null === a ? null : a.stateNode;
		};
		exports$1.findHostInstanceWithWarning = function(a) {
			return ji(a);
		};
		exports$1.flushControlled = function(a) {
			var b = H;
			H |= 1;
			var c = W.transition, d = C;
			try {
				W.transition = null, C = 1, a();
			} finally {
				C = d, W.transition = c, H = b, 0 === H && (Bh(), ad());
			}
		};
		exports$1.flushPassiveEffects = Oh;
		exports$1.flushSync = Xh;
		exports$1.focusWithin = function(a, b) {
			if (!bb) throw Error(n(363));
			a = nh(a);
			b = qh(a, b);
			b = Array.from(b);
			for (a = 0; a < b.length;) {
				var c = b[a++];
				if (!fb(c)) {
					if (5 === c.tag && hb(c.stateNode)) return !0;
					for (c = c.child; null !== c;) b.push(c), c = c.sibling;
				}
			}
			return !1;
		};
		exports$1.getCurrentUpdatePriority = function() {
			return C;
		};
		exports$1.getFindAllNodesFailureDescription = function(a, b) {
			if (!bb) throw Error(n(363));
			var c = 0, d = [];
			a = [nh(a), 0];
			for (var e = 0; e < a.length;) {
				var f = a[e++], g = a[e++], h = b[g];
				if (5 !== f.tag || !fb(f)) {
					if (oh(f, h) && (d.push(ph(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) a.push(f, g), f = f.sibling;
				}
			}
			if (c < b.length) {
				for (a = []; c < b.length; c++) a.push(ph(b[c]));
				return "findAllNodes was able to match part of the selector:\n  " + (d.join(" > ") + "\n\nNo matching component was found for:\n  ") + a.join(" > ");
			}
			return null;
		};
		exports$1.getPublicRootInstance = function(a) {
			a = a.current;
			if (!a.child) return null;
			switch (a.child.tag) {
				case 5: return Ea(a.child.stateNode);
				default: return a.child.stateNode;
			}
		};
		exports$1.injectIntoDevTools = function(a) {
			a = {
				bundleType: a.bundleType,
				version: a.version,
				rendererPackageName: a.rendererPackageName,
				rendererConfig: a.rendererConfig,
				overrideHookState: null,
				overrideHookStateDeletePath: null,
				overrideHookStateRenamePath: null,
				overrideProps: null,
				overridePropsDeletePath: null,
				overridePropsRenamePath: null,
				setErrorHandler: null,
				setSuspenseHandler: null,
				scheduleUpdate: null,
				currentDispatcherRef: da.ReactCurrentDispatcher,
				findHostInstanceByFiber: mi,
				findFiberByHostInstance: a.findFiberByHostInstance || ni,
				findHostInstancesForRefresh: null,
				scheduleRefresh: null,
				scheduleRoot: null,
				setRefreshHandler: null,
				getCurrentFiber: null,
				reconcilerVersion: "18.3.1"
			};
			if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;
			else {
				var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
				if (b.isDisabled || !b.supportsFiber) a = !0;
				else {
					try {
						Rc = b.inject(a), Sc = b;
					} catch (c) {}
					a = b.checkDCE ? !0 : !1;
				}
			}
			return a;
		};
		exports$1.isAlreadyRendering = function() {
			return !1;
		};
		exports$1.observeVisibleRects = function(a, b, c, d) {
			if (!bb) throw Error(n(363));
			a = rh(a, b);
			var e = ib(a, c, d).disconnect;
			return { disconnect: function() {
				e();
			} };
		};
		exports$1.registerMutableSourceForHydration = function(a, b) {
			var c = b._getVersion;
			c = c(b._source);
			null == a.mutableSourceEagerHydrationData ? a.mutableSourceEagerHydrationData = [b, c] : a.mutableSourceEagerHydrationData.push(b, c);
		};
		exports$1.runWithPriority = function(a, b) {
			var c = C;
			try {
				return C = a, b();
			} finally {
				C = c;
			}
		};
		exports$1.shouldError = function() {
			return null;
		};
		exports$1.shouldSuspend = function() {
			return !1;
		};
		exports$1.updateContainer = function(a, b, c, d) {
			var e = b.current, f = O(), g = tf(e);
			c = ii(c);
			null === b.context ? b.context = c : b.pendingContext = c;
			b = ge(f, g);
			b.payload = { element: a };
			d = void 0 === d ? null : d;
			null !== d && (b.callback = d);
			a = he(e, b, g);
			null !== a && (af(a, e, g, f), ie(a, e, g));
			return g;
		};
		return exports$1;
	};
}));
//#endregion
//#region node_modules/react-reconciler/index.js
var require_react_reconciler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_reconciler_production_min();
}));
//#endregion
//#region node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js
/**
* @license React
* react-reconciler-constants.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_reconciler_constants_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.DefaultEventPriority = 16;
	exports.LegacyRoot = 0;
}));
//#endregion
//#region node_modules/react-reconciler/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_reconciler_constants_production_min();
}));
//#endregion
//#region node_modules/react-konva/es/makeUpdates.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = /* @__PURE__ */ __toESM(require_client());
require_lib();
var import_Core = /* @__PURE__ */ __toESM(require_Core());
var import_react_reconciler = /* @__PURE__ */ __toESM(require_react_reconciler());
var import_constants = require_constants();
var import_Global = require_Global();
var propsToSkip = {
	children: true,
	ref: true,
	key: true,
	style: true,
	forwardedRef: true,
	unstable_applyCache: true,
	unstable_applyDrawHitFromCache: true
};
var zIndexWarningShowed = false;
var dragWarningShowed = false;
var EVENTS_NAMESPACE = ".react-konva-event";
var useStrictMode = false;
var DRAGGABLE_WARNING = `ReactKonva: You have a Konva node with draggable = true and position defined but no onDragMove or onDragEnd events are handled.
Position of a node will be changed during drag&drop, so you should update state of the react app as well.
Consider to add onDragMove or onDragEnd events.
For more info see: https://github.com/konvajs/react-konva/issues/256
`;
var Z_INDEX_WARNING = `ReactKonva: You are using "zIndex" attribute for a Konva node.
react-konva may get confused with ordering. Just define correct order of elements in your render function of a component.
For more info see: https://github.com/konvajs/react-konva/issues/194
`;
var EMPTY_PROPS = {};
function applyNodeProps(instance, props, oldProps = EMPTY_PROPS) {
	if (!zIndexWarningShowed && "zIndex" in props) {
		console.warn(Z_INDEX_WARNING);
		zIndexWarningShowed = true;
	}
	if (!dragWarningShowed && props.draggable) {
		var hasPosition = props.x !== void 0 || props.y !== void 0;
		var hasEvents = props.onDragEnd || props.onDragMove;
		if (hasPosition && !hasEvents) {
			console.warn(DRAGGABLE_WARNING);
			dragWarningShowed = true;
		}
	}
	for (var key in oldProps) {
		if (propsToSkip[key]) continue;
		var isEvent = key.slice(0, 2) === "on";
		var propChanged = oldProps[key] !== props[key];
		if (isEvent && propChanged) {
			var eventName = key.substr(2).toLowerCase();
			if (eventName.substr(0, 7) === "content") eventName = "content" + eventName.substr(7, 1).toUpperCase() + eventName.substr(8);
			instance.off(eventName, oldProps[key]);
		}
		if (!props.hasOwnProperty(key)) instance.setAttr(key, void 0);
	}
	var strictUpdate = useStrictMode || props._useStrictMode;
	var updatedProps = {};
	var hasUpdates = false;
	const newEvents = {};
	for (var key in props) {
		if (propsToSkip[key]) continue;
		var isEvent = key.slice(0, 2) === "on";
		var toAdd = oldProps[key] !== props[key];
		if (isEvent && toAdd) {
			var eventName = key.substr(2).toLowerCase();
			if (eventName.substr(0, 7) === "content") eventName = "content" + eventName.substr(7, 1).toUpperCase() + eventName.substr(8);
			if (props[key]) newEvents[eventName] = props[key];
		}
		if (!isEvent && (props[key] !== oldProps[key] || strictUpdate && props[key] !== instance.getAttr(key))) {
			hasUpdates = true;
			updatedProps[key] = props[key];
		}
	}
	if (hasUpdates) {
		instance.setAttrs(updatedProps);
		updatePicture(instance);
	}
	for (var eventName in newEvents) instance.on(eventName + EVENTS_NAMESPACE, newEvents[eventName]);
}
function updatePicture(node) {
	if (!import_Global.Konva.autoDrawEnabled) {
		var drawingNode = node.getLayer() || node.getStage();
		drawingNode && drawingNode.batchDraw();
	}
}
//#endregion
//#region node_modules/react-konva/es/ReactKonvaHostConfig.js
var ReactKonvaHostConfig_exports = /* @__PURE__ */ __exportAll({
	appendChild: () => appendChild,
	appendChildToContainer: () => appendChildToContainer,
	appendInitialChild: () => appendInitialChild,
	cancelTimeout: () => cancelTimeout,
	clearContainer: () => clearContainer,
	commitMount: () => commitMount,
	commitTextUpdate: () => commitTextUpdate,
	commitUpdate: () => commitUpdate,
	createInstance: () => createInstance,
	createTextInstance: () => createTextInstance,
	detachDeletedInstance: () => detachDeletedInstance,
	finalizeInitialChildren: () => finalizeInitialChildren,
	getChildHostContext: () => getChildHostContext,
	getCurrentEventPriority: () => getCurrentEventPriority,
	getPublicInstance: () => getPublicInstance,
	getRootHostContext: () => getRootHostContext,
	hideInstance: () => hideInstance,
	hideTextInstance: () => hideTextInstance,
	idlePriority: () => import_scheduler.unstable_IdlePriority,
	insertBefore: () => insertBefore,
	insertInContainerBefore: () => insertInContainerBefore,
	isPrimaryRenderer: () => false,
	noTimeout: () => -1,
	now: () => import_scheduler.unstable_now,
	prepareForCommit: () => prepareForCommit,
	preparePortalMount: () => preparePortalMount,
	prepareUpdate: () => prepareUpdate,
	removeChild: () => removeChild,
	removeChildFromContainer: () => removeChildFromContainer,
	resetAfterCommit: () => resetAfterCommit,
	resetTextContent: () => resetTextContent,
	run: () => import_scheduler.unstable_runWithPriority,
	scheduleTimeout: () => scheduleTimeout,
	shouldDeprioritizeSubtree: () => shouldDeprioritizeSubtree,
	shouldSetTextContent: () => shouldSetTextContent,
	supportsMutation: () => true,
	unhideInstance: () => unhideInstance,
	unhideTextInstance: () => unhideTextInstance,
	warnsIfNotActing: () => true
});
var import_scheduler = require_scheduler();
var NO_CONTEXT = {};
var UPDATE_SIGNAL = {};
import_Core.default.Node.prototype._applyProps = applyNodeProps;
function appendInitialChild(parentInstance, child) {
	if (typeof child === "string") {
		console.error(`Do not use plain text as child of Konva.Node. You are using text: ${child}`);
		return;
	}
	parentInstance.add(child);
	updatePicture(parentInstance);
}
function createInstance(type, props, internalInstanceHandle) {
	let NodeClass = import_Core.default[type];
	if (!NodeClass) {
		console.error(`Konva has no node with the type ${type}. Group will be used instead. If you use minimal version of react-konva, just import required nodes into Konva: "import "konva/lib/shapes/${type}"  If you want to render DOM elements as part of canvas tree take a look into this demo: https://konvajs.github.io/docs/react/DOM_Portal.html`);
		NodeClass = import_Core.default.Group;
	}
	const propsWithoutEvents = {};
	const propsWithOnlyEvents = {};
	for (var key in props) if (key.slice(0, 2) === "on") propsWithOnlyEvents[key] = props[key];
	else propsWithoutEvents[key] = props[key];
	const instance = new NodeClass(propsWithoutEvents);
	applyNodeProps(instance, propsWithOnlyEvents);
	return instance;
}
function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
	console.error(`Text components are not supported for now in ReactKonva. Your text is: "${text}"`);
}
function finalizeInitialChildren(domElement, type, props) {
	return false;
}
function getPublicInstance(instance) {
	return instance;
}
function prepareForCommit() {
	return null;
}
function preparePortalMount() {
	return null;
}
function prepareUpdate(domElement, type, oldProps, newProps) {
	return UPDATE_SIGNAL;
}
function resetAfterCommit() {}
function resetTextContent(domElement) {}
function shouldDeprioritizeSubtree(type, props) {
	return false;
}
function getRootHostContext() {
	return NO_CONTEXT;
}
function getChildHostContext() {
	return NO_CONTEXT;
}
var scheduleTimeout = setTimeout;
var cancelTimeout = clearTimeout;
function shouldSetTextContent(type, props) {
	return false;
}
function appendChild(parentInstance, child) {
	if (child.parent === parentInstance) child.moveToTop();
	else parentInstance.add(child);
	updatePicture(parentInstance);
}
function appendChildToContainer(parentInstance, child) {
	if (child.parent === parentInstance) child.moveToTop();
	else parentInstance.add(child);
	updatePicture(parentInstance);
}
function insertBefore(parentInstance, child, beforeChild) {
	child._remove();
	parentInstance.add(child);
	child.setZIndex(beforeChild.getZIndex());
	updatePicture(parentInstance);
}
function insertInContainerBefore(parentInstance, child, beforeChild) {
	insertBefore(parentInstance, child, beforeChild);
}
function removeChild(parentInstance, child) {
	child.destroy();
	child.off(EVENTS_NAMESPACE);
	updatePicture(parentInstance);
}
function removeChildFromContainer(parentInstance, child) {
	child.destroy();
	child.off(EVENTS_NAMESPACE);
	updatePicture(parentInstance);
}
function commitTextUpdate(textInstance, oldText, newText) {
	console.error(`Text components are not yet supported in ReactKonva. You text is: "${newText}"`);
}
function commitMount(instance, type, newProps) {}
function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
	applyNodeProps(instance, newProps, oldProps);
}
function hideInstance(instance) {
	instance.hide();
	updatePicture(instance);
}
function hideTextInstance(textInstance) {}
function unhideInstance(instance, props) {
	if (props.visible == null || props.visible) instance.show();
}
function unhideTextInstance(textInstance, text) {}
function clearContainer(container) {}
function detachDeletedInstance() {}
var getCurrentEventPriority = () => import_constants.DefaultEventPriority;
//#endregion
//#region node_modules/its-fine/dist/index.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a, _b;
typeof window !== "undefined" && (((_a = window.document) == null ? void 0 : _a.createElement) || ((_b = window.navigator) == null ? void 0 : _b.product) === "ReactNative") ? import_react.useLayoutEffect : import_react.useEffect;
function traverseFiber(fiber, ascending, selector) {
	if (!fiber) return;
	if (selector(fiber) === true) return fiber;
	let child = ascending ? fiber.return : fiber.child;
	while (child) {
		const match = traverseFiber(child, ascending, selector);
		if (match) return match;
		child = ascending ? null : child.sibling;
	}
}
function wrapContext(context) {
	try {
		return Object.defineProperties(context, {
			_currentRenderer: {
				get() {
					return null;
				},
				set() {}
			},
			_currentRenderer2: {
				get() {
					return null;
				},
				set() {}
			}
		});
	} catch (_) {
		return context;
	}
}
var error = console.error;
console.error = function() {
	const message = [...arguments].join("");
	if ((message == null ? void 0 : message.startsWith("Warning:")) && message.includes("useContext")) {
		console.error = error;
		return;
	}
	return error.apply(this, arguments);
};
var FiberContext = wrapContext(import_react.createContext(null));
var FiberProvider = class extends import_react.Component {
	render() {
		return /* @__PURE__ */ import_react.createElement(FiberContext.Provider, { value: this._reactInternals }, this.props.children);
	}
};
function useFiber() {
	const root = import_react.useContext(FiberContext);
	if (root === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
	const id = import_react.useId();
	return import_react.useMemo(() => {
		for (const maybeFiber of [root, root == null ? void 0 : root.alternate]) {
			if (!maybeFiber) continue;
			const fiber2 = traverseFiber(maybeFiber, false, (node) => {
				let state = node.memoizedState;
				while (state) {
					if (state.memoizedState === id) return true;
					state = state.next;
				}
			});
			if (fiber2) return fiber2;
		}
	}, [root, id]);
}
function useContextMap() {
	const fiber = useFiber();
	const [contextMap] = import_react.useState(() => /* @__PURE__ */ new Map());
	contextMap.clear();
	let node = fiber;
	while (node) {
		if (node.type && typeof node.type === "object") {
			const context = node.type._context === void 0 && node.type.Provider === node.type ? node.type : node.type._context;
			if (context && context !== FiberContext && !contextMap.has(context)) contextMap.set(context, import_react.useContext(wrapContext(context)));
		}
		node = node.return;
	}
	return contextMap;
}
function useContextBridge() {
	const contextMap = useContextMap();
	return import_react.useMemo(() => Array.from(contextMap.keys()).reduce((Prev, context) => (props) => /* @__PURE__ */ import_react.createElement(Prev, null, /* @__PURE__ */ import_react.createElement(context.Provider, __spreadProps(__spreadValues({}, props), { value: contextMap.get(context) }))), (props) => /* @__PURE__ */ import_react.createElement(FiberProvider, __spreadValues({}, props))), [contextMap]);
}
//#endregion
//#region node_modules/react-konva/es/ReactKonvaCore.js
/**
* Based on ReactArt.js
* Copyright (c) 2017-present Lavrenov Anton.
* All rights reserved.
*
* MIT
*/
function usePrevious(value) {
	const ref = import_react.useRef({});
	import_react.useLayoutEffect(() => {
		ref.current = value;
	});
	import_react.useLayoutEffect(() => {
		return () => {
			ref.current = {};
		};
	}, []);
	return ref.current;
}
var StageWrap = (props) => {
	const container = import_react.useRef(null);
	const stage = import_react.useRef(null);
	const fiberRef = import_react.useRef(null);
	const oldProps = usePrevious(props);
	const Bridge = useContextBridge();
	const _setRef = (stage) => {
		const { forwardedRef } = props;
		if (!forwardedRef) return;
		if (typeof forwardedRef === "function") forwardedRef(stage);
		else forwardedRef.current = stage;
	};
	import_react.useLayoutEffect(() => {
		stage.current = new import_Core.default.Stage({
			width: props.width,
			height: props.height,
			container: container.current
		});
		_setRef(stage.current);
		fiberRef.current = KonvaRenderer.createContainer(stage.current, import_constants.LegacyRoot, false, null);
		KonvaRenderer.updateContainer(import_react.createElement(Bridge, {}, props.children), fiberRef.current);
		return () => {
			if (!import_Core.default.isBrowser) return;
			_setRef(null);
			KonvaRenderer.updateContainer(null, fiberRef.current, null);
			stage.current.destroy();
		};
	}, []);
	import_react.useLayoutEffect(() => {
		_setRef(stage.current);
		applyNodeProps(stage.current, props, oldProps);
		KonvaRenderer.updateContainer(import_react.createElement(Bridge, {}, props.children), fiberRef.current, null);
	});
	return import_react.createElement("div", {
		ref: container,
		id: props.id,
		accessKey: props.accessKey,
		className: props.className,
		role: props.role,
		style: props.style,
		tabIndex: props.tabIndex,
		title: props.title
	});
};
var Layer = "Layer";
var Group = "Group";
var Rect = "Rect";
var Line = "Line";
var Image$1 = "Image";
var Text = "Text";
var Transformer = "Transformer";
var KonvaRenderer = (0, import_react_reconciler.default)(ReactKonvaHostConfig_exports);
KonvaRenderer.injectIntoDevTools({
	findHostInstanceByFiber: () => null,
	bundleType: 0,
	version: "18.3.1",
	rendererPackageName: "react-konva"
});
var Stage = import_react.forwardRef((props, ref) => {
	return import_react.createElement(FiberProvider, {}, import_react.createElement(StageWrap, {
		...props,
		forwardedRef: ref
	}));
});
//#endregion
//#region node_modules/react-konva/es/ReactKonva.js
/**
* Based on ReactArt.js
* Copyright (c) 2017-present Lavrenov Anton.
* All rights reserved.
*
* MIT
*/
//#endregion
//#region src/canvas/constants.ts
var FRAME_WIDTH = 1080;
var FRAME_HEIGHT = 1080;
var CANVAS_SCALE = .5;
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => {
		listeners.clear();
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe,
		destroy
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react(), shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region node_modules/zustand/esm/index.mjs
var import_with_selector = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
})))(), 1);
var { useDebugValue } = import_react.default;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
	useDebugValue(slice);
	return slice;
}
var createImpl = (createState) => {
	const api = typeof createState === "function" ? createStore(createState) : createState;
	const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
	Object.assign(useBoundStore, api);
	return useBoundStore;
};
var create = (createState) => createState ? createImpl(createState) : createImpl;
//#endregion
//#region src/canvas/useCanvasStore.ts
var useCanvasStore = create((set) => ({
	objects: {},
	objectOrder: [],
	selectedId: null,
	frameCount: 2,
	addObject: (obj) => set((state) => ({
		objects: {
			...state.objects,
			[obj.id]: obj
		},
		objectOrder: [...state.objectOrder, obj.id]
	})),
	updateObject: (id, patch) => set((state) => {
		const existing = state.objects[id];
		if (!existing) return state;
		return { objects: {
			...state.objects,
			[id]: {
				...existing,
				...patch
			}
		} };
	}),
	removeObject: (id) => set((state) => {
		const { [id]: _removed, ...rest } = state.objects;
		return {
			objects: rest,
			objectOrder: state.objectOrder.filter((oid) => oid !== id),
			selectedId: state.selectedId === id ? null : state.selectedId
		};
	}),
	setSelected: (id) => set({ selectedId: id })
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.min.js
/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var f = require_react(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function q(c, a, g) {
		var b, d = {}, e = null, h = null;
		void 0 !== g && (e = "" + g);
		void 0 !== a.key && (e = "" + a.key);
		void 0 !== a.ref && (h = a.ref);
		for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
		if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
		return {
			$$typeof: k,
			type: c,
			key: e,
			ref: h,
			props: d,
			_owner: n.current
		};
	}
	exports.Fragment = l;
	exports.jsx = q;
	exports.jsxs = q;
}));
//#endregion
//#region src/canvas/FrameGuides.tsx
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production_min();
})))();
function FrameGuides({ frameCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: 0,
			y: 0,
			width: frameCount * FRAME_WIDTH,
			height: FRAME_HEIGHT,
			fill: "white"
		}),
		Array.from({ length: frameCount - 1 }, (_, i) => {
			const x = (i + 1) * FRAME_WIDTH;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				points: [
					x,
					0,
					x,
					FRAME_HEIGHT
				],
				stroke: "red",
				strokeWidth: 2,
				dash: [10, 6]
			}, `divider-${i}`);
		}),
		Array.from({ length: frameCount }, (_, i) => {
			const centerX = i * FRAME_WIDTH + FRAME_WIDTH / 2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				text: String(i + 1),
				x: centerX - 12,
				y: 16,
				fontSize: 24,
				fontFamily: "sans-serif",
				fill: "red",
				align: "center",
				width: 24
			}, `label-${i}`);
		})
	] });
}
//#endregion
//#region src/canvas/CanvasImageNode.tsx
var import_use_image = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var React = require_react();
	module.exports = function useImage(url, crossOrigin, referrerpolicy) {
		const statusRef = React.useRef("loading");
		const imageRef = React.useRef();
		const [_, setStateToken] = React.useState(0);
		const oldUrl = React.useRef();
		const oldCrossOrigin = React.useRef();
		const oldReferrerPolicy = React.useRef();
		if (oldUrl.current !== url || oldCrossOrigin.current !== crossOrigin || oldReferrerPolicy.current !== referrerpolicy) {
			statusRef.current = "loading";
			imageRef.current = void 0;
			oldUrl.current = url;
			oldCrossOrigin.current = crossOrigin;
			oldReferrerPolicy.current = referrerpolicy;
		}
		React.useLayoutEffect(function() {
			if (!url) return;
			var img = document.createElement("img");
			function onload() {
				img.decode().catch(() => {}).finally(() => {
					statusRef.current = "loaded";
					imageRef.current = img;
					setStateToken(Math.random());
				});
			}
			function onerror() {
				statusRef.current = "failed";
				imageRef.current = void 0;
				setStateToken(Math.random());
			}
			img.addEventListener("load", onload);
			img.addEventListener("error", onerror);
			crossOrigin && (img.crossOrigin = crossOrigin);
			referrerpolicy && (img.referrerPolicy = referrerpolicy);
			img.src = url;
			return function cleanup() {
				img.removeEventListener("load", onload);
				img.removeEventListener("error", onerror);
			};
		}, [
			url,
			crossOrigin,
			referrerpolicy
		]);
		return [imageRef.current, statusRef.current];
	};
})))());
function CanvasImageNode({ obj, isSelected, onSelect }) {
	const [image] = (0, import_use_image.default)(obj.src);
	const imageRef = (0, import_react.useRef)(null);
	const transformerRef = (0, import_react.useRef)(null);
	const updateObject = useCanvasStore((s) => s.updateObject);
	(0, import_react.useEffect)(() => {
		const tr = transformerRef.current;
		const node = imageRef.current;
		if (!tr || !node) return;
		if (isSelected) tr.nodes([node]);
		else tr.nodes([]);
		tr.getLayer()?.batchDraw();
	}, [isSelected]);
	if (!image) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {
		ref: imageRef,
		image,
		x: obj.x,
		y: obj.y,
		width: obj.width,
		height: obj.height,
		rotation: obj.rotation,
		scaleX: obj.scaleX,
		scaleY: obj.scaleY,
		opacity: obj.opacity,
		draggable: !obj.locked,
		onClick: onSelect,
		onTap: onSelect,
		onDragEnd: (e) => {
			updateObject(obj.id, {
				x: e.target.x(),
				y: e.target.y()
			});
		},
		onTransformEnd: (e) => {
			const node = e.target;
			updateObject(obj.id, {
				x: node.x(),
				y: node.y(),
				scaleX: node.scaleX(),
				scaleY: node.scaleY(),
				rotation: node.rotation()
			});
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transformer, {
		ref: transformerRef,
		boundBoxFunc: (oldBox, newBox) => {
			if (newBox.width < 5 || newBox.height < 5) return oldBox;
			return newBox;
		}
	})] });
}
//#endregion
//#region src/canvas/useImageDrop.ts
function useImageDrop(containerRef) {
	const addObject = useCanvasStore((s) => s.addObject);
	const objectOrder = useCanvasStore((s) => s.objectOrder);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		function handleDragOver(e) {
			e.preventDefault();
			e.stopPropagation();
		}
		function handleDrop(e) {
			e.preventDefault();
			e.stopPropagation();
			const file = Array.from(e.dataTransfer?.files ?? []).find((f) => f.type.startsWith("image/"));
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (readerEvent) => {
				const dataUrl = readerEvent.target?.result;
				if (typeof dataUrl !== "string") return;
				const img = new Image();
				img.onload = () => {
					const scale = Math.min(1, 600 / Math.max(img.naturalWidth, img.naturalHeight));
					const w = Math.round(img.naturalWidth * scale);
					const h = Math.round(img.naturalHeight * scale);
					addObject({
						id: crypto.randomUUID(),
						type: "image",
						scope: "global",
						src: dataUrl,
						backgroundRemoved: false,
						x: FRAME_WIDTH / 2 - w / 2,
						y: FRAME_HEIGHT / 2 - h / 2,
						width: w,
						height: h,
						rotation: 0,
						scaleX: 1,
						scaleY: 1,
						opacity: 1,
						visible: true,
						locked: false,
						zIndex: objectOrder.length
					});
				};
				img.src = dataUrl;
			};
			reader.readAsDataURL(file);
		}
		container.addEventListener("dragover", handleDragOver);
		container.addEventListener("drop", handleDrop);
		return () => {
			container.removeEventListener("dragover", handleDragOver);
			container.removeEventListener("drop", handleDrop);
		};
	}, [
		containerRef,
		addObject,
		objectOrder.length
	]);
}
//#endregion
//#region src/canvas/exportFrames.ts
/**
* Exports each carousel frame as a PNG Blob at 2x pixel ratio (2160×2160 for
* 1080×1080 frames).
*
* Konva v9 stage.toCanvas() does not support cropping via { x, y, width, height }
* — it always outputs the full stage canvas. The workaround:
*   1. Temporarily set stage scale to 1 and resize to full logical dimensions.
*   2. Call stage.toCanvas({ pixelRatio: 2 }) to get the full canvas at 2x.
*   3. Crop each frame manually using Canvas 2D drawImage.
*   4. Restore stage to its display state in the finally block.
*/
async function exportFrames(stage, frameCount, frameWidth, frameHeight) {
	const transformers = stage.find("Transformer");
	transformers.forEach((t) => t.hide());
	const guidesLayer = stage.findOne(".guides");
	if (guidesLayer) guidesLayer.hide();
	const origWidth = stage.width();
	const origHeight = stage.height();
	const origScaleX = stage.scaleX();
	const origScaleY = stage.scaleY();
	stage.width(frameCount * frameWidth);
	stage.height(frameHeight);
	stage.scaleX(1);
	stage.scaleY(1);
	stage.draw();
	const blobs = [];
	try {
		const PIXEL_RATIO = 2;
		const fullCanvas = stage.toCanvas({ pixelRatio: PIXEL_RATIO });
		console.log("[export] fullCanvas:", fullCanvas.width, "×", fullCanvas.height);
		const crop0 = document.createElement("canvas");
		crop0.width = frameWidth * PIXEL_RATIO;
		crop0.height = frameHeight * PIXEL_RATIO;
		const ctx0 = crop0.getContext("2d");
		if (!ctx0) throw new Error("Failed to get 2d context for frame 0");
		ctx0.drawImage(fullCanvas, 0, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO, 0, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO);
		const blob0 = await new Promise((resolve) => crop0.toBlob((b) => resolve(b), "image/png"));
		console.log(`[export] frame 0: src x=0 blob=${blob0 ? blob0.size : "NULL"}`);
		if (blob0) blobs.push(blob0);
		if (frameCount > 1) {
			const crop1 = document.createElement("canvas");
			crop1.width = frameWidth * PIXEL_RATIO;
			crop1.height = frameHeight * PIXEL_RATIO;
			const ctx1 = crop1.getContext("2d");
			if (!ctx1) throw new Error("Failed to get 2d context for frame 1");
			ctx1.drawImage(fullCanvas, frameWidth * PIXEL_RATIO, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO, 0, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO);
			const blob1 = await new Promise((resolve) => crop1.toBlob((b) => resolve(b), "image/png"));
			console.log(`[export] frame 1: src x=${frameWidth * PIXEL_RATIO} blob=${blob1 ? blob1.size : "NULL"}`);
			if (blob1) blobs.push(blob1);
		}
		for (let i = 2; i < frameCount; i++) {
			const cropCanvas = document.createElement("canvas");
			cropCanvas.width = frameWidth * PIXEL_RATIO;
			cropCanvas.height = frameHeight * PIXEL_RATIO;
			const ctx = cropCanvas.getContext("2d");
			if (!ctx) throw new Error(`Failed to get 2d context for frame ${i}`);
			ctx.drawImage(fullCanvas, i * frameWidth * PIXEL_RATIO, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO, 0, 0, frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO);
			const blob = await new Promise((resolve) => {
				cropCanvas.toBlob((b) => resolve(b), "image/png");
			});
			console.log(`[export] frame ${i}: src x=${i * frameWidth * PIXEL_RATIO} blob=${blob ? blob.size : "NULL"}`);
			if (blob) blobs.push(blob);
		}
	} finally {
		stage.width(origWidth);
		stage.height(origHeight);
		stage.scaleX(origScaleX);
		stage.scaleY(origScaleY);
		stage.draw();
		if (guidesLayer) guidesLayer.show();
		transformers.forEach((t) => t.show());
	}
	return blobs;
}
/**
* Saves each frame PNG to ~/Downloads via Electron IPC.
* Anchor-click downloads are blocked by Electron's Chromium for multi-file
* sequences — IPC + fs.writeFile is the reliable alternative.
*/
async function downloadFrames(blobs) {
	for (let i = 0; i < blobs.length; i++) {
		const filename = `frame-${i + 1}.png`;
		const base64 = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const dataUrl = reader.result;
				resolve(dataUrl.split(",")[1]);
			};
			reader.onerror = () => reject(/* @__PURE__ */ new Error("FileReader failed"));
			reader.readAsDataURL(blobs[i]);
		});
		const result = await window.electronAPI.saveFile(filename, base64);
		console.log(`[download] ${filename}: ${result.success ? "saved to ~/Downloads" : "ERROR: " + result.error}`);
	}
}
//#endregion
//#region src/canvas/CarouselStage.tsx
var _stageInstance = null;
function getStageInstance() {
	return _stageInstance;
}
function CarouselStage() {
	const stageRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const objects = useCanvasStore((s) => s.objects);
	const objectOrder = useCanvasStore((s) => s.objectOrder);
	const selectedId = useCanvasStore((s) => s.selectedId);
	const setSelected = useCanvasStore((s) => s.setSelected);
	const frameCount = useCanvasStore((s) => s.frameCount);
	useImageDrop(containerRef);
	(0, import_react.useEffect)(() => {
		_stageInstance = stageRef.current;
		return () => {
			_stageInstance = null;
		};
	}, []);
	const canvasWidth = frameCount * FRAME_WIDTH * CANVAS_SCALE;
	const canvasHeight = FRAME_HEIGHT * CANVAS_SCALE;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		style: {
			width: canvasWidth,
			height: canvasHeight,
			background: "#1a1a1a"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
			ref: stageRef,
			width: canvasWidth,
			height: canvasHeight,
			scaleX: CANVAS_SCALE,
			scaleY: CANVAS_SCALE,
			onMouseDown: (e) => {
				if (e.target === e.target.getStage()) setSelected(null);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layer, {
				name: "guides",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameGuides, { frameCount })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layer, {
				name: "objects",
				children: objectOrder.map((id) => {
					const obj = objects[id];
					if (!obj || !obj.visible) return null;
					if (obj.type === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasImageNode, {
						obj,
						isSelected: selectedId === id,
						onSelect: () => setSelected(id)
					}, id);
					return null;
				})
			})]
		})
	});
}
//#endregion
//#region src/main.tsx
function App() {
	const frameCount = useCanvasStore((s) => s.frameCount);
	async function handleExport() {
		try {
			const stage = getStageInstance();
			if (!stage) return;
			await downloadFrames(await exportFrames(stage, frameCount, FRAME_WIDTH, FRAME_HEIGHT));
		} catch (err) {
			console.error("[export] failed:", err);
			alert(`Export failed: ${String(err)}`);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			padding: 24,
			background: "#111",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					color: "#fff",
					marginBottom: 16,
					fontFamily: "sans-serif"
				},
				children: "Zero Seams"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselStage, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					handleExport();
				},
				style: {
					marginTop: 16,
					padding: "8px 24px",
					background: "#0af",
					border: "none",
					borderRadius: 6,
					cursor: "pointer",
					fontWeight: "bold"
				},
				children: "Export Frames"
			})
		]
	});
}
var rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");
import_client.createRoot(rootEl).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }));
//#endregion
