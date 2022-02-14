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

function GetCritters()
{
    selectedCritter = document.getElementById("selectedCritter");

    CritterQuery(1, _processFish);
    CritterQuery(2, _processBugs);
    CritterQuery(3, _processSea);
}

let fishes;
let bugs;
let seaCreatures;


let hemisphere = "northern";

function _processSea(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    console.log(Object.values(obj));
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
        card.appendChild(icon);
        card.className = "critterCard seaCard";
        card.onclick = function() {SelectFish(i)};
        critterDiv.appendChild(card);
    }
}

function _processBugs(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    console.log(Object.values(obj));
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
        //card.innerHTML = element.name["name-USen"];
        card.appendChild(icon);
        card.className = "critterCard bugCard";
        card.onclick = function() {SelectBug(i)};
        critterDiv.appendChild(card);
    }
}

function _processFish(data)
{
    obj = JSON.parse(data);
    //list = obj.map(item => {
        //return item;
    //})
    console.log(Object.values(obj));
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
        //card.innerHTML = element.name["name-USen"];
        card.appendChild(icon);
        card.className = "critterCard fishCard";
        card.onclick = function() {SelectFish(i)};
        critterDiv.appendChild(card);
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