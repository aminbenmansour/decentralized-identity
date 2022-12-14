import './App.css';

import { useState } from "react";

import { CeramicClient } from "@ceramicnetwork/http-client"
import { getResolver as get3IDResolver} from '@ceramicnetwork/3id-did-resolver'

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
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

    try {
      const data = await idx.get(
        "basicProfile",
        `${address}@eip155:1`
      )

      console.log('data: ', data)
      if (data.name) setName(data.name)
      if (data.avatar) setImage(data.avatar)

    } catch (error) {
      console.log("error: ", error)
      setLoaded(true)
    }
  }

  const updateProfile = async () => {
    const [address] = await connect()
    const ceramic = new CeramicClient(ENDPOINT)
    const threeIdConnect = new ThreeIdConnect()
    const provider = new EthereumAuthProvider(window.ethereum, address)

    await threeIdConnect.connect(provider)

    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: {
        ...get3IDResolver(ceramic)
      }
    })

    ceramic.setDID(did)
    await ceramic.did.authenticate()

    const idx = new IDX({ ceramic })
    await idx.set("basicProfile", {
      name,
      avatar: image
    })

    console.log("Profile updated!")
  }

  return (
    <div className="App">
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Profile Image (Type Http Link)" onChange={e => setName(e.target.value)} />
      <button onClick={updateProfile}>Set Profile</button>
      <button onClick={readProfile}>Read Profile</button>

      { name &&
      <h3>{name}</h3> }

      { image &&
      <img style={{ width: '400px' }} src={image} /> }

      { (!image && !name && loaded) &&
      <h4>No profile, please create one...</h4> }
    </div>
  );
}

export default App;
