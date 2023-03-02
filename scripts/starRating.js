function starRatingAppear(starObj) {
    starList = document.querySelectorAll(".bi-star-fill");
   if (starObj.id == "star1") {
    console.log("test");
    starList[0].classList.add("filled");
    starList[1].classList.remove("filled");
    starList[2].classList.remove("filled");
    starList[3].classList.remove("filled");
    starList[4].classList.remove("filled");
   } else if (starObj.id == "star2") {
    starList[0].classList.add("filled");
    starList[1].classList.add("filled");
    starList[2].classList.remove("filled");
    starList[3].classList.remove("filled");
    starList[4].classList.remove("filled");
   } else if (starObj.id == "star3") {
    starList[0].classList.add("filled");
    starList[1].classList.add("filled");
    starList[2].classList.add("filled");
    starList[3].classList.remove("filled");
    starList[4].classList.remove("filled");
   } else if (starObj.id == "star4") {
    starList[0].classList.add("filled");
    starList[1].classList.add("filled");
    starList[2].classList.add("filled");
    starList[3].classList.add("filled");
    starList[4].classList.remove("filled");
   } else {
    starList[0].classList.add("filled");
    starList[1].classList.add("filled");
    starList[2].classList.add("filled");
    starList[3].classList.add("filled");
    starList[4].classList.add("filled");
   }
}