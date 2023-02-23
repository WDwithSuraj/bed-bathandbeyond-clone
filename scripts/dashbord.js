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

// Data Fetch

// fetch("")


// Update



// let mainMid=document.getElementById("main-mid");


