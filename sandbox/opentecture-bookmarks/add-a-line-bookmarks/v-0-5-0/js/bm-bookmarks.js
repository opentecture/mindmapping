/* global FOB, TAG, BLBF, crypto */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BM = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-10",
	"description": "Display data of bookmark selected from left menu or drag & drop a link into this box",
	"version": "0.5.0-5",

};



BM.getMenuBookmarks = function() {

	const htm =
	`
		<details open >

			<summary>Bookmark ~ BM V ${ BM.version } ~ ${ BM.date }</summary>

			<p contenteditable=true id="BMNdivDrop" title="Drag a URL into this area" data-text="${ BM.description }" ></p>

			<div class=container >

				<div id=BMdivUrl >url </div><div><input id=BMinpUrl ></div>

				<div>name </div><div><input id=BMinpName ></div>

			</div>

			<div class=container4 >

				<div>date add </div><div><input id=BMinpDateAdd ></div>

				<div>update </div><div><input id=BMinpDateUpdate ></div>

				<div>id </div><div><input id=BMinpId ></div>

				<div>type </div><div><input id=BMinpType ></div>

			</div>

			<div class=container >

				<div>images </div><div><input id=BMinpImages ></div>

				<div>favicon </div><div><input id=BMinpFavicon ></div>

				<div>tags </div><div><input id=BMinpTags ></div>

				<div>description </div><div><textarea id=BMtxtDescription ></textarea></div>

				<div>comment </div><div><textarea id=BMtxtComment ></textarea></div>

			</div>

		</details>
	`;

	return htm;

};



BM.onLoad = function() {

	BM.jsonLines = [];

	BM.lines = FOB.text.split(/\r\n|\n/);

	for ( let line of BM.lines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		BM.jsonLines.push( jsonl );

	}
	//console.log( 'BM.jsonLines', BM.jsonLines.length );

	BDMdet.open = true;

	//BLBF.setMenuItemsByUrl();

};



BM.parseJson = function( index ) {

	//BMdivBookmark.innerHTML = BM.getMenuBookmarks();

	const bookmark = BM.bookmark = BM.jsonLines[ index ];
	//console.log( 'bookmark', bookmark );

	BMinpUrl.value = bookmark.url;
	BMinpName.value = bookmark.name;
	BMinpDateAdd.value = bookmark.dateAdd;
	BMinpDateUpdate.value = bookmark.dateUpdate;
	BMinpId.value = bookmark.id;
	BMinpType.value = bookmark.type;
	BMinpImages.value = bookmark.images || "";
	BMinpFavicon.value = bookmark.favicon;
	BMinpTags.value = bookmark.tags;

	BMtxtDescription.value = bookmark.description;

	BMdivUrl.innerHTML = `<a href="${  bookmark.url }" target="_blank"><img src="${ bookmark.favicon }" height=32></a>`;

	BM.comments = BM.lines.filter( line => line.includes( bookmark.id ) && line.includes( `"type":"comment"` ) );

	//console.log( 'comments', BM.comments );

	if ( BM.comments.length ) {

		const comment = JSON.parse( BM.comments[ 0 ] );
		BMtxtComment.value = comment.text;

	} else {

		BMtxtComment.value = "";

	}

	BMEtxtJson.value = "";
	COM.onToggle();

};



BM.uuidv4 = function() {

	return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
		( c ^ crypto.getRandomValues( new Uint8Array( 1 )  )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);

};



BM.butSaveFile = function() {

	const name = FOB.name;
	const blob = new Blob( [ BM.lines.join( "\n" ) ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = name;
	a.click();
	a = null;

};