import { toNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { SampleTactContract } from "./output/sample_SampleTactContract";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let contract = system.open(await SampleTactContract.fromInit(34n));
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.events()).toMatchInlineSnapshot(`
            [
              {
                "type": "deploy",
              },
              {
                "message": {
                  "body": {
                    "cell": "x{946A98B60000000000000000}",
                    "type": "cell",
                  },
                  "bounce": true,
                  "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                  "to": "kQBhPo_IgHmCkYJTJp_9352ghHxfpkbizggu36v06TQ5s7Sa",
                  "type": "internal",
                  "value": 1000000000n,
                },
                "type": "received",
              },
              {
                "gasUsed": 9270n,
                "type": "processed",
              },
              {
                "messages": [
                  {
                    "body": {
                      "cell": "x{AFF90F570000000000000000}",
                      "type": "cell",
                    },
                    "bounce": true,
                    "from": "kQBhPo_IgHmCkYJTJp_9352ghHxfpkbizggu36v06TQ5s7Sa",
                    "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                    "type": "internal",
                    "value": 989534000n,
                  },
                ],
                "type": "sent",
              },
            ]
        `);

        // Check counter
        expect(await contract.getCounter()).toEqual(34n);

        // Increment counter
        await contract.send(owner, { value: toNano(1) }, "increment");
        await system.run();
        expect(track.events()).toMatchInlineSnapshot(`
            [
              {
                "message": {
                  "body": {
                    "text": "increment",
                    "type": "text",
                  },
                  "bounce": true,
                  "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                  "to": "kQBhPo_IgHmCkYJTJp_9352ghHxfpkbizggu36v06TQ5s7Sa",
                  "type": "internal",
                  "value": 1000000000n,
                },
                "type": "received",
              },
              {
                "gasUsed": 4982n,
                "type": "processed",
              },
            ]
        `);

        // Check counter
        expect(await contract.getCounter()).toEqual(35n);
    });
});
