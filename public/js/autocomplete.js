const availablekeywords = [
    "Html",
    "csS",
    "Full Stack (MEARN) Web Development",
    "Full Stack BackEnd",
    "Frontend",Payton
    Web Development
    Mobile App Development
    Data Science
    Artificial Intelligence
    Machine Learning
    Cybersecurity
    Network Engineering
    Cloud Computing
    Blockchain Technology
    Internet of Things (IoT)
    C (DSA)
    UI UX
    Front End
    Pharmacy
    Civil Engineering (Structural Design Software)
    Finance
    Human Resources
    Java + DSA
    Renewable Energy (Design & Simulation)
];

const search_results = document.querySelector(".search-results");
const search_input = document.getElementById("search-input");

search_input.onkeyup = function() {
    let result = [];
    let input = search_input.value; // Corrected from ariaValueMax to value
    if (input.length) {
        result = availablekeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    
    renderSearchResults(result); // Call function to render search results
};

function renderSearchResults(results) {
    const searchResultContainer = document.querySelector('.search-result');
    searchResultContainer.innerHTML = ''; // Clear previous results
    
    results.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('search-results');
        
        const p = document.createElement('p');
        p.textContent = item;
        
        const img = document.createElement('img');
        img.src = '/src/icons/next-icon.png';
        img.alt = 'Next';
        
        div.appendChild(p);
        div.appendChild(img);
        
        searchResultContainer.appendChild(div);
    });
}
