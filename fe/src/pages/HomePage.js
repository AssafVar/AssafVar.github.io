import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to memory game!</h1>
            <p>Match the cards and win the game</p>
            <p>Want to play? <Link to="/login">login</Link> first or <Link to="/signup">sign up</Link></p>
        </div>
    )
}