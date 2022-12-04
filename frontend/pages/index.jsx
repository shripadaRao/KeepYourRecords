import { Main } from 'next/document'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
 import {useState, useEffect, useRef } from 'react'
 import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";
  
export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [loading, setLoading] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  const router = useRouter()
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
  
    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
  
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
      console.log('connecting wallet', walletConnected);
      
    } catch (err) {
      console.error(err);
    }
  };
  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <main className='h-screen grid place-content-center'>
      <div className='text-5xl'>Welconme to Knowmyrecords</div>
      
      <div
      className="bg-orange-500 hover:bg-orange-700 w-24 text-white font-bold py-2 px-4 rounded m-5"
      onClick={ connectWallet }
      >Connect Wallet</div>
      <div className='bg-slate-50 flex justify-center'>
      <div
      className="bg-green-500 hover:bg-green-700 w-32 text-white font-bold py-2 px-4 rounded m-5"
      onClick={() => router.push('/Dashboard') }
      >View Your Records</div>
      </div>
      
    </main>
  )
}
