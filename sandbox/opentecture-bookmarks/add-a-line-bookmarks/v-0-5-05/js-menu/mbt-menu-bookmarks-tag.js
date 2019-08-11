"use strict";

/* global BM, BDMdet, MTBdivBookmarksByTag */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const MBT = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-08-10",
	"description": "Display bookmarks by tags",
	"version": "0.5.05-0mtb",

};



MBT.getMenuBookmarksTag = function() {

	const htm =
	`
	<details id=MBTdet ontoggle=MBT.setMenuItemsByTag(); >

		<summary>Filter bookmarks by tag MBT</summary>

		<p>${ MBT.description }</p>

		<p>
			Search: <input type=search name="q" oninput=MBT.filterBookmarks(this) ;>
		</p>

		<div id=MTBdivBookmarksByTag ></div>

		<hr>

	</details>
	`;

	return htm;

};



MBT.setMenuItemsByTag = function( bookmarks = BOP.bookmarks ){

	if ( MBTdet.open === false ) return;

	bookmarks = COR.getBookmarksFilterByTagsToIgnore( bookmarks );

	let tags = [];

	for ( let bookmark of bookmarks ) {

		//if ( !bookmark.url && !bookmark.tags ) { continue; }

		tags.push( ...bookmark.tags );

	}
	tags = [ ...new Set( tags ) ].sort();
	//console.log( 'tags', tags );

	MBT.bookmarksSelected = [];
	let indexSelected = 0;

	let tagHtm = `${ tags.length } tags = ${ bookmarks.length } bookmarks`;

	for ( let tag of tags ) {
		//console.log( 'tag', tag );

		const marks = bookmarks.filter( bookmark => bookmark.url && bookmark.type === "url" && bookmark.tags && bookmark.tags.includes( tag ) );
		//console.log( 'marks', marks );
		MBT.bookmarksSelected.push( marks || [] );

		let markHtm = "";

		for ( let mark of marks) {

			const index = BOP.bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=BED.setTargetToEditDialog("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
				<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
			</div>
			`;

		}

		if ( marks.length ) {

			tagHtm +=
			`
				<details ontoggle=MBT.filter(${ indexSelected })>
					<summary>${ tag } - ${ marks.length }</summary>

					${ markHtm }

				</details>

			`;
		}

		indexSelected ++;

	}

	MTBdivBookmarksByTag.innerHTML = tagHtm;

};



MBT.filter = function ( index ) {

	BOP.setBookmarks( MBT.bookmarksSelected[ index ] );

};



MBT.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	MBT.bookmarks = [];

	if ( str === "" ) {

		bookmarks = BOP.bookmarks;

	} else {

			bookmarks = BOP.bookmarks.filter( bookmark => {

				const tagsString = bookmark.tags.join();

				return tagsString.includes( str );

			} );

	}

	MBT.setMenuItemsByTag( bookmarks );

	BOP.setBookmarks( bookmarks );

};