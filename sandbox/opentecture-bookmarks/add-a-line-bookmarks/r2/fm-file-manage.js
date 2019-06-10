// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const FM = { "release": "0.4.0", "date": "2019-04-20" };

FM.bookmarks = [];
FM.jsonLines = [];
FM.urlJson = "opentecture-bookmarks-2.json";



FM.requestFile = function( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

};



FM.openFile = function( files ) {

	const reader = new FileReader();
	reader.onload = function( event ) {

		FM.parseFile( reader.result );

	}

	reader.readAsText( files.files[ 0 ] );

};



FM.parseFile = function( obj ) {

	const data = obj.target ? obj.target.response : obj;

	FM.bookmarks = [];
	FM.descriptions = [];
	FM.comments = [];
	//index = 0;

	FM.jsonLines = data.split(/\r\n|\n/);

	for ( let line of FM.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			FM.bookmarks.push( jsonl );

		} else if ( jsonl.type === "description" ) {

			FM.descriptions.push( jsonl );

		}else if ( jsonl.type === "comment" ) {

			FM.comments.push( jsonl );

		} else {

			console.log( 'oops', jsonl );

		}

	}
	//console.log( 'bookmarks', FM.bookmarks );

	//BLBS.setMenuHeaders(); // will change to setting an event here

	setMenuItemsByUrl(FM.bookmarks);

};





FM.parseMarkdownToHtml = function( xhr ) {

	const response = xhr.target.response;
	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( response );

	divContents.innerHTML = html;
	window.scrollTo( 0, 0 );

}




FM.saveFile = function() {

	const lines = FM.jsonLines.join( "\n" );

	let blob = new Blob( [ lines ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = 'add-a-line-bookmarks.json';
	a.click();
	a = null;

};
