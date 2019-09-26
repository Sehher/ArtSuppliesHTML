// const req = new XMLHttpRequest();
// req.open('GET', 'http://localhost:9000/products');
// req.onload = () => {
//const data = JSON.parse(req.response);
// console.log(data)
// document.getElementById("Name").innerHTML = data[0].name;
// document.getElementById("Category").innerHTML = data[0].category;
// document.getElementById("Description").innerHTML = data[0].description;

// function newProductEntries(table) {
//     let row = document.createElement("tr");
//     for (let i = 1; i < arguments.length; i++) {
//         let box = document.createElement("td");
//         box.innerHTML = arguments[i];
//         row.append(box);
//     }
//     table.append(row)
// }

// function load() {
//     const req = new XMLHttpRequest();
//     req.open('GET', 'http://localhost:9000/products');
//     req.onload = () => {
//         const data = JSON.parse(req.response);
//         console.log(data);
//         for (let i = 0; i < data.length; i++) {
//             let temp = data[i];
//             newproductEntries(table, temp["name"], temp["category"], temp["description"]);
//         }
//     }
//     req.send();
// }

function httpRequest(method, URL, callback, headers, body) {
    let request = new XMLHttpRequest();
    request.open(method, URL);
    request.onload = () => {
        callback(request);
    }
    for(let key in headers) {
        request.setRequestHeader(key, headers[key]);
    }    
    body ? request.send(body) : request.send(); 
}

function printCard(request) {
    let products = JSON.parse(request.response);
    let list = document.getElementById("cardList");
    list.innerHTML="";
    for(let product of products){
        let productElement = document.createElement("div");
        productElement.setAttribute("class", "card");

        let horizontalCard = document.createElement("div");
        horizontalCard.setAttribute("class","card-horizontal");

        let imageWrapper = document.createElement("div");
        imageWrapper.setAttribute("class","img-square-wrapper");

        let image = document.createElement("img");
        image.setAttribute("class", "productImage");
        image.src = product.imageUrl;

        imageWrapper.appendChild(image)

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body");

        let cardTitle = document.createElement("h4");
        cardTitle.innerText = product.name;

        let itemDescriptions = document.createElement("ul");
        itemDescriptions.setAttribute("class", "list-group");

        let category = document.createElement("li");
        category.setAttribute("class", "list-group-item");
        category.innerText = "ID: " + product.id + " - " + product.category;

        let description = document.createElement("li");
        description.setAttribute("class", "list-group-item");
        description.innerText = product.description;

        itemDescriptions.appendChild(category);
        itemDescriptions.appendChild(description);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(itemDescriptions);


        horizontalCard.appendChild(imageWrapper);
        horizontalCard.appendChild(cardBody);



        let cardFooter = document.createElement("div");
        cardFooter.setAttribute("class","card-footer");
        let button = document.createElement("button");
        button.type = "button";
        button.setAttribute("class", "btn btn-danger");
        button.setAttribute("onclick", "deleteProduct("+product.id+")")

        let p1 = document.createElement("p");
        p1.setAttribute("class", "added")
        p1.innerText = "Delete";

        button.appendChild(p1);
        cardFooter.appendChild(button);

        let button2 = document.createElement("button");
        button2.type = "button";
        button2.setAttribute("class", "btn btn-secondary");
        button2.setAttribute("data-toggle", "modal");
        button2.setAttribute("data-target","#editModal");
        let p = document.createElement("p");
        p.setAttribute("class", "update")
        p.innerText = "Edit Product";

        button2.appendChild(p);
        cardFooter.appendChild(button2);


        productElement.appendChild(horizontalCard);
        productElement.appendChild(cardFooter);
        list.appendChild(productElement);
    }
}

function getProducts(){
    let method = "GET";
    let URL = "http://localhost:9000/products";
    let callback = printCard;
    let headers = {
        "Content-Type": "application/json"
    }
    httpRequest(method, URL, callback, headers);
}

function deleteProduct(id){
    let method = "DELETE";
    let URL = "http://localhost:9000/products/"+id;
    let callback = getProducts;
    let headers = {
        "Content-Type": "application/json"
    }
    httpRequest(method, URL, callback, headers);
}


function createProduct(event){
    let form = event.target;
    
    let body = {}
    for(let input of form) {
        let key = input.name; 
        if (key == ""){
            continue;
        }
        let value = input.value;
        body[key] = value; 
    }
    //http://localhost:9000/products/
    let method = "POST";
    let URL = "http://34.89.69.35/products/";
    let callback = getProducts;
    let headers = {
        "Content-Type": "application/json"
    }

    httpRequest(method, URL, callback, headers, JSON.stringify(body));
    return false;
}

function updateProduct(event){

    let form = event.target;
    let body = {}
    let URL;
    for(let input of form) {
        let key = input.name; 
        if (key == ""){
            continue;
        }
        if (key == "productid"){
            URL = "http://localhost:9000/products/"+input.value;
            continue;
        }
        let value = input.value;
        body[key] = value; 
    }
    console.log(body);
    // let id = 4;
    let method = "PUT";
    //let URL = "http://localhost:9000/products/"+form.input.name.productid;
    let callback = getProducts;
    //console.log(JSON.parse(callback));
    let headers = {
        "Content-Type": "application/json"
    }
    httpRequest(method, URL, callback, headers,JSON.stringify(body));
    return false;
}


getProducts();

