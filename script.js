const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const inp = document.getElementById("search");
let prod = [];

async function fetchA() {
    const response = await fetch('https://fakestoreapi.com/products');
    prod = await response.json();
    display(prod);
}

n1.addEventListener("change", () => { 
    if (n1.value === "Barchasi") {
        display(prod); 
    } else { 
        const filtered = prod.filter(e => e.category.toLowerCase().includes(n1.value.toLowerCase()));
        display(filtered);
    }
});

n2.addEventListener("change", () => {
    let qilingan = [];
    if (n2.value === "↓") {
        qilingan = [...prod].sort((a, b) => a.price - b.price);
    } else if (n2.value === "↑") {
        qilingan = [...prod].sort((a, b) => b.price - a.price);
    } else {
        qilingan = prod;
    }
    display(qilingan);
});

inp.addEventListener("input", () => { 
    const res = prod.filter(e => 
        e.title.toLowerCase().includes(inp.value.toLowerCase().trim()) 
    );
    display(res);
});

function display(prod) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    prod.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${data.image}" alt="${data.title}" width="200">
            <h2>${data.title}</h2>
            <p>Kategoriya: ${data.category}</p>
            <h4>Narxi: ${data.price}</h4>
        `;
        cardsContainer.appendChild(card);
    });
}

setTimeout(fetchA(),2000);