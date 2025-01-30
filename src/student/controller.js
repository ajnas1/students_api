import { query } from "express";
import pool from "../../db.js";
import queries from "./queries.js";

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
}

const addStudent = (req, res) => {
    console.log(req.body);
    const { name, email, age, dob } = req.body;
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, result) => {
        if (error) throw error;
        if (result.rows.length) {
            console.log('Email already exists.');
            res.status(400).json({ messsage: "Email already exists." });
        }

    });
    console.log(`${name} ${email} ${age} ${dob}`);
    //add student to db
    pool.query(queries.addStudent, [name, email, age, dob], (error, result) => {
        if (error) throw error;
        res.status(201).json({ messsage: "student created " });
        console.log('Student create');
    });
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, result) => {
        const noStudentFound = !result.rows.length;
        if (noStudentFound) {
            res.status(404).json({ messsage: "students does not exist in the db, could not remove" })
        }

    });
    pool.query(queries.removeStudent, [id], (error, result) => {
        if (error) throw error;
        res.status(200).json({ messsage: "student removed successfully" })


    });

}

const updateStudent = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, result) => {
        const noStudentFound = !result.rows.length;
        if (noStudentFound) {
            res.status(404).json({ messsage: "students does not exist in the db, could not remove" })
        }

        pool.query(queries.updateStudent, [name, id], (error, result) => {
            if(error) throw error;
            res.status(200).json({messsage: "student updated successfully"});
        })
    });
}



export default { getStudents, getStudentById, addStudent, removeStudent, updateStudent };