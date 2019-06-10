/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const SCR = {
	"copyright": "Copyright 2019 Ladybug Tools authors. MIT License",
	"date": "2019-06-09",
	"description": "template",
	"helpFile": "tmp-template/README.md",
	"release": "0.0.0-0",
};

SCR.a = document.createElement( 'a' );

SCR.urlCORS = 'https://cors-anywhere.herokuapp.com/';

SCR.getMenuScrape = function() {

	const htm =
		`
			<details id=SCRdet ontoggle="SCRdivTmp1.innerHTML=SCR.getScrape();" >

				<summary id=SCRsumSurfaces >Scrape
					<button id=butScrape class=butHelp onclick="MNU.setPopupShowHide(butScrape,SCR.helpFile);" style=float:right; >?</button>
				</summary>

				<div id=SCRdivTmp1 ></div>

			</details>

		`;

	return htm;

};



SCR.getScrape = function() {

	const timeStart = performance.now();

	const htm =
	`
		<p><i>Scrape</i></p>

		<button onclick=SCR.showContent(); >show content</button>

		<button onclick=SCR.saveFile(); >Save File</button>

		<p>Time to check: ${ ( performance.now() - timeStart ).toLocaleString() } ms</p>

		<hr>

	`;

	return htm;

};



SCR.onLoad = function() {

	SCR.bookmarks = [];

	SCR.lines = FOB.text.split(/\r\n|\n/);

	for ( let line of SCR.lines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }
		//if ( !line.includes( `"type": "url"`) ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		SCR.bookmarks.push( jsonl );

	}
	console.log( 'SCR.bookmarks', SCR.bookmarks.length );

	SCRdet.open = true;

	SCR.count = 0;
	SCR.fetchText();
};



SCR.fetchText = function(){

	const bookmark = SCR.bookmarks[ SCR.count ];
	//console.log( 'bm', bookmark );

	if ( bookmark.type !== "url" ) {

		SCR.count ++;
		SCR.fetchText();

		return;

	}

	const request = new Request( SCR.urlCORS + bookmark.url );

	fetch( request )

		.then( response => {

			if ( !response.ok ) {

				bookmark.tags.push( "404error" );
				//console.log( 'response', bookmark );
				//console.log( 'response error', bookmark.url );

				SCR.count ++;
				SCR.fetchText();

				return new Error( response );

			}
			return response.text();

		} )
		.then( text => SCR.parseText( text, bookmark ) )

		.catch( function( err ) {

			bookmark.tags.push( "redirect-error" );
			//console.log( "catch error", err );
			//console.log( 'response', bookmark );
			//console.log( 'catch', bookmark.url );

			SCR.count ++;
			SCR.fetchText();

		});

}



SCR.parseText = function( text, bookmark ) {
	//console.log( 'url', bookmark.url );

	if ( !text ) { console.log( '', 33 ); }
	const parser = new DOMParser();

	const doc = parser.parseFromString( text, "text/html" );
	//console.log( 'doc', doc );

	const descriptionMeta = doc ? doc.head.querySelector( '[name=description]' ) : "" ;
	bookmark.description = descriptionMeta ? descriptionMeta.content : "No description element found in HTML file";

	let iconLink = doc ? doc.head.querySelector( '[rel=icon]' ) : "";

	SCR.a.href = bookmark.url;
	const site = SCR.a.hostname;
	let iconHref = "https://www.google.com/s2/favicons?domain=" + site;

	if ( iconLink && iconLink.href.toLowerCase().startsWith( "http" ) ) {

		iconHref = iconLink.href;

	}

	console.log( SCR.count, 'iconHref', iconHref );
	bookmark.favicon = iconHref;

	htm =
	`
		<h3>
			<img src="${ iconHref }" height=24 > ${ SCR.count }
			<a href=${ bookmark.url } >${ bookmark.url.replace( /http(.*):\/\//i, "" ) }: ${ doc.title }</a>
		</h3>

		<p>Description:<br>${ bookmark.description }</p>
	`;

	divContents.innerHTML += htm;

	//console.log( 'target', target );

	SCR.count ++;

	if ( SCR.count < SCR.bookmarks.length ) {

		SCR.fetchText();
		
	}

};



SCR.showContent = function() {

	lines = SCR.bookmarks.map( json => JSON.stringify( json, null, ' ' ).replace( /\n/g, "" ) );

	divContents.innerText = lines.join( "\n" );

};



SCR.saveFile = function() {

	let blob = new Blob( [ divContents.innerText ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = 'bookmarks.json';
	a.click();
	a = null;

}

document.body.addEventListener( 'FOBonJsonFileLoad', SCR.onLoad, false );
