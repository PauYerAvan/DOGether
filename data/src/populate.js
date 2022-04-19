const { connect, disconnect } = require('mongoose')
const { User, Comment, Location } = require('./models')
const { user } = require('./Schemas')

let users
let locations
let comments

connect('mongodb://localhost:27017/dogether-db')
    .then(() => console.log('connected'))
    .then(() => Promise.all(
        [User.deleteMany(),
        Comment.deleteMany(),
        Location.deleteMany()
        ]))


    .then(() => {
        const anonymous = new User({ name: 'anonymous', email: 'anonymous@mail.com', password: '123123123' })
        const agua = new User({ name: 'Agua', email: 'agua@mail.com', password: '123123123' })
        const isabel = new User({ name: 'Isabel', email: 'isabel@mail.com', password: '123123123' })
        const wendy = new User({ name: 'Wendy', email: 'wendy@mail.com', password: '123123123' })
        const pepe = new User({ name: 'Pepe', email: 'pepe@mail.com', password: '123123123' })
        const sirius = new User({ name: 'Sirius', email: 'sirius@mail.com', password: '123123123' })
        const carmen = new User({ name: 'Carmen', email: 'carmen@mail.com', password: '123123123' })
        const jorge = new User({ name: 'Jorge', email: 'jorge@mail.com', password: '123123123' })
        const carlos = new User({ name: 'Carlos', email: 'carlos@mail.com', password: '123123123' })
        const adara = new User({ name: 'Adara', email: 'adara@mail.com', password: '123123123' })

        return Promise.all([anonymous.save(), agua.save(), isabel.save(), wendy.save(), pepe.save(), sirius.save(), carmen.save(), jorge.save(), carlos.save(), adara.save()])
    })


    .then(_users => {
        users = _users

        const [anonymous, agua, wendy, sirius, carmen, adara ] = users

        const location1 = new Location({ user: agua.id, type: 'Restaurante', title: 'Restaurante Rosita', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/26/ee/4e/su-entrada-principal.jpg', address: 'Calle Maria Cristina, 34', city: 'Barcelona' })
        const location2 = new Location({ user: agua.id, type: 'Playa', title: 'Playa del Morro', image: 'https://photo620x400.mnstatic.com/69668718400a76b234407987c597487d/playa-del-morro.jpg', address: 'Avenida plunchimplera, 8', city: 'Tarragona' })
        const location3 = new Location({ user: wendy.id, type: 'Bar', title: 'Bar Piripi, 98', image: 'https://media.timeout.com/images/105859395/750/422/image.jpg', address: 'Calle Garcia Lorca, 6', city: 'Barcelona' })
        const location4 = new Location({ user: wendy.id, type: 'Bar', title: 'Cafe-Bar Los Girasoles', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/6a/ae/40/cafe-bar-los-girasoles.jpg', address: 'Avenida Principal, 1', city: 'Girona'})
        const location5 = new Location({ user: wendy.id, type: 'Playa', title: 'Playa de los Alemanes', image: 'https://i.ytimg.com/vi/yJ7HJFQ356Q/hqdefault.jpg', address: 'Rua Vallvidriera, 87', city: 'Girona' })
        const location6 = new Location({ user: sirius.id, type: 'Restaurante', title: 'Restaurante Pegatina', image: 'https://cloud10.todocoleccion.online/coleccionismo-pegatinas/tc/2020/02/28/22/195515275.jpg?size=720x720&crop=true', address: 'Avenida Margarita Castaño, 45', city: 'Lleida' })
        const location7 = new Location({ user: sirius.id, type: 'Bar', title: 'Bar Canigo', image: 'https://media-cdn.tripadvisor.com/media/photo-s/19/2c/07/99/entrada.jpg', address: 'Calle Flor y Cascabel, 541', city: 'Lleida'})
        const location8 = new Location({ user: carmen.id, type: 'Hotel', title: 'Hotel la Luna', image: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/260556697.jpg?k=81f854ec25439b6829782865e03aa3c0b42d138ae6fe177eb23459cec131216a&o=&hp=1', address: 'Calle del Encanto, 64', city: 'Albacete'})
        const location9 = new Location({ user: adara.id, type: 'Hostal', title: 'Hostal la Arena', image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/187556449.jpg?k=31ad1c6fc4971472d7c88441af465f58869742463127407c1172a0e06ab8a220&o=&hp=1', address: 'Calle Cristobal Colon, 5', city: 'Barcelona'})

        return Promise.all([location1.save(), location2.save(), location3.save(), location4.save(), location5.save(), location6.save(), location7.save(), location8.save(), location9.save()])
    })

    .then(locations => {

        const [location1, location2, location4, location5, location6, location7, location8, location9] = locations
        const [anonymous, agua, isabel, wendy, pepe, sirius] = users

        const pepeComment = new Comment({ user: pepe.id, location: location1.id, text: 'super atentos con mis peludos gran sitio!' })
        const aguaComment1 = new Comment({ user: agua.id, location: location5.id, text: 'playa muy sucia' })
        const aguaComment2 = new Comment({ user: agua.id, location: location4.id, text: 'muy buen lugar para ir con tu amigo peludo'})
        const siriusComment = new Comment({ user: sirius.id, location: location5.id, text: 'me encantan los atardeceres alli, no hay mucha gente por lo que no resulta agobiante'})
        const wendyComment = new Comment({ user: wendy.id, location: location7.id, text: 'imposible estar traqnuilo dentro del aforo que tiene siempre'})

        pepe.favorites.push(location2, location9)
        sirius.favorites.push(location1, location2, location5)
        wendy.favorites.push(location2, location6, location7, location8)

        return Promise.all([pepeComment.save(), aguaComment1.save(), aguaComment2.save(), siriusComment.save(), wendyComment.save(), pepe.save(), sirius.save(), agua.save(), isabel.save(), wendy.save()])

    })

    .then(() => disconnect())
    .then(() => console.log('disconnected'))