import express, { request } from "express";

const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let nextid = 1;

app.post("/users", (request, response) => {
    const { name, email } = request.body;
    let user = { id: nextid, name, email }
    users.push(user);
    nextid++;
    response.status(201).send(user);
});

app.get("/users", (request, response) => {
    response.send(users);
});

app.put("/users/:id", (request, response) => {
    const userID = parseInt(request.params.id);
    const user = users.find((u) => u.id === userID)
    if (!user) {
        response.status(404).send("User not found");
        return
    }
    response.set("Content-Type", "application/json");
    console.log(request.body);

    const { name, email } = request.body;
    user.name = name;
    user.email = email;
    response.status(200).send(user);

})

app.get("/users/:id", (request, response) => {
    const userID = parseInt(request.params.id);
    const user = users.find((u) => u.id === userID)
    if (!user) {
        response.status(404).send("User not found");
        return
    }
    response.status(200).send(user);

})

app.delete("/users/:id", (request, response) => {
    let userID = parseInt(request.params.id);
    let user = users.findIndex((users) => users.id === userID)
    if (user === -1) {
        response.status(404).send("User not found");
        return
    }
    users.splice(user, 1);
    response.status(200).send("User deleted");
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});