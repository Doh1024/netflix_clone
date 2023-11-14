import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import '../styles/Nav.css'

const Nav = () => {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if(window.scrollY > 100){
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, [])

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__content'>
        <img  className='nav__logo'
          onClick={() => navigate('/')}
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456" 
          alt=""/>

        <img className='nav__avatar'
          onClick={() => navigate('/profile')}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Nav