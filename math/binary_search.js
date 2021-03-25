const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function binarySearch(numbers, find) {
  let left = 0;
  let right = numbers.length - 1;
  while (right >= left) {
    let mid = Math.floor((left + right) / 2);
    if (numbers[mid] === find) return numbers[mid];
    if (numbers[mid] > find) right = mid - 1;
    if (numbers[mid] < find) left = mid + 1;
  }
}
console.time("Binary Search");
binarySearch(numbers, 10);
console.timeEnd("Binary Search");

function leanerSearch(numbers, find) {
  numbers.forEach((item) => {
    if (item === find) return item;
  });
}

console.time("Leaner Search");
leanerSearch(numbers, 10);
console.timeEnd("Leaner Search");
