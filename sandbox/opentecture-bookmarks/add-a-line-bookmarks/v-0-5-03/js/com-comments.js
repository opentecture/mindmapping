/* global COM */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const COM = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-07-07",
	"description": "Add your comments to a bookmark",
	"version": "0.5.02-2com",

};



COM.getMenuCommentAdd = function() {

	const htm =
	`
	<details ontoggle=COM.onToggle(); >

		<summary>Comment add/edit ~ COM v${ COM.version } ~ ${ COM.date }</summary>

			<p>${ COM.description }</p>

			<div class=container >

			<div >tags </div><div title="TBD: save values in local storage in between sessions" ><input id=COMinpTags ></div>

			<div>bookmark id </div><div><input id=COMinpBookmarkId ></div>

		</div>

		<div class=container4 >

			<div>date add </div><div><input id=COMinpDateAdd ></div>

			<div>update </div><div><input id=COMinpDateUpdate ></div>

			<div>id </div><div><input id=COMinpId ></div>

			<div>type </div><div><input id=COMinpType ></div>

		</div>

		<div class=container >

			<div>comments </div><div><textarea id=COMtxtComments ></textarea></div>

		</div>

		<p>
			<button onclick=COM.setTextareaJson(); >set comment to JSON</button>

			<button onclick=COM.setJsonTagSets(); >Add comment JSON file in memory</button>

			<button onclick=BM.butSaveFile(); >save to file</button>
		</p>

		<p>
			<textarea id=COMtxtJson ></textarea>
		</p>

	</details>
	`;

	return htm;

};



COM.onToggle = function() {

	if ( BM.comments && BM.comments.length ) {

		const comment = JSON.parse( BM.comments[ 0 ] );

		COMinpBookmarkId.value = comment.bookmarkId;
		COMinpTags.value = comment.tags;
		COMinpDateAdd.value = comment.dateAdd;
		COMinpDateUpdate.value = new Date().toISOString();
		COMinpId.value = comment.id;
		COMinpType.value = "comment";
		COMtxtComments.value = comment.text;

	} else {

		COM.setBookmarkNew();

	}

};



COM.setBookmarkNew = function() {

	COMinpBookmarkId.value = BMinpId.value;
	COMinpTags.value = "theo";
	COMinpDateAdd.value = new Date().toISOString();
	COMinpDateUpdate.value = COMinpDateAdd.value;
	COMinpId.value = BM.uuidv4();
	COMinpType.value = "comment";
	COMtxtComments.value = "";

};


COM.setTextareaJson = function() {

	const txt =
`{

	"tags": "${ COMinpTags.value }",
	"bookmarkId": "${ COMinpBookmarkId.value }",
	"dateAdd": "${ COMinpDateAdd.value }",
	"dateUpdate": "${ COMinpDateUpdate.value }",
	"id": "${ COMinpId.value }",
	"type": "comment",
	"text": "${ COMtxtComments.value }"
}`;

	COMtxtJson.value = txt;

};



COM.setJsonTagSets = function( ) {

	const index = BM.lines.findIndex( line => line.includes( `\"${ COMinpId.value }\"` ) );
	console.log( 'index', index );

	const json = JSON.parse( COMtxtJson.value );
	const line = JSON.stringify( json );
	console.log( 'line', line );

	if ( index >= 0 ) {

		BM.lines[ index ] = line;

	} else if ( json.name !== "" ) {

		BM.lines.push( line );

	} else {

		COMtxtJson.value = 'Please add a URL';

		return;

	}

};