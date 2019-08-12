"use strict";

/* global FOB  */
// jshint esversion: 6
// jshint loopfunc: true


const BOP = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-08-04",
	"description": "Display data of bookmark selected from left menu or drag & drop a link into this box",
	"version": "0.5.04-0bop",

};



BOP.onLoadParse = function() {

	BOP.target = BOP.target || divContents;

	BOP.jsonLines = FOB.text.split(/\r\n|\n/)
		.filter( line => line.slice( 0, 1 ) === "{"  )
		.map( line => JSON.parse( line ) );

	BOP.metaTags = BOP.jsonLines.filter( jsonl => jsonl.type === "meta" );

	BOP.comments = BOP.jsonLines.filter( jsonl => jsonl.type === "comment" );

	BOP.bookmarks = BOP.jsonLines.filter( jsonl => jsonl.type === "url" );

	BOP.tagSets = BOP.jsonLines.filter( jsonl => jsonl.type === "tagset" );

	BOP.setBookmarks();

};



BOP.setBookmarks = function ( bookmarks = BOP.bookmarks ) {
	//console.log( '', bookmarks );

	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	const title = BOP.metaTags.find( meta => meta.tags === "title" ).text;
	const subtitle = BOP.metaTags.find( meta => meta.tags === "subtitle" ).text;
	const copyright = BOP.metaTags.find( meta => meta.tags === "copyright" ).text || "copyright";
	const license = BOP.metaTags.find( meta => meta.tags === "license" ).text || "license";

	let htm =
		`<h1>${ title } ~ ${ bookmarks.length } items</h1>
		<p><i>${ subtitle }. ${copyright }. ${ license }.</i></p>`;

	let count = 1;
	bookmarks.forEach( bookmark => {

		a.href = bookmark.url;
		let site = a.hostname;

		const subdomain = subdomains.filter( bit => site.startsWith( bit ) === true );
		//console.log( 'subdomain', subdomain );

		site = site.replace ( subdomain, "" );
		//console.log( 'site', site );

		const comment = BOP.comments.find( comment => comment.bookmarkId === bookmark.id ) || "";
		//console.log( 'comment', comment );

		const index = BOP.bookmarks.findIndex( line => line.id === bookmark.id );

		htm +=
		`<p>
			${ count++ } <a href=${bookmark.url } target="_blank" >
					<img src="${ bookmark.favicon }" height=16px >
				<b>${ bookmark.name }</b> - <i>${ site }</i>
			</a><br>
			tags: <i style=color:blue >${ bookmark.tags }</i>
			- added: ${ bookmark.dateAdd.slice( 0, 10 ) }
			- update: ${ bookmark.dateUpdate.slice( 0, 10 ) }
			<br>
			${ bookmark.description.startsWith ("No description" ) ? "" : bookmark.description }
			<p style=color:blue ><button onclick="BED.setTargetToEditDialog(${ index });" >edit</button>
			${ comment.text ? ( "comment: " + comment.text + " / tags: " + comment.tags ) : "" }</p>
			<hr>
		</p>`;

	} );

	BOP.target.innerHTML = htm;

};



BOP.butSaveFile = function() {

	const name = FOB.name;

	const strings = BOP.jsonLines.map( jsonl => JSON.stringify( jsonl ) ).join( "\n" );
	//console.log( 'str', strings );

	const blob = new Blob( [ strings ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = name;
	a.click();
	a = null;

};