const productsData = [
    {
        id: 1,
        model: "wp100",
        price: 4900,
        category: "mujerGraduados",
        imageUserModel: "./assets/1_539_451.png",
        imageProduct: "./assets/1_492_221.png",
    },
    {
        id: 2,
        model: "ws100",
        price: 4300,
        category: "mujerSol",
        imageUserModel: "./assets/1_442_429.png",
        imageProduct: "./assets/1_413_193.png",
    },
    {
        id: 3,
        model: "hs100",
        price: 5200,
        category: "hombreSol",
        imageUserModel: "./assets/1_550_449.png",
        imageProduct: "./assets/1_417_190.png",
    },
    {
        id: 4,
        model: "hp100",
        price: 4500,
        category: "hombreGraduado",
        imageUserModel: "./assets/1_520_397.png",
        imageProduct: "./assets/1_418_148.png",
    },
   {
        id: 5,
        model: "law100",
        price: 3700,
        category: "luzAzul",
        imageUserModel: "./assets/azul_mujer.png",
        imageProduct: "./assets/azul_amujer.png",
    },
    {
        id: 6,
        model: "lah100",
        price: 3500,
        category: "luzAzul",
        imageUserModel: "./assets/azul_hombre.png",
        imageProduct: "./assets/azul_ahombre.png",
    },
    {
        id: 7,
        model: "wp200",
        price: 4200,
        category: "mujerGraduados",
        imageUserModel: "./assets/2_551_426.png",
        imageProduct: "./assets/2_505_249.png",
    },
    {
        id: 8,
        model: "ws200",
        price: 5400,
        category: "mujerSol",
        imageUserModel: "./assets/2_558_451.png",
        imageProduct: "./assets/2_390_185.png",
    },
    {
        id: 9,
        model: "hp200",
        price: 4700,
        category: "hombreGraduado",
        imageUserModel: "./assets/2_540_424.png",
        imageProduct: "./assets/2_505_249.png",
    },
    {
        id: 10,
        model: "wp300",
        price: 5100,
        category: "mujerGraduados",
        imageUserModel: "./assets/3_546_426.png",
        imageProduct: "./assets/3_512_200.png",
    },
    {
        id: 11,
        model: "ws300",
        price: 5500,
        category: "mujerSol",
        imageUserModel: "./assets/3_554_427.png",
        imageProduct: "./assets/3_420_188.png",
    },
    {
        id: 12,
        model: "hp300",
        price: 4800,
        category: "hombreGraduado",
        imageUserModel: "./assets/3_554_431.png",
        imageProduct: "./assets/3_509_226.png",
    },
    {
        id: 13,
        model: "hs200",
        price: 5400,
        category: "hombreSol",
        imageUserModel: "./assets/2_539_423.png",
        imageProduct: "./assets/2_419_187.png",
    },
    {
        id: 14,
        model: "hs300",
        price: 4900,
        category: "hombreSol",
        imageUserModel: "./assets/3_553_430.png",
        imageProduct: "./assets/3_413_186.png",
    },
    {
        id: 15,
        model: "kids",
        price: 3000,
        category: "luzAzul",
        imageUserModel: "./assets/azul_niños2.png",
        imageProduct: "./assets/anteojosNiño.png",
    }, 
];

//paginacion:

const pullApartProducts = (size) => {
    let disjoinedProducts = [];

    for (let i = 0; i < productsData.length; i += size) {
        disjoinedProducts.push(productsData.slice(i, i + size));  
    }
    return disjoinedProducts;
};

const productsOverlooker = {
    disjoinedProducts: pullApartProducts(3),
    nextProductsIndex: 1,
    productsLimit: pullApartProducts(3).length,
};
