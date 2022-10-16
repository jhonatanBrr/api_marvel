import {pool} from '../db.js'

export const obtenerpersonajes = async (_req,res) => {
    let seres = [];
    try {
        const [resultSeres] = await pool.query('SELECT * FROM marveldb.seres;');
        const [resultGrupos] = await pool.query('SELECT * FROM marveldb.grupos;');
        const [resultCondiciones] = await pool.query('SELECT * FROM marveldb.condiciones;');
        const [resultVehiculos] = await pool.query('SELECT * FROM marveldb.vehiculos;');
        const [resultSerPoderes] = await pool.query('SELECT * FROM marveldb.ser_con_poderes;')
        const [resultPoderes] = await pool.query('SELECT * FROM marveldb.poderes;')

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
        res.status(500).send('Error del servidor')
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
            id: rows.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error del servidor')
    }
}