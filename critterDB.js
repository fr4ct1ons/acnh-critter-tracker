function CritterQuery(critterType, callBackFunction)
{
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
        callBackFunction(this.responseText);
        }
    };

    var url = "https://acnhapi.com/v1/";

    switch (critterType)
    {
        case 1:
            url += "fish";
            break;
        case 2:
            url += "bugs";
            break;
        case 3:
            url += "sea";
        break;
    }

    xhttp.open("GET", url, false);
    xhttp.send();
}

let selectedCritter;
let critterList;

function GetCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }



function GetCritters()
{
    selectedCritter = document.getElementById("selectedCritter");
    critterList = document.getElementById("critterList");
    var tempF = GetCookie("fishes");
    var tempB = GetCookie("bugs");
    var tempC = GetCookie("creatures");

    try {
        if(typeof tempF !== 'undefined')
            fishes = JSON.parse("[" + "0,1" + "]");

        if(typeof tempB !== 'undefined')
            bugs = JSON.parse("[" + tempB +"]");

        if(typeof tempC !== 'undefined')
            seaCreatures = JSON.parse("[" + tempC + "]");

    } catch (error) {
        console.log(error);
    }

    CritterQuery(1, _processFish);
    CritterQuery(2, _processBugs);
    CritterQuery(3, _processSea);
}

let fishes;
let bugs;
let seaCreatures;

let trackedCreatures = [];
let trackedFishes = [];
let trackedBugs = [];

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", 'Dec'];

let hemisphere = "northern";

function _processSea(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    seaCreatures = Object.values(obj);

    DrawSeaCreatures();
}

function DrawSeaCreatures()
{
    var critterDiv = document.getElementById("critterList");
    var now = new Date();

    for (let i = 0; i < seaCreatures.length; i++) {
        if(hemisphere == "northern")
        {
            if(!seaCreatures[i].availability["month-array-northern"].includes(now.getMonth() + 1))
            {
                continue;
            }
        }
        else
        {
            if(!seaCreatures[i].availability["month-array-southern"].includes(now.getMonth() + 1))
            {
                continue;
            }
        }
        if(!seaCreatures[i].availability["time-array"].includes(now.getMonth() + 1))
        {
            continue;
        }

        const element = seaCreatures[i];
        
        let card = document.createElement("button");
        let icon = document.createElement("img");
        icon.src = element.icon_uri;

        card.value = i;
        card.id = "scr_" + i;
        card.appendChild(icon);
        card.className = "critterCard seaCard";
        card.onclick = function() {SelectSeaCreature(i)};

        if(trackedCreatures.includes(i))
        {
            card.className += "Tracked";
            critterDiv.insertBefore(card, critterDiv.firstChild);
        }
        else
        {
            critterDiv.appendChild(card);
        }
        
        
    }
}

function _processBugs(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    bugs = Object.values(obj);
    DrawBugs();
}

function DrawBugs()
{
    var critterDiv = document.getElementById("critterList");
    var now = new Date();

    for (let i = 0; i < bugs.length; i++) {

        if(hemisphere == "northern")
        {
            if(!bugs[i].availability["month-array-northern"].includes(now.getMonth() + 1))
            {
                continue;
            }
        }
        else
        {
            if(!bugs[i].availability["month-array-southern"].includes(now.getMonth() + 1))
            {
                continue;
            }
        }

        if(!bugs[i].availability["time-array"].includes(now.getMonth() + 1))
        {
            continue;
        }
        const element = bugs[i];
        
        let card = document.createElement("button");
        let icon = document.createElement("img");
        icon.src = element.icon_uri;

        card.value = i;
        card.id = "bug_" + i;
        //card.innerHTML = element.name["name-USen"];
        card.appendChild(icon);
        card.className = "critterCard bugCard";
        card.onclick = function() {SelectBug(i)};

        if(trackedCreatures.includes(i))
        {
            card.className += "Tracked";
            critterDiv.insertBefore(card, critterDiv.firstChild);
        }
        else
        {
            critterDiv.appendChild(card);
        }


        
    }
}

function _processFish(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    fishes = Object.values(obj);
    DrawFishes();
}

function DrawFishes()
{
    var critterDiv = document.getElementById("critterList");
    var now = new Date();

    for (let i = 0; i < fishes.length; i++) {
        if(hemisphere == "northern")
        {
            if(!fishes[i].availability["month-array-northern"].includes(now.getMonth() + 1))
            {
                
                continue;
            }
        }
        else
        {
            if(!fishes[i].availability["month-array-southern"].includes(now.getMonth() + 1))
            {
                continue;
            }
        }
        
        if(!fishes[i].availability["time-array"].includes(now.getMonth() + 1))
        {
            continue;
        }

        const element = fishes[i];
        
        let card = document.createElement("button");
        let icon = document.createElement("img");
        icon.src = element.icon_uri;

        card.value = i;
        card.id="fsh_" + i;
        //card.innerHTML = element.name["name-USen"];
        card.appendChild(icon);
        card.className = "critterCard fishCard";
        card.onclick = function() {SelectFish(i)};

        if(trackedCreatures.includes(i))
        {
            card.className += "Tracked";
            critterDiv.insertBefore(card, critterDiv.firstChild);
        }
        else
        {
            critterDiv.appendChild(card);
        }

        
    }
}

