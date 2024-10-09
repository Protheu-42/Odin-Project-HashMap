function hashMap() {
  let hashTable = [];
  let hashTableSize = 16;
  let tableLength = 0;

  const printTable = () => console.log(hashTable);
  // Create Hash using the size of the table as operant
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % hashTableSize;
    }

    return hashCode;
  };

  const set = (inputKey, inputValue) => {
    // First check if the Hash table needs to grown
    doesNeedToGrow();

    // Create Hash and check if bucket is empty which case just need to fill as first key at it
    const hashCode = hash(inputKey);
    if (hashCode < 0 || hashCode > hashTableSize) {
      throw new Error("Trying to access index out of bound");
    }
    const inputObject = {
      key: inputKey,
      value: inputValue,
      next: null,
    };
    if (!hashTable[hashCode]) {
      hashTable[hashCode] = inputObject;
      tableLength++;
      return;
    }
    // Else will need check each object on the bucket, if key exist update, else create at tail of the list
    else {
      let pointer = hashTable[hashCode];
      while (pointer) {
        if (pointer.key === inputKey) {
          pointer.value = inputValue;
          return;
        }
        if (pointer.next === null) {
          pointer.next = inputObject;
          tableLength++;
          return;
        }
        pointer = pointer.next;
      }
    }
  };

  const get = (searchedKey) => {
    const searchHash = hash(searchedKey);
    let pointer = hashTable[searchHash];
    getKey(pointer);

    function getKey(input) {
      if (searchedKey === input.key) {
        return input.value;
      } else if (input.next === null) {
        return null;
      }
      return getKey(input.next);
    }
  };

  const has = (searchedKey) => {
    const searchHash = hash(searchedKey);
    let pointer = hashTable[searchHash];
    hasKey(pointer);

    function hasKey(input) {
      if (searchedKey === input.key) {
        console.log("true");
        return true;
      } else if (input.next === null) {
        console.log("false");
        return false;
      }
      return hasKey(input.next);
    }
  };

  const remove = (searchKey) => {
    const searchHash = hash(searchKey);
    let pointer = hashTable[searchHash];
    // If the key is the first of the bucket
    if (pointer.key === searchKey) {
      let temp = pointer.next;
      pointer = null;
      hashTable[searchHash] = temp;
      tableLength--;
      return true;
    } else {
      recursiveRemove(pointer);
    }

    function recursiveRemove(input) {
      if (input.next.key === searchKey) {
        let temp = input.next.next;
        input.next = null;
        input.next = temp;
        tableLength--;
        return true;
      } else if (input === null) {
        return false;
      }

      return recursiveRemove(input.next);
    }
  };

  const length = () => {
    return tableLength;
  };

  const clear = () => {
    for (let i = 0; i < hashTable.length; i++) {
      if (hashTable[i]) {
        hashTable[i] = null;
      }
    }
    tableLength = 0;
  };

  const keys = () => {
    let arrayOfKeys = [];
    for (let i = 0; i < hashTable.length; i++) {
      let pointer = hashTable[i];
      if (pointer) {
        while (pointer != null) {
          arrayOfKeys.push(pointer.key);
          pointer = pointer.next;
        }
      }
    }
    console.log(arrayOfKeys);
    return arrayOfKeys;
  };

  const values = () => {
    let arrayOfValues = [];
    for (let i = 0; i < hashTable.length; i++) {
      let pointer = hashTable[i];
      if (pointer) {
        while (pointer != null) {
          arrayOfValues.push(pointer.value);
          pointer = pointer.next;
        }
      }
    }
    console.log(arrayOfValues);
    return arrayOfValues;
  };

  const entries = () => {
    let arrayOfEntries = [];
    for (let i = 0; i < hashTable.length; i++) {
      let pointer = hashTable[i];
      while (pointer != null) {
        let KeyValuePair = [];
        KeyValuePair.push(pointer.key, pointer.value);
        arrayOfEntries.push(KeyValuePair);
        pointer = pointer.next;
      }
    }
    return arrayOfEntries;
  };

  // Hash Table auto-grow section
  const doesNeedToGrow = () => {
    let loadFactor = hashTableSize * 0.75;
    if (tableLength >= loadFactor) {
      growHashTable();
    }
  };

  const growHashTable = () => {
    const oldTable = entries();
    clear();
    hashTableSize = hashTableSize * 2;
    for (let i = 0; i < oldTable.length; i++) {
      set(oldTable[i][0], oldTable[i][1]);
    }
  };

  return {
    set,
    printTable,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

let test = hashMap();
test.set("Natsu Dragneel", "Fairy Tail");
test.set("Erza Scarlet", "Fairy Tail");
test.set("Gray Fullbuster", "Fairy Tail");
test.set("Wendy Marvell", "Fairy Tail");
test.set("Gajeel Redfox", "Phatom hive");
test.set("Levy McGarden", "Fairy Tail");
test.set("Mirajane Strauss", "Fairy Tail");
test.set("Lisanna Strauss", "Fairy Tail");
test.set("Alzack Connell", "Fairy Tail");
test.set("Bisca Mulan", "Fairy Tail");
test.set("Juvia Lockser", "Fairy Tail");
test.set("Laxus Dreyar", "Fairy Tail");
test.set("Gajeel Redfox", "Fairy Tail");
test.set("Makarov Dreyar", "Fairy Tail");
test.set("Cana Alberona", "Fairy Tail");
test.set("Frosch", "Sabertooth");
test.printTable();
