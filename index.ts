// Example of bugs that would happen when switching to typescript
let cashInRegister = 100;
let orderQueue: Order[] = [];
let nextOrderId = 1;
let nextPizzaId = 1;

type Pizza = {
    id: number,
    name: string,
    price: number
}

type Order = {
    id: number,
    pizza: string,
    status: "ordered" | "completed"
}

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]



function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {  //void means that function returns nothing
    const newPizza: Pizza = {
        id: nextPizzaId,
        ...pizzaObj
    }

    menu.push(newPizza)
    return newPizza
}

function placeOrder(pizzaName: string): Order | undefined {
    /*  menu.map((item) => {          // solution I offered based on task requirements
          if (item.name === order) {
              cashInRegister = item.price + cashInRegister
              console.log(cashInRegister)
              orderQueue.push({ pizza: order, status: "ordered" })
          }
      }) */

    const selectedPizza = menu.find(item => item.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { pizza: selectedPizza.name, status: "ordered", id: nextOrderId++ } // instantiate newOrder with type of Order, fixed squiggly in next line
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`${orderId} was not found in the orderQueue`)
        throw new Error()
    }
    order.status = "completed"
    return order
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLocaleLowerCase())
    } else if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier)
    } else {
        throw new Error("Parameter `identifier` must be either string or a number")
    }
}



addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })  // error was that argument was "cost" instead of "price"
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })
placeOrder("Chicken Bacon Ranch")
completeOrder(1) // fixed bug here, we put "1" instead of 1

console.log("Menu", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)



let myName: string = "Bob";
let numberOfWheels: number = 4;
let isStudent: boolean = false;


// Defining custom types

type Address = {
    street: string,
    city: string,
    country: string
}

type Person = { //type has first letter as capital letter
    name: string,
    age: number,
    isStudent: boolean,
    adress?: Address // defined type earlier and assigned it here 
}

let person1: Person = {
    name: "Joe",
    age: 42,
    isStudent: true,
    adress: {
        street: "123",
        city: "any",
        country: "USA"
    }
}

let person2: Person = {
    name: "Jill",
    age: 66,
    isStudent: false,  // isstudent is error which will get highlighted when defining custom type for this object
    adress: {
        street: "123",
        city: "any",
        country: "USA"
    }
}

let ages: number[] = [100, 101]

let people: Person[] = [person1, person2] // or Array<Person>


// Unions
type User = {
    id: number,
    username: string,
    role: UserRole
}

type UpdatedUser = Partial<User>

type UserRole = "contributor" | "member" | "admin";
// let userRole: UserRole = "admin"

let nextUserId = 1;

const users: User[] = [
    { id: nextUserId++, username: "john doe", role: "member" },
    { id: nextUserId++, username: "john smith", role: "contributor" },
    { id: nextUserId++, username: "alice jones", role: "admin" },
    { id: nextUserId++, username: "charlie brown", role: "member" }
];

function fetchUserDetails(username: string): User {  // adding ': User' after arguments is to specify which type of data will be returned from function
    const user = users.find(user => user.username === username)
    if (!user) {
        throw new Error(`User with username ${username} not found`)
    }
    return user
}

function updateUser(id: number, updates: UpdatedUser) {
    const foundUser = users.find(user => user.id === id)
    if (!foundUser) {
        console.error("User not found!")
        return
    }
    Object.assign(foundUser, updates)
}

// updateUser(1, { username: "new john doe" });
// updateUser(4, { role: "contributor" });

function addNewUser(newUser: Omit<User, "id">): User {
    const user: User = {
        id: nextUserId++,
        ...newUser
    }

    users.push(user)
    return user
}

addNewUser({ username: "joe schmoe", role: "member" })

let value: any = 1;   // any turns ts checking off

// Lesson for generics

const gameScores = [14, 21, 33, 42, 59]
const favoriteThings = [" raindrops on roses", "whiskers on kittens", "bright copper kettles", "warm woolen mittens"]
const voters = [{ name: "Alice", age: 42 }, { name: "Bob", age: 77 }]

function getLastItem<PlaceholderType>(array: PlaceholderType[]): PlaceholderType | undefined {  //<PlaceholderType> "PlaceholderType" is placeholder, more common is "<T>"
    return array[array.length - 1]
}

console.log(getLastItem(gameScores));
console.log(getLastItem(favoriteThings));
console.log(getLastItem(voters));

