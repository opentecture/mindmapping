/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BME = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-08",
	"description": "Edit bookmark data above then view and save or delete here",
	"version": "0.5.0-1",

};


BME.getMenuBookmarkEdit = function() {

	//<div contenteditable id="divDrop" title="Drag a URL into this area" placeholder="bbb" ></div>
	//<button onclick=BME.setTagSetsNew(); >Add new bookmark</button>
	const htm =
	`
		<details ontoggle=>

			<summary>Bookmark Edit ~ BME V ${ BME.version } ~ ${ BME.date }</summary>

			<p>${ BME.description }</p>


			<p>

				<button onclick=BME.setTextareaJson(); >Set bookmark JSON</button>

				<button onclick=BME.setJsonTagSets(); >Add bookmark to JSON in memory</button>

				<button onclick=BME.setJsonDelete(); >Delete bookmark JSON in memory</button>

				<button onclick=BM.butSaveFile(); >Save edits to file</button>

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
	"dateUpdate": "${ BMinpDateUpdate.value }",
	"id": "${ BMinpId.value }",
	"type": "${ BMinpType.value }",
	"images": [ ${ BMinpImages.value } ],
	"tags": ${ tags },
	"description": "${ BMtxtDescription.value }"
}`;

	BMEtxtJson.value = txt;

};





BME.setJsonTagSets = function() {

	const index = BM.lines.findIndex( line => line.includes( `\"${ BMinpId.value }\"` ) );
	//console.log( 'index', index );

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

	console.log( 'BM.lines', BM.lines.length );

};