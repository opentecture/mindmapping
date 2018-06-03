# Changelog

## [Mindmap 3D R3]( https://rawgit.com/opentecture/mindmapping/master/mindmap-3d/r3/mindmap-3d.html )

* Add placards with vendor name and product.
* Add more fields
* Add text entry
	* links to web sites
	* A bit more text about each vendor
* Add file open and file save
* Add second data file
	* Data points for energy analysis apps (random positions for now)

## [Mindmap 3D R2]( https://rawgit.com/opentecture/mindmapping/master/mindmap-3d/r2/mindmap-3d.html )

* Very different approach from R1
* Based on [Three.js Voxel Painter]( https://threejs.org/examples/#webgl_interactive_voxelpainter )
* Loads data from [Mindmap-3D.json]( mindmap-3d/r2/mindmap-3d.json )
* Applies random images to cubes / will eventually be vendor favicons
* As you mouseover a cube, its associated text data appears in the menu

## [Mindmap 3D R1]( https://rawgit.com/opentecture/mindmapping/master/mindmap-3d/mindmap-3d-1.html )

* First pass at using CSS2DRenderer.js
* Pretty much a fail as could not get it working with orbit controls
* 2018-06-02 ~ Got it working. just don't add renderer to controls

## [CSS32D]( https://rawgit.com/opentecture/mindmapping/master/css2d/index.html )

* A fork from [Three.js examples]( https://threejs.org/examples/ )
* The mixture of 3D models along with 2D HTML text in a single scene spurred the idea for a 3D [mindmap]( https://en.wikipedia.org/wiki/Mind_map )
