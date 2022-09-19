import { useState } from "react";

import CeramicClient from "@ceramicnetwork/http-client"

import { IDX } from '@ceramicstudio/idx'

function App() {

  const ENDPOINT = "https://ceramic-clay.3boxlabs.com"
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [loaded, setLoaded] = useState(false)

  const connect = async () => {
    const addresses =  await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    return addresses
  }
  
  const readProfile = async () => {
    const [address] = await connect()
    const ceramic = new CeramicClient(ENDPOINT)
    const idx = new IDX({ ceramic })
  }
  return (
    <div className="App">

    </div>
  );
}

export default App;
