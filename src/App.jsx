import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header>
      <h1>What dog breed is this picture?</h1>
    </header>
  );
}

function Image(props) {
  return (
    <figure>
      <img src={props.src} alt="cute dog!" />
    </figure>
  )
}

function Loading() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

function Gallery(props) {
  if (props.src == null) {
    return <Loading />;
  }
  return (
    <div>
      {props.src.map(url => {
        return (
          <div key={url} >
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function  handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="breed" defaultValue="shiba">
          <option value="shiba">Shiba</option>
          <option value="akita">Akita</option>
        </select>
        <div>
          <button type="submit">
            Reload
          </button>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      console.log(urls);
      setUrls(urls);
    });
  },[]);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section>
        <div>
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section>
        <Gallery src={urls} />
      </section>
    </main>
  );
}

function Footer() {
  const url = "https://dog.ceo/dog-api/about";
  return (
    <footer>
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href={url}>Donate to Dog API</a>
        </p>
      </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;