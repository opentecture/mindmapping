// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

///// Same as TooToo13

const MNU = {
	"release": "1.0",
	"date": "2019-03-30"
};

MNU.xDown = null;
MNU.yDown = null;

MNU.onTouchStart = function( event ) {

	MNU.xDown = event.touches[ 0 ].clientX;
	MNU.yDown = event.touches[ 0 ].clientY;

};



MNU.onTouchMove = function(event) {

	// if ( ! MNU.xDown || ! MNU.yDown ) { return; }

	const xUp = event.touches[ 0 ].clientX;
	const yUp = event.touches[ 0 ].clientY;

	const xDiff = MNU.xDown - xUp;
	const yDiff = MNU.yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {// most significant

		if ( xDiff > 0 ) {

			MNU.toggleNavLeft();
			//console.log( 'left swipe' );

		} else {

			MNU.toggleNavLeft();
			console.log( 'right swipe' );

		}

	} else {

		if ( yDiff > 0 ) {

			console.log( 'up swipe' );

		} else {

			console.log( 'down swipe' );

		}

	}

	MNU.xDown = null;
	MNU.yDown = null;

};



MNU.toggleNavLeft = function() {

	const width = getComputedStyle(document.documentElement).getPropertyValue( '--mnu-width' ).trim();

	//console.log( 'width', width );
	//console.log( 'navMenu.style.width', navMenu.style.width );

	if ( navMenu.style.width === "0px" ) { // invisible

		navMenu.style.width = width;
		navMenu.style.padding = '1rem';
		butHamburger.style.left = 'var( --mnu-width )';
		divContainer.style.marginLeft = width;

	} else {

		navMenu.style.width = "0px";
		navMenu.style.padding = '0';
		butHamburger.style.left = '-3rem';
		divContainer.style.marginLeft = "0px";

	}

};