/*	Binary Search AutoComplete
	@date: mar 31, 2019 
	@author jingwen qiang */





/*********************************************************************************
This section is UI functions that activates from the user input.
*********************************************************************************/

	var inputField;  
	var popUpStatus;
	var autocompleteUl;

/*******************************
CALLBACK WHEN INPUT
********************************/



		/*Callback function for user event*/
		function keyupHandler(){
			initVars();  

			if(inputField.value.length > 0){
				// when input not null, we store all matches in an arraylist
				var result = allMatches(inputField.value);


				 if(result.length>0){  // if there are matches, show result in UI
				 	setLists(result);
				 }  
				 	// if no matches, clear popup box 
				 	else clearDiv();
			}else clearDiv();  // clear popup box if there is no input

		}


/*******************************
HELPER FUNCTIONS
********************************/

/*Initialize Variables*/
function initVars(){
	inputField = document.forms["myForm1"].cityinput;
	popUpStatus = document.getElementById("popup");
	autocompleteUl = document.getElementById("cities_ul");
}


/*Clear Contents*/		
function clearDiv(){
			//clear content
			for(var i = autocompleteUl.childNodes.length - 1 ; i >= 0 ; i-- )
				autocompleteUl.removeChild(autocompleteUl.childNodes[i]);
			popUpStatus.className = "hide" ;
		}



		/*Show the prompt box with the autocomplete result*/		
		function setLists(result){
			clearDiv();  // every time we input a new character/string, we clear the result first
			popUpStatus.className = "show" ;
			var oLi ;    // create a new ordered list
			for(var i = 0 ; i < result.length ; i++ ){
				//show result
				oLi = document.createElement("li");
				autocompleteUl.appendChild(oLi);
				oLi.appendChild(document.createTextNode(result[i]));
				
				oLi.onmouseover = function(){
					this.className = "mouseOver" ;  //highlight when mouseover
				}
				oLi.onmouseout = function(){
					this.className = "mouseOut" ;   //retrieve when mouseout
				}
				oLi.onclick = function(){
					// when the user clicks, we autocomplete that element to user's input box
					inputField.value = this.firstChild.nodeValue;
					clearDiv(); 
				}
			}
		}














/*****************************************************************************************************
		algorithm goes here

		General idea: 
		1.customize a algorithm that compares to strings with a given length.
		2.Use binary search to find the first and last matching index of the input string (inputField)
		3.Generate a new list of arrays.

******************************************************************************************************/


/*******************************
COMPARING RECORDS 
********************************/

/*	Compares the two terms in lexicographic order 
	but using only the first r characters of each query.*/
function byPrefixOrder(s1,s2,r){

	var minlen =s1.length<s2.length ? s1.length : s2.length;
	if (minlen>=r) return s1.substring(0, r).toLowerCase().localeCompare(s2.substring(0,r).toLowerCase());
	else if (s1.substring(0, minlen).toLowerCase()===s2.substring(0, minlen).toLowerCase()) {
		if (s1.length === minlen) return -1;
		else return 1;
	}else return s1.substring(0,minlen).toLowerCase().localeCompare(s2.substring(0,minlen).toLowerCase());

}

/*	Compares the two terms in descending order by weight.
	Has not added the weight elements yet *************/
function byReverseWeightOrder(w1,w2){
	if (w1<w2) return 1;
	else if (w1<w2) return 0;
	else return -1;
}




/*******************************
BINARY SEARCH FOR MATCHING 
********************************/

/*	Find the first matching index  
	Return -1 if there is no such key*/
