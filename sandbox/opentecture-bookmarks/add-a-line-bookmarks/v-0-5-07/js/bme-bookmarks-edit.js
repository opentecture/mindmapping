/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BME = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-09-28",
	"description": `First click a bookmark button above, edit the data to the right,
		then save your edits or delete bookmark here:`,
	"version": "0.05.06-0bme",

};


BME.getMenuBookmarkEdit = function() {

	//<div contenteditable id="divDrop" title="Drag a URL into this area" placeholder="bbb" ></div>
	//<button onclick=BME.setTagSetsNew(); >Add new bookmark</button>



	const htm =
	`
		<details id=BMEdet>

			<summary>Bookmark edit (BME)</summary>

			<p>${ BME.description }</p>

			<p>
				<button onclick=BME.setTextareaJson(); >1. Set bookmark JSON</button>
			</p>
			<p>
				<button onclick=BME.setJsonLines(); >2. Add bookmark to JSON in memory</button>
			</p>
			<p>
				or <button onclick=BME.setJsonDelete(); >Delete bookmark JSON in memory</button>
			</p>
				<button onclick=BOP.butSaveFile(); >Save edits to file</button> <span id=spnMessage ></span>
			<p>
				<textarea id=BMEtxtJson style=height:20rem; ></textarea>
			</p>

		</details>


	`;

	return htm;

};


BME.setTextareaJson = function() {

	if ( !BED.bookmark ) { BMEtxtJson.value = "First select a bookmark to edit"; return; }

	const tags = `["${ BEDinpTags.value.slice().replace( /,/g, '","') }"]`;
	const txt =
`{
"url": "${ BEDinpUrl.value }",
"name": "${ BEDinpName.value }",
"dateAdd": "${ BEDinpDateAdd.value }",
"dateUpdate": "${ new Date().toISOString() }",
"id": "${ BEDinpId.value }",
"type": "${ BEDinpType.value }",
"images": [ ${ BEDinpImages.value } ],
"favicon": "${ BEDinpFavicon.value }",
"tags": ${ tags },
"description": "${ BEDtxtDescription.value }"
}`;

	BMEtxtJson.value = txt;

};





BME.setJsonLines = function() {

	//const index = BED.lines.findIndex( line => line.includes( `\"${ BEDinpId.value }\"` ) );

	BME.index = BOP.jsonLines.indexOf( BED.bookmark );
	//console.log( 'BME.index', BME.index );

	if ( BMEtxtJson.value === "" ) { alert( "First click and edit 'Set bookmark JSON'"); return; }

	let jsonl;

	try {

		jsonl = JSON.parse( BMEtxtJson.value );
		spnMessage.innerHTML = "JSON looks OK"
		//throw 'myException'; // generates an exception
	}
	catch (e) {

	// statements to handle any exceptions
		//logMyErrors( e ); // pass exception object to error handler
		console.log( 'e', e );

		alert( e );

	}

	//const line = JSON.stringify( json );
	//console.log( 'line', line );

	if ( BME.index >= 0 ) {

		BOP.jsonLines[ BME.index ] = jsonl;

		//console.log( 'BOP.jsonLines[ BME.index ]', BOP.jsonLines[ BME.index ] );

	} else if ( jsonl.url !== "" ) {

		BOP.jsonLines.push( jsonl );

	} else {

		BMEtxtJson.value = 'Please add a URL';

		return;

	}

};



BME.setJsonDelete = function() {

	//const index = BM.lines.findIndex( line => line.includes( `\"${ BEDinpId.value }\"` ) );
	const index = BOP.jsonLines.indexOf( BED.bookmark );

	//console.log( 'index', index );

	BOP.jsonLines.splice( index, 1 );

	BMEtxtJson.value = "Remember to 'Save edits to file'";

	console.log( 'BOP.jsonLines delete', index, BOP.jsonLines.length );

};