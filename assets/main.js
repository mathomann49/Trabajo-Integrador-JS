
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const submenu = document.querySelector("#subMenu");
const btnSubmenu = document.querySelector("#btn-submenu");
const screenShadow = document.getElementById("horario");
const bagContainer = document.querySelector(".bag-container");
const bagBtn = document.querySelector("#btn-bag");

// manejar el boton del menu hamburguesa
const manageMenuMobile = () => {
    submenu.classList.add("submenu-hide");
    menu.classList.toggle("show-menu");
    submenu.classList.toggle("show-menu");
    screenShadow.classList.add("remove");
    if(bagContainer.classList.contains("showe")) {
        bagContainer.classList.remove("showe");
        return;    
    }
    modal.classList.toggle("show");
};

// manejar el boton de la bolsa
const manageMenubag = () => {
    bagContainer.classList.toggle("showe");
    screenShadow.classList.add("remove");
    if(menu.classList.contains("show-menu") || submenu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        submenu.classList.remove("show-menu");
        return;    
    }
    modal.classList.toggle("show");
}; 

//cerrar el menu hamburguesa al hacer click en un link
const closeMenu = (e) => {
    if (!e.target.classList.contains("menu__link")) {
        return;
    }
    menu.classList.remove("show-menu");
    submenu.classList.remove("show-menu");
    modal.classList.remove("show");
};

//cerrar el menu hamburguesa y bolsa con al hacer scroll verticcal
const closeToScroll = () => {
    if (!menu.classList.contains("show-menu") && 
    !bagContainer.classList.contains("showe")) {
        return;
    }
    menu.classList.remove("show-menu");
    bagContainer.classList.remove("showe");
    modal.classList.remove("show");
};

//cerrar el menu hamburguesa y bolsa con al hacer scroll vertical
const closeToClick = () => {
    menu.classList.remove("show-menu");
    bagContainer.classList.remove("showe");
    modal.classList.remove("show");
};



btnSubmenu.addEventListener("click", () => {
    submenu.classList.toggle("submenu-hide");
});


//Seccion Footer: Utilities

//horarios y atencion
const openModal = document.getElementById("openHorario");
const modal = document.getElementById("modal__horario");
const closeModal = document.getElementById("closeHorario");

const showScheduleAttention = () => {
    screenShadow.classList.remove("remove");
    modal.classList.add("show");
};

const closeScheduleAttention = () => {
    modal.classList.remove("show");
};

//como comprar
const open = document.getElementById("open");
const HowToBuy = document.getElementById("modal__how-to-buy");
const close = document.getElementById("close");

const showMakingAPurchase = () => {
    HowToBuy.classList.add("show");
};

const closeMakingAPurchase = () => {
    HowToBuy.classList.remove("show");
};


//preguntas frecuentes
const OpenFaqs = document.getElementById("openfaqs");
const faqs = document.getElementById("modal__faqs");
const CloseFaqs = document.getElementById("closefaqs");

const showFaqs = () => {
    faqs.classList.add("show");
};

const closeFaqs = () => {
    faqs.classList.remove("show");
};




//Seccion productos y bolsa de compras

//contenedor de productos
const products = document.getElementById("products__container");
//El total del precio de la bolsa:
const totalNumber = document.querySelector(".total-number");
//contenedor de las categorias:
const categories = document.querySelector(".categories");
//los botones de las categorias:
const categoriesList = document.querySelectorAll(".category");
//boton ver mas productos:
const showMoreProducts = document.querySelector(".show__more__products");
//boton comprar:
const getBtn = document.querySelector(".btn-add");
//burbuja de cantidad de productos:
const bagBubble = document.querySelector(".bubble");
//bolsa: interior: items seleccionados
const bagProducts = document.querySelector(".bag__item__container");
//modal de agregado a la bolsa
const successfullyAdded = document.querySelector(".recycle-modal");
//boton de borrado en la bolsa
const eliminateBtn = document.querySelector(".btn-remove");



let bag = JSON.parse(localStorage.getItem("bag")) || [];

const saveLocalStorage = (bagList) => {
    localStorage.setItem("bag", JSON.stringify(bagList));
};


