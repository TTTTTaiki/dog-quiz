import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <div>
      <header className="hero is-dark is-small">
        <div className="hero-body">
          <div  className="container">
            <h1 className="title">What dog breed is this picture?</h1>
          </div>
        </div>
      </header>
    </div>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="section">
      <p>Loading...</p>
    </div>
  );
}

function Gallery(props) {
  if (props.src == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {props.src.map(url => {
        return (
          <div key={url} className="column is-3">
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
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                <option value="shiba">Shiba</option>
                <option value="akita">Akita</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
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
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery src={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  const url = "https://dog.ceo/dog-api/about";
  return (
    <div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog images are retrieved from Dog API</p>
          <p>
            <a href={url}>Donate to Dog API</a>
          </p>
        </div>
      </footer>
    </div>
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