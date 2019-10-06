"use strict";

/* global BM, BDMdet, MTBdivBookmarksByTag */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const MBT = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-09-29",
	"description": "Display bookmarks by tags",
	"version": "0.05.06-0mtb",

};



MBT.getMenuBookmarksTag = function() {

	const htm =
	`
	<details id=MBTdet ontoggle=MBT.filterTags(inpTags); >

		<summary>Bookmarks by tag (MBT)</summary>

		<p>${ MBT.description }</p>

		<p>
			Search: <input id=inpTags type=search name="q" oninput=MBT.filterTags(this) ;>
		</p>

		<p id=MTBpStats ></p>

		<div id=MTBdivBookmarksByTag class=divMenuList ></div>

		<hr>

	</details>
	`;

	return htm;

};


MBT.filterTags = function ( input ) {

	const str = input.value.toLowerCase() || "";

	MBT.filtered = BOP.getBookmarksFilterByTagsToIgnore( BOP.bookmarks );

	MBT.tagsUnique = MBT.getTagsUnique( MBT.filtered );

	MBT.tagsFiltered = MBT.tagsUnique.filter( tag => tag.includes( str ) );
	//console.log( 'MBT.tagsFiltered', MBT.tagsFiltered );

	MBT.setMenuItemsByTag();

};



MBT.setMenuItemsByTag = function(){

	if ( MBTdet.open === false ) return;

	MBT.bookmarksSelected = [];
	let indexSelected = 0;

	let tagHtm = "";
	let count = 0;

	for ( let tag of MBT.tagsFiltered ) {
		//console.log( 'tag', tag );

		const marks = MBT.filtered.filter( bookmark => bookmark.url && bookmark.type === "url" && bookmark.tags && bookmark.tags.includes( tag ) );
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

		count += marks.length;

		if ( marks.length ) {

			tagHtm +=
			`
				<details ontoggle=MBT.filter(${ indexSelected }) >
					<summary>${ tag } - ${ marks.length }x</summary>

					${ markHtm }

				</details>
			`;
		}

		indexSelected ++;

	}

	MTBpStats.innerHTML = `${ MBT.tagsFiltered.length } unique tags for ${ count } total tags`;

	MTBdivBookmarksByTag.innerHTML = tagHtm;

};


MBT.getTagsUnique = function ( bookmarks ) {

	const tagsEvery = bookmarks.flatMap( bookmark => bookmark.tags );
	//console.log( 'tagsEvery', tagsEvery );

	const tagsUnique = [ ...new Set( tagsEvery ) ].sort();
	//console.log( 'tagsUnique', tagsUnique );

	return tagsUnique;

};


MBT.filter = function ( index ) {

	BOP.setBookmarks( MBT.bookmarksSelected[ index ] );

};
