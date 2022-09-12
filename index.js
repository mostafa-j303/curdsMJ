let a1 =document.getElementById('a1')
let a2 =document.getElementById('a2')
let a3 =document.getElementById('a3')
let a4 =document.getElementById('a4')
let a5 =document.getElementById('a5')
let a6 =document.getElementById('a6')
let a7 =document.getElementById('a7')
let a8 =document.getElementById('a8')
let a9 =document.getElementById('a9')
let a10 =document.getElementById('a10')
let a11 =document.getElementById('a11')
let a12 =document.getElementById('a12')
let submit=document.getElementById('submit')

let mood="create"
let tmp;

// create product 
let dataPro;
if(localStorage.member != null){
    dataPro= JSON.parse(localStorage.member)
}else{dataPro=[]}

submit.onclick= function(){
    let newPro = {
        a1:a1.value.toLowerCase(),
        a2:a2.value.toLowerCase(),
        a3:a3.value.toLowerCase(),
        a4:a4.value.toLowerCase(),
        a5:a5.value.toLowerCase(),
        a6:a6.value.toLowerCase(),
        a7:a7.value.toLowerCase(),
        a8:a8.value.toLowerCase(),
        a9:a9.value.toLowerCase(),
        a10:a10.value.toLowerCase(),
        a11:a11.value.toLowerCase(),
        a12:a12.value.toLowerCase(),
    }

    if(a1.value != ""){
        if(mood=="create"){
        dataPro.push(newPro)
        }else{
            dataPro[tmp]=newPro;
            mood="create";
            submit.innerHTML= "CREATE"
        }
    clearData()    
    }


    localStorage.setItem('member',JSON.stringify(dataPro))
    showData()
}


// excel
let selectedFile;
document.getElementById("fileUpload").addEventListener("change",function(event){
    selectedFile= event.target.files[0];
});
document.getElementById("uploadExcel").addEventListener("click",function(){
    if (selectedFile){
        

        console.log("file Uploaded");
        let fileReader = new FileReader();
        fileReader.onload = function(event){
            let data = event.target.result;

            let workbook = XLSX.read(data, {
                type:"binary"
            });
            workbook.SheetNames.forEach(sheet =>{
                let rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                
                let newPro={};
                for(let i=0;i<rowObject.length;i++){
        
                
                newPro = {
                    a1:rowObject[i].A1,
                    a2:rowObject[i].A2 || "",
                    a3:rowObject[i].A3 || "",
                    a4:rowObject[i].A4 || "",
                    a5:rowObject[i].A5 || "",
                    a6:rowObject[i].A6 || "",
                    a7:rowObject[i].A7 || "",
                    a8:rowObject[i].A8 || "",
                    a9:rowObject[i].A9 || "",
                    a10:rowObject[i].A10 || "",
                    a11:rowObject[i].A11 || "",
                    a12:rowObject[i].A12 || "",  
                }
                dataPro.push(newPro)

                dataPro[i].a1= dataPro[i].a1.toString().toLowerCase();
                dataPro[i].a2=dataPro[i].a2.toString().toLowerCase();
                dataPro[i].a3=dataPro[i].a3.toString().toLowerCase();
                dataPro[i].a4=dataPro[i].a4.toString().toLowerCase();
                dataPro[i].a5=dataPro[i].a5.toString().toLowerCase();
                dataPro[i].a6=dataPro[i].a6.toString().toLowerCase();
                dataPro[i].a7=dataPro[i].a7.toString().toLowerCase();
                dataPro[i].a8=dataPro[i].a8.toString().toLowerCase();
                dataPro[i].a9=dataPro[i].a9.toString().toLowerCase();
                dataPro[i].a10=dataPro[i].a10.toString().toLowerCase();
                dataPro[i].a11=dataPro[i].a11.toString().toLowerCase();
                dataPro[i].a12=dataPro[i].a12.toString().toLowerCase();

                localStorage.setItem("member",JSON.stringify(dataPro))
                 showData()
            }
            });
        };
        fileReader.readAsBinaryString(selectedFile)
    }
});
console.log(dataPro)







// clear inputs
function clearData(){
    a1.value="";
    a2.value="";
    a3.value="";
    a4.value="";
    a5.value="";
    a6.value="";
    a7.value="";
    a8.value="";
    a9.value="";
    a10.value="";
    a11.value="";
    a12.value=""; 
}

// read

