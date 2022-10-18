export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, position: number) {
    if (position < 0 || position > this.size) {
      console.log("Enter a valid position");
      return;
    } else {
      const node = new Node(element);

      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < position && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev) prev.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getNodeByPosition(position: number) {
    if (position < 0 || position > this.size) { 
        console.log("Enter a valid position");
    }

    let current = this.head; 
    let index = 0; 

    while(index < position) {  
        current = current!.next; 
        index++; 
    }

    return current!.value;
}

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}
