CREATE TABLE IF NOT EXISTS client (
            client_id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50) NOT NULL,
            phone VARCHAR(15),
            password VARCHAR(50) NOT NULL
        )

        CREATE TABLE IF NOT EXISTS employee (
            employee_id SERIAL PRIMARY KEY,
            rank VARCHAR(20),
            name VARCHAR(50),
            email VARCHAR(50) NOT NULL,
            phone VARCHAR(15),
            password VARCHAR(50) NOT NULL
        )

        CREATE TABLE IF NOT EXISTS supplier (
            supplier_id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            supply_id INT NOT NULL,
            price NUMERIC(10,2)
        )

        CREATE TABLE IF NOT EXISTS supply (
            supply_id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            quantity INT NOT NULL
        )
        
        CREATE TABLE IF NOT EXISTS product (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(100),
            price NUMERIC(10,2)
        )
        
        CREATE TABLE IF NOT EXISTS cs_order (
            order_id SERIAL PRIMARY KEY,
            client_id INT NOT NULL,
            date DATE,
            total NUMERIC(10,2)
        )