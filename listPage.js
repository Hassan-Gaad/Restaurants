var category = localStorage.getItem("categName");
var ele = document.getElementsByClassName("list_container");
var js;
var Data = new XMLHttpRequest();
Data.open("GET", "restaurants.json");
Data.send(category);
Data.onreadystatechange = function () {
    if (Data.readyState == 4) {
        if (Data.status == 200) {
            js = JSON.parse(Data.responseText)
            getObj(category)
        }
    }
}
function getObj(name) {
    var obj = {}
    for (var i = 0; i < js["businesses"].length; i++) {
        var length = js["businesses"][i].categories.length;
        for (var j = 0; j < length; j++) {
            var val = js["businesses"][i].categories[j].title;
            if (val == name) {
                obj = js["businesses"][i];
                createElement(obj)
            }

        }

    }
    return obj;

}

function createElement(obj) {
    //creating outer div
    var div = document.createElement("div");
    ele[0].appendChild(div)
     div.setAttribute("id","outerdiv")
     //creating img
    var img = document.createElement("img");
    img.setAttribute("id","img")
    img.src = obj.image_url;
    //creating inner div
    var inner=document.createElement("div");
    inner.setAttribute("id","innerdiv")
    div.appendChild(inner);
    inner.appendChild(img)
    //create details div
    var details=document.createElement("div");
    div.appendChild(details);
   //add eventlistener
    div.addEventListener("mouseover", function () {
        this.style.opacity = 1;
    })
    div.addEventListener("mouseout", function () {
        this.style.opacity = 0.7;
    })
    //creat details 1th child
    var text=document.createElement("div");
    text.setAttribute("id","text")
    text.innerHTML=obj.name;
    details.appendChild(text);
    //create details 2th child
    var address=document.createElement("div");
    address.setAttribute("id","address")
    address.innerHTML="Address :"+obj.location.address1
    details.appendChild(address)
    //create details 3th div
    var phone=document.createElement("div");
    var title=document.createElement("span")
    phone.setAttribute("id","phone")
    phone.innerHTML="Phone :"+obj.phone;
    details.appendChild(phone);
    //add details 6th child
    var ratingDiv=document.createElement("div");
    details.appendChild(ratingDiv);
    ratingDiv.setAttribute("id","rating")
    var rating=document.createElement("i");
    var span=document.createElement("span");
    span.innerHTML=obj.rating+" ";
    rating.className="fa fa-star";
    ratingDiv.appendChild(span)
    ratingDiv.appendChild(rating);
    //cerate drtails 5th div
    var status=document.createElement("div");
    var s=document.createElement("i");
    s.className="fa fa-circle";
    var statustxt=document.createElement("span")
    statustxt.setAttribute("id","status")
    if(obj.is_closed===false){
        statustxt.innerHTML="closed"; 
        statustxt.style.color="red"
        s.style.color="red"
    }else{
        statustxt.innerHTML="open"; 
        statustxt.style.color="green"
        s.style.color="green"
    }
    details.appendChild(status);
    status.appendChild(s);
    s.appendChild(statustxt);
    //add event listener
    text.addEventListener("mouseover", function () {
        this.style.cursor=" pointer"; 
        this.style.color="orange";
        this.style.textDecoration="underline" ;
       })
   text.addEventListener("mouseout", function () {
        this.style.textDecoration="none"
        this.style.color="white";
    })
    //assign to 3th page
    text.addEventListener("click",function(){
        for(var i=0;i<js["businesses"].length; i++){
            if(js["businesses"][i].image_url == img.src){
                var object=js["businesses"][i];
                localStorage.setItem("id",object.id)
                 location.assign("detailsPage.html")
            }
        }
    })
    
}





