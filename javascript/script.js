var xhttp = new XMLHttpRequest();
const BASE_ENDPOINT = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
var keyword = "";

xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var jsonText = JSON.parse(xhttp.responseText);


		console.log(jsonText);
		console.log(jsonText.query.search.length);
		console.log(jsonText.query.search[1].snippet);
		document.getElementById("description").innerHTML = jsonText.query.search[1].snippet;
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