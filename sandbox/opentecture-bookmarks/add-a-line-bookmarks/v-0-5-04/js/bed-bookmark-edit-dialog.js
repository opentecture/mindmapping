/* global BOP */
// jshint esversion: 6
// jshint loopfunc: true


const BED = {

	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-08-04",
	"description": "Display data of bookmark selected from left menu or drag & drop a link into this box",
	"version": "0.5.04-0bed",

};



BED.setTargetToEditDialog = function( index ) {

	BOP.target.innerHTML = BED.getBookmarksData();

	const bookmark = BED.bookmark = BOP.bookmarks[ index ];
	//console.log( 'bookmark', bookmark );

	BEDinpUrl.value = bookmark.url || "";
	BEDinpName.value = bookmark.name;
	BEDinpDateAdd.value = bookmark.dateAdd;
	BEDinpDateUpdate.value = bookmark.dateUpdate;
	BEDinpId.value = bookmark.id;
	BEDinpType.value = bookmark.type;
	BEDinpImages.value = bookmark.images || "";
	BEDinpFavicon.value = bookmark.favicon || "";
	BEDinpTags.value = bookmark.tags;
	BEDtxtDescription.value = bookmark.description;

	BEDdivUrl.innerHTML = bookmark.favicon ?
		`<a href="${  bookmark.url }" target="_blank"><img src="${ bookmark.favicon }" height=32></a>` : "";

	const comments = BOP.comments.filter( line => {

		return line.bookmarkId === bookmark.id && line.type === "comment"

	} );

	if ( comments.length ) {

		const comment = comments[ 0 ];
		//console.log( 'comment', comment );

		BEDtxtComment.value =
		`comment: ${ comment.text }\n\ntags: ${ comment.tags }`;

	} else {

		BEDtxtComment.value = "";

	}

};



BED.getBookmarksData = function() {

	const htm =
	`
		<details open >

			<summary>Bookmark ~ BED V ${ BED.version } ~ ${ BED.date }</summary>

			<p contenteditable=true id="BEDdivDrop" title="Drag a URL into this area" data-text="${ BED.description }" ></p>

			<div class=container >

				<div id=BEDdivUrl >url </div><div><input id=BEDinpUrl ></div>

				<div>name </div><div><input id=BEDinpName ></div>

			</div>

			<div class=container4 >

				<div>date add </div><div><input id=BEDinpDateAdd ></div>

				<div>update </div><div><input id=BEDinpDateUpdate ></div>

				<div>id </div><div><input id=BEDinpId ></div>

				<div>type </div><div><input id=BEDinpType ></div>

			</div>

			<div class=container >

				<div>images </div><div><input id=BEDinpImages ></div>

				<div>favicon </div><div><input id=BEDinpFavicon ></div>

				<div>tags </div><div><input id=BEDinpTags ></div>

				<div>description </div><div><textarea id=BEDtxtDescription ></textarea></div>

				<div>comment </div><div><textarea id=BEDtxtComment onclick=alert("not here"); placeholder="No editing here. Use 'Comment add/edit'" ></textarea></div>

			</div>

		</details>
	`;

	return htm;

};