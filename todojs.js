const inputbox = document.getElementById("input-box");
const listcontainer = document.querySelector("#list-container")
let count=0;
function addTask(){
    if(inputbox.value === '' ){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        // li.innerHTML  = inputbox.value
        let span1=document.createElement("div")
        span1.innerHTML=inputbox.value
        li.append(span1);

        listcontainer.append(li)
        
        let span = document.createElement("span");
        span.className="task"
        span.id=count++;
        span.innerHTML = "\u00d7"
        li.append(span);
    }
    inputbox.value="";
    saveData();
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
                elements[i].id = i
            }
        })

        saveData()
        // e.target.id=coun t--;
    // }
});

listcontainer.addEventListener("click", function(e){
   let ide=e.target.id
   document.querySelectorAll(".task")[ide].previousSibling.style.textDecoration='line-through';
  //  let sel=document.listcontainer
  // listcontainer.style.textDecoration='line-through';
});

function saveData(){
    localStorage.setItem("data",JSON.stringify(listcontainer.innerHTML))
}

function showTask(){
    listcontainer.innerHTML = JSON.parse(localStorage.getItem("data"))
}

showTask();