# use-promised

react hooks library for handing promise without `async` or `useEffect`.

# install

```bash
npm i @ysuzuki19/use-promised
```

# how to use ( with jsonplaceholder )

```tsx
import React from 'react';
import usePromised from '@ysuzuki19/use-promised';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const { data, loading } = usePromised<Todo[]>(() =>
    fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
      response.json()
    )
  );

  if (loading || !data) {
    return <p>loading...</p>;
  }

  const todos = data;
  return (
    <>
      {todos.map((todo) => (
        <h3>
          {todo.completed ? '☑' : '☒'} {todo.title} ( id: {todo.id})
        </h3>
      ))}
    </>
  );
}

export default App;
```
