const dropdowns = document.querySelectorAll('.similarDropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.selectContainer');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    
    select.addEventListener('click', function() {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        } else {
            menu.classList.add('open');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            selected.innerText = option.innerText;
            menu.classList.remove('open');
            options.forEach(option => {
                option.classList.remove('highlighted');
            });
            option.classList.add('highlighted');
            processRotate(selected.innerText);
        });
    })
})