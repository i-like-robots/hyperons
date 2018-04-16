import Layout from './layout'

const Address = ({ address }) => {
  const parts = address.split(',').map((part) => part.trim())

  return (
    <address itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
      <span itemProp="streetAddress">{parts[0]}</span>,
      <span itemProp="addressLocality">{parts[1]}</span>,
      <span itemProp="addressRegion">{parts[2]}</span>,
      <span itemProp="postalCode">{parts[3]}</span>
    </address>
  )
}

const Map = ({ latitude, longitude, width, height, zoom = 10 }) => {
  const url = 'https://maps.googleapis.com/maps/api/staticmap'
  const center = `${latitude},${longitude}`
  const size = `${width}x${height}`

  return <img src={`${url}?center=${center}&zoom=${zoom}&size=${size}`} />
}

const Company = (props) => (
  <div className="Company" itemScope itemType="http://schema.org/LocalBusiness">
    <h2 className="Company-heading" itemProp="name">
      {props.name}
    </h2>
    <p className="Company-description" itemProp="description">
      {props.description}
    </p>
    <p className="Company-phone" itemProp="telephone" style={{ fontStyle: 'italic' }}>
      {props.phone}
    </p>
    <div className="Company-address">
      <Address address={props.address} />
    </div>
    <div className="Company-map">
      <Map latitude={props.latitude} longitude={props.longitude} width={640} height={320} />
    </div>
    <ul>
      <li key="tag-label" style={{ marginRight: 10, fontWeight: 'bold' }}>
        Tags:
      </li>
      {props.tags.map((tag, i) => <li key={`tag-${i}`}>{tag}</li>)}
    </ul>
  </div>
)

const App = ({ navigation, companies }) => (
  <Layout navigation={navigation}>
    <div className="Directory">
      <h1 className="Directory-heading">Companies</h1>
      <ul className="Directory-list">
        {companies.map((company) => (
          <li key={`company-${company.id}`} className="Directory-item">
            <Company {...company} />
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export { App }
