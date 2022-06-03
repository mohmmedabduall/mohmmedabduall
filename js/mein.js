var title=document.getElementById("title");
var price=document.getElementById("price");
var taxes=document.getElementById("taxes");
var ads=document.getElementById("ads");
var discount=document.getElementById("discount");
var total=document.getElementById("total");
var count=document.getElementById("count");
var category=document.getElementById("category");
var Description= document.getElementById('Description');

var submit=document.getElementById("submit");

var mood = "create"

var tmo;

function getTotal(){


if(price.value != "")
{
var result= (+price.value+ +taxes.value + +ads.value) -+discount.value
total.innerHTML =result
total.style.background='#040'
}
else
{
    total.innerHTML=""
    total.style.background='red'

}
}


var datapro;
if(localStorage.getItem("product")!=null)
{
    datapro=JSON.parse(localStorage.getItem("product")) 
    showData(datapro)
}

else{
    var datapro=[];
}


submit.onclick =function()
{
var newpro=
{

    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
    Description:Description.value,
}

if(mood==='create')
{

if(newpro.count>1)
{
    for(i=0 ; i<newpro.count;i++)
    {
        datapro.push(newpro)

    }
   
} else{
        datapro.push(newpro)

    }


}else{
    datapro[tmp]=newpro;
    mood='create';
    submit.innerHTML='create'
}



localStorage.setItem("product", JSON.stringify(datapro))
clearData()
showData(datapro)

}


function clearData()
{
    
title.value=""
 price.value=
taxes.value=""
ads.value=""
discount.value=""
total.innerHTML=""
count.value=""
category.value=""
Description.value=""
}

function showData(productlist)
{
var continer=""; 

for(var i = 0; i < productlist.length ;i++)

continer+=`<tr>
 
<td>${i}</td>
<td>${productlist[i].title}</td>
<td>${productlist[i].price}</td>
<td>${productlist[i].taxes}</td>
<td>${productlist[i].ads}</td>
<td>${productlist[i].discount}</td>
<td>${productlist[i].total}</td>
<td>${productlist[i].category}</td>
<td>${productlist[i].Description}</td>
<td><button onclick="updateData(${i})" class=" rounded-pill btn btn-warning  " id="update">update</button></td>
<td><button onclick="dalat(${i})" class=" rounded-pill btn btn-danger " id="delete">delete</button></td>

</tr>
`
document.getElementById('tableBody').innerHTML=continer;



var btndelete=document.getElementById('deletAll');

if( datapro.length > 0)

{
btndelete.innerHTML=`

<button onclick="deletAll()" class="w-100 mt-4 rounded-pill btn btn-danger ">delete All</button>

`

}else{
    btndelete.innerHTML=``;
}



}




function dalat(o)
{


datapro.splice(o,1)
localStorage.setItem("product", JSON.stringify(datapro))
showData(datapro)


}


function deletAll(t)
{

localStorage.clear()
datapro.splice(0)
showData(datapro)

}

function updateData (i)
{
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    getTotal()
     category.value=datapro[i].category
     Description.value=datapro[i].Description
     count.classList.add('d-none')
     submit.innerHTML="update";
     mood='update'
     tmp=i
}


var search=document.getElementById('search')

var searchmood='title'

function searchpro(id)
{

    if(id=='searchTitle')
    {
        searchmood='title'
    search.placeholder="search By Title";
    }
  
    else{
        searchmood='category'
        search.placeholder="search By category";


    }

search.focus()
}



function searchData(value)
{
if (searchmood=="title")
{
        
    var searchproduct=[];

for(i=0 ; i<datapro.length ;i++)
    {
        if(datapro[i].title.includes(value)==true)
        {

searchproduct.push(datapro[i])

        }
    }


showData(searchproduct)
}


else{

    var searchproduct=[];

    for(i=0 ; i<datapro.length ;i++)
        {
            if(datapro[i].category.includes(value)==true)
            {
    
    searchproduct.push(datapro[i])
    
            }
        }
    
    
    showData(searchproduct)
}








}



















