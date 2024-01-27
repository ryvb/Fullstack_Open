const Course = ( {course} ) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
}
  
const Content = ( {parts} ) => {
    return (
      <div>
        <Parts parts={parts}/>
        <Exercises parts={parts}/>
      </div>
    )
}
  
const Header = ( {name} ) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
}
  
const Parts = ( {parts} ) => {
    return (
      <div>
        {parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>)}
      </div>
    )
}
  
const Exercises = ( {parts} ) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
  
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
}

export default Course