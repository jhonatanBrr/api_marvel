import {pool} from '../db.js'

export const obtenerCondiciones = async (_req,res) => {
    try {
        const [result] = await pool.query('SELECT * FROM condiciones')
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error del servidor')
    }
}