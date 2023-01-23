import { TonClient, Address } from "ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import client from './utils/client';
import env from './var/env';

(async () => {
    let address = Address.parse(env.deployed.contractAddress);
    let provider = client.provider(address, null);


    let contract = SampleTactContract.fromAddress(address);

    let counter = await contract.getCounter(provider);

    console.log(counter);
    
    

})();