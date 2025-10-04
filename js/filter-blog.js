// Configuração
const POSTS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = 'Todos';

// Todos os posts (adicione mais conforme criar)
const allPosts = [
    // Os posts que já existem no HTML...
    // Depois adicione novos posts aqui
];

const buttons = document.querySelectorAll(".category-btn");
const postsGrid = document.querySelector(".posts-grid");

// Função para renderizar posts
function renderPosts() {
    // Filtrar por categoria
    let filteredPosts = currentCategory === 'Todos' 
        ? document.querySelectorAll('.post')
        : document.querySelectorAll(`.post[data-category="${currentCategory}"]`);
    
    filteredPosts = Array.from(filteredPosts);
    
    // Calcular índices
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    // Esconder todos
    document.querySelectorAll('.post').forEach(post => {
        post.style.display = 'none';
    });
    
    // Mostrar apenas os da página atual
    filteredPosts.slice(startIndex, endIndex).forEach(post => {
        post.style.display = 'block';
    });
    
    // Atualizar paginação
    renderPagination(filteredPosts.length);
}

// Função para criar paginação
function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    
    // Remove paginação existente
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    // Se só tem 1 página, não mostra paginação
    if (totalPages <= 1) return;
    
    // Cria nova paginação
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // Botão anterior
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '←';
        prevBtn.onclick = () => {
            currentPage--;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(prevBtn);
    }
    
    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(pageBtn);
    }
    
    // Botão próximo
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = '→';
        nextBtn.onclick = () => {
            currentPage++;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(nextBtn);
    }
    
    document.querySelector('.blog-container').appendChild(pagination);
}

// Filtro de categorias
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active dos botões
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Atualiza categoria
        const category = button.getAttribute("data-category");
        currentCategory = category || 'Todos';
        currentPage = 1; // Volta pra primeira página
        
        renderPosts();
    });
});

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
});
