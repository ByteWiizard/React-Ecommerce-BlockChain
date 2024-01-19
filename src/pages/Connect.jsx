import React, { useState, useEffect } from 'react'
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk'
import useAeternitySDK from '../components/useAeternitySDK.ts'
import '../assets/Connect.css'


const Connect = (Amount) => {
    const { aeSdk, connectToWallet, address, getBalance } = useAeternitySDK();
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(null);
    const [spendTo, setSpendTo] = useState('');
    const [spendAmount, setSpendAmount] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);



    useEffect(() => {
        const fetchBalance = async () => {
            try {
                setSpendTo('ak_2QaAzpW4w4pnPNDdrgdLHu5v4bGMxVzUD2F16X3aUrayPcBzZm');
                const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
                setBalance(balance);
            } catch (error) {
                console.error(error.message);
            }
        };

        if (address) {
            fetchBalance();
        }
    }, [aeSdk, address, getBalance]);

    const updateBalance = async () => {
        const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        setBalance(balance);
    }


    const handleConnectClick = async () => {
        setIsLoading(true);
        try {
            await connectToWallet();
        } catch (error) {
            if (!(error instanceof Error)) throw error;
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }


    };

    const handleSpendClick = async () => {
        try {
            console.log(spendAmount, spendTo);
            const result = await aeSdk.spend(spendAmount * 1000000000000000000, spendTo);
            const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
            setBalance(balance);
            setSpendAmount('')
            setThankYouVisible(true)
            setTimeout(() => setThankYouVisible(false), 5000);
            console.log(result);

        } catch (error) {
            console.error(error.message);
            setThankYouVisible(false)
        }
    };


    return (
        <>
            <div >
                {address ? (
                    <React.Fragment>

                        <div className='fixed top-60 right-40 p-4 rounded-lg shadow-md w-64 bg-white
                flex flex-col items-start slide-in-left'>
                            <label
                                className='text-black mb-4 text-left w-full font-bold'
                            >Balance: {balance}</label>


                           
                            <div className="text-black-500 mb-4">
                                Amount to be Pay {{Amount}}
                            </div>

                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4'
                                onClick={() => {
                                    if (spendAmount) {
                                        handleSpendClick()
                                    }
                                    
                                }}
                            >
                                Pay now
                            </button>


                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className='absolute fixed top-5 right-5'>

                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full
                            mr-40 mt-20'
                                onClick={handleConnectClick} disabled={isLoading}>
                                {isLoading ? 'Connecting…' : 'Connect to Wallet'}
                            </button>

                        </div>
                        {isLoading}
                    </React.Fragment>
                )}
            </div>
        </>
    );
};

export default Connect;