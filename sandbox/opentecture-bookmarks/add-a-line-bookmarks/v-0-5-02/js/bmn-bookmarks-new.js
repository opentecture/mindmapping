/* global BM, BMNdivDrop, BMinpUrl */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BMN = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-07-06",
	"description": "Clear input fields and set screen up to add a new bookmark",
	"version": "0.5.02-2bmn",

};

BMN.a = document.createElement( 'a' );

BMN.urlCORS = 'https://cors-anywhere.herokuapp.com/';


BMN.getMenuBookmarkNew = function() {

	const htm =
	`
		<details ontoggle=BMN.onToggle(); >

			<summary>Bookmark new ~ BMN v${ BMN.version } ~ ${ BMN.date }</summary>

			<p>${ BMN.description }</p>

			<p>
				<button onclick=BMN.setBookmarkNew(); >Add new bookmark</button>

				<button onclick=BMN.fetchText(); >scrape site for metadata</button>
			</p>

		</details>

	`;

	return htm;

};


BMN.onToggle = function() {

};



BMN.onInput = function() {

	const htm = BMNdivDrop.innerHTML;
	//console.log( 'htm', htm );

	//if ( !htm ) { return; }

	BMN.url = url = htm.match( /href="(.*?)"/i )[ 1 ];
	//console.log( 'url', url );

	const name = htm.match ( />(.*?)<\/a>/i)[ 1 ];

	BMinpUrl.value = url;
	BMinpName.value = name;

	BMinpId.value = BMinpId.value ? BMinpId.value : BM.uuidv4();
	BMinpDateAdd.value = BMinpDateAdd.value ? BMinpDateAdd.value : new Date().toISOString();
	BMinpDateUpdate.value = BMinpDateAdd.value;

	BMinpType.value = "url";
	BMinpImages.value = [];
	BMinpFavicon.value = `https://www.google.com/s2/favicons?domain=${ url }`;
	BMinpTags.value = [];
	BMtxtDescription.value = "";
	BMtxtComment.value = "";

	BMdivUrl.innerHTML = "url ❐".link( url );

	//ifr.src = url;

};



BMN.setBookmarkNew = function() {

	BMNdivDrop.innerHTML = "";

	BMinpUrl.value = "";
	BMinpUrl.placeholder = "https://example.com";

	BMinpName.value = "";
	BMinpName.placeholder = "name of example";

	BMinpDateAdd.value = new Date().toISOString();
	BMinpDateUpdate.value = BMinpDateAdd.value;
	BMinpId.value = BM.uuidv4();
	BMinpType.value = "url";
	BMinpImages.value = [];
	BMinpFavicon.value = "";
	BMinpTags.value = [];

	BMtxtDescription.value = "";
	BMtxtDescription.placeholder = "Example.com is a good site for testing things";
	BMtxtComment.value = "";

	BMdivUrl.innerHTML = "url";

};



BMN.fetchText = function(){

	const request = new Request( BMN.urlCORS + BMinpUrl.value );

	fetch( request )

	.then( response => {

		if ( !response.ok ) {

			BMinpTags.value += "404error";
			//console.log( 'response', bookmark );
			//console.log( 'response error', bookmark.url );

			return new Error( response );

		}
		return response.text();

	} )

	.then( text => BMN.parseText( text, BMinpUrl.value ) )

	.catch( function( err ) {

		BMinpTags.value += BMinpTags.value ? ",redirect-error" : "redirect-error,";
		//console.log( "catch error", err );
		//console.log( 'response', bookmark );
		//console.log( 'catch', bookmark.url );

	} );

};



BMN.parseText = function( text, url ) {
	//console.log( 'url', bookmark.url );

	if ( !text ) { console.log( 'no text', url ); }

	const parser = new DOMParser();

	const doc = parser.parseFromString( text, "text/html" );
	//console.log( 'doc', doc );

	const descriptionMeta = doc ? doc.head.querySelector( '[name=description]' ) : "" ;
	console.log( 'descriptionMeta', descriptionMeta, descriptionMeta.content );

	BMtxtDescription.value = descriptionMeta ? descriptionMeta.content : "No description element found in HTML file";

	let iconLink = doc ? doc.head.querySelector( '[rel=icon]' ) : "";
	console.log( 'iconLink', iconLink );

	BMN.a.href = url;
	const site = BMN.a.hostname;
	let iconHref = "https://www.google.com/s2/favicons?domain=" + site;

	if ( iconLink && iconLink.href.toLowerCase().startsWith( "http" ) ) {

		iconHref = iconLink.href;

	}


	BMinpFavicon.value= iconHref;

};