import NavBar from "@/app/components/NavBar"
import SearchBar from "@/app/components/SearchBar";
import Map from "@/app/components/Map";
import Card from "@/app/components/Card";

const getProperties = async()=>{
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
    if (!HYGRAPH_ENDPOINT){
        throw new Error("Missing HYGRAPH_ENDPOINT");
    }
    const response = await fetch(HYGRAPH_ENDPOINT, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query:
                `query Properties {
                  properties {
                    beds
                    description
                    name
                    rentalPrice
                    slug
                    updatedAt
                    images {
                      fileName
                      url
                    }
                    id
                    location {
                      latitude
                      longitude
                    }
                  }
                }
                `
        })
    })
    const json = await response.json()
    return json.data.properties
}

const Home = async () => {
    const properties = await getProperties()
    console.log(properties)

  return (
      <>
      <NavBar/>
      <SearchBar/>
      <main>
          <article>
              <Map/>
          </article>
          <article className="listings">
              <h2>Rental Listings</h2>
              <div className="card-container">
                  {properties.map(property => <Card
                  key={property.id}
                  propertyName={property.name}
                  slug={property.slug}
                  rentalPrice={property.rentalPrice}
                  beds={property.beds}
                  image={property.images[0]}

                  />)}
              </div>
          </article>

      </main>

      </>
  )
}

export default Home