/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 6 10 12 - 13+, firefox <="18" 45+, ie 11, safari 5.1 9+, ios 9.1 throw exceptions when non-strict code (e.g., asp.net 4.5) accesses strict mode arguments.callee.caller (trac-13335). but as of jquery 3.0 (2016), should be common enough that all such attempts are guarded in a try block. "use strict"; var arr="[];" document="window.document;" getproto="Object.getPrototypeOf;" slice="arr.slice;" concat="arr.concat;" push="arr.push;" indexof="arr.indexOf;" class2type="{};" tostring="class2type.toString;" hasown="class2type.hasOwnProperty;" fntostring="hasOwn.toString;" objectfunctionstring="fnToString.call(" object ); support="{};" isfunction="function" isfunction( obj ) { support: chrome some browsers, typeof returns "function" for html <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 0 only (functionish regexp) return typeof obj="==" "object" || "function" ? class2type[ tostring.call( ) ] : obj; } * global symbol defining this in .eslintrc.json would create a danger of using the unguarded another place, it seems safer to define for module var version="3.4.1" , local copy jquery selector, context { object is actually just init constructor 'enhanced' need if called (just allow error be thrown not included) new jquery.fn.init( ); }, support: android <="4.0" make sure we trim bom and nbsp rtrim="/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;" jquery.fn="jQuery.prototype" = current being used jquery: version, constructor: jquery, default length length: 0, toarray: function() slice.call( get nth element matched set or whole as clean array get: function( num all elements ( null one from this[ + this.length ]; take an push onto stack (returning set) pushstack: elems build ret="jQuery.merge(" this.constructor(), add old (as reference) ret.prevobject="this;" newly-formed ret; execute callback every set. each: jquery.each( this, map: this.pushstack( jquery.map( elem, i callback.call( i, elem slice: slice.apply( arguments first: this.eq( last: -1 eq: len="this.length," j="+i">= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 0 1 only trim: function( text ) { return null ? "" : ( + ).replace( rtrim, ); }, results is for internal usage makearray: arr, var ret="results" || []; if arr !="null" isarraylike( object( jquery.merge( ret, typeof "string" [ ] } else push.call( ret; inarray: elem, i -1 indexof.call( support: android <="4.0" only, phantomjs push.apply(_, arraylike) throws on ancient webkit merge: first, second len="+second.length," j="0," ; len; j++ first[ i++ ]; first.length="i;" first; grep: elems, callback, invert callbackinverse, matches="[]," length="elems.length," callbackexpect="!invert;" go through the array, saving items that pass validator function length; callbackinverse="!callback(" elems[ ], matches.push( matches; arg map: length, value, translating each of to their new values elems value="callback(" i, ret.push( every key object, in flatten any nested arrays concat.apply( [], a global guid counter objects guid: 1, jquery.support not used core but other projects attach properties it so needs exist. support symbol="==" "function" jquery.fn[ symbol.iterator populate class2type map jquery.each( "boolean number string array date regexp object error symbol".split( " ), name class2type[ "[object "]" obj real ios 8.2 (not reproducible simulator) `in` check prevent jit (gh-2145) hasown isn't here due false negatives regarding nodelist ie && "length" obj.length, type="toType(" isfunction( iswindow( false; "array" "number"> 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24 0 workaround erroneous numeric interpretation of +"0x" return high !="=" || escapedwhitespace ? escaped : < bmp codepoint string.fromcharcode( + 0x10000 ) supplemental plane (surrogate pair)>> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0 1 8 9 11 detect silently failing push.apply arr[ preferreddoc.childnodes.length ].nodetype; } catch ( e ) { push="{" apply: arr.length ? leverage slice if possible function( target, els push_native.apply( slice.call(els) ); : support: ie<9 otherwise append directly var j="target.length," i="0;" can't trust nodelist.length while (target[j++]="els[i++])" {} target.length="j" - 1; }; function sizzle( selector, context, results, seed m, i, elem, nid, match, groups, newselector, newcontext="context" && context.ownerdocument, nodetype defaults to 9, since context document context.nodetype 9; results="results" || []; return early from calls with invalid selector or typeof !="=" "string" !selector results; try shortcut find operations (as opposed filters) in html documents !seed context.ownerdocument preferreddoc setdocument( document; documentishtml the is sufficiently simple, using a "get*by*" dom method (excepting documentfragment where methods don't exist) (match="rquickExpr.exec(" )) id (m="match[1])" (elem="context.getElementById(" m ie, opera, webkit todo: identify versions getelementbyid can match elements by name instead of elem.id="==" results.push( elem else element contains( type match[2] push.apply( context.getelementsbytagname( class support.getelementsbyclassname context.getelementsbyclassname context.getelementsbyclassname( take advantage queryselectorall support.qsa !nonnativeselectorcache[ + " ] (!rbuggyqsa !rbuggyqsa.test( ie only exclude object (nodetype context.nodename.tolowercase() "object") newselector="selector;" qsa considers outside scoping root when evaluating child descendant combinators, which not what we want. such cases, work around behavior prefixing every list an referencing scope context. thanks andrew dupont for this technique. rdescend.test( capture id, setting it first necessary (nid="context.getAttribute(" "id" nid="nid.replace(" rcssescape, fcssescape context.setattribute( "id", prefix groups="tokenize(" i-- groups[i]="#" toselector( "," expand sibling selectors testcontext( context.parentnode context; newcontext.queryselectorall( qsaerror nonnativeselectorcache( true finally expando context.removeattribute( all others select( selector.replace( rtrim, "$1" ), ** * create key-value caches limited size @returns {function(string, object)} returns data after storing on itself property (space-suffixed) string and (if cache larger than expr.cachelength) deleting oldest entry createcache() keys="[];" cache( key, value use (key ") avoid collision native prototype properties (see issue #157) keys.push( key> Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8 1 6 7 9 10 4833 12359 13378 assume html when documentelement doesn't yet exist, such as inside loading iframes https: bugs.jquery.com ticket return !rhtml.test( namespace || docelem && docelem.nodename "html" ); }; ** * sets document-related variables once based on the current document @param {element|object} [doc] an element or object to use set @returns {object} returns setdocument="Sizzle.setDocument" = function( node ) { var hascompare, subwindow, doc="node" ? node.ownerdocument : preferreddoc; early if is invalid already selected ( doc.nodetype !="=" !doc.documentelement document; } update global documentishtml="!isXML(" support: ie 9-11, edge accessing iframe documents after unload throws "permission denied" errors (jquery #13936) preferreddoc (subwindow="document.defaultView)" subwindow.top subwindow 11, subwindow.addeventlistener subwindow.addeventlistener( "unload", unloadhandler, false - only else subwindow.attachevent subwindow.attachevent( "onunload", unloadhandler attributes ---------------------------------------------------------------------- ie<8 verify that getattribute really and not properties (excepting ie8 booleans) support.attributes="assert(function(" el el.classname="i" ; !el.getattribute("classname"); }); getelement(s)by* check getelementsbytagname("*") elements support.getelementsbytagname="assert(function(" el.appendchild( document.createcomment("") !el.getelementsbytagname("*").length; ie<9 support.getelementsbyclassname="rnative.test(" document.getelementsbyclassname ie<10 getelementbyid by name broken methods don't pick up programmatically-set names, so a roundabout getelementsbyname test support.getbyid="assert(function(" docelem.appendchild( ).id="expando;" !document.getelementsbyname !document.getelementsbyname( expando ).length; id filter find expr.filter["id"]="function(" attrid="id.replace(" runescape, funescape elem elem.getattribute("id")="==" attrid; expr.find["id"]="function(" id, context typeof context.getelementbyid "undefined" [ ] []; elem.getattributenode elem.getattributenode("id"); node.value="==" reliable shortcut node, i, elems, attribute ]; fall back elems="context.getElementsByName(" i="0;" while (elem="elems[i++])" tag expr.find["tag"]="support.getElementsByTagName" tag, context.getelementsbytagname context.getelementsbytagname( documentfragment nodes have gebtn support.qsa context.queryselectorall( elem, tmp="[]," happy coincidence, (broken) appears too results="context.getElementsByTagName(" out possible comments "*" elem.nodetype="==" tmp.push( tmp; results; class expr.find["class"]="support.getElementsByClassName" classname, context.getelementsbyclassname context.getelementsbyclassname( classname qsa matchesselector support matchesselector(:active) reports true (ie9 opera 11.5) rbuggymatches="[];" qsa(:focus) (chrome 21) we allow this because of bug in error whenever `document.activeelement` accessed so, :focus pass through all time avoid see rbuggyqsa="[];" (support.qsa="rnative.test(" document.queryselectorall )) build regex strategy adopted from diego perini assert(function( select empty string purpose ie's treatment explicitly setting boolean content attribute, since its presence should be enough ).innerhtml="<a id='" + "'>" +
				"<select id="" + expando + "-\r\\" msallowcapture>" +
				"<option selected></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, android<4.4, safari<7.0+, ios<7.0+, phantomjs<1.9.8+ if ( !el.queryselectorall( "[id~=" + expando + " -]" ).length ) { rbuggyqsa.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(" :checked").length rbuggyqsa.push(":checked"); } support: safari 8+, ios 8+ https: bugs.webkit.org show_bug.cgi?id="136851" in-page `selector#id sibling-combinator selector` fails "a#" + expando "+*" rbuggyqsa.push(".#.+[+~]"); }); assert(function( el el.innerhtml="<a href='' disabled='disabled'></a>" "<select disabled="disabled"><option>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 0 1 2 only defend against cloned attroperties (jquery gh-1709) uniquecache="outerCache[" node.uniqueid ] || (outercache[ cache="uniqueCache[" type []; nodeindex="cache[" dirruns && cache[ ]; diff="nodeIndex" node="nodeIndex" parent.childnodes[ while ( (node="++nodeIndex" node[ dir fallback to seeking `elem` from the start (diff="nodeIndex" = 0) start.pop()) ) { when found, indexes on `parent` and break if node.nodetype="==" ++diff elem uniquecache[ dirruns, nodeindex, break; } else use previously-cached element index available usecache ...in a gzip-friendly way outercache="node[" expando (node[ support: ie <9 xml :nth-child(...) or :nth-last-child(...) :nth(-last)?-of-type(...) false same loop as above seek oftype ? node.nodename.tolowercase()="==" name : of each encountered incorporate offset, then check cycle size -="last;" return first %>= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8 0 1 new html5 attribute values (e.g., "search") appear with elem.type="==" "text" ( (attr="elem.getAttribute("type"))" =="null" || attr.tolowercase()="==" ); }, position-in-collection "first": createpositionalpseudo(function() { return [ ]; }), "last": createpositionalpseudo(function( matchindexes, length ) - "eq": length, argument < ? + : "even": var i="0;" for ; length; matchindexes.push( } matchindexes; "odd": "lt":> length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 0 1 2 only defend against cloned attroperties (jquery gh-1709) uniquecache="outerCache[" elem.uniqueid ] || (outercache[ if ( skip && elem.nodename.tolowercase() ) { elem="elem[" dir elem; } else (oldcache="uniqueCache[" key ]) oldcache[ dirruns donename assign to newcache so results back-propagate previous elements return (newcache[ ]); reuse uniquecache[ a match means we're done; fail we have keep checking elem, context, xml )) true; false; }; function elementmatcher( matchers matchers.length> 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, safari tolerate nodelist properties (ie: "length"; safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 1 2 4 9 25 - safari 6.0.3 chrome (fixed in 27) detached nodes confoundingly follow *each other* support.sortdetached="assert(function(" el ) { should return 1, but returns (following) el.comparedocumentposition( document.createelement("fieldset") & 1; }); support: ie<8 prevent attribute property "interpolation" https: msdn.microsoft.com en-us library ms536429%28vs.85%29.aspx if ( !assert(function( el.innerhtml="<a href='#'></a>" ; el.firstchild.getattribute("href")="==" "#" }) addhandle( "type|href|height|width", function( elem, name, isxml !isxml elem.getattribute( name.tolowercase()="==" "type" ? : ); } ie<9 use defaultvalue place of getattribute("value") !support.attributes || el.firstchild.setattribute( "value", "" el.firstchild.getattribute( "value" ""; && elem.nodename.tolowercase()="==" "input" elem.defaultvalue; getattributenode to fetch booleans when getattribute lies el.getattribute("disabled")="=" null; booleans, var val; elem[ name ]="==" true (val="elem.getAttributeNode(" )) val.specified val.value sizzle; })( window jquery.find="Sizzle;" jquery.expr="Sizzle.selectors;" deprecated jquery.expr[ ":" jquery.uniquesort="jQuery.unique" = sizzle.uniquesort; jquery.text="Sizzle.getText;" jquery.isxmldoc="Sizzle.isXML;" jquery.contains="Sizzle.contains;" jquery.escapeselector="Sizzle.escape;" dir="function(" dir, until matched="[]," truncate="until" !="=" undefined; while elem="elem[" elem.nodetype jquery( ).is( break; matched.push( matched; }; siblings="function(" n, for n; n="n.nextSibling" n.nodetype="==" rneedscontext="jQuery.expr.match.needsContext;" function nodename( elem.nodename name.tolowercase(); rsingletag="(" ^<([a-z][^\ \0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\ \1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <) shortcut simple #id case for speed rquickexpr="/^(?:\s*(<[\w\W]+">)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" 1 && selector[ selector.length - ]="==" ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only treat the template element as a regular one in browsers that don't support it. if ( nodename( elem, "template" ) { elem="elem.content" || elem; } return jquery.merge( [], elem.childnodes ); }, function( name, fn jquery.fn[ name ]="function(" until, selector var matched="jQuery.map(" this, fn, until name.slice( -5 !="=" "until" && typeof "string" selector, this.length> 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingindex ) { firingindex--; } ); return this; }, check if a given callback is in the list. no argument given, whether or not list has callbacks attached. has: function( fn ? jquery.inarray( fn,> -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 8 9 ) { adoptvalue( singlevalue, master.done( updatefunc( i ).resolve, master.reject, !remaining ); use .then() to unwrap secondary thenables (cf. gh-3000) if ( master.state()="==" "pending" || isfunction( resolvevalues[ ] && ].then return master.then(); } multiple arguments are aggregated like promise.all array elements while i-- ], ), master.reject master.promise(); these usually indicate a programmer mistake during development, warn about them asap rather than swallowing by default. var rerrornames="/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;" jquery.deferred.exceptionhook="function(" error, stack support: ie - only console exists when dev tools open, which can happen at any time window.console window.console.warn error rerrornames.test( error.name window.console.warn( "jquery.deferred exception: " + error.message, error.stack, }; jquery.readyexception="function(" window.settimeout( function() throw error; the deferred used on dom ready readylist="jQuery.Deferred();" jquery.fn.ready="function(" fn .then( wrap in function so that lookup happens of handling instead callback registration. .catch( function( jquery.readyexception( this; jquery.extend( is be used? set true once it occurs. isready: false, counter track how many items wait for before event fires. see #6781 readywait: 1, handle ready: abort there pending holds or we're already ? --jquery.readywait : jquery.isready return; remember normal fired, decrement, and need !="="> 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 0 1 5 9 10 11 12 15 45 2014 - only older ie sometimes signals "interactive" too soon if ( document.readystate="==" "complete" || !="=" "loading" && !document.documentelement.doscroll ) { handle it asynchronously to allow scripts the opportunity delay ready window.settimeout( jquery.ready ); } else use handy event callback document.addeventlistener( "domcontentloaded", completed a fallback window.onload, that will always work window.addeventlistener( "load", multifunctional method get and set values of collection value s can optionally be executed it's function var access="function(" elems, fn, key, value, chainable, emptyget, raw i="0," len="elems.length," bulk="key" =="null;" sets many totype( key "object" chainable="true;" for in access( i, key[ ], true, one undefined !isfunction( operations run against entire fn.call( fn="null;" ...except when executing elem, return bulk.call( jquery( elem ), }; ; < len; i++ fn( elems[ ? : value.call( elems; gets elems emptyget; matches dashed string camelizing rmsprefix="/^-ms-/," rdashalpha="/-([a-z])/g;" used by camelcase as replace() fcamelcase( all, letter letter.touppercase(); convert camelcase; css data modules support: 11, edge microsoft forgot hump their vendor prefix (#9572) camelcase( string.replace( rmsprefix, "ms-" ).replace( rdashalpha, fcamelcase acceptdata="function(" owner accepts only: node node.element_node node.document_node object any owner.nodetype="==" !( +owner.nodetype data() this.expando="jQuery.expando" + data.uid++; data.uid="1;" data.prototype="{" cache: function( check already has cache ]; not, create !value we accept non-element nodes modern browsers, but should see #8335. an empty object. acceptdata( is unlikely stringify-ed or looped over plain assignment owner[ ]="value;" otherwise secure non-enumerable property configurable must true deleted removed object.defineproperty( owner, this.expando, value: configurable: value; }, set: data, prop, handle: [ args (gh-2257) typeof "string" cache[ properties copy one-by-one prop cache; get: this.cache( ][ access: cases where either: 1. no was specified 2. specified, provided take "read" path determine which return, respectively stored at this.get( not string, both are extend (existing objects) with this.set( since "set" have two possible entry points expected based on taken[*] key; remove: return; support array space separated keys array.isarray( keys... keys, so remove that. spaces exists, it. otherwise, matching non-whitespace key.match( rnothtmlwhite [] while i-- delete expando there's more jquery.isemptyobject( chrome webkit & blink performance suffers deleting from dom nodes, instead https: bugs.chromium.org p chromium issues detail?id="378607" (bug restricted) hasdata: !jquery.isemptyobject( datapriv="new" data(); datauser="new" implementation summary enforce api surface semantic compatibility 1.9.x branch improve module's maintainability reducing storage paths single mechanism. 3. same mechanism "private" "user" data. 4. _never_ expose user code (todo: drop _data, _removedata) 5. avoid exposing details objects (eg. properties) 6. provide clear upgrade weakmap rbrace="/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/," rmultidash="/[A-Z]/g;" getdata( "true" true; "false" false; "null" null; number doesn't change +data "" +data; rbrace.test( json.parse( data; dataattr( name; nothing found internally, try fetch html5 data-* attribute elem.nodetype="==" name="data-" key.replace( rmultidash, "-$&" ).tolowercase(); catch e {} make sure isn't changed later datauser.set( jquery.extend( datauser.hasdata( datapriv.hasdata( data: name, datauser.access( removedata: datauser.remove( todo: now all calls _data _removedata been replaced direct methods, these deprecated. _data: datapriv.access( _removedata: datapriv.remove( jquery.fn.extend( attrs="elem" elem.attributes; this.length !datapriv.get( "hasdataattrs" elements null (#14894) attrs[ ].name; name.indexof( "data-" name.slice( data[ datapriv.set( "hasdataattrs", multiple this.each( function() this, calling jquery (element matches) (and therefore element appears this[ ]) `value` parameter undefined. result `undefined` throw exception attempt read made. camelcased "discover" custom tried really hard, exist. data... store null, arguments.length> 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 1 2 3 45 - disconnected elements can have computed display: none, so first confirm that elem is in the document. isattached( ) && jquery.css( elem, "display" "none"; }; var swap="function(" options, callback, args { ret, name, old="{};" remember values, and insert new ones for ( name options old[ ]="elem.style[" ]; elem.style[ } ret="callback.apply(" || [] ); revert values return ret; function adjustcss( prop, valueparts, tween adjusted, scale, maxiterations="20," currentvalue="tween" ? function() tween.cur(); : "" }, initial="currentValue()," unit="valueParts" valueparts[ jquery.cssnumber[ prop "px" ), starting value computation required potential mismatches initialinunit="elem.nodeType" !="=" +initial rcssnum.exec( if initialinunit[ support: firefox <="54" halve iteration target to prevent interference from css upper bounds (gh-2144) 2; trust units reported by jquery.css iteratively approximate a nonzero point 1; while maxiterations-- evaluate update our best guess (doubling guesses zero out). finish scale equals or crosses (making old*new product non-positive). jquery.style( + * 0.5 scale; make sure we properties later on valueparts="valueParts" []; 0; apply relative offset (+="/-=)" specified adjusted="valueParts[" +valueparts[ tween.unit="unit;" tween.start="initialInUnit;" tween.end="adjusted;" adjusted; defaultdisplaymap="{};" getdefaultdisplay( temp, doc="elem.ownerDocument," nodename="elem.nodeName," display="defaultDisplayMap[" display; temp="doc.body.appendChild(" doc.createelement( temp.parentnode.removechild( "none" ; defaultdisplaymap[ showhide( elements, show display, index="0," length="elements.length;" determine need change length; index++ !elem.style continue; since force visibility upon cascade-hidden an immediate (and slow) check this loop unless nonempty (either inline about-to-be-restored) values[ null; !values[ elem.style.display ishiddenwithintree( else what we're overwriting datapriv.set( "display", set of second avoid constant reflow elements[ ].style.display="values[" elements; jquery.fn.extend( show: this, true hide: toggle: function( state typeof "boolean" this.show() this.hide(); this.each( jquery( ).show(); ).hide(); rcheckabletype="(" ^(?:checkbox|radio)$ i rtagname="(" <([a-z][^\ \0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only option: [ 1, "<select multiple="multiple">", "" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 0 1 2 11 only wrapmap.optgroup="wrapMap.option;" wrapmap.tbody="wrapMap.tfoot" = wrapmap.colgroup="wrapMap.caption" wrapmap.thead; wrapmap.th="wrapMap.td;" function getall( context, tag ) { support: ie <="9" - use typeof to avoid zero-argument method invocation on host objects (#15151) var ret; if ( context.getelementsbytagname !="=" "undefined" ret="context.getElementsByTagName(" || "*" ); } else context.queryselectorall undefined && nodename( return jquery.merge( [ context ], mark scripts as having already been evaluated setglobaleval( elems, refelements i="0," l="elems.length;" for ; l; i++ datapriv.set( elems[ "globaleval", !refelements datapriv.get( refelements[ "globaleval" rhtml="/<|&#?\w+;/;" buildfragment( scripts, selection, ignored elem, tmp, tag, wrap, attached, j, fragment="context.createDocumentFragment()," nodes="[]," elem="elems[" ]; add directly totype( "object" android only, phantomjs push.apply(_, arraylike) throws ancient webkit nodes, elem.nodetype ? ] : convert non-html into a text node !rhtml.test( nodes.push( context.createtextnode( html dom tmp="tmp" fragment.appendchild( context.createelement( "div" deserialize standard representation rtagname.exec( "", "" )[ ].tolowercase(); wrap="wrapMap[" wrapmap._default; tmp.innerhtml="wrap[" + jquery.htmlprefilter( wrap[ descend through wrappers the right content j="wrap[" while j-- tmp.childnodes remember top-level container ensure created are orphaned (#12392) tmp.textcontent remove wrapper from fragment.textcontent skip elements in collection (trac-4087) selection jquery.inarray(> -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 0 1 2 13393 only older webkit doesn't clone checked state correctly in fragments support.checkclone="div.cloneNode(" true ).clonenode( ).lastchild.checked; support: ie <="11" make sure textarea (and checkbox) defaultvalue is properly cloned div.innerhtml="<textarea>x</textarea>" ; support.noclonechecked="!!div.cloneNode(" ).lastchild.defaultvalue; } )(); var rkeyevent="/^key/," rmouseevent="/^(?:mouse|pointer|contextmenu|drag|drop)|click/," rtypenamespace="/^([^.]*)(?:\.(.+)|)/;" function returntrue() { return true; returnfalse() false; - 11+ focus() and blur() are asynchronous, except when they no-op. so expect focus to be synchronous the element already active, blur not active. (focus always other supported browsers, this just defines we can count on it). expectsync( elem, type ) ( elem="==" safeactiveelement() "focus" ); accessing document.activeelement throw unexpectedly https: bugs.jquery.com ticket try document.activeelement; catch err on( types, selector, data, fn, one origfn, type; types a map of handlers if typeof "object" types-object, data selector !="=" "string" || selector; for type, types[ ], elem; null && fn="=" = undefined; else false !fn origfn="fn;" event use an empty set, since contains info jquery().off( origfn.apply( this, arguments }; same guid caller remove using fn.guid="origFn.guid" origfn.guid="jQuery.guid++" elem.each( function() jquery.event.add( * helper functions managing events -- part public interface. props dean edwards' addevent library many ideas. jquery.event="{" global: {}, add: function( handler, handleobjin, eventhandle, tmp, events, t, handleobj, special, handlers, namespaces, origtype, elemdata="dataPriv.get(" don't attach nodata or text comment nodes (but allow plain objects) !elemdata return; pass object custom lieu handler handler.handler handleobjin="handler;" ensure that invalid selectors exceptions at time evaluate against documentelement case non-element node (e.g., document) jquery.find.matchesselector( documentelement, has unique id, used find it later !handler.guid handler.guid="jQuery.guid++;" init element's structure main first !( {}; eventhandle="elemData.handle" e discard second jquery.event.trigger() called after page unloaded jquery "undefined" jquery.event.triggered e.type ? jquery.event.dispatch.apply( : handle multiple separated by space "" ).match( rnothtmlwhite [ ]; t="types.length;" while t-- tmp="rtypenamespace.exec(" ] []; tmp[ namespaces="(" ).split( "." ).sort(); there *must* no attaching namespace-only !type continue; changes its special changed defined, determine api otherwise given special.delegatetype special.bindtype update based newly reset handleobj passed all type: origtype: data: handler: guid: handler.guid, selector: needscontext: jquery.expr.match.needscontext.test( ), namespace: namespaces.join( }, queue we're handlers.delegatecount="0;" addeventlistener returns !special.setup special.setup.call( elem.addeventlistener elem.addeventlistener( special.add special.add.call( !handleobj.handler.guid handleobj.handler.guid="handler.guid;" add list, delegates front handlers.splice( handlers.delegatecount++, 0, handlers.push( keep track which have ever been used, optimization jquery.event.global[ detach set from remove: mappedtypes j, origcount, datapriv.get( once each type.namespace types; may omitted unbind (on namespace, provided) jquery.event.remove( + new regexp( "(^|\\.)" "\\.(?:.*\\.|)" "(\\.|$)" matching origcount="j" handlers.length; j-- j origtype="==" handleobj.origtype !handler handleobj.guid !tmp tmp.test( handleobj.namespace !selector handleobj.selector "**" handlers.delegatecount--; special.remove special.remove.call( generic removed something more exist (avoids potential endless recursion during removal handlers) !handlers.length !special.teardown special.teardown.call( elemdata.handle jquery.removeevent( delete events[ expando it's longer jquery.isemptyobject( datapriv.remove( "handle events" dispatch: nativeevent writable native i, ret, matched, handlerqueue, args="new" array( arguments.length "events" {} )[ event.type [], fix-ed rather than (read-only) args[ i="1;" arguments.length; i++ event.delegatetarget="this;" call predispatch hook mapped let bail desired special.predispatch special.predispatch.call( handlerqueue="jQuery.event.handlers.call(" event, run first; want stop propagation beneath us matched="handlerQueue[" !event.ispropagationstopped() event.currenttarget="matched.elem;" j++ !event.isimmediatepropagationstopped() namespaced, then invoked specially universal superset event's. !event.rnamespace event.rnamespace.test( event.handleobj="handleObj;" event.data="handleObj.data;" ret="(" jquery.event.special[ ).handle handleobj.handler ).apply( matched.elem, undefined event.result="ret" event.preventdefault(); event.stoppropagation(); postdispatch special.postdispatch special.postdispatch.call( event.result; handlers: sel, matchedhandlers, matchedselectors, delegatecount="handlers.delegateCount," cur="event.target;" delegate black-hole svg <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42 11 suppress spec-violating clicks indicating a non-primary pointer button (trac-3861) https: www.w3.org tr dom-level-3-events #event-type-click support: ie only ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343) !( event.type="==" "click" && event.button>= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 0 1 2="==" 3 4 7 2003 3229 - 11+ focus() and blur() are asynchronous notasync="expectSync(" this, type ); this[ ](); result="dataPriv.get(" if ( saved !="=" || ) { datapriv.set( type, false } else cancel the outer synthetic event event.stopimmediatepropagation(); event.preventdefault(); return result.value; this is an inner for with a bubbling surrogate (focus or blur), assume that already propagated from triggering native prevent happening again here. technically gets ordering wrong w.r.t. to `.trigger()` (in which propagates *after* non-bubbling base), but seems less bad than duplication. jquery.event.special[ ] {} ).delegatetype event.stoppropagation(); triggered above, everything now in order fire original arguments saved.length ...and capture value: jquery.event.trigger( support: ie <="9" extend prototype reset above stopimmediatepropagation() jquery.extend( saved[ ], jquery.event.prototype ), saved.slice( abort handling of jquery.removeevent="function(" elem, handle "if" needed plain objects elem.removeeventlistener elem.removeeventlistener( }; jquery.event="function(" src, props allow instantiation without 'new' keyword !( instanceof new jquery.event( object src && src.type this.originalevent="src;" this.type="src.type;" events up document may have been marked as prevented by handler lower down tree; reflect correct value. this.isdefaultprevented="src.defaultPrevented" src.defaultprevented="==" undefined android only src.returnvalue="==" ? returntrue : returnfalse; create target properties safari should not be text node (#504, #13143) this.target="(" src.target src.target.nodetype="==" src.target.parentnode src.target; this.currenttarget="src.currentTarget;" this.relatedtarget="src.relatedTarget;" put explicitly provided onto timestamp incoming doesn't one this.timestamp="src" src.timestamp date.now(); mark it fixed jquery.expando based on dom3 specified ecmascript language binding https: www.w3.org tr wd-dom-level-3-events-20030331 ecma-script-binding.html constructor: jquery.event, isdefaultprevented: returnfalse, ispropagationstopped: isimmediatepropagationstopped: issimulated: false, preventdefault: function() var e="this.originalEvent;" !this.issimulated e.preventdefault(); }, stoppropagation: this.ispropagationstopped="returnTrue;" e.stoppropagation(); stopimmediatepropagation: this.isimmediatepropagationstopped="returnTrue;" e.stopimmediatepropagation(); this.stoppropagation(); includes all common including keyevent mouseevent specific jquery.each( altkey: true, bubbles: cancelable: changedtouches: ctrlkey: detail: eventphase: metakey: pagex: pagey: shiftkey: view: "char": code: charcode: key: keycode: button: buttons: clientx: clienty: offsetx: offsety: pointerid: pointertype: screenx: screeny: targettouches: toelement: touches: which: function( button="event.button;" add key event.which="=" null rkeyevent.test( event.type event.charcode event.keycode; click: left; middle; right !event.which rmouseevent.test( & 1; 3; 2; 0; event.which; jquery.event.addprop focus: "focusin", blur: "focusout" delegatetype utilize possible so blur focus sequence setup: claim first "focus", ... "blur", leveragenative( expectsync normal processing caller false; trigger: force setup before trigger non-false event-path propagation true; delegatetype: mouseenter leave using mouseover out event-time checks delegation works jquery. do same pointerenter pointerleave pointerover pointerout sends too often; see: bugs.chromium.org p chromium issues detail?id="470258" description bug (it existed older chrome versions well). mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" orig, fix orig fix, bindtype: handle: ret, related="event.relatedTarget," handleobj="event.handleObj;" call outside target. nb: no relatedtarget mouse left entered browser window !related !jquery.contains( target, ret="handleObj.handler.apply(" ret; jquery.fn.extend( on: types, selector, data, fn on( one: fn, off: handleobj, type; types types.preventdefault types.handleobj dispatched jquery( types.delegatetarget ).off( handleobj.namespace handleobj.origtype + "." handleobj.origtype, handleobj.selector, handleobj.handler this; typeof "object" types-object [, selector] this.off( types[ selector="==" "function" fn] this.each( jquery.event.remove( * eslint-disable max-len see github.com eslint rxhtmltag="/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0">\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 12 13 1736512 - 11, edge only in ie using regex groups here causes severe slowdowns. see https: connect.microsoft.com feedback details rnoinnerhtml="/<script|<style|<link/i," checked="checked" or rchecked="/checked\s*(?:[^=]|=\s*.checked.)/i," rcleanscript="/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)">\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 1 only, phantomjs only push.apply(_, arraylike) throws on ancient webkit jquery.merge( scripts, getall( node, "script" ) ); } callback.call( collection[ i ], if ( hasscripts { doc="scripts[" scripts.length - ].ownerdocument; reenable scripts jquery.map( restorescript evaluate executable first document insertion for < hasscripts; i++ node="scripts[" ]; rscripttype.test( node.type || "" && !datapriv.access( "globaleval" jquery.contains( doc, node.src ).tolowercase() !="=" "module" optional ajax dependency, but won't run not present jquery._evalurl !node.nomodule jquery._evalurl( node.src, nonce: node.nonce node.getattribute( "nonce" else domeval( node.textcontent.replace( rcleanscript, ), return collection; function remove( elem, selector, keepdata var nodes="selector" ? jquery.filter( elem : ; ] !keepdata node.nodetype="==" jquery.cleandata( node.parentnode isattached( setglobaleval( node.parentnode.removechild( elem; jquery.extend( htmlprefilter: function( html html.replace( rxhtmltag, "<$1>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 0 1 2 3 9 11 44 - 45+ assign undefined instead of using delete, see data#remove elem[ datapriv.expando ]="undefined;" } if ( datauser.expando ) { support: chrome <="35" ); jquery.fn.extend( detach: function( selector return remove( this, selector, true }, remove: text: value access( ? jquery.text( this : this.empty().each( function() this.nodetype="==" || this.textcontent="value;" null, value, arguments.length append: dommanip( arguments, elem var target="manipulationTarget(" target.appendchild( prepend: target.insertbefore( elem, target.firstchild before: this.parentnode this.parentnode.insertbefore( after: this.nextsibling empty: i="0;" for ; !="null;" i++ elem.nodetype="==" prevent memory leaks jquery.cleandata( getall( false remove any remaining nodes elem.textcontent this; clone: dataandevents, deepdataandevents dataandevents="dataAndEvents" =="null" dataandevents; deepdataandevents; this.map( jquery.clone( html: {}, l="this.length;" && elem.innerhtml; we can take a shortcut and just use innerhtml typeof "string" !rnoinnerhtml.test( !wrapmap[ rtagname.exec( [ "", "" )[ ].tolowercase() try l; {}; element elem.innerhtml="value;" throws an exception, the fallback method catch e {} this.empty().append( replacewith: ignored="[];" make changes, replacing each non-ignored context with new content parent="this.parentNode;" jquery.inarray( parent.replacechild( force callback invocation jquery.each( appendto: "append", prependto: "prepend", insertbefore: "before", insertafter: "after", replaceall: "replacewith" name, original jquery.fn[ name elems, ret="[]," insert="jQuery(" ), last="insert.length" 1, elems="i" this.clone( jquery( insert[ ]( android only, phantomjs only .get() because push.apply(_, arraylike) on ancient webkit push.apply( ret, elems.get() this.pushstack( }; rnumnonpx="new" regexp( "^(" + pnum ")(?!px)[a-z%]+$", "i" getstyles="function(" ie firefox (#15098, #14150) elements created in popups ff meanwhile frame through "defaultview.getcomputedstyle" view="elem.ownerDocument.defaultView;" !view !view.opener view.getcomputedstyle( rboxstyle="new" cssexpand.join( "|" executing both pixelposition & boxsizingreliable tests require one layout so they're executed at same time to save second computation. function computestyletests() is singleton, need execute it once !div return; container.style.csstext="position:absolute;left:-11111px;width:60px;" "margin-top:1px;padding:0;border:0"; div.style.csstext="position:relative;display:block;box-sizing:border-box;overflow:scroll;" "margin:auto;border:1px;padding:1px;" "width:60%;top:1%"; documentelement.appendchild( container ).appendchild( div divstyle="window.getComputedStyle(" pixelpositionval="divStyle.top" "1%"; 4.0 4.3 reliablemarginleftval="roundPixelMeasures(" divstyle.marginleft 12; safari 10.1, ios 9.3 some styles come back percentage values, even though they shouldn't div.style.right="60%" pixelboxstylesval="roundPixelMeasures(" divstyle.right 36; detect misreporting dimensions box-sizing:border-box boxsizingreliableval="roundPixelMeasures(" divstyle.width overflow:scroll screwiness (gh-3699) don't get tricked when zoom affects offsetwidth (gh-4029) div.style.position="absolute" scrollboxsizeval="roundPixelMeasures(" div.offsetwidth documentelement.removechild( nullify wouldn't be stored will also sign that checks already performed roundpixelmeasures( measure math.round( parsefloat( pixelpositionval, boxsizingreliableval, scrollboxsizeval, pixelboxstylesval, reliablemarginleftval, "div" finish early limited (non-browser) environments !div.style style cloned source (#8908) div.style.backgroundclip="content-box" div.clonenode( ).style.backgroundclip support.clearclonestyle="div.style.backgroundClip" "content-box"; jquery.extend( support, boxsizingreliable: computestyletests(); boxsizingreliableval; pixelboxstyles: pixelboxstylesval; pixelposition: pixelpositionval; reliablemarginleft: reliablemarginleftval; scrollboxsize: scrollboxsizeval; )(); curcss( computed width, minwidth, maxwidth, 51+ retrieving before somehow fixes issue getting wrong values detached getstyles( getpropertyvalue needed for: .css('filter') (ie #12537) .css('--customproperty) (#3144) computed[ ]; !isattached( tribute "awesome hack by dean edwards" browser returns but width seems reliably pixels. against cssom draft spec: https: drafts.csswg.org #resolved-values !support.pixelboxstyles() rnumnonpx.test( rboxstyle.test( remember minwidth="style.minWidth;" maxwidth="style.maxWidth;" put out style.minwidth="style.maxWidth" style.width="ret;" revert changed style.maxwidth="maxWidth;" zindex as integer. ret; addgethookif( conditionfn, hookfn define hook, we'll check first run it's really needed. get: conditionfn() hook not (or possible due missing dependency), it. delete this.get; needed; redefine support test again. this.get="hookFn" ).apply( arguments cssprefixes="[" "webkit", "moz", "ms" ], emptystyle="document.createElement(" ).style, vendorprops="{};" vendor-prefixed property or vendorpropname( vendor prefixed names capname="name[" ].touppercase() name.slice( while i-- capname; name; potentially-mapped jquery.cssprops finalpropname( final="jQuery.cssProps[" vendorprops[ final; swappable display none starts table except "table", "table-cell", "table-caption" here values: developer.mozilla.org en-us docs css rdisplayswap="/^(none|table(?!-c[ea]).+)/," rcustomprop="/^--/," cssshow="{" position: "absolute", visibility: "hidden", display: "block" cssnormaltransform="{" letterspacing: "0", fontweight: "400" setpositivenumber( subtract relative (+ -) have been normalized point matches="rcssNum.exec(" guard "subtract", e.g., used csshooks math.max( 0, matches[ "px" value; boxmodeladjustment( dimension, box, isborderbox, styles, computedval "width" extra="0," delta="0;" adjustment may necessary box="==" isborderbox "border" "content" 0; 4; models exclude margin "margin" cssexpand[ true, content-box, we're seeking "padding" !isborderbox add padding "margin", border "width", still keep track otherwise else border-box (content border), "content", "padding", account positive content-box scroll gutter requested providing>= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54 0 1 2 3 8 return a confounding non-pixel value or feign ignorance, as appropriate. if ( rnumnonpx.test( val ) { !extra val; } ; fall back to offsetwidth offsetheight when is "auto" this happens for inline elements with no explicit setting (gh-3571) support: android <="4.1" - 4.3 only also use misreported dimensions (gh-3602) ie 9-11 box sizing unreliable we getclientrects() check hidden disconnected. in those cases, the computed can be trusted border-box !support.boxsizingreliable() && isborderbox || !parsefloat( jquery.css( elem, "display", false, styles "inline" elem.getclientrects().length "boxsizing", "border-box"; where available, approximate border dimensions. not available (e.g., svg), assume box-sizing and interpret retrieved content dimension. valueisborderbox="offsetProp" elem; offsetprop ]; normalize "" auto 0; adjust element's model + boxmodeladjustment( dimension, extra ? "border" : "content" ), valueisborderbox, styles, provide current size request scroll gutter calculation (gh-3589) "px"; jquery.extend( add style property hooks overriding default behavior of getting csshooks: opacity: get: function( should always get number from opacity var ret="curCSS(" "opacity" ); "1" ret; }, don't automatically "px" these possibly-unitless properties cssnumber: "animationiterationcount": true, "columncount": "fillopacity": "flexgrow": "flexshrink": "fontweight": "gridarea": "gridcolumn": "gridcolumnend": "gridcolumnstart": "gridrow": "gridrowend": "gridrowstart": "lineheight": "opacity": "order": "orphans": "widows": "zindex": "zoom": true whose names you wish fix before cssprops: {}, set on dom node style: name, value, text comment nodes !elem elem.nodetype="==" !elem.style return; make sure that we're working right name ret, type, hooks, origname="camelCase(" iscustomprop="rcustomProp.test(" name. want query it css custom since they are user-defined. !iscustomprop gets hook prefixed version, then unprefixed version ] jquery.csshooks[ !="=" undefined type="typeof" value; convert "+=" or " string" ret[ fixes bug #9237 null nan values aren't (#7116) was passed in, unit (except certain properties) removed jquery 4.0 auto-append few hardcoded values. "number" jquery.cssnumber[ background-* props affect original clone's !support.clearclonestyle name.indexof( "background" style[ provided, otherwise just specified !hooks !( "set" style.setproperty( else provided non-computed there "get" object css: extra, val, num, modify try followed by otherwise, way exists, "normal" cssnormaltransform numeric forced qualifier looks num="parseFloat(" isfinite( jquery.each( [ "height", "width" ], i, dimension computed, have info invisibly show them but must display would benefit rdisplayswap.test( "display" safari 8+ table columns non-zero & zero getboundingclientrect().width unless changed. running getboundingclientrect disconnected throws an error. !elem.getclientrects().length !elem.getboundingclientrect().width swap( cssshow, function() getwidthorheight( set: matches, elem read styles.position test has chance fail avoid forcing reflow. scrollboxsizebuggy="!support.scrollboxSize()" "absolute", reflow, fetch boxsizing need (gh-3991) boxsizingneeded="scrollboxSizeBuggy" "border-box", subtract="extra" isborderbox, account comparing offset* faking content-box padding (gh-3699) elem[ "offset" dimension[ ].touppercase() dimension.slice( parsefloat( styles[ "border", 0.5 pixels adjustment needed matches="rcssNum.exec(" matches[ elem.style[ setpositivenumber( }; jquery.csshooks.marginleft="addGetHookIf(" support.reliablemarginleft, curcss( "marginleft" elem.getboundingclientrect().left marginleft: elem.getboundingclientrect().left; used animate expand margin: "", padding: border: prefix, suffix prefix expand: i="0," expanded="{}," assumes single string parts="typeof" "string" value.split( " 4; i++ expanded[ cssexpand[ parts[ expanded; "margin" ].set="setPositiveNumber;" jquery.fn.extend( access( this, len, map="{}," array.isarray( len="name.length;" len; map[ name[ map; jquery.style( arguments.length> 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 0 1 2 3 12 15 only panic based approach to setting things on disconnected nodes tween.prophooks.scrolltop="Tween.propHooks.scrollLeft" = { set: function( tween ) if ( tween.elem.nodetype && tween.elem.parentnode tween.elem[ tween.prop ]="tween.now;" } }; jquery.easing="{" linear: p return p; }, swing: 0.5 - math.cos( * math.pi 2; _default: "swing" jquery.fx="Tween.prototype.init;" back compat <1.8 extension point jquery.fx.step="{};" var fxnow, inprogress, rfxtypes="/^(?:toggle|show|hide)$/," rrun="/queueHooks$/;" function schedule() inprogress document.hidden="==" false window.requestanimationframe window.requestanimationframe( schedule ); else window.settimeout( schedule, jquery.fx.interval jquery.fx.tick(); animations created synchronously will run createfxnow() function() fxnow="undefined;" generate parameters create a standard animation genfx( type, includewidth which, i="0," attrs="{" height: type we include width, step value is do all cssexpand values, otherwise skip over left and right ? : 0; for ; < 4; +="2" which="cssExpand[" ]; attrs[ "margin" "padding" attrs.opacity="attrs.width" type; attrs; createtween( value, prop, tween, collection="(" animation.tweeners[ prop || [] ).concat( "*" ), index="0," length="collection.length;" length; index++ ].call( animation, we're done with this property tween; defaultprefilter( elem, props, opts toggle, hooks, oldfire, proptween, restoredisplay, display, isbox="width" in props "height" anim="this," orig="{}," style="elem.style," hidden="elem.nodeType" ishiddenwithintree( elem datashow="dataPriv.get(" "fxshow" queue-skipping hijack the fx hooks !opts.queue "fx" hooks.unqueued="=" null oldfire="hooks.empty.fire;" hooks.empty.fire="function()" !hooks.unqueued oldfire(); hooks.unqueued++; anim.always( ensure complete handler called before completes hooks.unqueued--; !jquery.queue( ).length hooks.empty.fire(); detect show hide rfxtypes.test( delete props[ toggle="toggle" "toggle"; "hide" "show" pretend be there still data from stopped datashow[ !="=" undefined ignore other no-op continue; orig[ jquery.style( bail out like .hide().hide() proptween="!jQuery.isEmptyObject(" !proptween jquery.isemptyobject( return; restrict "overflow" "display" styles during box elem.nodetype="==" support: ie 11, edge record overflow attributes because does not infer shorthand identically-valued overflowx overflowy just mirrors there. opts.overflow="[" style.overflow, style.overflowx, style.overflowy identify display preferring old css cascade restoredisplay="dataShow" datashow.display; "none" get nonempty value(s) by temporarily forcing visibility showhide( [ ], true restoredisplay; animate inline elements as inline-block "inline" "inline-block" jquery.css( "float" restore original at end of pure anim.done( style.display="restoreDisplay;" "" display; style.overflow="hidden" style.overflowx="opts.overflow[" implement general setup element "hidden" "fxshow", display: store visible so `.stop().toggle()` "reverses" datashow.hidden="!hidden;" animating them eslint-disable no-loop-func eslint-enable final actually hiding !hidden datapriv.remove( per-property 0, !( proptween.end="propTween.start;" proptween.start="0;" propfilter( specialeasing index, name, easing, hooks; camelcase, expand csshook pass name="camelCase(" easing="specialEasing[" array.isarray( "expand" quite $.extend, won't overwrite existing keys. reusing 'index' have correct "name" specialeasing[ animation( properties, options result, stopped, deferred="jQuery.Deferred().always(" don't match :animated selector tick.elem; tick="function()" false; currenttime="fxNow" createfxnow(), remaining="Math.max(" animation.starttime animation.duration android 2.3 archaic crash bug allow us use `1 )` (#12497) temp="remaining" percent="1" temp, animation.tweens[ ].run( deferred.notifywith( percent, there's more do, yield remaining; was an empty synthesize progress notification !length 1, resolve report its conclusion deferred.resolvewith( elem: props: jquery.extend( {}, properties opts: true, specialeasing: easing: jquery.easing._default originalproperties: originaloptions: options, starttime: duration: options.duration, tweens: [], createtween: animation.opts, end, animation.opts.specialeasing[ animation.opts.easing animation.tweens.push( stop: gotoend are going want tweens part animation.tweens.length this; when played last frame; otherwise, reject deferred.rejectwith( animation.opts.specialeasing result="Animation.prefilters[" animation.opts isfunction( result.stop jquery._queuehooks( animation.elem, animation.opts.queue ).stop="result.stop.bind(" result; jquery.map( createtween, animation.opts.start animation.opts.start.call( attach callbacks .progress( animation.opts.progress .done( animation.opts.done, animation.opts.complete .fail( animation.opts.fail .always( animation.opts.always jquery.fx.timer( tick, anim: queue: animation; jquery.animation="jQuery.extend(" tweeners: "*": adjustcss( tween.elem, rcssnum.exec( tweener: callback rnothtmlwhite []; ].unshift( prefilters: defaultprefilter prefilter: callback, prepend animation.prefilters.unshift( animation.prefilters.push( jquery.speed="function(" speed, fn opt="speed" typeof speed="==" "object" complete: !fn !isfunction( go state off jquery.fx.off opt.duration="0;" "number" jquery.fx.speeds normalize opt.queue> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only default value for a checkbox should be "on" support.checkon="input.value" !="=" ""; support: ie <="11" must access selectedindex to make options select support.optselected="opt.selected;" an input loses its after becoming radio "input" ); input.value="t" ; input.type="radio" support.radiovalue="input.value" =="=" "t"; } )(); var boolhook, attrhandle="jQuery.expr.attrHandle;" jquery.fn.extend( { attr: function( name, ) return access( this, jquery.attr, value, arguments.length> 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 0 1 10 11 2008 - only elem.tabindex doesn't always return the correct value when it hasn't been explicitly set https: web.archive.org web 20141116233347 http: fluidproject.org blog 01 09 getting-setting-and-removing-tabindex-values-with-javascript use proper attribute retrieval(#12072) var tabindex="jQuery.find.attr(" elem, "tabindex" ); if ( ) { parseint( tabindex, } rfocusable.test( elem.nodename || rclickable.test( && elem.href 0; -1; }, propfix: "for": "htmlfor", "class": "classname" support: ie <="11" accessing selectedindex property forces browser to respect setting selected on option getter ensures a default is in an optgroup eslint rule "no-unused-expressions" disabled for this code since considers such accessions noop !support.optselected jquery.prophooks.selected="{" get: function( elem * no-unused-expressions: "off" parent="elem.parentNode;" parent.parentnode parent.parentnode.selectedindex; null; set: parent.selectedindex; }; jquery.each( [ "tabindex", "readonly", "maxlength", "cellspacing", "cellpadding", "rowspan", "colspan", "usemap", "frameborder", "contenteditable" ], function() jquery.propfix[ this.tolowercase() ]="this;" strip and collapse whitespace according html spec infra.spec.whatwg.org #strip-and-collapse-ascii-whitespace function stripandcollapse( tokens="value.match(" rnothtmlwhite []; tokens.join( " getclass( elem.getattribute elem.getattribute( "class" ""; classestoarray( array.isarray( value; typeof "string" value.match( jquery.fn.extend( addclass: classes, cur, curvalue, clazz, j, finalvalue, i="0;" isfunction( this.each( j jquery( ).addclass( value.call( this, classes="classesToArray(" classes.length while i++ curvalue="getClass(" cur="elem.nodeType" =="=" + clazz="classes[" j++ cur.indexof( "; assign different avoid unneeded rendering. finalvalue="stripAndCollapse(" !="=" elem.setattribute( "class", this; removeclass: ).removeclass( !arguments.length this.attr( "" expression here better compressibility (see addclass) remove *all* instances> -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 0 1 11 - only option.text throws exceptions (#14686, #14858) strip and collapse whitespace https: html.spec.whatwg.org #strip-and-collapse-whitespace stripandcollapse( jquery.text( elem ) ); } }, select: { get: function( var value, option, i, options="elem.options," index="elem.selectedIndex," one="elem.type" =="=" "select-one", values="one" ? null : [], max="one" + options.length; if ( < i="max;" else 0; loop through all the selected for ; max; i++ option="options[" ]; support: ie ie8-9 doesn't update after form reset (#2551) option.selected || && don't return that are disabled or in a optgroup !option.disabled !option.parentnode.disabled !nodename( option.parentnode, "optgroup" get specific value ).val(); we need an array selects value; multi-selects values.push( values; set: elem, optionset, ), while i-- * eslint-disable no-cond-assign jquery.valhooks.option.get(> -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44 0 1 2 9 11 12 15 firefox doesn't have focus(in | out) events related ticket - https: bugzilla.mozilla.org show_bug.cgi?id="687787" support: chrome <="48" 49, safari 9.1 fire after focus & blur events, which is spec violation http: www.w3.org tr dom-level-3-events #events-focusevent-event-order bugs.chromium.org p chromium issues detail?id="449857" if ( !support.focusin ) { jquery.each( focus: "focusin", blur: "focusout" }, function( orig, fix attach a single capturing handler on the document while someone wants focusin focusout var event jquery.event.simulate( fix, event.target, jquery.event.fix( ); }; jquery.event.special[ ]="{" setup: function() doc="this.ownerDocument" || this, attaches="dataPriv.access(" doc, !attaches doc.addeventlistener( handler, true } datapriv.access( + teardown: 1; doc.removeeventlistener( datapriv.remove( else location="window.location;" nonce="Date.now();" rquery="(" \? cross-browser xml parsing jquery.parsexml="function(" data xml; !data typeof !="=" "string" return null; ie only throws parsefromstring with invalid input. try new window.domparser() ).parsefromstring( data, "text xml" catch e !xml xml.getelementsbytagname( "parsererror" ).length jquery.error( "invalid xml: " rbracket="/\[\]$/," rcrlf="/\r?\n/g," rsubmittertypes="/^(?:submit|button|image|reset|file)$/i," rsubmittable="/^(?:input|select|textarea|keygen)/i;" function buildparams( prefix, obj, traditional, add name; array.isarray( obj serialize array item. i, v traditional rbracket.test( prefix treat each item as scalar. add( non-scalar (array or object), encode its numeric index. "[" "object" && ? i : "" "]", v, !traditional totype( object for name in obj[ ], scalar an of form elements set key values into query string jquery.param="function(" a, s="[]," key, valueorfunction value function, invoke it and use valueorfunction() valueorfunction; s[ s.length null ""; was passed in, assume that elements. a.jquery !jquery.isplainobject( this.name, this.value "old" way (the 1.3.2 older did it), otherwise params recursively. a[ resulting serialization s.join( "&" jquery.fn.extend( serialize: jquery.param( this.serializearray() serializearray: this.map( can prophook "elements" to filter jquery.makearray( this; .filter( type="this.type;" .is( ":disabled" so fieldset[disabled] works this.name !jquery( this ).is( rsubmittable.test( this.nodename !rsubmittertypes.test( this.checked !rcheckabletype.test( .map( elem val="jQuery(" ).val(); jquery.map( val, name: elem.name, value: val.replace( rcrlf, "\r\n" ).get(); r20="/%20/g," rhash="/#.*$/," ranticache="/([?&])_=[^&]*/," rheaders="/^(.*?):[" \t]*([^\r\n]*)$ mg, #7653, #8125, #8152: local protocol detection rlocalprotocol="/^(?:about|app|app-storage|.+-extension|file|res|widget):$/," rnocontent="/^(?:GET|HEAD)$/," rprotocol="/^\/\//," * prefilters 1) they are useful introduce custom datatypes (see ajax jsonp.js example) 2) these called: before asking transport param (s.data s.processdata true) 3) datatype 4) catchall symbol "*" be used 5) execution will start then continue down needed transports bindings selection go avoid comment-prolog char sequence (#10098); must appease lint evade compression alltypes="*/" .concat( ), anchor tag origin originanchor="document.createElement(" "a" originanchor.href="location.href;" base "constructor" jquery.ajaxprefilter jquery.ajaxtransport addtoprefiltersortransports( structure datatypeexpression optional defaults datatypeexpression, func ; datatype, rnothtmlwhite []; isfunction( i++ prepend requested datatype[ "+" "*"; structure[ [] ).unshift( append ).push( inspection inspectprefiltersortransports( structure, options, originaloptions, jqxhr inspected="{}," seekingtransport="(" inspect( selected; inspected[ [], _, prefilterorfactory datatypeortransport="prefilterOrFactory(" !seekingtransport !inspected[ options.datatypes.unshift( false; !( selected="dataTypeOrTransport" options.datatypes[ special extend options takes "flat" (not deep extended) fixes #9887 ajaxextend( target, src deep, flatoptions="jQuery.ajaxSettings.flatOptions" {}; src[ undefined flatoptions[ target )[ ]; jquery.extend( true, target; handles responses request: finds right (mediates between content-type expected datatype) returns corresponding response ajaxhandleresponses( s, jqxhr, ct, type, finaldatatype, firstdatatype, contents="s.contents," remove auto get process datatypes[ datatypes.shift(); ct="==" jqxhr.getresponseheader( "content-type" check we're dealing known contents[ ].test( datatypes.unshift( break; see we finaldatatype="dataTypes[" convertible !datatypes[ s.converters[ !firstdatatype firstdatatype="type;" just first one firstdatatype; found list responses[ chain conversions given request original also sets responsexxx fields instance ajaxconvert( response, issuccess conv2, current, conv, tmp, prev, converters="{}," work copy case need modify conversion create map lowercased keys conv s.converters converters[ conv.tolowercase() current="dataTypes.shift();" convert sequential s.responsefields[ jqxhr[ apply datafilter provided !prev s.datafilter s.datatype prev="current;" there's do non-auto differs from seek direct converter "* none found, pair !conv conv2 outputs tmp="conv2.split(" tmp[ converted accepted input condense equivalence otherwise, insert intermediate (if not equivalence) unless errors allowed bubble, them s.throws state: "parsererror", error: "no "success", data: counter holding number active queries active: 0, last-modified header cache next lastmodified: {}, etag: ajaxsettings: url: location.href, type: "get", islocal: rlocalprotocol.test( location.protocol global: processdata: async: contenttype: "application x-www-form-urlencoded; charset="UTF-8"," timeout: null, datatype: username: password: cache: throws: false, traditional: headers: accepts: "*": alltypes, text: plain", html: html", xml, text xml", json: json, javascript" contents: \bxml\b , \bhtml \bjson\b responsefields: "responsexml", "responsetext", "responsejson" separate source (or "*") destination types space converters: anything text": string, html (true="no" transformation) html": evaluate json expression json": json.parse, parse xml": shouldn't extended: you your own here when extended ajaxextend) flatoptions: context: creates full fledged settings both ajaxsettings fields. omitted, writes ajaxsettings. ajaxsetup: building jquery.ajaxsettings extending jquery.ajaxsettings, ajaxprefilter: ajaxtransport: main method ajax: url, url object, simulate pre-1.5 signature force transport, without anti-cache cacheurl, headers responseheadersstring, responseheaders, timeout handle timeouttimer, cleanup urlanchor, state (becomes false upon send completion) completed, know global dispatched fireglobals, loop variable uncached part uncached, final callbacks context callbackcontext="s.context" dom node jquery collection globaleventcontext="s.context" callbackcontext.nodetype callbackcontext.jquery jquery( jquery.event, deferreds deferred="jQuery.Deferred()," completedeferred="jQuery.Callbacks(" "once memory" status-dependent statuscode="s.statusCode" (they sent all at once) requestheaders="{}," requestheadersnames="{}," default abort message strabort="canceled" fake xhr readystate: builds hashtable getresponseheader: match; completed !responseheaders responseheaders="{};" match="rheaders.exec(" responseheadersstring responseheaders[ match[ ].tolowercase() key.tolowercase() match.join( ", raw getallresponseheaders: caches setrequestheader: name, name.tolowercase() requestheaders[ overrides overridemimetype: s.mimetype="type;" statuscode: code; execute appropriate jqxhr.always( map[ jqxhr.status lazy-add preserves old ones code statuscode[ cancel abort: statustext finaltext="statusText" strabort; transport.abort( done( deferred.promise( (prefilters might expect it) falsy (#10093: consistency signature) parameter available s.url="(" location.href .replace( rprotocol, alias option per #12004 s.type="options.method" options.type s.method s.type; extract s.datatypes="(" ).tolowercase().match( [ cross-domain order origin. s.crossdomain="=" urlanchor="document.createElement(" 11, edge exception accessing href property malformed, e.g. example.com:80x urlanchor.href="s.url;" anchor's host isn't correctly relative originanchor.host urlanchor.protocol urlanchor.host; there error crossdomain, rejected by already s.data s.data, s.traditional prefilters, aborted inside prefilter, stop jqxhr; now asked don't jquery.event amd-usage scenario (#15118) fireglobals="jQuery.event" s.global; watch requests jquery.active++="==" jquery.event.trigger( "ajaxstart" uppercase determine has content s.hascontent="!rnoContent.test(" save toying if-modified-since if-none-match later hash simplify manipulation cacheurl="s.url.replace(" rhash, more handling no !s.hascontent remember put back cacheurl.length should processed, rquery.test( "?" s.data; #9682: it's eventual retry delete update s.cache="==" ranticache, "$1" "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || " ).indexof( x-www-form-urlencoded" r20, header, ifmodified mode. s.ifmodified jquery.lastmodified[ jqxhr.setrequestheader( "if-modified-since", jquery.etag[ "if-none-match", correct being s.contenttype options.contenttype "content-type", accepts server, depending "accept", s.datatypes[ s.accepts[ "; q="0.01"" s.headers s.headers[ allow mimetypes early s.beforesend s.beforesend.call( callbackcontext, done jqxhr.abort(); aborting longer cancellation install completedeferred.add( s.complete jqxhr.done( s.success jqxhr.fail( s.error transports, auto-abort !transport -1, transport" jqxhr.readystate="1;" globaleventcontext.trigger( "ajaxsend", ajaxsend, s.async s.timeout> 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 4 9 204 1223 only #1450: sometimes ie returns when it should be 1223: }, xhrsupported="jQuery.ajaxSettings.xhr();" support.cors="!!xhrSupported" && ( "withcredentials" in ); support.ajax="xhrSupported" = !!xhrsupported; jquery.ajaxtransport( function( options ) { var callback, errorcallback; cross domain allowed if supported through xmlhttprequest || !options.crossdomain return send: headers, complete i, xhr="options.xhr();" xhr.open( options.type, options.url, options.async, options.username, options.password apply custom fields provided options.xhrfields for i xhr[ ]="options.xhrFields[" ]; } override mime type needed options.mimetype xhr.overridemimetype xhr.overridemimetype( x-requested-with header cross-domain requests, seeing as conditions a preflight are akin to jigsaw puzzle, we simply never set sure. (it can always on per-request basis or even using ajaxsetup) same-domain won't change already provided. !headers[ "x-requested-with" headers[ ; headers xhr.setrequestheader( callback function() xhr.onload="xhr.onerror" xhr.onabort="xhr.ontimeout" xhr.onreadystatechange="null;" "abort" xhr.abort(); else "error" support: <="9" manual native abort, ie9 throws errors any property access that is not readystate typeof xhr.status !="=" "number" complete( 0, file: protocol yields status 0; see #8605, #14207 xhr.status, xhr.statustext xhrsuccessstatus[ xhr.statustext, has no xhr2 but binary (trac-11426) non-text, let the caller handle (gh-2498) xhr.responsetype "text" xhr.responsetext "string" ? binary: xhr.response : text: xhr.getallresponseheaders() }; listen events errorcallback="xhr.onerror" xhr.ontimeout="callback(" use onreadystatechange replace onabort uncaught aborts undefined check before timeout changes xhr.readystate="==" allow onerror called first, will abort also, save variable xhr.onerror cannot accessed window.settimeout( errorcallback(); create try do send request (this may raise an exception) xhr.send( options.hascontent options.data null catch e #14683: rethrow this hasn't been notified error yet throw e; abort: callback(); prevent auto-execution of scripts explicit datatype was (see gh-2432) jquery.ajaxprefilter( s s.crossdomain s.contents.script="false;" install script jquery.ajaxsetup( accepts: script: "text javascript, application " + "application ecmascript, x-ecmascript" contents: \b(?:java|ecma)script\b converters: script": text jquery.globaleval( text; cache's special case and crossdomain "script", s.cache="==" s.type="GET" bind tag hack transport deals with forced-by-attrs requests s.scriptattrs script, callback; _, "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 0 1 9 49 only running getboundingclientrect on a disconnected node in ie throws an error if ( !elem.getclientrects().length ) { return top: 0, left: }; } get document-relative position by adding viewport scroll to viewport-relative gbcr rect="elem.getBoundingClientRect();" win="elem.ownerDocument.defaultView;" rect.top + win.pageyoffset, rect.left win.pagexoffset }, position() relates element's margin box its offset parent's padding this corresponds the behavior of css absolute positioning position: function() !this[ ] return; var offsetparent, offset, doc, elem="this[" ], parentoffset="{" position:fixed elements are from viewport, which itself always has zero jquery.css( elem, "position" "fixed" assume implies availability else account for *real* parent, can be document or root element when statically positioned is identified doc="elem.ownerDocument;" offsetparent="elem.offsetParent" || doc.documentelement; while && doc.body doc.documentelement "static" !="=" offsetparent.nodetype="==" incorporate borders into since they outside content origin ).offset(); parentoffset.top "bordertopwidth", true ); parentoffset.left "borderleftwidth", subtract parent offsets and margins offset.top - "margintop", ), offset.left "marginleft", method will documentelement following cases: 1) inside iframe without window 2) hidden detached 3) body html element, i.e. case it but those exceptions were never presented as real life use-cases might considered more preferable results. logic, however, not guaranteed change at any point future offsetparent: this.map( documentelement; create scrollleft scrolltop methods jquery.each( scrollleft: "pagexoffset", scrolltop: "pageyoffset" function( method, prop top="pageYOffset" =="=" prop; jquery.fn[ val access( this, coalesce documents windows win; iswindow( elem.nodetype="==" undefined ? win[ : elem[ ]; win.scrollto( !top win.pagexoffset, win.pageyoffset val, arguments.length support: safari <="7" 9.1, chrome add left csshooks using jquery.fn.position webkit bug: https: bugs.webkit.org show_bug.cgi?id="29084" blink bugs.chromium.org p chromium issues detail?id="589347" getcomputedstyle returns percent specified bottom right; rather than make module depend module, just check here [ "top", "left" i, jquery.csshooks[ support.pixelposition, computed curcss percentage, fallback rnumnonpx.test( jquery( ).position()[ "px" computed; innerheight, innerwidth, height, width, outerheight outerwidth height: "height", width: "width" name, type padding: "inner" content: type, "": "outer" name defaultextra, funcname outerheight, margin, value chainable="arguments.length" defaultextra typeof "boolean" extra="defaultExtra" "margin" "border" doc; $( ).outerwidth height w h including scrollbars (gh-1729) funcname.indexof( elem.document.documentelement[ "client" width either scroll[width height] offset[width client[width height], whichever greatest math.max( elem.body[ "scroll" doc[ "offset" requesting forcing parsefloat set jquery.style( value, undefined, "blur focus focusin focusout resize click dblclick " "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "change select submit keydown keypress keyup contextmenu" ).split( handle event binding data, fn> 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
</=11></div></=9></=44></=10></=9></=4.3></=9></=54></=35></=4.0></=10></=9></=42></=4.1></=9></tbody></=9></=43></=9></=></=></=4.3></"></)></tag></\></537.32></9,></9></8></9></option></29,></=8></4.0></24></=4.0></=2.3></=>