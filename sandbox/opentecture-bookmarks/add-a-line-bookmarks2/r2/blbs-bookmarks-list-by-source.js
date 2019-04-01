// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const BLBS = { "release": "1.0", "date": "2019-03-31" };

BLBS.description =
	`
	Display bookmarks by source
	`;


BLBS.setMenuHeaders= function(){

	let menuHeaders = [];

	for ( let bookmark of FM.bookmarks ) {

		const header = bookmark.tags[ 0 ];

		const item = menuHeaders.find( item => item === header );

		if ( !item ) {menuHeaders.push( header ); }

	}
	//console.log( 'menuHeaders', menuHeaders );

	menuHeaders = menuHeaders.sort();

	let htm = `<p>${ BLBS.description }</p>`;

	for ( let menuHeader of menuHeaders ) {

		let description = FM.descriptions.find( it => it.tag === menuHeader );

		description = description ? description.content : "";

		const subHeaders = BLBS.getSubHeaders( menuHeader );

		let marks = FM.bookmarks.filter( bookmark => bookmark.tags.length === 1 && bookmark.tags[ 0 ] === menuHeader  );
		//console.log( 'marks', marks );

		let markHtm = ""

		for ( mark of marks ) {

			const index = FM.bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=openInIframe("${ index }"); title="View bookmark URL in an Iframe"  >${ mark.name }</button>
			</div>
			`;

		}

		htm +=
		`
			<details>

				<summary>${ menuHeader }</summary>

				<p>${ description }</p>

				<div id=menuItem${ menuHeader } >${ subHeaders }</div>

				${ markHtm }

			</details>
		`;

	}

	menuItems.innerHTML = htm;

}



// make recursive so can handle any number of levels
BLBS.getSubHeaders = function( header ) {
	//console.log( 'header', header );

	let subHeaders = [];

	for ( let bookmark of FM.bookmarks ) {

		if ( bookmark.tags[ 0 ] === header ) {

			if ( bookmark.tags[ 1 ] ) {
				//console.log( '', bookmark.tags[ 1 ] );

				const subHeader = subHeaders.find( item => item === bookmark.tags[ 1 ] );
				//console.log( 'subHeaders', subHeaders );

				if ( !subHeader ) { subHeaders.push( bookmark.tags[ 1 ] ); }

			} else {

			}

		}

	}

	subHeaders = subHeaders.sort();
	//console.log( 'subHeaders', subHeaders );

	htm = "";

	for ( subHeader of subHeaders ) {

		let marks = FM.bookmarks.filter( bookmark => bookmark.tags[ 0 ] + bookmark.tags[ 1 ] ===  header + subHeader  );
		//console.log( 'marks', marks,  FM.bookmarks[ 0 ].tags[ 0 ] + FM.bookmarks[ 0 ].tags[ 1 ] , [ header, subHeader ]  );

		marks = marks.sort();

		let markHtm = ""

		for ( mark of marks ) {

			const index = FM.bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=openInIframe("${ index }"); title="View bookmark URL in an Iframe"  >${ mark.name }</button>
			</div>
			`;

		}


		htm +=
		`
			<h4 style=margin-bottom:0; >${ subHeader }</h4>
			${ markHtm}
			<hr>
		`;
	}

	return htm;

};
