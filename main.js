// return The whole items
const items = ()=>{
    return document.querySelectorAll(".carousel > .items > .item")
}
// return The lift items
const leftItems = ()=>{
    return document.querySelectorAll(".carousel > .items > .item.left")
}
// return The right items
const rightItems = ()=>{
    return document.querySelectorAll(".carousel > .items > .item.right")
}
// return The Whole Lines
const itemLines = ()=>{
    return document.querySelectorAll(".carousel > .lines > .line")
}

const btns = document.querySelectorAll(".carousel > .btns > .btn")
const casContainer = document.querySelector(".carousel > .items")
// before Btn
btns[0].addEventListener('click', ()=>{
    let activeItem = filterAClass(items(), 'active')
    if(activeItem[1] > 0){
        setCasItem(items(), activeItem[1]-1)
    }
})
// after Btn
btns[1].addEventListener('click', ()=>{
    let activeItem = filterAClass(items(), 'active')
    // we plus one to the active item arr bcs of that it is and indexed numbered and the other side is in the normal numbered
    if((activeItem[1] + 1) < items().length && activeItem[1] >= 0){
        setCasItem(items(), activeItem[1]+1)
    }
})
// give all the lines when clicking a listener to change the cas item
itemLines().forEach((line, ind) => {
    line.addEventListener("click", (e)=>{
        setCasItem(items(), ind)
    })
});
// clearClass
function clearClass(els, clas=["active", "left", "right"]) {
    if(typeof clas == "object"){
        clas.forEach( clas=> {
            els.forEach(el => {
                el.classList.remove(clas)
            });
        });
    }else{
        els.forEach(el => {
            el.classList.remove(clas)
        });
    }
}
// set carousel item
function setCasItem(arr, index) {
    clearClass(arr)
    clearClass(itemLines())
    arr[index].classList.add("active")
    itemLines()[index].classList.add("active")
}
// filter a class
/** 
 * @returns [ Element , Element's Index]
 */
function filterAClass(arr, clas) {
    for (const i in arr) {
        if(arr[i].classList.contains(clas)){
            return [arr[i], Number(i)];
        }
    }
}