"use strict";

/* global BM, MSEdet, MSEdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MSE = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-10-05",
	description: "Search for text strings anywhere in the record. Pink icon on left: no tags. Pink to right: no comments.",
	license: "MIT License",
	version: "0.05.06-1MSE",

};

MSE.getMenuSearch= function() {

	const htm =
	`
		<details id=MSEdet ontoggle=MSE.filterBookmarks(MSEinpSearch); >

			<summary>Bookmarks by search (MSE)</summary>

			<p>${ MSE.description }</p>

			<p>
				Search: <input id=MSEinpSearch type=search name="q" oninput=MSE.filterBookmarks(this) ;>
			</p>

			<div id=MSEdivJsonLines class=divMenuList ></div>

			<hr>

		</details>
	`;

	return htm;

};


MSE.filterBookmarks = function ( input ) {

	const string = input.value;

	const strings = string ?	string.split( " " ) : [];
	console.log( 'strings', strings );

	MSE.bookmarks = BOP.getBookmarksFilterByTagsToIgnore( BOP.bookmarks );

	strings.forEach( string =>

		MSE.bookmarks = MSE.bookmarks.filter( bookmark =>
			JSON.stringify( bookmark ).includes( string )
		)
	)

	MSE.setMenuSearch( MSE.bookmarks );

	BOP.setBookmarks( MSE.bookmarks );

};


MSE.setMenuSearch = function( bookmarks = MSE.bookmarks ){

	if ( MSEdet.open === false ) return;

	let markHtm = `<p>${ bookmarks.length } links</p>`;

	bookmarks.forEach( ( bookmark, count ) => {

		const index = BOP.bookmarks.indexOf( bookmark );

		const colorTags = bookmark.tags.length <=1 ? "background-color:pink;" : "";

		const comments = BOP.comments.filter( comment => comment.bookmarkId === bookmark.id );
		//console.log( 'com', comments.length  );

		const colorComments = comments.length < 1 ? "background-color:pink;" : "";

		markHtm +=
		`
			<div style=margin-bottom:0.5rem; >
				<div style="${ colorTags }display:inline-block;" >${ count + 1 }</div>
				<div style="display:inline-block;width:80%;" ><button onclick=BED.setTargetToEditDialog("${ index }"); title="${ bookmark.description }"  >${ bookmark.name }</button></div>
				<div style="display:inline-block;${ colorComments }" ><a href="${ bookmark.url }" target="_blank" title="open link in new tab"  >❐</a></div>
			</div>
		`;

	} );

	MSEdivJsonLines.innerHTML = markHtm;

};
