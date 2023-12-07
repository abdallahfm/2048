let squares=document.querySelectorAll(".square");
let score=document.querySelector("#score");
let highest=document.querySelector("#highscore");
let button=document.querySelector("button");


let cleared=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


numbers=[2,2,4];



function playAgain(){
    for(let i=0;i<16;i++){
        squares[i].className="";
        squares[i].textContent="";
        squares[i].classList.toggle("square");
        if(cleared.indexOf(i)===-1)
        cleared.push(i);


    }
    if(parseInt(score.textContent)>parseInt(highest.textContent))
    highest.textContent=score.textContent;
    score.textContent="0";
}

button.addEventListener("click",()=>{
   
    playAgain();
    add();
})



function color(num,idx){
    switch(num){
        case 4:{squares[idx].classList.toggle("four");break;}
        case 8:{squares[idx].classList.toggle("eight");break;}
        case 16:{squares[idx].classList.toggle("sixteen");break;}
        case 32:{squares[idx].classList.toggle("thirtytwo");break;}
        case 64:{squares[idx].classList.toggle("sixtyfour");break;}
        case 128:{squares[idx].classList.toggle("onetwoeight");break;}
        case 256:{squares[idx].classList.toggle("twofivesix");break;}
        case 512:{squares[idx].classList.toggle("fivetwilve");break;}
        case 1024:{squares[idx].classList.toggle("onek");break;}
        case 2048:{squares[idx].classList.toggle("twok");break;}
    }
}

function add(){
if(cleared.length===0)return;

    let rand=Math.floor(Math.random()*cleared.length);
    let numrand=Math.floor(Math.random()*numbers.length);
    squares[cleared[rand]].textContent=numbers[numrand];
    squares[cleared[rand]].classList.toggle("isActive");

    if(numbers[numrand]===4)color(4,cleared[rand]);

    let idx=cleared.indexOf(cleared[rand]);
    if(idx===-1)return ;
    cleared=cleared.slice(0,idx).concat(cleared.slice(idx+1));

}


add();
window.addEventListener("keydown", (event) => {

    console.log(event.key);
    if(event.key=="ArrowDown")down()
    if(event.key=="ArrowRight")right()
    if(event.key=="ArrowLeft")left()
    if(event.key=="ArrowUp")up();
});

function activeToInactive(idx1,idx2){

    squares[idx2].classList.toggle("isActive");
    squares[idx2].textContent=squares[idx1].textContent;
    color(parseInt(squares[idx2].textContent),idx2);

    squares[idx1].classList.toggle("isActive");
    color(parseInt(squares[idx1].textContent),idx1);
    squares[idx1].textContent="";
    


    cleared.push(idx1);
    let idx=cleared.indexOf(idx2);
    if(idx==-1)return ;
    cleared=cleared.slice(0,idx).concat(cleared.slice(idx+1));

}
function activeToActive(idx1,idx2){

    
    if(squares[idx2].textContent===squares[idx1].textContent){


        if( squares[idx2].textContent !=="2")color(parseInt(squares[idx2].textContent),idx2);
        squares[idx2].textContent=parseInt(squares[idx2].textContent) + parseInt(squares[idx1].textContent);
        score.textContent=parseInt(score.textContent)+parseInt(squares[idx2].textContent);

    
        color(parseInt(squares[idx2].textContent) ,idx2);

        squares[idx1].classList.toggle("isActive");
        color(parseInt(squares[idx1].textContent),idx1);
        squares[idx1].textContent=""; 
        cleared.push(idx1);



}

}
function left(){

    for(let j=0;j<3;j++){
        

    for(let i=1;i<16;i++){

        if(i%4==0)continue;

        if(squares[i].classList.contains("isActive")){



            if(squares[i-1].classList.contains("isActive")){


                activeToActive(i,i-1);


            }
            else{

                activeToInactive(i,i-1);

            }

        }
        
    }
}

    add();
}

function right(){
     for(let j=0;j<3;j++){

         for(let i=14;i>=0;i--){
             if(i===3 || i===7 || i===15 || i===11 )continue;
    
            if(squares[i].classList.contains("isActive")){


                if(squares[i+1].classList.contains("isActive")){

                    activeToActive(i,i+1);

                }



                else{
                    activeToInactive(i,i+1);
                }
    
            }
            
         }
     }
        add();

}

function up(){

    for(let j=0;j<3;j++){

        for(let i=4;i<16;i++){
           
   
           if(squares[i].classList.contains("isActive")){

               if(squares[i-4].classList.contains("isActive")){

                activeToActive(i,i-4);
               }
               else{
                activeToInactive(i,i-4);
               }
   
           }
           
        }
    }
       add();

}

function down(){

    for(let j=0;j<3;j++){

        for(let i=11;i>=0;i--){
   
           if(squares[i].classList.contains("isActive")){
               if(squares[i+4].classList.contains("isActive")){
                activeToActive(i,i+4);
               }
               else{
                activeToInactive(i,i+4);
               }
   
           }
           
        }
    }
       add();

}


