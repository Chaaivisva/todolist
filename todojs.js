const inputbox = document.getElementById("input-box");
const listcontainer = document.querySelector("#list-container")
const dateInput = document.querySelector("#date")
const filter = document.querySelector("#filter")

let count=0;
function addTask(){
    console.log(filter.value)
    if(inputbox.value === '' ){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.id = "list"
        // li.innerHTML  = inputbox.value
        let div2 = document.createElement("div")
        div2.classList.add("flex")

        let span1=document.createElement("div")
        span1.innerHTML=inputbox.value
        span1.innerHTML+='<br>'
        let date = document.createElement("div")
        date.id = "date"
        const formateDate = new Date(dateInput.value)
        date.appendChild(document.createTextNode(formateDate.toLocaleDateString()))
        div2.append(span1)
        div2.appendChild(date)
        li.appendChild(div2)
        // li.append(span1);
        // li.appendChild(date)

        listcontainer.append(li)
        
        let span = document.createElement("span");
        span.className="task"
        span.id=count++;
        span.innerHTML = "\u00d7"
        li.append(span);
    }
    changeFilter()
    inputbox.value="";
    dateInput.value=""
    // saveData();
}

listcontainer.addEventListener("dblclick", function(e){
    
    // if(e.target.tagName === "SPAN"){
        //e.target.nextElementSibling
        e.target.parentElement.style.visibility = "hidden";
        e.target.parentElement.style.width='0';
        e.target.parentElement.style.height='0';
        e.target.parentElement.style.padding='0';
        e.target.parentElement.style.margin='0';
        let locCount;
        let elements = document.querySelectorAll(".task")
        elements.forEach((el) => {
            locCount = e.target.id
            for(let i = locCount+1;i < elements.length;i++){
                if(elements){
                    elements[i].id = i
                }
            }
        })

        // saveData()
        // e.target.id=coun t--;
    // }
});

listcontainer.addEventListener("click", function(e){
   let ide=e.target.id
   let previousSibling = document.querySelectorAll(".task")[ide].previousSibling

   previousSibling.style.textDecoration='line-through';
  //  let sel=document.listcontainer
  // listcontainer.style.textDecoration='line-through';
});

function saveData(){
    localStorage.setItem("data",JSON.stringify(listcontainer.innerHTML))
}

function showTask(){
    listcontainer.innerHTML = JSON.parse(localStorage.getItem("data"))
}

// showTask();

function changeFilter(){
        if(filter.value === "Today"){
           document.querySelectorAll("#list").forEach((el) =>{ 
            if(el.firstChild.lastChild.innerHTML !== new Date().toLocaleDateString()){
                el.classList.add("filter")
            }
        })
        }else{
            document.querySelectorAll("#list").forEach((el) => {
                el.classList.remove("filter")
            })

        }

}