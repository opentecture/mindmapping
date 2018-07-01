<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/#graphql-3d/README.md "View file as a web page." ) </span>


<div><input type=button onclick="window.location.href='https://github.com/opentecture/mindmapping/tree/master/graphql-3d'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [GraphQL 3D Read Me]( #README.md )


<iframe src=https://opentecture.github.io/mindmapping/graphql-3d/graphql-3d-r4.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## Full Screen: [graphQL 3D R4]( https://opentecture.github.io/mindmapping/graphql-3d/graphql-3d-r4.html )



## Concept

You want to

* Visualize and query various remote static data sets on the web in 3D
* 'Tween' the data into various before and after positions
* View associated text data and be able to click on any available links in that data
* Add, edit and save overrides and/or additional data alongside the given data
* Any remote data is refreshed at with a page reload

### Augmented Reality and Augmented 3D

* You want to be able to look at any component in a building or its model and visualize many its aspects such as
	* Building codes
	* Warrantees for the photovoltaic
	* Catalog numbers of the windows
	* Design intents
	* CAD parameters
	* Repair records
	* Kilowatt hours require in December
	* The music currently be streamed to adjacent space

You want to be able to see the output by pointing your mobile device at the building and/or clicking on a 3D model of the building.


### Textual data represented in 3D

There's a multitude of static text data on the web - goodly portions of which offer greats insights when graphed in 2D or 3D


### Assemblies and components

The assembly and disassembly of a number of components into a finished assembly as visualized in 3D is a relatively unexplored territory

The traditional methods - large sheets of paper with numerous numbered drawings - requires expert drawing capabilities and extensive project management in order to produce

### Problems associated traditional methods

The 'traditional' approach is to grab all the data and suck it into a database. This very often requires a person knowledgeable in setting up databases. This may also require setting up a server and initiating processes that cost money and are not open source.

Data may be comprised of small data sets from a variety of sources. Massaging the data so that it all mixes nicly may be more trouble than it's worth.

## Road Map

* Add data to existing from here
	* https://en.wikipedia.org/wiki/Comparison_of_computer-aided_design_editors
* Build 3D Periodic Table

## Issues

Not working on mobile devices

Possible fixes here:

* https://discourse.threejs.org/t/drag-and-drop-on-touch-devices-not-working-three-dragcontrols/671/5
* https://github.com/PiusNyakoojo/SwipeControls/blob/master/SwipeControls.js

## Links of Interest / Graphing Knowledge

What's out there that we want to meet or exceed?


### Mind Maps
* https://en.wikipedia.org/wiki/Mind_map
> A mind map is a diagram used to visually organize information. A mind map is hierarchical and shows relationships among pieces of the whole.[1] It is often created around a single concept, drawn as an image in the center of a blank page, to which associated representations of ideas such as images, words and parts of words are added. Major ideas are connected directly to the central concept, and other ideas branch out from those.

* https://www.mindmeister.com/content/features
* http://www.mindmapping.com/
* https://www.mindjet.com/blog/2009/05/the-10-basic-parts-to-a-mind-map/
* https://imindmap.com/software/features/
* http://mindmappingsoftwareblog.com/5-essential-features-you-should-look-for-when-buying-mind-mapping-software/
* https://www.mindmup.com/tutorials/index.html
* https://www.google.com/search?q=mind+map+features&rlz=1C1GCEA_enUS752US752&tbm=isch&tbo=u

Note: Examples mostly always show a single central node. Can we have fun with multiple node groups?


### GraphQL

Mind maps expressed in a different way

* https://graphql.org/
> GraphQL provides a complete and understandable description of the data in your API,

* https://en.wikipedia.org/wiki/GraphQL
> GraphQL is a data query language developed internally by Facebook in 2012 before being publicly released in 2015. It provides an alternative to REST and ad-hoc web service architectures. It allows clients to define the structure of the data required, and exactly the same structure of the data is returned from the server. It is a strongly typed runtime which allows clients to dictate what data is needed, therefore preventing excessively large amounts of data being returned.

* https://github.com/facebook/graphql
* https://github.com/APIs-guru/graphql-apis
* https://dev-blog.apollodata.com/the-concepts-of-graphql-bc68bd819be3

