/* global BM, MJLdet, MJLdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MJL = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-09-29",
	description: "Display every line of JSON in the file - incomplete, work-in-progress",
	license: "MIT License",
	version: "0.05.06-0mjl",

};



MJL.getMenuJsonLines = function() {

	const htm =
	`
		<details id=MJLdet ontoggle=MJL.setMenuJsonLines(); >

			<summary>Every line in file (MJL)</summary>

			<p>${ MJL.description }</p>

			<p>
				Search text in lines: <input type=search name="q" oninput=MJL.filterBookmarks(this) ;>
			</p>

			<p id=MJLpStats></p>

			<div id=MJLdivJsonLines class=divMenuList></div>

			<hr>

		</details>
	`;

	return htm;

};



MJL.setMenuJsonLines = function( jsonLines = BOP.jsonLines, str = "JSON data" ){

	if ( MJLdet.open === false ) return;

	MJL.jsonLines = jsonLines;

	MJLpStats.innerHTML = `<p>${ jsonLines.length } lines with ${ str } in file</p>`;

	markHtm = jsonLines.map( ( line, count ) =>
		`
			<div style=margin-bottom:0.5rem; >
				<div style="display:inline-block" >${ count + 1 }. </div>
				<div style="display:inline-block;width:75%;" ><button onclick=MJL.setMainContents("${ count}"); title="${ line.description }"  >${ line.name }</button></div>
				<div style="display:inline-block" ><a href="${ line.url }" target="_blank" title="open link in new tab"  >❐</a></div>
			</div>
		`

	).join( "" );

	MJLdivJsonLines.innerHTML = markHtm;

};



MJL.filterBookmarks = function ( input ) {

	const str = input.value.toLowerCase() || "";

	MJL.jsonLines = BOP.jsonLines.filter( line => JSON.stringify( line ).includes( str ) );

	MJL.setMenuJsonLines( MJL.jsonLines, `"${str }"` );

};



MJL.setMainContents = function ( index ) {

	mainContents.innerText = JSON.stringify( MJL.jsonLines[ index ], null, "  " );

}