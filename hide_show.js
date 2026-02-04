//for home page
export function hide_show(middle_div,login_div,container){
   let menuOpen =false
    window.addEventListener("resize", () => {
  if (window.innerWidth >= 600) {
    menuOpen=true
  }
  else{
   menuOpen=false
  }
  updateUI()
});

function updateUI(){
 login_div.style.display= menuOpen?"flex":"none"
      middle_div.style.display = menuOpen?"flex":"none";
    container.classList.toggle("change",menuOpen);
 
}
if (middle_div && container) {
    container.addEventListener("click", () => {
      menuOpen=!menuOpen
 updateUI()
    });
  }


}

//for preview page
export function hide_show2(middle_div, container, cancel_container) {
  let menuOpen = false;

  function updateUI() {
    if (window.innerWidth >= 600) {

      middle_div.style.display = "flex";
      cancel_container.style.display = "none";
      container.classList.add("change");
    } else {

      middle_div.style.display = menuOpen ? "flex" : "none";
      cancel_container.style.display = menuOpen ? "flex" : "none";
      container.classList.toggle("change", menuOpen);
    }
  }

  window.addEventListener("resize", updateUI);

  container.addEventListener("click", () => {
    menuOpen = !menuOpen;
    updateUI();
  });


  cancel_container.addEventListener("click", () => {
    menuOpen = false;
    updateUI();
  });

  updateUI();
}
