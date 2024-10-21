img=document.getElementById("i1");
texts=document.getElementById("insert");
async function f(){
    const response= await fetch("download.jpg");
    const blob = await response.blob(); 
    img.src=URL.createObjectURL(blob);
}

async function j(){
    const res= await fetch('text.json');
    const resp =await res.json();
    texts.innerText=JSON.stringify(resp);
}

j().catch(err =>{console.log(err)});
f().catch(err =>{
    console.log(err)
});
