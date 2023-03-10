//Flag to indicate if a dropdown menu is visible
var isShowing = false;

//Reference to the current dropdown menu
var dropdownMenu = null;

//Show the drop-down menu with the given id, if it exists, and set flag
function show(id)
{
    hide(); /* First hide any previously showing dropdown menu */
    dropdownMenu = document.getElementById(id);
    if (dropdownMenu != null)
    {
        dropdownMenu.style.visibility = 'visible';
        isShowing = true;
    }
}

//Hide the currently visible dropdown menu and set flag
function hide()
{       
    if (isShowing) dropdownMenu.style.visibility = 'hidden';
    isShowing = false;
}

function changeTheme() {
    const main = document.querySelector('main');
    const themeIcon = document.getElementById('theme_icon');
    if (main.classList.contains('dark-theme')) {
        main.classList.remove('dark-theme');
        themeIcon.classList.remove('bi-brightness-high-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
    } else {
        main.classList.add('dark-theme');
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-brightness-high-fill');
    }
}