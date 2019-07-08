/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BME = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-07-06",
	"description": "Edit bookmark data above, then view and save your edits or delete bookmark",
	"version": "0.5.02-2bme",

};


BME.getMenuBookmarkEdit = function() {

	//<div contenteditable id="divDrop" title="Drag a URL into this area" placeholder="bbb" ></div>
	//<button onclick=BME.setTagSetsNew(); >Add new bookmark</button>
	const htm =
	`
		<details ontoggle=>

			<summary>Bookmark edit ~ BME Vv${ BME.version } ~ ${ BME.date }</summary>

			<p>${ BME.description }</p>

			<p>

				<button onclick=BME.setTextareaJson(); >1. Set bookmark JSON</button>

				<button onclick=BME.setJsonTagSets(); >2. Add bookmark to JSON in memory</button>

				<button onclick=BM.butSaveFile(); >3. Save edits to file</button>
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

	const tags = `["${ BMinpTags.value.slice().replace( /,/g, '","') }"]`;
	const txt =
`{
	"url": "${ BMinpUrl.value }",
	"name": "${ BMinpName.value }",
	"dateAdd": "${ BMinpDateAdd.value }",
	"dateUpdate": "${ new Date().toISOString() }",
	"id": "${ BMinpId.value }",
	"type": "${ BMinpType.value }",
	"images": [ ${ BMinpImages.value } ],
	"favicon": "${ BMinpFavicon.value }",
	"tags": ${ tags },
	"description": "${ BMtxtDescription.value }"
}`;

	BMEtxtJson.value = txt;

};





BME.setJsonTagSets = function() {

	const index = BM.lines.findIndex( line => line.includes( `\"${ BMinpId.value }\"` ) );
	//console.log( 'index', index );

	if ( BMEtxtJson.value === "" ) { alert( "First click and edit 'Set bookmark JSON'"); return; }

	const json = JSON.parse( BMEtxtJson.value );
	const line = JSON.stringify( json );
	//console.log( 'line', line );

	if ( index >= 0 ) {

		BM.lines[ index ] = line;

	} else if ( json.url !== "" ) {

		BM.lines.push( line );

	} else {

		BMtxtJson.value = 'Please add a URL';

		return;

	}

};



BME.setJsonDelete = function() {

	const index = BM.lines.findIndex( line => line.includes( `\"${ BMinpId.value }\"` ) );
	//console.log( 'index', index );

	BM.lines.splice( index, 1 );

	BMEtxtJson.value = "Remember to 'Save edits to file'";

	console.log( 'BM.lines delete', index, BM.lines.length );

};