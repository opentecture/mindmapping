/* global FOB, TAG, BLBF, crypto */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BM = {

	"copyright": "Copyright 2019 poentecture authors. MIT License",
	"date": "2019-06-22",
	"description": "Display data of bookmark selected from left menu or drag & drop a link into this box",
	"version": "0.0.0-0",

};


BM.getBookmarks = function () {
	//console.log( '', FOB.text );


	BM.lines = FOB.text.split(/\r\n|\n/);

	BM.jsonLines = [];

	for ( let line of BM.lines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		BM.jsonLines.push( jsonl );

	}


	const comments = BM.lines.filter( line => line.includes( `"type":"comment"` ) );
	//console.log( 'comments', comments );

	BM.comments = comments.map( comment => JSON.parse( comment ) ) || "";

	//BM.setBookmarks();

	BBF.setMenuItemsByUrl();

};


BM.setBookmarks = function ( bookmarks = BM.jsonLines ) {

	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	htm = "";

	for ( let bookmark of bookmarks ) {

		if ( bookmark.type === "url" ) {

			a.href = bookmark.url;
			let site = a.hostname;

			const subdomain = subdomains.filter( bit => site.startsWith( bit ) === true );
			//console.log( 'subdomain', subdomain );

			site = site.replace ( subdomain, "" );
			//console.log( 'site', site );

			const comment = BM.comments.find( comment => comment.bookmarkId === bookmark.id ) || "";
			//console.log( 'comment', comment );

			htm +=
			`<p>
				 <a href=${bookmark.url } >
					 <img src=${ bookmark.favicon } height=16px >
					<b>${ bookmark.name }</b> - <i>${ site }</i>
				</a><br>
				tags: <i>${ bookmark.tags }</i> - added: ${ bookmark.dateAdd.slice( 0, 10 ) }<br>
				${ bookmark.description.startsWith ("No description" ) ? "" : bookmark.description }
				<p style=color:blue >${ comment.text || "" }</p>
			</p>`;

		}

	}

	divContents.innerHTML = htm;

};