function firstIndexOf(arr, inp){
	if (arr.length ==0) {
		return -1;
	}

	var left=0;
	var right = arr.length -1;
	var pt = -1;
	var first = -1;

			// first element is target
			if (byPrefixOrder(inp,arr[0],inp.length)==0){return 0;}

			while (left <=right) {
				var middle = parseInt(left + ((right-left)/2));

				if (byPrefixOrder(inp,arr[middle],inp.length)==0){
					pt = middle;
					break;
				}else if (byPrefixOrder(inp,arr[middle],inp.length)<0){
					right = middle -1;
				}
				else left = middle +1;
			}

			if (pt>=0){
				// search start point on the left side
				first=pt;
				while(first>=0 && byPrefixOrder(arr[first],arr[pt],inp.length)==0){
					first--;
				}
				return ++first;
			}


			return -1;
		}

		/*find the last matching index*/
		function lastIndexOf(arr, inp){
			if (arr.length ==0) {
				return -1;
			}

			var left=0;
			var right = arr.length -1;
			var pt = -1;
			var last = -1;



			while (left <=right) {
				var middle = parseInt(left + ((right-left)/2));

				if (byPrefixOrder(inp,arr[middle],inp.length)==0){
					pt = middle;
					break;
				}else if (byPrefixOrder(inp,arr[middle],inp.length)<0){
					right = middle -1;
				}
				else left = middle +1;
			}

			if (pt>=0){
				// search start point on the left side
				last=pt;
				while(last<arr.length && byPrefixOrder(arr[last],arr[pt],inp.length)==0){
					last++;
				}
				return --last;
			}


			return -1;
		}




/*******************************
OUTPUT MATCHING RESULT 
********************************/

// generate a new array that stores the matching result
function allMatches(inp){
	var result;
	var first = firstIndexOf(cities, inp);
	var last = lastIndexOf(cities, inp);

	result = cities.slice(first,last+1);
    	// Arrays.sort(result, Term.byReverseWeightOrder());
    	return result;
    }

















