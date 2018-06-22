const puppeteer = require("puppeteer")
require("isomorphic-fetch") //TODO: is this still needed?
const Lokka = require("lokka").Lokka
const Transport = require("lokka-transport-http").Transport

const client = new Lokka({
	transport: new Transport("http://localhost:4000/graphql/"),
})
// const client = require("graphql-client")({
// 	url: "http://localhost:4000/graphql",
// 	// headers: {
// 	// 	Authorization: "Bearer " + token,
// 	// },
// })
;(async () => {
	let scrape = async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()
		await page.goto("http://www.businessghana.com/site/real-estates")
		await page.waitFor(1000)
		/**
		 * TODO: refactor to use less code, and be more readable
		 */
		const result = await page.evaluate(() => {
			allPropertyLinks = document.querySelectorAll(".featured-image > a")
			allPropertyLinks = Array.prototype.map.call(
				allPropertyLinks,
				function(e) {
					return e.href
				}
			)
			plotLinks = allPropertyLinks.filter(e => {
				return e.startsWith(
					"http://www.businessghana.com/site/real-estates/plots"
				)
			})
			propertyLinks = allPropertyLinks.filter(e => {
				return e.startsWith(
					"http://www.businessghana.com/site/real-estates/properties"
				)
			})
			shopLinks = allPropertyLinks.filter(e => {
				return e.startsWith(
					"http://www.businessghana.com/site/real-estates/shops"
				)
			})
			officeLinks = allPropertyLinks.filter(e => {
				return e.startsWith(
					"http://www.businessghana.com/site/real-estates/offices"
				)
			})

			return {
				propertyLinks,
				// price
			}
		})
		browser.close()
		return result
	}

	let getDetails = scrape().then(async links => {
		const browser = await puppeteer.launch({ headless: false })
		let data = []
		console.log(links.propertyLinks)
		/**
		 * TODO: transfer these to a 'selectors' file, and import them for use.
		 *
		 */

		const TITLE_SELECTOR = ".details-title > h2"
		const PRICE_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(3) > .section-info-content"
		const NUM_ROOMS_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(4) > .section-info-content"
		const NUM_BEDROOMS_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(5) > .section-info-content"
		const ACQUISITION_TYPE_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(6) > .section-info-content"
		const NUM_BATHROOMS_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(7) > .section-info-content"
		const PLOT_LENGTH_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(8) > .section-info-content"
		const PLOT_WIDTH_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(9) > .section-info-content"
		const PLOT_MEASURE_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(10) > .section-info-content"
		const DESCRIPTION_SELECTOR =
			".all-details-section > div > div:nth-child(4) > div > div:nth-child(11) > .section-info-content"
		const LOCATION_SELECTOR =
			".all-details-section > div > div:nth-child(5) > div > div:nth-child(3) > .section-info-content"
		const REGION_SELECTOR =
			".all-details-section > div > div:nth-child(5) > div > div:nth-child(4) > .section-info-content"
		const STREET_ADDRESS_SELECTOR =
			".all-details-section > div > div:nth-child(5) > div > div:nth-child(5) > .section-info-content"
		const LISTER_NAME_SELECTOR =
			".all-details-section > div > div:nth-child(6) > div > div:nth-child(3) > .section-info-content"
		const LISTER_PHONE_SELECTOR =
			".all-details-section > div > div:nth-child(6) > div > div:nth-child(4) > .section-info-content"
		const ADVERTISER_SELECTOR =
			".all-details-section > div > div:nth-child(6) > div > div:nth-child(5) > .section-info-content"

		//TODO: limiting to 3, to manage memory for testing
		//change to complete list in production.
		//need to figure a better way to handle this.
		for (let i = 0; i < 3; i++) {
			let page = await browser.newPage()
			await page.goto(links.propertyLinks[i])
			await page.waitFor(3000)

			let result = await page.evaluate(() => {
				let title = document
					.querySelector(".details-title > h2")
					.innerHTML.trim()
				let price = document
					.querySelector(
						"div.row.all-details-section > div > div:nth-child(4) > div > div:nth-child(3) > .section-info-content"
					)
					.innerHTML.trim()
				let numRooms = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(4) > .section-info-content"
					)
					.innerHTML.trim()
				let numBedrooms = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(5) > .section-info-content"
					)
					.innerHTML.trim()
				let acquisitionType = document.querySelector(
					".all-details-section > div > div:nth-child(4) > div > div:nth-child(6) > .section-info-content"
				).innerHTML
				let numBathrooms = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(7) > .section-info-content"
					)
					.innerHTML.trim()
				let plotLength = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(8) > .section-info-content"
					)
					.innerHTML.trim()
				let plotWidth = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(9) > .section-info-content"
					)
					.innerHTML.trim()
				let plotMeasure = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(10) > .section-info-content"
					)
					.innerHTML.trim()
				let desc = document
					.querySelector(
						".all-details-section > div > div:nth-child(4) > div > div:nth-child(11) > .section-info-content > p:nth-child(2)"
					)
					.innerHTML.trim()
				let location = document
					.querySelector(
						".all-details-section > div > div:nth-child(5) > div > div:nth-child(3) > .section-info-content"
					)
					.innerHTML.trim()
				let region = document
					.querySelector(
						".all-details-section > div > div:nth-child(5) > div > div:nth-child(4) > .section-info-content"
					)
					.innerHTML.trim()
				let streetAddress = document
					.querySelector(
						".all-details-section > div > div:nth-child(5) > div > div:nth-child(5) > .section-info-content"
					)
					.innerHTML.trim()
				let listerName = document
					.querySelector(
						".all-details-section > div > div:nth-child(6) > div > div:nth-child(4) > .section-info-content"
					)
					.innerHTML.trim()
				let listerPhone = document
					.querySelector(
						".all-details-section > div > div:nth-child(6) > div > div:nth-child(4) > .section-info-content"
					)
					.innerHTML.trim()
				let advertiser = document
					.querySelector(
						".all-details-section > div > div:nth-child(6) > div > div:nth-child(5) > .section-info-content"
					)
					.innerHTML.trim()

				return {
					title,
					price,
					numRooms,
					numBedrooms,
					numBathrooms,
					plotLength,
					plotWidth,
					plotMeasure,
					desc,
					location,
					region,
					streetAddress,
					listerName,
					listerPhone,
					advertiser,
				}
			})
			data.push(result)
		}
		browser.close()
		return data
	})

	getDetails.then(properties => {
		console.log(properties)
		properties.forEach(each => {
			client
				.mutate(
					`{newProperty: CreateProperty(
                url: "random text for now"
                title: "${each.title}"
                desc: "${each.desc}"
                imageURLs: ""
                streetAddress: "${each.streetAddress}"
                price: "${each.price}"
                numBedrooms: "${each.numBedrooms}"
                numBathroooms: "${each.numBathrooms}"
                size: "${"
                unitOfMeasurement: ""
                numPlots: ""
                projectName: ""


            ) {
                id
                title
                url
            }}`
				)
				.then(response => {
					console.log(response.newProperty)
				})
		})
	})
})()
