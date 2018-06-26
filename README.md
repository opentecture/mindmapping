<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/ "View file as a web page." ) </span>

<div><input type="button" onclick=window.location.href="https://github.com/opentecture/mindmapping/blob/README.md"
 value="You are now in a GitHub web page view - Click this button to view this read me file as source code" /></div>

# [Mindmapping Read Me]( https://opentecture.github.io/mindmapping#README.md )


<iframe src=https://opentecture.github.io/mindmapping/mindmap-3d/r5/mindmap3d.html width=100% height=500px ></iframe>

<span style="display: none" >Iframes are not viewable in GitHub source code view</span>

## [Mindmap 3D R5]( https://opentecture.github.io/mindmapping/mindmap-3d/r5/mindmap3d.html )

* Better positiong
* Open. edit and save data
* Add new elements


## [Mindmap 3D R4]( https://opentecture.github.io/mindmapping/mindmap-3d/r4/mindmap-3d.html )


* Very different approach from R3
* Items can be anywhere in 3D space
	* Item positions are editable (albeit with a number of deficiencies )
* Cubes have been replaced with sample SVG files
	* Issue: each SVG is loaded from file each time it's used
	* Animals to be replaced with logos of other similar symbology
* Switch over to trackball controller allows more flexible 3D rotations

## [Mindmap 3D R3]( https://opentecture.github.io/mindmapping/mindmap-3d/r3/mindmap-3d.html )

* Add placards with vendor name and product.
* Add more fields
* Add text entry
	* links to web sites
	* A bit more text about each vendor
* Add file open and file save
* Add second data file
	* Data points for energy analysis apps (random positions for now)

## [Mindmap 3D R2]( https://opentecture.github.io/mindmapping/mindmap-3d/r2/mindmap-3d.html )

* Very different approach from R1
* Based on [Three.js Voxel Painter]( https://threejs.org/examples/#webgl_interactive_voxelpainter )
* Loads data from [Mindmap-3D.json]( mindmap-3d/r2/mindmap-3d.json )
* Applies random images to cubes / will eventually be vendor favicons
* As you mouseover a cube, its associated text data appears in the menu


## [Mindmap 3D R1]( https://opentecture.github.io/mindmapping/mindmap-3d/mindmap-3d-1.html )

* First pass at using CSS2DRenderer.js
* Pretty much a fail as could not get it working with orbit controls
* 2018-06-02 ~ Got it working. just don't add renderer to controls

## [CSS32D]( https://opentecture.github.io/mindmapping/css2d/index.html )

* A fork from [Three.js examples]( https://threejs.org/examples/ )
* The mixture of 3D models along with 2D HTML text in a single scene spurred the idea for a 3D [mindmap]( https://en.wikipedia.org/wiki/Mind_map )


## Wish list

* Sliding menu - so works on phone
* Auto-rotate
* Coming next with UI:
	* Adding data to new cubes / saving data to file for reuse
	* Polylines between data points
* Coming next with the data
	* Data points for file types
	* Data points for viewers

## Links of Interest


An introduction to Wardley (Value Chain) Mapping
* https://blog.gardeviance.org/2015/02/an-introduction-to-wardley-value-chain.html

MindMads that are geared up to display Wardley Maps
* Editable by a casual user
* Nodes that look and feel like real things
	* Easy to import and add SVG files
* A multitude of ways of showing the many links and connections between nodes
* Nodes have links to user editable Markdown files
* Noveds can be moved anywhere in 3D space and grouped in a variety of ways
* Nodes can be of different types: people, apps, formats




Data used in mindmaps sourced from
* http://gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML

https://stackoverflow.com/questions/45419929/three-js-drag-and-drop-on-touch-devices-not-working-three-dragcontrols

## Change Log

### 2018-06-11 ~ Theo

MindMap3D R5

### 2018-06-02 ~ Theo

Mindmap 3D R3
* See notes above

### 2018-05-31 ~ Theo

* Added file viewer
* Moved and renamed CSS2D files
* Added Mindmap 3D R2
* Added read me files

### 2018-05-31 ~ Theo

* First commit
* Mindmap R1

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>


### Code Style References

* https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2
* https://validator.w3.org/#validate_by_input
* http://jshint.com/
* https://zz85.github.io/mrdoobapproves/