const renderProduct = (product) => {
    const {id, model, price, category, imageUserModel, imageProduct} = product
   
    return `
    <div class="card__product">
    <img src="${imageUserModel}" alt="mujer con anteojo 1">
    <div class="middle">
        <p>Tecnología PreCel</p>
    </div>
    <img src="${imageProduct}" alt="${model}">
    <div class="product__info">
        <div class="input">
        <span class="model">Modelo: ${model}</span>
        <span class="price">$${price}</span>          
    </div>     
        <button class="add"
                data-id="${id}"
                data-model="${model}"
                data-img="${imageProduct}"
                data-price="${price}"
                >agregar a la bolsa</button>
    </div>
    </div> `;
};



function renderDisjoinedProducts(index = 0) {
    products.innerHTML += productsOverlooker.disjoinedProducts[index].map(renderProduct).join("");
}

const renderFilteredProducts = (category)=> {
    const productsList = productsData.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = productsList.map(renderProduct).join("");
};
                                                                    
const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDisjoinedProducts(index);
        return; 
    }
    renderFilteredProducts(category);
};

const manageshowMoreProducts = (category) => {
    if (!category) {
        showMoreProducts.classList.remove("hyde");
        return;   
    };
    showMoreProducts.classList.add("hyde");
};



const manageActiveFilter = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach( (categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active__filterer");
            return;
        }
        categoryBtn.classList.add("active__filterer");
     });
};

const manageShowProducts = (e) => {
    const selectedCategory = e.target.dataset.category
    manageshowMoreProducts(selectedCategory);
    manageActiveFilter(selectedCategory);
};

const filtering = (e) => {
    if (!e.target.classList.contains("category")) {
        return;
    } else {
        manageShowProducts(e);
    }
    if (!e.target.dataset.category) {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts (0, e.target.dataset.category);
        productsOverlooker.nextProductsIndex = 1;
    }
};

const vanishShowMoreProductsBtn = ()=> {
    renderProducts(productsOverlooker.nextProductsIndex);
    productsOverlooker.nextProductsIndex++;
    if (productsOverlooker.nextProductsIndex !== productsOverlooker.productsLimit) {
        return;
    }
    showMoreProducts.classList.add("hyde"); 
};



const renderBagProduct = (bagProduct) => {
    const { id, model, price, img, quantity } = bagProduct;
    return `
    <div class="bag__item">
                    <img src=${img} alt="">
                <div class="item__data">
                    <p class="item__model">modelo: <span>${model}</span></p>
                    <span class="item__price">$${price}</span> 
                </div>
                <div class="item__quantifier">
                    <span class="increase" data-id=${id}> + </span>
                    <span class="item__units"> ${quantity} </span>
                    <span class="decrease" data-id=${id}> - </span>
                </div>
                </div>
                `;
};

const renderBag = () => {
    if (!bag.length) {
        bagProducts.innerHTML = `<p class= "anything-msg"
        >Ningun item agregado</p>`;
        return;
    }
    bagProducts.innerHTML = bag.map(renderBagProduct).join("");
};

// logica y renderizado del total de la bolsa
const manageBagTotal = () => {
    return bag.reduce((acc, cur) => {
        return acc + Number(cur.price) * cur.quantity;
    }, 0)
};

const renderTotal = () => {
    totalNumber.innerHTML = `$ ${manageBagTotal()}`;
};

//cantidades de distintos productos en la burbuja
const renderBubble = () => {
    bagBubble.textContent = bag.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};

//estados de los botones: comprar y vaciar la bolsa
const manageBtn = (btn) => {
    if (!bag.length) {
        btn.classList.add("not-working");
    } else {
        btn.classList.remove("not-working");
    }
};
//actualizar dinamicamente el estado de la bolsa
const updateBag = () => {
    saveLocalStorage(bag);
    renderBag();
    renderTotal();
    renderBubble();
    manageBtn(eliminateBtn);
    manageBtn(getBtn);
};

//agregar productos a la bolsa
const pushProduct = (e) => {
    if (!e.target.classList.contains("add")) {
        return;
    }
    const { id, model, price, img } = e.target.dataset;

    const product = productInfo(id, model, price, img);

    if (stockBagProduct(product)) {
        oneMoreUnit(product);
        showGodNewsModal("Se agregó un nueva unidad del producto a la bolsa");
    } else {
        newBagProduct(product);
        showGodNewsModal("Se agregó un nuevo producto a la bolsa");
    }
    updateBag();
};

