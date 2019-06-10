/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const BTG = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-08",
	"description": "Display bookmarks by tags",
	"version": "0.5.0-0",

};


BTG.getMenuBookmarksTag = function() {

	const htm =
	`
	<details id=BTGdet ontoggle=BTG.setMenuItemsByTag() >

		<summary>Bookmarks by tag ~ BTG V ${ BTG.version }</summary>

		<p>${ BTG.description }</p>

		<p>
			Search: <input type=search name="q" oninput=BTG.filterBookmarks(this) ;>
		</p>

		<div id=BTGdivBookmarksDomain ></div>

		<hr>
	</details>

	`;

	return htm;

}


BTG.setMenuItemsByTag = function( bookmarks = BM.jsonLines ){
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	let tags = [];

	for ( let bookmark of bookmarks ) {

		if ( ! bookmark.url && !bookmark.tags ) { continue; }

		tags.push( ...bookmark.tags );

		/*
		a.href = bookmark.url;
		let tag = a.hostname;

		const subdomain = subdomains.filter( bit => tag.startsWith( bit ) === true );
		//console.log( 'subdomain', subdomain );

		tag = tag.replace ( subdomain, "" );
		//console.log( 'tag', tag );

		let item = tags.find( item => item === tag );
		//console.log( 'item', item );

		if ( !item ) { tags.push( tag ); }
		*/

	}

	tags = [ ...new Set( tags ) ].sort();
	//console.log( 'tags', tags );


	let tagHtm = `${ tags.length } tags`;

	for ( let tag of tags ) {
		//console.log( 'tag', tag );

		const marks = bookmarks.filter( bookmark => bookmark.url && bookmark.tags && bookmark.tags.includes( tag ) );
		//console.log( 'marks', marks );

		let markHtm = "";

		for ( let mark of marks) {

			const index = bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=BM.parseJson("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
				<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
			</div>
			`;

		}

		if ( marks.length ) {

			tagHtm +=
			`
				<details>
					<summary>${ tag } - ${ marks.length }</summary>

					${ markHtm }

				</details>

			`;
		}



	}

	BTGdivBookmarksDomain.innerHTML = tagHtm;

};



BTG.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	BTG.bookmarks = [];

	if ( str === "" ) {

		for ( let line of BM.jsonLines ) {
			//console.log( 'line', line );

			//if ( line.slice( 0, 1 ) !== "{" ) { continue; }

			//const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl );

			if ( line.type === "url" ) { BTG.bookmarks.push( line ); }

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

				if ( tag.includes( str ) ) { BTG.bookmarks.push( line ); }

			}

		}

	}

	BTG.setMenuItemsByUrl( BTG.bookmarks );

}