function SelectFish(index)
{
    console.log(index);
    selectedCritter.innerHTML = '';
    var h1 = document.createElement("h1");
    var img = document.createElement("img");
    var price = document.createElement("p")
    var priceSpecial = document.createElement("p")

    img.src = fishes[index].image_uri;
    var name = fishes[index]["name"]["name-USen"];
    price.textContent = "Price:" + fishes[index].price
    priceSpecial.textContent = "C.J's price: " + fishes[index]["price-cj"];
    h1.textContent = name.charAt(0).toUpperCase() + name.slice(1);

    selectedCritter.appendChild(h1);
    selectedCritter.appendChild(img);
    selectedCritter.appendChild(price)
    selectedCritter.appendChild(priceSpecial)

    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    label.for = "TrackCritter";
    checkbox.type = "checkbox";
    checkbox.id = "trackCritter";
    checkbox.name="TrackCritter";

    label.textContent = "Track critter";
    checkbox.onchange= function() {TrackFish(index);}
    if(trackedFishes.includes(index))
    {
        checkbox.checked = true;
    }
    selectedCritter.appendChild(label);
    selectedCritter.appendChild(checkbox);
}

function TrackFish(index)
{
    let card = document.getElementById("fsh_" + index);

    if(!trackedFishes.includes(index))
    {
        trackedFishes.push(index);
        card.className += "Tracked";
        critterList.insertBefore(card, critterList.firstChild);
    }
    else
    {
        trackedFishes = trackedFishes.filter(function(item) {
            return item !== index;
        })
        card.className = "critterCard fishCard";
    }

    document.cookie = "fishes=" + trackedFishes.toString() + ";";
    console.log(trackedFishes.toString());
    console.log(document.cookie);
}

function SelectSeaCreature(index)
{
    console.log(index);
    selectedCritter.innerHTML = '';
    var h1 = document.createElement("h1");
    var img = document.createElement("img");
    var price = document.createElement("p")
    var priceSpecial = document.createElement("p")

    img.src = seaCreatures[index].image_uri;
    var name = seaCreatures[index]["name"]["name-USen"];
    price.textContent = "Price:" + seaCreatures[index].price
    h1.textContent = name.charAt(0).toUpperCase() + name.slice(1);



    selectedCritter.appendChild(h1);
    selectedCritter.appendChild(img);
    selectedCritter.appendChild(price)
    selectedCritter.appendChild(priceSpecial)

    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    label.for = "TrackCritter";
    checkbox.type = "checkbox";
    checkbox.id = "trackCritter";
    checkbox.name="TrackCritter";

    label.textContent = "Track critter";
    checkbox.onchange= function() {TrackCreature(index);}
    if(trackedCreatures.includes(index))
    {
        checkbox.checked = true;
    }
    selectedCritter.appendChild(label);
    selectedCritter.appendChild(checkbox);
}

function TrackCreature(index)
{
    let card = document.getElementById("scr_" + index);

    if(!trackedCreatures.includes(index))
    {
        trackedCreatures.push(index);
        card.className += "Tracked";
        critterList.insertBefore(card, critterList.firstChild);
    }
    else
    {
        trackedCreatures = trackedCreatures.filter(function(item) {
            return item !== index;
        })
        card.className = "critterCard seaCard";
    }
    

    document.cookie = "creatures=" + trackedCreatures.toString() + ";";
    console.log(trackedCreatures.toString());
    console.log(document.cookie);
}

function SelectBug(index)
{
    console.log(index);
    selectedCritter.innerHTML = '';
    var h1 = document.createElement("h1");
    var img = document.createElement("img");
    var price = document.createElement("p")
    var priceSpecial = document.createElement("p")

    img.src = bugs[index].image_uri;
    var name = bugs[index]["name"]["name-USen"];
    price.textContent = "Price:" + bugs[index].price
    priceSpecial.textContent = "Flick's price: " + bugs[index]["price-flick"];
    h1.textContent = name.charAt(0).toUpperCase() + name.slice(1);

    selectedCritter.appendChild(h1);
    selectedCritter.appendChild(img);
    selectedCritter.appendChild(price)
    selectedCritter.appendChild(priceSpecial)

    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    label.for = "TrackCritter";
    checkbox.type = "checkbox";
    checkbox.id = "trackCritter";
    checkbox.name="TrackCritter";

    label.textContent = "Track critter";
    checkbox.onchange= function() {TrackBug(index);}
    if(trackedBugs.includes(index))
    {
        checkbox.checked = true;
    }
    selectedCritter.appendChild(label);
    selectedCritter.appendChild(checkbox);
}

function TrackBug(index)
{
    let card = document.getElementById("bug_" + index);

    if(!trackedBugs.includes(index))
    {
        trackedBugs.push(index);
        card.className += "Tracked";
        critterList.insertBefore(card, critterList.firstChild);
    }
    else
    {
        trackedBugs = trackedBugs.filter(function(item) {
            return item !== index;
        })
        card.className = "critterCard bugCard";
    }
    

    document.cookie = "bugs=" + trackedBugs.toString() + ";";
    console.log(trackedBugs.toString());
    console.log(document.cookie);
}

function ChangeHemisphere()
{
    var value = document.getElementById("hemisphereSelect").value;

    var critterDiv = document.getElementById("critterList");
    critterDiv.innerHTML = "";

    hemisphere = value;

    DrawFishes();
    DrawBugs();
    DrawSeaCreatures();
}