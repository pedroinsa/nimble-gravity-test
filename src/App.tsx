import { useState, useEffect } from 'react'
import { getItems } from './services/items/items'
import type { Item } from './interfaces/interfaces'
import Card from './components/Card/Card'
import './App.css'

function App() {
  const [itemsList, setItemsList] = useState<Item[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    setError("")
    async function LoadData() {
      try {
        let items = await getItems()
        setItemsList(items)

      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }

      }
    }
    LoadData()

  }, [])


  return (
    <section>
      <h1>Nimble gravity</h1>
      <h2>This App should show all vacancies we have</h2>
      <p>Remember that you must enter your GitHub URL correctly. Otherwise, you won't be able to press the apply button. Copy it from your browser</p>
      <article>{itemsList.map(item => <Card key={item.title} title={item.title} id={item.id} />)}</article>

      {error}


    </section>
  )
}

export default App
