import { useState } from "react";

function App() {

  const ENDPOINT = "https://ceramic-clay.3boxlabs.com"
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="App">

    </div>
  );
}

export default App;
