import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import moonbird from './res/moonbird2.jpg';
import ticusRebel from './res/ticu.jpg';
import LoopIcon from '@mui/icons-material/Loop';

function App() {  
  const [patch, setPatch] = useState(moonbird);
  const [nft, setNft] = useState(moonbird);
  const [asset, setAsset] = useState('0x23581767a106ae21c074b2276d25e5c3e136a68b/2941')
  const input = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://api.opensea.io/api/v1/asset/${asset}/?include_orders=false`)
        setNft(res.data.image_url)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [asset])
    
  const handleClick = (e) => {
    e.preventDefault()
    input.current.value = '';
    setPatch(nft);
  };

  return (
    <div className='flex h-screen justify-center items-center bg-black scale-125'>
      <div>
        <div className='flex items-center border rounded-md border-orange-600 p-12'>
          <div className='mr-12'>
            <img src={ticusRebel} className='h-96 rounded-lg' />
            <img src={patch} className='border border-gray-500 border-1 h-9 w-9 text-center transform: -skew-y-1 skew-x-12 relative bottom-20 left-20 ml-4 rounded-full shadow-sm shadow-black inline -rotate-12' />
            <div className='p-2 rounded-md bg-orange-600'>
              <p className='text-black font-mono text-xl font-semibold text-center'>Rebel #4995</p>
            </div>
          </div>
          <div className='flex flex-col items-center bottom-10 relative border-orange-500'>
            <div className='flex flex-col items-center gap-2'>
              <div className='h-24 w-56 flex overflow-hidden justify-center relative top-5'>
                <img src='https://rebels.art/images/typo-main/1.svg' className='flex scale-150 h-48 bottom-16 relative' />
              </div>
              <h2 className='text-orange-600 text-xl font-mono bg-gray-800 w-60 rounded-sm font-thin text-center'>DIGITAL IDENTITY</h2>
              <p className='text-gray-500 font-mono text-sm w-96 text-center'>
                OUR DIGITAL IDENTITIES ARE COMPOSED OF EXPERIENCES, COMMUNITIES WE BELONG TO, AND OUR ROLES IN THEM. REBELS PROVIDE A DYNAMIC INTERFACE TO EXPRESS OUR EVER-EVOLVING DIGITAL SELVES.
              </p>
            </div>
            <div className='flex gap-5 border border-orange-600 p-5 items-center mt-12'>
              {nft ? 
                <img src={patch} className='h-12 w-12 bg-slate-500 rounded-full justify-self-center scale-125 cursor-pointer border border-orange-600'/> : 
                <div className='flex items-center justify-center text-white h-12 w-12 rounded-full bg-black border border-orange-600 scale-125'>
                  <LoopIcon className='text-orange-600 animate-spin rotate-180'/>
                </div>
              }
              <input onChange={(e) => setAsset(e.target.value)} ref={input} type='text' placeholder='Asset Address...' className='h-8 bg-black border rounded-lg pl-2 text-sm font-mono text-orange-600 border-orange-600' />
              <button onClick={handleClick} className='p-1 text-black text-sm font-mono rounded-lg h-8 bg-orange-600'>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
