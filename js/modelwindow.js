'use strict';

function changeImg1(){
    document.querySelector(".image-top>img").src="images/products/milktea/Classic milk tea1.jpg";
}
function changeImg2(){
    document.querySelector(".image-top>img").src="images/products/milktea/ginger milk tea.jpg";

}

function changeImg3(){
    document.querySelector(".image-top>img").src="images/products/milktea/coffeemilktea.jpeg";

}
function changeImg4(){
    document.querySelector(".image-top>img").src="images/products/milktea/honey milk tea.jpg";

}



const modal= document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector(".show-modal");

const openModal = function(){
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    window.scrollTo({top:0,
                    behavior:"smooth"});
    document.querySelector("body").style.overflowY = "hidden";
};

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click',closeModal);


document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});