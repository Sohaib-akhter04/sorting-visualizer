let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
// let select_algo = document.getElementById("algo");
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
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

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
    bar.innerText=array[i];
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
async function countSort(arr, n, exp) {
  let output = new Array(n);
  let i;
  let count = new Array(10);
  for (let i = 0; i < 10; i++) count[i] = 0;

  for (i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
  for (i = 1; i < 10; i++) count[i] += count[i - 1];

  for (i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  for (i = 0; i < n; i++) {
    arr[i] = output[i];
    await colorChange(arr, i);
  }
  return new Promise((resolve) => {
    resolve();
  });
}

async function radixsort(arr, n) {
  
  let m = Math.max(...arr);
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
    await countSort(arr, n, exp);
  }
}  
async function colorChange(arr, k) {
  let bars = document.getElementsByClassName("bar");
  bars[k].style.height = arr[k] * heightFactor + "px";
  bars[k].style.backgroundColor = "#0040FF";
  bars[k].innerText=arr[k];
  await sleep(speedFactor);
  bars[k].style.backgroundColor = "green";
  return new Promise((resolve) => {
      resolve();
  });
}
let sortbtn=document.getElementById("sort_btn");
  sortbtn.addEventListener("click",()=>{
  document.getElementById("sort_btn").disabled = true;
  document.getElementById("randomize_array_btn").disabled = true;
  document.getElementById("speed").disabled = true;
  document.getElementById("slider").disabled = true;
      radixsort(unsorted_array,unsorted_array.length);
  document.getElementById("sort_btn").disabled = false;
  document.getElementById("randomize_array_btn").disabled = false;
  document.getElementById("speed").disabled = false;
  document.getElementById("slider").disabled = false;
  })  