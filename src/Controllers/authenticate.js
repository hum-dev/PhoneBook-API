import sql from 'mssql'
import config from "../db/config.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginRequired = (req,res,next)=>{
    if(req.user){
        next();
}else{
    return res.status(401).json({message:'anauthorized user'})
}
};

export const Register = async(req,res)=>{
    const{username,passward,email} = req.body;
    const hashedPassword = bcrypt.hashSync(passward,10);
    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input ('username',sql.VarChar,username)
        .input('email',sql.VarChar,email)
        .query('SELECT * FROM PhoneUser WHERE username = @username OR email=@email');
        const user = result.recordset[0];
        if(user){
            res.status(409).json({error:'user already exist'});
        }else{
            await pool.request()
            .input('username',sql.VarChar,username)
            .input('hashedpassword',sql.VarChar,hashedPassword)
            .input('email',sql.VarChar,email)
            .query('INSERT INTO users(username,hashedPassword,email) VALUES (@username,@hashedpassword,@email)')
            res.status(200).send({message:'user created successfully'})
        }
    }
    catch(error){
        res.status(500).json({erro:'an error occured while creating the user'});
    }
    finally{
        sql.close();
    }
}