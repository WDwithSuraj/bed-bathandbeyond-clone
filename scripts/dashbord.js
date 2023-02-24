function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    setTimeout(border,100);
    function border(){
        document.getElementById("mySidenav").style.borderRight = "2px solid red";
        document.querySelector("nav").style.borderColor="red";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(border,400);
    function border(){
        document.getElementById("mySidenav").style.borderRight = "0px";
        document.querySelector("nav").style.borderColor="white";
    }
}

function loder(){
    mainMid.innerHTML=
    `
    <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    
    `;
}








let mainMid=document.getElementById("main-right");
let mainRight=document.getElementById("main-mid")


//    ADD

function add(){
    mainMid.innerHTML=null;
    mainMid.style.width="94%";
    mainRight.style.width="0%";
    setTimeout(loder,1);
    setTimeout(function(){
        mainMid.style.width="40%";
        mainRight.style.width="54%";
        mainMid.style.borderRight="1px solid white"
        mainMid.innerHTML=
        `
        <h1>Add Product</h1>
        <form action="" id="addForm">
            <input type="number" id="inpID" placeholder="Product ID">
            <select name="" id="selCate">
                <option value="Categories" id="cat">Categories</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Bath">Bath</option>
                <option value="Toilet">Toilet</option>
            </select>
            <input type="url" name="" id="inpImgURL" placeholder="Image URL">
            <h5>OR</h5>
            <input type="file" name="" id="inpImgFile">
            <input type="number" name="" id="inpSize" placeholder="Size">
            <textarea name="" id="title" cols="10" rows="10" placeholder="Product Title"></textarea>
            <input type="number" name="" id="inpPrice" placeholder="Price                                                    .Rs">
            <input type="text" name="" id="inpColor" placeholder="Color">
            <input type="submit" value="Submit" id="inpSubmit">
        </form>
        
        `;
        
        setTimeout(scroller,400)
        function scroller(){
            mainMid.style.overflowY="scroll";
        }
    },2000);
    fetch("https://shy-puce-binturong-ring.cyclic.app/products")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        addList(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}
function addList(data){
    mainRight.style.overflowY="scroll"
    mainRight.innerHTML=
    `
    <div id="addList">
        ${data.map((e)=>{
        return addCard(e.id,e.image[0],e.title,e.category,e.price,e.color,e.size)
        }).join(" ")}
    </div>

    `;
}
function addCard(id,img,title,categiory,price,color,size){
    let card=
    `
    <div class="addCard" data-id=${id} id=${id}>
        <div class="addImg">
            <img src=${img} alt="#">
        </div>
        <div class="d2">
            <h5 class="addID">ID : ${id}</h5>
            <h4 class="addTitle">Title : ${title}...</h4>
            <h5 class="addCat">Category : ${categiory}</h5>
            <h5 class="addPrice">Price : ${price}</h5>
            <p class="addColor">Color : ${color}</p>
            <p class="addSize">Size : ${size}</p>
        </div>
    </div>
    
    `;
    return card
}


//      update


function update(){
    mainMid.innerHTML=null;
    mainMid.style.width="94%";
    mainRight.style.width="0%";
    setTimeout(loder,1);
    setTimeout(function(){
        mainMid.style.width="40%";
        mainRight.style.width="54%";
        mainMid.style.borderRight="1px solid white"
        mainMid.innerHTML=
    `
    <h1>Update Product</h1>
    <form action="" id="updateForm">
        <input type="number" id="uID" placeholder="Product ID">
        <select name="" id="uSel">
            <option value="Categories">Categories</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Bath">Bath</option>
            <option value="Toilet">Toilet</option>
        </select>
        <input type="url" name="" id="uImgURL" placeholder="Image URL">
        <h5>OR</h5>
        <input type="file" name="" id="uImgFile">
        <input type="text" name="" id="uSize" placeholder="Size">
        <textarea name="" id="uTitle" cols="10" rows="10" placeholder="Product Title"></textarea>
        <input type="number" name="" id="uPrice" placeholder="Price                                                    .Rs">
        <input type="text" name="" id="uColor" placeholder="Color">
        <input type="submit" onclick=updateButn() value="Update" id="Update">
    </form>
    
    `;
    },2000);
    fetch("https://shy-puce-binturong-ring.cyclic.app/products")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        updateList(data);
    })
    .catch((err)=>{
        console.log(err);
    })
    
}
function updateList(data){
    mainRight.style.overflowY="scroll"
    mainRight.innerHTML=
    `
    <div id="uList">
        ${data.map((e)=>{
        return updateCard(e.id,e.image[0],e.title,e.category,e.price,e.color,e.size)
        }).join(" ")}
    </div>

    `;


    let editButn = document.querySelectorAll(".edit");
    for(let i=0;i<editButn.length;i++){
        editButn[i].addEventListener("click",()=>{
            fetch(`https://shy-puce-binturong-ring.cyclic.app/products/${editButn[i].id}`)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                document.getElementById("uID").value=data.id;
                document.getElementById("uSel").value=data.category;
                document.getElementById("uImgURL").value=data.image[0];
                document.getElementById("uSize").value=data.size;
                document.getElementById("uTitle").value=data.title;
                document.getElementById("uPrice").value=data.price;
                document.getElementById("uColor").value=data.color;
            })
        })
    }
}








function updateCard(id,img,title,categiory,price,color,size){
    let card=
    `
    <div class="uCard" data-id=${id} id=${id}>
        <div class="uImg">
            <img src=${img} alt="#">
        </div>
        <div class="d2">
            <h5 class="uID">ID : ${id}</h5>
            <h4 class="uTitle">Title : ${title}...</h4>
            <h5 class="uCat">Category : ${categiory}</h5>
            <h5 class="uPrice">Price : ${price}</h5>
            <div>
                <div>
                    <p class="uColor">Color : ${color}</p>
                    <p class="uSize">Size : ${size}</p>
                </div>
                <div>
                    <span id=${id} class="material-symbols-outlined edit">
                        edit
                    </span>
                </div>
            </div>
        </div>
    </div>
    
    `;
    return card
}


//     Delete

function delet(){
    mainMid.innerHTML=null
    mainMid.style.border="0px"
    mainMid.style.width="94%";
    mainRight.style.width="0%";
    setTimeout(loder,1);
    setTimeout(function(){
        fetch("https://shy-puce-binturong-ring.cyclic.app/products")
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            cardList(data);
        })
        .catch((err)=>{
            console.log(err);
        })
        setTimeout(scroller,400)
        function scroller(){
            mainMid.style.overflowY="scroll";
        }
    },1000)

    
    
}

function cardList(data){
    mainMid.innerHTML=
    `
    <h1>Delete Product</h1>

    <div id="cardList">
        ${data.map((e)=>{
        return card(e.id,e.image[0],e.title,e.category,e.price,e.color,e.size)
        }).join(" ")}
    </div>

    `;
}

function card(id,img,title,categiory,price,color,size){
    let card=
    `
    <div class="card" data-id=${id} id=${id}>
        <div class="delImg">
            <img src=${img} alt="#">
        </div>
        <div>
            <h5 class="delID">ID : ${id}</h5>
            <h4 class="delTitle">Title : ${title}</h4>
            <h5 class="delCat">Category : ${categiory}</h5>
            <h5 class="delPrice">Price : ${price}</h5>
            <div>
                <div>
                    <p class="delColor">Color :  ${color}</p>
                    <p class="delSize">Size : ${size}</p>
                </div>
                <div>
                    <button class="delButn">Delete</button>
                </div>
            </div>
            
        </div>
    </div>
    
    `;
    return card
}

