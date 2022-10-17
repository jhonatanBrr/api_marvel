import {pool} from '../db.js'

export const obtenerPoderes = async (_req,res) => {
    try {
        const [result] = await pool.query('SELECT * FROM poderes;')
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({messaje:'Error del servidor'})
    }
}