function showData(){
    let table='';
    for(let i = 0;i< dataPro.length;i++){
        table += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].a1}</td>
        <td>${dataPro[i].a2}</td>
        <td>${dataPro[i].a3}</td>
        <td>${dataPro[i].a4}</td>
        <td>${dataPro[i].a5}</td>
        <td>${dataPro[i].a6}</td>
        <td>${dataPro[i].a7}</td>
        <td>${dataPro[i].a8}</td>
        <td>${dataPro[i].a9}</td>
        <td>${dataPro[i].a10}</td>
        <td>${dataPro[i].a11}</td>
        <td>${dataPro[i].a12}</td>
        <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML= table;
    
    let btnDelete=document.getElementById("deleteAll")
    if(dataPro.length >0){
        btnDelete.innerHTML=`<button onclick="deleteAll()">DELETE ALL (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML='';
    }
}showData()

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.member = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    let confirmMsg=confirm("ARE YOU SURE")
    if(confirmMsg=== true){
    localStorage.removeItem('member')
    dataPro.splice(0)
    showData()
    }
}

// update
function updateData(i){
    a1.value= dataPro[i].a1;
    a2.value = dataPro[i].a2;
    a3.value = dataPro[i].a3;
    a4.value = dataPro[i].a4;
    a5.value = dataPro[i].a5;
    a6.value = dataPro[i].a6;
    a7.value = dataPro[i].a7;
    a8.value = dataPro[i].a8;
    a9.value = dataPro[i].a9;
    a10.value = dataPro[i].a10;
    a11.value = dataPro[i].a11;
    a12.value = dataPro[i].a12;
    submit.innerHTML="UPDATE";
    mood="update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search

let sA1=document.getElementById("searchA1");
let sA2=document.getElementById("searchA2");
let sA3=document.getElementById("searchA3");
let sA4=document.getElementById("searchA4");
let sA5=document.getElementById("searchA5");
let sA6=document.getElementById("searchA6");
let sA7=document.getElementById("searchA7");
let sA8=document.getElementById("searchA8");
let sA9=document.getElementById("searchA9");
let sA10=document.getElementById("searchA10");
let sA11=document.getElementById("searchA11");
let sA12=document.getElementById("searchA12");


let searchMood = "";

function getSearchMood(id){

    let search = document.getElementById("search")

    if(id == "searchA1"){searchMood= "a1";search.placeholder = "Search By A1"}
    else if(id== "searchA2"){searchMood="a2";search.placeholder= "Search By A2"}       
    else if(id== "searchA3"){searchMood="a3";search.placeholder= "Search By A3"}       
    else if(id== "searchA4"){searchMood="a4";search.placeholder= "Search By A4"}       
    else if(id== "searchA5"){searchMood="a5";search.placeholder= "Search By A5"}       
    else if(id== "searchA6"){searchMood="a6";search.placeholder= "Search By A6"}       
    else if(id== "searchA7"){searchMood="a7";search.placeholder= "Search By A7"}       
    else if(id== "searchA8"){searchMood="a8";search.placeholder= "Search By A8"}       
    else if(id== "searchA9"){searchMood="a9";search.placeholder= "Search By A9"}       
    else if(id== "searchA10"){searchMood="a10";search.placeholder= "Search By A10"}       
    else if(id== "searchA11"){searchMood="a11";search.placeholder= "Search By A11"}       
    else {searchMood="a12";search.placeholder="Search By A12"}      
    search.focus();
    
    search.value="";
    showData()

   
    
    searchMood=="a1"?sA1.style.backgroundColor="#ff5050":sA1.style.backgroundColor="#2196f3";
    searchMood=="a2"?sA2.style.backgroundColor="#ff5050":sA2.style.backgroundColor="#2196f3";
    searchMood=="a3"?sA3.style.backgroundColor="#ff5050":sA3.style.backgroundColor="#2196f3";
    searchMood=="a4"?sA4.style.backgroundColor="#ff5050":sA4.style.backgroundColor="#2196f3";
    searchMood=="a5"?sA5.style.backgroundColor="#ff5050":sA5.style.backgroundColor="#2196f3";
    searchMood=="a6"?sA6.style.backgroundColor="#ff5050":sA6.style.backgroundColor="#2196f3";
    searchMood=="a7"?sA7.style.backgroundColor="#ff5050":sA7.style.backgroundColor="#2196f3";
    searchMood=="a8"?sA8.style.backgroundColor="#ff5050":sA8.style.backgroundColor="#2196f3";
    searchMood=="a9"?sA9.style.backgroundColor="#ff5050":sA9.style.backgroundColor="#2196f3";
    searchMood=="a10"?sA10.style.backgroundColor="#ff5050":sA10.style.backgroundColor="#2196f3";
    searchMood=="a11"?sA11.style.backgroundColor="#ff5050":sA11.style.backgroundColor="#2196f3";
    searchMood=="a12"?sA12.style.backgroundColor="#ff5050":sA12.style.backgroundColor="#2196f3";
}

function searchData(value){
    let table= "";
    for(let i=0;i<dataPro.length;i++){
    if(searchMood == "a1"){
            if(dataPro[i].a1.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a2"){
            if(dataPro[i].a2.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a3"){
            if(dataPro[i].a3.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a4"){
            if(dataPro[i].a4.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a5"){
            if(dataPro[i].a5.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a6"){
            if(dataPro[i].a6.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a7"){
            if(dataPro[i].a7.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a8"){
            if(dataPro[i].a8.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a9"){
            if(dataPro[i].a9.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a10"){
            if(dataPro[i].a10.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else if(searchMood == "a11"){
            if(dataPro[i].a11.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }
    }
    else {
            if(dataPro[i].a12.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].a1}</td>
                    <td>${dataPro[i].a2}</td>
                    <td>${dataPro[i].a3}</td>
                    <td>${dataPro[i].a4}</td>
                    <td>${dataPro[i].a5}</td>
                    <td>${dataPro[i].a6}</td>
                    <td>${dataPro[i].a7}</td>
                    <td>${dataPro[i].a8}</td>
                    <td>${dataPro[i].a9}</td>
                    <td>${dataPro[i].a10}</td>
                    <td>${dataPro[i].a11}</td>
                    <td>${dataPro[i].a12}</td>
                    <td><button id="update" onclick="updateData(${i})"=>Edit</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`
            }   
        
        }}


    document.getElementById("tbody").innerHTML = table;
}

//localStorage used space

 function localspace(){
    var data = dataPro;

    console.log('Current local storage: ');

    for(var key in window.localStorage){

        if(window.localStorage.hasOwnProperty(key)){
            data += window.localStorage[key];
            console.log( key + " = " + ((window.localStorage[key].length * 16)/(8 * 1024)).toFixed(2) + ' KB' );
        }

    }

    console.log(data ? '\n' + 'Total space used: ' + ((data.length * 16)/(8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)');
    console.log(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB');
}localspace()