import React, { useState } from 'react'
import Weather from './Weather'

const CountryInfo = ( {c}) => {
    const img = React.createElement('img', {src: c.flags.png, alt: "Country flag", height: "40%", width: "40%"})
    return (
        <div key={c?.name?.common}>
            <h1>{c.name.common}</h1>
            capital {c.capital}
            <br/>
            area {c.area}
            <br/>
            <h3>languages: </h3>
            <div>
                {Object.values(c.languages).map((l, i) =>
                    <p key={i}>
                        &emsp;* {l}
                    </p>
                )}
            </div>
            <br/>
            {img}
            <br/>
            <Weather city={c.capital}/>
        </div>
    )
}

const Countries = ( p ) => {
    const [isShown, setIsShown] = useState(Array(p.select.length).fill(false))
    if (p.select.length > 10) {
        return (
            <div key={p?.select.name?.common}>
                Too many matchers, specify another filter
            </div>
        )
    }
    else if (p.select.length > 1) {
        return (
            <div> 
                {p.select.map(a => 
                    <li key={a.name.common}>
                        {a.name.common}
                        <button onClick={() => { const copy = [ ...isShown ]; copy[p.select.indexOf(a)] = !copy[p.select.indexOf(a)]; setIsShown(copy) }}> show </button>
                        {isShown[p.select.indexOf(a)] && <CountryInfo c={a} />}
                    </li>
                )}
            </div>
        )
    }
    else if (p.select.length === 1) {
        return (<CountryInfo c={p.select[0]} />)
    }
  }

export default Countries