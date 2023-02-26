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
let main=document.getElementById("main");



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
        <form action=""  id="addForm">
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
            <input type="submit" onclick="addForm()" value="Submit" id="inpSubmit">
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
function addForm(){
    event.preventDefault();
    let obj={
        id: document.getElementById("inpID").value,
        title: document.getElementById("title").value,
        category: document.getElementById("selCate").value,
        price: document.getElementById("inpPrice").value,
        image: [
            document.getElementById("inpImgURL").value
        ],
        color: document.getElementById("inpColor").value,
        size:document.getElementById("inpSize").value,
      };


    //   document.getElementById("uID").value=data.id;
    //             document.getElementById("uSel").value=data.category;
    //             document.getElementById("uImgURL").value=data.image[0];
    //             document.getElementById("uSize").value=data.size;
    //             document.getElementById("uTitle").value=data.title;
    //             document.getElementById("uPrice").value=data.price;
    //             document.getElementById("uColor").value=data.color;
    
    fetch("https://shy-puce-binturong-ring.cyclic.app/products",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    });
    add();

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
    <form action=""  id="updateForm">
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

function updateButn(){
    event.preventDefault();
    let obj={
        id: document.getElementById("uID").value,
        title: document.getElementById("uTitle").value,
        category: document.getElementById("uSel").value,
        price: document.getElementById("uPrice").value,
        image: [
            document.getElementById("uImgURL").value
        ],
        color: document.getElementById("uColor").value,
        size:document.getElementById("uSize").value,
    };

    fetch(`https://shy-puce-binturong-ring.cyclic.app/products/${document.getElementById("uID").value}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    });
    
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

    let delButn=document.querySelectorAll(".delButn");
    console.log(delButn);
    for(let i=0;i<delButn.length;i++){
        delButn[i].addEventListener("click",()=>{
            fetch(`https://shy-puce-binturong-ring.cyclic.app/products/${delButn[i].id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            delet();

        })
    }
    
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
                    <button class="delButn" id=${id}>Delete</button>
                </div>
            </div>
            
        </div>
    </div>
    
    `;
    return card
}


//   users
// let tBody=document.querySelector("#tBody");
function users(){
    
    mainMid.innerHTML=null
    mainMid.style.border="0px"
    mainMid.style.width="94%";
    mainMid.style.height="100%";
    mainRight.style.width="0%";
    // setTimeout(loder,1);
    // setTimeout(function(){
       

    
    // },1000)
    // document.querySelector("#tBody").style.overflowY="scroll";

    mainMid.innerHTML=
    `
    <h1>Users</h1>
    <div id="tablePart">
        <table>
            <thead>
                <tr>
                    <th class="ID">Id</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>email</th>
                    <th id="delete">Delete</td>
                </tr>
            </thead>
            <tbody id="tBody">
                
            </tbody>
        </table>
    </div>
    
    `;

        fetch("https://shy-puce-binturong-ring.cyclic.app/users")
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            rowList(data);
        })
        .catch((err)=>{
            console.log(err);
        })
        // setTimeout(scroller,400)
        // function scroller(){
            
        // }
    
    // let data=JSON.parse(localStorage.getItem("data"));
    //     console.log(data)
        
}


function rowList(data){
    // console.log(data)
    let rowList=
    `
    ${data.map((e,i)=>{
        if(i%2===0){
            return tableRow(e.id,e.firstname+" "+e.lastname,e.email,e.avatar,"even")
        }
        else{
           return tableRow(e.id,e.firstname+" "+e.lastname,e.email,e.avatar,"odd")
        }
    }).join(" ")}
    
    `;
    // console.log(rowList)
    let tBody=document.querySelector("#tBody");
    // console.log(tBody);
    tBody.innerHTML=rowList;

    // let vaccinateButn=document.querySelectorAll(".vaccinate");
    // for(let i=0;i<vaccinateButn.length;i++){
    //     vaccinateButn[i].addEventListener("click",()=>{
            
    //         alert(`${data[i].name} Added to Queue ✅`);
    //         setTimeout(alert5,5000)
    //         function alert5(){
    //             alert(`“Vaccinating ${data[i].vaccine}`)
    //         }
    //     })
    // }
    
    

    
    // let deleteButn=document.querySelectorAll(".delete");
    // console.log(deleteButn)
    // for(let i=0;i<deleteButn.length;i++){
    //     deleteButn[i].addEventListener("click",()=>{
    //         // data[i].vaccinate=true;

    //        console.log(data[i]);
    //        let ftrdelete=data.filter((item)=>{
    //         return item.id!=data[i].id
    //        })
    //        localStorage.setItem("data",JSON.stringify(ftrdelete));
    //        setTimeout(alert5,2000)
    //         function alert5(){
    //             window.location.reload()
    //         }  
    //     })
    // }

    let delButn1=document.querySelectorAll(".delete");
    console.log(delButn1)
    for(let i=0;i<delButn1.length;i++){
        delButn1[i].addEventListener("click",()=>{
            fetch(`https://shy-puce-binturong-ring.cyclic.app/users/${delButn1[i].id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            users();
        })
    }


}



function tableRow(id,name,email,avatar,class1){
    let row=

    `
    <tr class=${class1}>
        <td>${id}</td>
        <td><img src=${avatar}></td>
        <td>${name}</td>
        <td>${email}</td>
        <td><button class="delete" id=${id}>Delete</button></td>
    </tr>
    
    `;

    return row;
}

function analytics(){
    mainMid.innerHTML=null
    mainMid.style.border="0px"
    mainMid.style.width="94%";
    mainRight.style.width="0%";
    setTimeout(loder,1);
    setTimeout(function(){
        mainMid.innerHTML=
        `
        <img src="imags/Screenshot (318).png" alt="">
        
        `;

    },1000)   
}

function home(){
    // window.location.reload();

    mainMid.innerHTML=null
    mainMid.style.border="0px"
    mainMid.style.width="94%";
    mainRight.style.width="0%";
    setTimeout(loder,1);
    setTimeout(function(){
        mainMid.innerHTML=
        `
        <h1 id="company">Company Detials</h1>
        <footer id="bottom">
            <div id="btm-data">
                <div>
                    <h3>CUSTOMER SUPPORT</h3>
                    <p>Accessibility Statement</p>
                    <p>Contact Us</p>
                    <p>Forgot Password</p>
                    <p>Help Desk</p>
                    <p>In Store Pickup</p>
                    <p>In Store Services</p>
                    <p>Order Tracking</p>
                    <p>Recall Information</p>
                    <p>Return Policy</p>
                    <p>Same Day Delivery</p>
                </div>
                <div>
                    <h3>ABOUT US</h3>
                    <p>Affiliate Program</p>
                    <p>Career Opportunities</p>
                    <p>Corporation Information</p>
                    <p>Gift Cards</p>
                    <p>Investor Relation</p>
                    <p>2020 Annual Reoprt</p>
                    <p>Safety Data Sheets</p>
                    <p>Press</p>
                    <p>Store Locator</p>
                </div>
                <div>
                    <h3>PROFESSIONAL SHOPS</h3>
                    <p>MyAdvance</p>
                    <p>Online Parts Ordering</p>
                    <p>TechNet Professional</p>
                    <p>Technical Training</p>
                    <p>Interactive Vehicle Animation</p>
                    <p>Parts & Products</p>
                    <p>Promotion & Rewards</p>
                    <p>Shop Solutions</p>
                    <p>Find My Mechanic</p>
                </div>
            </div>
          </footer>
        
        `;

    },1000) 
    
}