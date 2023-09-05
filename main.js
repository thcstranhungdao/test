
function cardIsShowing(){
    return document.querySelector('.card') !== null
}

function clickedOn(el, e){
    return document.querySelector(`${el}`).contains(e.target)
}

function getCssColor(cssVar){
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar);
}

function capitalize(string) {
    if (string !== null) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function handleMissingNumber(number, suffix){
    if (number === null){
        return "Unknown"
    } else {
        return number + " " + suffix
    }
}

function handleMissing(string) {
    string = String(string)
    if (string === "null" || string === "undefined" || string.search("unknown") !== -1) {
        return "unknown"
    }
    return string
}

function switchToUnderscores(string){
    return string.replace(/['`~!@#$%^&*()|+-=?;:' ",.<>\{\}\[\]\\\/]/gi, "_")
}

function findElementByName(array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function getColorsFromCategory(category){
    let colorLight = tinycolor(eval(`${switchToUnderscores(category)}_color`)).lighten(5).toString()
    let colorDark = tinycolor(eval(`${switchToUnderscores(category)}_color`)).darken(15).toString()

    return {light: colorLight, dark: colorDark}
}

function createElementDiv(element, target) {

    let ele = findElementByName(data.elements, 'name', element)[0]
    let atomicnumber = ele.number
    let atomicmass = ele.atomic_mass
    let symbol = ele.symbol
    let name = ele.name
    let category = handleMissing(switchToUnderscores(ele.category))
    let colors = getColorsFromCategory(category)

    //if atomic mass is too big
    if (String(atomicmass).length >= 7) {
        atomicmass = Number(atomicmass).toFixed(2)
    }

    let eleDiv = `
    <div class="${category} element flex-col flex-center" style="background: linear-gradient(${colors.light}, ${colors.dark})">
    <div class="flex-row element_info">
        <div>${atomicnumber}</div>
        <div>${atomicmass}u</div>
    </div>
    <div class="symbol" translate="no">${symbol}</div>
    <div>${name}</div>
    </div>
    `

    target.insertAdjacentHTML("beforeend", eleDiv)
}

function removeCard() {
    if (cardIsShowing()) {
        let card = periodicTable.querySelector(".card")
        card.classList.remove("grow")
        card.classList.add("shrink")
        setTimeout(() => {
            periodicTable.removeChild(card)
        }, 1000)
    }

}

function getElementInfo(elementObj) {

    // if theres already a card
    removeCard()

    let elementInfo = findElementByName(data.elements, 'name', elementObj.id)[0]
    let colors = getColorsFromCategory(handleMissing(switchToUnderscores(elementInfo.category)))
    let cardDiv = `
    <div class="card ${switchToUnderscores(handleMissing(elementInfo.category))} grow flex-col" style="background: linear-gradient(${colors.light}, ${colors.dark})">
        <nav>
            <div class="x-icon" type="button" onclick="removeCard()">X</div>
        </nav>
        <div class="flex-col">
            <table>
                <tr>
                    <th>Name</th>
                    <td><a target="_blank" href="${elementInfo.source}">${elementInfo.name}</a></td>
                </tr>
                <tr>
                    <th>Atomic Number</th>
                    <td>${elementInfo.number}</td>
                </tr>
                <tr>
                    <th>Discovered by</th>
                    <td>${capitalize(handleMissing(elementInfo.discovered_by))}</td>
                </tr>
                <tr>
                    <th>Named by</th>
                    <td> ${capitalize(handleMissing(elementInfo.named_by))}</td>
                </tr>
                <tr>
                    <th>Appearance</th>
                    <td>${capitalize(handleMissing(elementInfo.appearance))}</td>
                </tr>
                <tr>
                    <th>Atomic Mass</th>
                    <td>${handleMissingNumber(elementInfo.atomic_mass, 'u')}</td>
                </tr>
                <tr>
                    <th>Boiling point</th>
                    <td>${handleMissingNumber(elementInfo.boil, 'K')}</td>
                </tr>
                <tr>
                    <th>Category</th>
                    <td>${capitalize(elementInfo.category)}</td>
                </tr>
                <tr>
                    <th>Density</th>
                    <td>${handleMissingNumber(elementInfo.density, 'kg/m³')}</td>
                </tr>
                <tr>
                    <th>Melting point</th>
                    <td>${handleMissingNumber(elementInfo.melt, 'K')}</td>
                </tr>
                <tr>
                    <th>Electron configuration</th>
                    <td>${handleMissing(elementInfo.electron_configuration)}</td>
                </tr>
            </table>
            <table>
                <th style="text-align: center">Summary</th>
                <tr>
                    <td>${elementInfo.summary}</td>
                </tr>     
            </table>
        </div>
    </div>
    `

    periodicTable.classList.add("unclickable")
    periodicTable.insertAdjacentHTML("beforeend", cardDiv)

    setTimeout(() => {
        periodicTable.classList.remove("unclickable")
    }, 1000)
}



periodicTable = document.querySelector(".table")
body = document.getElementsByTagName('body')[0]

let reactive_nonmetal_color = getCssColor('--reactive_nonmetal_color')
let polyatomic_nonmetal_color = getCssColor('--reactive_nonmetal_color')
let diatomic_nonmetal_color = getCssColor('--reactive_nonmetal_color')
let noble_gas_color = getCssColor('--noble_gas_color')
let alkali_metal_color = getCssColor('--alkali_metal_color')
let transition_metal_color = getCssColor('--transition_metal_color')
let lanthanide_color = getCssColor('--lanthanide_color')
let actinide_color = getCssColor('--actinide_color')
let metalloid_color = getCssColor('--metalloid_color')
let post_transition_metal_color = getCssColor('--post_transition_metal_color')
let alkaline_earth_metal_color = getCssColor('--alkaline_earth_metal_color')
let unknown_color = getCssColor('--unknown_color')


// gets table info

var request = new XMLHttpRequest()
request.open("GET", "data.json", false)
request.send(null)
var data = JSON.parse(request.responseText)


// scan for elements

const elements = document.getElementsByTagName("element")

for (let i = 0; i < elements.length; i++) {
    let name = elements[i].id
    let target = elements[i]
    createElementDiv(name, target)
    elements[i].onclick = () => { getElementInfo(elements[i]) }
}


// remove card if clicked outside table 

window.addEventListener('click', function (e) {
    if (!clickedOn('.table', e)) {
        removeCard()
    }
});

