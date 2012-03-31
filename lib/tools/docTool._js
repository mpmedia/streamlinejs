/**
 * Copyright (c) 2011 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */

"use strict";
/// !doc
/// 
/// # streamline/lib/tools/docTool
///  
/// Documentation tool
/// 
/// Usage:
/// 
///      node streamline/lib/tools/docTool [path]
/// 
/// Extracts documentation comments from `.js` files and generates `API.md` file 
/// under package root.
/// 
/// Top of source file must contain `/// !doc` marker to enable doc extraction.  
/// Documentation comments must start with `/// ` (with 1 trailing space).  
/// Extraction can be turned off with `/// !nodoc` and turned back on with `/// !doc`.
/// 
/// The tool can also be invoked programatically with:
/// 
var fs = require('fs');
var fsp = require('path');

/// * `doc = docTool.generate(_, path)`
///   extracts documentation comments from file `path`
exports.generate = function(_, path, options) {
	options = options || {}
	var isWin32 = process.platform === 'win32';

	function _generate(_, path, dontSave) {
		// lstat not available on Windows
		var stat = (isWin32 ? fs.stat : fs.lstat)(path, _);
		if (stat.isFile()) {
			if (path.match(/\._?(js|coffee)$/) && path.indexOf('--fibers.js') < 0) {
				var inside, save, example, inSource;
				var doc = fs.readFile(path, "utf8", _).split('\n').map(function(line) {
					var i = line.indexOf('//' + '/ ');
					if (i >= 0) {
						line = line.substring(i + 4);
						if (line[0] === '!') {
							if (line === "!doc") {
								inside = true;
							} else if (line === "!nodoc") {
								inside = false;
							} else if (line === "!example") {
								inside = true;
								example = true;
								save = true;
							}
							return null;
						}
						if (inside) {
							if (inSource) {
								line = "```\n\n" + line;
								inSource = false;
							}
							return line + "\n";
						}
						return null;
					} else {
						if (inside && example) {
							if (!inSource) {
								line = "\n``` javascript\n" + line;
								inSource = true;
							}
							return line + "\n";
						}
						return null;
					}
				}).filter(function(line) {
					return line != null;
				}).join("");
				if (inside && inSource)
					doc += "```\n\n";
				if (save) {
					fs.writeFile(path.substring(0, path.length - 3) + ".md", doc, "utf8", _);
					return "";
				}
				return doc || "";
			}
			return "";
		} else if (stat.isDirectory() && (isWin32 || !stat.isSymbolicLink())) {
			var split = path.split("/");
			var isPackage = split[split.length - 2] == 'node_modules';
			var doc = "";
			var files = fs.readdir(path, _);
			for (var i = 0; i < files.length; i++) {
				doc += _generate(_, path + "/" + files[i], isPackage || dontSave);
			}
			if (isPackage && !dontSave && doc) {
				fs.writeFile(path + "/API.md", doc, "utf8", _);
				if (options.verbose) console.log("generated " + path + "/API.md");
				doc = "";
			}
			return doc;
		} else return "";
	}
	_generate(_, path);

}
if (process.argv[1] && process.argv[1].indexOf("/docTool") >= 0) exports.generate(_, fsp.join(process.cwd(), process.argv[2] || '.'), {
	verbose: true
});