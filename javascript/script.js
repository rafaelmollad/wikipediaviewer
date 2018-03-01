var xhttp = new XMLHttpRequest();
const BASE_ENDPOINT = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
var keyword = "";

xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var jsonText = JSON.parse(xhttp.responseText);


		console.log(jsonText);
		console.log(jsonText.query.search.length);
		console.log(jsonText.query.search[1].snippet);

		// Number of objects retrieved by the query
		var numberOfObjects = jsonText.query.search.length;


		// If there are h1 elements inside '#search-results'
		// remove all of them because we're about to add new content to it
		while (document.getElementById("search-results").firstChild) {
			document.getElementById("search-results").removeChild(document.getElementById("search-results").firstChild);
		}

		// For each snippet in the query result, create a h1 element
		// then add the snippet to the h1 elements
		// and finally append these elements inside the '#search-results'
		for (i = 0; i < numberOfObjects; i++) {
			var node = document.createElement("H1");
			node.innerHTML = jsonText.query.search[i].snippet;
			document.getElementById("search-results").appendChild(node).classList.add("snippet");
		}

	}	
}

// Add event listener to search button so that
// we can get the keyword entered by the user
document.getElementById("search-button").addEventListener("click", function() {
	console.log(document.getElementById("form-input").value);
	keyword = document.getElementById("form-input").value;
	console.log(keyword.trim().length);

	// Format endpoint ONLY IF the keyword entered has at least one character
	// We use the trim function to remove white spaces at the beginning and/or end of the keyword
	if (keyword.trim().length > 0) {
		formatEndpoint(keyword);
	}

});


function makeRequest(endpoint) {
	xhttp.open("GET", endpoint, true);
	xhttp.send();
}

function formatEndpoint(keyword) {
	makeRequest(BASE_ENDPOINT + keyword);
}