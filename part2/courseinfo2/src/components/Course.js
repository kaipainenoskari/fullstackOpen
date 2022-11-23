const Header = ({ header }) => {
  return (
    <h2>
      {header}
    </h2>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = ( {parts} ) => {
  const sum = parts.map(part => part.exercises).reduce((a, b) => {
    return a + b
  }, 0)

  return (
    <h3>
      total of {sum} exercises
    </h3>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <p>
          <Header header={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </p>
      )}
    </div>
  )
}

export default Course