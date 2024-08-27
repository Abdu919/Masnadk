const links = document.querySelectorAll('.product-card a'); 
const mainContainer = document.querySelector('.container'); 

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const url = link.getAttribute('href'); 

        fetch(url)
            .then(response => response.text())
            .then(html => {
                mainContainer.innerHTML = html; 
            })
            .catch(error => console.error('Error fetching page:', error));
    });
});

// Initial content load (optional)
window.onload = () => {
    const firstLink = links[0]; 
    firstLink.click(); 
};
