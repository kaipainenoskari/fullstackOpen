const Filter = (p) => {
    const handleFilter = event => {
      const use = event.target.value
      p.setFilter(use)
      p.setSelect(p.countries.filter(b => b.name.common.toLowerCase().includes(use.toLowerCase())))
    }
    return (
      <div>
        find countries
        <input
          value={p.filter}
          onChange={handleFilter}
        />
      </div>
    )
  }

export default Filter