// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const AB = { "release": "1.0", "date": "2019-03-30" };

AB.bookmarks = [];
AB.jsonLines = [];
AB.urlJson = "opentecture-bookmarks.json";



AB.requestFile = function( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

};



AB.parseFile = function( obj ) {

	const data = obj.target ? obj.target.response : obj

	bookmarks = [];
	descriptions = [];
	comments = [];
	//index = 0;

	AB.jsonLines = data.split(/\r\n|\n/);

	for ( let line of AB.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			AB.bookmarks.push( jsonl );

		} else if ( jsonl.type === "description" ) {

			descriptions.push( jsonl );

		}else if ( jsonl.type === "comment" ) {

			comments.push( jsonl );

		} else {

			console.log( 'oops', jsonl );

		}

	}
	console.log( 'bookmarks', AB.bookmarks );

	//setMenuHeaders();

};



AB.saveFile = function() {

	const lines = AB.jsonLines.join( "\n" );

	let blob = new Blob( [ lines ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = 'opentecture-bookmarks.json';
	a.click();
	a = null;

};
