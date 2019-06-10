// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const BLBF = { "release": "1.o", "date": "2019-03-31" };


BLBF.description =
	`
		Display bookmarks by finding a host
	`;


function filterBookmarks( input ) {

	const str = input.value;
	//console.log( 'str', str );

	BLBF.bookmarks = [];

	if ( str === "" ) {

		for ( let line of FM.jsonLines ) {
			//console.log( 'line', line );

			if ( line.slice( 0, 1 ) !== "{" ) { continue; }

			const jsonl = JSON.parse( line );
			//console.log( 'jsonl', jsonl );

			if ( jsonl.type === "url" ) { BLBF.bookmarks.push( jsonl ); }

		}

	} else {

		for ( let line of FM.jsonLines ) {

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

	setMenuItemsByUrl( BLBF.bookmarks );

}



function setMenuItemsByUrl( bookmarks ){
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

	let sites = [];
	let a = document.createElement( 'a' );

	for ( let bookmark of bookmarks ) {

		a.href = bookmark.url;
		site = a.hostname;

		let item = sites.find( item => item === site );
		//console.log( 'item', item );

		if ( !item && site) { sites.push( site ); }

	}

	sites = sites.sort();
	//console.log( 'sites', sites );

	if ( menuItems.innerText.includes( "Search" ) === false ) {

		inputHtm =
		`
			<p>
				${ BLBF.description }
			</p>
			<p>
				Search: <input oninput=filterBookmarks(this) ;>
			</p>

			<div id=divResults ></div>
		`;

		menuItems.innerHTML = inputHtm;

	}

	let siteHtm = ``;

	for ( let site of sites ) {
		//console.log( 'site', site );

		marks = bookmarks.filter( bookmark => bookmark.url && bookmark.url.includes( site ) );
		//console.log( 'marks', marks );

		let markHtm = "";

		for ( mark of marks) {

			const index = bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=openInIframe("${ index }"); title="View bookmark URL in an Iframe"  >${ mark.name }</button>
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

}

