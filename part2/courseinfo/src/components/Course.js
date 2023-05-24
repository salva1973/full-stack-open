import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({name, parts}) => {
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((s, p) => s + p.exercises, 0)} />
    </>
  )
}

export default Course