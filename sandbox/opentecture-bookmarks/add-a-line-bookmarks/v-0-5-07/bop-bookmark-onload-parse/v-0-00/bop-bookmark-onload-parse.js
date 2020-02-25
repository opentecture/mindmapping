
BOP = {}


BOP.onLoadParse = function( jsonLines ) {


	BOP.jsonLines = jsonLines;

	BOP.metaTags = BOP.jsonLines.filter( jsonl => jsonl.type === "meta" );

	BOP.comments = BOP.jsonLines.filter( jsonl => jsonl.type === "comment" );

	BOP.bookmarks = BOP.jsonLines.filter( jsonl => jsonl.type === "url" );

	BOP.tagSets = BOP.jsonLines.filter( jsonl => jsonl.type === "tagset" );


	BOP.setHeader();

	BOP.setBookmarks();

};



BOP.setHeader = function () {

	const title = BOP.metaTags.find( meta => meta.tags === "title" ).text;
	const subtitle = BOP.metaTags.find( meta => meta.tags === "subtitle" ).text;
	const copyright = BOP.metaTags.find( meta => meta.tags === "copyright" ).text || "copyright";
	const license = BOP.metaTags.find( meta => meta.tags === "license" ).text || "license";

	const htm =
		`<h1>${title} ~ ${BOP.bookmarks.length} total items</h1>
		<p><i>${ subtitle}. ${copyright}. ${license}.</i></p>`;

	divHeader.innerHTML = htm;

};



BOP.setBookmarks = function ( bookmarks = BOP.bookmarks ) {
	//console.log( '', bookmarks );

	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	let htm = `<p>${ bookmarks.length } filtered links</p>`;

	let count = 1;
	bookmarks.forEach( ( bookmark, count ) => {

		a.href = bookmark.url;
		let site = a.hostname;

		const subdomain = subdomains.filter( bit => site.startsWith( bit ) === true );
		//console.log( 'subdomain', subdomain );

		site = site.replace ( subdomain, "" );
		//console.log( 'site', site );

		const comment = BOP.comments.find( comment => comment.bookmarkId === bookmark.id ) || "";
		//console.log( 'comment', comment );

		const index = BOP.bookmarks.findIndex( line => line.id === bookmark.id );

		htm +=
		`<p>
			${ count + 1 } <a href=${bookmark.url } target="_blank" >
					<img src="${ bookmark.favicon }" height=16px >
				<b>${ bookmark.name }</b> - <i>${ site }</i>
			</a><br>
			tags: <i style=color:blue >${ bookmark.tags }</i>
			- added: ${ bookmark.dateAdd.slice( 0, 10 ) }
			- update: ${ bookmark.dateUpdate.slice( 0, 10 ) }
			<br>
			${ bookmark.description.startsWith ("No description" ) ? "" : bookmark.description }
			<p style=color:blue ><button onclick="BED.setTargetToEditDialog(${ index });" >edit</button>
			${ comment.text ? ( "comment: " + comment.text + " / tags: " + comment.tags ) : "" }</p>
			<hr>
		</p>`;

	} );

	mainContents.innerHTML = htm;

};

BOP.getBookmarksFilterByTagsToIgnore = function ( bookmarks ) {

	const tagsToIgnore = inpTagsIgnore.value.split( "," );

	const filtered = bookmarks.filter( bookmark => {

		let  remove = false;

		for ( let tag of tagsToIgnore ) {

			if ( bookmark.tags.includes( tag ) ) {

				remove = true;
				break;

			}

		}

		return remove === false;

	} );
	//console.log( '', filtered.length );

	return filtered;

};


BOP.butSaveFile = function () {

	//const index = BME.index || 0;
	//const line = BOP.jsonLines[ index ];
	//console.log( 'line', line );

	const name = FOJ.fileName;

	const strings = BOP.jsonLines.map( jsonl => JSON.stringify( jsonl ) ).join( "\n" );
	//console.log( 'str', strings );

	const blob = new Blob( [ strings ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = name;
	a.click();
	a = null;

	BOP.setHeader();
	
	BOP.setBookmarks();

};