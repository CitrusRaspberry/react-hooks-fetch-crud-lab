import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  const questionListItems = questions && questions.map(q => {
    return (
      <QuestionItem
      onQuestionDelete={handleDelete}
      onQuestionChange={handleChange}
      key={q.id}
      question={q} />
  )
  })

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(r => r.json())
    .then(() => {
      const newQuestionList = questions.filter(q => q.id !== id);
      setQuestions(newQuestionList);
    })
  }

  function handleChange(e, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: e.target.value }),
    })
    .then(r => r.json())
    .then(updatedQ => {
      console.log(updatedQ)
      const updatedQuestions = questions.map(q => {
        if (q.id === id) {
          return {...q, updatedQ};
        } else {
          return q;
        }
      })
      setQuestions(updatedQuestions)
    })
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions/")
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [setQuestions])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionListItems}</ul>
    </section>
  );
}

export default QuestionList;
