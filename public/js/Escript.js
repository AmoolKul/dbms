
const equipment_table = document.querySelector(".equipment_table");

// When the user clicks on div, open the popup
function myFunction1() {
  var popup = document.getElementById("myPopup1");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction2() {
  var popup = document.getElementById("myPopup2");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction3() {
  var popup = document.getElementById("myPopup3");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction4() {
  var popup = document.getElementById("myPopup4");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction5() {
  var popup = document.getElementById("myPopup5");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction6() {
  var popup = document.getElementById("myPopup6");
  popup.classList.toggle("show");
}

// When the user clicks on div, open the popup
function myFunction7() {
  var popup = document.getElementById("myPopup7");
  popup.classList.toggle("show");
}

fetch("/getequipment")
  .then((data) => {
    return data.json()
  })
  .then((data) => {
    console.log(data);


    var textnode = document.createTextNode("Water");

    data.map((equipments) => {

      let tr = document.createElement('tr');


      tr.innerHTML = `
    <td> 1 </td>
                <td> <div class="tennispop" onclick="myFunction1()"> ${equipments.equipment_name}
                        <span class="popuptext1" id="myPopup1"> The rental set consists of 2 high quality Tennis racquets and 3 Tennis balls <br> <br><a href=""> Rent now </a></span>
                     </div>
                </td>
                <td> ${equipments.equipment_availabe} </td>
                <td> <img src="${equipments.equipment_img}" alt="Tennis"></td>
                <td> ${equipments.price}$ per month </td>
    
    `

    equipment_table.appendChild(tr);



    })





  })

