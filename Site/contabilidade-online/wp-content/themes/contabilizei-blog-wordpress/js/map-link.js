const btnCategorias = document.querySelectorAll("p[data-id]");

btnCategorias.forEach((button) => {

  const catFour = Boolean(button.parentElement.querySelectorAll(".category-list")[2])

  if(catFour === false ) {
    button.classList.toggle("hide")
  }

  button.addEventListener("click", (e) => {
    const target = e.target;
    const parent = target.parentElement;
    const categoryList = parent.querySelectorAll(".category-list")

    categoryList.forEach((element)=>{
      element.classList.toggle("show");
    })
    const btnToToggle = parent.querySelector(".btnMap");
    btnToToggle.classList.toggle("btnMap-show");
  });
});

const buttons = document.querySelectorAll("label[data-id]");

buttons.forEach((button) => {

  const itemFour = Boolean(button.parentElement.querySelectorAll(".item")[4]);
  const itemTree = Boolean(button.parentElement.querySelectorAll(".item")[3]);

  if(itemFour === false ){
    button.classList.toggle("hide");
  }

  if(itemTree === false ){
    button.classList.toggle("hide-mobile");
  }

  button.addEventListener("click", (e) => {
    const target = e.target;
    const parent = target.parentElement;

    const item = parent.querySelectorAll(".item");
    item.forEach((element)=>{
      element.classList.toggle("subitem");
    })
  });
});
