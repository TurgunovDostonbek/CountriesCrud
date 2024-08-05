const createList = document.querySelector("#create_list");
const heroWrapper = document.querySelector(".hero_wrapper");
const loader = document.getElementById("loader");
const modalWrapper = document.querySelector(".modal_wrapper");

const API = "https://restcountries.com/v3.1/all";
let listCards = [];
const getData = async () => {
  const data = await fetch(API);
  // loading(true);
  const res = await data.json();
  // loading(false);
  return res;
};

getData()
  .then((data) => {
    listCards = data;
    data.map((item, index) => {
      createList.innerHTML += `
            <tr>
                <td>
                    <img src="${item.flags.png}" alt="">
                </td>
                <td>${item.name.common}</td>
                <td >${item.capital}</td>
                <td>${item.area}</td>
                <td>${item.population}</td>
                <td>${item.continents}</td>
                <td>
                  <button class ="btnUpdate" onclick = "Update(${index})"  >Update</button>
                  <button class="btnDelete"  >Delete</button>
                </td>
            </tr>
        `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

document.addEventListener("click", (e) => {
  if (e.target.classList == "btnDelete") {
    e.target.parentElement.parentElement.remove();
  }
});

// document.addEventListener("click", (e) => {
//   if (e.target.classList == "btnUpdate") {
//     e.target.parentElement.parentElement.remove();
//   }
// });

function Update(id) {
  const country = listCards[id];
  console.log(country);
  const language = Array.from(country.languages);
  console.log(language);

  modalWrapper.innerHTML += `
    <div class="container modal">
            <img src="${country.flags.png}" alt="">
            <div class="modal_card">
                <h1>Name: <span>${country.name.common}</span></h1>
                <h3>Capital city : <span>${country.capital}</span></h3>
                <h3>Area <span>${country.area}</span></h3>
                <h3>Language <span>${country.languages.valueOf()}</span></h3>
                <h3>Currency <span>${country.currencies}</span></h3>
                <h3>Popolation <span>${country.population}</span></h3>
            </div>
        </div>
  `;
  modalWrapper.style.display = "block";
  heroWrapper.style.display = "none";
}
