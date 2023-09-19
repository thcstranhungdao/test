var btnPage = document.getElementById("btn-page");

const greenColor = "#00ff00";
const darkYellowColor = "#cccc00";
const pinkColor = "#ff00ff";
const lightYellowColor = "#ffffcc";

const listElementGreen = document.getElementsByClassName("green");
const listElementDarkYellow = document.getElementsByClassName("darkYellow");
const listElementPink = document.getElementsByClassName("pink");
const listElementLightYellow = document.getElementsByClassName("light-yellow");

function cardIsShowing() {
  return document.querySelector(".card") !== null;
}

function clickedOn(el, e) {
  return document.querySelector(`${el}`).contains(e.target);
}

function getCssColor(cssVar) {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar);
}

function capitalize(string) {
  if (string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function handleMissingNumber(number, suffix) {
  if (number === null) {
    return "Không biết";
  } else {
    return number + " " + suffix;
  }
}

function handleMissing(string) {
  string = String(string);
  if (
    string === "null" ||
    string === "undefined" ||
    string.search("unknown") !== -1
  ) {
    return "unknown";
  }
  return string;
}

function switchToUnderscores(string) {
  return string.replace(/['`~!@#$%^&*()|+-=?;:' ",.<>\{\}\[\]\\\/]/gi, "_");
}

function findElementByName(array, key, value) {
  return array.filter(function (object) {
    return object[key] === value;
  });
}

function getColorsFromCategory(colorName) {
  switch (colorName) {
    case "green":
      return greenColor;
    case "darkYellow":
      return darkYellowColor;
    case "pink":
      return pinkColor;
    case "lightYellow":
      return lightYellowColor;
    default:
      return "#ffffff";
  }
}

function createElementDiv(element, target, color) {
  let ele = findElementByName(data.elements, "name", element)[0];
  let atomicnumber = ele.number;
  let atomicmass = ele.atomic_mass;
  let symbol = ele.symbol;
  let name = ele.name;
  let category = handleMissing(switchToUnderscores(ele.category));
  let colors = getColorsFromCategory(color);

  //if atomic mass is too big
  if (String(atomicmass).length >= 7) {
    atomicmass = Number(atomicmass).toFixed(2);
  }

  let eleDiv = `
    <div class="${category} element flex-col flex-center" style="background: ${colors}">
    <div class="flex-row element_info">
        <div>${atomicnumber}</div>
        <div>${atomicmass}u</div>
    </div>
    <div class="symbol" translate="no">${symbol}</div>
    <div>${name}</div>
    </div>
    `;

  target.insertAdjacentHTML("beforeend", eleDiv);
}

function removeCard() {
  if (cardIsShowing()) {
    let card = periodicTable.querySelector(".card");
    card.classList.remove("grow");
    card.classList.add("shrink");
    btnPage.style.zIndex = 9999;
    setTimeout(() => {
      periodicTable.removeChild(card);
    }, 1000);
  }
}

function getElementInfo(elementObj, color) {
  // if theres already a card
  removeCard();
  btnPage.style.zIndex = -1;
  let elementInfo = findElementByName(data.elements, "name", elementObj.id)[0];

  let colors = getColorsFromCategory(color);
  let cardDiv = `
    <div class="card ${switchToUnderscores(
      handleMissing(elementInfo.category)
    )} grow flex-col text-dark" style="background: ${colors}">
        <nav>
            <div class="x-icon" type="button" onclick="removeCard()">X</div>
        </nav>
        <div class="flex-col">
            <table>
                <tr>
                    <th>Tên</th>
                    <td><a target="_blank" style="color:#000;" href="${elementInfo.source}">${
    elementInfo.name
  }</a></td>
                </tr>
                <tr>
                    <th>Số hiệu nguyên tử</th>
                    <td>${elementInfo.number}</td>
                </tr>
                <tr>
                    <th>Phát hiện</th>
                    <td>${capitalize(
                      handleMissing(elementInfo.discovered_by)
                    )}</td>
                </tr>
                <tr>
                    <th>Được đặt tên bởi</th>
                    <td> ${capitalize(handleMissing(elementInfo.named_by))}</td>
                </tr>
                <tr>
                    <th>Vẻ bề ngoài</th>
                    <td>${capitalize(
                      handleMissing(elementInfo.appearance)
                    )}</td>
                </tr>
                <tr>
                    <th>Khối lượng nguyên tử</th>
                    <td>${handleMissingNumber(
                      elementInfo.atomic_mass,
                      "u"
                    )}</td>
                </tr>
                <tr>
                    <th>Điểm sôi</th>
                    <td>${handleMissingNumber(elementInfo.boil, "K")}</td>
                </tr>
                <tr>
                    <th>Tỉ trọng</th>
                    <td>${handleMissingNumber(
                      elementInfo.density,
                      "kg/m³"
                    )}</td>
                </tr>
                <tr>
                    <th>Độ nóng chảy</th>
                    <td>${handleMissingNumber(elementInfo.melt, "K")}</td>
                </tr>
                <tr>
                    <th>Cấu hình electron</th>
                    <td>${handleMissing(
                      elementInfo.electron_configuration
                    )}</td>
                </tr>
            </table>
            <table>
                <th style="text-align: center">Bản tóm tắt</th>
                <tr>
                    <td>${elementInfo.summary}</td>
                </tr>     
            </table>
        </div>
    </div>
    `;

  periodicTable.classList.add("unclickable");
  periodicTable.insertAdjacentHTML("beforeend", cardDiv);

  setTimeout(() => {
    periodicTable.classList.remove("unclickable");
  }, 1000);
}

periodicTable = document.querySelector(".table");
body = document.getElementsByTagName("body")[0];

let reactive_nonmetal_color = getCssColor("--reactive_nonmetal_color");
let polyatomic_nonmetal_color = getCssColor("--reactive_nonmetal_color");
let diatomic_nonmetal_color = getCssColor("--reactive_nonmetal_color");
let noble_gas_color = getCssColor("--noble_gas_color");
let alkali_metal_color = getCssColor("--alkali_metal_color");
let transition_metal_color = getCssColor("--transition_metal_color");
let lanthanide_color = getCssColor("--lanthanide_color");
let actinide_color = getCssColor("--actinide_color");
let metalloid_color = getCssColor("--metalloid_color");
let post_transition_metal_color = getCssColor("--post_transition_metal_color");
let alkaline_earth_metal_color = getCssColor("--alkaline_earth_metal_color");
let unknown_color = getCssColor("--unknown_color");

// gets table info

var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null);
var data = JSON.parse(request.responseText);

// scan for elements

const elements = document.getElementsByTagName("element");

for (let i = 0; i < elements.length; i++) {
  let name = elements[i].id;
  let target = elements[i];
  createElementDiv(name, target, target.className);

  elements[i].onclick = () => {
    const itemAudio = new Audio(`./music/${elements[i].id.toLowerCase()}.mp3`);
    itemAudio.play();
    getElementInfo(elements[i], target.className);
  };
}

// remove card if clicked outside table

window.addEventListener("click", function (e) {
  if (!clickedOn(".table", e)) {
    removeCard();
  }
});
