
const BREED_API_URL = 'https://dog.ceo/api/breeds/list/all';
const FIRST_PIC_API_URL = 'https://dog.ceo/api/breeds/image/random';

const select = document.querySelector('.breeds');

const spinner = document.querySelector(".spinner")
const imageElement = document.querySelector('.img');

// imageElement.onload = function() {
//     spinner.style.display = "none";
//     imageElement.style.display = 'block'
// }

// fetch(FIRST_PIC_API_URL)
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         const firstPic = data.message;
//         imageElement.src = firstPic;
//     })

fetch(BREED_API_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject); 

        for (let i = 0; i < breedsArray.length; i++){
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    })

select.addEventListener("change", function(event) {
    const PREEDPIC_URL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    // imageElement.style.display = "none";
    spinner.classList.add("show");
    imageElement.classList.remove("show");

    // imageElement.onerror = null;
    // imageElement.src = '';
    
    fetch(PREEDPIC_URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const breedsPic = data.message;
            imageElement.src = breedsPic;

            imageElement.onload = function(){
                spinner.classList.remove("show");
                imageElement.classList.add("show");
            }
            
            imageElement.onerror = function() {
                alert('can not download image');
            }
        })
});