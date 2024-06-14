import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3001;

const db = new pg.Client({
  user: "diana",
  host: "postgres-diana-db-1",
  database: "coffeeshop",
  password: "chido123",
  port: 5432,
});
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Get all from a table 

app.get("/clients", async (req, res) => {
    const result = await getTable("client");
    res.json(result);
});

app.get("/employees", async (req, res) => {
    const result = await getTable("employee");
    res.json(result);
});

app.get("/products", async (req, res) => {
    const result = await getTable("product");
    res.json(result);
});

app.get("/supplies", async (req, res) => {
    const result = await getTable("supply");
    res.json(result);
});

app.get("/suppliers", async (req, res) => {
    const result = await getTable("supplier");
    res.json(result);
});

app.get("/orders", async (req, res) => {
    const result = await getTable("cs_order");
    res.json(result);
});

//Get a row from table

app.get("/clients/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("client", row, value);
    res.json(result);
});

app.get("/employees/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("employee", row, value);
    res.json(result);
});

app.get("/products/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("product", row, value);
    res.json(result);
});

app.get("/supplies/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("supply", row, value);
    res.json(result);
});

app.get("/suppliers/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("supplier", row, value);
    res.json(result);
});

app.get("/orders/:row", async (req, res) => {
    const row = req.params.row;
    const value = req.query.value;
    const result = await getRow("order", row, value);
    res.json(result);
});

//Post a new row

app.post("/clients", async (req, res) => {
    const { name, email, phone, password } = req.body;
    const result = await postClient(name, email, phone, password);
    res.json(result);
});

app.post("/employees", async (req, res) => {
    const { rank, name, email, phone, password } = req.body;
    const result = await postEmployee(rank, name, email, phone, password);
    res.json(result);
});

app.post("/suppliers", async (req, res) => {
    const { name, supply_id, price } = req.body;
    const result = await postSupplier(name, supply_id, price);
    res.json(result);
});

app.post("/supplies", async (req, res) => {
    const { name, quantity } = req.body;
    const result = await postSupply(name, quantity);
    res.json(result);
});

app.post("/products", async (req, res) => {
    const { name, description, price } = req.body;
    const result = await postProduct(name, description, price);
    res.json(result);
});

app.post("/orders", async (req, res) => {
    const { client_id, date, total } = req.body;
    const result = await postOrder(client_id, date, total);
    res.json(result);
});

//Delete a row

app.delete("/clients/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("client", "client_id", id);
    res.json(result);
});

app.delete("/employees/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("employee", "employee_id", id);
    res.json(result);
});

app.delete("/suppliers/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("supplier", "supplier_id", id);
    res.json(result);
});

app.delete("/supplies/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("supply", "supply_id", id);
    res.json(result);
});

app.delete("/products/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("product", "product_id", id);
    res.json(result);
});

app.delete("/orders/:id", async (req, res) => {    
    const id = req.params.id;
    const result = await deleteRow("cs_order", "order_id", id);
    res.json(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function getRow(table, row, value) {
  try {
    const result = await db.query("SELECT * FROM " + table +" WHERE " + row + " = $1;", [value]);
    return result.rows;
  } catch (error) {
    return {error: error};
  }
}

async function getTable(table) {
    try {
        const result = await db.query("SELECT * FROM " + table +";");
        return result.rows;
    } catch (error) {
        return {error: error};
    }
}

async function postClient(name, email, phone, password) {
    try { 
        const result = await db.query(
            "INSERT INTO client (name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *;",
            [name, email, phone, password]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function postEmployee(rank, name, email, phone, password) {
    try {
        const result = await db.query(
            "INSERT INTO employee (rank, name, email, phone, password) VALUES($1, $2, $3, $4, $5) RETURNING *;",
            [rank, name, email, phone, password]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function postSupplier(name, supply_id, price) {
    try {
        const result = await db.query(
            "INSERT INTO supplier (name, supply_id, price) VALUES($1, $2, $3) RETURNING *;",
            [name, supply_id, price]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function postSupply(name, quantity) {
    try {
        const result = await db.query(
            "INSERT INTO supply (name, quantity) VALUES($1, $2) RETURNING *;",
            [name, quantity]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function postProduct(name, description, price) {
    try {
        const result = await db.query(
            "INSERT INTO product (name, description, price) VALUES($1, $2, $3) RETURNING *;",
            [name, description, price]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function postOrder(client_id, date, total) {
    try {
        const result = await db.query(
            "INSERT INTO cs_order (client_id, date, total) VALUES($1, $2, $3) RETURNING *;",
            [client_id, date, total]
        );
        return result;
    } catch (error) {
        return {error: error};
    }
}

async function deleteRow(table, key, id) {
    try {
        await db.query(
            "DELETE FROM $1 WHERE $2 = $3;",
            [table, key, id]
        );
        return {message: "Successfully deleted register with id " + id};
    } catch (error) {
        return {error: error};
    }
} 
