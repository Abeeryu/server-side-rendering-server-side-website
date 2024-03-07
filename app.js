// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// //stel het oba profile in//
// const apiData= 'https://fdnd-agency.directus.app/admin/content/oba_profile'

// //stel het oba family in//
// const apiData= 'https://fdnd-agency.directus.app/admin/content/oba_family'

// //stel het oba items in//
// const apiData= 'https://fdnd-agency.directus.app/admin/content/oba_item'


//wat ik heb zelf geschreven//

// Maak een GET route voor de index
app.get('/', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((itemsDataUitDeAPI) => {
    response.render ('index', {items: itemsDataUitDeAPI.data})
    });
})


app.get('/detail/:id', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item' + '?filter={"id":' + request.params.id + '}').then((itemsDataUitDeAPI) => {
        response.render('detail', {items: itemsDataUitDeAPI.data})
    });
})

app.get('/overview', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((itemsDataUitDeAPI) => {
        response.render('overview', {items: itemsDataUitDeAPI.data})
    });
})




// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

