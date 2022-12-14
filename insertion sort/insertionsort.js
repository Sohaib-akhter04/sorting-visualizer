let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 40;
let numOfBars = 40;
let heightFactor = 10;
let speedFactor = 100;
let btn=document.getElementsByClassName("buttons_container")
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

// let algotouse = "";

// select_algo.addEventListener("change", function () {
//   algotouse = select_algo.value;
// });

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    // bar.innerText=array[i];
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function InsertionSort(array) {
  document.getElementById("sort_btn").disabled = true;
  document.getElementById("randomize_array_btn").disabled = true;
  document.getElementById("speed").disabled = true;
  document.getElementById("slider").disabled = true;
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "red";
        bars[j + 1].innerText = array[j + 1];   
        await sleep(speedFactor);
  
        for (let k = 0; k < bars.length; k++) {
          if (k != j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        j = j - 1;
      }
      array[j + 1] = key;
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      bars[j + 1].innerText = array[j + 1];
      await sleep(speedFactor);
    }
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
    }
    document.getElementById("sort_btn").disabled = false;
    document.getElementById("randomize_array_btn").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("slider").disabled = false;
    return array;
  }
  let sortbtn=document.getElementById("sort_btn");
  sortbtn.addEventListener("click",()=>{
      InsertionSort(unsorted_array);
  })