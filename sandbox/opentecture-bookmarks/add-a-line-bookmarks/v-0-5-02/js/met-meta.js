/* global MET */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const MET = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-07-07",
	"description": "Add your meta tags to the JSON file",
	"version": "0.5.02-0met",

};



MET.getMenuMetaAdd = function() {
// ontoggle=MET.onToggle();
	const htm =
	`
	<details  >

		<summary>Meta add/edit ~ MET v${ MET.version } ~ ${ MET.date }</summary>

			<p>${ MET.description }</p>

			<div class=container >

			<div>tags </div><div>
				<select id=METselTag onchange=MET.onToggle(this) >
					<option>select a tag</option>
					<option>copyright</option>
					<option>description</option>
					<option>license</option>
					<option>subtitle</option>
					<option>title</option>
				</select>
			</div>

		</div>

		<div class=container4 >

			<div>date add </div><div><input id=METinpDateAdd ></div>

			<div>update </div><div><input id=METinpDateUpdate ></div>

			<div>id </div><div><input id=METinpId ></div>

			<div>type </div><div><input id=METinpType ></div>

		</div>

		<div class=container >

			<div>meta tag </div><div><textarea id=METtxtMeta ></textarea></div>

		</div>

		<p>
			<button onclick=MET.setTextareaJson(); >Set meta tag JSON</button>

			<button onclick=MET.setJsonTagSets(); >Add meta tag to JSON in memory</button>

			<button onclick=BM.butSaveFile(); >Save edits to file</button>
		</p>

		<p>
			<textarea id=METtxtJson ></textarea>
		</p>

	</details>
	`;

	return htm;

};



MET.onToggle = function() {

	tag = METselTag.value;
	console.log( 'tag', tag );

	if ( BM.metatags && BM.metatags.length ) {

		const metatag = BM.metatags.find( metatag => metatag.tags.includes( tag ) );
		console.log( 'metatag', metatag );

		if ( metatag ) {

			METinpDateAdd.value = metatag.dateAdd;
			METinpDateUpdate.value = new Date().toISOString();
			METinpId.value = metatag.id;
			METinpType.value = "meta";
			METtxtMeta.value = metatag.text;

		} else {

			MET.setMetaNew();

		}

	}

};



MET.setMetaNew = function() {

	console.log( '', 23 );

	METinpDateAdd.value = new Date().toISOString();
	METinpDateUpdate.value = METinpDateAdd.value;
	METinpId.value = BM.uuidv4();
	METinpType.value = "meta";
	METtxtMeta.value = "";

};


MET.setTextareaJson = function() {

	const txt =
`{

	"tags": "${ METselTag.value }",
	"dateAdd": "${ METinpDateAdd.value }",
	"dateUpdate": "${ METinpDateUpdate.value }",
	"id": "${ METinpId.value }",
	"type": "meta",
	"text": "${ METtxtMeta.value }"
}`;

	METtxtJson.value = txt;

};



MET.setJsonTagSets = function( ) {

	const index = BM.lines.findIndex( line => line.includes( `\"${ METinpId.value }\"` ) );
	console.log( 'index', index );

	const json = JSON.parse( METtxtJson.value );
	const line = JSON.stringify( json );
	console.log( 'line', line );

	if ( index >= 0 ) {

		BM.lines[ index ] = line;

	} else if ( json.name !== "" ) {

		BM.lines.push( line );

	} else {

		METtxtJson.value = 'Please add a URL';

		return;

	}

};