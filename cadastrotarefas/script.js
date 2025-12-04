async function listar() {
    var div = document.getElementById('tarefas')

    const resposta = await fetch('http://159.65.228.63/tarefas')
    const tarefas = await resposta.json()
    
    var temTarefaValida = false
    var i = 0
    while (i < tarefas.length) {
        if (tarefas[i].descricao !== "") {
            temTarefaValida = true
        }
        i++
    }

    if (temTarefaValida === false) {
        alert('Nenhuma tarefa cadastrada')
        return
    }
    
    criarTabela(tarefas)
}

function criarTabela(tarefas) {
    document.getElementById("tarefas").textContent = ""
    const table = document.createElement("table")
    table.setAttribute("border", "1")

    const row = document.createElement("tr")
    const th1 = document.createElement("th")
    th1.textContent = 'Prioridade'
    const th2 = document.createElement("th")
    th2.textContent = 'Descrição'
    const th3 = document.createElement("th")
    th3.textContent = 'Local'
    const th4 = document.createElement("th")
    th4.textContent = 'Recursos'
    const th5 = document.createElement("th")
    th5.textContent = 'Data'
    const th6 = document.createElement("th")
    th6.textContent = 'Matrícula'
    row.appendChild(th1)
    row.appendChild(th2)
    row.appendChild(th3)
    row.appendChild(th4)
    row.appendChild(th5)
    row.appendChild(th6)
    table.appendChild(row)
    
    for (var i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i]
        const rowDados = document.createElement("tr")
        
        if (tarefa.prioridade == "Urgente") {
            rowDados.setAttribute("class", "urgente")
        }
        
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const td5 = document.createElement("td")
        const td6 = document.createElement("td")
        
        td1.textContent = tarefa.prioridade
        td2.textContent = tarefa.descricao
        td3.textContent = tarefa.local
        
        
        td4.textContent = tarefa.recursosNecessarios
        td5.textContent = tarefa.dataLimite
        td6.textContent = tarefa.matricula

        rowDados.appendChild(td1)
        rowDados.appendChild(td2)
        rowDados.appendChild(td3)
        rowDados.appendChild(td4)
        rowDados.appendChild(td5)
        rowDados.appendChild(td6)
        table.appendChild(rowDados)
    }
    
    const container = document.getElementById('tarefas')
    container.appendChild(table)
}

async function cadastrar() {
    var prio = document.getElementById('prioridade').value
    var desc = document.getElementById('descricao').value
    var local = document.getElementById('local').value
    var rec = document.getElementById('recursos').value
    var data = document.getElementById('dataLimite').value
    var mat = document.getElementById('matricula').value

    if (prio == "") { 
        alert("Selecione a prioridade!")
        return }
    if (desc == "") { 
        alert("Digite a descrição!")
        return }
    if (local == "") { 
        alert("Digite o local!")
        return }
    if (data == "") { 
        alert("Selecione a data!") 
        return }
    if (mat == "") { 
        alert("Digite matrícula!") 
        return }
    if (mat <= "0") { 
        alert("Matrícula deve ser maior que zero!") 
        return }

    var dataLimiteStr = ""
    var encontrouT = false
    for (var i = 0; i < data.length; i++) {
        var ch = data[i]
        if (ch == 'T') {
            dataLimiteStr += ' '
            encontrouT = true
        } else {
            dataLimiteStr += ch
        }
    }

    var tarefa = {
        prioridade: prio,
        descricao: desc,
        local: local,
        recursosNecessarios: rec,
        dataLimite: dataLimiteStr,
        matricula: mat
    };

    const resposta = await fetch('http://159.65.228.63/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    });

    alert("Tarefa cadastrada!")
    document.getElementById('prioridade').value = ""
    document.getElementById('descricao').value = ""
    document.getElementById('local').value = ""
    document.getElementById('recursos').value = ""
    document.getElementById('dataLimite').value = ""
    document.getElementById('matricula').value = ""
}

if (document.getElementById('tarefas')) {
    listar()
}