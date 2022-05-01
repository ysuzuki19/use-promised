[![npm badge](https://img.shields.io/npm/v/@ysuzuki19/use-promised?label=use-promised)](https://www.npmjs.com/package/@ysuzuki19/use-promised)

# use-promised

react hooks library for handing promise without `async` or `useEffect`.

# install

```bash
npm i @ysuzuki19/use-promised
```

# how to use ( with jsonplaceholder )

```tsx
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
```

# API

```ts
usePromised<T>(fn, deps, option);
```

`fn` is function to return promise. (it is callable)

`deps` is dependencies array (like `useEffect`).

`option` is option for handling promise. it has following key-val.

| key         | type   | must  | val                                       |
| ----------- | ------ | ----- | ----------------------------------------- |
| placeholder | T      | false | initial data                              |
| interval    | number | false | interval time (ms) for continuous refetch |

# status usage

| name    | type       |                                        |
| ------- | ---------- | -------------------------------------- |
| data    | T          | result of promise                      |
| loading | boolean    | is true while loading                  |
| error   | boolean    | is true if promise failed              |
| success | boolean    | is true if promise succeed             |
| refresh | () => void | function for refreshing (without deps) |
