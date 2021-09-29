
import { useState } from 'react';
import { CountryList, TableHeaders } from './countries';
import './App.css';

function App() {
  const [value, setValue] = useState(null)
  const [rows, setRows] = useState(CountryList)
  const [page, setPage] = useState(1)

  const handleChange = e => {
      setValue(e.target.value)
      setRows(filteredRows(e.target.value))
  }

  const filteredRows = (key, colKeys = [0, 1]) => {
      setPage(1)
      let keyClean = key.trim().toLocaleLowerCase()
      return CountryList.filter(row => colKeys.some(ix => row[ix].toLocaleLowerCase().includes(keyClean)))
  }
  const sortColumn = (colKey) => {
      let listCopy = rows.concat().sort((a, b) => {
          let la = a[colKey]
          let lb = b[colKey]
          return la.localeCompare(lb)
      })
      setRows(listCopy)
  }
  return (
      <div className="mx-auto my-4" style={{ maxWidth: 90 + '%' }}>
          <h1 className="h1 text-center">Countries</h1>
          <div class="d-flex justify-content-between align-items-center my-4">
              <div>
                  <button className="btn btn-secondary" onClick={() => { setPage(page - 1) }} disabled={ page === 1}>Previous</button>
                  <span className="d-inline-block mx-2">{page}</span>
                  <button className="btn btn-primary" onClick={() => { setPage(page + 1) }} disabled={ page === Math.floor(rows.length/10) + Boolean(rows.length % 10)}>Next</button>
              </div>
              <input className='form-control' style={{ maxWidth: 250 + 'px' }} value={value} onChange={handleChange} placeholder="Filter country/capital" />
          </div>
          <table className="table my-4" >
              <thead>
                  {TableHeaders.map((header, ix) => <th key={ix}>{<div className="text-center"><div>{header}</div><button class="btn btn-sm btn-info py-1" onClick={() => sortColumn(ix)}>Sort</button></div>}</th>)}
              </thead>
              <tbody>
                  {rows.slice((page - 1) * 10, page * 10).map((row, ix) => <tr className="text-center" key={'r' + ix}>
                      {row.map((col, ix) => <td key={'c' + ix}> {col} </td>)}
                  </tr>)}
              </tbody>
          </table>
      </div>
  )
}

export default App;
