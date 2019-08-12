/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BME = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-08-10",
	"description": "Edit bookmark data above, then view and save your edits or delete bookmark",
	"version": "0.5.05-0bme",

};


BME.getMenuBookmarkEdit = function() {

	//<div contenteditable id="divDrop" title="Drag a URL into this area" placeholder="bbb" ></div>
	//<button onclick=BME.setTagSetsNew(); >Add new bookmark</button>



	const htm =
	`
		<details id=BMEdet>

			<summary>Bookmark edit ~ BME</summary>

			<p>${ BME.description }</p>

			<p>

				<button onclick=BME.setTextareaJson(); >1. Set bookmark JSON</button>

				<button onclick=BME.setJsonTagSets(); >2. Add bookmark to JSON in memory</button>

				<button onclick=BOP.butSaveFile(); >3. Save edits to file</button>
				/
				<button onclick=BME.setJsonDelete(); >Delete bookmark JSON in memory</button>


			</p>

			<p>
				<textarea id=BMEtxtJson ></textarea>
			</p>

		</details>


	`;

	return htm;

};


BME.setTextareaJson = function() {

	if ( !BED.bookmark ) { BMEtxtJson.value = "First selectd a boomark to edit"; return; }

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





BME.setJsonTagSets = function() {

	//const index = BED.lines.findIndex( line => line.includes( `\"${ BEDinpId.value }\"` ) );

	const index = BOP.jsonLines.indexOf( BED.bookmark );
	//console.log( 'index', index );

	if ( BMEtxtJson.value === "" ) { alert( "First click and edit 'Set bookmark JSON'"); return; }

	const jsonl = JSON.parse( BMEtxtJson.value );
	//const line = JSON.stringify( json );
	//console.log( 'line', line );

	if ( index >= 0 ) {

		BOP.jsonLines[ index ] = jsonl;

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