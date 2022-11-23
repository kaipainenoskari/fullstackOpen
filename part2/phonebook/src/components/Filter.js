const Filter = (p) => {
    const handleFilter = event => {
      const use = event.target.value
      p.setFilter(use)
      p.setPeople(p.persons.filter(b => b.name.toLowerCase().includes(use.toLowerCase())))
    }
    return (
      <div>
        filter shown with 
        <input
          value={p.filter}
          onChange={handleFilter}
        />
      </div>
    )
  }

export default Filter