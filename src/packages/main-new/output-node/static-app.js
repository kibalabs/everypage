(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@kibalabs/core-react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function(window, factory) {
	var lazySizes = factory(window, window.document, Date);
	window.lazySizes = lazySizes;
	if( true && module.exports){
		module.exports = lazySizes;
	}
}(typeof window != 'undefined' ?
      window : {}, function l(window, document, Date) { // Pass in the windoe Date function also for SSR because the Date class can be lost
	'use strict';
	/*jshint eqnull:true */

	var lazysizes, lazySizesCfg;

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 0,
			throttleDelay: 125,
		};

		lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesCfg)){
				lazySizesCfg[prop] = lazySizesDefaults[prop];
			}
		}
	})();

	if (!document || !document.getElementsByClassName) {
		return {
			init: function () {},
			cfg: lazySizesCfg,
			noSupport: true,
		};
	}

	var docElem = document.documentElement;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	/**
	 * Update to bind to window because 'this' becomes null during SSR
	 * builds.
	 */
	var addEventListener = window[_addEventListener].bind(window);

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('Event');

		if(!detail){
			detail = {};
		}

		detail.instance = lazysizes;

		event.initEvent(name, !noBubbles, !noCancelable);

		event.detail = detail;

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){
			if(full && full.src && !el[_getAttribute]('srcset')){
				el.setAttribute('srcset', full.src);
			}
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function(){
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while(runFns.length){
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function(fn, queue){
			if(running && !queue){
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = lazySizesCfg.throttleDelay;
		var rICTimeout = lazySizesCfg.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesCfg.ricTimeout){
					rICTimeout = lazySizesCfg.ricTimeout;
				}
			} :
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;

			if((isPriority = isPriority === true)){
				rICTimeout = 33;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || delay < 9){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	var loader = (function(){
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isVisible = function (elem) {
			if (isBodyHidden == null) {
				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
			}

			return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = isVisible(elem);

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
				beforeExpandVal, defaultExpand, preloadExpand, hFac;
			var lazyloadElems = lazysizes.elements;

			if((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if (!defaultExpand) {
						defaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?
							docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
							lazySizesCfg.expand;

						lazysizes._defEx = defaultExpand;

						preloadExpand = defaultExpand * lazySizesCfg.expFactor;
						hFac = lazySizesCfg.hFac;
						isBodyHidden = null;

						if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
							currentExpand = preloadExpand;
							lowRuns = 0;
						} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
							currentExpand = defaultExpand;
						} else {
							currentExpand = shrinkExpand;
						}
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			var elem = e.target;

			if (elem._lazyCache) {
				delete elem._lazyCache;
				return;
			}

			resetPreloading(e);
			addClass(elem, lazySizesCfg.loadedClass);
			removeClass(elem, lazySizesCfg.loadingClass);
			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
			triggerEvent(elem, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

			if( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesCfg.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
				src = elem[_getAttribute](lazySizesCfg.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				addClass(elem, lazySizesCfg.loadingClass);

				if(firesLoad){
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(isImg && (srcset || isPicture)){
					updatePolyfill(elem, {src: src});
				}
			}

			if(elem._lazyRace){
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesCfg.lazyClass);

			rAF(function(){
				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
				var isLoaded = elem.complete && elem.naturalWidth > 1;

				if( !firesLoad || isLoaded){
					if (isLoaded) {
						addClass(elem, 'ls-is-cached');
					}
					switchLoadingClass(event);
					elem._lazyCache = true;
					setTimeout(function(){
						if ('_lazyCache' in elem) {
							delete elem._lazyCache;
						}
					}, 9);
				}
				if (elem.loading == 'lazy') {
					isLoading--;
				}
			}, true);
		});

		var unveilElement = function (elem){
			if (elem._lazyRace) {return;}
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var afterScroll = debounce(function(){
			lazySizesCfg.loadMode = 3;
			throttledCheckElements();
		});

		var altLoadmodeScrollListner = function(){
			if(lazySizesCfg.loadMode == 3){
				lazySizesCfg.loadMode = 2;
			}
			afterScroll();
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}


			isCompleted = true;

			lazySizesCfg.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', altLoadmodeScrollListner, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				addEventListener('pageshow', function (e) {
					if (e.persisted) {
						var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

						if (loadingElements.length && loadingElements.forEach) {
							requestAnimationFrame(function () {
								loadingElements.forEach( function (img) {
									if (img.complete) {
										unveilElement(img);
									}
								});
							});
						}
					}
				});

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazysizes.elements.length){
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement,
			_aLSL: altLoadmodeScrollListner,
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i && document.getElementsByClassName){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	setTimeout(function(){
		if(lazySizesCfg.init){
			init();
		}
	});

	lazysizes = {
		cfg: lazySizesCfg,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};

	return lazysizes;
}
));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFound; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};


var NotFound = function NotFound() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Oh my, not found!");
};
var _default = NotFound;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(NotFound, "NotFound", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/pages/404.tsx");
  reactHotLoader.register(_default, "default", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/pages/404.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)(module)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _kibalabs_everypage_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _kibalabs_everypage_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kibalabs_everypage_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _site_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
var _site_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(8, 1);
/* harmony import */ var _theme_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
var _theme_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(9, 1);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





var siteData = {
  pageContent: _site_json__WEBPACK_IMPORTED_MODULE_2__,
  pageTheme: _theme_json__WEBPACK_IMPORTED_MODULE_3__
};
siteData.pageContent.buildHash = 'testing123-new';
siteData.pageContent.siteHost = 'test.evrpg.com';
var Home = function Home() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kibalabs_everypage_core__WEBPACK_IMPORTED_MODULE_1__["IndexPage"], {
    pageContent: siteData.pageContent,
    pageTheme: siteData.pageTheme
  });
};
var _default = Home;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(siteData, "siteData", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/pages/home.tsx");
  reactHotLoader.register(Home, "Home", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/pages/home.tsx");
  reactHotLoader.register(_default, "default", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/pages/home.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@kibalabs/everypage-core");

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"test page\",\"tagline\":\"This page contains one of each type of component\",\"description\":\":upside_down_face:\",\"keywords\":[\"developer tools\",\"docs\"],\"company\":\"Kiba Labs\",\"companyUrl\":\"https://www.kibalabs.com\",\"socialCardImageUrl\":\"/assets/banner.png\",\"plugins\":[{\"type\":\"panelbear-analytics\",\"siteId\":\"8CA6KboImrB\"}],\"sections\":[{\"type\":\"navbar-1\",\"background\":{\"color\":\"#ffffff\"},\"buttons\":[{\"target\":\"https://console.everypagehq.com/canvas\",\"text\":\"Canvas\"},{\"target\":\"#feature-media-half-1-left\",\"text\":\"Awesome feature\"},{\"variant\":\"secondary\",\"target\":\"#signup-1-open-link\",\"text\":\"Cool form\"},{\"display\":\"always\",\"variant\":\"primary\",\"target\":\"https://console.everypagehq.com\",\"text\":\"Sign in here\"}],\"logoImageUrl\":\"https://www.everypagehq.com/_bh20201113163808/assets/everypage-wordmark.svg\",\"shouldStickToTop\":true},{\"type\":\"hero-buttons-1\",\"titleText\":\"Create your beautiful landing page in minutes\",\"subtitleText\":\"Our easy to use landing page builder drives you to focus on your copy, and generates your page with exceptional performance, SEO and accessibility built in.\",\"buttons\":[{\"iconIdRight\":\"ion-checkmark-circle-outline\",\"variant\":\"primary\",\"target\":\"https://console.everypagehq.com/register\",\"text\":\"Subscribe\"}],\"logoImageUrl\":null},{\"type\":\"hero-app-download-media-half-1\",\"titleText\":\"Insert catchy header\",\"subtitleText\":\"Share why your product is great\",\"androidAppId\":\"com.wordmagicapp.android.play\",\"iosAppId\":\"1244075045\",\"leftMediaUrl\":null,\"logoImageUrl\":null,\"rightMediaUrl\":\"https://via.placeholder.com/250x500\"},{\"type\":\"hero-signup-1\",\"titleText\":\"Create your landing page in minutes\",\"subtitleText\":\"Our easy to use landing page generator builds your landing pages with exceptional performance, SEO and accessibility built in.\",\"formAction\":\"POST\",\"formAdditionalInputs\":[{\"name\":\"topic\",\"type\":\"text\",\"value\":\"everypage\"}],\"formTarget\":\"https://api.kiba.dev/v1/newsletter-subscriptions\",\"inputButtonText\":\"Subscribe\",\"inputName\":\"email\",\"inputPlaceholderText\":\"Go on, you really will love it 👀\",\"inputSuccessMessageText\":\"You're signed up :tada:\",\"inputType\":\"email\",\"logoImageUrl\":\"/assets/everypage-wordmark.svg\"},{\"type\":\"hero-simple-1\",\"titleText\":\"Insert catchy header\",\"subtitleText\":\"Share why your product is great\",\"logoImageUrl\":null},{\"type\":\"hero-signup-media-half-1\",\"titleText\":\"Insert catchy header\",\"subtitleText\":\"Share why your product is great\",\"formAction\":\"OPEN\",\"formTarget\":\"https://everysize-app.kibalabs.com\",\"inputButtonText\":\"GO\",\"inputName\":\"url\",\"inputPlaceholderText\":\"Enter a url to see the magic\",\"inputSuccessMessageText\":null,\"inputType\":\"url\",\"leftMediaUrl\":\"/assets/hero.mp4\",\"logoImageUrl\":null,\"rightMediaUrl\":null},{\"type\":\"single-page-app-1\",\"titleText\":\"Make your website now\",\"subtitleText\":\"Get your word out and people will love you\",\"androidAppId\":\"com.wordmagicapp.android.play\",\"appButtonVariant\":\"dark-clear\",\"iconLinks\":[{\"iconId\":\"ion-logo-twitter\",\"target\":\"https://twitter.com/kibalabs\"},{\"iconId\":\"ion-mail\",\"target\":\"mailto:website@kibalabs.com?Subject=Hey%20there%2C%20I%20saw%20your%20awesome%20website%21\"}],\"iosAppId\":\"1039710965\",\"logoImageUrl\":\"/assets/everypage-wordmark.svg\",\"macAppId\":\"1027457763\"},{\"type\":\"feature-media-half-1\",\"titleText\":\"Look at this cool feature\",\"subtitleText\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lorem metus. Nullam ultricies ante sed commodo ultricies. Aenean volutpat erat nec quam tempor, vitae aliquam sapien facilisis. Duis in bibendum elit, ut placerat neque. Cras facilisis tempor diam, in faucibus velit elementum eu. Nam pharetra pulvinar turpis ac finibus. Sed nec sapien porttitor, tincidunt nisl nec, placerat magna. Curabitur dui sem, dictum in mauris et, maximus tempus metus\",\"leftMediaUrl\":null,\"rightMediaUrl\":\"/assets/feature1.png\"},{\"id\":\"feature-media-half-1-left\",\"type\":\"feature-media-half-1\",\"titleText\":\"This is another cool feature\",\"subtitleText\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lorem metus. Nullam ultricies ante sed commodo ultricies. Aenean volutpat erat nec quam tempor, vitae aliquam sapien facilisis. Duis in bibendum elit, ut placerat neque. Cras facilisis tempor diam, in faucibus velit elementum eu. Nam pharetra pulvinar turpis ac finibus. Sed nec sapien porttitor, tincidunt nisl nec, placerat magna. Curabitur dui sem, dictum in mauris et, maximus tempus metus\",\"leftMediaUrl\":\"/assets/feature2.png\",\"rightMediaUrl\":null},{\"type\":\"feature-boxes-1\",\"titleText\":\"What we're solving for you...\",\"subtitleText\":\"Highlight your value propositions here. Focus on what you do for the user, not what you are building! Try to keep titles to 3-5 words and descriptions to 2-3 short sentences. \",\"features\":[{\"description\":\"How do you or your product/service relate to this group? Why are you addressing this problem?\",\"iconId\":\"ion-list\",\"title\":\"Built for {target user group}\"},{\"description\":\"What big problem are you solving? Why is it relevant to your reader?\",\"iconId\":\"mui-web-asset\",\"title\":\"Get your {painpoint} resolved\"},{\"description\":\"How is your solution unique? What do you provide that your competitors don't?\",\"iconId\":\"feather-airplay\",\"title\":\"Our {value proposition} differentiates us\"},{\"description\":\"It's best to stay between 3-6 features but don't be afraid to highlight more if it's important.\",\"mediaUrl\":\"https://everysize.evrpg.com/_bh20200525143827/assets/feature1.png\",\"title\":\"Any other advantages\"}]},{\"type\":\"pricing-tiers-1\",\"titleText\":\"Pricing & stuff\",\"subtitleText\":\"💰💰💰💰💰💰\",\"categories\":[{\"buttonTarget\":\"https://console.everypagehq.com\",\"buttonText\":\"Sign up\",\"cost\":\"Free\",\"costFrequency\":\"forever!\",\"explanationText\":\"\",\"features\":[{\"text\":\"Cool feature\"},{\"text\":\"Cool feature\"},{\"text\":\"Cool feature\"}],\"name\":\"Core\"},{\"cost\":\"$5\",\"costFrequency\":\"a month\",\"explanationText\":\"everything in core +\",\"features\":[{\"text\":\"Cooler feature\"},{\"text\":\"Cooler feature\"},{\"text\":\"Cooler feature\"}],\"name\":\"Starter\"},{\"cost\":\"$20\",\"costFrequency\":\"a month\",\"explanationText\":\"everything in starter +\",\"features\":[{\"text\":\"Super cool feature\"},{\"text\":\"Super cool feature\"},{\"text\":\"Super cool feature\"},{\"text\":\"Super cool feature\"}],\"isPrimary\":true,\"name\":\"Premium\"}]},{\"type\":\"pricing-features-1\",\"subtitleText\":\"All plans come with these awesome features:\",\"features\":[{\"text\":\"Cool feature 1\"},{\"text\":\"Cool feature 2\"},{\"text\":\"Cool feature 3\"}]},{\"type\":\"statistic-boxes-1\",\"titleText\":\"See what our numbers are saying 💯\",\"subtitleText\":null,\"boxes\":[{\"name\":\"subscribers to date\",\"value\":\"30\"},{\"name\":\"users to date\",\"value\":\"50\"},{\"name\":\"leavers to date\",\"value\":\"0\"}]},{\"type\":\"testimonial-boxes-1\",\"titleText\":\"What people say about us 🤩\",\"subtitleText\":\"Our customers love us and we love them\",\"boxVariant\":\"card\",\"boxes\":[{\"author\":\"Guillaume\",\"text\":\"So handy to work in parallel on multiple screen sizes\",\"type\":\"producthunt\",\"url\":\"https://www.producthunt.com/posts/everysize-2#comment-1021668\"},{\"author\":\"Elston Baretto\",\"iconColor\":\"#2867B2\",\"iconId\":\"ion-logo-linkedin\",\"text\":\"This is so simple and easy to use. Like how it itself is responsive too!\",\"url\":\"https://www.producthunt.com/posts/everysize-2#comment-1021709\"},{\"author\":\"GreenEyeWeb\",\"text\":\"Check how your web page appears on all devices. Everysize is a simple and easy browser solution for developers and designers.\",\"type\":\"twitter\",\"url\":\"https://twitter.com/GreenEyeWeb1/status/1253327953053667336\"},{\"author\":\"Krishan Patel\",\"text\":\"OMFG this is the best thing ever!!!\"}]},{\"type\":\"testimonial-avatars-1\",\"titleText\":null,\"subtitleText\":null,\"boxes\":[{\"authorImageUrl\":\"/assets/avatar1.png\",\"authorName\":\"John Casey\",\"authorTitle\":\"Colonel @ NSA\",\"text\":\"As a developer, I work with JSON daily and I actually had fun building my landing page. If you need a landing page but don't want to do it, this is a perfect solution.\"},{\"authorImageUrl\":null,\"authorName\":\"Sarah Fowler\",\"authorTitle\":\"CIA Operative\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \"},{\"authorImageUrl\":\"/assets/avatar2.png\",\"authorName\":\"Charles Bartowski\",\"authorTitle\":null,\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat eget dolor at eleifend.\"},{\"authorImageUrl\":null,\"authorName\":\"Daniel Shaw\",\"authorTitle\":null,\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"},{\"authorImageUrl\":\"/assets/avatar3.png\",\"authorName\":\"General Beckman\",\"authorTitle\":\"Something cool\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat eget dolor at eleifend. Sed placerat diam felis.\"}]},{\"type\":\"testimonial-slides-1\",\"titleText\":\"Why people love us 😍\",\"subtitleText\":null,\"slides\":[{\"authorImageUrl\":\"/assets/avatar1.png\",\"authorName\":\"John Casey\",\"authorTitle\":\"Colonel @ NSA\",\"text\":\"As a developer, I work with JSON daily and I actually had fun building my landing page. If you need a landing page but don't want to do it, this is a perfect solution.\"},{\"authorImageUrl\":null,\"authorName\":\"Sarah Fowler\",\"authorTitle\":\"CIA Operative\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \"},{\"authorImageUrl\":\"/assets/avatar2.png\",\"authorName\":\"Charles Bartowski\",\"authorTitle\":null,\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat eget dolor at eleifend.\"},{\"authorImageUrl\":null,\"authorName\":\"Daniel Shaw\",\"authorTitle\":null,\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"},{\"authorImageUrl\":\"/assets/avatar3.png\",\"authorName\":\"General Beckman\",\"authorTitle\":\"Something cool\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat eget dolor at eleifend. Sed placerat diam felis.\"}]},{\"type\":\"faq-1\",\"titleText\":\"FAQs\",\"subtitleText\":null,\"questions\":[{\"answerText\":\"Not much,  what's up with you?\",\"questionText\":\"So what's up?\"},{\"answerText\":\"Don't think so dude\",\"questionText\":\"Hey, i asked you first\"}]},{\"id\":\"signup-1-subscribe\",\"type\":\"signup-1\",\"titleText\":\"Stay in touch\",\"subtitleText\":\"Join us to keep updated on our launch and upcoming features 🚀\",\"formAction\":\"POST\",\"formAdditionalInputs\":[],\"formTarget\":\"<target url>\",\"inputButtonText\":\"Subscribe\",\"inputName\":\"email\",\"inputPlaceholderText\":\"No spam, we promise!\",\"inputSuccessMessageText\":\"You're signed up 🎉\",\"inputType\":\"email\",\"logoImageUrl\":null},{\"id\":\"signup-1-open-link\",\"type\":\"signup-1\",\"titleText\":\"Enter a url to see the magic\",\"subtitleText\":null,\"formAction\":\"OPEN\",\"formTarget\":\"https://everysize-app.kibalabs.com\",\"inputButtonText\":\"GO\",\"inputName\":\"url\",\"inputPlaceholderText\":\"https://yourawesomesite.com\",\"inputSuccessMessageText\":null,\"inputType\":\"url\"},{\"type\":\"buttons-1\",\"titleText\":\"Get started with us\",\"subtitleText\":\"It's totally awesome!\",\"buttons\":[{\"variant\":\"primary\",\"target\":\"https://console.everypagehq.com/login\",\"text\":\"Log in\"},{\"variant\":\"primary\",\"target\":\"https://console.everypagehq.com/register\",\"text\":\"Sign up\"}]},{\"type\":\"app-download-1\",\"titleText\":\"Download now!\",\"androidAppId\":\"com.wordmagicapp.android.play\",\"iosAppId\":\"1039710965\"},{\"type\":\"markdown-1\",\"titleText\":\"Blog\",\"subtitleText\":\"Check out our latest blogs from our co-founders.\",\"markdownContent\":\"# h1 Heading\\n\\n## h2 Heading\\n\\n### h3 Heading\\n\\n#### h4 Heading\\n\\n##### h5 Heading\\n\\n###### h6 Heading\\n\\nnormal text\\n\\n[an awesome link](https://via.placeholder.com/150)\\n\\n![an awesome image](https://via.placeholder.com/150)\\nthis image is great...\\n\\ntext and image in same line![an awesome image](https://via.placeholder.com/150)\\nanother caption\\n\\n- Item 1\\n- Item 2\\n  - Sub Item 1\\n  - Sub Item 2\"},{\"type\":\"footer-1\",\"subtitleText\":\"Say hello to us [@twitter](https://twitter.com/)\",\"iconLinks\":[{\"iconId\":\"ion-logo-twitter\",\"target\":\"https://twitter.com/\"},{\"iconId\":\"ion-logo-instagram\",\"target\":\"https://instagram.com/\"},{\"iconId\":\"ion-logo-facebook\",\"target\":\"https://facebook.com/\"},{\"iconId\":\"ion-logo-linkedin\",\"target\":\"https://linkedin.com/\"},{\"iconId\":\"ion-logo-github\",\"target\":\"https://github.com/\"},{\"target\":\"https://www.kibalabs.com\"}]},{\"type\":\"hero-app-buttons-media-half-1\",\"titleText\":\"What's **special** about your app?\",\"subtitleText\":null,\"androidAppId\":\"com.wordmagicapp.android.play\",\"iosAppId\":\"1039710965\",\"leftMediaUrl\":null,\"logoImageUrl\":\"https://wml-images.s3-eu-west-1.amazonaws.com/awesomco-logo.svg\",\"rightMediaUrl\":\"/assets/feature2.png\"},{\"type\":\"app-buttons-1\",\"titleText\":\"Download now!\",\"androidAppId\":\"com.wordmagicapp.android.play\",\"iosAppId\":\"1039710965\"},{\"type\":\"feature-media-center-1\",\"titleText\":\"Brilliant Features\",\"subtitleText\":\"Here's what makes Your App awesome:\",\"features\":[{\"description\":\"How do you or your product/service relate to this group? Why are you addressing this problem?\",\"iconId\":\"ion-list\",\"title\":\"Built for {target user group}\"},{\"description\":\"What big problem are you solving? Why is it relevant to your reader?\",\"iconId\":\"mui-web-asset\",\"title\":\"Get your {painpoint} resolved\"},{\"description\":\"How is your solution unique? What do you provide that your competitors don't?\",\"iconId\":\"feather-airplay\",\"title\":\"Our {value proposition} differentiates us\"},{\"description\":\"It's best to stay between 3-6 features but don't be afraid to highlight more if it's important\",\"iconId\":\"ion-happy-outline\",\"title\":\"Any other advantages\"}],\"mediaUrl\":\"/assets/feature1.png\"},{\"type\":\"image-slides-1\",\"titleText\":\"Screenshots\",\"subtitleText\":null,\"slides\":[{\"mediaUrl\":\"/assets/feature1.png\"},{\"mediaUrl\":\"/assets/feature2.png\"},{\"mediaUrl\":\"/assets/freebird-ss.png\"},{\"mediaUrl\":\"/assets/feature2.png\"},{\"mediaUrl\":\"/assets/freebird-ss.png\"},{\"mediaUrl\":\"/assets/feature1.png\"}]},{\"type\":\"calendly-booking-1\",\"titleText\":\"Let's talk 📞\",\"subtitleText\":null,\"calendarId\":\"chat\",\"shouldHideEventType\":true,\"username\":\"krishan711\"},{\"type\":\"hero-app-download-1\",\"titleText\":\"Build your websites now\",\"subtitleText\":\"Faster and cheaper than ever!\",\"androidAppId\":\"com.wordmagicapp.android.play\",\"iosAppId\":\"1039710965\",\"logoImageUrl\":\"/assets/everypage-wordmark.svg\",\"macAppId\":\"1027457763\"}]}");

/***/ }),
/* 9 */
/***/ (function(module) {

module.exports = JSON.parse("{\"colors\":{\"brandPrimary\":\"#2B59C3\",\"brandSecondary\":\"#1d3557\"},\"fonts\":{\"main\":{\"url\":\"https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&display=swap\"}},\"texts\":{\"default\":{\"font-family\":\"Montserrat, Arial\"}}}");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
module.exports = __webpack_require__(15);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : ''
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(14);
} else {}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(0));function AppContainer(e){return AppContainer.warnAboutHMRDisabled&&(AppContainer.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),React.Children.only(e.children)}AppContainer.warnAboutHMRDisabled=!1;var hot=function e(){return e.shouldWrapWithAppContainer?function(e){return function(n){return React.createElement(AppContainer,null,React.createElement(e,n))}}:function(e){return e}};hot.shouldWrapWithAppContainer=!1;var areComponentsEqual=function(e,n){return e===n},setConfig=function(){},cold=function(e){return e},configureComponent=function(){};exports.AppContainer=AppContainer,exports.hot=hot,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig,exports.cold=cold,exports.configureComponent=configureComponent;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lazysizes_plugins_attrchange_ls_attrchange__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var lazysizes_plugins_attrchange_ls_attrchange__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lazysizes_plugins_attrchange_ls_attrchange__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pages_404__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var _pages_home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var App = function App(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2__["Router"], {
    history: props.routerHistory
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/",
    page: _pages_home__WEBPACK_IMPORTED_MODULE_6__[/* Home */ "a"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kibalabs_core_react__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    "default": true,
    page: _pages_404__WEBPACK_IMPORTED_MODULE_5__[/* NotFound */ "a"]
  }));
};
var _default = App;
/* harmony default export */ __webpack_exports__["default"] = (_default);

if (typeof document !== 'undefined') {
  var target = document.getElementById('root');
  var renderMethod = target.hasChildNodes() ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate : react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;

  var render = function render(Component) {
    renderMethod( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, null), target);
  };

  render(App); // if (module && module.hot) {
  //   module.hot.accept('@kibalabs/everypage', () => render(App));
  //   module.hot.accept('@kibalabs/everypage-core', () => render(App));
  // }
}

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/krishan/Projects/everypage-app/src/packages/main-new/src/internal/src/index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(window, factory) {
	if(!window) {return;}
	var globalInstall = function(){
		factory(window.lazySizes);
		window.removeEventListener('lazyunveilread', globalInstall, true);
	};

	factory = factory.bind(null, window, window.document);

	if( true && module.exports){
		factory(__webpack_require__(3));
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(typeof window != 'undefined' ?
	window : 0, function(window, document, lazySizes) {
	'use strict';

	var addObserver = function(){
		var connect, disconnect, observer, connected;
		var lsCfg = lazySizes.cfg;
		var attributes = {'data-bgset': 1, 'data-include': 1, 'data-poster': 1, 'data-bg': 1, 'data-script': 1};
		var regClassTest = '(\\s|^)(' + lsCfg.loadedClass;
		var docElem = document.documentElement;

		var setClass = function(target){
			lazySizes.rAF(function(){
				lazySizes.rC(target, lsCfg.loadedClass);
				if(lsCfg.unloadedClass){
					lazySizes.rC(target, lsCfg.unloadedClass);
				}
				lazySizes.aC(target, lsCfg.lazyClass);

				if(target.style.display == 'none' || (target.parentNode && target.parentNode.style.display == 'none')){
					setTimeout(function () {
						lazySizes.loader.unveil(target);
					}, 0);
				}
			});
		};

		var onMutation = function(mutations){
			var i, len, mutation, target;
			for(i = 0, len = mutations.length; i < len; i++){
				mutation = mutations[i];
				target = mutation.target;

				if(!target.getAttribute(mutation.attributeName)){continue;}

				if(target.localName == 'source' && target.parentNode){
					target = target.parentNode.querySelector('img');
				}

				if(target && regClassTest.test(target.className)){
					setClass(target);
				}
			}
		};

		if(lsCfg.unloadedClass){
			regClassTest += '|' + lsCfg.unloadedClass;
		}

		regClassTest += '|' + lsCfg.loadingClass + ')(\\s|$)';

		regClassTest = new RegExp(regClassTest);

		attributes[lsCfg.srcAttr] = 1;
		attributes[lsCfg.srcsetAttr] = 1;

		if(window.MutationObserver){
			observer = new MutationObserver(onMutation);

			connect = function(){
				if(!connected){
					connected = true;
					observer.observe( docElem, { subtree: true, attributes: true, attributeFilter: Object.keys(attributes)} );
				}
			};
			disconnect = function(){
				if(connected){
					connected = false;
					observer.disconnect();
				}
			};
		} else {
			docElem.addEventListener('DOMAttrModified', (function(){
				var runs;
				var modifications = [];
				var callMutations = function(){
					onMutation(modifications);
					modifications = [];
					runs = false;
				};
				return function(e){
					if(connected && attributes[e.attrName] && e.newValue){
						modifications.push({target: e.target, attributeName: e.attrName});
						if(!runs){
							setTimeout(callMutations);
							runs = true;
						}
					}
				};
			})(), true);

			connect = function(){
				connected = true;
			};
			disconnect = function(){
				connected = false;
			};
		}

		addEventListener('lazybeforeunveil', disconnect, true);
		addEventListener('lazybeforeunveil', connect);

		addEventListener('lazybeforesizes', disconnect, true);
		addEventListener('lazybeforesizes', connect);
		connect();

		removeEventListener('lazybeforeunveil', addObserver);
	};


	addEventListener('lazybeforeunveil', addObserver);
}));


/***/ })
/******/ ]);
});