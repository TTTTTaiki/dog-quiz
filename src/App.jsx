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

function Main() {
  const urls = [
    "https://images.dog.ceo/breeds/shiba/shiba-11.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-12.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-14.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-2.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-3i.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-4.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-5.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-6.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-7.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
    "https://images.dog.ceo/breeds/shiba/shiba-9.jpg",
  ];
  return (
    <main>
      <section>
        <Gallery src={null} />
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