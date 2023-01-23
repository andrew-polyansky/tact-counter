import { beginCell, contractAddress, toNano } from "ton";
import { SampleTactContract, storeAdd } from "./output/sample_SampleTactContract";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
import env from './var/env'

(async () => {

    // Parameters
    let packed = beginCell().store(storeAdd({ $$type: 'Add', amount: 10n })).endCell(); // Replace if you want another message used
    let init = await SampleTactContract.init(34n);
    let address = contractAddress(0, init);
    let deployAmount = toNano('0.05');
    let testnet = true;

    // Print basics
    printHeader('SampleTactContract');
    printAddress(address);
    // printDeploy(init, deployAmount, packed, testnet);
    
    // Do deploy
    await deploy(init, deployAmount, packed, testnet);

    env.deployed.contractAddress = address.toString();
})();