Have you ever noticed that you very rarely see a graph when you read about GraphQL. Can we change that?

### Xanadu / Ted Nelson

* https://en.wikipedia.org/wiki/Ted_Nelson
* https://en.wikipedia.org/wiki/Project_Xanadu

> Original 17 rules
1. Every Xanadu server is uniquely and securely identified.
2. Every Xanadu server can be operated independently or in a network.
3. Every user is uniquely and securely identified.
4. Every user can search, retrieve, create and store documents.
5. Every document can consist of any number of parts each of which may be of any data type.
6. Every document can contain links of any type including virtual copies ("transclusions") to any other document in the system accessible to its owner.
7. Links are visible and can be followed from all endpoints.
8. Permission to link to a document is explicitly granted by the act of publication.
9. Every document can contain a royalty mechanism at any desired degree of granularity to ensure payment on any portion accessed, including virtual copies ("transclusions") of all or part of the document.
10. Every document is uniquely and securely identified.
11. Every document can have secure access controls.
12. Every document can be rapidly searched, stored and retrieved without user knowledge of where it is physically stored.
13. Every document is automatically moved to physical storage appropriate to its frequency of access from any given location.
14. Every document is automatically stored redundantly to maintain availability even in case of a disaster.
15. Every Xanadu service provider can charge their users at any rate they choose for the storage, retrieval and publishing of documents.
16. Every transaction is secure and auditable only by the parties to that transaction.
17. The Xanadu client–server communication protocol is an openly published standard. Third-party software development and integration is encouraged.

* http://ted.hyperland.com/


### More

* https://en.wikipedia.org/wiki/Ontology_(information_science)


## Test Applications

If our effort is to be useful then it should be able to display existing data sets in newly meaningful and informative ways.

The following are links to possible test case ideas


### gbXML Product List

In the beginning we should probably be kicking this one around

* http://gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML
* https://github.com/opentecture/mindmapping/blob/master/data/mindmap-3d-3.json

### Wardley Maps

Is there data for Wardley map in reproducible digital format

* http://wardleypedia.org/mediawiki/index.php/Wardleypedia
* https://medium.com/wardleymaps/on-being-lost-2ef5f05eb1ec
* https://medium.com/wardleymaps
* https://github.com/LeadingEdgeForum/atlas2
	* https://atlas2.wardleymaps.com/

### A Pattern Language

The book includes 253 patterns along with their links to each other, diagrams and more

* https://en.wikipedia.org/wiki/A_Pattern_Language
* https://www.amazon.com/Pattern-Language-Buildings-Construction-Environmental/dp/0195019199
* http://library.uniteddiversity.coop/Ecological_Building/A_Pattern_Language.pdf
* https://archive.org/details/APatternLanguage
* http://caper.ws/patterns/

### Periodic Table

Might be a good place to start

* https://en.wikipedia.org/wiki/Periodic_table
	* A variety of versions available apart from Mendelev's version
* https://www.google.com/search?q=periodic+table&rlz=1C1GCEA_enUS752US752&source=lnms&tbm=isch&sa=X
* 3D: https://www.google.com/search?q=periodic+table+3d&rlz=1C1GCEA_enUS752US752&tbm=isch&tbo=u&source=univ&sa=X


#### Russell's version

* https://en.wikipedia.org/wiki/Walter_Russell
* https://www.google.com/search?q=walter+russell+periodic+table&rlz=1C1GCEA_enUS752US752&tbm=isch&tbo=u&source=univ&sa=X
	* Wow, so many versions
* https://www.quora.com/Why-was-Walter-Russells-version-of-the-periodic-table-not-adopted-by-chemists


### Lego Projects

* http://www.instructables.com/id/3D-Pacman-ghosts/
* https://www.lego.com/biassets/bi/6146259.pdf


### Ikea Product Assembly / Moving Manual Projects

* https://jaanga.github.io/moving-manuals/


### Opentecture Projects

* Coming soon


Data used in demos sourced from
* http://gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML


## Change Log


### 2018-06-28 ~ Theo

R2

### 2018-06-27 ~ Theo

* First commit

***
# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
