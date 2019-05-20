/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const BLBF = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-05-18",
	"description": "Display bookmarks by finding a host",
	"version": "0.4.0-1",

};


BLBF.setMenuItemsByUrl = function( bookmarks = CM.bookmarks ){
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

	let sites = [];
	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	for ( let bookmark of bookmarks ) {

		a.href = bookmark.url;
		let site = a.hostname;

		const subdomain = subdomains.filter( bit => site.startsWith( bit ) === true );
		//console.log( 'subdomain', subdomain );

		site = site.replace ( subdomain, "" );
		//console.log( 'site', site );

		let item = sites.find( item => item === site );
		//console.log( 'item', item );

		if ( !item ) { sites.push( site ); }

	}

	sites = sites.sort();
	//console.log( 'sites', sites );

	if ( menuItems.innerText.includes( "Search" ) === false ) {

		const inputHtm =
		`
			<p>
				${ BLBF.description }
			</p>

			<p>
				Search: <input type=search name="q" oninput=BLBF.filterBookmarks(this) ;>
			</p>

			<div id=divResults ></div>
		`;

		menuItems.innerHTML = inputHtm;

	}

	let siteHtm = `${ bookmarks.length } links`;

	for ( let site of sites ) {
		//console.log( 'site', site );

		const marks = bookmarks.filter( bookmark => bookmark.url && bookmark.url.includes( site ) );
		//console.log( 'marks', marks );

		let markHtm = "";

		for ( let mark of marks) {

			const index = bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=CM.parseJson("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
				<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
			</div>
			`;

		}

		siteHtm +=
		`
			<details>

				<summary>${ site } - ${ marks.length }</summary>

				${ markHtm }

			</details>
		`;


	}

	divResults.innerHTML = siteHtm;

};



BLBF.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );

	BLBF.bookmarks = [];

	if ( str === "" ) {

		for ( let line of CM.jsonLines ) {
			//console.log( 'line', line );

			if ( line.slice( 0, 1 ) !== "{" ) { continue; }

			const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl );

			if ( jsonl.type === "url" ) { BLBF.bookmarks.push( jsonl ); }

		}

	} else {

		for ( let line of CM.jsonLines ) {

			if ( line.slice( 0, 1 ) !== "{" ) { continue; }
			//console.log( 'line', line );

			const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl.url );

			if ( jsonl.url ) {

				const a = document.createElement( 'a' );
				a.href = jsonl.url;
				const site = a.hostname;
				//console.log( 'site', site );

				if ( site.includes( str ) ) { BLBF.bookmarks.push( jsonl ); }

			}

		}

	}

	BLBF.setMenuItemsByUrl( BLBF.bookmarks );

}


window.addEventListener( "onBookmarksParsed", BLBF.setMenuItemsByUrl, false );