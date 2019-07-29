/* global BM, MFOdet, MFOdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MFO = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-07-28",
	description: "Buttons for every line of JSON in the file",
	license: "MIT License",
	version: "0.5.03-0mfo",

};


MFO.getMenuJsonLines = function() {

	const htm =
	`
	<details id=MFOdet ontoggle=MFO.setMenuJsonLines(); >

		<summary>All items by JSON line</summary>

		<p>${ MFO.description }</p>
<!--
		<p>
			Search: <input type=search name="q" oninput=MFO.filterBookmarks(this) ;>
		</p>
-->
		<div id=MFOdivJsonLines ></div>

		<hr>

	</details>
	`;

	return htm;

};



MFO.setMenuJsonLines = function( bookmarks = BM.jsonLines ){


	if( MFOdet.open === false ) return;

	let markHtm = `<p>${ bookmarks.length } links</p>`;

	for ( let bookmark of bookmarks) {

		if ( !bookmark.url || !bookmark.type === "url" ) { continue; }

		const index = bookmarks.indexOf( bookmark );

		markHtm +=
		`
		<div style=margin-bottom:0.5rem; >
			<button onclick=BM.setContents("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
			<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
		</div>
		`;

	}

	MFOdivJsonLines.innerHTML = markHtm;

	BM.setBookmarks( bookmarks );

};



MFO.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	MFO.bookmarks = [];

	if ( str === "" ) {

		for ( let line of BM.lines ) {
			//console.log( 'line', line );

			//if ( line.slice( 0, 1 ) !== "{" ) { continue; }

			const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl );

			if ( jsonl.type === "url" ) { MFO.bookmarks.push( jsonl ); }

		}

	} else {

		for ( let line of BM.lines ) {

			//if ( line.slice( 0, 1 ) !== "{" ) { continue; }
			//console.log( 'line', line );

			const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl.url );

			if ( jsonl.url ) {

				a.href = jsonl.url;
				const site = a.hostname;
				//console.log( 'site', site );

				if ( site.includes( str ) ) { MFO.bookmarks.push( jsonl ); }

			}

		}

	}

	MFO.setMenuItemsByUrl( MFO.bookmarks );

};