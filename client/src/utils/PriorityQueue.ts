export interface PriorityQueueItem<T> {
  element: T;
  compare: number;
}

export class PriorityQueue<T> {
  _heap: PriorityQueueItem<T>[] = [];

  _isEmpty = () => this._heap.length === 0;

  _parentIndex = (index: number) => Math.floor((index - 1) / 2);

  _leftChildIndex = (index: number) => 2 * index + 1;

  _rightChildIndex = (index: number) => 2 * index + 2;

  // Tests if the value of node i <= node j
  _less = (i: number, j: number) =>
    this._heap[i].compare <= this._heap[j].compare;

  _swap = (i: number, j: number) => {
    const temp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = temp;
  };

  /**
   * Perform bottom up node sift, O(log(n))
   * @param {*} index
   */
  _siftUp(index: number) {
    let parent = this._parentIndex(index);

    while (index > 0 && this._less(index, parent)) {
      this._swap(parent, index);
      index = parent;
      parent = this._parentIndex(index);
    }
  }

  /**
   * Perform up bottom node sift, O(log(n))
   * @param {*} index
   */
  _siftDown(index: number) {
    const heapSize = this._heap.length;
    while (index < heapSize) {
      let left = this._leftChildIndex(index);
      let right = this._rightChildIndex(index);
      let smallest = left; // Assume left is the smallest node of the two children

      // Find which is smaller left or right
      // If right is smaller set smallest to be right
      if (right < heapSize && this._less(right, left)) smallest = right;

      // Stop if we're outside the bounds of the tree
      // or stop early if we cannot sink index anymore
      if (left >= heapSize || this._less(index, smallest)) break;

      // Move down the tree following the smallest node
      this._swap(smallest, index);
      index = smallest;
    }
  }

  /**
   * 1 - Always start by inserting the element at the bottom. We insert at the rightmost spot
   * so as to maintain the complete tree property.
   * 2 - "Fix" (heap condition(invariant)) the tree by swapping the new element with its parent,
   * until we find an appropriate spot for the element. We essentially bubble up
   * the minimum element.
   *
   * Time complexity: O(log(n))
   *
   * @param {*} element - should have comparable interface
   */
  push(element: PriorityQueueItem<T>): void {
    if (element === null || element === undefined)
      throw new Error("element must not be null");

    this._heap.push(element); // insert at the bottom
    this._siftUp(this._heap.length - 1);
  }

  /**
   * Extract Minimum Element
   * The minimum element of a min-heap is always at the top.
   * 1 - We remove the minimum element and swap it with the last element in the heap
   * (the bottommost, rightmost element).
   * 2 - We bubble down this element, swapping it with one of its children until the
   * min-heap property is restored.
   * There is no inherent ordering between the left and right element, but you'll need to
   * take the smaller one in order to maintain the min-heap ordering.
   *
   * Time complexity: O(log(n))
   */
  pop(): PriorityQueueItem<T> | undefined {
    if (this._isEmpty()) return undefined;

    this._swap(0, this._heap.length - 1);

    const removedMinElement = this._heap.pop(); // remove

    if (this._isEmpty()) return removedMinElement;

    this._siftDown(0);

    return removedMinElement;
  }

  toString() {
    return "" + this._heap;
  }
}
