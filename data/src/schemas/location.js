const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema


const location = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ['null', 'Restaurante', 'Bar', 'Playa', 'Hotel', 'Hostal'],
        default: 'null'
    },

    title: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
        default: 'default'
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
        enum: ['null', 'A Coruña', 'Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Huesca', 'Ibiza', 'Jaén', 'La Rioja', 'Las Palmas de Gran Canaria', 'Gran Canaria', 'Fuerteventura', 'Lanzarote', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Mallorca', 'Menorca', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Tenerife', 'La Gomera', 'La Palma', 'El Hierro', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'],
        default: 'null'
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }


})

module.exports = location



