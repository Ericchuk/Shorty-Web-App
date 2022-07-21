let hamburger = document.querySelector(".hamburger");
let close = document.querySelector(".close");
let nav = document.querySelector("header nav");
let input = document.querySelector("input");
let shortIt = document.querySelector(".callToAction");
let advance = document.querySelector(".advance");
let button = document.querySelector(".btn")


function openMenu(){
    if(nav.style.display == "flex"){
        nav.style.display = "none";
        hamburger.style.display = "block";
        close.style.display = "none";
        console.log("ddd")
    }else{
        nav.style.display = "flex";
        hamburger.style.display = "none";
        close.style.display = "block";
        console.log("999")
    }
}

hamburger.addEventListener("click", openMenu)
close.addEventListener("click", openMenu)

let grow = document.querySelector(".grow");
let links = JSON.parse(localStorage.getItem("links")) || [];
function checkInput(){
    let url  = input.value;
    
    let apiAddress = "https://api.shrtco.de/v2/shorten";
    apiAddress = `https://api.shrtco.de/v2/shorten?url=${url}`
    let regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let address = `${apiAddress}?${input.value}`;
    
    if(input.value != "" && input.value.match(regex)){
        document.querySelector(".error").style.display = "none";
        async function getApi(){
            try{
               let apiData = await fetch(apiAddress);
               let response = await apiData.json();
                let div = document.createElement("div");
                div.className = "result"
                let p = document.createElement("p");
                p.className = "fromJs";
                p.textContent = `${response.result.original_link}`
                let ul = document.createElement("ul");
                let hr  = document.createElement("hr");
                hr.className = "hr"
                let li = document.createElement("li");
                li.textContent = `${response.result.full_short_link}`
                let button = document.createElement("button");
                button.textContent = "Copy"
                button.className = "btn";
                div.appendChild(p)
                div.appendChild(hr)
                div.appendChild(ul);
                ul.appendChild(li);
                ul.appendChild(button)
                grow.prepend(div);
                input.value = "";
                const copy1 = grow.querySelector(".btn");
                let shortLink = grow.querySelector("li").textContent;
                function copyfunc(){
                    navigator.clipboard.writeText(shortLink);
                    copy1.textContent = "Copied"
                    copy1.style.backgroundColor = "var(--Dark-Violet)";
                    console.log(shortLink);
                    setTimeout(reverse, 2000)
                }
                function reverse(){
                    copy1.textContent = "Copy";
                    copy1.style.backgroundColor = "var(--Cyan)";
                }
                
                copy1.addEventListener("click", copyfunc);
               }
            catch{
                console.error();
            }
            
            
        }
        getApi();
    }else{
        console.log("lll");
        document.querySelector(".error").style.display = "block";
    }
}
shortIt.addEventListener("click", checkInput)
checkInput();
