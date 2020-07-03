import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

import {getCompany} from 'requests'

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
    const positionCard = (position, index) => {
      const color = index % 2 ? "patch-white" : "patch-grey"
      return (
        <Link key={position.id} to={`/positions/${position.id}`}>
          <div id={`position-${position.id}`} className={`position-card ${color}`}>
            <div className="position-card-title">
                <h3 className="subtitle">{position.title}</h3>
              </div>
            <div className="position-card-body">
                <p>{position.city}</p>
            </div>
          </div>
        </Link>
      )
    }

    return (
      <div className="positions-cards">
        {company.positions.map((p, index) => positionCard(p, index))}
      </div>
    )
  }

  return (
    <div className="company-container">
      <div className="position-company-card">
          <h1 className="title">{company.name}</h1>
          {renderCompanyImage()}
      </div>
      <h3 className="title">Available Positions:</h3>

      <div className="positions-container">
        {renderPositions()}
      </div>
    </div>
  )
}
