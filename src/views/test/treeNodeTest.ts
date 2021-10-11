interface TreeNode {
  value: number;
  left: TreeNode | undefined;
  right: TreeNode | undefined;
}

const root: TreeNode = {
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
}

const child1 = root.left.left.left
const child2 = root.left.right.right

function FindSParent(rt: TreeNode, c1: TreeNode, c2: TreeNode): TreeNode {
  throw new Error('Should Implement This.')
}

// This should be true.
FindSParent(root, child1, child2) === root.left
