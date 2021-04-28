/**
 * https://www.youtube.com/watch?v=-Yn5DU0_-lw&t=0s&ab_channel=WilliamFiset
 *
 * Single Linked List:
 *      Pros: Uses less memory, Simpler implementation
 *      Cons: Cannot easile access previous elements
 *
 * Doubly Linked List:
 *      Pros: Can be traversed backwards
 *      Cons: Takes 2x memory
 *
 * Complexity Analysis:
 *                  Single Linked   |   Doubly Linked
 * Search               O(n)                O(n)
 * Insert at head       O(1)                O(1)
 * Insert at tail       O(1)                O(1)
 * Remove at head       O(1)                O(1)
 * Remove at tail       O(n)                O(1)      <-- different
 * Remove in middle     O(n)                O(n)
 *
 */

class LinkedListNode<T> {
  element!: T;
  prev?: LinkedListNode<T>;
  next?: LinkedListNode<T>;
}

/**
 * Doubly-linked list implementation
 */
export class LinkedList<T> {
  size: number = 0;
  first?: LinkedListNode<T>; // first list element
  last?: LinkedListNode<T>; // last list element

  // Empty this linked list, O(n)
  clear() {
    let trav = this.first;
    while (trav) {
      const next = trav.next;
      trav.prev = trav.next = undefined;
      //   trav.element = null;
      trav = next;
    }
    this.first = this.last = trav = undefined;
    this.size = 0;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  // Add an element to the tail of the linked list, O(1)
  add(element: T) {
    this.addLast(element);
  }

  // Add a node to the tail of the linked list, O(1)
  addLast(element: T) {
    if (this.isEmpty()) {
      this.first = this.last = { element };
    } else if (this.last) {
      this.last.next = { element, prev: this.last };
      this.last = this.last.next;
    }
    this.size++;
  }

  // Add an element to the beginning of this linked list, O(1)
  addFirst(element: T) {
    if (this.isEmpty()) {
      this.first = this.last = { element };
    } else if (this.first) {
      this.first.prev = { element, next: this.first };
      this.first = this.first.prev;
    }
    this.size++;
  }

  // Add an element at a specified index
  addAt(index: number, element: T) {
    if (index < 0) {
      throw new Error("Illegal Index");
    }
    if (index === 0) {
      this.addFirst(element);
      return;
    }

    if (index === this.size) {
      this.addLast(element);
      return;
    }

    let temp = this.first;
    for (let i = 0; i < index - 1 && temp; i++) {
      temp = temp.next;
    }

    if (temp) {
      const newNode = { element, prev: temp, next: temp.next };
      if (temp.next) temp.next.prev = newNode;
      temp.next = newNode;
    }

    this.size++;
  }

  // Check the value of the first node if it exists, O(1)
  peekFirst(): T | undefined {
    if (this.isEmpty()) throw new Error("Empty list");
    return this.first?.element;
  }

  // Check the value of the last node if it exists, O(1)
  peekLast(): T | undefined {
    if (this.isEmpty()) throw new Error("Empty list");
    return this.last?.element;
  }

  // Remove the first value at the head of the linked list, O(1)
  removeFirst(): T | undefined {
    // Can't remove data from an empty list
    if (this.isEmpty()) throw new Error("Empty list");

    // Extract the data at the head and move
    // the head pointer forwards one node
    const data = this.first?.element;
    this.first = this.first?.next;
    --this.size;

    if (this.isEmpty()) {
      this.last = undefined; // If the list is empty set the tail to null
    } else if (this.first) {
      this.first.prev = undefined; // Do a memory cleanup of the previous node
    }

    // Return the data that was at the first node we just removed
    return data;
  }

  // Remove the last value at the tail of the linked list, O(1)
  removeLast(): T | undefined {
    // Can't remove data from an empty list
    if (this.isEmpty()) throw new Error("Empty list");

    // Extract the data at the tail and move
    // the tail pointer backwards one node
    const data = this.last?.element;
    this.last = this.last?.prev;
    --this.size;

    if (this.isEmpty()) {
      this.first = undefined; // If the list is now empty set the head to null
    } else if (this.last) {
      this.last.next = undefined; // Do a memory clean of the node that was just removed
    }

    // Return the data that was in the last node we just removed
    return data;
  }

  // Remove an arbitrary node from the linked list, O(1)
  _remove(node: LinkedListNode<T> | undefined) {
    if (!node) return;
    // If the node to remove is somewhere either at the
    // head or the tail handle those independently
    if (node.prev === undefined) return this.removeFirst();
    if (node.next === undefined) return this.removeLast();

    // Make the pointers of adjacent nodes skip over 'node'
    node.next.prev = node.prev;
    node.prev.next = node.next;

    // Temporarily store the data we want to return
    const data = node.element;

    // Memory cleanup
    // node.element = null;
    node = node.prev = node.next = undefined;

    --this.size;

    // Return the data in the node we just removed
    return data;
  }

  // Remove a node at a particular index, O(n)
  removeAt(index: number) {
    // Make sure the index provided is valid
    if (index < 0 || index >= this.size) {
      throw new Error("IllegalArgumentException");
    }

    let i;
    let trav;

    if (index < this.size / 2) {
      // Search from the front of the list
      for (i = 0, trav = this.first; i !== index && trav; i++) {
        trav = trav.next;
      }
    } else {
      // Search from the back of the list
      for (i = this.size - 1, trav = this.last; i !== index && trav; i--) {
        trav = trav.prev;
      }
    }

    return this._remove(trav);
  }

  // Remove a particular value in the linked list, O(n)
  remove(obj: T) {
    let trav = this.first;

    if (obj === null) {
      // Support searching for null
      for (trav = this.first; trav !== undefined; trav = trav.next) {
        if (trav.element === null) {
          this._remove(trav);
          return true;
        }
      }
    } else {
      // Search for non null object
      for (trav = this.first; trav !== undefined; trav = trav.next) {
        if (obj === trav.element) {
          this._remove(trav);
          return true;
        }
      }
    }
    return false;
  }

  // Find the index of a particular value in the linked list, O(n)
  indexOf(obj: T) {
    let index = 0;
    let trav = this.first;

    if (obj === null) {
      // Support searching for null
      for (; trav !== undefined; trav = trav.next, index++) {
        if (trav.element === null) {
          return index;
        }
      }
    } else {
      // Search for non null object
      for (; trav !== undefined; trav = trav.next, index++) {
        if (obj === trav.element) {
          return index;
        }
      }
    }

    return -1;
  }

  // Check is a value is contained within the linked list
  contains(obj: T) {
    return this.indexOf(obj) !== -1;
  }

  *[Symbol.iterator]() {
    /*
     * The `current` variable is used to iterate over the list nodes.
     * It starts out pointing to the head and is overwritten inside
     * of the loop below.
     */
    let current = this.first;

    /*
     * As long as `current` is not `null`, there is a piece of data
     * to yield.
     */
    while (current) {
      yield current.element;
      current = current.next;
    }
  }
}

module.exports = { LinkedList };
