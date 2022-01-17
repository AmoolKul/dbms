
const equipment_table = document.querySelector(".equipment_table");


equipment_table.addEventListener("click", (e) => {
  console.log(e.target)
  if (e.target.classList.contains("equipment")) {
    console.log("-----------------")
    console.log(e.target.id)
    popup(e.target.id);
    return;
  }

  if (e.target.classList.contains("rent_now")) {
    console.log("rufhuirhu")
    console.log(e.target.id)

    let data = {
      id: e.target.id
    }

    fetch("/issueequipment", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((data)=>{
      return data.json();
    })
    .then(data=>{
      if(data.status){
        window.location.href = '/issue'
      }
    })

  }
})


const popup = (id) => {
  var popup = document.getElementById(`myPopup${id}`);
  console.log(id)

  let message = ""


  switch (Number(id)) {
    case 1:
      console.log("here")
      message = "The rental set consists of 2 high quality Tennis racquets and 3 Tennis balls"

      break;

    case 2:
      message = "The rental set consists of one Baseball Bat ,a pair of batting & catching gloves and cleats"
      break;

    case 3:
      message = "The rental set consists of one Olympic level Bow, 10 arrows, protective gear for one and one target"
      break;

    case 4:
      message = "The rental set consists of one helmet, a pair of gloves, chest guard, batting pads and 2 leather balls "
      break;

    case 5:
      message = "The rental set consists of two high quality hockey sticks, 2 pairs of shoes, 2 pairs of shin guards and a hockey ball"
      break;

    case 6:
      message = "The rental set consists of a kitbag, 2 badminton racquets, 2 grips and a box shuttlecocks"
      break;

    case 7:
      message = "The rental set consists of four different golfing clubs, a putting club and 5 golf balls"
      break;

    default:
      break;
  }

  popup.innerHTML = `${message} <br> <br><button id="${id}" class="rent_now"> Rent now </button>`
  popup.classList.toggle("show");




}

// // When the user clicks on div, open the popup
// function myFunction1() {
//   var popup = document.getElementById("myPopup1");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction2() {
//   var popup = document.getElementById("myPopup2");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction3() {
//   var popup = document.getElementById("myPopup3");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction4() {
//   var popup = document.getElementById("myPopup4");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction5() {
//   var popup = document.getElementById("myPopup5");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction6() {
//   var popup = document.getElementById("myPopup6");
//   popup.classList.toggle("show");
// }

// // When the user clicks on div, open the popup
// function myFunction7() {
//   var popup = document.getElementById("myPopup7");
//   popup.classList.toggle("show");
// }

fetch("/getequipment")
  .then((data) => {
    return data.json()
  })
  .then((data) => {
    console.log(data);

    data.map((equipments, index) => {

      let tr = document.createElement('tr');

      tr.innerHTML = `
    <td> ${index + 1} </td>
                <td> <div id="${index + 1}" class="tennispop equipment" > ${equipments.equipment_name}
                        <span class="popuptext1" id="myPopup${index + 1}">  </span>
                     </div>
                </td>
                <td> ${equipments.equipment_available} </td>
                <td> <img src="${equipments.equipment_img}" alt="Tennis"></td>
                <td> ${equipments.price}$ per month </td>
    
    `
      equipment_table.appendChild(tr);

    })
  })

