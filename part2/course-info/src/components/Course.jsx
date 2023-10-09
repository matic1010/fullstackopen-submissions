const Course = ({ course }) => {
  const sumOfExercises = course.parts.reduce(
    (sum, current) => sum + current.exercises,
    0
  );

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>
        <strong>total of {sumOfExercises} exercises</strong>
      </p>
    </>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part name={part.name} exercises={part.exercises} key={part.id} />
        );
      })}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Course;
