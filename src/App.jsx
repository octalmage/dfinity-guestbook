import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, useLocation } from "wouter";
import logo from "./assets/logo.svg";
import "./App.css";
import { blog } from "./agent";

function fromList(list) {
  if (list.length == 0) {
    return [];
  } else {
    const tuple = list[0];
    const array = fromList(tuple[1]);
    array.unshift(tuple[0]);
    return array;
  }
}

const convertToDate = (d) => {
  if (!d) {
    return "";
  }

  const date = new Date(parseInt(d.toString()));
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};

const Comment = ({ author, timestamp, id, body }) => (
  <div className="comment">
    <p>{author} says:</p>
    <p>{body}</p>
    <p>
      <Link to={`/post/${id}`}>{convertToDate(timestamp)}</Link>
    </p>
  </div>
);

function findAllByKey(obj, keyToFind) {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => (key === keyToFind)
      ? acc.concat(value)
      : (typeof value === 'object')
      ? acc.concat(findAllByKey(value, keyToFind))
      : acc
    , [])
}

function App() {
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();

  const refreshPosts = useCallback(async () => {
    try {
      const response = (await blog.readAll());

      const valuesList = findAllByKey(response, 'leaf');

      const postsList = valuesList.map(v => v.keyvals).map((values) => {
        return fromList(values).map((a) => {
          const post = a[1]; // steak sauce
          return { ...post, id: a[0].key };

        });
      });

      const posts = [].concat.apply([], postsList);
      posts.reverse();
      setPosts(posts);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const createPost = useCallback(
    async (event) => {
      event.preventDefault();

      if (author.trim() === "") {
        alert("no author");
        return;
      }

      if (body.trim() === "") {
        alert("no body");
        return;
      }

      setIsLoading(true);

      await blog.create({ body, author, timestamp: Date.now() });

      setBody("");
      setAuthor("");

      await refreshPosts();

      setIsLoading(false);
    },
    [body, author]
  );

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div className="page">
      <p style={{ textAlign: "center" }}>
        <a target="_blank" rel="noreferrer noopener" href="https://dfinity.org">
          <img
            className={isLoading ? "rotate" : ""}
            alt="DFINITY Logo"
            src={logo}
          />
        </a>
      </p>
      <Route path="/">
        <h1>Sign the guestbook!</h1>
        <form onSubmit={createPost}>
          <div style={{ borderRadius: '5px', padding: '0.5em', boxShadow: '-5px -5px 0px #b8b3e9' }}>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <label htmlFor="create-author">
                  <b>Name</b>
                </label>
              </td>
              <td>
                <input
                  maxLength={256}
                  disabled={isLoading}
                  style={{ borderRadius: 5, width: "100%", border: '2px solid pink', outline: 'none' }}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  id="create-author"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Comment</b>
              </td>
              <td>
                <textarea
                  disabled={isLoading}
                  style={{ borderRadius: 5, width: "100%", border: '2px solid pink', outline: 'none' }}
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  id="create-body"
                />
              </td>
            </tr>
          </table>
          
          <button disabled={isLoading} type="submit">
            Submit
          </button>
          </div>
        </form>
        {posts.map((post) => (
          <Comment key={post.id} {...post} />
        ))}
      </Route>
      <Route path="/post/:id">
        {({ id }) => {
          const foundPost = posts.find((p) => p.id == id);
          if (posts.length === 0 || !foundPost) {
            return null;
          }
          return (
            <>
              <button
                style={{
                  backgroundColor: "pink",
                  fontSize: 42,
                  border: "5px ridge #cb26da",
                }}
                onClick={() => setLocation("/")}
              >
                {"<"}
              </button>
              <Comment {...foundPost} />
            </>
          );
        }}
      </Route>
    </div>
  );
}

export default App;