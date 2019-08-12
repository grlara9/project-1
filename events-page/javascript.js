var userinput;
var lat;
var lon;
$("#textvalue").on("click", function(){
    
    lat="";
    lon="";
    userinput =$("input[name=result]").val();
 
    var queryGeocode=`https://api.opencagedata.com/geocode/v1/json?q=${userinput}&key=7c9ae9785053408784b370be9cf66a25`;
    $.ajax({
        url: queryGeocode,
        method: "GET"
    }).then(function(response){
        lat = response.results[0].geometry.lat;
         lon=response.results[0].geometry.lng;
        queryHike(lat, lon);
    })
})

function queryHike(lat, lon){
    console.log(lat+ " " + lon);
    var queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=200550383-78018ae21d3b2e37498e9606c754ff70`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var name=response.trails[0].name;
        
        var n=$("<p>").html("<h1>Name: " + name + "</h1>");
        
        $("#name").append(n);
        
        var loc=response.trails[0].location;
        var location=$("<p>").html("<h2>Location: " + loc + "</h2>");
        $("#loc").append(location);
        
        var sum=response.trails[0].summary;
        var summary=$("<p>").html(sum);
        $("#summary").append(summary);
        
        var img=response.trails[0].imgMedium;
        var image=$("<img>");
        image.attr("src", img);
        image.attr("alt", "Trails pictures");
        image.attr("width", 300);
        image.attr("height", 200);
        $("#image").append(image);
        
        var url = response.trails[0].url;
        var i = $("<a>");
        i.attr("href", url);
        i.append(url);
        $("#url").append(i);
        
    });
}