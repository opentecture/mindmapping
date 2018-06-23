<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping//#https://opentecture.github.io/mindmapping//connect-edit/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/opentecture/mindmapping/blob/master/connect-edit/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [Connect Edit Read Me]( #README.md )


<iframe src=https://opentecture.github.io/mindmapping/connect-edit/load-stl/load-stl-r1.html  width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## Concept

Given multiple nodes - objects of information - in 3D space, we need ways of creating, editing and displaying their logical but intangible connections

### [load stl r1]( https://opentecture.github.io/mindmapping/connect-edit/load-stl/load-stl-r1.html )

* Real-time 3D STL files in your browser
* Obtains list of files via GitHub API
	* Displays list of filenames in menu
* Click menu to load and view selected file


### [Multiple Movable Objects]( https://opentecture.github.io/mindmapping/master/connect-edit/multiple-movable-objects/multiple-movable-objects.html )

Can we have multiple random movable objects using the Three.js TransformControls. And, if so, is the complexity of the workflow at a low enough level to be usable.

This example indicates a positive response

* Draws 50 Three.js primitives
* Each primitive display the transform controls upon mouseover
* Textual data attached to the object is accessible upon mouseover and displayed in the left menu
* A button causes one-off not-smart arrows to be drawn from the objects to a rarget


### [Connect Edit R2]( https://opentecture.github.io/mindmapping//connect-edit/r2/connect-edit.html )

* Almost no  connection with R1. Solving different issues.

The problem/ the need is that every node needs to have character and be quickly recognizable. The SVG file used so far are large files that take a long time to load. And there's only a small number available.

So this demo uses bitmaps as textures applied to Three.js primitives. In order to build good demos, we need a good number of textures. This particular deo responds to a long-standing need: where can you get lots of textures online, for free, that load fast and have no licensing issues. The items on the left are GitHuB emoji icons - over 800 - the icons on the right are corporate logos - over 500 - used for link icons. The center bitmaps are 16 images that have been floating around my computer for a while.

* Loads 50 boxes on the left with Emoji icones
* Loads 4 cylinders in the middle
* Load 30 boxes on the right with SVG files
* Two buttons allow you to connect the left boxes to the center boxes and the right boxes to the center boxes
* You can also turn on rotation

The boxes are not editable and contain no text data. The dem is only about speed of loading lots of imags.



### [Connect Edit R1]( https://opentecture.github.io/mindmapping//connect-edit/r1/connect-edit.html )

* Creates
	* Two objects
	* Two control points
	* Three types of connecting spline
	* An object that may be moved but has no connections
* Mouseover displays name and position of currently selected object
* All objects may be moved in 3D space

## Links of Interest

* https://threejs.org/examples/?q=edit#webgl_geometry_spline_editor

PNG files
* https://github.com/iamcal/emoji-data
* https://github.com/HenrikJoreteg/emoji-images 64x64
* https://github.com/tmm1/emoji-extractor/tree/master/images/160x160 << 846 simple numbers 160x160 png
* https://github.com/iamcal/emoji-data/blob/master/img-messenger-128/1f1e8-1f1f4.png 128x128
* https://github.com/googlei18n/noto-emoji/blob/master/svg/emoji_u1f17f.svg << SVG
* https://github.com/googlei18n/noto-emoji/tree/master/png/128
* https://github.com/file-icons/source/tree/master/svg

### 2018-06-18 ~ Theo

* First commit


***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
