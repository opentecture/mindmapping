



function openInIframe( index ) {

	bookmark = FM.bookmarks[ index ];

	const id = bookmark.id;
	let iframeHTM;

	if ( !bookmark.notes || bookmark.notes.toLowerCase().includes( "not cors or iframe compatible" ) === false ) {

		iframeHTM =
		`
			<div id=divIframe class="thumbnail-container">
				<div class="thumbnail" >
					<iframe id=ifr src="${ bookmark.url }" ></iframe>
				</div>
			</div>
		`;
	} else {

		iframeHTM = "";

	}


	commentsFiltered = FM.comments.filter( comment => comment.targetId === id );

	commentText = commentsFiltered.length ?
		`<p>
			Comments by ${ commentsFiltered[ 0 ].author}:
			<div style=width:50rem; >${ commentsFiltered[ 0 ].content }</div>
		</p>`
		:
		""
	;

	commentId = commentsFiltered.length ?
		commentsFiltered[ 0 ].id
		:
		FM.comments.length + 1
	;



	divContents.innerHTML =
	`
		<details open >

			<summary>View bookmark</summary>

			<h3><a href="${ bookmark.url }" target="_blank">${ bookmark.name}</a></h3>

			${ iframeHTM }

			<p>${ bookmark.notes || "" }</p>

			<p>
				<img style=background-color:#ddd;max-width:50rem; src="${ bookmark.images ? bookmark.images[ 0 ] : `` }" >
			<p>


			<hr>

			<p>Description: ${ bookmark.description || "" }</p>

			<p>Tags: ${ bookmark.tags }</p>

			${ commentText }

		</details>

		<details>

			<summary>Edit bookmark</summary>
			<p>
				Best to have the JavaScript Developer Console open while you are editing.
				After you update bookmarks or update comments, click the 'save edits to file' button in left menu to save the changes to your local drive.
				Check the validity of your edits by opening the file you just saved.
			</p>

			Bookmark JSON:

				<button onclick=tidyData(); >tidy data</button>
				<button onclick=FM.requestFile("${urlCORS + bookmark.url}",parseHtmlGetDescription); title="wait until iframe appears before clicking here" >get description</button>
				<button onclick=getImages(); >get images</button>

				<button onclick=bookmarkUpdate(${ id }); >update bookmark</button>

			<textarea id=txtBookmarks style=height:18rem;width:100%; title="Wait until text appears below before updating" >${ JSON.stringify( bookmark, null, '\t' ) }</textarea>

			Comments JSON:
				<button onclick=commentAdd(${ id }); >add new comment</button>
				<button onclick=commentUpdate("${ commentId }"); >update comment</button>
				-
				<button onclick=addImage(${ id }); >add new image</button>
			<textarea id=txtComments style=height:10rem;width:100%; >${ JSON.stringify( commentsFiltered[ 0 ], null, '\t' ) || "No comments yet. Click 'add new comment' button to get going. Current release only handles a single comment per bookmark." }</textarea>

			<div id=divImages >nnn</div>

		</details>
	`;

}




/////////

function tidyData() {

	let value = txtBookmarks.value;
	const txt1 = value.match( /"meta_info": \{(.*?)}./ism );
	//console.log( 'txt1', txt1[ 0 ] );
	value = txt1 ? value.replace( txt1[ 0 ], "" ) : value;

	const txt2 = value.match( /"sync_transaction_version": "(.*?)",/i );
	//console.log( 'txt2', txt2[ 1 ] );
	value  = txt2 ? value.replace( txt2[ 0 ], "" ) : value;

	const txt3 = value.match( /"date_added": "(.*?)",/i );
	console.log( 'txt3', txt3 );

	if ( txt3 && txt3[ 1 ].includes( "T" ) === false ) {

		date =  new Date( txt3[ 1 ] * 0.0001 ).toISOString();
		console.log( '', date );
		value  = value.replace( txt3[ 0 ], `"date_added": "${ date }",` );

	}

	txtBookmarks.value = value;

}



function parseHtmlGetDescription( xhr ) {

	FM.source = xhr.target.response;
	//console.log( 'response', response );

	const description = FM.source.match( /name="description" content="(.*?)"/i );
	//console.log( 'description', description );

	description = description  ? description[ 1 ] : "";

	const txt = txtBookmarks.value.match( /"description": "(.*?)"/i );
	//console.log( 'txt', txt );

	if ( !txt || txt[ 1 ].length === 0 ) {

		txtBookmarks.value = txtBookmarks.value.replace( /\t]/, `],"description":"${ description }"` );

	} else {

		console.log( 'description exists', txt, description );

	}

}



function getImages() {

	let htm = "";

	const texts = FM.source.match( /\<img (.*?)>/gi );

	const images = texts ?

		texts.map( text => {

			const link = text.match( /src="(.*?)"/i );
			//console.log( 'link', link );

			return link ? link[ 1 ] : "";
		} )
	: "";

	//console.log( 'images', images );

	for ( image of images ) {

		if ( !image.toLowerCase().startsWith( 'http') ) {

			console.log( 'image', image );

			image = bookmark.url + image;


		}

		htm += `<p style=background-color:#eee; ><img src="${ image }" ><br>${ image }</p>`;

	}

	divImages.innerHTML = htm;

}




// "notes":"Not CORS or Iframe compatible",

function bookmarkUpdate( id ){

	const index = FM.jsonLines.findIndex( line => line.includes( `\"id":\"${ id }\"` ) )
	console.log( 'index', index );

	line = JSON.stringify( JSON.parse( txtBookmarks.value ) );
	console.log( 'txtComments.value', line );

	if ( index >= 0 ) {

		FM.jsonLines[ index ] = line;

	} else {

		FM.jsonLines.push( line );

	}

	bookmarks = [];

	for ( let line of FM.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl );

		if ( jsonl.type === "url" ) {

			bookmarks.push( jsonl );

		}

	}

	console.log( 'FM.jsonLines[ index ] ', FM.jsonLines[ index ]  );

}



//////////

function commentAdd( id ){

	txtComments.value =
`{
	"date_added": "13194420468664932",
	"id": "comment${ comments.length+1 }",
	"type": "comment",
	"targetId": "${ id }",
	"author": "NAME",
	"content": "my comment!"
}
`;

}



function addImage( id ){

	const txt = txtBookmarks.value;

	const txtNew = txt.replace( /"tags":/i, `"images" : [ "" ],\n"tags":` )

	txtBookmarks.value = txtNew;

}



function commentUpdate( id ){

	let index = FM.jsonLines.findIndex( line => line.includes( `\"id":\"${ id }\"` ) )
	//console.log( 'index', index );

	const line = JSON.stringify( JSON.parse( txtComments.value ) );
	//console.log( 'txtComments.value', line );

	if ( index > 0 ) {

		FM.jsonLines[ index ] = line;

	} else {

		FM.jsonLines.push( line );
		index = FM.jsonLines.length - 1;

	}

	console.log( 'FM.jsonLines[ index ] ', FM.jsonLines[ index ]  );
}


