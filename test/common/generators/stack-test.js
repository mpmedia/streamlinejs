/*** Generated by streamline 0.6.0 (generators) - DO NOT EDIT ***/var galaxy = require("galaxy"); ((function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(function*(_) {var failAsync_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(failAsync, 0)), failSync_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(failSync, 0)), A_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(A, 0)), B_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(B, 0)), C_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(C, 0)), D_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(D, 0)), E_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(E, 0)), F_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(F, 0)), G_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(G, 0)), H_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(H, 0)), I_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(I, 0)), T_ = (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(T, 0)); // WARNING: DO NOT INSERT COMMENTS OR ANYTHING
// Line numbers matter to this test!

var module = QUnit.module;



function nextTick(cb){
	setTimeout(function(){
		cb();
	}, 0);
}

function* failAsync(_, code){
	throw new Error(code);
}

function* failSync(_, code){
	(function fail(dummy){ // dummy to defeat CoffeeScript compat rule
		throw new Error(code);
	})(0);
}

var fail;

function* A(_, code){
	if (code == 1) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	if (code == 2) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	(yield galaxy.invoke(null, nextTick, [_], 0));
	if (code == 3) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	for (var i = 0; i < 6; i++) {
		if (code == i) 
			(yield galaxy.invoke(null, fail, [_, code], 0));
		(yield galaxy.invoke(null, nextTick, [_], 0));
	}
	if (code == 6) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	(yield galaxy.invoke(null, nextTick, [_], 0));
	(yield B(_, code));
	(yield galaxy.invoke(null, nextTick, [_], 0));
	return "END";
}

function* B(_, code){
	if (code == 7) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	(yield C(_, code));
	(yield galaxy.invoke(null, nextTick, [_], 0));
	(yield C(_, code));
	(yield D(_, code));
}

function* C(_, code){
	if (code == 8) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
}

function* D(_, code){
	if (code == 9) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
}

function* E(_, code){
	try {
		(yield galaxy.invoke(null, fail, [_, code], 0));
	} 
	catch (ex) {
		if (code % 3 == 1) 
			(yield galaxy.invoke(null, fail, [_, code], 0));
		else if (code % 3 == 2) 
			(yield A(_, code));
		else 
			return "OK " + code;
	}
}

function* F(_, code){
	var f1 = A_(null, code);
	var f2 = A_(null, code + 1);
	return (yield galaxy.invoke(null, f1, [_], 0)) + " & " + (yield galaxy.invoke(null, f2, [_], 0));
}

function* G(_, code){
	if (code == 5) 
		(yield galaxy.invoke(null, fail, [_, code], 0));
	return "" + code;
}

function* H(_, code){
	if (code % 2 == 0) 
		(yield galaxy.invoke(null, nextTick, [_], 0));
	return (yield G(_, code));
}

function* I(_, code){
	var s = "";
	for (var i = 0; i < code; i++) 
		s += (yield H(_, i));
	return s;
}

function* T(_, fn, code, failFn){
	fail = failFn;
	var s = "{";
	try {
		return (yield galaxy.invoke(null, fn, [_, code], 0));
	} 
	catch (ex) {
		var s = ex.stack;
		s = s.split('\n').filter(function(l) { return l.indexOf('<<<') < 0 && l.indexOf('exports.invoke') < 0; }).map(function(l){
			var m = /^\s+at (\w+).*:(\d+)\:[^:]+$/.exec(l);
			if (m) 
				return m[1] + ":" + m[2];
			return l;
		}).join('/');
		var end = s.indexOf('/T:');
		return end < 0 ? s + "-- end frame missing" : s.substring(0, end);
	}
}

function stackEqual(got, expect) {
	if (typeof T_ === 'function' && T_.gstreamlineFunction) { got = got.substring(0, 25); expect = expect.substring(0, 25); }
	strictEqual(got, expect, expect);
}
// safari hack
var rawStack = new Error().stack ? function(raw) {
	return raw;
} : function() {
	return "raw stack unavailable";
};

module("stacks");

