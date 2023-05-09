const inputbox = document.getElementById("input-box");
const listcontainer = document.querySelector("#list-container")
const dateInput = document.querySelector("#date")
const filter = document.querySelector("#filter")
let tempDate;
let tempTodo;

window.addEventListener("load",(e) => {

    let data =JSON.parse(localStorage.getItem("todos"))

    data?.forEach((el) => {

        var doc = new DOMParser().parseFromString(el, "text/html");
        doc.body.firstChild.lastChild.addEventListener("dblclick",addDblEvent)
        doc.body.firstChild.lastChild.addEventListener("click",addClickEvent)
        listcontainer.appendChild(doc.body.firstChild) 
    })

})



let count=0;
async function addTask(){
    tempTodo = inputbox.value
    tempDate = dateInput.value

    console.log(dateInput.value)

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
        const formateDate =  dateInput.value !== "" ? new Date(dateInput.value) : new Date() 
        date.appendChild(document.createTextNode(formateDate.toLocaleDateString()))
        div2.append(span1)
        div2.appendChild(date)
        li.appendChild(div2)
        // li.append(span1);
        // li.appendChild(date)

        listcontainer.append(li)
        
        let span = document.createElement("span");
        span.className="task"
        // span.classList.add("delete")
        span.id=count++;
        span.innerHTML = "\u00d7"
        span.addEventListener("dblclick",addDblEvent)
        span.addEventListener("click",addClickEvent)
        li.append(span);

        let seperate = document.createElement("span")
        seperate.innerHTML = "seperate"
        seperate.classList.add("hide")
        listcontainer.append(seperate)
        saveData()

    }
    inputbox.value="";
    dateInput.value=""


    let formData = new FormData();
    const formateDate =  tempDate !== "" ? new Date(tempDate) : new Date() 
    formData.append('todo', tempTodo);
    formData.append('date', formateDate.toLocaleDateString());

    const response = await fetch("https://script.google.com/macros/s/AKfycbwMEOyzYzBY2evVvINYxkBOtwNWWlzVMMEy9K705cu-ZygiM-OEIOncKbARtn9BvS8/exec",{
        method:"post",
        
        body : formData,
      
        
    })

    changeFilter()
    // console.log(response)


    
    // saveData();
}


function addDblEvent(e){
    
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
                if(elements[i]){
                    elements[i].id = i
                }
            }
        })

        saveData()
        // e.target.id=coun t--;
    // }
}


// https://docs.google.com/spreadsheets/d/1aAt9IFuXGK7OkjEgplaNIc24GSfwOjJDMF4CPSPtZmY/edit#gid=0 --> Spreadsheet link



 function addClickEvent(e){
//    let ide=e.target.id
//    let previousSibling = document.querySelectorAll(".task")[ide].previousSibling

   e.target.parentElement.style.textDecoration='line-through';
  //  let sel=document.listcontainer
  // listcontainer.style.textDecoration='line-through';
}

function saveData(){

    let todos = Array.from(document.querySelectorAll("#list"))
    let data = todos.map((el) => el.outerHTML)
    localStorage.setItem("todos",JSON.stringify(data))    
}

function showTask(){
    listcontainer.innerHTML = JSON.parse(localStorage.getItem("todos"))
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




