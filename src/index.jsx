// import "@babel/polyfill";
import * as $ from 'jquery'
import Post from './post'
// import json from './assets/json'
// import xml from './assets/data.xml' 
// import csv from './assets/data.csv'
import Logo from './assets/webpack-logo'
import React from 'react'
import {render} from 'react-dom'
import './babel'
import './style/styles.css'
import './style/less.less'
import './style/scss.scss'



const post = new Post('Webpack Post Title', Logo)
$('pre').addClass('code').html(post.toString())// Використовуємо jquery для того щоб розуміти що ми його підключили


const App = () => (
    <div classname="container">
    <h1>Klotsyki</h1>

    <hr />

    <div classname="logo" />

    <hr />

    <pre />

    <hr />

    <div classname="box">
        <h2>Less</h2>
    </div>
    
    <div classname="card">
        <h2>SCSS</h2>
    </div>
</div>
)

render(<App />, document.getElementById('app'))

// console.log('JSON:', json)
// console.log('XML:', xml)
// console.log('CSV:', csv)