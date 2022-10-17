import {pool} from '../db.js'

export const obtenerpersonajes = async (_req,res) => {
    let seres = [];
    try {
        const [resultSeres] = await pool.query('SELECT * FROM seres;');
        const [resultGrupos] = await pool.query('SELECT * FROM grupos;');
        const [resultCondiciones] = await pool.query('SELECT * FROM condiciones;');
        const [resultVehiculos] = await pool.query('SELECT * FROM vehiculos;');
        const [resultSerPoderes] = await pool.query('SELECT * FROM ser_con_poderes;')
        const [resultPoderes] = await pool.query('SELECT * FROM poderes;')

        if(resultSeres.length > 0){
            seres = resultSeres.map(ser => {
                let grupo = resultGrupos.filter(grupo => ser.grupo_id == grupo.id);
                let condicion = resultCondiciones.filter(condicion => condicion.id == ser.condicion_id)
                let vehiculo = [null];
                if(ser.vehiculo_id){
                    vehiculo = resultVehiculos.filter(vehiculo => vehiculo.id == ser.vehiculo_id)
                } 

                let _Poderes = [];
                if (resultSerPoderes?.length > 0) {
                    resultSerPoderes.forEach(p => {
                        if (p.ser_id == ser.id) {
                            let filtroPoder = resultPoderes.filter(poder => poder.id == p.poderes_id)
                            _Poderes.push(filtroPoder[0])
                        }
                    })
                }
                return {
                    ...ser,
                    grupo: grupo[0],
                    condicion: condicion[0],
                    vehiculo: vehiculo[0],
                    poderes:_Poderes
                }
            })
        }
        res.json(seres);
    } catch (error) {
        res.status(500).send({messaje:'Error del servidor'})
        console.log(error);
    }
}

export const crearPersonaje = async (_req,res) => {
    try {
        const {nombre,lugar_operacion,grupo_id, vehiculo_id , imagen ,condicion_id,poderes} = _req.body
        const [rows] = await pool.query("INSERT INTO seres(nombre,lugar_operacion, grupo_id, vehiculo_id,imagen,condicion_id) VALUE (?,?,?,?,?,?)", [nombre,lugar_operacion,grupo_id, vehiculo_id , imagen ,condicion_id]);
        if (poderes?.length > 0) {
            poderes.forEach(async (poder) => {
                await pool.query("INSERT INTO ser_con_poderes(ser_id,poderes_id) VALUE (?,?)",[Number(rows.insertId) ,Number(poder.id)]);
            });
        }

        res.send({
            id: rows.insertId,
            nombre,
            lugar_operacion,
            grupo_id,
            vehiculo_id, 
            imagen,
            condicion_id,
            poderes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({messaje:'Error del servidor'})
    }
}

export const editarPersonaje = async (req,res) => {
    try {
        const {id} = req.params
        const {nombre,lugar_operacion} = req.body;
        const [result] = await pool.query('UPDATE seres SET nombre = ?,lugar_operacion = ? WHERE id = ?',[nombre,lugar_operacion,id])
        if (result.affectedRows === 0) return res.status(404).json({
            messaje: "Personaje no encontrado"
        })
        const [rows] = await pool.query('SELECT * FROM seres WHERE id = ?',[id])
        res.json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).send({messaje:'Error del servidor'})
    }
}