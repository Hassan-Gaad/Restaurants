//ENG:Aya 

var Data = new XMLHttpRequest();
var js;
Data.open("GET", "restaurants.json");
Data.send();
Data.onreadystatechange = function () {
    if (Data.readyState == 4) {
        if (Data.status == 200) {
            //    console.log(Data.response)
            js = JSON.parse(Data.response)
            //    console.log(js);
            // getNames();
            searchCateg();
            getCategories();
            getURl();
            getRestaurantsState()
            //   modify()
        }
    }
}

// function getNames() {
//     var names = [];
//     for (var i = 0; i < js["businesses"].length; i++) {
//         names.push(js["businesses"][i].name)
//     }
//     return names;
// }

function getCategories() {
    var categories = []
    for (var i = 0; i < js["businesses"].length; i++) {
        var length = js["businesses"][i].categories.length;
        //  console.log(length)
        for (var j = 0; j < length; j++) {
            categories.push(js["businesses"][i].categories[j].title);
        }
    }

    return categories;

}


function getURl() {
    var URLs = [];
    for (var i = 0; i < js["businesses"].length; i++) {

        URLs.push(js["businesses"][i].image_url);
    }
    return URLs;
}


function getRestaurantsState() {
    var state = [];
    for (var i = 0; i < js["businesses"].length; i++) {

        state.push(js["businesses"][i].is_closed);
    }
    return state;
}



function getCategory(name) {
    var obj = []
    for (var i = 0; i < js["businesses"].length; i++) {
        var length = js["businesses"][i].categories.length;
        for (var j = 0; j < length; j++) {
            var val = js["businesses"][i].categories[j].title;
            if (val == name) {
                obj.push(js["businesses"][i].image_url);

            }
        }
    }
    return obj;
}



function getName(name) {
    var obj = []
    for (var i = 0; i < js["businesses"].length; i++) {
        var length = js["businesses"][i].categories.length;
        for (var j = 0; j < length; j++) {
            var val = js["businesses"][i].categories[j].title;
            if (val == name) {
                obj.push(js["businesses"][i].name);

            }
        }
    }
    return obj;
}


function searchCateg() {
    
    var val = document.getElementById("textinp").value;
    var x = getCategory(val)
    var y = getName(val)
    document.getElementById("imgContaineer1").innerHTML = "";
    console.log(y)

    for (var j = 0; j < x.length; j++) {
        var con = document.createElement("div")
        con.setAttribute("class", "container")
        document.getElementById("imgContaineer1").appendChild(con);

        var im = document.createElement("img");
        im.setAttribute("class", "p1");
        im.setAttribute("src", getCategory(val)[j]);
        document.getElementsByClassName("container")[j].appendChild(im)
        var imgdom = document.getElementsByClassName("p1")[j];

        var d = document.createElement("H2");
        var s = document.createTextNode(y[j])
        console.log(y[j])
        d.setAttribute("class", "hh")
        d.appendChild(s)
        document.getElementsByClassName("container")[j].appendChild(d)

        
        
    }
    document.getElementById("button2").addEventListener('click', function () {
            localStorage.setItem("categName", val);
            location.assign("listPage.html");
        })
}

// document.querySelectorAll("img.p1")[0].addEventListener("click",function () {
//     localStorage.setItem("id", js["businesses"][0].id);
//     location.assign("detailsPage.html");
//     console.log("img clicked");
// })

function drobSearch(e) {
    var val = e;
    var x = getCategory(val)
    var y = getName(val)
    document.getElementById("imgContaineer1").innerHTML = "";
    console.log(y)
    console.log(val)

    for (var j = 0; j < x.length; j++) {
        var con = document.createElement("div")
        con.setAttribute("class", "container")
        document.getElementById("imgContaineer1").appendChild(con);

        var im = document.createElement("img");
        im.setAttribute("class", "p1");
        im.setAttribute("src", getCategory(val)[j]);
        document.getElementsByClassName("container")[j].appendChild(im)
        var imgdom = document.getElementsByClassName("p1")[j];

        var d = document.createElement("H2");
        var s = document.createTextNode(y[j])
        console.log(y[j])
        d.setAttribute("class", "hh")
        d.appendChild(s)
        document.getElementsByClassName("container")[j].appendChild(d)


        document.getElementById("button2").addEventListener('click', function () {
            localStorage.setItem("categName", val)
        });
        //        location.assign("listPage.html")
    }
}






document.getElementById("button2").addEventListener("click", function () {
    console.log(document.getElementById("textinp").value)
    if(document.getElementById("textinp").value!='') {
        localStorage.setItem("categName", document.getElementById("textinp").value)
        console.log(document.getElementById("textinp").value)
        location.assign("listPage.html")
    }
})

function imgbutton(e) {
    console.log(e)
}