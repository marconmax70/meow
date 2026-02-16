// ===============================
// ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ
// ===============================

// универсальная функция перехода
function goTo(page){
    window.location.href = page;
}

// ссылки бокового меню
document.querySelectorAll('.nav a').forEach(link=>{
    link.addEventListener('click', function(e){
        e.preventDefault();

        const page = this.dataset.page;
        if(page){
            goTo(page);
        }
    });
});

// кнопки "Участвовать"
document.querySelectorAll('.green').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        goTo('application.html');
    });
});

// кнопка "Подобрать для меня"
const matchBtn = document.querySelector('.orange');
if(matchBtn){
    matchBtn.addEventListener('click', ()=>{
        goTo('recommendations.html');
    });
}


// ===============================
// ТЁМНАЯ ТЕМА
// ===============================
const themeBtn = document.querySelector('.sidebar button');
if(themeBtn){
    themeBtn.addEventListener('click', ()=>{
        document.body.classList.toggle('dark');
        localStorage.setItem('theme',
            document.body.classList.contains('dark') ? 'dark' : 'light'
        );
    });
}

// загрузка темы
if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
}


// ===============================
// ПОИСК И ФИЛЬТРЫ
// ===============================
const search = document.getElementById('search');
const format = document.getElementById('format');

function filterCards(){
    const searchValue = search.value.toLowerCase();
    const formatValue = format.value;

    document.querySelectorAll('.card').forEach(card=>{
        const text = card.innerText.toLowerCase();
        const type = card.dataset.type;

        const matchText = text.includes(searchValue);
        const matchType = formatValue === 'all' || type === formatValue;

        card.style.display = (matchText && matchType) ? 'block' : 'none';
    });
}

if(search && format){
    search.addEventListener('input', filterCards);
    format.addEventListener('change', filterCards);
}


// ===============================
// МАСТЕР-АНКЕТА (WIZARD FORM)
// ===============================
let step = 1;

window.nextStep = function(){
    const current = document.getElementById('step'+step);
    if(current) current.classList.add('hidden');

    step++;

    const next = document.getElementById('step'+step);
    if(next){
        next.classList.remove('hidden');
        document.getElementById('bar').style.width = (step*33)+'%';
    }else{
        alert('Анкета заполнена! Данные сохранены.');
        goTo('dashboard.html');
    }
};
