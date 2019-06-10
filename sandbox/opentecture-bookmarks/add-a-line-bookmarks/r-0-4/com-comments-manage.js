/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const COM = {
	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-05-19",
	"version": "0.4.0-0"
};

COM.getContents = function() {

	let htm = "";
	for( comment of CM.comments ) {

		if (comment.targetId === CM.bookmark.id ) {

			htm += JSON.stringify( comment, null, '\t' );
		}
	}

	htm =
	`
		<details open>

			<summary>Edit Comments</summary>

			<p>
				<button onclick=COM.setNewComment(); >add new comment</button>

				<button onclick=COM.updateComment(); >add comment JSON to file in memory</button>
			</p>

			<div id=COMdivNewComment >New comment area</div>

			<div id=COMdivCommentExisting >
				Existing comments
				<textarea rows=10 >${ htm }</textarea>
			</div>

		</details>
	`;

	return htm;

};

COM.setNewComment = function() {

	if ( !CM.bookmark) { alert( "Please select a bookmark first" ); return; };

	const date =  new Date().toISOString();
	CM.commentId = BA.uuidv4();

	const txt=
		`
{
	"date": "${ date }",
	"id": "${ CM.commentId }",
	"type": "comment",
	"targetId": "${ CM.bookmark.id }",
	"author": "NAME",
	"content": "comments"
}
		`;

	const htm = `<textarea id=COMtxtComments style="height:8rem;" >${ txt }</textarea>`;

	COMdivNewComment.innerHTML = htm;

};



COM.updateComment = function() {

	let index = CM.jsonLines.findIndex( line => line.includes( `\"id":\"${ CM.commentId }\"` ) );
	//console.log( 'index', index );

	const line = JSON.stringify( JSON.parse( COMtxtComments.value ) );
	//console.log( 'txtComments.value', line );

	if ( index > 0 ) {

		CM.jsonLines[ index ] = line;

	} else {

		CM.jsonLines.push( line );
		index = CM.jsonLines.length - 1;

	}

	console.log( 'CM.jsonLines[ index ] ', CM.jsonLines[ index ]  );

};