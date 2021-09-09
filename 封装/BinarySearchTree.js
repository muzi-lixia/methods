/* 
    创建一个节点
*/
class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/* 

*/
class BinarySearchTree {
    constructor(){
        //根节点
        this.root = null;
    }

    /* 存放左子树还是右子树 (递归) */
    insertNode(node,newNode){
        //右子树
        if(newNode.value > node.value){
            //如果原来的右节点没有数据
            if(node.right === null){
                node.right = newNode;
            }else{
                this.insertNode(node.right,newNode);
            }
        }else if(newNode.value < node.value){
            //左子树
            if(node.left === null){
                node.left = newNode;
            }else{
                this.insertNode(node.left, newNode);
            }
        }

    }

    /* 添加数据 */
    insert(value){
        const newNode = new Node(value);
        //判断根节点是否存在，即是不是空树
        if(this.root === null){
            this.root = newNode;
        }else{
            //非空树，
            this.insertNode(this.root,newNode);
        }
    }

    /* 先序遍历 */
    perOrderTraversal(cb){
        this.perOrderTraversalNode(this.root, cb);
    } 
    /* 遍历递归 */
    perOrderTraversalNode(node,cb){
        //空节点，直接return
        if(node === null) return;
        /* 把当前的节点存放到数组中去 */
        cb(node.value);
        /* 遍历左子树 */
        this.perOrderTraversalNode(node.left, cb);
        /* 遍历右子树 */
        this.perOrderTraversalNode(node.right, cb);
    }

    /* 中序遍历 */
    inOrderTraversal(cb){
        this.inOrderTraversalNode(this.root, cb);
    }
    inOrderTraversalNode(node, cb){
        if(node === null) return;
        this.inOrderTraversalNode(node.left, cb);
        cb(node.value);
        this.inOrderTraversalNode(node.right, cb);
    }
    /* 后序遍历 */
    postOrderTraversal(cb){
        this.postOrderTraversalNode(this.root, cb);
    }
    postOrderTraversalNode(node, cb){
        if(node === null) return;
        this.postOrderTraversalNode(node.left, cb);
        this.postOrderTraversalNode(node.right, cb);
        cb(node.value);
    }
}

let bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// console.dir(bst);

let result = [];
const cb = (value)=>{
    result.push(value);
}
//先序
// bst.perOrderTraversal(cb);
//中序
// bst.inOrderTraversal(cb);
//后序
bst.postOrderTraversal(cb);
console.log(result);
