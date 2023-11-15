let myResults = []
let inputEl = document.getElementById("input-el")
let saveBtn = document.getElementById("save-btn")
let tabBtn = document.getElementById("tab-btn")
let deleteBtn = document.getElementById("delete-btn")
let resultsEl = document.getElementById("results-el")
let resultsFromLocalStorage = JSON.parse(localStorage.getItem("myResults"))

if (resultsFromLocalStorage) {
    myResults= resultsFromLocalStorage
    renderMyResults()
}

saveBtn.addEventListener("click", function(){
    myResults.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myResults", JSON.stringify(myResults) )
    renderMyResults()
})

tabBtn.addEventListener("click", function(){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myResults.push(tabs[0].url)
        localStorage.setItem("myResults", JSON.stringify(myResults) )
        renderMyResults()
    })
})

deleteBtn.addEventListener("dblclick", function(){

    myResults = []
    localStorage.clear()
    renderMyResults()
})

function renderMyResults() { 
    let listItems = ""
    for (let i = 0; i < myResults.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myResults[i]}'>
                    ${myResults[i]}
                </a>
            </li>
        `
    }
    resultsEl.innerHTML = listItems  
}




