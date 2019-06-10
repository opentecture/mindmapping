// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BA = { "release": "1.0", "date": "2019-03-30" };

BA.testData = [

	"<a href='https://google.com' >Google</a>"
]

BA.bookmarkAddIvvvvvvvvnit = function( id ){

	divContents.innerHTML = tmpNewBookmark.innerHTML;

	inpId.value = FM.bookmarks.length + 1;

	inpDateAdded.value = new Date().toISOString();

	inpType.value = "url";

};


BA.onInput = function( id ){

	const htm = divDrop.innerHTML
	console.log( 'htm', htm );

	url = htm.match( /href="(.*?)"/i )[ 1 ]
	console.log( '', url );

	name = htm.match ( />(.*?)<\/a>/i)[ 1 ]

	inpUrl.value = url
	inpName.value = name;

	inpId.value = inpId.value ? inpId.value : BA.uuidv4(); //FM.bookmarks.length + 1;

	inpDateAdd.value = inpDateAdd.value ? inpDateAdd.value : new Date().toISOString();

	inpDateUpdate.value = new Date().toISOString();

	inpType.value = "url";

	ifr.src = url;

};


BA.addTest = function() {

	divDrop.innerHTML = BA.testData[ 0 ];

}
BA.uuidv4 = function() {

	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	)

};


BA.addTag = function( input ){

	inpTags.value += `"${ input.value }" `;

}

BA.vvvvsetData = function( id ){

	htm = divDrop.innerHTML

	inpId.value = 23; //FM.bookmarks.length + 1;

	inpDateAdd.value = inpDateAdd.value ? inpDateAdd.value : new Date().toISOString();

	inpDateUpdate.value = new Date().toISOString();

	inpType.value = "url";

};



BA.bookmarkAddUpdateTextarea = function() {

	const txt =
`{
	"url": "${ inpUrl.value }",
	"name": "${ inpName.value }",
	"dateAdd": "${ inpDateAdd.value }",
	"dateUpdate": "${ inpDateUpdate.value }",
	"id": "${ inpId.value }",
	"type": "${ inpType.value }",
	"images": [ "${ inpImages.value }" ],
	"tags": [ "${ inpTags.value }" ],
	"source": "${ selSource.value }",
	"description": "${ txtDescription.value }",
	"status": "${ selStatus.value }"
}`;

	BAtxtBookmark.value = txt;

};



BA.bookmarkAdd = function( id ) {

	const index = FM.jsonLines.findIndex( line => line.includes( `\"id":\"${ id }\"` ) )
	console.log( 'index', index );

	json = JSON.parse( BAtxtBookmark.value );
	line = JSON.stringify( json );
	console.log( 'FM.jsonLines', line );

	if ( index >= 0 ) {

		FM.jsonLines[ index ] = line;

	} else if ( json.url !== "" ) {

		FM.jsonLines.push( line );

	} else {

		BAtxtBookmark.value = 'Please add a URL';

		return;

	}


	for ( let line of FM.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			FM.bookmarks.push( jsonl );

		}

	}

	console.log( 'FM.bookmarks[ FM.bookmarks.length - 1 ] ', FM.bookmarks[ FM.bookmarks.length - 1 ]  );

	inpType.value = "url";

};


