import React from 'react'
import ListProducts from './components/listProduct/ListProducts'
import "./index.css"
import ListProductManagement from './components/Cart/ListProductManagement'
export default function App() {
  return (
    <div style={{display:"flex"}}>
      <ListProducts></ListProducts>
      <ListProductManagement></ListProductManagement>
    </div>
  )
}
