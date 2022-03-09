const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const privateKey = process.env.PRIVATE_KEY

const projectId = process.env.INFURA_API_KEY;//   || process.env.ALCHEMY_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
// const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;

const NUM_CREATURES = 12;
const NUM_LOOTBOXES = 4;
const DEFAULT_OPTION_ID = 0;
const LOOTBOX_OPTION_ID = 2;

// if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
//   console.error(
//     "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
//   );
//   return;
// }

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];




async function main() {

  const provider = new HDWalletProvider(privateKey, "https://rinkeby.infura.io/v3/" + projectId);
//   console.log(provider)

  const web3Instance = new web3(provider);
//   console.log(web3Instance)

   if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );
    // console.log(NFT_CONTRACT_ADDRESS)

    // console.log(nftContract)


    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
        console.log(i);
        console.log(OWNER_ADDRESS);
      const result = await nftContract.methods
        .mintTo(OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();
