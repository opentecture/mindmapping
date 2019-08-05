/* global BM, BDMdet, MTBdivBookmarksByTag */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const MTB = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-08-04",
	"description": "Display bookmarks by tags",
	"version": "0.5.04-0mtb",

};


MTB.getMenuBookmarksTag = function() {

	const htm =
	`
	<details id=MTBdet ontoggle=MTB.setMenuItemsByTag(); >

		<summary>Filter bookmarks by tag ~ v${ MTB.version }</summary>

		<p>${ MTB.description }</p>
<!--
		<p>
			Search: <input type=search name="q" oninput=MTB.filterBookmarks(this) ;>
		</p>
-->
		<div id=MTBdivBookmarksByTag ></div>

		<hr>

	</details>
	`;

	return htm;

};



MTB.setMenuItemsByTag = function( bookmarks = BOP.bookmarks ){
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

	//MTBdet.open = false;

	const tagsToIgnore = inpTagsIgnore.value.split( "," );

	const filtered = bookmarks.filter( ( bookmark, index, arr ) => {

		let  remove = false;

		for ( tag of tagsToIgnore ) {

			if ( bookmark.tags.includes( tag ) ) {

				remove = true;
				break;

			}

		}

		return remove === false;

	} );

	bookmarks = filtered;

	let tags = [];


	for ( let bookmark of bookmarks ) {

		if ( !bookmark.url && !bookmark.tags ) { continue; }

		tags.push( ...bookmark.tags );

	}
	tags = [ ...new Set( tags ) ].sort();
	//console.log( 'tags', tags );

	MTB.bookmarksSelected = [];
	let indexSelected = 0;

	let tagHtm = `${ tags.length } tags = ${ bookmarks.length } bookmarks`;

	for ( let tag of tags ) {
		//console.log( 'tag', tag );

		const marks = bookmarks.filter( bookmark => bookmark.url && bookmark.type === "url" && bookmark.tags && bookmark.tags.includes( tag ) );
		//console.log( 'marks', marks );
		MTB.bookmarksSelected.push( marks || [] );

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
				<details ontoggle=MTB.filter(${ indexSelected })>
					<summary>${ tag } - ${ marks.length }</summary>

					${ markHtm }

				</details>

			`;
		}

		indexSelected ++;

	}

	MTBdivBookmarksByTag.innerHTML = tagHtm;

	//BM.setBookmarks( bookmarks );

};



MTB.filter = function ( index ) {

	BOP.setBookmarks( MTB.bookmarksSelected[ index ] );

};



MTB.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	MTB.bookmarks = [];

	if ( str === "" ) {

		for ( let line of BM.jsonLines ) {
			//console.log( 'line', line );

			//if ( line.slice( 0, 1 ) !== "{" ) { continue; }

			//const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl );

			if ( line.type === "url" ) { MTB.bookmarks.push( line ); }

		}

	} else {

		for ( let line of BM.jsonLines ) {

			//if ( line.slice( 0, 1 ) !== "{" ) { continue; }
			//console.log( 'line', line );

			//const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl.url );

			if ( line.url ) {

				a.href = jsonl.url;
				const tag = a.hostname;
				//console.log( 'tag', tag );

				if ( tag.includes( str ) ) { MTB.bookmarks.push( line ); }

			}

		}

	}

	MTB.setMenuItemsByUrl( MTB.bookmarks );

	BM.setBookmarks( MTB.bookmarksSelected || bookmarks );

};