/*********************************************************************************
Data Section.
*********************************************************************************/

    var cities = ["Aberdeen", "Ada", "Adamsville", "Addyston", "Adelphi", "Adena", "Adrian", "Akron",
			"Albany", "Alexandria", "Alger", "Alledonia", "Alliance", "Alpha", "Alvada",
			"Alvordton", "Amanda", "Amelia", "Amesville", "Amherst", "Amlin", "Amsden",
			"Amsterdam", "Andover", "Anna", "Ansonia", "Antwerp", "Apple Creek", "Arcadia",
			"Arcanum", "Archbold", "Arlington", "Ashland", "Ashley", "Ashtabula", "Ashville",
			"Athens", "Attica", "Atwater", "Augusta", "Aurora", "Austinburg", "Ava", "Avon",
			"Avon Lake", "Bainbridge", "Bakersville", "Baltic", "Baltimore", "Bannock",
			"Barberton", "Barlow", "Barnesville", "Bartlett", "Barton", "Bascom", "Batavia",
			"Bath", "Bay Village", "Beach City", "Beachwood", "Beallsville", "Beaver",
			"Beaverdam", "Bedford", "Bellaire", "Bellbrook", "Belle Center", "Belle Valley",
			"Bellefontaine", "Bellevue", "Bellville", "Belmont", "Belmore", "Beloit", "Belpre",
			"Benton Ridge", "Bentonville", "Berea", "Bergholz", "Berkey", "Berlin",
			"Berlin Center", "Berlin Heights", "Bethel", "Bethesda", "Bettsville", "Beverly",
			"Bidwell", "Big Prairie", "Birmingham", "Blacklick", "Bladensburg", "Blaine",
			"Blakeslee", "Blanchester", "Blissfield", "Bloomdale", "Bloomingburg",
			"Bloomingdale", "Bloomville", "Blue Creek", "Blue Rock", "Bluffton",
			"Bolivar", "Botkins", "Bourneville", "Bowerston", "Bowersville",
			"Bowling Green", "Bradford", "Bradner", "Brady Lake", "Brecksville",
			"Bremen", "Brewster", "Brice", "Bridgeport", "Brilliant", "Brinkhaven",
			"Bristolville", "Broadview Heights", "Broadway", "Brookfield", "Brookpark",
			"Brookville", "Brownsville", "Brunswick", "Bryan", "Buchtel", "Buckeye Lake",
			"Buckland", "Bucyrus", "Buffalo", "Buford", "Burbank", "Burghill", "Burgoon",
			"Burkettsville", "Burton", "Butler", "Byesville", "Cable", "Cadiz", "Cairo",
			"Caldwell", "Caledonia", "Cambridge", "Camden", "Cameron", "Camp Dennison",
			"Campbell", "Canal Fulton", "Canal Winchester", "Canfield", "Canton", "Carbon Hill",
			"Carbondale", "Cardington", "Carey", "Carroll", "Carrollton", "Casstown",
			"Castalia", "Catawba", "Cecil", "Cedarville", "Celina", "Centerburg",
			"Chagrin Falls", "Chandlersville", "Chardon", "Charm", "Chatfield", "Chauncey",
			"Cherry Fork", "Chesapeake", "Cheshire", "Chester", "Chesterhill", "Chesterland",
			"Chesterville", "Chickasaw", "Chillicothe", "Chilo", "Chippewa Lake",
			"Christiansburg", "Cincinnati", "Circleville", "Clarington", "Clarksburg",
			"Clarksville", "Clay Center", "Clayton", "Cleveland", "Cleves", "Clifton",
			"Clinton", "Cloverdale", "Clyde", "Coal Run", "Coalton", "Coldwater", "Colerain",
			"College Corner", "Collins", "Collinsville", "Colton", "Columbia Station",
			"Columbiana", "Columbus", "Columbus Grove", "Commercial Point", "Conesville",
			"Conneaut", "Conover", "Continental", "Convoy", "Coolville", "Corning", "Cortland",
			"Coshocton", "Covington", "Creola", "Crestline", "Creston", "Crooksville",
			"Croton", "Crown City", "Cuba", "Cumberland", "Curtice", "Custar", "Cutler",
			"Cuyahoga Falls", "Cygnet", "Cynthiana", "Dalton", "Damascus", "Danville",
			"Dayton", "De Graff", "Decatur", "Deerfield", "Deersville", "Defiance",
			"Delaware", "Dellroy", "Delphos", "Delta", "Dennison", "Derby", "Derwent",
			"Deshler", "Dexter City", "Diamond", "Dillonvale", "Dola", "Donnelsville",
			"Dorset", "Dover", "Doylestown", "Dresden", "Dublin", "Dunbridge", "Duncan Falls",
			"Dundee", "Dunkirk", "Dupont", "East Claridon", "East Fultonham",
			"East Liberty", "East Liverpool", "East Palestine", "East Rochester",
			"East Sparta", "East Springfield", "Eastlake", "Eaton", "Edgerton", "Edison",
			"Edon", "Eldorado", "Elgin", "Elkton", "Ellsworth", "Elmore", "Elyria",
			"Empire", "Englewood", "Enon", "Etna", "Euclid", "Evansport", "Fairborn",
			"Fairfield", "Fairpoint", "Fairview", "Farmdale", "Farmer", "Farmersville",
			"Fayette", "Fayetteville", "Feesburg", "Felicity", "Findlay", "Flat Rock",
			"Fleming", "Fletcher", "Flushing", "Forest", "Fort Jennings", "Fort Loramie",
			"Fort Recovery", "Fostoria", "Fowler", "Frankfort", "Franklin",
			"Franklin Furnace", "Frazeysburg", "Fredericksburg", "Fredericktown",
			"Freeport", "Fremont", "Fresno", "Friendship", "Fulton", "Fultonham",
			"Galena", "Galion", "Gallipolis", "Galloway", "Gambier", "Garrettsville",
			"Gates Mills", "Geneva", "Genoa", "Georgetown", "Germantown", "Gettysburg",
			"Gibsonburg", "Girard", "Glandorf", "Glencoe", "Glenford", "Glenmont",
			"Glouster", "Gnadenhutten", "Gomer", "Goshen", "Grafton", "Grand Rapids",
			"Grand River", "Granville", "Gratiot", "Gratis", "Graysville", "Graytown",
			"Green", "Green Camp", "Green Springs", "Greenfield", "Greenford",
			"Greentown", "Greenville", "Greenwich", "Grelton", "Grove City",
			"Groveport", "Grover Hill", "Guysville", "Gypsum", "Hallsville",
			"Hamden", "Hamersville", "Hamilton", "Hamler", "Hammondsville",
			"Hannibal", "Hanoverton", "Harbor View", "Harlem Springs", "Harpster",
			"Harrisburg", "Harrison", "Harrisville", "Harrod", "Hartford", "Hartville",
			"Harveysburg", "Haskins", "Haverhill", "Haviland", "Haydenville", "Hayesville",
			"Heath", "Hebron", "Helena", "Hicksville", "Higginsport", "Highland", "Hilliard",
			"Hillsboro", "Hinckley", "Hiram", "Hockingport", "Holgate", "Holland",
			"Hollansburg", "Holloway", "Holmesville", "Homer", "Homerville", "Homeworth",
			"Hooven", "Hopedale", "Hopewell", "Houston", "Howard", "Hoytville", "Hubbard",
			"Hudson", "Huntsburg", "Huntsville", "Huron", "Iberia", "Independence",
			"Irondale", "Ironton", "Irwin", "Isle Saint George", "Jackson", "Jackson Center",
			"Jacksontown", "Jacksonville", "Jacobsburg", "Jamestown", "Jasper",
			"Jefferson", "Jeffersonville", "Jenera", "Jeromesville", "Jerry City",
			"Jerusalem", "Jewell", "Jewett", "Johnstown", "Junction City", "Kalida",
			"Kansas", "Keene", "Kelleys Island", "Kensington", "Kent", "Kenton",
			"Kerr", "Kettlersville", "Kidron", "Kilbourne", "Killbuck", "Kimbolton",
			"Kings Mills", "Kingston", "Kingsville", "Kinsman", "Kipling", "Kipton",
			"Kirby", "Kirkersville", "Kitts Hill", "Kunkle", "La Rue", "Lacarne",
			"Lafayette", "Lafferty", "Lagrange", "Laings", "Lake Milton", "Lakemore",
			"Lakeside Marblehead", "Lakeview", "Lakeville", "Lakewood", "Lancaster",
			"Langsville", "Lansing", "Latham", "Latty", "Laura", "Laurelville",
			"Leavittsburg", "Lebanon", "Lees Creek", "Leesburg", "Leesville",
			"Leetonia", "Leipsic", "Lemoyne", "Lewis Center", "Lewisburg",
			"Lewistown", "Lewisville", "Liberty Center", "Lima", "Limaville",
			"Lindsey", "Lisbon", "Litchfield", "Lithopolis", "Little Hocking",
			"Lockbourne", "Lodi", "Logan", "London", "Londonderry",
			"Long Bottom", "Lorain", "Lore City", "Loudonville", "Louisville",
			"Loveland", "Lowell", "Lowellville", "Lower Salem", "Lucas",
			"Lucasville", "Luckey", "Ludlow Falls", "Lynchburg", "Lynx",
			"Lyons", "Macedonia", "Macksburg", "Madison", "Magnetic Springs",
			"Magnolia", "Maineville", "Malaga", "Malinta", "Malta", "Malvern",
			"Manchester", "Mansfield", "Mantua", "Maple Heights", "Maplewood",
			"Marathon", "Marengo", "Maria Stein", "Marietta", "Marion",
			"Mark Center", "Marshallville", "Martel", "Martin", "Martins Ferry",
			"Martinsburg", "Martinsville", "Marysville", "Mason", "Massillon",
			"Masury", "Maumee", "Maximo", "Maynard", "Mc Arthur", "Mc Clure",
			"Mc Comb", "Mc Connelsville", "Mc Cutchenville", "Mc Dermott",
			"Mc Donald", "Mc Guffey", "Mechanicsburg", "Mechanicstown",
			"Medina", "Medway", "Melmore", "Melrose", "Mendon", "Mentor",
			"Mesopotamia", "Metamora", "Miamisburg", "Miamitown", "Miamiville",
			"Middle Bass", "Middle Point", "Middlebranch", "Middleburg",
			"Middlefield", "Middleport", "Middletown", "Midland", "Midvale",
			"Milan", "Milford", "Milford Center", "Millbury", "Milledgeville",
			"Miller City", "Millersburg", "Millersport", "Millfield",
			"Milton Center", "Mineral City", "Mineral Ridge", "Minerva",
			"Minford", "Mingo", "Mingo Junction", "Minster", "Mogadore",
			"Monclova", "Monroe", "Monroeville", "Montezuma", "Montpelier",
			"Montville", "Morral", "Morristown", "Morrow", "Moscow",
			"Mount Blanchard", "Mount Cory", "Mount Eaton", "Mount Gilead",
			"Mount Hope", "Mount Liberty", "Mount Orab", "Mount Perry",
			"Mount Pleasant", "Mount Saint Joseph", "Mount Sterling",
			"Mount Vernon", "Mount Victory", "Mowrystown", "Moxahala",
			"Munroe Falls", "Murray City", "Nankin", "Napoleon", "Nashport",
			"Nashville", "Navarre", "Neapolis", "Neffs", "Negley",
			"Nelsonville", "Nevada", "Neville", "New Albany", "New Athens",
			"New Bavaria", "New Bloomington", "New Bremen", "New Carlisle",
			"New Concord", "New Hampshire", "New Haven", "New Holland",
			"New Knoxville", "New Lebanon", "New Lexington", "New London",
			"New Madison", "New Marshfield", "New Matamoras", "New Middletown",
			"New Paris", "New Philadelphia", "New Plymouth", "New Richmond",
			"New Riegel", "New Rumley", "New Springfield", "New Straitsville",
			"New Vienna", "New Washington", "New Waterford", "New Weston",
			"Newark", "Newbury", "Newcomerstown", "Newport", "Newton Falls",
			"Newtonsville", "Ney", "Niles", "North Baltimore", "North Bend",
			"North Benton", "North Bloomfield", "North Fairfield",
			"North Georgetown", "North Hampton", "North Jackson",
			"North Kingsville", "North Lawrence", "North Lewisburg",
			"North Lima", "North Olmsted", "North Ridgeville", "North Robinson",
			"North Royalton", "North Star", "Northfield", "Northwood", "Norwalk",
			"Norwich", "Nova", "Novelty", "Oak Harbor", "Oak Hill", "Oakwood",
			"Oberlin", "Oceola", "Ohio City", "Okeana", "Okolona", "Old Fort",
			"Old Washington", "Olmsted Falls", "Ontario", "Orangeville",
			"Oregon", "Oregonia", "Orient", "Orrville", "Orwell", "Osgood",
			"Ostrander", "Ottawa", "Ottoville", "Otway", "Overpeck",
			"Owensville", "Oxford", "Painesville", "Palestine", "Pandora",
			"Paris", "Parkman", "Pataskala", "Patriot", "Paulding", "Payne",
			"Pedro", "Peebles", "Pemberton", "Pemberville", "Peninsula",
			"Perry", "Perrysburg", "Perrysville", "Petersburg", "Pettisville",
			"Phillipsburg", "Philo", "Pickerington", "Piedmont", "Pierpont",
			"Piketon", "Piney Fork", "Pioneer", "Piqua", "Pitsburg",
			"Plain City", "Plainfield", "Pleasant City", "Pleasant Hill",
			"Pleasant Plain", "Pleasantville", "Plymouth", "Polk",
			"Pomeroy", "Port Clinton", "Port Jefferson", "Port Washington",
			"Port William", "Portage", "Portland", "Portsmouth", "Potsdam",
			"Powell", "Powhatan Point", "Proctorville", "Prospect", "Put in Bay",
			"Quaker City", "Quincy", "Racine", "Radnor", "Randolph", "Rarden",
			"Ravenna", "Rawson", "Ray", "Rayland", "Raymond", "Reedsville",
			"Reesville", "Reno", "Republic", "Reynoldsburg", "Richfield",
			"Richmond", "Richmond Dale", "Richwood", "Ridgeville Corners",
			"Ridgeway", "Rio Grande", "Ripley", "Risingsun", "Rittman",
			"Robertsville", "Rock Camp", "Rock Creek", "Rockbridge", "Rockford",
			"Rocky Ridge", "Rocky River", "Rogers", "Rome", "Rootstown", "Roseville",
			"Rosewood", "Ross", "Rossburg", "Rossford", "Roundhead", "Rudolph",
			"Rushsylvania", "Rushville", "Russells Point", "Russellville", "Russia",
			"Rutland", "Sabina", "Saint Clairsville", "Saint Henry", "Saint Johns",
			"Saint Louisville", "Saint Marys", "Saint Paris", "Salem", "Salesville",
			"Salineville", "Sandusky", "Sandyville", "Sarahsville", "Sardinia",
			"Sardis", "Savannah", "Scio", "Scioto Furnace", "Scott", "Scottown",
			"Seaman", "Sebring", "Sedalia", "Senecaville", "Seven Mile", "Seville",
			"Shade", "Shadyside", "Shandon", "Sharon Center", "Sharpsburg",
			"Shauck", "Shawnee", "Sheffield Lake", "Shelby", "Sherrodsville",
			"Sherwood", "Shiloh", "Short Creek", "Shreve", "Sidney", "Sinking Spring",
			"Smithfield", "Smithville", "Solon", "Somerdale", "Somerset",
			"Somerville", "South Bloomingville", "South Charleston", "South Lebanon",
			"South Point", "South Salem", "South Solon", "South Vienna",
			"South Webster", "Southington", "Sparta", "Spencer", "Spencerville",
			"Spring Valley", "Springboro", "Springfield", "Stafford", "Sterling",
			"Steubenville", "Stewart", "Stillwater", "Stockdale", "Stockport",
			"Stone Creek", "Stony Ridge", "Stout", "Stoutsville", "Stow", "Strasburg",
			"Stratton", "Streetsboro", "Strongsville", "Struthers", "Stryker",
			"Sugar Grove", "Sugarcreek", "Sullivan", "Sulphur Springs", "Summerfield",
			"Summit Station", "Summitville", "Sunbury", "Swanton", "Sycamore",
			"Sycamore Valley", "Sylvania", "Syracuse", "Tallmadge", "Tarlton",
			"Terrace Park", "The Plains", "Thompson", "Thornville", "Thurman",
			"Thurston", "Tiffin", "Tiltonsville", "Tipp City", "Tippecanoe", "Tiro",
			"Toledo", "Tontogany", "Torch", "Toronto", "Tremont City", "Trenton",
			"Trimble", "Trinway", "Troy", "Tuppers Plains", "Tuscarawas", "Twinsburg",
			"Uhrichsville", "Union City", "Union Furnace", "Unionport", "Uniontown",
			"Unionville", "Unionville Center", "Uniopolis", "Upper Sandusky", "Urbana",
			"Utica", "Valley City", "Van Buren", "Van Wert", "Vandalia", "Vanlue",
			"Vaughnsville", "Venedocia", "Vermilion", "Verona", "Versailles",
			"Vickery", "Vienna", "Vincent", "Vinton", "Wadsworth", "Wakefield",
			"Wakeman", "Walbridge", "Waldo", "Walhonding", "Walnut Creek", "Wapakoneta",
			"Warnock", "Warren", "Warsaw", "Washington Court House",
			"Washingtonville", "Waterford", "Waterloo", "Watertown", "Waterville",
			"Wauseon", "Waverly", "Wayland", "Wayne", "Waynesburg", "Waynesfield",
			"Waynesville", "Wellington", "Wellston", "Wellsville", "West Alexandria",
			"West Chester", "West Elkton", "West Farmington", "West Jefferson",
			"West Lafayette", "West Liberty", "West Manchester", "West Mansfield",
			"West Millgrove", "West Milton", "West Point", "West Portsmouth",
			"West Rushville", "West Salem", "West Union", "West Unity", "Westerville",
			"Westfield Center", "Westlake", "Weston", "Westville", "Wharton",
			"Wheelersburg", "Whipple", "White Cottage", "Whitehouse", "Wickliffe",
			"Wilberforce", "Wilkesville", "Willard", "Williamsburg", "Williamsfield",
			"Williamsport", "Williamstown", "Williston", "Willoughby", "Willow Wood",
			"Willshire", "Wilmington", "Wilmot", "Winchester", "Windham", "Windsor",
			"Winesburg", "Wingett Run", "Winona", "Wolf Run", "Woodsfield",
			"Woodstock", "Woodville", "Wooster", "Wren", "Xenia", "Yellow Springs",
			"Yorkshire", "Yorkville", "Youngstown", "Zaleski", "Zanesfield", "Zanesville",
			"Zoar"];
	// sort
	cities.sort();

