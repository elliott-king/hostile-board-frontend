import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

import {getCompany} from '../requests'

export const Company = (props) => {
  const {companyId} = useParams()
  const [company, setCompany] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const company = await getCompany(companyId)
      setCompany(company)
    }
    fetchData()
  }, [companyId])

  const renderCompanyImage = () => {
    if (!company.company_logo) return null
    return <img className="company-logo" src={company.company_logo} alt={`logo of ${company.name}`}/>
  }

  const renderPositions = () => {
    if (!company.positions) return null
    return company.positions.map(pos => {
      return (
        <p><Link to={`/positions/${pos.id}`}>{pos.title}</Link></p>
      )
    })
  }

  return (
    <div id="company-container-div">
      <h2>{company.name}</h2>
      {renderCompanyImage()}
      {renderPositions()}
    </div>
  )
}
