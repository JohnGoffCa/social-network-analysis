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
        var following = this.getFollowing(this[people]);
        var followingNames = this.getNamesFromPeople(following);
        var followers = this.followsMe(people);
        var followersNames = this.getNamesFromPeople(followers);
        console.log(this[people].name);
        console.log("Following: " + followingNames);
        console.log("Followers: " + followersNames + "\n");
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
          arr.push(this[person]);
      }
    }
    return arr;
  },

  getFollowing: function (user) {
    var arr = [];
    user.follows.forEach((userID) => {
      arr.push(this[userID]);
    });

    return arr;
  },

  //getNamesFromPeople
  //takes in an array of person objects and returns an array of their names
  getNamesFromPeople: function(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i].name);
    }
    return result;
  },

  whoFollowsMostPeople: function (age) {
    if (!age) age = 0;
    var mostPeople;
    var personWithMost;
    for (var people in this) {
      if (this.hasOwnProperty(people)) {
        if (typeof this[people] == 'function') continue;
        var arrOfFollowing = this.getFollowing(this[people]);
        if (!mostPeople) {
          mostPeople = arrOfFollowing.length
          personWithMost = this[people].name;
        } else {
          var currentFollowers = arrOfFollowing.length;
          for (var i = 0; i < arrOfFollowing.length; i++) {
            if (age && age < arrOfFollowing[i].age)
              mostPeople--
          }
          if (arrOfFollowing.length > mostPeople) {
            mostPeople = arrOfFollowing.length
            personWithMost = this[people].name;
          } else if (arrOfFollowing.length === mostPeople)
            personWithMost += ", " + this[people].name;
        } 
      }
    }
    console.log("The person following the most people is", personWithMost.name, "with", mostPeople, "people being followed.");
  },

  whoHasMostFollowers: function (age) {
    if (!age) age = 0;

    var personWithMost;
    var mostPeople;

    for (var person in this) {
      if (this.hasOwnProperty(person)) {
        if (typeof this[person] == 'function') continue;

        var arrOfFollowers = this.followsMe(person)
        if (!mostPeople) {
          mostPeople = arrOfFollowers.length;
          for (var i = 0; i < arrOfFollowers.length; i++) {
            if (age && age < arrOfFollowers[i].age)
              mostPeople--
          }
          personWithMost = this[person].name;
        } else {
          var currentFollowers = arrOfFollowers.length
          for (var i = 0; i < arrOfFollowers.length; i++) {
            if (age && age < arrOfFollowers[i].age)
              currentFollowers--;
          }
          if (currentFollowers > mostPeople) {
            mostPeople = currentFollowers;
            personWithMost = this[person].name;
          } else if (currentFollowers === mostPeople) {
            personWithMost += ", " + this[person].name;
          }
        }
      }
    }
    console.log("The person(s) with the most followers is", personWithMost, "with", mostPeople, "followers.");
  },
};

data.listPeople();
data.whoFollowsMostPeople();
data.whoHasMostFollowers();
