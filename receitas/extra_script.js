let currentPage = 1;
let isLoading = false;
let isInfiniteScrolling = false;

async function loadCompanies(page = 1, append = false) {
    try {
        const qnt = document.getElementById("quantityInput").value;
        const url = `https://fakerapi.it/api/v2/companies?_quantity=${qnt}&_page=${page}`;

        const response = await fetch(url);
        const data = await response.json();

        const tableBody = document.getElementById("companyTable").querySelector("tbody");

        if (!append) tableBody.innerHTML = "";

        data.data.forEach(company => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = company.name;
            row.appendChild(nameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = company.email;
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        });

        isLoading = false;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function toggleInfiniteScrolling() {
    isInfiniteScrolling = !isInfiniteScrolling;

    const statusMessage = document.getElementById("scrollStatus");
    if (isInfiniteScrolling) {
        statusMessage.textContent = "Infinite Scrolling Ativado";
        infiniteScrolling(); // Inicia o evento de rolagem
        
    } else {
        statusMessage.textContent = "Infinite Scrolling Desativado";
        window.removeEventListener("scroll", handleScroll); // Remove o evento
    }
}

function infiniteScrolling() {
    window.addEventListener("scroll", handleScroll);
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading && isInfiniteScrolling) {
        isLoading = true;
        currentPage++;
        loadCompanies(currentPage, true); // Incrementa a tabela
    }
}

function filterName() {
    const filterInput = document.getElementById("filterInput").value.toLowerCase();
    const tableRows = document.querySelectorAll("#companyTable tbody tr");

    tableRows.forEach(row => {
        const nameCell = row.cells[1].textContent.toLowerCase();
        if (nameCell.includes(filterInput) || filterInput === "") {
            row.style.display = ""; 
        } else {
            row.style.display = "none"; 
        }
    });
}

function filterByLetter() {
    const filterLetter = document.getElementById("letterInput").value.trim().toLowerCase();  
    const tableRows = document.querySelectorAll("#companyTable tbody tr");  
    
        tableRows.forEach(row => {
            const nameCell = row.cells[1].textContent.trim().toLowerCase();  // Obtém o nome da empresa na célula da segunda coluna
            
            if (nameCell.charAt(0) === filterLetter) { 
                row.style.display = "none";
            } else {
                row.style.display = "";  
            }
        });
    } 



document.addEventListener("DOMContentLoaded", () => {
});

