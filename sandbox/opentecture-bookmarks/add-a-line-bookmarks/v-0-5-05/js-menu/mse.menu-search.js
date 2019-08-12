"use strict";

/* global BM, MSEdet, MSEdivBookmarksByTag */
// jshint esversion: 6
// jshint loopfunc: true

const MSE = {

	copyright: "Copyright 2019 Opentecture authors. ",
	date: "2019-08-10",
	description: "Search for text strings in the JSON file",
	license: "MIT License",
	version: "0.5.05-0MSE",

};

MSE.getMenuSearch= function() {

	const htm =
	`
		<details id=MSEdet ontoggle=MSE.setMenuSearch(); >

			<summary>Filter bookmarks by search MSE</summary>

			<p>${ MSE.description }</p>

			<p>
				Search: <input type=search name="q" oninput=MSE.filterBookmarks(this) ;>
			</p>

			<div id=MSEdivJsonLines style=height:20rem;overflow:scroll;resize:both;></div>

			<hr>

		</details>
	`;

	return htm;

};



MSE.setMenuSearch = function( bookmarks = BOP.bookmarks ){

	if ( MSEdet.open === false ) return;

	bookmarks = COR.getBookmarksFilterByTagsToIgnore( bookmarks );

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

	BOP.setBookmarks( bookmarks );

};



MSE.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	let bookmarks = [];

	if ( str === "" ) {

		bookmarks = BOP.bookmarks;

	} else {

		bookmarks = BOP.bookmarks.filter( bookmark => {

			const bookmarkString = JSON.stringify( bookmark );

			return bookmarkString.includes( str );

		} );

	}

	MSE.setMenuSearch ( bookmarks );

};