const productInfo = (id, model, price, img) => {
    return { id, model, price, img };
};

const stockBagProduct = (product) => {
    return bag.find((item) => {
            return item.id === product.id;
        });
};

const oneMoreUnit = (product) => {
    bag = bag.map((bagProduct) => {
        return bagProduct.id === product.id ? { ...bagProduct,
            quantity: bagProduct.quantity + 1} : bagProduct;   
    });
};


const showGodNewsModal = (msg) => {
    successfullyAdded.classList.add("in-use-modal");
    successfullyAdded.textContent = msg;
    setTimeout(() =>{
        successfullyAdded.classList.remove("in-use-modal");
    }, 2000);
};

const newBagProduct = (product) => {
    bag = [
        ...bag, {
            ...product, quantity: 1, 
        },
    ];
};

const modelSelector = document.querySelector(".child__model");

//uso de los botones interiores de la bolsa
//a) boton disminuir unidades
const decreaseBtnActions = (id) => {
    const sameBagProduct = bag.find((item) => {
        return item.id === id
    })
    if (sameBagProduct.quantity === 1) {
        if (window.confirm("¿Desea eliminar el producto de la bolsa?")) {
            eliminateBagProduct(sameBagProduct);
        }
        return;
    }
    decreaseProductUnit(sameBagProduct);
};

const eliminateBagProduct = (stockBagProduct) => {
    bag = bag.filter((product) => product.id !== stockBagProduct.id);
    updateBag();
};

const decreaseProductUnit = (stockBagProduct) => {
    bag = bag.map((product) => {
        return product.id === stockBagProduct.id ? {...product, 
            quantity: Number(product.quantity) - 1}
            : product;
    });
};

//b)boton aumentar unidades
const increaseBtnAction = (id) => {
    const stockBagProduct = bag.find((item) => {
        return item.id === id;
    });
    oneMoreUnit(stockBagProduct);
};

//manejo de las cantidades en la bolsa
const manageQuantity = (e) => {
    if (e.target.classList.contains("decrease")) {
        decreaseBtnActions(e.target.dataset.id);
    } else if (e.target.classList.contains("increase")) {
        increaseBtnAction(e.target.dataset.id);
    }
    updateBag();
};
    
//boton eliminar la bolsa
const eliminateBag = () => {
    bag = [];
    updateBag();
};

//resolución de la bolsa: (a)compra, b)eliminación)
const solveBagok = (confirmMsg, successMsg) => {
    if (!bag.length) return;
    if (window.confirm(confirmMsg)) {
        eliminateBag();
        alert(successMsg);
    }
};

//a) compra
const buyElection = () => {
    solveBagok("Está comprando lo que hay en la bolsa", 
    "¡Gracias por comprar en Opticloud!");
};

//b) eliminacion
const terminateBag = () => {
    solveBagok("¿Desea vaciar la bolsa?", "Su bolsa será vaciada");
};

const init = () =>{
    btnMenu.addEventListener("click", manageMenuMobile);
    bagBtn.addEventListener("click", manageMenubag);
    menu.addEventListener("click", closeMenu);
    submenu.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeToScroll);
    modal.addEventListener("click", closeToClick);
    renderProducts();
    categories.addEventListener("click", filtering);
    showMoreProducts.addEventListener("click", vanishShowMoreProductsBtn);
    document.addEventListener("DOMContentloaded", renderBag());
    document.addEventListener("DOMContentloaded", renderTotal());
    document.addEventListener("DOMContentloaded", renderBubble());
    eliminateBtn.addEventListener("click", terminateBag);
    getBtn.addEventListener("click", buyElection);
    manageBtn(eliminateBtn);
    manageBtn(getBtn);
    products.addEventListener("click", pushProduct);
    bagProducts.addEventListener("click", manageQuantity);
    OpenFaqs.addEventListener("click", showFaqs);
    CloseFaqs.addEventListener("click", closeFaqs);
    openModal.addEventListener("click", showScheduleAttention);
    closeModal.addEventListener("click", closeScheduleAttention);
    open.addEventListener("click", showMakingAPurchase);
    close.addEventListener("click", closeMakingAPurchase);
};

init();
