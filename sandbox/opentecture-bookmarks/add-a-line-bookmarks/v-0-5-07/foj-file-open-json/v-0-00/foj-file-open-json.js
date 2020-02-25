/* globals JSZip */
// jshint esversion: 6
/* jshint loopfunc: true */

var FOJ = {

	"copyright": "Copyright 2019 pushMe pullYou authors",
	"date": "2019-09-28",
	"description": "",
	"helpFile": "",
	"license": "MIT License",
	"urlSourceCode": "",
	"version": "0.00.00-0foj"
};


FOJ.requestFile = function( url ) {

	if ( !url ) { return; }

	FOJ.url = url;
	FOJ.fileName = url.split( "/" ).pop();

	FOJ.timeStart = performance.now();

	FOJ.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules

	FOJ.xhr.open( 'GET', url, true );
	FOJ.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOJ.xhr.onprogress = function ( xhr ) { }; //console.log( 'loaded:', xhr.loaded  ); };
	FOJ.xhr.onload = function( xhr ) { FOJ.callbackJson( xhr.target.response ); };
	FOJ.xhr.send( null );

};



FOJ.callbackJson = function( text ) {

	FOJ.text = text;
	FOJ.jsonLines = FOJ.text.split(/\r\n|\n/)
	.filter( line => line.slice( 0, 1 ) === "{" )
	.map( line => JSON.parse( line ) );

	//console.log( 'FOJ.jsonLines', FOJ.jsonLines );

	const eventJsonParse = new Event( 'FOJonJsonParse' );

	// document.body.addEventListener( 'FOBonJsonParse', () => {
	//	console.log( 'FOJ loaded', FOJ.fileName )
	//	BOP.onLoadParse( FOJ.jsonLines )
	// }, false );

	document.body.dispatchEvent( eventJsonParse );

};