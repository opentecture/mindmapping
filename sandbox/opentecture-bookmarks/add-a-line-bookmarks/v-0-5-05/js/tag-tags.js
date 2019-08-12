"use strict";

/* global  */
// jshint esversion: 6
// jshint loopfunc: true


const TAG = {

	"copyright": "Copyright 2019 pushMe-pullYou authors",
	"date": "2019-08-10",
	"description": "Add, display and edit sets of tags for bookmarks",
	"version": "0.5.05-0TAG",

};

TAG.tagSets = [];


TAG.getMenuTagSets = function() {

	const htm =
	`
	<details ontoggle=TAG.onToggle(); >

		<summary>Tag Sets Edit TAG</summary>

		<p>${ TAG.description }</p>
		<select id=TAGselTagset onchange=TAG.onSelectChange(); ></select>
		<div class=cccontainer >

			<div>name </div> <div><input id=TAGinpName style="width:100%;" ></div>

		</div>

		<div class=bbcontainer4 >

			<div>date add </div> <div><input id=TAGinpDateAdd style="width:100%;" ></div>

			<div>update </div> <div><input id=TAGinpDateUpdate style="width:100%;" ></div>

			<div>id </div> <div><input id=TAGinpId style="width:100%;" ></div>

			<div>type </div> <div><input id=TAGinpType style="width:100%;" ></div>

		</div>

		<div class=xxcontainer >

			<div>tags </div> <div><textarea id=TAGinpTags style="height:3rem;width:100%;" ></textarea></div>

			<div>description</div> <div><input id=TAGinpDescription style="width:100%;" ></div>

		</div>

		<p>


			<button onclick=TAG.setTagSetsNew(); >Add new tag set</button>

			<button onclick=TAG.setTextareatagSet(); >set tag set tagSet</button>

			<button onclick=TAG.settagSetTagSets(); >Add tag set to tagSet file in memory</button>

			<button onclick=BOP.butSaveFile(); >save to file</button>

			<button onclick=TAG.butFilterAndClean(); >filter and clean</button>


		</p>

		<p>
			<textarea id=TAGtxttagSet style="height:15rem;width:100%;" ></textarea>
		</p>

	</details>
	`;

	return htm;

};



TAG.onToggle = function() {

	const names = BOP.tagSets.map( line => line.name );
	//console.log( 'names', names );

	TAGselTagset.innerHTML = `<option>select</option>` + names.map( name => `<option>${ name }</option>` );

};



TAG.onSelectChange = function() {

	const name = TAGselTagset.value;

	const tagSet = BOP.tagSets.find( tagSet => tagSet.name === name );

	TAGinpName.value = tagSet.name;
	TAGinpDateAdd.value = tagSet.dateAdd;
	TAGinpDateUpdate.value = tagSet.dateUpdate;
	TAGinpId.value = tagSet.id;
	TAGinpType.value = tagSet.type;
	TAGinpTags.value = tagSet.tags;
	TAGinpDescription.value = tagSet.description;

};



TAG.setTagSetsNew = function() {

	TAGinpName.value = "name";
	TAGinpDateAdd.value = new Date().toISOString();
	TAGinpDateUpdate.value = TAGinpDateAdd.value;
	TAGinpId.value = BMN.uuidv4();
	TAGinpType.value = "tagset";
	TAGinpTags.value = ["abc","123"];
	TAGinpDescription.value = "tags";

};



TAG.setTextareatagSet = function() {

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

	TAGtxttagSet.value = txt;

};



TAG.settagSetTagSets = function( ) {

	const index = BOP.jsonLines.findIndex( line => line.name === TAGinpName.value );
	console.log( 'index', index );

	const tagSet = JSON.parse( TAGtxttagSet.value );
	//const jsonL = JSON.stringify( tagSet );
	//console.log( 'jsonL', jsonL );

	if ( index >= 0 ) {

		BOP.jsonLines[ index ] = tagSet;

	} else if ( tagSet.name !== "" ) {

		BOP.jsonLines.push( tagSet );

	} else {

		TAGtxttagSet.value = 'Please add a URL';

		return;

	}

	/*

	for ( let line of BOP.jsonLines ) {
		//console.log( 'line', line );

		if ( line.slice( 0, 1 ) !== "{" ) { continue; }

		const tagSetl = tagSet.parse( line );
		//console.log( 'tagSetl', tagSetl );

		if ( tagSetl.type === "tagset" ) {

			TAG.tagSets.push( tagSetl );

		}

	}

	console.log( 'TAG.tagSets', TAG.tagSets );

	*/


};



TAG.butFilterAndClean = function() {


	const sets = BOP.tagSets.slice();

	let reference = sets.pop();

	TAGselTagset.value = reference.name;

	let refTags = reference.tags;

	sets.forEach( set =>

		refTags = refTags.filter( tag => !set.tags.includes( tag ) ).map( tag => tag.toLowerCase() )

	);

	reference.tags = refTags.sort();

	TAG.onSelectChange();

	console.log( '', reference );

};
