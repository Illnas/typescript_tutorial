var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Example of bugs that would happen when switching to typescript
var cashInRegister = 100;
var orderQueue = [];
var nextOrderId = 1;
var nextPizzaId = 1;
var menu = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
];
function addNewPizza(pizzaObj) {
    var newPizza = __assign({ id: nextPizzaId }, pizzaObj);
    menu.push(newPizza);
    return newPizza;
}
function placeOrder(pizzaName) {
    /*  menu.map((item) => {          // solution I offered based on task requirements
          if (item.name === order) {
              cashInRegister = item.price + cashInRegister
              console.log(cashInRegister)
              orderQueue.push({ pizza: order, status: "ordered" })
          }
      }) */
    var selectedPizza = menu.find(function (item) { return item.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in menu"));
        return;
    }
    cashInRegister += selectedPizza.price;
    var newOrder = { pizza: selectedPizza.name, status: "ordered", id: nextOrderId++ }; // instantiate newOrder with type of Order, fixed squiggly in next line
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    var order = orderQueue.find(function (order) { return order.id === orderId; });
    if (!order) {
        console.error("".concat(orderId, " was not found in the orderQueue"));
        throw new Error();
    }
    order.status = "completed";
    return order;
}
function getPizzaDetail(identifier) {
    if (typeof identifier === "string") {
        return menu.find(function (pizza) { return pizza.name.toLowerCase() === identifier.toLocaleLowerCase(); });
    }
    else if (typeof identifier === "number") {
        return menu.find(function (pizza) { return pizza.id === identifier; });
    }
    else {
        throw new Error("Parameter `identifier` must be either string or a number");
    }
}
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 }); // error was that argument was "cost" instead of "price"
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1); // fixed bug here, we put "1" instead of 1
console.log("Menu", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
var myName = "Bob";
var numberOfWheels = 4;
var isStudent = false;
var person1 = {
    name: "Joe",
    age: 42,
    isStudent: true,
    adress: {
        street: "123",
        city: "any",
        country: "USA"
    }
};
var person2 = {
    name: "Jill",
    age: 66,
    isStudent: false, // isstudent is error which will get highlighted when defining custom type for this object
    adress: {
        street: "123",
        city: "any",
        country: "USA"
    }
};
var ages = [100, 101];
var people = [person1, person2]; // or Array<Person>
// let userRole: UserRole = "admin"
var nextUserId = 1;
var users = [
    { id: nextUserId++, username: "john doe", role: "member" },
    { id: nextUserId++, username: "john smith", role: "contributor" },
    { id: nextUserId++, username: "alice jones", role: "admin" },
    { id: nextUserId++, username: "charlie brown", role: "member" }
];
function fetchUserDetails(username) {
    var user = users.find(function (user) { return user.username === username; });
    if (!user) {
        throw new Error("User with username ".concat(username, " not found"));
    }
    return user;
}
function updateUser(id, updates) {
    var foundUser = users.find(function (user) { return user.id === id; });
    if (!foundUser) {
        console.error("User not found!");
        return;
    }
    Object.assign(foundUser, updates);
}
// updateUser(1, { username: "new john doe" });
// updateUser(4, { role: "contributor" });
function addNewUser(newUser) {
    var user = __assign({ id: nextUserId++ }, newUser);
    users.push(user);
    return user;
}
addNewUser({ username: "joe schmoe", role: "member" });
var value = 1; // any turns ts checking off
// Lesson for generics
var gameScores = [14, 21, 33, 42, 59];
var favoriteThings = [" raindrops on roses", "whiskers on kittens", "bright copper kettles", "warm woolen mittens"];
var voters = [{ name: "Alice", age: 42 }, { name: "Bob", age: 77 }];
function getLastItem(array) {
    return array[array.length - 1];
}
console.log(getLastItem(gameScores));
console.log(getLastItem(favoriteThings));
console.log(getLastItem(voters));
