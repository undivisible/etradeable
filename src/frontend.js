var currentTheme = "dark";
var once2 = false;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value) {
    document.cookie = name + '=' + (value || '') + '; path=/';
}

function toggleTheme() {
    const body = document.body;
    switch (currentTheme) {
        case 'dark':
            body.classList.add('nord');
            body.classList.remove('dark');
            currentTheme = 'nord';
            setCookie('theme', 'nord');
            break;
        case 'nord':
            body.classList.add('forest');
            body.classList.remove('nord');
            currentTheme = 'forest';
            setCookie('theme', 'forest');
            break;
        case 'forest':
            body.classList.add('sepia');
            body.classList.remove('forest');
            currentTheme = 'sepia';
            setCookie('theme', 'sepia');
            break;
        case 'sepia':
            body.classList.add('light');
            body.classList.remove('sepia');
            currentTheme = 'light';
            setCookie('theme', 'light');
            break;
        case 'light':
            body.classList.add('dark');
            body.classList.remove('light');
            currentTheme = 'dark';
            setCookie('theme', 'dark');
            break;
    }
}

function swap(page) {
    if (page === "searchm") {
        setCookie('tolkoSearch', 'true');
        page = 'search';
    }
    page = page + '.html';
    document.body.style.opacity = 1;
    document.body.style.animation = 'exit 1s ease-out forwards';
    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function(){
    const balContainer = document.getElementById('balc');
    const savedTheme = getCookie('theme');
    var tolkoSearch = getCookie('tolkoSearch');
    if (savedTheme) {
        const body = document.body;
        body.classList.add(savedTheme);
        currentTheme = savedTheme;
    }
    if (tolkoSearch === 'true') {
        balContainer.style.display = 'none';
    }
});