
// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BA = { "release": "1.0", "date": "2019-03-30" };



BA.bookmarkAddInit = function( id ){

	divContents.innerHTML = tmpNewBookmark.innerHTML;

	inpId.value = AB.bookmarks.length + 1;

	inpDateAdded.value = new Date().toISOString();

	inpType.value = "url";

};



BA.bookmarkAddUpdateTextarea = function() {

	const txt =
`{
	"name": "${ inpName.value }",
	"url": "${ inpUrl.value }",
	"dateAdded": "${ inpDateAdded.value }",
	"id": "${ inpId.value }",
	"type": "${ inpType.value }",
	"images": "${ inpImages.value }",
	"tags": "${ inpTags.value }",
	"source": "${ selSource.value }",
	"description": "${ txtDescription.value }",
	"iframeCompatible": "${ inpIframeOk.checked }"
}`;

	BAtxtBookmark.value = txt;

};



BA.bookmarkAdd = function( id ) {

	const index = AB.jsonLines.findIndex( line => line.includes( `\"id":\"${ id }\"` ) )
	console.log( 'index', index );

	json = JSON.parse( BAtxtBookmark.value );
	line = JSON.stringify( json );
	console.log( 'AB.jsonLines', line );

	if ( index >= 0 ) {

		AB.jsonLines[ index ] = line;

	} else if ( json.url !== "" ) {

		AB.jsonLines.push( line );

	} else {

		BAtxtBookmark.value = 'Please add a URL';

		return;

	}


	for ( let line of AB.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			AB.bookmarks.push( jsonl );

		}

	}

	console.log( 'AB.bookmarks[ AB.bookmarks.length - 1 ] ', AB.bookmarks[ AB.bookmarks.length - 1 ]  );

}

