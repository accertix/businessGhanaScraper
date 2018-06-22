const Lokka = require("lokka").Lokka
const Transport = require("lokka-transport-http").Transport

const client = new Lokka({
	transport: new Transport("http://localhost:4000/graphql/"),
})
;(async () => {
	const property = {
		url: "random url from obj",
		title: "random title from obj",
	}

	const query = `{
        newProperty: CreateProperty(url: "${property.url}", title: "${property.title}"){
            id
            url
            title
        }
    }`
    console.log(query)
	client.mutate(query).then(res => {
		console.log(res)
	})
})()
