// import pool from "../db/connectdb.js"
import sql from "mssql";
import config from "../db/config.js";

//get all users
export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM PhoneUser");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

//get user by id
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM PhoneUser WHERE user_id = @id");
    //   if (!id ) return res.status(404).json({ message: "User not found" });
    // {!id ? res.status(404).json({ message: "User not found" }) : res.status(200).json(result.recordset)};
    // Check if user exists - Samuel
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(result.recordset);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

//create user
export const createUsers = async (req, res) => {
  const {
    full_name,
    mobile_number,
    work_number,
    email,
    home_address,
    group_id,
  } = req.body;

  try {
    let pool = await sql.connect(config.sql);

    // check if user already exists - Samuel
    const checkQuery = await pool
      .request()
      .input("mobile_number", sql.VarChar, mobile_number)
      .input("work_number", sql.VarChar, work_number)
      .input("email", sql.VarChar, email)
      .query(
        "SELECT * FROM PhoneUser WHERE mobile_number = @mobile_number OR work_number = @work_number OR email = @email"
      );
    if (checkQuery.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const result = await pool
      .request()
      .input("full_name", sql.VarChar, full_name)
      .input("mobile_number", sql.VarChar, mobile_number)
      .input("work_number", sql.VarChar, work_number)
      .input("email", sql.VarChar, email)
      .input("home_address", sql.VarChar, home_address)
      .input("group_id", sql.Int, group_id)
      .query(
        "INSERT INTO PhoneUser (full_name, mobile_number, work_number, email, home_address, group_id) VALUES (@full_name, @mobile_number, @work_number, @email, @home_address, @group_id)"
      );
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

//update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, group_id } = req.body;

  try {
    let pool = await sql.connect(config.sql);

    // check if user already exists - Samuel
    const checkQuery = await pool
      .request()
      .input("id", sql.Int, id)
      .input("full_name", sql.VarChar, full_name)
      .input("group_id", sql.Int, group_id)
      .query(
        "SELECT * FROM PhoneUser WHERE user_id != @id AND (full_name = @full_name OR group_id = @group_id)"
      );
    if (checkQuery.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("full_name", sql.VarChar, full_name)
      .input("group_id", sql.Int, group_id)
      .query(
        "UPDATE PhoneUser SET full_name = @full_name, group_id = @group_id  WHERE user_id = @id"
      );
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(config.sql);

    // check if user exists - Samuel
    const checkUserQuery = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM PhoneUser WHERE user_id = @id");

    if (checkUserQuery.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM PhoneUser WHERE user_id = @id");
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

// assign person to group
export const assignGroup = async (req, res) => {
  const { user_id, group_id } = req.body;

  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("group_id", sql.Int, group_id)
      .query(
        "UPDATE PhoneUser SET group_id = @group_id WHERE user_id = @user_id"
      );
    res.status(200).json({ message: "User assigned to group successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};
