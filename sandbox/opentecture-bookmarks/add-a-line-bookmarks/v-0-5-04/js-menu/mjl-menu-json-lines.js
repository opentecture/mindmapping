/* global BM, MJLdet, MJLdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MJL = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-07-28",
	description: "Display every line of JSON in the file",
	license: "MIT License",
	version: "0.5.03-0mjl",

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

	for ( let mark of bookmarks) {

		const index = BOP.jsonLines.indexOf( mark );

		markHtm +=
		`
			<div style=margin-bottom:0.5rem; >
				<button onclick=BED.setTargetToEditDialog("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
				<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
			</div>
		`;

	}

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