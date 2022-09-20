import { useState } from "react";

import { CeramicClient } from "@ceramicnetwork/http-client"
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

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
        "basicProfile", // scheme
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
        ...ThreeIdResolver.getResolver(ceramic)
      }
    })

    ceramic.setDID(did)

    await ceramic.did.authenticate()

  }

  return (
    <div className="App">
      <button onClick={readProfile}>Read Profile</button>
    </div>
  );
}

export default App;
