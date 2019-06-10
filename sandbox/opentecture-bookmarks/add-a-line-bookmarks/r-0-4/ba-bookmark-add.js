/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const BA = {

	"copyright": " Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-04-20",
	"release": "0.4.0"


};

BA.testData = [

	"<a href='https://google.com' >Google</a>",
	"<a href='https://en.wikipedia.org/wiki/Main_Page' >Wikipedia</a>",
	"<a href='https://dfabhouse.ch/' >dfabhouse</a>"

];



BA.onInput = function( id ){

	const htm = divDrop.innerHTML;
	//console.log( 'htm', htm );

	if ( !htm ) { return; }

	const url = htm.match( /href="(.*?)"/i )[ 1 ];
	//console.log( '', url );

	const name = htm.match ( />(.*?)<\/a>/i)[ 1 ];

	aUrl.href = url;
	aUrl.innerHTML = url;
	inpUrl.value = url;
	inpName.value = name;

	inpId.value = inpId.value ? inpId.value : BA.uuidv4(); //CM.bookmarks.length + 1;

	inpDateAdd.value = inpDateAdd.value ? inpDateAdd.value : new Date().toISOString();

	inpDateUpdate.value = new Date().toISOString();

	inpType.value = "url";

	ifr.src = url;

};



BA.addTest = function( index ) {

	divDrop.innerHTML = BA.testData[ index ];

};



BA.uuidv4 = function() {

	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);

};


BA.addTag = function( input ){

	inpTags.value += `"${ input.value }" `;

};



BA.bookmarkAddUpdateTextarea = function() {

	const tags = `["${ inpTags.value.slice( 0, -1 ).replace( /,/g, '","') }"]`;
	const txt =
`{
	"url": "${ inpUrl.value }",
	"name": "${ inpName.value }",
	"dateAdd": "${ inpDateAdd.value }",
	"dateUpdate": "${ inpDateUpdate.value }",
	"id": "${ inpId.value }",
	"type": "${ inpType.value }",
	"images": [ ${ inpImages.value } ],
	"tags": ${ tags },
	"source": "${ selSource.value.toLowerCase() }",
	"description": "${ txtDescription.value }",
	"status": "${ selStatus.value }"
}`;

	BAtxtBookmark.value = txt;

};



BA.bookmarkAdd = function( ) {

	const index = CM.jsonLines.findIndex( line => line.includes( `\"id":\"${ inpId.value }\"` ) );
	console.log( 'index', index );

	const json = JSON.parse( BAtxtBookmark.value );
	const line = JSON.stringify( json );
	console.log( 'CM.jsonLines', line );

	if ( index >= 0 ) {

		CM.jsonLines[ index ] = line;

	} else if ( json.url !== "" ) {

		CM.jsonLines.push( line );

	} else {

		BAtxtBookmark.value = 'Please add a URL';

		return;

	}

	for ( let line of CM.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			CM.bookmarks.push( jsonl );

		}

	}

	console.log( 'CM.bookmarks[ CM.bookmarks.length - 1 ] ', CM.bookmarks[ CM.bookmarks.length - 1 ]  );

	inpType.value = "url";

};



BA.getDescription = function() {

	const urlCORS = 'https://cors-anywhere.herokuapp.com/';

	const url = urlCORS + inpUrl.value;

	xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = BA.parseHtmlGetDescription;
	xhr.send( null );

};



BA.parseHtmlGetDescription = function( xhr ) {

	CM.source = xhr.target.response;
	//console.log( 'CM.source', CM.source );

	let description = CM.source.match( /name="description" content="(.*?)"/i );

	description = description ? description[ 1 ] : "";
	console.log( 'description', description );

	const txt = txtDescription.value.match( /"description": "(.*?)"/i );
	console.log( 'txt', txt );

	if ( null === txt || txt[ 1 ].length === 0 ) {

		txtDescription.value = description; // txtDescription.value.replace( /\t]/, `],"description":"${ description }"` );

	} else {

		console.log( 'description exists', txt, description );

	}

};