
export class Tree<T> {

    constructor(public node: T, public children = new Array<Tree<T>>()) {

    }
}
