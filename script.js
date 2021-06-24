
(_ => {
    
    const scroller    = document.getElementById('scroller');

    var   prodActive, wProd, velocityPd, velocityLop,
          animated    = false, start = true;


    const el1 = document.createElement('div');
    el1.classList.add('prod');

    const el2 = document.createElement('div');
    el2.classList.add('prod');
    
    scroller.insertAdjacentElement('afterbegin',el1)
    scroller.insertAdjacentElement('beforeend',el2)

    const listProds = Array.from(scroller.getElementsByClassName('prod'))

    const load = _ => {
        
        if(!start){
            scroller.style.height = "auto";
            scroller.style.height = scroller.offsetHeight;
        }

        wProd = Math.floor((scroller.scrollWidth - window.innerWidth) / (listProds.length - 3));
        velocityPd  = window.innerWidth > 768 ? 20 : 15;
        velocityLop = window.innerWidth > 768 ? 15 : window.innerWidth < 500 ? 25 : 20;
        scroller.scrollLeft = (prodActive.indexPosition - 1) * wProd;
        
    }


    const activeProd = index => {

        if(prodActive) prodActive.classList.remove('active');
        prodActive  = listProds[index];
        prodActive.classList.add('active')

    }


    const goToProd = index => {

        animated = true;

        let prod = listProds[index];
        let scrl = (index - 1) * wProd;
        let soma = index > prodActive.indexPosition;
        let scvl = soma ? +velocityPd : -velocityPd;

        let stl1 = getComputedStyle(prod);
        let wid1 = parseInt(stl1.minWidth.substr(0, stl1.minWidth.length - 1));

        let stl2 = getComputedStyle(prodActive);
        let wid2 = parseInt(stl2.minWidth.substr(0, stl2.minWidth.length - 1));

        let inte  = setInterval(() => {
            
            if((soma && scroller.scrollLeft >= scrl) || (!soma && scroller.scrollLeft <= scrl)){
                scroller.scrollLeft = scrl;
                console.log(wid1, wid2);
                prod.style.minWidth = "";
                prodActive.style.minWidth = "";
                animated = false;
                activeProd(index);
                clearInterval(inte);
                return;
            }

            if(wid1 < 50){
                prod.style.minWidth = wid1+"%";
                wid1++;
            }

            if(wid2 > 25){
                prodActive.style.minWidth = wid2+"%";
                wid2--;
            }
            
            scroller.scrollLeft += scvl;

        }, velocityLop);
    }


    listProds.forEach((el, key) => {
        el.indexPosition = key;
        el.addEventListener('click', e => {
            e.preventDefault();
            if(!animated && key != prodActive.indexPosition && key > 0 && key < listProds.length -1){
                goToProd(key)
            }
        })
    })


    activeProd(listProds.length % 2 == 0 ? listProds.length / 2 - 1 : Math.floor(listProds.length / 2))
    
    load()

    window.onload = _ => {
        start = false;
        scroller.style.height = scroller.offsetHeight;
    }

    window.addEventListener('resize', _ => load())

})()