/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


TAG = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-02",
	"description": "Add, display and edit sets of tags for bookmarks",
	"version": "0.5.0-2",

};

TAG.tagSets = [];


TAG.getMenuTagSets = function() {

	const htm =
	`
	<details ontoggle=TAG.onToggle(); >

		<summary>Tag Sets Edit ~ TAG V ${ TAG.version } ~ ${ TAG.date }</summary>

		<p>${ TAG.description }</p>

		<div class=container >

			<div>name </div> <div><input id=TAGinpName ></div>

		</div>

		<div class=container4 >

			<div>date add </div> <div><input id=TAGinpDateAdd ></div>

			<div>update </div> <div><input id=TAGinpDateUpdate ></div>

			<div>id </div> <div><input id=TAGinpId ></div>

			<div>type </div> <div><input id=TAGinpType ></div>

		</div>

		<div class=container >

			<div>tags </div> <div><input id=TAGinpTags ></div>

			<div>description</div> <div><input id=TAGinpDescription ></div>

		</div>

		<p>
			<select id=TAGselTagset onchange=TAG.onSelectChange(); ></select>

			<button onclick=TAG.setTagSetsNew(); >Add new tag set</button>

			<button onclick=TAG.setTextareaJson(); >set tag set JSON</button>

			<button onclick=TAG.setJsonTagSets(); >Add tag set to JSON file in memory</button>

			<button onclick=BM.butSaveFile(); >save to file</button>

		</p>

		<p>
			<textarea id=TAGtxtJson ></textarea>
		</p>

	</details>
	`;

	return htm;

};



TAG.onToggle = function() {

	const lines = BM.lines.filter( line => line.includes( `\"tagset\"` ) );
	console.log( 'lines', lines );

	names = lines.map( line => line.match( /\"name\": \"(.*?)\"/i )[ 1 ] );
	console.log( 'names', names );

	TAGselTagset.innerHTML = `<option>select</option>` + names.map( name => `<option>${ name }</option>` );

};



TAG.onSelectChange = function() {

	const name = TAGselTagset.value;

	const line = BM.lines.find( line => line.includes( `\"name\": "${ name}"` ) );
	console.log( 'line', line );

	const json = JSON.parse( line )

	TAGinpName.value = json.name;
	TAGinpDateAdd.value = json.dateAdd;
	TAGinpDateUpdate.value = json.dateUpdate;
	TAGinpId.value = json.id;
	TAGinpType.value = json.type;
	TAGinpTags.value = json.tags;
	TAGinpDescription.value = json.description;

};



TAG.setTagSetsNew = function() {

	TAGinpName.value = "name";
	TAGinpDateAdd.value = new Date().toISOString();
	TAGinpDateUpdate.value = TAGinpDateAdd.value;
	TAGinpId.value = BM.uuidv4();
	TAGinpType.value = "tagset";
	TAGinpTags.value = ["abc","123"];
	TAGinpDescription.value = "tags";

};



TAG.setTextareaJson = function() {

	const tags = `["${ TAGinpTags.value.slice().replace( /,/g, '","') }"]`;

	const txt =
`{

	"name": "${ TAGinpName.value }",
	"dateAdd": "${ TAGinpDateAdd.value }",
	"dateUpdate": "${ TAGinpDateUpdate.value }",
	"id": "${ TAGinpId.value }",
	"type": "${ TAGinpType.value }",
	"tags": ${ tags },
	"description": "${ TAGinpDescription.value }"
}`;

	TAGtxtJson.value = txt;

};



TAG.setJsonTagSets = function( ) {

	const index = BM.lines.findIndex( line => line.includes( `\"${ TAGinpId.value }\"` ) );
	console.log( 'index', index );

	const json = JSON.parse( TAGtxtJson.value );
	const line = JSON.stringify( json );
	console.log( 'line', line );

	if ( index >= 0 ) {

		BM.lines[ index ] = line;

	} else if ( json.name !== "" ) {

		BM.lines.push( line );

	} else {

		TAGtxtJson.value = 'Please add a URL';

		return;

	}

	for ( let line of BM.lines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "tagset" ) {

			TAG.tagSets.push( jsonl );

		}

	}

	console.log( 'TAG.tagSets', TAG.tagSets );

};