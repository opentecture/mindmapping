/* global COM */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const COM = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-08-10",
	"description": "Add your comments to a bookmark",
	"version": "0.5.05-0com",

};



COM.getMenuCommentAdd = function() {

	const htm =
	`
	<details id=COMdet ontoggle=COM.onToggle(); >

		<summary>Comment add/edit (COM)</summary>

			<p>${ COM.description }</p>

			<div class=xxcontainer >

			<div >tags </div><div title="TBD: save values in local storage in between sessions" ><input id=COMinpTags style="width:100%;" ></div>

			<div>bookmark id </div><div><input id=COMinpBookmarkId style="width:100%;" ></div>

			<div>bookmark url </div><div><input id=COMinpBookmarkUrl style="width:100%;" ></div>

		</div>

		<div class=xxcontainer4 >

			<div>date add </div><div><input id=COMinpDateAdd style="width:100%;" ></div>

			<div>update </div><div><input id=COMinpDateUpdate style="width:100%;" ></div>

			<div>id </div><div><input id=COMinpId style="width:100%;" ></div>

			<div>type </div><div><input id=COMinpType style="width:100%;" ></div>

		</div>

		<div class=xxcontainer >

			<div>comments </div><div><textarea id=COMtxtComments style="height:2rem;width:100%;" ></textarea></div>

		</div>

		<p>
			<button onclick=COM.setTextareaJson(); >set comment to JSON</button>

			<button onclick=COM.setJsonTagSets(); >Add comment JSON file in memory</button>

			<button onclick=BOP.butSaveFile(); >save to file</button>
		</p>

		<p>
			<textarea id=COMtxtJson style="height:5rem;width:100%;" ></textarea>
		</p>

	</details>
	`;

	return htm;

};



COM.onToggle = function() {

	if ( COMdet.open === false ) return;

	if ( BED.comments && BED.comments.length ) {

		const comment = BED.comments[ 0 ]; //JSON.parse( BOP.comments[ 0 ] );

		COMinpBookmarkId.value = comment.bookmarkId;
		COMinpBookmarkUrl.value = comment.bookmarkUrl || BEDinpUrl.value;
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

	if ( !window.BEDinpId ) { COMtxtJson.value = "First selected a bookmark to edit"; return; }

	COMinpBookmarkId.value = BEDinpId.value;
	COMinpBookmarkUrl.value = BEDinpUrl.value;
	COMinpTags.value = "theo";
	COMinpDateAdd.value = new Date().toISOString();
	COMinpDateUpdate.value = COMinpDateAdd.value;
	COMinpId.value = BMN.uuidv4();
	COMinpType.value = "comment";
	COMtxtComments.value = "";

};


COM.setTextareaJson = function() {

	const txt =
`{
"tags": "${ COMinpTags.value }",
"bookmarkId": "${ COMinpBookmarkId.value }",
"bookmarkUrl": "${ COMinpBookmarkUrl.value }",
"dateAdd": "${ COMinpDateAdd.value }",
"dateUpdate": "${ COMinpDateUpdate.value }",
"id": "${ COMinpId.value }",
"type": "comment",
	"text": "${ COMtxtComments.value }"
}`;

	COMtxtJson.value = txt;

};



COM.setJsonTagSets = function( ) {

	const index = BOP.jsonLines.findIndex( line => line.id === COMinpId.value );

	//const index = BOP.jsonLines.indexOf( BED.bookmark );
	console.log( 'index', index );

	const jsonLine = JSON.parse( COMtxtJson.value );
	//const line = JSON.stringify( json );
	//console.log( 'line', line );

	if ( index >= 0 ) {

		BOP.jsonLines[ index ] = jsonLine;

	} else if ( jsonLine ) {

		BOP.jsonLines.push( jsonLine );

	} else {

		COMtxtJson.value = 'Please add a URL';

		return;

	}

};