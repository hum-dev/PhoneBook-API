import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// register user
export const registerUser = async (req, res) => {
    let { full_name, email, password } = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("full_name", sql.VarChar, full_name)
            .input("email", sql.VarChar, email)
            // .input("password", sql.VarChar, hashedPassword)
            .query(
                `SELECT * FROM UserInfo WHERE full_name = @full_name AND email = @email`
            );
            const user = result.recordset[0];
            if (user) {
                return res.status(404).json({ message: "User already exists" });
            }
            else{
                await pool
                .request()
                .input("full_name", sql.VarChar, full_name)
                .input("email", sql.VarChar, email)
                .input("password", sql.VarChar, hashedPassword)
                .query(
                    `INSERT INTO UserInfo (full_name, email, password) VALUES (@full_name, @email, @password)`
                );
                res.status(200).json({ message: "User created successfully" });

            }

    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        sql.close();
    }
};