asyncTest("stacks", 20, (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(function*(_) {
	stackEqual((yield T(_, A_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/A:28");
	stackEqual((yield T(_, A_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/A:28");
	stackEqual((yield T(_, A_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30");
	stackEqual((yield T(_, A_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30");
	stackEqual((yield T(_, A_, 3, failAsync_)), rawStack("Error: 3/failAsync:15") + "/A:33");
	stackEqual((yield T(_, A_, 3, failSync_)), rawStack("Error: 3/fail:20/failSync:21") + "/A:33");
	stackEqual((yield T(_, A_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/A:36");
	stackEqual((yield T(_, A_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/A:36");
	stackEqual((yield T(_, A_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36");
	stackEqual((yield T(_, A_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36");
	stackEqual((yield T(_, A_, 6, failAsync_)), rawStack("Error: 6/failAsync:15") + "/A:40");
	stackEqual((yield T(_, A_, 6, failSync_)), rawStack("Error: 6/fail:20/failSync:21") + "/A:40");
	stackEqual((yield T(_, A_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/B:49/A:42");
	stackEqual((yield T(_, A_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42");
	stackEqual((yield T(_, A_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42");
	stackEqual((yield T(_, A_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42");
	stackEqual((yield T(_, A_, 9, failAsync_)), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42");
	stackEqual((yield T(_, A_, 9, failSync_)), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42");
	stackEqual((yield T(_, A_, 10, failAsync_)), "END");
	stackEqual((yield T(_, A_, 10, failSync_)), "END");
	start();
}, 0)));

asyncTest("catch", 20, (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(function*(_) {
	stackEqual((yield T(_, E_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30/E:74");
	stackEqual((yield T(_, E_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/E:74");
	stackEqual((yield T(_, E_, 3, failAsync_)), "OK 3");
	stackEqual((yield T(_, E_, 3, failSync_)), "OK 3");
	stackEqual((yield T(_, E_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36/E:74");
	stackEqual((yield T(_, E_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/E:74");
	stackEqual((yield T(_, E_, 6, failAsync_)), "OK 6");
	stackEqual((yield T(_, E_, 6, failSync_)), "OK 6");
	stackEqual((yield T(_, E_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/E:72");
	stackEqual((yield T(_, E_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/E:74");
	stackEqual((yield T(_, E_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/E:74");
	stackEqual((yield T(_, E_, 9, failAsync_)), "OK 9");
	stackEqual((yield T(_, E_, 9, failSync_)), "OK 9");
	stackEqual((yield T(_, E_, 10, failAsync_)), rawStack("Error: 10/failAsync:15") + "/E:72");
	stackEqual((yield T(_, E_, 10, failSync_)), rawStack("Error: 10/fail:20/failSync:21") + "/E:72");
	start();
}, 0)));

asyncTest("futures", 20, (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(function*(_) {
	stackEqual((yield T(_, F_, 1, failAsync_)), rawStack("Error: 1/failAsync:15") + "/A:28/F:83");
	stackEqual((yield T(_, F_, 1, failSync_)), rawStack("Error: 1/fail:20/failSync:21") + "/A:28/F:83");
	stackEqual((yield T(_, F_, 2, failAsync_)), rawStack("Error: 2/failAsync:15") + "/A:30/F:83");
	stackEqual((yield T(_, F_, 2, failSync_)), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/F:83");
	stackEqual((yield T(_, F_, 3, failAsync_)), rawStack("Error: 3/failAsync:15") + "/A:33/F:83");
	stackEqual((yield T(_, F_, 3, failSync_)), rawStack("Error: 3/fail:20/failSync:21") + "/A:33/F:83");
	stackEqual((yield T(_, F_, 4, failAsync_)), rawStack("Error: 4/failAsync:15") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 4, failSync_)), rawStack("Error: 4/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 5, failAsync_)), rawStack("Error: 5/failAsync:15") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 5, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual((yield T(_, F_, 6, failAsync_)), rawStack("Error: 6/failAsync:15") + "/A:40/F:83");
	stackEqual((yield T(_, F_, 6, failSync_)), rawStack("Error: 6/fail:20/failSync:21") + "/A:40/F:83");
	stackEqual((yield T(_, F_, 7, failAsync_)), rawStack("Error: 7/failAsync:15") + "/B:49/A:42/F:83");
	stackEqual((yield T(_, F_, 7, failSync_)), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42/F:83");
	stackEqual((yield T(_, F_, 8, failAsync_)), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/F:83");
	stackEqual((yield T(_, F_, 8, failSync_)), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/F:83");
	stackEqual((yield T(_, F_, 9, failAsync_)), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42/F:83");
	stackEqual((yield T(_, F_, 9, failSync_)), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42/F:83");
	stackEqual((yield T(_, F_, 10, failAsync_)), "END & END");
	stackEqual((yield T(_, F_, 10, failSync_)), "END & END");
	start();
}, 0)));

asyncTest("loop", 8, (function(unstarred__) {  function F(_) {   return unstarred__.apply(this, arguments);  };  F.__starred__ = unstarred__.__starred__;  F.__starred__.__unstarred__ = F;  return F;})(galaxy.unstar(function*(_) {
	stackEqual((yield T(_, I_, 4, failAsync_)), "0123");
	stackEqual((yield T(_, I_, 4, failSync_)), "0123");
	stackEqual((yield T(_, I_, 5, failAsync_)), "01234");
	stackEqual((yield T(_, I_, 5, failSync_)), "01234");
	stackEqual((yield T(_, I_, 6, failAsync_)), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 6, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 7, failAsync_)), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual((yield T(_, I_, 7, failSync_)), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	start();
}, 0)));

}, 0)).call(this, function(err) {
  if (err) throw err;
}));