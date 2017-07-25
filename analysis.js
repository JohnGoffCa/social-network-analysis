var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  },
  listPeople: function () {
      for (var people in this) {
        if (this.hasOwnProperty(people)) {
          if (typeof this[people] == 'function') continue;
          console.log(this[people].name);
          console.log("Follows: " + this.getFollowers(this[people], this));
          console.log("Followers: " + this.followsMe(people) + "\n");
        }
      }
  },
  followsMe: function (userID) {
    var arr = [];
    for (var person in this) {
      if (this.hasOwnProperty(person)) {
        if (typeof this[person] == 'function') continue;
        //console.log("person:", person);
        //console.log("IndexOf:", this[person].follows.indexOf(userID))
        if (this[person].follows.indexOf(userID) !== -1)
          arr.push(this[person].name)
      }
    }
    return arr;
  },
  getFollowers: function (user) {
    var arr = [];
    user.follows.forEach((userID) => {
      //if (typeof this[userID] == 'function') return;
      //console.log(data[userID]);
      arr.push(this[userID].name);
    });
    return arr;
  }
};

data.listPeople();
