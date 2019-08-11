/* global BM, MJLdet, MJLdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MJL = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-08-10",
	description: "Display every line of JSON in the file - incomplete, work-in-progress",
	license: "MIT License",
	version: "0.5.05-0mjl",

};



MJL.getMenuJsonLines = function() {

	const htm =
	`
		<details id=MJLdet ontoggle=MJL.setMenuJsonLines(); >

			<summary>Every JSON line in file MJL</summary>

			<p>${ MJL.description }</p>

			<p>
				Search text in tiles: <input type=search name="q" oninput=MJL.filterBookmarks(this) ;>
			</p>

			<div id=MJLdivJsonLines ></div>

			<hr>

		</details>
	`;

	return htm;

};



MJL.setMenuJsonLines = function( bookmarks = BOP.jsonLines ){

	if ( MJLdet.open === false ) return;

	let markHtm = `<p>${ bookmarks.length } links</p>`;

	bookmarks.forEach( ( bookmark, count ) => {

		const index = BOP.bookmarks.indexOf( bookmark );

		markHtm +=
		`
			<div style=margin-bottom:0.5rem; >
				<div style="display:inline-block" >${ count + 1 }. </div>
				<div style="display:inline-block;width:80%;" ><button onclick=BED.setTargetToEditDialog("${ index }"); title="${ bookmark.description }"  >${ bookmark.name }</button></div>
				<div style="display:inline-block" ><a href="${ bookmark.url }" target="_blank" title="open link in new tab"  >❐</a></div>
			</div>
		`;


	} );

	MJLdivJsonLines.innerHTML = markHtm;

	//BOP.setBookmarks( bookmarks );

};



MJL.filterBookmarks = function ( input ) {

	const str = input.value.toLowerCase();

	MJL.bookmarks = [];

	if ( str === "" ) {

		for ( let line of BOP.lines ) {

			const jsonl = JSON.parse( line );

			if ( jsonl.type === "url" ) { MJL.bookmarks.push( jsonl ); }

		}

	} else {

		MJL.bookmarks = BOP.lines.map( line => JSON.parse( line ) )
			.filter( jsonl => jsonl.name && jsonl.name.toLowerCase().includes( str ) );

	}

	MJL.setMenuJsonLines( MJL.bookmarks );

};