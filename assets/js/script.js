const items = []
var presupuesto = 0

//Obtener td donde anotar presupuesto, gastos y saldo
const presupuestoTxt = document.getElementById("presupuestoTxt")
const gastosTxt = document.getElementById("gastosTxt")
const saldoTxt = document.getElementById("saldoTxt")

/* FUNCIÓN PARA CALCULAR TOTAL GASTOS, también ocupa la variable presupuesto 
para calcular saldo e inyecta gastos y saldo en html */
function calcularGastos() {
    let total = items.reduce((total, item) => {
        return total + item.cost
    }, 0)
    let saldo = presupuesto - total
    gastosTxt.innerHTML = `$${Number(total).toLocaleString('es-CL')}`
    saldoTxt.innerHTML = `$${Number(saldo).toLocaleString('es-CL')}`
}

//Obtener boton de presupuesto y agregar función para presupuesto
document.getElementById("calcularPresupuesto").addEventListener("click", calcularPresupuesto)

//FUNCION PARA PRESUPUESTOS
function calcularPresupuesto(event) {
    event.preventDefault(); //no recargar página
    presupuesto = document.getElementById("presupuesto").value;
    presupuestoTxt.innerHTML = `$${Number(presupuesto).toLocaleString('es-CL')}`
    calcularGastos()
}

//Obtener boton de gastos y agregar función para gastos
document.getElementById("addGasto").addEventListener("click", addItem)

//FUNCION PARA AGREGAR NUEVOS GASTOS
function addItem(event) {
    event.preventDefault(); //no recargar página

    // Obtener nombre y costo del gasto
    const inputName = document.getElementById("nombreGasto").value;
    const inputCost = document.getElementById("cantidadGasto").value;

    //crear objeto para lista
    const newItem = {
        id: Symbol(),
        name: inputName,
        cost: parseFloat(inputCost) 
    }

    // Crear tr y tds para nombre y costo, y agregar datos
    const newRow = document.createElement("tr");
    const newItemName = document.createElement("td");
    newItemName.innerText = inputName;
    newItemName.className = "item";
    const newItemCost = document.createElement("td");
    newItemCost.innerText = `$${Number(inputCost).toLocaleString('es-CL')}`;
    newItemCost.className = "item";

    // Crear botón remover
    const removeButton = document.createElement("td");
    removeButton.innerText = "";
    removeButton.className = "remove-btn bi bi-trash azul";

    /* Listener para botón - elimina elemento de html y lista, usando id 
    para encontrar en lista, y también llama la función para calcular gastos */
    removeButton.addEventListener("click", () => {
        newRow.remove();
        let index = items.findIndex(item => item.id === newItem.id);
        if (index > -1) {
            items.splice(index, 1);
            console.log(items);
            calcularGastos()
        }
    });

    // Agregar los elementos td a la tr, y luego agregar la tr a la tabla
    newRow.appendChild(newItemName);
    newRow.appendChild(newItemCost);
    newRow.appendChild(removeButton);
    document.getElementById("list").appendChild(newRow);

    // meter objeto en array
    items.push(newItem);
    console.log(items);
    //Calcular gastos y actualizar html
    calcularGastos()
}

