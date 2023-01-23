import { beginCell, TonClient, Address, WalletContractV4, toNano } from "ton";
import { SampleTactContract, storeAdd } from "./output/sample_SampleTactContract";
import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";
import client from './utils/client';
import env from './var/env'

(async () => {
    // Generate new key or take from env
    let mnemonics = env.deployer.mnemonic;
    let keyPair = await mnemonicToPrivateKey(mnemonics);

    
    // Create wallet contract
    let workchain = 0; // Usually you need a workchain 0
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

    let contractAddress = Address.parse(env.deployed.contractAddress);
    let walletAdress = wallet.address;
    

    let contractProvider = client.provider(contractAddress, null);
    let walletProvider = client.provider(walletAdress, null);
    
    let sender = wallet.sender(walletProvider, keyPair.secretKey)


    let contract = SampleTactContract.fromAddress(contractAddress);

    await contract.send(contractProvider, sender, {value: toNano('0.05'),}, {
        $$type: 'Add',
        amount: 6n,
    });
    
    // await contract.send(provider, sender, {value: toNano('0.05'),}, 'increment');
    

})();