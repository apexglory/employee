var net={
  2:[1,4,3],
  1:[4],
  3:[4,5],
  4:[5]
}
var base = [5,7]

var start = 2
function findShortRoute(head, tail) {
  var lengthArr = []
  function getLength(arr, length) {
    if (arr.indexOf(tail) > -1) {
      lengthArr.push(length)
    } else {
      length++
      arr.forEach(v => {
        getLength(net[v], length)
      })
    }
  }
  getLength(net[head], 1)
  return Math.min(...lengthArr)
}

var lengthArrs = []
for (var i = 1; i <= base[0]; i++) {
  if (i !== start) {
    lengthArrs.push(findShortRoute(start, i))
  }
}
var max = Math.max(...lengthArrs)
console.log(max*2)
