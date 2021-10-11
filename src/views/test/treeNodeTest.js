var root = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: {
                value: 6,
                left: undefined,
                right: undefined
            },
            right: {
                value: 7,
                left: undefined,
                right: undefined
            }
        },
        right: {
            value: 5,
            left: {
                value: 8,
                left: undefined,
                right: undefined
            },
            right: {
                value: 9,
                left: undefined,
                right: undefined
            }
        }
    },
    right: {
        value: 3,
        left: undefined,
        right: undefined
    }
};
var child1 = root.left.left.left;
var child2 = root.left.right.right;
function FindSParent(rt, c1, c2) {
  if (rt === undefined) return false;
  const left = FindSParent(rt.left, c1, c2);
  const right = FindSParent(rt.right, c1, c2);
  if ((left && right) || ((rt.val === c1.val || rt.val === c2.val) && (left || right))) {
   return  rt;
  }
  return left || right || (rt.val === c1.val || rt.val === c2.val);
}
// This should be true.
//console.log(FindSParent(root, child1, child2))
//FindSParent(root, child1, child2) === root.left

async function async1() {
  console.log("2 async1 start");  //(2)
  await  async2();
  console.log("6 async1 end");   //(6)
}
async  function async2() {
  console.log( '3 async2');   //(3)
}
console.log("1 script start");  //(1)
setTimeout(function () {
  console.log("8 settimeout");  //(8)
},0);
async1();
new Promise(function (resolve) {
  console.log("4 promise1");   //(4)
  resolve();
}).then(function () {
  console.log("7 promise2");    //(7)
});
console.log('5 script end');//(5)
