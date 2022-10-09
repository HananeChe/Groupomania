import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <h3 className='h3'>Groupomania</h3>
        <ul className='ul'>
          <li>Contact</li>
          <li>FAQs</li>
          <li>Blog</li>
        </ul>
      </div>
    )
  }
}
