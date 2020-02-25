/* global BM, BMNdivDrop, BEDinpUrl */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BMN = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-08-10",
	"description": "Clear input fields and set screen up to add a new bookmark",
	"version": "0.5.05-0bmn",

};

BMN.a = document.createElement( 'a' );

BMN.urlCORS = 'https://cors-anywhere.herokuapp.com/';


BMN.getMenuBookmarkNew = function() {

	const htm =
	`
		<details ontoggle=BMN.onToggle(); >

			<summary>Bookmark new (BMN)</summary>

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

	//BMNdivDrop.addEventListener( "input", BMN.onInput, false);

	mainContents.innerHTML = BED.getBookmarksData();

	BEDdivDrop.addEventListener( "input", BMN.onInput, false);
};



BMN.onInput = function() {

	const htm = BEDdivDrop.innerHTML;
	//console.log( 'htm', htm );

	BMN.url = url = htm.match( /href="(.*?)"/i )[ 1 ];
	//console.log( 'url', url );

	const name = htm.match ( />(.*?)<\/a>/i)[ 1 ];

	BEDinpUrl.value = url;
	BEDinpName.value = name;

	BEDinpId.value = BEDinpId.value ? BEDinpId.value : BMN.uuidv4();
	BEDinpDateAdd.value = BEDinpDateAdd.value ? BEDinpDateAdd.value : new Date().toISOString();
	BEDinpDateUpdate.value = BEDinpDateAdd.value;

	BEDinpType.value = "url";
	BEDinpImages.value = [];
	BEDinpFavicon.value = `https://www.google.com/s2/favicons?domain=${ url }`;
	BEDinpTags.value = [];
	BEDtxtDescription.value = "";
	BEDtxtDescription.placeholder = "";
	BEDtxtComment.value = "";

	BEDdivUrl.innerHTML = "url ❐".link( url );

};



BMN.setBookmarkNew = function() {

	BEDdivDrop.innerHTML = "";

	BEDinpUrl.value = "";
	BEDinpUrl.placeholder = "https://example.com";

	BEDinpName.value = "";
	BEDinpName.placeholder = "name of example";

	BEDinpDateAdd.value = new Date().toISOString();
	BEDinpDateUpdate.value = BEDinpDateAdd.value;
	BEDinpId.value = BMN.uuidv4();
	BEDinpType.value = "url";
	BEDinpImages.value = [];
	BEDinpFavicon.value = "";
	BEDinpTags.value = [];

	BEDtxtDescription.value = "";
	BEDtxtDescription.placeholder = "Example.com is a good site for testing things";
	BEDtxtComment.value = "";

	BEDdivUrl.innerHTML = "url";

};



BMN.fetchText = function(){

	const request = new Request( BMN.urlCORS + BEDinpUrl.value );

	fetch( request )

	.then( response => {

		if ( !response.ok ) {

			BEDinpTags.value += "404error";
			//console.log( 'response', bookmark );
			//console.log( 'response error', bookmark.url );

			return new Error( response );

		}
		return response.text();

	} )

	.then( text => BMN.parseText( text, BEDinpUrl.value ) )

	.catch( function( err ) {

		BEDinpTags.value += BEDinpTags.value ? ",redirect-error" : "redirect-error,";
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

	BEDtxtDescription.value = descriptionMeta ? descriptionMeta.content : "No description element found in HTML file";

	let iconLink = doc ? doc.head.querySelector( '[rel=icon]' ) : "";
	console.log( 'iconLink', iconLink );

	BMN.a.href = url;
	const site = BMN.a.hostname;
	let iconHref = "https://www.google.com/s2/favicons?domain=" + site;

	if ( iconLink && iconLink.href.toLowerCase().startsWith( "http" ) ) {

		iconHref = iconLink.href;

	}


	BEDinpFavicon.value= iconHref;

};



BMN.uuidv4 = function() {

	return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
		( c ^ crypto.getRandomValues( new Uint8Array( 1 )  )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);

};
