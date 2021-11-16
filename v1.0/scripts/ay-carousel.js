class ay_carousel{

    defaultHtmlCssCarouselClass = "JfwrbnD"

    /**
     * 
     * @param {*} id use it as you use document.querySelectory() , just put your selector 
     */
    constructor(id = ".carousel"){
        this.carousels = document.querySelectorAll(id);

        // give the carousels the tools they need, like btns and lines.
        this.carousels.forEach(carousel => {

            /**
             * give the carousel the class @defaultHtmlCarouselClass
             * this line is exist because we want to to give the element our css styles class
             * and we first of all, we get the classes in that element and we append our class before those classes 
             * to give the developer the apility to change the syles of the carousel
             */
            carousel.className = (this.defaultHtmlCssCarouselClass + " " + carousel.className);
            
            /**
             * give the carousel the lines 
             */
            let linesContainer = document.createElement("div");
            linesContainer.className = "lines";
            carousel.append(linesContainer);
            this.getItems(carousel).forEach(() => {
                const line = document.createElement("div");
                line.className = "line";
                linesContainer.append(line);
            });

            // console.log(this.getItemLines(carousel)[])
            /**
             * activate one of the lines debending on the active carousel item
             */
            this.getItemLines(carousel)[
                this.filterAClass(
                    this.getItems(carousel),
                        "active")[1]].
            classList.add("active");
            
            /**
             * give the lines of the carousel an click listeners,
             * so when the user click on one of them
             * it navigates to the specifec carousel item
             */
            this.getItemLines(carousel).forEach((line, index) => {
                line.addEventListener("click", ()=>{
                    this.setCasItem(this.getItems(carousel), this.getItemLines(carousel), index);
                });
            });

             
            /**
             * add btns for the carousel
             */
            const btnsContainer = document.createElement('div');
            btnsContainer.className = "btns";
            carousel.append(btnsContainer);

            const beforeBtn = document.createElement('div');
            beforeBtn.className = "btn before";
            btnsContainer.append(beforeBtn);
            beforeBtn.addEventListener('click', ()=>{
                let items = this.getItems(carousel);
                let activeItem = this.filterAClass(items, 'active');

                // we plus one to the active item arr bcs of that it is and indexed numbered and the other side is in the normal numbered
                if(activeItem[1] > 0){
                    // console.log(activeItem, items)
                    this.setCasItem(items, this.getItemLines(carousel), (activeItem[1]-1));
                }
            });
            
            // after Btn
            const afterBtn = document.createElement('div');
            afterBtn.className = "btn after";
            btnsContainer.append(afterBtn);
            afterBtn.addEventListener('click', ()=>{
                let items = this.getItems(carousel);
                let activeItem = this.filterAClass(items, 'active');

                // we plus one to the active item arr bcs of that it is and indexed numbered and the other side is in the normal numbered
                if((activeItem[1] + 1) < items.length && activeItem[1] >= 0){
                    this.setCasItem(items, this.getItemLines(carousel), activeItem[1]+1);
                }
            });
            

        });
    }

    /**
     * 
     * @param {*} arrayOfItems  an array of the items in a carousel
     * @param {*} arrayOfItemLines an array of the lines in a carousel
     * @param {*} index the number of the carousel and the line you want to active
     */
    setCasItem(arrayOfItems, arrayOfItemLines, index) {
        // console.log(arrayOfItems, arrayOfItemLines, index)
        this.clearClass(arrayOfItems);
        arrayOfItems[index].classList.add("active");
        this.clearClass(arrayOfItemLines);
        arrayOfItemLines[index].classList.add("active");
    }



    /**
     * this function helps clear classes of any element.
     * and it can clear multiple classes by putting the second param as an array 
     * and inside every index of this array is an string class
     * @param  els  => elements
     * @param  clas => clas, you can clear one class of one element by putting the second param as an string, and it can be an array of classes that will be removed from an specifec element that we defined with the @param els
     */
    clearClass(els, clas=["active", "left", "right"]) {
        if(typeof clas == "object"){
            clas.forEach( clas=> {
                els.forEach(el => {
                    el.classList.remove(clas);
                });
            });
        }else{
            els.forEach(el => {
                el.classList.remove(clas);
            });
        }
    }

    // filter a class
    /** 
     * @returns [ Element , Element's Index]
     */
    filterAClass(arr, clas) {
        for (const i in arr) {
            if(arr[i].classList.contains(clas)){
                return [arr[i], Number(i)];
            }
        }
    }

    /**
     * @param cas carousel-
     * @return returns The Whole Lines in the carousel on an array 
     */ 
    getItemLines(cas){
        return cas.querySelectorAll(".lines > .line");
    }
    

    


    /**
     * 
     * @param {*} cas carousel-
     * @returns  give me the carousel it self I will give you his items in an array
     */
    getItems(cas){
        return cas.querySelectorAll(".items > .item");
    }
}

// cas stands for carousel