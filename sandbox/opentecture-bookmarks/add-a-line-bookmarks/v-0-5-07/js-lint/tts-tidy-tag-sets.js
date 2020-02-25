"use strict";

/* global BM, BDMdet, MTBdivBookmarksByTag */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const TTS = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-09-29",
	"description": "Find tags in bookmarks not in tag sets. Work-in-progress.",
	"version": "0.05.06-0mtb",

};



TTS.getMenuTags = function() {

	const htm =
	`
	<details id=TTSdet ontoggle=TTS.filterTags(inpTags); >

		<summary>Tidy tags</summary>

		<p>${ TTS.description }</p>

		<p id=TTSpStats ></p>

		<div id=TTSdivTags ></div>

		<hr>

	</details>
	`;

	return htm;

};


TTS.zzzsetMenuItemsByTag = function(){

	if ( TTSdet.open === false ) return;

	TTS.bookmarksSelected = [];
	let indexSelected = 0;


	let tagHtm = "";
	let count = 0;

	for ( let tag of TTS.tagsFiltered ) {
		//console.log( 'tag', tag );

		const marks = TTS.filtered.filter( bookmark => bookmark.url && bookmark.type === "url" && bookmark.tags && bookmark.tags.includes( tag ) );
		//console.log( 'marks', marks );

		TTS.bookmarksSelected.push( marks || [] );

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
				<details ontoggle=TTS.filter(${ indexSelected }) >
					<summary>${ tag } - ${ marks.length }x</summary>

					${ markHtm }

				</details>
			`;
		}

		indexSelected ++;

	}

	MTBpStats.innerHTML = `${ TTS.tagsFiltered.length } unique tags for ${count } bookmarks`;

	MTBdivBookmarksByTag.innerHTML = tagHtm;

};





TTS.filter = function ( index ) {

	BOP.setBookmarks( TTS.bookmarksSelected[ index ] );

};



TTS.filterTags = function ( input ) {

	const str = input.value.toLowerCase() || "";

	TTS.bookmarksFiltered = BOP.getBookmarksFilterByTagsToIgnore( BOP.bookmarks );

	TTS.bookmarkTagsUnique = TTS.getBookmarkTagsUnique( TTS.bookmarksFiltered );

	//console.log( 'TTS.bookmarkTagsUnique', TTS.bookmarkTagsUnique );

	TTS.tagSetsUnique = TTS.getTagSetsUnique();

	TTS.tagDiffs = TTS.bookmarkTagsUnique.filter( tag => !TTS.tagSetsUnique.includes( tag ) );
	//console.log( 'diffs', TTS.tagDiffs );

	TTSdivTags.innerHTML = TTS.tagDiffs.sort();

	//TTS.setMenuItemsByTag();

};

TTS.getBookmarkTagsUnique = function ( bookmarks ) {

	const tagsEvery = bookmarks.flatMap( bookmark => bookmark.tags );
	//console.log( 'tagsEvery', tagsEvery );

	const tagsUnique = [ ...new Set( tagsEvery ) ].sort();
	//console.log( 'tagsUnique', tagsUnique );

	return tagsUnique;

};


TTS.getTagSetsUnique = function () {

	const tagsEvery = BOP.tagSets.flatMap( bookmark => bookmark.tags );
	//console.log( 'tagsEvery', tagsEvery );

	const tagSetsUnique = [ ...new Set( tagsEvery ) ].sort();
	//console.log( 'tagsUnique', tagsUnique );

	return tagSetsUnique;

};
