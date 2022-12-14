var WebsiteName=document.getElementById("name");
var WebsiteUrl=document.getElementById("url");
var togellbutton=document.getElementById("togellbtn");
var myindex;
var AllWebsites=[];
if(localStorage.getItem("allwebsite")!=null){
    AllWebsites= JSON.parse(localStorage.getItem("allwebsite"));
    DisplayWebsites(); 
}
function AddWebsite(){
    document.getElementById("warringname").innerHTML="";
    document.getElementById("warringurl").innerHTML="";
    if(ValidOfName()&&ValidOfurl()){
        if(togellbutton.innerHTML=="submit"){
            var Website={
                name:WebsiteName.value,
                url:WebsiteUrl.value
            }
            AllWebsites.push(Website);
            localStorage.setItem("allwebsite",JSON.stringify(AllWebsites));
            DisplayWebsites();
            clear();
        }
        else{
            update();
        }
    }
    else if(!ValidOfName()&&ValidOfurl()){
        document.getElementById("warringname").innerHTML="Name must be at least 3 character";

    }
    else if(!ValidOfurl()&&ValidOfName()){
        document.getElementById("warringurl").innerHTML="url must be https://example.com";
    }
    else {
      document.getElementById("warringname").innerHTML="Name must be at least 3 character";
      document.getElementById("warringurl").innerHTML="url must be https://example.com";
    }
     
}
function DisplayWebsites(){
    var html="";
    for( var i=0 ;i< AllWebsites.length; i++){
        html+=`  <tr>
        <td> ${AllWebsites[i].name}</td>
        <td>
            <button class=" btn btn-info" onclick="visit(${i})">visit</button>
        </td>
        <td>
            <button class=" btn btn-danger" onclick=" DeleteWebsite(${i})">delete</button>
        </td>
        <td>
            <button class=" btn btn-success" onclick="EditWebsite(${i})">update</button>
        </td>
    </tr>`
    }
    document.getElementById("tablebody").innerHTML=html;
}
function clear(){
    WebsiteName.value="";
    WebsiteUrl.value="";
}
function DeleteWebsite(index){
    AllWebsites.splice(index,1);
    localStorage.setItem("allwebsite",JSON.stringify(AllWebsites));
    DisplayWebsites();
}
function EditWebsite(index){
   myindex=index;
   WebsiteName.value= AllWebsites[index].name;
   WebsiteUrl.value= AllWebsites[index].url;
   togellbutton.innerHTML="Update";
}
function update(){
    AllWebsites[myindex].name= WebsiteName.value;
    AllWebsites[myindex].url=WebsiteUrl.value;
    togellbutton.innerHTML="submit";
    localStorage.setItem("allwebsite",JSON.stringify(AllWebsites));
    DisplayWebsites();
    clear();
}
function ValidOfName(){
    var validname= /^[a-z]{3,10}$/i;
    var test= validname.test(WebsiteName.value) ;
    return test;
}
function ValidOfurl(){
    var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    var test= regex.test(WebsiteUrl.value) ;
    return test;
   
}
function search(){
    var searchcontent=""
    var input=document.getElementById("search").value;
    for( var i=0 ;i<AllWebsites.length ;i++){
        if(AllWebsites[i].name.toLowerCase().includes(input.toLowerCase())){
          
           searchcontent+= `  <tr>
           <td> ${AllWebsites[i].name}</td>
           <td>
               <button class=" btn btn-info">visit</button>
           </td>
           <td>
               <button class=" btn btn-danger" onclick=" DeleteWebsite(${i})">delete</button>
           </td>
           <td>
               <button class=" btn btn-success" onclick="EditWebsite(${i})">update</button>
           </td>
       </tr>`
        }
    }
    
    document.getElementById("tablebody").innerHTML=searchcontent;
}
function visit(index){
    window.open(AllWebsites[index].url, '_blank');
}
