const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    console.log(uid);

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error),
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    console.log(id);
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.json({
                ok: false,
                msg: 'medico no encontrado por id'
            });
        }

        const cambiosmedico = {
            ...req.body,
            usuarios: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosmedico, { new: true });

        res.json({
            ok: true,
            Medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        } else {

            const medicoBorrar = await Medico.findOneAndDelete(id);

            res.json({
                ok: true,
                msg: 'Medico Borrado',
                medicoBorrar
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}